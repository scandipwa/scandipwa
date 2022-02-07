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
import { createRef, PureComponent } from 'react';
import { withRouter } from 'react-router';
import { TransformWrapper } from 'react-zoom-pan-pinch';

import CarouselScroll from 'Component/CarouselScroll';
import {
    ARROW_SAFE_AREA,
    CAROUSEL_ITEM_GAP,
    CAROUSEL_ITEM_WIDTH
} from 'Component/CarouselScroll/CarouselScroll.config';
import Image from 'Component/Image';
import ProductGalleryBaseImage from 'Component/ProductGalleryBaseImage';
import ProductGalleryThumbnailImage from 'Component/ProductGalleryThumbnailImage';
import Slider from 'Component/Slider';
import VideoPopup from 'Component/VideoPopup';
import VideoThumbnail from 'Component/VideoThumbnail';
import { RefType } from 'Type/Common.type';
import { LocationType } from 'Type/Router.type';
import CSS from 'Util/CSS';

import {
    IMAGE_TYPE,
    MAX_ZOOM_SCALE,
    PLACEHOLDER_TYPE,
    VIDEO_TYPE
} from './ProductGallery.config';

import './ProductGallery.style';

/**
 * Product gallery
 * @class ProductGallery
 * @namespace Component/ProductGallery/Component
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
                type: PropTypes.string,
                media_type: PropTypes.string
            })
        ).isRequired,
        productId: PropTypes.number,
        isZoomEnabled: PropTypes.bool.isRequired,
        activeImage: PropTypes.number.isRequired,
        onActiveImageChange: PropTypes.func.isRequired,
        handleZoomChange: PropTypes.func.isRequired,
        registerSharedElementDestination: PropTypes.func.isRequired,
        disableZoom: PropTypes.func.isRequired,
        location: LocationType.isRequired,
        sliderRef: RefType.isRequired,
        handleImageZoomPopupActiveChange: PropTypes.func.isRequired,
        isMobile: PropTypes.bool.isRequired,
        isImageZoomPopupActive: PropTypes.bool.isRequired,
        isWithEmptySwitcher: PropTypes.bool.isRequired,
        showLoader: PropTypes.bool.isRequired
    };

    static defaultProps = {
        productId: 0
    };

    maxScale = MAX_ZOOM_SCALE;

    imageRef = createRef();

    galleryRef = createRef();

    state = {
        scrollEnabled: true,
        slidesCount: 7,
        prevZoom: false
    };

    handleSliderClick = this.handleSliderClick.bind(this);

    calculateGallerySize = this._calculateGallerySize.bind(this);

    onWheel = this.onWheel.bind(this);

    __construct(props, context) {
        super.__construct(props, context);
        this.renderSlide = this.renderSlide.bind(this);
    }

    componentDidMount() {
        this.updateSharedDestinationElement();
        window.addEventListener('resize', this.calculateGallerySize);
    }

    componentDidUpdate(prevProps) {
        const {
            productId,
            location: { pathname },
            sliderRef,
            isImageZoomPopupActive
        } = this.props;

        const {
            productId: prevProductId,
            location: { pathname: prevPathname }
        } = prevProps;

        const { prevZoom } = this.state;

        if (productId !== prevProductId) {
            this.updateSharedDestinationElement();
        }

        if (sliderRef?.current?.draggableRef && pathname !== prevPathname) {
            CSS.setVariable(
                sliderRef.current.draggableRef,
                'animation-speed',
                0
            );
        }

        if (isImageZoomPopupActive !== prevZoom) {
            this.handleZoomChange(isImageZoomPopupActive);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.calculateGallerySize);
    }

    handleZoomChange(prevZoom) {
        setTimeout(this.calculateGallerySize, 0);
        this.setState({ prevZoom });
    }

    _calculateGallerySize() {
        const { isMobile } = this.props;
        const ref = this.galleryRef.current;

        if (!ref || isMobile) {
            return;
        }
        const { width } = ref.getBoundingClientRect();

        const slidesCount = Math.floor((width - ARROW_SAFE_AREA * 2) / (CAROUSEL_ITEM_WIDTH + CAROUSEL_ITEM_GAP));
        this.setState({ slidesCount });
    }

    handleSliderClick() {
        const {
            handleImageZoomPopupActiveChange,
            gallery,
            activeImage
        } = this.props;

        const { media_type } = gallery[activeImage];

        if (media_type === VIDEO_TYPE) {
            return;
        }

        handleImageZoomPopupActiveChange(true);
    }

    updateSharedDestinationElement() {
        const { registerSharedElementDestination } = this.props;
        registerSharedElementDestination(this.imageRef);
    }

    renderAdditionalPicture(media, index = 0) {
        return (
            <ProductGalleryThumbnailImage
              key={ index }
              media={ media }
            />
        );
    }

    /**
     * Renders a video thumbnail which opens popup player on click/tap
     * @param media
     * @param index
     * @returns {*}
     * @private
     */
    renderVideo(media, index) {
        const { isImageZoomPopupActive, handleImageZoomPopupActiveChange } = this.props;

        return (
            <VideoThumbnail
              key={ index }
              media={ media }
              isVideoZoomed={ isImageZoomPopupActive }
              onZoomedVideoClick={ handleImageZoomPopupActiveChange }
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

    stopScrolling() {
        this.setState({ scrollEnabled: false });
        this.timeout = setTimeout(() => {
            this.setState({ scrollEnabled: true });
            this.timeout = null;

            // 20 ms is time give to scroll down, usually that is enough
            // eslint-disable-next-line no-magic-numbers
        }, 20);
    }

    onWheel(zoomState) {
        const { scale } = zoomState;

        if (this.timeout) {
            return;
        }

        if (scale === 1 || scale === MAX_ZOOM_SCALE) {
            this.stopScrolling();
        }
    }

    /**
     * Renders a product image to be displayed in the gallery
     * @param mediaData
     * @param index
     * @returns {*}
     * @private
     */
    renderImage(mediaData, index) {
        const {
            isZoomEnabled,
            handleZoomChange,
            disableZoom,
            isMobile,
            isImageZoomPopupActive,
            showLoader
        } = this.props;
        const { scrollEnabled } = this.state;

        if (!isMobile) {
            const {
                base: { url: baseSrc } = {},
                large: { url: largeSrc } = {}
            } = mediaData;

            const style = isImageZoomPopupActive ? { height: 'auto' } : {};
            const src = isImageZoomPopupActive ? largeSrc : baseSrc;

            return (
                <Image
                  key={ index }
                  src={ src }
                  ratio="custom"
                  mix={ {
                      block: 'ProductGallery',
                      elem: 'SliderImage',
                      mods: { isPlaceholder: !src }
                  } }
                  isPlaceholder={ !src }
                  style={ style }
                  showIsLoading={ showLoader }
                />
            );
        }

        return (
            <TransformWrapper
              key={ index }
              onZoomChange={ handleZoomChange }
              onWheelStart={ this.onWheelStart }
              onWheel={ this.onWheel }
              wheel={ { limitsOnWheel: true, disabled: !scrollEnabled } }
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
        const {
            gallery,
            isImageZoomPopupActive,
            activeImage,
            onActiveImageChange,
            isWithEmptySwitcher
        } = this.props;

        const { slidesCount } = this.state;

        if (gallery.length === 1) {
            return <div block="ProductGallery" elem="Additional" mods={ { isWithEmptySwitcher } } />;
        }

        return (
            <div block="ProductGallery" elem="Additional" mods={ { isImageZoomPopupActive } }>
                <CarouselScroll
                  activeItemId={ activeImage }
                  onChange={ onActiveImageChange }
                  showedItemCount={ slidesCount }
                  isImageZoomPopupActive={ isImageZoomPopupActive }
                >
                    { gallery.map(this.renderAdditionalPicture.bind(this)) }
                </CarouselScroll>
            </div>
        );
    }

    getImageUrl() {
        const {
            gallery: [
                {
                    thumbnail: {
                        url = ''
                    } = {}
                }
            ] = []
        } = this.props;

        return url;
    }

    renderSlider() {
        const {
            gallery,
            activeImage,
            isZoomEnabled,
            onActiveImageChange,
            isImageZoomPopupActive,
            sliderRef,
            isMobile
        } = this.props;

        const mods = {
            isImageZoomPopupActive,
            isZoomInCursor: !isImageZoomPopupActive
        };

        const isMoreThanOnePhoto = gallery.length > 1;

        return (
            <div
              ref={ this.imageRef }
              block="ProductGallery"
              elem="SliderWrapper"
            >
                <meta itemProp="image" content={ this.getImageUrl() } />
                <Slider
                  sliderRef={ sliderRef }
                  mix={ { block: 'ProductGallery', elem: 'Slider', mods } }
                  showCounter={ isMobile }
                  showArrows={ !isMobile && isMoreThanOnePhoto }
                  activeImage={ activeImage }
                  onActiveImageChange={ onActiveImageChange }
                  isInteractionDisabled={ isZoomEnabled }
                  onClick={ this.handleSliderClick }
                  sliderHeight={ isImageZoomPopupActive ? '100%' : 0 }
                  isHeightTransitionDisabledOnMount
                >
                    { gallery.map(this.renderSlide) }
                </Slider>
            </div>
        );
    }

    render() {
        return (
            <div block="ProductGallery" ref={ this.galleryRef }>
                { this.renderSlider() }
                { this.renderAdditionalPictures() }
                <VideoPopup />
            </div>
        );
    }
}

export default withRouter(ProductGallery);
