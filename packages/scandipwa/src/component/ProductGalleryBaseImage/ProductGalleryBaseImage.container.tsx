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

import { Component, ComponentType } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { ReactElement } from 'Type/Common.type';
import media, { PRODUCT_MEDIA } from 'Util/Media/Media';

import ProductGallery from './ProductGalleryBaseImage.component';
import { INITIAL_SCALE, TRANSFORMATION_DELAY, TRANSFORMATION_SPEED } from './ProductGalleryBaseImage.config';
import { ProductGalleryBaseImageContainerProps, ProductGalleryComponentProps } from './ProductGalleryBaseImage.type';

/** @namespace Component/ProductGalleryBaseImage/Container */
export class ProductGalleryBaseImageContainer<
P extends Readonly<ProductGalleryBaseImageContainerProps> = Readonly<ProductGalleryBaseImageContainerProps>,
S extends ProductGalleryBaseImageContainerState = ProductGalleryBaseImageContainerState,
> extends Component<P, S> {
    shouldComponentUpdate(nextProps: ProductGalleryBaseImageContainerProps): boolean {
        const { scale, mediaData: { id } } = this.props;
        const { scale: nextScale, mediaData: { id: nextId } } = nextProps;

        if (scale !== nextScale || id !== nextId) {
            return true;
        }

        return false;
    }

    componentDidUpdate(prevProps: ProductGalleryBaseImageContainerProps): void {
        const {
            scale,
            previousScale,
            disableZoom,
            location: { pathname },
            setTransform,
        } = this.props;
        const { location: { pathname: prevPathname } } = prevProps;

        if (pathname !== prevPathname && scale !== INITIAL_SCALE) {
            setTimeout(
                () => setTransform(null, null, INITIAL_SCALE, TRANSFORMATION_SPEED),
                TRANSFORMATION_DELAY,
            );
        }

        if (scale === 1 && previousScale !== 1) {
            disableZoom();
        }
    }

    containerProps(): ProductGalleryComponentProps {
        return {
            alt: this._getAlt(),
            src: this._getSrc(),
        };
    }

    _getAlt(): string {
        const { mediaData: { label } = {} } = this.props;

        return label || '';
    }

    _getSrc(): string | undefined {
        const {
            mediaData: { file, base: { url: baseUrl } = {} },
            isZoomEnabled,
        } = this.props;

        if (!isZoomEnabled) {
            return baseUrl || media(file, PRODUCT_MEDIA);
        }

        return file ? media(file, PRODUCT_MEDIA) : baseUrl;
    }

    render(): ReactElement {
        return (
            <ProductGallery
              { ...this.containerProps() }
            />
        );
    }
}

export default withRouter(
    ProductGalleryBaseImageContainer as unknown as ComponentType<
    RouteComponentProps & ProductGalleryBaseImageContainerProps
    >,
);
