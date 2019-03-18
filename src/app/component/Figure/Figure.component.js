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
import Image from 'Component/Image';
import Html from 'Component/Html';
import PropTypes from 'prop-types';
import './Figure.style';

/**
 * Figure component
 * @class Figure
 */
class Figure extends Component {
    render() {
        const {
            src, alt, placeholderSrc, ratio, htmlContent, children
        } = this.props;

        return (
            <figure block="Figure">
                <Image src={ src } alt={ alt } placeholderSrc={ placeholderSrc } ratio={ ratio } />
                { htmlContent && (
                    <figcaption>
                        <Html content={ htmlContent } />
                    </figcaption>
                ) }
                { !htmlContent && children && (
                    <figcaption>
                        { children }
                    </figcaption>
                ) }
            </figure>
        );
    }
}

Figure.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    placeholderSrc: PropTypes.string,
    htmlContent: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    ratio: PropTypes.oneOf([
        '4x3',
        '16x9',
        'square'
    ])
};

Figure.defaultProps = {
    src: '',
    alt: '',
    placeholderSrc: '',
    htmlContent: '',
    ratio: '16x9',
    children: null
};

export default Figure;
