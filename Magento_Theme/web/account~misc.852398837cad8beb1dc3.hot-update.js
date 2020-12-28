webpackHotUpdate("account~misc",{

/***/ "./src/app/component/MyAccountMyWishlist/MyAccountMyWishlist.style.scss":
/*!******************************************************************************!*\
  !*** ./src/app/component/MyAccountMyWishlist/MyAccountMyWishlist.style.scss ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1605720110928
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ShareWishlistPopup/ShareWishlistPopup.style.scss":
/*!****************************************************************************!*\
  !*** ./src/app/component/ShareWishlistPopup/ShareWishlistPopup.style.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1605720114494
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/SwipeToDelete/SwipeToDelete.style.scss":
/*!******************************************************************!*\
  !*** ./src/app/component/SwipeToDelete/SwipeToDelete.style.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1605720114723
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/WishlistItem/WishlistItem.component.js":
/*!******************************************************************!*\
  !*** ./src/app/component/WishlistItem/WishlistItem.component.js ***!
  \******************************************************************/
/*! exports provided: _WishlistItem, WishlistItem, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_WishlistItem", function() { return _WishlistItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WishlistItem", function() { return WishlistItem; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Field */ "./src/app/component/Field/index.js");
/* harmony import */ var _ProductCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ProductCard */ "./src/app/component/ProductCard/index.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _WishlistItem_style__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./WishlistItem.style */ "./src/app/component/WishlistItem/WishlistItem.style.scss");
/* harmony import */ var _WishlistItem_style__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_WishlistItem_style__WEBPACK_IMPORTED_MODULE_5__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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






/** @namespace Component/WishlistItem/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _WishlistItem =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_WishlistItem, _Extensible);

  function _WishlistItem() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _WishlistItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_WishlistItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "renderContent", function (renderMethods) {
      var productPrice = renderMethods.content.productPrice,
          renderPicture = renderMethods.pictureBlock.picture,
          renderCardLinkWrapper = renderMethods.renderCardLinkWrapper;
      var isMobile = _this.props.isMobile;

      if (isMobile) {
        return _this.renderContentMobile(renderMethods);
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null,
        /*#__PURE__*/
        _checkBEM(React, "div", null, renderCardLinkWrapper(
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null,
        /*#__PURE__*/
        _checkBEM(React, "figure", {
          mix: {
            block: 'ProductCard',
            elem: 'Figure'
          }
        }, renderPicture({
          block: 'WishlistItem',
          elem: 'Picture'
        })), _this.renderName(), _this.renderAttributes())), _this.renderRemove()),
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "WishlistItem",
          elem: "Content"
        },
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "WishlistItem",
          elem: "RowWrapper"
        }, _this.renderQuantityField(), _this.renderPrice(productPrice)), _this.renderDescription(), _this.renderAddToCartButton()))
      );
    });

    return _this;
  }

  _createClass(_WishlistItem, [{
    key: "renderDescription",
    value: function renderDescription() {
      var _this$props = this.props,
          description = _this$props.product.wishlist.description,
          changeDescription = _this$props.changeDescription,
          isMobile = _this$props.isMobile;
      var isEditingActive = this.props.isEditingActive;

      if (!description && !isEditingActive && isMobile) {
        return null;
      }

      var isDisabled = isMobile && !isEditingActive;
      var mods = isMobile ? {
        isNotEditingActive: !isEditingActive,
        isEmpty: !description
      } : {};
      return (
        /*#__PURE__*/
        _checkBEM(React, _Field__WEBPACK_IMPORTED_MODULE_2__["default"], {
          id: "description",
          name: "description",
          type: "text",
          value: description,
          mix: {
            block: 'WishlistItem',
            elem: 'CommentField',
            mods: mods
          },
          placeholder: __('Add a comment'),
          isDisabled: isDisabled,
          onChange: changeDescription
        })
      );
    }
  }, {
    key: "renderQuantityFieldInput",
    value: function renderQuantityFieldInput() {
      var _this$props2 = this.props,
          quantity = _this$props2.product.wishlist.quantity,
          changeQuantity = _this$props2.changeQuantity;
      return (
        /*#__PURE__*/
        _checkBEM(React, _Field__WEBPACK_IMPORTED_MODULE_2__["default"], {
          id: "item_qty",
          name: "item_qty",
          type: "number",
          min: 1,
          value: quantity,
          mix: {
            block: 'WishlistItem',
            elem: 'QuantityInput',
            mix: {
              block: 'Field',
              mods: {
                style: 'inline'
              }
            }
          },
          onChange: changeQuantity
        })
      );
    }
  }, {
    key: "renderQuantityField",
    value: function renderQuantityField() {
      var _this$props3 = this.props,
          quantity = _this$props3.product.wishlist.quantity,
          isEditingActive = _this$props3.isEditingActive,
          isMobile = _this$props3.isMobile;

      if (!isMobile) {
        return this.renderQuantityFieldInput();
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "WishlistItem",
          elem: "QuantityWrapper"
        },
        /*#__PURE__*/
        _checkBEM(React, "span", {
          block: "WishlistItem",
          elem: "QuantityText"
        }, __('Qty:')), isEditingActive ? this.renderQuantityFieldInput() : quantity)
      );
    }
  }, {
    key: "renderAddToCartButton",
    value: function renderAddToCartButton() {
      var _this$props4 = this.props,
          addToCart = _this$props4.addToCart,
          isEditingActive = _this$props4.isEditingActive,
          isMobile = _this$props4.isMobile;
      var mods = isMobile ? {
        isEditingActive: isEditingActive
      } : {};
      return (
        /*#__PURE__*/
        _checkBEM(React, "button", {
          block: "Button",
          mix: {
            block: 'WishlistItem',
            elem: 'AddToCart',
            mods: mods
          },
          onClick: addToCart
        }, __('Add to cart'))
      );
    }
  }, {
    key: "renderRemove",
    value: function renderRemove() {
      var removeItem = this.props.removeItem;
      return (
        /*#__PURE__*/
        _checkBEM(React, "button", {
          block: "WishlistItem",
          elem: "Remove",
          onClick: removeItem,
          "aria-label": __('Remove')
        })
      );
    }
  }, {
    key: "getWishlistProduct",
    value: function getWishlistProduct() {
      var _this$props5 = this.props,
          product = _this$props5.product,
          _this$props5$product = _this$props5.product,
          url = _this$props5$product.url,
          type_id = _this$props5$product.type_id;

      if (type_id !== 'configurable') {
        return product;
      }

      var wishedVariant = product.variants.find(function (_ref) {
        var sku = _ref.sku;
        return sku === product.wishlist.sku;
      });
      return _objectSpread2(_objectSpread2({}, wishedVariant), {}, {
        url: url
      });
    }
  }, {
    key: "renderName",
    value: function renderName() {
      var name = this.props.product.name;
      return (
        /*#__PURE__*/
        _checkBEM(React, "span", null, name)
      );
    }
  }, {
    key: "renderPrice",
    value: function renderPrice(productPrice) {
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "WishlistItem",
          elem: "Price"
        }, productPrice())
      );
    }
  }, {
    key: "renderAttributes",
    value: function renderAttributes() {
      var attributes = this.props.attributes;
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "WishlistItem",
          elem: "AttributeWrapper"
        }, attributes.map(function (attr) {
          return (
            /*#__PURE__*/
            _checkBEM(React, "span", {
              mix: {
                block: 'ProductAttribute'
              }
            }, attr)
          );
        }))
      );
    }
  }, {
    key: "renderSelectCheckbox",
    value: function renderSelectCheckbox() {
      var _this$props6 = this.props,
          id = _this$props6.product.wishlist.id,
          handleSelectIdChange = _this$props6.handleSelectIdChange,
          isEditingActive = _this$props6.isEditingActive;
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "WishlistItem",
          elem: "Select",
          mods: {
            isEditingActive: isEditingActive
          }
        },
        /*#__PURE__*/
        _checkBEM(React, _Field__WEBPACK_IMPORTED_MODULE_2__["default"], {
          type: "checkbox",
          id: "option-".concat(id),
          name: "option-".concat(id) // eslint-disable-next-line react/jsx-no-bind
          ,
          onClick: function onClick() {
            return handleSelectIdChange(id);
          }
        }))
      );
    }
  }, {
    key: "renderContentMobile",
    value: function renderContentMobile(_ref2) {
      var productPrice = _ref2.content.productPrice,
          renderPicture = _ref2.pictureBlock.picture,
          renderCardLinkWrapper = _ref2.renderCardLinkWrapper;
      var isEditingActive = this.props.isEditingActive;
      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null,
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "WishlistItem",
          elem: "SelectWrapper"
        }, this.renderSelectCheckbox(),
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "WishlistItem",
          elem: "ContentWrapper",
          mods: {
            isEditingActive: isEditingActive
          }
        }, renderCardLinkWrapper(
        /*#__PURE__*/
        _checkBEM(React, "figure", {
          mix: {
            block: 'ProductCard',
            elem: 'Figure'
          }
        }, renderPicture({
          block: 'WishlistItem',
          elem: 'Picture'
        })), {
          block: 'WishlistItem',
          elem: 'ImageWrapper'
        }),
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "WishlistItem",
          elem: "Content"
        }, this.renderName(), this.renderAttributes(), this.renderQuantityField(),
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "WishlistItem",
          elem: "RowWrapper"
        }, this.renderPrice(productPrice), this.renderAddToCartButton())))), this.renderDescription())
      );
    }
  }, {
    key: "render",
    value: function render() {
      var isLoading = this.props.isLoading;
      return (
        /*#__PURE__*/
        _checkBEM(React, _ProductCard__WEBPACK_IMPORTED_MODULE_3__["default"], {
          product: this.getWishlistProduct(),
          mix: {
            block: 'WishlistItem',
            elem: 'ProductCard'
          },
          isLoading: isLoading,
          renderContent: this.renderContent
        })
      );
    }
  }]);

  return _WishlistItem;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_WishlistItem, 'name', {
  value: 'WishlistItem'
});

var WishlistItem = middleware(_WishlistItem, "Component/WishlistItem/Component");

_defineProperty(WishlistItem, "propTypes", {
  addToCart: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  changeQuantity: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  product: _type_ProductList__WEBPACK_IMPORTED_MODULE_4__["ProductType"].isRequired,
  changeDescription: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  removeItem: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  isMobile: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  isEditingActive: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  attributes: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.array.isRequired,
  handleSelectIdChange: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

_defineProperty(WishlistItem, "defaultProps", {
  addToCart: function addToCart() {},
  changeQuantity: function changeQuantity() {},
  changeDescription: function changeDescription() {},
  removeItem: function removeItem() {},
  isLoading: false
});

/* harmony default export */ __webpack_exports__["default"] = (WishlistItem);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/WishlistItem/WishlistItem.container.js":
/*!******************************************************************!*\
  !*** ./src/app/component/WishlistItem/WishlistItem.container.js ***!
  \******************************************************************/
/*! exports provided: CartDispatcher, WishlistDispatcher, mapStateToProps, mapDispatchToProps, _WishlistItemContainer, WishlistItemContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, React, __) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartDispatcher", function() { return CartDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WishlistDispatcher", function() { return WishlistDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_WishlistItemContainer", function() { return _WishlistItemContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WishlistItemContainer", function() { return WishlistItemContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _SwipeToDelete__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../SwipeToDelete */ "./src/app/component/SwipeToDelete/index.js");
/* harmony import */ var _store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/Navigation/Navigation.action */ "./src/app/store/Navigation/Navigation.action.js");
/* harmony import */ var _store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store/Navigation/Navigation.reducer */ "./src/app/store/Navigation/Navigation.reducer.js");
/* harmony import */ var _store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../store/Notification/Notification.action */ "./src/app/store/Notification/Notification.action.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _util_Request__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../util/Request */ "./src/app/util/Request/index.js");
/* harmony import */ var _WishlistItem_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./WishlistItem.component */ "./src/app/component/WishlistItem/WishlistItem.component.js");
/* harmony import */ var _WishlistItem_config__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./WishlistItem.config */ "./src/app/component/WishlistItem/WishlistItem.config.js");
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











var CartDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/Cart/Cart.dispatcher */ "./src/app/store/Cart/Cart.dispatcher.js"));
var WishlistDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/Wishlist/Wishlist.dispatcher */ "./src/app/store/Wishlist/Wishlist.dispatcher.js"));
/** @namespace Component/WishlistItem/Container/mapStateToProps */
// eslint-disable-next-line no-unused-vars

var mapStateToProps = middleware(function (state) {
  return {
    isMobile: state.ConfigReducer.device.isMobile
  };
}, "Component/WishlistItem/Container/mapStateToProps");
/** @namespace Component/WishlistItem/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    showNotification: function showNotification(type, message) {
      return dispatch(Object(_store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_6__["showNotification"])(type, message));
    },
    addProductToCart: function addProductToCart(options) {
      return CartDispatcher.then(function (_ref) {
        var dispatcher = _ref.default;
        return dispatcher.addProductToCart(dispatch, options);
      });
    },
    updateWishlistItem: function updateWishlistItem(options) {
      return WishlistDispatcher.then(function (_ref2) {
        var dispatcher = _ref2.default;
        return dispatcher.updateWishlistItem(dispatch, options);
      });
    },
    removeFromWishlist: function removeFromWishlist(options) {
      return WishlistDispatcher.then(function (_ref3) {
        var dispatcher = _ref3.default;
        return dispatcher.removeItemFromWishlist(dispatch, options);
      });
    },
    changeHeaderState: function changeHeaderState(state) {
      return dispatch(Object(_store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_4__["changeNavigationState"])(_store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_5__["TOP_NAVIGATION_TYPE"], state));
    }
  };
}, "Component/WishlistItem/Container/mapDispatchToProps");
/** @namespace Component/WishlistItem/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _WishlistItemContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_WishlistItemContainer, _Extensible);

  function _WishlistItemContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _WishlistItemContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_WishlistItemContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      addToCart: _this.addItemToCart.bind(_assertThisInitialized(_this)),
      removeItem: _this.removeItem.bind(_assertThisInitialized(_this), false)
    });

    _defineProperty(_assertThisInitialized(_this), "state", {
      isLoading: false
    });

    _defineProperty(_assertThisInitialized(_this), "changeQuantity", Object(_util_Request__WEBPACK_IMPORTED_MODULE_8__["debounce"])(function (quantity) {
      var _this$props = _this.props,
          item_id = _this$props.product.wishlist.id,
          updateWishlistItem = _this$props.updateWishlistItem;
      updateWishlistItem({
        item_id: item_id,
        quantity: quantity
      });
    }, _WishlistItem_config__WEBPACK_IMPORTED_MODULE_10__["UPDATE_WISHLIST_FREQUENCY"]));

    _defineProperty(_assertThisInitialized(_this), "changeDescription", Object(_util_Request__WEBPACK_IMPORTED_MODULE_8__["debounce"])(function (description) {
      var _this$props2 = _this.props,
          item_id = _this$props2.product.wishlist.id,
          updateWishlistItem = _this$props2.updateWishlistItem;
      updateWishlistItem({
        item_id: item_id,
        description: description
      });
    }, _WishlistItem_config__WEBPACK_IMPORTED_MODULE_10__["UPDATE_WISHLIST_FREQUENCY"]));

    _defineProperty(_assertThisInitialized(_this), "containerProps", function () {
      var isLoading = _this.state.isLoading;
      return {
        changeQuantity: _this.changeQuantity,
        changeDescription: _this.changeDescription,
        attributes: _this.getAttributes(),
        isLoading: isLoading
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getConfigurableVariantIndex", function (sku, variants) {
      return Object.keys(variants).find(function (i) {
        return variants[i].sku === sku;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getAttributes", function () {
      var _this$props$product = _this.props.product,
          variants = _this$props$product.variants,
          configurable_options = _this$props$product.configurable_options,
          wishlistSku = _this$props$product.wishlist.sku;

      var _ref4 = variants.find(function (_ref5) {
        var sku = _ref5.sku;
        return sku === wishlistSku;
      }) || {},
          _ref4$attributes = _ref4.attributes,
          attributes = _ref4$attributes === void 0 ? [] : _ref4$attributes;

      return Object.values(attributes).reduce(function (acc, _ref6) {
        var attribute_code = _ref6.attribute_code,
            attribute_value = _ref6.attribute_value;

        var _ref7 = configurable_options[attribute_code] || {},
            _ref7$attribute_optio = _ref7.attribute_options;

        _ref7$attribute_optio = _ref7$attribute_optio === void 0 ? {} : _ref7$attribute_optio;
        var _ref7$attribute_optio2 = _ref7$attribute_optio[attribute_value];
        _ref7$attribute_optio2 = _ref7$attribute_optio2 === void 0 ? {} : _ref7$attribute_optio2;
        var value = _ref7$attribute_optio2.value,
            label = _ref7$attribute_optio2.label;

        if (value === attribute_value) {
          acc.push(label);
          return acc;
        }

        return acc;
      }, []);
    });

    _defineProperty(_assertThisInitialized(_this), "renderRightSideContent", function () {
      var removeItem = _this.containerFunctions.removeItem;
      return (
        /*#__PURE__*/
        _checkBEM(React, "button", {
          block: "WishlistItem",
          elem: "SwipeToDeleteRightSide",
          onClick: removeItem,
          "aria-label": __('Remove')
        }, __('Delete'))
      );
    });

    return _this;
  }

  _createClass(_WishlistItemContainer, [{
    key: "addItemToCart",
    value: function addItemToCart() {
      var _this2 = this;

      var _this$props3 = this.props,
          item = _this$props3.product,
          addProductToCart = _this$props3.addProductToCart,
          showNotification = _this$props3.showNotification;
      var type_id = item.type_id,
          variants = item.variants,
          _item$wishlist = item.wishlist,
          id = _item$wishlist.id,
          sku = _item$wishlist.sku,
          quantity = _item$wishlist.quantity;
      var configurableVariantIndex = this.getConfigurableVariantIndex(sku, variants);
      var product = type_id === 'configurable' ? _objectSpread2(_objectSpread2({}, item), {}, {
        configurableVariantIndex: configurableVariantIndex
      }) : item;
      this.setState({
        isLoading: true
      });
      return addProductToCart({
        product: product,
        quantity: quantity
      }).then(
      /** @namespace Component/WishlistItem/Container/addItemToCartAddProductToCartThen */
      middleware(function () {
        return _this2.removeItem(id);
      }, "Component/WishlistItem/Container/addItemToCartAddProductToCartThen"),
      /** @namespace Component/WishlistItem/Container/addItemToCartAddProductToCartCatch */
      middleware(function () {
        return _this2.showNotification('error', __('Error Adding Product To Cart'));
      }, "Component/WishlistItem/Container/addItemToCartAddProductToCartCatch")).then(
      /** @namespace Component/WishlistItem/Container/addItemToCartAddProductToCartThenThen */
      middleware(function () {
        return showNotification('success', __('Product Added To Cart'));
      }, "Component/WishlistItem/Container/addItemToCartAddProductToCartThenThen")).catch(
      /** @namespace Component/WishlistItem/Container/addItemToCartAddProductToCartThenThenCatch */
      middleware(function () {
        return _this2.showNotification('error', __('Error cleaning wishlist'));
      }, "Component/WishlistItem/Container/addItemToCartAddProductToCartThenThenCatch"));
    }
  }, {
    key: "showNotification",
    value: function showNotification() {
      var showNotification = this.props.showNotification;
      this.setState({
        isLoading: false
      });
      showNotification.apply(void 0, arguments);
    }
  }, {
    key: "removeItem",
    value: function removeItem() {
      var noMessages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var _this$props4 = this.props,
          item_id = _this$props4.product.wishlist.id,
          removeFromWishlist = _this$props4.removeFromWishlist,
          handleSelectIdChange = _this$props4.handleSelectIdChange;
      this.setState({
        isLoading: true
      });
      handleSelectIdChange(item_id);
      return removeFromWishlist({
        item_id: item_id,
        noMessages: noMessages
      });
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _SwipeToDelete__WEBPACK_IMPORTED_MODULE_3__["default"], {
          renderRightSideContent: this.renderRightSideContent,
          topElemMix: {
            block: 'WishlistItem'
          }
        },
        /*#__PURE__*/
        _checkBEM(React, _WishlistItem_component__WEBPACK_IMPORTED_MODULE_9__["default"], _extends({}, this.props, this.containerProps(), this.containerFunctions)))
      );
    }
  }]);

  return _WishlistItemContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_WishlistItemContainer, 'name', {
  value: 'WishlistItemContainer'
});

var WishlistItemContainer = middleware(_WishlistItemContainer, "Component/WishlistItem/Container");

_defineProperty(WishlistItemContainer, "propTypes", {
  product: _type_ProductList__WEBPACK_IMPORTED_MODULE_7__["ProductType"].isRequired,
  addProductToCart: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  showNotification: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  updateWishlistItem: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  removeFromWishlist: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  handleSelectIdChange: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(WishlistItemContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js")))

/***/ }),

/***/ "./src/app/component/WishlistItem/WishlistItem.style.scss":
/*!****************************************************************!*\
  !*** ./src/app/component/WishlistItem/WishlistItem.style.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1605720114605
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/query/Wishlist.query.js":
/*!*****************************************!*\
  !*** ./src/app/query/Wishlist.query.js ***!
  \*****************************************/
/*! exports provided: _WishlistQuery, WishlistQuery, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_WishlistQuery", function() { return _WishlistQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WishlistQuery", function() { return WishlistQuery; });
/* harmony import */ var _ProductList_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductList.query */ "./src/app/query/ProductList.query.js");
/* harmony import */ var _store_Cart_Cart_dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../store/Cart/Cart.dispatcher */ "./src/app/store/Cart/Cart.dispatcher.js");
/* harmony import */ var _util_Auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/Auth */ "./src/app/util/Auth/index.js");
/* harmony import */ var _util_BrowserDatabase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/BrowserDatabase */ "./src/app/util/BrowserDatabase/index.js");
/* harmony import */ var _util_Query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/Query */ "./src/app/util/Query/index.js");
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





/** @namespace Query/Wishlist */

var _WishlistQuery =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_WishlistQuery, _Extensible);

  function _WishlistQuery() {
    _classCallCheck(this, _WishlistQuery);

    return _possibleConstructorReturn(this, _getPrototypeOf(_WishlistQuery).apply(this, arguments));
  }

  _createClass(_WishlistQuery, [{
    key: "getWishlistQuery",
    value: function getWishlistQuery(sharingCode) {
      var field = new _util_Query__WEBPACK_IMPORTED_MODULE_4__["Field"]('s_wishlist').setAlias('wishlist').addFieldList(this._getWishlistFields());

      if (sharingCode) {
        field.addArgument('sharing_code', 'ID', sharingCode);
      }

      return field;
    }
  }, {
    key: "getSaveWishlistItemMutation",
    value: function getSaveWishlistItemMutation(wishlistItem) {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_4__["Field"]('s_saveWishlistItem').setAlias('saveWishlistItem').addArgument('wishlistItem', 'WishlistItemInput!', wishlistItem).addFieldList(this._getItemsFields());
    }
  }, {
    key: "getShareWishlistMutation",
    value: function getShareWishlistMutation(input) {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_4__["Field"]('s_shareWishlist').setAlias('shareWishlist').addArgument('input', 'ShareWishlistInput!', input);
    }
  }, {
    key: "getClearWishlist",
    value: function getClearWishlist() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_4__["Field"]('s_clearWishlist').setAlias('clearWishlist');
    }
  }, {
    key: "getMoveWishlistToCart",
    value: function getMoveWishlistToCart(sharingCode) {
      var field = new _util_Query__WEBPACK_IMPORTED_MODULE_4__["Field"]('s_moveWishlistToCart').setAlias('moveWishlistToCart');

      if (sharingCode) {
        field.addArgument('sharingCode', 'ID', sharingCode);

        if (!Object(_util_Auth__WEBPACK_IMPORTED_MODULE_2__["isSignedIn"])()) {
          var guestQuoteId = _util_BrowserDatabase__WEBPACK_IMPORTED_MODULE_3__["default"].getItem(_store_Cart_Cart_dispatcher__WEBPACK_IMPORTED_MODULE_1__["GUEST_QUOTE_ID"]);
          field.addArgument('guestCartId', 'ID', guestQuoteId);
        }
      }

      return field;
    }
  }, {
    key: "getRemoveProductFromWishlistMutation",
    value: function getRemoveProductFromWishlistMutation(item_id) {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_4__["Field"]('s_removeProductFromWishlist').setAlias('removeProductFromWishlist').addArgument('itemId', 'ID!', item_id);
    }
  }, {
    key: "_getWishlistFields",
    value: function _getWishlistFields() {
      return ['updated_at', 'items_count', 'creators_name', this._getItemsField()];
    }
  }, {
    key: "_getItemsFields",
    value: function _getItemsFields() {
      return ['id', 'sku', 'qty', 'description', this._getProductField()];
    }
  }, {
    key: "_getProductField",
    value: function _getProductField() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_4__["Field"]('product').addFieldList(_ProductList_query__WEBPACK_IMPORTED_MODULE_0__["default"]._getProductInterfaceFields());
    }
  }, {
    key: "_getItemsField",
    value: function _getItemsField() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_4__["Field"]('items').addFieldList(this._getItemsFields());
    }
  }]);

  return _WishlistQuery;
}(Extensible());
Object.defineProperty(_WishlistQuery, 'name', {
  value: 'WishlistQuery'
});

var WishlistQuery = middleware(_WishlistQuery, "Query/Wishlist");
/* harmony default export */ __webpack_exports__["default"] = (new WishlistQuery());
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "?46aa":
false,

/***/ "?6428":
false,

/***/ "?7317":
false,

/***/ "?bbaa":
false

})
//# sourceMappingURL=account~misc.852398837cad8beb1dc3.hot-update.js.map