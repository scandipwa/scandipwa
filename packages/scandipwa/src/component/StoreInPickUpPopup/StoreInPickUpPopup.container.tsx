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
<<<<<<< HEAD:packages/scandipwa/src/component/StoreInPickUpPopup/StoreInPickUpPopup.container.tsx
import { Store } from 'Query/StoreInPickUp.type';
=======
import { goToPreviousNavigationState } from 'Store/Navigation/Navigation.action';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
>>>>>>> scandipwa/master:packages/scandipwa/src/component/StoreInPickUpPopup/StoreInPickUpPopup.container.js
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { hideActiveOverlay } from 'Store/Overlay/Overlay.action';
import { clearPickUpStore } from 'Store/StoreInPickUp/StoreInPickUp.action';
<<<<<<< HEAD:packages/scandipwa/src/component/StoreInPickUpPopup/StoreInPickUpPopup.container.tsx
import { ReactElement } from 'Type/Common.type';
import { GQLCountryCodeEnum } from 'Type/Graphql.type';
import { checkIfStoreIncluded, transformCountriesToOptions } from 'Util/Address';
=======
import { Addresstype } from 'Type/Account.type';
import { ShippingMethodsType, StoreType } from 'Type/Checkout.type';
import { CountriesType } from 'Type/Config.type';
import { NavigationStateHistoryType } from 'Type/Router.type';
import { checkIfStoreIncluded } from 'Util/Address';
>>>>>>> scandipwa/master:packages/scandipwa/src/component/StoreInPickUpPopup/StoreInPickUpPopup.container.js
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
    StoreWithCountryId
} from './StoreInPickUpPopup.type';

/** @namespace Component/StoreInPickUpPopup/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): StoreInPickUpPopupContainerDispatchProps => ({
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    clearPickUpStore: () => dispatch(clearPickUpStore()),
    goToPreviousNavigationState: (state) => dispatch(goToPreviousNavigationState(TOP_NAVIGATION_TYPE, state))
});

/** @namespace Component/StoreInPickUpPopup/Container/mapStateToProps */
<<<<<<< HEAD:packages/scandipwa/src/component/StoreInPickUpPopup/StoreInPickUpPopup.container.tsx
export const mapStateToProps = (state: RootState): StoreInPickUpPopupContainerMapStateProps => ({
=======
export const mapStateToProps = (state) => ({
    navigationState: state.NavigationReducer[TOP_NAVIGATION_TYPE].navigationState,
>>>>>>> scandipwa/master:packages/scandipwa/src/component/StoreInPickUpPopup/StoreInPickUpPopup.container.js
    countries: transformCountriesToOptions(state.ConfigReducer.countries),
    defaultCountry: state.ConfigReducer.default_country,
    selectedStore: state.StoreInPickUpReducer.store
});

/** @namespace Component/StoreInPickUpPopup/Container */
<<<<<<< HEAD:packages/scandipwa/src/component/StoreInPickUpPopup/StoreInPickUpPopup.container.tsx
export class StoreInPickUpPopupContainer extends PureComponent<
StoreInPickUpPopupContainerProps,
StoreInPickUpPopupContainerState
> {
    static defaultProps: Partial<StoreInPickUpPopupContainerProps> = {
=======
export class StoreInPickUpContainer extends PureComponent {
    static propTypes = {
        countries: CountriesType.isRequired,
        countryId: PropTypes.string.isRequired,
        estimateAddress: Addresstype.isRequired,
        hideActiveOverlay: PropTypes.func.isRequired,
        onShippingMethodSelect: PropTypes.func.isRequired,
        onStoreSelect: PropTypes.func.isRequired,
        setSelectedStore: PropTypes.func.isRequired,
        shippingMethods: ShippingMethodsType.isRequired,
        showNotification: PropTypes.func.isRequired,
        defaultCountry: PropTypes.string.isRequired,
        cartItemsSku: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
        clearPickUpStore: PropTypes.func.isRequired,
        selectedStore: StoreType,
        goToPreviousNavigationState: PropTypes.func.isRequired,
        navigationState: NavigationStateHistoryType.isRequired
    };

    static defaultProps = {
>>>>>>> scandipwa/master:packages/scandipwa/src/component/StoreInPickUpPopup/StoreInPickUpPopup.container.js
        selectedStore: null
    };

    timeout: NodeJS.Timeout | null = null;

    state: StoreInPickUpPopupContainerState = {
        stores: [],
        storeSearchCriteria: '',
        isLoading: true,
        selectedCountryId: ''
    };

    containerFunctions: StoreInPickUpPopupContainerFunctions = {
        handleStoresSearch: this.handleStoresSearch.bind(this),
        selectStore: this.selectStore.bind(this),
        setStoreSearchCriteria: this.setStoreSearchCriteria.bind(this),
        handleChangeCountry: this.handleChangeCountry.bind(this)
    };

    __construct(props: StoreInPickUpPopupContainerProps): void {
        const {
            countryId,
            defaultCountry
        } = props;

        this.state = {
            ...this.state,
            selectedCountryId: countryId || defaultCountry
        };
    }

    componentDidMount(): void {
        this.handleStoresSearch();
    }

    componentDidUpdate(
        _: StoreInPickUpPopupContainerProps,
        prevState: StoreInPickUpPopupContainerState
    ): void {
        const {
            storeSearchCriteria: prevStoreSearchCriteria
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
            storeSearchCriteria
        } = this.state;

        return {
            countries,
            isLoading,
            selectedCountryId,
            stores,
            storeSearchCriteria
        };
    }

    clearStores(): void {
        this.setState({ stores: [] });
    }

<<<<<<< HEAD:packages/scandipwa/src/component/StoreInPickUpPopup/StoreInPickUpPopup.container.tsx
    selectStore(store: Store): void {
=======
    closeOverlay() {
        const {
            hideActiveOverlay,
            goToPreviousNavigationState,
            navigationState: { onCloseClick } = {}
        } = this.props;

        if (onCloseClick) {
            onCloseClick();
        }

        hideActiveOverlay();
        goToPreviousNavigationState();
    }

    selectStore(store) {
>>>>>>> scandipwa/master:packages/scandipwa/src/component/StoreInPickUpPopup/StoreInPickUpPopup.container.js
        const {
            onStoreSelect,
            onShippingMethodSelect,
            setSelectedStore,
            countryId
        } = this.props;
        const method = this.getShippingMethod();

        // TODO: refactore handling country id from string to GQLCountryCodeEnum.
        // Since from BE we can get full list of country codes as enum which will be most updated information.
        const updateStore: StoreWithCountryId = { country_id: countryId as GQLCountryCodeEnum, ...store };

        onStoreSelect(updateStore);
        setSelectedStore(store);
<<<<<<< HEAD:packages/scandipwa/src/component/StoreInPickUpPopup/StoreInPickUpPopup.container.tsx

        if (method) {
            onShippingMethodSelect(method);
        }

        hideActiveOverlay();
=======
        onShippingMethodSelect(method);
        this.closeOverlay();
>>>>>>> scandipwa/master:packages/scandipwa/src/component/StoreInPickUpPopup/StoreInPickUpPopup.container.js
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
            cartItemsSku,
            selectedStore,
            clearPickUpStore
        } = this.props;
        const { storeSearchCriteria, selectedCountryId } = this.state;

        try {
            const {
                getStores: {
                    stores = null
                } = {}
            } = await fetchQuery(StoreInPickUpQuery.getStores(selectedCountryId, storeSearchCriteria, cartItemsSku));

            if (stores) {
                this.setState({ stores });

                if (selectedStore && !checkIfStoreIncluded(stores, selectedStore)) {
                    clearPickUpStore();
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
