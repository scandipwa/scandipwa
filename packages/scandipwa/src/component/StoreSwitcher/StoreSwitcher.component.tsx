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

import ChevronIcon from 'Component/ChevronIcon';
import { Directions } from 'Component/ChevronIcon/ChevronIcon.config';
import ClickOutside from 'Component/ClickOutside';
import Field from 'Component/Field';
import { FieldType } from 'Component/Field/Field.config';
import StoreItem from 'Component/StoreItem';
import { ReactElement } from 'Type/Common.type';

import { FormattedStore, StoreSwitcherComponentProps } from './StoreSwitcher.type';

import './StoreSwitcher.style';

/** @namespace Component/StoreSwitcher/Component */
export class StoreSwitcherComponent<
P extends Readonly<StoreSwitcherComponentProps> = Readonly<StoreSwitcherComponentProps>,
S extends StoreSwitcherComponentState = StoreSwitcherComponentState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<StoreSwitcherComponentProps> = {
        storeLabel: '',
    };

    renderStore(item: FormattedStore): ReactElement {
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

    renderMobileStoreSwitcher(): ReactElement {
        const {
            storeList,
            handleStoreSelect,
            currentStoreCode,
        } = this.props;

        return (
            <div block="StoreSwitcher">
                <Field
                  type={ FieldType.SELECT }
                  attr={ {
                      id: 'StoreSwitcher',
                      name: 'StoreSwitcher',
                      defaultValue: currentStoreCode,
                      noPlaceholder: true,
                  } }
                  events={ {
                      onChange: handleStoreSelect,
                  } }
                  options={ storeList }
                />
            </div>
        );
    }

    renderDesktopStoreSwitcher(): ReactElement {
        const {
            storeList,
            onStoreSwitcherOutsideClick,
            onStoreSwitcherClick,
            isOpened,
            storeLabel,
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
                        <ChevronIcon direction={ isOpened ? Directions.TOP : Directions.BOTTOM } />
                    </button>

                    <div block="StoreSwitcher" elem="StoreList" mods={ mods }>
                        { storeList.map(this.renderStore.bind(this)) }
                    </div>
                </ClickOutside>
            </div>
        );
    }

    render(): ReactElement {
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

export default StoreSwitcherComponent;
