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
import { ChildrenType } from 'Type/Common.type';

import './MyAccountTabListItem.style';

/** @namespace Component/MyAccountTabListItem/Component */
export class MyAccountTabListItem extends PureComponent {
    static propTypes = {
        children: ChildrenType,
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
        isActive: false,
        children: []
    };

    changeActiveTab = this.changeActiveTab.bind(this);

    changeActiveTab() {
        const { changeActiveTab, tabEntry: [key] } = this.props;

        changeActiveTab(key);
    }

    render() {
        const { children, tabEntry: [, { tabName }], isActive } = this.props;

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
                { children }
            </li>
        );
    }
}

export default MyAccountTabListItem;
