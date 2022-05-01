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
import { connect } from 'react-redux';

import { ReactElement } from 'Type/Common.type';
import { RootState } from 'Util/Store/Store.type';

import MyAccountOrderItemsTable from './MyAccountOrderItemsTable.component';
import {
    MyAccountOrderItemsTableComponentProps,
    MyAccountOrderItemsTableContainerMapDispatchProps,
    MyAccountOrderItemsTableContainerMapStateProps,
    MyAccountOrderItemsTableContainerProps
} from './MyAccountOrderItemsTable.type';

/** @namespace Component/MyAccountOrderItemsTable/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): MyAccountOrderItemsTableContainerMapStateProps => ({
    isMobile: state.ConfigReducer.device.isMobile
});

/** @namespace Component/MyAccountOrderItemsTable/Container/mapDispatchToProps */
export const mapDispatchToProps = (): MyAccountOrderItemsTableContainerMapDispatchProps => ({});

/** @namespace Component/MyAccountOrderItemsTable/Container */
export class MyAccountOrderItemsTableContainer extends PureComponent<MyAccountOrderItemsTableContainerProps> {
    containerProps(): Pick<
    MyAccountOrderItemsTableComponentProps,
    | 'isMobile'
    | 'items'
    | 'activeTab'
    | 'total'
    | 'allOrderItems'
    > {
        const {
            isMobile,
            items,
            activeTab,
            total,
            allOrderItems
        } = this.props;

        return {
            isMobile,
            items,
            activeTab,
            total,
            allOrderItems
        };
    }

    render(): ReactElement {
        return (
            <MyAccountOrderItemsTable
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountOrderItemsTableContainer);
