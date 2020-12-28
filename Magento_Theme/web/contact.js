(this["webpackJsonp"] = this["webpackJsonp"] || []).push([["contact"],{

/***/ "./src/app/component/ContactForm/ContactForm.component.js":
/*!****************************************************************!*\
  !*** ./src/app/component/ContactForm/ContactForm.component.js ***!
  \****************************************************************/
/*! exports provided: _ContactForm, ContactForm, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ContactForm", function() { return _ContactForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactForm", function() { return ContactForm; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _FieldForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FieldForm */ "./src/app/component/FieldForm/index.js");
/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Loader */ "./src/app/component/Loader/index.js");
/* harmony import */ var _ContactForm_style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ContactForm.style */ "./src/app/component/ContactForm/ContactForm.style.scss");
/* harmony import */ var _ContactForm_style__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ContactForm_style__WEBPACK_IMPORTED_MODULE_3__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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




/** @namespace Component/ContactForm/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ContactForm =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ContactForm, _Extensible);

  function _ContactForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ContactForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ContactForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onFormSuccess", _this.onFormSuccess.bind(_assertThisInitialized(_this)));

    return _this;
  }

  _createClass(_ContactForm, [{
    key: "onFormSuccess",
    value: function onFormSuccess(fields) {
      var onFormSubmit = this.props.onFormSubmit;
      onFormSubmit(fields);
    }
  }, {
    key: "renderActions",
    value: function renderActions() {
      var isLoading = this.props.isLoading;
      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null,
        /*#__PURE__*/
        _checkBEM(React, _Loader__WEBPACK_IMPORTED_MODULE_2__["default"], {
          isLoading: isLoading
        }),
        /*#__PURE__*/
        _checkBEM(React, "button", {
          type: "submit",
          block: "Button"
        }, __('Send Your message')))
      );
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ContactForm"
        }, _get(_getPrototypeOf(_ContactForm.prototype), "render", this).call(this))
      );
    }
  }, {
    key: "fieldMap",
    get: function get() {
      return {
        name: {
          validation: ['notEmpty'],
          label: __('Name')
        },
        email: {
          validation: ['notEmpty', 'email'],
          label: __('Email')
        },
        telephone: {
          label: __('Phone number')
        },
        message: {
          type: 'textarea',
          validation: ['notEmpty'],
          label: __('What\'s on your mind?')
        }
      };
    }
  }]);

  return _ContactForm;
}(Extensible(_FieldForm__WEBPACK_IMPORTED_MODULE_1__["default"]));
Object.defineProperty(_ContactForm, 'name', {
  value: 'ContactForm'
});

var ContactForm = middleware(_ContactForm, "Component/ContactForm/Component");

_defineProperty(ContactForm, "propTypes", {
  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  onFormSubmit: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

_defineProperty(ContactForm, "defaultProps", {
  isLoading: false
});

/* harmony default export */ __webpack_exports__["default"] = (ContactForm);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ContactForm/ContactForm.container.js":
/*!****************************************************************!*\
  !*** ./src/app/component/ContactForm/ContactForm.container.js ***!
  \****************************************************************/
/*! exports provided: ContactFormDispatcher, mapStateToProps, mapDispatchToProps, _ContactFormContainer, ContactFormContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactFormDispatcher", function() { return ContactFormDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ContactFormContainer", function() { return _ContactFormContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactFormContainer", function() { return ContactFormContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _ContactForm_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ContactForm.component */ "./src/app/component/ContactForm/ContactForm.component.js");
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




var ContactFormDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/ContactForm/ContactForm.dispatcher */ "./src/app/store/ContactForm/ContactForm.dispatcher.js"));
/** @namespace Component/ContactForm/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    isLoading: state.ContactFormReducer.isLoading
  };
}, "Component/ContactForm/Container/mapStateToProps");
/** @namespace Component/ContactForm/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    sendMessage: function sendMessage(data) {
      return ContactFormDispatcher.then(function (_ref) {
        var dispatcher = _ref.default;
        return dispatcher.prepareRequest(data, dispatch);
      });
    }
  };
}, "Component/ContactForm/Container/mapDispatchToProps");
/** @namespace Component/ContactForm/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ContactFormContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ContactFormContainer, _Extensible);

  function _ContactFormContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ContactFormContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ContactFormContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      onFormSubmit: _this.onFormSubmit.bind(_assertThisInitialized(_this))
    });

    return _this;
  }

  _createClass(_ContactFormContainer, [{
    key: "onFormSubmit",
    value: function onFormSubmit(fields) {
      var sendMessage = this.props.sendMessage;
      sendMessage(fields);
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _ContactForm_component__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({}, this.props, this.containerFunctions))
      );
    }
  }]);

  return _ContactFormContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ContactFormContainer, 'name', {
  value: 'ContactFormContainer'
});

var ContactFormContainer = middleware(_ContactFormContainer, "Component/ContactForm/Container");

_defineProperty(ContactFormContainer, "propTypes", {
  sendMessage: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(ContactFormContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/ContactForm/ContactForm.style.scss":
/*!**************************************************************!*\
  !*** ./src/app/component/ContactForm/ContactForm.style.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291338704
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ContactForm/index.js":
/*!************************************************!*\
  !*** ./src/app/component/ContactForm/index.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ContactForm_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ContactForm.container */ "./src/app/component/ContactForm/ContactForm.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ContactForm_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/query/ContactForm.query.js":
/*!********************************************!*\
  !*** ./src/app/query/ContactForm.query.js ***!
  \********************************************/
/*! exports provided: _ContactFormQuery, ContactFormQuery, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ContactFormQuery", function() { return _ContactFormQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactFormQuery", function() { return ContactFormQuery; });
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

/** @namespace Query/ContactForm */

var _ContactFormQuery =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ContactFormQuery, _Extensible);

  function _ContactFormQuery() {
    _classCallCheck(this, _ContactFormQuery);

    return _possibleConstructorReturn(this, _getPrototypeOf(_ContactFormQuery).apply(this, arguments));
  }

  _createClass(_ContactFormQuery, [{
    key: "getSendContactFormMutation",
    value: function getSendContactFormMutation(options) {
      var mutation = new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('contactForm');

      this._addSendContactFormMutationArguments(mutation, options);

      mutation.addFieldList(this._getSendContactFormMutationResponse());
      return mutation;
    }
  }, {
    key: "getContactPageConfigQuery",
    value: function getContactPageConfigQuery() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('contactPageConfig').addFieldList(this._getContactPageConfigFields());
    }
  }, {
    key: "_addSendContactFormMutationArguments",
    value: function _addSendContactFormMutationArguments(mutation, options) {
      return mutation.addArgument('contact', 'ContactForm!', options);
    }
  }, {
    key: "_getSendContactFormMutationResponse",
    value: function _getSendContactFormMutationResponse() {
      return ['message'];
    }
  }, {
    key: "_getContactPageConfigFields",
    value: function _getContactPageConfigFields() {
      return ['enabled'];
    }
  }]);

  return _ContactFormQuery;
}(Extensible());
Object.defineProperty(_ContactFormQuery, 'name', {
  value: 'ContactFormQuery'
});

var ContactFormQuery = middleware(_ContactFormQuery, "Query/ContactForm");
/* harmony default export */ __webpack_exports__["default"] = (new ContactFormQuery());
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/route/ContactPage/ContactPage.component.js":
/*!************************************************************!*\
  !*** ./src/app/route/ContactPage/ContactPage.component.js ***!
  \************************************************************/
/*! exports provided: _ContactPage, ContactPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ContactPage", function() { return _ContactPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactPage", function() { return ContactPage; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _component_CmsBlock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../component/CmsBlock */ "./src/app/component/CmsBlock/index.js");
/* harmony import */ var _component_ContactForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../component/ContactForm */ "./src/app/component/ContactForm/index.js");
/* harmony import */ var _component_ContentWrapper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../component/ContentWrapper */ "./src/app/component/ContentWrapper/index.js");
/* harmony import */ var _component_Loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../component/Loader */ "./src/app/component/Loader/index.js");
/* harmony import */ var _NoMatch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../NoMatch */ "./src/app/route/NoMatch/index.js");
/* harmony import */ var _type_Device__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../type/Device */ "./src/app/type/Device.js");
/* harmony import */ var _ContactPage_config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ContactPage.config */ "./src/app/route/ContactPage/ContactPage.config.js");
/* harmony import */ var _ContactPage_style__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ContactPage.style */ "./src/app/route/ContactPage/ContactPage.style.scss");
/* harmony import */ var _ContactPage_style__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_ContactPage_style__WEBPACK_IMPORTED_MODULE_9__);
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










/** @namespace Route/ContactPage/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ContactPage =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ContactPage, _Extensible);

  function _ContactPage() {
    _classCallCheck(this, _ContactPage);

    return _possibleConstructorReturn(this, _getPrototypeOf(_ContactPage).apply(this, arguments));
  }

  _createClass(_ContactPage, [{
    key: "renderHeading",
    value: function renderHeading() {
      var device = this.props.device;

      if (device.isMobile) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "h1", {
          block: "ContactPage",
          elem: "Heading"
        }, __('Contact Us'))
      );
    }
  }, {
    key: "renderCmsBlock",
    value: function renderCmsBlock() {
      var _window$contentConfig = window.contentConfiguration.contact_us_content;
      _window$contentConfig = _window$contentConfig === void 0 ? {} : _window$contentConfig;
      var _window$contentConfig2 = _window$contentConfig.contact_us_cms_block,
          contact_us_cms_block = _window$contentConfig2 === void 0 ? _ContactPage_config__WEBPACK_IMPORTED_MODULE_8__["DEFAULT_CONTACT_US_CMS_BLOCK"] : _window$contentConfig2;
      return (
        /*#__PURE__*/
        _checkBEM(React, _component_CmsBlock__WEBPACK_IMPORTED_MODULE_2__["default"], {
          identifier: contact_us_cms_block
        })
      );
    }
  }, {
    key: "renderPage",
    value: function renderPage() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _component_ContentWrapper__WEBPACK_IMPORTED_MODULE_4__["default"], {
          label: "Contact Page"
        }, this.renderHeading(),
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ContactPage",
          elem: "ColumnWrapper"
        },
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ContactPage",
          elem: "Column",
          mods: {
            isContent: true
          }
        }, this.renderCmsBlock()),
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ContactPage",
          elem: "Column"
        },
        /*#__PURE__*/
        _checkBEM(React, _component_ContactForm__WEBPACK_IMPORTED_MODULE_3__["default"], null))))
      );
    }
  }, {
    key: "renderNoPage",
    value: function renderNoPage() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _NoMatch__WEBPACK_IMPORTED_MODULE_6__["default"], null)
      );
    }
  }, {
    key: "renderPageContents",
    value: function renderPageContents() {
      var _this$props = this.props,
          isEnabled = _this$props.isEnabled,
          isLoading = _this$props.isLoading;

      if (isEnabled) {
        return this.renderPage();
      }

      if (!isLoading) {
        return this.renderNoPage();
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var isLoading = this.props.isLoading;
      return (
        /*#__PURE__*/
        _checkBEM(React, "main", {
          block: "ContactPage"
        },
        /*#__PURE__*/
        _checkBEM(React, _component_Loader__WEBPACK_IMPORTED_MODULE_5__["default"], {
          isLoading: isLoading
        }), this.renderPageContents())
      );
    }
  }]);

  return _ContactPage;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ContactPage, 'name', {
  value: 'ContactPage'
});

var ContactPage = middleware(_ContactPage, "Route/ContactPage/Component");

_defineProperty(ContactPage, "propTypes", {
  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  isEnabled: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  device: _type_Device__WEBPACK_IMPORTED_MODULE_7__["DeviceType"].isRequired
});

_defineProperty(ContactPage, "defaultProps", {
  isLoading: false
});

/* harmony default export */ __webpack_exports__["default"] = (ContactPage);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/route/ContactPage/ContactPage.config.js":
/*!*********************************************************!*\
  !*** ./src/app/route/ContactPage/ContactPage.config.js ***!
  \*********************************************************/
/*! exports provided: DEFAULT_CONTACT_US_CMS_BLOCK */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_CONTACT_US_CMS_BLOCK", function() { return DEFAULT_CONTACT_US_CMS_BLOCK; });
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
var DEFAULT_CONTACT_US_CMS_BLOCK = 'contact_us_page_block';

/***/ }),

/***/ "./src/app/route/ContactPage/ContactPage.container.js":
/*!************************************************************!*\
  !*** ./src/app/route/ContactPage/ContactPage.container.js ***!
  \************************************************************/
/*! exports provided: BreadcrumbsDispatcher, mapStateToProps, mapDispatchToProps, _ContactPageContainer, ContactPageContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, __, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BreadcrumbsDispatcher", function() { return BreadcrumbsDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ContactPageContainer", function() { return _ContactPageContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactPageContainer", function() { return ContactPageContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _component_Header_Header_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../component/Header/Header.config */ "./src/app/component/Header/Header.config.js");
/* harmony import */ var _query_ContactForm_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../query/ContactForm.query */ "./src/app/query/ContactForm.query.js");
/* harmony import */ var _store_Meta_Meta_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/Meta/Meta.action */ "./src/app/store/Meta/Meta.action.js");
/* harmony import */ var _store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store/Navigation/Navigation.action */ "./src/app/store/Navigation/Navigation.action.js");
/* harmony import */ var _store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../store/Navigation/Navigation.reducer */ "./src/app/store/Navigation/Navigation.reducer.js");
/* harmony import */ var _store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../store/Notification/Notification.action */ "./src/app/store/Notification/Notification.action.js");
/* harmony import */ var _util_Request_DataContainer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../util/Request/DataContainer */ "./src/app/util/Request/DataContainer.js");
/* harmony import */ var _ContactPage_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ContactPage.component */ "./src/app/route/ContactPage/ContactPage.component.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
/** @namespace Route/ContactPage/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    device: state.ConfigReducer.device
  };
}, "Route/ContactPage/Container/mapStateToProps");
/** @namespace Route/ContactPage/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    showNotification: function showNotification(type, message) {
      return dispatch(Object(_store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_7__["showNotification"])(type, message));
    },
    updateMeta: function updateMeta(meta) {
      return dispatch(Object(_store_Meta_Meta_action__WEBPACK_IMPORTED_MODULE_4__["updateMeta"])(meta));
    },
    setHeaderState: function setHeaderState(stateName) {
      return dispatch(Object(_store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_5__["changeNavigationState"])(_store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_6__["TOP_NAVIGATION_TYPE"], stateName));
    },
    updateBreadcrumbs: function updateBreadcrumbs(breadcrumbs) {
      BreadcrumbsDispatcher.then(function (_ref) {
        var dispatcher = _ref.default;
        return dispatcher.update(breadcrumbs, dispatch);
      });
    }
  };
}, "Route/ContactPage/Container/mapDispatchToProps");
/** @namespace Route/ContactPage/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ContactPageContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ContactPageContainer, _Extensible);

  function _ContactPageContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ContactPageContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ContactPageContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isLoading: false,
      isEnabled: false
    });

    return _this;
  }

  _createClass(_ContactPageContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateMeta();
      this.updateBreadcrumbs();
      this.updateHeader();
      this.getEnabledState();
    }
  }, {
    key: "updateMeta",
    value: function updateMeta() {
      var updateMeta = this.props.updateMeta;
      updateMeta({
        title: __('Contact Us')
      });
    }
  }, {
    key: "updateBreadcrumbs",
    value: function updateBreadcrumbs() {
      var updateBreadcrumbs = this.props.updateBreadcrumbs;
      var breadcrumbs = [{
        url: '/contact-us',
        name: __('Contact Us')
      }, {
        url: '/',
        name: __('Home')
      }];
      updateBreadcrumbs(breadcrumbs);
    }
  }, {
    key: "updateHeader",
    value: function updateHeader() {
      var setHeaderState = this.props.setHeaderState;
      setHeaderState({
        name: _component_Header_Header_config__WEBPACK_IMPORTED_MODULE_2__["CONTACT_US"],
        title: __('Contact Us')
      });
    }
  }, {
    key: "getEnabledState",
    value: function getEnabledState() {
      var _this2 = this;

      var showNotification = this.props.showNotification;
      this.setState({
        isLoading: true
      });
      this.fetchData(_query_ContactForm_query__WEBPACK_IMPORTED_MODULE_3__["default"].getContactPageConfigQuery(), function (_ref2) {
        var _ref2$contactPageConf = _ref2.contactPageConfig;
        _ref2$contactPageConf = _ref2$contactPageConf === void 0 ? {} : _ref2$contactPageConf;
        var enabled = _ref2$contactPageConf.enabled;

        _this2.setState({
          isEnabled: enabled,
          isLoading: false
        });
      }, function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 1),
            e = _ref4[0];

        _this2.setState({
          isLoading: false
        });

        showNotification(e.message);
      });
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _ContactPage_component__WEBPACK_IMPORTED_MODULE_9__["default"], _extends({}, this.state, this.props))
      );
    }
  }]);

  return _ContactPageContainer;
}(Extensible(_util_Request_DataContainer__WEBPACK_IMPORTED_MODULE_8__["default"]));
Object.defineProperty(_ContactPageContainer, 'name', {
  value: 'ContactPageContainer'
});

var ContactPageContainer = middleware(_ContactPageContainer, "Route/ContactPage/Container");

_defineProperty(ContactPageContainer, "propTypes", {
  updateMeta: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  showNotification: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(ContactPageContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/route/ContactPage/ContactPage.style.scss":
/*!**********************************************************!*\
  !*** ./src/app/route/ContactPage/ContactPage.style.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291332903
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/route/ContactPage/index.js":
/*!********************************************!*\
  !*** ./src/app/route/ContactPage/index.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ContactPage_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ContactPage.container */ "./src/app/route/ContactPage/ContactPage.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ContactPage_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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
//# sourceMappingURL=contact.js.map