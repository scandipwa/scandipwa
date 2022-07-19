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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { stringify } from 'rebem-classname';

import { ChildrenType, MixType } from 'Type/Common.type';
import { LinkType } from 'Type/Router.type';
import { noopFn } from 'Util/Common';

/** @namespace Component/Link/Component */
export class Link extends PureComponent {
    static propTypes = {
        to: LinkType.isRequired,
        className: PropTypes.string,
        bemProps: MixType,
        children: ChildrenType.isRequired,
        onClick: PropTypes.func,
        isOpenInNewTab: PropTypes.bool
    };

    static defaultProps = {
        bemProps: {},
        className: '',
        onClick: noopFn,
        isOpenInNewTab: false
    };

    scrollToElement(e) {
        const {
            to: cssIdentifier,
            onClick
        } = this.props;

        const elem = document.querySelector(
            cssIdentifier !== '#' ? cssIdentifier : 'body'
        );

        event.preventDefault();

        window.scrollTo({
            top: elem.offsetTop,
            behavior: 'smooth'
        });

        elem.focus();

        onClick(e);
    }

    renderRelativePathLink() {
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
                  href={ to }
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
              href={ to }
            >
                { children }
            </a>
        );
    }

    renderAbsolutePathLink(classNameConverted) {
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
                  href={ to }
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
              href={ to }
                // eslint-disable-next-line react/forbid-dom-props
              className={ classNameConverted }
            >
                { children }
            </a>
        );
    }

    render() {
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

        if (/^#/.test(to)) {
            return this.renderRelativePathLink();
        }

        const classNameConverted = `${ className } ${ stringify(bemProps)}`;

        if (/^https?:\/\//.test(to) || isOpenInNewTab) {
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
