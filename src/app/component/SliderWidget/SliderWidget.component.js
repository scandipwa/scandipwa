/* eslint-disable react/no-array-index-key */
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

import Html from 'Component/Html';
import Image from 'Component/Image';
import Slider from 'Component/Slider';
import { DeviceType } from 'Type/Device';

import './SliderWidget.style';

/**
 * Homepage slider
 * @class SliderWidget
 * @namespace Component/SliderWidget/Component
 */
export class SliderWidget extends PureComponent {
    static propTypes = {
        slider: PropTypes.shape({
            title: PropTypes.string,
            slideSpeed: PropTypes.number,
            slides: PropTypes.arrayOf(
                PropTypes.shape({
                    desktop_image: PropTypes.string,
                    mobile_image: PropTypes.string,
                    slide_text: PropTypes.string,
                    isPlaceholder: PropTypes.bool
                })
            )
        }),
        device: DeviceType.isRequired
    };

    static defaultProps = {
        slider: [{}]
    };

    state = {
        activeImage: 0,
        carouselDirection: 'right'
    };

    componentDidMount() {
        const { slider: { slideSpeed } } = this.props;

        if (slideSpeed > 0) {
            this.startCarousel(slideSpeed);
        }
    }

    componentWillUnmount() {
        clearInterval(this.carouselInterval);
    }

    onActiveImageChange = (activeImage) => {
        this.setState({ activeImage });
    };

    startCarousel = (interval) => {
        this.carouselInterval = setInterval(() => {
            const { activeImage, carouselDirection } = this.state;
            const { slider: { slides } } = this.props;

            if (activeImage === 0) {
                this.setState({ carouselDirection: 'right' });
                const image = slides.length - 1 !== 0 ? activeImage + 1 : activeImage;
                this.onActiveImageChange(image);
            } else if (activeImage === slides.length - 1) {
                const image = activeImage - 1;
                this.onActiveImageChange(image);
                this.setState({ carouselDirection: 'left' });
            } else {
                const image = carouselDirection === 'right' ? activeImage + 1 : activeImage - 1;
                this.onActiveImageChange(image);
            }
        }, interval);
    };

    getSlideImage(slide) {
        const {
            desktop_image,
            mobile_image
        } = slide;
        const { device } = this.props;

        if (device.isMobile && mobile_image) {
            return `/${mobile_image}`;
        }

        if (!desktop_image) {
            return '';
        }

        return `/${desktop_image}`;
    }

    renderSlide = (slide, i) => {
        const {
            slide_text,
            isPlaceholder,
            title: block
        } = slide;

        return (
            <figure
              block="SliderWidget"
              elem="Figure"
              key={ i }
            >
                <Image
                  mix={ { block: 'SliderWidget', elem: 'FigureImage' } }
                  ratio="custom"
                  src={ this.getSlideImage(slide) }
                  isPlaceholder={ isPlaceholder }
                />
                <figcaption
                  block="SliderWidget"
                  elem="Figcaption"
                  mix={ { block } }
                >
                    <Html content={ slide_text || '' } />
                </figcaption>
            </figure>
        );
    };

    render() {
        const { activeImage } = this.state;
        const { slider: { slides, title: block } } = this.props;

        return (
            <Slider
              mix={ { block: 'SliderWidget', mix: { block } } }
              showCrumbs
              activeImage={ activeImage }
              onActiveImageChange={ this.onActiveImageChange }
            >
                { slides.map(this.renderSlide) }
            </Slider>
        );
    }
}

export default SliderWidget;
