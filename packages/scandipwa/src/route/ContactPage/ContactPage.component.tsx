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

import { PureComponent } from 'react';

import CmsBlock from 'Component/CmsBlock';
import ContactForm from 'Component/ContactForm';
import ContentWrapper from 'Component/ContentWrapper';
import Loader from 'Component/Loader';
import NoMatch from 'Route/NoMatch';
import { ReactElement } from 'Type/Common.type';

import { DEFAULT_CONTACT_US_CMS_BLOCK } from './ContactPage.config';
import { ContactPageComponentProps } from './ContactPage.type';

import './ContactPage.style';

/** @namespace Route/ContactPage/Component */
export class ContactPage extends PureComponent<ContactPageComponentProps> {
    static defaultProps: Partial<ContactPageComponentProps> = {
        isLoading: false,
    };

    renderHeading(): ReactElement {
        const { isMobile } = this.props;

        if (isMobile) {
            return null;
        }

        return (
            <h1 block="ContactPage" elem="Heading">
                { __('Contact Us') }
            </h1>
        );
    }

    renderCmsBlock(): ReactElement {
        const {
            contact_us_content: {
                contact_us_cms_block = DEFAULT_CONTACT_US_CMS_BLOCK,
            } = {},
        } = window.contentConfiguration || {};

        return <CmsBlock identifier={ contact_us_cms_block } />;
    }

    renderPage(): ReactElement {
        return (
            <ContentWrapper label="Contact Page">
                { this.renderHeading() }
                <div block="ContactPage" elem="ColumnWrapper">
                    <div block="ContactPage" elem="Column" mods={ { isContent: true } }>
                        { this.renderCmsBlock() }
                    </div>
                    <div block="ContactPage" elem="Column">
                        <ContactForm />
                    </div>
                </div>
            </ContentWrapper>
        );
    }

    renderNoPage(): ReactElement {
        return <NoMatch />;
    }

    renderPageContents(): ReactElement {
        const { isEnabled, isLoading } = this.props;

        if (isEnabled) {
            return this.renderPage();
        }

        if (!isLoading) {
            return this.renderNoPage();
        }

        return null;
    }

    render(): ReactElement {
        const { isLoading } = this.props;

        return (
            <main block="ContactPage">
                <Loader isLoading={ isLoading } />
                { this.renderPageContents() }
            </main>
        );
    }
}

export default ContactPage;
