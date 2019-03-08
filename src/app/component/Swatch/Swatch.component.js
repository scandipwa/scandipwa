import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Swatch.style';

/**
 * Swatch component
 * @class Swatch
 */
class Swatch extends Component {
    render() {
        const {
            isSelected, title, isRound, backgroundColor, handler
        } = this.props;
        const style = backgroundColor ? { backgroundColor } : {};
        const isReady = !!(handler && (title || backgroundColor));
        const mods = isReady ? { isSelected, isRound } : { isLoading: true };

        return (
            isReady
                ? (
                    <button
                      block="Swatch"
                      style={ style }
                      mods={ mods }
                      onClick={ () => handler() }
                    >
                        { title }
                    </button>
                )
                : (
                    <div
                      block="Swatch"
                      mods={ mods }
                    />
                )
        );
    }
}

Swatch.propTypes = {
    handler: PropTypes.func,
    isSelected: PropTypes.bool,
    isRound: PropTypes.bool,
    title: PropTypes.string,
    backgroundColor: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ])
};

Swatch.defaultProps = {
    handler: undefined,
    isSelected: false,
    isRound: false,
    title: null,
    backgroundColor: false
};

export default Swatch;
