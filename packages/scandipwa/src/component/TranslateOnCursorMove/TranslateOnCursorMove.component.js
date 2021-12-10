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
import { createRef, PureComponent } from 'react';

import { ChildrenType } from 'Type/Common.type';
import CSS from 'Util/CSS';

import './TranslateOnCursorMove.style';

/** @namespace Component/TranslateOnCursorMove/Component */
export class TranslateOnCursorMove extends PureComponent {
    static propTypes = {
        children: ChildrenType.isRequired,
        activeImageId: PropTypes.number.isRequired,
        isMobile: PropTypes.bool.isRequired,
        itemSelector: PropTypes.string.isRequired,
        targetSelector: PropTypes.string.isRequired
    };

    static defaultProps = {};

    ref = createRef();

    handleLoad = this.handleLoad.bind(this);

    handleMouseMove = this.handleMouseMove.bind(this);

    componentDidMount() {
        window.addEventListener('resize', this.handleLoad);
    }

    componentDidUpdate(prevProps) {
        const { activeImageId } = this.props;
        const { activeImageId: prevActiveImageId } = prevProps;

        if (activeImageId !== prevActiveImageId) {
            this.handleLoad();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleLoad);
        CSS.setVariable(this.ref, 'translateYOnCursorMove', '0');
    }

    handleLoad() {
        const {
            activeImageId,
            itemSelector,
            targetSelector
        } = this.props;

        const targets = this.ref.current.querySelectorAll(itemSelector);
        const target = targets?.[activeImageId]?.querySelector(targetSelector);

        if (!target) {
            return;
        }

        const innerHeight = target.getBoundingClientRect().height;
        const { height: wrapperHeight } = this.ref.current.getBoundingClientRect();
        const translate = (wrapperHeight - innerHeight) / 2;

        // style set directly (not via `setVariable`) as different translate Y values have to be applied at the same time
        // (as 2 slider images are shown simultaneously when navigating to next/previous image)
        target.style.transform = `translateY(${translate}px)`;
        CSS.setVariable(this.ref, 'imageOpacity', '1');
    }

    handleMouseMove({ pageY: wrapperPageY }) {
        const {
            activeImageId,
            itemSelector,
            targetSelector
        } = this.props;

        // Space from top and bottom to shrink mouse move watch area
        const paddingY = 90;

        const target = this.ref.current
            .querySelectorAll(itemSelector)?.[activeImageId]
            ?.querySelector(targetSelector);

        if (!target) {
            return;
        }

        const innerHeight = target.getBoundingClientRect().height;
        const { height: wrapperHeight, top } = this.ref.current.getBoundingClientRect();

        const pageY = wrapperPageY - top;

        // When mouse is reached top or bottom
        if (wrapperPageY < paddingY + top || (wrapperPageY > (wrapperHeight + top - paddingY))) {
            return;
        }

        const ratio = (innerHeight - wrapperHeight) / (wrapperHeight - (paddingY * 2));
        const translate = (pageY - paddingY) * ratio;

        if (innerHeight <= wrapperHeight) {
            return;
        }

        target.style.transform = `translateY(-${translate}px)`;
    }

    render() {
        const { children, isMobile } = this.props;

        if (isMobile) {
            return children;
        }

        return (
            <div
              block="TranslateOnCursorMove"
              onLoad={ this.handleLoad }
              onMouseMove={ this.handleMouseMove }
              ref={ this.ref }
            >
                { children }
            </div>
        );
    }
}

export default TranslateOnCursorMove;
