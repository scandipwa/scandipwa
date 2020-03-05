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

import { PureComponent } from 'react';
import Field from 'Component/Field';
import PropTypes from 'prop-types';
import { formatCurrency } from 'Util/Price';
import './CartGiftCard.style';

class CartGiftCard extends PureComponent {
    static propTypes = {
        appliedGiftCards: PropTypes.array.isRequired,
        handleApplyGiftCardToCart: PropTypes.func.isRequired,
        handleRemoveGiftCardFromCart: PropTypes.func.isRequired
    };

    state = {
        enteredGiftCardCode: '',
        selectOptions: [],
        selectedOption: ''
    };

    componentDidMount() {
        this.updateSelectOptions();
    }

    componentDidUpdate(prevProps) {
        const { appliedGiftCards } = this.props;
        const { appliedGiftCards: prevGiftCards } = prevProps;

        if (appliedGiftCards !== prevGiftCards) {
            this.updateSelectOptions();
        }
    }

    handleGiftCardCodeChange = (enteredGiftCardCode) => {
        this.setState({ enteredGiftCardCode });
    };

    handleApplyGiftCard = (e) => {
        e.preventDefault();

        const { handleApplyGiftCardToCart } = this.props;
        const { enteredGiftCardCode } = this.state;

        handleApplyGiftCardToCart(enteredGiftCardCode);
    };

    handleRemoveGiftCard = (e) => {
        e.preventDefault();

        const { handleRemoveGiftCardFromCart } = this.props;
        const { selectedOption } = this.state;

        this.setState({ selectedOption: '' });
        handleRemoveGiftCardFromCart(selectedOption);
    };

    updateSelectOptions() {
        const { appliedGiftCards } = this.props;
        const selectOptions = [];

        appliedGiftCards.map(({ code, applied_balance: { value, currency } }) => (
            selectOptions.push({ id: code, value: code, label: `${ code } - ${ formatCurrency(currency) }${ value }` })
        ));

        this.setState({ selectOptions });
    }

    handleSelectedOption(value) {
        this.setState({ selectedOption: value });
    }

    renderApplyGiftCard() {
        const { enteredGiftCardCode } = this.state;

        return (
            <>
                <Field
                  type="text"
                  id="giftCardCode"
                  name="giftCardCode"
                  value={ enteredGiftCardCode }
                  placeholder={ __('Gift Card Code') }
                  onChange={ this.handleGiftCardCodeChange }
                  mix={ { block: 'CartGiftCard', elem: 'Input' } }
                />
                <button
                  block="CartGiftCard"
                  elem="Button"
                  type="button"
                  mix={ { block: 'Button' } }
                  disabled={ !enteredGiftCardCode }
                  onClick={ this.handleApplyGiftCard }
                >
                    { __('Apply Gift Card') }
                </button>
            </>
        );
    }

    renderRemoveGiftCard() {
        const { selectOptions, selectedOption } = this.state;

        return (
            <>
                <Field
                  id="giftCardCodeRemove"
                  name="giftCardCodeRemove"
                  type="select"
                  placeholder={ __('Choose gift card to remove') }
                  selectOptions={ selectOptions }
                  value={ selectedOption }
                    /* eslint-disable-next-line react/jsx-no-bind */
                  onChange={ value => this.handleSelectedOption(value) }
                  mix={ { block: 'CartGiftCard', elem: 'Select' } }
                />
                <button
                  block="CartGiftCard"
                  elem="Button"
                  type="button"
                  mix={ { block: 'Button' } }
                  disabled={ !selectedOption }
                  onClick={ this.handleRemoveGiftCard }
                >
                    { __('Remove Gift Card') }
                </button>
            </>
        );
    }

    render() {
        const { appliedGiftCards } = this.props;

        return (
            <>
                <form block="CartGiftCard" onSubmit={ this.handleApplyGiftCard }>
                    { this.renderApplyGiftCard() }
                </form>
                { appliedGiftCards.length > 0 && (
                    <form block="CartGiftCard" onSubmit={ this.handleRemoveGiftCard }>
                        { this.renderRemoveGiftCard() }
                    </form>
                ) }
            </>
        );
    }
}

export default CartGiftCard;
