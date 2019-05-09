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
    constructor(props) {
        super(props);

        this.state = { isContentExpanded: false };

        this.toggleExpand = this.toggleExpand.bind(this);
    }

    toggleExpand() {
        const { isContentExpanded } = this.state;
        this.setState({ isContentExpanded: !isContentExpanded });
    }

    render() {
        const { isContentExpanded } = this.state;
        const {
            heading, subHeading,
            children, mix
        } = this.props;

        return (
            <article
              block="ExpandableContent"
              mix={ mix }
            >
                <button
                  block="ExpandableContent"
                  elem="Button"
                  mods={ { isContentExpanded } }
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
                <div
                  block="ExpandableContent"
                  elem="Content"
                  mods={ { isContentExpanded } }
                >
                    { children }
                </div>
            </article>
        );
    }
}

ExpandableContent.propTypes = {
    heading: PropTypes.string,
    subHeading: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    mix: PropTypes.shape({
        block: PropTypes.string,
        elem: PropTypes.string,
        mods: PropTypes.objectOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool
        ]))
    })
};

ExpandableContent.defaultProps = {
    heading: '',
    subHeading: '',
    children: [],
    mix: {}
};

export default ExpandableContent;
