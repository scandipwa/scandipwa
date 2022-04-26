/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import { createRef } from 'react';

import Link from 'Component/Link';
import Loader from 'Component/Loader';
import Logo from 'Component/Logo';
import MyAccountOrder from 'Component/MyAccountOrder/MyAccountOrder.component';
import { ORDER_ITEMS } from 'Component/MyAccountOrder/MyAccountOrder.config';
import MyAccountOrderItemsTable from 'Component/MyAccountOrderItemsTable';
import CSS from 'Util/CSS';
import media from 'Util/Media';
import { LOGO_MEDIA } from 'Util/Media/Media';

import './MyAccountOrderPrint.style';

/** @namespace Component/MyAccountOrderPrint/Component */
export class MyAccountOrderPrint extends MyAccountOrder {
    logoRef = createRef();

    state = {
        isPrintShown: false
    };

    componentDidUpdate() {
        const { order: { id } = {}, isLogoLoaded } = this.props;
        const { isPrintShown } = this.state;

        if (id && isLogoLoaded && !isPrintShown) {
            this.showPrint();
        }
    }

    showPrint() {
        this.setState({ isPrintShown: true });
        print();
    }

    renderOrderIncrementIdAndStatus() {
        const { order: { increment_id, status } } = this.props;

        return (
            <h2 block="MyAccountOrder" elem="OrderId">
                { __('Order # %s', increment_id) }
                <span block="MyAccountOrder" elem="OrderStatus">
                    { status }
                </span>
            </h2>
        );
    }

    renderOrderItemsTable(items, index) {
        const { activeTab, order: { total: orderTotal, items: allOrderItems, id } } = this.props;
        const { total: itemsTotal, id: itemId } = items;

        return (
            <MyAccountOrderItemsTable
              key={ `${activeTab}-${id}-${index}` }
              activeTab={ activeTab }
              items={ items }
              allOrderItems={ allOrderItems }
              total={ itemsTotal || orderTotal }
              id={ activeTab === ORDER_ITEMS ? id : atob(itemId) }
              isPrintPage
            />
        );
    }

    renderLogoImage() {
        const {
            logo_src,
            logo_alt,
            logo_height,
            logo_width,
            onLogoLoad
        } = this.props;

        const logoSrc = logo_src ? media(logo_src, LOGO_MEDIA) : null;

        CSS.setVariable(this.logoRef, 'header-logo-height', `${logo_height}px`);
        CSS.setVariable(this.logoRef, 'header-logo-width', `${logo_width}px`);

        return (
            <Link
              to="/"
              aria-label="Go to homepage by clicking on ScandiPWA logo"
              block="MyAccountOrderPrint"
              elem="LogoWrapper"
              key="logo"
            >
                <Logo
                  src={ logoSrc }
                  alt={ logo_alt }
                  title={ logo_alt }
                  onImageLoad={ onLogoLoad }
                />
            </Link>
        );
    }

    renderCopyright() {
        const { copyright } = this.props;

        return (
            <small
              block="MyAccountOrderPrint"
              elem="Copyright"
            >
                { copyright }
            </small>
        );
    }

    renderContent() {
        const { order: { items } } = this.props;

        if (!items) {
            return null;
        }

        return (
            <>
                { this.renderLogoImage() }
                { this.renderBaseInfo() }
                { this.renderActiveTab() }
                { this.renderOrderInformation() }
                { this.renderCopyright() }
            </>
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
            <div
              block="MyAccountOrderPrint"
              elem="Wrapper"
              ref={ this.logoRef }
            >
                <Loader isLoading={ isLoading } />
                { this.renderContent() }
            </div>
        );
    }
}

export default MyAccountOrderPrint;
