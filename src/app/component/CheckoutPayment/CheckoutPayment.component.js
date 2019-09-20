import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { paymentMethodType } from 'Type/Checkout';
import './CheckoutPayment.style';

class CheckoutPayment extends PureComponent {
    static propTypes = {
        method: paymentMethodType.isRequired,
        onClick: PropTypes.func.isRequired,
        isSelected: PropTypes.bool
    };

    static defaultProps = {
        isSelected: false
    };

    onClick = () => {
        const {
            onClick,
            method
        } = this.props;

        onClick(method);
    };

    render() {
        const {
            isSelected,
            method: { title }
        } = this.props;

        return (
            <li block="CheckoutPayment">
                <button
                  block="CheckoutPayment"
                  mods={ { isSelected } }
                  elem="Button"
                  onClick={ this.onClick }
                  type="button"
                >
                    { title }
                </button>
            </li>
        );
    }
}

export default CheckoutPayment;
