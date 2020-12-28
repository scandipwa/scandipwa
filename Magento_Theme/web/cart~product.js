(this["webpackJsonp"] = this["webpackJsonp"] || []).push([["cart~product"],{

/***/ "./src/app/component/ProductLinks/ProductLinks.component.js":
/*!******************************************************************!*\
  !*** ./src/app/component/ProductLinks/ProductLinks.component.js ***!
  \******************************************************************/
/*! exports provided: _ProductLinks, ProductLinks, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductLinks", function() { return _ProductLinks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductLinks", function() { return ProductLinks; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ContentWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ContentWrapper */ "./src/app/component/ContentWrapper/index.js");
/* harmony import */ var _ProductCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ProductCard */ "./src/app/component/ProductCard/index.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _ProductLinks_style__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ProductLinks.style */ "./src/app/component/ProductLinks/ProductLinks.style.scss");
/* harmony import */ var _ProductLinks_style__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ProductLinks_style__WEBPACK_IMPORTED_MODULE_5__);
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






/** @namespace Component/ProductLinks/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductLinks =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductLinks, _Extensible);

  function _ProductLinks() {
    _classCallCheck(this, _ProductLinks);

    return _possibleConstructorReturn(this, _getPrototypeOf(_ProductLinks).apply(this, arguments));
  }

  _createClass(_ProductLinks, [{
    key: "renderProductCard",
    value: function renderProductCard(product, i) {
      var _product$id = product.id,
          id = _product$id === void 0 ? i : _product$id;
      return (
        /*#__PURE__*/
        _checkBEM(react__WEBPACK_IMPORTED_MODULE_1___default.a, _ProductCard__WEBPACK_IMPORTED_MODULE_3__["default"], {
          block: "ProductLinks",
          elem: "Card",
          product: product,
          key: id
        })
      );
    }
  }, {
    key: "renderItems",
    value: function renderItems() {
      var _this = this;

      var _this$props = this.props,
          linkType = _this$props.linkType,
          items = _this$props.linkedProducts[linkType].items,
          numberOfProductsToDisplay = _this$props.numberOfProductsToDisplay;

      if (!items) {
        return Array.from({
          length: numberOfProductsToDisplay
        }, function (_, i) {
          return _this.renderProductCard({}, i);
        });
      }

      return items.slice(0, numberOfProductsToDisplay).map(this.renderProductCard);
    }
  }, {
    key: "renderHeading",
    value: function renderHeading() {
      var title = this.props.title;
      return (
        /*#__PURE__*/
        _checkBEM(react__WEBPACK_IMPORTED_MODULE_1___default.a, "h4", {
          block: "ProductLinks",
          elem: "Title"
        }, title)
      );
    }
  }, {
    key: "render",
    value: function render() {
      var areDetailsLoaded = this.props.areDetailsLoaded;

      if (!areDetailsLoaded) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(react__WEBPACK_IMPORTED_MODULE_1___default.a, _ContentWrapper__WEBPACK_IMPORTED_MODULE_2__["default"], {
          mix: {
            block: 'ProductLinks'
          },
          wrapperMix: {
            block: 'ProductLinks',
            elem: 'Wrapper'
          },
          label: __('Linked products')
        }, this.renderHeading(),
        /*#__PURE__*/
        _checkBEM(react__WEBPACK_IMPORTED_MODULE_1___default.a, "ul", {
          block: "ProductLinks",
          elem: "List"
        }, this.renderItems()))
      );
    }
  }]);

  return _ProductLinks;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductLinks, 'name', {
  value: 'ProductLinks'
});

var ProductLinks = middleware(_ProductLinks, "Component/ProductLinks/Component");

_defineProperty(ProductLinks, "propTypes", {
  numberOfProductsToDisplay: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  areDetailsLoaded: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  linkedProducts: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.objectOf(_type_ProductList__WEBPACK_IMPORTED_MODULE_4__["ProductType"]).isRequired,
  linkType: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  title: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired
});

_defineProperty(ProductLinks, "defaultProps", {
  numberOfProductsToDisplay: 4,
  areDetailsLoaded: true
});

/* harmony default export */ __webpack_exports__["default"] = (ProductLinks);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductLinks/ProductLinks.container.js":
/*!******************************************************************!*\
  !*** ./src/app/component/ProductLinks/ProductLinks.container.js ***!
  \******************************************************************/
/*! exports provided: mapStateToProps, _ProductLinksContainer, ProductLinksContainer, mapDispatchToProps, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductLinksContainer", function() { return _ProductLinksContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductLinksContainer", function() { return ProductLinksContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _ProductLinks_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ProductLinks.component */ "./src/app/component/ProductLinks/ProductLinks.component.js");
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





/** @namespace Component/ProductLinks/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    linkedProducts: state.LinkedProductsReducer.linkedProducts
  };
}, "Component/ProductLinks/Container/mapStateToProps");
/** @namespace Component/ProductLinks/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductLinksContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductLinksContainer, _Extensible);

  function _ProductLinksContainer() {
    _classCallCheck(this, _ProductLinksContainer);

    return _possibleConstructorReturn(this, _getPrototypeOf(_ProductLinksContainer).apply(this, arguments));
  }

  _createClass(_ProductLinksContainer, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          linkType = _this$props.linkType,
          _this$props$linkedPro = _this$props.linkedProducts[linkType];
      _this$props$linkedPro = _this$props$linkedPro === void 0 ? {} : _this$props$linkedPro;
      var _this$props$linkedPro2 = _this$props$linkedPro.items,
          items = _this$props$linkedPro2 === void 0 ? [] : _this$props$linkedPro2;

      if (items.length === 0) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, _ProductLinks_component__WEBPACK_IMPORTED_MODULE_4__["default"], this.props)
      );
    }
  }]);

  return _ProductLinksContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/** @namespace Component/ProductLinks/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars

Object.defineProperty(_ProductLinksContainer, 'name', {
  value: 'ProductLinksContainer'
});

var ProductLinksContainer = middleware(_ProductLinksContainer, "Component/ProductLinks/Container");

_defineProperty(ProductLinksContainer, "propTypes", {
  linkedProducts: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.objectOf(_type_ProductList__WEBPACK_IMPORTED_MODULE_3__["ProductType"]).isRequired,
  linkType: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired
});

var mapDispatchToProps = middleware(function (dispatch) {
  return {};
}, "Component/ProductLinks/Container/mapDispatchToProps");
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(ProductLinksContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/ProductLinks/ProductLinks.style.scss":
/*!****************************************************************!*\
  !*** ./src/app/component/ProductLinks/ProductLinks.style.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291339294
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ProductLinks/index.js":
/*!*************************************************!*\
  !*** ./src/app/component/ProductLinks/index.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProductLinks_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductLinks.container */ "./src/app/component/ProductLinks/ProductLinks.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ProductLinks_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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
//# sourceMappingURL=cart~product.js.map