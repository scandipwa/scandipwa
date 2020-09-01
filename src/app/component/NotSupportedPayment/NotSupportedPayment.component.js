import './NotSupportedPayment.style';

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

export class NotSupportedPayment extends PureComponent {
    static propTypes = {
        disableButton: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { disableButton } = this.props;
        disableButton();
    }

    render() {
        return (
            <div block="NotSupportedPayment">
                <p>{ __('This payment method is not supported yet.') }</p>
            </div>
        );
    }
}

export default NotSupportedPayment;
