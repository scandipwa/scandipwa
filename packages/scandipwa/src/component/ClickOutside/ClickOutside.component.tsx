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

import {
    Children,
    cloneElement,
    createRef,
    PureComponent,
    ReactElement as RReactElement,
    RefObject,
} from 'react';

import { ReactElement } from 'Type/Common.type';
import { noopFn } from 'Util/Common';

import { ClickOutsideComponentProps } from './ClickOutside.type';

/** @namespace Component/ClickOutside/Component */
export class ClickOutsideComponent extends PureComponent<ClickOutsideComponentProps> {
    childrenRefs: RefObject<HTMLElement>[] = [];

    static defaultProps: Partial<ClickOutsideComponentProps> = {
        onClick: noopFn,
        children: [],
    };

    __construct(props: ClickOutsideComponentProps): void {
        super.__construct?.(props);

        const { children } = this.props;

        this.handleClick = this.handleClick.bind(this);

        this.childrenRefs = Children.toArray(children).map(
            () => createRef<HTMLElement>(),
        ) || [];
    }

    componentDidMount(): void {
        /*
         * delaying adding the clickoutside event because of the issue with popup,
         * where event was triggered immediatly
         * vvv
        */
        setTimeout(() => {
            document.addEventListener('click', this.handleClick);
        }, 0);
    }

    componentWillUnmount(): void {
        document.removeEventListener('click', this.handleClick);
    }

    handleClick({ target }: MouseEvent): void {
        const { onClick } = this.props;

        if (this.childrenRefs?.every(
            (ref) => {
                const elementRef = (
                    ref.current as HTMLElement & { overlayRef: RefObject<HTMLElement> }
                )?.overlayRef?.current || ref.current;

                return !elementRef?.contains(target as HTMLElement);
            },
        )) {
            onClick();
        }
    }

    render(): ReactElement {
        const { children } = this.props;

        return Children.map(children as RReactElement, (element, idx) => (
            cloneElement(element, { ref: this.childrenRefs[idx] })
        ));
    }
}

export default ClickOutsideComponent;
