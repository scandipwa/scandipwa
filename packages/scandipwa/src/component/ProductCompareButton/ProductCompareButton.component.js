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

import CompareIcon from 'Component/CompareIcon';
import Loader from 'Component/Loader';
import { MixType } from 'Type/Common.type';

import './ProductCompareButton.style';

/** @namespace Component/ProductCompareButton/Component */
export class ProductCompareButton extends PureComponent {
    static propTypes = {
        handleClick: PropTypes.func.isRequired,
        isLoading: PropTypes.bool,
        isActive: PropTypes.bool,
        isPlaceholder: PropTypes.bool,
        mix: MixType.isRequired
    };

    static defaultProps = {
        isLoading: false,
        isActive: false,
        isPlaceholder: true
    };

    renderButton() {
        const {
            handleClick,
            isLoading,
            isActive
        } = this.props;

        return (
            <button
              block="ProductCompareButton"
              elem="Button"
              onClick={ handleClick }
              mix={ { block: 'Button' } }
              aria-label={ __('Compare') }
            >
                <CompareIcon isActive={ isActive } />
                <Loader isLoading={ isLoading } />
            </button>
        );
    }

    renderPlaceholder() {
        const { mix } = this.props;

        return (
            <div
              block="ProductCompareButton"
              elem="Placeholder"
              mix={ mix }
            />
        );
    }

    render() {
        const {
            isActive,
            mix,
            isPlaceholder
        } = this.props;

        if (isPlaceholder) {
            return this.renderPlaceholder();
        }

        return (
            <div
              block="ProductCompareButton"
              mods={ { isActive } }
              mix={ mix }
            >
                { this.renderButton() }
            </div>
        );
    }
}

export default ProductCompareButton;
