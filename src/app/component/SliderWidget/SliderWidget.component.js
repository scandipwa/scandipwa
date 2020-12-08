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
        device: DeviceType.isRequired,
        isVertical: PropTypes.bool
    };

    static defaultProps = {
        slider: [{}],
        isVertical: false
    };

    state = {
        activeImage: 0
    };

    componentDidUpdate(prevProps) {
        const { slider: { slideSpeed, slides } } = this.props;
        const { slider: { slideSpeed: prevSlideSpeed } } = prevProps;

        if (slideSpeed !== prevSlideSpeed && slides.length > 1) {
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
            this.getImageToShow();
        }, interval);
    };

    getImageToShow() {
        const { activeImage } = this.state;
        const { slider: { slides: { length } } } = this.props;

        const toShow = activeImage > length - 2 ? 0 : activeImage + 1;
        this.setState({ activeImage: toShow });
    }

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

        const { slider: { slides: { length } }, isVertical } = this.props;
        const isSlider = length > 1;

        return (
            <figure
              block="SliderWidget"
              elem="Figure"
              key={ i }
              mods={ { isSlider, isVertical } }
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

        const children = slides.map(this.renderSlide);
        const childrenClones = slides.map((el, i) => this.renderSlide(el, i + children.length));

        return (
            <Slider
              mix={ { block: 'SliderWidget', mix: { block } } }
              showCrumbs
              activeImage={ activeImage }
              onActiveImageChange={ this.onActiveImageChange }
              childrenClones={ children.length > 1 ? childrenClones : null }
            >
                { children }
            </Slider>
        );
    }
}

export default SliderWidget;
