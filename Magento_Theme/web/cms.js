(this["webpackJsonp"] = this["webpackJsonp"] || []).push([["cms"],{

/***/ "./src/app/component/InstallPrompt/InstallPrompt.component.js":
/*!********************************************************************!*\
  !*** ./src/app/component/InstallPrompt/InstallPrompt.component.js ***!
  \********************************************************************/
/*! exports provided: _InstallPrompt, InstallPrompt, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_InstallPrompt", function() { return _InstallPrompt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstallPrompt", function() { return InstallPrompt; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _InstallPromptAndroid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../InstallPromptAndroid */ "./src/app/component/InstallPromptAndroid/index.js");
/* harmony import */ var _InstallPromptIOS__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../InstallPromptIOS */ "./src/app/component/InstallPromptIOS/index.js");
/* harmony import */ var _type_Device__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../type/Device */ "./src/app/type/Device.js");
/* harmony import */ var _InstallPrompt_style__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./InstallPrompt.style */ "./src/app/component/InstallPrompt/InstallPrompt.style.scss");
/* harmony import */ var _InstallPrompt_style__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_InstallPrompt_style__WEBPACK_IMPORTED_MODULE_5__);
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






/** @namespace Component/InstallPrompt/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _InstallPrompt =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_InstallPrompt, _Extensible);

  function _InstallPrompt() {
    _classCallCheck(this, _InstallPrompt);

    return _possibleConstructorReturn(this, _getPrototypeOf(_InstallPrompt).apply(this, arguments));
  }

  _createClass(_InstallPrompt, [{
    key: "hasSupport",

    /**
     * Currently BeforeInstallPromptEvent is supported only on
     * - Android webview
     * - Chrome for Android
     * - Samsung Internet
     * But iOS has own "Add to Home Screen button" on Safari share menu
     */
    value: function hasSupport() {
      var _this$props = this.props,
          device = _this$props.device,
          hasInstallPromptEvent = _this$props.hasInstallPromptEvent,
          isBannerClosed = _this$props.isBannerClosed;
      var android = device.android,
          ios = device.ios,
          safari = device.safari,
          standaloneMode = device.standaloneMode;
      var isAndroid = android && hasInstallPromptEvent;
      var isIos = ios && safari;
      return (isAndroid || isIos) && !standaloneMode && !isBannerClosed;
    }
  }, {
    key: "renderPrompt",
    value: function renderPrompt() {
      var device = this.props.device;

      if (device.ios) {
        return (
          /*#__PURE__*/
          _checkBEM(React, _InstallPromptIOS__WEBPACK_IMPORTED_MODULE_3__["default"], this.containerFunctions)
        );
      }

      if (device.android) {
        return (
          /*#__PURE__*/
          _checkBEM(React, _InstallPromptAndroid__WEBPACK_IMPORTED_MODULE_2__["default"], this.containerFunctions)
        );
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var displayComponent = this.hasSupport();

      if (!displayComponent) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "InstallPrompt"
        }, this.renderPrompt())
      );
    }
  }]);

  return _InstallPrompt;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_InstallPrompt, 'name', {
  value: 'InstallPrompt'
});

var InstallPrompt = middleware(_InstallPrompt, "Component/InstallPrompt/Component");

_defineProperty(InstallPrompt, "propTypes", {
  device: _type_Device__WEBPACK_IMPORTED_MODULE_4__["DeviceType"].isRequired,
  isBannerClosed: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  hasInstallPromptEvent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  containerFunctions: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (InstallPrompt);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/InstallPrompt/InstallPrompt.container.js":
/*!********************************************************************!*\
  !*** ./src/app/component/InstallPrompt/InstallPrompt.container.js ***!
  \********************************************************************/
/*! exports provided: mapStateToProps, mapDispatchToProps, _InstallPromptContainer, InstallPromptContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_InstallPromptContainer", function() { return _InstallPromptContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstallPromptContainer", function() { return InstallPromptContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _type_Device__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../type/Device */ "./src/app/type/Device.js");
/* harmony import */ var _util_BrowserDatabase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/BrowserDatabase */ "./src/app/util/BrowserDatabase/index.js");
/* harmony import */ var _InstallPrompt_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./InstallPrompt.component */ "./src/app/component/InstallPrompt/InstallPrompt.component.js");
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





/** @namespace Component/InstallPrompt/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    device: state.ConfigReducer.device
  };
}, "Component/InstallPrompt/Container/mapStateToProps");
/** @namespace Component/InstallPrompt/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars

var mapDispatchToProps = middleware(function (dispatch) {
  return {};
}, "Component/InstallPrompt/Container/mapDispatchToProps");
/** @namespace Component/InstallPrompt/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _InstallPromptContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_InstallPromptContainer, _Extensible);

  function _InstallPromptContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _InstallPromptContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_InstallPromptContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isBannerClosed: _util_BrowserDatabase__WEBPACK_IMPORTED_MODULE_3__["default"].getItem('postpone_installation'),
      hasInstallPromptEvent: false
    });

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      handleAppInstall: _this.handleAppInstall.bind(_assertThisInitialized(_this)),
      handleBannerClose: _this.handleBannerClose.bind(_assertThisInitialized(_this))
    });

    return _this;
  }

  _createClass(_InstallPromptContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.listenForInstallPrompt();
    }
  }, {
    key: "handleAppInstall",
    value: function handleAppInstall() {
      var _this2 = this;

      if (!window.promt_event) {
        return;
      } // Show the modal add to home screen dialog


      window.promt_event.prompt(); // Wait for the user to respond to the prompt

      window.promt_event.userChoice.then(
      /** @namespace Component/InstallPrompt/Container/then */
      middleware(function (choice) {
        if (choice.outcome === 'accepted') {
          _this2.setState({
            isBannerClosed: true
          });
        } // Clear the saved prompt since it can't be used again


        window.promt_event = null;

        _this2.setState({
          hasInstallPromptEvent: false
        });
      }, "Component/InstallPrompt/Container/then"));
    }
  }, {
    key: "handleBannerClose",
    value: function handleBannerClose() {
      this.setState({
        isBannerClosed: true
      });
      var THREE_DAYS_IN_SECONDS = '259200';
      _util_BrowserDatabase__WEBPACK_IMPORTED_MODULE_3__["default"].setItem(true, 'postpone_installation', THREE_DAYS_IN_SECONDS);
    }
  }, {
    key: "listenForInstallPrompt",
    value: function listenForInstallPrompt() {
      var _this3 = this;

      window.addEventListener('beforeinstallprompt', function (event) {
        event.preventDefault();
        window.promt_event = Object.assign(event);

        _this3.setState({
          hasInstallPromptEvent: true
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _InstallPrompt_component__WEBPACK_IMPORTED_MODULE_4__["default"], _extends({}, this.props, this.state, {
          containerFunctions: this.containerFunctions
        }))
      );
    }
  }]);

  return _InstallPromptContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]));
Object.defineProperty(_InstallPromptContainer, 'name', {
  value: 'InstallPromptContainer'
});

var InstallPromptContainer = middleware(_InstallPromptContainer, "Component/InstallPrompt/Container");

_defineProperty(InstallPromptContainer, "propTypes", {
  device: _type_Device__WEBPACK_IMPORTED_MODULE_2__["DeviceType"].isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(InstallPromptContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/InstallPrompt/InstallPrompt.style.scss":
/*!******************************************************************!*\
  !*** ./src/app/component/InstallPrompt/InstallPrompt.style.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291336778
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/InstallPrompt/index.js":
/*!**************************************************!*\
  !*** ./src/app/component/InstallPrompt/index.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _InstallPrompt_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InstallPrompt.container */ "./src/app/component/InstallPrompt/InstallPrompt.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _InstallPrompt_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/InstallPromptAndroid/InstallPromptAndroid.component.js":
/*!**********************************************************************************!*\
  !*** ./src/app/component/InstallPromptAndroid/InstallPromptAndroid.component.js ***!
  \**********************************************************************************/
/*! exports provided: _InstallPromptAndroid, InstallPromptAndroid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_InstallPromptAndroid", function() { return _InstallPromptAndroid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstallPromptAndroid", function() { return InstallPromptAndroid; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _InstallPromptAndroid_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InstallPromptAndroid.style */ "./src/app/component/InstallPromptAndroid/InstallPromptAndroid.style.scss");
/* harmony import */ var _InstallPromptAndroid_style__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_InstallPromptAndroid_style__WEBPACK_IMPORTED_MODULE_2__);
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



/** @namespace Component/InstallPromptAndroid/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _InstallPromptAndroid =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_InstallPromptAndroid, _Extensible);

  function _InstallPromptAndroid() {
    _classCallCheck(this, _InstallPromptAndroid);

    return _possibleConstructorReturn(this, _getPrototypeOf(_InstallPromptAndroid).apply(this, arguments));
  }

  _createClass(_InstallPromptAndroid, [{
    key: "renderCloseButton",
    value: function renderCloseButton() {
      var handleBannerClose = this.props.handleBannerClose;
      return (
        /*#__PURE__*/
        _checkBEM(React, "button", {
          block: "InstallPromptAndroid",
          elem: "Close",
          onClick: handleBannerClose,
          "aria-label": __('Close')
        })
      );
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "p", {
          block: "InstallPromptAndroid",
          elem: "Content"
        }, __('Add website to your home screen for the full-screen browsing experience!'))
      );
    }
  }, {
    key: "renderInstallButton",
    value: function renderInstallButton() {
      var handleAppInstall = this.props.handleAppInstall;
      return (
        /*#__PURE__*/
        _checkBEM(React, "button", {
          block: "InstallPromptAndroid",
          elem: "Button",
          mix: {
            block: 'Button'
          },
          onClick: handleAppInstall
        }, __('Add to home screen'))
      );
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "InstallPromptAndroid"
        }, this.renderCloseButton(), this.renderContent(), this.renderInstallButton())
      );
    }
  }]);

  return _InstallPromptAndroid;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_InstallPromptAndroid, 'name', {
  value: 'InstallPromptAndroid'
});

var InstallPromptAndroid = middleware(_InstallPromptAndroid, "Component/InstallPromptAndroid/Component");

_defineProperty(InstallPromptAndroid, "propTypes", {
  handleBannerClose: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  handleAppInstall: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (InstallPromptAndroid);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/InstallPromptAndroid/InstallPromptAndroid.style.scss":
/*!********************************************************************************!*\
  !*** ./src/app/component/InstallPromptAndroid/InstallPromptAndroid.style.scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340146
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/InstallPromptAndroid/index.js":
/*!*********************************************************!*\
  !*** ./src/app/component/InstallPromptAndroid/index.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _InstallPromptAndroid_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InstallPromptAndroid.component */ "./src/app/component/InstallPromptAndroid/InstallPromptAndroid.component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _InstallPromptAndroid_component__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/InstallPromptIOS/InstallPromptIOS.component.js":
/*!**************************************************************************!*\
  !*** ./src/app/component/InstallPromptIOS/InstallPromptIOS.component.js ***!
  \**************************************************************************/
/*! exports provided: _InstallPromptIOS, InstallPromptIOS, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_InstallPromptIOS", function() { return _InstallPromptIOS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstallPromptIOS", function() { return InstallPromptIOS; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _InstallPromptIOS_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InstallPromptIOS.style */ "./src/app/component/InstallPromptIOS/InstallPromptIOS.style.scss");
/* harmony import */ var _InstallPromptIOS_style__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_InstallPromptIOS_style__WEBPACK_IMPORTED_MODULE_2__);
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



/** @namespace Component/InstallPromptIOS/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _InstallPromptIOS =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_InstallPromptIOS, _Extensible);

  function _InstallPromptIOS() {
    _classCallCheck(this, _InstallPromptIOS);

    return _possibleConstructorReturn(this, _getPrototypeOf(_InstallPromptIOS).apply(this, arguments));
  }

  _createClass(_InstallPromptIOS, [{
    key: "renderCloseButton",
    value: function renderCloseButton() {
      var handleBannerClose = this.props.handleBannerClose;
      return (
        /*#__PURE__*/
        _checkBEM(React, "button", {
          block: "InstallPromptIOS",
          elem: "Close",
          onClick: handleBannerClose
        }, __('Maybe later'))
      );
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "p", {
          block: "InstallPromptIOS",
          elem: "Content"
        },
        /*#__PURE__*/
        _checkBEM(React, "span", null, __('Tap:')),
        /*#__PURE__*/
        _checkBEM(React, "span", {
          block: "InstallPromptIOS",
          elem: "Share"
        }),
        /*#__PURE__*/
        _checkBEM(React, "span", null, __(', then')),
        /*#__PURE__*/
        _checkBEM(React, "span", {
          block: "InstallPromptIOS",
          elem: "Plus"
        }),
        /*#__PURE__*/
        _checkBEM(React, "span", null, __('Add to Home Screen')))
      );
    }
  }, {
    key: "renderHeading",
    value: function renderHeading() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "p", {
          block: "InstallPromptIOS",
          elem: "Heading"
        }, __('Browse website in full-screen:'))
      );
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "InstallPromptIOS"
        }, this.renderHeading(), this.renderContent(), this.renderCloseButton())
      );
    }
  }]);

  return _InstallPromptIOS;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_InstallPromptIOS, 'name', {
  value: 'InstallPromptIOS'
});

var InstallPromptIOS = middleware(_InstallPromptIOS, "Component/InstallPromptIOS/Component");

_defineProperty(InstallPromptIOS, "propTypes", {
  handleBannerClose: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (InstallPromptIOS);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/InstallPromptIOS/InstallPromptIOS.style.scss":
/*!************************************************************************!*\
  !*** ./src/app/component/InstallPromptIOS/InstallPromptIOS.style.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340136
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/InstallPromptIOS/index.js":
/*!*****************************************************!*\
  !*** ./src/app/component/InstallPromptIOS/index.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _InstallPromptIOS_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InstallPromptIOS.component */ "./src/app/component/InstallPromptIOS/InstallPromptIOS.component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _InstallPromptIOS_component__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/SliderWidget/SliderWidget.component.js":
/*!******************************************************************!*\
  !*** ./src/app/component/SliderWidget/SliderWidget.component.js ***!
  \******************************************************************/
/*! exports provided: _SliderWidget, SliderWidget, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_SliderWidget", function() { return _SliderWidget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SliderWidget", function() { return SliderWidget; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Html */ "./src/app/component/Html/index.js");
/* harmony import */ var _Image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Image */ "./src/app/component/Image/index.js");
/* harmony import */ var _Slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Slider */ "./src/app/component/Slider/index.js");
/* harmony import */ var _type_Device__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../type/Device */ "./src/app/type/Device.js");
/* harmony import */ var _SliderWidget_style__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SliderWidget.style */ "./src/app/component/SliderWidget/SliderWidget.style.scss");
/* harmony import */ var _SliderWidget_style__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_SliderWidget_style__WEBPACK_IMPORTED_MODULE_6__);
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

/* eslint-disable react/no-array-index-key */

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
 * Homepage slider
 * @class SliderWidget
 * @namespace Component/SliderWidget/Component
 */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _SliderWidget =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_SliderWidget, _Extensible);

  function _SliderWidget() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _SliderWidget);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_SliderWidget)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      activeImage: 0,
      carouselDirection: 'right',
      imageToShow: 0
    });

    _defineProperty(_assertThisInitialized(_this), "onActiveImageChange", function (activeImage) {
      _this.setState({
        activeImage: activeImage
      });
    });

    _defineProperty(_assertThisInitialized(_this), "startCarousel", function (interval) {
      _this.carouselInterval = setInterval(function () {
        _this.getImageToShow();

        var imageToShow = _this.state.imageToShow;

        _this.onActiveImageChange(imageToShow);
      }, interval);
    });

    _defineProperty(_assertThisInitialized(_this), "renderSlide", function (slide, i) {
      var slide_text = slide.slide_text,
          isPlaceholder = slide.isPlaceholder,
          block = slide.title;
      return (
        /*#__PURE__*/
        _checkBEM(React, "figure", {
          block: "SliderWidget",
          elem: "Figure",
          key: i
        },
        /*#__PURE__*/
        _checkBEM(React, _Image__WEBPACK_IMPORTED_MODULE_3__["default"], {
          mix: {
            block: 'SliderWidget',
            elem: 'FigureImage'
          },
          ratio: "custom",
          src: _this.getSlideImage(slide),
          isPlaceholder: isPlaceholder
        }),
        /*#__PURE__*/
        _checkBEM(React, "figcaption", {
          block: "SliderWidget",
          elem: "Figcaption",
          mix: {
            block: block
          }
        },
        /*#__PURE__*/
        _checkBEM(React, _Html__WEBPACK_IMPORTED_MODULE_2__["default"], {
          content: slide_text || ''
        })))
      );
    });

    return _this;
  }

  _createClass(_SliderWidget, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props$slider = this.props.slider,
          slideSpeed = _this$props$slider.slideSpeed,
          slides = _this$props$slider.slides;
      var prevSlideSpeed = prevProps.slider.slideSpeed;

      if (slideSpeed !== prevSlideSpeed && slides.length !== 1) {
        this.startCarousel(slideSpeed);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.carouselInterval);
    }
  }, {
    key: "getImageToShow",
    value: function getImageToShow() {
      var _this$state = this.state,
          activeImage = _this$state.activeImage,
          carouselDirection = _this$state.carouselDirection;
      var slides = this.props.slider.slides;

      if (activeImage === 0) {
        this.setState({
          carouselDirection: 'right',
          imageToShow: activeImage + 1
        });
      } else if (activeImage === slides.length - 1) {
        this.setState({
          carouselDirection: 'left',
          imageToShow: activeImage - 1
        });
      } else {
        this.setState({
          imageToShow: carouselDirection === 'right' ? activeImage + 1 : activeImage - 1
        });
      }
    }
  }, {
    key: "getSlideImage",
    value: function getSlideImage(slide) {
      var desktop_image = slide.desktop_image,
          mobile_image = slide.mobile_image;
      var device = this.props.device;

      if (device.isMobile && mobile_image) {
        return "/".concat(mobile_image);
      }

      if (!desktop_image) {
        return '';
      }

      return "/".concat(desktop_image);
    }
  }, {
    key: "render",
    value: function render() {
      var activeImage = this.state.activeImage;
      var _this$props$slider2 = this.props.slider,
          slides = _this$props$slider2.slides,
          block = _this$props$slider2.title;
      return (
        /*#__PURE__*/
        _checkBEM(React, _Slider__WEBPACK_IMPORTED_MODULE_4__["default"], {
          mix: {
            block: 'SliderWidget',
            mix: {
              block: block
            }
          },
          showCrumbs: true,
          activeImage: activeImage,
          onActiveImageChange: this.onActiveImageChange
        }, slides.map(this.renderSlide))
      );
    }
  }]);

  return _SliderWidget;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_SliderWidget, 'name', {
  value: 'SliderWidget'
});

var SliderWidget = middleware(_SliderWidget, "Component/SliderWidget/Component");

_defineProperty(SliderWidget, "propTypes", {
  slider: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
    title: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
    slideSpeed: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
    slides: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
      desktop_image: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
      mobile_image: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
      slide_text: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
      isPlaceholder: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool
    }))
  }),
  device: _type_Device__WEBPACK_IMPORTED_MODULE_5__["DeviceType"].isRequired
});

_defineProperty(SliderWidget, "defaultProps", {
  slider: [{}]
});

/* harmony default export */ __webpack_exports__["default"] = (SliderWidget);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/SliderWidget/SliderWidget.container.js":
/*!******************************************************************!*\
  !*** ./src/app/component/SliderWidget/SliderWidget.container.js ***!
  \******************************************************************/
/*! exports provided: mapStateToProps, mapDispatchToProps, _SliderWidgetContainer, SliderWidgetContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_SliderWidgetContainer", function() { return _SliderWidgetContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SliderWidgetContainer", function() { return SliderWidgetContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _query_Slider_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../query/Slider.query */ "./src/app/query/Slider.query.js");
/* harmony import */ var _store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store/Notification/Notification.action */ "./src/app/store/Notification/Notification.action.js");
/* harmony import */ var _util_Request_DataContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/Request/DataContainer */ "./src/app/util/Request/DataContainer.js");
/* harmony import */ var _SliderWidget_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SliderWidget.component */ "./src/app/component/SliderWidget/SliderWidget.component.js");
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






/** @namespace Component/SliderWidget/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    device: state.ConfigReducer.device
  };
}, "Component/SliderWidget/Container/mapStateToProps");
/** @namespace Component/SliderWidget/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    showNotification: function showNotification(type, title, error) {
      return dispatch(Object(_store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_3__["showNotification"])(type, title, error));
    }
  };
}, "Component/SliderWidget/Container/mapDispatchToProps");
/** @namespace Component/SliderWidget/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _SliderWidgetContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_SliderWidgetContainer, _Extensible);

  function _SliderWidgetContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _SliderWidgetContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_SliderWidgetContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      slider: {
        slideSpeed: 0,
        slides: [{
          image: '',
          slide_text: '',
          isPlaceholder: true
        }]
      }
    });

    return _this;
  }

  _createClass(_SliderWidgetContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.requestSlider();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var sliderId = this.props.sliderId;
      var pSliderId = prevProps.sliderId;

      if (sliderId !== pSliderId) {
        this.requestSlider();
      }
    }
  }, {
    key: "requestSlider",
    value: function requestSlider() {
      var _this2 = this;

      var _this$props = this.props,
          sliderId = _this$props.sliderId,
          showNotification = _this$props.showNotification;
      this.fetchData([_query_Slider_query__WEBPACK_IMPORTED_MODULE_2__["default"].getQuery({
        sliderId: sliderId
      })], function (_ref) {
        var slider = _ref.slider;
        return _this2.setState({
          slider: slider
        });
      }, function (e) {
        return showNotification('error', 'Error fetching Slider!', e);
      });
    }
  }, {
    key: "_getGalleryPictures",
    value: function _getGalleryPictures() {
      var gallery = this.state.gallery;
      return gallery;
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _SliderWidget_component__WEBPACK_IMPORTED_MODULE_5__["default"], _extends({}, this.props, this.state))
      );
    }
  }]);

  return _SliderWidgetContainer;
}(Extensible(_util_Request_DataContainer__WEBPACK_IMPORTED_MODULE_4__["default"]));
Object.defineProperty(_SliderWidgetContainer, 'name', {
  value: 'SliderWidgetContainer'
});

var SliderWidgetContainer = middleware(_SliderWidgetContainer, "Component/SliderWidget/Container");

_defineProperty(SliderWidgetContainer, "propTypes", {
  sliderId: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number.isRequired,
  showNotification: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(SliderWidgetContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/SliderWidget/SliderWidget.style.scss":
/*!****************************************************************!*\
  !*** ./src/app/component/SliderWidget/SliderWidget.style.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340545
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/SliderWidget/index.js":
/*!*************************************************!*\
  !*** ./src/app/component/SliderWidget/index.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SliderWidget_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SliderWidget.container */ "./src/app/component/SliderWidget/SliderWidget.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _SliderWidget_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/query/CmsPage.query.js":
/*!****************************************!*\
  !*** ./src/app/query/CmsPage.query.js ***!
  \****************************************/
/*! exports provided: _CmsPageQuery, CmsPageQuery, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_CmsPageQuery", function() { return _CmsPageQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmsPageQuery", function() { return CmsPageQuery; });
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

/**
 * CMS Page Query
 * @class CmsPageQuery
 * @namespace Query/CmsPage
 */

var _CmsPageQuery =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_CmsPageQuery, _Extensible);

  function _CmsPageQuery() {
    _classCallCheck(this, _CmsPageQuery);

    return _possibleConstructorReturn(this, _getPrototypeOf(_CmsPageQuery).apply(this, arguments));
  }

  _createClass(_CmsPageQuery, [{
    key: "getQuery",

    /**
     * get CMS Page query
     * @param  {{url_key: String, title: Int, content: String, content_heading: String, page_layout: String, meta_title: String, meta_description: String, meta_keywords, string}} options A object containing different aspects of query, each item can be omitted
     * @return {Query} CMS Page query
     * @memberof CmsPageQuery
     */
    value: function getQuery(_ref) {
      var id = _ref.id,
          url_key = _ref.url_key,
          identifier = _ref.identifier;

      if (!id && !url_key && !identifier) {
        throw new Error('Missing argument `id` or `url_key`!');
      }

      var cmsPage = new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('cmsPage').addFieldList(this._getPageFields());

      if (identifier) {
        cmsPage.addArgument('identifier', 'String!', identifier);
      } else if (id) {
        cmsPage.addArgument('id', 'Int!', id);
      }

      return cmsPage;
    }
  }, {
    key: "_getPageFields",
    value: function _getPageFields() {
      return ['title', 'content', 'page_width', 'content_heading', 'meta_title', 'meta_description', 'meta_keywords'];
    }
  }]);

  return _CmsPageQuery;
}(Extensible());
Object.defineProperty(_CmsPageQuery, 'name', {
  value: 'CmsPageQuery'
});

var CmsPageQuery = middleware(_CmsPageQuery, "Query/CmsPage");
/* harmony default export */ __webpack_exports__["default"] = (new CmsPageQuery());
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/query/Slider.query.js":
/*!***************************************!*\
  !*** ./src/app/query/Slider.query.js ***!
  \***************************************/
/*! exports provided: _SliderQuery, SliderQuery, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_SliderQuery", function() { return _SliderQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SliderQuery", function() { return SliderQuery; });
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

/**
 * Slider Query
 * @class Slider
 * @namespace Query/Slider
 */

var _SliderQuery =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_SliderQuery, _Extensible);

  function _SliderQuery() {
    _classCallCheck(this, _SliderQuery);

    return _possibleConstructorReturn(this, _getPrototypeOf(_SliderQuery).apply(this, arguments));
  }

  _createClass(_SliderQuery, [{
    key: "getQuery",
    value: function getQuery(options) {
      var sliderId = options.sliderId;
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('scandiwebSlider').addArgument('id', 'ID!', sliderId).addFieldList(this._getSliderFields()).setAlias('slider');
    }
  }, {
    key: "_getSliderFields",
    value: function _getSliderFields() {
      return [this._getSlidesField(), this._getSlideSpeedField(), 'slider_id', 'title'];
    }
  }, {
    key: "_getSlideFields",
    value: function _getSlideFields() {
      return ['slide_text', 'slide_id', 'mobile_image', 'desktop_image', 'title', 'is_active'];
    }
  }, {
    key: "_getSlidesField",
    value: function _getSlidesField() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('slides').addFieldList(this._getSlideFields());
    }
  }, {
    key: "_getSlideSpeedField",
    value: function _getSlideSpeedField() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('slide_speed').setAlias('slideSpeed');
    }
  }]);

  return _SliderQuery;
}(Extensible());
Object.defineProperty(_SliderQuery, 'name', {
  value: 'SliderQuery'
});

var SliderQuery = middleware(_SliderQuery, "Query/Slider");
/* harmony default export */ __webpack_exports__["default"] = (new SliderQuery());
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/route/CmsPage/CmsPage.component.js":
/*!****************************************************!*\
  !*** ./src/app/route/CmsPage/CmsPage.component.js ***!
  \****************************************************/
/*! exports provided: _CmsPage, CmsPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_CmsPage", function() { return _CmsPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmsPage", function() { return CmsPage; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _component_Html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../component/Html */ "./src/app/component/Html/index.js");
/* harmony import */ var _component_TextPlaceholder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../component/TextPlaceholder */ "./src/app/component/TextPlaceholder/index.js");
/* harmony import */ var _type_CMS__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../type/CMS */ "./src/app/type/CMS.js");
/* harmony import */ var _CmsPage_style__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CmsPage.style */ "./src/app/route/CmsPage/CmsPage.style.scss");
/* harmony import */ var _CmsPage_style__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_CmsPage_style__WEBPACK_IMPORTED_MODULE_5__);
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






/** @namespace Route/CmsPage/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _CmsPage =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_CmsPage, _Extensible);

  function _CmsPage() {
    _classCallCheck(this, _CmsPage);

    return _possibleConstructorReturn(this, _getPrototypeOf(_CmsPage).apply(this, arguments));
  }

  _createClass(_CmsPage, [{
    key: "renderHeading",
    value: function renderHeading() {
      var content_heading = this.props.page.content_heading;

      if (!content_heading) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "h1", {
          block: "CmsPage",
          elem: "Heading"
        },
        /*#__PURE__*/
        _checkBEM(React, _component_TextPlaceholder__WEBPACK_IMPORTED_MODULE_3__["default"], {
          content: content_heading
        }))
      );
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this$props = this.props,
          isLoading = _this$props.isLoading,
          content = _this$props.page.content;

      if (isLoading) {
        return (
          /*#__PURE__*/
          _checkBEM(React, React.Fragment, null,
          /*#__PURE__*/
          _checkBEM(React, "div", {
            block: "CmsPage",
            elem: "SectionPlaceholder"
          }),
          /*#__PURE__*/
          _checkBEM(React, "div", {
            block: "CmsPage",
            elem: "SectionPlaceholder"
          }),
          /*#__PURE__*/
          _checkBEM(React, "div", {
            block: "CmsPage",
            elem: "SectionPlaceholder"
          }))
        );
      }

      if (!isLoading && !content) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, _component_Html__WEBPACK_IMPORTED_MODULE_2__["default"], {
          content: content
        })
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          page = _this$props2.page,
          isBreadcrumbsActive = _this$props2.isBreadcrumbsActive;
      var page_width = page.page_width;
      return (
        /*#__PURE__*/
        _checkBEM(React, "main", {
          block: "CmsPage",
          mods: {
            isBreadcrumbsHidden: !isBreadcrumbsActive
          }
        },
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "CmsPage",
          elem: "Wrapper",
          mods: {
            page_width: page_width
          }
        }, this.renderHeading(),
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "CmsPage",
          elem: "Content"
        }, this.renderContent())))
      );
    }
  }]);

  return _CmsPage;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_CmsPage, 'name', {
  value: 'CmsPage'
});

var CmsPage = middleware(_CmsPage, "Route/CmsPage/Component");

_defineProperty(CmsPage, "propTypes", {
  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  isBreadcrumbsActive: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  page: _type_CMS__WEBPACK_IMPORTED_MODULE_4__["BlockListType"].isRequired
});

_defineProperty(CmsPage, "defaultProps", {
  isBreadcrumbsActive: true
});

/* harmony default export */ __webpack_exports__["default"] = (CmsPage);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/route/CmsPage/CmsPage.config.js":
/*!*************************************************!*\
  !*** ./src/app/route/CmsPage/CmsPage.config.js ***!
  \*************************************************/
/*! exports provided: LOADING_TIME */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOADING_TIME", function() { return LOADING_TIME; });
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
var LOADING_TIME = 300;

/***/ }),

/***/ "./src/app/route/CmsPage/CmsPage.container.js":
/*!****************************************************!*\
  !*** ./src/app/route/CmsPage/CmsPage.container.js ***!
  \****************************************************/
/*! exports provided: BreadcrumbsDispatcher, mapStateToProps, mapDispatchToProps, _CmsPageContainer, CmsPageContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BreadcrumbsDispatcher", function() { return BreadcrumbsDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_CmsPageContainer", function() { return _CmsPageContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CmsPageContainer", function() { return CmsPageContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _component_Header_Header_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../component/Header/Header.config */ "./src/app/component/Header/Header.config.js");
/* harmony import */ var _query_CmsPage_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../query/CmsPage.query */ "./src/app/query/CmsPage.query.js");
/* harmony import */ var _store_Breadcrumbs_Breadcrumbs_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/Breadcrumbs/Breadcrumbs.action */ "./src/app/store/Breadcrumbs/Breadcrumbs.action.js");
/* harmony import */ var _store_Meta_Meta_action__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store/Meta/Meta.action */ "./src/app/store/Meta/Meta.action.js");
/* harmony import */ var _store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../store/Navigation/Navigation.action */ "./src/app/store/Navigation/Navigation.action.js");
/* harmony import */ var _store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../store/Navigation/Navigation.reducer */ "./src/app/store/Navigation/Navigation.reducer.js");
/* harmony import */ var _store_Offline_Offline_action__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../store/Offline/Offline.action */ "./src/app/store/Offline/Offline.action.js");
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _util_History__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../util/History */ "./src/app/util/History/index.js");
/* harmony import */ var _util_Request__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../util/Request */ "./src/app/util/Request/index.js");
/* harmony import */ var _util_Request_DataContainer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../util/Request/DataContainer */ "./src/app/util/Request/DataContainer.js");
/* harmony import */ var _util_Url__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../util/Url */ "./src/app/util/Url/index.js");
/* harmony import */ var _CmsPage_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./CmsPage.component */ "./src/app/route/CmsPage/CmsPage.component.js");
/* harmony import */ var _CmsPage_config__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./CmsPage.config */ "./src/app/route/CmsPage/CmsPage.config.js");
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
















var BreadcrumbsDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/Breadcrumbs/Breadcrumbs.dispatcher */ "./src/app/store/Breadcrumbs/Breadcrumbs.dispatcher.js"));
/** @namespace Route/CmsPage/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    isOffline: state.OfflineReducer.isOffline
  };
}, "Route/CmsPage/Container/mapStateToProps");
/** @namespace Route/CmsPage/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    updateBreadcrumbs: function updateBreadcrumbs(breadcrumbs) {
      return BreadcrumbsDispatcher.then(function (_ref) {
        var dispatcher = _ref.default;
        return dispatcher.updateWithCmsPage(breadcrumbs, dispatch);
      });
    },
    setHeaderState: function setHeaderState(stateName) {
      return dispatch(Object(_store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_6__["changeNavigationState"])(_store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_7__["TOP_NAVIGATION_TYPE"], stateName));
    },
    setBigOfflineNotice: function setBigOfflineNotice(isBig) {
      return dispatch(Object(_store_Offline_Offline_action__WEBPACK_IMPORTED_MODULE_8__["setBigOfflineNotice"])(isBig));
    },
    updateMeta: function updateMeta(meta) {
      return dispatch(Object(_store_Meta_Meta_action__WEBPACK_IMPORTED_MODULE_5__["updateMeta"])(meta));
    },
    toggleBreadcrumbs: function toggleBreadcrumbs(isActive) {
      BreadcrumbsDispatcher.then(function (_ref2) {
        var dispatcher = _ref2.default;
        return dispatcher.update([], dispatch);
      });
      dispatch(Object(_store_Breadcrumbs_Breadcrumbs_action__WEBPACK_IMPORTED_MODULE_4__["toggleBreadcrumbs"])(isActive));
    }
  };
}, "Route/CmsPage/Container/mapDispatchToProps");
/** @namespace Route/CmsPage/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _CmsPageContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_CmsPageContainer, _Extensible);

  function _CmsPageContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _CmsPageContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_CmsPageContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      page: {},
      isLoading: true
    });

    _defineProperty(_assertThisInitialized(_this), "setOfflineNoticeSize", function () {
      var setBigOfflineNotice = _this.props.setBigOfflineNotice;
      var isLoading = _this.state.isLoading;

      if (isLoading) {
        setBigOfflineNotice(true);
      } else {
        setBigOfflineNotice(false);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onPageLoad", function (_ref3) {
      var page = _ref3.cmsPage;
      var _this$props = _this.props,
          pathname = _this$props.location.pathname,
          updateMeta = _this$props.updateMeta,
          setHeaderState = _this$props.setHeaderState,
          updateBreadcrumbs = _this$props.updateBreadcrumbs;
      var content_heading = page.content_heading,
          meta_title = page.meta_title,
          title = page.title,
          meta_description = page.meta_description;
      Object(_util_Request__WEBPACK_IMPORTED_MODULE_11__["debounce"])(_this.setOfflineNoticeSize, _CmsPage_config__WEBPACK_IMPORTED_MODULE_15__["LOADING_TIME"])();
      updateBreadcrumbs(page);
      updateMeta({
        title: meta_title || title,
        description: meta_description,
        canonical_url: window.location.href
      });

      if (pathname !== Object(_util_Url__WEBPACK_IMPORTED_MODULE_13__["appendWithStoreCode"])('/') && pathname !== '/') {
        setHeaderState({
          name: _component_Header_Header_config__WEBPACK_IMPORTED_MODULE_2__["CMS_PAGE"],
          title: content_heading,
          onBackClick: function onBackClick() {
            return _util_History__WEBPACK_IMPORTED_MODULE_10__["default"].goBack();
          }
        });
      }

      _this.setState({
        page: page,
        isLoading: false
      });
    });

    return _this;
  }

  _createClass(_CmsPageContainer, [{
    key: "__construct",
    value: function __construct(props) {
      _get(_getPrototypeOf(_CmsPageContainer.prototype), "__construct", this).call(this, props);

      this.updateBreadcrumbs();
    }
  }, {
    key: "updateBreadcrumbs",
    value: function updateBreadcrumbs() {
      var _this$props2 = this.props,
          toggleBreadcrumbs = _this$props2.toggleBreadcrumbs,
          isBreadcrumbsActive = _this$props2.isBreadcrumbsActive;
      toggleBreadcrumbs(isBreadcrumbsActive);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props3 = this.props,
          isOffline = _this$props3.isOffline,
          isOnlyPlaceholder = _this$props3.isOnlyPlaceholder;
      var isLoading = this.state.isLoading;

      if (isOffline && isLoading) {
        Object(_util_Request__WEBPACK_IMPORTED_MODULE_11__["debounce"])(this.setOfflineNoticeSize, _CmsPage_config__WEBPACK_IMPORTED_MODULE_15__["LOADING_TIME"])();
      }

      if (!isOnlyPlaceholder) {
        this.requestPage();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props4 = this.props,
          pathname = _this$props4.location.pathname,
          pageIdentifiers = _this$props4.pageIdentifiers,
          pageIds = _this$props4.pageIds;
      var prevPathname = prevProps.location.pathname,
          prevPageIdentifiers = prevProps.pageIdentifiers,
          prevPageIds = prevProps.pageIds;

      if (pathname !== prevPathname || pageIds !== prevPageIds || pageIdentifiers !== prevPageIdentifiers) {
        this.requestPage();
      }
    }
  }, {
    key: "getRequestQueryParams",
    value: function getRequestQueryParams() {
      var _this$props5 = this.props,
          location = _this$props5.location,
          match = _this$props5.match,
          identifier = _this$props5.pageIdentifiers,
          id = _this$props5.pageIds;

      if (identifier) {
        return {
          identifier: identifier
        };
      }

      if (id !== -1) {
        return {
          id: id
        };
      }

      var urlKey = Object(_util_Url__WEBPACK_IMPORTED_MODULE_13__["getUrlParam"])(match, location);
      return {
        identifier: urlKey
      };
    }
  }, {
    key: "requestPage",
    value: function requestPage() {
      var params = this.getRequestQueryParams();
      var id = params.id,
          identifier = params.identifier;

      if (!id && !identifier) {
        return;
      }

      this.setState({
        isLoading: true
      });
      this.fetchData([_query_CmsPage_query__WEBPACK_IMPORTED_MODULE_3__["default"].getQuery(params)], this.onPageLoad);
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _CmsPage_component__WEBPACK_IMPORTED_MODULE_14__["default"], _extends({}, this.props, this.state))
      );
    }
  }]);

  return _CmsPageContainer;
}(Extensible(_util_Request_DataContainer__WEBPACK_IMPORTED_MODULE_12__["default"]));
Object.defineProperty(_CmsPageContainer, 'name', {
  value: 'CmsPageContainer'
});

var CmsPageContainer = middleware(_CmsPageContainer, "Route/CmsPage/Container");

_defineProperty(CmsPageContainer, "propTypes", {
  match: _type_Common__WEBPACK_IMPORTED_MODULE_9__["MatchType"].isRequired,
  setHeaderState: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  updateBreadcrumbs: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  setBigOfflineNotice: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  location: _type_Common__WEBPACK_IMPORTED_MODULE_9__["LocationType"].isRequired,
  toggleBreadcrumbs: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  pageIds: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  pageIdentifiers: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  isOnlyPlaceholder: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  isBreadcrumbsActive: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool
});

_defineProperty(CmsPageContainer, "defaultProps", {
  pageIds: -1,
  pageIdentifiers: '',
  isOnlyPlaceholder: false,
  isBreadcrumbsActive: true
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(CmsPageContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/route/CmsPage/CmsPage.style.scss":
/*!**************************************************!*\
  !*** ./src/app/route/CmsPage/CmsPage.style.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291333689
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/route/CmsPage/index.js":
/*!****************************************!*\
  !*** ./src/app/route/CmsPage/index.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CmsPage_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CmsPage.container */ "./src/app/route/CmsPage/CmsPage.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _CmsPage_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/route/ConfirmAccountPage/ConfirmAccountPage.component.js":
/*!**************************************************************************!*\
  !*** ./src/app/route/ConfirmAccountPage/ConfirmAccountPage.component.js ***!
  \**************************************************************************/
/*! exports provided: _ConfirmAccountPage, ConfirmAccountPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ConfirmAccountPage", function() { return _ConfirmAccountPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmAccountPage", function() { return ConfirmAccountPage; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/es/index.js");
/* harmony import */ var _component_ContentWrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../component/ContentWrapper */ "./src/app/component/ContentWrapper/index.js");
/* harmony import */ var _component_Field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../component/Field */ "./src/app/component/Field/index.js");
/* harmony import */ var _component_Form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../component/Form */ "./src/app/component/Form/index.js");
/* harmony import */ var _component_Loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../component/Loader */ "./src/app/component/Loader/index.js");
/* harmony import */ var _ConfirmAccountPage_style__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ConfirmAccountPage.style */ "./src/app/route/ConfirmAccountPage/ConfirmAccountPage.style.scss");
/* harmony import */ var _ConfirmAccountPage_style__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_ConfirmAccountPage_style__WEBPACK_IMPORTED_MODULE_7__);
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








/** @namespace Route/ConfirmAccountPage/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ConfirmAccountPage =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ConfirmAccountPage, _Extensible);

  function _ConfirmAccountPage() {
    _classCallCheck(this, _ConfirmAccountPage);

    return _possibleConstructorReturn(this, _getPrototypeOf(_ConfirmAccountPage).apply(this, arguments));
  }

  _createClass(_ConfirmAccountPage, [{
    key: "renderForm",
    value: function renderForm() {
      var _this$props = this.props,
          onConfirmAttempt = _this$props.onConfirmAttempt,
          onConfirmSuccess = _this$props.onConfirmSuccess,
          onFormError = _this$props.onFormError; // TODO: use FieldForm instead!!!

      return (
        /*#__PURE__*/
        _checkBEM(React, _component_Form__WEBPACK_IMPORTED_MODULE_5__["default"], {
          mix: {
            block: 'ConfirmAccountPage',
            elem: 'Form'
          },
          key: "confirm-account",
          onSubmit: onConfirmAttempt,
          onSubmitSuccess: onConfirmSuccess,
          onSubmitError: onFormError
        },
        /*#__PURE__*/
        _checkBEM(React, _component_Field__WEBPACK_IMPORTED_MODULE_4__["default"], {
          type: "text",
          label: __('Email'),
          id: "confirm-email",
          name: "email",
          mix: {
            block: 'ConfirmAccountPage',
            elem: 'EmailInput'
          }
        }),
        /*#__PURE__*/
        _checkBEM(React, _component_Field__WEBPACK_IMPORTED_MODULE_4__["default"], {
          type: "password",
          label: __('Password'),
          id: "confirm-password",
          name: "password",
          validation: ['notEmpty', 'password']
        }),
        /*#__PURE__*/
        _checkBEM(React, "button", {
          type: "submit",
          block: "Button",
          mix: {
            block: 'ConfirmAccountPage',
            elem: 'Button'
          }
        }, __('Confirm your account')))
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          redirect = _this$props2.redirect,
          isLoading = _this$props2.isLoading,
          isSignedIn = _this$props2.isSignedIn;

      if (redirect || isSignedIn) {
        return (
          /*#__PURE__*/
          _checkBEM(React, react_router__WEBPACK_IMPORTED_MODULE_2__["Redirect"], {
            to: "/my-account/dashboard"
          })
        );
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "main", {
          block: "ConfirmAccountPage",
          "aria-label": __('Confirm Account Page')
        },
        /*#__PURE__*/
        _checkBEM(React, _component_ContentWrapper__WEBPACK_IMPORTED_MODULE_3__["default"], {
          wrapperMix: {
            block: 'ConfirmAccountPage',
            elem: 'Wrapper'
          },
          label: __('Confirm Account Action')
        },
        /*#__PURE__*/
        _checkBEM(React, _component_Loader__WEBPACK_IMPORTED_MODULE_6__["default"], {
          isLoading: isLoading
        }),
        /*#__PURE__*/
        _checkBEM(React, "h1", {
          block: "ConfirmAccountPage",
          elem: "Heading"
        }, __('Confirm your account')), this.renderForm()))
      );
    }
  }]);

  return _ConfirmAccountPage;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ConfirmAccountPage, 'name', {
  value: 'ConfirmAccountPage'
});

var ConfirmAccountPage = middleware(_ConfirmAccountPage, "Route/ConfirmAccountPage/Component");

_defineProperty(ConfirmAccountPage, "propTypes", {
  redirect: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  isSignedIn: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  onConfirmAttempt: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  onConfirmSuccess: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  onFormError: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

_defineProperty(ConfirmAccountPage, "defaultProps", {
  isSignedIn: false
});

/* harmony default export */ __webpack_exports__["default"] = (ConfirmAccountPage);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/route/ConfirmAccountPage/ConfirmAccountPage.container.js":
/*!**************************************************************************!*\
  !*** ./src/app/route/ConfirmAccountPage/ConfirmAccountPage.container.js ***!
  \**************************************************************************/
/*! exports provided: BreadcrumbsDispatcher, MyAccountDispatcher, mapStateToProps, mapDispatchToProps, _ConfirmAccountPageContainer, ConfirmAccountPageContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, __, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BreadcrumbsDispatcher", function() { return BreadcrumbsDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountDispatcher", function() { return MyAccountDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ConfirmAccountPageContainer", function() { return _ConfirmAccountPageContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmAccountPageContainer", function() { return ConfirmAccountPageContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _store_Meta_Meta_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store/Meta/Meta.action */ "./src/app/store/Meta/Meta.action.js");
/* harmony import */ var _store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/Notification/Notification.action */ "./src/app/store/Notification/Notification.action.js");
/* harmony import */ var _type_Router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../type/Router */ "./src/app/type/Router.js");
/* harmony import */ var _util_Url__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../util/Url */ "./src/app/util/Url/index.js");
/* harmony import */ var _ConfirmAccountPage_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ConfirmAccountPage.component */ "./src/app/route/ConfirmAccountPage/ConfirmAccountPage.component.js");
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
/** @namespace Route/ConfirmAccountPage/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    isSignedIn: state.MyAccountReducer.isSignedIn
  };
}, "Route/ConfirmAccountPage/Container/mapStateToProps");
/** @namespace Route/ConfirmAccountPage/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    updateBreadcrumbs: function updateBreadcrumbs(breadcrumbs) {
      BreadcrumbsDispatcher.then(function (_ref) {
        var dispatcher = _ref.default;
        return dispatcher.update(breadcrumbs, dispatch);
      });
    },
    updateMeta: function updateMeta(meta) {
      return dispatch(Object(_store_Meta_Meta_action__WEBPACK_IMPORTED_MODULE_3__["updateMeta"])(meta));
    },
    confirmAccount: function confirmAccount(options) {
      return MyAccountDispatcher.then(function (_ref2) {
        var dispatcher = _ref2.default;
        return dispatcher.confirmAccount(options, dispatch);
      });
    },
    showNotification: function showNotification(type, message) {
      return dispatch(Object(_store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_4__["showNotification"])(type, message));
    },
    signIn: function signIn(options) {
      return MyAccountDispatcher.then(function (_ref3) {
        var dispatcher = _ref3.default;
        return dispatcher.signIn(options, dispatch);
      });
    }
  };
}, "Route/ConfirmAccountPage/Container/mapDispatchToProps");
/** @namespace Route/ConfirmAccountPage/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ConfirmAccountPageContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ConfirmAccountPageContainer, _Extensible);

  function _ConfirmAccountPageContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ConfirmAccountPageContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ConfirmAccountPageContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      onConfirmAttempt: _this.onConfirmAttempt.bind(_assertThisInitialized(_this)),
      onConfirmSuccess: _this.onConfirmSuccess.bind(_assertThisInitialized(_this)),
      onFormError: _this.onFormError.bind(_assertThisInitialized(_this))
    });

    return _this;
  }

  _createClass(_ConfirmAccountPageContainer, [{
    key: "__construct",
    value: function __construct(props) {
      _get(_getPrototypeOf(_ConfirmAccountPageContainer.prototype), "__construct", this).call(this, props);

      this.state = {
        redirect: false,
        isLoading: false
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var updateMeta = this.props.updateMeta;
      updateMeta({
        title: __('Confirm account')
      });

      this._updateBreadcrumbs();
    }
  }, {
    key: "onConfirmAttempt",
    value: function onConfirmAttempt() {
      this.setState({
        isLoading: true
      });
    }
  }, {
    key: "onConfirmSuccess",
    value: function onConfirmSuccess(fields) {
      var _this2 = this;

      var _this$props = this.props,
          search = _this$props.location.search,
          confirmAccount = _this$props.confirmAccount,
          signIn = _this$props.signIn;
      var password = fields.password;
      var options = Object(_util_Url__WEBPACK_IMPORTED_MODULE_6__["convertQueryStringToKeyValuePairs"])(search);
      var email = options.email;
      confirmAccount(_objectSpread2(_objectSpread2({}, options), {}, {
        password: password
      })).then(
      /** @namespace Route/ConfirmAccountPage/Container/confirmAccountThen */
      middleware(function () {
        return signIn({
          email: email,
          password: password
        });
      }, "Route/ConfirmAccountPage/Container/confirmAccountThen")).then(
      /** @namespace Route/ConfirmAccountPage/Container/confirmAccountThenThen */
      middleware(function () {
        return _this2.setState({
          redirect: true
        });
      }, "Route/ConfirmAccountPage/Container/confirmAccountThenThen")).catch(
      /** @namespace Route/ConfirmAccountPage/Container/confirmAccountThenThenCatch */
      middleware(function () {
        return _this2.setState({
          isLoading: false
        });
      }, "Route/ConfirmAccountPage/Container/confirmAccountThenThenCatch"));
    }
  }, {
    key: "onFormError",
    value: function onFormError() {
      this.setState({
        isLoading: false
      });
    }
  }, {
    key: "_updateBreadcrumbs",
    value: function _updateBreadcrumbs() {
      var updateBreadcrumbs = this.props.updateBreadcrumbs;
      var breadcrumbs = [{
        url: '/account/confirmAccount',
        name: __('Confirm Account')
      }, {
        url: '/',
        name: __('Home')
      }];
      updateBreadcrumbs(breadcrumbs);
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _ConfirmAccountPage_component__WEBPACK_IMPORTED_MODULE_7__["default"], _extends({}, this.props, this.containerFunctions, this.state))
      );
    }
  }]);

  return _ConfirmAccountPageContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ConfirmAccountPageContainer, 'name', {
  value: 'ConfirmAccountPageContainer'
});

var ConfirmAccountPageContainer = middleware(_ConfirmAccountPageContainer, "Route/ConfirmAccountPage/Container");

_defineProperty(ConfirmAccountPageContainer, "propTypes", {
  location: _type_Router__WEBPACK_IMPORTED_MODULE_5__["LocationType"].isRequired,
  signIn: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  updateMeta: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  confirmAccount: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  showNotification: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  updateBreadcrumbs: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(ConfirmAccountPageContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/route/ConfirmAccountPage/ConfirmAccountPage.style.scss":
/*!************************************************************************!*\
  !*** ./src/app/route/ConfirmAccountPage/ConfirmAccountPage.style.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291332656
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/route/ConfirmAccountPage/index.js":
/*!***************************************************!*\
  !*** ./src/app/route/ConfirmAccountPage/index.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ConfirmAccountPage_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ConfirmAccountPage.container */ "./src/app/route/ConfirmAccountPage/ConfirmAccountPage.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ConfirmAccountPage_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/route/HomePage/HomePage.container.js":
/*!******************************************************!*\
  !*** ./src/app/route/HomePage/HomePage.container.js ***!
  \******************************************************/
/*! exports provided: mapStateToProps, mapDispatchToProps, _HomePageContainer, HomePageContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_HomePageContainer", function() { return _HomePageContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageContainer", function() { return HomePageContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _component_Footer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../component/Footer */ "./src/app/component/Footer/index.js");
/* harmony import */ var _component_InstallPrompt__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../component/InstallPrompt */ "./src/app/component/InstallPrompt/index.js");
/* harmony import */ var _component_NavigationAbstract_NavigationAbstract_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../component/NavigationAbstract/NavigationAbstract.config */ "./src/app/component/NavigationAbstract/NavigationAbstract.config.js");
/* harmony import */ var _CmsPage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../CmsPage */ "./src/app/route/CmsPage/index.js");
/* harmony import */ var _store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../store/Navigation/Navigation.action */ "./src/app/store/Navigation/Navigation.action.js");
/* harmony import */ var _store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../store/Navigation/Navigation.reducer */ "./src/app/store/Navigation/Navigation.reducer.js");
/* harmony import */ var _HomePage_style__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./HomePage.style */ "./src/app/route/HomePage/HomePage.style.scss");
/* harmony import */ var _HomePage_style__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_HomePage_style__WEBPACK_IMPORTED_MODULE_9__);
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










/** @namespace Route/HomePage/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    pageIdentifiers: state.ConfigReducer.cms_home_page
  };
}, "Route/HomePage/Container/mapStateToProps");
/** @namespace Route/HomePage/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    changeHeaderState: function changeHeaderState(state) {
      return dispatch(Object(_store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_7__["changeNavigationState"])(_store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_8__["TOP_NAVIGATION_TYPE"], state));
    }
  };
}, "Route/HomePage/Container/mapDispatchToProps");
/** @namespace Route/HomePage/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _HomePageContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_HomePageContainer, _Extensible);

  function _HomePageContainer() {
    _classCallCheck(this, _HomePageContainer);

    return _possibleConstructorReturn(this, _getPrototypeOf(_HomePageContainer).apply(this, arguments));
  }

  _createClass(_HomePageContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var changeHeaderState = this.props.changeHeaderState;
      changeHeaderState({
        name: _component_NavigationAbstract_NavigationAbstract_config__WEBPACK_IMPORTED_MODULE_5__["DEFAULT_STATE_NAME"],
        isHiddenOnMobile: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "HomePage"
        },
        /*#__PURE__*/
        _checkBEM(React, _component_InstallPrompt__WEBPACK_IMPORTED_MODULE_4__["default"], null),
        /*#__PURE__*/
        _checkBEM(React, _CmsPage__WEBPACK_IMPORTED_MODULE_6__["default"], this.props),
        /*#__PURE__*/
        _checkBEM(React, _component_Footer__WEBPACK_IMPORTED_MODULE_3__["default"], {
          isVisibleOnMobile: true
        }))
      );
    }
  }]);

  return _HomePageContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_HomePageContainer, 'name', {
  value: 'HomePageContainer'
});

var HomePageContainer = middleware(_HomePageContainer, "Route/HomePage/Container");

_defineProperty(HomePageContainer, "propTypes", {
  changeHeaderState: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(HomePageContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/route/HomePage/HomePage.style.scss":
/*!****************************************************!*\
  !*** ./src/app/route/HomePage/HomePage.style.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291327689
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/route/HomePage/index.js":
/*!*****************************************!*\
  !*** ./src/app/route/HomePage/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HomePage_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HomePage.container */ "./src/app/route/HomePage/HomePage.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _HomePage_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/route/MenuPage/MenuPage.container.js":
/*!******************************************************!*\
  !*** ./src/app/route/MenuPage/MenuPage.container.js ***!
  \******************************************************/
/*! exports provided: mapStateToProps, mapDispatchToProps, _MenuPageContainer, MenuPageContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, __, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MenuPageContainer", function() { return _MenuPageContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuPageContainer", function() { return MenuPageContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/es/index.js");
/* harmony import */ var _component_Header_Header_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../component/Header/Header.config */ "./src/app/component/Header/Header.config.js");
/* harmony import */ var _component_Menu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../component/Menu */ "./src/app/component/Menu/index.js");
/* harmony import */ var _store_Meta_Meta_action__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../store/Meta/Meta.action */ "./src/app/store/Meta/Meta.action.js");
/* harmony import */ var _store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../store/Navigation/Navigation.action */ "./src/app/store/Navigation/Navigation.action.js");
/* harmony import */ var _store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../store/Navigation/Navigation.reducer */ "./src/app/store/Navigation/Navigation.reducer.js");
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _type_Device__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../type/Device */ "./src/app/type/Device.js");
/* harmony import */ var _util_Url__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../util/Url */ "./src/app/util/Url/index.js");
/* harmony import */ var _MenuPage_style__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./MenuPage.style */ "./src/app/route/MenuPage/MenuPage.style.scss");
/* harmony import */ var _MenuPage_style__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_MenuPage_style__WEBPACK_IMPORTED_MODULE_12__);
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













/** @namespace Route/MenuPage/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    device: state.ConfigReducer.device
  };
}, "Route/MenuPage/Container/mapStateToProps");
/** @namespace Route/MenuPage/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    updateMeta: function updateMeta(meta) {
      return dispatch(Object(_store_Meta_Meta_action__WEBPACK_IMPORTED_MODULE_6__["updateMeta"])(meta));
    },
    changeHeaderState: function changeHeaderState(state) {
      return dispatch(Object(_store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_7__["changeNavigationState"])(_store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_8__["TOP_NAVIGATION_TYPE"], state));
    }
  };
}, "Route/MenuPage/Container/mapDispatchToProps");
/** @namespace Route/MenuPage/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MenuPageContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MenuPageContainer, _Extensible);

  function _MenuPageContainer() {
    _classCallCheck(this, _MenuPageContainer);

    return _possibleConstructorReturn(this, _getPrototypeOf(_MenuPageContainer).apply(this, arguments));
  }

  _createClass(_MenuPageContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          updateMeta = _this$props.updateMeta,
          changeHeaderState = _this$props.changeHeaderState;
      updateMeta({
        title: __('Menu')
      });
      this.redirectIfNotOnMobile();
      changeHeaderState({
        name: _component_Header_Header_config__WEBPACK_IMPORTED_MODULE_4__["MENU"],
        onBackClick: function onBackClick() {
          return history.goBack();
        }
      });
    }
  }, {
    key: "redirectIfNotOnMobile",
    value: function redirectIfNotOnMobile() {
      var _this$props2 = this.props,
          history = _this$props2.history,
          device = _this$props2.device;

      if (!device.isMobile) {
        history.push(Object(_util_Url__WEBPACK_IMPORTED_MODULE_11__["appendWithStoreCode"])('/'));
      }
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "main", {
          block: "MenuPage"
        },
        /*#__PURE__*/
        _checkBEM(React, _component_Menu__WEBPACK_IMPORTED_MODULE_5__["default"], null))
      );
    }
  }]);

  return _MenuPageContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_MenuPageContainer, 'name', {
  value: 'MenuPageContainer'
});

var MenuPageContainer = middleware(_MenuPageContainer, "Route/MenuPage/Container");

_defineProperty(MenuPageContainer, "propTypes", {
  updateMeta: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  history: _type_Common__WEBPACK_IMPORTED_MODULE_9__["HistoryType"].isRequired,
  changeHeaderState: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  device: _type_Device__WEBPACK_IMPORTED_MODULE_10__["DeviceType"].isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_router__WEBPACK_IMPORTED_MODULE_3__["withRouter"])(Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(MenuPageContainer)));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/route/MenuPage/MenuPage.style.scss":
/*!****************************************************!*\
  !*** ./src/app/route/MenuPage/MenuPage.style.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291327672
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/route/MenuPage/index.js":
/*!*****************************************!*\
  !*** ./src/app/route/MenuPage/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MenuPage_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MenuPage.container */ "./src/app/route/MenuPage/MenuPage.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _MenuPage_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/type/CMS.js":
/*!*****************************!*\
  !*** ./src/app/type/CMS.js ***!
  \*****************************/
/*! exports provided: PageType, BlockType, BlockListType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageType", function() { return PageType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlockType", function() { return BlockType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlockListType", function() { return BlockListType; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
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

var PageType = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
  title: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  content: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  meta_title: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  meta_description: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  meta_keywords: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
});
var BlockType = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
  title: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  content: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
});
var BlockListType = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
  items: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.objectOf(BlockType)
});

/***/ }),

/***/ "./src/app/type/Router.js":
/*!********************************!*\
  !*** ./src/app/type/Router.js ***!
  \********************************/
/*! exports provided: LocationType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationType", function() { return LocationType; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
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
 // eslint-disable-next-line import/prefer-default-export

var LocationType = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
  hash: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  key: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  pathname: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  search: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
});

/***/ })

}]);
//# sourceMappingURL=cms.js.map