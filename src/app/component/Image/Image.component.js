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

import { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import { MixType } from 'Type/Common';
import './Image.style';

/**
 * Image component
 * Images are loaded only when they appear in a viewport
 * @class Image
 */

export const IMAGE_LOADING = 0;
export const IMAGE_LOADED = 1;
export const IMAGE_NOT_FOUND = 2;
export const IMAGE_NOT_SPECIFIED = 3;

export default class Image extends PureComponent {
    static propTypes = {
        isPlaceholder: PropTypes.bool,
        src: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool
        ]),
        style: PropTypes.shape({
            width: PropTypes.string,
            height: PropTypes.string
        }),
        alt: PropTypes.string,
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
        imageRef: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.shape({ current: PropTypes.instanceOf(Element) })
        ])
    };

    static defaultProps = {
        src: '',
        alt: '',
        ratio: 'square',
        mix: {},
        isPlaceholder: false,
        wrapperSize: {},
        style: {},
        imageRef: () => {}
    };

    image = createRef();

    state = { imageStatus: IMAGE_LOADING };

    onError = this.onError.bind(this);

    onLoad = this.onLoad.bind(this);

    componentDidMount() {
        this.onImageChange();
    }

    componentDidUpdate(prevProps) {
        const { src: prevSrc } = prevProps;
        const { src } = this.props;

        if (src !== prevSrc) this.onImageChange();
    }

    onImageChange() {
        const { src } = this.props;

        if (!src) return this.setState({ imageStatus: IMAGE_NOT_SPECIFIED });
        return this.setState({ imageStatus: IMAGE_LOADING });
    }

    onError() {
        this.setState({ imageStatus: IMAGE_NOT_FOUND });
    }

    onLoad() {
        this.setState({ imageStatus: IMAGE_LOADED });
    }

    renderImage() {
        const {
            alt, src, isPlaceholder, style
        } = this.props;
        const { imageStatus } = this.state;

        if (isPlaceholder) {
            return null;
        }

        switch (imageStatus) {
        case IMAGE_NOT_FOUND:
            return (
                <span block="Image" elem="Content">{ __('Image not found') }</span>
            );
        case IMAGE_NOT_SPECIFIED:
            return (
                <span block="Image" elem="Content">{ __('Image not specified') }</span>
            );
        case IMAGE_LOADED:
        case IMAGE_LOADING:
            return (
                <img
                  block="Image"
                  elem="Image"
                  src={ src || '' }
                  alt={ alt }
                  style={ style }
                  onLoad={ this.onLoad }
                  onError={ this.onError }
                />
            );
        default:
            return null;
        }
    }

    render() {
        const {
            ratio,
            mix,
            isPlaceholder,
            wrapperSize,
            src,
            imageRef
        } = this.props;

        const { imageStatus } = this.state;

        return (
            <div
              block="Image"
              ref={ imageRef }
              mods={ {
                  ratio,
                  imageStatus,
                  isPlaceholder,
                  hasSrc: !!src
              } }
              mix={ mix }
              style={ wrapperSize }
            >
                { this.renderImage() }
            </div>
        );
    }
}
