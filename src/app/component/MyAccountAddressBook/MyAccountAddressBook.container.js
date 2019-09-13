import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { customerType } from 'Type/Account';
import MyAccountAddressBook from './MyAccountAddressBook.component';

export const mapStateToProps = state => ({
    customer: state.MyAccountReducer.customer
});

export const mapDispatchToProps = dispatch => ({
    // addProduct: options => CartDispatcher.addProductToCart(dispatch, options)
});

export class MyAccountAddressBookContainer extends PureComponent {
    static propTypes = {
        customer: customerType.isRequired
    };

    containerFunctions = {
        getDefaultPostfix: this.getDefaultPostfix.bind(this)
    };

    getDefaultPostfix(address) {
        const { default_billing, default_shipping } = address;
        if (!default_billing && !default_shipping) return '';
        if (default_billing && default_shipping) return ' - default shipping, billing address';
        if (default_billing) return ' - default billing address';
        return ' - default shipping address';
    }

    render() {
        return (
            <MyAccountAddressBook
              { ...this.props }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountAddressBookContainer);
