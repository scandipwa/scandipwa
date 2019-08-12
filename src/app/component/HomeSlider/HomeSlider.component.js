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

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'Component/Slider';
import { SliderType } from 'Type/Slider';
import Image from 'Component/Image';
import Html from 'Component/Html';
import './HomeSlider.style';

/**
 * Homepage slider
 * @class HomeSlider
 */
class HomeSlider extends Component {
    getGalleryPictures() {
        const { slider } = this.props;

        return Object.keys(slider).length > 0
            ? slider.slides.map(({ image, slide_text }) => ({ image, slide_text }))
            : [{ image: '', slide_text: '' }];
    }

    render() {
        const gallery = this.getGalleryPictures();

        return (
            <Link to="/category/women/women-dresses" className="HomeSlider">
                {/* <Slider
                  mix={ { block: 'HomeSlider' } }
                  showCrumbs
                >
                    { gallery.map((({ image, slide_text }, i) => (
                        <figure block="HomeSlider" elem="Figure" key={ i }>
                            <Image
                              mix={ { block: 'HomeSlider', elem: 'FigureImage' } }
                              ratio="custom"
                              objectFit="cover"
                              src={ image }
                              hasNoPlaceholder
                              showGreyPlaceholder
                            />
                            <figcaption
                              block="HomePage"
                              elem="Figcaption"
                              mix={ { block: 'HomeSlider', elem: 'Figcaption' } }
                            >
                                <Html content={ slide_text } />
                            </figcaption>
                        </figure>
                    ))) }
                </Slider> */}

                <figure block="HomeSlider" elem="Figure">
                    <Image
                      mix={ { block: 'HomeSlider', elem: 'FigureImage' } }
                      ratio="custom"
                      objectFit="cover"
                      src="/media/scandiweb/slider/s/l/slider-woman-on-the-beach.jpg"
                    />
                    <figcaption
                      block="HomePage"
                      elem="Figcaption"
                      mix={ { block: 'HomeSlider', elem: 'Figcaption' } }
                    >
                        <h1 block="HomeSlider" elem="Heading">SUMMER mood</h1>
                        <button block="Button">SEE DRESS COLLECTION</button>
                    </figcaption>
                </figure>
            </Link>
        );
    }
}

HomeSlider.propTypes = {
    slider: SliderType
};

HomeSlider.defaultProps = {
    slider: {}
};

export default HomeSlider;
