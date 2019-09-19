import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './CheckoutPayment.style';

class CheckoutPayment extends PureComponent {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
        isSelected: PropTypes.bool,
        method: PropTypes.shape({
            code: PropTypes.string,
            title: PropTypes.string
        }).isRequired
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
