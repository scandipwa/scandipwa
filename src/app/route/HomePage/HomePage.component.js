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
import HomeSlider from 'Component/HomeSlider';
import Html from 'Component/Html';
import ContentWrapper from 'Component/ContentWrapper';
import NewsletterSubscribe from 'Component/NewsletterSubsribe';
import { BlockListType } from 'Type/CMS';
import Meta from 'Component/Meta';
import './HomePage.style';

class HomePage extends Component {
    constructor() {
        super();

        this.options = {
            identifiers: [
                'homepage-promo-categories',
                'homepage-top-items',
                'homepage-about-us'
            ],
            fields: ['identifier'],
            sliderId: 1
        };
    }

    componentDidMount() {
        this.updateBreadcrumbs();
        this.requestBlocks();
    }

    /**
     * Dispatch breadcrumbs update
     * @return {void}
     */
    updateBreadcrumbs() {
        const { disableBreadcrumbs } = this.props;
        disableBreadcrumbs();
    }

    /**
     * Requests CMS Blocks for Homepage
     * @return {void}
     */
    requestBlocks() {
        const { requestBlocks } = this.props;
        requestBlocks(this.options);
    }

    render() {
        const { blocks: { items } } = this.props;
        const { identifiers } = this.options;

        return (
            <main block="HomePage">
                <Meta
                  metaObject={ { title: __('Home') } }
                />
                <HomeSlider />
                <ContentWrapper
                  mix={ { block: 'HomePage' } }
                  wrapperMix={ { block: 'HomePage', elem: 'Wrapper' } }
                  label={ __('Home Page') }
                >
                    { items
                        ? identifiers.map((blockId) => {
                            const { content } = items[blockId] || {};
                            return <Html key={ blockId } content={ content || '' } />;
                        })
                        : (
                            <div
                              block="HomePage"
                              elem="PromoCategories"
                              mods={ { isLoading: true } }
                            >
                                { new Array(5).fill().map((_, i) => <figure key={ i } />) }
                            </div>
                        )
                    }
                </ContentWrapper>
                <NewsletterSubscribe />
            </main>
        );
    }
}

HomePage.propTypes = {
    blocks: BlockListType.isRequired,
    requestBlocks: PropTypes.func.isRequired,
    disableBreadcrumbs: PropTypes.func.isRequired
};

export default HomePage;
