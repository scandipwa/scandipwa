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
import { ProductType } from 'Type/ProductList';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { MyAccountDispatcher } from 'Store/MyAccount';
import { customerType } from 'Type/Account';
import { GIFTCARD } from 'Util/Product';
import ProductActions from './ProductActions.component';

export const mapStateToProps = state => ({
    groupedProductQuantity: state.ProductReducer.groupedProductQuantity,
    customer: state.MyAccountReducer.customer,
    isSignedIn: state.MyAccountReducer.isSignedIn
});

export const mapDispatchToProps = dispatch => ({
    requestCustomerData: () => MyAccountDispatcher.requestCustomerData(dispatch)
});

export const DEFAULT_MAX_PRODUCTS = 99;

export class ProductActionsContainer extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        productOrVariant: PropTypes.object.isRequired,
        configurableVariantIndex: PropTypes.number.isRequired,
        areDetailsLoaded: PropTypes.bool.isRequired,
        parameters: PropTypes.objectOf(PropTypes.string).isRequired,
        isSignedIn: PropTypes.bool.isRequired,
        requestCustomerData: PropTypes.func.isRequired,
        customer: customerType.isRequired,
        wishlistData: PropTypes.object.isRequired
    };

    state = {
        quantity: 1,
        groupedProductQuantity: {},
        giftCardData: {},
        giftCardPrice: 0,
        giftCardVariantIndex: -2
    };

    containerFunctions = {
        showOnlyIfLoaded: this.showOnlyIfLoaded.bind(this),
        getIsOptionInCurrentVariant: this.getIsOptionInCurrentVariant.bind(this),
        setQuantity: this.setQuantity.bind(this),
        setGroupedProductQuantity: this._setGroupedProductQuantity.bind(this),
        clearGroupedProductQuantity: this._clearGroupedProductQuantity.bind(this),
        getIsConfigurableAttributeAvailable: this.getIsConfigurableAttributeAvailable.bind(this),
        updateGiftCardAmount: this.updateGiftCardAmount.bind(this),
        handleGiftCardSenderEmail: this._handleUpdateGiftCardData.bind(this, 'giftcard_sender_email'),
        handleGiftCardSenderName: this._handleUpdateGiftCardData.bind(this, 'giftcard_sender_name'),
        handleGiftCardRecipientEmail: this._handleUpdateGiftCardData.bind(this, 'giftcard_recipient_email'),
        handleGiftCardRecipientName: this._handleUpdateGiftCardData.bind(this, 'giftcard_recipient_name'),
        handleGiftCardMessage: this._handleUpdateGiftCardData.bind(this, 'giftcard_message')
    };

    constructor(props) {
        super(props);

        const { requestCustomerData, customer: { id }, isSignedIn } = props;

        if (isSignedIn && !id) requestCustomerData();
    }

    componentDidUpdate(prevProps) {
        const {
            customer, product, product: { type_id }, wishlistData
        } = this.props;
        const { product: prevProduct } = prevProps;

        if (product !== prevProduct && type_id === GIFTCARD) {
            if (Object.keys(customer).length) {
                const { firstname, lastname, email } = customer;
                this.setDefaultGiftCardValues(firstname, lastname, email);
            } else {
                this.setDefaultGiftCardValues();
            }
        }

        if (Object.keys(wishlistData).length && product !== prevProduct && type_id === GIFTCARD) {
            const { options } = wishlistData;
            this.getUsersGiftCardData(options);
        }
    }

    setDefaultGiftCardValues(firstname = '', lastname = '', email = '') {
        const { product: { allow_open_amount, open_amount_min, giftcard_amounts } } = this.props;
        const name = firstname && lastname ? `${ firstname } ${ lastname }` : '';
        const giftCardAmount = allow_open_amount ? open_amount_min : giftcard_amounts[0].value;

        this.setState({
            giftCardData: {
                ...giftCardAmount,
                giftcard_message: '',
                giftcard_recipient_email: email,
                giftcard_recipient_name: name,
                giftcard_sender_email: email,
                giftcard_sender_name: name
            },
            giftCardPrice: allow_open_amount ? open_amount_min : giftcard_amounts[0].value
        });
    }

    getUsersGiftCardData(userData) {
        const giftCardData = JSON.parse(userData);
        const {
            custom_giftcard_amount,
            giftcard_amount,
            giftcard_sender_email,
            giftcard_sender_name,
            giftcard_recipient_email,
            giftcard_recipient_name,
            giftcard_message
        } = giftCardData;
        const giftCardAmount = custom_giftcard_amount ? { custom_giftcard_amount } : { giftcard_amount };

        this.setState({
            giftCardData: {
                ...giftCardAmount,
                giftcard_message,
                giftcard_recipient_email,
                giftcard_recipient_name,
                giftcard_sender_email,
                giftcard_sender_name
            },
            giftCardPrice: custom_giftcard_amount || giftcard_amount
        });
    }

    static getDerivedStateFromProps(props, state) {
        const { quantity } = state;
        const minQty = ProductActionsContainer.getMinQuantity(props);
        const maxQty = ProductActionsContainer.getMaxQuantity(props);

        if (quantity < minQty) return { quantity: minQty };
        if (quantity > maxQty) return { quantity: maxQty };

        return null;
    }

    setQuantity(value) {
        this.setState({ quantity: +value });
    }

    static getMinQuantity(props) {
        const {
            product: { stock_item: { min_sale_qty } = {}, variants } = {},
            configurableVariantIndex
        } = props;

        if (!min_sale_qty) return 1;
        if (!configurableVariantIndex && !variants) return min_sale_qty;

        const { stock_item: { min_sale_qty: minVariantQty } = {} } = variants[configurableVariantIndex] || {};

        return minVariantQty || min_sale_qty;
    }

    static getMaxQuantity(props) {
        const {
            product: {
                stock_item: {
                    max_sale_qty
                } = {},
                variants
            } = {},
            configurableVariantIndex
        } = props;

        if (!max_sale_qty) {
            return DEFAULT_MAX_PRODUCTS;
        }

        if (configurableVariantIndex === -1 || !Object.keys(variants).length) {
            return max_sale_qty;
        }

        const {
            stock_item: {
                max_sale_qty: maxVariantQty
            } = {}
        } = variants[configurableVariantIndex] || {};

        return maxVariantQty || max_sale_qty;
    }

    // TODO: make key=>value based
    getIsOptionInCurrentVariant(attribute, value) {
        const { configurableVariantIndex, product: { variants } } = this.props;
        if (!variants) return false;
        return variants[configurableVariantIndex].product[attribute] === value;
    }

    getIsConfigurableAttributeAvailable({ attribute_code, attribute_value }) {
        const { parameters, product: { variants } } = this.props;

        const isAttributeSelected = Object.hasOwnProperty.call(parameters, attribute_code);

        // If value matches current attribute_value, option should be enabled
        if (isAttributeSelected && parameters[attribute_code] === attribute_value) return true;

        const parameterPairs = Object.entries(parameters);

        const selectedAttributes = isAttributeSelected
            // Need to exclude itself, otherwise different attribute_values of the same attribute_code will always be disabled
            ? parameterPairs.filter(([key]) => key !== attribute_code)
            : parameterPairs;

        return variants
            .some(({ stock_status, attributes }) => {
                const { attribute_value: foundValue } = attributes[attribute_code] || {};

                return (
                    stock_status === 'IN_STOCK'
                    // Variant must have currently checked attribute_code and attribute_value
                    && foundValue === attribute_value
                    // Variant must have all currently selected attributes
                    && selectedAttributes.every(([key, value]) => attributes[key].attribute_value === value)
                );
            });
    }

    containerProps = () => ({
        minQuantity: ProductActionsContainer.getMinQuantity(this.props),
        maxQuantity: ProductActionsContainer.getMaxQuantity(this.props),
        groupedProductQuantity: this._getGroupedProductQuantity()
    });

    _handleUpdateGiftCardData(fieldName, value) {
        this.setState(prevState => ({
            giftCardData: {
                ...prevState.giftCardData,
                [fieldName]: value
            }
        }));
    }

    updateGiftCardAmount(giftCardPrice, giftCardVariantIndex = -1) {
        this.setState({ giftCardPrice, giftCardVariantIndex });
    }

    _getGroupedProductQuantity() {
        const { groupedProductQuantity } = this.state;
        return groupedProductQuantity;
    }

    _setGroupedProductQuantity(id, value) {
        this.setState(({ groupedProductQuantity }) => ({
            groupedProductQuantity: {
                ...groupedProductQuantity,
                [id]: value
            }
        }));
    }

    _clearGroupedProductQuantity() {
        this.setState({ groupedProductQuantity: {} });
    }

    showOnlyIfLoaded(expression, content, placeholder = content) {
        const { areDetailsLoaded } = this.props;

        if (!areDetailsLoaded) return placeholder;
        if (areDetailsLoaded && !expression) return null;
        return content;
    }

    render() {
        return (
            <ProductActions
              { ...this.props }
              { ...this.state }
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionsContainer);
