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

import CookiePopup from './CookiePopup.component';

/** @namespace Component/CookiePopup/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    cookieText: state.ConfigReducer.cookie_text,
    cookieLink: state.ConfigReducer.cookie_link,
    code: state.ConfigReducer.code
});

/** @namespace Component/CookiePopup/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars
export const mapDispatchToProps = (dispatch) => ({});

/** @namespace Component/CookiePopup/Container */
export class CookiePopupContainer extends PureComponent {
    static propTypes = {
        code: PropTypes.string
    };

    static defaultProps = {
        code: ''
    };

    render() {
        const { code } = this.props;

        return (
            <CookiePopup
              { ...this.props }
              key={ code }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CookiePopupContainer);
