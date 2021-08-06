/* eslint-disable react/prop-types */

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
import { connect } from 'react-redux';

import { ChildrenType } from 'Type/Common';

import SwipeToDelete from './SwipeToDelete.component';
import {
    ANIMATION_DURATION,
    ANIMATION_DURATION_ON_REMOVE,
    DRAG_ITEM_REMOVE_THRESHOLD,
    DRAG_RIGHT_OPEN_THRESHOLD,
    DRAG_RIGHT_OPEN_TRIGGER_THRESHOLD
} from './SwipeToDelete.config';

/** @namespace Component/Link/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isMobile: state.ConfigReducer.device.isMobile
});

/** @namespace Component/Link/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/Link/Container */
export class SwipeToDeleteContainer extends PureComponent {
    static propTypes = {
        isMobile: PropTypes.bool.isRequired,
        children: ChildrenType.isRequired,
        dragRightOpenTriggerThreshold: PropTypes.number,
        dragRightOpenThreshold: PropTypes.number,
        dragItemRemoveThreshold: PropTypes.number,
        animationDuration: PropTypes.number,
        animationDurationOnRemove: PropTypes.number,
        renderRightSideContent: PropTypes.func,
        rightSideMix: PropTypes.object,
        topElemMix: PropTypes.object,
        onAheadOfDragItemRemoveThreshold: PropTypes.func,
        isLoading: PropTypes.bool
    };

    static defaultProps = {
        // Threshold after we open right side
        dragRightOpenTriggerThreshold: DRAG_RIGHT_OPEN_TRIGGER_THRESHOLD,
        // Width of opened right side
        dragRightOpenThreshold: DRAG_RIGHT_OPEN_THRESHOLD,
        // Threshold after we remove item on touchend as percentage of item width
        dragItemRemoveThreshold: DRAG_ITEM_REMOVE_THRESHOLD,
        animationDuration: ANIMATION_DURATION,
        animationDurationOnRemove: ANIMATION_DURATION_ON_REMOVE,
        renderRightSideContent: () => {},
        rightSideMix: {},
        topElemMix: {},
        onAheadOfDragItemRemoveThreshold: () => {},
        isLoading: false
    };

    containerProps() {
        const {
            animationDuration,
            animationDurationOnRemove,
            children,
            dragItemRemoveThreshold,
            dragRightOpenThreshold,
            dragRightOpenTriggerThreshold,
            isLoading,
            onAheadOfDragItemRemoveThresho,
            renderRightSideConte,
            rightSideMix,
            topElemMix
        } = this.props;

        return {
            animationDuration,
            animationDurationOnRemove,
            children,
            dragItemRemoveThreshold,
            dragRightOpenThreshold,
            dragRightOpenTriggerThreshold,
            isLoading,
            onAheadOfDragItemRemoveThresho,
            renderRightSideConte,
            rightSideMix,
            topElemMix
        };
    }

    render() {
        const { isMobile, children } = this.props;

        if (!isMobile) {
            return children;
        }

        return (
            <SwipeToDelete
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SwipeToDeleteContainer);
