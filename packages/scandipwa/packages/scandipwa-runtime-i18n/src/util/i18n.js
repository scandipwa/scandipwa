/* eslint-disable @scandipwa/scandipwa-guidelines/export-level-one */
import React from 'react';

import Translatable from '../component/Translatable.component';

export default function __(string = '', ...values) {
    return (
        <Translatable
          string={ string }
          values={ values }
        />
    );
}
