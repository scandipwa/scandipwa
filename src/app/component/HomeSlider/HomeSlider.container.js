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
import PropTypes from 'prop-types';
import { executeGet } from 'Util/Request';
import { prepareQuery } from 'Util/Query';
import { SliderQuery } from 'Query';
import HomeSlider from './HomeSlider.component';

export class HomeSliderContainer extends PureComponent {
    static propTypes = {
        sliderId: PropTypes.number.isRequired
    }

    state = {
        gallery: [{ image: '', slide_text: '', isPlaceholder: true }]
    }

    componentDidMount() {
        const { sliderId } = this.props;
        const query = [SliderQuery.getQuery({ sliderId })];
        executeGet(prepareQuery(query), 'Slider', 2628000)
            .then(({ slider: { slides: gallery } }) => this.setState({ gallery }))
            .catch(console.error);
    }

    containerProps = () => ({
        gallery: this._getGalleryPictures()
    })

    _getGalleryPictures() {
        const { gallery } = this.state;
        return gallery;
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

export default HomeSliderContainer;
