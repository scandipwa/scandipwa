import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import ContentWrapper from 'Component/ContentWrapper';

import { DEFAULT_TAB } from './ProductTabs.config';

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

    renderActiveTab(activeTab) {
        const {
            children
        } = this.props;

        const childrenArray = React.Children.toArray(children);

        return childrenArray.map((item) => {
            if (item.props.tabName === activeTab) {
                return item;
            }

            return false;
        });
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
                      mods={ { isActive: item.props.tabName === activeTab } }
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
                { this.renderActiveTab(activeTab) }
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
