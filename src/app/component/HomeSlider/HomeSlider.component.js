import React, { Component } from 'react';
import Slider from 'Component/Slider';
import { SliderType } from 'Type/Slider';
import './HomeSlider.style';

/**
 * Homepage slider
 * @class HomeSlider
 */
class HomeSlider extends Component {
    render() {
        const { slider } = this.props;

        const gallery = Object.keys(slider).length > 0
            ? slider.slides.map(media => ({ image: media.image, extraHtml: media.slide_text }))
            : [{ image: '' }];

        if (gallery) {
            return (
                <Slider
                  block="HomeSlider"
                  items={ gallery }
                  areBreadcrumbsShown
                  animationInterval={ 4000 }
                  slideSpeed={ 1000 }
                  arePlaceholdersShown
                  showGreyPlaceholder
                />
            );
        }

        return null;
    }
}

HomeSlider.propTypes = {
    slider: SliderType
};

HomeSlider.defaultProps = {
    slider: {}
};

export default HomeSlider;
