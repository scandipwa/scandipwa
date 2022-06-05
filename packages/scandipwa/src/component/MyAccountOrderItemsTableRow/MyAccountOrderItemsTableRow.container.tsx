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

import { OrderTabs } from 'Component/MyAccountOrder/MyAccountOrder.config';
import { ReactElement } from 'Type/Common.type';
import { RootState } from 'Util/Store/Store.type';

import MyAccountOrderItemsTableRow from './MyAccountOrderItemsTableRow.component';
import { OrderColumnSpanCount } from './MyAccountOrderItemsTableRow.config';
import {
    MyAccountOrderItemsTableRowComponentProps,
    MyAccountOrderItemsTableRowContainerMapDispatchProps,
    MyAccountOrderItemsTableRowContainerMapStateProps,
    MyAccountOrderItemsTableRowContainerProps,
    MyAccountOrderItemsTableRowContainerPropsKeys
} from './MyAccountOrderItemsTableRow.type';

/** @namespace Component/MyAccountOrderItemsTableRow/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): MyAccountOrderItemsTableRowContainerMapStateProps => ({
    isMobile: state.ConfigReducer.device.isMobile
});

/** @namespace Component/MyAccountOrderItemsTableRow/Container/mapDispatchToProps */
export const mapDispatchToProps = (): MyAccountOrderItemsTableRowContainerMapDispatchProps => ({});

/** @namespace Component/MyAccountOrderItemsTableRow/Container */
export class MyAccountOrderItemsTableRowContainer extends PureComponent<MyAccountOrderItemsTableRowContainerProps> {
    static defaultProps: Partial<MyAccountOrderItemsTableRowContainerProps> = {
        selectedOptions: [],
        enteredOptions: [],
        comments: []
    };

    containerProps(): Pick<MyAccountOrderItemsTableRowComponentProps, MyAccountOrderItemsTableRowContainerPropsKeys> {
        const {
            product,
            activeTab,
            enteredOptions,
            selectedOptions,
            isMobile,
            comments
        } = this.props;

        return {
            product,
            activeTab,
            enteredOptions,
            selectedOptions,
            isMobile,
            comments,
            colSpanCount: this.getOrderColumnSpanCount()
        };
    }

    getOrderColumnSpanCount(): number {
        const { activeTab } = this.props;

        switch (activeTab) {
        case OrderTabs.ORDER_REFUNDS: {
            return OrderColumnSpanCount.ORDER_REFUNDS;
        }
        case OrderTabs.ORDER_SHIPMENTS: {
            return OrderColumnSpanCount.ORDER_SHIPMENTS;
        }
        default: {
            return OrderColumnSpanCount.DEFAULT;
        }
        }
    }

    render(): ReactElement {
        return (
            <MyAccountOrderItemsTableRow
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountOrderItemsTableRowContainer);
