import { connect } from 'react-redux';
import MyAccountAddressForm from './MyAccountAddressForm.component';

export const mapStateToProps = state => ({
    countries: state.ConfigReducer.countries
});

export default connect(mapStateToProps)(MyAccountAddressForm);
