/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import SliderQuery from 'Query/Slider.query';
import { Slider } from 'Query/Slider.type';
import { showNotification } from 'Store/Notification/Notification.action';
import { NotificationType } from 'Store/Notification/Notification.type';
import { ReactElement } from 'Type/Common.type';
import DataContainer from 'Util/Request/DataContainer';
import { RootState } from 'Util/Store/Store.type';

import SliderWidget from './SliderWidget.component';
import {
    SliderWidgetComponentProps,
    SliderWidgetContainerMapDispatchProps,
    SliderWidgetContainerMapStateProps,
    SliderWidgetContainerProps,
    SliderWidgetContainerState,
} from './SliderWidget.type';

/** @namespace Component/SliderWidget/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): SliderWidgetContainerMapStateProps => ({
    device: state.ConfigReducer.device,
    isOffline: state.OfflineReducer.isOffline,
});

/** @namespace Component/SliderWidget/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch: Dispatch): SliderWidgetContainerMapDispatchProps => ({
    showNotification: (type, title, error) => dispatch(showNotification(type, title, error)),
});

/** @namespace Component/SliderWidget/Container */
export class SliderWidgetContainer extends DataContainer<SliderWidgetContainerProps, SliderWidgetContainerState> {
    state: SliderWidgetContainerState = {
        slider: {
            slideSpeed: 0,
            slides: [{
                slide_id: 0,
                slide_text: '',
                mobile_image: '',
                desktop_image: '',
                title: '',
                is_active: true,
                isPlaceholder: true,
            }],
        },
    };

    __construct(props: SliderWidgetContainerProps): void {
        const { sliderId } = props;

        super.__construct(props, `SliderWidgetContainer-${sliderId}`);
    }

    componentDidMount(): void {
        this.requestSlider();
    }

    componentDidUpdate(prevProps: SliderWidgetContainerProps): void {
        const { sliderId } = this.props;
        const { sliderId: pSliderId } = prevProps;

        if (sliderId !== pSliderId) {
            this.requestSlider();
        }
    }

    containerProps(): Pick<SliderWidgetComponentProps, 'device' | 'slider'> {
        const { device } = this.props;
        const { slider } = this.state;

        return { device, slider };
    }

    requestSlider(): void {
        const { sliderId, showNotification, isOffline } = this.props;

        this.fetchData<{ slider: Slider }>(
            [SliderQuery.getQuery({ sliderId: String(sliderId) })],
            ({ slider }) => this.setState({ slider }),
            (e) => showNotification(NotificationType.ERROR, __('Error fetching Slider!'), e),
            isOffline,
        );
    }

    render(): ReactElement {
        return (
            <SliderWidget
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SliderWidgetContainer);
