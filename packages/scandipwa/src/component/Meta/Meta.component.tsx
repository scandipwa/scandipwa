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

import { PureComponent, ReactPortal } from 'react';
import { createPortal } from 'react-dom';

import { ReactElement } from 'Type/Common.type';

import { MetaComponentProps } from './Meta.type';

/**
 * Page Meta data
 * @class Meta
 * @namespace Component/Meta/Component
 */
export class MetaComponent extends PureComponent<MetaComponentProps> {
    static defaultProps: Partial<MetaComponentProps> = {
        title: '',
        canonical_url: '',
    };

    componentDidMount(): void {
        // Remove prerendered meta tags so dynamic meta tags can take effect
        Array.prototype.slice.call(
            document.head.querySelectorAll('title[data-prerendered], meta[data-prerendered]'),
        ).forEach((tag) => {
            document.head.removeChild(tag);
        });
    }

    renderTitle(): ReactElement {
        const {
            default_title,
            title_prefix,
            title_suffix,
            title,
        } = this.props;

        const titlePrefix = title_prefix ? `${ title_prefix } | ` : '';
        const titleSuffix = title_suffix ? ` | ${ title_suffix }` : '';

        return (
            <title>
                { `${ titlePrefix }${ title || default_title }${ titleSuffix }` }
            </title>
        );
    }

    renderCanonical(): ReactElement {
        const { canonical_url } = this.props;

        if (!canonical_url) {
            return null;
        }

        return (
            <link rel="canonical" href={ canonical_url } />
        );
    }

    renderMeta(): ReactElement {
        const { metadata } = this.props;

        return [
            <>
                { this.renderTitle() }
                { this.renderCanonical() }
                { metadata.map((tag) => {
                    const {
                        name,
                        property = null,
                        content,
                    } = tag;

                    return (
                        <meta
                          key={ name || property }
                          name={ name }
                          content={ content }
                        />
                    );
                }) }
            </>,
        ];
    }

    render(): ReactPortal {
        return createPortal(
            this.renderMeta(),
            document.head,
        );
    }
}

export default MetaComponent;
