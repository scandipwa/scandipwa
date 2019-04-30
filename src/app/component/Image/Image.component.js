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

/* eslint-disable prefer-promise-reject-errors */
// Disabled due promise being reject with custom error (isCanceled)
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Image.style';

/**
 * Image component
 * Images are loaded only when they appear in a viewport
 * @class Image
 */
class Image extends Component {
    constructor(props) {
        super(props);
        this.promiseStorage = [];

        this.state = {
            isImageLoaded: false,
            showImage: false
        };

        this.observer = null;
    }

    componentDidMount() {
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(() => this.showImage(), { timeout: 50 });
        } else {
            setTimeout(this.showImage(), 1);
        }
    }

    componentDidUpdate(prevProps) {
        const { src } = this.props;
        const { src: prevSrc } = prevProps;

        if (src !== prevSrc) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                isImageLoaded: false,
                showImage: false
            });

            this.showImage();
        }
    }

    componentWillUnmount() {
        this.stopObserving();
    }

    /**
     * Listens for every picture element load
     * @param {Object} img SyntheticEvent
     * @return {void}
     */
    onImageLoad(img) {
        const isPlacehodlerLoaded = (img.target.currentSrc.includes('.svg'));
        const isImageLoaded = (img.target.currentSrc.includes('.webp')
            || img.target.currentSrc.includes('.jpg'));

        if (isImageLoaded) {
            this.setState({ isImageLoaded });
        }

        if (isPlacehodlerLoaded) {
            this.setState({ isPlacehodlerLoaded });
        }
    }

    /**
     * Parses given url to get desired extension
     * @param  {Object} img SyntheticEvent
     * @return {void}
     */
    getUrlWithExtension(url, extension) {
        // return url;
        if (url) {
            const path = url.includes('/media/jpg')
                ? url.replace('/media/jpg', `/media/${ extension }`)
                : url.replace('/media', `/media/${ extension }`);
            return path.replace(/\.[^/.]+$/, `.${ extension }`);
        }

        return null;
    }

    stopObserving() {
        if (this.observer) {
            if (this.observer.unobserve) {
                this.observer.unobserve(this.node);
            }
            if (this.observer.disconnect) {
                this.observer.disconnect();
            }
            this.observer = null;
        }
    }

    isInViewport(el) {
        const rect = el.getBoundingClientRect();

        return (
            rect.top >= 0
            && rect.left >= 0
            && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            && rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    showImage() {
        if (this.node && this.isInViewport(this.node)) this.setState({ showImage: true });

        if (this.node) {
            if ('IntersectionObserver' in window) {
                const options = {
                    rootMargin: '0px',
                    threshold: 0.1
                };

                this.observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.intersectionRatio > 0) {
                            this.stopObserving();
                            this.setState({
                                showImage: true
                            });
                        }
                    });
                }, options);
                this.observer.observe(this.node);
            } else {
                this.setState({
                    showImage: true
                });
            }
        }
    }

    render() {
        const {
            isImageLoaded,
            showImage,
            isPlacehodlerLoaded
        } = this.state;

        const {
            block,
            elem,
            mods,
            src,
            alt,
            ratio,
            arePlaceholdersShown,
            showGreyPlaceholder,
            objectFit
        } = this.props;

        const isPathRelative = (path) => {
            const isFullPath = path.match(new RegExp('^(http|https)://'));

            return path.charAt(0) === '/' || isFullPath;
        };

        if (src && !isPathRelative(src)) throw new Error(`${src} is not an absolute path!`);

        const isIcon = src && src.includes('.svg');

        return (
            <picture
              block="Image"
              mods={ {
                  ratio,
                  objectFit,
                  isLoaded: isImageLoaded || (isIcon && isPlacehodlerLoaded),
                  isReal: !!src && !showGreyPlaceholder
              } }
              mix={ { block, elem, mods } }
              ref={ (node) => { this.node = node; } }
              onLoad={ img => this.onImageLoad(img) }
            >
                { (!arePlaceholdersShown || showImage) && src && !isIcon
                    && <>
                        <source srcSet={ src && this.getUrlWithExtension(src, 'webp') } type="image/webp" />
                        <source srcSet={ src } type="image/jpeg" />
                        <source srcSet={ src && src.replace('/media/jpg', '/media') } />
                    </>
                }
                { src && <img src={ this.getUrlWithExtension(src, 'svg') } alt={ alt } /> }
            </picture>
        );
    }
}

Image.propTypes = {
    block: PropTypes.string,
    elem: PropTypes.string,
    mods: PropTypes.instanceOf(Object),
    src: PropTypes.string,
    alt: PropTypes.string,
    ratio: PropTypes.oneOf([
        '4x3',
        '16x9',
        'square',
        'custom'
    ]),
    objectFit: PropTypes.oneOf([
        'cover',
        'contain'
    ]),
    arePlaceholdersShown: PropTypes.bool,
    showGreyPlaceholder: PropTypes.bool,
    mix: PropTypes.shape({
        block: PropTypes.string,
        elem: PropTypes.string,
        mods: PropTypes.objectOf(PropTypes.string)
    })
};

Image.defaultProps = {
    block: 'Image',
    elem: undefined,
    mods: {},
    src: '',
    alt: '',
    ratio: 'square',
    mix: {},
    arePlaceholdersShown: false,
    showGreyPlaceholder: false,
    objectFit: 'contain'
};

export default Image;
