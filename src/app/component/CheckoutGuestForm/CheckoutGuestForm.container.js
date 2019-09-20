import { connect } from 'react-redux';
import CheckoutAddressBook from './CheckoutGuestForm.component';

export const mapStateToProps = state => ({
    isSignedIn: state.MyAccountReducer.isSignedIn
});

export default connect(mapStateToProps)(CheckoutAddressBook);
