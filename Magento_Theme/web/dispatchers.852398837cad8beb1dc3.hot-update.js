webpackHotUpdate("dispatchers",{

/***/ "./src/app/query/Order.query.js":
/*!**************************************!*\
  !*** ./src/app/query/Order.query.js ***!
  \**************************************/
/*! exports provided: _OrderQuery, OrderQuery, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_OrderQuery", function() { return _OrderQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderQuery", function() { return OrderQuery; });
/* harmony import */ var _util_Query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/Query */ "./src/app/util/Query/index.js");
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
 * Order Query
 * @class OrderQuery
 * @namespace Query/Order
 */

var _OrderQuery =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_OrderQuery, _Extensible);

  function _OrderQuery() {
    _classCallCheck(this, _OrderQuery);

    return _possibleConstructorReturn(this, _getPrototypeOf(_OrderQuery).apply(this, arguments));
  }

  _createClass(_OrderQuery, [{
    key: "getOrderListQuery",
    value: function getOrderListQuery() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('getOrderList').addFieldList(this._getOrderListFields(true));
    }
  }, {
    key: "getOrderByIdQuery",
    value: function getOrderByIdQuery(orderId) {
      return this._getOrderByIdField(orderId);
    }
  }, {
    key: "_getOrderListFields",
    value: function _getOrderListFields(isList) {
      return [this._getOrderItemsField(isList)];
    }
  }, {
    key: "_getOrderByIdField",
    value: function _getOrderByIdField(orderId) {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('getOrderById').addArgument('id', 'Int!', orderId).addFieldList(this._getOrderItemsFields());
    }
  }, {
    key: "_getOrderProductsField",
    value: function _getOrderProductsField() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('order_products').addFieldList(this._getOrderProductsFields());
    }
  }, {
    key: "_getOrderProductsFields",
    value: function _getOrderProductsFields() {
      return [].concat(_toConsumableArray(this._getDefaultFields()), _toConsumableArray(this._prepareImageFields()), [this._prepareAttributes()]);
    }
  }, {
    key: "_prepareImageFields",
    value: function _prepareImageFields() {
      return [new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('thumbnail').addFieldList(this._prepareThumbnailFields()), new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('small_image').addFieldList(this._prepareSmallImageFields())];
    }
  }, {
    key: "_prepareSmallImageFields",
    value: function _prepareSmallImageFields() {
      return ['url', 'label', 'path'];
    }
  }, {
    key: "_prepareThumbnailFields",
    value: function _prepareThumbnailFields() {
      return ['url', 'label', 'path'];
    }
  }, {
    key: "_prepareAttributes",
    value: function _prepareAttributes() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('s_attributes').setAlias('attributes').addFieldList(this._prepareAttributesFields());
    }
  }, {
    key: "_prepareAttributesFields",
    value: function _prepareAttributesFields() {
      return ['attribute_value', 'attribute_code', 'attribute_type', 'attribute_label', this._getAttributeOptions()];
    }
  }, {
    key: "_getAttributeOptions",
    value: function _getAttributeOptions() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('attribute_options').addFieldList(this._getAttributeOptionsFields());
    }
  }, {
    key: "_getAttributeOptionsFields",
    value: function _getAttributeOptionsFields() {
      return ['label', 'value', new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('swatch_data').addField('value')];
    }
  }, {
    key: "_getDefaultFields",
    value: function _getDefaultFields() {
      return ['id', 'name', new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('short_description').addField('html'), 'sku', 'qty', 'row_total', 'original_price', 'license_key'];
    }
  }, {
    key: "_prepareShippingInfo",
    value: function _prepareShippingInfo() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('shipping_info').addFieldList(this._prepareShippingInfoFields());
    }
  }, {
    key: "_prepareShippingInfoFields",
    value: function _prepareShippingInfoFields() {
      return ['shipping_method', 'shipping_description', 'shipping_amount', 'tracking_numbers', this._prepareOrderCustomerAddressInfo()];
    }
  }, {
    key: "_prepareOrderCustomerAddressInfo",
    value: function _prepareOrderCustomerAddressInfo() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('shipping_address').addFieldList(this._prepareOrderCustomerAddressInfoFields());
    }
  }, {
    key: "_prepareOrderCustomerAddressInfoFields",
    value: function _prepareOrderCustomerAddressInfoFields() {
      return ['city', 'company', 'firstname', 'lastname', 'middlename', 'telephone', 'district', 'house_number', 'apartment_number', 'postomat_code', 'store_pickup_code', 'post_office_code', 'postcode', 'street', 'is_b2b', 'region', 'organizationname', 'organizationbin', 'organizationaddress', 'organizationiic', 'organizationbik'];
    }
  }, {
    key: "_getBaseOrderInfoField",
    value: function _getBaseOrderInfoField(isList) {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('base_order_info').addFieldList(this._getBaseOrderInfoFields(isList));
    }
  }, {
    key: "_getBaseOrderInfoFields",
    value: function _getBaseOrderInfoFields(isList) {
      return ['id', 'increment_id', 'created_at', 'status_label', 'grand_total'].concat(_toConsumableArray(isList ? [] : ['sub_total']));
    }
  }, {
    key: "_getPaymentInfoField",
    value: function _getPaymentInfoField() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('payment_info').addFieldList(this._getPaymentInfoFields());
    }
  }, {
    key: "_getPaymentInfoFields",
    value: function _getPaymentInfoFields() {
      return ['method', this._getAdditionalInformationField()];
    }
  }, {
    key: "_getAdditionalInformationField",
    value: function _getAdditionalInformationField() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('additional_information').addFieldList(this._getAdditionalInformationFields());
    }
  }, {
    key: "_getAdditionalInformationFields",
    value: function _getAdditionalInformationFields() {
      return ['bank', 'method_title', 'credit_type', 'month', this._getCustomerInfoField()];
    }
  }, {
    key: "_getCustomerInfoField",
    value: function _getCustomerInfoField() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('customer_info').addFieldList(this._getCustomerInfoFields());
    }
  }, {
    key: "_getCustomerInfoFields",
    value: function _getCustomerInfoFields() {
      return ['first_name', 'last_name', 'phone'];
    }
  }, {
    key: "_getOrderItemsField",
    value: function _getOrderItemsField(isList) {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('items').addFieldList(this._getOrderItemsFields(isList));
    }
  }, {
    key: "_getOrderItemsFields",
    value: function _getOrderItemsFields(isList) {
      return [this._getBaseOrderInfoField(isList)].concat(_toConsumableArray(!isList ? [this._getPaymentInfoField(), this._prepareShippingInfo(), this._getOrderProductsField()] : []));
    }
  }]);

  return _OrderQuery;
}(Extensible());
Object.defineProperty(_OrderQuery, 'name', {
  value: 'OrderQuery'
});

var OrderQuery = middleware(_OrderQuery, "Query/Order");
/* harmony default export */ __webpack_exports__["default"] = (new OrderQuery());
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/query/Review.query.js":
/*!***************************************!*\
  !*** ./src/app/query/Review.query.js ***!
  \***************************************/
/*! exports provided: _ReviewQuery, ReviewQuery, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ReviewQuery", function() { return _ReviewQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReviewQuery", function() { return ReviewQuery; });
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

/** @namespace Query/Review */

var _ReviewQuery =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ReviewQuery, _Extensible);

  function _ReviewQuery() {
    _classCallCheck(this, _ReviewQuery);

    return _possibleConstructorReturn(this, _getPrototypeOf(_ReviewQuery).apply(this, arguments));
  }

  _createClass(_ReviewQuery, [{
    key: "getAddProductReviewMutation",
    value: function getAddProductReviewMutation(reviewItem) {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('createProductReview').setAlias('addProductReview').addArgument('input', 'CreateProductReviewInput!', reviewItem).addField(new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('review').addField('nickname'));
    }
  }, {
    key: "getRatingQuery",
    value: function getRatingQuery() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('productReviewRatingsMetadata').setAlias('reviewRatings').addFieldList(this._getRatingFields());
    }
  }, {
    key: "_getRatingFields",
    value: function _getRatingFields() {
      return [this._getRatingItemsField()];
    }
  }, {
    key: "_getRatingItemsField",
    value: function _getRatingItemsField() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('items').addFieldList(this._getRatingItemsFields());
    }
  }, {
    key: "_getRatingItemsFields",
    value: function _getRatingItemsFields() {
      return [new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('id').setAlias('rating_id'), new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('name').setAlias('rating_code'), this._getRatingOptionsField()];
    }
  }, {
    key: "_getRatingOptionFields",
    value: function _getRatingOptionFields() {
      return [new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('value_id').setAlias('option_id'), 'value'];
    }
  }, {
    key: "_getRatingOptionsField",
    value: function _getRatingOptionsField() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('values').setAlias('rating_options').addFieldList(this._getRatingOptionFields());
    }
  }]);

  return _ReviewQuery;
}(Extensible());
Object.defineProperty(_ReviewQuery, 'name', {
  value: 'ReviewQuery'
});

var ReviewQuery = middleware(_ReviewQuery, "Query/Review");
/* harmony default export */ __webpack_exports__["default"] = (new ReviewQuery());
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

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

/***/ "./src/app/store/Checkout/Checkout.dispatcher.js":
/*!*******************************************************!*\
  !*** ./src/app/store/Checkout/Checkout.dispatcher.js ***!
  \*******************************************************/
/*! exports provided: _CheckoutDispatcher, CheckoutDispatcher, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_CheckoutDispatcher", function() { return _CheckoutDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckoutDispatcher", function() { return CheckoutDispatcher; });
/* harmony import */ var _query_CheckEmail_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../query/CheckEmail.query */ "./src/app/query/CheckEmail.query.js");
/* harmony import */ var _util_Request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/Request */ "./src/app/util/Request/index.js");
/* harmony import */ var _Checkout_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Checkout.action */ "./src/app/store/Checkout/Checkout.action.js");
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
 * Checkout Dispatcher
 * @class CheckoutDispatcher
 * @extends QueryDispatcher
 * @namespace Store/Checkout/Dispatcher
 *  */

var _CheckoutDispatcher =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_CheckoutDispatcher, _Extensible);

  function _CheckoutDispatcher() {
    _classCallCheck(this, _CheckoutDispatcher);

    return _possibleConstructorReturn(this, _getPrototypeOf(_CheckoutDispatcher).apply(this, arguments));
  }

  _createClass(_CheckoutDispatcher, [{
    key: "__construct",
    value: function __construct() {
      _get(_getPrototypeOf(_CheckoutDispatcher.prototype), "__construct", this).call(this, 'Checkout');
    }
  }, {
    key: "onSuccess",
    value: function onSuccess(data, dispatch) {
      var is_email_available = data.isEmailAvailable.is_email_available;
      dispatch(Object(_Checkout_action__WEBPACK_IMPORTED_MODULE_2__["updateEmailAvailable"])(is_email_available));
    }
  }, {
    key: "onError",
    value: function onError(error, dispatch) {
      dispatch(Object(_Checkout_action__WEBPACK_IMPORTED_MODULE_2__["updateEmailAvailable"])(true));
    }
  }, {
    key: "prepareRequest",
    value: function prepareRequest(email) {
      return _query_CheckEmail_query__WEBPACK_IMPORTED_MODULE_0__["default"].getIsEmailAvailableQuery(email);
    }
  }]);

  return _CheckoutDispatcher;
}(Extensible(_util_Request__WEBPACK_IMPORTED_MODULE_1__["QueryDispatcher"]));
Object.defineProperty(_CheckoutDispatcher, 'name', {
  value: 'CheckoutDispatcher'
});

var CheckoutDispatcher = middleware(_CheckoutDispatcher, "Store/Checkout/Dispatcher");
/* harmony default export */ __webpack_exports__["default"] = (new CheckoutDispatcher());
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/store/Review/Review.dispatcher.js":
/*!***************************************************!*\
  !*** ./src/app/store/Review/Review.dispatcher.js ***!
  \***************************************************/
/*! exports provided: _ReviewDispatcher, ReviewDispatcher, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ReviewDispatcher", function() { return _ReviewDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReviewDispatcher", function() { return ReviewDispatcher; });
/* harmony import */ var _query_Review_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../query/Review.query */ "./src/app/query/Review.query.js");
/* harmony import */ var _Notification_Notification_action__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Notification/Notification.action */ "./src/app/store/Notification/Notification.action.js");
/* harmony import */ var _util_Request__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/Request */ "./src/app/util/Request/index.js");
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



/**
 * Product Review Dispatcher
 * @class WishlistDispatcher
 * @namespace Store/Review/Dispatcher
 */

var _ReviewDispatcher =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ReviewDispatcher, _Extensible);

  function _ReviewDispatcher() {
    _classCallCheck(this, _ReviewDispatcher);

    return _possibleConstructorReturn(this, _getPrototypeOf(_ReviewDispatcher).apply(this, arguments));
  }

  _createClass(_ReviewDispatcher, [{
    key: "prepareReviewData",
    value: function prepareReviewData(reviewItem) {
      var rating_data = reviewItem.rating_data,
          product_sku = reviewItem.product_sku,
          detail = reviewItem.detail,
          title = reviewItem.title,
          nickname = reviewItem.nickname;
      return {
        nickname: nickname,
        sku: product_sku,
        summary: title,
        text: detail,
        ratings: Object.keys(rating_data).map(function (key) {
          return {
            id: key,
            value_id: rating_data[key]
          };
        })
      };
    }
  }, {
    key: "submitProductReview",
    value: function submitProductReview(dispatch, options) {
      return Object(_util_Request__WEBPACK_IMPORTED_MODULE_2__["fetchMutation"])(_query_Review_query__WEBPACK_IMPORTED_MODULE_0__["default"].getAddProductReviewMutation(this.prepareReviewData(options))).then(
      /** @namespace Store/Review/Dispatcher/submitProductReviewFetchMutationThen */
      middleware(function () {
        return dispatch(Object(_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_1__["showNotification"])('success', 'You submitted your review for moderation.'));
      }, "Store/Review/Dispatcher/submitProductReviewFetchMutationThen"),
      /** @namespace Store/Review/Dispatcher/submitProductReviewFetchMutationError */
      // eslint-disable-next-line no-console
      middleware(function (error) {
        return dispatch(Object(_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_1__["showNotification"])('error', 'Error submitting review!')) && console.log(error);
      }, "Store/Review/Dispatcher/submitProductReviewFetchMutationError"));
    }
  }]);

  return _ReviewDispatcher;
}(Extensible());
Object.defineProperty(_ReviewDispatcher, 'name', {
  value: 'ReviewDispatcher'
});

var ReviewDispatcher = middleware(_ReviewDispatcher, "Store/Review/Dispatcher");
/* harmony default export */ __webpack_exports__["default"] = (new ReviewDispatcher());
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ })

})
//# sourceMappingURL=dispatchers.852398837cad8beb1dc3.hot-update.js.map