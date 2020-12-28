(this["webpackJsonp"] = this["webpackJsonp"] || []).push([["misc~product"],{

/***/ "./src/app/component/AddToCart/AddToCart.component.js":
/*!************************************************************!*\
  !*** ./src/app/component/AddToCart/AddToCart.component.js ***!
  \************************************************************/
/*! exports provided: _AddToCart, AddToCart, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_AddToCart", function() { return _AddToCart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddToCart", function() { return AddToCart; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _AddToCart_style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AddToCart.style */ "./src/app/component/AddToCart/AddToCart.style.scss");
/* harmony import */ var _AddToCart_style__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_AddToCart_style__WEBPACK_IMPORTED_MODULE_4__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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





/**
 * Button for adding product to Cart
 * @class AddToCart
 * @namespace Component/AddToCart/Component
 */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _AddToCart =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_AddToCart, _Extensible);

  function _AddToCart() {
    _classCallCheck(this, _AddToCart);

    return _possibleConstructorReturn(this, _getPrototypeOf(_AddToCart).apply(this, arguments));
  }

  _createClass(_AddToCart, [{
    key: "renderPlaceholder",
    value: function renderPlaceholder() {
      var _this$props = this.props,
          isLoading = _this$props.isLoading,
          mix = _this$props.mix;
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "AddToCart",
          mods: {
            isLoading: isLoading,
            isPlaceholder: true
          },
          mix: mix
        })
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          mix = _this$props2.mix,
          type_id = _this$props2.product.type_id,
          isLoading = _this$props2.isLoading,
          buttonClick = _this$props2.buttonClick;

      if (!type_id) {
        this.renderPlaceholder();
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "button", {
          onClick: buttonClick,
          block: "Button AddToCart",
          mix: mix,
          mods: {
            isLoading: isLoading
          },
          disabled: isLoading
        },
        /*#__PURE__*/
        _checkBEM(React, "span", null, __('Add to cart')),
        /*#__PURE__*/
        _checkBEM(React, "span", null, __('Adding...')))
      );
    }
  }]);

  return _AddToCart;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_AddToCart, 'name', {
  value: 'AddToCart'
});

var AddToCart = middleware(_AddToCart, "Component/AddToCart/Component");

_defineProperty(AddToCart, "propTypes", {
  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  product: _type_ProductList__WEBPACK_IMPORTED_MODULE_3__["ProductType"],
  mix: _type_Common__WEBPACK_IMPORTED_MODULE_2__["MixType"],
  buttonClick: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

_defineProperty(AddToCart, "defaultProps", {
  product: {},
  mix: {},
  isLoading: false
});

/* harmony default export */ __webpack_exports__["default"] = (AddToCart);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/AddToCart/AddToCart.container.js":
/*!************************************************************!*\
  !*** ./src/app/component/AddToCart/AddToCart.container.js ***!
  \************************************************************/
/*! exports provided: CartDispatcher, WishlistDispatcher, mapStateToProps, mapDispatchToProps, _AddToCartContainer, AddToCartContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, __, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartDispatcher", function() { return CartDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WishlistDispatcher", function() { return WishlistDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_AddToCartContainer", function() { return _AddToCartContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddToCartContainer", function() { return AddToCartContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store/Notification/Notification.action */ "./src/app/store/Notification/Notification.action.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _util_Auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../util/Auth */ "./src/app/util/Auth/index.js");
/* harmony import */ var _util_Product__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../util/Product */ "./src/app/util/Product/index.js");
/* harmony import */ var _AddToCart_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./AddToCart.component */ "./src/app/component/AddToCart/AddToCart.component.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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








var CartDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/Cart/Cart.dispatcher */ "./src/app/store/Cart/Cart.dispatcher.js"));
var WishlistDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/Wishlist/Wishlist.dispatcher */ "./src/app/store/Wishlist/Wishlist.dispatcher.js"));
/** @namespace Component/AddToCart/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    wishlistItems: state.WishlistReducer.productsInWishlist
  };
}, "Component/AddToCart/Container/mapStateToProps");
/** @namespace Component/AddToCart/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    addProduct: function addProduct(options) {
      return CartDispatcher.then(function (_ref) {
        var dispatcher = _ref.default;
        return dispatcher.addProductToCart(dispatch, options);
      });
    },
    removeFromWishlist: function removeFromWishlist(options) {
      return WishlistDispatcher.then(function (_ref2) {
        var dispatcher = _ref2.default;
        return dispatcher.removeItemFromWishlist(dispatch, options);
      });
    },
    showNotification: function showNotification(type, message) {
      return dispatch(Object(_store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_3__["showNotification"])(type, message));
    }
  };
}, "Component/AddToCart/Container/mapDispatchToProps");
/* @namespace Component/AddToCart/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _AddToCartContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_AddToCartContainer, _Extensible);

  function _AddToCartContainer() {
    var _getPrototypeOf2, _defineProperty2, _defineProperty3;

    var _this;

    _classCallCheck(this, _AddToCartContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_AddToCartContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isLoading: false
    });

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      buttonClick: _this.buttonClick.bind(_assertThisInitialized(_this))
    });

    _defineProperty(_assertThisInitialized(_this), "validationMap", (_defineProperty2 = {}, _defineProperty(_defineProperty2, _util_Product__WEBPACK_IMPORTED_MODULE_6__["CONFIGURABLE"], _this.validateConfigurableProduct.bind(_assertThisInitialized(_this))), _defineProperty(_defineProperty2, _util_Product__WEBPACK_IMPORTED_MODULE_6__["GROUPED"], _this.validateGroupedProduct.bind(_assertThisInitialized(_this))), _defineProperty(_defineProperty2, _util_Product__WEBPACK_IMPORTED_MODULE_6__["BUNDLE"], _this.validateBundleProduct.bind(_assertThisInitialized(_this))), _defineProperty2));

    _defineProperty(_assertThisInitialized(_this), "addToCartHandlerMap", (_defineProperty3 = {}, _defineProperty(_defineProperty3, _util_Product__WEBPACK_IMPORTED_MODULE_6__["CONFIGURABLE"], _this.addConfigurableProductToCart.bind(_assertThisInitialized(_this))), _defineProperty(_defineProperty3, _util_Product__WEBPACK_IMPORTED_MODULE_6__["GROUPED"], _this.addGroupedProductToCart.bind(_assertThisInitialized(_this))), _defineProperty3));

    return _this;
  }

  _createClass(_AddToCartContainer, [{
    key: "validateConfigurableProduct",
    value: function validateConfigurableProduct() {
      var _this$props = this.props,
          configurableVariantIndex = _this$props.configurableVariantIndex,
          showNotification = _this$props.showNotification,
          _this$props$product$v = _this$props.product.variants,
          variants = _this$props$product$v === void 0 ? [] : _this$props$product$v;

      if (configurableVariantIndex < 0 || !variants[configurableVariantIndex]) {
        showNotification('info', __('Please select product options!'));
        return false;
      }

      var configurableStock = variants[configurableVariantIndex].stock_status;

      if (configurableStock !== 'IN_STOCK') {
        showNotification('info', __('Sorry! The selected product option is out of stock!'));
        return false;
      }

      return true;
    }
  }, {
    key: "validateGroupedProduct",
    value: function validateGroupedProduct() {
      var _this$props2 = this.props,
          groupedProductQuantity = _this$props2.groupedProductQuantity,
          showNotification = _this$props2.showNotification,
          items = _this$props2.product.items;
      var isAllItemsAvailable = items.every(function (_ref3) {
        var id = _ref3.product.id;
        return groupedProductQuantity[id];
      });

      if (!isAllItemsAvailable) {
        showNotification('info', __('Sorry! Child product quantities are invalid!'));
        return false;
      }

      return true;
    }
  }, {
    key: "validateBundleProduct",
    value: function validateBundleProduct() {
      var _this$props3 = this.props,
          productOptionsData = _this$props3.productOptionsData,
          showNotification = _this$props3.showNotification;
      var validateBundleOptions = this.validateCustomizableOptions(productOptionsData, true);

      if (!validateBundleOptions) {
        showNotification('info', __('Please select required option!'));
        return false;
      }

      return true;
    }
  }, {
    key: "validateSimpleProduct",
    value: function validateSimpleProduct() {
      var _this$props4 = this.props,
          productOptionsData = _this$props4.productOptionsData,
          showNotification = _this$props4.showNotification;
      var validateCustomizableOptions = this.validateCustomizableOptions(productOptionsData);

      if (!validateCustomizableOptions) {
        showNotification('info', __('Please select required option!'));
        return false;
      }

      return true;
    }
  }, {
    key: "validateCustomizableOptions",
    value: function validateCustomizableOptions(productOptionsData) {
      var isBundle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var _ref4 = productOptionsData || {},
          _ref4$requiredOptions = _ref4.requiredOptions,
          requiredOptions = _ref4$requiredOptions === void 0 ? {} : _ref4$requiredOptions;

      if (requiredOptions.length) {
        var productOptions = productOptionsData.productOptions,
            productOptionsMulti = productOptionsData.productOptionsMulti,
            _requiredOptions = productOptionsData.requiredOptions;
        return this.validateProductOptions([].concat(_toConsumableArray(productOptions || []), _toConsumableArray(productOptionsMulti || [])), _requiredOptions, isBundle);
      }

      return true;
    }
  }, {
    key: "validateProductOptions",
    value: function validateProductOptions(items, requiredOptions) {
      var isBundle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      // Make sure EVERY required option is FOUND in selected items
      return requiredOptions.every(function (requiredOption) {
        return items.find(function (item) {
          var id = item.id,
              option_id = item.option_id;
          var matchWith = isBundle ? id : option_id;
          return requiredOption === matchWith;
        });
      });
    }
  }, {
    key: "validateAddToCart",
    value: function validateAddToCart() {
      var type_id = this.props.product.type_id;
      var validationRule = this.validationMap[type_id];

      if (validationRule) {
        return validationRule();
      }

      return this.validateSimpleProduct();
    }
  }, {
    key: "addGroupedProductToCart",
    value: function addGroupedProductToCart() {
      var _this2 = this;

      var _this$props5 = this.props,
          product = _this$props5.product,
          items = _this$props5.product.items,
          groupedProductQuantity = _this$props5.groupedProductQuantity,
          addProduct = _this$props5.addProduct;
      Promise.all(items.map(function (item) {
        var groupedProductItem = item.product;

        var newProduct = _objectSpread2(_objectSpread2({}, groupedProductItem), {}, {
          parent: product
        });

        var quantity = groupedProductQuantity[groupedProductItem.id];

        if (!quantity) {
          return Promise.resolve();
        }

        return addProduct({
          product: newProduct,
          quantity: quantity
        });
      })).then(
      /** @namespace Component/AddToCart/Container/addGroupedProductToCartPromiseAllThen */
      middleware(function () {
        return _this2.afterAddToCart();
      }, "Component/AddToCart/Container/addGroupedProductToCartPromiseAllThen"),
      /** @namespace Component/AddToCart/Container/addGroupedProductToCartPromiseAllCatch */
      middleware(function () {
        return _this2.resetLoading();
      }, "Component/AddToCart/Container/addGroupedProductToCartPromiseAllCatch"));
    }
  }, {
    key: "addConfigurableProductToCart",
    value: function addConfigurableProductToCart() {
      var _this3 = this;

      var _this$props6 = this.props,
          product = _this$props6.product,
          quantity = _this$props6.quantity,
          addProduct = _this$props6.addProduct,
          configurableVariantIndex = _this$props6.configurableVariantIndex,
          productOptionsData = _this$props6.productOptionsData;
      addProduct({
        product: _objectSpread2(_objectSpread2({}, product), {}, {
          configurableVariantIndex: configurableVariantIndex
        }),
        quantity: quantity,
        productOptionsData: productOptionsData
      }).then(
      /** @namespace Component/AddToCart/Container/addConfigurableProductToCartAddProductThen */
      middleware(function () {
        return _this3.afterAddToCart();
      }, "Component/AddToCart/Container/addConfigurableProductToCartAddProductThen"),
      /** @namespace Component/AddToCart/Container/addConfigurableProductToCartAddProductCatch */
      middleware(function () {
        return _this3.resetLoading();
      }, "Component/AddToCart/Container/addConfigurableProductToCartAddProductCatch"));
    }
  }, {
    key: "addSimpleProductToCart",
    value: function addSimpleProductToCart() {
      var _this4 = this;

      var _this$props7 = this.props,
          product = _this$props7.product,
          quantity = _this$props7.quantity,
          addProduct = _this$props7.addProduct,
          productOptionsData = _this$props7.productOptionsData;
      addProduct({
        product: product,
        quantity: quantity,
        productOptionsData: productOptionsData
      }).then(
      /** @namespace Component/AddToCart/Container/addSimpleProductToCartAddProductThen */
      middleware(function () {
        return _this4.afterAddToCart();
      }, "Component/AddToCart/Container/addSimpleProductToCartAddProductThen"),
      /** @namespace Component/AddToCart/Container/addSimpleProductToCartAddProductCatch */
      middleware(function () {
        return _this4.resetLoading();
      }, "Component/AddToCart/Container/addSimpleProductToCartAddProductCatch"));
    }
  }, {
    key: "addProductToCart",
    value: function addProductToCart() {
      var type_id = this.props.product.type_id;
      var addToCartHandler = this.addToCartHandlerMap[type_id];

      if (addToCartHandler) {
        addToCartHandler();
        return;
      }

      this.addSimpleProductToCart();
    }
  }, {
    key: "buttonClick",
    value: function buttonClick() {
      var _this5 = this;

      var _this$props8 = this.props,
          type_id = _this$props8.product.type_id,
          onProductValidationError = _this$props8.onProductValidationError;

      if (!this.validateAddToCart()) {
        onProductValidationError(type_id);
        return;
      }

      this.setState({
        isLoading: true
      }, function () {
        return _this5.addProductToCart();
      });
    }
  }, {
    key: "resetLoading",
    value: function resetLoading() {
      this.setState({
        isLoading: false
      });
    }
  }, {
    key: "removeProductFromWishlist",
    value: function removeProductFromWishlist() {
      var _this$props9 = this.props,
          wishlistItems = _this$props9.wishlistItems,
          removeFromWishlist = _this$props9.removeFromWishlist,
          configurableVariantIndex = _this$props9.configurableVariantIndex,
          _this$props9$product = _this$props9.product;
      _this$props9$product = _this$props9$product === void 0 ? {} : _this$props9$product;
      var type_id = _this$props9$product.type_id,
          _this$props9$product$ = _this$props9$product.variants,
          variants = _this$props9$product$ === void 0 ? {} : _this$props9$product$;

      if (type_id !== 'configurable') {
        return;
      }

      var sku = variants[configurableVariantIndex].sku;
      var wishlistItemKey = Object.keys(wishlistItems).find(function (key) {
        var wSku = wishlistItems[key].wishlist.sku;
        return wSku === sku;
      });

      if (!Object(_util_Auth__WEBPACK_IMPORTED_MODULE_5__["isSignedIn"])() || wishlistItemKey === undefined) {
        return;
      }

      var item_id = wishlistItems[wishlistItemKey].wishlist.id;
      removeFromWishlist({
        item_id: item_id,
        sku: sku,
        noMessage: true
      });
    }
  }, {
    key: "afterAddToCart",
    value: function afterAddToCart() {
      var _this$props10 = this.props,
          showNotification = _this$props10.showNotification,
          setQuantityToDefault = _this$props10.setQuantityToDefault;
      showNotification('success', __('Product added to cart!'));
      setQuantityToDefault();
      this.removeProductFromWishlist();
      this.setState({
        isLoading: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _AddToCart_component__WEBPACK_IMPORTED_MODULE_7__["default"], _extends({}, this.props, this.state, this.containerFunctions))
      );
    }
  }]);

  return _AddToCartContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_AddToCartContainer, 'name', {
  value: 'AddToCartContainer'
});

var AddToCartContainer = middleware(_AddToCartContainer, "Component/AddToCart/Container");

_defineProperty(AddToCartContainer, "propTypes", {
  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  product: _type_ProductList__WEBPACK_IMPORTED_MODULE_4__["ProductType"].isRequired,
  quantity: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  configurableVariantIndex: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  groupedProductQuantity: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number).isRequired,
  showNotification: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  setQuantityToDefault: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  addProduct: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  removeFromWishlist: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  wishlistItems: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.objectOf(_type_ProductList__WEBPACK_IMPORTED_MODULE_4__["ProductType"]).isRequired,
  onProductValidationError: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  productOptionsData: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object.isRequired
});

_defineProperty(AddToCartContainer, "defaultProps", {
  quantity: 1,
  configurableVariantIndex: 0,
  setQuantityToDefault: function setQuantityToDefault() {},
  onProductValidationError: function onProductValidationError() {},
  isLoading: false
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(AddToCartContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/AddToCart/AddToCart.style.scss":
/*!**********************************************************!*\
  !*** ./src/app/component/AddToCart/AddToCart.style.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340256
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/AddToCart/index.js":
/*!**********************************************!*\
  !*** ./src/app/component/AddToCart/index.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AddToCart_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddToCart.container */ "./src/app/component/AddToCart/AddToCart.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _AddToCart_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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


/***/ })

}]);
//# sourceMappingURL=misc~product.js.map