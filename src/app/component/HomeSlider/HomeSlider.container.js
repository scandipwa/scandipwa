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

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { SliderType } from 'Type/Slider';
import HomeSlider from './HomeSlider.component';

export const mapStateToProps = state => ({
    slider: state.CmsBlocksAndSliderReducer.slider
});

export class HomeSliderContainer extends PureComponent {
    static propTypes = {
        slider: SliderType
    }

    static defaultProps = {
        slider: {}
    }

    constructor(props) {
        super(props);

        this.containerProps = () => ({
            gallery: this._getGalleryPictures()
        });
    }

    _getGalleryPictures() {
        const { slider } = this.props;

        return Object.keys(slider).length > 0
            ? slider.slides.map(({ image, slide_text }) => ({ image, slide_text }))
            : [{ image: '', slide_text: '', isPlaceholder: true }];
    }

    render() {
        return (
            <HomeSlider
              { ...this.props }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps)(HomeSliderContainer);
