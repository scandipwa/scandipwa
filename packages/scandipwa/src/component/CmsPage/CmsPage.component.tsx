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
import Html from 'Component/Html';
import NoMatch from 'Component/NoMatch';
import TextPlaceholder from 'Component/TextPlaceholder';
import { BlockListType } from 'Type/CMS.d';
import { SimpleComponent } from 'Util/SimpleComponent';

import './CmsPage.style';

export interface CmsPageProps {
    isLoading: boolean
    page: BlockListType
    isPageLoaded: boolean
    isBreadcrumbsActive: boolean
}

/** @namespace Component/CmsPage/Component */
export class CmsPageComponent extends SimpleComponent<CmsPageProps> {
    renderHeading(): JSX.Element | null {
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

    renderContent(): JSX.Element | null {
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

    render(): JSX.Element {
        const {
            page,
            isBreadcrumbsActive,
            isLoading,
            isPageLoaded
        } = this.props;

        if (!isLoading && !isPageLoaded) {
            return <NoMatch />;
        }
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
