/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { PureComponent } from 'react';

import { ReactElement } from 'Type/Common.type';

import StoreItem from './StoreItem.component';
import { StoreItemComponentProps, StoreItemContainerProps } from './StoreItem.type';

/** @namespace Component/StoreItem/Container */
export class StoreItemContainer extends PureComponent<StoreItemContainerProps> {
    containerFunctions = {
        getStoreCode: this.getStoreCode.bind(this)
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
