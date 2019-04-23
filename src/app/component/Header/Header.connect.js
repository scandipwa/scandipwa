import { connect } from 'react-redux';
import { toggleOverlayByKey, hideActiveOverlay } from 'Store/Overlay';
import { changeHeaderState, goToPreviousHeaderState } from 'Store/Header';
import HeaderComponent from './Header.component';

const mapStateToProps = state => ({
    headerState: state.HeaderReducer.headerState
});

const mapDispatchToProps = dispatch => ({
    showOverlay: overlayKey => dispatch(toggleOverlayByKey(overlayKey)),
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    setHeaderState: stateName => dispatch(changeHeaderState(stateName)),
    goToPreviousHeaderState: () => dispatch(goToPreviousHeaderState())
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
