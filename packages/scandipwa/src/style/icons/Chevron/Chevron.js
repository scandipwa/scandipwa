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
import './Chevron.scss';

import { PureComponent } from 'react';

import { RIGHT } from 'Style/icons/Chevron/Chevron.config';
import { DirectionType } from 'Type/Direction';

export class ChevronIcon extends PureComponent {
    static propTypes = {
        direction: DirectionType
    };

    static defaultProps = {
        direction: RIGHT
    };

    render() {
        const { direction } = this.props;

        return (
            <svg
              block="ChevronIcon"
              mods={ { direction } }
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
                <path
                  d="M5.8535 13.707L11.5605 7.99997L5.8535 2.29297L4.4395 3.70697L8.7325 7.99997L4.4395
                12.293L5.8535 13.707Z"
                />
            </svg>
        );
    }
}

export default ChevronIcon;
