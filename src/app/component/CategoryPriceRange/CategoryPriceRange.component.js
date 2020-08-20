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

import ExpandableContent from 'Component/ExpandableContent';
import RangeSelector from 'Component/RangeSelector';

/** @namespace Component/CategoryPriceRange/Component */
export class CategoryPriceRange extends PureComponent {
    static propTypes = {
        minPriceValue: PropTypes.number.isRequired,
        maxPriceValue: PropTypes.number.isRequired,
        priceValue: PropTypes.shape({
            min: PropTypes.number,
            max: PropTypes.number
        }).isRequired,
        updatePriceRange: PropTypes.func.isRequired
    };

    render() {
        const {
            updatePriceRange,
            priceValue,
            minPriceValue,
            maxPriceValue
        } = this.props;

        const { min: minValue, max: maxValue } = priceValue;
        const min = minValue || minPriceValue;
        const max = maxValue || maxPriceValue;

        if (maxPriceValue - minPriceValue === 0) {
            return null;
        }

        return (
            <ExpandableContent
              key="price"
              heading={ __('Price') }
              subHeading={ __('From: %s to %s', min, max) }
              mix={ {
                  block: 'CategoryFilterOverlay',
                  elem: 'Filter',
                  mods: { type: 'price' }
              } }
            >
                <RangeSelector
                  value={ priceValue }
                  minValue={ minPriceValue || min }
                  maxValue={ maxPriceValue || max }
                  onChangeComplete={ updatePriceRange }
                />
            </ExpandableContent>
        );
    }
}

export default CategoryPriceRange;
