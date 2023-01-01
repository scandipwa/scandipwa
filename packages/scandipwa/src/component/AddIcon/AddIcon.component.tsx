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

import { AddIconComponentProps, AddIconComponentState } from './AddIcon.type';

import './AddIcon.style';

/** @namespace Component/AddIcon/Component */
export class AddIconComponent<
P extends Readonly<AddIconComponentProps> = Readonly<AddIconComponentProps>,
S extends AddIconComponentState = AddIconComponentState,
> extends PureComponent<P, S> {
    static defaultProps: Partial<AddIconComponentProps> = {
        isPrimary: false,
    };

    render(): ReactElement {
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

export default AddIconComponent;
