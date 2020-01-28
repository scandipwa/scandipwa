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

import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import TextPlaceholder from 'Component/TextPlaceholder';
import { BlockListType } from 'Type/CMS';
import Html from 'Component/Html';
import Meta from 'Component/Meta';

import './CmsPage.style';

export default class CmsPage extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        isBreadcrumbsActive: PropTypes.bool,
        page: BlockListType.isRequired
    };

    static defaultProps = {
        isBreadcrumbsActive: true
    };

    renderHeading() {
        const { page: { content_heading } } = this.props;

        if (!content_heading) return null;

        return (
            <h1 block="CmsPage" elem="Heading">
                <TextPlaceholder content={ content_heading } />
            </h1>
        );
    }

    renderContent() {
        const { isLoading, page: { content } } = this.props;

        if (!isLoading && !content) return null;

        if (!content) {
            return (
                <>
                    <div block="CmsPage" elem="SectionPlaceholder" />
                    <div block="CmsPage" elem="SectionPlaceholder" />
                    <div block="CmsPage" elem="SectionPlaceholder" />
                </>
            );
        }

        return <Html content={ content } />;
    }

    render() {
        const { page, isBreadcrumbsActive } = this.props;
        const { page_width } = page;

        return (
            <main
              block="CmsPage"
              mods={ { isBreadcrumbsHidden: !isBreadcrumbsActive } }
            >
                <div block="CmsPage" elem="Wrapper" mods={ { page_width } }>
                    <Meta metaObject={ page } />
                    { this.renderHeading() }
                    <div block="CmsPage" elem="Content">
                        { this.renderContent() }
                    </div>
                </div>
            </main>
        );
    }
}
