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
import { TotalsType } from 'Type/MiniCart';
import Loader from 'Component/Loader';
import Field from 'Component/Field';
import { formatCurrency } from 'Util/Price';

import './MyAccountMyGiftCards.style';

class MyAccountMyGiftCards extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        getGiftCardData: PropTypes.func.isRequired,
        redeemGiftCardBalanceAsStoreCredit: PropTypes.func.isRequired,
        giftCardData: PropTypes.object.isRequired,
        totals: TotalsType.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            giftCardCode: ''
        };
    }

    onChange = (giftCardCode) => {
        this.setState({ giftCardCode });
    };

    handleGetGiftCardData = (e) => {
        e.preventDefault();

        const { getGiftCardData } = this.props;
        const { giftCardCode } = this.state;

        getGiftCardData(giftCardCode);
    };

    handleRedeemGiftCard = (e) => {
        e.preventDefault();

        const { redeemGiftCardBalanceAsStoreCredit } = this.props;
        const { giftCardCode } = this.state;

        redeemGiftCardBalanceAsStoreCredit(giftCardCode);
    };

    renderRedeemAsStoreCredit() {
        return (
            <button
              block="MyAccountMyGiftCards"
              elem="Button"
              type="button"
              mix={ { block: 'Button' } }
              onClick={ this.handleRedeemGiftCard }
            >
                { __('Redeem gift card as store credit') }
            </button>
        );
    }

    renderGiftCardData() {
        const { giftCardData: { giftCardAccount }, totals: { applied_store_credit } } = this.props;
        const { code, expiration_date, balance: { value, currency } } = giftCardAccount;

        return (
            <div block="MyAccountMyGiftCards" elem="CardDataWrapper">
                <div>{ `Gift card code: ${ code }` }</div>
                <div>{ `Expiration date: ${ expiration_date || 'Never' }` }</div>
                <div>{ `Balance: ${ formatCurrency(currency) }${ value }` }</div>
                { applied_store_credit && applied_store_credit.enabled && (
                    this.renderRedeemAsStoreCredit()
                ) }
            </div>
        );
    }

    render() {
        const { isLoading, giftCardData } = this.props;
        const { giftCardCode } = this.state;

        return (
            <div block="MyAccountMyGiftCards">
                <Loader isLoading={ isLoading } />
                <h4>{ __('Enter gift card code to get information about gift card status') }</h4>
                <form block="MyAccountMyGiftCardsForm" onSubmit={ this.handleGetGiftCardData }>
                    <Field
                      type="text"
                      id="myAccountGiftCard"
                      name="myAccountGiftCard"
                      value={ giftCardCode }
                      placeholder={ __('Gift Card Code') }
                      onChange={ this.onChange }
                      mix={ { block: 'MyAccountMyGiftCards', elem: 'Input' } }
                    />
                    <button
                      block="MyAccountMyGiftCards"
                      elem="Button"
                      type="button"
                      mix={ { block: 'Button' } }
                      disabled={ !giftCardCode }
                      onClick={ this.handleGetGiftCardData }
                    >
                        { __('Get Information') }
                    </button>
                </form>
                { Object.keys(giftCardData).length > 0 && (
                    this.renderGiftCardData()
                ) }
            </div>
        );
    }
}

export default MyAccountMyGiftCards;
