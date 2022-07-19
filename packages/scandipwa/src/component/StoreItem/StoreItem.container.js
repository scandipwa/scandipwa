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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { StoreItemType } from 'Type/Config.type';

import StoreItem from './StoreItem.component';

/** @namespace Component/StoreItem/Container */
export class StoreItemContainer extends PureComponent {
    static propTypes = {
        item: StoreItemType.isRequired,
        handleStoreSelect: PropTypes.func.isRequired
    };

    containerFunctions = {
        getStoreCode: this.getStoreCode.bind(this)
    };

    containerProps() {
        const { item } = this.props;

        return { item };
    }

    getStoreCode() {
        const { item: { value }, handleStoreSelect } = this.props;

        handleStoreSelect(value);
    }

    render() {
        return (
            <StoreItem
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default StoreItemContainer;
