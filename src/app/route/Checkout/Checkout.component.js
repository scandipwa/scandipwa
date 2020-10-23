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

import CartCoupon from 'Component/CartCoupon';
import CheckoutBilling from 'Component/CheckoutBilling';
import CheckoutOrderSummary from 'Component/CheckoutOrderSummary';
import CheckoutShipping from 'Component/CheckoutShipping';
import CheckoutSuccess from 'Component/CheckoutSuccess';
import CmsBlock from 'Component/CmsBlock';
import ContentWrapper from 'Component/ContentWrapper';
import ExpandableContent from 'Component/ExpandableContent';
import { CHECKOUT } from 'Component/Header/Header.config';
import Loader from 'Component/Loader';
import { addressType } from 'Type/Account';
import { paymentMethodsType, shippingMethodsType } from 'Type/Checkout';
import { HistoryType } from 'Type/Common';
import { TotalsType } from 'Type/MiniCart';
import { appendWithStoreCode } from 'Util/Url';

import {
    BILLING_STEP,
    CHECKOUT_URL,
    DETAILS_STEP,
    SHIPPING_STEP
} from './Checkout.config';

import './Checkout.style';

/** @namespace Route/Checkout/Component */
export class Checkout extends PureComponent {
    static propTypes = {
        setLoading: PropTypes.func.isRequired,
        setDetailsStep: PropTypes.func.isRequired,
        shippingMethods: shippingMethodsType.isRequired,
        onShippingEstimationFieldsChange: PropTypes.func.isRequired,
        setHeaderState: PropTypes.func.isRequired,
        paymentMethods: paymentMethodsType.isRequired,
        saveAddressInformation: PropTypes.func.isRequired,
        savePaymentInformation: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        isDeliveryOptionsLoading: PropTypes.bool.isRequired,
        shippingAddress: addressType.isRequired,
        checkoutTotals: TotalsType.isRequired,
        // eslint-disable-next-line react/no-unused-prop-types
        orderID: PropTypes.number.isRequired,
        order_number: PropTypes.string.isRequired,
        history: HistoryType.isRequired,
        onEmailChange: PropTypes.func.isRequired,
        paymentTotals: TotalsType,
        checkoutStep: PropTypes.oneOf([
            SHIPPING_STEP,
            BILLING_STEP,
            DETAILS_STEP
        ]).isRequired,
        isCreateUser: PropTypes.bool.isRequired,
        onCreateUserChange: PropTypes.func.isRequired,
        onPasswordChange: PropTypes.func.isRequired,
        goBack: PropTypes.func.isRequired,
        totals: TotalsType.isRequired
    };

    static defaultProps = {
        paymentTotals: {}
    };

    stepMap = {
        [SHIPPING_STEP]: {
            title: __('Shipping step'),
            url: '/shipping',
            render: this.renderShippingStep.bind(this),
            areTotalsVisible: true,
            renderCartCoupon: this.renderCartCoupon.bind(this)
        },
        [BILLING_STEP]: {
            title: __('Billing step'),
            url: '/billing',
            render: this.renderBillingStep.bind(this),
            areTotalsVisible: true,
            renderCartCoupon: this.renderCartCoupon.bind(this)
        },
        [DETAILS_STEP]: {
            title: __('Thank you for your purchase!'),
            url: '/success',
            render: this.renderDetailsStep.bind(this),
            areTotalsVisible: false
        }
    };

    componentDidMount() {
        const { checkoutStep, history } = this.props;
        const { url } = this.stepMap[checkoutStep];

        this.updateHeader();

        history.replace(appendWithStoreCode(`${ CHECKOUT_URL }${ url }`));
    }

    componentDidUpdate(prevProps) {
        const { checkoutStep } = this.props;
        const { checkoutStep: prevCheckoutStep } = prevProps;

        if (checkoutStep !== prevCheckoutStep) {
            this.updateHeader();
            this.updateStep();
        }
    }

    updateHeader() {
        const { setHeaderState, checkoutStep, goBack } = this.props;
        const { title = '' } = this.stepMap[checkoutStep];

        setHeaderState({
            name: CHECKOUT,
            title,
            onBackClick: () => goBack()
        });
    }

    updateStep() {
        const { checkoutStep, history } = this.props;
        const { url } = this.stepMap[checkoutStep];

        history.push(appendWithStoreCode(`${ CHECKOUT_URL }${ url }`));
    }

    renderTitle() {
        const { checkoutStep } = this.props;
        const { title = '' } = this.stepMap[checkoutStep];

        return (
            <h1 block="Checkout" elem="Title">
                { title }
            </h1>
        );
    }

    renderShippingStep() {
        const {
            shippingMethods,
            onShippingEstimationFieldsChange,
            saveAddressInformation,
            isDeliveryOptionsLoading,
            onPasswordChange,
            onCreateUserChange,
            onEmailChange,
            isCreateUser
        } = this.props;

        return (
            <CheckoutShipping
              isLoading={ isDeliveryOptionsLoading }
              shippingMethods={ shippingMethods }
              saveAddressInformation={ saveAddressInformation }
              onShippingEstimationFieldsChange={ onShippingEstimationFieldsChange }
              onPasswordChange={ onPasswordChange }
              onCreateUserChange={ onCreateUserChange }
              onEmailChange={ onEmailChange }
              isCreateUser={ isCreateUser }
            />
        );
    }

    renderBillingStep() {
        const {
            setLoading,
            setDetailsStep,
            shippingAddress,
            paymentMethods = [],
            savePaymentInformation
        } = this.props;

        return (
            <CheckoutBilling
              setLoading={ setLoading }
              paymentMethods={ paymentMethods }
              setDetailsStep={ setDetailsStep }
              shippingAddress={ shippingAddress }
              savePaymentInformation={ savePaymentInformation }
            />
        );
    }

    renderDetailsStep() {
        const { order_number } = this.props;

        return (
            <CheckoutSuccess
              order_number={ order_number }
            />
        );
    }

    renderStep() {
        const { checkoutStep } = this.props;
        const { render } = this.stepMap[checkoutStep];
        if (render) {
            return render();
        }

        return null;
    }

    renderLoader() {
        const { isLoading } = this.props;
        return <Loader isLoading={ isLoading } />;
    }

    renderSummary() {
        const { checkoutTotals, checkoutStep, paymentTotals } = this.props;
        const { areTotalsVisible } = this.stepMap[checkoutStep];

        if (!areTotalsVisible) {
            return null;
        }

        return (
            <CheckoutOrderSummary
              checkoutStep={ checkoutStep }
              totals={ checkoutTotals }
              paymentTotals={ paymentTotals }
            />
        );
    }

    renderCoupon() {
        const { checkoutStep } = this.props;
        const { renderCartCoupon } = this.stepMap[checkoutStep];

        if (renderCartCoupon) {
            return renderCartCoupon();
        }

        return null;
    }

    renderCartCoupon() {
        const {
            totals: { coupon_code }
        } = this.props;

        return (
            <ExpandableContent
              heading={ __('Have a discount code?') }
              mix={ { block: 'Checkout', elem: 'Discount' } }
            >
                <CartCoupon couponCode={ coupon_code } />
            </ExpandableContent>
        );
    }

    renderPromo() {
        const { checkoutStep } = this.props;
        const isBilling = checkoutStep === BILLING_STEP;

        const {
            checkout_content: {
                [isBilling ? 'checkout_billing_cms' : 'checkout_shipping_cms']: promo
            } = {}
        } = window.contentConfiguration;

        if (!promo) {
            return null;
        }

        return <CmsBlock identifier={ promo } />;
    }

    render() {
        return (
            <main block="Checkout">
                <ContentWrapper
                  wrapperMix={ { block: 'Checkout', elem: 'Wrapper' } }
                  label={ __('Checkout page') }
                >
                    <div block="Checkout" elem="Step">
                        { this.renderTitle() }
                        { this.renderStep() }
                        { this.renderLoader() }
                    </div>
                    <div>
                        { this.renderSummary() }
                        { this.renderPromo() }
                        { this.renderCoupon() }
                    </div>
                </ContentWrapper>
            </main>
        );
    }
}

export default Checkout;
