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

export default connect(null)(MenuItemContainer);
