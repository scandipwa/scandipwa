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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import MenuItem from './MenuItem.component';

/** @namespace Component/Menu/Container/mapStateToProps */
// eslint-disable-next-line no-unused-vars
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device
});

/** @namespace Component/Menu/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars
export const mapDispatchToProps = (dispatch) => ({});

/** @namespace Component/MenuItem/Container/menuItemContainer */
export class MenuItemContainer extends PureComponent {
    static propTypes = {
        onCategoryHover: PropTypes.func,
        item: PropTypes.object.isRequired
    };

    static defaultProps = {
        onCategoryHover: () => {}
    };

    containerFunctions = {
        handleCategoryHover: this.handleCategoryHover.bind(this)
    };

    handleCategoryHover() {
        const { onCategoryHover, item } = this.props;

        onCategoryHover(item);
    }

    render() {
        return (
            <MenuItem
              { ...this.props }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuItemContainer);
