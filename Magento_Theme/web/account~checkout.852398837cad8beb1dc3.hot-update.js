webpackHotUpdate("account~checkout",{

/***/ "./src/app/component/KeyValueTable/KeyValueTable.style.scss":
/*!******************************************************************!*\
  !*** ./src/app/component/KeyValueTable/KeyValueTable.style.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1605720115148
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/MyAccountAddressTable/MyAccountAddressTable.style.scss":
/*!**********************************************************************************!*\
  !*** ./src/app/component/MyAccountAddressTable/MyAccountAddressTable.style.scss ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1605720114762
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/MyAccountSignIn/MyAccountSignIn.component.js":
/*!************************************************************************!*\
  !*** ./src/app/component/MyAccountSignIn/MyAccountSignIn.component.js ***!
  \************************************************************************/
/*! exports provided: _MyAccountSignIn, MyAccountSignIn, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MyAccountSignIn", function() { return _MyAccountSignIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountSignIn", function() { return MyAccountSignIn; });
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





/** @namespace Component/MyAccountSignIn/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MyAccountSignIn =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MyAccountSignIn, _Extensible);

  function _MyAccountSignIn() {
    _classCallCheck(this, _MyAccountSignIn);

    return _possibleConstructorReturn(this, _getPrototypeOf(_MyAccountSignIn).apply(this, arguments));
  }

  _createClass(_MyAccountSignIn, [{
    key: "renderSignInForm",
    value: function renderSignInForm() {
      var _this$props = this.props,
          onSignInAttempt = _this$props.onSignInAttempt,
          onSignInSuccess = _this$props.onSignInSuccess,
          onFormError = _this$props.onFormError,
          handleForgotPassword = _this$props.handleForgotPassword,
          emailValue = _this$props.emailValue,
          handleEmailInput = _this$props.handleEmailInput;
      return (
        /*#__PURE__*/
        _checkBEM(React, _Form__WEBPACK_IMPORTED_MODULE_3__["default"], {
          key: "sign-in",
          onSubmit: onSignInAttempt,
          onSubmitSuccess: onSignInSuccess,
          onSubmitError: onFormError
        },
        /*#__PURE__*/
        _checkBEM(React, _Field__WEBPACK_IMPORTED_MODULE_2__["default"], {
          type: "text",
          label: __('Email'),
          id: "email",
          name: "email",
          value: emailValue,
          autocomplete: "email",
          validation: ['notEmpty', 'email'],
          onChange: handleEmailInput
        }),
        /*#__PURE__*/
        _checkBEM(React, _Field__WEBPACK_IMPORTED_MODULE_2__["default"], {
          type: "password",
          label: __('Password'),
          id: "password",
          name: "password",
          autocomplete: "current-password",
          validation: ['notEmpty', 'password']
        }),
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "MyAccountOverlay",
          elem: "Buttons"
        },
        /*#__PURE__*/
        _checkBEM(React, "button", {
          block: "Button"
        }, __('Sign in'))),
        /*#__PURE__*/
        _checkBEM(React, "button", {
          block: "Button",
          mods: {
            likeLink: true
          },
          onClick: handleForgotPassword
        }, __('Forgot password?')))
      );
    }
  }, {
    key: "renderAdditionalField",
    value: function renderAdditionalField() {
      var _this$props2 = this.props,
          isCheckout = _this$props2.isCheckout,
          handleCreateAccount = _this$props2.handleCreateAccount,
          state = _this$props2.state;

      if (isCheckout) {
        return null;
      }

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
        _checkBEM(React, "h4", {
          id: "forgot-password-label"
        }, __('Don`t have an account?')),
        /*#__PURE__*/
        _checkBEM(React, "button", {
          block: "Button",
          mods: {
            isHollow: true
          },
          onClick: handleCreateAccount
        }, __('Create an account'))))
      );
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null, this.renderSignInForm(), this.renderAdditionalField())
      );
    }
  }]);

  return _MyAccountSignIn;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_MyAccountSignIn, 'name', {
  value: 'MyAccountSignIn'
});

var MyAccountSignIn = middleware(_MyAccountSignIn, "Component/MyAccountSignIn/Component");

_defineProperty(MyAccountSignIn, "propTypes", {
  onSignInSuccess: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  onSignInAttempt: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  onFormError: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  handleForgotPassword: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  handleCreateAccount: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  isCheckout: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  state: _type_Account__WEBPACK_IMPORTED_MODULE_4__["signInStateType"].isRequired,
  emailValue: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  handleEmailInput: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func
});

_defineProperty(MyAccountSignIn, "defaultProps", {
  handleEmailInput: function handleEmailInput() {}
});

/* harmony default export */ __webpack_exports__["default"] = (MyAccountSignIn);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/MyAccountSignIn/MyAccountSignIn.container.js":
/*!************************************************************************!*\
  !*** ./src/app/component/MyAccountSignIn/MyAccountSignIn.container.js ***!
  \************************************************************************/
/*! exports provided: MyAccountDispatcher, mapStateToProps, mapDispatchToProps, _MyAccountSignInContainer, MyAccountSignInContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountDispatcher", function() { return MyAccountDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MyAccountSignInContainer", function() { return _MyAccountSignInContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountSignInContainer", function() { return MyAccountSignInContainer; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/Notification/Notification.action */ "./src/app/store/Notification/Notification.action.js");
/* harmony import */ var _MyAccountSignIn_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MyAccountSignIn.component */ "./src/app/component/MyAccountSignIn/MyAccountSignIn.component.js");


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
/** @namespace Component/MyAccountSignIn/Container/mapStateToProps */
// eslint-disable-next-line no-unused-vars

var mapStateToProps = middleware(function (state) {
  return {
    isEmailAvailable: state.CheckoutReducer.isEmailAvailable
  };
}, "Component/MyAccountSignIn/Container/mapStateToProps");
/** @namespace Component/MyAccountSignIn/Container/mapDispatchtoProps */
// eslint-disable-next-line no-unused-vars

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    signIn: function signIn(options) {
      return MyAccountDispatcher.then(function (_ref) {
        var dispatcher = _ref.default;
        return dispatcher.signIn(options, dispatch);
      });
    },
    showNotification: function showNotification(type, message) {
      return dispatch(Object(_store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_4__["showNotification"])(type, message));
    }
  };
}, "Component/MyAccountSignIn/Container/mapDispatchtoProps");
/** @namespace Component/MyAccountSignIn/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MyAccountSignInContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MyAccountSignInContainer, _Extensible);

  function _MyAccountSignInContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _MyAccountSignInContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_MyAccountSignInContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      onSignInSuccess: _this.onSignInSuccess.bind(_assertThisInitialized(_this)),
      onSignInAttempt: _this.onSignInAttempt.bind(_assertThisInitialized(_this))
    });

    _defineProperty(_assertThisInitialized(_this), "containerProps", function () {
      var _this$props = _this.props,
          state = _this$props.state,
          onFormError = _this$props.onFormError,
          handleForgotPassword = _this$props.handleForgotPassword,
          handleCreateAccount = _this$props.handleCreateAccount,
          isCheckout = _this$props.isCheckout,
          setLoadingState = _this$props.setLoadingState,
          emailValue = _this$props.emailValue,
          handleEmailInput = _this$props.handleEmailInput;
      return {
        state: state,
        onFormError: onFormError,
        handleForgotPassword: handleForgotPassword,
        handleCreateAccount: handleCreateAccount,
        isCheckout: isCheckout,
        setLoadingState: setLoadingState,
        emailValue: emailValue,
        handleEmailInput: handleEmailInput
      };
    });

    return _this;
  }

  _createClass(_MyAccountSignInContainer, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props2 = this.props,
          isCheckout = _this$props2.isCheckout,
          isEmailAvailable = _this$props2.isEmailAvailable,
          setSignInState = _this$props2.setSignInState;
      var prevIsEmailAvailable = prevProps.isEmailAvailable;

      if (isCheckout && isEmailAvailable && !prevIsEmailAvailable) {
        setSignInState('');
      }
    }
  }, {
    key: "onSignInSuccess",
    value: function () {
      var _onSignInSuccess = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(fields) {
        var _this$props3, signIn, showNotification, onSignIn, setLoadingState, _ref3, message;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props3 = this.props, signIn = _this$props3.signIn, showNotification = _this$props3.showNotification, onSignIn = _this$props3.onSignIn, setLoadingState = _this$props3.setLoadingState;
                _context.prev = 1;
                _context.next = 4;
                return signIn(fields);

              case 4:
                onSignIn();
                _context.next = 13;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](1);
                _ref3 = _slicedToArray(_context.t0, 1);
                message = _ref3[0].message;
                setLoadingState(false);
                showNotification('error', message);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 7]]);
      }));

      function onSignInSuccess(_x) {
        return _onSignInSuccess.apply(this, arguments);
      }

      return onSignInSuccess;
    }()
  }, {
    key: "onSignInAttempt",
    value: function onSignInAttempt() {
      var setLoadingState = this.props.setLoadingState;
      setLoadingState(true);
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _MyAccountSignIn_component__WEBPACK_IMPORTED_MODULE_5__["default"], _extends({}, this.containerFunctions, this.containerProps()))
      );
    }
  }]);

  return _MyAccountSignInContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_2__["PureComponent"]));
Object.defineProperty(_MyAccountSignInContainer, 'name', {
  value: 'MyAccountSignInContainer'
});

var MyAccountSignInContainer = middleware(_MyAccountSignInContainer, "Component/MyAccountSignIn/Container");

_defineProperty(MyAccountSignInContainer, "propTypes", {
  state: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  onFormError: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  handleForgotPassword: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  handleCreateAccount: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  isCheckout: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired,
  signIn: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  showNotification: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  onSignIn: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  setLoadingState: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  emailValue: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  isEmailAvailable: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  setSignInState: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  handleEmailInput: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
});

_defineProperty(MyAccountSignInContainer, "defaultProps", {
  emailValue: '',
  isEmailAvailable: true,
  setSignInState: function setSignInState() {},
  handleEmailInput: function handleEmailInput() {}
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(MyAccountSignInContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "?9c32":
false,

/***/ "?f4bc":
false

})
//# sourceMappingURL=account~checkout.852398837cad8beb1dc3.hot-update.js.map