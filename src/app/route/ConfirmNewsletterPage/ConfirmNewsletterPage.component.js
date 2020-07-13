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

import { PureComponent } from 'react';

import ContentWrapper from 'Component/ContentWrapper';
import './ConfirmNewsletterPage.style';

export default class ConfirmNewsletterPage extends PureComponent {
    render() {
        return (
            <main block="ConfirmNewsletterPage" aria-label={ __('Confirm Newsletter Page') }>
                <ContentWrapper
                  wrapperMix={ { block: 'ConfirmNewsletterPage', elem: 'Wrapper' } }
                  label={ __('Confirm Newsletter') }
                >
                    <h1 block="ConfirmNewsletterPage" elem="Heading">
                        { __('Congratulation') }
                    </h1>
                    <h2>
                        { __('You´re now subscribed to our newsletter.') }
                    </h2>
                </ContentWrapper>
            </main>
        );
    }
}
