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

import './CmsPage.style';

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Html from 'Component/Html';
import TextPlaceholder from 'Component/TextPlaceholder';
import { BlockListType } from 'Type/CMS';

export class CmsPage extends PureComponent {
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

        if (!content_heading) {
            return null;
        }

        return (
            <h1 block="CmsPage" elem="Heading">
                <TextPlaceholder content={ content_heading } />
            </h1>
        );
    }

    renderContent() {
        const {
            isLoading,
            page: { content }
        } = this.props;

        if (isLoading) {
            return (
                <>
                    <div block="CmsPage" elem="SectionPlaceholder" />
                    <div block="CmsPage" elem="SectionPlaceholder" />
                    <div block="CmsPage" elem="SectionPlaceholder" />
                </>
            );
        }

        if (!isLoading && !content) {
            return null;
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
                    { this.renderHeading() }
                    <div block="CmsPage" elem="Content">
                        { this.renderContent() }
                    </div>
                </div>
            </main>
        );
    }
}

export default CmsPage;
