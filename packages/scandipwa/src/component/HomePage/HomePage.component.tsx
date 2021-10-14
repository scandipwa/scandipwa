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

import { match as Match } from 'react-router';

import { CmsPage } from 'Component/CmsPage';
import Footer from 'Component/Footer';
import InstallPrompt from 'Component/InstallPrompt';
import { SimpleComponent } from 'Util/SimpleComponent';

export interface HomePageProps {
    match: Match,
    pageIdentifiers: string
}

export class HomePageComponent extends SimpleComponent<HomePageProps> {
    render(): JSX.Element {
        const { match, pageIdentifiers } = this.props;
        return (
            <div block="HomePage">
                <InstallPrompt />
                <CmsPage match={ match } pageIdentifiers={ pageIdentifiers } />
                <Footer isVisibleOnMobile />
            </div>
        );
    }
}
