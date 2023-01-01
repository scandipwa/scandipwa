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

import { GridIconComponentProps } from './GridIcon.type';

import './GridIcon.style';

/** @namespace Component/GridIcon/Component */
export class GridIconComponent<
P extends Readonly<GridIconComponentProps> = Readonly<GridIconComponentProps>,
S extends GridIconComponentState = GridIconComponentState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<GridIconComponentProps> = {
        isActive: false,
    };

    render(): ReactElement {
        const { isActive } = this.props;

        return (
            <svg
              block="GridIcon"
              mods={ { isActive } }
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M10 3H4C3.448 3 3 3.448 3 4V10C3 10.552 3.448 11 4 11H10C10.552 11 11 10.552 11 10V4C11 3.448 10.552 3 10 3ZM9 9H5V5H9V9ZM14 11H20C20.553 11 21 10.552 21 10V4C21 3.448 20.553 3 20 3H14C13.447 3 13 3.448 13 4V10C13 10.552 13.447 11 14 11ZM15 5H19V9H15V5ZM3 20C3 20.552 3.448 21 4 21H10C10.552 21 11 20.552 11 20V14C11 13.448 10.552 13 10 13H4C3.448 13 3 13.448 3 14V20ZM5 15H9V19H5V15ZM13 20C13 20.552 13.447 21 14 21H20C20.553 21 21 20.552 21 20V14C21 13.448 20.553 13 20 13H14C13.447 13 13 13.448 13 14V20ZM15 15H19V19H15V15Z" />
            </svg>
        );
    }
}

export default GridIconComponent;
