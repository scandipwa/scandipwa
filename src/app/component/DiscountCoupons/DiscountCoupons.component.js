import React, { Component } from 'react';
import './DiscountCoupons.style';

/**
 * Apply discount block
 * @class DiscountCoupons
 */
class DiscountCoupons extends Component {
    constructor() {
        super();

        this.state = {
            isExpanded: false,
            discountCode: ''
        };
    }

    /**
     * Expand input block
     * @return {void}
     */
    handleExpand() {
        this.setState(({ isExpanded }) => ({ isExpanded: !isExpanded }));
    }

    /**
     * Handle apply discount
     * @return {void}
     */
    handleApplyDiscount(event) {
        event.preventDefault();
        // TODO: trigger discont code apply request
    }

    handleChange(event) {
        this.setState({ discountCode: event.target.value });
    }

    render() {
        const { isExpanded, discountCode } = this.state;

        return (
            <div block="DiscountCoupons">
                <span>Have a discount code?</span>
                { isExpanded
                    ? (
                        <form onSubmit={ this.handleApplyDiscount }>
                            <input
                              type="text"
                              value={ discountCode }
                              onChange={ e => this.handleChange(e) }
                              placeholder="Enter your discount code"
                            />
                            <button>Apply discount</button>
                        </form>
                    )
                    : <button onClick={ () => this.handleExpand() }>Apply here</button>
                }

            </div>
        );
    }
}

export default DiscountCoupons;
