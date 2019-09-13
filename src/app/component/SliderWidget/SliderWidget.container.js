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
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { executeGet } from 'Util/Request';
import { prepareQuery } from 'Util/Query';
import { SliderQuery } from 'Query';
import { showNotification } from 'Store/Notification';
import { ONE_MONTH_IN_SECONDS } from 'Util/Request/QueryDispatcher';
import SliderWidget from './SliderWidget.component';

const mapDispatchToProps = dispatch => ({
    showNotification: (type, title, error) => dispatch(showNotification(type, title, error))
});

export class SliderWidgetContainer extends PureComponent {
    static propTypes = {
        sliderId: PropTypes.number.isRequired,
        showNotification: PropTypes.func.isRequired
    };

    state = {
        slider: {
            slides: [{ image: '', slide_text: '', isPlaceholder: true }]
        }
    };

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
        executeGet(prepareQuery(query), 'Slider', ONE_MONTH_IN_SECONDS)
            .then(({ slider }) => this.setState({ slider }))
            .catch(e => showNotification('error', 'Error fetching Slider!', e));
    }

    _getGalleryPictures() {
        const { gallery } = this.state;
        return gallery;
    }

    render() {
        return (
            <SliderWidget
              { ...this.props }
              { ...this.state }
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(SliderWidgetContainer);
