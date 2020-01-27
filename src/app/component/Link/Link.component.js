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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { stringify } from 'rebem-classname';
import { ChildrenType } from 'Type/Common';

export default class Link extends PureComponent {
    static propTypes = {
        to: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]).isRequired,
        children: ChildrenType.isRequired,
        onClick: PropTypes.func
    };

    static defaultProps = {
        onClick: () => {}
    };

    scrollToElement = (e) => {
        const { to: cssIdentifier, onClick } = this.props;
        const elem = document.querySelector(cssIdentifier);
        event.preventDefault();

        window.scrollTo({
            top: elem.offsetTop,
            behavior: 'smooth'
        });

        elem.focus();

        onClick(e);
    };

    render() {
        const {
            to,
            children,
            ...props
        } = this.props;

        if (!to) {
            return (
                <div { ...props }>
                    { children }
                </div>
            );
        }

        if (/^#/.test(to)) {
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

        if (/^https?:\/\//.test(to)) {
            return (
                <a { ...props } href={ to }>
                    { children }
                </a>
            );
        }

        return (
            <RouterLink
              { ...props }
              to={ to }
              // eslint-disable-next-line react/forbid-component-props
              className={ stringify(this.props) }
            >
                { children }
            </RouterLink>
        );
    }
}
