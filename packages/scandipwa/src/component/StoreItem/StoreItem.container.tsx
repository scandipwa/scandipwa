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

import StoreItem from './StoreItem.component';
import {
    StoreItemComponentProps,
    StoreItemContainerFunctions,
    StoreItemContainerProps,
    StoreItemContainerState,
} from './StoreItem.type';

/** @namespace Component/StoreItem/Container */
export class StoreItemContainer<
P extends Readonly<StoreItemContainerProps> = Readonly<StoreItemContainerProps>,
S extends StoreItemContainerState = StoreItemContainerState,
> extends PureComponent<P, S> {
    containerFunctions: StoreItemContainerFunctions = {
        getStoreCode: this.getStoreCode.bind(this),
    };

    containerProps(): Pick<StoreItemComponentProps, 'item'>{
        const { item } = this.props;

        return { item };
    }

    getStoreCode(): void {
        const { item: { value }, handleStoreSelect } = this.props;

        handleStoreSelect(value);
    }

    render(): ReactElement {
        return (
            <StoreItem
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default StoreItemContainer;
