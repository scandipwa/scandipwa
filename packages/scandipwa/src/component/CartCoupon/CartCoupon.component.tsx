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

import { ChangeEvent, PureComponent } from 'react';

import Field from 'Component/Field';
import { FieldType } from 'Component/Field/Field.config';
import { EventFieldData } from 'Component/Field/Field.type';
import Form from 'Component/Form';
import Loader from 'Component/Loader';
import { ReactElement } from 'Type/Common.type';

import { CartCouponComponentProps, CartCouponComponentState } from './CartCoupon.type';

import './CartCoupon.style';

/** @namespace Component/CartCoupon/Component */
export class CartCouponComponent<
P extends Readonly<CartCouponComponentProps> = Readonly<CartCouponComponentProps>,
S extends CartCouponComponentState = CartCouponComponentState,
> extends PureComponent <P, S> {
    static defaultProps: Partial<CartCouponComponentProps> = {
        couponCode: '',
    };

    state: S = {
        enteredCouponCode: '',
        isFieldWithError: false,
    } as S;

    __construct(props: P): void {
        super.__construct?.(props);

        this.handleCouponCodeChange = this.handleCouponCodeChange.bind(this);
        this.handleApplyCoupon = this.handleApplyCoupon.bind(this);
        this.handleRemoveCoupon = this.handleRemoveCoupon.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentDidUpdate(prevProps: CartCouponComponentProps): void {
        const { isIncorrectCoupon: prevIsIncorrectCoupon = false } = prevProps;
        const { isIncorrectCoupon = false, resetIsIncorrectCoupon } = this.props;

        if (isIncorrectCoupon && prevIsIncorrectCoupon !== isIncorrectCoupon) {
            this.toggleIsFieldWithError(isIncorrectCoupon);
            resetIsIncorrectCoupon();
        }
    }

    toggleIsFieldWithError(value: boolean): void {
        this.setState({
            isFieldWithError: value,
        });
    }

    handleCouponCodeChange(event: ChangeEvent<HTMLInputElement>, field?: EventFieldData): void {
        const { value = '' } = field || {};

        this.setState({
            enteredCouponCode: value,
            isFieldWithError: false,
        });
    }

    handleApplyCoupon(): void {
        const { handleApplyCouponToCart } = this.props;
        const { enteredCouponCode } = this.state;

        handleApplyCouponToCart(enteredCouponCode);
    }

    handleRemoveCoupon(): void {
        const { handleRemoveCouponFromCart } = this.props;

        handleRemoveCouponFromCart();

        // We need to reset input field. If we do it in applyCouponCode,
        // then it will disappear if code is incorrect. We want to avoid it
        this.setState({
            enteredCouponCode: '',
        });
    }

    handleFormSubmit(): void {
        const { couponCode } = this.props;

        if (couponCode) {
            this.handleRemoveCoupon();

            return;
        }

        this.handleApplyCoupon();
    }

    renderApplyCoupon(): ReactElement {
        const { enteredCouponCode, isFieldWithError } = this.state;

        return (
            <>
                <div block="CartCoupon" elem="Input">
                    <Field
                      type={ FieldType.TEXT }
                      attr={ {
                          id: 'couponCode',
                          name: 'couponCode',
                          defaultValue: enteredCouponCode,
                          placeholder: __('Your discount code'),
                          'aria-label': __('Your discount code'),
                      } }
                      events={ {
                          onChange: this.handleCouponCodeChange,
                      } }
                      validateOn={ ['onChange'] }
                      mix={ { mods: { hasError: isFieldWithError }, block: 'Field' } }
                    />
                </div>
                <button
                  block="CartCoupon"
                  elem="Button"
                  type={ FieldType.BUTTON }
                  mods={ { isHollow: true } }
                  disabled={ !enteredCouponCode }
                  onClick={ this.handleApplyCoupon }
                >
                    { __('Submit') }
                </button>
            </>
        );
    }

    renderRemoveCoupon(): ReactElement {
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

    renderTitle(): ReactElement {
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

    render(): ReactElement {
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

export default CartCouponComponent;
