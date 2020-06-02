/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CheckoutTermsAndConditionsPopup, {
    TERMS_AND_CONDITIONS_POPUP_ID
} from './CheckoutTermsAndConditionsPopup.component';

export const mapStateToProps = state => ({
    payload: state.PopupReducer.popupPayload[TERMS_AND_CONDITIONS_POPUP_ID] || {}
});

export class CheckoutTermsAndConditionsPopupContainer extends ExtensiblePureComponent {
    static propTypes = {
        payload: PropTypes.shape({
            text: PropTypes.string
        })
    };

    static defaultProps = {
        payload: {
            text: ''
        }
    };

    render() {
        return (
            <CheckoutTermsAndConditionsPopup
              { ...this.props }
              { ...this.containerFunctions }
            />
        );
    }
}

// eslint-disable-next-line no-unused-vars
export const mapDispatchToProps = dispatch => ({});

export default connect(
    middleware(mapStateToProps, 'Component/CheckoutTermsAndConditionsPopup/Container/mapStateToProps'),
    middleware(mapDispatchToProps, 'Component/CheckoutTermsAndConditionsPopup/Container/mapDispatchToProps')
)(
    middleware(CheckoutTermsAndConditionsPopupContainer, 'Component/CheckoutTermsAndConditionsPopup/Container')
);
