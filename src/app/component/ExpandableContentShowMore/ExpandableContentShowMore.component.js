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
        isOpen: true
    };

    isExpanding = false;

    expandableContentHeight = 'auto';

    expandableRef = createRef();

    ref = createRef();

    componentDidMount() {
        this.expandableContentHeight = this.expandableRef.current.getBoundingClientRect().height;
        this.setState({ isOpen: false });
    }

    getSnapshotBeforeUpdate() {
        if (this.isExpanding) {
            const { pageYOffset } = window;
            const preventScrolling = () => window.scrollTo(0, pageYOffset);

            const ONE_SECOND_IN_MS = 1000;
            const transitionDurationCSStoMS = window
                .getComputedStyle(this.expandableRef.current)
                .getPropertyValue('transition-duration')
                .slice(0, -1) * ONE_SECOND_IN_MS;

            window.addEventListener('scroll', preventScrolling);
            setTimeout(() => window.removeEventListener('scroll', preventScrolling),
                transitionDurationCSStoMS);
            this.isExpanding = false;
        }

        return null;
    }

    componentDidUpdate() {}

    handleShowAllButtonClick = () => {
        this.isExpanding = true;
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

        const style = {
            maxHeight: isOpen ? this.expandableContentHeight : 0
        };

        return (
            <>
                { childStatic }
                <div
                  ref={ this.expandableRef }
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
