/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { MixType } from 'Type/Common.type';
import { scrollToTop } from 'Util/Browser';

import './ResetButton.style';

/** @namespace Component/ResetButton/Component */
export class ResetButton extends PureComponent {
    static propTypes = {
        mix: MixType,
        resetFilters: PropTypes.func.isRequired,
        onClick: PropTypes.func.isRequired,
        isContentFiltered: PropTypes.bool.isRequired
    };

    static defaultProps = {
        mix: {}
    };

    onClick = this.onClick.bind(this);

    onClick() {
        const { onClick, resetFilters } = this.props;

        onClick();
        resetFilters();
        scrollToTop();
    }

    render() {
        const { mix, isContentFiltered } = this.props;

        if (!isContentFiltered) {
            return null;
        }

        return (
            <div
              block="ResetButton"
              mix={ mix }
            >
                <button
                  onClick={ this.onClick }
                  block="ResetButton"
                  elem="Button"
                  mix={ {
                      block: 'Button',
                      mods: { isHollow: true }
                  } }
                >
                    { __('Reset all') }
                </button>
            </div>
        );
    }
}

export default ResetButton;
