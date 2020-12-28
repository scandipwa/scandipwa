webpackHotUpdate("bundle",{

/***/ "./src/app/component/Field/Field.component.js":
/*!****************************************************!*\
  !*** ./src/app/component/Field/Field.component.js ***!
  \****************************************************/
/*! exports provided: _Field, Field, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_Field", function() { return _Field; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Field", function() { return Field; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _FieldInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../FieldInput */ "./src/app/component/FieldInput/index.js");
/* harmony import */ var _FieldSelect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../FieldSelect */ "./src/app/component/FieldSelect/index.js");
/* harmony import */ var _FieldTextarea__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../FieldTextarea */ "./src/app/component/FieldTextarea/index.js");
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _Field_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Field.config */ "./src/app/component/Field/Field.config.js");
/* harmony import */ var _Field_style__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Field.style */ "./src/app/component/Field/Field.style.scss");
/* harmony import */ var _Field_style__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_Field_style__WEBPACK_IMPORTED_MODULE_7__);
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

/* eslint-disable jsx-a11y/control-has-associated-label, jsx-a11y/label-has-associated-control */
// Disabled due bug in `renderCheckboxInput` function








/**
 * Input fields component
 * @class Field
 * @namespace Component/Field/Component
 */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _Field =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_Field, _Extensible);

  function _Field() {
    _classCallCheck(this, _Field);

    return _possibleConstructorReturn(this, _getPrototypeOf(_Field).apply(this, arguments));
  }

  _createClass(_Field, [{
    key: "renderTextarea",
    value: function renderTextarea() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _FieldTextarea__WEBPACK_IMPORTED_MODULE_4__["default"], this.props)
      );
    }
    /**
     * Render Type Text, default value is passed from parent
     * handleToUpdate used to pass child data to parent
     */

  }, {
    key: "renderTypeText",
    value: function renderTypeText() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _FieldInput__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({}, this.props, {
          type: "text"
        }))
      );
    }
  }, {
    key: "renderTypePassword",
    value: function renderTypePassword() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _FieldInput__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({}, this.props, {
          type: "password"
        }))
      );
    }
  }, {
    key: "renderTypeNumber",
    value: function renderTypeNumber() {
      var _this$props = this.props,
          min = _this$props.min,
          max = _this$props.max,
          value = _this$props.value,
          onKeyEnterDown = _this$props.onKeyEnterDown,
          handleChange = _this$props.handleChange;
      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null,
        /*#__PURE__*/
        _checkBEM(React, _FieldInput__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({}, this.props, {
          type: "number",
          readOnly: true // eslint-disable-next-line react/jsx-no-bind
          ,
          onChange: function onChange(e) {
            return handleChange(e.target.value, false);
          },
          onKeyDown: onKeyEnterDown
        })),
        /*#__PURE__*/
        _checkBEM(React, "button", {
          disabled: +value === max // eslint-disable-next-line react/jsx-no-bind
          ,
          onClick: function onClick() {
            return handleChange(+value + 1);
          }
        }),
        /*#__PURE__*/
        _checkBEM(React, "button", {
          disabled: +value === min // eslint-disable-next-line react/jsx-no-bind
          ,
          onClick: function onClick() {
            return handleChange(+value - 1);
          }
        }))
      );
    }
  }, {
    key: "renderCheckbox",
    value: function renderCheckbox() {
      var _this$props2 = this.props,
          id = _this$props2.id,
          onChangeCheckbox = _this$props2.onChangeCheckbox;
      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null,
        /*#__PURE__*/
        _checkBEM(React, _FieldInput__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({}, this.props, {
          type: "checkbox",
          onChange: onChangeCheckbox
        })),
        /*#__PURE__*/
        _checkBEM(React, "label", {
          htmlFor: id
        }))
      );
    }
  }, {
    key: "renderRadioButton",
    value: function renderRadioButton() {
      var _this$props3 = this.props,
          id = _this$props3.id,
          label = _this$props3.label,
          onClick = _this$props3.onClick;
      return (
        /*#__PURE__*/
        _checkBEM(React, "label", {
          htmlFor: id
        },
        /*#__PURE__*/
        _checkBEM(React, _FieldInput__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({}, this.props, {
          type: "radio",
          onChange: onClick
        })),
        /*#__PURE__*/
        _checkBEM(React, "label", {
          htmlFor: id
        }), label)
      );
    }
  }, {
    key: "renderSelectWithOptions",
    value: function renderSelectWithOptions() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _FieldSelect__WEBPACK_IMPORTED_MODULE_3__["default"], this.props)
      );
    }
  }, {
    key: "renderInputOfType",
    value: function renderInputOfType(type) {
      switch (type) {
        case _Field_config__WEBPACK_IMPORTED_MODULE_6__["CHECKBOX_TYPE"]:
          return this.renderCheckbox();

        case _Field_config__WEBPACK_IMPORTED_MODULE_6__["RADIO_TYPE"]:
          return this.renderRadioButton();

        case _Field_config__WEBPACK_IMPORTED_MODULE_6__["NUMBER_TYPE"]:
          return this.renderTypeNumber();

        case _Field_config__WEBPACK_IMPORTED_MODULE_6__["TEXTAREA_TYPE"]:
          return this.renderTextarea();

        case _Field_config__WEBPACK_IMPORTED_MODULE_6__["PASSWORD_TYPE"]:
          return this.renderTypePassword();

        case _Field_config__WEBPACK_IMPORTED_MODULE_6__["SELECT_TYPE"]:
          return this.renderSelectWithOptions();

        default:
          return this.renderTypeText();
      }
    }
  }, {
    key: "renderLabel",
    value: function renderLabel() {
      var _this$props4 = this.props,
          id = _this$props4.id,
          label = _this$props4.label,
          validation = _this$props4.validation;
      var isRequired = validation.includes('notEmpty');

      if (!label) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "label", {
          block: "Field",
          elem: "Label",
          mods: {
            isRequired: isRequired
          },
          htmlFor: id
        }, label)
      );
    }
  }, {
    key: "renderMessage",
    value: function renderMessage() {
      var message = this.props.message;

      if (!message) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "p", {
          block: "Field",
          elem: "Message"
        }, message)
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          mix = _this$props5.mix,
          type = _this$props5.type,
          message = _this$props5.message;
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "Field",
          mods: {
            type: type,
            hasError: !!message
          },
          mix: mix
        }, this.renderLabel(), this.renderInputOfType(type), this.renderMessage())
      );
    }
  }]);

  return _Field;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_Field, 'name', {
  value: 'Field'
});

var Field = middleware(_Field, "Component/Field/Component");

_defineProperty(Field, "propTypes", {
  id: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  type: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  handleChange: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  onChangeCheckbox: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  onFocus: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  onKeyPress: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  onKeyEnterDown: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  label: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object]),
  message: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  value: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool]),
  validation: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string).isRequired,
  checked: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string]),
  mix: _type_Common__WEBPACK_IMPORTED_MODULE_5__["MixType"],
  min: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  max: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number
});

_defineProperty(Field, "defaultProps", {
  min: 1,
  max: 99,
  checked: false,
  mix: {},
  label: '',
  value: null,
  message: ''
});

/* harmony default export */ __webpack_exports__["default"] = (Field);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/Field/Field.config.js":
/*!*************************************************!*\
  !*** ./src/app/component/Field/Field.config.js ***!
  \*************************************************/
/*! exports provided: TEXT_TYPE, NUMBER_TYPE, RADIO_TYPE, CHECKBOX_TYPE, TEXTAREA_TYPE, PASSWORD_TYPE, SELECT_TYPE, ENTER_KEY_CODE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TEXT_TYPE", function() { return TEXT_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NUMBER_TYPE", function() { return NUMBER_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RADIO_TYPE", function() { return RADIO_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHECKBOX_TYPE", function() { return CHECKBOX_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TEXTAREA_TYPE", function() { return TEXTAREA_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PASSWORD_TYPE", function() { return PASSWORD_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SELECT_TYPE", function() { return SELECT_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENTER_KEY_CODE", function() { return ENTER_KEY_CODE; });
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
var TEXT_TYPE = 'text';
var NUMBER_TYPE = 'number';
var RADIO_TYPE = 'radio';
var CHECKBOX_TYPE = 'checkbox';
var TEXTAREA_TYPE = 'textarea';
var PASSWORD_TYPE = 'password';
var SELECT_TYPE = 'select';
var ENTER_KEY_CODE = 13;

/***/ }),

/***/ "./src/app/component/Field/Field.container.js":
/*!****************************************************!*\
  !*** ./src/app/component/Field/Field.container.js ***!
  \****************************************************/
/*! exports provided: _FieldContainer, FieldContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_FieldContainer", function() { return _FieldContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FieldContainer", function() { return FieldContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Form_Form_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Form/Form.config */ "./src/app/component/Form/Form.config.js");
/* harmony import */ var _Field_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Field.component */ "./src/app/component/Field/Field.component.js");
/* harmony import */ var _Field_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Field.config */ "./src/app/component/Field/Field.config.js");
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





/** @namespace Component/Field/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _FieldContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_FieldContainer, _Extensible);

  function _FieldContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _FieldContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_FieldContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      onChange: _this.onChange.bind(_assertThisInitialized(_this)),
      handleChange: _this.handleChange.bind(_assertThisInitialized(_this)),
      onChangeCheckbox: _this.onChangeCheckbox.bind(_assertThisInitialized(_this)),
      onFocus: _this.onFocus.bind(_assertThisInitialized(_this)),
      onKeyPress: _this.onKeyPress.bind(_assertThisInitialized(_this)),
      onKeyEnterDown: _this.onKeyEnterDown.bind(_assertThisInitialized(_this)),
      onClick: _this.onClick.bind(_assertThisInitialized(_this))
    });

    _defineProperty(_assertThisInitialized(_this), "containerProps", function () {
      var propsChecked = _this.props.checked;
      var _this$state = _this.state,
          type = _this$state.type,
          checked = _this$state.checked,
          value = _this$state.value;
      return {
        checked: type === _Field_config__WEBPACK_IMPORTED_MODULE_4__["CHECKBOX_TYPE"] ? propsChecked : checked,
        value: value
      };
    });

    return _this;
  }

  _createClass(_FieldContainer, [{
    key: "__construct",
    value: function __construct(props) {
      _get(_getPrototypeOf(_FieldContainer.prototype), "__construct", this).call(this, props);

      var checked = props.checked;
      var value = this.getInitialPropsValue();
      this.state = {
        value: value,
        checked: checked
      };
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var prevValue = prevProps.value,
          prevChecked = prevProps.checked;
      var _this$props = this.props,
          currentValue = _this$props.value,
          currChecked = _this$props.checked,
          type = _this$props.type;

      if (prevValue !== currentValue) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          value: currentValue
        });
      }

      if (type === _Field_config__WEBPACK_IMPORTED_MODULE_4__["CHECKBOX_TYPE"] && currChecked !== prevChecked) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          checked: currChecked
        });
      }
    }
  }, {
    key: "getInitialPropsValue",
    value: function getInitialPropsValue() {
      var _this$props2 = this.props,
          type = _this$props2.type,
          value = _this$props2.value;

      if (value) {
        return value;
      }

      switch (type) {
        case _Field_config__WEBPACK_IMPORTED_MODULE_4__["NUMBER_TYPE"]:
          return 0;

        case _Field_config__WEBPACK_IMPORTED_MODULE_4__["CHECKBOX_TYPE"]:
          return false;

        default:
          return '';
      }
    }
  }, {
    key: "validateField",
    value: function validateField() {
      var _this$props3 = this.props,
          validation = _this$props3.validation,
          id = _this$props3.id,
          refMap = _this$props3.formRef;
      console.log(validation, id, refMap);

      if (validation && id && refMap && refMap.current) {
        var inputNode = refMap.current;
        var rule = validation.find(function (rule) {
          if (!_Form_Form_config__WEBPACK_IMPORTED_MODULE_2__["default"][rule]) {
            return false;
          }

          var validationRules = _Form_Form_config__WEBPACK_IMPORTED_MODULE_2__["default"][rule];
          var isValid = validationRules.validate(inputNode, refMap);
          return !isValid;
        });

        if (rule) {
          return _Form_Form_config__WEBPACK_IMPORTED_MODULE_2__["default"][rule];
        }
      }

      return {};
    }
  }, {
    key: "onChange",
    value: function onChange(event) {
      if (typeof event === 'string' || typeof event === 'number') {
        return this.handleChange(event);
      }

      var isValid = this.validateField();
      var element = event.target.parentElement;

      if (isValid.validate) {
        element.classList.add('Field_hasError');
        element.classList.remove('Field_isValid');
      } else if (!isValid.validate) {
        element.classList.add('Field_isValid');
        element.classList.remove('Field_hasError');
      }

      return this.handleChange(event.target.value);
    }
  }, {
    key: "onChangeCheckbox",
    value: function onChangeCheckbox(event) {
      var onChange = this.props.onChange;
      var _event$target = event.target,
          checked = _event$target.checked,
          value = _event$target.value;

      if (onChange) {
        onChange(value, checked);
      }

      this.setState({
        checked: checked
      });
    }
  }, {
    key: "onFocus",
    value: function onFocus(event) {
      var onFocus = this.props.onFocus;

      if (onFocus) {
        onFocus(event);
      }
    }
  }, {
    key: "onBlur",
    value: function onBlur(event) {
      var onBlur = this.props.onBlur;

      if (onBlur) {
        onBlur(event);
      }
    }
  }, {
    key: "onKeyPress",
    value: function onKeyPress(event) {
      var onKeyPress = this.props.onKeyPress;

      if (onKeyPress) {
        onKeyPress(event);
      }
    }
  }, {
    key: "onKeyEnterDown",
    value: function onKeyEnterDown(event) {
      if (event.keyCode === _Field_config__WEBPACK_IMPORTED_MODULE_4__["ENTER_KEY_CODE"]) {
        var value = event.target.value || 1;
        this.handleChange(value);
      }
    }
  }, {
    key: "onClick",
    value: function onClick(event) {
      var selectValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var onClick = this.props.onClick;

      if (selectValue) {
        event.target.select();
      }

      if (onClick) {
        onClick(event);
      }
    }
  }, {
    key: "handleChange",
    value: function handleChange(value) {
      var shouldUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var _this$props4 = this.props,
          isControlled = _this$props4.isControlled,
          onChange = _this$props4.onChange,
          type = _this$props4.type,
          min = _this$props4.min,
          max = _this$props4.max;

      switch (type) {
        case _Field_config__WEBPACK_IMPORTED_MODULE_4__["NUMBER_TYPE"]:
          var isValueNaN = Number.isNaN(parseInt(value, 10));

          if (min > value || value > max || isValueNaN) {
            break;
          }

          if (onChange && shouldUpdate) {
            onChange(value);
          }

          if (!isControlled) {
            this.setState({
              value: value
            });
          }

          break;

        default:
          if (onChange) {
            onChange(value);
          }

          if (!isControlled) {
            this.setState({
              value: value
            });
          }

      }
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _Field_component__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({}, this.props, this.containerProps(), this.containerFunctions))
      );
    }
  }]);

  return _FieldContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_FieldContainer, 'name', {
  value: 'FieldContainer'
});

var FieldContainer = middleware(_FieldContainer, "Component/Field/Container");

_defineProperty(FieldContainer, "propTypes", {
  isControlled: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  checked: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string]),
  value: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool]),
  type: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOf([_Field_config__WEBPACK_IMPORTED_MODULE_4__["TEXT_TYPE"], _Field_config__WEBPACK_IMPORTED_MODULE_4__["NUMBER_TYPE"], _Field_config__WEBPACK_IMPORTED_MODULE_4__["TEXTAREA_TYPE"], _Field_config__WEBPACK_IMPORTED_MODULE_4__["PASSWORD_TYPE"], _Field_config__WEBPACK_IMPORTED_MODULE_4__["RADIO_TYPE"], _Field_config__WEBPACK_IMPORTED_MODULE_4__["CHECKBOX_TYPE"], _Field_config__WEBPACK_IMPORTED_MODULE_4__["SELECT_TYPE"]]).isRequired,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  onFocus: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  onBlur: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  onKeyPress: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  min: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  max: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  validation: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string),
  id: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
});

_defineProperty(FieldContainer, "defaultProps", {
  min: 1,
  max: 99,
  checked: false,
  value: null,
  onChange: function onChange() {},
  onFocus: function onFocus() {},
  onBlur: function onBlur() {},
  onClick: function onClick() {},
  onKeyPress: function onKeyPress() {},
  isControlled: false,
  validation: [],
  id: ''
});

/* harmony default export */ __webpack_exports__["default"] = (FieldContainer);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/Field/Field.style.scss":
/*!**************************************************!*\
  !*** ./src/app/component/Field/Field.style.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291338296
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/FieldInput/FieldInput.component.js":
/*!**************************************************************!*\
  !*** ./src/app/component/FieldInput/FieldInput.component.js ***!
  \**************************************************************/
/*! exports provided: _FieldInput, FieldInput, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_FieldInput", function() { return _FieldInput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FieldInput", function() { return FieldInput; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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


/** @namespace Component/FieldInput/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _FieldInput =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_FieldInput, _Extensible);

  function _FieldInput() {
    _classCallCheck(this, _FieldInput);

    return _possibleConstructorReturn(this, _getPrototypeOf(_FieldInput).apply(this, arguments));
  }

  _createClass(_FieldInput, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          formRef = _this$props.formRef,
          validProps = _objectWithoutProperties(_this$props, ["formRef"]);

      return (
        /*#__PURE__*/
        _checkBEM(React, "input", _extends({
          ref: formRef
        }, validProps))
      );
    }
  }]);

  return _FieldInput;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_FieldInput, 'name', {
  value: 'FieldInput'
});

var FieldInput = middleware(_FieldInput, "Component/FieldInput/Component");

_defineProperty(FieldInput, "propTypes", {
  formRef: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
    current: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.instanceOf(Element)
  })])
});

_defineProperty(FieldInput, "defaultProps", {
  formRef: function formRef() {}
});

/* harmony default export */ __webpack_exports__["default"] = (FieldInput);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/FieldInput/FieldInput.container.js":
/*!**************************************************************!*\
  !*** ./src/app/component/FieldInput/FieldInput.container.js ***!
  \**************************************************************/
/*! exports provided: _FieldInputContainer, FieldInputContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_FieldInputContainer", function() { return _FieldInputContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FieldInputContainer", function() { return FieldInputContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _FieldInput_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FieldInput.component */ "./src/app/component/FieldInput/FieldInput.component.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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



/** @namespace Component/FieldInput/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _FieldInputContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_FieldInputContainer, _Extensible);

  function _FieldInputContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _FieldInputContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_FieldInputContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerProps", function () {
      var _this$props = _this.props,
          dispatch = _this$props.dispatch,
          selectOptions = _this$props.selectOptions,
          isControlled = _this$props.isControlled,
          handleChange = _this$props.handleChange,
          onChangeCheckbox = _this$props.onChangeCheckbox,
          onKeyEnterDown = _this$props.onKeyEnterDown,
          disabled = _this$props.isDisabled,
          autocomplete = _this$props.autocomplete,
          skipValue = _this$props.skipValue,
          validProps = _objectWithoutProperties(_this$props, ["dispatch", "selectOptions", "isControlled", "handleChange", "onChangeCheckbox", "onKeyEnterDown", "isDisabled", "autocomplete", "skipValue"]);

      return _objectSpread2(_objectSpread2({}, validProps), {}, {
        disabled: disabled,
        'data-skip-value': skipValue,
        autoComplete: _this.getAutocomplete()
      });
    });

    return _this;
  }

  _createClass(_FieldInputContainer, [{
    key: "getAutocomplete",
    value: function getAutocomplete() {
      var _this$props2 = this.props,
          autocomplete = _this$props2.autocomplete,
          type = _this$props2.type;
      /**
       * Make sure password auto-complete is enabled
       */

      if (type === 'password' && autocomplete === 'off') {
        return 'current-password';
      }

      return autocomplete;
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _FieldInput_component__WEBPACK_IMPORTED_MODULE_2__["default"], this.containerProps())
      );
    }
  }]);

  return _FieldInputContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_FieldInputContainer, 'name', {
  value: 'FieldInputContainer'
});

var FieldInputContainer = middleware(_FieldInputContainer, "Component/FieldInput/Container");

_defineProperty(FieldInputContainer, "propTypes", {
  isDisabled: prop_types__WEBPACK_IMPORTED_MODULE_0__["PropTypes"].bool,
  autocomplete: prop_types__WEBPACK_IMPORTED_MODULE_0__["PropTypes"].oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0__["PropTypes"].string, prop_types__WEBPACK_IMPORTED_MODULE_0__["PropTypes"].bool]),
  type: prop_types__WEBPACK_IMPORTED_MODULE_0__["PropTypes"].string.isRequired,
  skipValue: prop_types__WEBPACK_IMPORTED_MODULE_0__["PropTypes"].bool,
  value: prop_types__WEBPACK_IMPORTED_MODULE_0__["PropTypes"].oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0__["PropTypes"].string, prop_types__WEBPACK_IMPORTED_MODULE_0__["PropTypes"].number, prop_types__WEBPACK_IMPORTED_MODULE_0__["PropTypes"].bool])
});

_defineProperty(FieldInputContainer, "defaultProps", {
  value: '',
  autocomplete: 'off',
  isDisabled: false,
  skipValue: false
});

/* harmony default export */ __webpack_exports__["default"] = (FieldInputContainer);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/FieldInput/index.js":
/*!***********************************************!*\
  !*** ./src/app/component/FieldInput/index.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FieldInput_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FieldInput.container */ "./src/app/component/FieldInput/FieldInput.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _FieldInput_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/FieldSelect/FieldSelect.component.js":
/*!****************************************************************!*\
  !*** ./src/app/component/FieldSelect/FieldSelect.component.js ***!
  \****************************************************************/
/*! exports provided: _FieldSelect, FieldSelect, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_FieldSelect", function() { return _FieldSelect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FieldSelect", function() { return FieldSelect; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ClickOutside__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ClickOutside */ "./src/app/component/ClickOutside/index.js");
/* harmony import */ var _FieldSelect_style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FieldSelect.style */ "./src/app/component/FieldSelect/FieldSelect.style.scss");
/* harmony import */ var _FieldSelect_style__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_FieldSelect_style__WEBPACK_IMPORTED_MODULE_3__);
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




/** @namespace Component/FieldSelect/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _FieldSelect =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_FieldSelect, _Extensible);

  function _FieldSelect() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _FieldSelect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_FieldSelect)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "renderNativeOption", function (option) {
      var id = option.id,
          value = option.value,
          disabled = option.disabled,
          label = option.label;
      return (
        /*#__PURE__*/
        _checkBEM(React, "option", {
          key: id,
          id: id,
          value: value,
          disabled: disabled
        }, label)
      );
    });

    _defineProperty(_assertThisInitialized(_this), "renderOption", function (option) {
      var id = option.id,
          label = option.label;
      var _this$props = _this.props,
          isExpanded = _this$props.isSelectExpanded,
          handleSelectListOptionClick = _this$props.handleSelectListOptionClick;
      return (
        /*#__PURE__*/
        _checkBEM(React, "li", {
          block: "FieldSelect",
          elem: "Option",
          mods: {
            isExpanded: isExpanded
          },
          key: id
          /**
           * Added 'o' as querySelector does not work with
           * ids, that consist of numbers only
           */
          ,
          id: "o".concat(id),
          role: "menuitem" // eslint-disable-next-line react/jsx-no-bind
          ,
          onClick: function onClick() {
            return handleSelectListOptionClick(option);
          } // eslint-disable-next-line react/jsx-no-bind
          ,
          onKeyPress: function onKeyPress() {
            return handleSelectListOptionClick(option);
          },
          tabIndex: isExpanded ? '0' : '-1'
        }, label)
      );
    });

    return _this;
  }

  _createClass(_FieldSelect, [{
    key: "renderNativeSelect",
    value: function renderNativeSelect() {
      var _this$props2 = this.props,
          name = _this$props2.name,
          id = _this$props2.id,
          onChange = _this$props2.onChange,
          selectOptions = _this$props2.selectOptions,
          formRef = _this$props2.formRef,
          value = _this$props2.value,
          isDisabled = _this$props2.isDisabled,
          isExpanded = _this$props2.isSelectExpanded,
          autocomplete = _this$props2.autocomplete,
          skipValue = _this$props2.skipValue;
      return (
        /*#__PURE__*/
        _checkBEM(React, "select", {
          block: "FieldSelect",
          elem: "Select",
          autoComplete: autocomplete,
          mods: {
            isExpanded: isExpanded
          },
          ref: formRef,
          name: name,
          id: id,
          disabled: isDisabled,
          tabIndex: "0",
          value: value || '',
          onChange: onChange,
          "data-skip-value": skipValue
        }, this.renderPlaceholder(), selectOptions.map(this.renderNativeOption))
      );
    }
  }, {
    key: "renderPlaceholder",
    value: function renderPlaceholder() {
      var placeholder = this.props.placeholder;

      if (!placeholder) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "option", {
          value: "",
          label: placeholder
        })
      );
    }
  }, {
    key: "renderOptions",
    value: function renderOptions() {
      var _this$props3 = this.props,
          selectOptions = _this$props3.selectOptions,
          isExpanded = _this$props3.isSelectExpanded;
      return (
        /*#__PURE__*/
        _checkBEM(React, "ul", {
          block: "FieldSelect",
          elem: "Options",
          role: "menu",
          mods: {
            isExpanded: isExpanded
          }
        }, selectOptions.map(this.renderOption))
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          isExpanded = _this$props4.isSelectExpanded,
          handleSelectExpand = _this$props4.handleSelectExpand,
          handleSelectListKeyPress = _this$props4.handleSelectListKeyPress,
          handleSelectExpandedExpand = _this$props4.handleSelectExpandedExpand;
      return (
        /*#__PURE__*/
        _checkBEM(React, _ClickOutside__WEBPACK_IMPORTED_MODULE_2__["default"], {
          onClick: handleSelectExpandedExpand
        },
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "FieldSelect",
          onClick: handleSelectExpand,
          onKeyPress: handleSelectListKeyPress,
          role: "button",
          tabIndex: "0",
          "aria-label": "Select drop-down",
          "aria-expanded": isExpanded
        }, this.renderNativeSelect(), this.renderOptions()))
      );
    }
  }]);

  return _FieldSelect;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_FieldSelect, 'name', {
  value: 'FieldSelect'
});

var FieldSelect = middleware(_FieldSelect, "Component/FieldSelect/Component");

_defineProperty(FieldSelect, "propTypes", {
  handleSelectListOptionClick: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  handleSelectExpand: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  handleSelectListKeyPress: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  handleSelectExpandedExpand: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  isSelectExpanded: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  selectOptions: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
    id: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number]),
    value: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number]),
    disabled: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
    label: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object])
  })).isRequired,
  id: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  name: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  formRef: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
    current: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.instanceOf(Element)
  })]),
  placeholder: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  value: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool]),
  autocomplete: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool]),
  isDisabled: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  skipValue: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool
});

_defineProperty(FieldSelect, "defaultProps", {
  formRef: function formRef() {},
  placeholder: '',
  value: null,
  isDisabled: false,
  autocomplete: 'off',
  skipValue: false
});

/* harmony default export */ __webpack_exports__["default"] = (FieldSelect);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/FieldSelect/FieldSelect.config.js":
/*!*************************************************************!*\
  !*** ./src/app/component/FieldSelect/FieldSelect.config.js ***!
  \*************************************************************/
/*! exports provided: A_KEY_CODE, z_KEY_CODE, Z_KEY_CODE, a_KEY_CODE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A_KEY_CODE", function() { return A_KEY_CODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "z_KEY_CODE", function() { return z_KEY_CODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Z_KEY_CODE", function() { return Z_KEY_CODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a_KEY_CODE", function() { return a_KEY_CODE; });
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
var A_KEY_CODE = 65;
var z_KEY_CODE = 122;
var Z_KEY_CODE = 90;
var a_KEY_CODE = 97;

/***/ }),

/***/ "./src/app/component/FieldSelect/FieldSelect.container.js":
/*!****************************************************************!*\
  !*** ./src/app/component/FieldSelect/FieldSelect.container.js ***!
  \****************************************************************/
/*! exports provided: _FieldSelectContainer, FieldSelectContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_FieldSelectContainer", function() { return _FieldSelectContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FieldSelectContainer", function() { return FieldSelectContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Field_Field_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Field/Field.config */ "./src/app/component/Field/Field.config.js");
/* harmony import */ var _FieldSelect_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FieldSelect.component */ "./src/app/component/FieldSelect/FieldSelect.component.js");
/* harmony import */ var _FieldSelect_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FieldSelect.config */ "./src/app/component/FieldSelect/FieldSelect.config.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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





/** @namespace Component/FieldSelect/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _FieldSelectContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_FieldSelectContainer, _Extensible);

  function _FieldSelectContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _FieldSelectContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_FieldSelectContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      valueIndex: -1,
      searchString: 'a',
      isSelectExpanded: false
    });

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      handleSelectExpand: _this.handleSelectExpand.bind(_assertThisInitialized(_this)),
      handleSelectExpandedExpand: _this.handleSelectExpandedExpand.bind(_assertThisInitialized(_this)),
      handleSelectListOptionClick: _this.handleSelectListOptionClick.bind(_assertThisInitialized(_this)),
      handleSelectListKeyPress: _this.handleSelectListKeyPress.bind(_assertThisInitialized(_this))
    });

    _defineProperty(_assertThisInitialized(_this), "containerProps", function () {
      var _this$state = _this.state,
          valueIndex = _this$state.valueIndex,
          searchString = _this$state.searchString,
          isSelectExpanded = _this$state.isSelectExpanded;
      return {
        selectOptions: _this.sortSelectOptions(),
        valueIndex: valueIndex,
        searchString: searchString,
        isSelectExpanded: isSelectExpanded
      };
    });

    return _this;
  }

  _createClass(_FieldSelectContainer, [{
    key: "sortSelectOptions",
    value: function sortSelectOptions() {
      var selectOptions = this.props.selectOptions;
      /**
       * Trim all null label values, sort alphabetically
       */

      var sortedOptions = selectOptions.reduce(function (acc, a) {
        return a.label ? [].concat(_toConsumableArray(acc), [a]) : acc;
      }, []).sort(function (a, b) {
        var textA = a.label.toUpperCase();
        var textB = b.label.toUpperCase(); // eslint-disable-next-line no-nested-ternary

        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
      return sortedOptions;
    }
  }, {
    key: "handleSelectExpand",
    value: function handleSelectExpand() {
      this.setState(function (_ref) {
        var isSelectExpanded = _ref.isSelectExpanded;
        return {
          isSelectExpanded: !isSelectExpanded
        };
      });
    }
  }, {
    key: "handleSelectExpandedExpand",
    value: function handleSelectExpandedExpand() {
      var isSelectExpanded = this.state.isSelectExpanded;

      if (isSelectExpanded) {
        this.handleSelectExpand();
      }
    }
  }, {
    key: "handleSelectListOptionClick",
    value: function handleSelectListOptionClick(_ref2) {
      var value = _ref2.value;
      var _this$props = this.props,
          formRef = _this$props.formRef,
          onChange = _this$props.onChange;

      if (typeof formRef !== 'function') {
        formRef.current.value = value; // TODO: investigate why this is required

        var event = new Event('change', {
          bubbles: true
        });
        formRef.current.dispatchEvent(event);
      } else {
        onChange(value);
      }
    }
  }, {
    key: "_getSelectedValueIndex",
    value: function _getSelectedValueIndex(keyCode) {
      var selectOptions = this.props.selectOptions;
      var _this$state2 = this.state,
          prevSearchString = _this$state2.searchString,
          prevValueIndex = _this$state2.valueIndex;
      var pressedKeyValue = String.fromCharCode(keyCode).toLowerCase();
      var searchString = prevSearchString[prevSearchString.length - 1] !== pressedKeyValue ? "".concat(prevSearchString).concat(pressedKeyValue) : pressedKeyValue;
      var nextValueIndex = selectOptions.findIndex(function (_ref3, i) {
        var label = _ref3.label;
        return label && label.toLowerCase().startsWith(searchString) && (i > prevValueIndex || prevSearchString !== searchString);
      });

      if (nextValueIndex !== -1) {
        return {
          searchString: searchString,
          valueIndex: nextValueIndex
        };
      } // if no items were found, take only the latest letter of the search string


      var newSearchString = searchString[searchString.length - 1];
      var newValueIndex = selectOptions.findIndex(function (_ref4) {
        var label = _ref4.label;
        return label && label.toLowerCase().startsWith(newSearchString);
      });

      if (newValueIndex !== -1) {
        return {
          searchString: newSearchString,
          valueIndex: newValueIndex
        };
      } // if there are no items starting with this letter


      return {};
    }
  }, {
    key: "handleSelectListKeyPress",
    value: function handleSelectListKeyPress(event) {
      var isSelectExpanded = this.state.isSelectExpanded;
      var _this$props2 = this.props,
          selectOptions = _this$props2.selectOptions,
          onChange = _this$props2.onChange,
          selectId = _this$props2.id;
      var keyCode = event.which || event.keycode; // on Enter pressed

      if (keyCode === _Field_Field_config__WEBPACK_IMPORTED_MODULE_2__["ENTER_KEY_CODE"]) {
        this.handleSelectExpand();
        return;
      }

      if (!isSelectExpanded || !keyCode || keyCode < _FieldSelect_config__WEBPACK_IMPORTED_MODULE_4__["A_KEY_CODE"] || keyCode > _FieldSelect_config__WEBPACK_IMPORTED_MODULE_4__["z_KEY_CODE"] || keyCode > _FieldSelect_config__WEBPACK_IMPORTED_MODULE_4__["Z_KEY_CODE"] && keyCode < _FieldSelect_config__WEBPACK_IMPORTED_MODULE_4__["a_KEY_CODE"]) {
        return;
      }

      var _this$_getSelectedVal = this._getSelectedValueIndex(keyCode),
          searchString = _this$_getSelectedVal.searchString,
          valueIndex = _this$_getSelectedVal.valueIndex; // valueIndex can be 0, so !valueIndex === true


      if (!searchString || valueIndex === null) {
        return;
      }

      this.setState({
        searchString: searchString,
        valueIndex: valueIndex
      }, function () {
        var _selectOptions$valueI = selectOptions[valueIndex],
            id = _selectOptions$valueI.id,
            value = _selectOptions$valueI.value; // converting to string for avoiding the error with the first select option

        onChange(value.toString());
        var selectedElement = document.querySelector("#".concat(selectId, " + ul #o").concat(id));
        selectedElement.focus();
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$containerProps = this.containerProps(),
          selectOptions = _this$containerProps.selectOptions;

      if (!selectOptions) {
        throw new Error('Prop `selectOptions` is required for Field type `select`');
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, _FieldSelect_component__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({}, this.props, this.containerFunctions, this.containerProps()))
      );
    }
  }]);

  return _FieldSelectContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_FieldSelectContainer, 'name', {
  value: 'FieldSelectContainer'
});

var FieldSelectContainer = middleware(_FieldSelectContainer, "Component/FieldSelect/Container");

_defineProperty(FieldSelectContainer, "propTypes", {
  id: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  selectOptions: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
    id: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number]),
    value: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number]),
    disabled: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
    label: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object])
  })),
  formRef: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
    current: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.instanceOf(Element)
  })]),
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func
});

_defineProperty(FieldSelectContainer, "defaultProps", {
  selectOptions: [],
  formRef: function formRef() {},
  onChange: function onChange() {}
});

/* harmony default export */ __webpack_exports__["default"] = (FieldSelectContainer);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/FieldSelect/FieldSelect.style.scss":
/*!**************************************************************!*\
  !*** ./src/app/component/FieldSelect/FieldSelect.style.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291965447
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/FieldSelect/index.js":
/*!************************************************!*\
  !*** ./src/app/component/FieldSelect/index.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FieldSelect_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FieldSelect.container */ "./src/app/component/FieldSelect/FieldSelect.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _FieldSelect_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/FieldTextarea/FieldTextarea.component.js":
/*!********************************************************************!*\
  !*** ./src/app/component/FieldTextarea/FieldTextarea.component.js ***!
  \********************************************************************/
/*! exports provided: _FieldTextarea, FieldTextarea, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_FieldTextarea", function() { return _FieldTextarea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FieldTextarea", function() { return FieldTextarea; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
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


/** @namespace Component/FieldTextarea/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _FieldTextarea =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_FieldTextarea, _Extensible);

  function _FieldTextarea() {
    _classCallCheck(this, _FieldTextarea);

    return _possibleConstructorReturn(this, _getPrototypeOf(_FieldTextarea).apply(this, arguments));
  }

  _createClass(_FieldTextarea, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          id = _this$props.id,
          value = _this$props.value,
          name = _this$props.name,
          rows = _this$props.rows,
          formRef = _this$props.formRef,
          isDisabled = _this$props.isDisabled,
          maxLength = _this$props.maxLength,
          onChange = _this$props.onChange,
          onFocus = _this$props.onFocus,
          onClick = _this$props.onClick;
      return (
        /*#__PURE__*/
        _checkBEM(React, "textarea", {
          ref: formRef,
          id: id,
          name: name,
          rows: rows,
          value: value,
          disabled: isDisabled,
          onChange: onChange,
          onFocus: onFocus,
          onClick: onClick,
          maxLength: maxLength
        })
      );
    }
  }]);

  return _FieldTextarea;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_FieldTextarea, 'name', {
  value: 'FieldTextarea'
});

var FieldTextarea = middleware(_FieldTextarea, "Component/FieldTextarea/Component");

_defineProperty(FieldTextarea, "propTypes", {
  id: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  name: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  value: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  isDisabled: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  maxLength: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  onFocus: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  formRef: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
    current: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.instanceOf(Element)
  })]),
  rows: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number
});

_defineProperty(FieldTextarea, "defaultProps", {
  formRef: function formRef() {},
  isDisabled: false,
  rows: 4,
  maxLength: null,
  onChange: function onChange() {},
  onFocus: function onFocus() {},
  onClick: function onClick() {}
});

/* harmony default export */ __webpack_exports__["default"] = (FieldTextarea);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/FieldTextarea/index.js":
/*!**************************************************!*\
  !*** ./src/app/component/FieldTextarea/index.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FieldTextarea_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FieldTextarea.component */ "./src/app/component/FieldTextarea/FieldTextarea.component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _FieldTextarea_component__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

})
//# sourceMappingURL=bundle.625aae1ff3f029b4c282.hot-update.js.map