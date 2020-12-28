(this["webpackJsonp"] = this["webpackJsonp"] || []).push([["account~checkout~cms~misc~product"],{

/***/ "./src/app/component/Form/Form.component.js":
/*!**************************************************!*\
  !*** ./src/app/component/Form/Form.component.js ***!
  \**************************************************/
/*! exports provided: _Form, Form, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, middleware, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_Form", function() { return _Form; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Form", function() { return Form; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Field_Field_container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Field/Field.container */ "./src/app/component/Field/Field.container.js");
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _util_FormPortalCollector__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../util/FormPortalCollector */ "./src/app/util/FormPortalCollector/index.js");
/* harmony import */ var _Form_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Form.config */ "./src/app/component/Form/Form.config.js");


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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






/** @namespace Component/Form/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _Form =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_Form, _Extensible);

  function _Form() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _Form);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_Form)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleFormSubmit",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(e) {
        var _this$props, onSubmitSuccess, onSubmitError, onSubmit, id, portalData, _portalData$reduce, invalidFields, inputValues, asyncData;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props = _this.props, onSubmitSuccess = _this$props.onSubmitSuccess, onSubmitError = _this$props.onSubmitError, onSubmit = _this$props.onSubmit, id = _this$props.id;
                e.preventDefault();
                onSubmit();

                if (!id) {
                  _context.next = 9;
                  break;
                }

                _context.next = 6;
                return window.formPortalCollector.collect(id);

              case 6:
                _context.t0 = _context.sent;
                _context.next = 10;
                break;

              case 9:
                _context.t0 = [];

              case 10:
                portalData = _context.t0;
                _portalData$reduce = portalData.reduce(function (acc, portalData) {
                  var _portalData$invalidFi = portalData.invalidFields,
                      invalidFields = _portalData$invalidFi === void 0 ? [] : _portalData$invalidFi,
                      _portalData$inputValu = portalData.inputValues,
                      inputValues = _portalData$inputValu === void 0 ? {} : _portalData$inputValu;
                  var initialInvalidFields = acc.invalidFields,
                      initialInputValues = acc.inputValues;
                  return {
                    invalidFields: [].concat(_toConsumableArray(initialInvalidFields), _toConsumableArray(invalidFields)),
                    inputValues: _objectSpread2(_objectSpread2({}, initialInputValues), inputValues)
                  };
                }, _this.collectFieldsInformation()), invalidFields = _portalData$reduce.invalidFields, inputValues = _portalData$reduce.inputValues;
                asyncData = Promise.all(portalData.reduce(function (acc, _ref2) {
                  var asyncData = _ref2.asyncData;

                  if (!asyncData) {
                    return acc;
                  }

                  return [].concat(_toConsumableArray(acc), [asyncData]);
                }, []));
                asyncData.then(
                /** @namespace Component/Form/Component/handleFormSubmitAsyncDataThen */
                middleware(function (asyncDataList) {
                  if (!invalidFields.length) {
                    onSubmitSuccess(inputValues, asyncDataList);
                    return;
                  }

                  onSubmitError(inputValues, invalidFields);
                }, "Component/Form/Component/handleFormSubmitAsyncDataThen"),
                /** @namespace Component/Form/Component/handleFormSubmitAsyncDataCatch */
                middleware(function (e) {
                  return onSubmitError(inputValues, invalidFields, e);
                }, "Component/Form/Component/handleFormSubmitAsyncDataCatch"));

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "collectFieldsInformation", function () {
      var refMap = _this.state.refMap;
      var propsChildren = _this.props.children;

      var _Form$cloneAndValidat = Form.cloneAndValidateChildren(propsChildren, refMap),
          children = _Form$cloneAndValidat.children,
          fieldsAreValid = _Form$cloneAndValidat.fieldsAreValid,
          invalidFields = _Form$cloneAndValidat.invalidFields;

      _this.setState({
        children: children,
        fieldsAreValid: fieldsAreValid
      });

      var inputValues = Object.values(refMap).reduce(function (inputValues, input) {
        var current = input.current;

        if (current && current.id && current.value) {
          var name = current.name,
              value = current.value,
              checked = current.checked;

          if (current.dataset.skipValue === 'true') {
            return inputValues;
          }

          if (current.type === 'checkbox') {
            var boolValue = checked;
            return _objectSpread2(_objectSpread2({}, inputValues), {}, _defineProperty({}, name, boolValue));
          }

          return _objectSpread2(_objectSpread2({}, inputValues), {}, _defineProperty({}, name, value));
        }

        return inputValues;
      }, {});

      if (invalidFields.length) {
        var current = refMap[invalidFields[0]].current;
        current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }

      return {
        inputValues: inputValues,
        invalidFields: invalidFields
      };
    });

    return _this;
  }

  _createClass(_Form, [{
    key: "__construct",
    value: function __construct(props) {
      _get(_getPrototypeOf(_Form.prototype), "__construct", this).call(this, props);

      if (!window.formPortalCollector) {
        window.formPortalCollector = new _util_FormPortalCollector__WEBPACK_IMPORTED_MODULE_5__["default"]();
      }

      this.state = _objectSpread2(_objectSpread2({}, Form.updateChildrenRefs(props)), {}, {
        fieldsAreValid: true
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          mix = _this$props2.mix,
          id = _this$props2.id;
      var _this$state = this.state,
          children = _this$state.children,
          fieldsAreValid = _this$state.fieldsAreValid;
      return (
        /*#__PURE__*/
        _checkBEM(React, "form", {
          block: "Form",
          mix: mix,
          mods: {
            isInvalid: !fieldsAreValid
          },
          ref: function ref(_ref3) {
            _this2.form = _ref3;
          },
          id: id,
          onSubmit: this.handleFormSubmit
        }, children)
      );
    }
  }], [{
    key: "updateChildrenRefs",
    value: function updateChildrenRefs(props) {
      var propsChildren = props.children;
      var refMap = {};
      var children = Form.cloneChildren(propsChildren, function (child) {
        var name = child.props.name;
        refMap[name] =
        /*#__PURE__*/
        Object(react__WEBPACK_IMPORTED_MODULE_2__["createRef"])();
        return (
          /*#__PURE__*/
          Object(react__WEBPACK_IMPORTED_MODULE_2__["cloneElement"])(child, {
            formRef: refMap[name]
          })
        );
      });
      return {
        children: children,
        refMap: refMap
      };
    }
  }, {
    key: "cloneChildren",
    value: function cloneChildren(originChildren, fieldCallback) {
      var executeClone = function executeClone(originChildren) {
        return react__WEBPACK_IMPORTED_MODULE_2__["Children"].map(originChildren, function (child) {
          if (child && _typeof(child) === 'object' && child.type && child.props) {
            var name = child.type.name,
                props = child.props,
                children = child.props.children;

            if (name === _Field_Field_container__WEBPACK_IMPORTED_MODULE_3__["FieldContainer"].prototype.constructor.name) {
              return fieldCallback(child);
            }

            if (_typeof(children) === 'object') {
              return (
                /*#__PURE__*/
                Object(react__WEBPACK_IMPORTED_MODULE_2__["cloneElement"])(child, _objectSpread2(_objectSpread2({}, props), {}, {
                  children: executeClone(children)
                }))
              );
            }

            return child;
          }

          return child;
        });
      };

      return executeClone(originChildren);
    }
  }, {
    key: "cloneAndValidateChildren",
    value: function cloneAndValidateChildren(propsChildren, refMap) {
      var invalidFields = [];
      var children = Form.cloneChildren(propsChildren, function (child) {
        var _child$props = child.props,
            id = _child$props.id,
            name = _child$props.name;

        var _Form$validateField = Form.validateField(child, refMap),
            message = _Form$validateField.message;

        if (message) {
          invalidFields.push(id);
          return (
            /*#__PURE__*/
            Object(react__WEBPACK_IMPORTED_MODULE_2__["cloneElement"])(child, {
              message: message,
              formRef: refMap[name]
            })
          );
        }

        return (
          /*#__PURE__*/
          Object(react__WEBPACK_IMPORTED_MODULE_2__["cloneElement"])(child, {
            formRef: refMap[name]
          })
        );
      });
      return {
        children: children,
        fieldsAreValid: !invalidFields.length,
        invalidFields: invalidFields
      };
    }
  }, {
    key: "validateField",
    value: function validateField(field, refMap) {
      var _field$props = field.props,
          validation = _field$props.validation,
          id = _field$props.id,
          name = _field$props.name;

      if (validation && id && refMap[name] && refMap[name].current) {
        var inputNode = refMap[name].current;
        var rule = validation.find(function (rule) {
          if (!_Form_config__WEBPACK_IMPORTED_MODULE_6__["default"][rule]) {
            return false;
          }

          var validationRules = _Form_config__WEBPACK_IMPORTED_MODULE_6__["default"][rule];
          var isValid = validationRules.validate(inputNode, refMap);
          return !isValid;
        });

        if (rule) {
          return _Form_config__WEBPACK_IMPORTED_MODULE_6__["default"][rule];
        }
      }

      return {};
    }
  }, {
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var refMap = state.refMap,
          fieldsAreValid = state.fieldsAreValid;
      var children = props.children;

      if (fieldsAreValid) {
        return Form.updateChildrenRefs(props);
      }

      return Form.cloneAndValidateChildren(children, refMap);
    }
  }]);

  return _Form;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_2__["PureComponent"]));
Object.defineProperty(_Form, 'name', {
  value: 'Form'
});

var Form = middleware(_Form, "Component/Form/Component");

_defineProperty(Form, "propTypes", {
  onSubmitSuccess: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onSubmitError: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onSubmit: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  children: _type_Common__WEBPACK_IMPORTED_MODULE_4__["ChildrenType"].isRequired,
  id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  mix: _type_Common__WEBPACK_IMPORTED_MODULE_4__["MixType"]
});

_defineProperty(Form, "defaultProps", {
  onSubmitSuccess: function onSubmitSuccess() {},
  onSubmitError: function onSubmitError() {},
  onSubmit: function onSubmit() {},
  mix: {},
  id: ''
});

/* harmony default export */ __webpack_exports__["default"] = (Form);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/Form/Form.config.js":
/*!***********************************************!*\
  !*** ./src/app/component/Form/Form.config.js ***!
  \***********************************************/
/*! exports provided: MIN_PASSWORD_LENGTH, validateEmail, validateEmails, validatePassword, validateTelephone, isNotEmpty, validatePasswordMatch, formConfig, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, __) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MIN_PASSWORD_LENGTH", function() { return MIN_PASSWORD_LENGTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateEmail", function() { return validateEmail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateEmails", function() { return validateEmails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validatePassword", function() { return validatePassword; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateTelephone", function() { return validateTelephone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNotEmpty", function() { return isNotEmpty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validatePasswordMatch", function() { return validatePasswordMatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formConfig", function() { return formConfig; });
/* eslint-disable max-len */

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
var MIN_PASSWORD_LENGTH = 8;
/** @namespace Component/Form/Config/validateEmail */

var validateEmail = middleware(function (_ref) {
  var value = _ref.value;
  return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
}, "Component/Form/Config/validateEmail");
/** @namespace Component/Form/Config/validateEmails */

var validateEmails = middleware(function (_ref2) {
  var value = _ref2.value;
  return value.split(',').every(function (email) {
    return validateEmail({
      value: email.trim()
    });
  });
}, "Component/Form/Config/validateEmails");
/** @namespace Component/Form/Config/validatePassword */

var validatePassword = middleware(function (_ref3) {
  var value = _ref3.value;
  return value.length >= MIN_PASSWORD_LENGTH;
}, "Component/Form/Config/validatePassword");
/** @namespace Component/Form/Config/validateTelephone */

var validateTelephone = middleware(function (_ref4) {
  var value = _ref4.value;
  return value.length > 0 && value.match(/^\+(?:[0-9-] ?){6,14}[0-9]$/);
}, "Component/Form/Config/validateTelephone");
/** @namespace Component/Form/Config/isNotEmpty */

var isNotEmpty = middleware(function (_ref5) {
  var value = _ref5.value;
  return value.trim().length > 0;
}, "Component/Form/Config/isNotEmpty");
/** @namespace Component/Form/Config/validatePasswordMatch */

var validatePasswordMatch = middleware(function (_ref6, _ref7) {
  var value = _ref6.value;
  var password = _ref7.password;

  var _ref8 = password || {
    current: {}
  },
      passwordValue = _ref8.current.value;

  return value === passwordValue;
}, "Component/Form/Config/validatePasswordMatch");
/** @namespace Component/Form/Config */

var formConfig = middleware(function () {
  return {
    email: {
      validate: validateEmail,
      message: __('Email is invalid.')
    },
    emails: {
      validate: validateEmails,
      message: __('Email addresses are not valid')
    },
    password: {
      validate: validatePassword,
      message: __('Password should be at least 8 characters long')
    },
    telephone: {
      validate: validateTelephone,
      message: __('Phone number is invalid!')
    },
    notEmpty: {
      validate: isNotEmpty,
      message: __('This field is required!')
    },
    password_match: {
      validate: validatePasswordMatch,
      message: __('Password does not match.')
    }
  };
}, "Component/Form/Config");
/* harmony default export */ __webpack_exports__["default"] = (formConfig());
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js")))

/***/ }),

/***/ "./src/app/component/Form/index.js":
/*!*****************************************!*\
  !*** ./src/app/component/Form/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Form_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Form.component */ "./src/app/component/Form/Form.component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _Form_component__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/util/FormPortalCollector/index.js":
/*!***************************************************!*\
  !*** ./src/app/util/FormPortalCollector/index.js ***!
  \***************************************************/
/*! exports provided: _FormPortalCollector, FormPortalCollector, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_FormPortalCollector", function() { return _FormPortalCollector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormPortalCollector", function() { return FormPortalCollector; });
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

/** @namespace Util/FormPortalCollector */
var _FormPortalCollector =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_FormPortalCollector, _Extensible);

  function _FormPortalCollector() {
    var _this;

    _classCallCheck(this, _FormPortalCollector);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(_FormPortalCollector).call(this));

    _defineProperty(_assertThisInitialized(_this), "portalsObservers", {});

    return _this;
  }

  _createClass(_FormPortalCollector, [{
    key: "subscribe",
    value: function subscribe(id, f, name) {
      if (this.portalsObservers[id]) {
        this.portalsObservers[id][name] = f;
        return;
      }

      this.portalsObservers[id] = _defineProperty({}, name, f);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(id, name) {
      if (!this.portalsObservers[id]) {
        return;
      } // eslint-disable-next-line fp/no-delete


      delete this.portalsObservers[id][name];
    }
  }, {
    key: "collect",
    value: function collect(id) {
      var portals = this.portalsObservers[id] || {};
      return Object.values(portals).map(function (portal) {
        return portal();
      });
    }
  }]);

  return _FormPortalCollector;
}(Extensible());
Object.defineProperty(_FormPortalCollector, 'name', {
  value: 'FormPortalCollector'
});

var FormPortalCollector = middleware(_FormPortalCollector, "Util/FormPortalCollector");
/* harmony default export */ __webpack_exports__["default"] = (FormPortalCollector);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ })

}]);
//# sourceMappingURL=account~checkout~cms~misc~product.js.map