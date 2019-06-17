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
import { BlockListType } from 'Type/CMS';
import ContentWrapper from 'Component/ContentWrapper';
import Html from 'Component/Html';
import './Footer.style';

/**
 * Page footer
 * @class Footer
 */
class Footer extends Component {
    render() {
        const { blocks: { items }, isHeaderAndFooterVisible } = this.props;
        const getContent = id => ((items && items[id]) ? items[id].content : '');

        return (
            <footer block="Footer" aria-label="Footer">
                <ContentWrapper
                  mix={ { block: 'Footer', elem: 'Content', mods: { isVisible: isHeaderAndFooterVisible } } }
                  label={ __('Website footer content') }
                >
                    <div block="Footer" elem="Promo">
                        <Html content={ getContent('footer-free-shipping') } />
                        <Html content={ getContent('footer-online-support') } />
                        <Html content={ getContent('footer-payment-secure') } />
                    </div>
                    <div block="Footer" elem="Links">
                        <div><Html content={ getContent('footer-company-links') } /></div>
                        <div><Html content={ getContent('footer-resources-links') } /></div>
                        <div><Html content={ getContent('footer-quick-links') } /></div>
                        <div><Html content={ getContent('footer-social-links') } /></div>
                    </div>
                </ContentWrapper>
                <div block="Footer" elem="Copyright">
                    <ContentWrapper
                      wrapperMix={ { block: 'Footer', elem: 'CopyrightContent' } }
                      label={ __('Website copyright') }
                    >
                        <Html content={ getContent('footer-copyright-text') } />
                        <Html content={ getContent('footer-payment-options') } />
                    </ContentWrapper>
                </div>
            </footer>
        );
    }
}

Footer.propTypes = {
    blocks: BlockListType.isRequired,
    isHeaderAndFooterVisible: PropTypes.bool.isRequired
};

export default Footer;
