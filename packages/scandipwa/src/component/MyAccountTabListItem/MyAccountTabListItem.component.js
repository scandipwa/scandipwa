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

import ChevronIcon from 'Component/ChevronIcon';
import { TabType } from 'Type/Account.type';

import './MyAccountTabListItem.style';

/** @namespace Component/MyAccountTabListItem/Component */
export class MyAccountTabListItem extends PureComponent {
    static propTypes = {
        tabEntry: PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.string,
                TabType
            ])
        ).isRequired,
        isActive: PropTypes.bool,
        changeActiveTab: PropTypes.func.isRequired
    };

    static defaultProps = {
        isActive: false
    };

    changeActiveTab = this.changeActiveTab.bind(this);

    changeActiveTab() {
        const { changeActiveTab, tabEntry: [key] } = this.props;

        changeActiveTab(key);
    }

    render() {
        const { tabEntry: [, { tabName }], isActive } = this.props;

        return (
            <li
              block="MyAccountTabListItem"
              mods={ { isActive } }
            >
                <button
                  block="MyAccountTabListItem"
                  elem="Button"
                  onClick={ this.changeActiveTab }
                  role="link"
                >
                    { tabName }
                    <ChevronIcon />
                </button>
            </li>
        );
    }
}

export default MyAccountTabListItem;
