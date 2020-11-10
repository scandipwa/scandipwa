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

import './ExpandableContentShowMore.style';

/** @namespace Component/ExpandableContentShowMore/Component */
export class ExpandableContentShowMore extends PureComponent {
    static propTypes = {
        showElemCount: PropTypes.number,
        children: ChildrenType.isRequired,
        isMobile: PropTypes.bool.isRequired
    };

    static defaultProps = {
        showElemCount: 3
    };

    state = {
        isOpen: false
    };

    ref = createRef();

    getSnapshotBeforeUpdate() {
        const { pageYOffset } = window;
        const preventScrolling = () => window.scrollTo(0, pageYOffset);
        const EXPAND_ANIM_DURATION_MS = 400;

        window.addEventListener('scroll', preventScrolling);
        return setTimeout(() => window.removeEventListener('scroll', preventScrolling),
            EXPAND_ANIM_DURATION_MS);
    }

    componentDidUpdate() {}

    handleShowAllButtonClick = () => {
        this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
    };

    renderShowAllButton() {
        const { showElemCount, children } = this.props;
        const { isOpen } = this.state;

        if (children.length <= showElemCount) {
            return null;
        }

        const mods = isOpen ? { state: 'isOpen' } : {};

        return (
            <button
              onClick={ this.handleShowAllButtonClick }
              mix={ { block: 'Button', mods: { likeLink: true } } }
              block="ExpandableContentShowMore"
              elem="ShowAllButton"
              mods={ mods }
            >
                { isOpen ? __('Show less') : __('Show more') }
            </button>
        );
    }

    renderContent() {
        const { children, showElemCount } = this.props;
        const { isOpen } = this.state;

        const childStatic = children.slice(0, showElemCount);
        const childExpandable = children.slice(showElemCount);

        const FILTER_MAX_HEIGHT = 50;

        const style = {
            maxHeight: isOpen ? childExpandable.length * FILTER_MAX_HEIGHT : 0
        };

        return (
            <>
                { childStatic }
                <div
                  block="ExpandableContentShowMore"
                  elem="ExpandableChildren"
                  style={ style }
                >
                    { childExpandable }
                </div>
                { this.renderShowAllButton() }
            </>
        );
    }

    render() {
        const { children, isMobile } = this.props;

        if (isMobile) {
            return children;
        }

        return (
            <div block="ExpandableContentShowMore" ref={ this.ref }>
                { this.renderContent() }
            </div>
        );
    }
}
export default ExpandableContentShowMore;
