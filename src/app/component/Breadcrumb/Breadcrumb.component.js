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

import './Breadcrumb.style';

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Link from 'Component/Link';
import TextPlaceholder from 'Component/TextPlaceholder';

export class Breadcrumb extends PureComponent {
    static propTypes = {
        index: PropTypes.number.isRequired,
        isDisabled: PropTypes.bool.isRequired,
        url: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({})
        ]),
        name: PropTypes.string
    };

    static defaultProps = {
        url: '',
        name: ''
    };

    renderLink() {
        const {
            url,
            index,
            isDisabled
        } = this.props;

        return (
            <Link
              block="Breadcrumb"
              elem="Link"
              to={ url || '' }
              tabIndex={ isDisabled ? '-1' : '0' }
            >
                <meta itemProp="item" content={ window.location.origin + (url || '') } />
                <span itemProp="name">
                    { this.renderName() }
                </span>
                <meta itemProp="position" content={ index } />
            </Link>
        );
    }

    renderName() {
        const { name } = this.props;

        return (
            <TextPlaceholder content={ name } />
        );
    }

    render() {
        const { index } = this.props;

        return (
            <li
              block="Breadcrumb"
              key={ index }
              itemProp="itemListElement"
              itemScope
              itemType="http://schema.org/ListItem"
            >
                { this.renderLink() }
            </li>
        );
    }
}

export default Breadcrumb;
