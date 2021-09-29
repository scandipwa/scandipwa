import React from 'react';

import RangeSelector from 'Component/RangeSelector';

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
