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

import { connect } from 'react-redux';

import DataContainer from 'Util/Request/DataContainer';
import { changeNavigationState, goToPreviousNavigationState } from 'Store/Navigation';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { hideActiveOverlay } from 'Store/Overlay';
import { MenuQuery } from 'Query';
import MenuHelper from 'Util/Menu';

import MenuOverlay from './MenuOverlay.component';

export const mapDispatchToProps = dispatch => ({
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    goToPreviousHeaderState: () => dispatch(goToPreviousNavigationState(TOP_NAVIGATION_TYPE)),
    changeHeaderState: state => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, state))
});

export class MenuOverlayContainer extends DataContainer {
    state = {
        menu: {}
    };

    componentDidMount() {
        this._getMenu();
    }

    _getMenuOptions() {
        const { header_content: { header_menu } = {} } = window.contentConfiguration;

        return {
            identifier: [header_menu || 'new-main-menu']
        };
    }

    _getMenu() {
        this.fetchData(
            [MenuQuery.getQuery(this._getMenuOptions())],
            ({ menu }) => this.setState({
                menu: MenuHelper.reduce(menu)
            })
        );
    }

    render() {
        return (
            <MenuOverlay
              { ...this.props }
              { ...this.state }
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(MenuOverlayContainer);
