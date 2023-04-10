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

import {
    ComponentType,
    createRef,
    PureComponent,
    ReactNode,
    Suspense,
} from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { TransformWrapper } from 'react-zoom-pan-pinch';

import {
    ARROW_SAFE_AREA,
    CAROUSEL_ITEM_GAP,
    CAROUSEL_ITEM_WIDTH,
} from 'Component/CarouselScroll/CarouselScroll.config';
import Image from 'Component/Image';
import { ImageRatio } from 'Component/Image/Image.type';
import ProductGalleryBaseImage from 'Component/ProductGalleryBaseImage';
import ProductGalleryThumbnailImage from 'Component/ProductGalleryThumbnailImage';
import Slider from 'Component/Slider';
import { MediaGalleryEntry } from 'Query/ProductList.type';
import { ReactElement } from 'Type/Common.type';
import CSS from 'Util/CSS';
import { lowPriorityLazy, setLoadedFlag } from 'Util/Request/LowPriorityLoad';

import {
    MAX_ZOOM_SCALE,
    MediaType,
} from './ProductGallery.config';
import {
    ProductGalleryComponentProps,
    ProductGalleryComponentState,
    TransformRenderFnProps,
} from './ProductGallery.type';

import './ProductGallery.style';

export const CarouselScroll = lowPriorityLazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "product-overlays" */
    'Component/CarouselScroll'
));
export const VideoPopup = lowPriorityLazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "product-overlays" */
    'Component/VideoPopup'
));
export const VideoThumbnail = lowPriorityLazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "product-overlays" */
    'Component/VideoThumbnail'
));

/**
 * Product gallery
 * @class ProductGallery
 * @namespace Component/ProductGallery/Component
 */
export class ProductGalleryComponent extends PureComponent<ProductGalleryComponentProps, ProductGalleryComponentState> {
    static defaultProps: Partial<ProductGalleryComponentProps> = {
        productId: 0,
    };

    timeout: NodeJS.Timeout | null = null;

    maxScale = MAX_ZOOM_SCALE;

    imageRef = createRef<HTMLDivElement>();

    galleryRef = createRef<HTMLDivElement>();

    state: ProductGalleryComponentState = {
        scrollEnabled: true,
        slidesCount: 7,
        prevZoom: false,
    };

    calculateGallerySize = this._calculateGallerySize.bind(this);

    __construct(props: ProductGalleryComponentProps): void {
        super.__construct?.(props);

        this.handleSliderClick = this.handleSliderClick.bind(this);
        this.onWheel = this.onWheel.bind(this);
        this.renderSlide = this.renderSlide.bind(this);
    }

    componentDidMount(): void {
        this.updateSharedDestinationElement();
        window.addEventListener('resize', this.calculateGallerySize);
    }

    componentDidUpdate(prevProps: ProductGalleryComponentProps): void {
        const {
            productId,
            location: { pathname = '' } = {},
            sliderRef,
            isImageZoomPopupActive,
        } = this.props;

        const {
            productId: prevProductId,
            location: { pathname: prevPathname = '' } = {},
        } = prevProps;

        const { prevZoom } = this.state;

        if (productId !== prevProductId) {
            this.updateSharedDestinationElement();
        }

        if (sliderRef?.current?.draggableRef && pathname !== prevPathname) {
            CSS.setVariable(
                sliderRef.current.draggableRef,
                'animation-speed',
                0,
            );
        }

        if (isImageZoomPopupActive !== prevZoom) {
            this.handleZoomChange(isImageZoomPopupActive);
        }
    }

    componentWillUnmount(): void {
        window.removeEventListener('resize', this.calculateGallerySize);
    }

    handleZoomChange(prevZoom: boolean): void {
        setTimeout(this.calculateGallerySize, 0);
        this.setState({ prevZoom });
    }

    _calculateGallerySize(): void {
        const { isMobile } = this.props;
        const ref = this.galleryRef.current;

        if (!ref || isMobile) {
            return;
        }
        const { width } = ref.getBoundingClientRect();

        const slidesCount = Math.floor((width - ARROW_SAFE_AREA * 2) / (CAROUSEL_ITEM_WIDTH + CAROUSEL_ITEM_GAP));

        this.setState({ slidesCount });
    }

    handleSliderClick(): void {
        const {
            handleImageZoomPopupActiveChange,
            gallery,
            activeImage,
        } = this.props;

        const { media_type } = gallery[activeImage];

        if (media_type === MediaType.VIDEO) {
            return;
        }

        handleImageZoomPopupActiveChange(true);
    }

    updateSharedDestinationElement(): void {
        const { registerSharedElementDestination } = this.props;

        registerSharedElementDestination(this.imageRef);
    }

    renderAdditionalPicture(media: MediaGalleryEntry, index = 0): ReactElement {
        const { productName } = this.props;

        return (
            <ProductGalleryThumbnailImage
              key={ index }
              media={ media }
              productName={ productName }
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
    renderVideo(media: MediaGalleryEntry, index: number): ReactElement {
        const { isImageZoomPopupActive, handleImageZoomPopupActiveChange } = this.props;

        return (
            <Suspense fallback={ null }>
                <VideoThumbnail
                  key={ index }
                  media={ media }
                  isVideoZoomed={ isImageZoomPopupActive }
                  onZoomedVideoClick={ handleImageZoomPopupActiveChange }
                />
            </Suspense>
        );
    }

    renderPlaceholder(index: number): ReactElement {
        return (
            <Image
              key={ index }
              ratio={ ImageRatio.IMG_CUSTOM }
              mix={ {
                  block: 'ProductGallery',
                  elem: 'SliderImage',
                  mods: { isPlaceholder: true },
              } }
              isPlaceholder
            />
        );
    }

    stopScrolling(): void {
        this.setState({ scrollEnabled: false });
        this.timeout = setTimeout(() => {
            this.setState({ scrollEnabled: true });
            this.timeout = null;

            // 20 ms is time give to scroll down, usually that is enough
            // eslint-disable-next-line no-magic-numbers
        }, 20);
    }

    onWheel(zoomState: { scale: number }): void {
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
    renderImage(mediaData: MediaGalleryEntry, index: number): ReactElement {
        const {
            isZoomEnabled,
            handleZoomChange,
            disableZoom,
            isMobile,
            isImageZoomPopupActive,
            showLoader,
            productName,
        } = this.props;
        const { scrollEnabled } = this.state;

        if (!isMobile) {
            const {
                base: { url: baseSrc } = {},
                large: { url: largeSrc } = {},
            } = mediaData;

            const style = isImageZoomPopupActive ? { height: 'auto' } : {};
            const src = isImageZoomPopupActive ? largeSrc || baseSrc : baseSrc;

            return (
                <Image
                  key={ index }
                  src={ src }
                  alt={ productName }
                  ratio={ ImageRatio.IMG_CUSTOM }
                  mix={ {
                      block: 'ProductGallery',
                      elem: 'SliderImage',
                      mods: { isPlaceholder: !src },
                  } }
                  isPlaceholder={ !src }
                  style={ style }
                  showIsLoading={ showLoader }
                  onImageLoad={ setLoadedFlag }
                />
            );
        }

        return (
            <TransformWrapper
              key={ index }
              onZoomChange={ handleZoomChange }
              onWheel={ this.onWheel }
              wheel={ { limitsOnWheel: true, disabled: !scrollEnabled } }
            //   doubleClick={ { mode: 'reset' } }
              pan={ {
                  disabled: !isZoomEnabled,
                  velocity: false,
              } }
              options={ {
                  limitToBounds: true,
                  minScale: 1,
              } }
            >
                { /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */ }
                { /* @ts-ignore */ }
                { (params: TransformRenderFnProps): ReactNode => {
                    const {
                        scale,
                        previousScale,
                        resetTransform,
                        setTransform,
                    } = params;

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
    renderSlide(media: MediaGalleryEntry, index: number): ReactElement {
        const { media_type } = media;

        switch (media_type) {
        case MediaType.IMAGE:
            return this.renderImage(media, index);
        case MediaType.VIDEO:
            return this.renderVideo(media, index);
        case MediaType.PLACEHOLDER:
            return this.renderPlaceholder(index);
        default:
            return null;
        }
    }

    renderAdditionalPictures(): ReactElement {
        const {
            gallery,
            isImageZoomPopupActive,
            activeImage,
            onActiveImageChange,
            isWithEmptySwitcher,
        } = this.props;

        const { slidesCount } = this.state;

        if (gallery.length === 1) {
            return <div block="ProductGallery" elem="Additional" mods={ { isWithEmptySwitcher } } />;
        }

        return (
            <div block="ProductGallery" elem="Additional" mods={ { isImageZoomPopupActive } }>
                <Suspense fallback={ <div /> }>
                    <CarouselScroll
                      activeItemId={ activeImage }
                      onChange={ onActiveImageChange }
                      showedItemCount={ slidesCount }
                      isImageZoomPopupActive={ isImageZoomPopupActive }
                    >
                        { gallery.map(this.renderAdditionalPicture.bind(this)) }
                    </CarouselScroll>
                </Suspense>
            </div>
        );
    }

    getImageUrl(): string {
        const {
            gallery: [
                {
                    thumbnail: {
                        url = '',
                    } = {},
                },
            ] = [],
        } = this.props;

        return url;
    }

    renderSlider(): ReactElement {
        const {
            gallery,
            activeImage,
            isZoomEnabled,
            onActiveImageChange,
            isImageZoomPopupActive,
            sliderRef,
            isMobile,
        } = this.props;

        const mods = {
            isImageZoomPopupActive,
            isZoomInCursor: !isImageZoomPopupActive,
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

    render(): ReactElement {
        return (
            <div block="ProductGallery" ref={ this.galleryRef }>
                { this.renderSlider() }
                { this.renderAdditionalPictures() }
                <Suspense fallback={ null }>
                    <VideoPopup />
                </Suspense>
            </div>
        );
    }
}

export default withRouter(
    ProductGalleryComponent as unknown as ComponentType<
    RouteComponentProps & ProductGalleryComponentProps
    >,
);
