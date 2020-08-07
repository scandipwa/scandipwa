import './HorizontalProductCard.style';

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import CartItemPrice from 'Component/CartItemPrice';
import Loader from 'Component/Loader';

export class HorizontalProductCard extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        attrs: PropTypes.arrayOf(PropTypes.string),

        qty: PropTypes.number.isRequired,
        onQtyChange: PropTypes.func.isRequired,
        qtySelectionVisible: PropTypes.bool,

        price: PropTypes.number.isRequired,
        currency_code: PropTypes.string.isRequired,

        actions: PropTypes.node,
        footer: PropTypes.node,

        isLoading: PropTypes.bool
    };

    static defaultProps = {
        attrs: [],
        qtySelectionVisible: false,
        isLoading: false,

        actions: null,
        footer: null
    };

    renderImage() {
        const { name, image } = this.props;

        return (
            <img
              alt={ name }
              src={ image }
              width="100%"
              height="100%"
            />
        );
    }

    renderName() {
        const { name } = this.props;

        return (
            <p>{ name }</p>
        );
    }

    renderAttributes() {
        const { attrs } = this.props;

        if (attrs.length < 1) {
            return null;
        }

        return (
            <ul block="HorizontalProductCard" elem="AttributeList">
                { attrs.map(this.getAttributeElement) }
            </ul>
        );
    }

    getAttributeElement(attributeStr) {
        return (
            <li key={ attributeStr } block="HorizontalProductCard" elem="AttributeItem">{ attributeStr }</li>
        );
    }

    getQuantityButton = (text, action) => (
        <button
          onClick={ action }
          block="HorizontalProductCard"
          elem="QuantityChangeButton"
        >
            <span block="HorizontalProductCard" elem="QuantityChangeButtonText">
                { text }
            </span>
        </button>
    );

    renderQuantity() {
        const { qty, qtySelectionVisible } = this.props;

        return (
            <>
                Qty:
                <span block="HorizontalProductCard" elem="Quantity">
                    { qtySelectionVisible && this.getQuantityButton('-', this.decreaseQuantity) }
                    { qty }
                    { qtySelectionVisible && this.getQuantityButton('+', this.increaseQuantity) }
                </span>
            </>
        );
    }

    changeQuantity(amount) {
        const { qty, onQtyChange } = this.props;
        onQtyChange(qty + amount);
    }

    decreaseQuantity = () => {
        this.changeQuantity(-1);
    };

    increaseQuantity = () => {
        this.changeQuantity(1);
    };

    renderPrice() {
        const { price, currency_code } = this.props;
        return (
            <CartItemPrice
              row_total={ price }
              currency_code={ currency_code }
              mix={ {
                  block: 'HorizontalProductCard',
                  elem: 'Price'
              } }
            />
        );
    }

    renderActions() {
        const { actions } = this.props;
        return actions;
    }

    renderFooter() {
        const { footer } = this.props;
        return footer;
    }

    renderProductInfo(hasWrapper = false) {
        if (hasWrapper) {
            return (
                <div block="HorizontalProductCard" elem="ProductInfoWrapper">
                    { this.renderProductInfo(false) }
                </div>
            );
        }

        return (
            <>
                <div block="HorizontalProductCard" elem="ImageWrapper">
                    { this.renderImage() }
                </div>

                <div block="HorizontalProductCard" elem="NameWrapper">
                    { this.renderName() }
                </div>

                <div block="HorizontalProductCard" elem="AttributesWrapper">
                    { this.renderAttributes() }
                </div>
            </>
        );
    }

    renderQuantityAndActions(hasWrapper = false) {
        if (hasWrapper) {
            return (
                <div block="HorizontalProductCard" elem="QuantityAndActionsWrapper">
                    { this.renderQuantityAndActions(false) }
                </div>
            );
        }

        return (
            <>
                <div block="HorizontalProductCard" elem="QuantityWrapper">
                        { this.renderQuantity() }
                </div>

                <div block="HorizontalProductCard" elem="ActionsWrapper">
                    { this.renderActions() }
                </div>
            </>
        );
    }

    render() {
        const { isLoading } = this.props;
        return (
            <div block="HorizontalProductCard" mods={ { expandMode: 'block' } }>
                <Loader isLoading={ isLoading } />
                    { this.renderProductInfo() }

                    { this.renderQuantityAndActions() }

                    <div block="HorizontalProductCard" elem="PriceWrapper">
                        { this.renderPrice() }
                    </div>

                    <div block="HorizontalProductCard" elem="Footer">
                        { this.renderFooter() }
                    </div>
            </div>
        );
    }
}

export default HorizontalProductCard;
