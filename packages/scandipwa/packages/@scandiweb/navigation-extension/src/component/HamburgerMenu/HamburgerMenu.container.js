// import PropTypes from 'prop-types';

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
import { connect } from 'react-redux';

import { CartDispatcher } from 'Component/AddToCart/AddToCart.container';
import { DeviceType } from 'Type/Device';

import HamburgerMenu from './HamburgerMenu.component';

export const WishlistDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Wishlist/Wishlist.dispatcher'
);

/** @namespace Scandiweb/NavigationExtension/Component/HamburgerMenu/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device
});

/** @namespace Scandiweb/NavigationExtension/Component/HamburgerMenu/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    addProduct: (options) => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.addProductToCart(dispatch, options)
    )
});

/** @namespace Scandiweb/NavigationExtension/Component/HamburgerMenu/Container/HamburgerMenuContainer */
export class HamburgerMenuContainer extends PureComponent {
    static propTypes = {
        device: DeviceType.isRequired
    };

    containerFunctions = {
        // getData: this.getData.bind(this)
    };

    containerProps = () => {
        const { device } = this.props;

        return {
            device
        };
    };

    render() {
        return (
            <HamburgerMenu
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HamburgerMenuContainer);
