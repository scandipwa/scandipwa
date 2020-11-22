import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import ContentWrapper from 'Component/ContentWrapper';

import { Tab } from './ProductTabs.config';

import './ProductTabs.style';

/**
 * Product tabs
 * @class ProductTabs
 * @namespace Component/ProductTabs/Component
 */
export class ProductTabs extends PureComponent {
    static propTypes = {
        onTabClick: PropTypes.func.isRequired,
        activeTab: PropTypes.string.isRequired
    };

    renderTabs() {
        const { onTabClick, activeTab } = this.props;
        return (
            <ul
              block="ProductTabs"
            >
            { Object.values(Tab).map((tabName) => (
                <li
                  key={ tabName }
                  block="ProductTab"
                  elem="Item"
                  mods={ { isActive: tabName === activeTab.toLowerCase() } }
                >
                    <button
                      mix={ { block: 'ProductTab', elem: 'Button' } }
                      onClick={ onTabClick }
                    >
                        { tabName.toUpperCase() }
                    </button>
                </li>
            )) }
            </ul>
        );
    }

    render() {
        return (
            <ContentWrapper
              wrapperMix={ { block: 'ProductTabs', elem: 'Wrapper' } }
              label={ __('Product tabs') }
            >
                { this.renderTabs() }
            </ContentWrapper>
        );
    }
}

export default ProductTabs;
