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

import React from 'react';

export class SimpleComponent<P = Record<string, unknown>> {
    __construct?(props: P): void;

    constructor(props: P) {
        this.props = props;
    }

    readonly props: Readonly<P> & Readonly<{ children?: React.ReactNode }>;

    render(): JSX.Element | null {
        throw new Error('Implement me!');
    }
}
