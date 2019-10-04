/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import PropTypes from 'prop-types';
import './MyAccountOrderTable.style';

import Loader from 'Component/Loader';
import KeyValueTable from 'Component/KeyValueTable';
import { orderType } from 'Type/Account';

class MyAccountOrderTable extends KeyValueTable {
    static propTypes = {
        order: orderType.isRequired,
        showActions: PropTypes.bool,
        title: PropTypes.string,
        onViewClick: PropTypes.func.isRequired
    };

    static defaultProps = {
        showActions: false
    };

    get dataPairArray() {
        const { order } = this.props;
        const { base_order_info = {} } = order;

        return [
            {
                key: 'id',
                label: `${__('Order')} №`,
                source: base_order_info
            },
            {
                key: 'created_at',
                label: __('Date'),
                source: base_order_info
            },
            {
                key: 'status_label',
                label: __('Status Label'),
                source: base_order_info
            },
            {
                key: 'grand_total',
                label: __('Order - Total'),
                source: base_order_info
            }
        ];
    }

    renderActions() {
        const {
            onViewClick,
            showActions
        } = this.props;

        if (!showActions) return null;

        return (
            <>
                <button
                  block="Button"
                  onClick={ onViewClick }
                >
                    { __('View details') }
                </button>
            </>
        );
    }

    render() {
        const { order } = this.props;

        return (
            <div block="MyAccountOrderTable">
                <Loader isLoading={ !order } />
                { this.renderTable() }
                { this.renderActions() }
            </div>
        );
    }
}

export default MyAccountOrderTable;
