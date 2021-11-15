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

import MyAccountOrderTab from './MyAccountOrderTab.component';

/** @namespace Component/MyAccountOrderTab/Container */
export class MyAccountOrderTabContainer extends PureComponent {
    static propTypes = {
        onTabClick: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired,
        tabName: PropTypes.string.isRequired,
        isActive: PropTypes.bool
    };

    static defaultProps = {
        isActive: false
    };

    containerFunctions = {
        handleClickOnTab: this.handleClickOnTab.bind(this)
    };

    containerProps() {
        const { tabName, isActive, title } = this.props;

        return { tabName, isActive, title };
    }

    handleClickOnTab() {
        const { onTabClick, tabName } = this.props;

        onTabClick(tabName);
    }

    render() {
        return (
            <MyAccountOrderTab
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default MyAccountOrderTabContainer;
