/**
 * ScandiPWA - Progressive Web App for Magento
 * Copyright © Arman Fayziev
 * @package src/component/MyAccountOverlay
 */

 import PropTypes from 'prop-types';
 import { connect } from 'react-redux';
 
 // eslint-disable-next-line max-len
 import { MyAccountOverlayContainer as SourceMyAccountOverlay } from 'SourceComponent/MyAccountOverlay/MyAccountOverlay.container';
 import { updateCustomerIsAuthTokenExpired } from 'Store/MyAccount/MyAccount.action';
 import { showNotification } from 'Store/Notification/Notification.action';
 import { hideActiveOverlay, toggleOverlayByKey } from 'Store/Overlay/Overlay.action';
 
 /** @namespace PwaApp/Component/MyAccountOverlay/Container/mapStateToProps */
 export const mapStateToProps = (state) => ({
     isSignedIn: state.MyAccountReducer.isSignedIn,
     device: state.ConfigReducer.device,
     isAuthTokenExpired: state.MyAccountReducer.isAuthTokenExpired
 });
 
 /** @namespace PwaApp/Component/MyAccountOverlay/Container/mapDispatchToProps */
 export const mapDispatchToProps = (dispatch) => ({
     hideActiveOverlay: () => dispatch(hideActiveOverlay()),
     showNotification: (type, message) => dispatch(showNotification(type, message)),
     showOverlay: (overlayKey) => dispatch(toggleOverlayByKey(overlayKey)),
     setIsAuthTokenExpired: (status) => dispatch(updateCustomerIsAuthTokenExpired(status))
 
 });
 
 /** @namespace PwaApp/Component/MyAccountOverlay/Container/MyAccountOverlayContainer */
 export class MyAccountOverlayContainer extends SourceMyAccountOverlay {
       static propTypes = {
           isSignedIn: PropTypes.bool.isRequired,
           showNotification: PropTypes.func.isRequired,
           isOverlayVisible: PropTypes.bool.isRequired,
           onSignIn: PropTypes.func,
           goToPreviousHeaderState: PropTypes.func,
           isCheckout: PropTypes.bool,
           hideActiveOverlay: PropTypes.func.isRequired,
           isAuthTokenExpired: PropTypes.bool,
           setIsAuthTokenExpired: PropTypes.func.isRequired
       };
 
       static defaultProps = {
           isCheckout: false,
           isAuthTokenExpired: false,
           onSignIn: () => {},
           goToPreviousHeaderState: () => {}
       };
 
       componentDidUpdate(prevProps, prevState) {
           const { isSignedIn: prevIsSignedIn } = prevProps;
           const { state: oldMyAccountState } = prevState;
           const { state: newMyAccountState } = this.state;
 
           const {
               isSignedIn,
               hideActiveOverlay,
               showNotification,
               isAuthTokenExpired,
               setIsAuthTokenExpired
           } = this.props;
 
           if (oldMyAccountState === newMyAccountState) {
               return;
           }
 
           function sessionExpiredWarning() {
               return showNotification('error', __('Your session is over, you are logged out!'));
           }
 
           window.onbeforeunload = sessionExpiredWarning;
 
           if (isSignedIn !== prevIsSignedIn) {
               if (isAuthTokenExpired) {
                   setIsAuthTokenExpired(false);
 
                   this.sessionExpiredWarning();
 
                   showNotification('error', __('Your session is over, you are logged out!'));
               } else if (isSignedIn) {
                   showNotification('success', __('You are successfully logged in!'));
               } else {
                   showNotification('success', __('You are successfully logged out!'));
               }
 
               hideActiveOverlay();
           }
       }
 }
 
 export default connect(mapStateToProps, mapDispatchToProps)(MyAccountOverlayContainer);
 