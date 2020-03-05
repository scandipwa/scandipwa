import { Field } from 'Util/Query';

export class GiftCardQuery {
    getGiftCardBalance(code) {
        return new Field('giftCardAccount')
            .addArgument('input', 'GiftCardAccountInput!', code)
            .addFieldList([
                'code',
                'expiration_date',
                this._getBalance()
            ]);
    }

    redeemGiftCardBalanceAsStoreCredit(giftCardCode) {
        return new Field('redeemGiftCardBalanceAsStoreCredit')
            .addArgument('input', 'GiftCardAccountInput!', giftCardCode)
            .addFieldList([
                'code',
                'expiration_date',
                this._getBalance()
            ]);
    }

    _getBalance() {
        return new Field('balance')
            .addFieldList([
                'value',
                'currency'
            ]);
    }
}

export default new GiftCardQuery();
