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
import { DIRECTION_LEFT, DIRECTION_RIGHT } from 'Component/SliderWidget/SliderWidget.config';
import { DeviceType } from 'Type/Device.type';
import { debounce } from 'Util/Request';

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
        carouselDirection: DIRECTION_RIGHT
    };

    onActiveImageChange = this.onActiveImageChange.bind(this);

    componentDidUpdate(prevProps, prevState) {
        const { slider: { slideSpeed, slides } } = this.props;
        const { slider: { slideSpeed: prevSlideSpeed } } = prevProps;

        const { activeImage } = this.state;
        const { activeImage: prevActiveImage } = prevState;

        if (!slideSpeed) {
            return;
        }

        if (slideSpeed !== prevSlideSpeed && slides.length !== 1) {
            this.changeSlideDebounced = debounce(this.changeSlide.bind(this), slideSpeed);
            this.changeSlideDebounced();
        }

        if (prevActiveImage !== activeImage) {
            this.changeSlideDebounced();
        }
    }

    changeSlide() {
        const imageToShow = this.getImageToShow();
        this.onActiveImageChange(imageToShow);
    }

    onActiveImageChange(activeImage) {
        this.setState({ activeImage });
        this.changeDirection(activeImage);
    }

    changeDirection(activeImage) {
        const { slider: { slides } } = this.props;

        if (activeImage === 0) {
            this.setState({ carouselDirection: DIRECTION_RIGHT });
        }

        if (activeImage === slides.length - 1) {
            this.setState({ carouselDirection: DIRECTION_LEFT });
        }
    }

    getImageToShow() {
        const { activeImage, carouselDirection } = this.state;

        return carouselDirection === DIRECTION_RIGHT ? activeImage + 1 : activeImage - 1;
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

    renderSlide(slide, i) {
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
    }

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
                { slides.map(this.renderSlide.bind(this)) }
            </Slider>
        );
    }
}

export default SliderWidget;
