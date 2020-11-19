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
import { TransformComponent } from 'react-zoom-pan-pinch';

import Image from 'Component/Image';

/** @namespace Component/ProductGalleryBaseImage/Component */
export class ProductGalleryBaseImage extends PureComponent {
    static propTypes = {
        src: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired
    };

    render() {
        const { src, alt } = this.props;

        return (
            <TransformComponent>
                <Image
                  src={ src }
                  ratio="custom"
                  mix={ {
                      block: 'ProductGallery',
                      elem: 'SliderImage',
                      mods: { isPlaceholder: !src }
                  } }
                  isPlaceholder={ !src }
                  alt={ alt }
                />
                <img
                  style={ { display: 'none' } }
                  alt={ alt }
                  src={ src }
                  itemProp="image"
                />
            </TransformComponent>
        );
    }
}

export default ProductGalleryBaseImage;
