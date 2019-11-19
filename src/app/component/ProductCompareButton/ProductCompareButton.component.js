/* eslint-disable max-len */
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
import PropTypes from 'prop-types';
import TextPlaceholder from 'Component/TextPlaceholder';
import { ProductType } from 'Type/ProductList';

export default class ProductCompareButton extends PureComponent {
    static propTypes = {
        isReady: PropTypes.bool,
        isDisabled: PropTypes.bool,
        isInCompare: PropTypes.bool,
        product: ProductType.isRequired,
        addToCompare: PropTypes.func.isRequired,
        removeFromCompare: PropTypes.func.isRequired,
        mix: PropTypes.shape({ block: PropTypes.string, elem: PropTypes.string, mod: PropTypes.string })
    };

    static defaultProps = {
        mix: {
            block: '',
            elem: '',
            mod: ''
        },
        isReady: true,
        isDisabled: false,
        isInCompare: false
    };

    getTitle = () => {
        const { isInCompare, isReady } = this.props;

        if (!isReady) return __('Please select variant first!');

        if (isInCompare) return __('Remove from Compare');

        return __('Add to Compare');
    };

    onClick = () => {
        const {
            product,
            isInCompare,
            addToCompare,
            removeFromCompare
        } = this.props;

        if (!isInCompare) return addToCompare({ product: { ...product } });

        return removeFromCompare({ product: { ...product } });
    };

    renderPlaceholder() {
        return <TextPlaceholder length="short" />;
    }

    renderButton() {
        const { isInCompare, isDisabled, mix } = this.props;

        return (
            <button
              block="Button"
              mix={ mix }
              disabled={ isDisabled }
              title={ this.getTitle() }
              onClick={ this.onClick }
            >
               { !isInCompare ? __('Add to Compare') : __('Remove from Compare') }
            </button>
        );
    }

    render() {
        const { product: { id } = {} } = this.props;

        return (
            id !== -1
                ? this.renderButton()
                : this.renderPlaceholder()
        );
    }
}
