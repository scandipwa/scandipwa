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

import { createRef, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Subscribe } from 'unstated-typescript';

import ImageZoomPopup from 'Component/ImageZoomPopup';
import { ProductType } from 'Component/Product/Product.config';
import SharedTransitionContainer from 'Component/SharedTransition/SharedTransition.unstated';
import { MediaGalleryEntry } from 'Query/ProductList.type';
import { ReactElement } from 'Type/Common.type';
import { cacheImages } from 'Util/Cache/Cache';
import { RootState } from 'Util/Store/Store.type';

import ProductGallery from './ProductGallery.component';
import {
    AMOUNT_OF_PLACEHOLDERS,
    MediaType,
    PRODUCT_GALLERY_POPUP_ID,
    THUMBNAIL_KEY,
} from './ProductGallery.config';
import {
    ProductGalleryComponentContainerPropKeys,
    ProductGalleryComponentProps,
    ProductGalleryContainerFunctions,
    ProductGalleryContainerMapDispatchProps,
    ProductGalleryContainerMapStateProps,
    ProductGalleryContainerProps,
    ProductGalleryContainerState,
    SharedTransitionContainerRenderFnProps,
    SliderWithDraggableRef,
} from './ProductGallery.type';

/** @namespace Component/ProductGallery/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): ProductGalleryContainerMapStateProps => ({
    isMobile: state.ConfigReducer.device.isMobile,
});

/** @namespace Component/ProductGallery/Container/mapDispatchToProps */
export const mapDispatchToProps = (): ProductGalleryContainerMapDispatchProps => ({});

/** @namespace Component/ProductGallery/Container */
export class ProductGalleryContainer extends PureComponent<ProductGalleryContainerProps, ProductGalleryContainerState> {
    static defaultProps: Partial<ProductGalleryContainerProps> = {
        areDetailsLoaded: false,
        isZoomEnabled: false,
        isWithEmptySwitcher: false,
        showLoader: false,
    };

    sliderRef = createRef<SliderWithDraggableRef>();

    containerFunctions: ProductGalleryContainerFunctions = {
        onActiveImageChange: this.onActiveImageChange.bind(this),
        handleZoomChange: this.handleZoomChange.bind(this),
        disableZoom: this.disableZoom.bind(this),
        handleImageZoomPopupActiveChange: this.handleImageZoomPopupActiveChange.bind(this),
    };

    __construct(props: ProductGalleryContainerProps): void {
        super.__construct?.(props);

        this.handleImageZoomPopupClose = this.handleImageZoomPopupClose.bind(this);

        const { product: { id } = {} } = props;

        this.state = {
            activeImage: this.getBaseImage(true),
            isZoomEnabled: false,
            prevProdId: id,
            isImageZoomPopupActive: false,
        };
    }

    static getDerivedStateFromProps(
        props: ProductGalleryContainerProps,
        state: ProductGalleryContainerState,
    ): Partial<ProductGalleryContainerState> | null {
        const { product: { id } } = props;
        const { prevProdId, activeImage } = state;

        if (prevProdId === id) {
            return null;
        }

        return { prevProdId: id, activeImage };
    }

    componentDidMount(): void {
        this.cacheImages();
    }

    componentDidUpdate(prevProps: ProductGalleryContainerProps): void {
        const {
            product: { media_gallery_entries: mediaGallery = [] },
            isZoomEnabled,
            areDetailsLoaded,
        } = this.props;
        const { product: { media_gallery_entries: prevMediaGallery = [] }, isZoomEnabled: prevZoomEnabled } = prevProps;

        if (mediaGallery !== prevMediaGallery || isZoomEnabled !== prevZoomEnabled) {
            this.onActiveImageChange(this.getBaseImage());

            if (areDetailsLoaded && mediaGallery.length > 0) {
                this.cacheImages();
            }
        }
    }

    cacheImages(): void {
        const {
            product: {
                type_id: type,
                variants = [],
            },
        } = this.props;

        if (type !== ProductType.CONFIGURABLE) {
            return;
        }

        const urls: string[] = [];

        variants.forEach(({ media_gallery_entries: mediaGallery = [] }) => {
            if (mediaGallery.length > 0) {
                const { base: { url = '' } = {} } = mediaGallery[ 0 ];

                urls.push(url);
            }
        });

        cacheImages(urls);
    }

    handleImageZoomPopupActiveChange(isImageZoomPopupActive: boolean): void {
        const { isMobile } = this.props;

        if (isMobile) {
            return;
        }

        this.setState({ isImageZoomPopupActive });
    }

    onActiveImageChange(activeImage?: number): void {
        this.setState({
            activeImage: activeImage !== undefined ? Math.abs(activeImage) : activeImage,
            isZoomEnabled: false,
        });
    }

    getBaseImage(isInitial?: boolean): number | undefined {
        const {
            product: {
                media_gallery_entries: mediaGallery = [],
            },
        } = this.props;

        const baseImage = mediaGallery.find((value) => value.types.includes(MediaType.IMAGE));
        const { position = 0 } = baseImage || {};

        if (isInitial && !mediaGallery.length) {
            return undefined;
        }

        if (!mediaGallery.length) {
            return 0;
        }

        const positionsArray = mediaGallery.reduce((acc: number[], item) => {
            const { position } = item;

            acc.push(position);

            return acc;
        }, []).sort((a, b) => a - b);

        const returnValue = positionsArray.findIndex((value) => value === position);

        if (returnValue === -1) {
            return 0;
        }

        return returnValue;
    }

    getGalleryPictures(): MediaGalleryEntry[] {
        const {
            areDetailsLoaded,
            product: {
                media_gallery_entries: mediaGallery = [],
                [ THUMBNAIL_KEY ]: { url: thumbnailUrl = '' } = {},
                [ MediaType.IMAGE ]: { url: imageTypeUrl = '' } = {},
                name,
            },
        } = this.props;

        const url = imageTypeUrl || thumbnailUrl;

        if (mediaGallery.length) {
            return mediaGallery
                .filter(({ disabled }) => !disabled)
                .sort((a, b) => a.position - b.position);
        }

        if (!url) {
            return Array(AMOUNT_OF_PLACEHOLDERS + 1).fill({ media_type: 'placeholder' });
        }

        const placeholders = !areDetailsLoaded
            ? Array(AMOUNT_OF_PLACEHOLDERS).fill({ media_type: 'placeholder' }) : [];

        return [
            {
                thumbnail: { url },
                base: { url },
                id: THUMBNAIL_KEY,
                label: name,
                media_type: MediaType.IMAGE,
            },
            ...placeholders,
        ];
    }

    containerProps(): Pick<ProductGalleryComponentProps, ProductGalleryComponentContainerPropKeys> {
        const { activeImage, isZoomEnabled, isImageZoomPopupActive } = this.state;
        const {
            product: { id },
            isMobile,
            isWithEmptySwitcher,
            showLoader,
        } = this.props;

        return {
            gallery: this.getGalleryPictures(),
            productName: this._getProductName(),
            activeImage,
            isZoomEnabled,
            productId: id,
            isMobile,
            isImageZoomPopupActive,
            sliderRef: this.sliderRef,
            isWithEmptySwitcher,
            showLoader,
        };
    }

    /**
     * Returns the name of the product this gallery if for
     * @private
     */
    _getProductName(): string {
        const { product: { name = '' } } = this.props;

        return name;
    }

    disableZoom(): void {
        document.documentElement.classList.remove('overscrollPrevented');
        this.setState({ isZoomEnabled: false });
    }

    handleZoomChange(args: { scale: number }): void {
        const { isZoomEnabled } = this.state;

        if (args.scale !== 1) {
            if (isZoomEnabled) {
                return;
            }
            document.documentElement.classList.add('overscrollPrevented');
            this.setState({ isZoomEnabled: true });
        }
    }

    handleImageZoomPopupClose(): void {
        this.handleImageZoomPopupActiveChange(false);
    }

    render(): ReactElement {
        const { isImageZoomPopupActive, activeImage } = this.state;

        return (
            <ImageZoomPopup
              isActive={ isImageZoomPopupActive }
              onClose={ this.handleImageZoomPopupClose }
              activeImageId={ activeImage }
              popupId={ PRODUCT_GALLERY_POPUP_ID }
            >
                <Subscribe to={ [SharedTransitionContainer] }>
                    { (props) => {
                        const {
                            registerSharedElementDestination,
                        } = props as unknown as SharedTransitionContainerRenderFnProps;

                        return (
                            <ProductGallery
                              registerSharedElementDestination={ registerSharedElementDestination }
                              { ...this.containerProps() }
                              { ...this.containerFunctions }
                            />
                        );
                    } }
                </Subscribe>
            </ImageZoomPopup>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductGalleryContainer);
