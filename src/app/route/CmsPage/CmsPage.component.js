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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContentWrapper from 'Component/ContentWrapper';
import Html from 'Component/Html';
import TextPlaceholder from 'Component/TextPlaceholder';
import Meta from 'Component/Meta';
import { getUrlParam } from 'Util/Url';
import { BlockListType } from 'Type/CMS';
import './CmsPage.style';

class CmsPage extends Component {
    componentDidMount() {
        const {
            requestPage,
            location,
            match,
            enableBreadcrumbs
        } = this.props;
        const urlParam = getUrlParam(match, location);

        requestPage({ id: urlParam });
        enableBreadcrumbs();
    }

    componentDidUpdate(prevProps) {
        const {
            updateBreadcrumbs,
            page,
            requestPage,
            match,
            location
        } = this.props;

        updateBreadcrumbs(page);
        if (location.pathname !== prevProps.location.pathname) {
            const urlParam = getUrlParam(match, location);
            requestPage({ id: urlParam });
        }
    }

    render() {
        const { page } = this.props;
        const { page: { content, content_heading } } = this.props;

        return (
            <main block="CmsPage">
                <ContentWrapper
                  wrapperMix={ { block: 'CmsPage', elem: 'Wrapper' } }
                  label="CMS page"
                >
                    <Meta metaObject={ page } />
                    <h1 block="CmsPage" elem="Heading">
                        <TextPlaceholder content={ content_heading } />
                    </h1>
                    <div block="CmsPage" elem="Content">
                        { content
                            ? <Html content={ content } />
                            : (
                                <p block="CmsPage" elem="PlaceholderBlock">
                                    <TextPlaceholder length="paragraph" />
                                    <TextPlaceholder length="long" />
                                    <TextPlaceholder length="paragraph" />
                                    <TextPlaceholder length="medium" />
                                </p>
                            )
                        }
                    </div>
                </ContentWrapper>
            </main>
        );
    }
}

CmsPage.propTypes = {
    requestPage: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    page: BlockListType.isRequired,
    updateBreadcrumbs: PropTypes.func.isRequired,
    location: PropTypes.shape().isRequired,
    enableBreadcrumbs: PropTypes.func.isRequired
};

export default CmsPage;
