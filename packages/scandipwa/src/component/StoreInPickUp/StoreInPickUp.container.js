/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { hideActiveOverlay } from 'Store/Overlay/Overlay.action';
import { addressType } from 'Type/Account';
import { shippingMethodsType } from 'Type/Checkout';
import { fetchQuery } from 'Util/Request';

import StoreInPickUpQuery from '../../query/StoreInPickUp.query';
import StoreInPickUp from './StoreInPickUp.component';
import { STORE_IN_PICK_UP_METHOD_CODE } from './StoreInPickUp.config';

/** @namespace Component/StoreInPickUp/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    hideActiveOverlay: () => dispatch(hideActiveOverlay())
});

/** @namespace Component/StoreInPickUp/Container/mapStateToProps */
export const mapStateToProps = () => ({});

/** @namespace Component/StoreInPickUp/Container/StoreInPickUpContainer */
export class StoreInPickUpContainer extends PureComponent {
    static propTypes = {
        estimateAddress: addressType.isRequired,
        shippingMethods: shippingMethodsType.isRequired,
        onStoreSelect: PropTypes.func.isRequired,
        setSelectedShippingMethodCode: PropTypes.func.isRequired,
        onShippingMethodSelect: PropTypes.func.isRequired,
        hideActiveOverlay: PropTypes.func.isRequired
    };

    state = {
        stores: []
    };

    containerFunctions = {
        handleStoreInput: this.handleStoreInput.bind(this),
        selectStore: this.selectStore.bind(this)
    };

    containerProps = () => {
        const { stores } = this.state;

        return {
            stores
        };
    };

    selectStore(store) {
        const {
            onStoreSelect,
            onShippingMethodSelect,
            setSelectedShippingMethodCode,
            hideActiveOverlay
        } = this.props;
        const method = this.getShippingMethod();
        const { method_code } = method;

        onStoreSelect(store);
        setSelectedShippingMethodCode(method_code);
        onShippingMethodSelect(method);
        hideActiveOverlay();
    }

    getShippingMethod() {
        const { shippingMethods } = this.props;

        return shippingMethods.find(({ method_code }) => method_code === STORE_IN_PICK_UP_METHOD_CODE);
    }

    handleStoreInput(fields) {
        const { estimateAddress: { country_id } } = this.props;

        fetchQuery(StoreInPickUpQuery.getStores(fields, country_id)).then(
            ({ getStores: { stores } = {} }) => {
                if (stores) {
                    this.setState({ stores });
                }
            }
        );
    }

    render() {
        return (
            <StoreInPickUp
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreInPickUpContainer);
