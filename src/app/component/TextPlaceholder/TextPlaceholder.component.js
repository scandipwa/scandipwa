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
import './TextPlaceholder.style';

/**
 * Text placeholder
 * @class TextPlaceholder
 */
class TextPlaceholder extends PureComponent {
    render() {
        const { content, length } = this.props;
        if (content) return content;
        return <span block="TextPlaceholder" mods={ { length } } />;
    }
}

TextPlaceholder.propTypes = {
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number
    ]),
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
