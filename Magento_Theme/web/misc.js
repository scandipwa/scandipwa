(this["webpackJsonp"] = this["webpackJsonp"] || []).push([["misc"],{

/***/ "./src/app/component/FieldForm/index.js":
/*!**********************************************!*\
  !*** ./src/app/component/FieldForm/index.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FieldForm_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FieldForm.component */ "./src/app/component/FieldForm/FieldForm.component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _FieldForm_component__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/SharedWishlistItem/SharedWishlistItem.component.js":
/*!******************************************************************************!*\
  !*** ./src/app/component/SharedWishlistItem/SharedWishlistItem.component.js ***!
  \******************************************************************************/
/*! exports provided: _SharedWishlistItem, SharedWishlistItem, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_SharedWishlistItem", function() { return _SharedWishlistItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedWishlistItem", function() { return SharedWishlistItem; });
/* harmony import */ var _AddToCart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AddToCart */ "./src/app/component/AddToCart/index.js");
/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Field */ "./src/app/component/Field/index.js");
/* harmony import */ var _ProductCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ProductCard */ "./src/app/component/ProductCard/index.js");
/* harmony import */ var _WishlistItem_WishlistItem_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../WishlistItem/WishlistItem.component */ "./src/app/component/WishlistItem/WishlistItem.component.js");
/* harmony import */ var _SharedWishlistItem_style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SharedWishlistItem.style */ "./src/app/component/SharedWishlistItem/SharedWishlistItem.style.scss");
/* harmony import */ var _SharedWishlistItem_style__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_SharedWishlistItem_style__WEBPACK_IMPORTED_MODULE_4__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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





/** @namespace Component/SharedWishlistItem/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _SharedWishlistItem =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_SharedWishlistItem, _Extensible);

  function _SharedWishlistItem() {
    _classCallCheck(this, _SharedWishlistItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(_SharedWishlistItem).apply(this, arguments));
  }

  _createClass(_SharedWishlistItem, [{
    key: "renderAddToCart",
    value: function renderAddToCart() {
      var _this$props = this.props,
          product = _this$props.product,
          quantity = _this$props.quantity,
          changeQuantity = _this$props.changeQuantity,
          configurableVariantIndex = _this$props.configurableVariantIndex;
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "WishlistItem",
          elem: "Row",
          mix: {
            block: 'SharedWishlistItem',
            elem: 'Row'
          }
        },
        /*#__PURE__*/
        _checkBEM(React, _Field__WEBPACK_IMPORTED_MODULE_1__["default"], {
          id: "item_qty",
          name: "item_qty",
          type: "number",
          min: 1,
          value: quantity,
          mix: {
            block: 'WishlistItem',
            elem: 'Quantity'
          },
          onChange: changeQuantity
        }),
        /*#__PURE__*/
        _checkBEM(React, _AddToCart__WEBPACK_IMPORTED_MODULE_0__["default"], {
          product: product,
          quantity: quantity,
          configurableVariantIndex: configurableVariantIndex,
          mix: {
            block: 'WishlistItem',
            elem: 'AddToCart'
          }
        }))
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          product = _this$props2.product,
          parameters = _this$props2.parameters,
          isLoading = _this$props2.isLoading;
      return (
        /*#__PURE__*/
        _checkBEM(React, _ProductCard__WEBPACK_IMPORTED_MODULE_2__["default"], {
          product: product,
          selectedFilters: parameters,
          mix: {
            block: 'WishlistItem'
          },
          isLoading: isLoading
        }, this.renderAddToCart())
      );
    }
  }]);

  return _SharedWishlistItem;
}(Extensible(_WishlistItem_WishlistItem_component__WEBPACK_IMPORTED_MODULE_3__["default"]));
Object.defineProperty(_SharedWishlistItem, 'name', {
  value: 'SharedWishlistItem'
});

var SharedWishlistItem = middleware(_SharedWishlistItem, "Component/SharedWishlistItem/Component");
/* harmony default export */ __webpack_exports__["default"] = (SharedWishlistItem);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/SharedWishlistItem/SharedWishlistItem.container.js":
/*!******************************************************************************!*\
  !*** ./src/app/component/SharedWishlistItem/SharedWishlistItem.container.js ***!
  \******************************************************************************/
/*! exports provided: CartDispatcher, mapDispatchToProps, _SharedWishlistItemContainer, SharedWishlistItemContainer, mapStateToProps, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartDispatcher", function() { return CartDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_SharedWishlistItemContainer", function() { return _SharedWishlistItemContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedWishlistItemContainer", function() { return SharedWishlistItemContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _WishlistItem_WishlistItem_container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../WishlistItem/WishlistItem.container */ "./src/app/component/WishlistItem/WishlistItem.container.js");
/* harmony import */ var _store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/Notification/Notification.action */ "./src/app/store/Notification/Notification.action.js");
/* harmony import */ var _SharedWishlistItem_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SharedWishlistItem.component */ "./src/app/component/SharedWishlistItem/SharedWishlistItem.component.js");
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
/** @namespace Component/SharedWishlistItem/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    showNotification: function showNotification(type, message) {
      return dispatch(Object(_store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_2__["showNotification"])(type, message));
    },
    addProductToCart: function addProductToCart(options) {
      return CartDispatcher.then(function (_ref) {
        var dispatcher = _ref.default;
        return dispatcher.addProductToCart(dispatch, options);
      });
    }
  };
}, "Component/SharedWishlistItem/Container/mapDispatchToProps");
/** @namespace Component/SharedWishlistItem/Container/sharedWishlistItemContainer */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _SharedWishlistItemContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_SharedWishlistItemContainer, _Extensible);

  function _SharedWishlistItemContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _SharedWishlistItemContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_SharedWishlistItemContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      quantity: 1
    });

    _defineProperty(_assertThisInitialized(_this), "containerProps", function () {
      var isLoading = _this.state.isLoading;
      return {
        changeQuantity: _this.changeQuantity,
        changeDescription: _this.changeDescription,
        configurableVariantIndex: _this._getConfigurableVariantIndex(),
        parameters: _this._getParameters(),
        isLoading: isLoading
      };
    });

    _defineProperty(_assertThisInitialized(_this), "changeQuantity", function (quantity) {
      _this.setState({
        quantity: quantity
      });
    });

    return _this;
  }

  _createClass(_SharedWishlistItemContainer, [{
    key: "_getConfigurableVariantIndex",
    value: function _getConfigurableVariantIndex() {
      var _this$props$product = this.props.product,
          sku = _this$props$product.wishlist.sku,
          variants = _this$props$product.variants;
      return +this.getConfigurableVariantIndex(sku, variants);
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _SharedWishlistItem_component__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({}, this.props, this.state, this.containerProps(), this.containerFunctions))
      );
    }
  }]);

  return _SharedWishlistItemContainer;
}(Extensible(_WishlistItem_WishlistItem_container__WEBPACK_IMPORTED_MODULE_1__["WishlistItemContainer"]));
/** @namespace Component/SharedWishlistItem/Container/mapStateToProps */
// eslint-disable-next-line no-unused-vars

Object.defineProperty(_SharedWishlistItemContainer, 'name', {
  value: 'SharedWishlistItemContainer'
});

var SharedWishlistItemContainer = middleware(_SharedWishlistItemContainer, "Component/SharedWishlistItem/Container/sharedWishlistItemContainer");
var mapStateToProps = middleware(function (state) {
  return {};
}, "Component/SharedWishlistItem/Container/mapStateToProps");
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["connect"])(mapStateToProps, mapDispatchToProps)(SharedWishlistItemContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/SharedWishlistItem/SharedWishlistItem.style.scss":
/*!****************************************************************************!*\
  !*** ./src/app/component/SharedWishlistItem/SharedWishlistItem.style.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291338448
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/SharedWishlistItem/index.js":
/*!*******************************************************!*\
  !*** ./src/app/component/SharedWishlistItem/index.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SharedWishlistItem_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SharedWishlistItem.container */ "./src/app/component/SharedWishlistItem/SharedWishlistItem.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _SharedWishlistItem_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/route/PasswordChangePage/PasswordChangePage.component.js":
/*!**************************************************************************!*\
  !*** ./src/app/route/PasswordChangePage/PasswordChangePage.component.js ***!
  \**************************************************************************/
/*! exports provided: _PasswordChangePage, PasswordChangePage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_PasswordChangePage", function() { return _PasswordChangePage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordChangePage", function() { return PasswordChangePage; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _component_ContentWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../component/ContentWrapper */ "./src/app/component/ContentWrapper/index.js");
/* harmony import */ var _component_Field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../component/Field */ "./src/app/component/Field/index.js");
/* harmony import */ var _component_Form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../component/Form */ "./src/app/component/Form/index.js");
/* harmony import */ var _component_Loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../component/Loader */ "./src/app/component/Loader/index.js");
/* harmony import */ var _PasswordChangePage_style__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./PasswordChangePage.style */ "./src/app/route/PasswordChangePage/PasswordChangePage.style.scss");
/* harmony import */ var _PasswordChangePage_style__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_PasswordChangePage_style__WEBPACK_IMPORTED_MODULE_6__);
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







/** @namespace Route/PasswordChangePage/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _PasswordChangePage =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_PasswordChangePage, _Extensible);

  function _PasswordChangePage() {
    _classCallCheck(this, _PasswordChangePage);

    return _possibleConstructorReturn(this, _getPrototypeOf(_PasswordChangePage).apply(this, arguments));
  }

  _createClass(_PasswordChangePage, [{
    key: "renderForm",
    value: function renderForm() {
      var _this$props = this.props,
          onPasswordAttempt = _this$props.onPasswordAttempt,
          onPasswordSuccess = _this$props.onPasswordSuccess,
          onError = _this$props.onError; // TODO: use FieldForm instead!!!

      return (
        /*#__PURE__*/
        _checkBEM(React, _component_Form__WEBPACK_IMPORTED_MODULE_4__["default"], {
          key: "reset-password",
          onSubmit: onPasswordAttempt,
          onSubmitSuccess: onPasswordSuccess,
          onSubmitError: onError
        },
        /*#__PURE__*/
        _checkBEM(React, _component_Field__WEBPACK_IMPORTED_MODULE_3__["default"], {
          type: "password",
          label: __('New password'),
          id: "passwordReset",
          name: "passwordReset",
          autocomplete: "new-password",
          validation: ['notEmpty', 'password']
        }),
        /*#__PURE__*/
        _checkBEM(React, _component_Field__WEBPACK_IMPORTED_MODULE_3__["default"], {
          type: "password",
          label: __('Confirm password'),
          id: "passwordResetConfirm",
          name: "passwordResetConfirm",
          autocomplete: "new-password",
          validation: ['notEmpty', 'password']
        }),
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "MyAccount",
          elem: "Buttons"
        },
        /*#__PURE__*/
        _checkBEM(React, "button", {
          type: "submit",
          block: "PasswordChangePage",
          elem: "Button",
          mix: {
            block: 'Button'
          }
        }, __('Update Password'))))
      );
    }
  }, {
    key: "render",
    value: function render() {
      var isLoading = this.props.isLoading;
      return (
        /*#__PURE__*/
        _checkBEM(React, "main", {
          block: "PasswordChangePage",
          "aria-label": __('Password Change Page')
        },
        /*#__PURE__*/
        _checkBEM(React, _component_ContentWrapper__WEBPACK_IMPORTED_MODULE_2__["default"], {
          mix: {
            block: 'PasswordChangePage'
          },
          wrapperMix: {
            block: 'PasswordChangePage',
            elem: 'Wrapper'
          },
          label: __('Password Change Actions')
        },
        /*#__PURE__*/
        _checkBEM(React, _component_Loader__WEBPACK_IMPORTED_MODULE_5__["default"], {
          isLoading: isLoading
        }),
        /*#__PURE__*/
        _checkBEM(React, "h1", null, __('Change My Password')), this.renderForm()))
      );
    }
  }]);

  return _PasswordChangePage;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_PasswordChangePage, 'name', {
  value: 'PasswordChangePage'
});

var PasswordChangePage = middleware(_PasswordChangePage, "Route/PasswordChangePage/Component");

_defineProperty(PasswordChangePage, "propTypes", {
  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  onPasswordAttempt: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  onPasswordSuccess: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  onError: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (PasswordChangePage);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/route/PasswordChangePage/PasswordChangePage.config.js":
/*!***********************************************************************!*\
  !*** ./src/app/route/PasswordChangePage/PasswordChangePage.config.js ***!
  \***********************************************************************/
/*! exports provided: STATUS_PASSWORD_UPDATED, STATUS_PASSWORD_MISS_MATCH */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATUS_PASSWORD_UPDATED", function() { return STATUS_PASSWORD_UPDATED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATUS_PASSWORD_MISS_MATCH", function() { return STATUS_PASSWORD_MISS_MATCH; });
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
var STATUS_PASSWORD_UPDATED = 'password_updated';
var STATUS_PASSWORD_MISS_MATCH = 'passwords_miss_match';

/***/ }),

/***/ "./src/app/route/PasswordChangePage/PasswordChangePage.container.js":
/*!**************************************************************************!*\
  !*** ./src/app/route/PasswordChangePage/PasswordChangePage.container.js ***!
  \**************************************************************************/
/*! exports provided: BreadcrumbsDispatcher, MyAccountDispatcher, mapStateToProps, mapDispatchToProps, _PasswordChangePageContainer, PasswordChangePageContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, __, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BreadcrumbsDispatcher", function() { return BreadcrumbsDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountDispatcher", function() { return MyAccountDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_PasswordChangePageContainer", function() { return _PasswordChangePageContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordChangePageContainer", function() { return PasswordChangePageContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/es/index.js");
/* harmony import */ var _store_Meta_Meta_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/Meta/Meta.action */ "./src/app/store/Meta/Meta.action.js");
/* harmony import */ var _store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store/Notification/Notification.action */ "./src/app/store/Notification/Notification.action.js");
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _util_Url__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../util/Url */ "./src/app/util/Url/index.js");
/* harmony import */ var _PasswordChangePage_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./PasswordChangePage.component */ "./src/app/route/PasswordChangePage/PasswordChangePage.component.js");
/* harmony import */ var _PasswordChangePage_config__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./PasswordChangePage.config */ "./src/app/route/PasswordChangePage/PasswordChangePage.config.js");
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










var BreadcrumbsDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/Breadcrumbs/Breadcrumbs.dispatcher */ "./src/app/store/Breadcrumbs/Breadcrumbs.dispatcher.js"));
var MyAccountDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/MyAccount/MyAccount.dispatcher */ "./src/app/store/MyAccount/MyAccount.dispatcher.js"));
/** @namespace Route/PasswordChangePage/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    passwordResetStatus: state.MyAccountReducer.passwordResetStatus
  };
}, "Route/PasswordChangePage/Container/mapStateToProps");
/** @namespace Route/PasswordChangePage/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    updateMeta: function updateMeta(meta) {
      return dispatch(Object(_store_Meta_Meta_action__WEBPACK_IMPORTED_MODULE_4__["updateMeta"])(meta));
    },
    updateBreadcrumbs: function updateBreadcrumbs(breadcrumbs) {
      BreadcrumbsDispatcher.then(function (_ref) {
        var dispatcher = _ref.default;
        return dispatcher.update(breadcrumbs, dispatch);
      });
    },
    resetPassword: function resetPassword(options) {
      MyAccountDispatcher.then(function (_ref2) {
        var dispatcher = _ref2.default;
        return dispatcher.resetPassword(options, dispatch);
      });
    },
    updateCustomerPasswordResetStatus: function updateCustomerPasswordResetStatus(options) {
      MyAccountDispatcher.then(function (_ref3) {
        var dispatcher = _ref3.default;
        return dispatcher.updateCustomerPasswordResetStatus(options, dispatch);
      });
    },
    showNotification: function showNotification(type, message) {
      dispatch(Object(_store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_5__["showNotification"])(type, message));
    }
  };
}, "Route/PasswordChangePage/Container/mapDispatchToProps");
/** @namespace Route/PasswordChangePage/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _PasswordChangePageContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_PasswordChangePageContainer, _Extensible);

  function _PasswordChangePageContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _PasswordChangePageContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_PasswordChangePageContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      passwordResetStatus: '',
      isLoading: false
    });

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      onPasswordAttempt: _this.onPasswordAttempt.bind(_assertThisInitialized(_this)),
      onPasswordSuccess: _this.onPasswordSuccess.bind(_assertThisInitialized(_this)),
      onError: _this.onError.bind(_assertThisInitialized(_this))
    });

    _defineProperty(_assertThisInitialized(_this), "containerProps", function () {
      var isLoading = _this.state.isLoading;
      return {
        isLoading: isLoading
      };
    });

    return _this;
  }

  _createClass(_PasswordChangePageContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateMeta();
      this.updateBreadcrumbs();
    }
  }, {
    key: "onPasswordSuccess",
    value: function onPasswordSuccess(fields) {
      var _this$props = this.props,
          resetPassword = _this$props.resetPassword,
          location = _this$props.location;
      var password = fields.passwordReset,
          password_confirmation = fields.passwordResetConfirm;
      var token = Object(_util_Url__WEBPACK_IMPORTED_MODULE_7__["getQueryParam"])('token', location);
      resetPassword({
        token: token,
        password: password,
        password_confirmation: password_confirmation
      });
    }
  }, {
    key: "onPasswordAttempt",
    value: function onPasswordAttempt() {
      this.setState({
        isLoading: true
      });
    }
  }, {
    key: "onError",
    value: function onError() {
      this.setState({
        isLoading: false
      });
    }
  }, {
    key: "updateMeta",
    value: function updateMeta() {
      var updateMeta = this.props.updateMeta;
      updateMeta({
        title: __('Password Change Page')
      });
    }
  }, {
    key: "updateBreadcrumbs",
    value: function updateBreadcrumbs() {
      var updateBreadcrumbs = this.props.updateBreadcrumbs;
      var breadcrumbs = [{
        url: '/createPassword',
        name: __('Change password')
      }, {
        url: '/',
        name: __('Home')
      }];
      updateBreadcrumbs(breadcrumbs);
    }
  }, {
    key: "render",
    value: function render() {
      var passwordResetStatus = this.state.passwordResetStatus;

      if (passwordResetStatus === _PasswordChangePage_config__WEBPACK_IMPORTED_MODULE_9__["STATUS_PASSWORD_UPDATED"]) {
        return (
          /*#__PURE__*/
          _checkBEM(React, react_router__WEBPACK_IMPORTED_MODULE_3__["Redirect"], {
            to: "/"
          })
        );
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, _PasswordChangePage_component__WEBPACK_IMPORTED_MODULE_8__["default"], _extends({}, this.containerProps(), this.containerFunctions))
      );
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props) {
      var passwordResetStatus = props.passwordResetStatus,
          showNotification = props.showNotification;
      var stateToBeUpdated = {};

      if (passwordResetStatus) {
        stateToBeUpdated.isLoading = false;
        stateToBeUpdated.passwordResetStatus = passwordResetStatus;

        switch (passwordResetStatus) {
          case _PasswordChangePage_config__WEBPACK_IMPORTED_MODULE_9__["STATUS_PASSWORD_UPDATED"]:
            showNotification('success', __('Password has been successfully updated!'));
            break;

          case _PasswordChangePage_config__WEBPACK_IMPORTED_MODULE_9__["STATUS_PASSWORD_MISS_MATCH"]:
            showNotification('info', __('Your password and confirmation password do not match.'));
            break;

          default:
            showNotification('error', __('Error! Something went wrong'));
        }
      }

      return Object.keys(stateToBeUpdated).length ? stateToBeUpdated : null;
    }
  }]);

  return _PasswordChangePageContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_PasswordChangePageContainer, 'name', {
  value: 'PasswordChangePageContainer'
});

var PasswordChangePageContainer = middleware(_PasswordChangePageContainer, "Route/PasswordChangePage/Container");

_defineProperty(PasswordChangePageContainer, "propTypes", {
  updateMeta: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  updateBreadcrumbs: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  showNotification: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  passwordResetStatus: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool]).isRequired,
  resetPassword: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  location: _type_Common__WEBPACK_IMPORTED_MODULE_6__["LocationType"].isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(PasswordChangePageContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/route/PasswordChangePage/PasswordChangePage.style.scss":
/*!************************************************************************!*\
  !*** ./src/app/route/PasswordChangePage/PasswordChangePage.style.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291332919
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/route/PasswordChangePage/index.js":
/*!***************************************************!*\
  !*** ./src/app/route/PasswordChangePage/index.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PasswordChangePage_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PasswordChangePage.container */ "./src/app/route/PasswordChangePage/PasswordChangePage.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _PasswordChangePage_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/route/WishlistSharedPage/WishlistSharedPage.component.js":
/*!**************************************************************************!*\
  !*** ./src/app/route/WishlistSharedPage/WishlistSharedPage.component.js ***!
  \**************************************************************************/
/*! exports provided: _WishlistSharedPage, WishlistSharedPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_WishlistSharedPage", function() { return _WishlistSharedPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WishlistSharedPage", function() { return WishlistSharedPage; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _component_ContentWrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../component/ContentWrapper */ "./src/app/component/ContentWrapper/index.js");
/* harmony import */ var _component_Loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../component/Loader */ "./src/app/component/Loader/index.js");
/* harmony import */ var _component_MyAccountMyWishlist_MyAccountMyWishlist_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../component/MyAccountMyWishlist/MyAccountMyWishlist.component */ "./src/app/component/MyAccountMyWishlist/MyAccountMyWishlist.component.js");
/* harmony import */ var _component_SharedWishlistItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../component/SharedWishlistItem */ "./src/app/component/SharedWishlistItem/index.js");
/* harmony import */ var _WishlistSharedPage_style__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./WishlistSharedPage.style */ "./src/app/route/WishlistSharedPage/WishlistSharedPage.style.scss");
/* harmony import */ var _WishlistSharedPage_style__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_WishlistSharedPage_style__WEBPACK_IMPORTED_MODULE_5__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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






/** @namespace Route/WishlistSharedPage/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _WishlistSharedPage =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_WishlistSharedPage, _Extensible);

  function _WishlistSharedPage() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _WishlistSharedPage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_WishlistSharedPage)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "renderProduct", function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          id = _ref2[0],
          product = _ref2[1];

      return (
        /*#__PURE__*/
        _checkBEM(React, _component_SharedWishlistItem__WEBPACK_IMPORTED_MODULE_4__["default"], {
          key: id,
          product: product
        })
      );
    });

    return _this;
  }

  _createClass(_WishlistSharedPage, [{
    key: "renderActionLine",
    value: function renderActionLine() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "WishlistSharedPage",
          elem: "ActionBar"
        }, this.renderAddAllToCart())
      );
    }
  }, {
    key: "renderCreatorsInfo",
    value: function renderCreatorsInfo() {
      var creatorsName = this.props.creatorsName;
      return (
        /*#__PURE__*/
        _checkBEM(React, "h1", {
          block: "WishlistSharedPage",
          elem: "CreatorsInfo"
        }, __('Wishlist shared by '),
        /*#__PURE__*/
        _checkBEM(React, "strong", null, creatorsName))
      );
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this$props = this.props,
          isWishlistLoading = _this$props.isWishlistLoading,
          isWishlistEmpty = _this$props.isWishlistEmpty,
          isLoading = _this$props.isLoading;

      if (isWishlistEmpty && !isWishlistLoading) {
        return this.renderNoProductsFound();
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "WishlistSharedPage",
          elem: "Products"
        },
        /*#__PURE__*/
        _checkBEM(React, _component_Loader__WEBPACK_IMPORTED_MODULE_2__["default"], {
          isLoading: isLoading
        }), this.renderProducts())
      );
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "main", {
          block: "WishlistSharedPage"
        },
        /*#__PURE__*/
        _checkBEM(React, _component_ContentWrapper__WEBPACK_IMPORTED_MODULE_1__["default"], null, this.renderActionLine(), this.renderCreatorsInfo(), this.renderContent()))
      );
    }
  }]);

  return _WishlistSharedPage;
}(Extensible(_component_MyAccountMyWishlist_MyAccountMyWishlist_component__WEBPACK_IMPORTED_MODULE_3__["default"]));
Object.defineProperty(_WishlistSharedPage, 'name', {
  value: 'WishlistSharedPage'
});

var WishlistSharedPage = middleware(_WishlistSharedPage, "Route/WishlistSharedPage/Component");

_defineProperty(WishlistSharedPage, "propTypes", {
  creatorsName: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (WishlistSharedPage);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/route/WishlistSharedPage/WishlistSharedPage.container.js":
/*!**************************************************************************!*\
  !*** ./src/app/route/WishlistSharedPage/WishlistSharedPage.container.js ***!
  \**************************************************************************/
/*! exports provided: BreadcrumbsDispatcher, WishlistDispatcher, mapDispatchToProps, _WishlistSharedPageContainer, WishlistSharedPageContainer, mapStateToProps, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, __, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BreadcrumbsDispatcher", function() { return BreadcrumbsDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WishlistDispatcher", function() { return WishlistDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_WishlistSharedPageContainer", function() { return _WishlistSharedPageContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WishlistSharedPageContainer", function() { return WishlistSharedPageContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _component_MyAccountMyWishlist_MyAccountMyWishlist_container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../component/MyAccountMyWishlist/MyAccountMyWishlist.container */ "./src/app/component/MyAccountMyWishlist/MyAccountMyWishlist.container.js");
/* harmony import */ var _query_Wishlist_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../query/Wishlist.query */ "./src/app/query/Wishlist.query.js");
/* harmony import */ var _store_NoMatch_NoMatch_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/NoMatch/NoMatch.action */ "./src/app/store/NoMatch/NoMatch.action.js");
/* harmony import */ var _store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store/Notification/Notification.action */ "./src/app/store/Notification/Notification.action.js");
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _util_Product__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../util/Product */ "./src/app/util/Product/index.js");
/* harmony import */ var _util_Query__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../util/Query */ "./src/app/util/Query/index.js");
/* harmony import */ var _util_Request__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../util/Request */ "./src/app/util/Request/index.js");
/* harmony import */ var _util_Request_QueryDispatcher__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../util/Request/QueryDispatcher */ "./src/app/util/Request/QueryDispatcher.js");
/* harmony import */ var _WishlistSharedPage_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./WishlistSharedPage.component */ "./src/app/route/WishlistSharedPage/WishlistSharedPage.component.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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












var BreadcrumbsDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/Breadcrumbs/Breadcrumbs.dispatcher */ "./src/app/store/Breadcrumbs/Breadcrumbs.dispatcher.js"));
var WishlistDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/Wishlist/Wishlist.dispatcher */ "./src/app/store/Wishlist/Wishlist.dispatcher.js"));
/** @namespace Route/WishlistSharedPage/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    clearWishlist: function clearWishlist() {
      return WishlistDispatcher.then(function (_ref) {
        var dispatcher = _ref.default;
        return dispatcher.clearWishlist(dispatch);
      });
    },
    moveWishlistToCart: function moveWishlistToCart(sharingCode) {
      return WishlistDispatcher.then(function (_ref2) {
        var dispatcher = _ref2.default;
        return dispatcher.moveWishlistToCart(dispatch, sharingCode);
      });
    },
    showNotification: function showNotification(message) {
      return dispatch(Object(_store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_5__["showNotification"])('success', message));
    },
    showError: function showError(message) {
      return dispatch(Object(_store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_5__["showNotification"])('error', message));
    },
    showNoMatch: function showNoMatch() {
      return dispatch(Object(_store_NoMatch_NoMatch_action__WEBPACK_IMPORTED_MODULE_4__["updateNoMatch"])(true));
    },
    updateBreadcrumbs: function updateBreadcrumbs(breadcrumbs) {
      return BreadcrumbsDispatcher.then(function (_ref3) {
        var dispatcher = _ref3.default;
        return dispatcher.update(breadcrumbs, dispatch);
      });
    }
  };
}, "Route/WishlistSharedPage/Container/mapDispatchToProps");
/** @namespace Route/WishlistSharedPage/Container/wishlistSharedContainer */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _WishlistSharedPageContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_WishlistSharedPageContainer, _Extensible);

  function _WishlistSharedPageContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _WishlistSharedPageContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_WishlistSharedPageContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      creatorsName: '',
      wishlistItems: {},
      isWishlistLoading: true,
      isLoading: false
    });

    _defineProperty(_assertThisInitialized(_this), "addAllToCart", function () {
      var _this$props = _this.props,
          showError = _this$props.showError,
          moveWishlistToCart = _this$props.moveWishlistToCart;

      var sharingCode = _this.getCode();

      _this.setState({
        isLoading: true
      });

      return moveWishlistToCart(sharingCode).then(
      /** @namespace Route/WishlistSharedPage/Container/moveWishlistToCartThen */
      middleware(function () {
        return _this.showNotificationAndRemoveLoading('Wishlist moved to cart');
      }, "Route/WishlistSharedPage/Container/moveWishlistToCartThen"),
      /** @namespace Route/WishlistSharedPage/Container/moveWishlistToCartCatch */
      middleware(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 1),
            message = _ref5[0].message;

        return showError(message);
      }, "Route/WishlistSharedPage/Container/moveWishlistToCartCatch"));
    });

    _defineProperty(_assertThisInitialized(_this), "_getIsWishlistEmpty", function () {
      var wishlistItems = _this.state.wishlistItems;
      return Object.entries(wishlistItems).length <= 0;
    });

    return _this;
  }

  _createClass(_WishlistSharedPageContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.requestWishlist();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var code = prevProps.match.params.code;

      if (this.getCode() !== code) {
        this.requestWishlist();
      }
    }
  }, {
    key: "setLoading",
    value: function setLoading() {
      var isLoading = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.setState({
        isWishlistLoading: isLoading,
        isLoading: isLoading
      });
    }
  }, {
    key: "requestWishlist",
    value: function requestWishlist() {
      var _this2 = this;

      var _this$props2 = this.props,
          showError = _this$props2.showError,
          showNoMatch = _this$props2.showNoMatch,
          updateBreadcrumbs = _this$props2.updateBreadcrumbs;
      var code = this.getCode();
      var query = Object(_util_Query__WEBPACK_IMPORTED_MODULE_8__["prepareQuery"])([_query_Wishlist_query__WEBPACK_IMPORTED_MODULE_3__["default"].getWishlistQuery(code)]);
      updateBreadcrumbs([]);
      this.setLoading();
      Object(_util_Request__WEBPACK_IMPORTED_MODULE_9__["executeGet"])(query, 'SharedWishlist', _util_Request_QueryDispatcher__WEBPACK_IMPORTED_MODULE_10__["FIVE_MINUTES_IN_SECONDS"]).then(
      /** @namespace Route/WishlistSharedPage/Container/requestWishlistExecuteGetThen */
      middleware(function (_ref6) {
        var wishlist = _ref6.wishlist,
            _ref6$wishlist = _ref6.wishlist;
        _ref6$wishlist = _ref6$wishlist === void 0 ? {} : _ref6$wishlist;
        var items_count = _ref6$wishlist.items_count,
            creatorsName = _ref6$wishlist.creators_name;

        if (!items_count) {
          _this2.setLoading(false);

          return;
        }

        var wishlistItems = wishlist.items.reduce(function (prev, wishlistItem) {
          var id = wishlistItem.id,
              sku = wishlistItem.sku,
              product = wishlistItem.product,
              description = wishlistItem.description,
              quantity = wishlistItem.qty;
          var indexedProduct = Object(_util_Product__WEBPACK_IMPORTED_MODULE_7__["getIndexedProduct"])(product);
          return _objectSpread2(_objectSpread2({}, prev), {}, _defineProperty({}, id, _objectSpread2({
            quantity: quantity,
            wishlist: {
              id: id,
              sku: sku,
              quantity: quantity,
              description: description
            }
          }, indexedProduct)));
        }, {});
        updateBreadcrumbs([{
          name: creatorsName,
          url: "/wishlist/shared/".concat(code)
        }, {
          name: __('Shared Wishlist'),
          url: '/'
        }]);

        _this2.setState({
          creatorsName: creatorsName,
          wishlistItems: wishlistItems,
          isLoading: false,
          isWishlistLoading: false
        });
      }, "Route/WishlistSharedPage/Container/requestWishlistExecuteGetThen"),
      /** @namespace Route/WishlistSharedPage/Container/executeGetCatch */
      middleware(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 1),
            message = _ref8[0].message;

        showError(message);
        showNoMatch();
      }, "Route/WishlistSharedPage/Container/executeGetCatch"));
    }
  }, {
    key: "getCode",
    value: function getCode() {
      var code = this.props.match.params.code;
      return code;
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _WishlistSharedPage_component__WEBPACK_IMPORTED_MODULE_11__["default"], _extends({}, this.props, this.state, this.containerProps(), this.containerFunctions()))
      );
    }
  }]);

  return _WishlistSharedPageContainer;
}(Extensible(_component_MyAccountMyWishlist_MyAccountMyWishlist_container__WEBPACK_IMPORTED_MODULE_2__["MyAccountMyWishlistContainer"]));
/** @namespace Route/WishlistSharedPage/Container/mapStateToProps */
// eslint-disable-next-line no-unused-vars

Object.defineProperty(_WishlistSharedPageContainer, 'name', {
  value: 'WishlistSharedPageContainer'
});

var WishlistSharedPageContainer = middleware(_WishlistSharedPageContainer, "Route/WishlistSharedPage/Container/wishlistSharedContainer");

_defineProperty(WishlistSharedPageContainer, "propTypes", {
  match: _type_Common__WEBPACK_IMPORTED_MODULE_6__["MatchType"].isRequired,
  showError: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  showNoMatch: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  updateBreadcrumbs: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

var mapStateToProps = middleware(function (state) {
  return {};
}, "Route/WishlistSharedPage/Container/mapStateToProps");
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(WishlistSharedPageContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/route/WishlistSharedPage/WishlistSharedPage.style.scss":
/*!************************************************************************!*\
  !*** ./src/app/route/WishlistSharedPage/WishlistSharedPage.style.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291332680
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/route/WishlistSharedPage/index.js":
/*!***************************************************!*\
  !*** ./src/app/route/WishlistSharedPage/index.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WishlistSharedPage_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WishlistSharedPage.container */ "./src/app/route/WishlistSharedPage/WishlistSharedPage.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _WishlistSharedPage_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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
//# sourceMappingURL=misc.js.map