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

import { PureComponent, createRef } from 'react';
import CSS from 'Util/CSS';
import PropTypes from 'prop-types';
import { TransformWrapper } from 'react-zoom-pan-pinch';

import ProductGalleryThumbnailImage from 'Component/ProductGalleryThumbnailImage';
import ProductGalleryBaseImage from 'Component/ProductGalleryBaseImage';
import VideoThumbnail from 'Component/VideoThumbnail';
import VideoPopup from 'Component/VideoPopup';
import { LocationType } from 'Type/Common';
import { withRouter } from 'react-router';
import Slider from 'Component/Slider';
import Image from 'Component/Image';

import './ProductGallery.style';

export const GALLERY_LENGTH_BEFORE_COLLAPSE = 4;
export const MAX_ZOOM_SCALE = 8;

export const IMAGE_TYPE = 'image';
export const VIDEO_TYPE = 'external-video';
export const PLACEHOLDER_TYPE = 'placeholder';

/**
 * Product gallery
 * @class ProductGallery
 */
export class ProductGallery extends PureComponent {
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
        ).isRequired,
        productId: PropTypes.number,
        isZoomEnabled: PropTypes.bool.isRequired,
        activeImage: PropTypes.number.isRequired,
        onActiveImageChange: PropTypes.func.isRequired,
        handleZoomChange: PropTypes.func.isRequired,
        registerSharedElementDestination: PropTypes.func.isRequired,
        disableZoom: PropTypes.func.isRequired,
        location: LocationType.isRequired
    };

    static defaultProps = {
        productId: 0
    };

    maxScale = MAX_ZOOM_SCALE;

    imageRef = createRef();

    sliderRef = createRef();

    constructor(props, context) {
        super(props, context);
        this.renderSlide = this.renderSlide.bind(this);
    }

    componentDidMount() {
        this.updateSharedDestinationElement();
    }

    componentDidUpdate(prevProps) {
        const { productId, location: { pathname } } = this.props;
        const { productId: prevProductId, location: { pathname: prevPathname } } = prevProps;

        if (productId !== prevProductId) {
            this.updateSharedDestinationElement();
        }

        if (this.sliderRef && pathname !== prevPathname) {
            CSS.setVariable(
                this.sliderRef.current.draggableRef,
                'animation-speed',
                0
            );
        }
    }

    updateSharedDestinationElement() {
        const { registerSharedElementDestination } = this.props;
        registerSharedElementDestination(this.imageRef);
    }

    renderAdditionalPicture = (media, index = 0) => {
        const { onActiveImageChange } = this.props;

        return (
            <ProductGalleryThumbnailImage
              key={ index }
              media={ media }
              index={ index }
              onActiveImageChange={ onActiveImageChange }
            />
        );
    };

    /**
     * Renders a video thumbnail which opens popup player on click/tap
     * @param media
     * @param index
     * @returns {*}
     * @private
     */
    renderVideo(media, index) {
        return (
            <VideoThumbnail
              key={ index }
              media={ media }
            />
        );
    }

    renderPlaceholder(index) {
        return (
            <Image
              key={ index }
              ratio="custom"
              mix={ {
                  block: 'ProductGallery',
                  elem: 'SliderImage',
                  mods: { isPlaceholder: true }
              } }
              isPlaceholder
            />
        );
    }

    /**
     * Renders a product image to be displayed in the gallery
     * @param mediaData
     * @param index
     * @returns {*}
     * @private
     */
    renderImage(mediaData, index) {
        const { isZoomEnabled, handleZoomChange, disableZoom } = this.props;

        return (
            <TransformWrapper
              key={ index }
              onZoomChange={ handleZoomChange }
            //   doubleClick={ { mode: 'reset' } }
              pan={ {
                  disabled: !isZoomEnabled,
                  limitToWrapperBounds: true,
                  velocity: false
              } }
              options={ {
                  limitToBounds: true,
                  minScale: 1
              } }
            >
                { ({
                    scale,
                    previousScale,
                    resetTransform,
                    setTransform
                }) => {
                    if (scale === 1 && previousScale !== 1) {
                        resetTransform();
                    }

                    return (
                        <ProductGalleryBaseImage
                          setTransform={ setTransform }
                          index={ index }
                          mediaData={ mediaData }
                          scale={ scale }
                          previousScale={ previousScale }
                          disableZoom={ disableZoom }
                          isZoomEnabled={ isZoomEnabled }
                        />
                    );
                } }
            </TransformWrapper>
        );
    }

    /**
     * Checks for the type of the slide and renders it accordingly
     * @param media
     * @param index
     * @returns {null|*}
     */
    renderSlide(media, index) {
        const { media_type } = media;

        switch (media_type) {
        case IMAGE_TYPE:
            return this.renderImage(media, index);
        case VIDEO_TYPE:
            return this.renderVideo(media, index);
        case PLACEHOLDER_TYPE:
            return this.renderPlaceholder(index);
        default:
            return null;
        }
    }

    renderAdditionalPictures() {
        const { gallery } = this.props;

        return (
            <div block="ProductGallery" elem="Additional">
                { gallery.slice(0, GALLERY_LENGTH_BEFORE_COLLAPSE).map(this.renderAdditionalPicture) }
            </div>
        );
    }

    renderGalleryNotice() {
        return (
            <p block="ProductGallery" elem="Notice">
                { __('Scroll over image to zoom in') }
            </p>
        );
    }

    renderSlider() {
        const {
            gallery,
            activeImage,
            isZoomEnabled,
            onActiveImageChange
        } = this.props;

        return (
            <div ref={ this.imageRef }>
                <Slider
                  ref={ this.sliderRef }
                  mix={ { block: 'ProductGallery', elem: 'Slider' } }
                  showCrumbs
                  activeImage={ activeImage }
                  onActiveImageChange={ onActiveImageChange }
                  isInteractionDisabled={ isZoomEnabled }
                >
                    { gallery.map(this.renderSlide) }
                </Slider>
                { this.renderGalleryNotice() }
            </div>
        );
    }

    render() {
        return (
            <div block="ProductGallery">
                { this.renderAdditionalPictures() }
                { this.renderSlider() }
                <VideoPopup />
            </div>
        );
    }
}

export default withRouter(ProductGallery);
