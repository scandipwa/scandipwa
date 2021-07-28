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
import './Add.scss';

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

export class AddIcon extends PureComponent {
    static propTypes = {
        isPrimary: PropTypes.bool
    };

    static defaultProps = {
        isPrimary: false
    };

    render() {
        const { isPrimary } = this.props;

        return (
            <svg
              block="AddIcon"
              mods={ { isPrimary } }
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M19 11H13V5H11V11H5V13H11V19H13V13H19V11Z" />
            </svg>
        );
    }
}

export default AddIcon;
