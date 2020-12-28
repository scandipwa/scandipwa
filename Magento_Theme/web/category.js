(this["webpackJsonp"] = this["webpackJsonp"] || []).push([["category"],{

/***/ "./src/app/component/CategoryConfigurableAttributes/CategoryConfigurableAttributes.component.js":
/*!******************************************************************************************************!*\
  !*** ./src/app/component/CategoryConfigurableAttributes/CategoryConfigurableAttributes.component.js ***!
  \******************************************************************************************************/
/*! exports provided: _CategoryConfigurableAttributes, CategoryConfigurableAttributes, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, __, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_CategoryConfigurableAttributes", function() { return _CategoryConfigurableAttributes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryConfigurableAttributes", function() { return CategoryConfigurableAttributes; });
/* harmony import */ var _ExpandableContent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ExpandableContent */ "./src/app/component/ExpandableContent/index.js");
/* harmony import */ var _ExpandableContentShowMore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ExpandableContentShowMore */ "./src/app/component/ExpandableContentShowMore/index.js");
/* harmony import */ var _ProductConfigurableAttributes_ProductConfigurableAttributes_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ProductConfigurableAttributes/ProductConfigurableAttributes.component */ "./src/app/component/ProductConfigurableAttributes/ProductConfigurableAttributes.component.js");
/* harmony import */ var _util_Price__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/Price */ "./src/app/util/Price/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

 // eslint-disable-next-line max-len



/** @namespace Component/CategoryConfigurableAttributes/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _CategoryConfigurableAttributes =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_CategoryConfigurableAttributes, _Extensible);

  function _CategoryConfigurableAttributes() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _CategoryConfigurableAttributes);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_CategoryConfigurableAttributes)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "renderConfigurableOption", function (option) {
      var attribute_code = option.attribute_code;

      switch (attribute_code) {
        case 'price':
          return _this.renderPriceSwatch(option);

        default:
          return _this.renderDropdownOrSwatch(option);
      }
    });

    return _this;
  }

  _createClass(_CategoryConfigurableAttributes, [{
    key: "getPriceLabel",
    value: function getPriceLabel(option) {
      var currency_code = this.props.currency_code;
      var value_string = option.value_string;

      var _value_string$split = value_string.split('_'),
          _value_string$split2 = _slicedToArray(_value_string$split, 2),
          from = _value_string$split2[0],
          to = _value_string$split2[1];

      var priceFrom = Object(_util_Price__WEBPACK_IMPORTED_MODULE_3__["formatPrice"])(from, currency_code);
      var priceTo = Object(_util_Price__WEBPACK_IMPORTED_MODULE_3__["formatPrice"])(to, currency_code);

      if (from === '*') {
        return __('Up to %s', priceTo);
      }

      if (to === '*') {
        return __('From %s', priceFrom);
      }

      return __('From %s, to %s', priceFrom, priceTo);
    }
  }, {
    key: "renderPriceSwatch",
    value: function renderPriceSwatch(option) {
      var _this2 = this;

      var attribute_options = option.attribute_options,
          priceOption = _objectWithoutProperties(option, ["attribute_options"]);

      if (attribute_options) {
        // do not render price filter if it includes "*_*" aggregation
        if (attribute_options['*_*']) {
          return null;
        }

        priceOption.attribute_options = Object.entries(attribute_options).reduce(function (acc, _ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              option = _ref2[1];

          acc[key] = _objectSpread2(_objectSpread2({}, option), {}, {
            label: _this2.getPriceLabel(option)
          });
          return acc;
        }, {});
      }

      return this.renderDropdownOrSwatch(priceOption);
    }
  }, {
    key: "renderDropdownOrSwatch",
    value: function renderDropdownOrSwatch(option) {
      var _this$props = this.props,
          isContentExpanded = _this$props.isContentExpanded,
          getSubHeading = _this$props.getSubHeading;
      var attribute_label = option.attribute_label,
          attribute_code = option.attribute_code,
          attribute_options = option.attribute_options;

      var _ref3 = attribute_options ? Object.values(attribute_options) : [{}],
          _ref4 = _slicedToArray(_ref3, 1),
          swatch_data = _ref4[0].swatch_data;

      var isSwatch = !!swatch_data;
      return (
        /*#__PURE__*/
        _checkBEM(React, _ExpandableContent__WEBPACK_IMPORTED_MODULE_0__["default"], {
          key: attribute_code,
          heading: attribute_label,
          subHeading: getSubHeading(option),
          mix: {
            block: 'ProductConfigurableAttributes',
            elem: 'Expandable'
          },
          isContentExpanded: isContentExpanded
        }, isSwatch ? this.renderSwatch(option) : this.renderDropdown(option))
      );
    }
  }, {
    key: "renderConfigurableAttributes",
    value: function renderConfigurableAttributes() {
      var configurable_options = this.props.configurable_options;
      return Object.values(configurable_options).map(this.renderConfigurableOption);
    }
  }, {
    key: "renderDropdown",
    value: function renderDropdown(option) {
      var _this3 = this;

      var attribute_values = option.attribute_values;
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductConfigurableAttributes",
          elem: "DropDownList"
        },
        /*#__PURE__*/
        _checkBEM(React, _ExpandableContentShowMore__WEBPACK_IMPORTED_MODULE_1__["default"], null, attribute_values.map(function (attribute_value) {
          return _this3.renderConfigurableAttributeValue(_objectSpread2(_objectSpread2({}, option), {}, {
            attribute_value: attribute_value
          }));
        })))
      );
    }
  }]);

  return _CategoryConfigurableAttributes;
}(Extensible(_ProductConfigurableAttributes_ProductConfigurableAttributes_component__WEBPACK_IMPORTED_MODULE_2__["default"]));
Object.defineProperty(_CategoryConfigurableAttributes, 'name', {
  value: 'CategoryConfigurableAttributes'
});

var CategoryConfigurableAttributes = middleware(_CategoryConfigurableAttributes, "Component/CategoryConfigurableAttributes/Component");
/* harmony default export */ __webpack_exports__["default"] = (CategoryConfigurableAttributes);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/CategoryConfigurableAttributes/CategoryConfigurableAttributes.container.js":
/*!******************************************************************************************************!*\
  !*** ./src/app/component/CategoryConfigurableAttributes/CategoryConfigurableAttributes.container.js ***!
  \******************************************************************************************************/
/*! exports provided: mapStateToProps, _CategoryConfigurableAttributesContainer, CategoryConfigurableAttributesContainer, mapDispatchToProps, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_CategoryConfigurableAttributesContainer", function() { return _CategoryConfigurableAttributesContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryConfigurableAttributesContainer", function() { return CategoryConfigurableAttributesContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _ProductConfigurableAttributes_ProductConfigurableAttributes_container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ProductConfigurableAttributes/ProductConfigurableAttributes.container */ "./src/app/component/ProductConfigurableAttributes/ProductConfigurableAttributes.container.js");
/* harmony import */ var _CategoryConfigurableAttributes_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CategoryConfigurableAttributes.component */ "./src/app/component/CategoryConfigurableAttributes/CategoryConfigurableAttributes.component.js");
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
 // eslint-disable-next-line max-len



/** @namespace Component/CategoryConfigurableAttributes/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    currency_code: state.ConfigReducer.default_display_currency_code
  };
}, "Component/CategoryConfigurableAttributes/Container/mapStateToProps");
/** @namespace Component/CategoryConfigurableAttributes/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _CategoryConfigurableAttributesContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_CategoryConfigurableAttributesContainer, _Extensible);

  function _CategoryConfigurableAttributesContainer() {
    _classCallCheck(this, _CategoryConfigurableAttributesContainer);

    return _possibleConstructorReturn(this, _getPrototypeOf(_CategoryConfigurableAttributesContainer).apply(this, arguments));
  }

  _createClass(_CategoryConfigurableAttributesContainer, [{
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _CategoryConfigurableAttributes_component__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({}, this.props, this.containerFunctions))
      );
    }
  }]);

  return _CategoryConfigurableAttributesContainer;
}(Extensible(_ProductConfigurableAttributes_ProductConfigurableAttributes_container__WEBPACK_IMPORTED_MODULE_1__["default"]));
/** @namespace Component/CategoryConfigurableAttributes/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars

Object.defineProperty(_CategoryConfigurableAttributesContainer, 'name', {
  value: 'CategoryConfigurableAttributesContainer'
});

var CategoryConfigurableAttributesContainer = middleware(_CategoryConfigurableAttributesContainer, "Component/CategoryConfigurableAttributes/Container");
var mapDispatchToProps = middleware(function (dispatch) {
  return {};
}, "Component/CategoryConfigurableAttributes/Container/mapDispatchToProps");
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["connect"])(mapStateToProps, mapDispatchToProps)(CategoryConfigurableAttributesContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/CategoryConfigurableAttributes/index.js":
/*!*******************************************************************!*\
  !*** ./src/app/component/CategoryConfigurableAttributes/index.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CategoryConfigurableAttributes_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CategoryConfigurableAttributes.container */ "./src/app/component/CategoryConfigurableAttributes/CategoryConfigurableAttributes.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _CategoryConfigurableAttributes_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/CategoryDetails/CategoryDetails.component.js":
/*!************************************************************************!*\
  !*** ./src/app/component/CategoryDetails/CategoryDetails.component.js ***!
  \************************************************************************/
/*! exports provided: _CategoryDetails, CategoryDetails, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_CategoryDetails", function() { return _CategoryDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryDetails", function() { return CategoryDetails; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Html */ "./src/app/component/Html/index.js");
/* harmony import */ var _Image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Image */ "./src/app/component/Image/index.js");
/* harmony import */ var _TextPlaceholder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../TextPlaceholder */ "./src/app/component/TextPlaceholder/index.js");
/* harmony import */ var _type_Category__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../type/Category */ "./src/app/type/Category.js");
/* harmony import */ var _CategoryDetails_style__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CategoryDetails.style */ "./src/app/component/CategoryDetails/CategoryDetails.style.scss");
/* harmony import */ var _CategoryDetails_style__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_CategoryDetails_style__WEBPACK_IMPORTED_MODULE_5__);
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






/**
 * Category details
 * @class CategoryDetails
 * @namespace Component/CategoryDetails/Component
 */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _CategoryDetails =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_CategoryDetails, _Extensible);

  function _CategoryDetails() {
    _classCallCheck(this, _CategoryDetails);

    return _possibleConstructorReturn(this, _getPrototypeOf(_CategoryDetails).apply(this, arguments));
  }

  _createClass(_CategoryDetails, [{
    key: "renderCategoryName",
    value: function renderCategoryName() {
      var _this$props$category = this.props.category,
          name = _this$props$category.name,
          id = _this$props$category.id;

      if (id && !name) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "h1", {
          block: "CategoryDetails",
          elem: "Heading"
        },
        /*#__PURE__*/
        _checkBEM(React, _TextPlaceholder__WEBPACK_IMPORTED_MODULE_3__["default"], {
          content: name
        }))
      );
    }
  }, {
    key: "renderCategoryDescription",
    value: function renderCategoryDescription() {
      var _this$props$category2 = this.props.category,
          description = _this$props$category2.description,
          id = _this$props$category2.id;

      if (!id) {
        return this.renderCategoryDescriptionPlaceholder();
      }

      if (!description) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, _Html__WEBPACK_IMPORTED_MODULE_1__["default"], {
          content: description
        })
      );
    }
  }, {
    key: "renderCategoryDescriptionPlaceholder",
    value: function renderCategoryDescriptionPlaceholder() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "p", null,
        /*#__PURE__*/
        _checkBEM(React, _TextPlaceholder__WEBPACK_IMPORTED_MODULE_3__["default"], {
          length: "long"
        }))
      );
    }
  }, {
    key: "renderCategoryImagePlaceholder",
    value: function renderCategoryImagePlaceholder() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _Image__WEBPACK_IMPORTED_MODULE_2__["default"], {
          mix: {
            block: 'CategoryDetails',
            elem: 'Picture'
          },
          objectFit: "cover",
          ratio: "custom",
          isPlaceholder: true
        })
      );
    }
  }, {
    key: "renderCategoryImage",
    value: function renderCategoryImage() {
      var _this$props$category3 = this.props.category,
          image = _this$props$category3.image,
          id = _this$props$category3.id;

      if (!id) {
        return this.renderCategoryImagePlaceholder();
      }

      if (!image) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, _Image__WEBPACK_IMPORTED_MODULE_2__["default"], {
          mix: {
            block: 'CategoryDetails',
            elem: 'Picture'
          },
          src: image || '',
          ratio: "custom",
          objectFit: "cover"
        })
      );
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "article", {
          block: "CategoryDetails"
        },
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "CategoryDetails",
          elem: "Description"
        }, this.renderCategoryName(), this.renderCategoryDescription()), this.renderCategoryImage())
      );
    }
  }]);

  return _CategoryDetails;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]));
Object.defineProperty(_CategoryDetails, 'name', {
  value: 'CategoryDetails'
});

var CategoryDetails = middleware(_CategoryDetails, "Component/CategoryDetails/Component");

_defineProperty(CategoryDetails, "propTypes", {
  category: _type_Category__WEBPACK_IMPORTED_MODULE_4__["CategoryTreeType"].isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (CategoryDetails);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/CategoryDetails/CategoryDetails.style.scss":
/*!**********************************************************************!*\
  !*** ./src/app/component/CategoryDetails/CategoryDetails.style.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291338719
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/CategoryDetails/index.js":
/*!****************************************************!*\
  !*** ./src/app/component/CategoryDetails/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CategoryDetails_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CategoryDetails.component */ "./src/app/component/CategoryDetails/CategoryDetails.component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _CategoryDetails_component__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/CategoryFilterOverlay/CategoryFilterOverlay.component.js":
/*!************************************************************************************!*\
  !*** ./src/app/component/CategoryFilterOverlay/CategoryFilterOverlay.component.js ***!
  \************************************************************************************/
/*! exports provided: _CategoryFilterOverlay, CategoryFilterOverlay, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_CategoryFilterOverlay", function() { return _CategoryFilterOverlay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryFilterOverlay", function() { return CategoryFilterOverlay; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CategoryConfigurableAttributes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CategoryConfigurableAttributes */ "./src/app/component/CategoryConfigurableAttributes/index.js");
/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Loader */ "./src/app/component/Loader/index.js");
/* harmony import */ var _Overlay__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Overlay */ "./src/app/component/Overlay/index.js");
/* harmony import */ var _ResetButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ResetButton */ "./src/app/component/ResetButton/index.js");
/* harmony import */ var _CategoryFilterOverlay_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CategoryFilterOverlay.config */ "./src/app/component/CategoryFilterOverlay/CategoryFilterOverlay.config.js");
/* harmony import */ var _CategoryFilterOverlay_style__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CategoryFilterOverlay.style */ "./src/app/component/CategoryFilterOverlay/CategoryFilterOverlay.style.scss");
/* harmony import */ var _CategoryFilterOverlay_style__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_CategoryFilterOverlay_style__WEBPACK_IMPORTED_MODULE_7__);
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








/** @namespace Component/CategoryFilterOverlay/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _CategoryFilterOverlay =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_CategoryFilterOverlay, _Extensible);

  function _CategoryFilterOverlay() {
    _classCallCheck(this, _CategoryFilterOverlay);

    return _possibleConstructorReturn(this, _getPrototypeOf(_CategoryFilterOverlay).apply(this, arguments));
  }

  _createClass(_CategoryFilterOverlay, [{
    key: "renderFilters",
    value: function renderFilters() {
      var _this$props = this.props,
          availableFilters = _this$props.availableFilters,
          customFiltersValues = _this$props.customFiltersValues,
          toggleCustomFilter = _this$props.toggleCustomFilter,
          isMatchingInfoFilter = _this$props.isMatchingInfoFilter,
          getFilterUrl = _this$props.getFilterUrl;
      return (
        /*#__PURE__*/
        _checkBEM(React, _CategoryConfigurableAttributes__WEBPACK_IMPORTED_MODULE_2__["default"], {
          mix: {
            block: 'CategoryFilterOverlay',
            elem: 'Attributes'
          },
          isReady: isMatchingInfoFilter,
          configurable_options: availableFilters,
          getLink: getFilterUrl,
          parameters: customFiltersValues,
          updateConfigurableVariant: toggleCustomFilter
        })
      );
    }
  }, {
    key: "renderSeeResults",
    value: function renderSeeResults() {
      var onSeeResultsClick = this.props.onSeeResultsClick;
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "CategoryFilterOverlay",
          elem: "SeeResults"
        },
        /*#__PURE__*/
        _checkBEM(React, "button", {
          block: "CategoryFilterOverlay",
          elem: "Button",
          mix: {
            block: 'Button'
          },
          onClick: onSeeResultsClick
        }, __('SEE RESULTS')))
      );
    }
  }, {
    key: "renderResetButton",
    value: function renderResetButton() {
      var onSeeResultsClick = this.props.onSeeResultsClick;
      return (
        /*#__PURE__*/
        _checkBEM(React, _ResetButton__WEBPACK_IMPORTED_MODULE_5__["default"], {
          onClick: onSeeResultsClick,
          mix: {
            block: 'CategoryFilterOverlay',
            elem: 'ResetButton'
          }
        })
      );
    }
  }, {
    key: "renderHeading",
    value: function renderHeading() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "h2", {
          block: "CategoryFilterOverlay",
          elem: "Heading"
        }, __('Shopping Options'))
      );
    }
  }, {
    key: "renderNoResults",
    value: function renderNoResults() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "p", {
          block: "CategoryFilterOverlay",
          elem: "NoResults"
        }, __("The selected filter combination returned no results.\n                Please try again, using a different set of filters."))
      );
    }
  }, {
    key: "renderEmptyFilters",
    value: function renderEmptyFilters() {
      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null, this.renderNoResults(), this.renderResetButton(), this.renderSeeResults())
      );
    }
  }, {
    key: "renderMinimalFilters",
    value: function renderMinimalFilters() {
      return this.renderSeeResults();
    }
  }, {
    key: "renderDefaultFilters",
    value: function renderDefaultFilters() {
      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null, this.renderHeading(), this.renderResetButton(), this.renderFilters(), this.renderSeeResults())
      );
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this$props2 = this.props,
          totalPages = _this$props2.totalPages,
          areFiltersEmpty = _this$props2.areFiltersEmpty,
          isProductsLoading = _this$props2.isProductsLoading;

      if (!isProductsLoading && totalPages === 0) {
        return this.renderEmptyFilters();
      }

      if (areFiltersEmpty) {
        return this.renderMinimalFilters();
      }

      return this.renderDefaultFilters();
    }
  }, {
    key: "renderLoader",
    value: function renderLoader() {
      var _this$props3 = this.props,
          isInfoLoading = _this$props3.isInfoLoading,
          availableFilters = _this$props3.availableFilters;
      var isLoaded = availableFilters && !!Object.keys(availableFilters).length;

      if (!isLoaded) {
        // hide loader if filters were not yet loaded (even once!)
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, _Loader__WEBPACK_IMPORTED_MODULE_3__["default"], {
          isLoading: isInfoLoading
        })
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          onVisible = _this$props4.onVisible,
          onHide = _this$props4.onHide,
          totalPages = _this$props4.totalPages,
          isProductsLoading = _this$props4.isProductsLoading,
          isContentFiltered = _this$props4.isContentFiltered;

      if (!isProductsLoading && totalPages === 0 && !isContentFiltered) {
        return (
          /*#__PURE__*/
          _checkBEM(React, "div", {
            block: "CategoryFilterOverlay"
          })
        );
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, _Overlay__WEBPACK_IMPORTED_MODULE_4__["default"], {
          onVisible: onVisible,
          onHide: onHide,
          mix: {
            block: 'CategoryFilterOverlay'
          },
          id: _CategoryFilterOverlay_config__WEBPACK_IMPORTED_MODULE_6__["CATEGORY_FILTER_OVERLAY_ID"],
          isRenderInPortal: false
        },
        /*#__PURE__*/
        _checkBEM(React, "div", null, this.renderContent(), this.renderLoader()))
      );
    }
  }]);

  return _CategoryFilterOverlay;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_CategoryFilterOverlay, 'name', {
  value: 'CategoryFilterOverlay'
});

var CategoryFilterOverlay = middleware(_CategoryFilterOverlay, "Component/CategoryFilterOverlay/Component");

_defineProperty(CategoryFilterOverlay, "propTypes", {
  availableFilters: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape).isRequired,
  areFiltersEmpty: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  isContentFiltered: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  isMatchingInfoFilter: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  isInfoLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  isProductsLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  onSeeResultsClick: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  onVisible: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  onHide: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  customFiltersValues: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.array).isRequired,
  toggleCustomFilter: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  getFilterUrl: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  totalPages: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number.isRequired
});

_defineProperty(CategoryFilterOverlay, "defaultProps", {
  isMatchingInfoFilter: false
});

/* harmony default export */ __webpack_exports__["default"] = (CategoryFilterOverlay);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/CategoryFilterOverlay/CategoryFilterOverlay.config.js":
/*!*********************************************************************************!*\
  !*** ./src/app/component/CategoryFilterOverlay/CategoryFilterOverlay.config.js ***!
  \*********************************************************************************/
/*! exports provided: CATEGORY_FILTER_OVERLAY_ID */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CATEGORY_FILTER_OVERLAY_ID", function() { return CATEGORY_FILTER_OVERLAY_ID; });
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
var CATEGORY_FILTER_OVERLAY_ID = 'category-filter';

/***/ }),

/***/ "./src/app/component/CategoryFilterOverlay/CategoryFilterOverlay.container.js":
/*!************************************************************************************!*\
  !*** ./src/app/component/CategoryFilterOverlay/CategoryFilterOverlay.container.js ***!
  \************************************************************************************/
/*! exports provided: mapStateToProps, mapDispatchToProps, _CategoryFilterOverlayContainer, CategoryFilterOverlayContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, __, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_CategoryFilterOverlayContainer", function() { return _CategoryFilterOverlayContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryFilterOverlayContainer", function() { return CategoryFilterOverlayContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/es/index.js");
/* harmony import */ var _Header_Header_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Header/Header.config */ "./src/app/component/Header/Header.config.js");
/* harmony import */ var _store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store/Navigation/Navigation.action */ "./src/app/store/Navigation/Navigation.action.js");
/* harmony import */ var _store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../store/Navigation/Navigation.reducer */ "./src/app/store/Navigation/Navigation.reducer.js");
/* harmony import */ var _store_Overlay_Overlay_action__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../store/Overlay/Overlay.action */ "./src/app/store/Overlay/Overlay.action.js");
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _util_Url__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../util/Url */ "./src/app/util/Url/index.js");
/* harmony import */ var _CategoryFilterOverlay_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./CategoryFilterOverlay.component */ "./src/app/component/CategoryFilterOverlay/CategoryFilterOverlay.component.js");
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











/** @namespace Component/CategoryFilterOverlay/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    isInfoLoading: state.ProductListInfoReducer.isLoading,
    isProductsLoading: state.ProductListReducer.isLoading,
    totalPages: state.ProductListReducer.totalPages
  };
}, "Component/CategoryFilterOverlay/Container/mapStateToProps");
/** @namespace Component/CategoryFilterOverlay/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    hideActiveOverlay: function hideActiveOverlay() {
      return dispatch(Object(_store_Overlay_Overlay_action__WEBPACK_IMPORTED_MODULE_7__["hideActiveOverlay"])());
    },
    goToPreviousHeaderState: function goToPreviousHeaderState() {
      return dispatch(Object(_store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_5__["goToPreviousNavigationState"])(_store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_6__["TOP_NAVIGATION_TYPE"]));
    },
    goToPreviousNavigationState: function goToPreviousNavigationState() {
      return dispatch(Object(_store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_5__["goToPreviousNavigationState"])(_store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_6__["BOTTOM_NAVIGATION_TYPE"]));
    },
    changeHeaderState: function changeHeaderState(state) {
      return dispatch(Object(_store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_5__["changeNavigationState"])(_store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_6__["TOP_NAVIGATION_TYPE"], state));
    },
    changeNavigationState: function changeNavigationState(state) {
      return dispatch(Object(_store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_5__["changeNavigationState"])(_store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_6__["BOTTOM_NAVIGATION_TYPE"], state));
    }
  };
}, "Component/CategoryFilterOverlay/Container/mapDispatchToProps");
/** @namespace Component/CategoryFilterOverlay/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _CategoryFilterOverlayContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_CategoryFilterOverlayContainer, _Extensible);

  function _CategoryFilterOverlayContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _CategoryFilterOverlayContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_CategoryFilterOverlayContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      onSeeResultsClick: _this.onSeeResultsClick.bind(_assertThisInitialized(_this)),
      toggleCustomFilter: _this.toggleCustomFilter.bind(_assertThisInitialized(_this)),
      getFilterUrl: _this.getCustomFilterUrl.bind(_assertThisInitialized(_this)),
      onVisible: _this.onVisible.bind(_assertThisInitialized(_this)),
      onHide: _this.onHide.bind(_assertThisInitialized(_this))
    });

    _defineProperty(_assertThisInitialized(_this), "historyBackHook", function () {
      var _this$props = _this.props,
          goToPreviousNavigationState = _this$props.goToPreviousNavigationState,
          customFiltersValues = _this$props.customFiltersValues,
          hideActiveOverlay = _this$props.hideActiveOverlay,
          goToPreviousHeaderState = _this$props.goToPreviousHeaderState;
      goToPreviousNavigationState(); // close filter only if no applied filters left

      if (Object.keys(customFiltersValues).length === 0) {
        hideActiveOverlay();
        goToPreviousHeaderState();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "containerProps", function () {
      return {
        areFiltersEmpty: _this.getAreFiltersEmpty(),
        isContentFiltered: _this.isContentFiltered()
      };
    });

    return _this;
  }

  _createClass(_CategoryFilterOverlayContainer, [{
    key: "updateFilter",
    value: function updateFilter(filterName, filterArray) {
      var _this$props2 = this.props,
          location = _this$props2.location,
          history = _this$props2.history;
      Object(_util_Url__WEBPACK_IMPORTED_MODULE_9__["setQueryParams"])({
        customFilters: this.getFilterUrl(filterName, filterArray, false),
        page: ''
      }, location, history);
    }
  }, {
    key: "toggleCustomFilter",
    value: function toggleCustomFilter(requestVar, value) {
      this.updateFilter(requestVar, this._getNewFilterArray(requestVar, value));
    }
  }, {
    key: "getFilterUrl",
    value: function getFilterUrl(filterName, filterArray) {
      var isFull = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var pathname = this.props.location.pathname;

      var selectedFilters = this._getNewSelectedFiltersString(filterName, filterArray);

      var customFilters = isFull ? "".concat(pathname, "?customFilters=") : '';

      var formattedFilters = this._formatSelectedFiltersString(selectedFilters);

      return "".concat(customFilters).concat(formattedFilters);
    }
  }, {
    key: "getCustomFilterUrl",
    value: function getCustomFilterUrl(filterKey, value) {
      return this.getFilterUrl(filterKey, this._getNewFilterArray(filterKey, value));
    }
  }, {
    key: "_getSelectedFiltersFromUrl",
    value: function _getSelectedFiltersFromUrl() {
      var location = this.props.location;
      var selectedFiltersString = (Object(_util_Url__WEBPACK_IMPORTED_MODULE_9__["getQueryParam"])('customFilters', location) || '').split(';');
      return selectedFiltersString.reduce(function (acc, filter) {
        if (!filter) {
          return acc;
        }

        var _filter$split = filter.split(':'),
            _filter$split2 = _slicedToArray(_filter$split, 2),
            key = _filter$split2[0],
            value = _filter$split2[1];

        return _objectSpread2(_objectSpread2({}, acc), {}, _defineProperty({}, key, value.split(',')));
      }, {});
    }
  }, {
    key: "_getNewSelectedFiltersString",
    value: function _getNewSelectedFiltersString(filterName, filterArray) {
      var prevCustomFilters = this._getSelectedFiltersFromUrl();

      var customFilers = _objectSpread2(_objectSpread2({}, prevCustomFilters), {}, _defineProperty({}, filterName, filterArray));

      return Object.entries(customFilers).reduce(function (accumulator, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            filterKey = _ref2[0],
            filterValue = _ref2[1];

        if (filterValue.length) {
          var filterValues = filterValue.sort().join(',');
          accumulator.push("".concat(filterKey, ":").concat(filterValues));
        }

        return accumulator;
      }, []).sort().join(';');
    }
  }, {
    key: "_formatSelectedFiltersString",
    value: function _formatSelectedFiltersString(string) {
      var hasTrailingSemicolon = string[string.length - 1] === ';';
      var hasLeadingSemicolon = string[0] === ';';

      if (hasLeadingSemicolon) {
        return this._formatSelectedFiltersString(string.slice(0, -1));
      }

      if (hasTrailingSemicolon) {
        return string.slice(1);
      }

      return string;
    }
  }, {
    key: "onSeeResultsClick",
    value: function onSeeResultsClick() {
      var _this$props3 = this.props,
          hideActiveOverlay = _this$props3.hideActiveOverlay,
          goToPreviousHeaderState = _this$props3.goToPreviousHeaderState,
          goToPreviousNavigationState = _this$props3.goToPreviousNavigationState;
      hideActiveOverlay();
      goToPreviousHeaderState();
      goToPreviousNavigationState();
    }
  }, {
    key: "onVisible",
    value: function onVisible() {
      var _this$props4 = this.props,
          hideActiveOverlay = _this$props4.hideActiveOverlay,
          changeHeaderState = _this$props4.changeHeaderState,
          changeNavigationState = _this$props4.changeNavigationState,
          goToPreviousNavigationState = _this$props4.goToPreviousNavigationState,
          _this$props4$location = _this$props4.location,
          pathname = _this$props4$location.pathname,
          search = _this$props4$location.search;
      changeHeaderState({
        name: _Header_Header_config__WEBPACK_IMPORTED_MODULE_4__["FILTER"],
        title: __('Filters'),
        onCloseClick: function onCloseClick() {
          hideActiveOverlay();
          goToPreviousNavigationState();
        }
      });
      changeNavigationState({
        name: _Header_Header_config__WEBPACK_IMPORTED_MODULE_4__["FILTER"],
        isHidden: true
      });
      window.addEventListener('popstate', this.historyBackHook);
      history.pushState({
        overlayOpen: true
      }, '', pathname + search);
    }
  }, {
    key: "onHide",
    value: function onHide() {
      window.removeEventListener('popstate', this.historyBackHook);
    }
  }, {
    key: "getAreFiltersEmpty",
    value: function getAreFiltersEmpty() {
      var _this$props5 = this.props,
          isInfoLoading = _this$props5.isInfoLoading,
          availableFilters = _this$props5.availableFilters;
      return !isInfoLoading && (!availableFilters || !Object.keys(availableFilters).length);
    }
  }, {
    key: "isContentFiltered",
    value: function isContentFiltered() {
      var _this$urlStringToObje = this.urlStringToObject(),
          customFilters = _this$urlStringToObje.customFilters,
          priceMin = _this$urlStringToObje.priceMin,
          priceMax = _this$urlStringToObje.priceMax;

      return !!(customFilters || priceMin || priceMax);
    }
  }, {
    key: "urlStringToObject",
    value: function urlStringToObject() {
      var search = this.props.location.search;
      return search.substr(1).split('&').reduce(function (acc, part) {
        var _part$split = part.split('='),
            _part$split2 = _slicedToArray(_part$split, 2),
            key = _part$split2[0],
            value = _part$split2[1];

        return _objectSpread2(_objectSpread2({}, acc), {}, _defineProperty({}, key, value));
      }, {});
    }
    /**
     * Returns filter array with new parameters
     *
     * @param {String} filterKey key of option
     * @param {String} value
     * @returns {Object[]}
     * @memberof CategoryShoppingOptions
     */

  }, {
    key: "_getNewFilterArray",
    value: function _getNewFilterArray(filterKey, value) {
      var customFiltersValues = this.props.customFiltersValues;
      var newFilterArray = customFiltersValues[filterKey] !== undefined ? Array.from(customFiltersValues[filterKey]) : [];
      var filterValueIndex = newFilterArray.indexOf(value);

      if (filterKey === 'price') {
        // for price filter, choose one
        return [value];
      }

      if (filterValueIndex === -1) {
        newFilterArray.push(value);
      } else {
        newFilterArray.splice(filterValueIndex, 1);
      }

      return newFilterArray;
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _CategoryFilterOverlay_component__WEBPACK_IMPORTED_MODULE_10__["default"], _extends({}, this.props, this.containerFunctions, this.containerProps()))
      );
    }
  }]);

  return _CategoryFilterOverlayContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_CategoryFilterOverlayContainer, 'name', {
  value: 'CategoryFilterOverlayContainer'
});

var CategoryFilterOverlayContainer = middleware(_CategoryFilterOverlayContainer, "Component/CategoryFilterOverlay/Container");

_defineProperty(CategoryFilterOverlayContainer, "propTypes", {
  history: _type_Common__WEBPACK_IMPORTED_MODULE_8__["HistoryType"].isRequired,
  location: _type_Common__WEBPACK_IMPORTED_MODULE_8__["LocationType"].isRequired,
  customFiltersValues: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.array).isRequired,
  hideActiveOverlay: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  goToPreviousHeaderState: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  goToPreviousNavigationState: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  changeHeaderState: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  changeNavigationState: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  availableFilters: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape).isRequired,
  isInfoLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_router__WEBPACK_IMPORTED_MODULE_3__["withRouter"])(Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(CategoryFilterOverlayContainer)));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/CategoryFilterOverlay/CategoryFilterOverlay.style.scss":
/*!**********************************************************************************!*\
  !*** ./src/app/component/CategoryFilterOverlay/CategoryFilterOverlay.style.scss ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340112
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/CategoryFilterOverlay/index.js":
/*!**********************************************************!*\
  !*** ./src/app/component/CategoryFilterOverlay/index.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CategoryFilterOverlay_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CategoryFilterOverlay.container */ "./src/app/component/CategoryFilterOverlay/CategoryFilterOverlay.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _CategoryFilterOverlay_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/CategoryItemsCount/CategoryItemsCount.component.js":
/*!******************************************************************************!*\
  !*** ./src/app/component/CategoryItemsCount/CategoryItemsCount.component.js ***!
  \******************************************************************************/
/*! exports provided: _CategoryItemsCount, CategoryItemsCount, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_CategoryItemsCount", function() { return _CategoryItemsCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryItemsCount", function() { return CategoryItemsCount; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _TextPlaceholder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../TextPlaceholder */ "./src/app/component/TextPlaceholder/index.js");
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



/** @namespace Component/CategoryItemsCount/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _CategoryItemsCount =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_CategoryItemsCount, _Extensible);

  function _CategoryItemsCount() {
    _classCallCheck(this, _CategoryItemsCount);

    return _possibleConstructorReturn(this, _getPrototypeOf(_CategoryItemsCount).apply(this, arguments));
  }

  _createClass(_CategoryItemsCount, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          totalItems = _this$props.totalItems,
          isMatchingListFilter = _this$props.isMatchingListFilter;
      return (
        /*#__PURE__*/
        _checkBEM(React, "p", {
          block: "CategoryPage",
          elem: "ItemsCount"
        },
        /*#__PURE__*/
        _checkBEM(React, _TextPlaceholder__WEBPACK_IMPORTED_MODULE_2__["default"], {
          content: !isMatchingListFilter ? __('Products are loading...') : __('%s items found', totalItems)
        }))
      );
    }
  }]);

  return _CategoryItemsCount;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_CategoryItemsCount, 'name', {
  value: 'CategoryItemsCount'
});

var CategoryItemsCount = middleware(_CategoryItemsCount, "Component/CategoryItemsCount/Component");

_defineProperty(CategoryItemsCount, "propTypes", {
  totalItems: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number.isRequired,
  isMatchingListFilter: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool
});

_defineProperty(CategoryItemsCount, "defaultProps", {
  isMatchingListFilter: false
});

/* harmony default export */ __webpack_exports__["default"] = (CategoryItemsCount);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/CategoryItemsCount/CategoryItemsCount.container.js":
/*!******************************************************************************!*\
  !*** ./src/app/component/CategoryItemsCount/CategoryItemsCount.container.js ***!
  \******************************************************************************/
/*! exports provided: mapStateToProps, mapDispatchToProps, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _CategoryItemsCount_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CategoryItemsCount.component */ "./src/app/component/CategoryItemsCount/CategoryItemsCount.component.js");
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


/** @namespace Component/CategoryItemsCount/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    totalItems: state.ProductListReducer.totalItems
  };
}, "Component/CategoryItemsCount/Container/mapStateToProps");
/** @namespace Component/CategoryItemsCount/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars

var mapDispatchToProps = middleware(function (dispatch) {
  return {};
}, "Component/CategoryItemsCount/Container/mapDispatchToProps");
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["connect"])(mapStateToProps, mapDispatchToProps)(_CategoryItemsCount_component__WEBPACK_IMPORTED_MODULE_1__["default"]));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/CategoryItemsCount/index.js":
/*!*******************************************************!*\
  !*** ./src/app/component/CategoryItemsCount/index.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CategoryItemsCount_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CategoryItemsCount.container */ "./src/app/component/CategoryItemsCount/CategoryItemsCount.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _CategoryItemsCount_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/CategoryPagination/CategoryPagination.component.js":
/*!******************************************************************************!*\
  !*** ./src/app/component/CategoryPagination/CategoryPagination.component.js ***!
  \******************************************************************************/
/*! exports provided: _CategoryPagination, CategoryPagination, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_CategoryPagination", function() { return _CategoryPagination; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryPagination", function() { return CategoryPagination; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CategoryPaginationLink__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CategoryPaginationLink */ "./src/app/component/CategoryPaginationLink/index.js");
/* harmony import */ var _TextPlaceholder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../TextPlaceholder */ "./src/app/component/TextPlaceholder/index.js");
/* harmony import */ var _CategoryPagination_style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CategoryPagination.style */ "./src/app/component/CategoryPagination/CategoryPagination.style.scss");
/* harmony import */ var _CategoryPagination_style__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_CategoryPagination_style__WEBPACK_IMPORTED_MODULE_4__);
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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable fp/no-let, fp/no-loops */

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





/** @namespace Component/CategoryPagination/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _CategoryPagination =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_CategoryPagination, _Extensible);

  function _CategoryPagination() {
    _classCallCheck(this, _CategoryPagination);

    return _possibleConstructorReturn(this, _getPrototypeOf(_CategoryPagination).apply(this, arguments));
  }

  _createClass(_CategoryPagination, [{
    key: "renderPreviousPageLink",
    value: function renderPreviousPageLink() {
      var _this$props = this.props,
          anchorTextPrevious = _this$props.anchorTextPrevious,
          currentPage = _this$props.currentPage;

      if (currentPage <= 1) {
        return (
          /*#__PURE__*/
          _checkBEM(React, "li", {
            block: "CategoryPagination",
            elem: "ListItem"
          })
        );
      }

      return this.renderPageLink(currentPage - 1, __('Previous page'), anchorTextPrevious || this.renderPageIcon());
    }
  }, {
    key: "renderPageLinks",
    value: function renderPageLinks() {
      var _this$props2 = this.props,
          totalPages = _this$props2.totalPages,
          paginationFrame = _this$props2.paginationFrame,
          paginationFrameSkip = _this$props2.paginationFrameSkip,
          currentPage = _this$props2.currentPage;
      var pages = [];
      var i; // Render next pagination links

      for (i = currentPage; i <= currentPage + paginationFrame; i++) {
        if (i <= totalPages && pages.length <= paginationFrameSkip) {
          pages.push(this.renderPageLink(i, __('Page %s', i), i.toString(), i === currentPage));
        }
      } // Render previous pagination links if necessary


      for (i = 1; i < currentPage; i++) {
        if (pages.length < paginationFrame) {
          var id = currentPage - i;
          var pageData = this.renderPageLink(id, __('Page %s', id), id.toString());
          pages = [pageData].concat(_toConsumableArray(pages));
        }
      } // Edge case for rendering correct count of next links when current page is 1


      if (currentPage === 1 && pages.length < totalPages) {
        for (i = pages.length + 1; i <= paginationFrame; i++) {
          pages.push(this.renderPageLink(i, __('Page %s', i), i.toString()));
        }
      }

      return pages;
    }
  }, {
    key: "renderPageIcon",
    value: function renderPageIcon() {
      var isNext = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return (
        /*#__PURE__*/
        _checkBEM(React, "span", {
          block: "CategoryPagination",
          elem: "Icon",
          mods: {
            isNext: isNext
          }
        })
      );
    }
  }, {
    key: "renderNextPageLink",
    value: function renderNextPageLink() {
      var _this$props3 = this.props,
          anchorTextNext = _this$props3.anchorTextNext,
          currentPage = _this$props3.currentPage,
          totalPages = _this$props3.totalPages;

      if (currentPage > totalPages - 1) {
        return (
          /*#__PURE__*/
          _checkBEM(React, "li", {
            block: "CategoryPagination",
            elem: "ListItem"
          })
        );
      }

      return this.renderPageLink(currentPage + 1, __('Next page'), anchorTextNext || this.renderPageIcon(true));
    }
  }, {
    key: "renderPageLink",
    value: function renderPageLink(pageNumber, label, children) {
      var isCurrent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var _this$props4 = this.props,
          pathname = _this$props4.pathname,
          onPageSelect = _this$props4.onPageSelect,
          getSearchQuery = _this$props4.getSearchQuery;
      return (
        /*#__PURE__*/
        _checkBEM(React, "li", {
          key: pageNumber,
          block: "CategoryPagination",
          elem: "ListItem"
        },
        /*#__PURE__*/
        _checkBEM(React, _CategoryPaginationLink__WEBPACK_IMPORTED_MODULE_2__["default"], {
          label: label,
          url_path: pathname,
          getPage: onPageSelect,
          isCurrent: isCurrent,
          pageNumber: pageNumber,
          getSearchQueryForPage: getSearchQuery
        }, children))
      );
    }
  }, {
    key: "renderPlaceholder",
    value: function renderPlaceholder() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "ul", {
          block: "CategoryPagination",
          mods: {
            isLoading: true
          }
        }, Array.from({
          length: 4
        }, function (_, i) {
          return (
            /*#__PURE__*/
            _checkBEM(React, "li", {
              key: i,
              block: "CategoryPagination",
              elem: "ListItem"
            },
            /*#__PURE__*/
            _checkBEM(React, _TextPlaceholder__WEBPACK_IMPORTED_MODULE_3__["default"], {
              length: "block"
            }))
          );
        }))
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          isLoading = _this$props5.isLoading,
          totalPages = _this$props5.totalPages;

      if (totalPages === 1) {
        // do not show pagination, if there are less then one page
        return (
          /*#__PURE__*/
          _checkBEM(React, "ul", {
            block: "CategoryPagination"
          })
        );
      }

      if (isLoading) {
        return this.renderPlaceholder();
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "nav", {
          "aria-label": __('Product list navigation')
        },
        /*#__PURE__*/
        _checkBEM(React, "ul", {
          block: "CategoryPagination"
        }, this.renderPreviousPageLink(), this.renderPageLinks(), this.renderNextPageLink()))
      );
    }
  }]);

  return _CategoryPagination;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_CategoryPagination, 'name', {
  value: 'CategoryPagination'
});

var CategoryPagination = middleware(_CategoryPagination, "Component/CategoryPagination/Component");

_defineProperty(CategoryPagination, "propTypes", {
  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  pathname: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  onPageSelect: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  totalPages: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number.isRequired,
  currentPage: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number.isRequired,
  getSearchQuery: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  paginationFrame: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  paginationFrameSkip: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  anchorTextPrevious: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  anchorTextNext: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
});

_defineProperty(CategoryPagination, "defaultProps", {
  isLoading: false,
  paginationFrame: 5,
  paginationFrameSkip: 4,
  anchorTextPrevious: '',
  anchorTextNext: ''
});

/* harmony default export */ __webpack_exports__["default"] = (CategoryPagination);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/CategoryPagination/CategoryPagination.container.js":
/*!******************************************************************************!*\
  !*** ./src/app/component/CategoryPagination/CategoryPagination.container.js ***!
  \******************************************************************************/
/*! exports provided: mapStateToProps, _CategoryPaginationContainer, CategoryPaginationContainer, mapDispatchToProps, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_CategoryPaginationContainer", function() { return _CategoryPaginationContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryPaginationContainer", function() { return CategoryPaginationContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _type_Router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../type/Router */ "./src/app/type/Router.js");
/* harmony import */ var _util_Url__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../util/Url */ "./src/app/util/Url/index.js");
/* harmony import */ var _CategoryPagination_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CategoryPagination.component */ "./src/app/component/CategoryPagination/CategoryPagination.component.js");
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








/** @namespace Component/CategoryPagination/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    paginationFrame: state.ConfigReducer.pagination_frame,
    paginationFrameSkip: state.ConfigReducer.pagination_frame_skip,
    anchorTextPrevious: state.ConfigReducer.anchor_text_for_previous,
    anchorTextNext: state.ConfigReducer.anchor_text_for_next
  };
}, "Component/CategoryPagination/Container/mapStateToProps");
/** @namespace Component/CategoryPagination/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _CategoryPaginationContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_CategoryPaginationContainer, _Extensible);

  function _CategoryPaginationContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _CategoryPaginationContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_CategoryPaginationContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", function () {
      return {
        getSearchQuery: _this.getSearchQuery
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getSearchQuery", function (pageNumber) {
      var _this$props = _this.props,
          history = _this$props.history,
          location = _this$props.location;
      var page = pageNumber !== 1 ? pageNumber : '';
      return Object(_util_Url__WEBPACK_IMPORTED_MODULE_6__["generateQuery"])({
        page: page
      }, location, history);
    });

    _defineProperty(_assertThisInitialized(_this), "containerProps", function () {
      return {
        currentPage: _this._getCurrentPage()
      };
    });

    return _this;
  }

  _createClass(_CategoryPaginationContainer, [{
    key: "_getCurrentPage",
    value: function _getCurrentPage() {
      var location = this.props.location;
      return +(Object(_util_Url__WEBPACK_IMPORTED_MODULE_6__["getQueryParam"])('page', location) || 1);
    }
  }, {
    key: "render",
    value: function render() {
      var pathname = this.props.location.pathname;
      return (
        /*#__PURE__*/
        _checkBEM(React, _CategoryPagination_component__WEBPACK_IMPORTED_MODULE_7__["default"], _extends({
          pathname: pathname
        }, this.props, this.containerFunctions(), this.containerProps()))
      );
    }
  }]);

  return _CategoryPaginationContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/** @namespace Component/CategoryPagination/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars

Object.defineProperty(_CategoryPaginationContainer, 'name', {
  value: 'CategoryPaginationContainer'
});

var CategoryPaginationContainer = middleware(_CategoryPaginationContainer, "Component/CategoryPagination/Container");

_defineProperty(CategoryPaginationContainer, "propTypes", {
  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  onPageSelect: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  history: _type_Common__WEBPACK_IMPORTED_MODULE_4__["HistoryType"].isRequired,
  location: _type_Router__WEBPACK_IMPORTED_MODULE_5__["LocationType"].isRequired,
  totalPages: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number.isRequired
});

_defineProperty(CategoryPaginationContainer, "defaultProps", {
  isLoading: false,
  onPageSelect: function onPageSelect() {}
});

var mapDispatchToProps = middleware(function (dispatch) {
  return {};
}, "Component/CategoryPagination/Container/mapDispatchToProps");
/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["withRouter"])(Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(CategoryPaginationContainer)));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/CategoryPagination/CategoryPagination.style.scss":
/*!****************************************************************************!*\
  !*** ./src/app/component/CategoryPagination/CategoryPagination.style.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340684
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/CategoryPagination/index.js":
/*!*******************************************************!*\
  !*** ./src/app/component/CategoryPagination/index.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CategoryPagination_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CategoryPagination.container */ "./src/app/component/CategoryPagination/CategoryPagination.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _CategoryPagination_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/CategoryPaginationLink/CategoryPaginationLink.component.js":
/*!**************************************************************************************!*\
  !*** ./src/app/component/CategoryPaginationLink/CategoryPaginationLink.component.js ***!
  \**************************************************************************************/
/*! exports provided: _CategoryPaginationLink, CategoryPaginationLink, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_CategoryPaginationLink", function() { return _CategoryPaginationLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryPaginationLink", function() { return CategoryPaginationLink; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Link */ "./src/app/component/Link/index.js");
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _CategoryPaginationLink_style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CategoryPaginationLink.style */ "./src/app/component/CategoryPaginationLink/CategoryPaginationLink.style.scss");
/* harmony import */ var _CategoryPaginationLink_style__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_CategoryPaginationLink_style__WEBPACK_IMPORTED_MODULE_4__);
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





/** @namespace Component/CategoryPaginationLink/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _CategoryPaginationLink =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_CategoryPaginationLink, _Extensible);

  function _CategoryPaginationLink() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _CategoryPaginationLink);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_CategoryPaginationLink)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "getPage", function () {
      var _this$props = _this.props,
          getPage = _this$props.getPage,
          pageNumber = _this$props.pageNumber;
      getPage(pageNumber);
    });

    _defineProperty(_assertThisInitialized(_this), "getSearchQueryForPage", function () {
      var _this$props2 = _this.props,
          getSearchQueryForPage = _this$props2.getSearchQueryForPage,
          pageNumber = _this$props2.pageNumber;
      return getSearchQueryForPage(pageNumber);
    });

    return _this;
  }

  _createClass(_CategoryPaginationLink, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          label = _this$props3.label,
          pathname = _this$props3.url_path,
          isCurrent = _this$props3.isCurrent,
          children = _this$props3.children;
      var search = this.getSearchQueryForPage();

      var _ref = history.state || {},
          _ref$state = _ref.state,
          state = _ref$state === void 0 ? {} : _ref$state;

      return (
        /*#__PURE__*/
        _checkBEM(React, _Link__WEBPACK_IMPORTED_MODULE_2__["default"], {
          to: {
            search: search,
            pathname: pathname,
            state: state
          },
          "aria-label": label,
          block: "CategoryPaginationLink",
          mods: {
            isCurrent: isCurrent
          },
          "aria-current": isCurrent ? 'page' : 'false',
          onClick: this.getPage
        }, children)
      );
    }
  }]);

  return _CategoryPaginationLink;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_CategoryPaginationLink, 'name', {
  value: 'CategoryPaginationLink'
});

var CategoryPaginationLink = middleware(_CategoryPaginationLink, "Component/CategoryPaginationLink/Component");

_defineProperty(CategoryPaginationLink, "propTypes", {
  children: _type_Common__WEBPACK_IMPORTED_MODULE_3__["ChildrenType"],
  getPage: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  label: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  isCurrent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  url_path: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  pageNumber: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number.isRequired,
  getSearchQueryForPage: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

_defineProperty(CategoryPaginationLink, "defaultProps", {
  children: []
});

/* harmony default export */ __webpack_exports__["default"] = (CategoryPaginationLink);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/CategoryPaginationLink/CategoryPaginationLink.style.scss":
/*!************************************************************************************!*\
  !*** ./src/app/component/CategoryPaginationLink/CategoryPaginationLink.style.scss ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340830
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/CategoryPaginationLink/index.js":
/*!***********************************************************!*\
  !*** ./src/app/component/CategoryPaginationLink/index.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CategoryPaginationLink_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CategoryPaginationLink.component */ "./src/app/component/CategoryPaginationLink/CategoryPaginationLink.component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _CategoryPaginationLink_component__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/CategoryProductList/CategoryProductList.container.js":
/*!********************************************************************************!*\
  !*** ./src/app/component/CategoryProductList/CategoryProductList.container.js ***!
  \********************************************************************************/
/*! exports provided: ProductListDispatcher, mapStateToProps, mapDispatchToProps, _CategoryProductListContainer, CategoryProductListContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductListDispatcher", function() { return ProductListDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_CategoryProductListContainer", function() { return _CategoryProductListContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryProductListContainer", function() { return CategoryProductListContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _ProductList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ProductList */ "./src/app/component/ProductList/index.js");
/* harmony import */ var _store_ProductList_ProductList_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/ProductList/ProductList.action */ "./src/app/store/ProductList/ProductList.action.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _CategoryProductList_style__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CategoryProductList.style */ "./src/app/component/CategoryProductList/CategoryProductList.style.scss");
/* harmony import */ var _CategoryProductList_style__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_CategoryProductList_style__WEBPACK_IMPORTED_MODULE_6__);
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







var ProductListDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/ProductList/ProductList.dispatcher */ "./src/app/store/ProductList/ProductList.dispatcher.js"));
/** @namespace Component/CategoryProductList/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    pages: state.ProductListReducer.pages,
    isOffline: state.OfflineReducer.isOffline,
    isLoading: state.ProductListReducer.isLoading,
    isPageLoading: state.ProductListReducer.isPageLoading,
    totalItems: state.ProductListReducer.totalItems,
    totalPages: state.ProductListReducer.totalPages
  };
}, "Component/CategoryProductList/Container/mapStateToProps");
/** @namespace Component/CategoryProductList/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    requestProductList: function requestProductList(options) {
      return ProductListDispatcher.then(function (_ref) {
        var dispatcher = _ref.default;
        return dispatcher.handleData(dispatch, options);
      });
    },
    updateLoadStatus: function updateLoadStatus(isLoading) {
      return dispatch(Object(_store_ProductList_ProductList_action__WEBPACK_IMPORTED_MODULE_4__["updateLoadStatus"])(isLoading));
    }
  };
}, "Component/CategoryProductList/Container/mapDispatchToProps");
/** @namespace Component/CategoryProductList/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _CategoryProductListContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_CategoryProductListContainer, _Extensible);

  function _CategoryProductListContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _CategoryProductListContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_CategoryProductListContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      requestProductList: _this.requestProductList.bind(_assertThisInitialized(_this))
    });

    _defineProperty(_assertThisInitialized(_this), "containerProps", function () {
      return {
        isLoading: _this.getIsLoading(),
        isPreventRequest: _this.getIsPreventRequest(),
        mix: {
          block: 'CategoryProductList'
        }
      };
    });

    return _this;
  }

  _createClass(_CategoryProductListContainer, [{
    key: "getIsLoading",
    value: function getIsLoading() {
      var _this$props = this.props,
          filter = _this$props.filter,
          isLoading = _this$props.isLoading,
          isMatchingListFilter = _this$props.isMatchingListFilter;
      /**
       * In case the wrong category was passed down to the product list,
       * show the loading animation, it will soon change to proper category.
       */

      if (filter.categoryIds === -1) {
        return true;
      }

      if (!navigator.onLine) {
        return false;
      } // if the filter expected matches the last requested filter


      if (isMatchingListFilter) {
        return false;
      }

      return isLoading;
    }
  }, {
    key: "getIsPreventRequest",
    value: function getIsPreventRequest() {
      var _this$props2 = this.props,
          isMatchingListFilter = _this$props2.isMatchingListFilter,
          isMatchingInfoFilter = _this$props2.isMatchingInfoFilter;
      return isMatchingListFilter && isMatchingInfoFilter; // if filter match - prevent request
    }
  }, {
    key: "requestProductList",
    value: function requestProductList(options) {
      var requestProductList = this.props.requestProductList;
      requestProductList(options);
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _ProductList__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({}, this.props, this.containerFunctions, this.containerProps()))
      );
    }
  }]);

  return _CategoryProductListContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_CategoryProductListContainer, 'name', {
  value: 'CategoryProductListContainer'
});

var CategoryProductListContainer = middleware(_CategoryProductListContainer, "Component/CategoryProductList/Container");

_defineProperty(CategoryProductListContainer, "propTypes", {
  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  isMatchingListFilter: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  isMatchingInfoFilter: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  filter: _type_ProductList__WEBPACK_IMPORTED_MODULE_5__["FilterInputType"],
  requestProductList: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

_defineProperty(CategoryProductListContainer, "defaultProps", {
  isMatchingListFilter: false,
  isMatchingInfoFilter: false,
  filter: {}
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(CategoryProductListContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/CategoryProductList/CategoryProductList.style.scss":
/*!******************************************************************************!*\
  !*** ./src/app/component/CategoryProductList/CategoryProductList.style.scss ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291338734
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/CategoryProductList/index.js":
/*!********************************************************!*\
  !*** ./src/app/component/CategoryProductList/index.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CategoryProductList_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CategoryProductList.container */ "./src/app/component/CategoryProductList/CategoryProductList.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _CategoryProductList_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/CategorySort/CategorySort.component.js":
/*!******************************************************************!*\
  !*** ./src/app/component/CategorySort/CategorySort.component.js ***!
  \******************************************************************/
/*! exports provided: _CategorySort, CategorySort, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_CategorySort", function() { return _CategorySort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategorySort", function() { return CategorySort; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Field */ "./src/app/component/Field/index.js");
/* harmony import */ var _TextPlaceholder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../TextPlaceholder */ "./src/app/component/TextPlaceholder/index.js");
/* harmony import */ var _CategorySort_style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CategorySort.style */ "./src/app/component/CategorySort/CategorySort.style.scss");
/* harmony import */ var _CategorySort_style__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_CategorySort_style__WEBPACK_IMPORTED_MODULE_4__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

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





/**
 * Product Sort
 * @class ProductSort
 * @namespace Component/CategorySort/Component
 */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _CategorySort =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_CategorySort, _Extensible);

  function _CategorySort() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _CategorySort);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_CategorySort)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onChange", function (value) {
      var onSortChange = _this.props.onSortChange;

      var _value$split = value.split(' '),
          _value$split2 = _toArray(_value$split),
          direction = _value$split2[0],
          key = _value$split2.slice(1);

      onSortChange(direction, key);
    });

    return _this;
  }

  _createClass(_CategorySort, [{
    key: "renderPlaceholder",
    value: function renderPlaceholder() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "p", {
          block: "CategorySort",
          elem: "Placeholder"
        },
        /*#__PURE__*/
        _checkBEM(React, _TextPlaceholder__WEBPACK_IMPORTED_MODULE_3__["default"], {
          length: "short"
        }))
      );
    }
  }, {
    key: "renderSortField",
    value: function renderSortField() {
      var _this$props = this.props,
          sortKey = _this$props.sortKey,
          sortDirection = _this$props.sortDirection,
          selectOptions = _this$props.selectOptions,
          isMatchingInfoFilter = _this$props.isMatchingInfoFilter;

      if (!isMatchingInfoFilter) {
        return this.renderPlaceholder();
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, _Field__WEBPACK_IMPORTED_MODULE_2__["default"], {
          id: "category-sort",
          name: "category-sort",
          type: "select",
          label: __('SORT'),
          mix: {
            block: 'CategorySort',
            elem: 'Select'
          },
          selectOptions: selectOptions,
          value: "".concat(sortDirection, " ").concat(sortKey),
          onChange: this.onChange
        })
      );
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "CategorySort"
        }, this.renderSortField())
      );
    }
  }]);

  return _CategorySort;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_CategorySort, 'name', {
  value: 'CategorySort'
});

var CategorySort = middleware(_CategorySort, "Component/CategorySort/Component");

_defineProperty(CategorySort, "propTypes", {
  onSortChange: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  sortKey: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  sortDirection: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  selectOptions: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
    id: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number]),
    value: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number]),
    disabled: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
    label: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
  })).isRequired,
  isMatchingInfoFilter: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool
});

_defineProperty(CategorySort, "defaultProps", {
  isMatchingInfoFilter: false
});

/* harmony default export */ __webpack_exports__["default"] = (CategorySort);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/CategorySort/CategorySort.container.js":
/*!******************************************************************!*\
  !*** ./src/app/component/CategorySort/CategorySort.container.js ***!
  \******************************************************************/
/*! exports provided: _CategorySortContainer, CategorySortContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, __, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_CategorySortContainer", function() { return _CategorySortContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategorySortContainer", function() { return CategorySortContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CategorySort_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CategorySort.component */ "./src/app/component/CategorySort/CategorySort.component.js");
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



/** @namespace Component/CategorySort/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _CategorySortContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_CategorySortContainer, _Extensible);

  function _CategorySortContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _CategorySortContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_CategorySortContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerProps", function () {
      return {
        selectOptions: _this._prepareOptions()
      };
    });

    return _this;
  }

  _createClass(_CategorySortContainer, [{
    key: "_getLabel",
    value: function _getLabel(option) {
      var id = option.id,
          pureLabel = option.label; // eslint-disable-next-line fp/no-let

      var _pureLabel$split = pureLabel.split(' '),
          _pureLabel$split2 = _slicedToArray(_pureLabel$split, 1),
          label = _pureLabel$split2[0];

      label = label.charAt(0).toUpperCase() + label.slice(1);

      switch (id) {
        case 'name':
          return {
            asc: __('Name: A to Z', label),
            desc: __('Name: Z to A', label)
          };

        case 'position':
          return {
            asc: __('Best match')
          };

        case 'price':
          return {
            asc: __('%s: Low to High', label),
            desc: __('%s: High to Low', label)
          };

        default:
          return {
            asc: __('%s: Ascending', label),
            desc: __('%s: Descending', label)
          };
      }
    }
  }, {
    key: "_prepareOptions",
    value: function _prepareOptions() {
      var _this2 = this;

      var sortFields = this.props.sortFields;

      if (!sortFields) {
        return [];
      }

      var selectOptions = sortFields.reduce(function (acc, option) {
        var id = option.id;

        var label = _this2._getLabel(option);

        var asc = label.asc,
            desc = label.desc;

        if (asc) {
          acc.push({
            id: "ASC ".concat(id),
            name: id,
            value: "ASC ".concat(id),
            label: asc
          });
        }

        if (desc) {
          acc.push({
            id: "DESC ".concat(id),
            name: id,
            value: "DESC ".concat(id),
            label: desc
          });
        }

        return acc;
      }, []);
      return selectOptions;
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _CategorySort_component__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({}, this.props, this.containerProps()))
      );
    }
  }]);

  return _CategorySortContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_CategorySortContainer, 'name', {
  value: 'CategorySortContainer'
});

var CategorySortContainer = middleware(_CategorySortContainer, "Component/CategorySort/Container");

_defineProperty(CategorySortContainer, "propTypes", {
  sortFields: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
    id: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
    label: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
  }))])
});

_defineProperty(CategorySortContainer, "defaultProps", {
  sortFields: []
});

/* harmony default export */ __webpack_exports__["default"] = (CategorySortContainer);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/CategorySort/CategorySort.style.scss":
/*!****************************************************************!*\
  !*** ./src/app/component/CategorySort/CategorySort.style.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291339794
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/CategorySort/index.js":
/*!*************************************************!*\
  !*** ./src/app/component/CategorySort/index.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CategorySort_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CategorySort.container */ "./src/app/component/CategorySort/CategorySort.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _CategorySort_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/ExpandableContentShowMore/ExpandableContentShowMore.component.js":
/*!********************************************************************************************!*\
  !*** ./src/app/component/ExpandableContentShowMore/ExpandableContentShowMore.component.js ***!
  \********************************************************************************************/
/*! exports provided: _ExpandableContentShowMore, ExpandableContentShowMore, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ExpandableContentShowMore", function() { return _ExpandableContentShowMore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExpandableContentShowMore", function() { return ExpandableContentShowMore; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _ExpandableContentShowMore_style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ExpandableContentShowMore.style */ "./src/app/component/ExpandableContentShowMore/ExpandableContentShowMore.style.scss");
/* harmony import */ var _ExpandableContentShowMore_style__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ExpandableContentShowMore_style__WEBPACK_IMPORTED_MODULE_3__);
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




/** @namespace Component/ExpandableContentShowMore/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ExpandableContentShowMore =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ExpandableContentShowMore, _Extensible);

  function _ExpandableContentShowMore() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ExpandableContentShowMore);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ExpandableContentShowMore)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleShowAllButtonClick", function () {
      var isExpanding = _this.state.isExpanding;

      if (!isExpanding) {
        _this.setState(function (_ref) {
          var isOpen = _ref.isOpen;
          return {
            isOpen: !isOpen,
            isExpanding: true
          };
        });
      }
    });

    return _this;
  }

  _createClass(_ExpandableContentShowMore, [{
    key: "__construct",
    value: function __construct(props) {
      _get(_getPrototypeOf(_ExpandableContentShowMore.prototype), "__construct", this).call(this, props);

      this.ref =
      /*#__PURE__*/
      Object(react__WEBPACK_IMPORTED_MODULE_1__["createRef"])();
      var _this$props = this.props,
          showElemCount = _this$props.showElemCount,
          length = _this$props.children.length;
      this.expandableRef =
      /*#__PURE__*/
      Object(react__WEBPACK_IMPORTED_MODULE_1__["createRef"])();
      this.expandableContentHeight = 'auto';
      this.state = {
        isOpen: length > showElemCount,
        isExpanding: false
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var isOpen = this.state.isOpen;

      if (isOpen) {
        this.expandableContentHeight = this.expandableRef.current.getBoundingClientRect().height;
        this.setState({
          isOpen: false
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      var isExpanding = this.state.isExpanding;

      if (isExpanding) {
        var ONE_SECOND_IN_MS = 1000;
        var transitionDurationCSStoMS = window.getComputedStyle(this.expandableRef.current).getPropertyValue('transition-duration').slice(0, -1) * ONE_SECOND_IN_MS;
        setTimeout(function () {
          return _this2.setState({
            isExpanding: false
          });
        }, transitionDurationCSStoMS);
      }

      var length = this.props.children.length;
      var prevLength = prevProps.children.length;

      if (length !== prevLength) {
        this.getExpandableContentHeight();
      }
    }
  }, {
    key: "getExpandableContentHeight",
    value: function getExpandableContentHeight() {
      var _this3 = this;

      var isOpen = this.state.isOpen;
      var _this$props2 = this.props,
          showElemCount = _this$props2.showElemCount,
          length = _this$props2.children.length;

      if (isOpen && length <= showElemCount) {
        this.setState({
          isOpen: false
        });
        return;
      }

      this.expandableContentHeight = 'auto';
      this.setState({
        isOpen: true
      }, function () {
        _this3.expandableContentHeight = _this3.expandableRef.current.getBoundingClientRect().height;

        _this3.setState({
          isOpen: false
        });
      });
    }
  }, {
    key: "renderShowAllButton",
    value: function renderShowAllButton() {
      var _this$props3 = this.props,
          showElemCount = _this$props3.showElemCount,
          length = _this$props3.children.length;

      if (length <= showElemCount) {
        return null;
      }

      var isOpen = this.state.isOpen;
      var mods = isOpen ? {
        state: 'isOpen'
      } : {};
      return (
        /*#__PURE__*/
        _checkBEM(React, "button", {
          onClick: this.handleShowAllButtonClick,
          mix: {
            block: 'Button',
            mods: {
              likeLink: true
            }
          },
          block: "ExpandableContentShowMore",
          elem: "ShowAllButton",
          mods: mods
        }, isOpen ? __('Show less') : __('Show more'))
      );
    }
  }, {
    key: "renderExpandableChildren",
    value: function renderExpandableChildren() {
      var _this$state = this.state,
          isOpen = _this$state.isOpen,
          isExpanding = _this$state.isExpanding;
      var _this$props4 = this.props,
          children = _this$props4.children,
          showElemCount = _this$props4.showElemCount;
      var child = isOpen || isExpanding ? children.slice(showElemCount) : null;
      var style = {
        height: isOpen ? this.expandableContentHeight : 0
      };
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          ref: this.expandableRef,
          block: "ExpandableContentShowMore",
          elem: "ExpandableChildren",
          style: style
        }, child)
      );
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this$props5 = this.props,
          children = _this$props5.children,
          showElemCount = _this$props5.showElemCount;
      var child = children.slice(0, showElemCount);
      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null, child, this.renderExpandableChildren(), this.renderShowAllButton())
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props6 = this.props,
          children = _this$props6.children,
          isMobile = _this$props6.isMobile;

      if (isMobile) {
        return children;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ExpandableContentShowMore",
          ref: this.ref
        }, this.renderContent())
      );
    }
  }]);

  return _ExpandableContentShowMore;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ExpandableContentShowMore, 'name', {
  value: 'ExpandableContentShowMore'
});

var ExpandableContentShowMore = middleware(_ExpandableContentShowMore, "Component/ExpandableContentShowMore/Component");

_defineProperty(ExpandableContentShowMore, "propTypes", {
  showElemCount: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  children: _type_Common__WEBPACK_IMPORTED_MODULE_2__["ChildrenType"].isRequired,
  isMobile: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired
});

_defineProperty(ExpandableContentShowMore, "defaultProps", {
  showElemCount: 3
});

/* harmony default export */ __webpack_exports__["default"] = (ExpandableContentShowMore);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ExpandableContentShowMore/ExpandableContentShowMore.container.js":
/*!********************************************************************************************!*\
  !*** ./src/app/component/ExpandableContentShowMore/ExpandableContentShowMore.container.js ***!
  \********************************************************************************************/
/*! exports provided: mapStateToProps, mapDispatchToProps, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _ExpandableContentShowMore_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ExpandableContentShowMore.component */ "./src/app/component/ExpandableContentShowMore/ExpandableContentShowMore.component.js");
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


/** @namespace Component/ExpandableContentShowMore/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    isMobile: state.ConfigReducer.device.isMobile
  };
}, "Component/ExpandableContentShowMore/Container/mapStateToProps");
/** @namespace Component/ExpandableContentShowMore/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars

var mapDispatchToProps = middleware(function (dispatch) {
  return {};
}, "Component/ExpandableContentShowMore/Container/mapDispatchToProps");
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["connect"])(mapStateToProps, mapDispatchToProps)(_ExpandableContentShowMore_component__WEBPACK_IMPORTED_MODULE_1__["default"]));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ExpandableContentShowMore/ExpandableContentShowMore.style.scss":
/*!******************************************************************************************!*\
  !*** ./src/app/component/ExpandableContentShowMore/ExpandableContentShowMore.style.scss ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340740
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ExpandableContentShowMore/index.js":
/*!**************************************************************!*\
  !*** ./src/app/component/ExpandableContentShowMore/index.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ExpandableContentShowMore_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ExpandableContentShowMore.container */ "./src/app/component/ExpandableContentShowMore/ExpandableContentShowMore.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ExpandableContentShowMore_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/NewProducts/NewProducts.component.js":
/*!****************************************************************!*\
  !*** ./src/app/component/NewProducts/NewProducts.component.js ***!
  \****************************************************************/
/*! exports provided: _NewProducts, NewProducts, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_NewProducts", function() { return _NewProducts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewProducts", function() { return NewProducts; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ProductCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ProductCard */ "./src/app/component/ProductCard/index.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _util_CSS__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/CSS */ "./src/app/util/CSS/index.js");
/* harmony import */ var _NewProducts_style__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NewProducts.style */ "./src/app/component/NewProducts/NewProducts.style.scss");
/* harmony import */ var _NewProducts_style__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_NewProducts_style__WEBPACK_IMPORTED_MODULE_5__);
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






/** @namespace Component/NewProducts/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _NewProducts =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_NewProducts, _Extensible);

  function _NewProducts() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _NewProducts);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_NewProducts)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "newProductsRef",
    /*#__PURE__*/
    Object(react__WEBPACK_IMPORTED_MODULE_1__["createRef"])());

    return _this;
  }

  _createClass(_NewProducts, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setStyles();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.setStyles();
    }
  }, {
    key: "setStyles",
    value: function setStyles() {
      var productsPerPage = this.props.productsPerPage;
      _util_CSS__WEBPACK_IMPORTED_MODULE_4__["default"].setVariable(this.newProductsRef, 'new-products-per-page-count', productsPerPage);
    }
  }, {
    key: "render",
    value: function render() {
      var products = this.props.products;
      return (
        /*#__PURE__*/
        _checkBEM(React, "section", {
          block: "NewProducts",
          ref: this.newProductsRef
        },
        /*#__PURE__*/
        _checkBEM(React, "h3", null, __('New Products')),
        /*#__PURE__*/
        _checkBEM(React, "ul", {
          block: "NewProducts",
          elem: "Products"
        }, products.map(function (product, i) {
          return (
            /*#__PURE__*/
            _checkBEM(React, _ProductCard__WEBPACK_IMPORTED_MODULE_2__["default"], {
              key: product.id || i,
              product: product
            })
          );
        })))
      );
    }
  }]);

  return _NewProducts;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_NewProducts, 'name', {
  value: 'NewProducts'
});

var NewProducts = middleware(_NewProducts, "Component/NewProducts/Component");

_defineProperty(NewProducts, "propTypes", {
  products: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(_type_ProductList__WEBPACK_IMPORTED_MODULE_3__["ProductType"]),
  productsPerPage: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number
});

_defineProperty(NewProducts, "defaultProps", {
  products: Array.from({
    length: 4
  }, function () {
    return {};
  }),
  productsPerPage: 6
});

/* harmony default export */ __webpack_exports__["default"] = (NewProducts);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/NewProducts/NewProducts.container.js":
/*!****************************************************************!*\
  !*** ./src/app/component/NewProducts/NewProducts.container.js ***!
  \****************************************************************/
/*! exports provided: mapStateToProps, mapDispatchToProps, _NewProductsContainer, NewProductsContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_NewProductsContainer", function() { return _NewProductsContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewProductsContainer", function() { return NewProductsContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _query_ProductList_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../query/ProductList.query */ "./src/app/query/ProductList.query.js");
/* harmony import */ var _store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/Notification/Notification.action */ "./src/app/store/Notification/Notification.action.js");
/* harmony import */ var _util_Product__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../util/Product */ "./src/app/util/Product/index.js");
/* harmony import */ var _util_Query__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../util/Query */ "./src/app/util/Query/index.js");
/* harmony import */ var _util_Request__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../util/Request */ "./src/app/util/Request/index.js");
/* harmony import */ var _NewProducts_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./NewProducts.component */ "./src/app/component/NewProducts/NewProducts.component.js");
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









/** @namespace Component/NewProducts/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    timezone: state.ConfigReducer.timezone
  };
}, "Component/NewProducts/Container/mapStateToProps");
/** @namespace Component/NewProducts/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    showNotification: function showNotification(type, title, error) {
      return dispatch(Object(_store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_4__["showNotification"])(type, title, error));
    }
  };
}, "Component/NewProducts/Container/mapDispatchToProps");
/** @namespace Component/NewProducts/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _NewProductsContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_NewProductsContainer, _Extensible);

  function _NewProductsContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _NewProductsContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_NewProductsContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      products: undefined
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      return (
        /*#__PURE__*/
        _checkBEM(React, _NewProducts_component__WEBPACK_IMPORTED_MODULE_8__["default"], _extends({}, _this.props, _this.state))
      );
    });

    return _this;
  }

  _createClass(_NewProductsContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.requestProducts();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          category = _this$props.category,
          productsCount = _this$props.productsCount,
          cacheLifetime = _this$props.cacheLifetime,
          timezone = _this$props.timezone;
      var pCategory = prevProps.category,
          pProductsCount = prevProps.productsCount,
          pCacheLifetime = prevProps.cacheLifetime,
          pTimezone = prevProps.timezone;

      if (category !== pCategory || timezone !== pTimezone || productsCount !== pProductsCount || cacheLifetime !== pCacheLifetime) {
        this.requestProducts();
      }
    }
    /**
     * Calculates date for request in server locale and with ttl error
     *
     * @returns {Date}
     * @memberof NewProducts
     */

  }, {
    key: "getRequestDate",
    value: function getRequestDate() {
      var _this$props2 = this.props,
          cacheLifetime = _this$props2.cacheLifetime,
          timeZone = _this$props2.timezone;
      var milliInSeccond = 1000;
      var now = new Date();
      var serverNow = new Date(now.toLocaleString('en', {
        timeZone: timeZone
      }));
      var serverNowTime = serverNow.getTime();
      var ttl = cacheLifetime * milliInSeccond;
      var requestTime = serverNowTime - serverNowTime % ttl;
      var requestDate = new Date(requestTime);
      var timeOffset = 10;
      return requestDate.toISOString().slice(0, timeOffset);
    }
  }, {
    key: "requestProducts",
    value: function requestProducts() {
      var _this2 = this;

      var _this$props3 = this.props,
          timezone = _this$props3.timezone,
          categoryUrlPath = _this$props3.category,
          pageSize = _this$props3.productsCount,
          cacheLifetime = _this$props3.cacheLifetime,
          showNotification = _this$props3.showNotification;

      if (!timezone) {
        return;
      }

      var newToDate = this.getRequestDate();
      var options = {
        args: {
          filter: {
            categoryUrlPath: categoryUrlPath,
            newToDate: newToDate
          },
          currentPage: 1,
          pageSize: pageSize
        }
      };
      var query = [_query_ProductList_query__WEBPACK_IMPORTED_MODULE_3__["default"].getQuery(options)];
      Object(_util_Request__WEBPACK_IMPORTED_MODULE_7__["executeGet"])(Object(_util_Query__WEBPACK_IMPORTED_MODULE_6__["prepareQuery"])(query), 'NewProducts', cacheLifetime).then(
      /** @namespace Component/NewProducts/Container/executeGetThen */
      middleware(function (_ref) {
        var items = _ref.products.items;
        return _this2.setState({
          products: Object(_util_Product__WEBPACK_IMPORTED_MODULE_5__["getIndexedProducts"])(items)
        });
      }, "Component/NewProducts/Container/executeGetThen")).catch(
      /** @namespace Component/NewProducts/Container/executeGetThenCatch */
      middleware(function (e) {
        return showNotification('error', 'Error fetching NewProducts!', e);
      }, "Component/NewProducts/Container/executeGetThenCatch"));
    }
  }]);

  return _NewProductsContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_NewProductsContainer, 'name', {
  value: 'NewProductsContainer'
});

var NewProductsContainer = middleware(_NewProductsContainer, "Component/NewProducts/Container");

_defineProperty(NewProductsContainer, "propTypes", {
  category: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  cacheLifetime: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  productsCount: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  timezone: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  showNotification: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

_defineProperty(NewProductsContainer, "defaultProps", {
  category: '',
  productsCount: 10,
  cacheLifetime: 86400
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(NewProductsContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/NewProducts/NewProducts.style.scss":
/*!**************************************************************!*\
  !*** ./src/app/component/NewProducts/NewProducts.style.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340563
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/NewProducts/index.js":
/*!************************************************!*\
  !*** ./src/app/component/NewProducts/index.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewProducts_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewProducts.container */ "./src/app/component/NewProducts/NewProducts.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _NewProducts_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/ProductList/ProductList.component.js":
/*!****************************************************************!*\
  !*** ./src/app/component/ProductList/ProductList.component.js ***!
  \****************************************************************/
/*! exports provided: _ProductList, ProductList, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductList", function() { return _ProductList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductList", function() { return ProductList; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CategoryPagination__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CategoryPagination */ "./src/app/component/CategoryPagination/index.js");
/* harmony import */ var _ProductListPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ProductListPage */ "./src/app/component/ProductListPage/index.js");
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _type_Device__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../type/Device */ "./src/app/type/Device.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _ProductList_config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ProductList.config */ "./src/app/component/ProductList/ProductList.config.js");
/* harmony import */ var _ProductList_style__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ProductList.style */ "./src/app/component/ProductList/ProductList.style.scss");
/* harmony import */ var _ProductList_style__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_ProductList_style__WEBPACK_IMPORTED_MODULE_8__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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









/**
 * List of category products
 * @class ProductList
 * @namespace Component/ProductList/Component
 */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductList =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductList, _Extensible);

  function _ProductList() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ProductList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ProductList)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "nodes", {});

    _defineProperty(_assertThisInitialized(_this), "observedNodes", []);

    _defineProperty(_assertThisInitialized(_this), "pagesIntersecting", []);

    _defineProperty(_assertThisInitialized(_this), "renderProductPage", function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          _ref2$ = _ref2[1],
          items = _ref2$ === void 0 ? [] : _ref2$;

      var selectedFilters = _this.props.selectedFilters;
      var pageNumber = +key;
      return _this.renderPage({
        selectedFilters: selectedFilters,
        pageNumber: pageNumber,
        items: items,
        key: key,
        wrapperRef: function wrapperRef(node) {
          _this.nodes[pageNumber] = node;
        }
      });
    });

    return _this;
  }

  _createClass(_ProductList, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          isWidget = _this$props.isWidget,
          currentPage = _this$props.currentPage,
          device = _this$props.device;
      var prevCurrentPage = prevProps.currentPage; // Scroll up on page change, ignore widgets

      if (prevCurrentPage !== currentPage && !isWidget && !device.isMobile) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }

      var isInfiniteLoaderEnabled = this.props.isInfiniteLoaderEnabled;

      if (isInfiniteLoaderEnabled) {
        this.observePageChange();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.observer && this.observer.disconnect) {
        this.observer.disconnect();
      }

      this.observer = null;
    }
  }, {
    key: "observePageChange",
    value: function observePageChange() {
      var _this2 = this;

      var _this$props2 = this.props,
          updatePage = _this$props2.updatePage,
          isLoading = _this$props2.isLoading;

      if (isLoading) {
        this.pagesIntersecting = [];
      }

      if (!this.observer && 'IntersectionObserver' in window) {
        var threshold = this._getThreshold();

        this.observer = new IntersectionObserver(function (entries) {
          var currentPage = _this2.props.currentPage;
          entries.forEach(function (_ref3) {
            var target = _ref3.target,
                isIntersecting = _ref3.isIntersecting;
            var page = +Object.keys(_this2.nodes).find(function (node) {
              return _this2.nodes[node] === target;
            });

            var index = _this2.pagesIntersecting.indexOf(page);

            if (isIntersecting && index === -1) {
              _this2.pagesIntersecting.push(page);
            }

            if (!isIntersecting && index > -1) {
              _this2.pagesIntersecting.splice(index, 1);
            }
          });
          var minPage = Math.min.apply(Math, _toConsumableArray(_this2.pagesIntersecting));

          if (minPage < Infinity && minPage !== currentPage) {
            updatePage(minPage);
          }
        }, {
          rootMargin: '0px',
          threshold: threshold
        });
      }

      this.updateObserver();
    }
  }, {
    key: "updateObserver",
    value: function updateObserver() {
      var _this3 = this;

      var currentNodes = Object.values(this.nodes);

      if (!this.observer || currentNodes.length <= 0) {
        return;
      }

      currentNodes.forEach(function (node) {
        if (node && !_this3.observedNodes.includes(node)) {
          _this3.observer.observe(node);

          _this3.observedNodes.push(node);
        }
      });
      this.observedNodes = this.observedNodes.reduce(function (acc, node) {
        if (!currentNodes.includes(node)) {
          _this3.observer.unobserve(node);
        } else {
          acc.push(node);
        }

        return acc;
      }, []);
    }
  }, {
    key: "_getThreshold",
    value: function _getThreshold() {
      var hundredPercent = 100;
      return Array.from({
        length: hundredPercent / _ProductList_config__WEBPACK_IMPORTED_MODULE_7__["observerThreshold"] + 1
      }, function (_, i) {
        return i * (_ProductList_config__WEBPACK_IMPORTED_MODULE_7__["observerThreshold"] / hundredPercent);
      });
    }
  }, {
    key: "renderLoadButton",
    value: function renderLoadButton() {
      var _this$props3 = this.props,
          isShowLoading = _this$props3.isShowLoading,
          isInfiniteLoaderEnabled = _this$props3.isInfiniteLoaderEnabled,
          loadPrevPage = _this$props3.loadPrevPage;

      if (!isShowLoading || !isInfiniteLoaderEnabled) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductList",
          elem: "LoadButton",
          role: "button",
          tabIndex: "0",
          onKeyUp: loadPrevPage,
          onClick: loadPrevPage
        }, __('Load previous'))
      );
    }
  }, {
    key: "renderNoProducts",
    value: function renderNoProducts() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductList"
        },
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductList",
          elem: "ProductsMissing"
        },
        /*#__PURE__*/
        _checkBEM(React, "h2", null, __('We are sorry!')),
        /*#__PURE__*/
        _checkBEM(React, "h3", null, __('There were no products found matching your request.')),
        /*#__PURE__*/
        _checkBEM(React, "p", null, __('Please, try removing selected filters and try again!'))))
      );
    }
  }, {
    key: "renderPages",
    value: function renderPages() {
      var _this$props4 = this.props,
          pages = _this$props4.pages,
          isVisible = _this$props4.isVisible,
          isLoading = _this$props4.isLoading,
          isInfiniteLoaderEnabled = _this$props4.isInfiniteLoaderEnabled;

      if (isLoading) {
        return this.renderPage();
      }

      var pageRenders = Object.entries(pages).map(this.renderProductPage);

      if (isVisible && isInfiniteLoaderEnabled) {
        // add placeholders to the end of pages if needed
        var key = Math.max(Object.keys(pages)) + 1; // the key should match next page key

        pageRenders.push(this.renderPage({
          key: key
        }));
      }

      return pageRenders;
    }
  }, {
    key: "_processProps",
    value: function _processProps(props) {
      var isInfiniteLoaderEnabled = this.props.isInfiniteLoaderEnabled;

      if (isInfiniteLoaderEnabled) {
        return props;
      } // there must be no more then one page per screen
      // if the "isInfiniteLoaderEnabled" is false


      var key = props.key,
          restProps = _objectWithoutProperties(props, ["key"]);

      restProps.key = 0;
      return restProps;
    }
  }, {
    key: "renderPage",
    value: function renderPage() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _this$props5 = this.props,
          isInfiniteLoaderEnabled = _this$props5.isInfiniteLoaderEnabled,
          loadPage = _this$props5.loadPage,
          isLoading = _this$props5.isLoading,
          isVisible = _this$props5.isVisible,
          currentPage = _this$props5.currentPage,
          mix = _this$props5.mix;

      var newProps = this._processProps(props);

      return (
        /*#__PURE__*/
        _checkBEM(React, _ProductListPage__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({
          key: currentPage,
          isInfiniteLoaderEnabled: isInfiniteLoaderEnabled,
          updatePages: loadPage,
          isLoading: isLoading,
          isVisible: isVisible,
          mix: mix
        }, newProps))
      );
    }
  }, {
    key: "renderPagination",
    value: function renderPagination() {
      var _this$props6 = this.props,
          isLoading = _this$props6.isLoading,
          totalPages = _this$props6.totalPages,
          requestPage = _this$props6.requestPage,
          isPaginationEnabled = _this$props6.isPaginationEnabled;

      if (!isPaginationEnabled) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, _CategoryPagination__WEBPACK_IMPORTED_MODULE_2__["default"], {
          isLoading: isLoading,
          totalPages: totalPages,
          onPageSelect: requestPage
        })
      );
    }
  }, {
    key: "renderTitle",
    value: function renderTitle() {
      var title = this.props.title;

      if (!title) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "h2", null, title)
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props7 = this.props,
          totalPages = _this$props7.totalPages,
          isLoading = _this$props7.isLoading,
          mix = _this$props7.mix;

      if (!isLoading && totalPages === 0) {
        return this.renderNoProducts();
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductList",
          mods: {
            isLoading: isLoading
          },
          mix: mix
        }, this.renderPagination(), this.renderTitle(), this.renderLoadButton(), this.renderPages(), this.renderPagination())
      );
    }
  }]);

  return _ProductList;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductList, 'name', {
  value: 'ProductList'
});

var ProductList = middleware(_ProductList, "Component/ProductList/Component");

_defineProperty(ProductList, "propTypes", {
  device: _type_Device__WEBPACK_IMPORTED_MODULE_5__["DeviceType"].isRequired,
  title: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  pages: _type_ProductList__WEBPACK_IMPORTED_MODULE_6__["PagesType"].isRequired,
  selectedFilters: _type_ProductList__WEBPACK_IMPORTED_MODULE_6__["FilterType"],
  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  updatePage: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  totalPages: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  loadPage: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  requestPage: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  loadPrevPage: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  currentPage: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  isShowLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  isVisible: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  isInfiniteLoaderEnabled: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  isPaginationEnabled: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  isWidget: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  mix: _type_Common__WEBPACK_IMPORTED_MODULE_4__["MixType"]
});

_defineProperty(ProductList, "defaultProps", {
  mix: {},
  title: '',
  isInfiniteLoaderEnabled: false,
  isPaginationEnabled: false,
  selectedFilters: {},
  isLoading: false,
  updatePage: function updatePage() {},
  totalPages: 1,
  loadPage: function loadPage() {},
  requestPage: function requestPage() {},
  loadPrevPage: function loadPrevPage() {},
  currentPage: 1,
  isShowLoading: false,
  isVisible: true,
  isWidget: false
});

/* harmony default export */ __webpack_exports__["default"] = (ProductList);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductList/ProductList.config.js":
/*!*************************************************************!*\
  !*** ./src/app/component/ProductList/ProductList.config.js ***!
  \*************************************************************/
/*! exports provided: observerThreshold, INTERSECTION_RATIO */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "observerThreshold", function() { return observerThreshold; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INTERSECTION_RATIO", function() { return INTERSECTION_RATIO; });
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
var observerThreshold = 10;
var INTERSECTION_RATIO = 0.5;

/***/ }),

/***/ "./src/app/component/ProductList/ProductList.container.js":
/*!****************************************************************!*\
  !*** ./src/app/component/ProductList/ProductList.container.js ***!
  \****************************************************************/
/*! exports provided: mapStateToProps, mapDispatchToProps, _ProductListContainer, ProductListContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductListContainer", function() { return _ProductListContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductListContainer", function() { return ProductListContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var _store_ProductListInfo_ProductListInfo_dispatcher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/ProductListInfo/ProductListInfo.dispatcher */ "./src/app/store/ProductListInfo/ProductListInfo.dispatcher.js");
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _type_Device__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../type/Device */ "./src/app/type/Device.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _type_Router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../type/Router */ "./src/app/type/Router.js");
/* harmony import */ var _util_Url__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../util/Url */ "./src/app/util/Url/index.js");
/* harmony import */ var _ProductList_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ProductList.component */ "./src/app/component/ProductList/ProductList.component.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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











/** @namespace Component/ProductList/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    device: state.ConfigReducer.device
  };
}, "Component/ProductList/Container/mapStateToProps");
/** @namespace Component/ProductList/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    requestProductListInfo: function requestProductListInfo(options) {
      return _store_ProductListInfo_ProductListInfo_dispatcher__WEBPACK_IMPORTED_MODULE_4__["default"].handleData(dispatch, options);
    }
  };
}, "Component/ProductList/Container/mapDispatchToProps");
/** @namespace Component/ProductList/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductListContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductListContainer, _Extensible);

  function _ProductListContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ProductListContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ProductListContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      loadPrevPage: _this.loadPage.bind(_assertThisInitialized(_this), false),
      loadPage: _this.loadPage.bind(_assertThisInitialized(_this)),
      updatePage: _this.updatePage.bind(_assertThisInitialized(_this))
    });

    _defineProperty(_assertThisInitialized(_this), "state", {
      pagesCount: 1
    });

    _defineProperty(_assertThisInitialized(_this), "requestPage", function () {
      var currentPage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var isNext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var _this$props = _this.props,
          sort = _this$props.sort,
          search = _this$props.search,
          filter = _this$props.filter,
          pageSize = _this$props.pageSize,
          requestProductList = _this$props.requestProductList,
          requestProductListInfo = _this$props.requestProductListInfo,
          noAttributes = _this$props.noAttributes,
          noVariants = _this$props.noVariants;
      /**
       * In case the wrong category was passed down to the product list,
       * prevent it from being requested.
       */

      if (filter.categoryIds === -1) {
        return;
      }
      /**
       * Do not request page if there are no filters
       */


      if (!search && !_this.isEmptyFilter()) {
        return;
      } // TODO: product list requests filters alongside the page
      // TODO: sometimes product list is requested more then once
      // TODO: the product list should not request itself, when coming from PDP


      var options = {
        isNext: isNext,
        noAttributes: noAttributes,
        noVariants: noVariants,
        args: {
          sort: sort,
          filter: filter,
          search: search,
          pageSize: pageSize,
          currentPage: currentPage
        }
      };
      var infoOptions = {
        args: {
          filter: filter,
          search: search
        }
      };
      requestProductList(options);
      requestProductListInfo(infoOptions);
    });

    _defineProperty(_assertThisInitialized(_this), "containerProps", function () {
      return {
        currentPage: _this._getPageFromUrl(),
        isShowLoading: _this._isShowLoading(),
        isVisible: _this._isVisible(),
        requestPage: _this.requestPage,
        // disable this property to enable infinite scroll on desktop
        isInfiniteLoaderEnabled: _this._getIsInfiniteLoaderEnabled()
      };
    });

    return _this;
  }

  _createClass(_ProductListContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props2 = this.props,
          pages = _this$props2.pages,
          isPreventRequest = _this$props2.isPreventRequest;
      var pagesCount = this.state.pagesCount;
      var pagesLength = Object.keys(pages).length;

      if (pagesCount !== pagesLength) {
        this.setState({
          pagesCount: pagesLength
        });
      } // Is true when category is changed. This check prevents making new requests when navigating back to PLP from PDP


      if (!isPreventRequest) {
        this.requestPage(this._getPageFromUrl());
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props3 = this.props,
          sort = _this$props3.sort,
          search = _this$props3.search,
          filter = _this$props3.filter;
      var prevSort = prevProps.sort,
          prevSearch = prevProps.search,
          prevFilter = prevProps.filter;
      var pages = this.props.pages;
      var pagesCount = this.state.pagesCount;
      var pagesLength = Object.keys(pages).length;

      if (pagesCount !== pagesLength) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          pagesCount: pagesLength
        });
      }

      if (search !== prevSearch || JSON.stringify(sort) !== JSON.stringify(prevSort) || JSON.stringify(filter) !== JSON.stringify(prevFilter)) {
        this.requestPage(this._getPageFromUrl());
      }
    }
  }, {
    key: "isEmptyFilter",
    value: function isEmptyFilter() {
      var filter = this.props.filter;
      var validFilters = Object.entries(filter).filter(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        switch (key) {
          case 'priceRange':
            return value.min > 0 || value.max > 0;

          case 'customFilters':
            return Object.keys(value).length > 0;

          case 'categoryIds':
          default:
            return true;
        }
      });
      /**
       * If there is more then one valid filter, filters are not empty.
       */

      return validFilters.length > 0;
    }
  }, {
    key: "_getIsInfiniteLoaderEnabled",
    value: function _getIsInfiniteLoaderEnabled() {
      // disable infinite scroll on mobile
      var _this$props4 = this.props,
          isInfiniteLoaderEnabled = _this$props4.isInfiniteLoaderEnabled,
          device = _this$props4.device; // allow scroll and mobile

      if (device.isMobile) {
        return isInfiniteLoaderEnabled;
      }

      return false;
    }
  }, {
    key: "_getPageFromUrl",
    value: function _getPageFromUrl() {
      var location = this.props.location;
      return +(Object(_util_Url__WEBPACK_IMPORTED_MODULE_9__["getQueryParam"])('page', location) || 1);
    }
  }, {
    key: "_getPagesBounds",
    value: function _getPagesBounds() {
      var _this$props5 = this.props,
          pages = _this$props5.pages,
          totalItems = _this$props5.totalItems,
          pageSize = _this$props5.pageSize;
      var keys = Object.keys(pages);
      return {
        maxPage: Math.max.apply(Math, _toConsumableArray(keys)),
        minPage: Math.min.apply(Math, _toConsumableArray(keys)),
        totalPages: Math.ceil(totalItems / pageSize),
        loadedPagesCount: keys.length
      };
    }
  }, {
    key: "_isShowLoading",
    value: function _isShowLoading() {
      var isLoading = this.props.isLoading;

      var _this$_getPagesBounds = this._getPagesBounds(),
          minPage = _this$_getPagesBounds.minPage;

      return minPage > 1 && !isLoading;
    }
  }, {
    key: "_isVisible",
    value: function _isVisible() {
      var _this$_getPagesBounds2 = this._getPagesBounds(),
          maxPage = _this$_getPagesBounds2.maxPage,
          totalPages = _this$_getPagesBounds2.totalPages;

      return maxPage < totalPages;
    }
  }, {
    key: "loadPage",
    value: function loadPage() {
      var next = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var pagesCount = this.state.pagesCount;
      var isPageLoading = this.props.isPageLoading;

      var _this$_getPagesBounds3 = this._getPagesBounds(),
          minPage = _this$_getPagesBounds3.minPage,
          maxPage = _this$_getPagesBounds3.maxPage,
          totalPages = _this$_getPagesBounds3.totalPages,
          loadedPagesCount = _this$_getPagesBounds3.loadedPagesCount;

      var isUpdatable = totalPages > 0 && pagesCount === loadedPagesCount;
      var shouldUpdateList = next ? maxPage < totalPages : minPage > 1;

      if (isUpdatable && shouldUpdateList && !isPageLoading) {
        this.setState({
          pagesCount: pagesCount + 1
        });
        this.requestPage(next ? maxPage + 1 : minPage - 1, true);
      }
    }
  }, {
    key: "updatePage",
    value: function updatePage(pageNumber) {
      var _this$props6 = this.props,
          location = _this$props6.location,
          history = _this$props6.history;
      Object(_util_Url__WEBPACK_IMPORTED_MODULE_9__["setQueryParams"])({
        page: pageNumber === 1 ? '' : pageNumber
      }, location, history);
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _ProductList_component__WEBPACK_IMPORTED_MODULE_10__["default"], _extends({}, this.props, this.containerFunctions, this.containerProps()))
      );
    }
  }]);

  return _ProductListContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductListContainer, 'name', {
  value: 'ProductListContainer'
});

var ProductListContainer = middleware(_ProductListContainer, "Component/ProductList/Container");

_defineProperty(ProductListContainer, "propTypes", {
  history: _type_Common__WEBPACK_IMPORTED_MODULE_5__["HistoryType"].isRequired,
  location: _type_Router__WEBPACK_IMPORTED_MODULE_8__["LocationType"].isRequired,
  pages: _type_ProductList__WEBPACK_IMPORTED_MODULE_7__["PagesType"].isRequired,
  pageSize: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  isPageLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  totalItems: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number.isRequired,
  requestProductList: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  requestProductListInfo: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  selectedFilters: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape),
  isPreventRequest: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  isInfiniteLoaderEnabled: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  isPaginationEnabled: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  filter: _type_ProductList__WEBPACK_IMPORTED_MODULE_7__["FilterInputType"],
  search: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  sort: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string),
  noAttributes: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  noVariants: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  isWidget: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  device: _type_Device__WEBPACK_IMPORTED_MODULE_6__["DeviceType"].isRequired
});

_defineProperty(ProductListContainer, "defaultProps", {
  pageSize: 24,
  filter: {},
  search: '',
  selectedFilters: {},
  sort: undefined,
  isPreventRequest: false,
  isPaginationEnabled: true,
  isInfiniteLoaderEnabled: true,
  isPageLoading: false,
  noAttributes: false,
  noVariants: false,
  isWidget: false
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["withRouter"])(Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(ProductListContainer)));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/ProductList/ProductList.style.scss":
/*!**************************************************************!*\
  !*** ./src/app/component/ProductList/ProductList.style.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340264
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ProductList/index.js":
/*!************************************************!*\
  !*** ./src/app/component/ProductList/index.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProductList_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductList.container */ "./src/app/component/ProductList/ProductList.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ProductList_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/ProductListPage/ProductListPage.component.js":
/*!************************************************************************!*\
  !*** ./src/app/component/ProductListPage/ProductListPage.component.js ***!
  \************************************************************************/
/*! exports provided: _ProductListPage, ProductListPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductListPage", function() { return _ProductListPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductListPage", function() { return ProductListPage; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var _ProductCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ProductCard */ "./src/app/component/ProductCard/index.js");
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _ProductListPage_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ProductListPage.config */ "./src/app/component/ProductListPage/ProductListPage.config.js");
/* harmony import */ var _ProductListPage_style__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ProductListPage.style */ "./src/app/component/ProductListPage/ProductListPage.style.scss");
/* harmony import */ var _ProductListPage_style__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_ProductListPage_style__WEBPACK_IMPORTED_MODULE_7__);
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








/**
 * Placeholder for List of category product
 * @namespace Component/ProductListPage/Component
 * @class ProductListPage
 */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductListPage =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductListPage, _Extensible);

  function _ProductListPage() {
    _classCallCheck(this, _ProductListPage);

    return _possibleConstructorReturn(this, _getPrototypeOf(_ProductListPage).apply(this, arguments));
  }

  _createClass(_ProductListPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.startObserving();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.startObserving();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.stopObserving();
    }
  }, {
    key: "startObserving",
    value: function startObserving() {
      var _this = this;

      var _this$props = this.props,
          items = _this$props.items,
          updatePages = _this$props.updatePages,
          isInfiniteLoaderEnabled = _this$props.isInfiniteLoaderEnabled;

      if (!isInfiniteLoaderEnabled || items.length) {
        return;
      }

      if (this.node && !this.observer && 'IntersectionObserver' in window) {
        var options = {
          rootMargin: '0px',
          threshold: 0.1
        };
        this.observer = new IntersectionObserver(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 1),
              intersectionRatio = _ref2[0].intersectionRatio;

          var _this$props2 = _this.props,
              items = _this$props2.items,
              isLoading = _this$props2.isLoading; // must not be a product items list, and must not be loading

          if (intersectionRatio > 0 && !items.length && !isLoading) {
            _this.stopObserving();

            updatePages();
          }
        }, options);
        this.observer.observe(this.node);
      }
    }
  }, {
    key: "stopObserving",
    value: function stopObserving() {
      if (this.observer) {
        if (this.observer.unobserve && this.node) {
          this.observer.unobserve(this.node);
        }

        if (this.observer.disconnect) {
          this.observer.disconnect();
        }

        this.observer = null;
      }
    }
  }, {
    key: "renderPlaceholders",
    value: function renderPlaceholders() {
      var numberOfPlaceholders = this.props.numberOfPlaceholders;
      return Array.from({
        length: numberOfPlaceholders
      }, function (_, i) {
        return (
          /*#__PURE__*/
          _checkBEM(React, _ProductCard__WEBPACK_IMPORTED_MODULE_3__["default"], {
            key: i,
            product: {}
          })
        );
      });
    }
  }, {
    key: "getPlaceholderRef",
    value: function getPlaceholderRef() {
      var _this2 = this;

      var isVisible = this.props.isVisible;

      if (!isVisible) {
        return undefined;
      }

      return function (node) {
        _this2.node = node;
      };
    }
  }, {
    key: "renderPageItems",
    value: function renderPageItems() {
      var _this$props3 = this.props,
          items = _this$props3.items,
          selectedFilters = _this$props3.selectedFilters;
      return items.map(function (product, i) {
        return (
          /*#__PURE__*/
          _checkBEM(React, _ProductCard__WEBPACK_IMPORTED_MODULE_3__["default"], {
            product: product // eslint-disable-next-line react/no-array-index-key
            ,
            key: i,
            selectedFilters: selectedFilters
          })
        );
      });
    }
  }, {
    key: "renderPlaceholderItems",
    value: function renderPlaceholderItems() {
      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null,
        /*#__PURE__*/
        _checkBEM(React, "li", {
          block: "ProductListPage",
          elem: "Offset",
          ref: this.getPlaceholderRef()
        }), this.renderPlaceholders())
      );
    }
  }, {
    key: "renderItems",
    value: function renderItems() {
      var _this$props4 = this.props,
          items = _this$props4.items,
          isLoading = _this$props4.isLoading;

      if (!items.length || isLoading) {
        return this.renderPlaceholderItems();
      }

      return this.renderPageItems();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          pageNumber = _this$props5.pageNumber,
          wrapperRef = _this$props5.wrapperRef,
          mix = _this$props5.mix;
      return (
        /*#__PURE__*/
        _checkBEM(React, "ul", {
          block: "ProductListPage",
          mix: _objectSpread2(_objectSpread2({}, mix), {}, {
            elem: 'Page'
          }),
          key: pageNumber,
          ref: wrapperRef
        }, this.renderItems())
      );
    }
  }]);

  return _ProductListPage;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductListPage, 'name', {
  value: 'ProductListPage'
});

var ProductListPage = middleware(_ProductListPage, "Component/ProductListPage/Component");

_defineProperty(ProductListPage, "propTypes", {
  isInfiniteLoaderEnabled: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  isVisible: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  updatePages: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  numberOfPlaceholders: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  selectedFilters: _type_ProductList__WEBPACK_IMPORTED_MODULE_5__["FilterType"],
  wrapperRef: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  pageNumber: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  items: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(_type_ProductList__WEBPACK_IMPORTED_MODULE_5__["ProductType"]),
  mix: _type_Common__WEBPACK_IMPORTED_MODULE_4__["MixType"]
});

_defineProperty(ProductListPage, "defaultProps", {
  numberOfPlaceholders: _ProductListPage_config__WEBPACK_IMPORTED_MODULE_6__["DEFAULT_PLACEHOLDER_COUNT"],
  wrapperRef: function wrapperRef() {},
  selectedFilters: {},
  pageNumber: null,
  items: [],
  mix: {}
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["withRouter"])(ProductListPage));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductListPage/ProductListPage.config.js":
/*!*********************************************************************!*\
  !*** ./src/app/component/ProductListPage/ProductListPage.config.js ***!
  \*********************************************************************/
/*! exports provided: DEFAULT_PLACEHOLDER_COUNT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_PLACEHOLDER_COUNT", function() { return DEFAULT_PLACEHOLDER_COUNT; });
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
var DEFAULT_PLACEHOLDER_COUNT = 8;

/***/ }),

/***/ "./src/app/component/ProductListPage/ProductListPage.style.scss":
/*!**********************************************************************!*\
  !*** ./src/app/component/ProductListPage/ProductListPage.style.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340621
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ProductListPage/index.js":
/*!****************************************************!*\
  !*** ./src/app/component/ProductListPage/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProductListPage_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductListPage.component */ "./src/app/component/ProductListPage/ProductListPage.component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ProductListPage_component__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/ProductListWidget/ProductListWidget.container.js":
/*!****************************************************************************!*\
  !*** ./src/app/component/ProductListWidget/ProductListWidget.container.js ***!
  \****************************************************************************/
/*! exports provided: mapDispatchToProps, _ProductListWidgetContainer, ProductListWidgetContainer, mapStateToProps, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductListWidgetContainer", function() { return _ProductListWidgetContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductListWidgetContainer", function() { return ProductListWidgetContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _ProductList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ProductList */ "./src/app/component/ProductList/index.js");
/* harmony import */ var _query_ProductList_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../query/ProductList.query */ "./src/app/query/ProductList.query.js");
/* harmony import */ var _store_NoMatch_NoMatch_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/NoMatch/NoMatch.action */ "./src/app/store/NoMatch/NoMatch.action.js");
/* harmony import */ var _store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store/Notification/Notification.action */ "./src/app/store/Notification/Notification.action.js");
/* harmony import */ var _util_Product__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../util/Product */ "./src/app/util/Product/index.js");
/* harmony import */ var _util_Request_DataContainer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../util/Request/DataContainer */ "./src/app/util/Request/DataContainer.js");
/* harmony import */ var _ProductListWidget_style__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ProductListWidget.style */ "./src/app/component/ProductListWidget/ProductListWidget.style.scss");
/* harmony import */ var _ProductListWidget_style__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_ProductListWidget_style__WEBPACK_IMPORTED_MODULE_8__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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









/** @namespace Component/ProductListWidget/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    updateNoMatch: _store_NoMatch_NoMatch_action__WEBPACK_IMPORTED_MODULE_4__["updateNoMatch"],
    showNotification: _store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_5__["showNotification"]
  };
}, "Component/ProductListWidget/Container/mapDispatchToProps");
/** @namespace Component/ProductListWidget/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductListWidgetContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductListWidgetContainer, _Extensible);

  function _ProductListWidgetContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ProductListWidgetContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ProductListWidgetContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      pages: {},
      totalItems: 0,
      totalPages: 0,
      isLoading: true
    });

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      requestProductList: _this.requestProductList.bind(_assertThisInitialized(_this)),
      updateLoadStatus: _this.updateLoadStatus.bind(_assertThisInitialized(_this)),
      getIsNewCategory: _this.getIsNewCategory.bind(_assertThisInitialized(_this))
    });

    _defineProperty(_assertThisInitialized(_this), "onError", _this.onError.bind(_assertThisInitialized(_this)));

    _defineProperty(_assertThisInitialized(_this), "appendPage", _this.appendPage.bind(_assertThisInitialized(_this)));

    _defineProperty(_assertThisInitialized(_this), "updateProductListItems", _this.updateProductListItems.bind(_assertThisInitialized(_this)));

    _defineProperty(_assertThisInitialized(_this), "dataModelName", 'ProductListWidget');

    return _this;
  }

  _createClass(_ProductListWidgetContainer, [{
    key: "onError",
    value: function onError(error) {
      var _this$props = this.props,
          showNotification = _this$props.showNotification,
          updateNoMatch = _this$props.updateNoMatch;
      showNotification('error', 'Error fetching Product List!', error);
      updateNoMatch(true);
    }
  }, {
    key: "getIsNewCategory",
    value: function getIsNewCategory() {
      return true;
    }
  }, {
    key: "appendPage",
    value: function appendPage(data) {
      var showPager = this.props.showPager;
      var pages = this.state.pages;
      var _data$products = data.products;
      _data$products = _data$products === void 0 ? {} : _data$products;
      var items = _data$products.items,
          _data$products$page_i = _data$products.page_info;
      _data$products$page_i = _data$products$page_i === void 0 ? {} : _data$products$page_i;
      var current_page = _data$products$page_i.current_page;

      if (showPager === 0) {
        return;
      }

      this.setState({
        pages: _objectSpread2(_objectSpread2({}, pages), {}, _defineProperty({}, current_page, Object(_util_Product__WEBPACK_IMPORTED_MODULE_6__["getIndexedProducts"])(items)))
      });
    }
  }, {
    key: "updateProductListItems",
    value: function updateProductListItems(data) {
      var _this$props2 = this.props,
          productsCount = _this$props2.productsCount,
          productsPerPage = _this$props2.productsPerPage;
      var _data$products2 = data.products;
      _data$products2 = _data$products2 === void 0 ? {} : _data$products2;
      var items = _data$products2.items,
          totalItems = _data$products2.total_count,
          _data$products2$page_ = _data$products2.page_info;
      _data$products2$page_ = _data$products2$page_ === void 0 ? {} : _data$products2$page_;
      var current_page = _data$products2$page_.current_page;
      var totalPages = Math.ceil(productsCount / productsPerPage);
      this.setState({
        isLoading: false,
        totalItems: totalItems,
        totalPages: totalPages,
        pages: _defineProperty({}, current_page, Object(_util_Product__WEBPACK_IMPORTED_MODULE_6__["getIndexedProducts"])(items))
      });
    }
  }, {
    key: "updateLoadStatus",
    value: function updateLoadStatus(isLoading) {
      this.setState({
        isLoading: isLoading
      });
    }
  }, {
    key: "requestProductList",
    value: function requestProductList(options) {
      var isNext = options.isNext;

      if (!isNext) {
        this.updateLoadStatus(true);
      }

      this.fetchData([_query_ProductList_query__WEBPACK_IMPORTED_MODULE_3__["default"].getQuery(options)], isNext ? this.appendPage : this.updateProductListItems, this.onError);
    }
  }, {
    key: "adaptProps",
    value: function adaptProps() {
      var _this$props3 = this.props,
          showPager = _this$props3.showPager,
          productsCount = _this$props3.productsCount,
          productsPerPage = _this$props3.productsPerPage,
          conditions = _this$props3.conditionsEncoded;
      return {
        filter: {
          conditions: conditions
        },
        pageSize: showPager ? productsPerPage : productsCount,
        isPaginationEnabled: !!showPager
      };
    }
  }, {
    key: "render",
    value: function render() {
      var adaptedProps = this.adaptProps();
      return (
        /*#__PURE__*/
        _checkBEM(React, _ProductList__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({}, this.props, this.state, adaptedProps, this.containerFunctions, {
          isInfiniteLoaderEnabled: false,
          numberOfPlaceholders: 6,
          mix: {
            block: 'ProductListWidget'
          },
          isWidget: true
        }))
      );
    }
  }]);

  return _ProductListWidgetContainer;
}(Extensible(_util_Request_DataContainer__WEBPACK_IMPORTED_MODULE_7__["default"]));
/** @namespace Component/ProductListWidget/Container/mapStateToProps */
// eslint-disable-next-line no-unused-vars

Object.defineProperty(_ProductListWidgetContainer, 'name', {
  value: 'ProductListWidgetContainer'
});

var ProductListWidgetContainer = middleware(_ProductListWidgetContainer, "Component/ProductListWidget/Container");

_defineProperty(ProductListWidgetContainer, "propTypes", {
  showPager: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  productsCount: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  productsPerPage: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  conditionsEncoded: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  updateNoMatch: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  showNotification: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

_defineProperty(ProductListWidgetContainer, "defaultProps", {
  showPager: 0,
  productsCount: 10,
  productsPerPage: 5,
  conditionsEncoded: null
});

var mapStateToProps = middleware(function (state) {
  return {};
}, "Component/ProductListWidget/Container/mapStateToProps");
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(ProductListWidgetContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/ProductListWidget/ProductListWidget.style.scss":
/*!**************************************************************************!*\
  !*** ./src/app/component/ProductListWidget/ProductListWidget.style.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340465
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ProductListWidget/index.js":
/*!******************************************************!*\
  !*** ./src/app/component/ProductListWidget/index.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProductListWidget_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductListWidget.container */ "./src/app/component/ProductListWidget/ProductListWidget.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ProductListWidget_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/RecentlyViewedWidget/RecentlyViewedWidget.component.js":
/*!**********************************************************************************!*\
  !*** ./src/app/component/RecentlyViewedWidget/RecentlyViewedWidget.component.js ***!
  \**********************************************************************************/
/*! exports provided: _RecentlyViewedWidget, RecentlyViewedWidget, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, PureComponent, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_RecentlyViewedWidget", function() { return _RecentlyViewedWidget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecentlyViewedWidget", function() { return RecentlyViewedWidget; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ProductCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ProductCard */ "./src/app/component/ProductCard/index.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _RecentlyViewedWidget_style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RecentlyViewedWidget.style */ "./src/app/component/RecentlyViewedWidget/RecentlyViewedWidget.style.scss");
/* harmony import */ var _RecentlyViewedWidget_style__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_RecentlyViewedWidget_style__WEBPACK_IMPORTED_MODULE_4__);
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





/** @namespace Component/RecentlyViewedWidget/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _RecentlyViewedWidget =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_RecentlyViewedWidget, _Extensible);

  function _RecentlyViewedWidget() {
    _classCallCheck(this, _RecentlyViewedWidget);

    return _possibleConstructorReturn(this, _getPrototypeOf(_RecentlyViewedWidget).apply(this, arguments));
  }

  _createClass(_RecentlyViewedWidget, [{
    key: "renderProducts",
    value: function renderProducts(products) {
      var _this = this;

      var pageSize = this.props.pageSize;
      return (
        /*#__PURE__*/
        _checkBEM(react__WEBPACK_IMPORTED_MODULE_1___default.a, "ul", {
          block: "RecentlyViewedWidget",
          elem: "Page"
        }, products.slice(0, pageSize).map(function (product) {
          return _this.renderProductCard(product);
        }))
      );
    }
  }, {
    key: "renderProductCard",
    value: function renderProductCard(product) {
      var id = product.id,
          selectedFilters = product.selectedFilters;
      return (
        /*#__PURE__*/
        _checkBEM(react__WEBPACK_IMPORTED_MODULE_1___default.a, _ProductCard__WEBPACK_IMPORTED_MODULE_2__["default"], {
          selectedFilters: selectedFilters,
          product: product,
          key: id
        })
      );
    }
  }, {
    key: "render",
    value: function render() {
      var products = this.props.products;

      if (!products.length) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(react__WEBPACK_IMPORTED_MODULE_1___default.a, "div", {
          block: "RecentlyViewedWidget"
        },
        /*#__PURE__*/
        _checkBEM(react__WEBPACK_IMPORTED_MODULE_1___default.a, "h3", null, __('Recently Viewed Products')), this.renderProducts(products))
      );
    }
  }]);

  return _RecentlyViewedWidget;
}(Extensible(PureComponent));
Object.defineProperty(_RecentlyViewedWidget, 'name', {
  value: 'RecentlyViewedWidget'
});

var RecentlyViewedWidget = middleware(_RecentlyViewedWidget, "Component/RecentlyViewedWidget/Component");

_defineProperty(RecentlyViewedWidget, "propTypes", {
  pageSize: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  products: _type_ProductList__WEBPACK_IMPORTED_MODULE_3__["ItemsType"].isRequired
});

_defineProperty(RecentlyViewedWidget, "defaultProps", {
  pageSize: 6
});

/* harmony default export */ __webpack_exports__["default"] = (RecentlyViewedWidget);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")["PureComponent"], __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/RecentlyViewedWidget/RecentlyViewedWidget.container.js":
/*!**********************************************************************************!*\
  !*** ./src/app/component/RecentlyViewedWidget/RecentlyViewedWidget.container.js ***!
  \**********************************************************************************/
/*! exports provided: mapStateToProps, mapDispatchToProps, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _RecentlyViewedWidget_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RecentlyViewedWidget.component */ "./src/app/component/RecentlyViewedWidget/RecentlyViewedWidget.component.js");
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


/** @namespace Component/RecentlyViewedWidget/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    products: state.RecentlyViewedProductsReducer.recentlyViewedProducts
  };
}, "Component/RecentlyViewedWidget/Container/mapStateToProps");
/** @namespace Component/Slider/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars

var mapDispatchToProps = middleware(function (dispatch) {
  return {};
}, "Component/Slider/Container/mapDispatchToProps");
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["connect"])(mapStateToProps, mapDispatchToProps)(_RecentlyViewedWidget_component__WEBPACK_IMPORTED_MODULE_1__["default"]));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/RecentlyViewedWidget/RecentlyViewedWidget.style.scss":
/*!********************************************************************************!*\
  !*** ./src/app/component/RecentlyViewedWidget/RecentlyViewedWidget.style.scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340503
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/RecentlyViewedWidget/index.js":
/*!*********************************************************!*\
  !*** ./src/app/component/RecentlyViewedWidget/index.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RecentlyViewedWidget_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RecentlyViewedWidget.container */ "./src/app/component/RecentlyViewedWidget/RecentlyViewedWidget.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _RecentlyViewedWidget_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/ResetButton/ResetButton.component.js":
/*!****************************************************************!*\
  !*** ./src/app/component/ResetButton/ResetButton.component.js ***!
  \****************************************************************/
/*! exports provided: _ResetButton, ResetButton, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ResetButton", function() { return _ResetButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetButton", function() { return ResetButton; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _ResetButton_style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ResetButton.style */ "./src/app/component/ResetButton/ResetButton.style.scss");
/* harmony import */ var _ResetButton_style__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ResetButton_style__WEBPACK_IMPORTED_MODULE_3__);
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




/** @namespace Component/ResetButton/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ResetButton =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ResetButton, _Extensible);

  function _ResetButton() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ResetButton);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ResetButton)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onClick", function () {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          resetFilters = _this$props.resetFilters;
      onClick();
      resetFilters();
    });

    return _this;
  }

  _createClass(_ResetButton, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          mix = _this$props2.mix,
          isContentFiltered = _this$props2.isContentFiltered;

      if (!isContentFiltered) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ResetButton",
          mix: mix
        },
        /*#__PURE__*/
        _checkBEM(React, "button", {
          onClick: this.onClick,
          block: "ResetButton",
          elem: "Button",
          mix: {
            block: 'Button',
            mods: {
              isHollow: true
            }
          }
        }, __('Reset')))
      );
    }
  }]);

  return _ResetButton;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ResetButton, 'name', {
  value: 'ResetButton'
});

var ResetButton = middleware(_ResetButton, "Component/ResetButton/Component");

_defineProperty(ResetButton, "propTypes", {
  mix: _type_Common__WEBPACK_IMPORTED_MODULE_2__["MixType"],
  resetFilters: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  isContentFiltered: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired
});

_defineProperty(ResetButton, "defaultProps", {
  mix: {}
});

/* harmony default export */ __webpack_exports__["default"] = (ResetButton);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ResetButton/ResetButton.container.js":
/*!****************************************************************!*\
  !*** ./src/app/component/ResetButton/ResetButton.container.js ***!
  \****************************************************************/
/*! exports provided: _ResetButtonContainer, ResetButtonContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ResetButtonContainer", function() { return _ResetButtonContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetButtonContainer", function() { return ResetButtonContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _util_Url__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/Url */ "./src/app/util/Url/index.js");
/* harmony import */ var _ResetButton_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ResetButton.component */ "./src/app/component/ResetButton/ResetButton.component.js");
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





/** @namespace Component/ResetButton/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ResetButtonContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ResetButtonContainer, _Extensible);

  function _ResetButtonContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ResetButtonContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ResetButtonContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerProps", function () {
      return {
        isContentFiltered: _this.isContentFiltered()
      };
    });

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", function () {
      return {
        resetFilters: _this.resetFilters
      };
    });

    _defineProperty(_assertThisInitialized(_this), "resetFilters", function () {
      var _this$props = _this.props,
          location = _this$props.location,
          history = _this$props.history;
      Object(_util_Url__WEBPACK_IMPORTED_MODULE_3__["setQueryParams"])({
        customFilters: '',
        priceMin: '',
        priceMax: '',
        page: ''
      }, location, history);
    });

    return _this;
  }

  _createClass(_ResetButtonContainer, [{
    key: "isContentFiltered",
    value: function isContentFiltered() {
      var _this$urlStringToObje = this.urlStringToObject(),
          customFilters = _this$urlStringToObje.customFilters,
          priceMin = _this$urlStringToObje.priceMin,
          priceMax = _this$urlStringToObje.priceMax;

      return !!(customFilters || priceMin || priceMax);
    }
  }, {
    key: "urlStringToObject",
    value: function urlStringToObject() {
      var _this$props$location$ = this.props.location.search,
          search = _this$props$location$ === void 0 ? '' : _this$props$location$;
      return search.substr(1).split('&').reduce(function (acc, part) {
        var _part$split = part.split('='),
            _part$split2 = _slicedToArray(_part$split, 2),
            key = _part$split2[0],
            value = _part$split2[1];

        return _objectSpread2(_objectSpread2({}, acc), {}, _defineProperty({}, key, value));
      }, {});
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _ResetButton_component__WEBPACK_IMPORTED_MODULE_4__["default"], _extends({}, this.props, this.containerProps(), this.containerFunctions()))
      );
    }
  }]);

  return _ResetButtonContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]));
Object.defineProperty(_ResetButtonContainer, 'name', {
  value: 'ResetButtonContainer'
});

var ResetButtonContainer = middleware(_ResetButtonContainer, "Component/ResetButton/Container");

_defineProperty(ResetButtonContainer, "propTypes", {
  history: _type_Common__WEBPACK_IMPORTED_MODULE_2__["HistoryType"].isRequired,
  location: _type_Common__WEBPACK_IMPORTED_MODULE_2__["LocationType"].isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["withRouter"])(ResetButtonContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ResetButton/ResetButton.style.scss":
/*!**************************************************************!*\
  !*** ./src/app/component/ResetButton/ResetButton.style.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340376
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ResetButton/index.js":
/*!************************************************!*\
  !*** ./src/app/component/ResetButton/index.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ResetButton_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ResetButton.container */ "./src/app/component/ResetButton/ResetButton.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ResetButton_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/SearchItem/SearchItem.component.js":
/*!**************************************************************!*\
  !*** ./src/app/component/SearchItem/SearchItem.component.js ***!
  \**************************************************************/
/*! exports provided: _SearchItem, SearchItem, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_SearchItem", function() { return _SearchItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchItem", function() { return SearchItem; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Image */ "./src/app/component/Image/index.js");
/* harmony import */ var _Link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Link */ "./src/app/component/Link/index.js");
/* harmony import */ var _ProductAttributeValue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ProductAttributeValue */ "./src/app/component/ProductAttributeValue/index.js");
/* harmony import */ var _TextPlaceholder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../TextPlaceholder */ "./src/app/component/TextPlaceholder/index.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _SearchItem_style__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SearchItem.style */ "./src/app/component/SearchItem/SearchItem.style.scss");
/* harmony import */ var _SearchItem_style__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_SearchItem_style__WEBPACK_IMPORTED_MODULE_7__);
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








/** @namespace Component/SearchItem/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _SearchItem =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_SearchItem, _Extensible);

  function _SearchItem() {
    _classCallCheck(this, _SearchItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(_SearchItem).apply(this, arguments));
  }

  _createClass(_SearchItem, [{
    key: "renderCustomAttribute",
    value: function renderCustomAttribute() {
      var customAttribute = this.props.customAttribute;

      if (!customAttribute) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "SearchItem",
          elem: "CustomAttribute"
        },
        /*#__PURE__*/
        _checkBEM(React, _ProductAttributeValue__WEBPACK_IMPORTED_MODULE_4__["default"], {
          attribute: customAttribute,
          isFormattedAsText: true
        }))
      );
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var name = this.props.product.name;
      return (
        /*#__PURE__*/
        _checkBEM(React, "figcaption", {
          block: "SearchItem",
          elem: "Content"
        }, this.renderCustomAttribute(),
        /*#__PURE__*/
        _checkBEM(React, "h4", {
          block: "SearchItem",
          elem: "Title",
          mods: {
            isLoaded: !!name
          }
        },
        /*#__PURE__*/
        _checkBEM(React, _TextPlaceholder__WEBPACK_IMPORTED_MODULE_5__["default"], {
          content: name,
          length: "long"
        })))
      );
    }
  }, {
    key: "renderImage",
    value: function renderImage() {
      var _this$props = this.props,
          name = _this$props.product.name,
          imgSrc = _this$props.imgSrc;

      if (name && !imgSrc) {
        return (
          /*#__PURE__*/
          _checkBEM(React, "div", {
            block: "SearchItem",
            elem: "Image"
          })
        );
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, _Image__WEBPACK_IMPORTED_MODULE_2__["default"], {
          block: "SearchItem",
          elem: "Image",
          src: imgSrc,
          alt: __('Product %s thumbnail.', name),
          isPlaceholder: !name
        })
      );
    }
  }, {
    key: "renderLink",
    value: function renderLink() {
      var _this$props2 = this.props,
          linkTo = _this$props2.linkTo,
          onClick = _this$props2.onClick;
      return (
        /*#__PURE__*/
        _checkBEM(React, _Link__WEBPACK_IMPORTED_MODULE_3__["default"], {
          block: "SearchItem",
          elem: "Link",
          to: linkTo,
          onClick: onClick
        },
        /*#__PURE__*/
        _checkBEM(React, "figure", {
          block: "SearchItem",
          elem: "Wrapper"
        }, this.renderImage(), this.renderContent()))
      );
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "li", {
          block: "SearchItem"
        }, this.renderLink())
      );
    }
  }]);

  return _SearchItem;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_SearchItem, 'name', {
  value: 'SearchItem'
});

var SearchItem = middleware(_SearchItem, "Component/SearchItem/Component");

_defineProperty(SearchItem, "propTypes", {
  linkTo: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({})]),
  imgSrc: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  customAttribute: _type_ProductList__WEBPACK_IMPORTED_MODULE_6__["AttributeType"],
  product: _type_ProductList__WEBPACK_IMPORTED_MODULE_6__["ProductType"],
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

_defineProperty(SearchItem, "defaultProps", {
  linkTo: {},
  imgSrc: '',
  customAttribute: null,
  product: {}
});

/* harmony default export */ __webpack_exports__["default"] = (SearchItem);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/SearchItem/SearchItem.container.js":
/*!**************************************************************!*\
  !*** ./src/app/component/SearchItem/SearchItem.container.js ***!
  \**************************************************************/
/*! exports provided: SearchBarDispatcher, mapDispatchToProps, mapStateToProps, _SearchItemContainer, SearchItemContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchBarDispatcher", function() { return SearchBarDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_SearchItemContainer", function() { return _SearchItemContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchItemContainer", function() { return SearchItemContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _store_Overlay_Overlay_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store/Overlay/Overlay.action */ "./src/app/store/Overlay/Overlay.action.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _SearchItem_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SearchItem.component */ "./src/app/component/SearchItem/SearchItem.component.js");
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






var SearchBarDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/SearchBar/SearchBar.dispatcher */ "./src/app/store/SearchBar/SearchBar.dispatcher.js"));
/** @namespace Component/SearchItem/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    hideActiveOverlay: function hideActiveOverlay() {
      return dispatch(Object(_store_Overlay_Overlay_action__WEBPACK_IMPORTED_MODULE_3__["hideActiveOverlay"])());
    }
  };
}, "Component/SearchItem/Container/mapDispatchToProps");
/** @namespace Component/SearchItem/Container/mapStateToProps */
// eslint-disable-next-line no-unused-vars

var mapStateToProps = middleware(function (state) {
  return {};
}, "Component/SearchItem/Container/mapStateToProps");
/** @namespace Component/SearchItem/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _SearchItemContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_SearchItemContainer, _Extensible);

  function _SearchItemContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _SearchItemContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_SearchItemContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      onClick: _this.handleItemClick.bind(_assertThisInitialized(_this))
    });

    _defineProperty(_assertThisInitialized(_this), "containerProps", function () {
      return {
        linkTo: _this.getLinkTo(),
        imgSrc: _this.getImgSrc(),
        customAttribute: _this.getCustomAttribute()
      };
    });

    return _this;
  }

  _createClass(_SearchItemContainer, [{
    key: "handleItemClick",
    value: function handleItemClick() {
      var hideActiveOverlay = this.props.hideActiveOverlay;
      hideActiveOverlay();
    }
  }, {
    key: "getLinkTo",
    value: function getLinkTo() {
      var _this$props = this.props,
          product = _this$props.product,
          url = _this$props.product.url;

      if (!url) {
        return {};
      }

      return {
        pathname: url,
        state: {
          product: product
        }
      };
    }
  }, {
    key: "getImgSrc",
    value: function getImgSrc() {
      var _this$props$product$t = this.props.product.thumbnail;
      _this$props$product$t = _this$props$product$t === void 0 ? {} : _this$props$product$t;
      var url = _this$props$product$t.url;
      return url;
    }
  }, {
    key: "getCustomAttribute",
    value: function getCustomAttribute() {
      var sku = this.props.product.sku;
      var _window$contentConfig = window.contentConfiguration.product_list_content;
      _window$contentConfig = _window$contentConfig === void 0 ? {} : _window$contentConfig;
      var attribute_to_display = _window$contentConfig.attribute_to_display;
      var _this$props$product$a = this.props.product.attributes,
          attributes = _this$props$product$a === void 0 ? {} : _this$props$product$a;
      var attribute = attributes[attribute_to_display || 'brand'];

      if (sku && !attribute) {
        return null;
      }

      return attribute;
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _SearchItem_component__WEBPACK_IMPORTED_MODULE_5__["default"], _extends({}, this.props, this.containerFunctions, this.containerProps()))
      );
    }
  }]);

  return _SearchItemContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_SearchItemContainer, 'name', {
  value: 'SearchItemContainer'
});

var SearchItemContainer = middleware(_SearchItemContainer, "Component/SearchItem/Container");

_defineProperty(SearchItemContainer, "propTypes", {
  product: _type_ProductList__WEBPACK_IMPORTED_MODULE_4__["ProductType"].isRequired,
  hideActiveOverlay: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(SearchItemContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/SearchItem/SearchItem.style.scss":
/*!************************************************************!*\
  !*** ./src/app/component/SearchItem/SearchItem.style.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340706
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/SearchItem/index.js":
/*!***********************************************!*\
  !*** ./src/app/component/SearchItem/index.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SearchItem_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SearchItem.container */ "./src/app/component/SearchItem/SearchItem.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _SearchItem_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/SearchOverlay/SearchOverlay.component.js":
/*!********************************************************************!*\
  !*** ./src/app/component/SearchOverlay/SearchOverlay.component.js ***!
  \********************************************************************/
/*! exports provided: _SearchOverlay, SearchOverlay, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_SearchOverlay", function() { return _SearchOverlay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchOverlay", function() { return SearchOverlay; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Overlay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Overlay */ "./src/app/component/Overlay/index.js");
/* harmony import */ var _SearchItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../SearchItem */ "./src/app/component/SearchItem/index.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _SearchOverlay_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SearchOverlay.config */ "./src/app/component/SearchOverlay/SearchOverlay.config.js");
/* harmony import */ var _SearchOverlay_style__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SearchOverlay.style */ "./src/app/component/SearchOverlay/SearchOverlay.style.scss");
/* harmony import */ var _SearchOverlay_style__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_SearchOverlay_style__WEBPACK_IMPORTED_MODULE_6__);
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







/** @namespace Component/SearchOverlay/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _SearchOverlay =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_SearchOverlay, _Extensible);

  function _SearchOverlay() {
    _classCallCheck(this, _SearchOverlay);

    return _possibleConstructorReturn(this, _getPrototypeOf(_SearchOverlay).apply(this, arguments));
  }

  _createClass(_SearchOverlay, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this = this;

      var prevSearchCriteria = prevProps.searchCriteria;
      var _this$props = this.props,
          searchCriteria = _this$props.searchCriteria,
          clearSearchResults = _this$props.clearSearchResults,
          makeSearchRequest = _this$props.makeSearchRequest;

      if (searchCriteria !== prevSearchCriteria) {
        if (this.timeout) {
          clearTimeout(this.timeout);
        }

        clearSearchResults();
        this.timeout = setTimeout(function () {
          _this.timeout = null;
          makeSearchRequest();
        }, _SearchOverlay_config__WEBPACK_IMPORTED_MODULE_5__["SEARCH_TIMEOUT"]);
      }
    }
  }, {
    key: "renderSearchItem",
    value: function renderSearchItem(product, i) {
      return (
        /*#__PURE__*/
        _checkBEM(React, _SearchItem__WEBPACK_IMPORTED_MODULE_3__["default"], {
          product: product,
          key: i
        })
      );
    }
  }, {
    key: "renderSearchCriteria",
    value: function renderSearchCriteria() {
      var searchCriteria = this.props.searchCriteria;
      return (
        /*#__PURE__*/
        _checkBEM(React, "p", {
          block: "SearchOverlay",
          elem: "Criteria",
          mods: {
            isVisible: !!searchCriteria.trim()
          }
        }, __('Results for:'),
        /*#__PURE__*/
        _checkBEM(React, "strong", null, searchCriteria))
      );
    }
  }, {
    key: "renderNoSearchCriteria",
    value: function renderNoSearchCriteria() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "p", null, __('Start typing to see search results!'))
      );
    }
  }, {
    key: "renderNoResults",
    value: function renderNoResults() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "p", null, __('No results found!'))
      );
    }
  }, {
    key: "renderSearchResults",
    value: function renderSearchResults() {
      var _this2 = this;

      var _this$props2 = this.props,
          searchCriteria = _this$props2.searchCriteria,
          searchResults = _this$props2.searchResults,
          isLoading = _this$props2.isLoading;

      if (!searchCriteria.trim()) {
        return this.renderNoSearchCriteria();
      }

      if (!searchResults.length && !isLoading && !this.timeout) {
        return this.renderNoResults();
      }

      var resultsToRender = isLoading || this.timeout ? Array(_SearchOverlay_config__WEBPACK_IMPORTED_MODULE_5__["AMOUNT_OF_PLACEHOLDERS"]).fill({}) : searchResults;
      return (
        /*#__PURE__*/
        _checkBEM(React, "ul", null, resultsToRender.map(function (item, i) {
          return _this2.renderSearchItem(item, i);
        }))
      );
    }
  }, {
    key: "render",
    value: function render() {
      var isHideOverlay = this.props.isHideOverlay;

      if (isHideOverlay) {
        return (
          /*#__PURE__*/
          _checkBEM(React, "article", {
            block: "SearchOverlay",
            elem: "Results",
            "aria-label": "Search results"
          }, this.renderSearchResults())
        );
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, _Overlay__WEBPACK_IMPORTED_MODULE_2__["default"], {
          id: "search",
          mix: {
            block: 'SearchOverlay'
          }
        }, this.renderSearchCriteria(),
        /*#__PURE__*/
        _checkBEM(React, "article", {
          block: "SearchOverlay",
          elem: "Results",
          "aria-label": "Search results"
        }, this.renderSearchResults()))
      );
    }
  }]);

  return _SearchOverlay;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_SearchOverlay, 'name', {
  value: 'SearchOverlay'
});

var SearchOverlay = middleware(_SearchOverlay, "Component/SearchOverlay/Component");

_defineProperty(SearchOverlay, "propTypes", {
  searchCriteria: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  searchResults: _type_ProductList__WEBPACK_IMPORTED_MODULE_4__["ItemsType"].isRequired,
  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  makeSearchRequest: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  clearSearchResults: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  isHideOverlay: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool
});

_defineProperty(SearchOverlay, "defaultProps", {
  searchCriteria: '',
  isHideOverlay: false
});

/* harmony default export */ __webpack_exports__["default"] = (SearchOverlay);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/SearchOverlay/SearchOverlay.config.js":
/*!*****************************************************************!*\
  !*** ./src/app/component/SearchOverlay/SearchOverlay.config.js ***!
  \*****************************************************************/
/*! exports provided: SEARCH_TIMEOUT, AMOUNT_OF_PLACEHOLDERS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SEARCH_TIMEOUT", function() { return SEARCH_TIMEOUT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AMOUNT_OF_PLACEHOLDERS", function() { return AMOUNT_OF_PLACEHOLDERS; });
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
var SEARCH_TIMEOUT = 500;
var AMOUNT_OF_PLACEHOLDERS = 5;

/***/ }),

/***/ "./src/app/component/SearchOverlay/SearchOverlay.container.js":
/*!********************************************************************!*\
  !*** ./src/app/component/SearchOverlay/SearchOverlay.container.js ***!
  \********************************************************************/
/*! exports provided: SearchBarDispatcher, mapStateToProps, mapDispatchToProps, _SearchOverlayContainer, SearchOverlayContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchBarDispatcher", function() { return SearchBarDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_SearchOverlayContainer", function() { return _SearchOverlayContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchOverlayContainer", function() { return SearchOverlayContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _SearchOverlay_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SearchOverlay.component */ "./src/app/component/SearchOverlay/SearchOverlay.component.js");
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




var SearchBarDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/SearchBar/SearchBar.dispatcher */ "./src/app/store/SearchBar/SearchBar.dispatcher.js"));
/** @namespace Component/SearchOverlay/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    searchResults: state.SearchBarReducer.productsInSearch,
    isLoading: state.SearchBarReducer.isLoading
  };
}, "Component/SearchOverlay/Container/mapStateToProps");
/** @namespace Component/SearchOverlay/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    makeSearchRequest: function makeSearchRequest(options) {
      return SearchBarDispatcher.then(function (_ref) {
        var dispatcher = _ref.default;
        return dispatcher.handleData(dispatch, options);
      });
    },
    clearSearchResults: function clearSearchResults() {
      return SearchBarDispatcher.then(function (_ref2) {
        var dispatcher = _ref2.default;
        return dispatcher.clearSearchResults(dispatch);
      });
    }
  };
}, "Component/SearchOverlay/Container/mapDispatchToProps");
/** @namespace Component/SearchOverlay/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _SearchOverlayContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_SearchOverlayContainer, _Extensible);

  function _SearchOverlayContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _SearchOverlayContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_SearchOverlayContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      makeSearchRequest: _this.makeSearchRequest.bind(_assertThisInitialized(_this))
    });

    return _this;
  }

  _createClass(_SearchOverlayContainer, [{
    key: "makeSearchRequest",
    value: function makeSearchRequest() {
      var _this$props = this.props,
          makeSearchRequest = _this$props.makeSearchRequest,
          clearSearchResults = _this$props.clearSearchResults,
          searchCriteria = _this$props.searchCriteria;

      if (searchCriteria) {
        clearSearchResults();
        makeSearchRequest({
          args: {
            search: searchCriteria,
            pageSize: 24,
            currentPage: 1
          }
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _SearchOverlay_component__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({}, this.props, this.containerFunctions))
      );
    }
  }]);

  return _SearchOverlayContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_SearchOverlayContainer, 'name', {
  value: 'SearchOverlayContainer'
});

var SearchOverlayContainer = middleware(_SearchOverlayContainer, "Component/SearchOverlay/Container");

_defineProperty(SearchOverlayContainer, "propTypes", {
  makeSearchRequest: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  clearSearchResults: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  searchCriteria: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(SearchOverlayContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/SearchOverlay/SearchOverlay.style.scss":
/*!******************************************************************!*\
  !*** ./src/app/component/SearchOverlay/SearchOverlay.style.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340310
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/SearchOverlay/index.js":
/*!**************************************************!*\
  !*** ./src/app/component/SearchOverlay/index.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SearchOverlay_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SearchOverlay.container */ "./src/app/component/SearchOverlay/SearchOverlay.container.js");
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

/* harmony default export */ __webpack_exports__["default"] = (_SearchOverlay_container__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/app/route/CategoryPage/CategoryPage.component.js":
/*!**************************************************************!*\
  !*** ./src/app/route/CategoryPage/CategoryPage.component.js ***!
  \**************************************************************/
/*! exports provided: _CategoryPage, CategoryPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_CategoryPage", function() { return _CategoryPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryPage", function() { return CategoryPage; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _component_CategoryDetails__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../component/CategoryDetails */ "./src/app/component/CategoryDetails/index.js");
/* harmony import */ var _component_CategoryFilterOverlay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../component/CategoryFilterOverlay */ "./src/app/component/CategoryFilterOverlay/index.js");
/* harmony import */ var _component_CategoryFilterOverlay_CategoryFilterOverlay_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../component/CategoryFilterOverlay/CategoryFilterOverlay.config */ "./src/app/component/CategoryFilterOverlay/CategoryFilterOverlay.config.js");
/* harmony import */ var _component_CategoryItemsCount__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../component/CategoryItemsCount */ "./src/app/component/CategoryItemsCount/index.js");
/* harmony import */ var _component_CategoryProductList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../component/CategoryProductList */ "./src/app/component/CategoryProductList/index.js");
/* harmony import */ var _component_CategorySort__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../component/CategorySort */ "./src/app/component/CategorySort/index.js");
/* harmony import */ var _component_ContentWrapper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../component/ContentWrapper */ "./src/app/component/ContentWrapper/index.js");
/* harmony import */ var _component_Html__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../component/Html */ "./src/app/component/Html/index.js");
/* harmony import */ var _type_Category__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../type/Category */ "./src/app/type/Category.js");
/* harmony import */ var _type_Device__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../type/Device */ "./src/app/type/Device.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _CategoryPage_config__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./CategoryPage.config */ "./src/app/route/CategoryPage/CategoryPage.config.js");
/* harmony import */ var _CategoryPage_style__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./CategoryPage.style */ "./src/app/route/CategoryPage/CategoryPage.style.scss");
/* harmony import */ var _CategoryPage_style__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_CategoryPage_style__WEBPACK_IMPORTED_MODULE_14__);
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















/** @namespace Route/CategoryPage/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _CategoryPage =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_CategoryPage, _Extensible);

  function _CategoryPage() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _CategoryPage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_CategoryPage)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onFilterButtonClick", _this.onFilterButtonClick.bind(_assertThisInitialized(_this)));

    return _this;
  }

  _createClass(_CategoryPage, [{
    key: "onFilterButtonClick",
    value: function onFilterButtonClick() {
      var toggleOverlayByKey = this.props.toggleOverlayByKey;
      toggleOverlayByKey(_component_CategoryFilterOverlay_CategoryFilterOverlay_config__WEBPACK_IMPORTED_MODULE_4__["CATEGORY_FILTER_OVERLAY_ID"]);
    }
  }, {
    key: "displayProducts",
    value: function displayProducts() {
      var _this$props$category = this.props.category;
      _this$props$category = _this$props$category === void 0 ? {} : _this$props$category;
      var _this$props$category$ = _this$props$category.display_mode,
          display_mode = _this$props$category$ === void 0 ? _CategoryPage_config__WEBPACK_IMPORTED_MODULE_13__["DISPLAY_MODE_PRODUCTS"] : _this$props$category$;
      return display_mode === null || display_mode === _CategoryPage_config__WEBPACK_IMPORTED_MODULE_13__["DISPLAY_MODE_PRODUCTS"] || display_mode === _CategoryPage_config__WEBPACK_IMPORTED_MODULE_13__["DISPLAY_MODE_BOTH"];
    }
  }, {
    key: "displayCmsBlock",
    value: function displayCmsBlock() {
      var _this$props$category2 = this.props.category;
      _this$props$category2 = _this$props$category2 === void 0 ? {} : _this$props$category2;
      var display_mode = _this$props$category2.display_mode;
      return display_mode === _CategoryPage_config__WEBPACK_IMPORTED_MODULE_13__["DISPLAY_MODE_CMS_BLOCK"] || display_mode === _CategoryPage_config__WEBPACK_IMPORTED_MODULE_13__["DISPLAY_MODE_BOTH"];
    }
  }, {
    key: "renderCategoryDetails",
    value: function renderCategoryDetails() {
      var category = this.props.category;
      return (
        /*#__PURE__*/
        _checkBEM(React, _component_CategoryDetails__WEBPACK_IMPORTED_MODULE_2__["default"], {
          category: category
        })
      );
    }
  }, {
    key: "renderFilterButton",
    value: function renderFilterButton() {
      var _this$props = this.props,
          isContentFiltered = _this$props.isContentFiltered,
          totalPages = _this$props.totalPages;

      if (!isContentFiltered && totalPages === 0) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "button", {
          block: "CategoryPage",
          elem: "Filter",
          onClick: this.onFilterButtonClick
        }, __('Filter'))
      );
    }
  }, {
    key: "renderFilterOverlay",
    value: function renderFilterOverlay() {
      var _this$props2 = this.props,
          filters = _this$props2.filters,
          selectedFilters = _this$props2.selectedFilters,
          isMatchingInfoFilter = _this$props2.isMatchingInfoFilter;

      if (!this.displayProducts()) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, _component_CategoryFilterOverlay__WEBPACK_IMPORTED_MODULE_3__["default"], {
          availableFilters: filters,
          customFiltersValues: selectedFilters,
          isMatchingInfoFilter: isMatchingInfoFilter
        })
      );
    }
  }, {
    key: "renderCategorySort",
    value: function renderCategorySort() {
      var _this$props3 = this.props,
          sortFields = _this$props3.sortFields,
          selectedSort = _this$props3.selectedSort,
          onSortChange = _this$props3.onSortChange,
          isMatchingInfoFilter = _this$props3.isMatchingInfoFilter;
      var _sortFields$options = sortFields.options,
          options = _sortFields$options === void 0 ? {} : _sortFields$options;
      var updatedSortFields = Object.values(options).map(function (_ref) {
        var id = _ref.value,
            label = _ref.label;
        return {
          id: id,
          label: label
        };
      });
      var sortDirection = selectedSort.sortDirection,
          sortKey = selectedSort.sortKey;
      return (
        /*#__PURE__*/
        _checkBEM(React, _component_CategorySort__WEBPACK_IMPORTED_MODULE_7__["default"], {
          isMatchingInfoFilter: isMatchingInfoFilter,
          onSortChange: onSortChange,
          sortFields: updatedSortFields,
          sortKey: sortKey,
          sortDirection: sortDirection
        })
      );
    }
  }, {
    key: "renderItemsCount",
    value: function renderItemsCount() {
      var isVisibleOnMobile = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var _this$props4 = this.props,
          isMatchingListFilter = _this$props4.isMatchingListFilter,
          device = _this$props4.device;

      if (isVisibleOnMobile && !device.isMobile) {
        return null;
      }

      if (!isVisibleOnMobile && device.isMobile) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, _component_CategoryItemsCount__WEBPACK_IMPORTED_MODULE_5__["default"], {
          isMatchingListFilter: isMatchingListFilter
        })
      );
    }
  }, {
    key: "renderCategoryProductList",
    value: function renderCategoryProductList() {
      var _this$props5 = this.props,
          filter = _this$props5.filter,
          search = _this$props5.search,
          selectedSort = _this$props5.selectedSort,
          selectedFilters = _this$props5.selectedFilters,
          isMatchingListFilter = _this$props5.isMatchingListFilter,
          isMatchingInfoFilter = _this$props5.isMatchingInfoFilter;

      if (!this.displayProducts()) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "CategoryPage",
          elem: "ProductListWrapper"
        }, this.renderItemsCount(true),
        /*#__PURE__*/
        _checkBEM(React, _component_CategoryProductList__WEBPACK_IMPORTED_MODULE_6__["default"], {
          filter: filter,
          search: search,
          sort: selectedSort,
          selectedFilters: selectedFilters,
          isMatchingListFilter: isMatchingListFilter,
          isMatchingInfoFilter: isMatchingInfoFilter
        }))
      );
    }
  }, {
    key: "renderCmsBlock",
    value: function renderCmsBlock() {
      var cms_block = this.props.category.cms_block;

      if (!cms_block || !this.displayCmsBlock()) {
        return null;
      }

      var content = cms_block.content,
          disabled = cms_block.disabled;

      if (disabled) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "CategoryPage",
          elem: "CMS"
        },
        /*#__PURE__*/
        _checkBEM(React, _component_Html__WEBPACK_IMPORTED_MODULE_9__["default"], {
          content: content
        }))
      );
    }
  }, {
    key: "renderMiscellaneous",
    value: function renderMiscellaneous() {
      if (!this.displayProducts()) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "aside", {
          block: "CategoryPage",
          elem: "Miscellaneous"
        }, this.renderItemsCount(), this.renderCategorySort(), this.renderFilterButton())
      );
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null, this.renderFilterOverlay(), this.renderCategoryDetails(), this.renderCmsBlock(), this.renderMiscellaneous(), this.renderCategoryProductList())
      );
    }
  }, {
    key: "render",
    value: function render() {
      var hideProducts = !this.displayProducts();
      return (
        /*#__PURE__*/
        _checkBEM(React, "main", {
          block: "CategoryPage"
        },
        /*#__PURE__*/
        _checkBEM(React, _component_ContentWrapper__WEBPACK_IMPORTED_MODULE_8__["default"], {
          wrapperMix: {
            block: 'CategoryPage',
            elem: 'Wrapper',
            mods: {
              hideProducts: hideProducts
            }
          },
          label: "Category page"
        }, this.renderContent()))
      );
    }
  }]);

  return _CategoryPage;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_CategoryPage, 'name', {
  value: 'CategoryPage'
});

var CategoryPage = middleware(_CategoryPage, "Route/CategoryPage/Component");

_defineProperty(CategoryPage, "propTypes", {
  category: _type_Category__WEBPACK_IMPORTED_MODULE_10__["CategoryTreeType"].isRequired,
  filters: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape).isRequired,
  sortFields: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
    options: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.array
  }).isRequired,
  selectedSort: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
    sortDirection: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOf(['ASC', 'DESC']),
    sortKey: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
  }).isRequired,
  onSortChange: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  toggleOverlayByKey: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  selectedFilters: _type_ProductList__WEBPACK_IMPORTED_MODULE_12__["FilterType"].isRequired,
  filter: _type_ProductList__WEBPACK_IMPORTED_MODULE_12__["FilterInputType"].isRequired,
  search: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  isContentFiltered: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  isMatchingListFilter: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  isMatchingInfoFilter: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  totalPages: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  device: _type_Device__WEBPACK_IMPORTED_MODULE_11__["DeviceType"].isRequired
});

_defineProperty(CategoryPage, "defaultProps", {
  isContentFiltered: true,
  isMatchingListFilter: false,
  isMatchingInfoFilter: false,
  totalPages: 1,
  search: ''
});

/* harmony default export */ __webpack_exports__["default"] = (CategoryPage);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/route/CategoryPage/CategoryPage.container.js":
/*!**************************************************************!*\
  !*** ./src/app/route/CategoryPage/CategoryPage.container.js ***!
  \**************************************************************/
/*! exports provided: ProductListInfoDispatcher, BreadcrumbsDispatcher, CategoryDispatcher, MetaDispatcher, NoMatchDispatcher, mapStateToProps, mapDispatchToProps, _CategoryPageContainer, CategoryPageContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductListInfoDispatcher", function() { return ProductListInfoDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BreadcrumbsDispatcher", function() { return BreadcrumbsDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryDispatcher", function() { return CategoryDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetaDispatcher", function() { return MetaDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoMatchDispatcher", function() { return NoMatchDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_CategoryPageContainer", function() { return _CategoryPageContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryPageContainer", function() { return CategoryPageContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _component_Header_Header_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../component/Header/Header.config */ "./src/app/component/Header/Header.config.js");
/* harmony import */ var _component_NavigationTabs_NavigationTabs_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../component/NavigationTabs/NavigationTabs.config */ "./src/app/component/NavigationTabs/NavigationTabs.config.js");
/* harmony import */ var _store_Category_Category_action__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store/Category/Category.action */ "./src/app/store/Category/Category.action.js");
/* harmony import */ var _store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../store/Navigation/Navigation.action */ "./src/app/store/Navigation/Navigation.action.js");
/* harmony import */ var _store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../store/Navigation/Navigation.reducer */ "./src/app/store/Navigation/Navigation.reducer.js");
/* harmony import */ var _store_Offline_Offline_action__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../store/Offline/Offline.action */ "./src/app/store/Offline/Offline.action.js");
/* harmony import */ var _store_Overlay_Overlay_action__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../store/Overlay/Overlay.action */ "./src/app/store/Overlay/Overlay.action.js");
/* harmony import */ var _store_ProductListInfo_ProductListInfo_action__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../store/ProductListInfo/ProductListInfo.action */ "./src/app/store/ProductListInfo/ProductListInfo.action.js");
/* harmony import */ var _type_Category__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../type/Category */ "./src/app/type/Category.js");
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _util_Request__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../util/Request */ "./src/app/util/Request/index.js");
/* harmony import */ var _util_Url__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../util/Url */ "./src/app/util/Url/index.js");
/* harmony import */ var _CategoryPage_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./CategoryPage.component */ "./src/app/route/CategoryPage/CategoryPage.component.js");
/* harmony import */ var _CategoryPage_config__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./CategoryPage.config */ "./src/app/route/CategoryPage/CategoryPage.config.js");
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

















var ProductListInfoDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/ProductListInfo/ProductListInfo.dispatcher */ "./src/app/store/ProductListInfo/ProductListInfo.dispatcher.js"));
var BreadcrumbsDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/Breadcrumbs/Breadcrumbs.dispatcher */ "./src/app/store/Breadcrumbs/Breadcrumbs.dispatcher.js"));
var CategoryDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/Category/Category.dispatcher */ "./src/app/store/Category/Category.dispatcher.js"));
var MetaDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/Meta/Meta.dispatcher */ "./src/app/store/Meta/Meta.dispatcher.js"));
var NoMatchDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/NoMatch/NoMatch.dispatcher */ "./src/app/store/NoMatch/NoMatch.dispatcher.js"));
/** @namespace Route/CategoryPage/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    category: state.CategoryReducer.category,
    isOffline: state.OfflineReducer.isOffline,
    filters: state.ProductListInfoReducer.filters,
    sortFields: state.ProductListInfoReducer.sortFields,
    currentArgs: state.ProductListReducer.currentArgs,
    selectedInfoFilter: state.ProductListInfoReducer.selectedFilter,
    isInfoLoading: state.ProductListInfoReducer.isLoading,
    totalPages: state.ProductListReducer.totalPages,
    device: state.ConfigReducer.device
  };
}, "Route/CategoryPage/Container/mapStateToProps");
/** @namespace Route/CategoryPage/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    toggleOverlayByKey: function toggleOverlayByKey(key) {
      return dispatch(Object(_store_Overlay_Overlay_action__WEBPACK_IMPORTED_MODULE_9__["toggleOverlayByKey"])(key));
    },
    changeHeaderState: function changeHeaderState(state) {
      return dispatch(Object(_store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_6__["changeNavigationState"])(_store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_7__["TOP_NAVIGATION_TYPE"], state));
    },
    changeNavigationState: function changeNavigationState(state) {
      return dispatch(Object(_store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_6__["changeNavigationState"])(_store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_7__["BOTTOM_NAVIGATION_TYPE"], state));
    },
    requestCategory: function requestCategory(options) {
      return CategoryDispatcher.then(function (_ref) {
        var dispatcher = _ref.default;
        return dispatcher.handleData(dispatch, options);
      });
    },
    updateBreadcrumbs: function updateBreadcrumbs(breadcrumbs) {
      return Object.keys(breadcrumbs).length ? BreadcrumbsDispatcher.then(function (_ref2) {
        var dispatcher = _ref2.default;
        return dispatcher.updateWithCategory(breadcrumbs, dispatch);
      }) : BreadcrumbsDispatcher.then(function (_ref3) {
        var dispatcher = _ref3.default;
        return dispatcher.update([], dispatch);
      });
    },
    requestProductListInfo: function requestProductListInfo(options) {
      return ProductListInfoDispatcher.then(function (_ref4) {
        var dispatcher = _ref4.default;
        return dispatcher.handleData(dispatch, options);
      });
    },
    updateLoadStatus: function updateLoadStatus(isLoading) {
      return dispatch(Object(_store_ProductListInfo_ProductListInfo_action__WEBPACK_IMPORTED_MODULE_10__["updateInfoLoadStatus"])(isLoading));
    },
    updateNoMatch: function updateNoMatch(options) {
      return NoMatchDispatcher.then(function (_ref5) {
        var dispatcher = _ref5.default;
        return dispatcher.updateNoMatch(dispatch, options);
      });
    },
    setBigOfflineNotice: function setBigOfflineNotice(isBig) {
      return dispatch(Object(_store_Offline_Offline_action__WEBPACK_IMPORTED_MODULE_8__["setBigOfflineNotice"])(isBig));
    },
    updateMetaFromCategory: function updateMetaFromCategory(category) {
      return MetaDispatcher.then(function (_ref6) {
        var dispatcher = _ref6.default;
        return dispatcher.updateWithCategory(category, dispatch);
      });
    },
    clearCategory: function clearCategory() {
      return dispatch(Object(_store_Category_Category_action__WEBPACK_IMPORTED_MODULE_5__["updateCurrentCategory"])({}));
    }
  };
}, "Route/CategoryPage/Container/mapDispatchToProps");
/** @namespace Route/CategoryPage/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _CategoryPageContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_CategoryPageContainer, _Extensible);

  function _CategoryPageContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _CategoryPageContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_CategoryPageContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      currentCategoryIds: -1,
      breadcrumbsWereUpdated: false
    });

    _defineProperty(_assertThisInitialized(_this), "config", {
      sortKey: 'name',
      sortDirection: 'ASC'
    });

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      onSortChange: _this.onSortChange.bind(_assertThisInitialized(_this))
    });

    _defineProperty(_assertThisInitialized(_this), "setOfflineNoticeSize", function () {
      var _this$props = _this.props,
          setBigOfflineNotice = _this$props.setBigOfflineNotice,
          isInfoLoading = _this$props.isInfoLoading;

      if (isInfoLoading) {
        setBigOfflineNotice(true);
      } else {
        setBigOfflineNotice(false);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "containerProps", function () {
      return {
        filter: _this.getFilter(),
        isMatchingListFilter: _this.getIsMatchingListFilter(),
        isMatchingInfoFilter: _this.getIsMatchingInfoFilter(),
        selectedSort: _this.getSelectedSortFromUrl(),
        selectedFilters: _this.getSelectedFiltersFromUrl(),
        isContentFiltered: _this.isContentFiltered()
      };
    });

    return _this;
  }

  _createClass(_CategoryPageContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props2 = this.props,
          categoryIds = _this$props2.categoryIds,
          id = _this$props2.category.id;
      /**
       * Ensure transition PLP => homepage => PLP always having proper meta
       */

      this.updateMeta();
      /**
       * Always make sure the navigation show / hide mode (on scroll)
       * is activated when entering the category page.
       * */

      this.updateNavigationState();
      /**
       * Always update the history, ensure the history contains category
       */

      this.updateHistory();
      /**
       * Make sure to update header state, if the category visited
       * was already loaded.
       */

      if (categoryIds === id) {
        this.updateBreadcrumbs();
        this.updateHeaderState();
      } else {
        /**
         * Still update header and breadcrumbs, but ignore
         * the category data, as it is outdated
         */
        this.updateHeaderState(true);
        this.updateBreadcrumbs(true);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props3 = this.props,
          isOffline = _this$props3.isOffline,
          categoryIds = _this$props3.categoryIds,
          id = _this$props3.category.id,
          _this$props3$currentA = _this$props3.currentArgs;
      _this$props3$currentA = _this$props3$currentA === void 0 ? {} : _this$props3$currentA;
      var filter = _this$props3$currentA.filter;
      var breadcrumbsWereUpdated = this.state.breadcrumbsWereUpdated;
      var prevCategoryIds = prevProps.categoryIds,
          prevId = prevProps.category.id,
          _prevProps$currentArg = prevProps.currentArgs;
      _prevProps$currentArg = _prevProps$currentArg === void 0 ? {} : _prevProps$currentArg;
      var prevFilter = _prevProps$currentArg.filter; // TODO: category scrolls up when coming from PDP

      if (isOffline) {
        Object(_util_Request__WEBPACK_IMPORTED_MODULE_13__["debounce"])(this.setOfflineNoticeSize, _CategoryPage_config__WEBPACK_IMPORTED_MODULE_16__["LOADING_TIME"])();
      }
      /**
       * If the URL rewrite has been changed, make sure the category ID
       * will persist in the history state.
       */


      if (categoryIds !== prevCategoryIds) {
        this.updateHistory();
      }
      /**
       * If the currently loaded category ID does not match the ID of
       * category from URL rewrite, request category.
       */


      if (categoryIds !== id) {
        this.requestCategory();
      }
      /**
       * If category ID was changed => it is loaded => we need to
       * update category specific information, i.e. breadcrumbs.
       *
       * Or if the breadcrumbs were not yet updated after category request,
       * and the category ID expected to load was loaded, update data.
       */


      var categoryChange = id !== prevId || !breadcrumbsWereUpdated && id === categoryIds;

      if (categoryChange) {
        this.checkIsActive();
        this.updateMeta();
        this.updateBreadcrumbs();
        this.updateHeaderState();
      }
      /*
      ** if category wasn't changed we still need to update meta for correct robots meta tag [#928](https://github.com/scandipwa/base-theme/issues/928)
      */


      if (!categoryChange && filter && prevFilter && Object.keys(filter.customFilters).length !== Object.keys(prevFilter.customFilters).length) {
        this.updateMeta();
      }
    }
  }, {
    key: "onSortChange",
    value: function onSortChange(sortDirection, sortKey) {
      var _this$props4 = this.props,
          location = _this$props4.location,
          history = _this$props4.history;
      Object(_util_Url__WEBPACK_IMPORTED_MODULE_14__["setQueryParams"])({
        sortKey: sortKey,
        sortDirection: sortDirection,
        page: ''
      }, location, history);
      this.updateMeta();
    }
  }, {
    key: "getIsMatchingListFilter",
    value: function getIsMatchingListFilter() {
      var _this$props5 = this.props,
          location = _this$props5.location,
          _this$props5$currentA = _this$props5.currentArgs;
      _this$props5$currentA = _this$props5$currentA === void 0 ? {} : _this$props5$currentA;
      var currentPage = _this$props5$currentA.currentPage,
          sort = _this$props5$currentA.sort,
          filter = _this$props5$currentA.filter;
      /**
       * ? implementation bellow blinks, implementation with categoryIds check only does not show loading when selecting filters.
       * TODO: resolve it to be a combination of these two behaviour
       */
      // Data used to request category matches current data

      return JSON.stringify(filter) === JSON.stringify(this.getFilter()) && JSON.stringify(sort) === JSON.stringify(this.getSelectedSortFromUrl()) && currentPage === +(Object(_util_Url__WEBPACK_IMPORTED_MODULE_14__["getQueryParam"])('page', location) || 1);
    }
  }, {
    key: "getIsMatchingInfoFilter",
    value: function getIsMatchingInfoFilter() {
      var _this$props6 = this.props,
          categoryIds = _this$props6.categoryIds,
          selectedCategoryIds = _this$props6.selectedInfoFilter.categoryIds; // Requested category is equal to current category

      return categoryIds === selectedCategoryIds;
    }
  }, {
    key: "isContentFiltered",
    value: function isContentFiltered() {
      var _this$urlStringToObje = this.urlStringToObject(),
          customFilters = _this$urlStringToObje.customFilters,
          priceMin = _this$urlStringToObje.priceMin,
          priceMax = _this$urlStringToObje.priceMax;

      return !!(customFilters || priceMin || priceMax);
    }
  }, {
    key: "urlStringToObject",
    value: function urlStringToObject() {
      var search = this.props.location.search;
      return search.substr(1).split('&').reduce(function (acc, part) {
        var _part$split = part.split('='),
            _part$split2 = _slicedToArray(_part$split, 2),
            key = _part$split2[0],
            value = _part$split2[1];

        return _objectSpread2(_objectSpread2({}, acc), {}, _defineProperty({}, key, value));
      }, {});
    }
  }, {
    key: "getSelectedFiltersFromUrl",
    value: function getSelectedFiltersFromUrl() {
      var location = this.props.location;
      var selectedFiltersString = (Object(_util_Url__WEBPACK_IMPORTED_MODULE_14__["getQueryParam"])('customFilters', location) || '').split(';');
      return selectedFiltersString.reduce(function (acc, filter) {
        if (!filter) {
          return acc;
        }

        var _filter$split = filter.split(':'),
            _filter$split2 = _slicedToArray(_filter$split, 2),
            key = _filter$split2[0],
            value = _filter$split2[1];

        return _objectSpread2(_objectSpread2({}, acc), {}, _defineProperty({}, key, value.split(',')));
      }, {});
    }
  }, {
    key: "getSelectedSortFromUrl",
    value: function getSelectedSortFromUrl() {
      var _this$props7 = this.props,
          location = _this$props7.location,
          default_sort_by = _this$props7.category.default_sort_by;
      var _this$config = this.config,
          globalDefaultSortKey = _this$config.sortKey,
          defaultSortDirection = _this$config.sortDirection;
      /**
       * Default SORT DIRECTION is taken from (sequentially):
       * - URL param "sortDirection"
       * - CategoryPage class property "config"
       * */

      var sortDirection = Object(_util_Url__WEBPACK_IMPORTED_MODULE_14__["getQueryParam"])('sortDirection', location) || defaultSortDirection;
      /**
       * Default SORT KEY is taken from (sequentially):
       * - URL param "sortKey"
       * - Category default sort key (Magento 2 configuration)
       * - CategoryPage class property "config"
       * */

      var defaultSortKey = default_sort_by || globalDefaultSortKey;
      var sortKey = Object(_util_Url__WEBPACK_IMPORTED_MODULE_14__["getQueryParam"])('sortKey', location) || defaultSortKey;
      return {
        sortDirection: sortDirection,
        sortKey: sortKey
      };
    }
  }, {
    key: "getSelectedPriceRangeFromUrl",
    value: function getSelectedPriceRangeFromUrl() {
      var location = this.props.location;
      var min = +Object(_util_Url__WEBPACK_IMPORTED_MODULE_14__["getQueryParam"])('priceMin', location);
      var max = +Object(_util_Url__WEBPACK_IMPORTED_MODULE_14__["getQueryParam"])('priceMax', location);
      return {
        min: min,
        max: max
      };
    }
  }, {
    key: "getFilter",
    value: function getFilter() {
      var categoryIds = this.props.categoryIds;
      var customFilters = this.getSelectedFiltersFromUrl();
      var priceRange = this.getSelectedPriceRangeFromUrl();

      if (categoryIds === -1) {
        return {
          priceRange: priceRange,
          customFilters: customFilters
        };
      }

      return {
        priceRange: priceRange,
        customFilters: customFilters,
        categoryIds: categoryIds
      };
    }
  }, {
    key: "updateHistory",
    value: function updateHistory() {
      var _this$props8 = this.props,
          history = _this$props8.history,
          location = _this$props8.location,
          categoryIds = _this$props8.categoryIds;
      var search = location.search,
          pathname = location.pathname,
          _location$state = location.state,
          state = _location$state === void 0 ? {} : _location$state;
      var category = state.category;
      /**
       * Prevent pushing non-existent category into the state
       */

      if (categoryIds === -1) {
        return;
      }

      if (category !== categoryIds) {
        history.replace({
          pathname: pathname,
          search: search,
          state: _objectSpread2(_objectSpread2({}, state), {}, {
            category: categoryIds
          })
        });
      }
    }
  }, {
    key: "checkIsActive",
    value: function checkIsActive() {
      var _this$props9 = this.props,
          is_active = _this$props9.category.is_active,
          updateNoMatch = _this$props9.updateNoMatch;

      if (!is_active) {
        updateNoMatch({
          noMatch: true
        });
      }
    }
  }, {
    key: "updateMeta",
    value: function updateMeta() {
      var _this$props10 = this.props,
          updateMetaFromCategory = _this$props10.updateMetaFromCategory,
          category = _this$props10.category,
          history = _this$props10.history;
      var meta_robots = history.location.search ? 'nofollow, noindex' : 'follow, index';
      updateMetaFromCategory(_objectSpread2(_objectSpread2({}, category), {}, {
        meta_robots: meta_robots
      }));
    }
  }, {
    key: "updateBreadcrumbs",
    value: function updateBreadcrumbs() {
      var isUnmatchedCategory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var _this$props11 = this.props,
          updateBreadcrumbs = _this$props11.updateBreadcrumbs,
          category = _this$props11.category;
      var breadcrumbs = isUnmatchedCategory ? {} : category;
      updateBreadcrumbs(breadcrumbs);
      this.setState({
        breadcrumbsWereUpdated: true
      });
    }
  }, {
    key: "updateNavigationState",
    value: function updateNavigationState() {
      var changeNavigationState = this.props.changeNavigationState;
      changeNavigationState({
        name: _component_NavigationTabs_NavigationTabs_config__WEBPACK_IMPORTED_MODULE_4__["MENU_TAB"],
        isVisibleOnScroll: true
      });
    }
  }, {
    key: "updateHeaderState",
    value: function updateHeaderState() {
      var _history$location;

      var isUnmatchedCategory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var _this$props12 = this.props,
          changeHeaderState = _this$props12.changeHeaderState,
          name = _this$props12.category.name,
          history = _this$props12.history;

      var _ref7 = (history === null || history === void 0 ? void 0 : (_history$location = history.location) === null || _history$location === void 0 ? void 0 : _history$location.state) || {},
          isFromCategory = _ref7.isFromCategory;

      var onBackClick = isFromCategory ? function () {
        return history.goBack();
      } : function () {
        return history.push(Object(_util_Url__WEBPACK_IMPORTED_MODULE_14__["appendWithStoreCode"])('/menu'));
      };
      /**
       * Ensure the name is not set if the category IDs do not
       * match. Otherwise, the previous value is displayed.
       */

      var title = isUnmatchedCategory ? undefined : name;
      changeHeaderState({
        name: _component_Header_Header_config__WEBPACK_IMPORTED_MODULE_3__["CATEGORY"],
        title: title,
        onBackClick: onBackClick
      });
    }
  }, {
    key: "requestCategory",
    value: function requestCategory() {
      var _this$props13 = this.props,
          categoryIds = _this$props13.categoryIds,
          isSearchPage = _this$props13.isSearchPage,
          requestCategory = _this$props13.requestCategory;
      var currentCategoryIds = this.state.currentCategoryIds;
      /**
       * Prevent non-existent category from being requested
       */

      if (categoryIds === -1) {
        return;
      }
      /**
       * Do not request a category again! We are still waiting for
       * a requested category to load!
       */


      if (categoryIds === currentCategoryIds) {
        return;
      }
      /**
       * Update current category to track if it is loaded or not - useful,
       * to prevent category from requesting itself multiple times.
       */


      this.setState({
        currentCategoryIds: categoryIds,
        breadcrumbsWereUpdated: false
      });
      requestCategory({
        isSearchPage: isSearchPage,
        categoryIds: categoryIds
      });
    }
  }, {
    key: "render",
    value: function render() {
      var pageSize = this.config.pageSize;
      return (
        /*#__PURE__*/
        _checkBEM(React, _CategoryPage_component__WEBPACK_IMPORTED_MODULE_15__["default"], _extends({}, this.props, {
          pageSize: pageSize
        }, this.containerFunctions, this.containerProps()))
      );
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var currentCategoryIds = state.currentCategoryIds;
      var id = props.category.id;
      /**
       * If the category we expect to load is loaded - reset it
       */

      if (currentCategoryIds === id) {
        return {
          currentCategoryIds: -1
        };
      }

      return null;
    }
  }]);

  return _CategoryPageContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_CategoryPageContainer, 'name', {
  value: 'CategoryPageContainer'
});

var CategoryPageContainer = middleware(_CategoryPageContainer, "Route/CategoryPage/Container");

_defineProperty(CategoryPageContainer, "propTypes", {
  history: _type_Common__WEBPACK_IMPORTED_MODULE_12__["HistoryType"].isRequired,
  category: _type_Category__WEBPACK_IMPORTED_MODULE_11__["CategoryTreeType"].isRequired,
  location: _type_Common__WEBPACK_IMPORTED_MODULE_12__["LocationType"].isRequired,
  match: _type_Common__WEBPACK_IMPORTED_MODULE_12__["MatchType"].isRequired,
  requestCategory: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  changeHeaderState: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  changeNavigationState: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  requestProductListInfo: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  setBigOfflineNotice: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  updateMetaFromCategory: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  updateBreadcrumbs: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  updateLoadStatus: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  updateNoMatch: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  filters: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape).isRequired,
  sortFields: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
    options: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.array
  }).isRequired,
  currentArgs: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
    filter: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
      categoryIds: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number
    })
  }),
  selectedInfoFilter: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
    categoryIds: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number
  }),
  isInfoLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  isOffline: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  categoryIds: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  isSearchPage: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool
});

_defineProperty(CategoryPageContainer, "defaultProps", {
  categoryIds: -1,
  isSearchPage: false,
  currentArgs: {},
  selectedInfoFilter: {}
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(CategoryPageContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/route/CategoryPage/CategoryPage.style.scss":
/*!************************************************************!*\
  !*** ./src/app/route/CategoryPage/CategoryPage.style.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291336148
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/route/CategoryPage/index.js":
/*!*********************************************!*\
  !*** ./src/app/route/CategoryPage/index.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CategoryPage_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CategoryPage.container */ "./src/app/route/CategoryPage/CategoryPage.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _CategoryPage_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/route/SearchPage/SearchPage.component.js":
/*!**********************************************************!*\
  !*** ./src/app/route/SearchPage/SearchPage.component.js ***!
  \**********************************************************/
/*! exports provided: _SearchPage, SearchPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_SearchPage", function() { return _SearchPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchPage", function() { return SearchPage; });
/* harmony import */ var _CategoryPage_CategoryPage_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../CategoryPage/CategoryPage.component */ "./src/app/route/CategoryPage/CategoryPage.component.js");
/* harmony import */ var _SearchPage_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SearchPage.style */ "./src/app/route/SearchPage/SearchPage.style.scss");
/* harmony import */ var _SearchPage_style__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_SearchPage_style__WEBPACK_IMPORTED_MODULE_1__);
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


/** @namespace Route/SearchPage/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _SearchPage =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_SearchPage, _Extensible);

  function _SearchPage() {
    _classCallCheck(this, _SearchPage);

    return _possibleConstructorReturn(this, _getPrototypeOf(_SearchPage).apply(this, arguments));
  }

  _createClass(_SearchPage, [{
    key: "renderSearchHeading",
    value: function renderSearchHeading() {
      var search = this.props.search;
      return (
        /*#__PURE__*/
        _checkBEM(React, "h1", {
          block: "CategoryDetails",
          elem: "Heading",
          mix: {
            block: 'SearchPage',
            elem: 'Heading'
          }
        }, __('Search results for: '),
        /*#__PURE__*/
        _checkBEM(React, "span", null, search))
      );
    }
  }, {
    key: "renderCategoryDetails",
    value: function renderCategoryDetails() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "article", {
          block: "CategoryDetails"
        },
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "CategoryDetails",
          elem: "Description"
        }, this.renderSearchHeading()))
      );
    }
  }, {
    key: "renderCmsBlock",
    value: function renderCmsBlock() {
      return null;
    }
  }]);

  return _SearchPage;
}(Extensible(_CategoryPage_CategoryPage_component__WEBPACK_IMPORTED_MODULE_0__["default"]));
Object.defineProperty(_SearchPage, 'name', {
  value: 'SearchPage'
});

var SearchPage = middleware(_SearchPage, "Route/SearchPage/Component");
/* harmony default export */ __webpack_exports__["default"] = (SearchPage);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/route/SearchPage/SearchPage.container.js":
/*!**********************************************************!*\
  !*** ./src/app/route/SearchPage/SearchPage.container.js ***!
  \**********************************************************/
/*! exports provided: BreadcrumbsDispatcher, CategoryDispatcher, MetaDispatcher, NoMatchDispatcher, ProductListInfoDispatcher, mapStateToProps, mapDispatchToProps, _SearchPageContainer, SearchPageContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, __, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BreadcrumbsDispatcher", function() { return BreadcrumbsDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryDispatcher", function() { return CategoryDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetaDispatcher", function() { return MetaDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoMatchDispatcher", function() { return NoMatchDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductListInfoDispatcher", function() { return ProductListInfoDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_SearchPageContainer", function() { return _SearchPageContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchPageContainer", function() { return SearchPageContainer; });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _component_Header_Header_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../component/Header/Header.config */ "./src/app/component/Header/Header.config.js");
/* harmony import */ var _CategoryPage_CategoryPage_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CategoryPage/CategoryPage.config */ "./src/app/route/CategoryPage/CategoryPage.config.js");
/* harmony import */ var _CategoryPage_CategoryPage_container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../CategoryPage/CategoryPage.container */ "./src/app/route/CategoryPage/CategoryPage.container.js");
/* harmony import */ var _store_Category_Category_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/Category/Category.action */ "./src/app/store/Category/Category.action.js");
/* harmony import */ var _store_Meta_Meta_action__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store/Meta/Meta.action */ "./src/app/store/Meta/Meta.action.js");
/* harmony import */ var _store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../store/Navigation/Navigation.action */ "./src/app/store/Navigation/Navigation.action.js");
/* harmony import */ var _store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../store/Navigation/Navigation.reducer */ "./src/app/store/Navigation/Navigation.reducer.js");
/* harmony import */ var _store_Offline_Offline_action__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../store/Offline/Offline.action */ "./src/app/store/Offline/Offline.action.js");
/* harmony import */ var _store_Overlay_Overlay_action__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../store/Overlay/Overlay.action */ "./src/app/store/Overlay/Overlay.action.js");
/* harmony import */ var _store_ProductListInfo_ProductListInfo_action__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../store/ProductListInfo/ProductListInfo.action */ "./src/app/store/ProductListInfo/ProductListInfo.action.js");
/* harmony import */ var _util_Request__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../util/Request */ "./src/app/util/Request/index.js");
/* harmony import */ var _util_Url__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../util/Url */ "./src/app/util/Url/index.js");
/* harmony import */ var _SearchPage_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./SearchPage.component */ "./src/app/route/SearchPage/SearchPage.component.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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
 // TODO: try SEARCH type














var BreadcrumbsDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/Breadcrumbs/Breadcrumbs.dispatcher */ "./src/app/store/Breadcrumbs/Breadcrumbs.dispatcher.js"));
var CategoryDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/Category/Category.dispatcher */ "./src/app/store/Category/Category.dispatcher.js"));
var MetaDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/Meta/Meta.dispatcher */ "./src/app/store/Meta/Meta.dispatcher.js"));
var NoMatchDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/NoMatch/NoMatch.dispatcher */ "./src/app/store/NoMatch/NoMatch.dispatcher.js"));
var ProductListInfoDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/ProductListInfo/ProductListInfo.dispatcher */ "./src/app/store/ProductListInfo/ProductListInfo.dispatcher.js"));
/** @namespace Route/SearchPage/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    category: state.CategoryReducer.category,
    isOffline: state.OfflineReducer.isOffline,
    filters: state.ProductListInfoReducer.filters,
    currentArgs: state.ProductListReducer.currentArgs,
    sortFields: state.ProductListInfoReducer.sortFields,
    minPriceRange: state.ProductListInfoReducer.minPrice,
    maxPriceRange: state.ProductListInfoReducer.maxPrice,
    isInfoLoading: state.ProductListInfoReducer.isLoading,
    totalPages: state.ProductListReducer.totalPages,
    device: state.ConfigReducer.device
  };
}, "Route/SearchPage/Container/mapStateToProps");
/** @namespace Route/SearchPage/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    toggleOverlayByKey: function toggleOverlayByKey(key) {
      return dispatch(Object(_store_Overlay_Overlay_action__WEBPACK_IMPORTED_MODULE_9__["toggleOverlayByKey"])(key));
    },
    changeHeaderState: function changeHeaderState(state) {
      return dispatch(Object(_store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_6__["changeNavigationState"])(_store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_7__["TOP_NAVIGATION_TYPE"], state));
    },
    changeNavigationState: function changeNavigationState(state) {
      return dispatch(Object(_store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_6__["changeNavigationState"])(_store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_7__["BOTTOM_NAVIGATION_TYPE"], state));
    },
    requestCategory: function requestCategory(options) {
      return CategoryDispatcher.then(function (_ref) {
        var dispatcher = _ref.default;
        return dispatcher.handleData(dispatch, options);
      });
    },
    updateBreadcrumbs: function updateBreadcrumbs(breadcrumbs) {
      return BreadcrumbsDispatcher.then(function (_ref2) {
        var dispatcher = _ref2.default;
        return dispatcher.update(breadcrumbs, dispatch);
      });
    },
    requestProductListInfo: function requestProductListInfo(options) {
      return ProductListInfoDispatcher.then(function (_ref3) {
        var dispatcher = _ref3.default;
        return dispatcher.handleData(dispatch, options);
      });
    },
    updateLoadStatus: function updateLoadStatus(isLoading) {
      return dispatch(Object(_store_ProductListInfo_ProductListInfo_action__WEBPACK_IMPORTED_MODULE_10__["updateInfoLoadStatus"])(isLoading));
    },
    updateNoMatch: function updateNoMatch(options) {
      return NoMatchDispatcher.then(function (_ref4) {
        var dispatcher = _ref4.default;
        return dispatcher.updateNoMatch(dispatch, options);
      });
    },
    setBigOfflineNotice: function setBigOfflineNotice(isBig) {
      return dispatch(Object(_store_Offline_Offline_action__WEBPACK_IMPORTED_MODULE_8__["setBigOfflineNotice"])(isBig));
    },
    updateMetaFromCategory: function updateMetaFromCategory(category) {
      return MetaDispatcher.then(function (_ref5) {
        var dispatcher = _ref5.default;
        return dispatcher.updateWithCategory(category, dispatch);
      });
    },
    updateCurrentCategory: function updateCurrentCategory(category) {
      return dispatch(Object(_store_Category_Category_action__WEBPACK_IMPORTED_MODULE_4__["updateCurrentCategory"])(category));
    },
    updateMeta: function updateMeta(meta) {
      return dispatch(Object(_store_Meta_Meta_action__WEBPACK_IMPORTED_MODULE_5__["updateMeta"])(meta));
    }
  };
}, "Route/SearchPage/Container/mapDispatchToProps");
/** @namespace Route/SearchPage/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _SearchPageContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_SearchPageContainer, _Extensible);

  function _SearchPageContainer() {
    _classCallCheck(this, _SearchPageContainer);

    return _possibleConstructorReturn(this, _getPrototypeOf(_SearchPageContainer).apply(this, arguments));
  }

  _createClass(_SearchPageContainer, [{
    key: "updateMeta",
    value: function updateMeta() {
      var updateMeta = this.props.updateMeta;
      updateMeta({
        title: __('Search')
      });
    }
  }, {
    key: "updateBreadcrumbs",
    value: function updateBreadcrumbs() {
      var updateBreadcrumbs = this.props.updateBreadcrumbs;
      var search = this.getSearchParam();
      updateBreadcrumbs([{
        url: '',
        name: search.toUpperCase()
      }, {
        url: '/',
        name: __('Home')
      }]);
    }
  }, {
    key: "updateHeaderState",
    value: function updateHeaderState() {
      var _history$location;

      var _this$props = this.props,
          changeHeaderState = _this$props.changeHeaderState,
          history = _this$props.history;

      var _ref6 = (history === null || history === void 0 ? void 0 : (_history$location = history.location) === null || _history$location === void 0 ? void 0 : _history$location.state) || {},
          isFromCategory = _ref6.isFromCategory;

      var search = this.getSearchParam();
      var onBackClick = isFromCategory ? function () {
        return history.goBack();
      } : function () {
        return history.push(Object(_util_Url__WEBPACK_IMPORTED_MODULE_12__["appendWithStoreCode"])('/menu'));
      };
      changeHeaderState({
        name: _component_Header_Header_config__WEBPACK_IMPORTED_MODULE_1__["CATEGORY"],
        title: search,
        onBackClick: onBackClick
      });
    }
  }, {
    key: "getIsMatchingListFilter",
    value: function getIsMatchingListFilter() {
      var currentSearch = this.props.currentArgs.search;
      var search = this.getSearchParam(); // if the search requested is equal to search from URL

      return search === currentSearch;
    }
  }, {
    key: "getIsMatchingInfoFilter",
    value: function getIsMatchingInfoFilter() {
      var currentSearch = this.props.currentArgs.search;
      var search = this.getSearchParam(); // if the search requested is equal to search from URL

      return search === currentSearch;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateMeta();
      this.updateBreadcrumbs();
      this.updateHeaderState();
      this.updateNavigationState();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props2 = this.props,
          isOffline = _this$props2.isOffline,
          query = _this$props2.match.params.query;
      var prevQuery = prevProps.match.params.query;

      if (isOffline) {
        Object(_util_Request__WEBPACK_IMPORTED_MODULE_11__["debounce"])(this.setOfflineNoticeSize, _CategoryPage_CategoryPage_config__WEBPACK_IMPORTED_MODULE_2__["LOADING_TIME"])();
      }
      /**
       * If search query has changed - update related information
       */


      if (query !== prevQuery) {
        this.updateMeta();
        this.updateBreadcrumbs();
        this.updateHeaderState();
      }
    }
  }, {
    key: "getSearchParam",
    value: function getSearchParam() {
      var query = this.props.match.params.query;
      return query;
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _SearchPage_component__WEBPACK_IMPORTED_MODULE_13__["default"], _extends({}, this.props, this.containerFunctions, this.containerProps(), {
          // addded here to not override the container props
          search: this.getSearchParam()
        }))
      );
    }
  }]);

  return _SearchPageContainer;
}(Extensible(_CategoryPage_CategoryPage_container__WEBPACK_IMPORTED_MODULE_3__["CategoryPageContainer"]));
Object.defineProperty(_SearchPageContainer, 'name', {
  value: 'SearchPageContainer'
});

var SearchPageContainer = middleware(_SearchPageContainer, "Route/SearchPage/Container");

_defineProperty(SearchPageContainer, "defaultProps", _objectSpread2(_objectSpread2({}, SearchPageContainer.defaultProps), {}, {
  isSearchPage: true
}));

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["connect"])(mapStateToProps, mapDispatchToProps)(SearchPageContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/route/SearchPage/SearchPage.style.scss":
/*!********************************************************!*\
  !*** ./src/app/route/SearchPage/SearchPage.style.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291333670
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/route/SearchPage/index.js":
/*!*******************************************!*\
  !*** ./src/app/route/SearchPage/index.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SearchPage_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SearchPage.container */ "./src/app/route/SearchPage/SearchPage.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _SearchPage_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/store/ProductListInfo/ProductListInfo.dispatcher.js":
/*!*********************************************************************!*\
  !*** ./src/app/store/ProductListInfo/ProductListInfo.dispatcher.js ***!
  \*********************************************************************/
/*! exports provided: _ProductListInfoDispatcher, ProductListInfoDispatcher, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductListInfoDispatcher", function() { return _ProductListInfoDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductListInfoDispatcher", function() { return ProductListInfoDispatcher; });
/* harmony import */ var _query_ProductList_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../query/ProductList.query */ "./src/app/query/ProductList.query.js");
/* harmony import */ var _NoMatch_NoMatch_action__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../NoMatch/NoMatch.action */ "./src/app/store/NoMatch/NoMatch.action.js");
/* harmony import */ var _Notification_Notification_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Notification/Notification.action */ "./src/app/store/Notification/Notification.action.js");
/* harmony import */ var _ProductListInfo_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ProductListInfo.action */ "./src/app/store/ProductListInfo/ProductListInfo.action.js");
/* harmony import */ var _util_Request__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/Request */ "./src/app/util/Request/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
 * Product List Info Dispatcher
 * @class ProductListInfoDispatcher
 * @extends QueryDispatcher
 * @namespace Store/ProductListInfo/Dispatcher
 */

var _ProductListInfoDispatcher =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductListInfoDispatcher, _Extensible);

  function _ProductListInfoDispatcher() {
    _classCallCheck(this, _ProductListInfoDispatcher);

    return _possibleConstructorReturn(this, _getPrototypeOf(_ProductListInfoDispatcher).apply(this, arguments));
  }

  _createClass(_ProductListInfoDispatcher, [{
    key: "__construct",
    value: function __construct() {
      _get(_getPrototypeOf(_ProductListInfoDispatcher.prototype), "__construct", this).call(this, 'ProductListInfo');
    }
  }, {
    key: "onSuccess",
    value: function onSuccess(_ref, dispatch, options) {
      var products = _ref.products;
      var filter = options.args.filter;
      dispatch(Object(_ProductListInfo_action__WEBPACK_IMPORTED_MODULE_3__["updateProductListInfo"])(products, filter));
    }
  }, {
    key: "onError",
    value: function onError(error, dispatch) {
      dispatch(Object(_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_2__["showNotification"])('error', 'Error fetching Product List Information!', error));
      dispatch(Object(_NoMatch_NoMatch_action__WEBPACK_IMPORTED_MODULE_1__["updateNoMatch"])(true));
    }
  }, {
    key: "prepareRequest",
    value: function prepareRequest(options, dispatch) {
      dispatch(Object(_ProductListInfo_action__WEBPACK_IMPORTED_MODULE_3__["updateInfoLoadStatus"])(true));
      return _query_ProductList_query__WEBPACK_IMPORTED_MODULE_0__["default"].getQuery(_objectSpread2(_objectSpread2({}, options), {}, {
        requireInfo: true
      }));
    }
  }]);

  return _ProductListInfoDispatcher;
}(Extensible(_util_Request__WEBPACK_IMPORTED_MODULE_4__["QueryDispatcher"]));
Object.defineProperty(_ProductListInfoDispatcher, 'name', {
  value: 'ProductListInfoDispatcher'
});

var ProductListInfoDispatcher = middleware(_ProductListInfoDispatcher, "Store/ProductListInfo/Dispatcher");
/* harmony default export */ __webpack_exports__["default"] = (new ProductListInfoDispatcher());
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/type/Category.js":
/*!**********************************!*\
  !*** ./src/app/type/Category.js ***!
  \**********************************/
/*! exports provided: BreadcrumbsType, CategoryFragment, CategoryTreeType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BreadcrumbsType", function() { return BreadcrumbsType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryFragment", function() { return CategoryFragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryTreeType", function() { return CategoryTreeType; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
function _objectSpread2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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

var BreadcrumbsType = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
  category_name: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  category_url: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  category_level: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number
}));
var CategoryFragment = {
  id: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  breadcrumbs: BreadcrumbsType,
  description: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  image: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  meta_description: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  meta_title: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  name: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  product_count: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  url_key: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  url_path: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  display_mode: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
};
var CategoryTreeType = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape(_objectSpread2(_objectSpread2({}, CategoryFragment), {}, {
  children: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape(CategoryFragment))
}));

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
//# sourceMappingURL=category.js.map