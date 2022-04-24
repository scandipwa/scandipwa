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

import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { STORE_IN_PICK_UP_METHOD_CODE } from 'Component/StoreInPickUp/StoreInPickUp.config';
import StoreInPickUpQuery from 'Query/StoreInPickUp.query';
import { Store } from 'Query/StoreInPickUp.type';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { hideActiveOverlay } from 'Store/Overlay/Overlay.action';
import { clearPickUpStore } from 'Store/StoreInPickUp/StoreInPickUp.action';
import { Addresstype } from 'Type/Account.type';
import { ShippingMethodsType, StoreType } from 'Type/Checkout.type';
import { Merge, ReactElement } from 'Type/Common.type';
import { CountriesType } from 'Type/Config.type';
import { checkIfStoreIncluded } from 'Util/Address';
import { fetchQuery, getErrorMessage } from 'Util/Request';
import { RootState } from 'Util/Store/Store.type';
import transformCountriesToOptions from 'Util/Store/Transform';

import StoreInPickUpComponent from './StoreInPickUpPopup.component';
import { STORES_SEARCH_TIMEOUT } from './StoreInPickUpPopup.config';
import {
    StoreInPickUpContainerDispatchProps,
    StoreInPickUpContainerMapStateProps,
    StoreInPickUpContainerProps,
    StoreInPickUpContainerState,
    StoreWithCountryId
} from './StoreInPickUpPopup.type';

/** @namespace Component/StoreInPickUpPopup/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): StoreInPickUpContainerDispatchProps => ({
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    clearPickUpStore: () => dispatch(clearPickUpStore())
});

/** @namespace Component/StoreInPickUpPopup/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): StoreInPickUpContainerMapStateProps => ({
    countries: transformCountriesToOptions(state.ConfigReducer.countries),
    defaultCountry: state.ConfigReducer.default_country,
    selectedStore: state.StoreInPickUpReducer.store
});

/** @namespace Component/StoreInPickUpPopup/Container */
export class StoreInPickUpContainer extends PureComponent<StoreInPickUpContainerProps, StoreInPickUpContainerState> {
    static defaultProps = {
        selectedStore: null
    };

    timeout: NodeJS.Timeout | null = null;

    state: StoreInPickUpContainerState = {
        stores: [],
        storeSearchCriteria: '',
        isLoading: true,
        selectedCountryId: ''
    };

    containerFunctions = {
        handleStoresSearch: this.handleStoresSearch.bind(this),
        selectStore: this.selectStore.bind(this),
        setStoreSearchCriteria: this.setStoreSearchCriteria.bind(this),
        handleChangeCountry: this.handleChangeCountry.bind(this)
    };

    __construct(props: StoreInPickUpContainerProps): void {
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
        _: StoreInPickUpContainerProps,
        prevState: StoreInPickUpContainerState
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

    containerProps() {
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

    selectStore(store: Store): void {
        const {
            onStoreSelect,
            onShippingMethodSelect,
            hideActiveOverlay,
            setSelectedStore,
            countryId
        } = this.props;
        const method = this.getShippingMethod();

        const updateStore: StoreWithCountryId = { country_id: countryId, ...store };

        onStoreSelect(updateStore);
        setSelectedStore(store);
        onShippingMethodSelect(method);
        hideActiveOverlay();
    }

    getShippingMethod() {
        const { shippingMethods } = this.props;

        return shippingMethods.find(({ method_code }) => method_code === STORE_IN_PICK_UP_METHOD_CODE);
    }

    setStoreSearchCriteria(searchCriteria): void {
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
            <StoreInPickUpComponent
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreInPickUpContainer);
