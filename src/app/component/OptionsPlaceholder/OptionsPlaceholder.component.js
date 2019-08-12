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
import './OptionsPlaceholder.style';

class OptionsPlaceholder extends Component {
    render() {
        const { amount } = this.props;

        return (
            <div block="OptionsPlaceholder">
                { Array(amount).fill().map((_, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div block="OptionsPlaceholder" elem="Option" key={ i } />
                )) }
            </div>
        );
    }
}

OptionsPlaceholder.propTypes = {
    amount: PropTypes.number
};

OptionsPlaceholder.defaultProps = {
    amount: 1
};

export default OptionsPlaceholder;
