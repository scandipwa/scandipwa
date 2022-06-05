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

import Field from 'Component/Field';
import { FieldType } from 'Component/Field/Field.config';
import Loader from 'Component/Loader';
import Popup from 'Component/Popup';
import StoreInPickUpStoreComponent from 'Component/StoreInPickUpStore';
import { Store } from 'Query/StoreInPickUp.type';
import { ReactElement } from 'Type/Common.type';

import { STORE_IN_PICK_UP_POPUP_ID } from './StoreInPickUpPopup.config';
import { StoreInPickUpPopupComponentProps } from './StoreInPickUpPopup.type';

import './StoreInPickUpPopup.style';

/** @namespace Component/StoreInPickUpPopup/Component */
export class StoreInPickUpPopupComponent extends PureComponent<StoreInPickUpPopupComponentProps> {
    static defaultProps: Partial<StoreInPickUpPopupComponentProps> = {
        stores: [],
        storeSearchCriteria: '',
        isLoading: true
    };

    renderNoResult(): ReactElement {
        return (
            <span
              block="StoreInPickUpPopup"
              elem="NoResult"
            >
                { __('We were unable to find nearby locations for provided search query.') }
            </span>
        );
    }

    renderInput(): ReactElement {
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
                  type={ FieldType.SELECT }
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
                  type={ FieldType.TEXT }
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

    renderInfo(): ReactElement {
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

    renderStore(store: Store): ReactElement {
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

    renderResult(): ReactElement {
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

    renderContent(): ReactElement {
        return (
            <>
                { this.renderInput() }
                { this.renderResult() }
            </>
        );
    }

    render(): ReactElement {
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
