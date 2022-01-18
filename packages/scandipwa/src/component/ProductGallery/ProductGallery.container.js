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
import { connect } from 'react-redux';
import { Subscribe } from 'unstated';

import ImageZoomPopup from 'Component/ImageZoomPopup';
import PRODUCT_TYPE from 'Component/Product/Product.config';
import SharedTransitionContainer from 'Component/SharedTransition/SharedTransition.unstated';
import { ProductType } from 'Type/ProductList.type';
import { cacheImages } from 'Util/Cache/Cache';

import ProductGallery from './ProductGallery.component';
import {
    AMOUNT_OF_PLACEHOLDERS,
    IMAGE_TYPE,
    PRODUCT_GALERY_POPUP_ID,
    THUMBNAIL_KEY
} from './ProductGallery.config';

/** @namespace Component/ProductGallery/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isMobile: state.ConfigReducer.device.isMobile
});

/** @namespace Component/ProductGallery/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/ProductGallery/Container */
export class ProductGalleryContainer extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        areDetailsLoaded: PropTypes.bool,
        isMobile: PropTypes.bool.isRequired,
        isZoomEnabled: PropTypes.bool,
        showLoader: PropTypes.bool,

        // Renders empty image switcher, so that when changing active product, transaction
        // between images is not jumping, when parent has multiple images, but child only one
        isWithEmptySwitcher: PropTypes.bool
    };

    static defaultProps = {
        areDetailsLoaded: false,
        isZoomEnabled: false,
        isWithEmptySwitcher: false,
        showLoader: false
    };

    sliderRef = createRef();

    containerFunctions = {
        onActiveImageChange: this.onActiveImageChange.bind(this),
        handleZoomChange: this.handleZoomChange.bind(this),
        disableZoom: this.disableZoom.bind(this),
        handleImageZoomPopupActiveChange: this.handleImageZoomPopupActiveChange.bind(this)
    };

    handleImageZoomPopupClose = this.handleImageZoomPopupClose.bind(this);

    __construct(props) {
        super.__construct(props);

        const { product: { id } = {} } = props;

        this.state = {
            activeImage: this.getBaseImage(),
            isZoomEnabled: false,
            prevProdId: id,
            isImageZoomPopupActive: false
        };
    }

    static getDerivedStateFromProps(props, state) {
        const { product: { id } } = props;
        const { prevProdId, activeImage } = state;

        if (prevProdId === id) {
            return null;
        }

        return { prevProdId: id, activeImage };
    }

    componentDidMount() {
        this.cacheImages();
    }

    componentDidUpdate(prevProps) {
        const {
            product: { media_gallery_entries: mediaGallery = [] },
            isZoomEnabled,
            areDetailsLoaded
        } = this.props;
        const { product: { media_gallery_entries: prevMediaGallery = [] }, isZoomEnabled: prevZoomEnabled } = prevProps;

        if (mediaGallery !== prevMediaGallery || isZoomEnabled !== prevZoomEnabled) {
            this.onActiveImageChange(this.getBaseImage());

            if (areDetailsLoaded && mediaGallery.length > 0) {
                this.cacheImages();
            }
        }
    }

    cacheImages() {
        const {
            product: {
                type_id: type,
                variants = []
            }
        } = this.props;

        if (type !== PRODUCT_TYPE.configurable) {
            return;
        }

        const urls = [];
        variants.forEach(({ media_gallery_entries: mediaGallery = [] }) => {
            if (mediaGallery.length > 0) {
                const { base: { url } = {} } = mediaGallery[0];
                urls.push(url);
            }
        });

        cacheImages(urls);
    }

    handleImageZoomPopupActiveChange(isImageZoomPopupActive) {
        const { isMobile } = this.props;

        if (isMobile) {
            return;
        }

        this.setState({ isImageZoomPopupActive });
    }

    onActiveImageChange(activeImage) {
        this.setState({
            activeImage: Math.abs(activeImage),
            isZoomEnabled: false
        });
    }

    getBaseImage() {
        const {
            product: {
                media_gallery_entries: mediaGallery = []
            }
        } = this.props;

        const baseImage = mediaGallery.find((value) => value.types.includes(IMAGE_TYPE));
        const { position = 0 } = baseImage || {};

        if (!mediaGallery.length) {
            return 0;
        }

        const positionsArray = mediaGallery.reduce((acc, item) => {
            const { position } = item;

            acc.push(position);

            return acc;
        }, []).sort((a, b) => a - b);

        return positionsArray.findIndex((value) => value === position);
    }

    getGalleryPictures() {
        const {
            areDetailsLoaded,
            product: {
                media_gallery_entries: mediaGallery = [],
                [THUMBNAIL_KEY]: { url: thumbnailUrl } = {},
                [IMAGE_TYPE]: { url: imageTypeUrl } = {},
                name
            }
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
                media_type: IMAGE_TYPE
            },
            ...placeholders
        ];
    }

    containerProps() {
        const { activeImage, isZoomEnabled, isImageZoomPopupActive } = this.state;
        const {
            product: { id },
            isMobile,
            isWithEmptySwitcher,
            showLoader
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
            showLoader
        };
    }

    /**
     * Returns the name of the product this gallery if for
     * @private
     */
    _getProductName() {
        const { product: { name = '' } } = this.props;

        return name;
    }

    disableZoom() {
        document.documentElement.classList.remove('overscrollPrevented');
        this.setState({ isZoomEnabled: false });
    }

    handleZoomChange(args) {
        const { isZoomEnabled } = this.state;

        if (args.scale !== 1) {
            if (isZoomEnabled) {
                return;
            }
            document.documentElement.classList.add('overscrollPrevented');
            this.setState({ isZoomEnabled: true });
        }
    }

    handleImageZoomPopupClose() {
        this.handleImageZoomPopupActiveChange(false);
    }

    render() {
        const { isImageZoomPopupActive, activeImage } = this.state;

        return (
            <ImageZoomPopup
              isActive={ isImageZoomPopupActive }
              onClose={ this.handleImageZoomPopupClose }
              activeImageId={ activeImage }
              popupId={ PRODUCT_GALERY_POPUP_ID }
            >
                <Subscribe to={ [SharedTransitionContainer] }>
                    { ({ registerSharedElementDestination }) => (
                        <ProductGallery
                          registerSharedElementDestination={ registerSharedElementDestination }
                          { ...this.containerProps() }
                          { ...this.containerFunctions }
                        />
                    ) }
                </Subscribe>
            </ImageZoomPopup>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductGalleryContainer);
