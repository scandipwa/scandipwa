(this["webpackJsonp"] = this["webpackJsonp"] || []).push([["category~product"],{

/***/ "./src/app/component/ProductConfigurableAttributeDropdown/ProductConfigurableAttributeDropdown.component.js":
/*!******************************************************************************************************************!*\
  !*** ./src/app/component/ProductConfigurableAttributeDropdown/ProductConfigurableAttributeDropdown.component.js ***!
  \******************************************************************************************************************/
/*! exports provided: _ProductConfigurableAttributeDropdown, ProductConfigurableAttributeDropdown, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductConfigurableAttributeDropdown", function() { return _ProductConfigurableAttributeDropdown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductConfigurableAttributeDropdown", function() { return ProductConfigurableAttributeDropdown; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Field */ "./src/app/component/Field/index.js");
/* harmony import */ var _ProductConfigurableAttributeDropdown_style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ProductConfigurableAttributeDropdown.style */ "./src/app/component/ProductConfigurableAttributeDropdown/ProductConfigurableAttributeDropdown.style.scss");
/* harmony import */ var _ProductConfigurableAttributeDropdown_style__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ProductConfigurableAttributeDropdown_style__WEBPACK_IMPORTED_MODULE_3__);
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




/** @namespace Component/ProductConfigurableAttributeDropdown/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductConfigurableAttributeDropdown =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductConfigurableAttributeDropdown, _Extensible);

  function _ProductConfigurableAttributeDropdown() {
    _classCallCheck(this, _ProductConfigurableAttributeDropdown);

    return _possibleConstructorReturn(this, _getPrototypeOf(_ProductConfigurableAttributeDropdown).apply(this, arguments));
  }

  _createClass(_ProductConfigurableAttributeDropdown, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          selectOptions = _this$props.selectOptions,
          selectValue = _this$props.selectValue,
          selectName = _this$props.selectName,
          selectLabel = _this$props.selectLabel,
          onChange = _this$props.onChange;
      return (
        /*#__PURE__*/
        _checkBEM(React, _Field__WEBPACK_IMPORTED_MODULE_2__["default"], {
          id: selectName,
          name: selectName,
          type: "select",
          placeholder: __('Choose %s', selectLabel.toLowerCase()),
          mix: {
            block: 'ProductConfigurableAttributeDropdown'
          },
          selectOptions: selectOptions,
          value: selectValue,
          onChange: onChange
        })
      );
    }
  }]);

  return _ProductConfigurableAttributeDropdown;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductConfigurableAttributeDropdown, 'name', {
  value: 'ProductConfigurableAttributeDropdown'
});

var ProductConfigurableAttributeDropdown = middleware(_ProductConfigurableAttributeDropdown, "Component/ProductConfigurableAttributeDropdown/Component");

_defineProperty(ProductConfigurableAttributeDropdown, "propTypes", {
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  selectOptions: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
    label: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
    id: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
    value: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
  })).isRequired,
  selectValue: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  selectLabel: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  selectName: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired
});

_defineProperty(ProductConfigurableAttributeDropdown, "defaultProps", {
  selectValue: '',
  selectLabel: 'attribute'
});

/* harmony default export */ __webpack_exports__["default"] = (ProductConfigurableAttributeDropdown);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductConfigurableAttributeDropdown/ProductConfigurableAttributeDropdown.container.js":
/*!******************************************************************************************************************!*\
  !*** ./src/app/component/ProductConfigurableAttributeDropdown/ProductConfigurableAttributeDropdown.container.js ***!
  \******************************************************************************************************************/
/*! exports provided: _ProductConfigurableAttributeDropdownContainer, ProductConfigurableAttributeDropdownContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductConfigurableAttributeDropdownContainer", function() { return _ProductConfigurableAttributeDropdownContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductConfigurableAttributeDropdownContainer", function() { return ProductConfigurableAttributeDropdownContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _ProductConfigurableAttributeDropdown_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ProductConfigurableAttributeDropdown.component */ "./src/app/component/ProductConfigurableAttributeDropdown/ProductConfigurableAttributeDropdown.component.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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




/** @namespace Component/ProductConfigurableAttributeDropdown/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductConfigurableAttributeDropdownContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductConfigurableAttributeDropdownContainer, _Extensible);

  function _ProductConfigurableAttributeDropdownContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ProductConfigurableAttributeDropdownContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ProductConfigurableAttributeDropdownContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      onChange: _this.onChange.bind(_assertThisInitialized(_this))
    });

    _defineProperty(_assertThisInitialized(_this), "containerProps", function () {
      var _this$props$option = _this.props.option,
          attribute_code = _this$props$option.attribute_code,
          attribute_label = _this$props$option.attribute_label;
      return {
        selectValue: _this._getSelectValue(),
        selectOptions: _this._getSelectOptions(),
        selectName: attribute_code,
        selectLabel: attribute_label
      };
    });

    _defineProperty(_assertThisInitialized(_this), "_getSelectOptions", function () {
      var _this$props = _this.props,
          _this$props$option2 = _this$props.option,
          attribute_options = _this$props$option2.attribute_options,
          attribute_code = _this$props$option2.attribute_code,
          getIsConfigurableAttributeAvailable = _this$props.getIsConfigurableAttributeAvailable;

      if (!attribute_options) {
        // eslint-disable-next-line no-console
        console.warn("Please make sure \"".concat(attribute_code, "\" is visible on Storefront."));
        return [];
      }

      return Object.values(attribute_options).reduce(function (acc, option) {
        var value = option.value;
        var isAvailable = getIsConfigurableAttributeAvailable({
          attribute_code: attribute_code,
          attribute_value: value
        });

        if (!isAvailable) {
          return acc;
        }

        return [].concat(_toConsumableArray(acc), [_objectSpread2(_objectSpread2({}, option), {}, {
          id: value
        })]);
      }, []);
    });

    _defineProperty(_assertThisInitialized(_this), "_getSelectValue", function () {
      var attribute_code = _this.props.option.attribute_code;
      var _this$props$parameter = _this.props.parameters,
          parameters = _this$props$parameter === void 0 ? {} : _this$props$parameter;
      return parameters[attribute_code];
    });

    return _this;
  }

  _createClass(_ProductConfigurableAttributeDropdownContainer, [{
    key: "onChange",
    value: function onChange(value) {
      var _this$props2 = this.props,
          updateConfigurableVariant = _this$props2.updateConfigurableVariant,
          attribute_code = _this$props2.option.attribute_code;
      updateConfigurableVariant(attribute_code, value);
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _ProductConfigurableAttributeDropdown_component__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({}, this.props, this.containerFunctions, this.containerProps()))
      );
    }
  }]);

  return _ProductConfigurableAttributeDropdownContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductConfigurableAttributeDropdownContainer, 'name', {
  value: 'ProductConfigurableAttributeDropdownContainer'
});

var ProductConfigurableAttributeDropdownContainer = middleware(_ProductConfigurableAttributeDropdownContainer, "Component/ProductConfigurableAttributeDropdown/Container");

_defineProperty(ProductConfigurableAttributeDropdownContainer, "propTypes", {
  option: _type_ProductList__WEBPACK_IMPORTED_MODULE_2__["AttributeType"].isRequired,
  updateConfigurableVariant: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  getIsConfigurableAttributeAvailable: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  parameters: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string).isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (ProductConfigurableAttributeDropdownContainer);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductConfigurableAttributeDropdown/ProductConfigurableAttributeDropdown.style.scss":
/*!****************************************************************************************************************!*\
  !*** ./src/app/component/ProductConfigurableAttributeDropdown/ProductConfigurableAttributeDropdown.style.scss ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340793
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ProductConfigurableAttributeDropdown/index.js":
/*!*************************************************************************!*\
  !*** ./src/app/component/ProductConfigurableAttributeDropdown/index.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProductConfigurableAttributeDropdown_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductConfigurableAttributeDropdown.container */ "./src/app/component/ProductConfigurableAttributeDropdown/ProductConfigurableAttributeDropdown.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ProductConfigurableAttributeDropdown_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/ProductConfigurableAttributes/ProductConfigurableAttributes.component.js":
/*!****************************************************************************************************!*\
  !*** ./src/app/component/ProductConfigurableAttributes/ProductConfigurableAttributes.component.js ***!
  \****************************************************************************************************/
/*! exports provided: _ProductConfigurableAttributes, ProductConfigurableAttributes, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductConfigurableAttributes", function() { return _ProductConfigurableAttributes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductConfigurableAttributes", function() { return ProductConfigurableAttributes; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ExpandableContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ExpandableContent */ "./src/app/component/ExpandableContent/index.js");
/* harmony import */ var _ProductAttributeValue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ProductAttributeValue */ "./src/app/component/ProductAttributeValue/index.js");
/* harmony import */ var _ProductConfigurableAttributeDropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ProductConfigurableAttributeDropdown */ "./src/app/component/ProductConfigurableAttributeDropdown/index.js");
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _ProductConfigurableAttributes_style__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ProductConfigurableAttributes.style */ "./src/app/component/ProductConfigurableAttributes/ProductConfigurableAttributes.style.scss");
/* harmony import */ var _ProductConfigurableAttributes_style__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_ProductConfigurableAttributes_style__WEBPACK_IMPORTED_MODULE_7__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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








/** @namespace Component/ProductConfigurableAttributes/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductConfigurableAttributes =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductConfigurableAttributes, _Extensible);

  function _ProductConfigurableAttributes() {
    _classCallCheck(this, _ProductConfigurableAttributes);

    return _possibleConstructorReturn(this, _getPrototypeOf(_ProductConfigurableAttributes).apply(this, arguments));
  }

  _createClass(_ProductConfigurableAttributes, [{
    key: "renderConfigurableAttributeValue",
    value: function renderConfigurableAttributeValue(attribute) {
      var _this$props = this.props,
          getIsConfigurableAttributeAvailable = _this$props.getIsConfigurableAttributeAvailable,
          handleOptionClick = _this$props.handleOptionClick,
          getLink = _this$props.getLink,
          isSelected = _this$props.isSelected;
      var attribute_value = attribute.attribute_value;
      return (
        /*#__PURE__*/
        _checkBEM(React, _ProductAttributeValue__WEBPACK_IMPORTED_MODULE_3__["default"], {
          key: attribute_value,
          attribute: attribute,
          isSelected: isSelected(attribute),
          isAvailable: getIsConfigurableAttributeAvailable(attribute),
          onClick: handleOptionClick,
          getLink: getLink
        })
      );
    }
  }, {
    key: "renderSwatch",
    value: function renderSwatch(option) {
      var _this = this;

      var attribute_values = option.attribute_values;
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductConfigurableAttributes",
          elem: "SwatchList"
        }, attribute_values.map(function (attribute_value) {
          return _this.renderConfigurableAttributeValue(_objectSpread2(_objectSpread2({}, option), {}, {
            attribute_value: attribute_value
          }));
        }))
      );
    }
  }, {
    key: "renderDropdown",
    value: function renderDropdown(option) {
      var _this$props2 = this.props,
          updateConfigurableVariant = _this$props2.updateConfigurableVariant,
          getIsConfigurableAttributeAvailable = _this$props2.getIsConfigurableAttributeAvailable,
          parameters = _this$props2.parameters;
      return (
        /*#__PURE__*/
        _checkBEM(React, _ProductConfigurableAttributeDropdown__WEBPACK_IMPORTED_MODULE_4__["default"], {
          option: option,
          updateConfigurableVariant: updateConfigurableVariant,
          getIsConfigurableAttributeAvailable: getIsConfigurableAttributeAvailable,
          parameters: parameters
        })
      );
    }
  }, {
    key: "renderPlaceholders",
    value: function renderPlaceholders() {
      var _this$props3 = this.props,
          numberOfPlaceholders = _this$props3.numberOfPlaceholders,
          isContentExpanded = _this$props3.isContentExpanded;
      return numberOfPlaceholders.map(function (length, i) {
        return (
          /*#__PURE__*/
          _checkBEM(React, _ExpandableContent__WEBPACK_IMPORTED_MODULE_2__["default"] // eslint-disable-next-line react/no-array-index-key
          , {
            key: i,
            mix: {
              block: 'ProductConfigurableAttributes',
              elem: 'Expandable'
            },
            isContentExpanded: isContentExpanded
          },
          /*#__PURE__*/
          _checkBEM(React, "div", {
            // eslint-disable-next-line react/no-array-index-key
            key: i,
            block: "ProductConfigurableAttributes",
            elem: "SwatchList"
          }, Array.from({
            length: length
          }, function (_, i) {
            return (
              /*#__PURE__*/
              _checkBEM(React, "div", {
                // eslint-disable-next-line react/no-array-index-key
                key: i,
                block: "ProductConfigurableAttributes",
                elem: "Placeholder"
              })
            );
          })))
        );
      });
    }
  }, {
    key: "renderConfigurableAttributes",
    value: function renderConfigurableAttributes() {
      var _this2 = this;

      var _this$props4 = this.props,
          configurable_options = _this$props4.configurable_options,
          isContentExpanded = _this$props4.isContentExpanded,
          getSubHeading = _this$props4.getSubHeading;
      return Object.values(configurable_options).map(function (option) {
        var attribute_label = option.attribute_label,
            attribute_code = option.attribute_code,
            attribute_options = option.attribute_options;

        var _ref = attribute_options ? Object.values(attribute_options) : [{}],
            _ref2 = _slicedToArray(_ref, 1),
            swatch_data = _ref2[0].swatch_data;

        var isSwatch = !!swatch_data;
        return (
          /*#__PURE__*/
          _checkBEM(React, _ExpandableContent__WEBPACK_IMPORTED_MODULE_2__["default"], {
            key: attribute_code,
            heading: attribute_label,
            subHeading: getSubHeading(option),
            mix: {
              block: 'ProductConfigurableAttributes',
              elem: 'Expandable'
            },
            isContentExpanded: isContentExpanded
          }, isSwatch ? _this2.renderSwatch(option) : _this2.renderDropdown(option))
        );
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          isReady = _this$props5.isReady,
          mix = _this$props5.mix;
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductConfigurableAttributes",
          mods: {
            isLoading: !isReady
          },
          mix: mix
        }, isReady ? this.renderConfigurableAttributes() : this.renderPlaceholders())
      );
    }
  }]);

  return _ProductConfigurableAttributes;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductConfigurableAttributes, 'name', {
  value: 'ProductConfigurableAttributes'
});

var ProductConfigurableAttributes = middleware(_ProductConfigurableAttributes, "Component/ProductConfigurableAttributes/Component");

_defineProperty(ProductConfigurableAttributes, "propTypes", {
  isContentExpanded: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  numberOfPlaceholders: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number),
  configurable_options: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.objectOf(_type_ProductList__WEBPACK_IMPORTED_MODULE_6__["AttributeType"]).isRequired,
  parameters: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({}).isRequired,
  updateConfigurableVariant: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  isReady: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  mix: _type_Common__WEBPACK_IMPORTED_MODULE_5__["MixType"],
  getIsConfigurableAttributeAvailable: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  handleOptionClick: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  getSubHeading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  isSelected: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  getLink: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

_defineProperty(ProductConfigurableAttributes, "defaultProps", {
  isReady: true,
  mix: {},
  // eslint-disable-next-line no-magic-numbers
  numberOfPlaceholders: [6, 10, 7],
  isContentExpanded: false,
  getIsConfigurableAttributeAvailable: function getIsConfigurableAttributeAvailable() {
    return true;
  }
});

/* harmony default export */ __webpack_exports__["default"] = (ProductConfigurableAttributes);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductConfigurableAttributes/ProductConfigurableAttributes.container.js":
/*!****************************************************************************************************!*\
  !*** ./src/app/component/ProductConfigurableAttributes/ProductConfigurableAttributes.container.js ***!
  \****************************************************************************************************/
/*! exports provided: _ProductConfigurableAttributesContainer, ProductConfigurableAttributesContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductConfigurableAttributesContainer", function() { return _ProductConfigurableAttributesContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductConfigurableAttributesContainer", function() { return ProductConfigurableAttributesContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ProductConfigurableAttributes_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ProductConfigurableAttributes.component */ "./src/app/component/ProductConfigurableAttributes/ProductConfigurableAttributes.component.js");
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



/** @namespace Component/ProductConfigurableAttributes/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductConfigurableAttributesContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductConfigurableAttributesContainer, _Extensible);

  function _ProductConfigurableAttributesContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ProductConfigurableAttributesContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ProductConfigurableAttributesContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      handleOptionClick: _this.handleOptionClick.bind(_assertThisInitialized(_this)),
      getSubHeading: _this.getSubHeading.bind(_assertThisInitialized(_this)),
      isSelected: _this.isSelected.bind(_assertThisInitialized(_this)),
      getLink: _this.getLink.bind(_assertThisInitialized(_this))
    });

    return _this;
  }

  _createClass(_ProductConfigurableAttributesContainer, [{
    key: "getLink",
    value: function getLink(_ref) {
      var attribute_code = _ref.attribute_code,
          attribute_value = _ref.attribute_value;
      var getLink = this.props.getLink;
      return getLink(attribute_code, attribute_value);
    }
  }, {
    key: "getSubHeading",
    value: function getSubHeading(_ref2) {
      var _this2 = this;

      var attribute_values = _ref2.attribute_values,
          attribute_code = _ref2.attribute_code,
          attribute_options = _ref2.attribute_options;
      return attribute_values.reduce(function (acc, attribute_value) {
        return _this2.isSelected({
          attribute_code: attribute_code,
          attribute_value: attribute_value
        }) ? [].concat(_toConsumableArray(acc), [attribute_options[attribute_value].label]) : acc;
      }, []).join(', ');
    }
  }, {
    key: "handleOptionClick",
    value: function handleOptionClick(_ref3) {
      var attribute_code = _ref3.attribute_code,
          attribute_value = _ref3.attribute_value;
      var updateConfigurableVariant = this.props.updateConfigurableVariant;
      updateConfigurableVariant(attribute_code, attribute_value);
    }
  }, {
    key: "isSelected",
    value: function isSelected(_ref4) {
      var attribute_code = _ref4.attribute_code,
          attribute_value = _ref4.attribute_value;
      var _this$props$parameter = this.props.parameters,
          parameters = _this$props$parameter === void 0 ? {} : _this$props$parameter;
      var parameter = parameters[attribute_code];

      if (parameter === undefined) {
        return false;
      }

      if (parameter.length !== undefined) {
        return parameter.includes(attribute_value);
      }

      return parameter === attribute_value;
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _ProductConfigurableAttributes_component__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({}, this.props, this.containerFunctions))
      );
    }
  }]);

  return _ProductConfigurableAttributesContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductConfigurableAttributesContainer, 'name', {
  value: 'ProductConfigurableAttributesContainer'
});

var ProductConfigurableAttributesContainer = middleware(_ProductConfigurableAttributesContainer, "Component/ProductConfigurableAttributes/Container");

_defineProperty(ProductConfigurableAttributesContainer, "propTypes", {
  getLink: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  parameters: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({}).isRequired,
  updateConfigurableVariant: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (ProductConfigurableAttributesContainer);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductConfigurableAttributes/ProductConfigurableAttributes.style.scss":
/*!**************************************************************************************************!*\
  !*** ./src/app/component/ProductConfigurableAttributes/ProductConfigurableAttributes.style.scss ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340494
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/route/CategoryPage/CategoryPage.config.js":
/*!***********************************************************!*\
  !*** ./src/app/route/CategoryPage/CategoryPage.config.js ***!
  \***********************************************************/
/*! exports provided: LOADING_TIME, DISPLAY_MODE_PRODUCTS, DISPLAY_MODE_CMS_BLOCK, DISPLAY_MODE_BOTH */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOADING_TIME", function() { return LOADING_TIME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DISPLAY_MODE_PRODUCTS", function() { return DISPLAY_MODE_PRODUCTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DISPLAY_MODE_CMS_BLOCK", function() { return DISPLAY_MODE_CMS_BLOCK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DISPLAY_MODE_BOTH", function() { return DISPLAY_MODE_BOTH; });
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
var LOADING_TIME = 500;
var DISPLAY_MODE_PRODUCTS = 'PRODUCTS';
var DISPLAY_MODE_CMS_BLOCK = 'PAGE';
var DISPLAY_MODE_BOTH = 'PRODUCTS_AND_PAGE';

/***/ })

}]);
//# sourceMappingURL=category~product.js.map