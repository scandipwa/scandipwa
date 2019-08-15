/* eslint-disable react/no-array-index-key */
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
import { BlockListType } from 'Type/CMS';
import Meta from 'Component/Meta';
import ContentWrapper from 'Component/ContentWrapper';
import './HomePage.style';
import Image from 'Component/Image';

class HomePage extends Component {
    constructor() {
        super();

        this.options = {
            identifiers: ['homepage-category-preview'],
            sliderId: 4
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
                  metaObject={ {
                      title: 'Home',
                      meta_title: 'Home Page of ScandiPWA',
                      meta_description: 'Progressive Web App for Magento'
                  } }
                />
                <HomeSlider />
                <ContentWrapper wrapperMix={ { block: 'HomePage', elem: 'Wrapper' } } label="Homepage promo categories">
                    { items && items[identifiers[0]]
                        ? identifiers.map((blockId) => {
                            const { content } = items[blockId] || {};
                            return <Html key={ blockId } content={ content || '' } />;
                        })
                        : Array(2).fill().map((_, i) => (
                            <figure
                              key={ i }
                              block="HomePage"
                              elem="Figure"
                              mods={ { isPlaceholder: true } }
                            >
                                <Image isPlaceholder />
                                <figcaption
                                  block="HomePage"
                                  elem="Figcaption"
                                  mods={ { isPlaceholder: true } }
                                />
                            </figure>
                        ))
                    }
                </ContentWrapper>
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
