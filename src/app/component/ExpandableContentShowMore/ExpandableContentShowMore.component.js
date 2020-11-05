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

    ref = createRef();

    __construct(props) {
        super.__construct(props);

        const { showElemCount } = props;

        this.state = {
            isOpen: false,
            opened: showElemCount,
            expandingOrCollapsing: false
        };

        this.offset = 0;
    }

    componentDidUpdate() {
        const {
            expandingOrCollapsing,
            isOpen
        } = this.state;

        if (expandingOrCollapsing) {
            setTimeout(() => this.expandOrCollapse(isOpen), 1);
        }
    }

    expandOrCollapse(isOpen) {
        const { opened } = this.state;
        const { showElemCount, children } = this.props;
        const { offset } = this;

        const MAX_ANIMATED_COUNT = 20;

        if (opened > showElemCount && isOpen) {
            const count = children.length - opened > MAX_ANIMATED_COUNT ? showElemCount : opened - 1;
            this.setState({ opened: count }, () => window.scrollTo(0, offset));
        } else if (opened < children.length && !isOpen) {
            const count = opened - showElemCount > MAX_ANIMATED_COUNT ? children.length : opened + 1;
            this.setState({ opened: count }, () => window.scrollTo(0, offset));
        } else {
            this.setState({ isOpen: !isOpen, expandingOrCollapsing: false },
                () => window.scrollTo(0, offset));
        }
    }

    handleShowAllButtonClick = () => {
        this.offset = window.pageYOffset;

        this.setState({ expandingOrCollapsing: true });
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
        const { children } = this.props;
        const { opened } = this.state;

        const child = children.slice(0, opened);

        return (
            <>
                { child }
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
