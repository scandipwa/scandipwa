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

import VaultStorage from './VaultStorage.component';

export const VaultDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Vault/Vault.dispatcher'
);

/** @namespace Component/VaultStorage/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    storedPaymentMethods: state.VaultReducer.storedPaymentMethods,
    isLoading: state.VaultReducer.isLoading,
    device: state.ConfigReducer.device
});

/** @namespace Component/VaultStorage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    getStoredPaymentMethods: () => {
        VaultDispatcher.then(
            ({ default: dispatcher }) => dispatcher.handleData(dispatch)
        );
    }
});

/** @namespace Component/VaultStorage/Container */
export class VaultStorageContainer extends PureComponent {
    static propTypes = {
        getStoredPaymentMethods: PropTypes.func.isRequired,
        onStoredPaymentMethodSelect: PropTypes.func.isRequired
    };

    state = {
        selectedStoredPaymentMethod: null
    };

    containerFunctions = {
        onCardSelect: this.onCardSelect.bind(this)
    };

    componentDidMount() {
        const { getStoredPaymentMethods } = this.props;
        getStoredPaymentMethods();
    }

    onCardSelect(public_hash) {
        const { onStoredPaymentMethodSelect } = this.props;

        this.setState({
            selectedStoredPaymentMethod: public_hash
        });

        onStoredPaymentMethodSelect(public_hash);
    }

    render() {
        return (
            <VaultStorage
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VaultStorageContainer);
