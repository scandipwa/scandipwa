/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENCE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import React, { Component } from 'react';
import { BlockListType } from 'Type/CMS';
import Html from 'Component/Html';
import './NewsletterSubscribe.style';

/**
 * Subscription block
 * @class NewsletterSubscribe
 */
class NewsletterSubscribe extends Component {
    render() {
        const { blocks: { items } } = this.props;

        return (
            <div block="Subscription">
                { items && items['newsletter-signup'] && <Html content={ items['newsletter-signup'].content } /> }
            </div>
        );
    }
}

NewsletterSubscribe.propTypes = {
    blocks: BlockListType.isRequired
};

export default NewsletterSubscribe;
