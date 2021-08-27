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

import PropTypes from 'prop-types';
import { Component } from 'react';

import CustomizableOptions from './CustomizableOptions.component';

export class CustomizableOptionsContainer extends Component {
    static propTypes = {
        options: PropTypes.arrayOf(PropTypes.object).isRequired,
        updateSelectedValues: PropTypes.func.isRequired
    };

    shouldComponentUpdate(nextProps) {
        const { options: nextOptions } = nextProps;
        const { options } = this.props;

        return nextOptions === options;
    }

    containerProps() {
        return {
            ...this.props
        };
    }

    render() {
        return (
            <CustomizableOptions
              { ...this.containerProps() }
            />
        );
    }
}

export default CustomizableOptionsContainer;
