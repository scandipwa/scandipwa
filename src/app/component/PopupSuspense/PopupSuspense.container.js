import { connect } from 'react-redux';

import { toggleOverlayByKey } from 'Store/Overlay/Overlay.action';

import PopupSuspense from './PopupSuspense.component';

/** @namespace Component/PopupSuspense/Container/mapStateToProps */
// eslint-disable-next-line no-unused-vars
export const mapStateToProps = (state) => ({});

/** @namespace Component/PopupSuspense/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showOverlay: (overlayKey) => dispatch(toggleOverlayByKey(overlayKey))
});

export default connect(mapStateToProps, mapDispatchToProps)(PopupSuspense);
