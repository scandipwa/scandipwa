(this["webpackJsonp"] = this["webpackJsonp"] || []).push([["account~cart~category~misc~product"],{

/***/ "./src/app/component/ProductAttributeValue/ProductAttributeValue.component.js":
/*!************************************************************************************!*\
  !*** ./src/app/component/ProductAttributeValue/ProductAttributeValue.component.js ***!
  \************************************************************************************/
/*! exports provided: _ProductAttributeValue, ProductAttributeValue, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, __, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductAttributeValue", function() { return _ProductAttributeValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductAttributeValue", function() { return ProductAttributeValue; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Field */ "./src/app/component/Field/index.js");
/* harmony import */ var _Html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Html */ "./src/app/component/Html/index.js");
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _ProductAttributeValue_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ProductAttributeValue.config */ "./src/app/component/ProductAttributeValue/ProductAttributeValue.config.js");
/* harmony import */ var _ProductAttributeValue_style__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ProductAttributeValue.style */ "./src/app/component/ProductAttributeValue/ProductAttributeValue.style.scss");
/* harmony import */ var _ProductAttributeValue_style__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_ProductAttributeValue_style__WEBPACK_IMPORTED_MODULE_7__);
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

/* eslint-disable no-magic-numbers */

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








/** @namespace Component/ProductAttributeValue/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductAttributeValue =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductAttributeValue, _Extensible);

  function _ProductAttributeValue() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ProductAttributeValue);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ProductAttributeValue)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "clickHandler", _this.clickHandler.bind(_assertThisInitialized(_this)));

    _defineProperty(_assertThisInitialized(_this), "getOptionLabel", _this.getOptionLabel.bind(_assertThisInitialized(_this)));

    return _this;
  }

  _createClass(_ProductAttributeValue, [{
    key: "getIsColorLight",
    value: function getIsColorLight(hex) {
      var color = hex.charAt(0) === '#' ? hex.substring(1, 7) : hex;
      var r = parseInt(color.substring(0, 2), 16); // hexToR

      var g = parseInt(color.substring(2, 4), 16); // hexToG

      var b = parseInt(color.substring(4, 6), 16); // hexToB

      return r * 0.299 + g * 0.587 + b * 0.114 > 186;
    }
  }, {
    key: "getOptionLabel",
    value: function getOptionLabel(value) {
      var attribute_options = this.props.attribute.attribute_options;

      if (attribute_options) {
        var optionValues = attribute_options[value];

        if (optionValues) {
          return optionValues;
        }
      }

      return {};
    }
  }, {
    key: "clickHandler",
    value: function clickHandler(e) {
      var _this$props = this.props,
          onClick = _this$props.onClick,
          attribute = _this$props.attribute;
      e.preventDefault();
      onClick(attribute);
    }
  }, {
    key: "renderTextAttribute",
    value: function renderTextAttribute() {
      var attribute_value = this.props.attribute.attribute_value;
      return this.renderStringValue(attribute_value);
    }
  }, {
    key: "renderBooleanAttribute",
    value: function renderBooleanAttribute() {
      var attribute_value = this.props.attribute.attribute_value;
      return this.renderStringValue(attribute_value ? __('Yes') : __('No'));
    }
  }, {
    key: "renderMultiSelectAttribute",
    value: function renderMultiSelectAttribute() {
      var _this2 = this;

      var attribute_value = this.props.attribute.attribute_value;
      var labelsArray = attribute_value.split(',').reduce(function (labels, value) {
        var _this2$getOptionLabel = _this2.getOptionLabel(value),
            label = _this2$getOptionLabel.label;

        if (label) {
          labels.push(label);
        }

        return labels;
      }, []);
      return this.renderStringValue(labelsArray.length ? labelsArray.join(', ') : __('N/A'));
    }
  }, {
    key: "renderSelectAttribute",
    value: function renderSelectAttribute() {
      var _this$props$attribute = this.props.attribute,
          attribute_value = _this$props$attribute.attribute_value,
          attribute_code = _this$props$attribute.attribute_code;
      var attributeOption = this.getOptionLabel(attribute_value);
      var label = attributeOption.label,
          swatch_data = attributeOption.swatch_data;

      if (!swatch_data || _ProductAttributeValue_config__WEBPACK_IMPORTED_MODULE_6__["STRING_ONLY_ATTRIBUTE_CODES"].includes(attribute_code)) {
        return this.renderStringValue(label || __('N/A'));
      }

      var value = swatch_data.value,
          type = swatch_data.type;

      switch (type) {
        case '0':
          return this.renderStringValue(value, label);

        case '1':
          return this.renderColorValue(value, label);

        case '2':
          return this.renderImageValue(value, label);

        default:
          return this.renderStringValue(label || __('N/A'));
      }
    }
  }, {
    key: "renderImageAttribute",
    value: function renderImageAttribute() {
      var _this$props$attribute2 = this.props.attribute,
          attribute_label = _this$props$attribute2.attribute_label,
          attribute_value = _this$props$attribute2.attribute_value;

      if (!attribute_value || attribute_value === 'no_selection') {
        return this.renderPlaceholder();
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "img", {
          block: "ProductAttributeValue",
          elem: "MediaImage",
          src: "/media/catalog/product".concat(attribute_value),
          alt: attribute_label
        })
      );
    }
  }, {
    key: "renderTextAreaAttribute",
    value: function renderTextAreaAttribute() {
      var attribute_value = this.props.attribute.attribute_value;
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductAttributeValue",
          elem: "TextArea"
        },
        /*#__PURE__*/
        _checkBEM(React, _Html__WEBPACK_IMPORTED_MODULE_3__["default"], {
          content: attribute_value
        }))
      );
    }
  }, {
    key: "renderPlaceholder",
    value: function renderPlaceholder() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductAttributeValue",
          elem: "Placeholder"
        })
      );
    }
  }, {
    key: "renderColorValue",
    value: function renderColorValue(color, label) {
      var _this$props2 = this.props,
          isFormattedAsText = _this$props2.isFormattedAsText,
          isSelected = _this$props2.isSelected;
      var isLight = this.getIsColorLight(color);

      if (isFormattedAsText) {
        return label || __('N/A');
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "data", {
          block: "ProductAttributeValue",
          elem: "Color",
          value: label,
          title: label,
          style: {
            '--option-background-color': color,
            '--option-border-color': isLight ? '#000' : color,
            '--option-check-mark-background': isLight ? '#000' : '#fff',
            '--option-is-selected': +isSelected
          }
        })
      );
    }
  }, {
    key: "renderImageValue",
    value: function renderImageValue(img, label) {
      var _this$props3 = this.props,
          isFormattedAsText = _this$props3.isFormattedAsText,
          isSelected = _this$props3.isSelected;

      if (isFormattedAsText) {
        return label || __('N/A');
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null,
        /*#__PURE__*/
        _checkBEM(React, "img", {
          block: "ProductAttributeValue",
          elem: "Image",
          src: "/media/attribute/swatch".concat(img),
          alt: label
        }),
        /*#__PURE__*/
        _checkBEM(React, "data", {
          block: "ProductAttributeValue",
          elem: "Image-Overlay",
          value: label,
          title: label,
          style: {
            '--option-is-selected': +isSelected
          }
        }))
      );
    }
  }, {
    key: "renderDropdown",
    value: function renderDropdown(value) {
      var isSelected = this.props.isSelected;
      return (
        /*#__PURE__*/
        _checkBEM(React, _Field__WEBPACK_IMPORTED_MODULE_2__["default"], {
          id: value,
          name: value,
          type: "checkbox",
          label: value,
          value: value,
          mix: {
            block: 'ProductAttributeValue',
            elem: 'Text',
            mods: {
              isSelected: isSelected
            }
          },
          checked: isSelected
        })
      );
    }
  }, {
    key: "renderStringValue",
    value: function renderStringValue(value, label) {
      var _this$props4 = this.props,
          isFormattedAsText = _this$props4.isFormattedAsText,
          isSelected = _this$props4.isSelected;
      var isSwatch = label;

      if (isFormattedAsText) {
        return label || value || __('N/A');
      }

      if (!isSwatch) {
        return this.renderDropdown(value);
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "span", {
          block: "ProductAttributeValue",
          elem: "String",
          mods: {
            isSelected: isSelected
          },
          title: label
        }, value)
      );
    }
  }, {
    key: "renderAttributeByType",
    value: function renderAttributeByType() {
      var attribute_type = this.props.attribute.attribute_type;

      switch (attribute_type) {
        case 'select':
          return this.renderSelectAttribute();

        case 'boolean':
          return this.renderBooleanAttribute();

        case 'text':
          return this.renderTextAttribute();

        case 'multiselect':
          return this.renderMultiSelectAttribute();

        case 'media_image':
          return this.renderImageAttribute();

        case 'textarea':
          return this.renderTextAreaAttribute();

        default:
          return this.renderPlaceholder();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          getLink = _this$props5.getLink,
          attribute = _this$props5.attribute,
          isAvailable = _this$props5.isAvailable,
          _this$props5$attribut = _this$props5.attribute,
          attribute_code = _this$props5$attribut.attribute_code,
          attribute_value = _this$props5$attribut.attribute_value,
          mix = _this$props5.mix,
          isFormattedAsText = _this$props5.isFormattedAsText;

      if (attribute_code && !attribute_value) {
        return null;
      }

      var href = getLink(attribute); // Invert to apply css rule without using not()

      var isNotAvailable = !isAvailable;

      if (isFormattedAsText) {
        return (
          /*#__PURE__*/
          _checkBEM(React, "div", {
            block: "ProductAttributeValue",
            mix: mix
          }, this.renderAttributeByType())
        );
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "a", {
          href: href,
          block: "ProductAttributeValue",
          mods: {
            isNotAvailable: isNotAvailable
          },
          onClick: this.clickHandler,
          "aria-hidden": isNotAvailable,
          mix: mix
        }, this.renderAttributeByType())
      );
    }
  }]);

  return _ProductAttributeValue;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductAttributeValue, 'name', {
  value: 'ProductAttributeValue'
});

var ProductAttributeValue = middleware(_ProductAttributeValue, "Component/ProductAttributeValue/Component");

_defineProperty(ProductAttributeValue, "propTypes", {
  getLink: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  attribute: _type_ProductList__WEBPACK_IMPORTED_MODULE_5__["AttributeType"].isRequired,
  isSelected: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  isAvailable: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  mix: _type_Common__WEBPACK_IMPORTED_MODULE_4__["MixType"],
  isFormattedAsText: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool
});

_defineProperty(ProductAttributeValue, "defaultProps", {
  isSelected: false,
  onClick: function onClick() {},
  getLink: function getLink() {},
  mix: {},
  isAvailable: true,
  isFormattedAsText: false
});

/* harmony default export */ __webpack_exports__["default"] = (ProductAttributeValue);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductAttributeValue/ProductAttributeValue.config.js":
/*!*********************************************************************************!*\
  !*** ./src/app/component/ProductAttributeValue/ProductAttributeValue.config.js ***!
  \*********************************************************************************/
/*! exports provided: STRING_ONLY_ATTRIBUTE_CODES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STRING_ONLY_ATTRIBUTE_CODES", function() { return STRING_ONLY_ATTRIBUTE_CODES; });
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
var STRING_ONLY_ATTRIBUTE_CODES = ['category_id'];

/***/ }),

/***/ "./src/app/component/ProductAttributeValue/ProductAttributeValue.style.scss":
/*!**********************************************************************************!*\
  !*** ./src/app/component/ProductAttributeValue/ProductAttributeValue.style.scss ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340529
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ProductAttributeValue/index.js":
/*!**********************************************************!*\
  !*** ./src/app/component/ProductAttributeValue/index.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProductAttributeValue_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductAttributeValue.component */ "./src/app/component/ProductAttributeValue/ProductAttributeValue.component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ProductAttributeValue_component__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/ProductCard/ProductCard.component.js":
/*!****************************************************************!*\
  !*** ./src/app/component/ProductCard/ProductCard.component.js ***!
  \****************************************************************/
/*! exports provided: _ProductCard, ProductCard, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductCard", function() { return _ProductCard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductCard", function() { return ProductCard; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Image */ "./src/app/component/Image/index.js");
/* harmony import */ var _Link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Link */ "./src/app/component/Link/index.js");
/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Loader */ "./src/app/component/Loader/index.js");
/* harmony import */ var _ProductAttributeValue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ProductAttributeValue */ "./src/app/component/ProductAttributeValue/index.js");
/* harmony import */ var _ProductPrice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ProductPrice */ "./src/app/component/ProductPrice/index.js");
/* harmony import */ var _ProductReviewRating__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../ProductReviewRating */ "./src/app/component/ProductReviewRating/index.js");
/* harmony import */ var _TextPlaceholder__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../TextPlaceholder */ "./src/app/component/TextPlaceholder/index.js");
/* harmony import */ var _TierPrices__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../TierPrices */ "./src/app/component/TierPrices/index.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _util_Product__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../util/Product */ "./src/app/util/Product/index.js");
/* harmony import */ var _ProductCard_style__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./ProductCard.style */ "./src/app/component/ProductCard/ProductCard.style.scss");
/* harmony import */ var _ProductCard_style__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_ProductCard_style__WEBPACK_IMPORTED_MODULE_12__);
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













/**
 * Product card
 * @class ProductCard
 * @namespace Component/ProductCard/Component
 */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductCard =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductCard, _Extensible);

  function _ProductCard() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ProductCard);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ProductCard)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "contentObject", {
      renderCardLinkWrapper: _this.renderCardLinkWrapper.bind(_assertThisInitialized(_this)),
      pictureBlock: {
        picture: _this.renderPicture.bind(_assertThisInitialized(_this))
      },
      content: {
        review: _this.renderReviews.bind(_assertThisInitialized(_this)),
        productPrice: _this.renderProductPrice.bind(_assertThisInitialized(_this)),
        confOptions: _this.renderVisualConfigurableOptions.bind(_assertThisInitialized(_this)),
        tierPrice: _this.renderTierPrice.bind(_assertThisInitialized(_this)),
        mainDetails: _this.renderMainDetails.bind(_assertThisInitialized(_this)),
        additionalProductDetails: _this.renderAdditionalProductDetails.bind(_assertThisInitialized(_this))
      }
    });

    _defineProperty(_assertThisInitialized(_this), "imageRef",
    /*#__PURE__*/
    Object(react__WEBPACK_IMPORTED_MODULE_1__["createRef"])());

    _defineProperty(_assertThisInitialized(_this), "registerSharedElement", function () {
      var registerSharedElement = _this.props.registerSharedElement;
      registerSharedElement(_this.imageRef);
    });

    return _this;
  }

  _createClass(_ProductCard, [{
    key: "renderConfigurablePriceBadge",
    value: function renderConfigurablePriceBadge() {
      var type_id = this.props.product.type_id;

      if (type_id !== _util_Product__WEBPACK_IMPORTED_MODULE_11__["CONFIGURABLE"]) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "p", {
          mix: {
            block: 'ProductCard',
            elem: 'PriceBadge'
          }
        }, __('As Low as'))
      );
    }
  }, {
    key: "renderProductPrice",
    value: function renderProductPrice() {
      var _this$props = this.props,
          _this$props$product = _this$props.product,
          price_range = _this$props$product.price_range,
          type_id = _this$props$product.type_id,
          isConfigurableProductOutOfStock = _this$props.isConfigurableProductOutOfStock,
          isBundleProductOutOfStock = _this$props.isBundleProductOutOfStock;

      if (!price_range) {
        return (
          /*#__PURE__*/
          _checkBEM(React, _TextPlaceholder__WEBPACK_IMPORTED_MODULE_8__["default"], null)
        );
      }

      switch (type_id) {
        case _util_Product__WEBPACK_IMPORTED_MODULE_11__["CONFIGURABLE"]:
          if (isConfigurableProductOutOfStock()) {
            return null;
          }

          break;

        case _util_Product__WEBPACK_IMPORTED_MODULE_11__["BUNDLE"]:
          if (isBundleProductOutOfStock()) {
            return null;
          }

          break;

        default:
          break;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null, this.renderConfigurablePriceBadge(),
        /*#__PURE__*/
        _checkBEM(React, _ProductPrice__WEBPACK_IMPORTED_MODULE_6__["default"], {
          price: price_range,
          mix: {
            block: 'ProductCard',
            elem: 'Price'
          }
        }))
      );
    }
  }, {
    key: "renderTierPrice",
    value: function renderTierPrice() {
      var productOrVariant = this.props.productOrVariant;
      return (
        /*#__PURE__*/
        _checkBEM(React, _TierPrices__WEBPACK_IMPORTED_MODULE_9__["default"], {
          product: productOrVariant,
          isLowestPrice: true
        })
      );
    }
  }, {
    key: "renderVisualConfigurableOptions",
    value: function renderVisualConfigurableOptions() {
      var availableVisualOptions = this.props.availableVisualOptions;
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductCard",
          elem: "ConfigurableOptions"
        }, availableVisualOptions.map(function (_ref) {
          var value = _ref.value,
              label = _ref.label;
          return (
            /*#__PURE__*/
            _checkBEM(React, "span", {
              block: "ProductCard",
              elem: "Color",
              key: value,
              style: {
                backgroundColor: value
              },
              "aria-label": label
            })
          );
        }))
      );
    }
  }, {
    key: "renderPicture",
    value: function renderPicture() {
      var mix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _this$props2 = this.props,
          _this$props2$product = _this$props2.product,
          id = _this$props2$product.id,
          name = _this$props2$product.name,
          thumbnail = _this$props2.thumbnail;
      this.sharedComponent =
      /*#__PURE__*/
      _checkBEM(React, _Image__WEBPACK_IMPORTED_MODULE_2__["default"], {
        imageRef: this.imageRef,
        src: thumbnail,
        alt: name,
        ratio: "custom",
        mix: {
          block: 'ProductCard',
          elem: 'Picture',
          mix: mix
        },
        isPlaceholder: !id
      });
      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null, this.sharedComponent,
        /*#__PURE__*/
        _checkBEM(React, "img", {
          style: {
            display: 'none'
          },
          alt: name,
          src: thumbnail
        }))
      );
    }
  }, {
    key: "renderReviews",
    value: function renderReviews() {
      var _this$props$product$r = this.props.product.review_summary;
      _this$props$product$r = _this$props$product$r === void 0 ? {} : _this$props$product$r;
      var rating_summary = _this$props$product$r.rating_summary;

      if (!rating_summary) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductCard",
          elem: "Reviews"
        },
        /*#__PURE__*/
        _checkBEM(React, _ProductReviewRating__WEBPACK_IMPORTED_MODULE_7__["default"], {
          summary: rating_summary || 0
        }))
      );
    }
  }, {
    key: "renderAdditionalProductDetails",
    value: function renderAdditionalProductDetails() {
      var _this$props3 = this.props,
          sku = _this$props3.product.sku,
          getAttribute = _this$props3.getAttribute;
      var _window$contentConfig = window.contentConfiguration.product_list_content;
      _window$contentConfig = _window$contentConfig === void 0 ? {} : _window$contentConfig;
      var attribute_to_display = _window$contentConfig.attribute_to_display;
      var brand = getAttribute(attribute_to_display || 'brand') || {};

      if (sku && !brand) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductCard",
          elem: "Brand",
          mods: {
            isLoaded: !!brand
          }
        },
        /*#__PURE__*/
        _checkBEM(React, _ProductAttributeValue__WEBPACK_IMPORTED_MODULE_5__["default"], {
          attribute: brand,
          isFormattedAsText: true
        }))
      );
    }
  }, {
    key: "renderMainDetails",
    value: function renderMainDetails() {
      var name = this.props.product.name;
      return (
        /*#__PURE__*/
        _checkBEM(React, "p", {
          block: "ProductCard",
          elem: "Name",
          mods: {
            isLoaded: !!name
          }
        },
        /*#__PURE__*/
        _checkBEM(React, _TextPlaceholder__WEBPACK_IMPORTED_MODULE_8__["default"], {
          content: name,
          length: "medium"
        }))
      );
    }
  }, {
    key: "renderCardLinkWrapper",
    value: function renderCardLinkWrapper(children) {
      var mix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _this$props4 = this.props,
          linkTo = _this$props4.linkTo,
          url = _this$props4.product.url;

      if (!url) {
        return (
          /*#__PURE__*/
          _checkBEM(React, "div", null, children)
        );
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, _Link__WEBPACK_IMPORTED_MODULE_3__["default"], {
          block: "ProductCard",
          elem: "Link",
          to: linkTo,
          onClick: this.registerSharedElement,
          mix: mix
        }, children)
      );
    }
  }, {
    key: "renderCardContent",
    value: function renderCardContent() {
      var renderContent = this.props.renderContent;

      if (renderContent) {
        return renderContent(this.contentObject);
      }

      return this.renderCardLinkWrapper(
      /*#__PURE__*/
      _checkBEM(React, React.Fragment, null,
      /*#__PURE__*/
      _checkBEM(React, "figure", {
        block: "ProductCard",
        elem: "Figure"
      }, this.renderPicture()),
      /*#__PURE__*/
      _checkBEM(React, "div", {
        block: "ProductCard",
        elem: "Content"
      }, this.renderReviews(), this.renderProductPrice(), this.renderVisualConfigurableOptions(), this.renderTierPrice(), this.renderMainDetails(), this.renderAdditionalProductDetails())));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          children = _this$props5.children,
          mix = _this$props5.mix,
          isLoading = _this$props5.isLoading;
      return (
        /*#__PURE__*/
        _checkBEM(React, "li", {
          block: "ProductCard",
          mix: mix
        },
        /*#__PURE__*/
        _checkBEM(React, _Loader__WEBPACK_IMPORTED_MODULE_4__["default"], {
          isLoading: isLoading
        }), this.renderCardContent(),
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductCard",
          elem: "AdditionalContent"
        }, children))
      );
    }
  }]);

  return _ProductCard;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductCard, 'name', {
  value: 'ProductCard'
});

var ProductCard = middleware(_ProductCard, "Component/ProductCard/Component");

_defineProperty(ProductCard, "propTypes", {
  linkTo: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({}),
  product: _type_ProductList__WEBPACK_IMPORTED_MODULE_10__["ProductType"].isRequired,
  productOrVariant: _type_ProductList__WEBPACK_IMPORTED_MODULE_10__["ProductType"].isRequired,
  thumbnail: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  availableVisualOptions: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
    label: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
    value: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
  })).isRequired,
  getAttribute: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  registerSharedElement: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  children: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.element,
  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  mix: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({}),
  renderContent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool]),
  isConfigurableProductOutOfStock: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  isBundleProductOutOfStock: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

_defineProperty(ProductCard, "defaultProps", {
  thumbnail: '',
  linkTo: {},
  children: null,
  isLoading: false,
  mix: {},
  renderContent: false
});

/* harmony default export */ __webpack_exports__["default"] = (ProductCard);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductCard/ProductCard.config.js":
/*!*************************************************************!*\
  !*** ./src/app/component/ProductCard/ProductCard.config.js ***!
  \*************************************************************/
/*! exports provided: IN_STOCK */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IN_STOCK", function() { return IN_STOCK; });
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
var IN_STOCK = 'IN_STOCK';

/***/ }),

/***/ "./src/app/component/ProductCard/ProductCard.container.js":
/*!****************************************************************!*\
  !*** ./src/app/component/ProductCard/ProductCard.container.js ***!
  \****************************************************************/
/*! exports provided: CartDispatcher, mapDispatchToProps, _ProductCardContainer, ProductCardContainer, mapStateToProps, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartDispatcher", function() { return CartDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductCardContainer", function() { return _ProductCardContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductCardContainer", function() { return ProductCardContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var unstated__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! unstated */ "./node_modules/unstated/lib/unstated.es.js");
/* harmony import */ var _SharedTransition_SharedTransition_unstated__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../SharedTransition/SharedTransition.unstated */ "./src/app/component/SharedTransition/SharedTransition.unstated.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _util_Product__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../util/Product */ "./src/app/util/Product/index.js");
/* harmony import */ var _util_Url__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../util/Url */ "./src/app/util/Url/index.js");
/* harmony import */ var _ProductCard_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ProductCard.component */ "./src/app/component/ProductCard/ProductCard.component.js");
/* harmony import */ var _ProductCard_config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ProductCard.config */ "./src/app/component/ProductCard/ProductCard.config.js");
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









var CartDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/Cart/Cart.dispatcher */ "./src/app/store/Cart/Cart.dispatcher.js"));
/** @namespace Component/ProductCard/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    addProduct: function addProduct(options) {
      return CartDispatcher.then(function (_ref) {
        var dispatcher = _ref.default;
        return dispatcher.addProductToCart(dispatch, options);
      });
    }
  };
}, "Component/ProductCard/Container/mapDispatchToProps");
/** @namespace Component/ProductCard/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductCardContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductCardContainer, _Extensible);

  function _ProductCardContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ProductCardContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ProductCardContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      getAttribute: _this.getAttribute.bind(_assertThisInitialized(_this)),
      isConfigurableProductOutOfStock: _this.isConfigurableProductOutOfStock.bind(_assertThisInitialized(_this)),
      isBundleProductOutOfStock: _this.isConfigurableProductOutOfStock.bind(_assertThisInitialized(_this))
    });

    _defineProperty(_assertThisInitialized(_this), "containerProps", function () {
      return {
        availableVisualOptions: _this._getAvailableVisualOptions(),
        currentVariantIndex: _this._getCurrentVariantIndex(),
        productOrVariant: _this._getProductOrVariant(),
        thumbnail: _this._getThumbnail(),
        linkTo: _this._getLinkTo()
      };
    });

    return _this;
  }

  _createClass(_ProductCardContainer, [{
    key: "getAttribute",
    value: function getAttribute(code) {
      var selectedFilters = this.props.selectedFilters;

      if (!Object.keys(selectedFilters).length) {
        var _this$props$product$a = this.props.product.attributes,
            _attributes = _this$props$product$a === void 0 ? {} : _this$props$product$a;

        return _attributes[code];
      }

      var currentVariantIndex = this._getCurrentVariantIndex();

      var _this$props = this.props,
          product = _this$props.product,
          _this$props$product$v = _this$props.product.variants,
          variants = _this$props$product$v === void 0 ? [] : _this$props$product$v;
      var _product$attributes = product.attributes,
          parentAttributes = _product$attributes === void 0 ? {} : _product$attributes;

      var _ref2 = variants[currentVariantIndex] || product,
          _ref2$attributes = _ref2.attributes,
          attributes = _ref2$attributes === void 0 ? parentAttributes : _ref2$attributes;

      var _ref3 = parentAttributes[code] || {},
          _ref3$attribute_optio = _ref3.attribute_options,
          attribute_options = _ref3$attribute_optio === void 0 ? {} : _ref3$attribute_optio;

      return _objectSpread2(_objectSpread2({}, attributes[code]), {}, {
        attribute_options: attribute_options
      });
    }
  }, {
    key: "_getLinkTo",
    value: function _getLinkTo() {
      var _this$props2 = this.props,
          url = _this$props2.product.url,
          product = _this$props2.product;

      if (!url) {
        return undefined;
      }

      var _this$_getConfigurabl = this._getConfigurableParameters(),
          parameters = _this$_getConfigurabl.parameters;

      return {
        pathname: url,
        state: {
          product: product
        },
        search: Object(_util_Url__WEBPACK_IMPORTED_MODULE_6__["objectToUri"])(parameters)
      };
    }
  }, {
    key: "_getCurrentVariantIndex",
    value: function _getCurrentVariantIndex() {
      var _this$_getConfigurabl2 = this._getConfigurableParameters(),
          index = _this$_getConfigurabl2.index;

      return index >= 0 ? index : 0;
    }
  }, {
    key: "_getConfigurableParameters",
    value: function _getConfigurableParameters() {
      var _this$props3 = this.props,
          _this$props3$product$ = _this$props3.product.variants,
          variants = _this$props3$product$ === void 0 ? [] : _this$props3$product$,
          _this$props3$selected = _this$props3.selectedFilters,
          selectedFilters = _this$props3$selected === void 0 ? {} : _this$props3$selected;
      var filterKeys = Object.keys(selectedFilters);

      if (filterKeys.length < 0) {
        return {
          indexes: [],
          parameters: {}
        };
      }

      var indexes = Object(_util_Product__WEBPACK_IMPORTED_MODULE_5__["getVariantsIndexes"])(variants, selectedFilters);

      var _indexes = _slicedToArray(indexes, 1),
          index = _indexes[0];

      if (!variants[index]) {
        return {
          indexes: [],
          parameters: {}
        };
      }

      var attributes = variants[index].attributes;
      var parameters = Object.entries(attributes).reduce(function (parameters, _ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            key = _ref5[0],
            attribute_value = _ref5[1].attribute_value;

        if (filterKeys.includes(key)) {
          return _objectSpread2(_objectSpread2({}, parameters), {}, _defineProperty({}, key, attribute_value));
        }

        return parameters;
      }, {});
      return {
        indexes: indexes,
        index: index,
        parameters: parameters
      };
    }
  }, {
    key: "_isThumbnailAvailable",
    value: function _isThumbnailAvailable(path) {
      return path && path !== 'no_selection';
    }
  }, {
    key: "_getThumbnail",
    value: function _getThumbnail() {
      var product = this._getProductOrVariant();

      var _product$small_image = product.small_image;
      _product$small_image = _product$small_image === void 0 ? {} : _product$small_image;
      var url = _product$small_image.url;

      if (this._isThumbnailAvailable(url)) {
        return url;
      } // If thumbnail is, missing we try to get image from parent


      var _this$props$product$s = this.props.product.small_image;
      _this$props$product$s = _this$props$product$s === void 0 ? {} : _this$props$product$s;
      var parentUrl = _this$props$product$s.url;

      if (this._isThumbnailAvailable(parentUrl)) {
        return parentUrl;
      }

      return '';
    }
  }, {
    key: "_getProductOrVariant",
    value: function _getProductOrVariant() {
      var _this$props4 = this.props,
          _this$props4$product = _this$props4.product,
          type_id = _this$props4$product.type_id,
          variants = _this$props4$product.variants,
          product = _this$props4.product;

      if (type_id === 'configurable' && variants !== undefined && variants.length) {
        return variants[this._getCurrentVariantIndex()] || {};
      }

      return product || {};
    }
  }, {
    key: "_getAvailableVisualOptions",
    value: function _getAvailableVisualOptions() {
      var _this$props$product$c = this.props.product.configurable_options,
          configurable_options = _this$props$product$c === void 0 ? [] : _this$props$product$c;
      return Object.values(configurable_options).reduce(function (acc, _ref6) {
        var _ref6$attribute_optio = _ref6.attribute_options,
            attribute_options = _ref6$attribute_optio === void 0 ? {} : _ref6$attribute_optio,
            attribute_values = _ref6.attribute_values;
        var visualOptions = Object.values(attribute_options).reduce(function (acc, option) {
          var swatch_data = option.swatch_data,
              label = option.label,
              attrValue = option.value;

          var _ref7 = swatch_data || {},
              type = _ref7.type,
              value = _ref7.value;

          if (type === '1' && attribute_values.includes(attrValue)) {
            acc.push({
              value: value,
              label: label
            });
          }

          return acc;
        }, []);

        if (visualOptions.length > 0) {
          return [].concat(_toConsumableArray(acc), _toConsumableArray(visualOptions));
        }

        return acc;
      }, []);
    }
  }, {
    key: "isConfigurableProductOutOfStock",
    value: function isConfigurableProductOutOfStock() {
      var variants = this.props.product.variants;
      var variantsInStock = variants.filter(function (productVariant) {
        return productVariant.stock_status === _ProductCard_config__WEBPACK_IMPORTED_MODULE_8__["IN_STOCK"];
      });
      return variantsInStock.length === 0;
    }
  }, {
    key: "isBundleProductOutOfStock",
    value: function isBundleProductOutOfStock() {
      var items = this.props.product.items;

      if (items.length === 0) {
        return true;
      }

      var options = items[0].options;
      var optionsInStock = options.filter(function (option) {
        return option.product.stock_status === _ProductCard_config__WEBPACK_IMPORTED_MODULE_8__["IN_STOCK"];
      });
      return optionsInStock.length === 0;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return (
        /*#__PURE__*/
        _checkBEM(React, unstated__WEBPACK_IMPORTED_MODULE_2__["Subscribe"], {
          to: [_SharedTransition_SharedTransition_unstated__WEBPACK_IMPORTED_MODULE_3__["default"]]
        }, function (_ref8) {
          var registerSharedElement = _ref8.registerSharedElement;
          return (
            /*#__PURE__*/
            _checkBEM(React, _ProductCard_component__WEBPACK_IMPORTED_MODULE_7__["default"], _extends({}, _objectSpread2(_objectSpread2({}, _this2.props), {}, {
              registerSharedElement: registerSharedElement
            }), _this2.containerFunctions, _this2.containerProps()))
          );
        })
      );
    }
  }]);

  return _ProductCardContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]));
/** @namespace Component/ProductCard/Container/mapStateToProps */
// eslint-disable-next-line no-unused-vars

Object.defineProperty(_ProductCardContainer, 'name', {
  value: 'ProductCardContainer'
});

var ProductCardContainer = middleware(_ProductCardContainer, "Component/ProductCard/Container");

_defineProperty(ProductCardContainer, "propTypes", {
  product: _type_ProductList__WEBPACK_IMPORTED_MODULE_4__["ProductType"],
  selectedFilters: _type_ProductList__WEBPACK_IMPORTED_MODULE_4__["FilterType"]
});

_defineProperty(ProductCardContainer, "defaultProps", {
  product: {},
  selectedFilters: {}
});

var mapStateToProps = middleware(function (state) {
  return {};
}, "Component/ProductCard/Container/mapStateToProps");
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(ProductCardContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/ProductCard/ProductCard.style.scss":
/*!**************************************************************!*\
  !*** ./src/app/component/ProductCard/ProductCard.style.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340159
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ProductCard/index.js":
/*!************************************************!*\
  !*** ./src/app/component/ProductCard/index.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProductCard_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductCard.container */ "./src/app/component/ProductCard/ProductCard.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ProductCard_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/ProductPrice/ProductPrice.component.js":
/*!******************************************************************!*\
  !*** ./src/app/component/ProductPrice/ProductPrice.component.js ***!
  \******************************************************************/
/*! exports provided: _ProductPrice, ProductPrice, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductPrice", function() { return _ProductPrice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductPrice", function() { return ProductPrice; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _TextPlaceholder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../TextPlaceholder */ "./src/app/component/TextPlaceholder/index.js");
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _ProductPrice_style__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ProductPrice.style */ "./src/app/component/ProductPrice/ProductPrice.style.scss");
/* harmony import */ var _ProductPrice_style__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ProductPrice_style__WEBPACK_IMPORTED_MODULE_5__);
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






/**
 * Product price
 * @class ProductPrice
 * @namespace Component/ProductPrice/Component
 */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductPrice =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductPrice, _Extensible);

  function _ProductPrice() {
    _classCallCheck(this, _ProductPrice);

    return _possibleConstructorReturn(this, _getPrototypeOf(_ProductPrice).apply(this, arguments));
  }

  _createClass(_ProductPrice, [{
    key: "renderPlaceholder",
    value: function renderPlaceholder() {
      var mix = this.props.mix;
      return (
        /*#__PURE__*/
        _checkBEM(React, "p", {
          block: "ProductPrice",
          "aria-label": "Product Price",
          mix: mix
        },
        /*#__PURE__*/
        _checkBEM(React, _TextPlaceholder__WEBPACK_IMPORTED_MODULE_2__["default"], {
          mix: {
            block: 'ProductPrice',
            elem: 'Placeholder'
          },
          length: "custom"
        }))
      );
    }
  }, {
    key: "getCurrencySchema",
    value: function getCurrencySchema() {
      var _this$props = this.props,
          isSchemaRequired = _this$props.isSchemaRequired,
          priceCurrency = _this$props.priceCurrency;
      return isSchemaRequired ? {
        itemProp: 'priceCurrency',
        content: priceCurrency
      } : {};
    }
  }, {
    key: "getCurrentPriceSchema",
    value: function getCurrentPriceSchema() {
      var _this$props2 = this.props,
          isSchemaRequired = _this$props2.isSchemaRequired,
          variantsCount = _this$props2.variantsCount,
          price = _this$props2.price;
      var content_price = price.minimum_price.final_price ? price.minimum_price.final_price.value : price.minimum_price.regular_price.value;

      if (variantsCount > 1) {
        return isSchemaRequired ? {
          itemProp: 'lowPrice',
          content: content_price
        } : {};
      }

      return isSchemaRequired ? {
        itemProp: 'price',
        content: content_price
      } : {};
    }
  }, {
    key: "renderCurrentPrice",
    value: function renderCurrentPrice() {
      var _this$props3 = this.props,
          discountPercentage = _this$props3.discountPercentage,
          formattedFinalPrice = _this$props3.formattedFinalPrice;
      var priceSchema = this.getCurrentPriceSchema(); // Use <ins></ins> <del></del> to represent new price and the old (deleted) one

      var PriceSemanticElementName = discountPercentage > 0 ? 'ins' : 'span';
      return (
        /*#__PURE__*/
        _checkBEM(React, PriceSemanticElementName, null,
        /*#__PURE__*/
        _checkBEM(React, "span", priceSchema, formattedFinalPrice))
      );
    }
  }, {
    key: "renderOldPrice",
    value: function renderOldPrice() {
      var _this$props4 = this.props,
          roundedRegularPrice = _this$props4.roundedRegularPrice,
          discountPercentage = _this$props4.discountPercentage,
          isSchemaRequired = _this$props4.isSchemaRequired,
          variantsCount = _this$props4.variantsCount;
      var schema = isSchemaRequired && variantsCount > 1 ? {
        itemProp: 'highPrice'
      } : {};
      return (
        /*#__PURE__*/
        _checkBEM(React, "del", _extends({
          block: "ProductPrice",
          elem: "HighPrice",
          mods: {
            isVisible: discountPercentage > 0
          },
          "aria-label": __('Old product price')
        }, schema), roundedRegularPrice)
      );
    }
  }, {
    key: "renderSchema",
    value: function renderSchema() {
      var isSchemaRequired = this.props.isSchemaRequired;

      if (isSchemaRequired) {
        var currencySchema = this.getCurrencySchema();
        return (
          /*#__PURE__*/
          _checkBEM(React, "meta", currencySchema)
        );
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          _this$props5$price = _this$props5.price;
      _this$props5$price = _this$props5$price === void 0 ? {} : _this$props5$price;
      var _this$props5$price$mi = _this$props5$price.minimum_price;
      _this$props5$price$mi = _this$props5$price$mi === void 0 ? {} : _this$props5$price$mi;
      var final_price = _this$props5$price$mi.final_price,
          regular_price = _this$props5$price$mi.regular_price,
          formattedFinalPrice = _this$props5.formattedFinalPrice,
          mix = _this$props5.mix;

      if (!final_price || !regular_price) {
        return this.renderPlaceholder();
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "p", {
          block: "ProductPrice",
          mix: mix,
          "aria-label": "Product price: ".concat(formattedFinalPrice)
        }, this.renderCurrentPrice(), this.renderOldPrice(), this.renderSchema())
      );
    }
  }]);

  return _ProductPrice;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductPrice, 'name', {
  value: 'ProductPrice'
});

var ProductPrice = middleware(_ProductPrice, "Component/ProductPrice/Component");

_defineProperty(ProductPrice, "propTypes", {
  isSchemaRequired: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  roundedRegularPrice: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  priceCurrency: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  discountPercentage: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  formattedFinalPrice: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  variantsCount: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  price: _type_ProductList__WEBPACK_IMPORTED_MODULE_4__["PriceType"],
  mix: _type_Common__WEBPACK_IMPORTED_MODULE_3__["MixType"]
});

_defineProperty(ProductPrice, "defaultProps", {
  isSchemaRequired: false,
  roundedRegularPrice: '0',
  priceCurrency: 'USD',
  discountPercentage: 0,
  formattedFinalPrice: '0',
  variantsCount: 0,
  mix: {},
  price: {}
});

/* harmony default export */ __webpack_exports__["default"] = (ProductPrice);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductPrice/ProductPrice.container.js":
/*!******************************************************************!*\
  !*** ./src/app/component/ProductPrice/ProductPrice.container.js ***!
  \******************************************************************/
/*! exports provided: _ProductPriceContainer, ProductPriceContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductPriceContainer", function() { return _ProductPriceContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductPriceContainer", function() { return ProductPriceContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _util_Price__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/Price */ "./src/app/util/Price/index.js");
/* harmony import */ var _ProductPrice_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ProductPrice.component */ "./src/app/component/ProductPrice/ProductPrice.component.js");
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






/**
 * Product price
 * @class ProductPrice
 * @namespace Component/ProductPrice/Container
 */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductPriceContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductPriceContainer, _Extensible);

  function _ProductPriceContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ProductPriceContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ProductPriceContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerProps", function () {
      var _this$props$price = _this.props.price;
      _this$props$price = _this$props$price === void 0 ? {} : _this$props$price;
      var _this$props$price$min = _this$props$price.minimum_price;
      _this$props$price$min = _this$props$price$min === void 0 ? {} : _this$props$price$min;
      var _this$props$price$min2 = _this$props$price$min.discount;
      _this$props$price$min2 = _this$props$price$min2 === void 0 ? {} : _this$props$price$min2;
      var discountPercentage = _this$props$price$min2.percent_off,
          _this$props$price$min3 = _this$props$price$min.final_price;
      _this$props$price$min3 = _this$props$price$min3 === void 0 ? {} : _this$props$price$min3;
      var minimalPriceValue = _this$props$price$min3.value,
          priceCurrency = _this$props$price$min3.currency,
          _this$props$price$min4 = _this$props$price$min.regular_price;
      _this$props$price$min4 = _this$props$price$min4 === void 0 ? {} : _this$props$price$min4;
      var regularPriceValue = _this$props$price$min4.value;

      if (!minimalPriceValue || !regularPriceValue) {
        return {};
      }

      var roundedRegularPrice = Object(_util_Price__WEBPACK_IMPORTED_MODULE_4__["roundPrice"])(regularPriceValue);
      var finalPrice = Object(_util_Price__WEBPACK_IMPORTED_MODULE_4__["calculateFinalPrice"])(discountPercentage, minimalPriceValue, regularPriceValue);
      var formattedFinalPrice = Object(_util_Price__WEBPACK_IMPORTED_MODULE_4__["formatPrice"])(finalPrice, priceCurrency);
      return {
        roundedRegularPrice: roundedRegularPrice,
        priceCurrency: priceCurrency,
        discountPercentage: discountPercentage,
        formattedFinalPrice: formattedFinalPrice
      };
    });

    return _this;
  }

  _createClass(_ProductPriceContainer, [{
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _ProductPrice_component__WEBPACK_IMPORTED_MODULE_5__["default"], _extends({}, this.props, this.containerProps()))
      );
    }
  }]);

  return _ProductPriceContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductPriceContainer, 'name', {
  value: 'ProductPriceContainer'
});

var ProductPriceContainer = middleware(_ProductPriceContainer, "Component/ProductPrice/Container");

_defineProperty(ProductPriceContainer, "propTypes", {
  isSchemaRequired: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  price: _type_ProductList__WEBPACK_IMPORTED_MODULE_3__["PriceType"],
  mix: _type_Common__WEBPACK_IMPORTED_MODULE_2__["MixType"]
});

_defineProperty(ProductPriceContainer, "defaultProps", {
  isSchemaRequired: false,
  mix: {},
  price: {}
});

/* harmony default export */ __webpack_exports__["default"] = (ProductPriceContainer);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductPrice/ProductPrice.style.scss":
/*!****************************************************************!*\
  !*** ./src/app/component/ProductPrice/ProductPrice.style.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340579
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ProductPrice/index.js":
/*!*************************************************!*\
  !*** ./src/app/component/ProductPrice/index.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProductPrice_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductPrice.container */ "./src/app/component/ProductPrice/ProductPrice.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ProductPrice_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/ProductReviewRating/ProductReviewRating.component.js":
/*!********************************************************************************!*\
  !*** ./src/app/component/ProductReviewRating/ProductReviewRating.component.js ***!
  \********************************************************************************/
/*! exports provided: _ProductReviewRating, ProductReviewRating, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductReviewRating", function() { return _ProductReviewRating; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductReviewRating", function() { return ProductReviewRating; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _util_CSS__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/CSS */ "./src/app/util/CSS/index.js");
/* harmony import */ var _ProductReviewRating_style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ProductReviewRating.style */ "./src/app/component/ProductReviewRating/ProductReviewRating.style.scss");
/* harmony import */ var _ProductReviewRating_style__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ProductReviewRating_style__WEBPACK_IMPORTED_MODULE_4__);
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





/**
 * @class ProductReviewRating
 * @namespace Component/ProductReviewRating/Component
 */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductReviewRating =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductReviewRating, _Extensible);

  function _ProductReviewRating() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ProductReviewRating);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ProductReviewRating)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "reviewRating",
    /*#__PURE__*/
    Object(react__WEBPACK_IMPORTED_MODULE_1__["createRef"])());

    return _this;
  }

  _createClass(_ProductReviewRating, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateRating();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.updateRating();
    }
  }, {
    key: "getAriaText",
    value: function getAriaText(summary, code) {
      var ONE_FIFTH_OF_A_HUNDRED = 20;
      var rating = parseFloat(summary / ONE_FIFTH_OF_A_HUNDRED).toFixed(2);
      return code ? "Review's ".concat(code, " rating is ").concat(rating, " out of 5") : "Product's rating is ".concat(rating, " out of 5");
    }
  }, {
    key: "updateRating",
    value: function updateRating() {
      var summary = this.props.summary;
      _util_CSS__WEBPACK_IMPORTED_MODULE_3__["default"].setVariable(this.reviewRating, 'percentage', "".concat(summary, "%"));
    }
  }, {
    key: "renderPlaceholder",
    value: function renderPlaceholder() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductReviewRating",
          ref: this.reviewRating
        })
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          summary = _this$props.summary,
          code = _this$props.code,
          placeholder = _this$props.placeholder,
          mix = _this$props.mix;
      var ariaText = this.getAriaText(summary, code);

      if (placeholder) {
        return this.renderPlaceholder();
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductReviewRating",
          title: "".concat(summary, "%"),
          ref: this.reviewRating,
          "aria-label": ariaText,
          mix: mix
        })
      );
    }
  }]);

  return _ProductReviewRating;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductReviewRating, 'name', {
  value: 'ProductReviewRating'
});

var ProductReviewRating = middleware(_ProductReviewRating, "Component/ProductReviewRating/Component");

_defineProperty(ProductReviewRating, "propTypes", {
  summary: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  code: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  placeholder: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  mix: _type_Common__WEBPACK_IMPORTED_MODULE_2__["MixType"]
});

_defineProperty(ProductReviewRating, "defaultProps", {
  summary: 0,
  code: '',
  placeholder: false,
  mix: {}
});

/* harmony default export */ __webpack_exports__["default"] = (ProductReviewRating);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductReviewRating/ProductReviewRating.style.scss":
/*!******************************************************************************!*\
  !*** ./src/app/component/ProductReviewRating/ProductReviewRating.style.scss ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340404
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ProductReviewRating/index.js":
/*!********************************************************!*\
  !*** ./src/app/component/ProductReviewRating/index.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProductReviewRating_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductReviewRating.component */ "./src/app/component/ProductReviewRating/ProductReviewRating.component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ProductReviewRating_component__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/TierPrices/TierPrices.component.js":
/*!**************************************************************!*\
  !*** ./src/app/component/TierPrices/TierPrices.component.js ***!
  \**************************************************************/
/*! exports provided: _TierPrices, TierPrices, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_TierPrices", function() { return _TierPrices; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TierPrices", function() { return TierPrices; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _util_Price__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/Price */ "./src/app/util/Price/index.js");
/* harmony import */ var _TierPrices_style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TierPrices.style */ "./src/app/component/TierPrices/TierPrices.style.scss");
/* harmony import */ var _TierPrices_style__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_TierPrices_style__WEBPACK_IMPORTED_MODULE_4__);
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





/** @namespace Component/TierPrices/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _TierPrices =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_TierPrices, _Extensible);

  function _TierPrices() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _TierPrices);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_TierPrices)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "renderDetailedTierPrice", function (_ref) {
      var percent_off = _ref.discount.percent_off,
          _ref$final_price = _ref.final_price,
          value = _ref$final_price.value,
          currency = _ref$final_price.currency,
          quantity = _ref.quantity;
      var minPriceForOneUnit = _this.props.product.price_range.minimum_price.final_price.value; // Don't show offers that make no sense

      if (value >= minPriceForOneUnit) {
        return null;
      }

      var formattedPrice = Object(_util_Price__WEBPACK_IMPORTED_MODULE_3__["formatPrice"])(value, currency);
      return (
        /*#__PURE__*/
        _checkBEM(React, "li", {
          block: "TierPrices",
          elem: "Item",
          key: quantity
        }, __('Buy %s for %s each and ', quantity, formattedPrice),
        /*#__PURE__*/
        _checkBEM(React, "strong", null, __('save %s%', Math.round(percent_off))))
      );
    });

    return _this;
  }

  _createClass(_TierPrices, [{
    key: "renderLowestTierPrice",
    value: function renderLowestTierPrice() {
      var _this$props$product = this.props.product,
          price_tiers = _this$props$product.price_tiers,
          currency = _this$props$product.price_range.minimum_price.final_price.currency;
      var lowestValue = price_tiers.reduce(function (acc, _ref2) {
        var value = _ref2.final_price.value;
        return acc < value ? acc : value;
      }, price_tiers[0].final_price.value);
      var formattedPrice = Object(_util_Price__WEBPACK_IMPORTED_MODULE_3__["formatPrice"])(lowestValue, currency);
      return (
        /*#__PURE__*/
        _checkBEM(React, "span", {
          block: "TierPrices",
          elem: "Item",
          mods: {
            isLowest: true
          }
        }, __('As low as '),
        /*#__PURE__*/
        _checkBEM(React, "span", {
          block: "TierPrices",
          elem: "ItemPrice"
        }, "".concat(formattedPrice)))
      );
    }
  }, {
    key: "renderDetailedTierPriceList",
    value: function renderDetailedTierPriceList() {
      var price_tiers = this.props.product.price_tiers;
      return price_tiers.map(this.renderDetailedTierPrice);
    }
  }, {
    key: "renderTierPrice",
    value: function renderTierPrice() {
      var isLowestPrice = this.props.isLowestPrice;

      if (isLowestPrice) {
        return this.renderLowestTierPrice();
      }

      return this.renderDetailedTierPriceList();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          product = _this$props.product,
          _this$props$product$p = _this$props.product.price_tiers,
          price_tiers = _this$props$product$p === void 0 ? [] : _this$props$product$p;

      if (!price_tiers || Object.keys(product).length <= 0 || !price_tiers.length) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "ul", {
          block: "TierPrices"
        }, this.renderTierPrice())
      );
    }
  }]);

  return _TierPrices;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_TierPrices, 'name', {
  value: 'TierPrices'
});

var TierPrices = middleware(_TierPrices, "Component/TierPrices/Component");

_defineProperty(TierPrices, "propTypes", {
  product: _type_ProductList__WEBPACK_IMPORTED_MODULE_2__["ProductType"].isRequired,
  isLowestPrice: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool
});

_defineProperty(TierPrices, "defaultProps", {
  isLowestPrice: false
});

/* harmony default export */ __webpack_exports__["default"] = (TierPrices);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/TierPrices/TierPrices.style.scss":
/*!************************************************************!*\
  !*** ./src/app/component/TierPrices/TierPrices.style.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340367
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/TierPrices/index.js":
/*!***********************************************!*\
  !*** ./src/app/component/TierPrices/index.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TierPrices_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TierPrices.component */ "./src/app/component/TierPrices/TierPrices.component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _TierPrices_component__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/util/Price/Price.config.js":
/*!********************************************!*\
  !*** ./src/app/util/Price/Price.config.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = ({
  AED: 'د.إ',
  AFN: '؋',
  ALL: 'L',
  AMD: '֏',
  ANG: 'ƒ',
  AOA: 'Kz',
  ARS: '$',
  AUD: '$',
  AWG: 'ƒ',
  AZN: '₼',
  BAM: 'KM',
  BBD: 'Bds$',
  BDT: '৳',
  BGN: 'лв',
  BHD: '.د.ب',
  BIF: 'FBu',
  BMD: '$',
  BND: 'B$',
  BOB: '$b',
  BRL: 'R$',
  BSD: 'B$',
  BTC: '฿',
  BTN: 'Nu.',
  BWP: 'P',
  BYR: 'Br',
  BYN: 'Br',
  BZD: 'BZ$',
  CAD: 'CA$',
  CDF: 'FC',
  CHF: 'CHF',
  CLP: '$',
  CNY: '¥',
  COP: '$',
  CRC: '₡',
  CUC: 'CUC$',
  CUP: '₱',
  CVE: '$',
  CZK: 'Kč',
  DJF: 'Fdj',
  DKK: 'kr',
  DOP: 'RD$',
  DZD: 'دج',
  EEK: 'kr',
  EGP: '£',
  ERN: 'Nfk',
  ETB: 'Br',
  ETH: 'Ξ',
  EUR: '€',
  FJD: 'FJ$',
  FKP: '£',
  GBP: '£',
  GEL: '₾',
  GGP: '£',
  GHC: '₵',
  GHS: 'GH₵',
  GIP: '£',
  GMD: 'D',
  GNF: 'FG',
  GTQ: 'Q',
  GYD: 'G$',
  HKD: 'HK$',
  HNL: 'L',
  HRK: 'kn',
  HTG: 'G',
  HUF: 'Ft',
  IDR: 'Rp',
  ILS: '₪',
  IMP: '£',
  INR: '₹',
  IQD: 'ع.د',
  IRR: '﷼',
  ISK: 'kr',
  JEP: '£',
  JMD: 'J$',
  JOD: 'JD',
  JPY: '¥',
  KES: 'KSh',
  KGS: 'лв',
  KHR: '៛',
  KMF: 'CF',
  KPW: '₩',
  KRW: '₩',
  KWD: 'KD',
  KYD: '$',
  KZT: 'лв',
  LAK: '₭',
  LBP: '£',
  LKR: '₨',
  LRD: 'L$',
  LSL: 'M',
  LTC: 'Ł',
  LTL: 'Lt',
  LVL: 'Ls',
  LYD: 'LD',
  MAD: 'MAD',
  MDL: 'lei',
  MGA: 'Ar',
  MKD: 'ден',
  MMK: 'K',
  MNT: '₮',
  MOP: 'MOP$',
  MRO: 'UM',
  MRU: 'UM',
  MUR: '₨',
  MVR: 'Rf',
  MWK: 'MK',
  MXN: 'Mex$',
  MYR: 'RM',
  MZN: 'MT',
  NAD: '$',
  NGN: '₦',
  NIO: 'C$',
  NOK: 'kr',
  NPR: '₨',
  NZD: '$',
  OMR: '﷼',
  PAB: 'B/.',
  PEN: 'S/.',
  PGK: 'K',
  PHP: '₱',
  PKR: '₨',
  PLN: 'zł',
  PYG: 'Gs',
  QAR: '﷼',
  RMB: '￥',
  RON: 'lei',
  RSD: 'Дин.',
  RUB: '₽',
  RWF: 'R₣',
  SAR: '﷼',
  SBD: 'Si$',
  SCR: '₨',
  SDG: 'ج.س.',
  SEK: 'kr',
  SGD: '$',
  SHP: '£',
  SLL: 'Le',
  SOS: 'S',
  SRD: '$',
  SSP: '£',
  STD: 'Db',
  STN: 'Db',
  SVC: '₡',
  SYP: '£',
  SZL: 'E',
  THB: '฿',
  TJS: 'SM',
  TMT: 'T',
  TND: 'د.ت',
  TOP: 'T$',
  TRL: '₤',
  TRY: '₺',
  TTD: 'TT$',
  TVD: '$',
  TWD: 'NT$',
  TZS: 'TSh',
  UAH: '₴',
  UGX: 'USh',
  USD: '$',
  UYU: '$U',
  UZS: 'лв',
  VEF: 'Bs',
  VND: '₫',
  VUV: 'VT',
  WST: 'WS$',
  XAF: 'FCFA',
  XBT: 'Ƀ',
  XCD: '$',
  XOF: 'CFA',
  XPF: '₣',
  YER: '﷼',
  ZAR: 'R',
  ZWD: 'Z$'
});

/***/ }),

/***/ "./src/app/util/Price/Price.js":
/*!*************************************!*\
  !*** ./src/app/util/Price/Price.js ***!
  \*************************************/
/*! exports provided: formatCurrency, formatPrice, calculateFinalPrice, roundPrice */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatCurrency", function() { return formatCurrency; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatPrice", function() { return formatPrice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateFinalPrice", function() { return calculateFinalPrice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "roundPrice", function() { return roundPrice; });
/* harmony import */ var _Price_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Price.config */ "./src/app/util/Price/Price.config.js");
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

/* eslint-disable import/prefer-default-export */

/** @namespace Util/Price/formatCurrency */

var formatCurrency = middleware(function () {
  var currency = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'USD';
  return _Price_config__WEBPACK_IMPORTED_MODULE_0__["default"][currency];
}, "Util/Price/formatCurrency");
/** @namespace Util/Price/formatPrice */

var formatPrice = middleware(function (price) {
  var currency = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'USD';
  var language = navigator.languages ? navigator.languages[0] : navigator.language;
  return new Intl.NumberFormat(language, {
    style: 'currency',
    currency: currency
  }).format(price);
}, "Util/Price/formatPrice");
/**
 * Calculate final price
 * @param {Number} discount discount percentage
 * @param {Number} min minimum price
 * @param {Number} reg regular price
 * @return {Number} final price
 * @namespace Util/Price/calculateFinalPrice
 */

var calculateFinalPrice = middleware(function (discount, min, reg) {
  return discount ? min : reg;
}, "Util/Price/calculateFinalPrice\n");
/**
 * Calculate final price
 * @param {Number} price
 * @return {Number} price rounded to 2 digits
 * @namespace Util/Price/roundPrice
 */

var roundPrice = middleware(function (price) {
  return parseFloat(price).toFixed(2);
}, "Util/Price/roundPrice\n");
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/util/Price/index.js":
/*!*************************************!*\
  !*** ./src/app/util/Price/index.js ***!
  \*************************************/
/*! exports provided: formatCurrency, formatPrice, calculateFinalPrice, roundPrice */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Price__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Price */ "./src/app/util/Price/Price.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formatCurrency", function() { return _Price__WEBPACK_IMPORTED_MODULE_0__["formatCurrency"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formatPrice", function() { return _Price__WEBPACK_IMPORTED_MODULE_0__["formatPrice"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "calculateFinalPrice", function() { return _Price__WEBPACK_IMPORTED_MODULE_0__["calculateFinalPrice"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "roundPrice", function() { return _Price__WEBPACK_IMPORTED_MODULE_0__["roundPrice"]; });

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
//# sourceMappingURL=account~cart~category~misc~product.js.map