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

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Slider from 'Component/Slider';
import Image from 'Component/Image';
import './ProductGallery.style';

/**
 * Product gallery
 * @class ProductGallery
 */
class ProductGallery extends PureComponent {
    static propTypes = {
        gallery: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([
                    PropTypes.number,
                    PropTypes.string
                ]),
                image: PropTypes.string,
                isPlaceholder: PropTypes.bool,
                alt: PropTypes.string,
                type: PropTypes.string
            })
        ).isRequired
    }

    constructor(props) {
        super(props);
        this.state = { activeImage: 0 };

        this.renderAdditionalPicture = this.renderAdditionalPicture.bind(this);
        this.onActiveImageChange = this.onActiveImageChange.bind(this);
    }

    onActiveImageChange(activeImage) {
        this.setState({ activeImage });
    }

    renderAdditionalPicture(media, index = 0) {
        const {
            alt,
            type,
            image,
            isPlaceholder
        } = media;

        return (
            <button
              block="ProductGallery"
              elem="Image"
              key={ index }
              mods={ { type } }
              onClick={ () => this.onActiveImageChange(index) }
            >
                <Image
                  key={ index }
                  src={ image }
                  alt={ alt }
                  ratio="custom"
                  isPlaceholder={ isPlaceholder }
                  mix={ { block: 'ProductGallery', elem: 'Image' } }
                />
            </button>
        );
    }

    renderAdditionalPictures() {
        const { gallery } = this.props;
        const galleryLength = gallery.length;

        return galleryLength < 4
            ? this.renderAdditionalPicture({ ...gallery[galleryLength - 1], type: 'single' })
            : gallery.slice(0, 4).map(this.renderAdditionalPicture);
    }

    renderSlide(media, index) {
        const {
            alt,
            type,
            image,
            isPlaceholder
        } = media;

        switch (type) {
        case 'image':
            return (
                <Fragment key={ index }>
                    <Image
                      src={ image }
                      ratio="custom"
                      mix={ {
                          block: 'ProductGallery',
                          elem: 'SliderImage',
                          mods: { isPlaceholder: !image }
                      } }
                      isPlaceholder={ isPlaceholder }
                      alt={ alt }
                    />
                    <img
                      style={ { display: 'none' } }
                      alt={ name }
                      src={ image }
                      itemProp="image"
                    />
                </Fragment>
            );
        default:
            return null;
        }
    }

    render() {
        const { gallery } = this.props;
        const { activeImage } = this.state;
        return (
            <div block="ProductGallery">
                { this.renderAdditionalPictures() }
                <Slider
                  mix={ { block: 'ProductGallery', elem: 'Slider' } }
                  showCrumbs
                  activeImage={ activeImage }
                  onActiveImageChange={ this.onActiveImageChange }
                >
                    { gallery.map(this.renderSlide) }
                </Slider>
            </div>
        );
    }
}

export default ProductGallery;
