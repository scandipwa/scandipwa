import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MyAccountDispatcher } from 'Store/MyAccount';
import { customerType } from 'Type/Account';
import CheckoutAddressBook from './CheckoutAddressBook.component';

export const mapStateToProps = state => ({
    customer: state.MyAccountReducer.customer,
    isSignedIn: state.MyAccountReducer.isSignedIn
});

export const mapDispatchToProps = dispatch => ({
    requestCustomerData: () => MyAccountDispatcher.requestCustomerData(dispatch)
});

export class CheckoutAddressBookContainer extends PureComponent {
    static propTypes = {
        isSignedIn: PropTypes.bool.isRequired,
        requestCustomerData: PropTypes.func.isRequired,
        customer: customerType.isRequired,
        isBilling: PropTypes.bool
    };

    static defaultProps = {
        isBilling: false
    };

    static _getDefaultAddressId(props) {
        const { customer, isBilling } = props;
        const defaultKey = isBilling ? 'default_billing' : 'default_shipping';
        const { [defaultKey]: defaultAddressId, addresses } = customer;

        if (defaultAddressId) return +defaultAddressId;
        if (addresses && addresses.length) return addresses[0].id;
        return 0;
    }

    containerFunctions = ({
        onAddressSelect: this.onAddressSelect.bind(this)
    });

    constructor(props) {
        super(props);

        const {
            requestCustomerData,
            customer: { id },
            isSignedIn
        } = props;

        if (isSignedIn && !id) requestCustomerData();

        const defaultAddressId = CheckoutAddressBookContainer._getDefaultAddressId(props);

        this.state = {
            prevDefaultAddressId: defaultAddressId,
            selectedAddressId: defaultAddressId
        };
    }

    static getDerivedStateFromProps(props, state) {
        const { prevDefaultAddressId } = state;
        const defaultAddressId = CheckoutAddressBookContainer._getDefaultAddressId(props);

        if (defaultAddressId !== prevDefaultAddressId) {
            return {
                selectedAddressId: defaultAddressId,
                prevDefaultAddressId: defaultAddressId
            };
        }

        return null;
    }

    onAddressSelect({ id = 0 }) {
        this.setState({ selectedAddressId: id });
    }

    render() {
        return (
            <CheckoutAddressBook
              { ...this.props }
              { ...this.state }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutAddressBookContainer);
