import { connect } from 'react-redux';
import CheckoutDeliveryOption from './CheckoutDeliveryOption.component';

export const mapStateToProps = state => ({
    totals: state.CartReducer.cartTotals
});

export default connect(mapStateToProps)(CheckoutDeliveryOption);
