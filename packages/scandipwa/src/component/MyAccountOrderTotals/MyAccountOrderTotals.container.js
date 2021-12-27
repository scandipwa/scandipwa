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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { OrderTotalType } from 'Type/Order.type';

import MyAccountOrderTotals from './MyAccountOrderTotals.component';
import { colSpanCounts, colSpanCountsMobile } from './MyAccountOrderTotals.config';

import './MyAccountOrderTotals.style';

/** @namespace Component/MyAccountOrderTotals/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isMobile: state.ConfigReducer.device.isMobile
});

/** @namespace Component/MyAccountOrderTotals/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/MyAccountOrderTotals/Container */
export class MyAccountOrderTotalsContainer extends PureComponent {
    static propTypes = {
        total: OrderTotalType.isRequired,
        activeTab: PropTypes.string.isRequired,
        isMobile: PropTypes.bool.isRequired
    };

    __construct(props) {
        super.__construct(props);
        const { activeTab, isMobile } = this.props;

        this.state = this.getColSpanCounts(activeTab, isMobile);
    }

    componentDidUpdate(prevProps) {
        const { isMobile: prevIsMobile } = prevProps;
        const { isMobile } = this.props;

        if (isMobile !== prevIsMobile) {
            this.setColSpanCount();
        }
    }

    setColSpanCount() {
        const { activeTab, isMobile } = this.props;

        this.setState(this.getColSpanCounts(activeTab, isMobile));
    }

    getColSpanCounts(activeTab, isMobile) {
        if (isMobile) {
            const defaultSpanCount = {
                colSpanPriceCount: '2',
                colSpanLabelCount: '3'
            };

            return colSpanCountsMobile[activeTab] ?? defaultSpanCount;
        }

        const defaultSpanCount = {
            colSpanPriceCount: '1',
            colSpanLabelCount: '4'
        };

        return colSpanCounts[activeTab] ?? defaultSpanCount;
    }

    containerProps() {
        const { total } = this.props;
        const { colSpanPriceCount, colSpanLabelCount } = this.state;

        return {
            total,
            colSpanPriceCount,
            colSpanLabelCount
        };
    }

    render() {
        return (
            <MyAccountOrderTotals
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountOrderTotalsContainer);
