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

import Image from 'Component/Image';
import { DeviceType } from 'Type/Device';
import { getCardIconByType } from 'Util/Card';

import './VaultStorageItem.style';

/** @namespace Component/VaultStorageItem/Component */

export class VaultStorageItem extends PureComponent {
    static propTypes = {
        paymentMethod: PropTypes.object.isRequired,
        handleDeleteStoredPaymentMethod: PropTypes.func.isRequired,
        isCheckout: PropTypes.bool.isRequired,
        handleOnClick: PropTypes.func.isRequired,
        device: DeviceType.isRequired,
        isSelected: PropTypes.bool
    };

    static defaultProps = {
        isSelected: false
    };

    renderCardIcon() {
        const {
            paymentMethod: {
                details: {
                    type
                }
            },
            isCheckout
        } = this.props;

        return (
            <span
              block="VaultStorageItem"
              elem="Icon"
              mods={ { isCheckout } }
            >
              <Image src={ getCardIconByType(type) } />
            </span>
        );
    }

    renderMyAccountCard() {
        const {
            paymentMethod: {
                details: {
                    expirationDate,
                    maskedCC
                }
            } = {},
            handleDeleteStoredPaymentMethod,
            device
        } = this.props;

        if (device.isMobile) {
            return this.renderMyAccountCardMobile();
        }

        return (
            <tr
              block="VaultStorageCard"
              elem="MyAccount"
            >
                <td>{ `${ __('Ending') } ${ maskedCC }` }</td>
                <td>{ expirationDate }</td>
                <td>{ this.renderCardIcon() }</td>
                <td>
                    <button
                      block="VaultStorageCard"
                      elem="Button"
                      type="button"
                      mix={ { block: 'Button', mods: { isHollow: true } } }
                      onClick={ handleDeleteStoredPaymentMethod }
                    >
                        { __('Delete') }
                    </button>
                </td>
            </tr>
        );
    }

    renderMyAccountCardMobile() {
        const {
            paymentMethod: {
                details: {
                    expirationDate,
                    maskedCC
                }
            } = {},
            handleDeleteStoredPaymentMethod
        } = this.props;

        return (
            <tbody>
                <tr>
                    <th>{ __('Card Number') }</th>
                    <td>{ `${ __('Ending') } ${ maskedCC }` }</td>
                </tr>
                <tr>
                    <th>{ __('Expiration Date') }</th>
                    <td>{ expirationDate }</td>
                </tr>
                    <th>{ __('Type') }</th>
                    <td>{ this.renderCardIcon() }</td>
                <tr>
                    <th>{ __('Actions') }</th>
                    <td>
                        <button
                          block="VaultStorageCard"
                          elem="Button"
                          type="button"
                          mix={ { block: 'Button', mods: { isHollow: true } } }
                          onClick={ handleDeleteStoredPaymentMethod }
                        >
                            { __('Delete') }
                        </button>
                    </td>
                </tr>
            </tbody>
        );
    }

    renderCard() {
        const {
            paymentMethod: {
                details: {
                    expirationDate,
                    maskedCC
                }
            } = {},
            handleOnClick,
            isSelected
        } = this.props;

        return (
            <li
              block="VaultStorageItem"
              elem="Card"
            >
                <button
                  block="VaultStorageItem"
                  elem="Button"
                  type="button"
                  mods={ { isSelected } }
                  onClick={ handleOnClick }
                >
                    { this.renderCardIcon() }
                    <span>{ `${ __('ending ') } ${ maskedCC }` }</span>
                    <span>{ `(${ __('expires: ') } ${ expirationDate })` }</span>
                </button>
            </li>
        );
    }

    renderContent() {
        const { isCheckout } = this.props;

        if (!isCheckout) {
            return this.renderMyAccountCard();
        }

        return this.renderCard();
    }

    render() {
        return this.renderContent();
    }
}

export default VaultStorageItem;
