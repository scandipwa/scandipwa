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

import { hideActiveOverlay } from 'Store/Overlay/Overlay.action';
import history from 'Util/History';
import { appendWithStoreCode } from 'Util/Url';

import CategorySubcategories from './CategorySubcategories.component';

/** @namespace Component/CategorySubcategories/Container/mapStateToProps */
export const mapStateToProps = () => ({});

/** @namespace Component/CategorySubcategories/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    hideActiveOverlay: () => dispatch(hideActiveOverlay())
});

/** @namespace Component/CategorySubcategories/Container */
export class CategorySubcategoriesContainer extends PureComponent {
    static propTypes = {
        hideActiveOverlay: PropTypes.func.isRequired,
        option: PropTypes.shape({
            value_string: PropTypes.string,
            label: PropTypes.string
        }).isRequired
    };

    containerFunctions = {
        handleCategoryClick: this.handleCategoryClick.bind(this)
    };

    containerProps() {
        const { option } = this.props;

        return { option };
    }

    handleCategoryClick(e) {
        const { hideActiveOverlay, option } = this.props;
        const { value_string } = option;

        e.preventDefault();
        hideActiveOverlay();

        history.push({
            pathname: appendWithStoreCode(value_string),
            state: { category: true },
            search: history.location.search
        });
    }

    render() {
        return (
            <CategorySubcategories
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategorySubcategoriesContainer);
