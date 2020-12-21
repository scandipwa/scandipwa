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
        isMobile: PropTypes.bool.isRequired
    };

    static defaultProps = {
    };

    ref = createRef();

    handleMouseMove = ({ pageY: wrapperPageY }) => {
        const { activeImageId } = this.props;

        // Space from top and bottom to shrink mouse move watch area
        const paddingY = 90;

        // TODO: need to think how to implement more dynamic way
        const innerHeight = this.ref.current.children[0].children[1].children[0].children[0]
            .children[activeImageId].children[0].getBoundingClientRect().height;
        const { height: wrapperHeight, top } = this.ref.current.getBoundingClientRect();

        const pageY = wrapperPageY - top;

        // When mouse is reached top or bottom
        if (wrapperPageY < paddingY + top || (wrapperPageY > (wrapperHeight + top - paddingY))) {
            return;
        }

        const ratio = (innerHeight - wrapperHeight) / (wrapperHeight - (paddingY * 2));
        const translate = (pageY - paddingY) * ratio;

        CSS.setVariable(this.ref, 'translateYOnCursorMove', `${ -translate }px`);
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
