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
import { createPortal } from 'react-dom';

import { MetaTitleType } from 'Type/Common.type';

/**
 * Page Meta data
 * @class Meta
 * @namespace Component/Meta/Component
 */
export class Meta extends PureComponent {
    static propTypes = {
        metadata: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                property: PropTypes.string,
                content: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number
                ])
            })
        ).isRequired,
        canonical_url: PropTypes.string,
        default_title: PropTypes.string.isRequired,
        title_prefix: PropTypes.string.isRequired,
        title_suffix: PropTypes.string.isRequired,
        title: MetaTitleType
    };

    static defaultProps = {
        title: '',
        canonical_url: ''
    };

    componentDidMount() {
        // Remove prerendered meta tags so dynamic meta tags can take effect
        Array.prototype.slice.call(
            document.head.querySelectorAll('title[data-prerendered], meta[data-prerendered]')
        ).forEach((tag) => {
            document.head.removeChild(tag);
        });
    }

    renderTitle() {
        const {
            default_title,
            title_prefix,
            title_suffix,
            title
        } = this.props;

        const titlePrefix = title_prefix ? `${ title_prefix } | ` : '';
        const titleSuffix = title_suffix ? ` | ${ title_suffix }` : '';
        const { value = title } = title;

        return (
            <title>
                { `${ titlePrefix }${ value || default_title }${ titleSuffix }` }
            </title>
        );
    }

    renderCanonical() {
        const { canonical_url } = this.props;

        if (!canonical_url) {
            return null;
        }

        return (
            <link rel="canonical" href={ canonical_url } />
        );
    }

    renderMeta() {
        const { metadata } = this.props;

        return (
            <>
                { this.renderTitle() }
                { this.renderCanonical() }
                { metadata.map((tag) => {
                    const {
                        name = null,
                        property = null,
                        content = null
                    } = tag;

                    return (
                        <meta
                          key={ name || property }
                          name={ name }
                          content={ content }
                        />
                    );
                }) }
            </>
        );
    }

    render() {
        return createPortal(
            { ...this.renderMeta() },
            document.head
        );
    }
}

export default Meta;
