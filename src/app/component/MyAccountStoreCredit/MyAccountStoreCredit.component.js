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
import { PureComponent } from 'react';
import Loader from 'Component/Loader';
import { formatCurrency } from 'Util/Price';
import { customerType } from 'Type/Account';

import './MyAccountStoreCredit.style';


class MyAccountStoreCredit extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        customer: customerType.isRequired
    };

    renderStoreCreditNotActivated() {
        return (
            <h4>{ __('Store credit functionality is not activated!') }</h4>
        );
    }

    renderBalanceHistory(items) {
        return (
            items.map(({ balance_change, actual_balance, date_time_changed }, id) => (
                <tbody key={ `${ balance_change }-${ actual_balance }-${ date_time_changed }` }>
                    <tr>
                        <td>{ id + 1 }</td>
                        <td>{ `${ formatCurrency(balance_change.currency) }${ balance_change.value }` }</td>
                        <td>{ `${ formatCurrency(actual_balance.currency) }${ actual_balance.value }` }</td>
                        <td>{ date_time_changed }</td>
                    </tr>

                </tbody>
            ))
        );
    }

    renderStoreCreditHistory() {
        const { customer: { store_credit: { balance_history: { items } } } } = this.props;

        return (
            <table block="MyAccountStoreCredit" elem="Table">
                <thead>
                <tr>
                    <th>{ __('No.') }</th>
                    <th>{ __('Balance Change') }</th>
                    <th>{ __('New Balance') }</th>
                    <th>{ __('Date Time Changed') }</th>
                </tr>
                </thead>
                    { this.renderBalanceHistory(items) }
            </table>
        );
    }

    renderStoreCreditData() {
        const { customer: { store_credit: { enabled, current_balance } } } = this.props;

        if (!enabled) return this.renderStoreCreditNotActivated();

        return (
            <>
                <div block="MyAccountStoreCredit" elem="CurrentBalance">
                    { `Your current balance: ${ formatCurrency(current_balance.currency) }${ current_balance.value }` }
                </div>
                { this.renderStoreCreditHistory() }
            </>
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
                <div block="MyAccountStoreCredit">
                    <Loader isLoading={ isLoading } />
                    { !isLoading && (
                        this.renderStoreCreditData()
                    ) }
                </div>
        );
    }
}

export default MyAccountStoreCredit;
