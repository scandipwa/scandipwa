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

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ExpandableComponent from './ExpandableContent.component';

export class ExpandableContentContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = { isContentExpanded: false };

        this.availableFunction = {
            toggleExpand: this.toggleExpand.bind(this)
        };
    }

    toggleExpand() {
        this.setState(({ isContentExpanded }) => (
            { isContentExpanded: !isContentExpanded }
        ));
    }

    render() {
        return (
            <ExpandableComponent
              { ...this.props }
              { ...this.state }
              { ...this.availableFunction }
            />
        );
    }
}

ExpandableContentContainer.propTypes = {
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

ExpandableContentContainer.defaultProps = {
    heading: '',
    subHeading: '',
    children: [],
    mix: {}
};

export default ExpandableContentContainer;
