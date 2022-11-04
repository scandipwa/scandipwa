/* eslint-disable react/no-did-update-set-state */

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

import { ReactElement } from 'Type/Common.type';
import { noopFn } from 'Util/Common';

import { IMAGE_EAGER_LOADING_POSITION_FROM_TOP, ImageState } from './Image.config';
import { ImageComponentProps, ImageComponentState, ImageRatio } from './Image.type';

import './Image.style';

/**
 * Image component
 * Images are loaded only when they appear in a viewport
 * @class Image
 * @namespace Component/Image/Component
 */
export class ImageComponent<
P extends ImageComponentProps = ImageComponentProps,
S extends ImageComponentState = ImageComponentState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<ImageComponentProps> = {
        src: '',
        alt: '',
        wrapperSize: {},
        style: {},
        title: undefined,
        isPlain: false,
        isPlaceholder: false,
        isCached: false,
        className: '',
        ratio: ImageRatio.IMG_SQUARE,
        mix: {},
        showIsLoading: false,
        imageRef: undefined,
        onImageLoad: noopFn,
    };

    image = createRef();

    state: S = {
        imageStatus: ImageState.IMAGE_LOADING,
        isLazyLoading: false,
    } as unknown as S;

    renderMap = {
        [ImageState.IMAGE_NOT_FOUND]: this.renderImageNotFound.bind(this),
        [ImageState.IMAGE_NOT_SPECIFIED]: this.renderImageNotSpecified.bind(this),
        [ImageState.IMAGE_LOADING]: this.renderLoadedImage.bind(this),
        [ImageState.IMAGE_LOADED]: this.renderLoadedImage.bind(this),
    };

    __construct(props: ImageComponentProps): void {
        super.__construct?.(props);

        this.onError = this.onError.bind(this);
        this.onLoad = this.onLoad.bind(this);
    }

    componentDidMount(): void {
        const { imageRef } = this.props;
        this.onImageChange();

        const top = imageRef?.current?.getBoundingClientRect()?.top || 0;

        if (top > IMAGE_EAGER_LOADING_POSITION_FROM_TOP) {
            this.setState({ isLazyLoading: true });
        }
    }

    componentDidUpdate(prevProps: ImageComponentProps): void {
        const { src: prevSrc } = prevProps;
        const { src } = this.props;

        if (src !== prevSrc) {
            this.onImageChange();
        }
    }

    onImageChange(): void {
        const { src, isCached, onImageLoad } = this.props;

        if (!src) {
            return this.setState({ imageStatus: ImageState.IMAGE_NOT_SPECIFIED });
        }

        if (isCached) {
            onImageLoad();

            return this.setState({ imageStatus: ImageState.IMAGE_LOADED });
        }

        return this.setState({ imageStatus: ImageState.IMAGE_LOADING });
    }

    onError(): void {
        this.setState({ imageStatus: ImageState.IMAGE_NOT_FOUND });
    }

    onLoad(): void {
        const { onImageLoad } = this.props;

        onImageLoad();
        this.setState({ imageStatus: ImageState.IMAGE_LOADED });
    }

    renderImageNotFound(): ReactElement {
        if (navigator.onLine) {
            return (
                <span block="Image" elem="Content">{ __('Image not found') }</span>
            );
        }

        return <span block="Image" elem="Content" mods={ { isOffline: true } } />;
    }

    renderStyledImage(): ReactElement {
        const {
            alt,
            src,
            style,
            title,
        } = this.props;
        const { imageStatus, isLazyLoading } = this.state;

        return (
            <img
              block="Image"
              elem="Image"
              src={ src || '' }
              alt={ alt }
              mods={ { isLoading: imageStatus === ImageState.IMAGE_LOADING } }
              style={ style }
              title={ title }
              onLoad={ this.onLoad }
              onError={ this.onError }
              loading={ isLazyLoading ? 'lazy' : 'eager' }
            />
        );
    }

    renderPlainImage(): ReactElement {
        const {
            alt,
            src,
            style,
            title,
            className,
        } = this.props;
        const { isLazyLoading } = this.state;

        return (
            <img
              block={ className }
              src={ src || '' }
              alt={ alt }
              style={ style }
              title={ title }
              onLoad={ this.onLoad }
              onError={ this.onError }
              loading={ isLazyLoading ? 'lazy' : 'eager' }
            />
        );
    }

    renderImageNotSpecified(): ReactElement {
        return (
            <span block="Image" elem="Content">{ __('Image not specified') }</span>
        );
    }

    renderLoadedImage(): ReactElement {
        const { isPlain } = this.props;

        if (isPlain) {
            return this.renderPlainImage();
        }

        return this.renderStyledImage();
    }

    renderImage(): ReactElement {
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

    renderLoader(): ReactElement {
        const { showIsLoading } = this.props;
        const { imageStatus } = this.state;

        if (imageStatus !== ImageState.IMAGE_LOADING || !showIsLoading) {
            return null;
        }

        return (
            <div block="Image" elem="Loader" />
        );
    }

    render(): ReactElement {
        const {
            ratio,
            mix,
            isPlaceholder,
            wrapperSize,
            src,
            imageRef,
            className,
            isPlain,
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
                  hasSrc: !!src,
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

export default ImageComponent;
