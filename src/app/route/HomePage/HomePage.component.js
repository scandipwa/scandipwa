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
import Meta from 'Component/Meta';
import Image from 'Component/Image';
import CmsBlock from 'Component/CmsBlock';
import ContentWrapper from 'Component/ContentWrapper';
import './HomePage.style';

class HomePage extends Component {
    constructor() {
        super();

        this.cmsBlocks = {
            identifiers: ['homepage-category-preview', 'social-links'],
            sliderId: 4
        };
    }

    componentDidMount() {
        const { requestBlocks } = this.props;
        this.updateBreadcrumbs();
        requestBlocks(this.cmsBlocks);
    }

    /**
     * Dispatch breadcrumbs update
     * @return {void}
     */
    updateBreadcrumbs() {
        const { disableBreadcrumbs } = this.props;
        disableBreadcrumbs();
    }

    render() {
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
                    <CmsBlock identifiers={ ['homepage-category-preview'] }>
                        { Array(2).fill().map((_, i) => (
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
                        )) }
                    </CmsBlock>
                </ContentWrapper>
            </main>
        );
    }
}

HomePage.propTypes = {
    requestBlocks: PropTypes.func.isRequired,
    disableBreadcrumbs: PropTypes.func.isRequired
};

export default HomePage;
