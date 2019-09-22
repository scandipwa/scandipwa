import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { shippingMethodsType } from 'Type/Checkout';
import { SHIPPING_STEP } from 'Route/Checkout/Checkout.component';

import CheckoutDeliveryOptions from './CheckoutDeliveryOptions.component';

export const mapStateToProps = state => ({
    // wishlistItems: state.WishlistReducer.productsInWishlist
});

export const mapDispatchToProps = dispatch => ({
    // addProduct: options => CartDispatcher.addProductToCart(dispatch, options)
});

export class CheckoutDeliveryOptionsContainer extends PureComponent {
    static propTypes = {
        onShippingMethodSelect: PropTypes.func.isRequired,
        shippingMethods: shippingMethodsType.isRequired
    };

    static _getDefaultMethod(props) {
        const { shippingMethods } = props;
        const [{ method_code } = [{}]] = shippingMethods;
        return method_code;
    }

    containerFunctions = {
        selectShippingMethod: this.selectShippingMethod.bind(this)
    };

    dataMap = {};

    constructor(props) {
        super(props);

        const { shippingMethods } = props;
        this.state = { prevShippingMethods: shippingMethods };

        const selectedShippingMethodCode = CheckoutDeliveryOptionsContainer._getDefaultMethod(props);

        if (selectedShippingMethodCode) {
            this.state = {
                ...this.state,
                selectedShippingMethodCode
            };
        }
    }

    componentDidMount() {
        if (window.formPortalCollector) {
            window.formPortalCollector.subscribe(SHIPPING_STEP, this.collectAdditionalData);
        }
    }

    componentDidUpdate(_, prevState) {
        const { onShippingMethodSelect, shippingMethods } = this.props;
        const { selectedShippingMethodCode } = this.state;
        const { selectedShippingMethodCode: prevSelectedShippingMethodCode } = prevState;

        if (selectedShippingMethodCode !== prevSelectedShippingMethodCode) {
            const shippingMethod = shippingMethods.find(
                ({ carrier_code }) => carrier_code === selectedShippingMethodCode
            );

            onShippingMethodSelect(shippingMethod);
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { shippingMethods } = props;
        const { prevShippingMethods } = state;

        if (shippingMethods.length !== prevShippingMethods.length) {
            const selectedShippingMethodCode = CheckoutDeliveryOptionsContainer._getDefaultMethod(props);

            return {
                selectedShippingMethodCode,
                prevShippingMethods: shippingMethods
            };
        }

        return null;
    }

    componentWillUnmount() {
        if (window.formPortalCollector) {
            window.formPortalCollector.unsubscribe(SHIPPING_STEP, this.collectAdditionalData);
        }
    }

    collectAdditionalData = () => {
        const { selectedShippingMethodCode } = this.state;
        const additionalDataGetter = this.dataMap[selectedShippingMethodCode];
        if (!additionalDataGetter) return {};
        return additionalDataGetter();
    };

    selectShippingMethod(shippingMethod) {
        const { onShippingMethodSelect } = this.props;
        const { carrier_code } = shippingMethod;
        this.setState({ selectedShippingMethodCode: carrier_code });
        onShippingMethodSelect(shippingMethod);
    }

    render() {
        return (
            <CheckoutDeliveryOptions
              { ...this.props }
              { ...this.containerFunctions }
              { ...this.state }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutDeliveryOptionsContainer);
