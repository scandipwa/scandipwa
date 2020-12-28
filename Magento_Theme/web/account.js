(this["webpackJsonp"] = this["webpackJsonp"] || []).push([["account"],{

/***/ "./src/app/component/MyAccountAddressBook/MyAccountAddressBook.component.js":
/*!**********************************************************************************!*\
  !*** ./src/app/component/MyAccountAddressBook/MyAccountAddressBook.component.js ***!
  \**********************************************************************************/
/*! exports provided: _MyAccountAddressBook, MyAccountAddressBook, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MyAccountAddressBook", function() { return _MyAccountAddressBook; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountAddressBook", function() { return MyAccountAddressBook; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _MyAccountAddressPopup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../MyAccountAddressPopup */ "./src/app/component/MyAccountAddressPopup/index.js");
/* harmony import */ var _MyAccountAddressTable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../MyAccountAddressTable */ "./src/app/component/MyAccountAddressTable/index.js");
/* harmony import */ var _type_Account__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../type/Account */ "./src/app/type/Account.js");
/* harmony import */ var _MyAccountAddressBook_style__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MyAccountAddressBook.style */ "./src/app/component/MyAccountAddressBook/MyAccountAddressBook.style.scss");
/* harmony import */ var _MyAccountAddressBook_style__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_MyAccountAddressBook_style__WEBPACK_IMPORTED_MODULE_5__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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






/** @namespace Component/MyAccountAddressBook/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MyAccountAddressBook =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MyAccountAddressBook, _Extensible);

  function _MyAccountAddressBook() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _MyAccountAddressBook);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_MyAccountAddressBook)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "renderAddress", function (address, index) {
      var getDefaultPostfix = _this.props.getDefaultPostfix;
      var addressNumber = index + 1;
      var postfix = getDefaultPostfix(address);
      return (
        /*#__PURE__*/
        _checkBEM(React, _MyAccountAddressTable__WEBPACK_IMPORTED_MODULE_3__["default"], {
          title: __('Address #%s%s', addressNumber, postfix),
          showActions: true,
          address: address,
          key: addressNumber
        })
      );
    });

    return _this;
  }

  _createClass(_MyAccountAddressBook, [{
    key: "renderPopup",
    value: function renderPopup() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _MyAccountAddressPopup__WEBPACK_IMPORTED_MODULE_2__["default"], null)
      );
    }
  }, {
    key: "renderNoAddresses",
    value: function renderNoAddresses() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", null,
        /*#__PURE__*/
        _checkBEM(React, "p", null, __('You have no configured addresses.')))
      );
    }
  }, {
    key: "renderActions",
    value: function renderActions() {
      var showCreateNewPopup = this.props.showCreateNewPopup;
      return (
        /*#__PURE__*/
        _checkBEM(React, "button", {
          block: "MyAccountAddressBook",
          elem: "Button",
          mix: {
            block: 'Button'
          },
          onClick: showCreateNewPopup
        }, __('Add new address'))
      );
    }
  }, {
    key: "renderAddressList",
    value: function renderAddressList() {
      var _this$props$customer$ = this.props.customer.addresses,
          addresses = _this$props$customer$ === void 0 ? [] : _this$props$customer$;

      if (!addresses.length) {
        return this.renderNoAddresses();
      }

      return addresses.map(this.renderAddress);
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "MyAccountAddressBook"
        }, this.renderActions(), this.renderAddressList(), this.renderPopup())
      );
    }
  }]);

  return _MyAccountAddressBook;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_MyAccountAddressBook, 'name', {
  value: 'MyAccountAddressBook'
});

var MyAccountAddressBook = middleware(_MyAccountAddressBook, "Component/MyAccountAddressBook/Component");

_defineProperty(MyAccountAddressBook, "propTypes", {
  customer: _type_Account__WEBPACK_IMPORTED_MODULE_4__["customerType"].isRequired,
  getDefaultPostfix: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  showCreateNewPopup: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (MyAccountAddressBook);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/MyAccountAddressBook/MyAccountAddressBook.container.js":
/*!**********************************************************************************!*\
  !*** ./src/app/component/MyAccountAddressBook/MyAccountAddressBook.container.js ***!
  \**********************************************************************************/
/*! exports provided: mapStateToProps, mapDispatchToProps, _MyAccountAddressBookContainer, MyAccountAddressBookContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, __, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MyAccountAddressBookContainer", function() { return _MyAccountAddressBookContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountAddressBookContainer", function() { return MyAccountAddressBookContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _MyAccountAddressPopup_MyAccountAddressPopup_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../MyAccountAddressPopup/MyAccountAddressPopup.config */ "./src/app/component/MyAccountAddressPopup/MyAccountAddressPopup.config.js");
/* harmony import */ var _store_Popup_Popup_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/Popup/Popup.action */ "./src/app/store/Popup/Popup.action.js");
/* harmony import */ var _type_Account__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../type/Account */ "./src/app/type/Account.js");
/* harmony import */ var _MyAccountAddressBook_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MyAccountAddressBook.component */ "./src/app/component/MyAccountAddressBook/MyAccountAddressBook.component.js");
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







/** @namespace Component/MyAccountAddressBook/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    customer: state.MyAccountReducer.customer
  };
}, "Component/MyAccountAddressBook/Container/mapStateToProps");
/** @namespace Component/MyAccountAddressBook/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    showPopup: function showPopup(payload) {
      return dispatch(Object(_store_Popup_Popup_action__WEBPACK_IMPORTED_MODULE_4__["showPopup"])(_MyAccountAddressPopup_MyAccountAddressPopup_config__WEBPACK_IMPORTED_MODULE_3__["ADDRESS_POPUP_ID"], payload));
    }
  };
}, "Component/MyAccountAddressBook/Container/mapDispatchToProps");
/** @namespace Component/MyAccountAddressBook/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MyAccountAddressBookContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MyAccountAddressBookContainer, _Extensible);

  function _MyAccountAddressBookContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _MyAccountAddressBookContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_MyAccountAddressBookContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      getDefaultPostfix: _this.getDefaultPostfix.bind(_assertThisInitialized(_this)),
      showCreateNewPopup: _this.showCreateNewPopup.bind(_assertThisInitialized(_this))
    });

    return _this;
  }

  _createClass(_MyAccountAddressBookContainer, [{
    key: "getDefaultPostfix",
    value: function getDefaultPostfix(address) {
      var default_billing = address.default_billing,
          default_shipping = address.default_shipping;

      if (!default_billing && !default_shipping) {
        return '';
      }

      if (default_billing && default_shipping) {
        return __(' - default shipping, billing address');
      }

      if (default_billing) {
        return __(' - default billing address');
      }

      return __(' - default shipping address');
    }
  }, {
    key: "showCreateNewPopup",
    value: function showCreateNewPopup() {
      var showPopup = this.props.showPopup;
      showPopup({
        action: _MyAccountAddressPopup_MyAccountAddressPopup_config__WEBPACK_IMPORTED_MODULE_3__["ADD_ADDRESS"],
        title: __('Add new address'),
        address: {}
      });
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _MyAccountAddressBook_component__WEBPACK_IMPORTED_MODULE_6__["default"], _extends({}, this.props, this.containerFunctions))
      );
    }
  }]);

  return _MyAccountAddressBookContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_MyAccountAddressBookContainer, 'name', {
  value: 'MyAccountAddressBookContainer'
});

var MyAccountAddressBookContainer = middleware(_MyAccountAddressBookContainer, "Component/MyAccountAddressBook/Container");

_defineProperty(MyAccountAddressBookContainer, "propTypes", {
  customer: _type_Account__WEBPACK_IMPORTED_MODULE_5__["customerType"].isRequired,
  showPopup: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(MyAccountAddressBookContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/MyAccountAddressBook/MyAccountAddressBook.style.scss":
/*!********************************************************************************!*\
  !*** ./src/app/component/MyAccountAddressBook/MyAccountAddressBook.style.scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291338869
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/MyAccountAddressBook/index.js":
/*!*********************************************************!*\
  !*** ./src/app/component/MyAccountAddressBook/index.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyAccountAddressBook_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MyAccountAddressBook.container */ "./src/app/component/MyAccountAddressBook/MyAccountAddressBook.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _MyAccountAddressBook_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/MyAccountAddressForm/MyAccountAddressForm.container.js":
/*!**********************************************************************************!*\
  !*** ./src/app/component/MyAccountAddressForm/MyAccountAddressForm.container.js ***!
  \**********************************************************************************/
/*! exports provided: mapStateToProps, mapDispatchToProps, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _MyAccountAddressForm_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MyAccountAddressForm.component */ "./src/app/component/MyAccountAddressForm/MyAccountAddressForm.component.js");
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


/** @namespace Component/MyAccountAddressForm/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    countries: state.ConfigReducer.countries,
    default_country: state.ConfigReducer.default_country,
    addressLinesQty: state.ConfigReducer.address_lines_quantity,
    showVatNumber: state.ConfigReducer.show_vat_number_on_storefront
  };
}, "Component/MyAccountAddressForm/Container/mapStateToProps");
/** @namespace Component/MyAccountAddressForm/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars

var mapDispatchToProps = middleware(function (dispatch) {
  return {};
}, "Component/MyAccountAddressForm/Container/mapDispatchToProps");
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["connect"])(mapStateToProps, mapDispatchToProps)(_MyAccountAddressForm_component__WEBPACK_IMPORTED_MODULE_1__["default"]));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/MyAccountAddressForm/index.js":
/*!*********************************************************!*\
  !*** ./src/app/component/MyAccountAddressForm/index.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyAccountAddressForm_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MyAccountAddressForm.container */ "./src/app/component/MyAccountAddressForm/MyAccountAddressForm.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _MyAccountAddressForm_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/MyAccountAddressPopup/MyAccountAddressPopup.component.js":
/*!************************************************************************************!*\
  !*** ./src/app/component/MyAccountAddressPopup/MyAccountAddressPopup.component.js ***!
  \************************************************************************************/
/*! exports provided: _MyAccountAddressPopup, MyAccountAddressPopup, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MyAccountAddressPopup", function() { return _MyAccountAddressPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountAddressPopup", function() { return MyAccountAddressPopup; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Loader */ "./src/app/component/Loader/index.js");
/* harmony import */ var _MyAccountAddressForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../MyAccountAddressForm */ "./src/app/component/MyAccountAddressForm/index.js");
/* harmony import */ var _MyAccountAddressTable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../MyAccountAddressTable */ "./src/app/component/MyAccountAddressTable/index.js");
/* harmony import */ var _Popup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Popup */ "./src/app/component/Popup/index.js");
/* harmony import */ var _type_Account__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../type/Account */ "./src/app/type/Account.js");
/* harmony import */ var _MyAccountAddressPopup_config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./MyAccountAddressPopup.config */ "./src/app/component/MyAccountAddressPopup/MyAccountAddressPopup.config.js");
/* harmony import */ var _MyAccountAddressPopup_style__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./MyAccountAddressPopup.style */ "./src/app/component/MyAccountAddressPopup/MyAccountAddressPopup.style.scss");
/* harmony import */ var _MyAccountAddressPopup_style__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_MyAccountAddressPopup_style__WEBPACK_IMPORTED_MODULE_8__);
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









/** @namespace Component/MyAccountAddressPopup/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MyAccountAddressPopup =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MyAccountAddressPopup, _Extensible);

  function _MyAccountAddressPopup() {
    _classCallCheck(this, _MyAccountAddressPopup);

    return _possibleConstructorReturn(this, _getPrototypeOf(_MyAccountAddressPopup).apply(this, arguments));
  }

  _createClass(_MyAccountAddressPopup, [{
    key: "renderAddressForm",
    value: function renderAddressForm() {
      var _this$props = this.props,
          address = _this$props.payload.address,
          handleAddress = _this$props.handleAddress;
      return (
        /*#__PURE__*/
        _checkBEM(React, _MyAccountAddressForm__WEBPACK_IMPORTED_MODULE_3__["default"], {
          address: address,
          onSave: handleAddress
        })
      );
    }
  }, {
    key: "renderDeleteNotice",
    value: function renderDeleteNotice() {
      var _this$props2 = this.props,
          address = _this$props2.payload.address,
          handleDeleteAddress = _this$props2.handleDeleteAddress;
      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null,
        /*#__PURE__*/
        _checkBEM(React, "p", null, __('Are you sure you want to delete this address?')),
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "MyAccountAddressPopup",
          elem: "Address"
        },
        /*#__PURE__*/
        _checkBEM(React, _MyAccountAddressTable__WEBPACK_IMPORTED_MODULE_4__["default"], {
          address: address,
          title: __('Address details')
        })),
        /*#__PURE__*/
        _checkBEM(React, "button", {
          block: "Button",
          onClick: handleDeleteAddress
        }, __('Yes, delete address')))
      );
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var action = this.props.payload.action;

      switch (action) {
        case _MyAccountAddressPopup_config__WEBPACK_IMPORTED_MODULE_7__["EDIT_ADDRESS"]:
        case _MyAccountAddressPopup_config__WEBPACK_IMPORTED_MODULE_7__["ADD_ADDRESS"]:
          return this.renderAddressForm();

        case _MyAccountAddressPopup_config__WEBPACK_IMPORTED_MODULE_7__["DELETE_ADDRESS"]:
          return this.renderDeleteNotice();

        default:
          return null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var isLoading = this.props.isLoading;
      return (
        /*#__PURE__*/
        _checkBEM(React, _Popup__WEBPACK_IMPORTED_MODULE_5__["default"], {
          id: _MyAccountAddressPopup_config__WEBPACK_IMPORTED_MODULE_7__["ADDRESS_POPUP_ID"],
          clickOutside: false,
          mix: {
            block: 'MyAccountAddressPopup'
          }
        },
        /*#__PURE__*/
        _checkBEM(React, _Loader__WEBPACK_IMPORTED_MODULE_2__["default"], {
          isLoading: isLoading
        }), this.renderContent())
      );
    }
  }]);

  return _MyAccountAddressPopup;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_MyAccountAddressPopup, 'name', {
  value: 'MyAccountAddressPopup'
});

var MyAccountAddressPopup = middleware(_MyAccountAddressPopup, "Component/MyAccountAddressPopup/Component");

_defineProperty(MyAccountAddressPopup, "propTypes", {
  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  handleAddress: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  handleDeleteAddress: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  payload: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
    action: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOf([_MyAccountAddressPopup_config__WEBPACK_IMPORTED_MODULE_7__["EDIT_ADDRESS"], _MyAccountAddressPopup_config__WEBPACK_IMPORTED_MODULE_7__["DELETE_ADDRESS"], _MyAccountAddressPopup_config__WEBPACK_IMPORTED_MODULE_7__["ADD_ADDRESS"]]),
    address: _type_Account__WEBPACK_IMPORTED_MODULE_6__["addressType"]
  }).isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (MyAccountAddressPopup);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/MyAccountAddressPopup/MyAccountAddressPopup.container.js":
/*!************************************************************************************!*\
  !*** ./src/app/component/MyAccountAddressPopup/MyAccountAddressPopup.container.js ***!
  \************************************************************************************/
/*! exports provided: MyAccountDispatcher, mapStateToProps, mapDispatchToProps, _MyAccountAddressPopupContainer, MyAccountAddressPopupContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountDispatcher", function() { return MyAccountDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MyAccountAddressPopupContainer", function() { return _MyAccountAddressPopupContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountAddressPopupContainer", function() { return MyAccountAddressPopupContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _query_MyAccount_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../query/MyAccount.query */ "./src/app/query/MyAccount.query.js");
/* harmony import */ var _store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/Navigation/Navigation.action */ "./src/app/store/Navigation/Navigation.action.js");
/* harmony import */ var _store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store/Navigation/Navigation.reducer */ "./src/app/store/Navigation/Navigation.reducer.js");
/* harmony import */ var _store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../store/Notification/Notification.action */ "./src/app/store/Notification/Notification.action.js");
/* harmony import */ var _store_Overlay_Overlay_action__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../store/Overlay/Overlay.action */ "./src/app/store/Overlay/Overlay.action.js");
/* harmony import */ var _type_Account__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../type/Account */ "./src/app/type/Account.js");
/* harmony import */ var _util_Request__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../util/Request */ "./src/app/util/Request/index.js");
/* harmony import */ var _MyAccountAddressPopup_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./MyAccountAddressPopup.component */ "./src/app/component/MyAccountAddressPopup/MyAccountAddressPopup.component.js");
/* harmony import */ var _MyAccountAddressPopup_config__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./MyAccountAddressPopup.config */ "./src/app/component/MyAccountAddressPopup/MyAccountAddressPopup.config.js");
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












var MyAccountDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/MyAccount/MyAccount.dispatcher */ "./src/app/store/MyAccount/MyAccount.dispatcher.js"));
/** @namespace Component/MyAccountAddressPopup/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    payload: state.PopupReducer.popupPayload[_MyAccountAddressPopup_config__WEBPACK_IMPORTED_MODULE_11__["ADDRESS_POPUP_ID"]] || {}
  };
}, "Component/MyAccountAddressPopup/Container/mapStateToProps");
/** @namespace Component/MyAccountAddressPopup/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    hideActiveOverlay: function hideActiveOverlay() {
      return dispatch(Object(_store_Overlay_Overlay_action__WEBPACK_IMPORTED_MODULE_7__["hideActiveOverlay"])());
    },
    showErrorNotification: function showErrorNotification(error) {
      return dispatch(Object(_store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_6__["showNotification"])('error', error[0].message));
    },
    showSuccessNotification: function showSuccessNotification(message) {
      return dispatch(Object(_store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_6__["showNotification"])('success', message));
    },
    updateCustomerDetails: function updateCustomerDetails() {
      return MyAccountDispatcher.then(function (_ref) {
        var dispatcher = _ref.default;
        return dispatcher.requestCustomerData(dispatch);
      });
    },
    goToPreviousHeaderState: function goToPreviousHeaderState() {
      return dispatch(Object(_store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_4__["goToPreviousNavigationState"])(_store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_5__["TOP_NAVIGATION_TYPE"]));
    }
  };
}, "Component/MyAccountAddressPopup/Container/mapDispatchToProps");
/** @namespace Component/MyAccountAddressPopup/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MyAccountAddressPopupContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MyAccountAddressPopupContainer, _Extensible);

  function _MyAccountAddressPopupContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _MyAccountAddressPopupContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_MyAccountAddressPopupContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isLoading: false
    });

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      handleAddress: _this.handleAddress.bind(_assertThisInitialized(_this)),
      handleDeleteAddress: _this.handleDeleteAddress.bind(_assertThisInitialized(_this))
    });

    _defineProperty(_assertThisInitialized(_this), "handleAfterAction", function () {
      var _this$props = _this.props,
          hideActiveOverlay = _this$props.hideActiveOverlay,
          updateCustomerDetails = _this$props.updateCustomerDetails,
          showErrorNotification = _this$props.showErrorNotification,
          goToPreviousHeaderState = _this$props.goToPreviousHeaderState;
      updateCustomerDetails().then(
      /** @namespace Component/MyAccountAddressPopup/Container/updateCustomerDetailsThen */
      middleware(function () {
        _this.setState({
          isLoading: false
        }, function () {
          hideActiveOverlay();
          goToPreviousHeaderState();
        });
      }, "Component/MyAccountAddressPopup/Container/updateCustomerDetailsThen"), showErrorNotification);
    });

    _defineProperty(_assertThisInitialized(_this), "handleError", function (error) {
      var showErrorNotification = _this.props.showErrorNotification;
      showErrorNotification(error);

      _this.setState({
        isLoading: false
      });
    });

    return _this;
  }

  _createClass(_MyAccountAddressPopupContainer, [{
    key: "handleAddress",
    value: function handleAddress(address) {
      var id = this.props.payload.address.id;
      this.setState({
        isLoading: true
      });

      if (id) {
        return this.handleEditAddress(address);
      }

      return this.handleCreateAddress(address);
    }
  }, {
    key: "handleEditAddress",
    value: function handleEditAddress(address) {
      var id = this.props.payload.address.id;
      var query = _query_MyAccount_query__WEBPACK_IMPORTED_MODULE_3__["default"].getUpdateAddressMutation(id, address);
      Object(_util_Request__WEBPACK_IMPORTED_MODULE_9__["fetchMutation"])(query).then(this.handleAfterAction, this.handleError);
    }
  }, {
    key: "handleDeleteAddress",
    value: function handleDeleteAddress() {
      var id = this.props.payload.address.id;
      this.setState({
        isLoading: true
      });
      var query = _query_MyAccount_query__WEBPACK_IMPORTED_MODULE_3__["default"].getDeleteAddressMutation(id);
      Object(_util_Request__WEBPACK_IMPORTED_MODULE_9__["fetchMutation"])(query).then(this.handleAfterAction, this.handleError);
    }
  }, {
    key: "handleCreateAddress",
    value: function handleCreateAddress(address) {
      var query = _query_MyAccount_query__WEBPACK_IMPORTED_MODULE_3__["default"].getCreateAddressMutation(address);
      Object(_util_Request__WEBPACK_IMPORTED_MODULE_9__["fetchMutation"])(query).then(this.handleAfterAction, this.handleError);
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _MyAccountAddressPopup_component__WEBPACK_IMPORTED_MODULE_10__["default"], _extends({}, this.props, this.state, this.containerFunctions))
      );
    }
  }]);

  return _MyAccountAddressPopupContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_MyAccountAddressPopupContainer, 'name', {
  value: 'MyAccountAddressPopupContainer'
});

var MyAccountAddressPopupContainer = middleware(_MyAccountAddressPopupContainer, "Component/MyAccountAddressPopup/Container");

_defineProperty(MyAccountAddressPopupContainer, "propTypes", {
  showErrorNotification: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  updateCustomerDetails: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  hideActiveOverlay: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  goToPreviousHeaderState: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  payload: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
    address: _type_Account__WEBPACK_IMPORTED_MODULE_8__["addressType"]
  }).isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(MyAccountAddressPopupContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/MyAccountAddressPopup/MyAccountAddressPopup.style.scss":
/*!**********************************************************************************!*\
  !*** ./src/app/component/MyAccountAddressPopup/MyAccountAddressPopup.style.scss ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340917
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/MyAccountAddressPopup/index.js":
/*!**********************************************************!*\
  !*** ./src/app/component/MyAccountAddressPopup/index.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyAccountAddressPopup_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MyAccountAddressPopup.container */ "./src/app/component/MyAccountAddressPopup/MyAccountAddressPopup.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _MyAccountAddressPopup_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/MyAccountAddressTable/index.js":
/*!**********************************************************!*\
  !*** ./src/app/component/MyAccountAddressTable/index.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyAccountAddressTable_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MyAccountAddressTable.container */ "./src/app/component/MyAccountAddressTable/MyAccountAddressTable.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _MyAccountAddressTable_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/MyAccountCreateAccount/MyAccountCreateAccount.component.js":
/*!**************************************************************************************!*\
  !*** ./src/app/component/MyAccountCreateAccount/MyAccountCreateAccount.component.js ***!
  \**************************************************************************************/
/*! exports provided: _MyAccountCreateAccount, MyAccountCreateAccount, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MyAccountCreateAccount", function() { return _MyAccountCreateAccount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountCreateAccount", function() { return MyAccountCreateAccount; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Field */ "./src/app/component/Field/index.js");
/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Form */ "./src/app/component/Form/index.js");
/* harmony import */ var _type_Account__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../type/Account */ "./src/app/type/Account.js");
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





/** @namespace Component/MyAccountCreateAccount/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MyAccountCreateAccount =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MyAccountCreateAccount, _Extensible);

  function _MyAccountCreateAccount() {
    _classCallCheck(this, _MyAccountCreateAccount);

    return _possibleConstructorReturn(this, _getPrototypeOf(_MyAccountCreateAccount).apply(this, arguments));
  }

  _createClass(_MyAccountCreateAccount, [{
    key: "renderVatNumberField",
    value: function renderVatNumberField() {
      var _this$props = this.props,
          showTaxVatNumber = _this$props.showTaxVatNumber,
          vatNumberValidation = _this$props.vatNumberValidation;

      if (!showTaxVatNumber) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, _Field__WEBPACK_IMPORTED_MODULE_2__["default"], {
          type: "text",
          label: __('Tax/VAT Number'),
          id: "taxvat",
          name: "taxvat",
          validation: vatNumberValidation
        })
      );
    }
  }, {
    key: "renderCreateAccountPersonalInfoFields",
    value: function renderCreateAccountPersonalInfoFields() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "fieldset", {
          block: "MyAccountOverlay",
          elem: "Legend"
        },
        /*#__PURE__*/
        _checkBEM(React, "legend", null, __('Personal Information')),
        /*#__PURE__*/
        _checkBEM(React, _Field__WEBPACK_IMPORTED_MODULE_2__["default"], {
          type: "text",
          label: __('First Name'),
          id: "firstname",
          name: "firstname",
          autocomplete: "given-name",
          validation: ['notEmpty']
        }),
        /*#__PURE__*/
        _checkBEM(React, _Field__WEBPACK_IMPORTED_MODULE_2__["default"], {
          type: "text",
          label: __('Last Name'),
          id: "lastname",
          name: "lastname",
          autocomplete: "family-name",
          validation: ['notEmpty']
        }), this.renderVatNumberField(),
        /*#__PURE__*/
        _checkBEM(React, _Field__WEBPACK_IMPORTED_MODULE_2__["default"], {
          type: "checkbox",
          value: "is_subscribed",
          label: __('Subscribe to newsletter'),
          id: "is_subscribed",
          mix: {
            block: 'MyAccountOverlay',
            elem: 'Checkbox'
          },
          name: "is_subscribed"
        }))
      );
    }
  }, {
    key: "renderCreateAccountSignUpInfoFields",
    value: function renderCreateAccountSignUpInfoFields() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "fieldset", {
          block: "MyAccountOverlay",
          elem: "Legend"
        },
        /*#__PURE__*/
        _checkBEM(React, "legend", null, __('Sign-Up Information')),
        /*#__PURE__*/
        _checkBEM(React, _Field__WEBPACK_IMPORTED_MODULE_2__["default"], {
          type: "text",
          label: __('Email'),
          id: "email",
          name: "email",
          autocomplete: "email",
          validation: ['notEmpty', 'email']
        }),
        /*#__PURE__*/
        _checkBEM(React, _Field__WEBPACK_IMPORTED_MODULE_2__["default"], {
          type: "password",
          label: __('Password'),
          id: "password",
          name: "password",
          autocomplete: "new-password",
          validation: ['notEmpty', 'password']
        }),
        /*#__PURE__*/
        _checkBEM(React, _Field__WEBPACK_IMPORTED_MODULE_2__["default"], {
          type: "password",
          label: __('Confirm password'),
          id: "confirm_password",
          name: "confirm_password",
          autocomplete: "new-password",
          validation: ['notEmpty', 'password', 'password_match']
        }))
      );
    }
  }, {
    key: "renderSubmitButton",
    value: function renderSubmitButton() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "MyAccountOverlay",
          elem: "Buttons"
        },
        /*#__PURE__*/
        _checkBEM(React, "button", {
          block: "Button",
          type: "submit"
        }, __('Sign up')))
      );
    }
  }, {
    key: "renderCreateAccountForm",
    value: function renderCreateAccountForm() {
      var _this$props2 = this.props,
          onCreateAccountAttempt = _this$props2.onCreateAccountAttempt,
          onCreateAccountSuccess = _this$props2.onCreateAccountSuccess;
      return (
        /*#__PURE__*/
        _checkBEM(React, _Form__WEBPACK_IMPORTED_MODULE_3__["default"], {
          key: "create-account",
          onSubmit: onCreateAccountAttempt,
          onSubmitSuccess: onCreateAccountSuccess,
          onSubmitError: onCreateAccountAttempt
        }, this.renderCreateAccountPersonalInfoFields(), this.renderCreateAccountSignUpInfoFields(), this.renderSubmitButton())
      );
    }
  }, {
    key: "renderAdditionalField",
    value: function renderAdditionalField() {
      var _this$props3 = this.props,
          state = _this$props3.state,
          handleSignIn = _this$props3.handleSignIn;
      return (
        /*#__PURE__*/
        _checkBEM(React, "article", {
          block: "MyAccountOverlay",
          elem: "Additional",
          mods: {
            state: state
          }
        },
        /*#__PURE__*/
        _checkBEM(React, "section", null,
        /*#__PURE__*/
        _checkBEM(React, "h4", null, __('Already have an account?')),
        /*#__PURE__*/
        _checkBEM(React, "button", {
          block: "Button",
          mods: {
            likeLink: true
          },
          onClick: handleSignIn
        }, __('Sign in here'))))
      );
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null, this.renderCreateAccountForm(), this.renderAdditionalField())
      );
    }
  }]);

  return _MyAccountCreateAccount;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_MyAccountCreateAccount, 'name', {
  value: 'MyAccountCreateAccount'
});

var MyAccountCreateAccount = middleware(_MyAccountCreateAccount, "Component/MyAccountCreateAccount/Component");

_defineProperty(MyAccountCreateAccount, "propTypes", {
  state: _type_Account__WEBPACK_IMPORTED_MODULE_4__["signInStateType"].isRequired,
  onCreateAccountAttempt: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  onCreateAccountSuccess: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  handleSignIn: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  showTaxVatNumber: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  vatNumberValidation: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.array.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (MyAccountCreateAccount);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/MyAccountCreateAccount/MyAccountCreateAccount.config.js":
/*!***********************************************************************************!*\
  !*** ./src/app/component/MyAccountCreateAccount/MyAccountCreateAccount.config.js ***!
  \***********************************************************************************/
/*! exports provided: SHOW_VAT_NUMBER_REQUIRED, SHOW_VAT_NUMBER_OPTIONAL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHOW_VAT_NUMBER_REQUIRED", function() { return SHOW_VAT_NUMBER_REQUIRED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHOW_VAT_NUMBER_OPTIONAL", function() { return SHOW_VAT_NUMBER_OPTIONAL; });
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
var SHOW_VAT_NUMBER_REQUIRED = 'req';
var SHOW_VAT_NUMBER_OPTIONAL = 'opt';

/***/ }),

/***/ "./src/app/component/MyAccountCreateAccount/MyAccountCreateAccount.container.js":
/*!**************************************************************************************!*\
  !*** ./src/app/component/MyAccountCreateAccount/MyAccountCreateAccount.container.js ***!
  \**************************************************************************************/
/*! exports provided: MyAccountDispatcher, mapStateToProps, mapDispatchToProps, _MyAccountCreateAccountContainer, MyAccountCreateAccountContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, __, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountDispatcher", function() { return MyAccountDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MyAccountCreateAccountContainer", function() { return _MyAccountCreateAccountContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountCreateAccountContainer", function() { return MyAccountCreateAccountContainer; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _MyAccountOverlay_MyAccountOverlay_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../MyAccountOverlay/MyAccountOverlay.config */ "./src/app/component/MyAccountOverlay/MyAccountOverlay.config.js");
/* harmony import */ var _store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store/Notification/Notification.action */ "./src/app/store/Notification/Notification.action.js");
/* harmony import */ var _MyAccountCreateAccount_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MyAccountCreateAccount.component */ "./src/app/component/MyAccountCreateAccount/MyAccountCreateAccount.component.js");
/* harmony import */ var _MyAccountCreateAccount_config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./MyAccountCreateAccount.config */ "./src/app/component/MyAccountCreateAccount/MyAccountCreateAccount.config.js");


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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







var MyAccountDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/MyAccount/MyAccount.dispatcher */ "./src/app/store/MyAccount/MyAccount.dispatcher.js"));
/** @namespace Component/MyAccountCreateAccount/Container/mapStateToProps */
// eslint-disable-next-line no-unused-vars

var mapStateToProps = middleware(function (state) {
  return {
    isLoading: state.MyAccountReducer.isLoading,
    showTaxVatNumber: state.ConfigReducer.show_tax_vat_number
  };
}, "Component/MyAccountCreateAccount/Container/mapStateToProps");
/** @namespace Component/MyAccountCreateAccount/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    createAccount: function createAccount(options) {
      return MyAccountDispatcher.then(function (_ref) {
        var dispatcher = _ref.default;
        return dispatcher.createAccount(options, dispatch);
      });
    },
    showNotification: function showNotification(type, message) {
      return dispatch(Object(_store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_5__["showNotification"])(type, message));
    }
  };
}, "Component/MyAccountCreateAccount/Container/mapDispatchToProps");
/** @namespace Component/MyAccountCreateAccount/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MyAccountCreateAccountContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MyAccountCreateAccountContainer, _Extensible);

  function _MyAccountCreateAccountContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _MyAccountCreateAccountContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_MyAccountCreateAccountContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerProps", {
      vatNumberValidation: _this.getVatNumberValidation()
    });

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      onCreateAccountSuccess: _this.onCreateAccountSuccess.bind(_assertThisInitialized(_this)),
      onCreateAccountAttempt: _this.onCreateAccountAttempt.bind(_assertThisInitialized(_this))
    });

    return _this;
  }

  _createClass(_MyAccountCreateAccountContainer, [{
    key: "getVatNumberValidation",
    value: function getVatNumberValidation() {
      var showTaxVatNumber = this.props.showTaxVatNumber;

      if (showTaxVatNumber === _MyAccountCreateAccount_config__WEBPACK_IMPORTED_MODULE_7__["SHOW_VAT_NUMBER_REQUIRED"]) {
        return ['notEmpty'];
      }

      return [];
    }
  }, {
    key: "onCreateAccountAttempt",
    value: function onCreateAccountAttempt(_, invalidFields) {
      var _this$props = this.props,
          showNotification = _this$props.showNotification,
          setLoadingState = _this$props.setLoadingState;

      if (invalidFields) {
        showNotification('info', __('Incorrect data! Please resolve all field validation errors.'));
      }

      setLoadingState(!invalidFields);
    }
  }, {
    key: "onCreateAccountSuccess",
    value: function () {
      var _onCreateAccountSuccess = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(fields) {
        var _this$props2, createAccount, onSignIn, setSignInState, setLoadingState, isLoading, password, email, firstname, lastname, is_subscribed, taxvat, customerData, code;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props2 = this.props, createAccount = _this$props2.createAccount, onSignIn = _this$props2.onSignIn, setSignInState = _this$props2.setSignInState, setLoadingState = _this$props2.setLoadingState, isLoading = _this$props2.isLoading;
                password = fields.password, email = fields.email, firstname = fields.firstname, lastname = fields.lastname, is_subscribed = fields.is_subscribed, taxvat = fields.taxvat;
                customerData = {
                  customer: {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    is_subscribed: is_subscribed,
                    taxvat: taxvat
                  },
                  password: password
                };

                if (!isLoading) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return");

              case 5:
                try {
                  code = createAccount(customerData); // if user needs confirmation

                  if (code === 2) {
                    setSignInState(_MyAccountOverlay_MyAccountOverlay_config__WEBPACK_IMPORTED_MODULE_4__["STATE_CONFIRM_EMAIL"]);
                  } else {
                    onSignIn();
                  }
                } finally {
                  setLoadingState(false);
                }

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onCreateAccountSuccess(_x) {
        return _onCreateAccountSuccess.apply(this, arguments);
      }

      return onCreateAccountSuccess;
    }()
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _MyAccountCreateAccount_component__WEBPACK_IMPORTED_MODULE_6__["default"], _extends({}, this.props, this.containerProps, this.containerFunctions))
      );
    }
  }]);

  return _MyAccountCreateAccountContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_2__["PureComponent"]));
Object.defineProperty(_MyAccountCreateAccountContainer, 'name', {
  value: 'MyAccountCreateAccountContainer'
});

var MyAccountCreateAccountContainer = middleware(_MyAccountCreateAccountContainer, "Component/MyAccountCreateAccount/Container");

_defineProperty(MyAccountCreateAccountContainer, "propTypes", {
  createAccount: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  onSignIn: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  setSignInState: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  setLoadingState: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  showNotification: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired,
  showTaxVatNumber: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(MyAccountCreateAccountContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/MyAccountCreateAccount/index.js":
/*!***********************************************************!*\
  !*** ./src/app/component/MyAccountCreateAccount/index.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyAccountCreateAccount_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MyAccountCreateAccount.container */ "./src/app/component/MyAccountCreateAccount/MyAccountCreateAccount.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _MyAccountCreateAccount_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/MyAccountCustomerForm/MyAccountCustomerForm.component.js":
/*!************************************************************************************!*\
  !*** ./src/app/component/MyAccountCustomerForm/MyAccountCustomerForm.component.js ***!
  \************************************************************************************/
/*! exports provided: _MyAccountCustomerForm, MyAccountCustomerForm, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, __, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MyAccountCustomerForm", function() { return _MyAccountCustomerForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountCustomerForm", function() { return MyAccountCustomerForm; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _FieldForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FieldForm */ "./src/app/component/FieldForm/index.js");
/* harmony import */ var _type_Account__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../type/Account */ "./src/app/type/Account.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

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



/** @namespace Component/MyAccountCustomerForm/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MyAccountCustomerForm =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MyAccountCustomerForm, _Extensible);

  function _MyAccountCustomerForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _MyAccountCustomerForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_MyAccountCustomerForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onFormSuccess", function (fields) {
      var onSave = _this.props.onSave;
      onSave(fields);
    });

    return _this;
  }

  _createClass(_MyAccountCustomerForm, [{
    key: "getDefaultValues",
    value: function getDefaultValues(fieldEntry) {
      var _fieldEntry = _slicedToArray(fieldEntry, 1),
          key = _fieldEntry[0];

      var value = this.props.customer[key];
      return _objectSpread2(_objectSpread2({}, _get(_getPrototypeOf(_MyAccountCustomerForm.prototype), "getDefaultValues", this).call(this, fieldEntry)), {}, {
        value: value
      });
    }
  }, {
    key: "getVatField",
    value: function getVatField() {
      var _this$props = this.props,
          showTaxVatNumber = _this$props.showTaxVatNumber,
          vatNumberValidation = _this$props.vatNumberValidation;

      if (!showTaxVatNumber) {
        return {};
      }

      return {
        taxvat: {
          label: __('Tax/VAT Number'),
          validation: vatNumberValidation
        }
      };
    }
  }, {
    key: "renderActions",
    value: function renderActions() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "button", {
          type: "submit",
          block: "Button",
          mix: {
            block: 'MyAccount',
            elem: 'Button'
          }
        }, __('Save customer'))
      );
    }
  }, {
    key: "fieldMap",
    get: function get() {
      return _objectSpread2({
        firstname: {
          label: __('First name'),
          validation: ['notEmpty']
        },
        lastname: {
          label: __('Last name'),
          validation: ['notEmpty']
        }
      }, this.getVatField());
    }
  }]);

  return _MyAccountCustomerForm;
}(Extensible(_FieldForm__WEBPACK_IMPORTED_MODULE_1__["default"]));
Object.defineProperty(_MyAccountCustomerForm, 'name', {
  value: 'MyAccountCustomerForm'
});

var MyAccountCustomerForm = middleware(_MyAccountCustomerForm, "Component/MyAccountCustomerForm/Component");

_defineProperty(MyAccountCustomerForm, "propTypes", {
  customer: _type_Account__WEBPACK_IMPORTED_MODULE_2__["customerType"].isRequired,
  onSave: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  vatNumberValidation: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.array.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (MyAccountCustomerForm);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/MyAccountCustomerForm/MyAccountCustomerForm.container.js":
/*!************************************************************************************!*\
  !*** ./src/app/component/MyAccountCustomerForm/MyAccountCustomerForm.container.js ***!
  \************************************************************************************/
/*! exports provided: mapStateToProps, mapDispatchToProps, _MyAccountCustomerFormContainer, MyAccountCustomerFormContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MyAccountCustomerFormContainer", function() { return _MyAccountCustomerFormContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountCustomerFormContainer", function() { return MyAccountCustomerFormContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _MyAccountCreateAccount_MyAccountCreateAccount_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../MyAccountCreateAccount/MyAccountCreateAccount.config */ "./src/app/component/MyAccountCreateAccount/MyAccountCreateAccount.config.js");
/* harmony import */ var _MyAccountCustomerForm_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MyAccountCustomerForm.component */ "./src/app/component/MyAccountCustomerForm/MyAccountCustomerForm.component.js");
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





/** @namespace Component/MyAccountCustomerForm/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    showTaxVatNumber: state.ConfigReducer.show_tax_vat_number
  };
}, "Component/MyAccountCustomerForm/Container/mapStateToProps");
/** @namespace Component/MyAccountCustomerForm/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function () {
  return {};
}, "Component/MyAccountCustomerForm/Container/mapDispatchToProps");
/** @namespace Component/MyAccountCustomerForm/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MyAccountCustomerFormContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MyAccountCustomerFormContainer, _Extensible);

  function _MyAccountCustomerFormContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _MyAccountCustomerFormContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_MyAccountCustomerFormContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerProps", {
      vatNumberValidation: _this.getVatNumberValidation()
    });

    return _this;
  }

  _createClass(_MyAccountCustomerFormContainer, [{
    key: "getVatNumberValidation",
    value: function getVatNumberValidation() {
      var showTaxVatNumber = this.props.showTaxVatNumber;

      if (showTaxVatNumber === _MyAccountCreateAccount_MyAccountCreateAccount_config__WEBPACK_IMPORTED_MODULE_3__["SHOW_VAT_NUMBER_REQUIRED"]) {
        return ['notEmpty'];
      }

      return [];
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _MyAccountCustomerForm_component__WEBPACK_IMPORTED_MODULE_4__["default"], _extends({}, this.props, this.containerProps))
      );
    }
  }]);

  return _MyAccountCustomerFormContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_MyAccountCustomerFormContainer, 'name', {
  value: 'MyAccountCustomerFormContainer'
});

var MyAccountCustomerFormContainer = middleware(_MyAccountCustomerFormContainer, "Component/MyAccountCustomerForm/Container");

_defineProperty(MyAccountCustomerFormContainer, "propTypes", {
  showTaxVatNumber: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(MyAccountCustomerFormContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/MyAccountCustomerForm/index.js":
/*!**********************************************************!*\
  !*** ./src/app/component/MyAccountCustomerForm/index.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyAccountCustomerForm_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MyAccountCustomerForm.container */ "./src/app/component/MyAccountCustomerForm/MyAccountCustomerForm.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _MyAccountCustomerForm_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/MyAccountCustomerPopup/MyAccountCustomerPopup.component.js":
/*!**************************************************************************************!*\
  !*** ./src/app/component/MyAccountCustomerPopup/MyAccountCustomerPopup.component.js ***!
  \**************************************************************************************/
/*! exports provided: _MyAccountCustomerPopup, MyAccountCustomerPopup, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MyAccountCustomerPopup", function() { return _MyAccountCustomerPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountCustomerPopup", function() { return MyAccountCustomerPopup; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Loader */ "./src/app/component/Loader/index.js");
/* harmony import */ var _MyAccountCustomerForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../MyAccountCustomerForm */ "./src/app/component/MyAccountCustomerForm/index.js");
/* harmony import */ var _MyAccountPasswordForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../MyAccountPasswordForm */ "./src/app/component/MyAccountPasswordForm/index.js");
/* harmony import */ var _Popup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Popup */ "./src/app/component/Popup/index.js");
/* harmony import */ var _type_Account__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../type/Account */ "./src/app/type/Account.js");
/* harmony import */ var _MyAccountCustomerPopup_config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./MyAccountCustomerPopup.config */ "./src/app/component/MyAccountCustomerPopup/MyAccountCustomerPopup.config.js");
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








/** @namespace Component/MyAccountCustomerPopup/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MyAccountCustomerPopup =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MyAccountCustomerPopup, _Extensible);

  function _MyAccountCustomerPopup() {
    _classCallCheck(this, _MyAccountCustomerPopup);

    return _possibleConstructorReturn(this, _getPrototypeOf(_MyAccountCustomerPopup).apply(this, arguments));
  }

  _createClass(_MyAccountCustomerPopup, [{
    key: "renderChangePasswordForm",
    value: function renderChangePasswordForm() {
      var onPasswordChange = this.props.onPasswordChange;
      return (
        /*#__PURE__*/
        _checkBEM(React, _MyAccountPasswordForm__WEBPACK_IMPORTED_MODULE_4__["default"], {
          onPasswordChange: onPasswordChange
        })
      );
    }
  }, {
    key: "renderCustomerForm",
    value: function renderCustomerForm() {
      var _this$props = this.props,
          customer = _this$props.payload.customer,
          onCustomerSave = _this$props.onCustomerSave;
      return (
        /*#__PURE__*/
        _checkBEM(React, _MyAccountCustomerForm__WEBPACK_IMPORTED_MODULE_3__["default"], {
          customer: customer,
          onSave: onCustomerSave
        })
      );
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var action = this.props.payload.action;

      switch (action) {
        case _MyAccountCustomerPopup_config__WEBPACK_IMPORTED_MODULE_7__["CHANGE_PASSWORD"]:
          return this.renderChangePasswordForm();

        case _MyAccountCustomerPopup_config__WEBPACK_IMPORTED_MODULE_7__["EDIT_CUSTOMER"]:
          return this.renderCustomerForm();

        default:
          return null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var isLoading = this.props.isLoading;
      return (
        /*#__PURE__*/
        _checkBEM(React, _Popup__WEBPACK_IMPORTED_MODULE_5__["default"], {
          id: _MyAccountCustomerPopup_config__WEBPACK_IMPORTED_MODULE_7__["CUSTOMER_POPUP_ID"],
          clickOutside: false,
          mix: {
            block: 'MyAccountCustomerPopup'
          }
        },
        /*#__PURE__*/
        _checkBEM(React, _Loader__WEBPACK_IMPORTED_MODULE_2__["default"], {
          isLoading: isLoading
        }), this.renderContent())
      );
    }
  }]);

  return _MyAccountCustomerPopup;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_MyAccountCustomerPopup, 'name', {
  value: 'MyAccountCustomerPopup'
});

var MyAccountCustomerPopup = middleware(_MyAccountCustomerPopup, "Component/MyAccountCustomerPopup/Component");

_defineProperty(MyAccountCustomerPopup, "propTypes", {
  onCustomerSave: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  onPasswordChange: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  payload: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
    action: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOf([_MyAccountCustomerPopup_config__WEBPACK_IMPORTED_MODULE_7__["CHANGE_PASSWORD"], _MyAccountCustomerPopup_config__WEBPACK_IMPORTED_MODULE_7__["EDIT_CUSTOMER"]]),
    customer: _type_Account__WEBPACK_IMPORTED_MODULE_6__["customerType"]
  }).isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (MyAccountCustomerPopup);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/MyAccountCustomerPopup/MyAccountCustomerPopup.config.js":
/*!***********************************************************************************!*\
  !*** ./src/app/component/MyAccountCustomerPopup/MyAccountCustomerPopup.config.js ***!
  \***********************************************************************************/
/*! exports provided: CUSTOMER_POPUP_ID, CHANGE_PASSWORD, EDIT_CUSTOMER */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CUSTOMER_POPUP_ID", function() { return CUSTOMER_POPUP_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_PASSWORD", function() { return CHANGE_PASSWORD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_CUSTOMER", function() { return EDIT_CUSTOMER; });
/* eslint-disable import/prefer-default-export */

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
var CUSTOMER_POPUP_ID = 'MyAccountCustomerPopup';
var CHANGE_PASSWORD = 'CHANGE_PASSWORD';
var EDIT_CUSTOMER = 'EDIT_CUSTOMER';

/***/ }),

/***/ "./src/app/component/MyAccountCustomerPopup/MyAccountCustomerPopup.container.js":
/*!**************************************************************************************!*\
  !*** ./src/app/component/MyAccountCustomerPopup/MyAccountCustomerPopup.container.js ***!
  \**************************************************************************************/
/*! exports provided: mapStateToProps, mapDispatchToProps, _MyAccountCustomerPopupContainer, MyAccountCustomerPopupContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, __, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MyAccountCustomerPopupContainer", function() { return _MyAccountCustomerPopupContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountCustomerPopupContainer", function() { return MyAccountCustomerPopupContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _query_MyAccount_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../query/MyAccount.query */ "./src/app/query/MyAccount.query.js");
/* harmony import */ var _store_MyAccount_MyAccount_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/MyAccount/MyAccount.action */ "./src/app/store/MyAccount/MyAccount.action.js");
/* harmony import */ var _store_MyAccount_MyAccount_dispatcher__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store/MyAccount/MyAccount.dispatcher */ "./src/app/store/MyAccount/MyAccount.dispatcher.js");
/* harmony import */ var _store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../store/Navigation/Navigation.action */ "./src/app/store/Navigation/Navigation.action.js");
/* harmony import */ var _store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../store/Navigation/Navigation.reducer */ "./src/app/store/Navigation/Navigation.reducer.js");
/* harmony import */ var _store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../store/Notification/Notification.action */ "./src/app/store/Notification/Notification.action.js");
/* harmony import */ var _store_Overlay_Overlay_action__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../store/Overlay/Overlay.action */ "./src/app/store/Overlay/Overlay.action.js");
/* harmony import */ var _util_BrowserDatabase__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../util/BrowserDatabase */ "./src/app/util/BrowserDatabase/index.js");
/* harmony import */ var _util_Request__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../util/Request */ "./src/app/util/Request/index.js");
/* harmony import */ var _util_Request_QueryDispatcher__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../util/Request/QueryDispatcher */ "./src/app/util/Request/QueryDispatcher.js");
/* harmony import */ var _MyAccountCustomerPopup_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./MyAccountCustomerPopup.component */ "./src/app/component/MyAccountCustomerPopup/MyAccountCustomerPopup.component.js");
/* harmony import */ var _MyAccountCustomerPopup_config__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./MyAccountCustomerPopup.config */ "./src/app/component/MyAccountCustomerPopup/MyAccountCustomerPopup.config.js");
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















/** @namespace Component/MyAccountCustomerPopup/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    payload: state.PopupReducer.popupPayload[_MyAccountCustomerPopup_config__WEBPACK_IMPORTED_MODULE_14__["CUSTOMER_POPUP_ID"]] || {}
  };
}, "Component/MyAccountCustomerPopup/Container/mapStateToProps");
/** @namespace Component/MyAccountCustomerPopup/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    updateCustomer: function updateCustomer(customer) {
      return dispatch(Object(_store_MyAccount_MyAccount_action__WEBPACK_IMPORTED_MODULE_4__["updateCustomerDetails"])(customer));
    },
    goToPreviousHeaderState: function goToPreviousHeaderState() {
      return dispatch(Object(_store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_6__["goToPreviousNavigationState"])(_store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_7__["TOP_NAVIGATION_TYPE"]));
    },
    showErrorNotification: function showErrorNotification(error) {
      return dispatch(Object(_store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_8__["showNotification"])('error', error[0].message));
    },
    showSuccessNotification: function showSuccessNotification(message) {
      return dispatch(Object(_store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_8__["showNotification"])('success', message));
    },
    hideActiveOverlay: function hideActiveOverlay() {
      return dispatch(Object(_store_Overlay_Overlay_action__WEBPACK_IMPORTED_MODULE_9__["hideActiveOverlay"])());
    }
  };
}, "Component/MyAccountCustomerPopup/Container/mapDispatchToProps");
/** @namespace Component/MyAccountCustomerPopup/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MyAccountCustomerPopupContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MyAccountCustomerPopupContainer, _Extensible);

  function _MyAccountCustomerPopupContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _MyAccountCustomerPopupContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_MyAccountCustomerPopupContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isLoading: false
    });

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      onCustomerSave: _this.onCustomerSave.bind(_assertThisInitialized(_this)),
      onPasswordChange: _this.onPasswordChange.bind(_assertThisInitialized(_this))
    });

    _defineProperty(_assertThisInitialized(_this), "onError", function (error) {
      var showErrorNotification = _this.props.showErrorNotification;

      _this.setState({
        isLoading: false
      });

      showErrorNotification(error);
    });

    return _this;
  }

  _createClass(_MyAccountCustomerPopupContainer, [{
    key: "onCustomerSave",
    value: function onCustomerSave(customer) {
      var _this2 = this;

      var _this$props = this.props,
          updateCustomer = _this$props.updateCustomer,
          hideActiveOverlay = _this$props.hideActiveOverlay,
          goToPreviousHeaderState = _this$props.goToPreviousHeaderState;
      var mutation = _query_MyAccount_query__WEBPACK_IMPORTED_MODULE_3__["default"].getUpdateInformationMutation(customer);
      this.setState({
        isLoading: true
      });
      return Object(_util_Request__WEBPACK_IMPORTED_MODULE_11__["fetchMutation"])(mutation).then(
      /** @namespace Component/MyAccountCustomerPopup/Container/onCustomerSaveFetchMutationThen */
      middleware(function (_ref) {
        var customer = _ref.updateCustomer.customer;
        _util_BrowserDatabase__WEBPACK_IMPORTED_MODULE_10__["default"].setItem(customer, _store_MyAccount_MyAccount_dispatcher__WEBPACK_IMPORTED_MODULE_5__["CUSTOMER"], _util_Request_QueryDispatcher__WEBPACK_IMPORTED_MODULE_12__["ONE_MONTH_IN_SECONDS"]);
        updateCustomer(customer);

        _this2.setState({
          isLoading: false
        }, function () {
          hideActiveOverlay();
          goToPreviousHeaderState();
        });
      }, "Component/MyAccountCustomerPopup/Container/onCustomerSaveFetchMutationThen"), this.onError);
    }
  }, {
    key: "onPasswordChange",
    value: function onPasswordChange(passwords) {
      var _this3 = this;

      var _this$props2 = this.props,
          showSuccessNotification = _this$props2.showSuccessNotification,
          hideActiveOverlay = _this$props2.hideActiveOverlay,
          goToPreviousHeaderState = _this$props2.goToPreviousHeaderState;
      var mutation = _query_MyAccount_query__WEBPACK_IMPORTED_MODULE_3__["default"].getChangeCustomerPasswordMutation(passwords);
      this.setState({
        isLoading: true
      });
      return Object(_util_Request__WEBPACK_IMPORTED_MODULE_11__["fetchMutation"])(mutation).then(
      /** @namespace Component/MyAccountCustomerPopup/Container/onPasswordChangeFetchMutationThen */
      middleware(function () {
        showSuccessNotification(__('Your password was successfully updated!'));

        _this3.setState({
          isLoading: false
        }, function () {
          hideActiveOverlay();
          goToPreviousHeaderState();
        });
      }, "Component/MyAccountCustomerPopup/Container/onPasswordChangeFetchMutationThen"), this.onError);
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _MyAccountCustomerPopup_component__WEBPACK_IMPORTED_MODULE_13__["default"], _extends({}, this.props, this.state, this.containerFunctions))
      );
    }
  }]);

  return _MyAccountCustomerPopupContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_MyAccountCustomerPopupContainer, 'name', {
  value: 'MyAccountCustomerPopupContainer'
});

var MyAccountCustomerPopupContainer = middleware(_MyAccountCustomerPopupContainer, "Component/MyAccountCustomerPopup/Container");

_defineProperty(MyAccountCustomerPopupContainer, "propTypes", {
  updateCustomer: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  showErrorNotification: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  goToPreviousHeaderState: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  hideActiveOverlay: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  showSuccessNotification: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(MyAccountCustomerPopupContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/MyAccountCustomerPopup/index.js":
/*!***********************************************************!*\
  !*** ./src/app/component/MyAccountCustomerPopup/index.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyAccountCustomerPopup_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MyAccountCustomerPopup.container */ "./src/app/component/MyAccountCustomerPopup/MyAccountCustomerPopup.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _MyAccountCustomerPopup_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/MyAccountCustomerTable/MyAccountCustomerTable.component.js":
/*!**************************************************************************************!*\
  !*** ./src/app/component/MyAccountCustomerTable/MyAccountCustomerTable.component.js ***!
  \**************************************************************************************/
/*! exports provided: _MyAccountCustomerTable, MyAccountCustomerTable, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MyAccountCustomerTable", function() { return _MyAccountCustomerTable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountCustomerTable", function() { return MyAccountCustomerTable; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _KeyValueTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../KeyValueTable */ "./src/app/component/KeyValueTable/index.js");
/* harmony import */ var _type_Account__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../type/Account */ "./src/app/type/Account.js");
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



/** @namespace Component/MyAccountCustomerTable/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MyAccountCustomerTable =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MyAccountCustomerTable, _Extensible);

  function _MyAccountCustomerTable() {
    _classCallCheck(this, _MyAccountCustomerTable);

    return _possibleConstructorReturn(this, _getPrototypeOf(_MyAccountCustomerTable).apply(this, arguments));
  }

  _createClass(_MyAccountCustomerTable, [{
    key: "renderActions",
    value: function renderActions() {
      var _this$props = this.props,
          showChangePasswordPopup = _this$props.showChangePasswordPopup,
          showEditPopup = _this$props.showEditPopup;
      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null,
        /*#__PURE__*/
        _checkBEM(React, "button", {
          block: "Button",
          onClick: showEditPopup
        }, __('Edit details')),
        /*#__PURE__*/
        _checkBEM(React, "button", {
          block: "Button",
          mods: {
            isHollow: true
          },
          onClick: showChangePasswordPopup
        }, __('Change password')))
      );
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "MyAccountCustomerTable"
        }, this.renderTable(), this.renderActions())
      );
    }
  }, {
    key: "dataPairArray",
    get: function get() {
      var customer = this.props.customer;
      return [{
        key: 'firstname',
        label: __('First name'),
        source: customer
      }, {
        key: 'lastname',
        label: __('Last name'),
        source: customer
      }, {
        key: 'email',
        label: __('Email'),
        source: customer
      }];
    }
  }]);

  return _MyAccountCustomerTable;
}(Extensible(_KeyValueTable__WEBPACK_IMPORTED_MODULE_1__["default"]));
Object.defineProperty(_MyAccountCustomerTable, 'name', {
  value: 'MyAccountCustomerTable'
});

var MyAccountCustomerTable = middleware(_MyAccountCustomerTable, "Component/MyAccountCustomerTable/Component");

_defineProperty(MyAccountCustomerTable, "propTypes", {
  customer: _type_Account__WEBPACK_IMPORTED_MODULE_2__["customerType"].isRequired,
  showEditPopup: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  showChangePasswordPopup: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (MyAccountCustomerTable);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/MyAccountCustomerTable/MyAccountCustomerTable.container.js":
/*!**************************************************************************************!*\
  !*** ./src/app/component/MyAccountCustomerTable/MyAccountCustomerTable.container.js ***!
  \**************************************************************************************/
/*! exports provided: mapDispatchToProps, _MyAccountCustomerTableContainer, MyAccountCustomerTableContainer, mapStateToProps, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, __, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MyAccountCustomerTableContainer", function() { return _MyAccountCustomerTableContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountCustomerTableContainer", function() { return MyAccountCustomerTableContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _MyAccountCustomerPopup_MyAccountCustomerPopup_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../MyAccountCustomerPopup/MyAccountCustomerPopup.config */ "./src/app/component/MyAccountCustomerPopup/MyAccountCustomerPopup.config.js");
/* harmony import */ var _store_Popup_Popup_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/Popup/Popup.action */ "./src/app/store/Popup/Popup.action.js");
/* harmony import */ var _type_Account__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../type/Account */ "./src/app/type/Account.js");
/* harmony import */ var _MyAccountCustomerTable_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MyAccountCustomerTable.component */ "./src/app/component/MyAccountCustomerTable/MyAccountCustomerTable.component.js");
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







/** @namespace Component/MyAccountCustomerTable/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    showPopup: function showPopup(payload) {
      return dispatch(Object(_store_Popup_Popup_action__WEBPACK_IMPORTED_MODULE_4__["showPopup"])(_MyAccountCustomerPopup_MyAccountCustomerPopup_config__WEBPACK_IMPORTED_MODULE_3__["CUSTOMER_POPUP_ID"], payload));
    }
  };
}, "Component/MyAccountCustomerTable/Container/mapDispatchToProps");
/** @namespace Component/MyAccountCustomerTable/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MyAccountCustomerTableContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MyAccountCustomerTableContainer, _Extensible);

  function _MyAccountCustomerTableContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _MyAccountCustomerTableContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_MyAccountCustomerTableContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      showEditPopup: _this.showEditPopup.bind(_assertThisInitialized(_this)),
      showChangePasswordPopup: _this.showChangePasswordPopup.bind(_assertThisInitialized(_this))
    });

    return _this;
  }

  _createClass(_MyAccountCustomerTableContainer, [{
    key: "showEditPopup",
    value: function showEditPopup() {
      var _this$props = this.props,
          showPopup = _this$props.showPopup,
          customer = _this$props.customer;
      showPopup({
        action: _MyAccountCustomerPopup_MyAccountCustomerPopup_config__WEBPACK_IMPORTED_MODULE_3__["EDIT_CUSTOMER"],
        customer: customer,
        title: __('Edit customer details')
      });
    }
  }, {
    key: "showChangePasswordPopup",
    value: function showChangePasswordPopup() {
      var _this$props2 = this.props,
          showPopup = _this$props2.showPopup,
          customer = _this$props2.customer;
      showPopup({
        action: _MyAccountCustomerPopup_MyAccountCustomerPopup_config__WEBPACK_IMPORTED_MODULE_3__["CHANGE_PASSWORD"],
        customer: customer,
        title: __('Change password')
      });
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _MyAccountCustomerTable_component__WEBPACK_IMPORTED_MODULE_6__["default"], _extends({}, this.props, this.containerFunctions))
      );
    }
  }]);

  return _MyAccountCustomerTableContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/** @namespace Component/MyAccountCustomerTable/Container/mapStateToProps */
// eslint-disable-next-line no-unused-vars

Object.defineProperty(_MyAccountCustomerTableContainer, 'name', {
  value: 'MyAccountCustomerTableContainer'
});

var MyAccountCustomerTableContainer = middleware(_MyAccountCustomerTableContainer, "Component/MyAccountCustomerTable/Container");

_defineProperty(MyAccountCustomerTableContainer, "propTypes", {
  showPopup: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  customer: _type_Account__WEBPACK_IMPORTED_MODULE_5__["customerType"].isRequired
});

var mapStateToProps = middleware(function (state) {
  return {};
}, "Component/MyAccountCustomerTable/Container/mapStateToProps");
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(MyAccountCustomerTableContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/MyAccountCustomerTable/index.js":
/*!***********************************************************!*\
  !*** ./src/app/component/MyAccountCustomerTable/index.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyAccountCustomerTable_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MyAccountCustomerTable.container */ "./src/app/component/MyAccountCustomerTable/MyAccountCustomerTable.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _MyAccountCustomerTable_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/MyAccountDashboard/MyAccountDashboard.component.js":
/*!******************************************************************************!*\
  !*** ./src/app/component/MyAccountDashboard/MyAccountDashboard.component.js ***!
  \******************************************************************************/
/*! exports provided: _MyAccountDashboard, MyAccountDashboard, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MyAccountDashboard", function() { return _MyAccountDashboard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountDashboard", function() { return MyAccountDashboard; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Link */ "./src/app/component/Link/index.js");
/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Loader */ "./src/app/component/Loader/index.js");
/* harmony import */ var _MyAccountAddressTable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../MyAccountAddressTable */ "./src/app/component/MyAccountAddressTable/index.js");
/* harmony import */ var _MyAccountCustomerPopup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../MyAccountCustomerPopup */ "./src/app/component/MyAccountCustomerPopup/index.js");
/* harmony import */ var _MyAccountCustomerTable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../MyAccountCustomerTable */ "./src/app/component/MyAccountCustomerTable/index.js");
/* harmony import */ var _route_MyAccount_MyAccount_config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../route/MyAccount/MyAccount.config */ "./src/app/route/MyAccount/MyAccount.config.js");
/* harmony import */ var _type_Account__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../type/Account */ "./src/app/type/Account.js");
/* harmony import */ var _MyAccountDashboard_style__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./MyAccountDashboard.style */ "./src/app/component/MyAccountDashboard/MyAccountDashboard.style.scss");
/* harmony import */ var _MyAccountDashboard_style__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_MyAccountDashboard_style__WEBPACK_IMPORTED_MODULE_9__);
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










/** @namespace Component/MyAccountDashboard/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MyAccountDashboard =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MyAccountDashboard, _Extensible);

  function _MyAccountDashboard() {
    _classCallCheck(this, _MyAccountDashboard);

    return _possibleConstructorReturn(this, _getPrototypeOf(_MyAccountDashboard).apply(this, arguments));
  }

  _createClass(_MyAccountDashboard, [{
    key: "renderCustomerPopup",
    value: function renderCustomerPopup() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _MyAccountCustomerPopup__WEBPACK_IMPORTED_MODULE_5__["default"], null)
      );
    }
  }, {
    key: "renderNoDefaultAddressConfigured",
    value: function renderNoDefaultAddressConfigured(name) {
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          key: name
        },
        /*#__PURE__*/
        _checkBEM(React, "p", {
          block: "MyAccountDashboard",
          elem: "Info"
        }, __('No %s address configured.', name)), this.renderLinkToAddressBook())
      );
    }
  }, {
    key: "renderLinkToAddressBook",
    value: function renderLinkToAddressBook() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "p", {
          block: "MyAccountDashboard",
          elem: "Info"
        },
        /*#__PURE__*/
        _checkBEM(React, _Link__WEBPACK_IMPORTED_MODULE_2__["default"], {
          to: "".concat(_route_MyAccount_MyAccount_config__WEBPACK_IMPORTED_MODULE_7__["MY_ACCOUNT_URL"], "/").concat(_type_Account__WEBPACK_IMPORTED_MODULE_8__["ADDRESS_BOOK"])
        }, __('Go to "Address Book", to configure them!')))
      );
    }
  }, {
    key: "renderDefaultAddressTable",
    value: function renderDefaultAddressTable(isBilling) {
      var getDefaultAddress = this.props.getDefaultAddress;
      var name = isBilling ? __('billing') : __('shipping');
      var address = getDefaultAddress(isBilling);

      if (!address) {
        return this.renderNoDefaultAddressConfigured(name);
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          key: name,
          block: "MyAccountDashboard",
          elem: "DefaultAddress"
        },
        /*#__PURE__*/
        _checkBEM(React, _MyAccountAddressTable__WEBPACK_IMPORTED_MODULE_4__["default"], {
          address: address,
          showAdditionalFields: true,
          title: __('Default %s address', name)
        }))
      );
    }
  }, {
    key: "renderNoAddresses",
    value: function renderNoAddresses() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", null,
        /*#__PURE__*/
        _checkBEM(React, "p", {
          block: "MyAccountDashboard",
          elem: "Info"
        }, __('You have no configured addresses.')), this.renderLinkToAddressBook())
      );
    }
  }, {
    key: "renderDefaultAddressTables",
    value: function renderDefaultAddressTables() {
      var _this$props$customer$ = this.props.customer.addresses,
          addresses = _this$props$customer$ === void 0 ? [] : _this$props$customer$;

      if (!addresses.length) {
        return this.renderNoAddresses();
      }

      return [this.renderDefaultAddressTable(), this.renderDefaultAddressTable(true)];
    }
  }, {
    key: "renderCustomerTable",
    value: function renderCustomerTable() {
      var customer = this.props.customer;
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "MyAccountDashboard",
          elem: "CustomerData"
        },
        /*#__PURE__*/
        _checkBEM(React, _MyAccountCustomerTable__WEBPACK_IMPORTED_MODULE_6__["default"], {
          customer: customer,
          title: __('My profile')
        }))
      );
    }
  }, {
    key: "render",
    value: function render() {
      var customer = this.props.customer;
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "MyAccountDashboard"
        },
        /*#__PURE__*/
        _checkBEM(React, _Loader__WEBPACK_IMPORTED_MODULE_3__["default"], {
          isLoading: !Object.keys(customer).length
        }), this.renderCustomerTable(), this.renderDefaultAddressTables(), this.renderCustomerPopup())
      );
    }
  }]);

  return _MyAccountDashboard;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_MyAccountDashboard, 'name', {
  value: 'MyAccountDashboard'
});

var MyAccountDashboard = middleware(_MyAccountDashboard, "Component/MyAccountDashboard/Component");

_defineProperty(MyAccountDashboard, "propTypes", {
  customer: _type_Account__WEBPACK_IMPORTED_MODULE_8__["customerType"].isRequired,
  getDefaultAddress: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (MyAccountDashboard);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/MyAccountDashboard/MyAccountDashboard.container.js":
/*!******************************************************************************!*\
  !*** ./src/app/component/MyAccountDashboard/MyAccountDashboard.container.js ***!
  \******************************************************************************/
/*! exports provided: mapStateToProps, _MyAccountDashboardContainer, MyAccountDashboardContainer, mapDispatchToProps, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MyAccountDashboardContainer", function() { return _MyAccountDashboardContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountDashboardContainer", function() { return MyAccountDashboardContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _type_Account__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../type/Account */ "./src/app/type/Account.js");
/* harmony import */ var _MyAccountDashboard_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MyAccountDashboard.component */ "./src/app/component/MyAccountDashboard/MyAccountDashboard.component.js");
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




/** @namespace Component/MyAccountDashboard/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    customer: state.MyAccountReducer.customer
  };
}, "Component/MyAccountDashboard/Container/mapStateToProps");
/** @namespace Component/MyAccountDashboard/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MyAccountDashboardContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MyAccountDashboardContainer, _Extensible);

  function _MyAccountDashboardContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _MyAccountDashboardContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_MyAccountDashboardContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      getDefaultAddress: _this.getDefaultAddress.bind(_assertThisInitialized(_this))
    });

    return _this;
  }

  _createClass(_MyAccountDashboardContainer, [{
    key: "getDefaultAddress",
    value: function getDefaultAddress(isBilling) {
      var _this$props$customer$ = this.props.customer.addresses,
          addresses = _this$props$customer$ === void 0 ? [] : _this$props$customer$;
      var key = isBilling ? 'default_billing' : 'default_shipping';
      return addresses.find(function (_ref) {
        var defaultAddress = _ref[key];
        return defaultAddress;
      });
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _MyAccountDashboard_component__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({}, this.props, this.containerFunctions))
      );
    }
  }]);

  return _MyAccountDashboardContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]));
/** @namespace Component/MyAccountDashboard/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars

Object.defineProperty(_MyAccountDashboardContainer, 'name', {
  value: 'MyAccountDashboardContainer'
});

var MyAccountDashboardContainer = middleware(_MyAccountDashboardContainer, "Component/MyAccountDashboard/Container");

_defineProperty(MyAccountDashboardContainer, "propTypes", {
  customer: _type_Account__WEBPACK_IMPORTED_MODULE_2__["customerType"].isRequired
});

var mapDispatchToProps = middleware(function (dispatch) {
  return {};
}, "Component/MyAccountDashboard/Container/mapDispatchToProps");
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(MyAccountDashboardContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/MyAccountDashboard/MyAccountDashboard.style.scss":
/*!****************************************************************************!*\
  !*** ./src/app/component/MyAccountDashboard/MyAccountDashboard.style.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291338883
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/MyAccountDashboard/index.js":
/*!*******************************************************!*\
  !*** ./src/app/component/MyAccountDashboard/index.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyAccountDashboard_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MyAccountDashboard.container */ "./src/app/component/MyAccountDashboard/MyAccountDashboard.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _MyAccountDashboard_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/MyAccountMyOrders/MyAccountMyOrders.component.js":
/*!****************************************************************************!*\
  !*** ./src/app/component/MyAccountMyOrders/MyAccountMyOrders.component.js ***!
  \****************************************************************************/
/*! exports provided: _MyAccountMyOrders, MyAccountMyOrders, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MyAccountMyOrders", function() { return _MyAccountMyOrders; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountMyOrders", function() { return MyAccountMyOrders; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Loader */ "./src/app/component/Loader/index.js");
/* harmony import */ var _MyAccountOrderPopup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../MyAccountOrderPopup */ "./src/app/component/MyAccountOrderPopup/index.js");
/* harmony import */ var _MyAccountOrderTableRow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../MyAccountOrderTableRow */ "./src/app/component/MyAccountOrderTableRow/index.js");
/* harmony import */ var _type_Account__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../type/Account */ "./src/app/type/Account.js");
/* harmony import */ var _type_Device__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../type/Device */ "./src/app/type/Device.js");
/* harmony import */ var _MyAccountMyOrders_style__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./MyAccountMyOrders.style */ "./src/app/component/MyAccountMyOrders/MyAccountMyOrders.style.scss");
/* harmony import */ var _MyAccountMyOrders_style__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_MyAccountMyOrders_style__WEBPACK_IMPORTED_MODULE_7__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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








/** @namespace Component/MyAccountMyOrders/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MyAccountMyOrders =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MyAccountMyOrders, _Extensible);

  function _MyAccountMyOrders() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _MyAccountMyOrders);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_MyAccountMyOrders)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "renderOrderRow", function (order) {
      var id = order.base_order_info.id;
      return (
        /*#__PURE__*/
        _checkBEM(React, _MyAccountOrderTableRow__WEBPACK_IMPORTED_MODULE_4__["default"], {
          key: id,
          order: order
        })
      );
    });

    return _this;
  }

  _createClass(_MyAccountMyOrders, [{
    key: "renderPopup",
    value: function renderPopup() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _MyAccountOrderPopup__WEBPACK_IMPORTED_MODULE_3__["default"], null)
      );
    }
  }, {
    key: "renderNoOrders",
    value: function renderNoOrders() {
      var device = this.props.device;
      return (
        /*#__PURE__*/
        _checkBEM(React, "tr", {
          block: "MyAccountMyOrders",
          elem: "NoOrders"
        },
        /*#__PURE__*/
        _checkBEM(React, "td", {
          colSpan: device.isMobile ? 3 : 4
        }, __('You have no orders.')))
      );
    }
  }, {
    key: "renderOrderHeadingRow",
    value: function renderOrderHeadingRow() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "tr", null,
        /*#__PURE__*/
        _checkBEM(React, "th", null, __('Order')),
        /*#__PURE__*/
        _checkBEM(React, "th", null, __('Date')),
        /*#__PURE__*/
        _checkBEM(React, "th", null, __('Status')),
        /*#__PURE__*/
        _checkBEM(React, "th", {
          block: "hidden-mobile"
        }, __('Total')))
      );
    }
  }, {
    key: "renderTable",
    value: function renderTable() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "table", {
          block: "MyAccountMyOrders",
          elem: "Table"
        },
        /*#__PURE__*/
        _checkBEM(React, "thead", null, this.renderOrderHeadingRow()),
        /*#__PURE__*/
        _checkBEM(React, "tbody", null, this.renderOrderRows()))
      );
    }
  }, {
    key: "renderOrderRows",
    value: function renderOrderRows() {
      var _this2 = this;

      var _this$props = this.props,
          orderList = _this$props.orderList,
          isLoading = _this$props.isLoading;

      if (!isLoading && !orderList.length) {
        return this.renderNoOrders();
      }

      var orders = orderList.length ? orderList : Array.from({
        length: 10
      }, function (_, id) {
        return {
          base_order_info: {
            id: id
          }
        };
      });
      return orders.reduceRight(function (acc, e) {
        return [].concat(_toConsumableArray(acc), [_this2.renderOrderRow(e)]);
      }, []);
    }
  }, {
    key: "render",
    value: function render() {
      var isLoading = this.props.isLoading;
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "MyAccountMyOrders"
        },
        /*#__PURE__*/
        _checkBEM(React, _Loader__WEBPACK_IMPORTED_MODULE_2__["default"], {
          isLoading: isLoading
        }), this.renderTable(), this.renderPopup())
      );
    }
  }]);

  return _MyAccountMyOrders;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_MyAccountMyOrders, 'name', {
  value: 'MyAccountMyOrders'
});

var MyAccountMyOrders = middleware(_MyAccountMyOrders, "Component/MyAccountMyOrders/Component");

_defineProperty(MyAccountMyOrders, "propTypes", {
  orderList: _type_Account__WEBPACK_IMPORTED_MODULE_5__["ordersType"].isRequired,
  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  device: _type_Device__WEBPACK_IMPORTED_MODULE_6__["DeviceType"].isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (MyAccountMyOrders);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/MyAccountMyOrders/MyAccountMyOrders.container.js":
/*!****************************************************************************!*\
  !*** ./src/app/component/MyAccountMyOrders/MyAccountMyOrders.container.js ***!
  \****************************************************************************/
/*! exports provided: OrderDispatcher, mapStateToProps, mapDispatchToProps, _MyAccountMyOrdersContainer, MyAccountMyOrdersContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderDispatcher", function() { return OrderDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MyAccountMyOrdersContainer", function() { return _MyAccountMyOrdersContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountMyOrdersContainer", function() { return MyAccountMyOrdersContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _MyAccountMyOrders_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MyAccountMyOrders.component */ "./src/app/component/MyAccountMyOrders/MyAccountMyOrders.component.js");
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




var OrderDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/Order/Order.dispatcher */ "./src/app/store/Order/Order.dispatcher.js"));
/** @namespace Component/MyAccountMyOrders/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    orderList: state.OrderReducer.orderList,
    isLoading: state.OrderReducer.isLoading,
    device: state.ConfigReducer.device
  };
}, "Component/MyAccountMyOrders/Container/mapStateToProps");
/** @namespace Component/MyAccountMyOrders/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    getOrderList: function getOrderList() {
      return OrderDispatcher.then(function (_ref) {
        var dispatcher = _ref.default;
        return dispatcher.requestOrders(dispatch);
      });
    }
  };
}, "Component/MyAccountMyOrders/Container/mapDispatchToProps");
/** @namespace Component/MyAccountMyOrders/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MyAccountMyOrdersContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MyAccountMyOrdersContainer, _Extensible);

  function _MyAccountMyOrdersContainer() {
    _classCallCheck(this, _MyAccountMyOrdersContainer);

    return _possibleConstructorReturn(this, _getPrototypeOf(_MyAccountMyOrdersContainer).apply(this, arguments));
  }

  _createClass(_MyAccountMyOrdersContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var getOrderList = this.props.getOrderList;
      getOrderList();
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _MyAccountMyOrders_component__WEBPACK_IMPORTED_MODULE_3__["default"], this.props)
      );
    }
  }]);

  return _MyAccountMyOrdersContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_MyAccountMyOrdersContainer, 'name', {
  value: 'MyAccountMyOrdersContainer'
});

var MyAccountMyOrdersContainer = middleware(_MyAccountMyOrdersContainer, "Component/MyAccountMyOrders/Container");

_defineProperty(MyAccountMyOrdersContainer, "propTypes", {
  getOrderList: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(MyAccountMyOrdersContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/MyAccountMyOrders/MyAccountMyOrders.style.scss":
/*!**************************************************************************!*\
  !*** ./src/app/component/MyAccountMyOrders/MyAccountMyOrders.style.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291338891
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/MyAccountMyOrders/index.js":
/*!******************************************************!*\
  !*** ./src/app/component/MyAccountMyOrders/index.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyAccountMyOrders_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MyAccountMyOrders.container */ "./src/app/component/MyAccountMyOrders/MyAccountMyOrders.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _MyAccountMyOrders_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/MyAccountMyWishlist/index.js":
/*!********************************************************!*\
  !*** ./src/app/component/MyAccountMyWishlist/index.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyAccountMyWishlist_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MyAccountMyWishlist.container */ "./src/app/component/MyAccountMyWishlist/MyAccountMyWishlist.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _MyAccountMyWishlist_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/MyAccountNewsletterSubscription/MyAccountNewsletterSubscription.component.js":
/*!********************************************************************************************************!*\
  !*** ./src/app/component/MyAccountNewsletterSubscription/MyAccountNewsletterSubscription.component.js ***!
  \********************************************************************************************************/
/*! exports provided: _MyAccountNewsletterSubscription, MyAccountNewsletterSubscription, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MyAccountNewsletterSubscription", function() { return _MyAccountNewsletterSubscription; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountNewsletterSubscription", function() { return MyAccountNewsletterSubscription; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _FieldForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FieldForm */ "./src/app/component/FieldForm/index.js");
/* harmony import */ var _type_Account__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../type/Account */ "./src/app/type/Account.js");
/* harmony import */ var _MyAccountNewsletterSubscription_style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MyAccountNewsletterSubscription.style.scss */ "./src/app/component/MyAccountNewsletterSubscription/MyAccountNewsletterSubscription.style.scss");
/* harmony import */ var _MyAccountNewsletterSubscription_style_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_MyAccountNewsletterSubscription_style_scss__WEBPACK_IMPORTED_MODULE_3__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

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




/** @namespace Component/MyAccountNewsletterSubscription/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MyAccountNewsletterSubscription =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MyAccountNewsletterSubscription, _Extensible);

  function _MyAccountNewsletterSubscription() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _MyAccountNewsletterSubscription);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_MyAccountNewsletterSubscription)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onFormSuccess", function (fields) {
      var onCustomerSave = _this.props.onCustomerSave;
      onCustomerSave(fields);
    });

    return _this;
  }

  _createClass(_MyAccountNewsletterSubscription, [{
    key: "getDefaultValues",
    value: function getDefaultValues(fieldEntry) {
      var _fieldEntry = _slicedToArray(fieldEntry, 1),
          key = _fieldEntry[0];

      var value = this.props.customer[key];
      return _objectSpread2(_objectSpread2({}, _get(_getPrototypeOf(_MyAccountNewsletterSubscription.prototype), "getDefaultValues", this).call(this, fieldEntry)), {}, {
        value: value
      });
    }
  }, {
    key: "renderFields",
    value: function renderFields() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "FieldForm",
          elem: "Fields",
          mix: {
            block: 'MyAccountNewsletterSubscription'
          }
        }, Object.entries(this.fieldMap).map(this.renderField))
      );
    }
  }, {
    key: "renderActions",
    value: function renderActions() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "button", {
          type: "submit",
          block: "Button",
          mix: {
            block: 'MyAccountNewsletterSubscription',
            elem: 'Button'
          }
        }, __('Save changes'))
      );
    }
  }, {
    key: "fieldMap",
    get: function get() {
      var is_subscribed = this.props.customer.is_subscribed;
      return {
        is_subscribed: {
          type: 'checkbox',
          label: __('General subscription'),
          value: 'is_subscribed',
          checked: is_subscribed
        }
      };
    }
  }]);

  return _MyAccountNewsletterSubscription;
}(Extensible(_FieldForm__WEBPACK_IMPORTED_MODULE_1__["default"]));
Object.defineProperty(_MyAccountNewsletterSubscription, 'name', {
  value: 'MyAccountNewsletterSubscription'
});

var MyAccountNewsletterSubscription = middleware(_MyAccountNewsletterSubscription, "Component/MyAccountNewsletterSubscription/Component");

_defineProperty(MyAccountNewsletterSubscription, "propTypes", {
  customer: _type_Account__WEBPACK_IMPORTED_MODULE_2__["customerType"].isRequired,
  onCustomerSave: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (MyAccountNewsletterSubscription);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/MyAccountNewsletterSubscription/MyAccountNewsletterSubscription.container.js":
/*!********************************************************************************************************!*\
  !*** ./src/app/component/MyAccountNewsletterSubscription/MyAccountNewsletterSubscription.container.js ***!
  \********************************************************************************************************/
/*! exports provided: mapStateToProps, mapDispatchToProps, _MyAccountNewsletterSubscriptionContainer, MyAccountNewsletterSubscriptionContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, __) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MyAccountNewsletterSubscriptionContainer", function() { return _MyAccountNewsletterSubscriptionContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountNewsletterSubscriptionContainer", function() { return MyAccountNewsletterSubscriptionContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Loader */ "./src/app/component/Loader/index.js");
/* harmony import */ var _query_MyAccount_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../query/MyAccount.query */ "./src/app/query/MyAccount.query.js");
/* harmony import */ var _store_MyAccount_MyAccount_action__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store/MyAccount/MyAccount.action */ "./src/app/store/MyAccount/MyAccount.action.js");
/* harmony import */ var _store_MyAccount_MyAccount_dispatcher__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../store/MyAccount/MyAccount.dispatcher */ "./src/app/store/MyAccount/MyAccount.dispatcher.js");
/* harmony import */ var _store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../store/Notification/Notification.action */ "./src/app/store/Notification/Notification.action.js");
/* harmony import */ var _type_Account__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../type/Account */ "./src/app/type/Account.js");
/* harmony import */ var _util_BrowserDatabase_BrowserDatabase__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../util/BrowserDatabase/BrowserDatabase */ "./src/app/util/BrowserDatabase/BrowserDatabase.js");
/* harmony import */ var _util_Request__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../util/Request */ "./src/app/util/Request/index.js");
/* harmony import */ var _util_Request_QueryDispatcher__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../util/Request/QueryDispatcher */ "./src/app/util/Request/QueryDispatcher.js");
/* harmony import */ var _MyAccountNewsletterSubscription_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./MyAccountNewsletterSubscription.component */ "./src/app/component/MyAccountNewsletterSubscription/MyAccountNewsletterSubscription.component.js");
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













/** @namespace Component/MyAccountNewsletterSubscription/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    customer: state.MyAccountReducer.customer
  };
}, "Component/MyAccountNewsletterSubscription/Container/mapStateToProps");
/** @namespace Component/MyAccountNewsletterSubscription/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    updateCustomer: function updateCustomer(customer) {
      return dispatch(Object(_store_MyAccount_MyAccount_action__WEBPACK_IMPORTED_MODULE_5__["updateCustomerDetails"])(customer));
    },
    showErrorNotification: function showErrorNotification(error) {
      return dispatch(Object(_store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_7__["showNotification"])('error', error[0].message));
    },
    showSuccessNotification: function showSuccessNotification(message) {
      return dispatch(Object(_store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_7__["showNotification"])('success', message));
    }
  };
}, "Component/MyAccountNewsletterSubscription/Container/mapDispatchToProps");
/** @namespace Component/MyAccountNewsletterSubscription/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MyAccountNewsletterSubscriptionContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MyAccountNewsletterSubscriptionContainer, _Extensible);

  function _MyAccountNewsletterSubscriptionContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _MyAccountNewsletterSubscriptionContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_MyAccountNewsletterSubscriptionContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      onCustomerSave: _this.onCustomerSave.bind(_assertThisInitialized(_this))
    });

    _defineProperty(_assertThisInitialized(_this), "state", {
      isLoading: false
    });

    _defineProperty(_assertThisInitialized(_this), "onError", function () {
      var showErrorNotification = _this.props.showErrorNotification;

      _this.setState({
        isLoading: false
      }, function () {
        showErrorNotification(__('We are experiencing issues, please try again later'));
      });
    });

    return _this;
  }

  _createClass(_MyAccountNewsletterSubscriptionContainer, [{
    key: "onCustomerSave",
    value: function onCustomerSave(customer) {
      var _this2 = this;

      var _this$props = this.props,
          updateCustomer = _this$props.updateCustomer,
          showSuccessNotification = _this$props.showSuccessNotification;
      var mutation = _query_MyAccount_query__WEBPACK_IMPORTED_MODULE_4__["default"].getUpdateInformationMutation(customer);
      this.setState({
        isLoading: true
      });
      return Object(_util_Request__WEBPACK_IMPORTED_MODULE_10__["fetchMutation"])(mutation).then(
      /** @namespace Component/MyAccountNewsletterSubscription/Container/fetchMutationThen */
      middleware(function (_ref) {
        var customer = _ref.updateCustomer.customer;
        _util_BrowserDatabase_BrowserDatabase__WEBPACK_IMPORTED_MODULE_9__["default"].setItem(customer, _store_MyAccount_MyAccount_dispatcher__WEBPACK_IMPORTED_MODULE_6__["CUSTOMER"], _util_Request_QueryDispatcher__WEBPACK_IMPORTED_MODULE_11__["ONE_MONTH_IN_SECONDS"]);

        _this2.setState({
          isLoading: false
        }, function () {
          updateCustomer(customer);
          showSuccessNotification(__('Subscription settings successfully updated'));
        });
      }, "Component/MyAccountNewsletterSubscription/Container/fetchMutationThen"), this.onError);
    }
  }, {
    key: "render",
    value: function render() {
      var isLoading = this.state.isLoading;
      return (
        /*#__PURE__*/
        _checkBEM(react__WEBPACK_IMPORTED_MODULE_1___default.a, react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
        /*#__PURE__*/
        _checkBEM(react__WEBPACK_IMPORTED_MODULE_1___default.a, _Loader__WEBPACK_IMPORTED_MODULE_3__["default"], {
          isLoading: isLoading
        }),
        /*#__PURE__*/
        _checkBEM(react__WEBPACK_IMPORTED_MODULE_1___default.a, _MyAccountNewsletterSubscription_component__WEBPACK_IMPORTED_MODULE_12__["default"], _extends({}, this.props, this.containerFunctions)))
      );
    }
  }]);

  return _MyAccountNewsletterSubscriptionContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_MyAccountNewsletterSubscriptionContainer, 'name', {
  value: 'MyAccountNewsletterSubscriptionContainer'
});

var MyAccountNewsletterSubscriptionContainer = middleware(_MyAccountNewsletterSubscriptionContainer, "Component/MyAccountNewsletterSubscription/Container");

_defineProperty(MyAccountNewsletterSubscriptionContainer, "propTypes", {
  customer: _type_Account__WEBPACK_IMPORTED_MODULE_8__["customerType"].isRequired,
  updateCustomer: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  showErrorNotification: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  showSuccessNotification: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(MyAccountNewsletterSubscriptionContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js")))

/***/ }),

/***/ "./src/app/component/MyAccountNewsletterSubscription/MyAccountNewsletterSubscription.style.scss":
/*!******************************************************************************************************!*\
  !*** ./src/app/component/MyAccountNewsletterSubscription/MyAccountNewsletterSubscription.style.scss ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291337583
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/MyAccountNewsletterSubscription/index.js":
/*!********************************************************************!*\
  !*** ./src/app/component/MyAccountNewsletterSubscription/index.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyAccountNewsletterSubscription_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MyAccountNewsletterSubscription.container */ "./src/app/component/MyAccountNewsletterSubscription/MyAccountNewsletterSubscription.container.js");
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

/* harmony default export */ __webpack_exports__["default"] = (_MyAccountNewsletterSubscription_container__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/app/component/MyAccountOrderPopup/MyAccountOrderPopup.component.js":
/*!********************************************************************************!*\
  !*** ./src/app/component/MyAccountOrderPopup/MyAccountOrderPopup.component.js ***!
  \********************************************************************************/
/*! exports provided: _MyAccountOrderPopup, MyAccountOrderPopup, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MyAccountOrderPopup", function() { return _MyAccountOrderPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountOrderPopup", function() { return MyAccountOrderPopup; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Image */ "./src/app/component/Image/index.js");
/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Loader */ "./src/app/component/Loader/index.js");
/* harmony import */ var _MyAccountAddressTable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../MyAccountAddressTable */ "./src/app/component/MyAccountAddressTable/index.js");
/* harmony import */ var _Popup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Popup */ "./src/app/component/Popup/index.js");
/* harmony import */ var _type_Account__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../type/Account */ "./src/app/type/Account.js");
/* harmony import */ var _util_Price__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../util/Price */ "./src/app/util/Price/index.js");
/* harmony import */ var _MyAccountOrderPopup_config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./MyAccountOrderPopup.config */ "./src/app/component/MyAccountOrderPopup/MyAccountOrderPopup.config.js");
/* harmony import */ var _MyAccountOrderPopup_style__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./MyAccountOrderPopup.style */ "./src/app/component/MyAccountOrderPopup/MyAccountOrderPopup.style.scss");
/* harmony import */ var _MyAccountOrderPopup_style__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_MyAccountOrderPopup_style__WEBPACK_IMPORTED_MODULE_9__);
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










/** @namespace Component/MyAccountOrderPopup/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MyAccountOrderPopup =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MyAccountOrderPopup, _Extensible);

  function _MyAccountOrderPopup() {
    _classCallCheck(this, _MyAccountOrderPopup);

    return _possibleConstructorReturn(this, _getPrototypeOf(_MyAccountOrderPopup).apply(this, arguments));
  }

  _createClass(_MyAccountOrderPopup, [{
    key: "renderBaseInfo",
    value: function renderBaseInfo() {
      var base_order_info = this.props.order.base_order_info;

      var _ref = base_order_info || {},
          status_label = _ref.status_label,
          created_at = _ref.created_at;

      return (
        /*#__PURE__*/
        _checkBEM(React, "div", null,
        /*#__PURE__*/
        _checkBEM(React, "h4", null, __('Order details')),
        /*#__PURE__*/
        _checkBEM(React, "dl", null,
        /*#__PURE__*/
        _checkBEM(React, "dt", null, __('Created at: ')),
        /*#__PURE__*/
        _checkBEM(React, "dd", null, created_at),
        /*#__PURE__*/
        _checkBEM(React, "dt", null, __('Status: ')),
        /*#__PURE__*/
        _checkBEM(React, "dd", null, status_label)))
      );
    }
  }, {
    key: "renderPayment",
    value: function renderPayment() {
      var payment_info = this.props.order.payment_info;

      var _ref2 = payment_info || {},
          _ref2$additional_info = _ref2.additional_information;

      _ref2$additional_info = _ref2$additional_info === void 0 ? {} : _ref2$additional_info;
      var method_title = _ref2$additional_info.method_title;
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", null,
        /*#__PURE__*/
        _checkBEM(React, "h4", null, __('Payment Information')),
        /*#__PURE__*/
        _checkBEM(React, "dl", null,
        /*#__PURE__*/
        _checkBEM(React, "dt", null, __('Method: ')),
        /*#__PURE__*/
        _checkBEM(React, "dd", null, method_title)))
      );
    }
  }, {
    key: "renderShippingAddressTable",
    value: function renderShippingAddressTable() {
      var shipping_address = this.props.order.shipping_info.shipping_address;
      return (
        /*#__PURE__*/
        _checkBEM(React, _MyAccountAddressTable__WEBPACK_IMPORTED_MODULE_4__["default"], {
          title: __('Shipping address'),
          address: shipping_address,
          mix: {
            block: 'MyAccountOrderPopup',
            elem: 'Address'
          }
        })
      );
    }
  }, {
    key: "renderShipping",
    value: function renderShipping() {
      var _this$props = this.props,
          shipping_info = _this$props.order.shipping_info,
          currency_code = _this$props.currency_code;

      var _ref3 = shipping_info || {},
          shipping_description = _ref3.shipping_description,
          shipping_amount = _ref3.shipping_amount,
          shipping_address = _ref3.shipping_address;

      if (!shipping_address) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "MyAccountOrderPopup",
          elem: "ShippingWrapper"
        },
        /*#__PURE__*/
        _checkBEM(React, "h4", null, __('Shipping & Handling Information')),
        /*#__PURE__*/
        _checkBEM(React, "dl", null,
        /*#__PURE__*/
        _checkBEM(React, "dt", null, __('Description: ')),
        /*#__PURE__*/
        _checkBEM(React, "dd", null, shipping_description),
        /*#__PURE__*/
        _checkBEM(React, "dt", null, __('Price: ')),
        /*#__PURE__*/
        _checkBEM(React, "dd", null, Object(_util_Price__WEBPACK_IMPORTED_MODULE_7__["formatPrice"])(shipping_amount, currency_code))), this.renderShippingAddressTable())
      );
    }
  }, {
    key: "renderItems",
    value: function renderItems() {
      var _this$props2 = this.props,
          _this$props2$order$or = _this$props2.order.order_products,
          order_products = _this$props2$order$or === void 0 ? [] : _this$props2$order$or,
          currency_code = _this$props2.currency_code;
      return order_products.map(function (product, i) {
        var name = product.name,
            thumbnail = product.thumbnail,
            id = product.id,
            qty = product.qty,
            row_total = product.row_total;

        var _ref4 = thumbnail || {},
            url = _ref4.url;

        return (
          /*#__PURE__*/
          _checkBEM(React, "tr", {
            key: id || i.toString(),
            block: "MyAccountOrderPopup",
            elem: "Row"
          },
          /*#__PURE__*/
          _checkBEM(React, "td", null, url &&
          /*#__PURE__*/
          _checkBEM(React, _Image__WEBPACK_IMPORTED_MODULE_2__["default"], {
            src: url,
            alt: name,
            mix: {
              block: 'MyAccountOrderPopup',
              elem: 'Thumbnail'
            }
          })),
          /*#__PURE__*/
          _checkBEM(React, "td", null, name),
          /*#__PURE__*/
          _checkBEM(React, "td", null, qty),
          /*#__PURE__*/
          _checkBEM(React, "td", null, Object(_util_Price__WEBPACK_IMPORTED_MODULE_7__["formatPrice"])(row_total, currency_code)))
        );
      });
    }
  }, {
    key: "renderItemsHeading",
    value: function renderItemsHeading() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "tr", null,
        /*#__PURE__*/
        _checkBEM(React, "th", null, __('Image')),
        /*#__PURE__*/
        _checkBEM(React, "th", null, __('Name')),
        /*#__PURE__*/
        _checkBEM(React, "th", null, __('Quantity')),
        /*#__PURE__*/
        _checkBEM(React, "th", null, __('Total')))
      );
    }
  }, {
    key: "renderProducts",
    value: function renderProducts() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "MyAccountOrderPopup",
          elem: "ProductsWrapper"
        },
        /*#__PURE__*/
        _checkBEM(React, "h4", null, __('Items Ordered')),
        /*#__PURE__*/
        _checkBEM(React, "table", {
          block: "MyAccountOrderPopup",
          elem: "Products"
        },
        /*#__PURE__*/
        _checkBEM(React, "thead", null, this.renderItemsHeading()),
        /*#__PURE__*/
        _checkBEM(React, "tbody", null, this.renderItems())))
      );
    }
  }, {
    key: "renderTotals",
    value: function renderTotals() {
      var _this$props3 = this.props,
          base_order_info = _this$props3.order.base_order_info,
          currency_code = _this$props3.currency_code;

      var _ref5 = base_order_info || {},
          grand_total = _ref5.grand_total,
          sub_total = _ref5.sub_total;

      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "MyAccountOrderPopup",
          elem: "OrderWrapper"
        },
        /*#__PURE__*/
        _checkBEM(React, "h4", null, __('Order Total')),
        /*#__PURE__*/
        _checkBEM(React, "dl", null,
        /*#__PURE__*/
        _checkBEM(React, "dt", null, __('Subtotal: ')),
        /*#__PURE__*/
        _checkBEM(React, "dd", null, Object(_util_Price__WEBPACK_IMPORTED_MODULE_7__["formatPrice"])(sub_total, currency_code)),
        /*#__PURE__*/
        _checkBEM(React, "dt", null, __('Grand total: ')),
        /*#__PURE__*/
        _checkBEM(React, "dd", null, Object(_util_Price__WEBPACK_IMPORTED_MODULE_7__["formatPrice"])(grand_total, currency_code))))
      );
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var order_products = this.props.order.order_products;

      if (!order_products) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null, this.renderBaseInfo(), this.renderPayment(), this.renderShipping(), this.renderProducts(), this.renderTotals())
      );
    }
  }, {
    key: "render",
    value: function render() {
      var isLoading = this.props.isLoading;
      return (
        /*#__PURE__*/
        _checkBEM(React, _Popup__WEBPACK_IMPORTED_MODULE_5__["default"], {
          id: _MyAccountOrderPopup_config__WEBPACK_IMPORTED_MODULE_8__["ORDER_POPUP_ID"],
          mix: {
            block: 'MyAccountOrderPopup'
          }
        },
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "MyAccountOrderPopup",
          elem: "Content"
        },
        /*#__PURE__*/
        _checkBEM(React, _Loader__WEBPACK_IMPORTED_MODULE_3__["default"], {
          isLoading: isLoading
        }), this.renderContent()))
      );
    }
  }]);

  return _MyAccountOrderPopup;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_MyAccountOrderPopup, 'name', {
  value: 'MyAccountOrderPopup'
});

var MyAccountOrderPopup = middleware(_MyAccountOrderPopup, "Component/MyAccountOrderPopup/Component");

_defineProperty(MyAccountOrderPopup, "propTypes", {
  order: _type_Account__WEBPACK_IMPORTED_MODULE_6__["orderType"].isRequired,
  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  currency_code: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (MyAccountOrderPopup);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/MyAccountOrderPopup/MyAccountOrderPopup.config.js":
/*!*****************************************************************************!*\
  !*** ./src/app/component/MyAccountOrderPopup/MyAccountOrderPopup.config.js ***!
  \*****************************************************************************/
/*! exports provided: ORDER_POPUP_ID */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDER_POPUP_ID", function() { return ORDER_POPUP_ID; });
/* eslint-disable import/prefer-default-export */

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
var ORDER_POPUP_ID = 'MyAccountOrderPopup';

/***/ }),

/***/ "./src/app/component/MyAccountOrderPopup/MyAccountOrderPopup.container.js":
/*!********************************************************************************!*\
  !*** ./src/app/component/MyAccountOrderPopup/MyAccountOrderPopup.container.js ***!
  \********************************************************************************/
/*! exports provided: OrderDispatcher, mapStateToProps, mapDispatchToProps, _MyAccountOrderPopupContainer, MyAccountOrderPopupContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, __, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderDispatcher", function() { return OrderDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MyAccountOrderPopupContainer", function() { return _MyAccountOrderPopupContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountOrderPopupContainer", function() { return MyAccountOrderPopupContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _query_Order_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../query/Order.query */ "./src/app/query/Order.query.js");
/* harmony import */ var _store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/Notification/Notification.action */ "./src/app/store/Notification/Notification.action.js");
/* harmony import */ var _type_Account__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../type/Account */ "./src/app/type/Account.js");
/* harmony import */ var _util_Product__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../util/Product */ "./src/app/util/Product/index.js");
/* harmony import */ var _util_Request__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../util/Request */ "./src/app/util/Request/index.js");
/* harmony import */ var _MyAccountOrderPopup_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./MyAccountOrderPopup.component */ "./src/app/component/MyAccountOrderPopup/MyAccountOrderPopup.component.js");
/* harmony import */ var _MyAccountOrderPopup_config__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./MyAccountOrderPopup.config */ "./src/app/component/MyAccountOrderPopup/MyAccountOrderPopup.config.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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










var OrderDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/Order/Order.dispatcher */ "./src/app/store/Order/Order.dispatcher.js"));
/** @namespace Component/MyAccountOrderPopup/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    order: state.OrderReducer.order,
    payload: state.PopupReducer.popupPayload[_MyAccountOrderPopup_config__WEBPACK_IMPORTED_MODULE_9__["ORDER_POPUP_ID"]] || {},
    currency_code: state.ConfigReducer.default_display_currency_code
  };
}, "Component/MyAccountOrderPopup/Container/mapStateToProps");
/** @namespace Component/MyAccountOrderPopup/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    showNotification: function showNotification(type, message) {
      return dispatch(Object(_store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_4__["showNotification"])(type, message));
    },
    getOrder: function getOrder(orderId) {
      return OrderDispatcher.then(function (_ref) {
        var dispatcher = _ref.default;
        return dispatcher.getOrderById(dispatch, orderId);
      });
    }
  };
}, "Component/MyAccountOrderPopup/Container/mapDispatchToProps");
/** @namespace Component/MyAccountOrderPopup/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MyAccountOrderPopupContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MyAccountOrderPopupContainer, _Extensible);

  function _MyAccountOrderPopupContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _MyAccountOrderPopupContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_MyAccountOrderPopupContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      order: {},
      prevOrderId: 0,
      isLoading: true
    });

    _defineProperty(_assertThisInitialized(_this), "containerProps", function () {
      var _this$state = _this.state,
          stateOrder = _this$state.order,
          isLoading = _this$state.isLoading;
      var _this$props = _this.props,
          payloadOrder = _this$props.payload.order,
          currency_code = _this$props.currency_code;
      return {
        isLoading: isLoading,
        currency_code: currency_code,
        order: _objectSpread2(_objectSpread2({}, payloadOrder), stateOrder)
      };
    });

    return _this;
  }

  _createClass(_MyAccountOrderPopupContainer, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var prevId = prevProps.payload.increment_id;
      var id = this.props.payload.increment_id;

      if (id !== prevId) {
        this.requestOrderDetails();
      }
    }
  }, {
    key: "requestOrderDetails",
    value: function requestOrderDetails() {
      var _this2 = this;

      var _this$props$payload = this.props.payload;
      _this$props$payload = _this$props$payload === void 0 ? {} : _this$props$payload;
      var _this$props$payload$o = _this$props$payload.order;
      _this$props$payload$o = _this$props$payload$o === void 0 ? {} : _this$props$payload$o;
      var _this$props$payload$o2 = _this$props$payload$o.base_order_info;
      _this$props$payload$o2 = _this$props$payload$o2 === void 0 ? {} : _this$props$payload$o2;
      var id = _this$props$payload$o2.id;
      Object(_util_Request__WEBPACK_IMPORTED_MODULE_7__["fetchQuery"])(_query_Order_query__WEBPACK_IMPORTED_MODULE_3__["default"].getOrderByIdQuery(id)).then(
      /** @namespace Component/MyAccountOrderPopup/Container/requestOrderDetailsFetchQueryThen */
      middleware(function (_ref2) {
        var rawOrder = _ref2.getOrderById;
        var _rawOrder$order_produ = rawOrder.order_products,
            order_products = _rawOrder$order_produ === void 0 ? [] : _rawOrder$order_produ;
        var indexedProducts = Object(_util_Product__WEBPACK_IMPORTED_MODULE_6__["getIndexedProducts"])(order_products);

        var order = _objectSpread2(_objectSpread2({}, rawOrder), {}, {
          order_products: indexedProducts
        });

        _this2.setState({
          order: order,
          isLoading: false
        });
      }, "Component/MyAccountOrderPopup/Container/requestOrderDetailsFetchQueryThen"),
      /** @namespace Component/MyAccountOrderPopup/Container/requestOrderDetailsFetchQueryCatch */
      middleware(function () {
        Object(_store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_4__["showNotification"])('error', __('Error getting Order by ID!'));

        _this2.setState({
          isLoading: false
        });
      }, "Component/MyAccountOrderPopup/Container/requestOrderDetailsFetchQueryCatch"));
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _MyAccountOrderPopup_component__WEBPACK_IMPORTED_MODULE_8__["default"], this.containerProps())
      );
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var id = props.payload.increment_id;
      var prevOrderId = state.prevOrderId;

      if (prevOrderId === id) {
        return null;
      }

      return {
        order: {},
        isLoading: true,
        prevOrderId: id
      };
    }
  }]);

  return _MyAccountOrderPopupContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_MyAccountOrderPopupContainer, 'name', {
  value: 'MyAccountOrderPopupContainer'
});

var MyAccountOrderPopupContainer = middleware(_MyAccountOrderPopupContainer, "Component/MyAccountOrderPopup/Container");

_defineProperty(MyAccountOrderPopupContainer, "propTypes", {
  payload: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
    order: _type_Account__WEBPACK_IMPORTED_MODULE_5__["orderType"],
    increment_id: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
  }).isRequired,
  showNotification: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  getOrder: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  currency_code: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(MyAccountOrderPopupContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/MyAccountOrderPopup/MyAccountOrderPopup.style.scss":
/*!******************************************************************************!*\
  !*** ./src/app/component/MyAccountOrderPopup/MyAccountOrderPopup.style.scss ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340633
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/MyAccountOrderPopup/index.js":
/*!********************************************************!*\
  !*** ./src/app/component/MyAccountOrderPopup/index.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyAccountOrderPopup_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MyAccountOrderPopup.container */ "./src/app/component/MyAccountOrderPopup/MyAccountOrderPopup.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _MyAccountOrderPopup_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/MyAccountOrderTableRow/MyAccountOrderTableRow.component.js":
/*!**************************************************************************************!*\
  !*** ./src/app/component/MyAccountOrderTableRow/MyAccountOrderTableRow.component.js ***!
  \**************************************************************************************/
/*! exports provided: _MyAccountOrderTableRow, MyAccountOrderTableRow, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MyAccountOrderTableRow", function() { return _MyAccountOrderTableRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountOrderTableRow", function() { return MyAccountOrderTableRow; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _type_Account__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../type/Account */ "./src/app/type/Account.js");
/* harmony import */ var _util_Price__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/Price */ "./src/app/util/Price/index.js");
/* harmony import */ var _MyAccountOrderTableRow_style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MyAccountOrderTableRow.style */ "./src/app/component/MyAccountOrderTableRow/MyAccountOrderTableRow.style.scss");
/* harmony import */ var _MyAccountOrderTableRow_style__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_MyAccountOrderTableRow_style__WEBPACK_IMPORTED_MODULE_4__);
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
 * @package scandipwa/base-tdeme
 * @link https://gitdub.com/scandipwa/base-tdeme
 */





/** @namespace Component/MyAccountOrderTableRow/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MyAccountOrderTableRow =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MyAccountOrderTableRow, _Extensible);

  function _MyAccountOrderTableRow() {
    _classCallCheck(this, _MyAccountOrderTableRow);

    return _possibleConstructorReturn(this, _getPrototypeOf(_MyAccountOrderTableRow).apply(this, arguments));
  }

  _createClass(_MyAccountOrderTableRow, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          _this$props$base_orde = _this$props.base_order_info,
          created_at = _this$props$base_orde.created_at,
          status_label = _this$props$base_orde.status_label,
          increment_id = _this$props$base_orde.increment_id,
          grand_total = _this$props$base_orde.grand_total,
          onViewClick = _this$props.onViewClick,
          currency_code = _this$props.currency_code;
      return (
        /*#__PURE__*/
        _checkBEM(React, "tr", {
          onClick: onViewClick,
          block: "MyAccountOrderTableRow"
        },
        /*#__PURE__*/
        _checkBEM(React, "td", null, increment_id ? "#".concat(increment_id) : ''),
        /*#__PURE__*/
        _checkBEM(React, "td", null, created_at),
        /*#__PURE__*/
        _checkBEM(React, "td", null, status_label),
        /*#__PURE__*/
        _checkBEM(React, "td", {
          block: "hidden-mobile"
        }, grand_total ? Object(_util_Price__WEBPACK_IMPORTED_MODULE_3__["formatPrice"])(grand_total, currency_code) : ''))
      );
    }
  }]);

  return _MyAccountOrderTableRow;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_MyAccountOrderTableRow, 'name', {
  value: 'MyAccountOrderTableRow'
});

var MyAccountOrderTableRow = middleware(_MyAccountOrderTableRow, "Component/MyAccountOrderTableRow/Component");

_defineProperty(MyAccountOrderTableRow, "propTypes", {
  currency_code: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  base_order_info: _type_Account__WEBPACK_IMPORTED_MODULE_2__["baseOrderInfoType"].isRequired,
  onViewClick: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (MyAccountOrderTableRow);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/MyAccountOrderTableRow/MyAccountOrderTableRow.container.js":
/*!**************************************************************************************!*\
  !*** ./src/app/component/MyAccountOrderTableRow/MyAccountOrderTableRow.container.js ***!
  \**************************************************************************************/
/*! exports provided: mapStateToProps, mapDispatchToProps, _MyAccountOrderTableRowContainer, MyAccountOrderTableRowContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, __, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MyAccountOrderTableRowContainer", function() { return _MyAccountOrderTableRowContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountOrderTableRowContainer", function() { return MyAccountOrderTableRowContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _MyAccountOrderPopup_MyAccountOrderPopup_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../MyAccountOrderPopup/MyAccountOrderPopup.config */ "./src/app/component/MyAccountOrderPopup/MyAccountOrderPopup.config.js");
/* harmony import */ var _store_Popup_Popup_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/Popup/Popup.action */ "./src/app/store/Popup/Popup.action.js");
/* harmony import */ var _type_Account__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../type/Account */ "./src/app/type/Account.js");
/* harmony import */ var _MyAccountOrderTableRow_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MyAccountOrderTableRow.component */ "./src/app/component/MyAccountOrderTableRow/MyAccountOrderTableRow.component.js");
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







/** @namespace Component/MyAccountOrderTableRow/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    currency_code: state.ConfigReducer.default_display_currency_code
  };
}, "Component/MyAccountOrderTableRow/Container/mapStateToProps");
/** @namespace Component/MyAccountOrderTableRow/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    showPopup: function showPopup(payload) {
      return dispatch(Object(_store_Popup_Popup_action__WEBPACK_IMPORTED_MODULE_4__["showPopup"])(_MyAccountOrderPopup_MyAccountOrderPopup_config__WEBPACK_IMPORTED_MODULE_3__["ORDER_POPUP_ID"], payload));
    }
  };
}, "Component/MyAccountOrderTableRow/Container/mapDispatchToProps");
/** @namespace Component/MyAccountOrderTableRow/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MyAccountOrderTableRowContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MyAccountOrderTableRowContainer, _Extensible);

  function _MyAccountOrderTableRowContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _MyAccountOrderTableRowContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_MyAccountOrderTableRowContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      onViewClick: _this.onViewClick.bind(_assertThisInitialized(_this))
    });

    _defineProperty(_assertThisInitialized(_this), "containerProps", function () {
      var _this$props = _this.props,
          base_order_info = _this$props.order.base_order_info,
          currency_code = _this$props.currency_code;
      return {
        base_order_info: base_order_info,
        currency_code: currency_code
      };
    });

    return _this;
  }

  _createClass(_MyAccountOrderTableRowContainer, [{
    key: "onViewClick",
    value: function onViewClick() {
      var _this$props2 = this.props,
          showPopup = _this$props2.showPopup,
          order = _this$props2.order;
      var increment_id = order.base_order_info.increment_id;
      showPopup({
        title: __('Order #%s', increment_id),
        increment_id: increment_id,
        order: order
      });
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _MyAccountOrderTableRow_component__WEBPACK_IMPORTED_MODULE_6__["default"], _extends({}, this.containerProps(), this.containerFunctions))
      );
    }
  }]);

  return _MyAccountOrderTableRowContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_MyAccountOrderTableRowContainer, 'name', {
  value: 'MyAccountOrderTableRowContainer'
});

var MyAccountOrderTableRowContainer = middleware(_MyAccountOrderTableRowContainer, "Component/MyAccountOrderTableRow/Container");

_defineProperty(MyAccountOrderTableRowContainer, "propTypes", {
  showPopup: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  currency_code: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  order: _type_Account__WEBPACK_IMPORTED_MODULE_5__["orderType"].isRequired
});

_defineProperty(MyAccountOrderTableRowContainer, "defaultProps", {
  currency_code: ''
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(MyAccountOrderTableRowContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/MyAccountOrderTableRow/MyAccountOrderTableRow.style.scss":
/*!************************************************************************************!*\
  !*** ./src/app/component/MyAccountOrderTableRow/MyAccountOrderTableRow.style.scss ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340594
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/MyAccountOrderTableRow/index.js":
/*!***********************************************************!*\
  !*** ./src/app/component/MyAccountOrderTableRow/index.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyAccountOrderTableRow_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MyAccountOrderTableRow.container */ "./src/app/component/MyAccountOrderTableRow/MyAccountOrderTableRow.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _MyAccountOrderTableRow_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/MyAccountOverlay/MyAccountOverlay.component.js":
/*!**************************************************************************!*\
  !*** ./src/app/component/MyAccountOverlay/MyAccountOverlay.component.js ***!
  \**************************************************************************/
/*! exports provided: _MyAccountOverlay, MyAccountOverlay, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, __, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MyAccountOverlay", function() { return _MyAccountOverlay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountOverlay", function() { return MyAccountOverlay; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Loader */ "./src/app/component/Loader/index.js");
/* harmony import */ var _MyAccountConfirmEmail__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../MyAccountConfirmEmail */ "./src/app/component/MyAccountConfirmEmail/index.js");
/* harmony import */ var _MyAccountCreateAccount__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../MyAccountCreateAccount */ "./src/app/component/MyAccountCreateAccount/index.js");
/* harmony import */ var _MyAccountForgotPassword__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../MyAccountForgotPassword */ "./src/app/component/MyAccountForgotPassword/index.js");
/* harmony import */ var _MyAccountForgotPasswordSuccess__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../MyAccountForgotPasswordSuccess */ "./src/app/component/MyAccountForgotPasswordSuccess/index.js");
/* harmony import */ var _MyAccountSignIn__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../MyAccountSignIn */ "./src/app/component/MyAccountSignIn/index.js");
/* harmony import */ var _Overlay__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Overlay */ "./src/app/component/Overlay/index.js");
/* harmony import */ var _type_Account__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../type/Account */ "./src/app/type/Account.js");
/* harmony import */ var _type_Device__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../type/Device */ "./src/app/type/Device.js");
/* harmony import */ var _MyAccountOverlay_config__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./MyAccountOverlay.config */ "./src/app/component/MyAccountOverlay/MyAccountOverlay.config.js");
/* harmony import */ var _MyAccountOverlay_style__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./MyAccountOverlay.style */ "./src/app/component/MyAccountOverlay/MyAccountOverlay.style.scss");
/* harmony import */ var _MyAccountOverlay_style__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_MyAccountOverlay_style__WEBPACK_IMPORTED_MODULE_13__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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














/** @namespace Component/MyAccountOverlay/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MyAccountOverlay =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MyAccountOverlay, _Extensible);

  function _MyAccountOverlay() {
    var _getPrototypeOf2, _defineProperty2;

    var _this;

    _classCallCheck(this, _MyAccountOverlay);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_MyAccountOverlay)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "renderMap", (_defineProperty2 = {}, _defineProperty(_defineProperty2, _MyAccountOverlay_config__WEBPACK_IMPORTED_MODULE_12__["STATE_SIGN_IN"], {
      render: function render() {
        return _this.renderSignIn();
      },
      title: __('Sign in to your account')
    }), _defineProperty(_defineProperty2, _MyAccountOverlay_config__WEBPACK_IMPORTED_MODULE_12__["STATE_FORGOT_PASSWORD"], {
      render: function render() {
        return _this.renderForgotPassword();
      },
      title: __('Get password link')
    }), _defineProperty(_defineProperty2, _MyAccountOverlay_config__WEBPACK_IMPORTED_MODULE_12__["STATE_FORGOT_PASSWORD_SUCCESS"], {
      render: function render() {
        return _this.renderForgotPasswordSuccess();
      }
    }), _defineProperty(_defineProperty2, _MyAccountOverlay_config__WEBPACK_IMPORTED_MODULE_12__["STATE_CREATE_ACCOUNT"], {
      render: function render() {
        return _this.renderCreateAccount();
      },
      title: __('Create new account')
    }), _defineProperty(_defineProperty2, _MyAccountOverlay_config__WEBPACK_IMPORTED_MODULE_12__["STATE_LOGGED_IN"], {
      render: function render() {}
    }), _defineProperty(_defineProperty2, _MyAccountOverlay_config__WEBPACK_IMPORTED_MODULE_12__["STATE_CONFIRM_EMAIL"], {
      render: function render() {
        return _this.renderConfirmEmail();
      },
      title: __('Confirm the email')
    }), _defineProperty2));

    return _this;
  }

  _createClass(_MyAccountOverlay, [{
    key: "renderMyAccount",
    value: function renderMyAccount() {
      var state = this.props.state;
      var _this$renderMap$state = this.renderMap[state],
          render = _this$renderMap$state.render,
          title = _this$renderMap$state.title;
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "MyAccountOverlay",
          elem: "Action",
          mods: {
            state: state
          }
        },
        /*#__PURE__*/
        _checkBEM(React, "p", {
          block: "MyAccountOverlay",
          elem: "Heading"
        }, title), render())
      );
    }
  }, {
    key: "renderConfirmEmail",
    value: function renderConfirmEmail() {
      var _this$props = this.props,
          state = _this$props.state,
          handleSignIn = _this$props.handleSignIn;
      return (
        /*#__PURE__*/
        _checkBEM(React, _MyAccountConfirmEmail__WEBPACK_IMPORTED_MODULE_4__["default"], {
          state: state,
          handleSignIn: handleSignIn
        })
      );
    }
  }, {
    key: "renderForgotPassword",
    value: function renderForgotPassword() {
      var _this$props2 = this.props,
          state = _this$props2.state,
          onFormError = _this$props2.onFormError,
          handleSignIn = _this$props2.handleSignIn,
          handleCreateAccount = _this$props2.handleCreateAccount,
          setSignInState = _this$props2.setSignInState,
          setLoadingState = _this$props2.setLoadingState,
          isCheckout = _this$props2.isCheckout;
      return (
        /*#__PURE__*/
        _checkBEM(React, _MyAccountForgotPassword__WEBPACK_IMPORTED_MODULE_6__["default"], {
          state: state,
          onFormError: onFormError,
          handleSignIn: handleSignIn,
          handleCreateAccount: handleCreateAccount,
          setLoadingState: setLoadingState,
          setSignInState: setSignInState,
          isCheckout: isCheckout
        })
      );
    }
  }, {
    key: "renderForgotPasswordSuccess",
    value: function renderForgotPasswordSuccess() {
      var _this$props3 = this.props,
          state = _this$props3.state,
          handleSignIn = _this$props3.handleSignIn;
      return (
        /*#__PURE__*/
        _checkBEM(React, _MyAccountForgotPasswordSuccess__WEBPACK_IMPORTED_MODULE_7__["default"], {
          state: state,
          handleSignIn: handleSignIn
        })
      );
    }
  }, {
    key: "renderCreateAccount",
    value: function renderCreateAccount() {
      var _this$props4 = this.props,
          state = _this$props4.state,
          handleSignIn = _this$props4.handleSignIn,
          setSignInState = _this$props4.setSignInState,
          setLoadingState = _this$props4.setLoadingState,
          onSignIn = _this$props4.onSignIn;
      return (
        /*#__PURE__*/
        _checkBEM(React, _MyAccountCreateAccount__WEBPACK_IMPORTED_MODULE_5__["default"], {
          state: state,
          handleSignIn: handleSignIn,
          setLoadingState: setLoadingState,
          setSignInState: setSignInState,
          onSignIn: onSignIn
        })
      );
    }
  }, {
    key: "renderSignIn",
    value: function renderSignIn() {
      var _this$props5 = this.props,
          state = _this$props5.state,
          onFormError = _this$props5.onFormError,
          handleForgotPassword = _this$props5.handleForgotPassword,
          handleCreateAccount = _this$props5.handleCreateAccount,
          isCheckout = _this$props5.isCheckout,
          setLoadingState = _this$props5.setLoadingState,
          onSignIn = _this$props5.onSignIn;
      return (
        /*#__PURE__*/
        _checkBEM(React, _MyAccountSignIn__WEBPACK_IMPORTED_MODULE_8__["default"], {
          state: state,
          onFormError: onFormError,
          handleForgotPassword: handleForgotPassword,
          handleCreateAccount: handleCreateAccount,
          isCheckout: isCheckout,
          setLoadingState: setLoadingState,
          onSignIn: onSignIn
        })
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props6 = this.props,
          isLoading = _this$props6.isLoading,
          onVisible = _this$props6.onVisible,
          isCheckout = _this$props6.isCheckout,
          device = _this$props6.device;
      return (
        /*#__PURE__*/
        _checkBEM(React, _Overlay__WEBPACK_IMPORTED_MODULE_9__["default"], {
          id: _MyAccountOverlay_config__WEBPACK_IMPORTED_MODULE_12__["CUSTOMER_ACCOUNT_OVERLAY_KEY"],
          mix: {
            block: 'MyAccountOverlay'
          },
          onVisible: onVisible,
          isStatic: !isCheckout && device.isMobile
        },
        /*#__PURE__*/
        _checkBEM(React, _Loader__WEBPACK_IMPORTED_MODULE_3__["default"], {
          isLoading: isLoading
        }), this.renderMyAccount())
      );
    }
  }]);

  return _MyAccountOverlay;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_MyAccountOverlay, 'name', {
  value: 'MyAccountOverlay'
});

var MyAccountOverlay = middleware(_MyAccountOverlay, "Component/MyAccountOverlay/Component");

_defineProperty(MyAccountOverlay, "propTypes", {
  // eslint-disable-next-line react/no-unused-prop-types
  isOverlayVisible: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  state: _type_Account__WEBPACK_IMPORTED_MODULE_10__["signInStateType"].isRequired,
  setSignInState: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  setLoadingState: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  onVisible: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  onFormError: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  handleForgotPassword: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  handleSignIn: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  handleCreateAccount: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  isCheckout: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  device: _type_Device__WEBPACK_IMPORTED_MODULE_11__["DeviceType"].isRequired,
  onSignIn: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

_defineProperty(MyAccountOverlay, "defaultProps", {
  isCheckout: false
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["withRouter"])(MyAccountOverlay));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/MyAccountOverlay/MyAccountOverlay.container.js":
/*!**************************************************************************!*\
  !*** ./src/app/component/MyAccountOverlay/MyAccountOverlay.container.js ***!
  \**************************************************************************/
/*! exports provided: mapStateToProps, mapDispatchToProps, _MyAccountOverlayContainer, MyAccountOverlayContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, __, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MyAccountOverlayContainer", function() { return _MyAccountOverlayContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountOverlayContainer", function() { return MyAccountOverlayContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _Header_Header_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Header/Header.config */ "./src/app/component/Header/Header.config.js");
/* harmony import */ var _route_Checkout_Checkout_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../route/Checkout/Checkout.config */ "./src/app/route/Checkout/Checkout.config.js");
/* harmony import */ var _store_MyAccount_MyAccount_action__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store/MyAccount/MyAccount.action */ "./src/app/store/MyAccount/MyAccount.action.js");
/* harmony import */ var _store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../store/Navigation/Navigation.action */ "./src/app/store/Navigation/Navigation.action.js");
/* harmony import */ var _store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../store/Navigation/Navigation.reducer */ "./src/app/store/Navigation/Navigation.reducer.js");
/* harmony import */ var _store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../store/Notification/Notification.action */ "./src/app/store/Notification/Notification.action.js");
/* harmony import */ var _store_Overlay_Overlay_action__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../store/Overlay/Overlay.action */ "./src/app/store/Overlay/Overlay.action.js");
/* harmony import */ var _type_Device__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../type/Device */ "./src/app/type/Device.js");
/* harmony import */ var _util_Auth__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../util/Auth */ "./src/app/util/Auth/index.js");
/* harmony import */ var _util_History__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../util/History */ "./src/app/util/History/index.js");
/* harmony import */ var _util_Url__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../util/Url */ "./src/app/util/Url/index.js");
/* harmony import */ var _MyAccountOverlay_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./MyAccountOverlay.component */ "./src/app/component/MyAccountOverlay/MyAccountOverlay.component.js");
/* harmony import */ var _MyAccountOverlay_config__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./MyAccountOverlay.config */ "./src/app/component/MyAccountOverlay/MyAccountOverlay.config.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

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
















/** @namespace Component/MyAccountOverlay/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    isSignedIn: state.MyAccountReducer.isSignedIn,
    customer: state.MyAccountReducer.customer,
    device: state.ConfigReducer.device,
    isPasswordForgotSend: state.MyAccountReducer.isPasswordForgotSend,
    isOverlayVisible: state.OverlayReducer.activeOverlay === _Header_Header_config__WEBPACK_IMPORTED_MODULE_3__["CUSTOMER_ACCOUNT"],
    isAuthTokenExpired: state.MyAccountReducer.isAuthTokenExpired
  };
}, "Component/MyAccountOverlay/Container/mapStateToProps");
/** @namespace Component/MyAccountOverlay/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    hideActiveOverlay: function hideActiveOverlay() {
      return dispatch(Object(_store_Overlay_Overlay_action__WEBPACK_IMPORTED_MODULE_9__["hideActiveOverlay"])());
    },
    showNotification: function showNotification(type, message) {
      return dispatch(Object(_store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_8__["showNotification"])(type, message));
    },
    showOverlay: function showOverlay(overlayKey) {
      return dispatch(Object(_store_Overlay_Overlay_action__WEBPACK_IMPORTED_MODULE_9__["toggleOverlayByKey"])(overlayKey));
    },
    setHeaderState: function setHeaderState(headerState) {
      return dispatch(Object(_store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_6__["changeNavigationState"])(_store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_7__["TOP_NAVIGATION_TYPE"], headerState));
    },
    goToPreviousHeaderState: function goToPreviousHeaderState() {
      return dispatch(Object(_store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_6__["goToPreviousNavigationState"])(_store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_7__["TOP_NAVIGATION_TYPE"]));
    },
    setIsAuthTokenExpired: function setIsAuthTokenExpired(status) {
      return dispatch(Object(_store_MyAccount_MyAccount_action__WEBPACK_IMPORTED_MODULE_5__["updateCustomerIsAuthTokenExpired"])(status));
    }
  };
}, "Component/MyAccountOverlay/Container/mapDispatchToProps");
/** @namespace Component/MyAccountOverlay/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MyAccountOverlayContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MyAccountOverlayContainer, _Extensible);

  function _MyAccountOverlayContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _MyAccountOverlayContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_MyAccountOverlayContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      onFormError: _this.onFormError.bind(_assertThisInitialized(_this)),
      handleForgotPassword: _this.handleForgotPassword.bind(_assertThisInitialized(_this)),
      handleSignIn: _this.handleSignIn.bind(_assertThisInitialized(_this)),
      handleCreateAccount: _this.handleCreateAccount.bind(_assertThisInitialized(_this)),
      onVisible: _this.onVisible.bind(_assertThisInitialized(_this)),
      setSignInState: _this.setSignInState.bind(_assertThisInitialized(_this)),
      setLoadingState: _this.setLoadingState.bind(_assertThisInitialized(_this))
    });

    _defineProperty(_assertThisInitialized(_this), "redirectOrGetState", function (props) {
      var showOverlay = props.showOverlay,
          setHeaderState = props.setHeaderState,
          isPasswordForgotSend = props.isPasswordForgotSend,
          device = props.device;
      var _history$location = _util_History__WEBPACK_IMPORTED_MODULE_12__["default"].location,
          pathname = _history$location.pathname,
          _history$location$sta = _history$location.state;
      _history$location$sta = _history$location$sta === void 0 ? {} : _history$location$sta;
      var isForgotPassword = _history$location$sta.isForgotPassword;
      var state = {
        state: Object(_util_Auth__WEBPACK_IMPORTED_MODULE_11__["isSignedIn"])() ? _MyAccountOverlay_config__WEBPACK_IMPORTED_MODULE_15__["STATE_LOGGED_IN"] : _MyAccountOverlay_config__WEBPACK_IMPORTED_MODULE_15__["STATE_SIGN_IN"],
        // eslint-disable-next-line react/no-unused-state
        isPasswordForgotSend: isPasswordForgotSend,
        isLoading: false
      }; // if customer got here from forgot-password

      if (pathname !== '/forgot-password' && !isForgotPassword) {
        return state;
      }

      state.state = _MyAccountOverlay_config__WEBPACK_IMPORTED_MODULE_15__["STATE_FORGOT_PASSWORD"];
      setHeaderState({
        name: _Header_Header_config__WEBPACK_IMPORTED_MODULE_3__["CUSTOMER_SUB_ACCOUNT"],
        title: 'Forgot password',
        onBackClick: function onBackClick(e) {
          _util_History__WEBPACK_IMPORTED_MODULE_12__["default"].push({
            pathname: Object(_util_Url__WEBPACK_IMPORTED_MODULE_13__["appendWithStoreCode"])('/my-account')
          });

          _this.handleSignIn(e);
        }
      });

      if (device.isMobile) {
        _util_History__WEBPACK_IMPORTED_MODULE_12__["default"].push({
          pathname: Object(_util_Url__WEBPACK_IMPORTED_MODULE_13__["appendWithStoreCode"])('/my-account'),
          state: {
            isForgotPassword: true
          }
        });
        return state;
      }

      showOverlay(_MyAccountOverlay_config__WEBPACK_IMPORTED_MODULE_15__["CUSTOMER_ACCOUNT_OVERLAY_KEY"]);
      return state;
    });

    _defineProperty(_assertThisInitialized(_this), "stopLoading", function () {
      return _this.setState({
        isLoading: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "stopLoadingAndHideOverlay", function () {
      var hideActiveOverlay = _this.props.hideActiveOverlay;

      _this.stopLoading();

      hideActiveOverlay();
    });

    return _this;
  }

  _createClass(_MyAccountOverlayContainer, [{
    key: "__construct",
    value: function __construct(props) {
      _get(_getPrototypeOf(_MyAccountOverlayContainer.prototype), "__construct", this).call(this, props);

      this.state = this.redirectOrGetState(props);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var prevIsSignedIn = prevProps.isSignedIn;
      var oldMyAccountState = prevState.state;
      var newMyAccountState = this.state.state;
      var pathname = _util_History__WEBPACK_IMPORTED_MODULE_12__["default"].location.pathname;
      var _this$props = this.props,
          isSignedIn = _this$props.isSignedIn,
          hideActiveOverlay = _this$props.hideActiveOverlay,
          isCheckout = _this$props.isCheckout,
          goToPreviousHeaderState = _this$props.goToPreviousHeaderState,
          showNotification = _this$props.showNotification,
          isAuthTokenExpired = _this$props.isAuthTokenExpired,
          setIsAuthTokenExpired = _this$props.setIsAuthTokenExpired;

      if (oldMyAccountState === newMyAccountState) {
        return;
      }

      if (isSignedIn !== prevIsSignedIn) {
        if (isAuthTokenExpired) {
          setIsAuthTokenExpired(false);
          showNotification('error', __('Your session is over, you are logged out!'));
        } else if (isSignedIn) {
          showNotification('success', __('You are successfully logged in!'));
        } else {
          showNotification('success', __('You are successfully logged out!'));
        }

        hideActiveOverlay();

        if (isCheckout) {
          goToPreviousHeaderState();
        }
      }

      if (!pathname.includes(_route_Checkout_Checkout_config__WEBPACK_IMPORTED_MODULE_4__["CHECKOUT_URL"]) && newMyAccountState === _MyAccountOverlay_config__WEBPACK_IMPORTED_MODULE_15__["STATE_LOGGED_IN"]) {
        _util_History__WEBPACK_IMPORTED_MODULE_12__["default"].push({
          pathname: Object(_util_Url__WEBPACK_IMPORTED_MODULE_13__["appendWithStoreCode"])('/my-account/dashboard')
        });
      }
    }
  }, {
    key: "setSignInState",
    value: function setSignInState(state) {
      this.setState({
        state: state
      });
    }
  }, {
    key: "setLoadingState",
    value: function setLoadingState(isLoading) {
      this.setState({
        isLoading: isLoading
      });
    }
  }, {
    key: "onVisible",
    value: function onVisible() {
      var _this$props2 = this.props,
          setHeaderState = _this$props2.setHeaderState,
          isCheckout = _this$props2.isCheckout,
          device = _this$props2.device;

      if (device.isMobile && !isCheckout) {
        setHeaderState({
          name: _Header_Header_config__WEBPACK_IMPORTED_MODULE_3__["CUSTOMER_ACCOUNT"],
          title: __('Sign in')
        });
      }
    }
  }, {
    key: "onFormError",
    value: function onFormError() {
      this.setState({
        isLoading: false
      });
    }
  }, {
    key: "handleForgotPassword",
    value: function handleForgotPassword(e) {
      var _this2 = this;

      var setHeaderState = this.props.setHeaderState;
      e.preventDefault();
      e.nativeEvent.stopImmediatePropagation();
      this.setState({
        state: _MyAccountOverlay_config__WEBPACK_IMPORTED_MODULE_15__["STATE_FORGOT_PASSWORD"]
      });
      setHeaderState({
        name: _Header_Header_config__WEBPACK_IMPORTED_MODULE_3__["CUSTOMER_SUB_ACCOUNT"],
        title: __('Forgot password'),
        onBackClick: function onBackClick() {
          return _this2.handleSignIn(e);
        }
      });
    }
  }, {
    key: "handleSignIn",
    value: function handleSignIn(e) {
      var setHeaderState = this.props.setHeaderState;
      e.preventDefault();
      e.nativeEvent.stopImmediatePropagation();
      this.setState({
        state: _MyAccountOverlay_config__WEBPACK_IMPORTED_MODULE_15__["STATE_SIGN_IN"]
      });
      setHeaderState({
        name: _Header_Header_config__WEBPACK_IMPORTED_MODULE_3__["CUSTOMER_ACCOUNT"],
        title: __('Sign in')
      });
    }
  }, {
    key: "handleCreateAccount",
    value: function handleCreateAccount(e) {
      var _this3 = this;

      var setHeaderState = this.props.setHeaderState;
      e.preventDefault();
      e.nativeEvent.stopImmediatePropagation();
      this.setState({
        state: _MyAccountOverlay_config__WEBPACK_IMPORTED_MODULE_15__["STATE_CREATE_ACCOUNT"]
      });
      setHeaderState({
        name: _Header_Header_config__WEBPACK_IMPORTED_MODULE_3__["CUSTOMER_SUB_ACCOUNT"],
        title: __('Create account'),
        onBackClick: function onBackClick() {
          return _this3.handleSignIn(e);
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _MyAccountOverlay_component__WEBPACK_IMPORTED_MODULE_14__["default"], _extends({}, this.props, this.state, this.containerFunctions))
      );
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var isSignedIn = props.isSignedIn,
          isPasswordForgotSend = props.isPasswordForgotSend,
          showNotification = props.showNotification,
          isOverlayVisible = props.isOverlayVisible,
          device = props.device;
      var currentIsPasswordForgotSend = state.isPasswordForgotSend,
          myAccountState = state.state;
      var _history$location2 = _util_History__WEBPACK_IMPORTED_MODULE_12__["default"].location,
          pathname = _history$location2.pathname,
          _history$location2$st = _history$location2.state;
      _history$location2$st = _history$location2$st === void 0 ? {} : _history$location2$st;
      var isForgotPassword = _history$location2$st.isForgotPassword;
      var stateToBeUpdated = {};

      if (!device.isMobile) {
        if (!isOverlayVisible && !isSignedIn) {
          if (pathname !== '/forgot-password' && !isForgotPassword) {
            stateToBeUpdated.state = _MyAccountOverlay_config__WEBPACK_IMPORTED_MODULE_15__["STATE_SIGN_IN"];
          }
        } else if (!isOverlayVisible && isSignedIn) {
          stateToBeUpdated.state = _MyAccountOverlay_config__WEBPACK_IMPORTED_MODULE_15__["STATE_LOGGED_IN"];
        }
      }

      if (myAccountState !== _MyAccountOverlay_config__WEBPACK_IMPORTED_MODULE_15__["STATE_LOGGED_IN"] && isSignedIn) {
        stateToBeUpdated.isLoading = false;
        stateToBeUpdated.state = _MyAccountOverlay_config__WEBPACK_IMPORTED_MODULE_15__["STATE_LOGGED_IN"];
      }

      if (myAccountState === _MyAccountOverlay_config__WEBPACK_IMPORTED_MODULE_15__["STATE_LOGGED_IN"] && !isSignedIn) {
        stateToBeUpdated.state = _MyAccountOverlay_config__WEBPACK_IMPORTED_MODULE_15__["STATE_SIGN_IN"];
      }

      if (isPasswordForgotSend !== currentIsPasswordForgotSend) {
        stateToBeUpdated.isLoading = false;
        stateToBeUpdated.isPasswordForgotSend = isPasswordForgotSend; // eslint-disable-next-line max-len

        showNotification('success', __('If there is an account associated with the provided address you will receive an email with a link to reset your password.'));
        stateToBeUpdated.state = _MyAccountOverlay_config__WEBPACK_IMPORTED_MODULE_15__["STATE_SIGN_IN"];
      }

      return Object.keys(stateToBeUpdated).length ? stateToBeUpdated : null;
    }
  }]);

  return _MyAccountOverlayContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_MyAccountOverlayContainer, 'name', {
  value: 'MyAccountOverlayContainer'
});

var MyAccountOverlayContainer = middleware(_MyAccountOverlayContainer, "Component/MyAccountOverlay/Container");

_defineProperty(MyAccountOverlayContainer, "propTypes", {
  isPasswordForgotSend: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  isSignedIn: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  showNotification: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  isOverlayVisible: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  showOverlay: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  setHeaderState: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  onSignIn: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  goToPreviousHeaderState: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  isCheckout: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  hideActiveOverlay: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  device: _type_Device__WEBPACK_IMPORTED_MODULE_10__["DeviceType"].isRequired,
  isAuthTokenExpired: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  setIsAuthTokenExpired: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

_defineProperty(MyAccountOverlayContainer, "defaultProps", {
  isCheckout: false,
  isAuthTokenExpired: false,
  onSignIn: function onSignIn() {},
  goToPreviousHeaderState: function goToPreviousHeaderState() {}
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(MyAccountOverlayContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/MyAccountOverlay/index.js":
/*!*****************************************************!*\
  !*** ./src/app/component/MyAccountOverlay/index.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyAccountOverlay_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MyAccountOverlay.container */ "./src/app/component/MyAccountOverlay/MyAccountOverlay.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _MyAccountOverlay_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/MyAccountPasswordForm/MyAccountPasswordForm.component.js":
/*!************************************************************************************!*\
  !*** ./src/app/component/MyAccountPasswordForm/MyAccountPasswordForm.component.js ***!
  \************************************************************************************/
/*! exports provided: _MyAccountPasswordForm, MyAccountPasswordForm, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MyAccountPasswordForm", function() { return _MyAccountPasswordForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountPasswordForm", function() { return MyAccountPasswordForm; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _FieldForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FieldForm */ "./src/app/component/FieldForm/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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


/** @namespace Component/MyAccountPasswordForm/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MyAccountPasswordForm =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MyAccountPasswordForm, _Extensible);

  function _MyAccountPasswordForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _MyAccountPasswordForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_MyAccountPasswordForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onFormSuccess", function (fields) {
      var onPasswordChange = _this.props.onPasswordChange;
      onPasswordChange(fields);
    });

    return _this;
  }

  _createClass(_MyAccountPasswordForm, [{
    key: "renderActions",
    value: function renderActions() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "button", {
          block: "Button",
          mix: {
            block: 'MyAccount',
            elem: 'Button'
          }
        }, __('Change password'))
      );
    }
  }, {
    key: "fieldMap",
    get: function get() {
      return {
        currentPassword: {
          type: 'password',
          label: __('Current Password'),
          validation: ['notEmpty']
        },
        newPassword: {
          type: 'password',
          label: __('New password'),
          validation: ['notEmpty']
        }
      };
    }
  }]);

  return _MyAccountPasswordForm;
}(Extensible(_FieldForm__WEBPACK_IMPORTED_MODULE_1__["default"]));
Object.defineProperty(_MyAccountPasswordForm, 'name', {
  value: 'MyAccountPasswordForm'
});

var MyAccountPasswordForm = middleware(_MyAccountPasswordForm, "Component/MyAccountPasswordForm/Component");

_defineProperty(MyAccountPasswordForm, "propTypes", {
  onPasswordChange: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (MyAccountPasswordForm);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/MyAccountPasswordForm/index.js":
/*!**********************************************************!*\
  !*** ./src/app/component/MyAccountPasswordForm/index.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyAccountPasswordForm_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MyAccountPasswordForm.component */ "./src/app/component/MyAccountPasswordForm/MyAccountPasswordForm.component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _MyAccountPasswordForm_component__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/MyAccountTabList/MyAccountTabList.component.js":
/*!**************************************************************************!*\
  !*** ./src/app/component/MyAccountTabList/MyAccountTabList.component.js ***!
  \**************************************************************************/
/*! exports provided: _MyAccountTabList, MyAccountTabList, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MyAccountTabList", function() { return _MyAccountTabList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountTabList", function() { return MyAccountTabList; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ExpandableContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ExpandableContent */ "./src/app/component/ExpandableContent/index.js");
/* harmony import */ var _MyAccountTabListItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../MyAccountTabListItem */ "./src/app/component/MyAccountTabListItem/index.js");
/* harmony import */ var _type_Account__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../type/Account */ "./src/app/type/Account.js");
/* harmony import */ var _util_Auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../util/Auth */ "./src/app/util/Auth/index.js");
/* harmony import */ var _MyAccountTabList_style__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MyAccountTabList.style */ "./src/app/component/MyAccountTabList/MyAccountTabList.style.scss");
/* harmony import */ var _MyAccountTabList_style__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_MyAccountTabList_style__WEBPACK_IMPORTED_MODULE_6__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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







/** @namespace Component/MyAccountTabList/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MyAccountTabList =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MyAccountTabList, _Extensible);

  function _MyAccountTabList() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _MyAccountTabList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_MyAccountTabList)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isContentExpanded: false
    });

    _defineProperty(_assertThisInitialized(_this), "toggleExpandableContent", function () {
      _this.setState(function (_ref) {
        var isContentExpanded = _ref.isContentExpanded;
        return {
          isContentExpanded: !isContentExpanded
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onTabClick", function (key) {
      var changeActiveTab = _this.props.changeActiveTab;

      if (!Object(_util_Auth__WEBPACK_IMPORTED_MODULE_5__["isSignedIn"])()) {
        return;
      }

      _this.toggleExpandableContent();

      changeActiveTab(key);
    });

    _defineProperty(_assertThisInitialized(_this), "renderTabListItem", function (tabEntry) {
      var activeTab = _this.props.activeTab;

      var _tabEntry = _slicedToArray(tabEntry, 1),
          key = _tabEntry[0];

      return (
        /*#__PURE__*/
        _checkBEM(React, _MyAccountTabListItem__WEBPACK_IMPORTED_MODULE_3__["default"], {
          key: key,
          isActive: activeTab === key,
          changeActiveTab: _this.onTabClick,
          tabEntry: tabEntry
        })
      );
    });

    return _this;
  }

  _createClass(_MyAccountTabList, [{
    key: "renderLogoutTab",
    value: function renderLogoutTab() {
      var handleLogout = this.props.handleLogout;
      return (
        /*#__PURE__*/
        _checkBEM(React, "li", {
          key: "logout",
          block: "MyAccountTabListItem"
        },
        /*#__PURE__*/
        _checkBEM(React, "button", {
          block: "MyAccountTabListItem",
          elem: "Button",
          onClick: handleLogout,
          role: "link"
        }, __('Logout')))
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          tabMap = _this$props.tabMap,
          activeTab = _this$props.activeTab;
      var isContentExpanded = this.state.isContentExpanded;
      var name = tabMap[activeTab].name;
      var tabs = [].concat(_toConsumableArray(Object.entries(tabMap).map(this.renderTabListItem)), [this.renderLogoutTab()]);
      return (
        /*#__PURE__*/
        _checkBEM(React, _ExpandableContent__WEBPACK_IMPORTED_MODULE_2__["default"], {
          heading: name,
          isContentExpanded: isContentExpanded,
          onClick: this.toggleExpandableContent,
          mix: {
            block: 'MyAccountTabList'
          }
        },
        /*#__PURE__*/
        _checkBEM(React, "ul", null, tabs))
      );
    }
  }]);

  return _MyAccountTabList;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_MyAccountTabList, 'name', {
  value: 'MyAccountTabList'
});

var MyAccountTabList = middleware(_MyAccountTabList, "Component/MyAccountTabList/Component");

_defineProperty(MyAccountTabList, "propTypes", {
  tabMap: _type_Account__WEBPACK_IMPORTED_MODULE_4__["tabMapType"].isRequired,
  activeTab: _type_Account__WEBPACK_IMPORTED_MODULE_4__["activeTabType"].isRequired,
  handleLogout: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  changeActiveTab: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (MyAccountTabList);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/MyAccountTabList/MyAccountTabList.container.js":
/*!**************************************************************************!*\
  !*** ./src/app/component/MyAccountTabList/MyAccountTabList.container.js ***!
  \**************************************************************************/
/*! exports provided: MyAccountDispatcher, mapDispatchToProps, _MyAccountTabListContainer, MyAccountTabListContainer, mapStateToProps, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountDispatcher", function() { return MyAccountDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MyAccountTabListContainer", function() { return _MyAccountTabListContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountTabListContainer", function() { return MyAccountTabListContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _MyAccountTabList_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MyAccountTabList.component */ "./src/app/component/MyAccountTabList/MyAccountTabList.component.js");
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




var MyAccountDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/MyAccount/MyAccount.dispatcher */ "./src/app/store/MyAccount/MyAccount.dispatcher.js"));
/** @namespace Component/MyAccountTabList/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    logout: function logout() {
      return MyAccountDispatcher.then(function (_ref) {
        var dispatcher = _ref.default;
        return dispatcher.logout(null, dispatch);
      });
    }
  };
}, "Component/MyAccountTabList/Container/mapDispatchToProps");
/** @namespace Component/MyAccountTabList/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MyAccountTabListContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MyAccountTabListContainer, _Extensible);

  function _MyAccountTabListContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _MyAccountTabListContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_MyAccountTabListContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      handleLogout: _this.handleLogout.bind(_assertThisInitialized(_this))
    });

    return _this;
  }

  _createClass(_MyAccountTabListContainer, [{
    key: "handleLogout",
    value: function handleLogout() {
      var _this$props = this.props,
          onSignOut = _this$props.onSignOut,
          logout = _this$props.logout;
      logout();
      onSignOut();
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _MyAccountTabList_component__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({}, this.props, this.containerFunctions))
      );
    }
  }]);

  return _MyAccountTabListContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/** @namespace Component/MyAccountTabList/Container/mapStateToProps */
// eslint-disable-next-line no-unused-vars

Object.defineProperty(_MyAccountTabListContainer, 'name', {
  value: 'MyAccountTabListContainer'
});

var MyAccountTabListContainer = middleware(_MyAccountTabListContainer, "Component/MyAccountTabList/Container");

_defineProperty(MyAccountTabListContainer, "propTypes", {
  onSignOut: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  logout: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

_defineProperty(MyAccountTabListContainer, "defaultProps", {
  onSignOut: function onSignOut() {}
});

var mapStateToProps = middleware(function (state) {
  return {};
}, "Component/MyAccountTabList/Container/mapStateToProps");
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(MyAccountTabListContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/MyAccountTabList/MyAccountTabList.style.scss":
/*!************************************************************************!*\
  !*** ./src/app/component/MyAccountTabList/MyAccountTabList.style.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291338969
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/MyAccountTabList/index.js":
/*!*****************************************************!*\
  !*** ./src/app/component/MyAccountTabList/index.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyAccountTabList_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MyAccountTabList.container */ "./src/app/component/MyAccountTabList/MyAccountTabList.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _MyAccountTabList_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/MyAccountTabListItem/MyAccountTabListItem.component.js":
/*!**********************************************************************************!*\
  !*** ./src/app/component/MyAccountTabListItem/MyAccountTabListItem.component.js ***!
  \**********************************************************************************/
/*! exports provided: _MyAccountTabListItem, MyAccountTabListItem, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MyAccountTabListItem", function() { return _MyAccountTabListItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountTabListItem", function() { return MyAccountTabListItem; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _type_Account__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../type/Account */ "./src/app/type/Account.js");
/* harmony import */ var _MyAccountTabListItem_style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MyAccountTabListItem.style */ "./src/app/component/MyAccountTabListItem/MyAccountTabListItem.style.scss");
/* harmony import */ var _MyAccountTabListItem_style__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_MyAccountTabListItem_style__WEBPACK_IMPORTED_MODULE_3__);
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




/** @namespace Component/MyAccountTabListItem/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MyAccountTabListItem =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MyAccountTabListItem, _Extensible);

  function _MyAccountTabListItem() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _MyAccountTabListItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_MyAccountTabListItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "changeActiveTab", function () {
      var _this$props = _this.props,
          changeActiveTab = _this$props.changeActiveTab,
          _this$props$tabEntry = _slicedToArray(_this$props.tabEntry, 1),
          key = _this$props$tabEntry[0];

      changeActiveTab(key);
    });

    return _this;
  }

  _createClass(_MyAccountTabListItem, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          _this$props2$tabEntry = _slicedToArray(_this$props2.tabEntry, 2),
          name = _this$props2$tabEntry[1].name,
          isActive = _this$props2.isActive;

      return (
        /*#__PURE__*/
        _checkBEM(React, "li", {
          block: "MyAccountTabListItem",
          mods: {
            isActive: isActive
          }
        },
        /*#__PURE__*/
        _checkBEM(React, "button", {
          block: "MyAccountTabListItem",
          elem: "Button",
          onClick: this.changeActiveTab,
          role: "link"
        }, name))
      );
    }
  }]);

  return _MyAccountTabListItem;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_MyAccountTabListItem, 'name', {
  value: 'MyAccountTabListItem'
});

var MyAccountTabListItem = middleware(_MyAccountTabListItem, "Component/MyAccountTabListItem/Component");

_defineProperty(MyAccountTabListItem, "propTypes", {
  tabEntry: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, _type_Account__WEBPACK_IMPORTED_MODULE_2__["tabType"]])).isRequired,
  isActive: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  changeActiveTab: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

_defineProperty(MyAccountTabListItem, "defaultProps", {
  isActive: false
});

/* harmony default export */ __webpack_exports__["default"] = (MyAccountTabListItem);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/MyAccountTabListItem/MyAccountTabListItem.style.scss":
/*!********************************************************************************!*\
  !*** ./src/app/component/MyAccountTabListItem/MyAccountTabListItem.style.scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340193
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/MyAccountTabListItem/index.js":
/*!*********************************************************!*\
  !*** ./src/app/component/MyAccountTabListItem/index.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyAccountTabListItem_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MyAccountTabListItem.component */ "./src/app/component/MyAccountTabListItem/MyAccountTabListItem.component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _MyAccountTabListItem_component__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/query/Order.query.js":
/*!**************************************!*\
  !*** ./src/app/query/Order.query.js ***!
  \**************************************/
/*! exports provided: _OrderQuery, OrderQuery, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_OrderQuery", function() { return _OrderQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderQuery", function() { return OrderQuery; });
/* harmony import */ var _util_Query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/Query */ "./src/app/util/Query/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

/**
 * Order Query
 * @class OrderQuery
 * @namespace Query/Order
 */

var _OrderQuery =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_OrderQuery, _Extensible);

  function _OrderQuery() {
    _classCallCheck(this, _OrderQuery);

    return _possibleConstructorReturn(this, _getPrototypeOf(_OrderQuery).apply(this, arguments));
  }

  _createClass(_OrderQuery, [{
    key: "getOrderListQuery",
    value: function getOrderListQuery() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('getOrderList').addFieldList(this._getOrderListFields(true));
    }
  }, {
    key: "getOrderByIdQuery",
    value: function getOrderByIdQuery(orderId) {
      return this._getOrderByIdField(orderId);
    }
  }, {
    key: "_getOrderListFields",
    value: function _getOrderListFields(isList) {
      return [this._getOrderItemsField(isList)];
    }
  }, {
    key: "_getOrderByIdField",
    value: function _getOrderByIdField(orderId) {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('getOrderById').addArgument('id', 'Int!', orderId).addFieldList(this._getOrderItemsFields());
    }
  }, {
    key: "_getOrderProductsField",
    value: function _getOrderProductsField() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('order_products').addFieldList(this._getOrderProductsFields());
    }
  }, {
    key: "_getOrderProductsFields",
    value: function _getOrderProductsFields() {
      return [].concat(_toConsumableArray(this._getDefaultFields()), _toConsumableArray(this._prepareImageFields()), [this._prepareAttributes()]);
    }
  }, {
    key: "_prepareImageFields",
    value: function _prepareImageFields() {
      return [new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('thumbnail').addFieldList(this._prepareThumbnailFields()), new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('small_image').addFieldList(this._prepareSmallImageFields())];
    }
  }, {
    key: "_prepareSmallImageFields",
    value: function _prepareSmallImageFields() {
      return ['url', 'label', 'path'];
    }
  }, {
    key: "_prepareThumbnailFields",
    value: function _prepareThumbnailFields() {
      return ['url', 'label', 'path'];
    }
  }, {
    key: "_prepareAttributes",
    value: function _prepareAttributes() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('s_attributes').setAlias('attributes').addFieldList(this._prepareAttributesFields());
    }
  }, {
    key: "_prepareAttributesFields",
    value: function _prepareAttributesFields() {
      return ['attribute_value', 'attribute_code', 'attribute_type', 'attribute_label', this._getAttributeOptions()];
    }
  }, {
    key: "_getAttributeOptions",
    value: function _getAttributeOptions() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('attribute_options').addFieldList(this._getAttributeOptionsFields());
    }
  }, {
    key: "_getAttributeOptionsFields",
    value: function _getAttributeOptionsFields() {
      return ['label', 'value', new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('swatch_data').addField('value')];
    }
  }, {
    key: "_getDefaultFields",
    value: function _getDefaultFields() {
      return ['id', 'name', new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('short_description').addField('html'), 'sku', 'qty', 'row_total', 'original_price', 'license_key'];
    }
  }, {
    key: "_prepareShippingInfo",
    value: function _prepareShippingInfo() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('shipping_info').addFieldList(this._prepareShippingInfoFields());
    }
  }, {
    key: "_prepareShippingInfoFields",
    value: function _prepareShippingInfoFields() {
      return ['shipping_method', 'shipping_description', 'shipping_amount', 'tracking_numbers', this._prepareOrderCustomerAddressInfo()];
    }
  }, {
    key: "_prepareOrderCustomerAddressInfo",
    value: function _prepareOrderCustomerAddressInfo() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('shipping_address').addFieldList(this._prepareOrderCustomerAddressInfoFields());
    }
  }, {
    key: "_prepareOrderCustomerAddressInfoFields",
    value: function _prepareOrderCustomerAddressInfoFields() {
      return ['city', 'company', 'firstname', 'lastname', 'middlename', 'telephone', 'district', 'house_number', 'apartment_number', 'postomat_code', 'store_pickup_code', 'post_office_code', 'postcode', 'street', 'is_b2b', 'region', 'organizationname', 'organizationbin', 'organizationaddress', 'organizationiic', 'organizationbik'];
    }
  }, {
    key: "_getBaseOrderInfoField",
    value: function _getBaseOrderInfoField(isList) {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('base_order_info').addFieldList(this._getBaseOrderInfoFields(isList));
    }
  }, {
    key: "_getBaseOrderInfoFields",
    value: function _getBaseOrderInfoFields(isList) {
      return ['id', 'increment_id', 'created_at', 'status_label', 'grand_total'].concat(_toConsumableArray(isList ? [] : ['sub_total']));
    }
  }, {
    key: "_getPaymentInfoField",
    value: function _getPaymentInfoField() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('payment_info').addFieldList(this._getPaymentInfoFields());
    }
  }, {
    key: "_getPaymentInfoFields",
    value: function _getPaymentInfoFields() {
      return ['method', this._getAdditionalInformationField()];
    }
  }, {
    key: "_getAdditionalInformationField",
    value: function _getAdditionalInformationField() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('additional_information').addFieldList(this._getAdditionalInformationFields());
    }
  }, {
    key: "_getAdditionalInformationFields",
    value: function _getAdditionalInformationFields() {
      return ['bank', 'method_title', 'credit_type', 'month', this._getCustomerInfoField()];
    }
  }, {
    key: "_getCustomerInfoField",
    value: function _getCustomerInfoField() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('customer_info').addFieldList(this._getCustomerInfoFields());
    }
  }, {
    key: "_getCustomerInfoFields",
    value: function _getCustomerInfoFields() {
      return ['first_name', 'last_name', 'phone'];
    }
  }, {
    key: "_getOrderItemsField",
    value: function _getOrderItemsField(isList) {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('items').addFieldList(this._getOrderItemsFields(isList));
    }
  }, {
    key: "_getOrderItemsFields",
    value: function _getOrderItemsFields(isList) {
      return [this._getBaseOrderInfoField(isList)].concat(_toConsumableArray(!isList ? [this._getPaymentInfoField(), this._prepareShippingInfo(), this._getOrderProductsField()] : []));
    }
  }]);

  return _OrderQuery;
}(Extensible());
Object.defineProperty(_OrderQuery, 'name', {
  value: 'OrderQuery'
});

var OrderQuery = middleware(_OrderQuery, "Query/Order");
/* harmony default export */ __webpack_exports__["default"] = (new OrderQuery());
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/route/MyAccount/MyAccount.component.js":
/*!********************************************************!*\
  !*** ./src/app/route/MyAccount/MyAccount.component.js ***!
  \********************************************************/
/*! exports provided: _MyAccount, MyAccount, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MyAccount", function() { return _MyAccount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccount", function() { return MyAccount; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _component_ContentWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../component/ContentWrapper */ "./src/app/component/ContentWrapper/index.js");
/* harmony import */ var _component_MyAccountAddressBook__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../component/MyAccountAddressBook */ "./src/app/component/MyAccountAddressBook/index.js");
/* harmony import */ var _component_MyAccountDashboard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../component/MyAccountDashboard */ "./src/app/component/MyAccountDashboard/index.js");
/* harmony import */ var _component_MyAccountMyOrders__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../component/MyAccountMyOrders */ "./src/app/component/MyAccountMyOrders/index.js");
/* harmony import */ var _component_MyAccountMyWishlist__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../component/MyAccountMyWishlist */ "./src/app/component/MyAccountMyWishlist/index.js");
/* harmony import */ var _component_MyAccountNewsletterSubscription__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../component/MyAccountNewsletterSubscription */ "./src/app/component/MyAccountNewsletterSubscription/index.js");
/* harmony import */ var _component_MyAccountOverlay__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../component/MyAccountOverlay */ "./src/app/component/MyAccountOverlay/index.js");
/* harmony import */ var _component_MyAccountTabList__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../component/MyAccountTabList */ "./src/app/component/MyAccountTabList/index.js");
/* harmony import */ var _type_Account__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../type/Account */ "./src/app/type/Account.js");
/* harmony import */ var _MyAccount_style__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./MyAccount.style */ "./src/app/route/MyAccount/MyAccount.style.scss");
/* harmony import */ var _MyAccount_style__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_MyAccount_style__WEBPACK_IMPORTED_MODULE_11__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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












/** @namespace Route/MyAccount/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MyAccount =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MyAccount, _Extensible);

  function _MyAccount() {
    var _getPrototypeOf2, _defineProperty2;

    var _this;

    _classCallCheck(this, _MyAccount);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_MyAccount)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "renderMap", (_defineProperty2 = {}, _defineProperty(_defineProperty2, _type_Account__WEBPACK_IMPORTED_MODULE_10__["DASHBOARD"], _component_MyAccountDashboard__WEBPACK_IMPORTED_MODULE_4__["default"]), _defineProperty(_defineProperty2, _type_Account__WEBPACK_IMPORTED_MODULE_10__["MY_ORDERS"], _component_MyAccountMyOrders__WEBPACK_IMPORTED_MODULE_5__["default"]), _defineProperty(_defineProperty2, _type_Account__WEBPACK_IMPORTED_MODULE_10__["MY_WISHLIST"], _component_MyAccountMyWishlist__WEBPACK_IMPORTED_MODULE_6__["default"]), _defineProperty(_defineProperty2, _type_Account__WEBPACK_IMPORTED_MODULE_10__["ADDRESS_BOOK"], _component_MyAccountAddressBook__WEBPACK_IMPORTED_MODULE_3__["default"]), _defineProperty(_defineProperty2, _type_Account__WEBPACK_IMPORTED_MODULE_10__["NEWSLETTER_SUBSCRIPTION"], _component_MyAccountNewsletterSubscription__WEBPACK_IMPORTED_MODULE_7__["default"]), _defineProperty2));

    return _this;
  }

  _createClass(_MyAccount, [{
    key: "renderLoginOverlay",
    value: function renderLoginOverlay() {
      var onSignIn = this.props.onSignIn;
      return (
        /*#__PURE__*/
        _checkBEM(React, _component_MyAccountOverlay__WEBPACK_IMPORTED_MODULE_8__["default"], {
          onSignIn: onSignIn
        })
      );
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this$props = this.props,
          activeTab = _this$props.activeTab,
          tabMap = _this$props.tabMap,
          changeActiveTab = _this$props.changeActiveTab,
          isSignedIn = _this$props.isSignedIn,
          onSignOut = _this$props.onSignOut,
          isEditingActive = _this$props.isEditingActive;

      if (!isSignedIn) {
        return this.renderLoginOverlay();
      }

      var TabContent = this.renderMap[activeTab];
      var name = tabMap[activeTab].name;
      return (
        /*#__PURE__*/
        _checkBEM(React, _component_ContentWrapper__WEBPACK_IMPORTED_MODULE_2__["default"], {
          label: __('My Account page'),
          wrapperMix: {
            block: 'MyAccount',
            elem: 'Wrapper'
          }
        },
        /*#__PURE__*/
        _checkBEM(React, _component_MyAccountTabList__WEBPACK_IMPORTED_MODULE_9__["default"], {
          tabMap: tabMap,
          activeTab: activeTab,
          changeActiveTab: changeActiveTab,
          onSignOut: onSignOut
        }),
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "MyAccount",
          elem: "TabContent"
        },
        /*#__PURE__*/
        _checkBEM(React, "h1", {
          block: "MyAccount",
          elem: "Heading"
        }, name),
        /*#__PURE__*/
        _checkBEM(React, TabContent, {
          isEditingActive: isEditingActive
        })))
      );
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "main", {
          block: "MyAccount"
        }, this.renderContent())
      );
    }
  }]);

  return _MyAccount;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_MyAccount, 'name', {
  value: 'MyAccount'
});

var MyAccount = middleware(_MyAccount, "Route/MyAccount/Component");

_defineProperty(MyAccount, "propTypes", {
  activeTab: _type_Account__WEBPACK_IMPORTED_MODULE_10__["activeTabType"].isRequired,
  tabMap: _type_Account__WEBPACK_IMPORTED_MODULE_10__["tabMapType"].isRequired,
  changeActiveTab: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  onSignIn: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  onSignOut: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  isSignedIn: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  isEditingActive: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (MyAccount);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/route/MyAccount/MyAccount.container.js":
/*!********************************************************!*\
  !*** ./src/app/route/MyAccount/MyAccount.container.js ***!
  \********************************************************/
/*! exports provided: BreadcrumbsDispatcher, MyAccountDispatcher, mapStateToProps, mapDispatchToProps, _MyAccountContainer, MyAccountContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, __, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BreadcrumbsDispatcher", function() { return BreadcrumbsDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountDispatcher", function() { return MyAccountDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MyAccountContainer", function() { return _MyAccountContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountContainer", function() { return MyAccountContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _component_Header_Header_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../component/Header/Header.config */ "./src/app/component/Header/Header.config.js");
/* harmony import */ var _store_Meta_Meta_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/Meta/Meta.action */ "./src/app/store/Meta/Meta.action.js");
/* harmony import */ var _store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store/Navigation/Navigation.action */ "./src/app/store/Navigation/Navigation.action.js");
/* harmony import */ var _store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../store/Navigation/Navigation.reducer */ "./src/app/store/Navigation/Navigation.reducer.js");
/* harmony import */ var _store_Overlay_Overlay_action__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../store/Overlay/Overlay.action */ "./src/app/store/Overlay/Overlay.action.js");
/* harmony import */ var _type_Account__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../type/Account */ "./src/app/type/Account.js");
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _type_Device__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../type/Device */ "./src/app/type/Device.js");
/* harmony import */ var _util_Url__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../util/Url */ "./src/app/util/Url/index.js");
/* harmony import */ var _MyAccount_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./MyAccount.component */ "./src/app/route/MyAccount/MyAccount.component.js");
/* harmony import */ var _MyAccount_config__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./MyAccount.config */ "./src/app/route/MyAccount/MyAccount.config.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

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














var BreadcrumbsDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/Breadcrumbs/Breadcrumbs.dispatcher */ "./src/app/store/Breadcrumbs/Breadcrumbs.dispatcher.js"));
var MyAccountDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/MyAccount/MyAccount.dispatcher */ "./src/app/store/MyAccount/MyAccount.dispatcher.js"));
/** @namespace Route/MyAccount/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    isSignedIn: state.MyAccountReducer.isSignedIn,
    device: state.ConfigReducer.device,
    wishlistItems: state.WishlistReducer.productsInWishlist
  };
}, "Route/MyAccount/Container/mapStateToProps");
/** @namespace Route/MyAccount/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    updateBreadcrumbs: function updateBreadcrumbs(breadcrumbs) {
      return BreadcrumbsDispatcher.then(function (_ref) {
        var dispatcher = _ref.default;
        return dispatcher.update(breadcrumbs, dispatch);
      });
    },
    changeHeaderState: function changeHeaderState(state) {
      return dispatch(Object(_store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_5__["changeNavigationState"])(_store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_6__["TOP_NAVIGATION_TYPE"], state));
    },
    requestCustomerData: function requestCustomerData() {
      return MyAccountDispatcher.then(function (_ref2) {
        var dispatcher = _ref2.default;
        return dispatcher.requestCustomerData(dispatch);
      });
    },
    toggleOverlayByKey: function toggleOverlayByKey(key) {
      return dispatch(Object(_store_Overlay_Overlay_action__WEBPACK_IMPORTED_MODULE_7__["toggleOverlayByKey"])(key));
    },
    updateMeta: function updateMeta(meta) {
      return dispatch(Object(_store_Meta_Meta_action__WEBPACK_IMPORTED_MODULE_4__["updateMeta"])(meta));
    }
  };
}, "Route/MyAccount/Container/mapDispatchToProps");
/** @namespace Route/MyAccount/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MyAccountContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MyAccountContainer, _Extensible);

  function _MyAccountContainer() {
    var _getPrototypeOf2, _defineProperty2;

    var _this;

    _classCallCheck(this, _MyAccountContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_MyAccountContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "tabMap", (_defineProperty2 = {}, _defineProperty(_defineProperty2, _type_Account__WEBPACK_IMPORTED_MODULE_8__["DASHBOARD"], {
      url: '/dashboard',
      name: __('Dashboard')
    }), _defineProperty(_defineProperty2, _type_Account__WEBPACK_IMPORTED_MODULE_8__["ADDRESS_BOOK"], {
      url: '/address-book',
      name: __('Address book')
    }), _defineProperty(_defineProperty2, _type_Account__WEBPACK_IMPORTED_MODULE_8__["MY_ORDERS"], {
      url: '/my-orders',
      name: __('My orders')
    }), _defineProperty(_defineProperty2, _type_Account__WEBPACK_IMPORTED_MODULE_8__["MY_WISHLIST"], {
      url: '/my-wishlist',
      name: __('My wishlist'),
      headerTitle: function headerTitle() {
        return _this.getMyWishlistHeaderTitle();
      }
    }), _defineProperty(_defineProperty2, _type_Account__WEBPACK_IMPORTED_MODULE_8__["NEWSLETTER_SUBSCRIPTION"], {
      url: '/newsletter-subscription',
      name: __('Newsletter Subscription')
    }), _defineProperty2));

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      changeActiveTab: _this.changeActiveTab.bind(_assertThisInitialized(_this)),
      onSignIn: _this.onSignIn.bind(_assertThisInitialized(_this)),
      onSignOut: _this.onSignOut.bind(_assertThisInitialized(_this))
    });

    _defineProperty(_assertThisInitialized(_this), "getMyWishlistHeaderTitle", function () {
      var wishlistItems = _this.props.wishlistItems;

      var _Object$keys = Object.keys(wishlistItems),
          length = _Object$keys.length;

      return "".concat(length, " ").concat(length === 1 ? __('item') : __('items'));
    });

    return _this;
  }

  _createClass(_MyAccountContainer, [{
    key: "__construct",
    value: function __construct(props) {
      _get(_getPrototypeOf(_MyAccountContainer.prototype), "__construct", this).call(this, props);

      var _this$props = this.props,
          isSignedIn = _this$props.isSignedIn,
          updateMeta = _this$props.updateMeta,
          toggleOverlayByKey = _this$props.toggleOverlayByKey;
      this.state = _objectSpread2(_objectSpread2({}, MyAccountContainer.navigateToSelectedTab(this.props)), {}, {
        isEditingActive: false
      });

      if (!isSignedIn) {
        toggleOverlayByKey(_component_Header_Header_config__WEBPACK_IMPORTED_MODULE_3__["CUSTOMER_ACCOUNT"]);
      }

      updateMeta({
        title: __('My account')
      });
      this.redirectIfNotSignedIn();
      this.onSignIn();
      this.updateBreadcrumbs();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var prevWishlistItems = prevProps.wishlistItems;
      var _this$props2 = this.props,
          wishlistItems = _this$props2.wishlistItems,
          isSignedIn = _this$props2.isSignedIn;
      var prevActiveTab = prevState.prevActiveTab;
      var activeTab = this.state.activeTab;
      this.redirectIfNotSignedIn();

      if (prevActiveTab !== activeTab) {
        this.updateBreadcrumbs();
      }

      if (Object.keys(wishlistItems).length !== Object.keys(prevWishlistItems).length) {
        this.changeHeaderState();
      }

      if (!isSignedIn) {
        this.changeHeaderState('default');
      }
    }
  }, {
    key: "onSignOut",
    value: function onSignOut() {
      var toggleOverlayByKey = this.props.toggleOverlayByKey;
      this.setState({
        activeTab: _type_Account__WEBPACK_IMPORTED_MODULE_8__["DASHBOARD"]
      });
      toggleOverlayByKey(_component_Header_Header_config__WEBPACK_IMPORTED_MODULE_3__["CUSTOMER_ACCOUNT"]);
    }
  }, {
    key: "onSignIn",
    value: function onSignIn() {
      var _this$props3 = this.props,
          requestCustomerData = _this$props3.requestCustomerData,
          isSignedIn = _this$props3.isSignedIn;

      if (isSignedIn) {
        requestCustomerData();
      }

      this.changeHeaderState();
    }
  }, {
    key: "changeWishlistHeaderState",
    value: function changeWishlistHeaderState() {
      var _this2 = this;

      var hiddenElements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['ok'];
      var changeHeaderState = this.props.changeHeaderState;
      var headerTitle = this.tabMap[_type_Account__WEBPACK_IMPORTED_MODULE_8__["MY_WISHLIST"]].headerTitle;

      var handleClick = function handleClick() {
        var isEdit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        _this2.setState({
          isEditingActive: isEdit
        });

        var hiddenElements = [isEdit ? 'edit' : 'ok'];

        _this2.changeWishlistHeaderState(hiddenElements);
      };

      changeHeaderState({
        title: headerTitle(),
        name: _component_Header_Header_config__WEBPACK_IMPORTED_MODULE_3__["CUSTOMER_WISHLIST"],
        onEditClick: function onEditClick() {
          return handleClick(true);
        },
        onOkClick: function onOkClick() {
          return handleClick();
        },
        hiddenElements: hiddenElements,
        shouldNotGoToPrevState: true
      });
    }
  }, {
    key: "changeDefaultHeaderState",
    value: function changeDefaultHeaderState() {
      var changeHeaderState = this.props.changeHeaderState;
      changeHeaderState({
        title: 'My account',
        name: _component_Header_Header_config__WEBPACK_IMPORTED_MODULE_3__["CUSTOMER_ACCOUNT_PAGE"],
        onBackClick: function onBackClick() {
          return history.push(Object(_util_Url__WEBPACK_IMPORTED_MODULE_11__["appendWithStoreCode"])('/'));
        }
      });
    }
  }, {
    key: "changeHeaderState",
    value: function changeHeaderState(activeTabParam) {
      var activeTabState = this.state.activeTab;
      var activeTab = activeTabParam || activeTabState;

      if (activeTab !== _type_Account__WEBPACK_IMPORTED_MODULE_8__["MY_WISHLIST"]) {
        this.changeDefaultHeaderState();
        return;
      }

      this.changeWishlistHeaderState();
    }
  }, {
    key: "changeActiveTab",
    value: function changeActiveTab(activeTab) {
      var history = this.props.history;
      var url = this.tabMap[activeTab].url;
      history.push(Object(_util_Url__WEBPACK_IMPORTED_MODULE_11__["appendWithStoreCode"])("".concat(_MyAccount_config__WEBPACK_IMPORTED_MODULE_13__["MY_ACCOUNT_URL"]).concat(url)));
      this.changeHeaderState(activeTab);
    }
  }, {
    key: "updateBreadcrumbs",
    value: function updateBreadcrumbs() {
      var updateBreadcrumbs = this.props.updateBreadcrumbs;
      var activeTab = this.state.activeTab;
      var _this$tabMap$activeTa = this.tabMap[activeTab],
          url = _this$tabMap$activeTa.url,
          name = _this$tabMap$activeTa.name;
      updateBreadcrumbs([{
        url: "".concat(_MyAccount_config__WEBPACK_IMPORTED_MODULE_13__["MY_ACCOUNT_URL"]).concat(url),
        name: name
      }, {
        name: __('My Account'),
        url: "".concat(_MyAccount_config__WEBPACK_IMPORTED_MODULE_13__["MY_ACCOUNT_URL"], "/").concat(_type_Account__WEBPACK_IMPORTED_MODULE_8__["DASHBOARD"])
      }]);
    }
  }, {
    key: "redirectIfNotSignedIn",
    value: function redirectIfNotSignedIn() {
      var _this$props4 = this.props,
          isSignedIn = _this$props4.isSignedIn,
          history = _this$props4.history,
          pathname = _this$props4.location.pathname,
          device = _this$props4.device;

      if (isSignedIn) {
        // do nothing for signed-in users
        return;
      }

      if (device.isMobile) {
        // do not redirect on mobile
        return;
      }

      if (pathname === '/forgot-password') {
        // forward the forgot password state
        history.push({
          pathname: Object(_util_Url__WEBPACK_IMPORTED_MODULE_11__["appendWithStoreCode"])('/'),
          state: {
            isForgotPassword: true
          }
        });
        return;
      }

      history.push({
        pathname: Object(_util_Url__WEBPACK_IMPORTED_MODULE_11__["appendWithStoreCode"])('/')
      });
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _MyAccount_component__WEBPACK_IMPORTED_MODULE_12__["default"], _extends({}, this.props, this.state, this.containerFunctions, {
          tabMap: this.tabMap
        }))
      );
    }
  }], [{
    key: "navigateToSelectedTab",
    value: function navigateToSelectedTab(props) {
      var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _props$match = props.match;
      _props$match = _props$match === void 0 ? {} : _props$match;
      var _props$match$params = _props$match.params;
      _props$match$params = _props$match$params === void 0 ? {} : _props$match$params;
      var _props$match$params$t = _props$match$params.tab,
          historyActiveTab = _props$match$params$t === void 0 ? _type_Account__WEBPACK_IMPORTED_MODULE_8__["DASHBOARD"] : _props$match$params$t;
      var activeTab = state.activeTab;

      if (activeTab !== historyActiveTab) {
        return {
          activeTab: historyActiveTab
        };
      }

      return null;
    }
  }, {
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      return MyAccountContainer.navigateToSelectedTab(props, state);
    }
  }]);

  return _MyAccountContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_MyAccountContainer, 'name', {
  value: 'MyAccountContainer'
});

var MyAccountContainer = middleware(_MyAccountContainer, "Route/MyAccount/Container");

_defineProperty(MyAccountContainer, "propTypes", {
  changeHeaderState: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  requestCustomerData: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  updateBreadcrumbs: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  toggleOverlayByKey: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  updateMeta: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  isSignedIn: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  match: _type_Common__WEBPACK_IMPORTED_MODULE_9__["MatchType"].isRequired,
  location: _type_Common__WEBPACK_IMPORTED_MODULE_9__["LocationType"].isRequired,
  history: _type_Common__WEBPACK_IMPORTED_MODULE_9__["HistoryType"].isRequired,
  device: _type_Device__WEBPACK_IMPORTED_MODULE_10__["DeviceType"].isRequired,
  wishlistItems: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object
});

_defineProperty(MyAccountContainer, "defaultProps", {
  wishlistItems: {}
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(MyAccountContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/route/MyAccount/MyAccount.style.scss":
/*!******************************************************!*\
  !*** ./src/app/route/MyAccount/MyAccount.style.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291334601
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/route/MyAccount/index.js":
/*!******************************************!*\
  !*** ./src/app/route/MyAccount/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyAccount_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MyAccount.container */ "./src/app/route/MyAccount/MyAccount.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _MyAccount_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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
//# sourceMappingURL=account.js.map