import { connect } from 'react-redux';
import CheckoutAddressForm from './CheckoutAddressForm.component';

export const mapStateToProps = state => ({
    countries: state.ConfigReducer.countries
});

export default connect(mapStateToProps)(CheckoutAddressForm);
