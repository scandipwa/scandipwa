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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { STORE_IN_PICK_UP_METHOD_CODE } from 'Component/StoreInPickUp/StoreInPickUp.config';
import StoreInPickUpQuery from 'Query/StoreInPickUp.query';
import { showNotification } from 'Store/Notification/Notification.action';
import { hideActiveOverlay } from 'Store/Overlay/Overlay.action';
import { clearPickUpStore } from 'Store/StoreInPickUp/StoreInPickUp.action';
import { Addresstype } from 'Type/Account.type';
import { ShippingMethodsType, StoreType } from 'Type/Checkout.type';
import { CountriesType } from 'Type/Config.type';
import { checkIfStoreIncluded } from 'Util/Address';
import { fetchQuery, getErrorMessage } from 'Util/Request';
import transformCountriesToOptions from 'Util/Store/Transform';

import StoreInPickUpComponent from './StoreInPickUpPopup.component';
import { STORES_SEARCH_TIMEOUT } from './StoreInPickUpPopup.config';

/** @namespace Component/StoreInPickUpPopup/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    showNotification: (type, message) => dispatch(showNotification(type, message)),
    clearPickUpStore: () => dispatch(clearPickUpStore())
});

/** @namespace Component/StoreInPickUpPopup/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    countries: transformCountriesToOptions(state.ConfigReducer.countries),
    defaultCountry: state.ConfigReducer.default_country,
    selectedStore: state.StoreInPickUpReducer.store
});

/** @namespace Component/StoreInPickUpPopup/Container */
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
        cartItemsSku: PropTypes.arrayOf(PropTypes.string).isRequired,
        clearPickUpStore: PropTypes.func.isRequired,
        selectedStore: StoreType
    };

    static defaultProps = {
        selectedStore: null
    };

    state = {
        stores: [],
        storeSearchCriteria: '',
        isLoading: true
    };

    containerFunctions = {
        handleStoresSearch: this.handleStoresSearch.bind(this),
        selectStore: this.selectStore.bind(this),
        setStoreSearchCriteria: this.setStoreSearchCriteria.bind(this),
        handleChangeCountry: this.handleChangeCountry.bind(this)
    };

    __construct(props) {
        const {
            countryId,
            defaultCountry
        } = props;

        this.state = {
            selectedCountryId: countryId || defaultCountry
        };
    }

    componentDidMount() {
        this.handleStoresSearch();
    }

    componentDidUpdate(__, prevState) {
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

    clearStores() {
        this.setState({ stores: [] });
    }

    selectStore(store) {
        const {
            onStoreSelect,
            onShippingMethodSelect,
            hideActiveOverlay,
            setSelectedStore,
            countryId
        } = this.props;
        const method = this.getShippingMethod();

        const updateStore = { country_id: countryId, ...store };

        onStoreSelect(updateStore);
        setSelectedStore(store);
        onShippingMethodSelect(method);
        hideActiveOverlay();
    }

    getShippingMethod() {
        const { shippingMethods } = this.props;

        return shippingMethods.find(({ method_code }) => method_code === STORE_IN_PICK_UP_METHOD_CODE);
    }

    setStoreSearchCriteria(searchCriteria) {
        this.setState({ storeSearchCriteria: searchCriteria.target.value });
    }

    setIsLoading() {
        this.setState({ isLoading: true });
    }

    async handleStoresSearch() {
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
                    stores
                } = {}
            } = await fetchQuery(StoreInPickUpQuery.getStores(selectedCountryId, storeSearchCriteria, cartItemsSku));

            if (stores) {
                this.setState({ stores });
            }

            if (!checkIfStoreIncluded(stores, selectedStore)) {
                clearPickUpStore();
            }

            this.setState({ isLoading: false });
        } catch (e) {
            this.setState({ stores: [] });
            showNotification('error', getErrorMessage(e));
        }
    }

    handleChangeCountry(countryId) {
        this.setState({ selectedCountryId: countryId }, () => this.handleStoresSearch());
    }

    render() {
        return (
            <StoreInPickUpComponent
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreInPickUpContainer);
