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
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import CheckoutTermsAndConditionsPopup from './CheckoutTermsAndConditionsPopup.component';
import { TERMS_AND_CONDITIONS_POPUP_ID } from './CheckoutTermsAndConditionsPopup.config';

/** @namespace Component/CheckoutTermsAndConditionsPopup/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    payload: state.PopupReducer.popupPayload[TERMS_AND_CONDITIONS_POPUP_ID] || {}
});

/** @namespace Component/CheckoutTermsAndConditionsPopup/Container */
export class CheckoutTermsAndConditionsPopupContainer extends PureComponent {
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

/** @namespace Component/CheckoutTermsAndConditionsPopup/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars
export const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutTermsAndConditionsPopupContainer);
