webpackHotUpdate("bundle",{

/***/ "./src/app/component/CookiePopup/CookiePopup.component.js":
/*!****************************************************************!*\
  !*** ./src/app/component/CookiePopup/CookiePopup.component.js ***!
  \****************************************************************/
/*! exports provided: _CookiePopup, CookiePopup, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_CookiePopup", function() { return _CookiePopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CookiePopup", function() { return CookiePopup; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ContentWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ContentWrapper */ "./src/app/component/ContentWrapper/index.js");
/* harmony import */ var _Link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Link */ "./src/app/component/Link/index.js");
/* harmony import */ var _util_BrowserDatabase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/BrowserDatabase */ "./src/app/util/BrowserDatabase/index.js");
/* harmony import */ var _util_Request_QueryDispatcher__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../util/Request/QueryDispatcher */ "./src/app/util/Request/QueryDispatcher.js");
/* harmony import */ var _CookiePopup_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CookiePopup.config */ "./src/app/component/CookiePopup/CookiePopup.config.js");
/* harmony import */ var _CookiePopup_style__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CookiePopup.style */ "./src/app/component/CookiePopup/CookiePopup.style.scss");
/* harmony import */ var _CookiePopup_style__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_CookiePopup_style__WEBPACK_IMPORTED_MODULE_7__);
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








/** @namespace Component/CookiePopup/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _CookiePopup =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_CookiePopup, _Extensible);

  function _CookiePopup() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _CookiePopup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_CookiePopup)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isAccepted: _this.getAcceptCookieValue()
    });

    _defineProperty(_assertThisInitialized(_this), "acceptCookies", function () {
      var code = _this.props.code;
      var param = "".concat(_CookiePopup_config__WEBPACK_IMPORTED_MODULE_6__["COOKIE_POPUP"], "_").concat(code);
      _util_BrowserDatabase__WEBPACK_IMPORTED_MODULE_4__["default"].setItem(true, param, _util_Request_QueryDispatcher__WEBPACK_IMPORTED_MODULE_5__["ONE_MONTH_IN_SECONDS"]);

      _this.setState({
        isAccepted: true
      });
    });

    return _this;
  }

  _createClass(_CookiePopup, [{
    key: "getAcceptCookieValue",
    value: function getAcceptCookieValue() {
      var code = this.props.code;
      var param = "".concat(_CookiePopup_config__WEBPACK_IMPORTED_MODULE_6__["COOKIE_POPUP"], "_").concat(code);
      return !!_util_BrowserDatabase__WEBPACK_IMPORTED_MODULE_4__["default"].getItem(param);
    }
  }, {
    key: "renderCookieLink",
    value: function renderCookieLink() {
      var cookieLink = this.props.cookieLink;

      if (!cookieLink) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, _Link__WEBPACK_IMPORTED_MODULE_3__["default"], {
          block: "CookiePopup",
          elem: "Link",
          to: cookieLink
        }, __('Read more'))
      );
    }
  }, {
    key: "renderCookieText",
    value: function renderCookieText() {
      var cookieText = this.props.cookieText;
      return (
        /*#__PURE__*/
        _checkBEM(React, "p", {
          block: "CookiePopup",
          elem: "Content"
        }, cookieText, this.renderCookieLink())
      );
    }
  }, {
    key: "renderCTA",
    value: function renderCTA() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "CookiePopup",
          elem: "CTA"
        },
        /*#__PURE__*/
        _checkBEM(React, "button", {
          block: "Button",
          onClick: this.acceptCookies
        }, __('Accept')))
      );
    }
  }, {
    key: "render",
    value: function render() {
      var cookieText = this.props.cookieText;
      var isAccepted = this.state.isAccepted;

      if (!cookieText || isAccepted) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "CookiePopup"
        },
        /*#__PURE__*/
        _checkBEM(React, _ContentWrapper__WEBPACK_IMPORTED_MODULE_2__["default"], {
          label: "Cookie popup",
          mix: {
            block: 'CookiePopup',
            elem: 'Wrapper'
          },
          wrapperMix: {
            block: 'CookiePopup',
            elem: 'ContentWrapper'
          }
        }, this.renderCookieText(), this.renderCTA()))
      );
    }
  }]);

  return _CookiePopup;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_CookiePopup, 'name', {
  value: 'CookiePopup'
});

var CookiePopup = middleware(_CookiePopup, "Component/CookiePopup/Component");

_defineProperty(CookiePopup, "propTypes", {
  cookieText: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  cookieLink: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  code: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
});

_defineProperty(CookiePopup, "defaultProps", {
  cookieText: '',
  cookieLink: '',
  code: ''
});

/* harmony default export */ __webpack_exports__["default"] = (CookiePopup);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/CookiePopup/CookiePopup.container.js":
/*!****************************************************************!*\
  !*** ./src/app/component/CookiePopup/CookiePopup.container.js ***!
  \****************************************************************/
/*! exports provided: mapStateToProps, mapDispatchToProps, _CookiePopupContainer, CookiePopupContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_CookiePopupContainer", function() { return _CookiePopupContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CookiePopupContainer", function() { return CookiePopupContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _CookiePopup_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CookiePopup.component */ "./src/app/component/CookiePopup/CookiePopup.component.js");
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




/** @namespace Component/CookiePopup/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    cookieText: state.ConfigReducer.cookie_text,
    cookieLink: state.ConfigReducer.cookie_link,
    code: state.ConfigReducer.code
  };
}, "Component/CookiePopup/Container/mapStateToProps");
/** @namespace Component/CookiePopup/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars

var mapDispatchToProps = middleware(function (dispatch) {
  return {};
}, "Component/CookiePopup/Container/mapDispatchToProps");
/** @namespace Component/CookiePopup/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _CookiePopupContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_CookiePopupContainer, _Extensible);

  function _CookiePopupContainer() {
    _classCallCheck(this, _CookiePopupContainer);

    return _possibleConstructorReturn(this, _getPrototypeOf(_CookiePopupContainer).apply(this, arguments));
  }

  _createClass(_CookiePopupContainer, [{
    key: "render",
    value: function render() {
      var code = this.props.code;
      return (
        /*#__PURE__*/
        _checkBEM(React, _CookiePopup_component__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({}, this.props, {
          key: code
        }))
      );
    }
  }]);

  return _CookiePopupContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_CookiePopupContainer, 'name', {
  value: 'CookiePopupContainer'
});

var CookiePopupContainer = middleware(_CookiePopupContainer, "Component/CookiePopup/Container");

_defineProperty(CookiePopupContainer, "propTypes", {
  code: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
});

_defineProperty(CookiePopupContainer, "defaultProps", {
  code: ''
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(CookiePopupContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/query/Config.query.js":
/*!***************************************!*\
  !*** ./src/app/query/Config.query.js ***!
  \***************************************/
/*! exports provided: _ConfigQuery, ConfigQuery, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ConfigQuery", function() { return _ConfigQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigQuery", function() { return ConfigQuery; });
/* harmony import */ var _util_Query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/Query */ "./src/app/util/Query/index.js");
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

/** @namespace Query/Config */

var _ConfigQuery =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ConfigQuery, _Extensible);

  function _ConfigQuery() {
    _classCallCheck(this, _ConfigQuery);

    return _possibleConstructorReturn(this, _getPrototypeOf(_ConfigQuery).apply(this, arguments));
  }

  _createClass(_ConfigQuery, [{
    key: "getStoreListField",
    value: function getStoreListField() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('storeList').addFieldList(this._getStoreListFields());
    }
  }, {
    key: "getCheckoutAgreements",
    value: function getCheckoutAgreements() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('checkoutAgreements').addFieldList(this._getCheckoutAgreementFields());
    }
  }, {
    key: "getCurrencyField",
    value: function getCurrencyField() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('available_currencies_data').addFieldList(['id', 'label', 'value']);
    }
  }, {
    key: "getCurrencyData",
    value: function getCurrencyData() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('currencyData').addFieldList([this.getCurrencyField(), 'current_currency_code']);
    }
  }, {
    key: "getSaveSelectedCurrencyMutation",
    value: function getSaveSelectedCurrencyMutation(newCurrency) {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('saveSelectedCurrency').addArgument('currency', 'String', newCurrency).addFieldList([this.getCurrencyData()]);
    }
  }, {
    key: "_getCheckoutAgreementFields",
    value: function _getCheckoutAgreementFields() {
      return ['agreement_id', 'checkbox_text', 'content', 'content_height', 'is_html', 'mode', 'name'];
    }
  }, {
    key: "_getStoreListFields",
    value: function _getStoreListFields() {
      return ['name', 'is_active', 'base_url', 'base_link_url', 'code'];
    }
  }, {
    key: "getQuery",
    value: function getQuery() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('storeConfig').addFieldList(this._getStoreConfigFields());
    }
  }, {
    key: "_getStoreConfigFields",
    value: function _getStoreConfigFields() {
      return ['code', 'is_active', 'cms_home_page', 'cms_no_route', 'copyright', 'timezone', 'header_logo_src', 'timezone', 'title_prefix', 'title_suffix', 'default_display_currency_code', 'default_keywords', 'default_title', 'default_country', 'secure_base_media_url', // 'paypal_sandbox_flag',
      // 'paypal_client_id',
      'logo_alt', 'logo_height', 'logo_width', 'cookie_text', 'cookie_link', 'terms_are_enabled', 'address_lines_quantity', 'base_url', 'pagination_frame', 'pagination_frame_skip', 'anchor_text_for_previous', 'anchor_text_for_next', 'reviews_are_enabled', 'reviews_allow_guest', 'demo_notice', 'guest_checkout', 'is_email_confirmation_required', 'base_link_url'];
    }
  }]);

  return _ConfigQuery;
}(Extensible());
Object.defineProperty(_ConfigQuery, 'name', {
  value: 'ConfigQuery'
});

var ConfigQuery = middleware(_ConfigQuery, "Query/Config");
/* harmony default export */ __webpack_exports__["default"] = (new ConfigQuery());
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ })

})
//# sourceMappingURL=bundle.efa988ba4ba643143569.hot-update.js.map