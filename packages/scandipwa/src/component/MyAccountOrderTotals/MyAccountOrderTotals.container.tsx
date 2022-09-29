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

import { OrderTabs } from 'Component/MyAccountOrder/MyAccountOrder.config';
import { ReactElement } from 'Type/Common.type';
import { RootState } from 'Util/Store/Store.type';

import MyAccountOrderTotals from './MyAccountOrderTotals.component';
import { colSpanCounts, colSpanCountsMobile } from './MyAccountOrderTotals.config';
import {
    MyAccountOrderTotalsComponentProps,
    MyAccountOrderTotalsContainerMapDispatchProps,
    MyAccountOrderTotalsContainerMapStateProps,
    MyAccountOrderTotalsContainerProps,
    MyAccountOrderTotalsContainerPropsKeys,
    MyAccountOrderTotalsContainerState,
} from './MyAccountOrderTotals.type';

import './MyAccountOrderTotals.style';

/** @namespace Component/MyAccountOrderTotals/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): MyAccountOrderTotalsContainerMapStateProps => ({
    isMobile: state.ConfigReducer.device.isMobile,
});

/** @namespace Component/MyAccountOrderTotals/Container/mapDispatchToProps */
export const mapDispatchToProps = (): MyAccountOrderTotalsContainerMapDispatchProps => ({});

/** @namespace Component/MyAccountOrderTotals/Container */
export class MyAccountOrderTotalsContainer extends PureComponent<
MyAccountOrderTotalsContainerProps, MyAccountOrderTotalsContainerState
> {
    __construct(props: MyAccountOrderTotalsContainerProps): void {
        super.__construct?.(props);
        const { activeTab, isMobile } = this.props;

        this.state = this.getColSpanCounts(activeTab, isMobile);
    }

    componentDidUpdate(prevProps: MyAccountOrderTotalsContainerProps): void {
        const { isMobile: prevIsMobile } = prevProps;
        const { isMobile } = this.props;

        if (isMobile !== prevIsMobile) {
            this.setColSpanCount();
        }
    }

    setColSpanCount(): void {
        const { activeTab, isMobile } = this.props;

        this.setState(this.getColSpanCounts(activeTab, isMobile));
    }

    getColSpanCounts(
        activeTab: OrderTabs,
        isMobile: boolean,
    ): Pick<MyAccountOrderTotalsContainerState, 'colSpanLabelCount' | 'colSpanPriceCount'> {
        if (isMobile) {
            const defaultSpanCount = {
                colSpanPriceCount: 2,
                colSpanLabelCount: 3,
            };

            if (activeTab !== OrderTabs.ORDER_REFUNDS) {
                return defaultSpanCount;
            }

            return colSpanCountsMobile[ activeTab ] ?? defaultSpanCount;
        }

        const defaultSpanCount = {
            colSpanPriceCount: 1,
            colSpanLabelCount: 4,
        };

        if (activeTab !== OrderTabs.ORDER_REFUNDS) {
            return defaultSpanCount;
        }

        return colSpanCounts[ activeTab ] ?? defaultSpanCount;
    }

    containerProps(): Pick<MyAccountOrderTotalsComponentProps, MyAccountOrderTotalsContainerPropsKeys> {
        const { total, activeTab } = this.props;
        const { colSpanPriceCount, colSpanLabelCount } = this.state;

        return {
            total,
            activeTab,
            colSpanPriceCount,
            colSpanLabelCount,
        };
    }

    render(): ReactElement {
        return (
            <MyAccountOrderTotals
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountOrderTotalsContainer);
