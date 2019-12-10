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

import { PureComponent } from 'react';
import BrowserDatabase from 'Util/BrowserDatabase';
import Link from 'Component/Link';
import './CookiePopup.style';

export const COOKIE_POPUP = 'cookie_popup';

class CookiePopup extends PureComponent {
	constructor() {
		super();

		this.state = {
			isAccepted: BrowserDatabase.getItem(COOKIE_POPUP) || false
		};

		this.acceptCookies = this.acceptCookies.bind(this);
	}

	acceptCookies() {
		BrowserDatabase.setItem(true, COOKIE_POPUP);
		this.setState({ isAccepted: true });
	}

  	render() {
		const { isAccepted } = this.state;

		return (
			<div block="CookiePopup" mods={ { isAccepted: isAccepted } }>
				<div block="CookiePopup" elem="Content">
					<p>
						{ __('We use cookies, also from third parties, to remember your settings, statistics and targeted marketing. You accept all cookies by clicking further or by clicking "accept". Read more about our cookies and their purpose in our Cookie Policy - ') }
						<Link to="/page/privacy-policy-cookie-restriction-mode">{ __('read more') }</Link>
					</p>
				</div>
				<div block="CookiePopup" elem="CTA">
					<button block="Button" onClick={ this.acceptCookies }>
						{ __('Accept') }
					</button>
				</div>
			</div>
		);
  	}
}

export default CookiePopup;
