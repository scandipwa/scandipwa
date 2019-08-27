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
import PropTypes from 'prop-types';
import { executeGet } from 'Util/Request';
import { prepareQuery } from 'Util/Query';
import { SliderQuery } from 'Query';
import { showNotification } from 'Store/Notification';
import HomeSlider from './HomeSlider.component';

const mapDispatchToProps = dispatch => ({
    showNotification: (type, title, error) => dispatch(showNotification(type, title, error))
});

export class HomeSliderContainer extends PureComponent {
    static propTypes = {
        sliderId: PropTypes.number.isRequired,
        showNotification: PropTypes.func.isRequired
    }

    state = {
        gallery: [{ image: '', slide_text: '', isPlaceholder: true }]
    }

    componentDidMount() {
        this.requestSlider();
    }

    componentDidUpdate(prevProps) {
        const { sliderId } = this.props;
        const { sliderId: pSliderId } = prevProps;

        if (sliderId !== pSliderId) this.requestSlider();
    }

    requestSlider() {
        const { sliderId, showNotification } = this.props;
        const query = [SliderQuery.getQuery({ sliderId })];
        executeGet(prepareQuery(query), 'Slider', 2628000)
            .then(({ slider: { slides: gallery } }) => this.setState({ gallery }))
            .catch(e => showNotification('error', 'Error fetching Slider!', e));
    }

    _getGalleryPictures() {
        const { gallery } = this.state;
        return gallery;
    }

    render() {
        return (
            <HomeSlider
              { ...this.props }
              { ...this.state }
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(HomeSliderContainer);
