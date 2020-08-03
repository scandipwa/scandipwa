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
import './ProductExhibition.style';

export const IMAGE_TYPE = 'image';
export const VIDEO_TYPE = 'external-video';
export const PLACEHOLDER_TYPE = 'placeholder';

class ProductExhibition extends PureComponent {
    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.element).isRequired
    };

    render() {
        const { children } = this.props;

        return (
            <div block="ProductExhibition">
                { children }
            </div>
        );
    }
}

export default ProductExhibition;
