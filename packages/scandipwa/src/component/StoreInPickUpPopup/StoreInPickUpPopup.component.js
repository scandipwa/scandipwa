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

import Field from 'Component/Field';
import FIELD_TYPE from 'Component/Field/Field.config';
import Loader from 'Component/Loader';
import Popup from 'Component/Popup';
import StoreInPickUpStoreComponent from 'Component/StoreInPickUpStore';
import { StoreType } from 'Type/Checkout.type';
import { CountriesType } from 'Type/Config.type';

import { STORE_IN_PICK_UP_POPUP_ID } from './StoreInPickUpPopup.config';

import './StoreInPickUpPopup.style';

/** @namespace Component/StoreInPickUpPopup/Component */
export class StoreInPickUpPopupComponent extends PureComponent {
    static propTypes = {
        countries: CountriesType.isRequired,
        selectedCountryId: PropTypes.string.isRequired,
        handleChangeCountry: PropTypes.func.isRequired,
        isLoading: PropTypes.bool,
        selectStore: PropTypes.func.isRequired,
        setStoreSearchCriteria: PropTypes.func.isRequired,
        storeSearchCriteria: PropTypes.string,
        stores: PropTypes.arrayOf(
            StoreType
        )
    };

    static defaultProps = {
        stores: [],
        storeSearchCriteria: '',
        isLoading: true
    };

    renderNoResult() {
        return (
            <span
              block="StoreInPickUpPopup"
              elem="NoResult"
            >
                { __('We were unable to find nearby locations for provided search query.') }
            </span>
        );
    }

    renderInput() {
        const {
            countries,
            selectedCountryId,
            handleChangeCountry,
            setStoreSearchCriteria,
            storeSearchCriteria
        } = this.props;

        return (
            <>
                <Field
                  type={ FIELD_TYPE.select }
                  attr={ {
                      id: 'country_id',
                      name: 'country_id',
                      defaultValue: selectedCountryId
                  } }
                  events={ {
                      onChange: handleChangeCountry
                  } }
                  options={ countries.map(({ id, label }) => ({ id, label, value: id })) }
                  mix={ { block: 'StoreInPickUpPopup', elem: 'Input' } }
                />
                <Field
                  type={ FIELD_TYPE.text }
                  attr={ {
                      id: 'store-finder',
                      name: 'store-finder',
                      defaultValue: storeSearchCriteria,
                      placeholder: __('City or Postcode')
                  } }
                  events={ {
                      onChange: setStoreSearchCriteria
                  } }
                  mix={ { block: 'StoreInPickUpPopup', elem: 'Input' } }
                />
                { this.renderInfo() }
            </>
        );
    }

    renderInfo() {
        const { storeSearchCriteria, isLoading } = this.props;

        if (storeSearchCriteria.length || isLoading) {
            return null;
        }

        return (
            <span block="StoreInPickUpPopup" elem="Info">
                { __('Please provide postcode or city name to find nearest pickup locations.') }
            </span>
        );
    }

    renderStore(store) {
        const { selectStore } = this.props;
        const { pickup_location_code } = store;

        return (
            <StoreInPickUpStoreComponent
              store={ store }
              selectStore={ selectStore }
              key={ pickup_location_code }
            />
        );
    }

    renderResult() {
        const { stores, isLoading } = this.props;

        if (!stores.length) {
            return this.renderNoResult();
        }

        return (
            <div block="StoreInPickUpPopup" elem="Results">
                <Loader isLoading={ isLoading } />
                { stores.map(this.renderStore.bind(this)) }
            </div>
        );
    }

    renderContent() {
        return (
            <>
                { this.renderInput() }
                { this.renderResult() }
            </>
        );
    }

    render() {
        return (
            <Popup
              id={ STORE_IN_PICK_UP_POPUP_ID }
              clickOutside={ false }
              mix={ { block: 'StoreInPickUpPopup' } }
            >
                { this.renderContent() }
            </Popup>
        );
    }
}

export default StoreInPickUpPopupComponent;
