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

import { connect } from 'react-redux';

import { RootState } from 'Util/Store/Store.type';

import CategoryItemsCount from './CategoryItemsCount.component';
import {
    CategoryItemsCountContainerMapDispatchProps,
    CategoryItemsCountContainerMapStateProps,
} from './CategoryItemsCount.type';

/** @namespace Component/CategoryItemsCount/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): CategoryItemsCountContainerMapStateProps => ({
    totalItems: state.ProductListReducer.totalItems,
});

/** @namespace Component/CategoryItemsCount/Container/mapDispatchToProps */
export const mapDispatchToProps = (): CategoryItemsCountContainerMapDispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItemsCount);
