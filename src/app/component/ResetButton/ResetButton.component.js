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

import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { MixType } from 'Type/Common';
import './ResetButton.style';

export default class ResetButton extends PureComponent {
    static propTypes = {
        mix: MixType,
        resetFilters: PropTypes.func.isRequired,
        isContentFiltered: PropTypes.bool.isRequired
    };

    static defaultProps = {
        mix: {}
    };

    render() {
        const { mix, isContentFiltered, resetFilters } = this.props;

        if (!isContentFiltered) return null;

        return (
            <button
              onClick={ resetFilters }
              block="ResetButton"
              mix={ {
                  block: 'Button',
                  mods: { isHollow: true },
                  mix
              } }
            >
                { __('Reset') }
            </button>
        );
    }
}
