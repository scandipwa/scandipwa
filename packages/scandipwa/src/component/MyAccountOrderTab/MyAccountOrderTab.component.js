/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import './MyAccountOrderTab.style';

/** @namespace Component/MyAccountOrderTab/Component */
export class MyAccountOrderTab extends PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
        handleClickOnTab: PropTypes.func.isRequired,
        isActive: PropTypes.bool.isRequired
    };

    render() {
        const { title, isActive, handleClickOnTab } = this.props;

        return (
            <li
              block="MyAccountOrderTab"
              elem="Item"
              mods={ { isActive } }
            >
                <button
                  mix={ { block: 'MyAccountOrderTab', elem: 'Button' } }
                  onClick={ handleClickOnTab }
                >
                    { title }
                </button>
            </li>
        );
    }
}

export default MyAccountOrderTab;
