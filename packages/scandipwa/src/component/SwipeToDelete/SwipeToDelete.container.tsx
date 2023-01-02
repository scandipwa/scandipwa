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

import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { ReactElement } from 'Type/Common.type';
import { noopFn } from 'Util/Common';
import { RootState } from 'Util/Store/Store.type';

import SwipeToDelete from './SwipeToDelete.component';
import {
    ANIMATION_DURATION,
    ANIMATION_DURATION_ON_REMOVE,
    DRAG_ITEM_REMOVE_THRESHOLD,
    DRAG_RIGHT_OPEN_THRESHOLD,
    DRAG_RIGHT_OPEN_TRIGGER_THRESHOLD,
} from './SwipeToDelete.config';
import {
    SwipeToDeleteComponentProps,
    SwipeToDeleteContainerMapDispatchProps,
    SwipeToDeleteContainerMapStateProps,
    SwipeToDeleteContainerProps,
    SwipeToDeleteContainerPropsKeys,
    SwipeToDeleteContainerState,
} from './SwipeToDelete.type';

/** @namespace Component/SwipeToDelete/Container/mapStateToProps */
export const mapStateToProps = (state: RootState): SwipeToDeleteContainerMapStateProps => ({
    isMobile: state.ConfigReducer.device.isMobile,
});

/** @namespace Component/SwipeToDelete/Container/mapDispatchToProps */
export const mapDispatchToProps = (): SwipeToDeleteContainerMapDispatchProps => ({});

/** @namespace Component/SwipeToDelete/Container */
export class SwipeToDeleteContainer<
P extends Readonly<SwipeToDeleteContainerProps> = Readonly<SwipeToDeleteContainerProps>,
S extends SwipeToDeleteContainerState = SwipeToDeleteContainerState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<SwipeToDeleteContainerProps> = {
        // Threshold after we open right side
        dragRightOpenTriggerThreshold: DRAG_RIGHT_OPEN_TRIGGER_THRESHOLD,
        // Width of opened right side
        dragRightOpenThreshold: DRAG_RIGHT_OPEN_THRESHOLD,
        // Threshold after we remove item on touchend as percentage of item width
        dragItemRemoveThreshold: DRAG_ITEM_REMOVE_THRESHOLD,
        animationDuration: ANIMATION_DURATION,
        animationDurationOnRemove: ANIMATION_DURATION_ON_REMOVE,
        renderRightSideContent: (): null => null,
        topElemMix: {},
        onAheadOfDragItemRemoveThreshold: noopFn,
        isLoading: false,
    };

    containerProps(): Pick<SwipeToDeleteComponentProps, SwipeToDeleteContainerPropsKeys> {
        const {
            animationDuration,
            animationDurationOnRemove,
            children,
            dragItemRemoveThreshold,
            dragRightOpenThreshold,
            dragRightOpenTriggerThreshold,
            isLoading,
            topElemMix,
            onAheadOfDragItemRemoveThreshold,
            renderRightSideContent,
        } = this.props;

        return {
            animationDuration,
            animationDurationOnRemove,
            children,
            dragItemRemoveThreshold,
            dragRightOpenThreshold,
            dragRightOpenTriggerThreshold,
            isLoading,
            topElemMix,
            onAheadOfDragItemRemoveThreshold,
            renderRightSideContent,
        };
    }

    render(): ReactElement {
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
