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
  validation: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string),
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
  message: '',
  validation: []
});

/* harmony default export */ __webpack_exports__["default"] = (Field);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

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
/* harmony import */ var _Field_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Field.component */ "./src/app/component/Field/Field.component.js");
/* harmony import */ var _Field_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Field.config */ "./src/app/component/Field/Field.config.js");
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
        checked: type === _Field_config__WEBPACK_IMPORTED_MODULE_3__["CHECKBOX_TYPE"] ? propsChecked : checked,
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

      if (type === _Field_config__WEBPACK_IMPORTED_MODULE_3__["CHECKBOX_TYPE"] && currChecked !== prevChecked) {
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
        case _Field_config__WEBPACK_IMPORTED_MODULE_3__["NUMBER_TYPE"]:
          return 0;

        case _Field_config__WEBPACK_IMPORTED_MODULE_3__["CHECKBOX_TYPE"]:
          return false;

        default:
          return '';
      }
    }
  }, {
    key: "onChange",
    value: function onChange(event) {
      if (typeof event === 'string' || typeof event === 'number') {
        return this.handleChange(event);
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
      if (event.keyCode === _Field_config__WEBPACK_IMPORTED_MODULE_3__["ENTER_KEY_CODE"]) {
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
      var _this$props3 = this.props,
          isControlled = _this$props3.isControlled,
          onChange = _this$props3.onChange,
          type = _this$props3.type,
          min = _this$props3.min,
          max = _this$props3.max;

      switch (type) {
        case _Field_config__WEBPACK_IMPORTED_MODULE_3__["NUMBER_TYPE"]:
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
        _checkBEM(React, _Field_component__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({}, this.props, this.containerProps(), this.containerFunctions))
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
  type: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOf([_Field_config__WEBPACK_IMPORTED_MODULE_3__["TEXT_TYPE"], _Field_config__WEBPACK_IMPORTED_MODULE_3__["NUMBER_TYPE"], _Field_config__WEBPACK_IMPORTED_MODULE_3__["TEXTAREA_TYPE"], _Field_config__WEBPACK_IMPORTED_MODULE_3__["PASSWORD_TYPE"], _Field_config__WEBPACK_IMPORTED_MODULE_3__["RADIO_TYPE"], _Field_config__WEBPACK_IMPORTED_MODULE_3__["CHECKBOX_TYPE"], _Field_config__WEBPACK_IMPORTED_MODULE_3__["SELECT_TYPE"]]).isRequired,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  onFocus: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  onBlur: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  onKeyPress: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  min: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  max: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number
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
  isControlled: false
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
      // 1608294417731
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/style/main.scss":
/*!*********************************!*\
  !*** ./src/app/style/main.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608294417914
      var cssReload = __webpack_require__(/*! ../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ })

})
//# sourceMappingURL=bundle.704f32a71d7dfed3c374.hot-update.js.map