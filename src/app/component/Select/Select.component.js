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
import './Select.style';

/**
 * Select component
 * @class Select
 */
class Select extends Component {
    constructor(props) {
        super(props);

        this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    }

    /**
     * Handle Sort key change
     * @param {Object} option
     * @return {void}
     */
    onGetSortKey(key) {
        const { onGetSortKey } = this.props;

        onGetSortKey(key);
    }

    /**
     * Render all available sort options
     * @param {Object} option
     */
    renderSortOption(option) {
        // TODO add onkeypress for options
        return (
                <option
                  block="Select"
                  elem="Option"
                  key={ option.value }
                  value={ option.value }
                >
                { option.label }
                </option>
        );
    }

    render() {
        // TODO add select as possible child type name in form component
        const { options, selectedOption, formRef } = this.props;

        const listItems = options.map(option => (
            <li
              key={ option.value }
              role="presentation"
              onClick={ () => this.onGetSortKey(option.value) }
              tabIndex={ 0 }
              onKeyPress={ () => this.onGetSortKey(option.value) }
            >
            {option.label}
            </li>
        ));

        const listOptions = options.map(option => (
            <option
              key={ option.value }
              value={ option.value }
              tabIndex={ 0 }
            >
                { option.label }
            </option>
        ));

        return (
            <div block="Select" elem="Container">
                <div block="Select" elem="Wrapper" tabIndex="0">
                    <div block="Select" elem="Current">
                        <select
                          block="Select"
                          elem="Form"
                          ref={ formRef }
                          value={ selectedOption }
                          onChange={ e => this.onGetSortKey(e.target.value) }
                        >
                            { listOptions }
                        </select>
                        <div block="Select" elem="Arrow" />
                    </div>
                    <ul block="Select" elem="Elements" role="presentation">
                        { listItems }
                    </ul>
                </div>
            </div>
        );
    }
}

Select.propTypes = {
    onGetSortKey: PropTypes.func.isRequired,
    selectedOption: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string
        })
    ).isRequired,
    formRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ])
};

Select.defaultProps = {
    formRef: null
};

export default Select;
