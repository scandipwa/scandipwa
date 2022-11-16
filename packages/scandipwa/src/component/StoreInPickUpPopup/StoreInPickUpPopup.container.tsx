/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { ChangeEvent, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { StoreInPickUpCode } from 'Component/StoreInPickUp/StoreInPickUp.config';
import { ShippingMethod } from 'Query/Checkout.type';
import StoreInPickUpQuery from 'Query/StoreInPickUp.query';
import { Store } from 'Query/StoreInPickUp.type';
import { updateCheckoutStore } from 'Store/Checkout/Checkout.action';
import { goToPreviousNavigationState } from 'Store/Navigation/Navigation.action';
import { NavigationType } from 'Store/Navigation/Navigation.type';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { hideActiveOverlay } from 'Store/Overlay/Overlay.action';
import { updateStoreInPickUpStore } from 'Store/StoreInPickUp/StoreInPickUp.action';
import { ReactElement } from 'Type/Common.type';
import { GQLCountryCodeEnum } from 'Type/Graphql.type';
import { checkIfStoreIncluded, transformCountriesToOptions } from 'Util/Address';
import { getAllCartItemsSku } from 'Util/Cart';
import { fetchQuery, getErrorMessage } from 'Util/Request';
import { RootState } from 'Util/Store/Store.type';

import StoreInPickUpPopupComponent from './StoreInPickUpPopup.component';
import { STORES_SEARCH_TIMEOUT } from './StoreInPickUpPopup.config';
import {
    StoreInPickUpPopupComponentProps,
    StoreInPickUpPopupComponentPropsKeys,
    StoreInPickUpPopupContainerDispatchProps,
    StoreInPickUpPopupContainerFunctions,
    StoreInPickUpPopupContainerMapStateProps,
    StoreInPickUpPopupContainerProps,
    StoreInPickUpPopupContainerState,
    StoreWithCountryId,
} from './StoreInPickUpPopup.type';

/** @namespace Component/StoreInPickUpPopup/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): StoreInPickUpPopupContainerDispatchProps => ({
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    updateStoreInPickUpStore: (state) => dispatch(updateStoreInPickUpStore(state)),
    goToPreviousNavigationState: () => dispatch(goToPreviousNavigationState(
        NavigationType.TOP_NAVIGATION_TYPE,
    )),
    updateCheckoutStore: (state) => dispatch(updateCheckoutStore(state)),
});

/** @namespace Component/StoreInPickUpPopup/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): StoreInPickUpPopupContainerMapStateProps => ({
    navigationState: state.NavigationReducer[
        NavigationType.TOP_NAVIGATION_TYPE
    ].navigationState,
    countries: transformCountriesToOptions(state.ConfigReducer.countries),
    defaultCountry: state.ConfigReducer.default_country,
    selectedStore: state.StoreInPickUpReducer.store,
    countryId: state.CheckoutReducer.estimateAddress?.country_id,
    totals: state.CartReducer.cartTotals,
});

/** @namespace Component/StoreInPickUpPopup/Container */
export class StoreInPickUpPopupContainer extends PureComponent<
StoreInPickUpPopupContainerProps,
StoreInPickUpPopupContainerState
> {
    static defaultProps: Partial<StoreInPickUpPopupContainerProps> = {
        selectedStore: null,
    };

    timeout: NodeJS.Timeout | null = null;

    state: StoreInPickUpPopupContainerState = {
        stores: [],
        storeSearchCriteria: '',
        isLoading: true,
        selectedCountryId: '',
    };

    containerFunctions: StoreInPickUpPopupContainerFunctions = {
        handleStoresSearch: this.handleStoresSearch.bind(this),
        selectStore: this.selectStore.bind(this),
        setStoreSearchCriteria: this.setStoreSearchCriteria.bind(this),
        handleChangeCountry: this.handleChangeCountry.bind(this),
    };

    __construct(props: StoreInPickUpPopupContainerProps): void {
        const {
            countryId,
            defaultCountry,
        } = props;

        this.state = {
            ...this.state,
            selectedCountryId: countryId || defaultCountry,
        };
    }

    componentDidMount(): void {
        this.handleStoresSearch();
    }

    componentDidUpdate(
        _: StoreInPickUpPopupContainerProps,
        prevState: StoreInPickUpPopupContainerState,
    ): void {
        const {
            storeSearchCriteria: prevStoreSearchCriteria,
        } = prevState;
        const { storeSearchCriteria } = this.state;

        if (storeSearchCriteria !== prevStoreSearchCriteria) {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }

            this.setIsLoading();
            this.timeout = setTimeout(() => {
                this.timeout = null;
                this.handleStoresSearch();
            }, STORES_SEARCH_TIMEOUT);
        }
    }

    containerProps(): Pick<StoreInPickUpPopupComponentProps, StoreInPickUpPopupComponentPropsKeys> {
        const { countries } = this.props;
        const {
            isLoading,
            selectedCountryId,
            stores,
            storeSearchCriteria,
        } = this.state;

        return {
            countries,
            isLoading,
            selectedCountryId,
            stores,
            storeSearchCriteria,
        };
    }

    clearStores(): void {
        this.setState({ stores: [] });
    }

    closeOverlay(): void {
        const {
            hideActiveOverlay,
            goToPreviousNavigationState,
            navigationState: { onCloseClick } = {},
        } = this.props;

        if (onCloseClick) {
            onCloseClick();
        }

        hideActiveOverlay();
        goToPreviousNavigationState();
    }

    selectStore(store: Store): void {
        const {
            updateCheckoutStore,
            setSelectedStore,
            countryId,
        } = this.props;
        const selectedShippingMethod = this.getShippingMethod();

        // TODO: refactore handling country id from string to GQLCountryCodeEnum.
        // Since from BE we can get full list of country codes as enum which will be most updated information.
        const selectedStoreAddress: StoreWithCountryId = { country_id: countryId as GQLCountryCodeEnum, ...store };

        updateCheckoutStore({ selectedStoreAddress });
        setSelectedStore(store);

        if (selectedShippingMethod) {
            updateCheckoutStore({ selectedShippingMethod });
        }

        this.closeOverlay();
    }

    getShippingMethod(): ShippingMethod | undefined {
        const { shippingMethods } = this.props;

        return shippingMethods.find(({ method_code }) => method_code === StoreInPickUpCode.METHOD_CODE);
    }

    setStoreSearchCriteria(searchCriteria: ChangeEvent<HTMLInputElement>): void {
        this.setState({ storeSearchCriteria: searchCriteria.target.value });
    }

    setIsLoading(): void {
        this.setState({ isLoading: true });
    }

    async handleStoresSearch(): Promise<void> {
        const {
            showNotification,
            selectedStore,
            updateStoreInPickUpStore,
            totals: { items },
        } = this.props;
        const { storeSearchCriteria, selectedCountryId } = this.state;

        try {
            const {
                getStores: {
                    stores = null,
                } = {},
            } = await fetchQuery(StoreInPickUpQuery.getStores(selectedCountryId, storeSearchCriteria, getAllCartItemsSku(items || [])));

            if (stores) {
                this.setState({ stores });

                if (selectedStore && !checkIfStoreIncluded(stores, selectedStore)) {
                    updateStoreInPickUpStore({ store: null });
                }
            }

            this.setState({ isLoading: false });
        } catch (e) {
            this.setState({ stores: [] });
            showNotification(NotificationType.ERROR, getErrorMessage(e as Error));
        }
    }

    handleChangeCountry(countryId: string): void {
        this.setState({ selectedCountryId: countryId }, () => this.handleStoresSearch());
    }

    render(): ReactElement {
        return (
            <StoreInPickUpPopupComponent
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreInPickUpPopupContainer);
