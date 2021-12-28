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

import ChevronIcon from 'Component/ChevronIcon';
import { BOTTOM, TOP } from 'Component/ChevronIcon/ChevronIcon.config';
import ClickOutside from 'Component/ClickOutside';
import Field from 'Component/Field';
import FIELD_TYPE from 'Component/Field/Field.config';
import StoreItem from 'Component/StoreItem';
import { DeviceType } from 'Type/Device.type';

import './StoreSwitcher.style';

/** @namespace Component/StoreSwitcher/Component */
export class StoreSwitcher extends PureComponent {
    static propTypes = {
        storeList: PropTypes.arrayOf(
            PropTypes.objectOf(
                PropTypes.string
            )
        ).isRequired,
        isOpened: PropTypes.bool.isRequired,
        currentStoreCode: PropTypes.string.isRequired,
        handleStoreSelect: PropTypes.func.isRequired,
        onStoreSwitcherClick: PropTypes.func.isRequired,
        onStoreSwitcherOutsideClick: PropTypes.func.isRequired,
        storeLabel: PropTypes.string,
        device: DeviceType.isRequired
    };

    static defaultProps = {
        storeLabel: ''
    };

    renderStore(item) {
        const { handleStoreSelect } = this.props;
        const { value } = item;

        return (
            <StoreItem
              key={ value }
              item={ item }
              handleStoreSelect={ handleStoreSelect }
            />
        );
    }

    renderMobileStoreSwitcher() {
        const {
            storeList,
            handleStoreSelect,
            currentStoreCode
        } = this.props;

        return (
            <div block="StoreSwitcher">
                <Field
                  type={ FIELD_TYPE.select }
                  attr={ {
                      id: 'StoreSwitcher',
                      name: 'StoreSwitcher',
                      defaultValue: currentStoreCode,
                      noPlaceholder: true
                  } }
                  events={ {
                      onChange: handleStoreSelect
                  } }
                  options={ storeList }
                />
            </div>
        );
    }

    renderDesktopStoreSwitcher() {
        const {
            storeList,
            onStoreSwitcherOutsideClick,
            onStoreSwitcherClick,
            isOpened,
            storeLabel
        } = this.props;

        const mods = { isOpen: isOpened };

        return (
            <div block="StoreSwitcher">
                <ClickOutside onClick={ onStoreSwitcherOutsideClick }>
                    <button
                      block="StoreSwitcher"
                      elem="Title"
                      mods={ mods }
                      onClick={ onStoreSwitcherClick }
                    >
                        { storeLabel }
                        <ChevronIcon direction={ isOpened ? TOP : BOTTOM } />
                    </button>

                    <div block="StoreSwitcher" elem="StoreList" mods={ mods }>
                        { storeList.map(this.renderStore.bind(this)) }
                    </div>
                </ClickOutside>
            </div>
        );
    }

    render() {
        const { storeList, device } = this.props;

        if (storeList.length <= 1) {
            return null;
        }

        if (device.isMobile) {
            return this.renderMobileStoreSwitcher();
        }

        return this.renderDesktopStoreSwitcher();
    }
}

export default StoreSwitcher;
