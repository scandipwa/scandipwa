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

import { ReactElement } from 'Type/Common.type';
import { scrollToTop } from 'Util/Browser';

import { ResetButtonComponentProps } from './ResetButton.type';

import './ResetButton.style';

/** @namespace Component/ResetButton/Component */
export class ResetButton extends PureComponent<ResetButtonComponentProps> {
    static defaultProps = {
        mix: {}
    };

    __construct(props: ResetButtonComponentProps): void {
        super.__construct?.(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(): void {
        const { onClick, resetFilters } = this.props;

        onClick();
        resetFilters();
        scrollToTop();
    }

    render(): ReactElement {
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
