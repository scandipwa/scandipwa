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

import Koala from './Koala.component';

/** @namespace Scandiweb/NavigationExtension/Component/Koala/Container/KoalaContainer */
export class KoalaContainer extends PureComponent {
    static propTypes = {
        // TODO: implement prop-types
    };

    containerFunctions = {
        // getData: this.getData.bind(this)
    };

    containerProps = () => {
        // isDisabled: this._getIsDisabled()
    };

    render() {
        return (
            <Koala
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default KoalaContainer;
