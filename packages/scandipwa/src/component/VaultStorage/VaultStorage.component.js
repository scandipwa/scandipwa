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

import Loader from 'Component/Loader';
import VaultStorageItem from 'Component/VaultStorageItem';
import { DeviceType } from 'Type/Device';

import './VaultStorage.style';

/** @namespace Component/VaultStorage/Component */

export class VaultStorage extends PureComponent {
    static propTypes = {
        storedPaymentMethods: PropTypes.object.isRequired,
        isLoading: PropTypes.bool.isRequired,
        onCardSelect: PropTypes.func.isRequired,
        selectedStoredPaymentMethod: PropTypes.string.isRequired,
        device: DeviceType.isRequired,
        isCheckout: PropTypes.bool
    };

    static defaultProps = {
        isCheckout: false
    };

    renderVaultHeadingRow() {
        return (
            <tr>
                <th>{ __('Card Number') }</th>
                <th>{ __('Expiration Date') }</th>
                <th>{ __('Type') }</th>
                <th>{ __('Actions') }</th>
            </tr>
        );
    }

    renderVaultCard = (paymentMethod) => {
        const {
            isCheckout,
            selectedStoredPaymentMethod,
            onCardSelect
        } = this.props;
        const {
            public_hash,
            details: {
                type,
                maskedCC
            }
        } = paymentMethod;

        const isSelected = selectedStoredPaymentMethod === public_hash;

        return (
            <VaultStorageItem
              key={ `${ type }-${ maskedCC }` }
              isCheckout={ isCheckout }
              isSelected={ isSelected }
              onCardSelect={ onCardSelect }
              selectedStoredPaymentMethod={ selectedStoredPaymentMethod }
              paymentMethod={ paymentMethod }
            />
        );
    };

    renderVaultRows() {
        const { storedPaymentMethods: { items } } = this.props;

        if (!items || items.length === 0) {
            return this.renderEmptyVault();
        }

        return items.reduceRight(
            (acc, e) => [...acc, this.renderVaultCard(e)],
            []
        );
    }

    renderEmptyVault() {
        const { isCheckout } = this.props;

        if (isCheckout) {
            return this.renderEmptyVaultCheckout();
        }

        return (
            <tr block="VaultStorage" elem="EmptyVault">
                <td colSpan="4">{ __('You have no stored payment methods.') }</td>
            </tr>
        );
    }

    renderEmptyVaultCheckout() {
        return (
            <div block="VaultStorage" elem="EmptyVault">
               { __('You have no stored payment methods.') }
            </div>
        );
    }

    renderTableMobile() {
        return (
            <table block="VaultStorage" elem="Table">
                { this.renderVaultRows() }
            </table>
        );
    }

    renderTable() {
        const { device } = this.props;

        if (device.isMobile) {
            return this.renderTableMobile();
        }

        return (
            <table block="VaultStorage" elem="Table">
                <thead>
                    { this.renderVaultHeadingRow() }
                </thead>
                <tbody>
                    { this.renderVaultRows() }
                </tbody>
            </table>
        );
    }

    renderContent() {
        const { isCheckout, isLoading } = this.props;

        if (isLoading) {
            return null;
        }

        if (!isCheckout) {
            return this.renderTable();
        }

        return (
            <ul
              block="VaultStorage"
              elem="List"
            >
                { this.renderVaultRows() }
            </ul>
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
            <div block="VaultStorage">
                <Loader isLoading={ isLoading } />
                { this.renderContent() }
            </div>
        );
    }
}

export default VaultStorage;
