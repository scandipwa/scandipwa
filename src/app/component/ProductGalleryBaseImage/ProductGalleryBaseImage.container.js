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
import { Component } from 'react';
import { withRouter } from 'react-router';
import { LocationType } from 'Type/Common';

import media, { PRODUCT_MEDIA } from 'Util/Media/Media';

import ProductGallery from './ProductGalleryBaseImage.component';

export const TRANSFORMATION_DELAY = 0;
export const TRANSFORMATION_SPEED = 0;
export const INITIAL_SCALE = 1;

export class ProductGalleryBaseImageContainer extends Component {
    static propTypes = {
        disableZoom: PropTypes.func.isRequired,
        scale: PropTypes.number.isRequired,
        previousScale: PropTypes.number.isRequired,
        index: PropTypes.number.isRequired,
        mediaData: PropTypes.shape({
            label: PropTypes.string,
            file: PropTypes.string,
            base: PropTypes.shape({
                url: PropTypes.string
            })
        }).isRequired,
        isZoomEnabled: PropTypes.bool.isRequired,
        setTransform: PropTypes.func.isRequired,
        location: LocationType.isRequired
    };

    shouldComponentUpdate(nextProps) {
        const { scale, mediaData: { id } } = this.props;
        const { scale: nextScale, mediaData: { id: nextId } } = nextProps;

        if (scale !== nextScale || id !== nextId) return true;

        return false;
    }

    componentDidUpdate(prevProps) {
        const {
            scale,
            previousScale,
            disableZoom,
            location: { pathname },
            setTransform
        } = this.props;
        const { location: { pathname: prevPathname } } = prevProps;

        if (pathname !== prevPathname && scale !== INITIAL_SCALE) {
            setTimeout(
                () => setTransform(null, null, INITIAL_SCALE, TRANSFORMATION_SPEED),
                TRANSFORMATION_DELAY
            );
        }

        if (scale === 1 && previousScale !== 1) {
            disableZoom();
        }
    }

    containerProps = () => ({
        alt: this._getAlt(),
        src: this._getSrc()
    });

    _getAlt() {
        const { mediaData: { label } = {} } = this.props;
        return label || '';
    }

    _getSrc() {
        const {
            mediaData: { file, base: { url: baseUrl } = {} },
            isZoomEnabled
        } = this.props;

        if (!isZoomEnabled) return baseUrl || media(file, PRODUCT_MEDIA);
        return file ? media(file, PRODUCT_MEDIA) : baseUrl;
    }

    render() {
        return (
            <ProductGallery
              { ...this.containerProps() }
            />
        );
    }
}

export default withRouter(ProductGalleryBaseImageContainer);
