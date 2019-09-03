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

import { Component } from 'react';
import PropTypes from 'prop-types';
import ContentWrapper from 'Component/ContentWrapper';
import Html from 'Component/Html';
import TextPlaceholder from 'Component/TextPlaceholder';
import Meta from 'Component/Meta';
import { CMS_PAGE } from 'Component/Header';
import { history } from 'Route';
import { getUrlParam } from 'Util/Url';
import { LocationType, MatchType } from 'Type/Common';
import { BlockListType } from 'Type/CMS';
import './CmsPage.style';

class CmsPage extends Component {
    static propTypes = {
        requestPage: PropTypes.func.isRequired,
        match: MatchType.isRequired,
        page: BlockListType.isRequired,
        setHeaderState: PropTypes.func.isRequired,
        updateBreadcrumbs: PropTypes.func.isRequired,
        location: LocationType.isRequired,
        toggleBreadcrumbs: PropTypes.func.isRequired,
        updateCmsPage: PropTypes.func.isRequired,
        urlKey: PropTypes.string,
        isOnlyPlaceholder: PropTypes.bool,
        isBreadcrumbsActive: PropTypes.bool
    };

    static defaultProps = {
        urlKey: '',
        isOnlyPlaceholder: false,
        isBreadcrumbsActive: true
    };

    componentDidMount() {
        const {
            requestPage,
            location,
            match,
            toggleBreadcrumbs,
            urlKey,
            isOnlyPlaceholder,
            isBreadcrumbsActive,
            updateCmsPage
        } = this.props;
        const urlParam = getUrlParam(match, location);

        updateCmsPage({});
        if (!isOnlyPlaceholder && (urlKey || urlParam)) requestPage({ id: urlKey || urlParam });
        toggleBreadcrumbs(isBreadcrumbsActive);
    }

    componentDidUpdate(prevProps) {
        const {
            updateBreadcrumbs, page, location, setHeaderState,
            page: { content_heading }, requestPage, match,
            location: { pathname }, urlKey
        } = this.props;
        const {
            location: {
                pathname: prevPathname
            },
            urlKey: prevUrlKey
        } = prevProps;

        updateBreadcrumbs(page);

        setHeaderState({
            name: CMS_PAGE,
            title: content_heading,
            onBackClick: () => history.goBack()
        });

        if (pathname !== prevPathname || urlKey !== prevUrlKey) {
            const urlParam = getUrlParam(match, location);
            requestPage({ id: urlKey || urlParam });
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
                        { content_heading && <TextPlaceholder content={ content_heading } /> }
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
                            ) }
                    </div>
                </ContentWrapper>
            </main>
        );
    }
}

export default CmsPage;
