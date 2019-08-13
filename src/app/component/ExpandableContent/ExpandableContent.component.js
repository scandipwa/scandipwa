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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ExpandableContent.style';

class ExpandableContent extends Component {
    renderButton() {
        const { isContentExpanded } = this.props;
        const {
            heading, subHeading, mix
        } = this.props;

        return (
            <button
              block="ExpandableContent"
              elem="Button"
              mods={ { isContentExpanded } }
              mix={ { ...mix, elem: 'ExpandableContentButton' } }
              onClick={ this.toggleExpand }
            >
                <span
                  block="ExpandableContent"
                  elem="Heading"
                  mix={ { ...mix, elem: 'ExpandableContentHeading' } }
                >
                    { heading }
                </span>
                <span
                  block="ExpandableContent"
                  elem="SubHeading"
                  mix={ { ...mix, elem: 'ExpandableContentSubHeading' } }
                >
                    { subHeading }
                </span>
            </button>

        );
    }

    renderContent() {
        const {
            isContentExpanded,
            children, mix
        } = this.props;

        return (
            <div
              block="ExpandableContent"
              elem="Content"
              mods={ { isContentExpanded } }
              mix={ { ...mix, elem: 'ExpandableContentContent' } }
            >
                { children }
            </div>
        );
    }

    render() {
        const { mix } = this.props;

        return (
            <article
              block="ExpandableContent"
              mix={ mix }
            >
                { this.renderButton() }
                { this.renderContent() }
            </article>
        );
    }
}

ExpandableContent.propTypes = {
    heading: PropTypes.string.isRequired,
    subHeading: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    mix: PropTypes.shape({
        block: PropTypes.string,
        elem: PropTypes.string,
        mods: PropTypes.objectOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool
        ]))
    }).isRequired,
    isContentExpanded: PropTypes.bool.isRequired
};

export default ExpandableContent;
