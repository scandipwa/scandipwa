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

import Field from 'Component/Field';
import FIELD_TYPE from 'Component/Field/Field.config';
import Form from 'Component/Form';
import Loader from 'Component/Loader';
import { MixType } from 'Type/Common.type';

import './CartCoupon.style';

/** @namespace Component/CartCoupon/Component */
export class CartCoupon extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        couponCode: PropTypes.string,
        handleApplyCouponToCart: PropTypes.func.isRequired,
        handleRemoveCouponFromCart: PropTypes.func.isRequired,
        mix: MixType.isRequired,
        title: PropTypes.string.isRequired
    };

    static defaultProps = {
        couponCode: ''
    };

    state = {
        enteredCouponCode: ''
    };

    handleCouponCodeChange = this.handleCouponCodeChange.bind(this);

    handleApplyCoupon = this.handleApplyCoupon.bind(this);

    handleRemoveCoupon = this.handleRemoveCoupon.bind(this);

    handleFormSubmit = this.handleFormSubmit.bind(this);

    handleCouponCodeChange(event, field) {
        const { value = '' } = field;

        this.setState({
            enteredCouponCode: value
        });
    }

    handleApplyCoupon() {
        const { handleApplyCouponToCart } = this.props;
        const { enteredCouponCode } = this.state;

        handleApplyCouponToCart(enteredCouponCode);
    }

    handleRemoveCoupon() {
        const { handleRemoveCouponFromCart } = this.props;

        handleRemoveCouponFromCart();

        // We need to reset input field. If we do it in applyCouponCode,
        // then it will disappear if code is incorrect. We want to avoid it
        this.setState({
            enteredCouponCode: ''
        });
    }

    handleFormSubmit() {
        const { couponCode } = this.props;

        if (couponCode) {
            this.handleRemoveCoupon();

            return;
        }

        this.handleApplyCoupon();
    }

    renderApplyCoupon() {
        const { enteredCouponCode } = this.state;

        return (
            <>
                <div block="CartCoupon" elem="Input">
                    <Field
                      type={ FIELD_TYPE.text }
                      attr={ {
                          id: 'couponCode',
                          name: 'couponCode',
                          defaultValue: enteredCouponCode,
                          placeholder: __('Your discount code'),
                          'aria-label': __('Your discount code')
                      } }
                      events={ {
                          onChange: this.handleCouponCodeChange
                      } }
                      validationRule={ {
                          isRequired: true
                      } }
                      validateOn={ ['onChange'] }
                    />
                </div>
                <button
                  block="CartCoupon"
                  elem="Button"
                  type={ FIELD_TYPE.button }
                  mods={ { isHollow: true } }
                  disabled={ !enteredCouponCode }
                  onClick={ this.handleApplyCoupon }
                >
                    { __('Submit') }
                </button>
            </>
        );
    }

    renderRemoveCoupon() {
        const { couponCode } = this.props;

        return (
            <>
                <div block="CartCoupon" elem="Message">
                    <p block="CartCoupon" elem="MessageText">
                        { __('Applied coupon code: ') }
                        <strong>{ couponCode.toUpperCase() }</strong>
                    </p>
                </div>
                <button
                  block="CartCoupon"
                  elem="Button"
                  type="button"
                  mix={ { block: 'Button' } }
                  onClick={ this.handleRemoveCoupon }
                >
                    { __('Remove Coupon') }
                </button>
            </>
        );
    }

    renderTitle() {
        const { title } = this.props;

        if (!title) {
            return null;
        }

        return (
            <h3 block="CartCoupon" elem="Title">
                { title }
            </h3>
        );
    }

    render() {
        const { isLoading, couponCode, mix } = this.props;

        return (
            <div
              block="CartCoupon"
              mix={ mix }
            >
                <Form
                  onSubmit={ this.handleFormSubmit }
                  returnAsObject
                >
                    <Loader isLoading={ isLoading } />
                    { this.renderTitle() }
                    { (couponCode
                        ? this.renderRemoveCoupon()
                        : this.renderApplyCoupon()
                    ) }
                </Form>
            </div>
        );
    }
}

export default CartCoupon;
