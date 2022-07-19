/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
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
        mix: MixType.isRequired
    };

    static defaultProps = {
        isLoading: false,
        isActive: false
    };

    _handleClick = this._handleClick.bind(this);

    _handleClick(e) {
        const { handleClick } = this.props;

        e.stopPropagation();
        handleClick(e);
    }

    render() {
        const {
            isLoading,
            isActive,
            mix
        } = this.props;

        return (
            <div
              block="ProductCompareButton"
              mods={ { isActive } }
              mix={ mix }
            >
                <button
                  block="ProductCompareButton"
                  elem="Button"
                  onClick={ this._handleClick }
                  mix={ { block: 'Button' } }
                  aria-label={ __('Compare') }
                >
                    <CompareIcon isActive={ isActive } />
                    <Loader isLoading={ isLoading } />
                </button>
            </div>
        );
    }
}

export default ProductCompareButton;
