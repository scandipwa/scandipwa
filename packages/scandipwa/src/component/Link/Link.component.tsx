/* eslint-disable react/forbid-elements */
/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
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

import { MouseEvent, PureComponent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { stringify } from 'rebem-classname';

import { ReactElement } from 'Type/Common.type';
import { noopFn } from 'Util/Common';

import { LinkComponentProps } from './Link.type';

/** @namespace Component/Link/Component */
export class Link extends PureComponent<LinkComponentProps> {
    static defaultProps: Partial<LinkComponentProps> = {
        bemProps: {},
        className: '',
        onClick: noopFn,
        isOpenInNewTab: false,
        id: ''
    };

    scrollToElement(e: MouseEvent): void {
        const {
            to: cssIdentifier,
            onClick
        } = this.props;

        const elem = document.querySelector<HTMLElement>(
            cssIdentifier !== '#' ? cssIdentifier as string : 'body'
        );

        e.preventDefault();

        window.scrollTo({
            top: elem?.offsetTop || 0,
            behavior: 'smooth'
        });

        elem?.focus();

        onClick(e);
    }

    renderRelativePathLink(): ReactElement {
        const {
            isOpenInNewTab,
            children,
            to,
            ...props
        } = this.props;

        if (isOpenInNewTab) {
            return (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                <a
                  { ...props }
                  onClick={ this.scrollToElement }
                  href={ to as string }
                  rel="noopener noreferrer"
                  target="_blank"
                >
                    { children }
                </a>
            );
        }

        return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <a
              { ...props }
              onClick={ this.scrollToElement }
              href={ to as string }
            >
                { children }
            </a>
        );
    }

    renderAbsolutePathLink(classNameConverted: string): ReactElement {
        const {
            isOpenInNewTab,
            children,
            to,
            bemProps,
            ...props
        } = this.props;

        if (isOpenInNewTab) {
            return (
                <a
                  { ...props }
                  href={ to as string }
                    // eslint-disable-next-line react/forbid-dom-props
                  className={ classNameConverted }
                  rel="noopener noreferrer"
                  target="_blank"
                >
                    { children }
                </a>
            );
        }

        return (
            <a
              { ...props }
              href={ to as string }
                // eslint-disable-next-line react/forbid-dom-props
              className={ classNameConverted }
            >
                { children }
            </a>
        );
    }

    render(): ReactElement {
        const {
            className,
            bemProps,
            children,
            to,
            isOpenInNewTab,
            ...props
        } = this.props;

        if (!to) {
            return (
                <div { ...props } { ...bemProps }>
                    { children }
                </div>
            );
        }

        if (/^#/.test(to as string)) {
            return this.renderRelativePathLink();
        }

        const classNameConverted = `${ className } ${ stringify(bemProps)}`;

        if (/^https?:\/\//.test(to as string) || isOpenInNewTab) {
            return this.renderAbsolutePathLink(classNameConverted);
        }

        return (
            <RouterLink
              { ...props }
              to={ to }
              // eslint-disable-next-line react/forbid-component-props
              className={ classNameConverted }
            >
                { children }
            </RouterLink>
        );
    }
}

export default Link;
