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

import Popup from 'Component/Popup';
import Loader from 'Component/Loader';
import { orderType } from 'Type/Account';
import KeyValueTable from 'Component/KeyValueTable';

export const ORDER_POPUP_ID = 'MyAccountOrderPopup';
export const VIEW_ORDER = 'VIEW_ORDER';

class MyAccountOrderPopup extends KeyValueTable {
    static propTypes = {
        payload: PropTypes.shape({
            order: orderType
        })
    };

    static defaultProps = {
        payload: { order: {} },
        title: null
    };

    get dataPairArray() {
        const { payload: { order } } = this.props;
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
                key: 'total_qty_ordered',
                label: __('Quantity'),
                source: base_order_info
            },
            {
                key: 'status',
                label: __('Status'),
                source: base_order_info
            },
            {
                key: 'status_label',
                label: __('Status Label'),
                source: base_order_info
            },
            {
                key: 'sub_total',
                label: __('Subtotal'),
                source: base_order_info
            },
            {
                key: 'grand_total',
                label: __('Order - Total'),
                source: base_order_info
            }
        ];
    }

    render() {
        const { payload: { order } } = this.props;
        return (
            <Popup
              id={ ORDER_POPUP_ID }
              clickOutside={ false }
              mix={ { block: 'MyAccountOrderPopup' } }
            >
                <Loader isLoading={ !order } />
                { order && this.renderTable() }
            </Popup>
        );
    }
}

export default MyAccountOrderPopup;
