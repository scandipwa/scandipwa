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

        this.state = {
            selectValue: ''
        };
    }

    static getDerivedStateFromProps(props, state) {
        const { selectValue } = state;
        const { selectedOption, options } = props;
        const tempData = [];
        const selectedFilter = options.reduce((selectedFilter, option) => {
            if (option && option.value === selectedOption) {
                tempData.push(option.value);
            }

            return tempData;
        }, 0);

        if (!selectValue) return { selectValue: selectedFilter[0] };

        return null;
    }

    /**
     * Handle Sort key change
     * @param {Object} option
     * @return {void}
     */
    onGetKey(key) {
        const { onGetKey } = this.props;

        this.setState({ selectValue: key });
        onGetKey(key);
    }

    /**
     * Render all available sort options
     * @param {Object} option
     */
    renderSortOption(option) {
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
        const { options, reference, id } = this.props;
        const { selectValue } = this.state;
        const tempData = [];
        const selectedFilter = options.reduce((selectedFilter, option) => {
            if (option && option.value === selectValue) {
                tempData.push(option.label);
            }

            return tempData;
        }, 0);

        const listItems = options.map(option => (
            <li
              key={ option.value }
              onClick={ () => this.onGetKey(option.value) }
              tabIndex={ 0 }
              onKeyPress={ () => this.onGetKey(option.value) }
            >
            {option.label}
            </li>
        ));

        return (
            <div block="Select" elem="Container">
                <div block="Select" elem="Wrapper" tabIndex="0">
                    <div block="Select" elem="Current">
                        <span>{ selectedFilter }</span>
                        <div block="Select" elem="Arrow" />
                    </div>
                    <ul
                      role="presentation"
                    >
                    { listItems }
                    </ul>
                </div>
                <select
                  block="Select"
                  elem="Original"
                  ref={ reference }
                  id={ id }
                  value={ selectValue }
                  readOnly
                  onChange={ e => this.onGetKey(e.target.value) }
                >
                { options && options.map(option => this.renderSortOption(option)) }
                </select>
            </div>
        );
    }
}

Select.propTypes = {
    onGetKey: PropTypes.func.isRequired,
    selectedOption: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string
        })
    ).isRequired,
    id: PropTypes.string.isRequired,
    reference: PropTypes.oneOfType([
        PropTypes.func, 
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ])
};

export default Select;
