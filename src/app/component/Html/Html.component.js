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

// eslint-disable-next-line no-unused-vars
import React, { PureComponent } from 'react';
import Parser from 'html-react-parser';
import PropTypes from 'prop-types';

/**
 * Html content parser
 * Component converts HTML strings to React components
 * @class Html
 */
class Html extends PureComponent {
    render() {
        const { content, parserOptions } = this.props;
        return (
            <>
                { Parser(content, parserOptions) }
            </>
        );
    }
}

Html.propTypes = {
    content: PropTypes.string.isRequired,
    parserOptions: PropTypes.objectOf(PropTypes.func).isRequired
};

export default Html;
