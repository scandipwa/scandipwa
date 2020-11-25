import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import ContentWrapper from 'Component/ContentWrapper';

import { DEFAULT_TAB, DESKTOP_WIDTH } from './ProductTabs.config';

import './ProductTabs.style';

/**
 * Product tabs
 * @class ProductTabs
 * @namespace Component/ProductTabs/Component
 */
export class ProductTabs extends PureComponent {
    static propTypes = {
        children: PropTypes.node
    };

    static defaultProps = {
        children: null
    };

    state = {
        activeTab: DEFAULT_TAB
    };

    onTabClick(e) {
        const activeTab = e.target.dataset.name;

        this.setState({
            activeTab
        });
    }

    renderActiveTab(activeTab, childrenArray) {
        return childrenArray.map((item) => {
            if (item.props.tabName.toLowerCase() === activeTab.toLowerCase()) {
                return item;
            }

            return false;
        });
    }

    renderAllTabs(childrenArray) {
        return childrenArray.map((item) => item);
    }

    renderTabs() {
        const { children } = this.props;
        const { activeTab } = this.state;

        const childrenArray = React.Children.toArray(children);

        return (
            <>
                <ul
                  block="ProductTabs"
                >
                { childrenArray.map((item) => (
                    <li
                      key={ item.props.tabName }
                      block="ProductTab"
                      elem="Item"
                      mods={ { isActive: item.props.tabName.toLowerCase() === activeTab.toLowerCase() } }
                    >
                        <button
                          mix={ { block: 'ProductTab', elem: 'Button' } }
                          // eslint-disable-next-line react/jsx-no-bind
                          onClick={ (e) => this.onTabClick(e) }
                          data-name={ item.props.tabName }
                        >
                            { item.props.tabName.toUpperCase() }
                        </button>
                    </li>
                )) }
                </ul>
                { window.innerWidth < DESKTOP_WIDTH
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
