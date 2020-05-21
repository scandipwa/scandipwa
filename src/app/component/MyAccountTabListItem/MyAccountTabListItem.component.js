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
import { tabType } from 'Type/Account';
import './MyAccountTabListItem.style';

export class MyAccountTabListItem extends ExtensiblePureComponent {
    static propTypes = {
        tabEntry: PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.string,
                tabType
            ])
        ).isRequired,
        isActive: PropTypes.bool,
        changeActiveTab: PropTypes.func.isRequired
    };

    static defaultProps = {
        isActive: false
    };

    changeActiveTab = () => {
        const { changeActiveTab, tabEntry: [key] } = this.props;
        changeActiveTab(key);
    };

    render() {
        const { tabEntry: [, { name }], isActive } = this.props;

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
                    { name }
                </button>
            </li>
        );
    }
}

export default middleware(MyAccountTabListItem, 'Component/MyAccountTabListItem/Component');
