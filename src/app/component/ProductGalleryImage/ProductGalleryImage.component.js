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
import './ProductGalleryImage.style';
import Image from 'Component/Image';

export default class ProductGalleryImage extends PureComponent {
    static propTypes = {
        media: PropTypes.shape({
            alt: PropTypes.string,
            type: PropTypes.string,
            image: PropTypes.string,
            isPlaceholder: PropTypes.bool
        }).isRequired,
        index: PropTypes.number.isRequired,
        onActiveImageChange: PropTypes.func.isRequired
    };

    onActiveImageChange = () => {
        const { index, onActiveImageChange } = this.props;
        onActiveImageChange(index);
    };

    render() {
        const {
            media: {
                alt,
                type,
                image,
                isPlaceholder
            }
        } = this.props;

        return (
            <button
              block="ProductGalleryImage"
              mods={ { type } }
              onClick={ this.onActiveImageChange }
            >
                <Image
                  src={ image }
                  alt={ alt }
                  ratio="custom"
                  isPlaceholder={ isPlaceholder }
                  mix={ { block: 'ProductGalleryImage' } }
                />
            </button>
        );
    }
}
