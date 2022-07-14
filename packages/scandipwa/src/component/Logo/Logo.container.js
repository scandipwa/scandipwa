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

import ImageContainer from 'Component/Image/Image.container';

import Logo from './Logo.component';

/** @namespace Component/Logo/Container */
export class LogoContainer extends ImageContainer {
    render() {
        return (
            <Logo
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default LogoContainer;
