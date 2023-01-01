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

import { StoreItemComponentProps } from './StoreItem.type';

import './StoreItem.style';

/** @namespace Component/StoreItem/Component */
export class StoreItemComponent<
P extends Readonly<StoreItemComponentProps> = Readonly<StoreItemComponentProps>,
S extends StoreItemComponentState = StoreItemComponentState,
> extends PureComponent<P, S> {
    render(): ReactElement {
        const {
            item: { label },
            getStoreCode,
        } = this.props;

        return (
            <button
              block="StoreItem"
              elem="Item"
              onClick={ getStoreCode }
            >
                { label }
            </button>
        );
    }
}

export default StoreItemComponent;
