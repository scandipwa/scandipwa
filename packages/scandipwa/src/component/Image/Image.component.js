/* eslint-disable react/no-did-update-set-state */

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

import { MixType, RefType } from 'Type/Common.type';
import { noopFn } from 'Util/Common';

import {
    IMAGE_LOADED, IMAGE_LOADING, IMAGE_NOT_FOUND, IMAGE_NOT_SPECIFIED
} from './Image.config';

import './Image.style';

/**
 * Image component
 * Images are loaded only when they appear in a viewport
 * @class Image
 * @namespace Component/Image/Component
 */
export class Image extends PureComponent {
    static propTypes = {
        isPlaceholder: PropTypes.bool,
        title: PropTypes.string,
        src: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool
        ]),
        style: PropTypes.shape({
            width: PropTypes.string,
            height: PropTypes.string
        }),
        alt: PropTypes.string,
        className: PropTypes.string,
        ratio: PropTypes.oneOf([
            '4x3',
            '16x9',
            'square',
            'custom'
        ]),
        wrapperSize: PropTypes.shape({
            height: PropTypes.string
        }),
        mix: MixType,
        imageRef: RefType,
        isPlain: PropTypes.bool,
        isCached: PropTypes.bool,

        showIsLoading: PropTypes.bool
    };

    static defaultProps = {
        src: '',
        alt: '',
        wrapperSize: {},
        style: {},
        title: null,
        isPlain: false,
        isPlaceholder: false,
        isCached: false,
        className: '',
        ratio: 'square',
        mix: {},
        showIsLoading: false,
        imageRef: noopFn
    };

    image = createRef();

    state = { imageStatus: IMAGE_LOADING };

    renderMap = {
        [IMAGE_NOT_FOUND]: this.renderImageNotFound.bind(this),
        [IMAGE_NOT_SPECIFIED]: this.renderImageNotSpecified.bind(this),
        [IMAGE_LOADING]: this.renderLoadedImage.bind(this),
        [IMAGE_LOADED]: this.renderLoadedImage.bind(this)
    };

    onError = this.onError.bind(this);

    onLoad = this.onLoad.bind(this);

    componentDidMount() {
        this.onImageChange();
    }

    componentDidUpdate(prevProps) {
        const { src: prevSrc } = prevProps;
        const { src } = this.props;

        if (src !== prevSrc) {
            this.onImageChange();
        }
    }

    onImageChange() {
        const { src, isCached } = this.props;

        if (!src) {
            return this.setState({ imageStatus: IMAGE_NOT_SPECIFIED });
        }

        if (isCached) {
            return this.setState({ imageStatus: IMAGE_LOADED });
        }

        return this.setState({ imageStatus: IMAGE_LOADING });
    }

    onError() {
        this.setState({ imageStatus: IMAGE_NOT_FOUND });
    }

    onLoad() {
        this.setState({ imageStatus: IMAGE_LOADED });
    }

    renderImageNotFound() {
        if (navigator.onLine) {
            return (
                <span block="Image" elem="Content">{ __('Image not found') }</span>
            );
        }

        return <span block="Image" elem="Content" mods={ { isOffline: true } } />;
    }

    renderStyledImage() {
        const {
            alt,
            src,
            style,
            title
        } = this.props;
        const { imageStatus } = this.state;

        return (
            <img
              block="Image"
              elem="Image"
              src={ src || '' }
              alt={ alt }
              mods={ { isLoading: imageStatus === IMAGE_LOADING } }
              style={ style }
              title={ title }
              onLoad={ this.onLoad }
              onError={ this.onError }
              loading="lazy"
            />
        );
    }

    renderPlainImage() {
        const {
            alt,
            src,
            style,
            title,
            className
        } = this.props;

        return (
            <img
              block={ className }
              src={ src || '' }
              alt={ alt }
              style={ style }
              title={ title }
              onLoad={ this.onLoad }
              onError={ this.onError }
              loading="lazy"
            />
        );
    }

    renderImageNotSpecified() {
        return (
            <span block="Image" elem="Content">{ __('Image not specified') }</span>
        );
    }

    renderLoadedImage() {
        const { isPlain } = this.props;

        if (isPlain) {
            return this.renderPlainImage();
        }

        return this.renderStyledImage();
    }

    renderImage() {
        const { isPlaceholder } = this.props;
        const { imageStatus } = this.state;

        if (isPlaceholder) {
            return null;
        }

        const render = this.renderMap[imageStatus];

        if (!render) {
            return null;
        }

        return render();
    }

    renderLoader() {
        const { showIsLoading } = this.props;
        const { imageStatus } = this.state;

        if (imageStatus !== IMAGE_LOADING || !showIsLoading) {
            return null;
        }

        return (
            <div block="Image" elem="Loader" />
        );
    }

    render() {
        const {
            ratio,
            mix,
            isPlaceholder,
            wrapperSize,
            src,
            imageRef,
            className,
            isPlain
        } = this.props;

        const { imageStatus } = this.state;

        // render image as is: without additional container and additional styles
        if (isPlain) {
            return this.renderImage();
        }

        return (
            <div
              block="Image"
              ref={ imageRef }
              mods={ {
                  ratio,
                  imageStatus: imageStatus.toLowerCase(),
                  isPlaceholder,
                  hasSrc: !!src
              } }
              mix={ mix }
              style={ wrapperSize }
              // eslint-disable-next-line react/forbid-dom-props
              className={ className }
            >
                { this.renderImage() }
                { this.renderLoader() }
            </div>
        );
    }
}

export default Image;
