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

import { PureComponent } from 'react';

import { ReactElement } from 'Type/Common.type';

import MyAccountOrderTab from './MyAccountOrderTab.component';
import {
    MyAccountOrderTabComponentProps,
    MyAccountOrderTabContainerProps,
    MyAccountOrderTabContainerPropsKeys,
} from './MyAccountOrderTab.type';

/** @namespace Component/MyAccountOrderTab/Container */
export class MyAccountOrderTabContainer<
P extends Readonly<MyAccountOrderTabContainerProps> = Readonly<MyAccountOrderTabContainerProps>,
S extends MyAccountOrderTabContainerState = MyAccountOrderTabContainerState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<MyAccountOrderTabContainerProps> = {
        isActive: false,
    };

    containerFunctions = {
        handleClickOnTab: this.handleClickOnTab.bind(this),
    };

    containerProps(): Pick<MyAccountOrderTabComponentProps, MyAccountOrderTabContainerPropsKeys> {
        const { isActive, title } = this.props;

        return { isActive, title };
    }

    handleClickOnTab(): void {
        const { onTabClick, tabName } = this.props;

        onTabClick(tabName);
    }

    render(): ReactElement {
        return (
            <MyAccountOrderTab
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default MyAccountOrderTabContainer;
