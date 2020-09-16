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
import { PureComponent } from 'react';

import './CategorySubcategories.style';

/** @namespace Component/CategorySubcategories/Component */
export class CategorySubcategories extends PureComponent {
    static propTypes = {
        handleCategoryClick: PropTypes.func.isRequired,
        option: PropTypes.shape({
            value_string: PropTypes.string,
            label: PropTypes.string
        }).isRequired
    };

    render() {
        const {
            handleCategoryClick,
            option: {
                value_string,
                label
            }
        } = this.props;

        return (
            <a
              href={ value_string }
              block="ProductAttributeValue"
              mix={ { block: 'CategorySubcategories' } }
              onClick={ handleCategoryClick }
            >
                <span
                  block="ProductAttributeValue"
                  elem="Text"
                  mix={ {
                      block: 'CategorySubcategories',
                      elem: 'Label'
                  } }
                >
                    { label }
                </span>
            </a>
        );
    }
}

export default CategorySubcategories;
