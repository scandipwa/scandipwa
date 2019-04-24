import { connect } from 'react-redux';
import { changeHeaderState } from 'Store/Header';
import MyAccountOverlay from './MyAccountOverlay.component';
import { CUSTOMER_ACCOUNT } from '../Header/Header.component';

const mapStateToProps = state => ({
    isOverlayVisible: state.OverlayReducer.activeOverlay === CUSTOMER_ACCOUNT
});

const mapDispatchToProps = dispatch => ({
    setHeaderState: headerState => dispatch(changeHeaderState(headerState))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountOverlay);
