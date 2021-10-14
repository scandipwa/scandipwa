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

import RangeSelector from 'Component/RangeSelector';

/** @namespace Stories/RangeSelector/Story/RangeSelectorDefault */
export const RangeSelectorDefault = () => (
  <RangeSelector
    value={ 14 }
    minValue={ 1 }
    maxValue={ 20 }
    onChangeComplete={ null }
  />
);

export default {
    title: 'ScandiPWA/RangeSelector',
    component: RangeSelector
};
