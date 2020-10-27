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

    handleShowAllButtonClick = () => {
        const { pageYOffset } = window;

        this.setState(
            ({ isOpen }) => ({ isOpen: !isOpen }),
            () => window.scrollTo(0, pageYOffset)
        );
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

        const child = !isOpen ? children.slice(0, showElemCount) : children;

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
