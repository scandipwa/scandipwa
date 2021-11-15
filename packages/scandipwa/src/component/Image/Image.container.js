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
import { PureComponent } from 'react';

import { IMAGE_HUNDRED_PERCENT } from 'Component/Image/Image.config';
import { MixType, RefType } from 'Type/Common.type';
import { noopFn } from 'Util/Common';

import Image from './Image.component';

/** @namespace Component/Image/Container */
export class ImageContainer extends PureComponent {
    static propTypes = {
        isPlaceholder: PropTypes.bool,
        src: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool
        ]),
        style: PropTypes.objectOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool
        ])),
        width: PropTypes.string,
        height: PropTypes.string,
        alt: PropTypes.string,
        ratio: PropTypes.oneOf([
            '4x3',
            '16x9',
            'square',
            'custom'
        ]),
        mix: MixType,
        className: PropTypes.string,
        imageRef: RefType,
        title: PropTypes.string,
        isPlain: PropTypes.bool,
        showIsLoading: PropTypes.bool
    };

    static defaultProps = {
        src: '',
        alt: '',
        ratio: 'square',
        mix: {},
        height: '',
        width: '',
        isPlaceholder: false,
        style: {},
        title: null,
        className: '',
        imageRef: noopFn,
        isPlain: false,
        showIsLoading: false
    };

    containerProps() {
        const {
            isPlaceholder,
            src,
            title,
            alt,
            ratio,
            mix,
            imageRef,
            isPlain,
            showIsLoading
        } = this.props;

        return {
            style: this._getStyle(),
            wrapperSize: this._getWrapperSize(),
            isPlaceholder,
            src,
            title,
            alt,
            className: this._getCorrectClassNames(),
            ratio,
            mix,
            imageRef,
            isPlain,
            showIsLoading,
            isCached: this._isCached()
        };
    }

    _isCached() {
        const { showIsLoading, src } = this.props;

        if (!showIsLoading) {
            return false;
        }

        if (
            window.prefetchedImages
            && window.prefetchedImages[src]
            && window.prefetchedImages[src].complete
        ) {
            return true;
        }

        const img = document.createElement('img');
        img.src = src;

        if (img.complete) {
            return true;
        }

        return false;
    }

    _parseSize(size) {
        const trimmedSize = size.trim();

        if (!trimmedSize) {
            return IMAGE_HUNDRED_PERCENT;
        }

        const PX_LENGTH = -2;
        const PERCENT_LENGTH = -1;

        if (
            trimmedSize.slice(PX_LENGTH) === 'px'
            || trimmedSize.slice(PERCENT_LENGTH) === '%'
        ) {
            return trimmedSize;
        }

        return `${trimmedSize}px`;
    }

    _getCorrectClassNames() {
        const { width, height, className } = this.props;

        const trueMap = [
            this._parseSize(height) === IMAGE_HUNDRED_PERCENT,
            this._parseSize(width) === IMAGE_HUNDRED_PERCENT
        ];
        const classMap = [
            'Image-WidthFull',
            'Image-HeightFull'
        ];

        const classes = classMap.filter((_, index) => trueMap[index]);

        return [className, ...classes].join(' ');
    }

    _getCorrectSize() {
        const { width, height } = this.props;

        const correctHeight = this._parseSize(height);
        const correctWidth = this._parseSize(width);

        if (correctHeight === IMAGE_HUNDRED_PERCENT && correctWidth === IMAGE_HUNDRED_PERCENT) {
            return {};
        }

        if (correctHeight === IMAGE_HUNDRED_PERCENT && correctWidth) {
            return { width: correctWidth };
        }

        if (correctHeight && correctWidth === IMAGE_HUNDRED_PERCENT) {
            return { height: correctHeight };
        }

        return { width: correctWidth, height: correctHeight };
    }

    _getStyle() {
        const { style } = this.props;

        return { ...this._getCorrectSize(), ...style };
    }

    _getWrapperSize() {
        const size = this._getCorrectSize();
        const { height, width } = size;

        if (!height || (height.slice(-1) === '%' && (!width || width.slice(-1) === '%'))) {
            return {};
        }

        return height.slice(-1) !== '%'
            ? { paddingBottom: height }
            : { paddingBottom: width };
    }

    render() {
        return (
            <Image
              { ...this.containerProps() }
            />
        );
    }
}

export default ImageContainer;
