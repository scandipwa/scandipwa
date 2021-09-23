/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
import React from 'react';

import RangeSelector from 'Component/RangeSelector/RangeSelector.component';

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
