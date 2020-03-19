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
import Slider from 'Component/Slider';
import Image from 'Component/Image';
import Html from 'Component/Html';
import './SliderWidget.style';

/**
 * Homepage slider
 * @class SliderWidget
 */
export default class SliderWidget extends PureComponent {
    static propTypes = {
        slider: PropTypes.shape({
            slides: PropTypes.arrayOf(
                PropTypes.shape({
                    image: PropTypes.string,
                    slide_text: PropTypes.string,
                    isPlaceholder: PropTypes.bool
                })
            )
        })
    };

    static defaultProps = {
        slider: [{}]
    };

    state = { activeImage: 0 };


    onActiveImageChange = (activeImage) => {
        this.setState({ activeImage });
    };

    renderSlide = (slide, i) => {
        const {
            image,
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
                  src={ image ? `/${image}` : '' }
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
