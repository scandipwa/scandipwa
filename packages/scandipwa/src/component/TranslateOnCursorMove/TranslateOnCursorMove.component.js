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

import { ChildrenType } from 'Type/Common';
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

    static defaultProps = {
    };

    ref = createRef();

    // componentDidMount() {
    //     CSS.setVariable(this.ref, 'translateYOnCursorMove', '50%');
    // }

    handleMouseMove = ({ pageY: wrapperPageY }) => {
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
        // const translate = innerHeight > wrapperHeight ? (pageY - paddingY) * ratio : (innerHeight - wrapperHeight) / 2;

        if (innerHeight <= wrapperHeight) {
            // const translate = (wrapperHeight - innerHeight) / 2;
            // CSS.setVariable(this.ref, 'translateYOnCursorMove', `${ translate }px`);
            return;
        }

        CSS.setVariable(this.ref, 'translateYOnCursorMove', `${ -translate * 0 }px`);
    };

    render() {
        const { children, isMobile } = this.props;

        if (isMobile) {
            return children;
        }

        return (
            <div block="TranslateOnCursorMove" onMouseMove={ this.handleMouseMove } ref={ this.ref }>
                { children }
            </div>
        );
    }
}

export default TranslateOnCursorMove;
