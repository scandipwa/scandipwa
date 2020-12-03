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

/** @namespace Component/ProductCompareButton/Component */
export class ProductCompareButton extends PureComponent {
    static propTypes = {
        handleClick: PropTypes.func.isRequired
    };

    render() {
        const { handleClick } = this.props;

        return (
            <button onClick={ handleClick }>Compare</button>
        );
    }
}

export default ProductCompareButton;
