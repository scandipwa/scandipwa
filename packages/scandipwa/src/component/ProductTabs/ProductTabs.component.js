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

import ContentWrapper from 'Component/ContentWrapper';
import ProductTab from 'Component/ProductTab';
import { isMobile } from 'Util/Mobile';

import './ProductTabs.style';

/** @namespace Component/ProductTabs/Component */
export class ProductTabs extends PureComponent {
    static propTypes = {
        tabNames: PropTypes.arrayOf(PropTypes.string).isRequired,
        children: PropTypes.node,
        defaultTab: PropTypes.string
    };

    static defaultProps = {
        children: null,
        defaultTab: null
    };

    __construct(props) {
        super.__construct(props);

        const { defaultTab, tabNames } = this.props;

        this.state = {
            activeTab: defaultTab || tabNames[0]
        };
    }

    onTabClick = (activeTab) => {
        this.setState({
            activeTab
        });
    };

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

    renderTab = (_, i) => {
        const { tabNames } = this.props;
        const { activeTab } = this.state;

        return (
            <ProductTab
              tabName={ tabNames[i] }
              key={ tabNames[i] }
              onClick={ this.onTabClick }
              isActive={ tabNames[i].toLowerCase() === activeTab.toLowerCase() }
            />
        );
    };

    renderTabs() {
        const { children } = this.props;
        const { activeTab } = this.state;

        return (
            <>
                <ul
                  block="ProductTabs"
                >
                    { children.map(this.renderTab) }
                </ul>
                { isMobile.any()
                    ? this.renderAllTabs(children)
                    : this.renderActiveTab(activeTab, children) }
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
