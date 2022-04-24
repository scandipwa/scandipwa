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

import { PureComponent } from 'react';

import { Directions } from 'Component/ChevronIcon/ChevronIcon.config';
import Html from 'Component/Html';
import Image from 'Component/Image';
import Slider from 'Component/Slider';
import { ReactElement } from 'Type/Common.type';
import { debounce } from 'Util/Request';

import {
    SliderWidgetComponenState,
    SliderWidgetComponentProps,
    SlideWithPlaceholder
} from './SliderWidget.type';

import './SliderWidget.style';

/**
 * Homepage slider
 * @class SliderWidget
 * @namespace Component/SliderWidget/Component
 */
export class SliderWidget extends PureComponent<SliderWidgetComponentProps, SliderWidgetComponenState> {
    static defaultProps = {
        slider: [{}]
    };

    changeSlideDebounced?: () => void;

    state: SliderWidgetComponenState = {
        activeImage: 0,
        carouselDirection: Directions.RIGHT
    };

    __construct(props: SliderWidgetComponentProps): void {
        super.__construct?.(props);

        this.onActiveImageChange = this.onActiveImageChange.bind(this);
    }

    componentDidUpdate(
        prevProps: SliderWidgetComponentProps,
        prevState: SliderWidgetComponenState
    ): void {
        const { slider: { slideSpeed, slides } } = this.props;
        const { slider: { slideSpeed: prevSlideSpeed } } = prevProps;

        const { activeImage } = this.state;
        const { activeImage: prevActiveImage } = prevState;

        if (!slideSpeed) {
            return;
        }

        if (slideSpeed !== prevSlideSpeed && slides?.length !== 1) {
            this.changeSlideDebounced = debounce(this.changeSlide.bind(this), slideSpeed);
            this.changeSlideDebounced();
        }

        if (prevActiveImage !== activeImage) {
            this.changeSlideDebounced?.();
        }
    }

    changeSlide(): void {
        const imageToShow = this.getImageToShow();
        this.onActiveImageChange(imageToShow);
    }

    onActiveImageChange(activeImage: number): void {
        this.setState({ activeImage });
        this.changeDirection(activeImage);
    }

    changeDirection(activeImage: number): void {
        const { slider: { slides } } = this.props;

        if (activeImage === 0) {
            this.setState({ carouselDirection: Directions.RIGHT });
        }

        if (activeImage === (slides?.length || 0) - 1) {
            this.setState({ carouselDirection: Directions.LEFT });
        }
    }

    getImageToShow(): number {
        const { activeImage, carouselDirection } = this.state;

        return carouselDirection === Directions.RIGHT ? activeImage + 1 : activeImage - 1;
    }

    getSlideImage(slide: SlideWithPlaceholder): string {
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

    renderSlide(slide: SlideWithPlaceholder, i: number): ReactElement {
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

    render(): ReactElement {
        const { activeImage } = this.state;
        const { slider: { slides, title: block } } = this.props;

        return (
            <Slider
              mix={ { block: 'SliderWidget', mix: { block } } }
              showCrumbs
              activeImage={ activeImage }
              onActiveImageChange={ this.onActiveImageChange }
            >
                { slides?.map(this.renderSlide.bind(this)) }
            </Slider>
        );
    }
}

export default SliderWidget;
