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

import { ReactElement } from 'Type/Common.type';
import { noopFn } from 'Util/Common';

import StoreInPickUpStoreComponent from './StoreInPickUpStore.component';
import {
    StoreInPickUpStoreComponentProps,
    StoreInPickUpStoreContainerFunctions,
    StoreInPickUpStoreContainerProps,
    StoreInPickUpStoreContainerPropsKeys
} from './StoreInPickUpStore.type';

/** @namespace Component/StoreInPickUpStore/Container */
export class StoreInPickUpStoreContainer extends PureComponent<StoreInPickUpStoreContainerProps> {
    static defaultProps: Partial<StoreInPickUpStoreContainerProps> = {
        selectStore: noopFn,
        isSelectedStore: false,
        store: null
    };

    containerFunctions: StoreInPickUpStoreContainerFunctions = {
        handleSelectStore: this.handleSelectStore.bind(this)
    };

    containerProps(): Pick<StoreInPickUpStoreComponentProps, StoreInPickUpStoreContainerPropsKeys> {
        const { store, isSelectedStore } = this.props;

        return { store, isSelectedStore };
    }

    handleSelectStore(): void {
        const { selectStore, store } = this.props;

        if (store) {
            selectStore(store);
        }
    }

    render(): ReactElement {
        return (
            <StoreInPickUpStoreComponent
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default StoreInPickUpStoreContainer;
