import { connect } from 'react-redux';

import { toggleOverlayByKey } from 'Store/Overlay/Overlay.action';

import PopupSuspense from './PopupSuspense.component';

export const mapDispatchToProps = (dispatch) => ({
    showOverlay: (overlayKey) => dispatch(toggleOverlayByKey(overlayKey))
});

export default connect(null, mapDispatchToProps)(PopupSuspense);
