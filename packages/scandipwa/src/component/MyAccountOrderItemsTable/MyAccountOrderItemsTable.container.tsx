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
import { connect } from 'react-redux';

import { ReactElement } from 'Type/Common.type';
import { RootState } from 'Util/Store/Store.type';

import MyAccountOrderItemsTable from './MyAccountOrderItemsTable.component';
import {
    MyAccountOrderItemsTableComponentProps,
    MyAccountOrderItemsTableComponentPropsKeys,
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
<<<<<<< HEAD:packages/scandipwa/src/component/MyAccountOrderItemsTable/MyAccountOrderItemsTable.container.tsx
export class MyAccountOrderItemsTableContainer extends PureComponent<MyAccountOrderItemsTableContainerProps> {
    containerProps(): Pick<
    MyAccountOrderItemsTableComponentProps,
    MyAccountOrderItemsTableComponentPropsKeys
    > {
=======
export class MyAccountOrderItemsTableContainer extends PureComponent {
    static propTypes = {
        isMobile: PropTypes.bool.isRequired,
        activeTab: PropTypes.string.isRequired,
        items: OrderTabType.isRequired,
        total: OrderTotalType.isRequired,
        allOrderItems: OrderProductsType.isRequired,
        id: PropTypes.string.isRequired,
        isPrintPage: PropTypes.bool
    };

    static defaultProps = {
        isPrintPage: false
    };

    containerProps() {
>>>>>>> scandipwa/master:packages/scandipwa/src/component/MyAccountOrderItemsTable/MyAccountOrderItemsTable.container.js
        const {
            isMobile,
            items,
            activeTab,
            total,
            allOrderItems,
            id,
            isPrintPage
        } = this.props;

        return {
            isMobile,
            items,
            activeTab,
            total,
            allOrderItems,
            id,
            isPrintPage
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
