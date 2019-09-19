import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Braintree.style';

export const BRAINTREE_CONTAINER_ID = 'BRAINTREE_CONTAINER_ID';

class Braintree extends PureComponent {
    static propTypes = {
        init: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { init } = this.props;
        init();
    }

    render() {
        return (
            <div
              block="Braintree"
              id={ BRAINTREE_CONTAINER_ID }
            />
        );
    }
}

export default Braintree;
