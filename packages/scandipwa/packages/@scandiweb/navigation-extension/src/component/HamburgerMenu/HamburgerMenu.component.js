// import PropTypes from 'prop-types';

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

import Menu from 'Component/Menu';
import { DeviceType } from 'Type/Device';

import './HamburgerMenu.style';

/** @namespace Scandiweb/NavigationExtension/Component/HamburgerMenu/Component/HamburgerMenuComponent */
export class HamburgerMenuComponent extends PureComponent {
    static propTypes = {
        device: DeviceType.isRequired
    };

    render() {
        const { device: { isMobile } } = this.props;

        if (!isMobile) {
            return null;
        }

        return (
            <div block="HamburgerMenu">
                <p>KOALA</p>
                <Menu />
            </div>
        );
    }
}

export default HamburgerMenuComponent;
