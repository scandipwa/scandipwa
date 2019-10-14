import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Braintree.style';
import Loader from 'Component/Loader';

export const BRAINTREE_CONTAINER_ID = 'BRAINTREE_CONTAINER_ID';

class Braintree extends PureComponent {
    static propTypes = {
        init: PropTypes.func.isRequired
    };

    state = {
        isLoading: true
    };

    componentDidMount() {
        const { init } = this.props;

        init().then(() => this.setState({ isLoading: false }));
    }

    render() {
        const { isLoading } = this.state;

        return (
            <div block="Braintree">
                <Loader isLoading={ isLoading } />
                <div
                  block="Braintree"
                  elem="Form"
                  id={ BRAINTREE_CONTAINER_ID }
                />
            </div>
        );
    }
}

export default Braintree;
