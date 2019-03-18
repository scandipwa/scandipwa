/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENCE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AddToCart.style';

/**
 * Button for adding product to Cart
 * @class AddToCart
 */
class AddToCart extends Component {
    constructor(props) {
        super(props);
        this.state = { transition: false };
        this.timeOut = null;
    }

    componentWillUnmount() {
        clearTimeout(this.timeOut);
    }

    /**
     * Switch button text to indicated that product has been added
     * @return {Promise}
     */
    setAnimationTimeout() {
        return setTimeout(() => {
            this.timeOut = null;
            this.setState(({ transition }) => ({ transition: !transition }));
        }, 1500);
    }

    /**
     * Button click listener
     * @return {void}
     */
    buttonClick() {
        const { onClick } = this.props;

        if (this.timeOut) {
            clearTimeout(this.timeOut);
            this.timeOut = this.setAnimationTimeout();
        } else {
            this.timeOut = this.setAnimationTimeout();
            this.setState(({ transition }) => ({ transition: !transition }));
        }

        onClick();
    }

    render() {
        const { transition } = this.state;
        const { fullWidth } = this.props;

        return (
            <button
              onClick={ () => this.buttonClick() }
              block="AddToCart"
              elem="Button"
              mods={ { animated: transition, fullWidth } }
              disabled={ transition }
            >
                <span>Add to cart</span>
                <span>Adding...</span>
            </button>
        );
    }
}

AddToCart.propTypes = {
    onClick: PropTypes.func.isRequired,
    fullWidth: PropTypes.bool
};

AddToCart.defaultProps = {
    fullWidth: false
};

export default AddToCart;
