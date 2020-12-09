import PropTypes from 'prop-types';
import { Children, PureComponent } from 'react';

import ContentWrapper from 'Component/ContentWrapper';
import { isMobile } from 'Util/Mobile';

import { DEFAULT_TAB } from './ProductTabs.config';

import './ProductTabs.style';

/**
 * Product tabs
 * @class ProductTabs
 * @namespace Component/ProductTabs/Component
 */
export class ProductTabs extends PureComponent {
    static propTypes = {
        tabNames: PropTypes.array.isRequired,
        children: PropTypes.node
    };

    static defaultProps = {
        children: null
    };

    state = {
        activeTab: DEFAULT_TAB
    };

    onTabClick = (e) => {
        const activeTab = e.target.dataset.name;

        this.setState({
            activeTab
        });
    }

    renderActiveTab(activeTab, childrenArray) {
        const { tabNames } = this.props;

        return childrenArray.map((item, i) => {
            if (tabNames[i].toLowerCase() === activeTab.toLowerCase()) {
                return item;
            }

            return false;
        });
    }

    renderAllTabs(childrenArray) {
        return childrenArray.map((item) => item);
    }

    renderTabs() {
        const { children, tabNames } = this.props;
        const { activeTab } = this.state;

        const childrenArray = Children.toArray(children);

        return (
            <>
                <ul
                  block="ProductTabs"
                >
                { childrenArray.map((_, i) => (
                        <li
                          key={ tabNames[i] }
                          block="ProductTab"
                          elem="Item"
                          mods={ { isActive: tabNames[i].toLowerCase() === activeTab.toLowerCase() } }
                        >
                            <button
                              mix={ { block: 'ProductTab', elem: 'Button' } }
                              onClick={ this.onTabClick }
                              data-name={ tabNames[i] }
                            >
                                { tabNames[i].toUpperCase() }
                            </button>
                        </li>
                )) }
                </ul>
                { isMobile.any()
                    ? this.renderAllTabs(childrenArray)
                    : this.renderActiveTab(activeTab, childrenArray) }
            </>
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
