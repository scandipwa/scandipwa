(this["webpackJsonp"] = this["webpackJsonp"] || []).push([["cart"],{

/***/ "./src/app/component/CartOverlay/CartOverlay.component.js":
/*!****************************************************************!*\
  !*** ./src/app/component/CartOverlay/CartOverlay.component.js ***!
  \****************************************************************/
/*! exports provided: _CartOverlay, CartOverlay, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_CartOverlay", function() { return _CartOverlay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartOverlay", function() { return CartOverlay; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CartItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CartItem */ "./src/app/component/CartItem/index.js");
/* harmony import */ var _CmsBlock__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../CmsBlock */ "./src/app/component/CmsBlock/index.js");
/* harmony import */ var _Header_Header_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Header/Header.config */ "./src/app/component/Header/Header.config.js");
/* harmony import */ var _Link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Link */ "./src/app/component/Link/index.js");
/* harmony import */ var _Overlay__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Overlay */ "./src/app/component/Overlay/index.js");
/* harmony import */ var _PopupSuspense_PopupSuspense_config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../PopupSuspense/PopupSuspense.config */ "./src/app/component/PopupSuspense/PopupSuspense.config.js");
/* harmony import */ var _type_Device__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../type/Device */ "./src/app/type/Device.js");
/* harmony import */ var _type_MiniCart__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../type/MiniCart */ "./src/app/type/MiniCart.js");
/* harmony import */ var _util_Price__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../util/Price */ "./src/app/util/Price/index.js");
/* harmony import */ var _CartOverlay_style__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./CartOverlay.style */ "./src/app/component/CartOverlay/CartOverlay.style.scss");
/* harmony import */ var _CartOverlay_style__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_CartOverlay_style__WEBPACK_IMPORTED_MODULE_11__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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












/** @namespace Component/CartOverlay/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _CartOverlay =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_CartOverlay, _Extensible);

  function _CartOverlay() {
    _classCallCheck(this, _CartOverlay);

    return _possibleConstructorReturn(this, _getPrototypeOf(_CartOverlay).apply(this, arguments));
  }

  _createClass(_CartOverlay, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          showOverlay = _this$props.showOverlay,
          device = _this$props.device,
          activeOverlay = _this$props.activeOverlay;

      if (!device.isMobile && activeOverlay === _PopupSuspense_PopupSuspense_config__WEBPACK_IMPORTED_MODULE_7__["OVERLAY_PLACEHOLDER"]) {
        showOverlay(_Header_Header_config__WEBPACK_IMPORTED_MODULE_4__["CART_OVERLAY"]);
      }
    }
  }, {
    key: "renderPriceLine",
    value: function renderPriceLine(price) {
      var currencyCode = this.props.currencyCode;
      return Object(_util_Price__WEBPACK_IMPORTED_MODULE_10__["formatPrice"])(price, currencyCode);
    }
  }, {
    key: "renderCartItems",
    value: function renderCartItems() {
      var _this$props$totals = this.props.totals,
          items = _this$props$totals.items,
          quote_currency_code = _this$props$totals.quote_currency_code;

      if (!items || items.length < 1) {
        return this.renderNoCartItems();
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "ul", {
          block: "CartOverlay",
          elem: "Items",
          "aria-label": "List of items in cart"
        }, items.map(function (item) {
          return (
            /*#__PURE__*/
            _checkBEM(React, _CartItem__WEBPACK_IMPORTED_MODULE_2__["default"], {
              key: item.item_id,
              item: item,
              currency_code: quote_currency_code,
              isEditing: true
            })
          );
        }))
      );
    }
  }, {
    key: "renderNoCartItems",
    value: function renderNoCartItems() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "p", {
          block: "CartOverlay",
          elem: "Empty"
        }, __('You have no items in your shopping cart.'))
      );
    }
  }, {
    key: "renderTotals",
    value: function renderTotals() {
      var _this$props$totals$su = this.props.totals.subtotal_incl_tax,
          subtotal_incl_tax = _this$props$totals$su === void 0 ? 0 : _this$props$totals$su;
      return (
        /*#__PURE__*/
        _checkBEM(React, "dl", {
          block: "CartOverlay",
          elem: "Total"
        },
        /*#__PURE__*/
        _checkBEM(React, "dt", null, __('Order total:')),
        /*#__PURE__*/
        _checkBEM(React, "dd", null, this.renderPriceLine(subtotal_incl_tax)))
      );
    }
  }, {
    key: "renderTax",
    value: function renderTax() {
      var _this$props$totals$ta = this.props.totals.tax_amount,
          tax_amount = _this$props$totals$ta === void 0 ? 0 : _this$props$totals$ta;
      return (
        /*#__PURE__*/
        _checkBEM(React, "dl", {
          block: "CartOverlay",
          elem: "Tax"
        },
        /*#__PURE__*/
        _checkBEM(React, "dt", null, __('Tax total:')),
        /*#__PURE__*/
        _checkBEM(React, "dd", null, this.renderPriceLine(tax_amount || 0)))
      );
    }
  }, {
    key: "renderDiscount",
    value: function renderDiscount() {
      var _this$props$totals2 = this.props.totals,
          applied_rule_ids = _this$props$totals2.applied_rule_ids,
          discount_amount = _this$props$totals2.discount_amount,
          coupon_code = _this$props$totals2.coupon_code;

      if (!applied_rule_ids) {
        return null;
      }

      if (!coupon_code) {
        return (
          /*#__PURE__*/
          _checkBEM(React, "dl", {
            block: "CartOverlay",
            elem: "Discount"
          },
          /*#__PURE__*/
          _checkBEM(React, "dt", null, __('Discount: ')),
          /*#__PURE__*/
          _checkBEM(React, "dd", null, "-".concat(this.renderPriceLine(Math.abs(discount_amount)))))
        );
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "dl", {
          block: "CartOverlay",
          elem: "Discount"
        },
        /*#__PURE__*/
        _checkBEM(React, "dt", null, __('Discount/Coupon '),
        /*#__PURE__*/
        _checkBEM(React, "strong", {
          block: "CartOverlay",
          elem: "DiscountCoupon"
        }, coupon_code.toUpperCase())),
        /*#__PURE__*/
        _checkBEM(React, "dd", null, "-".concat(this.renderPriceLine(Math.abs(discount_amount)))))
      );
    }
  }, {
    key: "renderSecureCheckoutButton",
    value: function renderSecureCheckoutButton() {
      var _this$props2 = this.props,
          handleCheckoutClick = _this$props2.handleCheckoutClick,
          hasOutOfStockProductsInCart = _this$props2.hasOutOfStockProductsInCart;
      var options = hasOutOfStockProductsInCart ? {
        onClick: function onClick(e) {
          return e.preventDefault();
        },
        disabled: true
      } : {};
      return (
        /*#__PURE__*/
        _checkBEM(React, "button", _extends({
          block: "CartOverlay",
          elem: "CheckoutButton",
          mix: {
            block: 'Button'
          },
          onClick: handleCheckoutClick
        }, options),
        /*#__PURE__*/
        _checkBEM(React, "span", null), __('Secure checkout'))
      );
    }
  }, {
    key: "renderActions",
    value: function renderActions() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "CartOverlay",
          elem: "Actions"
        },
        /*#__PURE__*/
        _checkBEM(React, _Link__WEBPACK_IMPORTED_MODULE_5__["default"], {
          block: "CartOverlay",
          elem: "CartButton",
          mix: {
            block: 'Button',
            mods: {
              isHollow: true
            }
          },
          to: "/cart"
        }, __('View cart')), this.renderSecureCheckoutButton())
      );
    }
  }, {
    key: "renderCartAdditional",
    value: function renderCartAdditional() {
      var items = this.props.totals.items;

      if (!items || items.length < 1) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "CartOverlay",
          elem: "Additional"
        }, this.renderDiscount(), this.renderTax(), this.renderTotals(), this.renderOutOfStockProductsWarning(), this.renderActions())
      );
    }
  }, {
    key: "renderPromo",
    value: function renderPromo() {
      var _window$contentConfig = window.contentConfiguration.minicart_content;
      _window$contentConfig = _window$contentConfig === void 0 ? {} : _window$contentConfig;
      var minicart_cms = _window$contentConfig.minicart_cms;

      if (minicart_cms) {
        return (
          /*#__PURE__*/
          _checkBEM(React, _CmsBlock__WEBPACK_IMPORTED_MODULE_3__["default"], {
            identifier: minicart_cms
          })
        );
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "p", {
          block: "CartOverlay",
          elem: "Promo"
        }, __('Free shipping on order 49$ and more.'))
      );
    }
  }, {
    key: "renderOutOfStockProductsWarning",
    value: function renderOutOfStockProductsWarning() {
      var hasOutOfStockProductsInCart = this.props.hasOutOfStockProductsInCart;

      if (!hasOutOfStockProductsInCart) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "CartOverlay",
          elem: "OutOfStockProductsWarning"
        }, __('Remove out of stock products from cart'))
      );
    }
  }, {
    key: "render",
    value: function render() {
      var changeHeaderState = this.props.changeHeaderState;
      return (
        /*#__PURE__*/
        _checkBEM(React, _Overlay__WEBPACK_IMPORTED_MODULE_6__["default"], {
          id: _Header_Header_config__WEBPACK_IMPORTED_MODULE_4__["CART_OVERLAY"],
          onVisible: changeHeaderState,
          mix: {
            block: 'CartOverlay'
          }
        }, this.renderPromo(), this.renderCartItems(), this.renderCartAdditional())
      );
    }
  }]);

  return _CartOverlay;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_CartOverlay, 'name', {
  value: 'CartOverlay'
});

var CartOverlay = middleware(_CartOverlay, "Component/CartOverlay/Component");

_defineProperty(CartOverlay, "propTypes", {
  totals: _type_MiniCart__WEBPACK_IMPORTED_MODULE_9__["TotalsType"].isRequired,
  device: _type_Device__WEBPACK_IMPORTED_MODULE_8__["DeviceType"].isRequired,
  changeHeaderState: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  isEditing: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  handleCheckoutClick: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  currencyCode: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  showOverlay: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  activeOverlay: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  hasOutOfStockProductsInCart: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool
});

_defineProperty(CartOverlay, "defaultProps", {
  hasOutOfStockProductsInCart: false
});

/* harmony default export */ __webpack_exports__["default"] = (CartOverlay);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/CartOverlay/CartOverlay.container.js":
/*!****************************************************************!*\
  !*** ./src/app/component/CartOverlay/CartOverlay.container.js ***!
  \****************************************************************/
/*! exports provided: CartDispatcher, mapStateToProps, mapDispatchToProps, _CartOverlayContainer, CartOverlayContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, __, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartDispatcher", function() { return CartDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_CartOverlayContainer", function() { return _CartOverlayContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartOverlayContainer", function() { return CartOverlayContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _Header_Header_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Header/Header.config */ "./src/app/component/Header/Header.config.js");
/* harmony import */ var _MyAccountOverlay_MyAccountOverlay_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../MyAccountOverlay/MyAccountOverlay.config */ "./src/app/component/MyAccountOverlay/MyAccountOverlay.config.js");
/* harmony import */ var _route_Checkout_Checkout_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../route/Checkout/Checkout.config */ "./src/app/route/Checkout/Checkout.config.js");
/* harmony import */ var _store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../store/Navigation/Navigation.action */ "./src/app/store/Navigation/Navigation.action.js");
/* harmony import */ var _store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../store/Navigation/Navigation.reducer */ "./src/app/store/Navigation/Navigation.reducer.js");
/* harmony import */ var _store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../store/Notification/Notification.action */ "./src/app/store/Notification/Notification.action.js");
/* harmony import */ var _store_Overlay_Overlay_action__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../store/Overlay/Overlay.action */ "./src/app/store/Overlay/Overlay.action.js");
/* harmony import */ var _type_MiniCart__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../type/MiniCart */ "./src/app/type/MiniCart.js");
/* harmony import */ var _util_Auth__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../util/Auth */ "./src/app/util/Auth/index.js");
/* harmony import */ var _util_Cart__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../util/Cart */ "./src/app/util/Cart/index.js");
/* harmony import */ var _util_History__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../util/History */ "./src/app/util/History/index.js");
/* harmony import */ var _util_Url__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../util/Url */ "./src/app/util/Url/index.js");
/* harmony import */ var _CartOverlay_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./CartOverlay.component */ "./src/app/component/CartOverlay/CartOverlay.component.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
/** @namespace Component/CartOverlay/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    totals: state.CartReducer.cartTotals,
    device: state.ConfigReducer.device,
    guest_checkout: state.ConfigReducer.guest_checkout,
    currencyCode: state.CartReducer.cartTotals.quote_currency_code,
    activeOverlay: state.OverlayReducer.activeOverlay
  };
}, "Component/CartOverlay/Container/mapStateToProps");
/** @namespace Component/CartOverlay/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    setNavigationState: function setNavigationState(stateName) {
      return dispatch(Object(_store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_6__["changeNavigationState"])(_store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_7__["TOP_NAVIGATION_TYPE"], stateName));
    },
    changeHeaderState: function changeHeaderState(state) {
      return dispatch(Object(_store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_6__["changeNavigationState"])(_store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_7__["TOP_NAVIGATION_TYPE"], state));
    },
    updateTotals: function updateTotals(options) {
      return CartDispatcher.then(function (_ref) {
        var dispatcher = _ref.default;
        return dispatcher.updateTotals(dispatch, options);
      });
    },
    showOverlay: function showOverlay(overlayKey) {
      return dispatch(Object(_store_Overlay_Overlay_action__WEBPACK_IMPORTED_MODULE_9__["toggleOverlayByKey"])(overlayKey));
    },
    showNotification: function showNotification(type, message) {
      return dispatch(Object(_store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_8__["showNotification"])(type, message));
    },
    hideActiveOverlay: function hideActiveOverlay() {
      return dispatch(Object(_store_Overlay_Overlay_action__WEBPACK_IMPORTED_MODULE_9__["hideActiveOverlay"])());
    }
  };
}, "Component/CartOverlay/Container/mapDispatchToProps");
/** @namespace Component/CartOverlay/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _CartOverlayContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_CartOverlayContainer, _Extensible);

  function _CartOverlayContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _CartOverlayContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_CartOverlayContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isEditing: false
    });

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      changeHeaderState: _this.changeHeaderState.bind(_assertThisInitialized(_this)),
      handleCheckoutClick: _this.handleCheckoutClick.bind(_assertThisInitialized(_this))
    });

    _defineProperty(_assertThisInitialized(_this), "containerProps", function () {
      var totals = _this.props.totals;
      return {
        hasOutOfStockProductsInCart: Object(_util_Cart__WEBPACK_IMPORTED_MODULE_12__["hasOutOfStockProductsInCartItems"])(totals.items)
      };
    });

    return _this;
  }

  _createClass(_CartOverlayContainer, [{
    key: "handleCheckoutClick",
    value: function handleCheckoutClick(e) {
      var _this$props = this.props,
          guest_checkout = _this$props.guest_checkout,
          showOverlay = _this$props.showOverlay,
          showNotification = _this$props.showNotification,
          setNavigationState = _this$props.setNavigationState,
          hideActiveOverlay = _this$props.hideActiveOverlay,
          totals = _this$props.totals; // to prevent outside-click handler trigger

      e.nativeEvent.stopImmediatePropagation();
      var hasOutOfStockProductsInCart = Object(_util_Cart__WEBPACK_IMPORTED_MODULE_12__["hasOutOfStockProductsInCartItems"])(totals.items);

      if (hasOutOfStockProductsInCart) {
        showNotification('error', 'Cannot proceed to checkout. Remove out of stock products first.');
        return;
      } // Guest checkout enabled or user is signed in => proceed to the checkout


      if (guest_checkout || Object(_util_Auth__WEBPACK_IMPORTED_MODULE_11__["isSignedIn"])()) {
        hideActiveOverlay();
        _util_History__WEBPACK_IMPORTED_MODULE_13__["default"].push({
          pathname: Object(_util_Url__WEBPACK_IMPORTED_MODULE_14__["appendWithStoreCode"])(_route_Checkout_Checkout_config__WEBPACK_IMPORTED_MODULE_5__["CHECKOUT_URL"])
        });
        return;
      } // there is no mobile, as cart overlay is not visible here


      showOverlay(_MyAccountOverlay_MyAccountOverlay_config__WEBPACK_IMPORTED_MODULE_4__["CUSTOMER_ACCOUNT_OVERLAY_KEY"]);
      showNotification('info', __('Please sign-in to complete checkout!'));
      setNavigationState({
        name: _MyAccountOverlay_MyAccountOverlay_config__WEBPACK_IMPORTED_MODULE_4__["CUSTOMER_ACCOUNT_OVERLAY_KEY"],
        title: 'Sign in'
      });
    }
  }, {
    key: "changeHeaderState",
    value: function changeHeaderState() {
      var _this2 = this;

      var _this$props2 = this.props,
          changeHeaderState = _this$props2.changeHeaderState,
          _this$props2$totals$c = _this$props2.totals.count,
          count = _this$props2$totals$c === void 0 ? 0 : _this$props2$totals$c;

      var title = __('%s Items', count || 0);

      changeHeaderState({
        name: _Header_Header_config__WEBPACK_IMPORTED_MODULE_3__["CART_OVERLAY"],
        title: title,
        onEditClick: function onEditClick() {
          _this2.setState({
            isEditing: true
          });

          changeHeaderState({
            name: _Header_Header_config__WEBPACK_IMPORTED_MODULE_3__["CART_EDITING"],
            title: title,
            onOkClick: function onOkClick() {
              return _this2.setState({
                isEditing: false
              });
            },
            onCancelClick: function onCancelClick() {
              return _this2.setState({
                isEditing: false
              });
            }
          });
        },
        onCloseClick: function onCloseClick() {
          return _this2.setState({
            isEditing: false
          });
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _CartOverlay_component__WEBPACK_IMPORTED_MODULE_15__["default"], _extends({}, this.props, this.state, this.containerFunctions, this.containerProps()))
      );
    }
  }]);

  return _CartOverlayContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_CartOverlayContainer, 'name', {
  value: 'CartOverlayContainer'
});

var CartOverlayContainer = middleware(_CartOverlayContainer, "Component/CartOverlay/Container");

_defineProperty(CartOverlayContainer, "propTypes", {
  totals: _type_MiniCart__WEBPACK_IMPORTED_MODULE_10__["TotalsType"].isRequired,
  guest_checkout: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  changeHeaderState: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  showOverlay: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  showNotification: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  setNavigationState: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  hideActiveOverlay: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

_defineProperty(CartOverlayContainer, "defaultProps", {
  guest_checkout: true
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(CartOverlayContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/CartOverlay/index.js":
/*!************************************************!*\
  !*** ./src/app/component/CartOverlay/index.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CartOverlay_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CartOverlay.container */ "./src/app/component/CartOverlay/CartOverlay.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _CartOverlay_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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


/***/ }),

/***/ "./src/app/route/CartPage/CartPage.component.js":
/*!******************************************************!*\
  !*** ./src/app/route/CartPage/CartPage.component.js ***!
  \******************************************************/
/*! exports provided: _CartPage, CartPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_CartPage", function() { return _CartPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartPage", function() { return CartPage; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _component_CartCoupon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../component/CartCoupon */ "./src/app/component/CartCoupon/index.js");
/* harmony import */ var _component_CartItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../component/CartItem */ "./src/app/component/CartItem/index.js");
/* harmony import */ var _component_CmsBlock__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../component/CmsBlock */ "./src/app/component/CmsBlock/index.js");
/* harmony import */ var _component_ContentWrapper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../component/ContentWrapper */ "./src/app/component/ContentWrapper/index.js");
/* harmony import */ var _component_ExpandableContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../component/ExpandableContent */ "./src/app/component/ExpandableContent/index.js");
/* harmony import */ var _component_Link__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../component/Link */ "./src/app/component/Link/index.js");
/* harmony import */ var _component_ProductLinks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../component/ProductLinks */ "./src/app/component/ProductLinks/index.js");
/* harmony import */ var _store_LinkedProducts_LinkedProducts_reducer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../store/LinkedProducts/LinkedProducts.reducer */ "./src/app/store/LinkedProducts/LinkedProducts.reducer.js");
/* harmony import */ var _type_MiniCart__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../type/MiniCart */ "./src/app/type/MiniCart.js");
/* harmony import */ var _util_Price__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../util/Price */ "./src/app/util/Price/index.js");
/* harmony import */ var _CartPage_style__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./CartPage.style */ "./src/app/route/CartPage/CartPage.style.scss");
/* harmony import */ var _CartPage_style__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_CartPage_style__WEBPACK_IMPORTED_MODULE_12__);
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













/** @namespace Route/CartPage/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _CartPage =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_CartPage, _Extensible);

  function _CartPage() {
    _classCallCheck(this, _CartPage);

    return _possibleConstructorReturn(this, _getPrototypeOf(_CartPage).apply(this, arguments));
  }

  _createClass(_CartPage, [{
    key: "renderCartItems",
    value: function renderCartItems() {
      var _this$props$totals = this.props.totals,
          items = _this$props$totals.items,
          quote_currency_code = _this$props$totals.quote_currency_code;

      if (!items || items.length < 1) {
        return (
          /*#__PURE__*/
          _checkBEM(React, "p", {
            block: "CartPage",
            elem: "Empty"
          }, __('There are no products in cart.'))
        );
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null,
        /*#__PURE__*/
        _checkBEM(React, "p", {
          block: "CartPage",
          elem: "TableHead",
          "aria-hidden": true
        },
        /*#__PURE__*/
        _checkBEM(React, "span", null, __('item')),
        /*#__PURE__*/
        _checkBEM(React, "span", null, __('qty')),
        /*#__PURE__*/
        _checkBEM(React, "span", null, __('subtotal'))),
        /*#__PURE__*/
        _checkBEM(React, "ul", {
          block: "CartPage",
          elem: "Items",
          "aria-label": "List of items in cart"
        }, items.map(function (item) {
          return (
            /*#__PURE__*/
            _checkBEM(React, _component_CartItem__WEBPACK_IMPORTED_MODULE_3__["default"], {
              key: item.item_id,
              item: item,
              currency_code: quote_currency_code,
              isEditing: true,
              isLikeTable: true
            })
          );
        })))
      );
    }
  }, {
    key: "renderDiscountCode",
    value: function renderDiscountCode() {
      var coupon_code = this.props.totals.coupon_code;
      return (
        /*#__PURE__*/
        _checkBEM(React, _component_ExpandableContent__WEBPACK_IMPORTED_MODULE_6__["default"], {
          heading: __('Have a discount code?'),
          mix: {
            block: 'CartPage',
            elem: 'Discount'
          }
        },
        /*#__PURE__*/
        _checkBEM(React, _component_CartCoupon__WEBPACK_IMPORTED_MODULE_2__["default"], {
          couponCode: coupon_code
        }))
      );
    }
  }, {
    key: "renderPriceLine",
    value: function renderPriceLine(price) {
      var quote_currency_code = this.props.totals.quote_currency_code;
      return Object(_util_Price__WEBPACK_IMPORTED_MODULE_11__["formatPrice"])(price, quote_currency_code);
    }
  }, {
    key: "renderSubTotal",
    value: function renderSubTotal() {
      var _this$props$cartSubTo = this.props.cartSubTotal,
          cartSubTotal = _this$props$cartSubTo === void 0 ? 0 : _this$props$cartSubTo;
      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null,
        /*#__PURE__*/
        _checkBEM(React, "dt", null, __('Subtotal:')),
        /*#__PURE__*/
        _checkBEM(React, "dd", null, this.renderPriceLine(cartSubTotal), this.renderSubTotalExlTax()))
      );
    }
  }, {
    key: "renderSubTotalExlTax",
    value: function renderSubTotalExlTax() {
      var cartSubTotalExlTax = this.props.cartSubTotalExlTax;

      if (!cartSubTotalExlTax) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "span", null, "".concat(__('Excl. tax:'), " ").concat(this.renderPriceLine(cartSubTotalExlTax)))
      );
    }
  }, {
    key: "renderTaxFullSummary",
    value: function renderTaxFullSummary() {
      var _this$props$totals2 = this.props.totals,
          _this$props$totals2$c = _this$props$totals2.cart_display_config;
      _this$props$totals2$c = _this$props$totals2$c === void 0 ? {} : _this$props$totals2$c;
      var display_full_tax_summary = _this$props$totals2$c.display_full_tax_summary,
          applied_taxes = _this$props$totals2.applied_taxes;

      if (!display_full_tax_summary || !applied_taxes.length) {
        return null;
      }

      return applied_taxes.flatMap(function (_ref) {
        var rates = _ref.rates;
        return rates;
      }).map(function (_ref2) {
        var percent = _ref2.percent,
            title = _ref2.title;
        return (
          /*#__PURE__*/
          _checkBEM(React, "div", {
            block: "CartPage",
            elem: "TaxRate"
          }, "".concat(title, " (").concat(percent, "%)"))
        );
      });
    }
  }, {
    key: "renderTax",
    value: function renderTax() {
      var _this$props$totals3 = this.props.totals,
          _this$props$totals3$t = _this$props$totals3.tax_amount,
          tax_amount = _this$props$totals3$t === void 0 ? 0 : _this$props$totals3$t,
          _this$props$totals3$c = _this$props$totals3.cart_display_config;
      _this$props$totals3$c = _this$props$totals3$c === void 0 ? {} : _this$props$totals3$c;
      var display_zero_tax_subtotal = _this$props$totals3$c.display_zero_tax_subtotal;

      if (!tax_amount && !display_zero_tax_subtotal) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null,
        /*#__PURE__*/
        _checkBEM(React, "dt", null, __('Tax:'), this.renderTaxFullSummary()),
        /*#__PURE__*/
        _checkBEM(React, "dd", null, this.renderPriceLine(tax_amount)))
      );
    }
  }, {
    key: "renderTotalDetails",
    value: function renderTotalDetails() {
      var isMobile = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return (
        /*#__PURE__*/
        _checkBEM(React, "dl", {
          block: "CartPage",
          elem: "TotalDetails",
          "aria-label": __('Order total details'),
          mods: {
            isMobile: isMobile
          }
        }, this.renderSubTotal(), this.renderDiscount(), this.renderTax())
      );
    }
  }, {
    key: "renderOrderTotalExlTax",
    value: function renderOrderTotalExlTax() {
      var cartOrderTotalExlTax = this.props.cartOrderTotalExlTax;

      if (!cartOrderTotalExlTax) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "span", null, "".concat(__('Excl. tax:'), " ").concat(this.renderPriceLine(cartOrderTotalExlTax)))
      );
    }
  }, {
    key: "renderTotal",
    value: function renderTotal() {
      var _this$props$totals4 = this.props.totals,
          _this$props$totals4$s = _this$props$totals4.subtotal_with_discount,
          subtotal_with_discount = _this$props$totals4$s === void 0 ? 0 : _this$props$totals4$s,
          _this$props$totals4$t = _this$props$totals4.tax_amount,
          tax_amount = _this$props$totals4$t === void 0 ? 0 : _this$props$totals4$t;
      return (
        /*#__PURE__*/
        _checkBEM(React, "dl", {
          block: "CartPage",
          elem: "Total",
          "aria-label": "Complete order total"
        },
        /*#__PURE__*/
        _checkBEM(React, "dt", null, __('Order total:')),
        /*#__PURE__*/
        _checkBEM(React, "dd", null, this.renderPriceLine(subtotal_with_discount + tax_amount), this.renderOrderTotalExlTax()))
      );
    }
  }, {
    key: "renderSecureCheckoutButton",
    value: function renderSecureCheckoutButton() {
      var _this$props = this.props,
          onCheckoutButtonClick = _this$props.onCheckoutButtonClick,
          hasOutOfStockProductsInCart = _this$props.hasOutOfStockProductsInCart;

      if (hasOutOfStockProductsInCart) {
        return (
          /*#__PURE__*/
          _checkBEM(React, "div", {
            block: "CartPage",
            elem: "OutOfStockProductsWarning"
          }, __('Remove out of stock products from cart'))
        );
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "button", {
          block: "CartPage",
          elem: "CheckoutButton",
          mix: {
            block: 'Button'
          },
          onClick: onCheckoutButtonClick
        },
        /*#__PURE__*/
        _checkBEM(React, "span", null), __('Secure checkout'))
      );
    }
  }, {
    key: "renderButtons",
    value: function renderButtons() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "CartPage",
          elem: "CheckoutButtons"
        }, this.renderSecureCheckoutButton(),
        /*#__PURE__*/
        _checkBEM(React, _component_Link__WEBPACK_IMPORTED_MODULE_7__["default"], {
          block: "CartPage",
          elem: "ContinueShopping",
          to: "/"
        }, __('Continue shopping')))
      );
    }
  }, {
    key: "renderTotals",
    value: function renderTotals() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "article", {
          block: "CartPage",
          elem: "Summary",
          mix: {
            block: 'FixedElement',
            elem: 'Bottom'
          }
        },
        /*#__PURE__*/
        _checkBEM(React, "h4", {
          block: "CartPage",
          elem: "SummaryHeading"
        }, __('Summary')), this.renderTotalDetails(), this.renderTotal(), this.renderButtons())
      );
    }
  }, {
    key: "renderDiscount",
    value: function renderDiscount() {
      var _this$props$totals5 = this.props.totals,
          applied_rule_ids = _this$props$totals5.applied_rule_ids,
          coupon_code = _this$props$totals5.coupon_code,
          _this$props$totals5$d = _this$props$totals5.discount_amount,
          discount_amount = _this$props$totals5$d === void 0 ? 0 : _this$props$totals5$d;

      if (!applied_rule_ids) {
        return null;
      }

      if (!coupon_code) {
        return (
          /*#__PURE__*/
          _checkBEM(React, React.Fragment, null,
          /*#__PURE__*/
          _checkBEM(React, "dt", null, __('Discount: ')),
          /*#__PURE__*/
          _checkBEM(React, "dd", null, "-".concat(this.renderPriceLine(Math.abs(discount_amount)))))
        );
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null,
        /*#__PURE__*/
        _checkBEM(React, "dt", null, __('Discount/Coupon '),
        /*#__PURE__*/
        _checkBEM(React, "strong", {
          block: "CartPage",
          elem: "DiscountCoupon"
        }, coupon_code.toUpperCase())),
        /*#__PURE__*/
        _checkBEM(React, "dd", null, "-".concat(this.renderPriceLine(Math.abs(discount_amount)))))
      );
    }
  }, {
    key: "renderCrossSellProducts",
    value: function renderCrossSellProducts() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _component_ProductLinks__WEBPACK_IMPORTED_MODULE_8__["default"], {
          linkType: _store_LinkedProducts_LinkedProducts_reducer__WEBPACK_IMPORTED_MODULE_9__["CROSS_SELL"],
          title: __('Frequently bought together')
        })
      );
    }
  }, {
    key: "renderPromoContent",
    value: function renderPromoContent() {
      var _window$contentConfig = window.contentConfiguration.cart_content;
      _window$contentConfig = _window$contentConfig === void 0 ? {} : _window$contentConfig;
      var cart_cms = _window$contentConfig.cart_cms;

      if (cart_cms) {
        return (
          /*#__PURE__*/
          _checkBEM(React, _component_CmsBlock__WEBPACK_IMPORTED_MODULE_4__["default"], {
            identifier: cart_cms
          })
        );
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "figure", {
          block: "CartPage",
          elem: "PromoBlock"
        },
        /*#__PURE__*/
        _checkBEM(React, "figcaption", {
          block: "CartPage",
          elem: "PromoText"
        }, __('Free shipping on order 49$ and more.')))
      );
    }
  }, {
    key: "renderPromo",
    value: function renderPromo() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "CartPage",
          elem: "Promo"
        }, this.renderPromoContent())
      );
    }
  }, {
    key: "renderHeading",
    value: function renderHeading() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "h1", {
          block: "CartPage",
          elem: "Heading"
        }, __('Shopping cart'))
      );
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "main", {
          block: "CartPage",
          "aria-label": "Cart Page"
        },
        /*#__PURE__*/
        _checkBEM(React, _component_ContentWrapper__WEBPACK_IMPORTED_MODULE_5__["default"], {
          wrapperMix: {
            block: 'CartPage',
            elem: 'Wrapper'
          },
          label: "Cart page details"
        },
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "CartPage",
          elem: "Static"
        }, this.renderHeading(), this.renderCartItems(), this.renderTotalDetails(true), this.renderDiscountCode(), this.renderCrossSellProducts()),
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "CartPage",
          elem: "Floating"
        }, this.renderPromo(), this.renderTotals())))
      );
    }
  }]);

  return _CartPage;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_CartPage, 'name', {
  value: 'CartPage'
});

var CartPage = middleware(_CartPage, "Route/CartPage/Component");

_defineProperty(CartPage, "propTypes", {
  totals: _type_MiniCart__WEBPACK_IMPORTED_MODULE_10__["TotalsType"].isRequired,
  onCheckoutButtonClick: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  hasOutOfStockProductsInCart: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  cartSubTotal: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number.isRequired,
  cartSubTotalExlTax: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number.isRequired,
  cartOrderTotalExlTax: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number.isRequired
});

_defineProperty(CartPage, "defaultProps", {
  hasOutOfStockProductsInCart: false
});

/* harmony default export */ __webpack_exports__["default"] = (CartPage);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/route/CartPage/CartPage.container.js":
/*!******************************************************!*\
  !*** ./src/app/route/CartPage/CartPage.container.js ***!
  \******************************************************/
/*! exports provided: BreadcrumbsDispatcher, mapStateToProps, mapDispatchToProps, _CartPageContainer, CartPageContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, __, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BreadcrumbsDispatcher", function() { return BreadcrumbsDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_CartPageContainer", function() { return _CartPageContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartPageContainer", function() { return CartPageContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _component_Header_Header_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../component/Header/Header.config */ "./src/app/component/Header/Header.config.js");
/* harmony import */ var _component_MyAccountOverlay_MyAccountOverlay_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../component/MyAccountOverlay/MyAccountOverlay.config */ "./src/app/component/MyAccountOverlay/MyAccountOverlay.config.js");
/* harmony import */ var _Checkout_Checkout_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Checkout/Checkout.config */ "./src/app/route/Checkout/Checkout.config.js");
/* harmony import */ var _store_Meta_Meta_action__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../store/Meta/Meta.action */ "./src/app/store/Meta/Meta.action.js");
/* harmony import */ var _store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../store/Navigation/Navigation.action */ "./src/app/store/Navigation/Navigation.action.js");
/* harmony import */ var _store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../store/Navigation/Navigation.reducer */ "./src/app/store/Navigation/Navigation.reducer.js");
/* harmony import */ var _store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../store/Notification/Notification.action */ "./src/app/store/Notification/Notification.action.js");
/* harmony import */ var _store_Overlay_Overlay_action__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../store/Overlay/Overlay.action */ "./src/app/store/Overlay/Overlay.action.js");
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _type_Device__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../type/Device */ "./src/app/type/Device.js");
/* harmony import */ var _type_MiniCart__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../type/MiniCart */ "./src/app/type/MiniCart.js");
/* harmony import */ var _util_Auth__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../util/Auth */ "./src/app/util/Auth/index.js");
/* harmony import */ var _util_Cart__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../util/Cart */ "./src/app/util/Cart/index.js");
/* harmony import */ var _util_History__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../util/History */ "./src/app/util/History/index.js");
/* harmony import */ var _util_Url__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../util/Url */ "./src/app/util/Url/index.js");
/* harmony import */ var _CartPage_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./CartPage.component */ "./src/app/route/CartPage/CartPage.component.js");
/* harmony import */ var _CartPage_config__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./CartPage.config */ "./src/app/route/CartPage/CartPage.config.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable react/prop-types */

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




















var BreadcrumbsDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/Breadcrumbs/Breadcrumbs.dispatcher */ "./src/app/store/Breadcrumbs/Breadcrumbs.dispatcher.js"));
/** @namespace Route/CartPage/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    totals: state.CartReducer.cartTotals,
    headerState: state.NavigationReducer[_store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_8__["TOP_NAVIGATION_TYPE"]].navigationState,
    guest_checkout: state.ConfigReducer.guest_checkout,
    device: state.ConfigReducer.device
  };
}, "Route/CartPage/Container/mapStateToProps");
/** @namespace Route/CartPage/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    changeHeaderState: function changeHeaderState(state) {
      return dispatch(Object(_store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_7__["changeNavigationState"])(_store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_8__["TOP_NAVIGATION_TYPE"], state));
    },
    updateBreadcrumbs: function updateBreadcrumbs(breadcrumbs) {
      return BreadcrumbsDispatcher.then(function (_ref) {
        var dispatcher = _ref.default;
        return dispatcher.update(breadcrumbs, dispatch);
      });
    },
    showOverlay: function showOverlay(overlayKey) {
      return dispatch(Object(_store_Overlay_Overlay_action__WEBPACK_IMPORTED_MODULE_10__["toggleOverlayByKey"])(overlayKey));
    },
    showNotification: function showNotification(type, message) {
      return dispatch(Object(_store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_9__["showNotification"])(type, message));
    },
    updateMeta: function updateMeta(meta) {
      return dispatch(Object(_store_Meta_Meta_action__WEBPACK_IMPORTED_MODULE_6__["updateMeta"])(meta));
    }
  };
}, "Route/CartPage/Container/mapDispatchToProps");
/** @namespace Route/CartPage/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _CartPageContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_CartPageContainer, _Extensible);

  function _CartPageContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _CartPageContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_CartPageContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isEditing: false
    });

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      onCheckoutButtonClick: _this.onCheckoutButtonClick.bind(_assertThisInitialized(_this))
    });

    _defineProperty(_assertThisInitialized(_this), "containerProps", function () {
      var totals = _this.props.totals;
      return {
        hasOutOfStockProductsInCart: Object(_util_Cart__WEBPACK_IMPORTED_MODULE_15__["hasOutOfStockProductsInCartItems"])(totals.items),
        cartSubTotal: _this.getCartSubTotal(),
        cartSubTotalExlTax: _this.getCartSubTotalExclTax(),
        cartOrderTotalExlTax: _this.getCartOrderTotalExclTax()
      };
    });

    return _this;
  }

  _createClass(_CartPageContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var updateMeta = this.props.updateMeta;
      updateMeta({
        title: __('Cart')
      });

      this._updateBreadcrumbs();

      this._changeHeaderState();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          changeHeaderState = _this$props.changeHeaderState,
          items_qty = _this$props.totals.items_qty,
          headerState = _this$props.headerState,
          name = _this$props.headerState.name;
      var prevItemsQty = prevProps.totals.items_qty,
          prevName = prevProps.headerState.name;

      if (name !== prevName) {
        if (name === _component_Header_Header_config__WEBPACK_IMPORTED_MODULE_3__["CART"]) {
          this._changeHeaderState();
        }
      }

      if (items_qty !== prevItemsQty) {
        var title = "".concat(items_qty || '0', " Items");
        changeHeaderState(_objectSpread2(_objectSpread2({}, headerState), {}, {
          title: title
        }));
      }
    }
  }, {
    key: "getCartSubTotal",
    value: function getCartSubTotal() {
      var _this$props$totals = this.props.totals,
          _this$props$totals$ca = _this$props$totals.cart_display_config;
      _this$props$totals$ca = _this$props$totals$ca === void 0 ? {} : _this$props$totals$ca;
      var display_tax_in_subtotal = _this$props$totals$ca.display_tax_in_subtotal,
          subtotal = _this$props$totals.subtotal,
          subtotal_incl_tax = _this$props$totals.subtotal_incl_tax;

      if (display_tax_in_subtotal === _CartPage_config__WEBPACK_IMPORTED_MODULE_19__["DISPLAY_CART_TAX_IN_SUBTOTAL_EXL_TAX"]) {
        return subtotal;
      }

      return subtotal_incl_tax;
    }
  }, {
    key: "getCartSubTotalExclTax",
    value: function getCartSubTotalExclTax() {
      var _this$props$totals2 = this.props.totals,
          _this$props$totals2$c = _this$props$totals2.cart_display_config;
      _this$props$totals2$c = _this$props$totals2$c === void 0 ? {} : _this$props$totals2$c;
      var display_tax_in_subtotal = _this$props$totals2$c.display_tax_in_subtotal,
          subtotal = _this$props$totals2.subtotal;

      if (display_tax_in_subtotal === _CartPage_config__WEBPACK_IMPORTED_MODULE_19__["DISPLAY_CART_TAX_IN_SUBTOTAL_BOTH"]) {
        return subtotal;
      }

      return null;
    }
  }, {
    key: "getCartOrderTotalExclTax",
    value: function getCartOrderTotalExclTax() {
      var _this$props$totals3 = this.props.totals,
          _this$props$totals3$c = _this$props$totals3.cart_display_config;
      _this$props$totals3$c = _this$props$totals3$c === void 0 ? {} : _this$props$totals3$c;
      var include_tax_in_order_total = _this$props$totals3$c.include_tax_in_order_total,
          subtotal_with_discount = _this$props$totals3.subtotal_with_discount;

      if (include_tax_in_order_total) {
        return subtotal_with_discount;
      }

      return null;
    }
  }, {
    key: "onCheckoutButtonClick",
    value: function onCheckoutButtonClick(e) {
      var _this$props2 = this.props,
          history = _this$props2.history,
          guest_checkout = _this$props2.guest_checkout,
          showOverlay = _this$props2.showOverlay,
          showNotification = _this$props2.showNotification,
          device = _this$props2.device,
          totals = _this$props2.totals; // to prevent outside-click handler trigger

      e.nativeEvent.stopImmediatePropagation();

      if (Object(_util_Cart__WEBPACK_IMPORTED_MODULE_15__["hasOutOfStockProductsInCartItems"])(totals.items)) {
        return;
      }

      if (guest_checkout) {
        history.push({
          pathname: Object(_util_Url__WEBPACK_IMPORTED_MODULE_17__["appendWithStoreCode"])(_Checkout_Checkout_config__WEBPACK_IMPORTED_MODULE_5__["CHECKOUT_URL"])
        });
        return;
      }

      if (Object(_util_Auth__WEBPACK_IMPORTED_MODULE_14__["isSignedIn"])()) {
        history.push({
          pathname: Object(_util_Url__WEBPACK_IMPORTED_MODULE_17__["appendWithStoreCode"])(_Checkout_Checkout_config__WEBPACK_IMPORTED_MODULE_5__["CHECKOUT_URL"])
        });
        return;
      } // fir notification whatever device that is


      showNotification('info', __('Please sign-in to complete checkout!'));

      if (device.isMobile) {
        // for all mobile devices, simply switch route
        history.push({
          pathname: Object(_util_Url__WEBPACK_IMPORTED_MODULE_17__["appendWithStoreCode"])('/my-account')
        });
        return;
      } // for desktop, just open customer overlay


      showOverlay(_component_MyAccountOverlay_MyAccountOverlay_config__WEBPACK_IMPORTED_MODULE_4__["CUSTOMER_ACCOUNT_OVERLAY_KEY"]);
    }
  }, {
    key: "_updateBreadcrumbs",
    value: function _updateBreadcrumbs() {
      var updateBreadcrumbs = this.props.updateBreadcrumbs;
      var breadcrumbs = [{
        url: '/cart',
        name: __('Shopping cart')
      }, {
        url: '/',
        name: __('Home')
      }];
      updateBreadcrumbs(breadcrumbs);
    }
  }, {
    key: "_changeHeaderState",
    value: function _changeHeaderState() {
      var _this2 = this;

      var _this$props3 = this.props,
          changeHeaderState = _this$props3.changeHeaderState,
          items_qty = _this$props3.totals.items_qty;

      var title = __('%s Item(s)', items_qty || 0);

      changeHeaderState({
        name: _component_Header_Header_config__WEBPACK_IMPORTED_MODULE_3__["CART"],
        title: title,
        onEditClick: function onEditClick() {
          _this2.setState({
            isEditing: true
          });

          changeHeaderState({
            name: _component_Header_Header_config__WEBPACK_IMPORTED_MODULE_3__["CART_EDITING"],
            title: title,
            onOkClick: function onOkClick() {
              return _this2.setState({
                isEditing: false
              });
            },
            onCancelClick: function onCancelClick() {
              return _this2.setState({
                isEditing: false
              });
            }
          });
        },
        onCloseClick: function onCloseClick() {
          _this2.setState({
            isEditing: false
          });

          _util_History__WEBPACK_IMPORTED_MODULE_16__["default"].goBack();
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _CartPage_component__WEBPACK_IMPORTED_MODULE_18__["default"], _extends({}, this.props, this.state, this.containerFunctions, this.containerProps()))
      );
    }
  }]);

  return _CartPageContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_CartPageContainer, 'name', {
  value: 'CartPageContainer'
});

var CartPageContainer = middleware(_CartPageContainer, "Route/CartPage/Container");

_defineProperty(CartPageContainer, "propTypes", {
  updateBreadcrumbs: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  changeHeaderState: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  showOverlay: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  showNotification: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  updateMeta: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  guest_checkout: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  history: _type_Common__WEBPACK_IMPORTED_MODULE_11__["HistoryType"].isRequired,
  totals: _type_MiniCart__WEBPACK_IMPORTED_MODULE_13__["TotalsType"].isRequired,
  device: _type_Device__WEBPACK_IMPORTED_MODULE_12__["DeviceType"].isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(CartPageContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/route/CartPage/CartPage.style.scss":
/*!****************************************************!*\
  !*** ./src/app/route/CartPage/CartPage.style.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291334633
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/route/CartPage/index.js":
/*!*****************************************!*\
  !*** ./src/app/route/CartPage/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CartPage_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CartPage.container */ "./src/app/route/CartPage/CartPage.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _CartPage_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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
//# sourceMappingURL=cart.js.map