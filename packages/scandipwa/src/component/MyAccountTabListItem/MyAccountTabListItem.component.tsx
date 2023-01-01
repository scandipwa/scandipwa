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

import ChevronIcon from 'Component/ChevronIcon';
import { ReactElement } from 'Type/Common.type';

import { MyAccountTabListItemComponentProps } from './MyAccountTabListItem.type';

import './MyAccountTabListItem.style';

/** @namespace Component/MyAccountTabListItem/Component */
export class MyAccountTabListItemComponent<
P extends Readonly<MyAccountTabListItemComponentProps> = Readonly<MyAccountTabListItemComponentProps>,
S extends MyAccountTabListItemComponentState = MyAccountTabListItemComponentState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<MyAccountTabListItemComponentProps> = {
        isActive: false,
        children: [],
    };

    __construct(props: MyAccountTabListItemComponentProps): void {
        super.__construct?.(props);

        this.changeActiveTab = this.changeActiveTab.bind(this);
    }

    changeActiveTab(): void {
        const { changeActiveTab, tabEntry: [key] } = this.props;

        changeActiveTab(key);
    }

    render(): ReactElement {
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

export default MyAccountTabListItemComponent;
