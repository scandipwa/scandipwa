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
import PropTypes from 'prop-types';
import Link from 'Component/Link';
import CmsBlock from 'Component/CmsBlock';
import './Footer.style';

/**
 * Page footer
 * @class Footer
 */
export default class Footer extends PureComponent {
    static propTypes = {
        copyright: PropTypes.string
    };

    static defaultProps = {
        copyright: ''
    };

    renderContent() {
        const { footer_content: { footer_cms } = {} } = window.contentConfiguration;

        if (footer_cms) {
            return <CmsBlock identifiers={ [footer_cms] } />;
        }

        return (
            <div>
                <Link
                  block="Footer"
                  elem="Link"
                  to="/page/privacy-policy-cookie-restriction-mode"
                >
                    { __('Privacy policy') }
                </Link>
                <Link
                  block="Footer"
                  elem="Link"
                  to="/page/terms-and-conditions"
                >
                    { __('Shopping terms and conditions') }
                </Link>
            </div>
        );
    }

    render() {
        const { copyright } = this.props;

        return (
            <footer block="Footer" aria-label="Footer">
                { this.renderContent() }
                <span block="Footer" elem="Copyright">{ copyright }</span>
            </footer>
        );
    }
}
