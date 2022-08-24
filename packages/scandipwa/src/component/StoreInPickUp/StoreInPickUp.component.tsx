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

import StoreInPickUpPopupComponent from 'Component/StoreInPickUpPopup';
import StoreInPickUpStoreComponent from 'Component/StoreInPickUpStore';
import { ReactElement } from 'Type/Common.type';
import { noopFn } from 'Util/Common';

import { StoreInPickUpComponentProps } from './StoreInPickUp.type';

import './StoreInPickUp.style';

/** @namespace Component/StoreInPickUp/Component */
<<<<<<< HEAD:packages/scandipwa/src/component/StoreInPickUp/StoreInPickUp.component.tsx
export class StoreInPickUpComponent extends PureComponent<StoreInPickUpComponentProps> {
    static defaultProps: Partial<StoreInPickUpComponentProps> = {
=======
export class StoreInPickUpComponent extends PureComponent {
    static propTypes = {
        selectStore: PropTypes.func,
        handleOpenPopup: PropTypes.func.isRequired,
        countryId: PropTypes.string.isRequired,
        estimateAddress: Addresstype.isRequired,
        shippingMethods: ShippingMethodsType.isRequired,
        onStoreSelect: PropTypes.func.isRequired,
        onShippingMethodSelect: PropTypes.func.isRequired,
        setSelectedStore: PropTypes.func.isRequired,
        setSelectedShippingMethodCode: PropTypes.func,
        cartItemsSku: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
        selectedStore: StoreType
    };

    static defaultProps = {
>>>>>>> scandipwa/master:packages/scandipwa/src/component/StoreInPickUp/StoreInPickUp.component.js
        selectedStore: null,
        selectStore: noopFn
    };

    renderEmptyResult(): ReactElement {
        return (
            <span block="StoreInPickUp" elem="Empty">
                { __('We could not preselect pickup location based on available information, '
                + 'please select it manually.') }
            </span>
        );
    }

    renderHeading(): ReactElement {
        return (
            <h3
              block="StoreInPickUp"
              elem="Heading"
            >
                { __('Store') }
            </h3>
        );
    }

    renderStore(): ReactElement {
        const { selectStore, selectedStore } = this.props;
        const { pickup_location_code } = selectedStore || {};

        return (
            <StoreInPickUpStoreComponent
              store={ selectedStore }
              selectStore={ selectStore }
              key={ pickup_location_code }
              isSelectedStore
            />
        );
    }

    renderResult(): ReactElement {
        const { selectedStore } = this.props;

        if (!selectedStore) {
            return this.renderEmptyResult();
        }

        return (
            <div block="StoreInPickUp" elem="Results">
                { this.renderStore() }
            </div>
        );
    }

    renderPopup(): ReactElement {
        const {
            countryId,
            shippingMethods,
            onStoreSelect,
            onShippingMethodSelect,
            setSelectedStore,
            cartItemsSku
        } = this.props;

        return (
            <StoreInPickUpPopupComponent
              countryId={ countryId }
              shippingMethods={ shippingMethods }
              onStoreSelect={ onStoreSelect }
              onShippingMethodSelect={ onShippingMethodSelect }
              setSelectedStore={ setSelectedStore }
              cartItemsSku={ cartItemsSku }
            />
        );
    }

    renderActions(): ReactElement {
        const { handleOpenPopup, selectedStore } = this.props;

        return (
            <div
              block="StoreInPickUp"
              elem="Actions"
            >
                <button
                  block="StoreInPickUp"
                  elem="SelectButton"
                  mix={ { block: 'Button' } }
                  type="button"
                  onClick={ handleOpenPopup }
                >
                   { __('Select store') }
                </button>
                <button
                  type="submit"
                  block="Button"
                  mix={ { block: 'CheckoutShipping', elem: 'Button' } }
                  disabled={ !selectedStore }
                >
                    { __('Proceed to billing') }
                </button>
            </div>
        );
    }

    render(): ReactElement {
        return (
            <div
              block="StoreInPickUp"
              elem="Wrapper"
            >
                { this.renderHeading() }
                { this.renderResult() }
                { this.renderActions() }
                { this.renderPopup() }
            </div>
        );
    }
}

export default StoreInPickUpComponent;
