import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TextPlaceholder.style';

/**
 * Text placeholder
 * @class TextPlaceholder
 */
class TextPlaceholder extends Component {
    render() {
        const { content, length } = this.props;
        if (content) return content;
        return <span block="TextPlaceholder" mods={ { length } } />;
    }
}

TextPlaceholder.propTypes = {
    content: PropTypes.string,
    length: PropTypes.oneOf([
        'short',
        'medium',
        'long',
        'paragraph'
    ])
};

TextPlaceholder.defaultProps = {
    content: '',
    length: 'short'
};

export default TextPlaceholder;
