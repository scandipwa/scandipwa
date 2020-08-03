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

import './ProductGallery.style';

import PropTypes from 'prop-types';
import { createRef, PureComponent, Fragment } from 'react';
import { withRouter } from 'react-router';
import { TransformWrapper } from 'react-zoom-pan-pinch';

import Image from 'Component/Image';
import ProductGalleryBaseImage from 'Component/ProductGalleryBaseImage';
import ProductExhibition from 'Component/ProductExhibition';
import Slider from 'Component/Slider';
import VideoPopup from 'Component/VideoPopup';
import Popup from 'Component/Popup';
import VideoThumbnail from 'Component/VideoThumbnail';
import { LocationType } from 'Type/Common';
import CSS from 'Util/CSS';
import isMobile from 'Util/Mobile';
import media, { PRODUCT_MEDIA } from 'Util/Media/Media';
import { getAssetUrl } from 'Util/Resources/Resource';

import {
    IMAGE_TYPE, MAX_ZOOM_SCALE, PLACEHOLDER_TYPE, VIDEO_TYPE
} from './ProductGallery.config';

const PRODUCT_GALLERY_POPUP_OVERLAY = 'productGalleryPopupOverlay';
const THUMBNAIL_HEIGHT = 111;

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

    state = {
        scrollEnabled: true
    };

    constructor(props, context) {
        super(props, context);
        this.renderSlide = this.renderSlide.bind(this);
        this.imageClick = this.imageClick.bind(this);

        this.popupImageWrapper = createRef();
        this.sliderRef = createRef();
        this.state = {
            activeImage: 0,
            isPopupOpened: false,
            isUniqueKey: false,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        };
        this.thumbnailsSliderRef = createRef();
        this.image = getAssetUrl("images/search.svg");
        this.renderAdditionalPicture = this.renderAdditionalPicture.bind(this);
        this.onActiveImageChange = this.onActiveImageChange.bind(this);
        this.handlePopupZoomClick = this.handlePopupZoomClick.bind(this);
        this.onPopupImageScroll = this.onPopupImageScroll.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }

    componentDidMount() {
        this.updateSharedDestinationElement();
        this.scrollThumbnailsToCurrentPos();
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize, true);
    }

    componentDidUpdate(prevProps, prevState) {
        const { productId } = this.props;
        const { thumbnail: prevThumbnail, productId: prevProductId, location: { pathname: prevPathname } } = prevProps;
        const { thumbnail, location: { pathname } } = this.props;
        const { activeImage: prevActiveImage } = prevState;
        const { activeImage, isPopupOpened, isUniqueKey } = this.state;
        if (thumbnail !== prevThumbnail) {
            if (pathname !== prevPathname) {
                // eslint-disable-next-line react/no-did-update-set-state
                this.setState({ isUniqueKey: true });
            }
            this.onActiveImageChange(0);
        }

        if (pathname === prevPathname && isUniqueKey) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ isUniqueKey: false });
        }

        if (this.thumbnailsSliderRef.current && (isPopupOpened || activeImage !== prevActiveImage)) {
            this.scrollThumbnailsToCurrentPos(prevActiveImage - activeImage);
        }

        if (productId !== prevProductId) {
            this.updateSharedDestinationElement();
        }

        if (this.sliderRef.current && pathname !== prevPathname) {
            CSS.setVariable(
                this.sliderRef.current.draggableRef,
                'animation-speed',
                0
            );
        }
    }

    onActiveImageChange(activeImage) {
        this.setState({ activeImage });
    }

    handlePopupZoomClick() {
        this.setState({ isPopupOpened: true });
    }

    handleResize(event) {
        const width = event.target.innerWidth;
        const { isPopupOpened } = this.state;
        const { hideActiveOverlayByKey } = this.props;
        if(isPopupOpened && width < 768) {
            hideActiveOverlayByKey(PRODUCT_GALLERY_POPUP_OVERLAY);
            this.setState({isPopupOpened: false})
        }
        this.setState( {windowWidth: window.innerWidth, windowHeight: window.innerHeight});
    }

    onPopupImageScroll({ pageY }) {
        if(this.popupImageWrapper && this.popupImageWrapper.current) {
            const wrapperRef = this.popupImageWrapper.current;
            const image = this.popupImageWrapper.current.childNodes[0].children[0].children[0].children[0];
            const ratio =  (image.getBoundingClientRect().height) / ( wrapperRef.getBoundingClientRect().height+42);
            const offset = -pageY * (ratio -1);

            CSS.setVariable(
                this.popupImageWrapper,
                'image-offset',
                `${ratio > 1 ? offset : 0}px`
            );
        }
    }

    scrollThumbnailsToCurrentPos(speed = 0.5) {
        if (!this.thumbnailsSliderRef.current) {
            return;
        }

        const { gallery } = this.props;
        const { activeImage } = this.state;;
        const lastIndex = gallery.length - 1;
        const slidePosition = activeImage > lastIndex - 2 ? lastIndex - 3 : activeImage - 1;
        const sliderHeight = THUMBNAIL_HEIGHT + 16  || 0;
        const newTranslate = activeImage === 0 ? 0 : -slidePosition * sliderHeight;
        CSS.setVariable(
            this.thumbnailsSliderRef,
            'animation-speed',
            `${ Math.abs((speed) * 300) }ms`
        );
        CSS.setVariable(
            this.thumbnailsSliderRef,
            'translateY',
            `${newTranslate}px`
        );

    }

    renderPrevButton() {
        const { activeImage } = this.state;

        return (
            <button
                block="ProductGallery"
                elem="Arrow"
                mods={ { type: 'up' } }
                disabled={ !activeImage }
                onClick={ () => this.onActiveImageChange(activeImage - 1) }
            >
                <img src={getAssetUrl("/images/global/up-arrow.svg")}/>
            </button>
        );
    }

    renderNextButton({ type }) {
        const { activeImage } = this.state;
        const { gallery } = this.props;
        const lastIndex = gallery.length - 1;

        return (
            <button
                block="ProductGallery"
                elem="Arrow"
                mods={ { type } }
                disabled={ activeImage === lastIndex }
                onClick={ () => this.onActiveImageChange(activeImage + 1) }
            >
                <img src={getAssetUrl("/images/global/up-arrow.svg")}/>
            </button>
        );
    }

    updateSharedDestinationElement() {
        const { registerSharedElementDestination } = this.props;
        registerSharedElementDestination(this.imageRef);
    }

    renderAdditionalPicture = (media, index = 0) => {
        const {
            alt,
            media_type,
            image,
            isPlaceholder,
            thumbnail: { url } = {}
        } = media;
        const { isUniqueKey } = this.state;
        const imageUrl = url || image;
        const { activeImage } = this.state;
        const key = isUniqueKey ? url : index;

        return (
            <button
                block="ProductGallery"
                elem="ThumbnailButton"
                key={ key }
                mods={ { media_type, active: activeImage === index } }
                onClick={ () => this.onActiveImageChange(index) }
            >
                <Image
                    key={ key }
                    src={ imageUrl }
                    alt={ alt }
                    ratio="custom"
                    isPlaceholder={ isPlaceholder }
                    isTrackingOnLoad
                    mix={ { block: 'ProductGallery', elem: 'Image' } }
                />
            </button>
        );
    }

    renderProductGallery(options = {}) {
        const { gallery } = this.props;
        const { activeImage } = this.state;
        const { isPopupGallery } = options;
        return (
            <>

                <Slider
                    mix={ { block: 'ProductGallery', elem: 'Slider' } }
                    activeImage={ activeImage }
                    showCrumbs={ !isPopupGallery }
                    ref={this.sliderRef}
                    onActiveImageChange={ this.onActiveImageChange }
                    className="popupProductSlider"
                >
                    { gallery.map((media, index) => this.renderSlide(media, index, isPopupGallery)) }
                </Slider>
                <nav>
                    { this.renderAdditionalPictures(isPopupGallery) }
                </nav>
            </>
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

    stopScrolling() {
        this.setState({ scrollEnabled: false });
        this.timeout = setTimeout(() => {
            this.setState({ scrollEnabled: true });
            this.timeout = null;

            // 20 ms is time give to scroll down, usually that is enough
            // eslint-disable-next-line no-magic-numbers
        }, 20);
    }

    onWheel = (zoomState) => {
        const { scale } = zoomState;

        if (this.timeout) {
            return;
        }

        if (scale === 1 || scale === MAX_ZOOM_SCALE) {
            this.stopScrolling();
        }
    };

    /**
     * Renders a product image to be displayed in the gallery
     * @param mediaData
     * @param index
     * @returns {*}
     * @private
     */
    renderImage(mediaData, index) {
        const { isZoomEnabled, handleZoomChange, disableZoom } = this.props;
        const { scrollEnabled } = this.state;

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
    renderSlide(media, index, isPopupGallery) {
        const {
            alt,
            media_type,
            image,
            isPlaceholder,
            thumbnail: { url } = {}
        } = media;
        const imageUrl = isPopupGallery && image ? image : url;
        const { activeImage, isUniqueKey } = this.state;
        const key = isUniqueKey ? url : index;
        switch (media_type) {
            case 'image':
                if(isMobile.any()) {
                    return this.renderImage(media, index);
                }
                return (
                    <Fragment key={ key }>
                        <Image
                            src={ imageUrl }
                            ratio="custom"
                            mix={ {
                                block: 'ProductGallery',
                                elem: 'SliderImage',
                                mods: { isPlaceholder: !image }
                            } }
                            isPlaceholder={ isPlaceholder }
                            isTrackingOnLoad={ activeImage === index }
                            alt={ alt }
                        />
                        <img
                            style={ { display: 'none' } }
                            alt={ name }
                            src={ imageUrl }
                            itemProp="image"
                        />
                    </Fragment>
                );
            case VIDEO_TYPE:
                return this.renderVideo(media, index);
            case PLACEHOLDER_TYPE:
                return this.renderPlaceholder(index);
            default:
                return null;
        }
    }

    _getSrc(mediaData) {
        const {
            file, base: { url: baseUrl } = {}
        } = mediaData || {};

        return baseUrl || media(file, PRODUCT_MEDIA);
    }

    _getAlt(mediaData) {
        const { label } = mediaData || {};

        return label || '';
    }

    renderImageForDesktop(mediaData, index) {
        const src = this._getSrc(mediaData);
        const alt = this._getAlt(mediaData);
        const searchCursor = getAssetUrl("/images/global/search.svg");
        return (
            <Fragment key={ index } >
                <a href="#" onClick = { (e) => this.imageClick(e,index) }>
                    <Image
                        src={ src }
                        ratio="custom"
                        mix={ {
                            block: 'ProductGallery',
                            elem: 'SliderImage',
                            mods: { isPlaceholder: !src }
                        } }
                        style= { { cursor: this.getStyleUrl("/images/global/search.svg") } }
                        isPlaceholder={ !src }
                        alt={ alt }
                    />
                </a>
                <img
                    style={ { display: 'none'} }
                    alt={ alt }
                    src={ src }
                    itemProp="image"
                />
            </Fragment>
        );
    }

    getStyleUrl(url) {
        return `url('${getAssetUrl(url)}'), auto`
    }

    imageClick(e,index){
        const { areDetailsLoaded } = this.props;
        const {windowWidth, windowHeight} = this.state;
        e.preventDefault();
        if(!areDetailsLoaded || windowWidth < 768 || windowHeight < 200 ) {
            return null;
        }
        this.onActiveImageChange(index);
        const { toggleOverlayByKey } = this.props;
        toggleOverlayByKey(PRODUCT_GALLERY_POPUP_OVERLAY);
        this.setState({isPopupOpened: true});
        setTimeout(() => {
            this.scrollThumbnailsToCurrentPos();
        }, 300);

    }

    renderExhibitionSlide(media, index) {
        const { media_type } = media;

        switch (media_type) {
            case IMAGE_TYPE:
                return this.renderImageForDesktop(media, index);
            case VIDEO_TYPE:
                return this.renderVideo(media, index);
            case PLACEHOLDER_TYPE:
                return this.renderPlaceholder(index);
            default:
                return null;
        }
    }

    renderExhibition() {
        const {
            gallery
        } = this.props;

        return (
            <ProductExhibition>
                { gallery.map((item, index) => this.renderExhibitionSlide(item, index)) }
            </ProductExhibition>
        );
    }

    renderAdditionalPictures(isPopup) {
        const { gallery } = this.props;
        if (isPopup && gallery.length > 4) {
            return (
                <>
                    { this.renderPrevButton() }
                    <div block="ProductGallery" elem="ThumbnailsWrapper">
                        <div block="ProductGallery" elem="Thumbnails" ref={ this.thumbnailsSliderRef }>
                            { gallery.map(this.renderAdditionalPicture) }
                        </div>
                    </div>
                    { this.renderNextButton({ type: 'down' }) }
                </>
            );
        }

        return (
            <div block="ProductGallery" elem="Thumbnails">
                { gallery.map(this.renderAdditionalPicture) }
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
        if (isMobile.any()) {
            return (
                <div block="ProductGallery">
                    { this.renderAdditionalPictures() }
                    { this.renderSlider() }
                    <VideoPopup />
                </div>
            );
        }

        return (
            <>
                <Popup
                    id={PRODUCT_GALLERY_POPUP_OVERLAY}
                    mix={ { block: 'ProductGallery', elem: 'Popup'} }
                >
                    <div
                        block="ProductGallery"
                        elem="Popup"
                        ref={this.popupImageWrapper}
                        onMouseMove={ this.onPopupImageScroll }
                    >
                        { this.renderProductGallery({ isPopupGallery: true }) }
                    </div>
                </Popup>
                <div block="ProductGallery">
                    { this.renderExhibition() }
                </div>
            </>
        );
    }
}

export default withRouter(ProductGallery);
