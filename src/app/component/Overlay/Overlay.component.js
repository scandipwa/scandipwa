import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Overlay.style';

class Overlay extends Component {
    componentDidUpdate(prevProps) {
        const { activeOverlay, id, onVisible } = this.props;
        const { activeOverlay: prevActiveOverlay } = prevProps;

        const prevWasVisible = id === prevActiveOverlay;
        const isVisible = id === activeOverlay;

        if (isVisible && !prevWasVisible) onVisible();
    }

    render() {
        const {
            children, mix, activeOverlay,
            id, areOtherOverlaysOpen
        } = this.props;

        const isVisible = id === activeOverlay;

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
