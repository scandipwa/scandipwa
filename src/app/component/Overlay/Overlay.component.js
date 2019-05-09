/* eslint-disable react/no-unused-prop-types */

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
import './Overlay.style';

class Overlay extends Component {
    componentDidUpdate(prevProps) {
        const { onVisible } = this.props;

        const prevWasVisible = this.getIsVisible(prevProps);
        const isVisible = this.getIsVisible();

        if (isVisible && !prevWasVisible) onVisible();
    }

    getIsVisible(props = this.props) {
        const { id, activeOverlay } = props;
        return id === activeOverlay;
    }

    render() {
        const { children, mix, areOtherOverlaysOpen } = this.props;
        const isVisible = this.getIsVisible();

        return (
            <div
              block="Overlay"
              mods={ { isVisible, isInstant: areOtherOverlaysOpen } }
              mix={ { ...mix, mods: { ...mix.mods, isVisible } } }
            >
                { children && children }
            </div>
        );
    }
}

Overlay.propTypes = {
    mix: PropTypes.objectOf(PropTypes.string),
    id: PropTypes.string.isRequired,
    onVisible: PropTypes.func,
    activeOverlay: PropTypes.string.isRequired,
    areOtherOverlaysOpen: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

Overlay.defaultProps = {
    mix: {},
    children: [],
    onVisible: () => {}
};

export default Overlay;
