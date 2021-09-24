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

import './RadioButtonIcon.style';

/** @namespace Component/RadioButtonIcon/Component */
export class RadioButton extends PureComponent {
    static propTypes = {
        isActive: PropTypes.bool
    };

    static defaultProps = {
        isActive: false
    };

    render() {
        const { isActive } = this.props;

        return (
            <svg
              block="RadioButtonIcon"
              mods={ { isActive } }
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
                <path block="RadioButtonIcon" elem="Circle" d="M7.24805 0.654297C3.38905 0.654297 0.248047 3.7953 0.248047 7.6543C0.248047 11.5133 3.38905 14.6543 7.24805 14.6543C11.107 14.6543 14.248 11.5133 14.248 7.6543C14.248 3.7953 11.107 0.654297 7.24805 0.654297ZM7.24805 12.6543C4.49105 12.6543 2.24805 10.4113 2.24805 7.6543C2.24805 4.8973 4.49105 2.6543 7.24805 2.6543C10.005 2.6543 12.248 4.8973 12.248 7.6543C12.248 10.4113 10.005 12.6543 7.24805 12.6543Z" />
                <path block="RadioButtonIcon" elem="Dot" d="M7.24805 4.6543C5.62105 4.6543 4.24805 6.0273 4.24805 7.6543C4.24805 9.2813 5.62105 10.6543 7.24805 10.6543C8.87505 10.6543 10.248 9.2813 10.248 7.6543C10.248 6.0273 8.87505 4.6543 7.24805 4.6543Z" />
            </svg>
        );
    }
}

export default RadioButton;
