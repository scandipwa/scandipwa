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
import MenuOverlay from 'Component/MenuOverlay';
import { HistoryType } from 'Type/Common';
import { withRouter } from 'react-router';
import isMobile from 'Util/Mobile';
import './MenuPage.style';

export class MenuPageContainer extends PureComponent {
    static propTypes = {
        history: HistoryType.isRequired
    };

    componentDidMount() {
        this.redirectIfNotOnMobile();
    }

    redirectIfNotOnMobile() {
        const { history } = this.props;

        if (!isMobile.any()) {
            history.push('/');
        }
    }

    render() {
        return (
            <main block="MenuPage">
                <MenuOverlay />
            </main>
        );
    }
}

export default withRouter(MenuPageContainer);
