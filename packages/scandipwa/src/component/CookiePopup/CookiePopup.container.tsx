/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { ReactElement } from 'Type/Common.type';
import { RootState } from 'Util/Store/Store.type';

import CookiePopup from './CookiePopup.component';
import {
    CookiePopupComponentProps,
    CookiePopupContainerMapDispatchProps,
    CookiePopupContainerMapStateProps,
    CookiePopupContainerProps
} from './CookiePopup.type';

/** @namespace Component/CookiePopup/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): CookiePopupContainerMapStateProps => ({
    cookieText: state.ConfigReducer.cookie_text,
    cookieLink: state.ConfigReducer.cookie_link,
    code: state.ConfigReducer.code
});

/** @namespace Component/CookiePopup/Container/mapDispatchToProps */
export const mapDispatchToProps = (): CookiePopupContainerMapDispatchProps => ({});

/** @namespace Component/CookiePopup/Container */
export class CookiePopupContainer extends PureComponent<CookiePopupContainerProps> {
    static defaultProps: Partial<CookiePopupContainerProps> = {
        cookieText: '',
        cookieLink: '',
        code: ''
    };

    containerProps(): CookiePopupComponentProps {
        const { code, cookieLink, cookieText } = this.props;

        return { code, cookieLink, cookieText };
    }

    render(): ReactElement {
        const { code } = this.props;

        return (
            <CookiePopup
              { ...this.containerProps() }
              key={ code }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CookiePopupContainer);
