import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Overlay.style';

class Overlay extends Component {
    render() {
        const {
            children,
            mix,
            activeOverlay,
            id,
            areOtherOverlaysOpen
        } = this.props;

        const isVisible = id === activeOverlay;
        const mixProp = { ...mix, mods: { ...mix.mods, isVisible } };

        return (
            <div block="Overlay" mods={ { isVisible, isInstant: areOtherOverlaysOpen } } mix={ mixProp }>
                { children && children }
            </div>
        );
    }
}

Overlay.propTypes = {
    mix: PropTypes.objectOf(PropTypes.string),
    id: PropTypes.string.isRequired,
    activeOverlay: PropTypes.string.isRequired,
    areOtherOverlaysOpen: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

Overlay.defaultProps = {
    mix: {},
    children: []
};

export default Overlay;
