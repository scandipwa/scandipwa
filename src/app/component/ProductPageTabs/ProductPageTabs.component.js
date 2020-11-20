/* eslint-disable react/jsx-no-bind */
import './ProductPageTabs.scss';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import Html from 'Component/Html';

/** @namespace Component */
// eslint-disable-next-line @scandipwa/scandipwa-guidelines/derived-class-names
export class ProductPageTabs extends PureComponent {
    static propTypes = {
        product: PropTypes.object.isRequired

    };

    __construct(props) {
        super.__construct(props);
        this.renderAbout = this.renderAbout.bind(this);
        this.renderDetails = this.renderDetails.bind(this);
        this.renderReviews = this.renderReviews.bind(this);
        // this.setActiveTab = this.setActiveTab.bind(this);
        // const { customer: { firstname: nickname } } = this.props;
        // const reviewData = { nickname };

        this.state = {
            activeTab: 'about'
        };
    }

    renderAbout() {
        const { product: { description: { html } = {} } } = this.props;

        if (!html) {
            return null;
        }

        return (
            <div>
                <Html content={ html } />
            </div>
        );
    }

    renderReviews() {
        const { product } = this.props;

        return (
            <div>
                { product.reviews.length ? JSON.stringify(product.reviews, null, 2) : <div>There is no reviews</div> }
            </div>
        );
    }

    renderDetails() {
        return (
            <div>
                Details
            </div>
        );
    }

    setActiveTab(activeTab) {
        this.setState({
            activeTab
        });
    }

    render() {
        const { activeTab } = this.state;
        const activeAbout = activeTab === 'about' ? 'Element active' : 'Element';
        const activeDetails = activeTab === 'details' ? 'Element active' : 'Element';
        const activeReviews = activeTab === 'reviews' ? 'Element active' : 'Element';
        return (
            <div block="Tabs">
                <div block="Tabs" elem="Wrapper">
                    <button block="Tabs" elem={ activeAbout } onClick={ this.setActiveTab.bind(this, 'about') }>
                        { __('About') }
                    </button>

                    <button block="Tabs" elem={ activeDetails } onClick={ this.setActiveTab.bind(this, 'details') }>
                        { __('Details') }
                    </button>
                    <button block="Tabs" elem={ activeReviews } onClick={ this.setActiveTab.bind(this, 'reviews') }>
                        { __('Reviews') }
                    </button>
                </div>

                <div block="Tabs" elem="Container">
                    { activeTab === 'about' && this.renderAbout() }
                    { activeTab === 'details' && this.renderDetails() }
                    { activeTab === 'reviews' && this.renderReviews() }
                </div>
            </div>

        );
    }
}

export default ProductPageTabs;
