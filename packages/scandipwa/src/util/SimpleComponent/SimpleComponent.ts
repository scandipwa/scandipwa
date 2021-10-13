import React from 'react';

export interface SimpleProps {
    children?: React.ReactNode
}

/** @namespace Util/SimpleComponent */
export class SimpleComponent<P = Record<string, unknown>> {
    __construct(props: P): void {
        this.props = props;
    }

    props!: Readonly<P> & Readonly<{ children?: React.ReactNode }>;

    render(): JSX.Element | null {
        throw new Error('Implement me!');
    }
}
