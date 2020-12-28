(this["webpackJsonp"] = this["webpackJsonp"] || []).push([["dispatchers"],{

/***/ "./src/app/query/Category.query.js":
/*!*****************************************!*\
  !*** ./src/app/query/Category.query.js ***!
  \*****************************************/
/*! exports provided: _CategoryQuery, CategoryQuery, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_CategoryQuery", function() { return _CategoryQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryQuery", function() { return CategoryQuery; });
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
 * Category Query
 * @class CategoryQuery
 * @namespace Query/Category
 */

var _CategoryQuery =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_CategoryQuery, _Extensible);

  function _CategoryQuery() {
    _classCallCheck(this, _CategoryQuery);

    return _possibleConstructorReturn(this, _getPrototypeOf(_CategoryQuery).apply(this, arguments));
  }

  _createClass(_CategoryQuery, [{
    key: "__construct",
    value: function __construct() {
      _get(_getPrototypeOf(_CategoryQuery.prototype), "__construct", this).call(this);

      this.options = {};
    }
  }, {
    key: "getQuery",
    value: function getQuery() {
      var _ref;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.options = options;
      return (_ref = new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('category')).addArgument.apply(_ref, _toConsumableArray(this._getConditionalArguments())).addFieldList(this._getDefaultFields()).addField(this._getChildrenFields());
    }
  }, {
    key: "_getConditionalArguments",
    value: function _getConditionalArguments() {
      var categoryIds = this.options.categoryIds;

      if (categoryIds) {
        return ['id', 'Int!', categoryIds];
      }

      throw new Error(__('There was an error requesting the category'));
    }
  }, {
    key: "_getChildrenFields",
    value: function _getChildrenFields() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('children').addFieldList(this._getDefaultFields());
    }
  }, {
    key: "_getBreadcrumbsField",
    value: function _getBreadcrumbsField() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('breadcrumbs').addFieldList(this._getBreadcrumbFields());
    }
  }, {
    key: "_getBreadcrumbFields",
    value: function _getBreadcrumbFields() {
      return ['category_name', 'category_level', 'category_url', 'category_is_active'];
    }
  }, {
    key: "_getCmsBlockFields",
    value: function _getCmsBlockFields() {
      return ['content', 'disabled', 'title', 'identifier'];
    }
  }, {
    key: "_getCmsBlockField",
    value: function _getCmsBlockField() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('cms_block').addFieldList(this._getCmsBlockFields());
    }
  }, {
    key: "_getDefaultFields",
    value: function _getDefaultFields() {
      return ['id', 'url', 'name', 'image', 'url_key', 'url_path', 'is_active', 'meta_title', 'description', 'canonical_url', 'product_count', 'meta_keywords', 'default_sort_by', 'meta_description', 'landing_page', 'display_mode', this._getCmsBlockField(), this._getBreadcrumbsField()];
    }
  }]);

  return _CategoryQuery;
}(Extensible());
Object.defineProperty(_CategoryQuery, 'name', {
  value: 'CategoryQuery'
});

var CategoryQuery = middleware(_CategoryQuery, "Query/Category");
/* harmony default export */ __webpack_exports__["default"] = (new CategoryQuery());
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/query/CheckEmail.query.js":
/*!*******************************************!*\
  !*** ./src/app/query/CheckEmail.query.js ***!
  \*******************************************/
/*! exports provided: _CheckEmailQuery, CheckEmailQuery, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_CheckEmailQuery", function() { return _CheckEmailQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckEmailQuery", function() { return CheckEmailQuery; });
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

/**
 * Email availability check Query
 * @class CheckEmailQuery
 * @namespace Query/CheckEmail
 */

var _CheckEmailQuery =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_CheckEmailQuery, _Extensible);

  function _CheckEmailQuery() {
    _classCallCheck(this, _CheckEmailQuery);

    return _possibleConstructorReturn(this, _getPrototypeOf(_CheckEmailQuery).apply(this, arguments));
  }

  _createClass(_CheckEmailQuery, [{
    key: "getIsEmailAvailableQuery",
    value: function getIsEmailAvailableQuery(email) {
      var query = new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('isEmailAvailable').addArgument('email', 'String!', email).addField('is_email_available');
      return query;
    }
  }]);

  return _CheckEmailQuery;
}(Extensible());
Object.defineProperty(_CheckEmailQuery, 'name', {
  value: 'CheckEmailQuery'
});

var CheckEmailQuery = middleware(_CheckEmailQuery, "Query/CheckEmail");
/* harmony default export */ __webpack_exports__["default"] = (new CheckEmailQuery());
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/query/ContactForm.query.js":
/*!********************************************!*\
  !*** ./src/app/query/ContactForm.query.js ***!
  \********************************************/
/*! exports provided: _ContactFormQuery, ContactFormQuery, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ContactFormQuery", function() { return _ContactFormQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactFormQuery", function() { return ContactFormQuery; });
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

/** @namespace Query/ContactForm */

var _ContactFormQuery =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ContactFormQuery, _Extensible);

  function _ContactFormQuery() {
    _classCallCheck(this, _ContactFormQuery);

    return _possibleConstructorReturn(this, _getPrototypeOf(_ContactFormQuery).apply(this, arguments));
  }

  _createClass(_ContactFormQuery, [{
    key: "getSendContactFormMutation",
    value: function getSendContactFormMutation(options) {
      var mutation = new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('contactForm');

      this._addSendContactFormMutationArguments(mutation, options);

      mutation.addFieldList(this._getSendContactFormMutationResponse());
      return mutation;
    }
  }, {
    key: "getContactPageConfigQuery",
    value: function getContactPageConfigQuery() {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('contactPageConfig').addFieldList(this._getContactPageConfigFields());
    }
  }, {
    key: "_addSendContactFormMutationArguments",
    value: function _addSendContactFormMutationArguments(mutation, options) {
      return mutation.addArgument('contact', 'ContactForm!', options);
    }
  }, {
    key: "_getSendContactFormMutationResponse",
    value: function _getSendContactFormMutationResponse() {
      return ['message'];
    }
  }, {
    key: "_getContactPageConfigFields",
    value: function _getContactPageConfigFields() {
      return ['enabled'];
    }
  }]);

  return _ContactFormQuery;
}(Extensible());
Object.defineProperty(_ContactFormQuery, 'name', {
  value: 'ContactFormQuery'
});

var ContactFormQuery = middleware(_ContactFormQuery, "Query/ContactForm");
/* harmony default export */ __webpack_exports__["default"] = (new ContactFormQuery());
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/query/NewsletterSubscription.query.js":
/*!*******************************************************!*\
  !*** ./src/app/query/NewsletterSubscription.query.js ***!
  \*******************************************************/
/*! exports provided: _NewsletterSubscriptionQuery, NewsletterSubscriptionQuery, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_NewsletterSubscriptionQuery", function() { return _NewsletterSubscriptionQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewsletterSubscriptionQuery", function() { return NewsletterSubscriptionQuery; });
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

/**
 * NewsletterSubscription Mutations
 * @class NewsletterSubscriptionQuery
 * @namespace Query/NewsletterSubscription
 */

var _NewsletterSubscriptionQuery =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_NewsletterSubscriptionQuery, _Extensible);

  function _NewsletterSubscriptionQuery() {
    _classCallCheck(this, _NewsletterSubscriptionQuery);

    return _possibleConstructorReturn(this, _getPrototypeOf(_NewsletterSubscriptionQuery).apply(this, arguments));
  }

  _createClass(_NewsletterSubscriptionQuery, [{
    key: "getSubscribeToNewsletterMutation",
    value: function getSubscribeToNewsletterMutation(email) {
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('subscribeEmailToNewsletter').addArgument('email', 'String!', email).addFieldList(this._getPageFields());
    }
  }, {
    key: "_getPageFields",
    value: function _getPageFields() {
      return ['status'];
    }
  }]);

  return _NewsletterSubscriptionQuery;
}(Extensible());
Object.defineProperty(_NewsletterSubscriptionQuery, 'name', {
  value: 'NewsletterSubscriptionQuery'
});

var NewsletterSubscriptionQuery = middleware(_NewsletterSubscriptionQuery, "Query/NewsletterSubscription");
/* harmony default export */ __webpack_exports__["default"] = (new NewsletterSubscriptionQuery());
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

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

/***/ "./src/app/query/UrlRewrites.query.js":
/*!********************************************!*\
  !*** ./src/app/query/UrlRewrites.query.js ***!
  \********************************************/
/*! exports provided: _UrlRewritesQuery, UrlRewritesQuery, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_UrlRewritesQuery", function() { return _UrlRewritesQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UrlRewritesQuery", function() { return UrlRewritesQuery; });
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

/**
 * UrlRewrites Query
 * @class UrlRewritesQuery
 * @namespace Query/UrlRewrites
 */

var _UrlRewritesQuery =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_UrlRewritesQuery, _Extensible);

  function _UrlRewritesQuery() {
    _classCallCheck(this, _UrlRewritesQuery);

    return _possibleConstructorReturn(this, _getPrototypeOf(_UrlRewritesQuery).apply(this, arguments));
  }

  _createClass(_UrlRewritesQuery, [{
    key: "getQuery",
    value: function getQuery(_ref) {
      var urlParam = _ref.urlParam;
      return new _util_Query__WEBPACK_IMPORTED_MODULE_0__["Field"]('urlResolver').addArgument('url', 'String!', urlParam).addFieldList(this._getUrlResolverFields());
    }
  }, {
    key: "_getUrlResolverFields",
    value: function _getUrlResolverFields() {
      return ['id', 'sku', 'type'];
    }
  }]);

  return _UrlRewritesQuery;
}(Extensible());
Object.defineProperty(_UrlRewritesQuery, 'name', {
  value: 'UrlRewritesQuery'
});

var UrlRewritesQuery = middleware(_UrlRewritesQuery, "Query/UrlRewrites");
/* harmony default export */ __webpack_exports__["default"] = (new UrlRewritesQuery());
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
      return new _util_Query__WEBPACK_IMPORTED_MODULE_4__["Field"]('s_saveWishlistItem').setAlias('saveWishlistItem').addArgument('wishlistItem', 'WishlistItemInput!', wishlistItem).addFieldList(this._getWishlistItemsFields());
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
    key: "_getWishlistItemsFields",
    value: function _getWishlistItemsFields() {
      return ['id', 'sku', 'qty', 'description'];
    }
  }, {
    key: "_getItemsFields",
    value: function _getItemsFields() {
      return [].concat(_toConsumableArray(this._getWishlistItemsFields()), [this._getProductField()]);
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

/***/ "./src/app/store/Breadcrumbs/Breadcrumbs.dispatcher.js":
/*!*************************************************************!*\
  !*** ./src/app/store/Breadcrumbs/Breadcrumbs.dispatcher.js ***!
  \*************************************************************/
/*! exports provided: _BreadcrumbsDispatcher, BreadcrumbsDispatcher, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_BreadcrumbsDispatcher", function() { return _BreadcrumbsDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BreadcrumbsDispatcher", function() { return BreadcrumbsDispatcher; });
/* harmony import */ var _Breadcrumbs_action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Breadcrumbs.action */ "./src/app/store/Breadcrumbs/Breadcrumbs.action.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
 * Breadcrumbs Dispatcher
 * @class BreadcrumbsDispatcher
 * @namespace Store/Breadcrumbs/Dispatcher
 */

var _BreadcrumbsDispatcher =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_BreadcrumbsDispatcher, _Extensible);

  function _BreadcrumbsDispatcher() {
    _classCallCheck(this, _BreadcrumbsDispatcher);

    return _possibleConstructorReturn(this, _getPrototypeOf(_BreadcrumbsDispatcher).apply(this, arguments));
  }

  _createClass(_BreadcrumbsDispatcher, [{
    key: "update",

    /**
     * Set breadcrumbs
     * @param {Array<Object>} breadcrumbs Breadcrumbs array
     * @param {Function} dispatch
     * @memberof BreadcrumbsDispatcher
     */
    value: function update(breadcrumbs, dispatch) {
      dispatch(Object(_Breadcrumbs_action__WEBPACK_IMPORTED_MODULE_0__["toggleBreadcrumbs"])(true));
      dispatch(Object(_Breadcrumbs_action__WEBPACK_IMPORTED_MODULE_0__["updateBreadcrumbs"])(breadcrumbs));
    }
    /**
     * Set breadcrumbs for category
     * @param {Array<Object>} category Category breadcumbs items
     * @param {Function} dispatch
     * @memberof BreadcrumbsDispatcher
     */

  }, {
    key: "updateWithCategory",
    value: function updateWithCategory(category, dispatch) {
      var breadcrumbs = this._getCategoryBreadcrumbs(category);

      dispatch(Object(_Breadcrumbs_action__WEBPACK_IMPORTED_MODULE_0__["toggleBreadcrumbs"])(true));
      dispatch(Object(_Breadcrumbs_action__WEBPACK_IMPORTED_MODULE_0__["updateBreadcrumbs"])(breadcrumbs));
    }
    /**
     * Set breadcrumbs for category
     * @param {Array<Object>} category Category breadcumbs items
     * @param {Function} dispatch
     * @memberof BreadcrumbsDispatcher
     */

  }, {
    key: "updateWithProduct",
    value: function updateWithProduct(product, dispatch) {
      var breadcrumbs = this._getProductBreadcrumbs(product);

      dispatch(Object(_Breadcrumbs_action__WEBPACK_IMPORTED_MODULE_0__["toggleBreadcrumbs"])(true));
      dispatch(Object(_Breadcrumbs_action__WEBPACK_IMPORTED_MODULE_0__["updateBreadcrumbs"])(breadcrumbs));
    }
    /**
     * Set breadcrumbs for category
     * @param {Array<Object>} category Category breadcumbs items
     * @param {Function} dispatch
     * @memberof BreadcrumbsDispatcher
     */

  }, {
    key: "updateWithCmsPage",
    value: function updateWithCmsPage(_ref, dispatch) {
      var title = _ref.title;
      var breadcrumbs = title ? [{
        url: '',
        name: title
      }, {
        url: '/',
        name: __('Home')
      }] : [];
      dispatch(Object(_Breadcrumbs_action__WEBPACK_IMPORTED_MODULE_0__["updateBreadcrumbs"])(breadcrumbs));
    }
    /**
     * Get breadcrumbs for category
     * @param {Object} category Category breadcumbs items
     * @return {Array<Object>} Breadcrumbs array
     * @memberof BreadcrumbsDispatcher
     */

  }, {
    key: "_getCategoryBreadcrumbs",
    value: function _getCategoryBreadcrumbs(category) {
      var url = category.url,
          name = category.name,
          breadcrumbs = category.breadcrumbs;
      var breadcrumbsList = [];

      if (breadcrumbs) {
        breadcrumbs.sort(function (a, b) {
          return a.category_level - b.category_level;
        }).forEach(function (crumb) {
          var category_url = crumb.category_url,
              category_name = crumb.category_name,
              category_is_active = crumb.category_is_active; // do not add link to inactive categories

          if (category_is_active) {
            breadcrumbsList.push({
              name: category_name,
              url: {
                pathname: category_url,
                state: {
                  category: true
                }
              }
            });
          } else {
            breadcrumbsList.push({
              url: '',
              name: category_name
            });
          }
        });
      }

      return [{
        url: url,
        name: name
      }].concat(_toConsumableArray(breadcrumbsList.reverse()));
    }
    /**
     * Get breadcrumbs for product
     * @param {Object} product Product breadcumbs items
     * @return {Array<Object>} Breadcrumbs array
     * @memberof BreadcrumbsDispatcher
     */

  }, {
    key: "_getProductBreadcrumbs",
    value: function _getProductBreadcrumbs(product) {
      var categories = product.categories,
          url = product.url,
          name = product.name;

      if (!categories || !categories.length) {
        return [];
      }

      var _categories$reduce = categories.reduce(function (acc, category) {
        var longestBreadcrumbsLength = acc.longestBreadcrumbsLength;
        var breadcrumbs = category.breadcrumbs;
        var breadcrumbsLength = (breadcrumbs || []).length;

        if (!breadcrumbsLength && longestBreadcrumbsLength !== 0) {
          return acc;
        }

        if (longestBreadcrumbsLength === 0) {
          return _objectSpread2(_objectSpread2({}, acc), {}, {
            breadcrumbsCategory: category
          });
        }

        if (breadcrumbsLength <= longestBreadcrumbsLength) {
          return acc;
        }

        return {
          breadcrumbsCategory: category,
          longestBreadcrumbsLength: breadcrumbsLength
        };
      }, {
        breadcrumbsCategory: {},
        longestBreadcrumbsLength: 0
      }),
          _categories$reduce$br = _categories$reduce.breadcrumbsCategory,
          breadcrumbsCategory = _categories$reduce$br === void 0 ? {} : _categories$reduce$br;

      return [{
        url: url,
        name: name
      }].concat(_toConsumableArray(this._getCategoryBreadcrumbs(breadcrumbsCategory)));
    }
  }]);

  return _BreadcrumbsDispatcher;
}(Extensible());
Object.defineProperty(_BreadcrumbsDispatcher, 'name', {
  value: 'BreadcrumbsDispatcher'
});

var BreadcrumbsDispatcher = middleware(_BreadcrumbsDispatcher, "Store/Breadcrumbs/Dispatcher");
/* harmony default export */ __webpack_exports__["default"] = (new BreadcrumbsDispatcher());
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/store/Category/Category.dispatcher.js":
/*!*******************************************************!*\
  !*** ./src/app/store/Category/Category.dispatcher.js ***!
  \*******************************************************/
/*! exports provided: _CategoryDispatcher, CategoryDispatcher, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_CategoryDispatcher", function() { return _CategoryDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryDispatcher", function() { return CategoryDispatcher; });
/* harmony import */ var _query_Category_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../query/Category.query */ "./src/app/query/Category.query.js");
/* harmony import */ var _Category_action__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Category.action */ "./src/app/store/Category/Category.action.js");
/* harmony import */ var _NoMatch_NoMatch_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../NoMatch/NoMatch.action */ "./src/app/store/NoMatch/NoMatch.action.js");
/* harmony import */ var _Notification_Notification_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Notification/Notification.action */ "./src/app/store/Notification/Notification.action.js");
/* harmony import */ var _util_Request__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/Request */ "./src/app/util/Request/index.js");
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
 * Category Dispatcher
 * @class CategoryDispatcher
 * @extends QueryDispatcher
 * @namespace Store/Category/Dispatcher
 */

var _CategoryDispatcher =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_CategoryDispatcher, _Extensible);

  function _CategoryDispatcher() {
    _classCallCheck(this, _CategoryDispatcher);

    return _possibleConstructorReturn(this, _getPrototypeOf(_CategoryDispatcher).apply(this, arguments));
  }

  _createClass(_CategoryDispatcher, [{
    key: "__construct",
    value: function __construct() {
      _get(_getPrototypeOf(_CategoryDispatcher.prototype), "__construct", this).call(this, 'Category');
    }
  }, {
    key: "onSuccess",
    value: function onSuccess(data, dispatch, _ref) {
      var isSearchPage = _ref.isSearchPage;
      var _data$category = data.category,
          category = _data$category === void 0 ? {} : _data$category,
          id = data.category.id;

      if (!id && !isSearchPage) {
        dispatch(Object(_NoMatch_NoMatch_action__WEBPACK_IMPORTED_MODULE_2__["updateNoMatch"])(true));
      }

      dispatch(Object(_Category_action__WEBPACK_IMPORTED_MODULE_1__["updateCurrentCategory"])(category));
    }
  }, {
    key: "onError",
    value: function onError(error, dispatch, _ref2) {
      var isSearchPage = _ref2.isSearchPage;

      if (!isSearchPage) {
        dispatch(Object(_NoMatch_NoMatch_action__WEBPACK_IMPORTED_MODULE_2__["updateNoMatch"])(true));
        dispatch(Object(_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_3__["showNotification"])('error', 'Error fetching Category!', error));
      } else {
        dispatch(Object(_Category_action__WEBPACK_IMPORTED_MODULE_1__["updateCurrentCategory"])({
          id: 'all-products'
        }));
      }
    }
  }, {
    key: "prepareRequest",
    value: function prepareRequest(options) {
      return _query_Category_query__WEBPACK_IMPORTED_MODULE_0__["default"].getQuery(options);
    }
  }]);

  return _CategoryDispatcher;
}(Extensible(_util_Request__WEBPACK_IMPORTED_MODULE_4__["QueryDispatcher"]));
Object.defineProperty(_CategoryDispatcher, 'name', {
  value: 'CategoryDispatcher'
});

var CategoryDispatcher = middleware(_CategoryDispatcher, "Store/Category/Dispatcher");
/* harmony default export */ __webpack_exports__["default"] = (new CategoryDispatcher());
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
      return error;
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

/***/ "./src/app/store/ContactForm/ContactForm.dispatcher.js":
/*!*************************************************************!*\
  !*** ./src/app/store/ContactForm/ContactForm.dispatcher.js ***!
  \*************************************************************/
/*! exports provided: _ContactFormDispatcher, ContactFormDispatcher, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ContactFormDispatcher", function() { return _ContactFormDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactFormDispatcher", function() { return ContactFormDispatcher; });
/* harmony import */ var _query_ContactForm_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../query/ContactForm.query */ "./src/app/query/ContactForm.query.js");
/* harmony import */ var _Notification_Notification_action__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Notification/Notification.action */ "./src/app/store/Notification/Notification.action.js");
/* harmony import */ var _util_Request__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/Request */ "./src/app/util/Request/index.js");
/* harmony import */ var _ContactForm_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ContactForm.action */ "./src/app/store/ContactForm/ContactForm.action.js");
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
 * ContactForm Dispatcher
 * @class ContactFormDispatcher
 * @extends QueryDispatcher
 * @namespace Store/ContactForm/Dispatcher
 */

var _ContactFormDispatcher =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ContactFormDispatcher, _Extensible);

  function _ContactFormDispatcher() {
    _classCallCheck(this, _ContactFormDispatcher);

    return _possibleConstructorReturn(this, _getPrototypeOf(_ContactFormDispatcher).apply(this, arguments));
  }

  _createClass(_ContactFormDispatcher, [{
    key: "prepareRequest",
    value: function prepareRequest(options, dispatch) {
      var mutation = _query_ContactForm_query__WEBPACK_IMPORTED_MODULE_0__["default"].getSendContactFormMutation(options);
      dispatch(Object(_ContactForm_action__WEBPACK_IMPORTED_MODULE_3__["updateContactForm"])({
        isLoading: true
      }));
      return Object(_util_Request__WEBPACK_IMPORTED_MODULE_2__["fetchMutation"])(mutation).then(
      /** @namespace Store/ContactForm/Dispatcher/fetchMutationThen */
      middleware(function (data) {
        dispatch(Object(_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_1__["showNotification"])('success', data.contactForm.message));
        dispatch(Object(_ContactForm_action__WEBPACK_IMPORTED_MODULE_3__["updateContactForm"])({
          isLoading: false
        }));
      }, "Store/ContactForm/Dispatcher/fetchMutationThen"),
      /** @namespace Store/ContactForm/Dispatcher/fetchMutationError */
      middleware(function (error) {
        dispatch(Object(_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_1__["showNotification"])('error', error[0].message));
        dispatch(Object(_ContactForm_action__WEBPACK_IMPORTED_MODULE_3__["updateContactForm"])({
          isLoading: false
        }));
      }, "Store/ContactForm/Dispatcher/fetchMutationError"));
    }
  }]);

  return _ContactFormDispatcher;
}(Extensible());
Object.defineProperty(_ContactFormDispatcher, 'name', {
  value: 'ContactFormDispatcher'
});

var ContactFormDispatcher = middleware(_ContactFormDispatcher, "Store/ContactForm/Dispatcher");
/* harmony default export */ __webpack_exports__["default"] = (new ContactFormDispatcher());
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/store/Meta/Meta.dispatcher.js":
/*!***********************************************!*\
  !*** ./src/app/store/Meta/Meta.dispatcher.js ***!
  \***********************************************/
/*! exports provided: _MetaDispatcher, MetaDispatcher, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MetaDispatcher", function() { return _MetaDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetaDispatcher", function() { return MetaDispatcher; });
/* harmony import */ var _Meta_action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Meta.action */ "./src/app/store/Meta/Meta.action.js");
/* harmony import */ var _util_Url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/Url */ "./src/app/util/Url/index.js");
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
 * Meta Dispatcher
 * @class MetaDispatcher
 * @namespace Util/Meta/Dispatcher
 */

var _MetaDispatcher =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MetaDispatcher, _Extensible);

  function _MetaDispatcher() {
    _classCallCheck(this, _MetaDispatcher);

    return _possibleConstructorReturn(this, _getPrototypeOf(_MetaDispatcher).apply(this, arguments));
  }

  _createClass(_MetaDispatcher, [{
    key: "updateWithCategory",

    /**
     * Set meta for category
     * @param {Object} category
     * @param {Function} dispatch
     * @memberof MetaDispatcher
     */
    value: function updateWithCategory(category, dispatch) {
      var meta = this._getCategoryMeta(category);

      dispatch(Object(_Meta_action__WEBPACK_IMPORTED_MODULE_0__["updateMeta"])(meta));
    }
    /**
     * Set meta for product
     * @param {Object} product
     * @param {Function} dispatch
     * @memberof MetaDispatcher
     */

  }, {
    key: "updateWithProduct",
    value: function updateWithProduct(product, dispatch) {
      var meta = this._getProductMeta(product);

      dispatch(Object(_Meta_action__WEBPACK_IMPORTED_MODULE_0__["updateMeta"])(meta));
    }
    /**
     * Get meta for product
     * @param {Object} product
     * @return {Object} Meta object
     * @memberof MetaDispatcher
     */

  }, {
    key: "_getProductMeta",
    value: function _getProductMeta(product) {
      var name = product.name,
          meta_title = product.meta_title,
          meta_keyword = product.meta_keyword,
          canonical_url = product.canonical_url,
          meta_description = product.meta_description;
      return {
        description: meta_description,
        keywords: meta_keyword,
        title: meta_title || name,
        canonical_url: "".concat(window.location.origin).concat(Object(_util_Url__WEBPACK_IMPORTED_MODULE_1__["appendWithStoreCode"])(canonical_url))
      };
    }
    /**
     * Get meta for category
     * @param {Object} category
     * @return {Object} Meta object
     * @memberof MetaDispatcher
     */

  }, {
    key: "_getCategoryMeta",
    value: function _getCategoryMeta(category) {
      var description = category.description,
          name = category.name,
          canonical_url = category.canonical_url,
          meta_title = category.meta_title,
          meta_keyword = category.meta_keyword,
          meta_description = category.meta_description,
          _category$meta_robots = category.meta_robots,
          meta_robots = _category$meta_robots === void 0 ? 'follow, index' : _category$meta_robots;
      return {
        description: meta_description || description,
        title: meta_title || name,
        keywords: meta_keyword,
        canonical_url: "".concat(window.location.origin).concat(Object(_util_Url__WEBPACK_IMPORTED_MODULE_1__["appendWithStoreCode"])(canonical_url)),
        robots: meta_robots
      };
    }
  }]);

  return _MetaDispatcher;
}(Extensible());
Object.defineProperty(_MetaDispatcher, 'name', {
  value: 'MetaDispatcher'
});

var MetaDispatcher = middleware(_MetaDispatcher, "Util/Meta/Dispatcher");
/* harmony default export */ __webpack_exports__["default"] = (new MetaDispatcher());
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/store/NewsletterSubscription/NewsletterSubscription.dispatcher.js":
/*!***********************************************************************************!*\
  !*** ./src/app/store/NewsletterSubscription/NewsletterSubscription.dispatcher.js ***!
  \***********************************************************************************/
/*! exports provided: _NewsletterSubscriptionDispatcher, NewsletterSubscriptionDispatcher, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, middleware, __) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_NewsletterSubscriptionDispatcher", function() { return _NewsletterSubscriptionDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewsletterSubscriptionDispatcher", function() { return NewsletterSubscriptionDispatcher; });
/* harmony import */ var _query_NewsletterSubscription_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../query/NewsletterSubscription.query */ "./src/app/query/NewsletterSubscription.query.js");
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
 * Product Cart Dispatcher
 * @class NewsletterSubscriptionDispatcher
 * @namespace Store/NewsletterSubscription/Dispatcher
 */

var _NewsletterSubscriptionDispatcher =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_NewsletterSubscriptionDispatcher, _Extensible);

  function _NewsletterSubscriptionDispatcher() {
    _classCallCheck(this, _NewsletterSubscriptionDispatcher);

    return _possibleConstructorReturn(this, _getPrototypeOf(_NewsletterSubscriptionDispatcher).apply(this, arguments));
  }

  _createClass(_NewsletterSubscriptionDispatcher, [{
    key: "subscribeToNewsletter",
    value: function subscribeToNewsletter(dispatch, email) {
      return Object(_util_Request__WEBPACK_IMPORTED_MODULE_2__["fetchMutation"])(_query_NewsletterSubscription_query__WEBPACK_IMPORTED_MODULE_0__["default"].getSubscribeToNewsletterMutation(email)).then(
      /** @namespace Store/NewsletterSubscription/Dispatcher/fetchMutationThen */
      middleware(function () {
        dispatch(Object(_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_1__["showNotification"])('success', __('You’ve successfully subscribed to our newsletter')));
      }, "Store/NewsletterSubscription/Dispatcher/fetchMutationThen"),
      /** @namespace Store/NewsletterSubscription/Dispatcher/fetchMutationSuccess */
      middleware(function (error) {
        return dispatch(Object(_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_1__["showNotification"])('error', error[0].message));
      }, "Store/NewsletterSubscription/Dispatcher/fetchMutationSuccess"));
    }
  }]);

  return _NewsletterSubscriptionDispatcher;
}(Extensible());
Object.defineProperty(_NewsletterSubscriptionDispatcher, 'name', {
  value: 'NewsletterSubscriptionDispatcher'
});

var NewsletterSubscriptionDispatcher = middleware(_NewsletterSubscriptionDispatcher, "Store/NewsletterSubscription/Dispatcher");
/* harmony default export */ __webpack_exports__["default"] = (new NewsletterSubscriptionDispatcher());
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js")))

/***/ }),

/***/ "./src/app/store/NoMatch/NoMatch.dispatcher.js":
/*!*****************************************************!*\
  !*** ./src/app/store/NoMatch/NoMatch.dispatcher.js ***!
  \*****************************************************/
/*! exports provided: _NoMatchDispatcher, NoMatchDispatcher, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_NoMatchDispatcher", function() { return _NoMatchDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoMatchDispatcher", function() { return NoMatchDispatcher; });
/* harmony import */ var _NoMatch_action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NoMatch.action */ "./src/app/store/NoMatch/NoMatch.action.js");
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
 * NoMatch Dispatcher
 * @class NoMatchDispatcher
 * @namespace Store/NoMatch/Dispatcher
 */

var _NoMatchDispatcher =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_NoMatchDispatcher, _Extensible);

  function _NoMatchDispatcher() {
    _classCallCheck(this, _NoMatchDispatcher);

    return _possibleConstructorReturn(this, _getPrototypeOf(_NoMatchDispatcher).apply(this, arguments));
  }

  _createClass(_NoMatchDispatcher, [{
    key: "updateNoMatch",
    value: function updateNoMatch(dispatch, options) {
      var noMatch = options.noMatch;
      dispatch(Object(_NoMatch_action__WEBPACK_IMPORTED_MODULE_0__["updateNoMatch"])(noMatch));
    }
  }]);

  return _NoMatchDispatcher;
}(Extensible());
Object.defineProperty(_NoMatchDispatcher, 'name', {
  value: 'NoMatchDispatcher'
});

var NoMatchDispatcher = middleware(_NoMatchDispatcher, "Store/NoMatch/Dispatcher");
/* harmony default export */ __webpack_exports__["default"] = (new NoMatchDispatcher());
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/store/Order/Order.dispatcher.js":
/*!*************************************************!*\
  !*** ./src/app/store/Order/Order.dispatcher.js ***!
  \*************************************************/
/*! exports provided: _OrderDispatcher, OrderDispatcher, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_OrderDispatcher", function() { return _OrderDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderDispatcher", function() { return OrderDispatcher; });
/* harmony import */ var _query_Order_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../query/Order.query */ "./src/app/query/Order.query.js");
/* harmony import */ var _Notification_Notification_action__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Notification/Notification.action */ "./src/app/store/Notification/Notification.action.js");
/* harmony import */ var _Order_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Order.action */ "./src/app/store/Order/Order.action.js");
/* harmony import */ var _util_Request__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/Request */ "./src/app/util/Request/index.js");
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




/** @namespace Store/Order/Dispatcher */

var _OrderDispatcher =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_OrderDispatcher, _Extensible);

  function _OrderDispatcher() {
    _classCallCheck(this, _OrderDispatcher);

    return _possibleConstructorReturn(this, _getPrototypeOf(_OrderDispatcher).apply(this, arguments));
  }

  _createClass(_OrderDispatcher, [{
    key: "requestOrders",
    value: function requestOrders(dispatch) {
      var query = _query_Order_query__WEBPACK_IMPORTED_MODULE_0__["default"].getOrderListQuery();
      return Object(_util_Request__WEBPACK_IMPORTED_MODULE_3__["fetchQuery"])(query).then(
      /** @namespace Store/Order/Dispatcher/requestOrdersFetchQueryThen */
      middleware(function (_ref) {
        var orders = _ref.getOrderList;
        dispatch(Object(_Order_action__WEBPACK_IMPORTED_MODULE_2__["getOrderList"])(orders, false));
      }, "Store/Order/Dispatcher/requestOrdersFetchQueryThen"),
      /** @namespace Store/Order/Dispatcher/requestOrdersFetchQueryError */
      middleware(function (error) {
        return dispatch(Object(_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_1__["showNotification"])('error', error[0].message));
      }, "Store/Order/Dispatcher/requestOrdersFetchQueryError"));
    }
  }]);

  return _OrderDispatcher;
}(Extensible());
Object.defineProperty(_OrderDispatcher, 'name', {
  value: 'OrderDispatcher'
});

var OrderDispatcher = middleware(_OrderDispatcher, "Store/Order/Dispatcher");
/* harmony default export */ __webpack_exports__["default"] = (new OrderDispatcher());
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/store/Product/Product.dispatcher.js":
/*!*****************************************************!*\
  !*** ./src/app/store/Product/Product.dispatcher.js ***!
  \*****************************************************/
/*! exports provided: LinkedProductsDispatcher, _ProductDispatcher, ProductDispatcher, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LinkedProductsDispatcher", function() { return LinkedProductsDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductDispatcher", function() { return _ProductDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductDispatcher", function() { return ProductDispatcher; });
/* harmony import */ var _query_ProductList_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../query/ProductList.query */ "./src/app/query/ProductList.query.js");
/* harmony import */ var _NoMatch_NoMatch_action__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../NoMatch/NoMatch.action */ "./src/app/store/NoMatch/NoMatch.action.js");
/* harmony import */ var _Product_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Product.action */ "./src/app/store/Product/Product.action.js");
/* harmony import */ var _util_Request__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/Request */ "./src/app/util/Request/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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




var LinkedProductsDispatcher = Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ../LinkedProducts/LinkedProducts.dispatcher */ "./src/app/store/LinkedProducts/LinkedProducts.dispatcher.js"));
/**
 * Product List Dispatcher
 * @class ProductDispatcher
 * @extends ProductDispatcher
 * @namespace Store/Product/Dispatcher
 */

var _ProductDispatcher =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductDispatcher, _Extensible);

  function _ProductDispatcher() {
    _classCallCheck(this, _ProductDispatcher);

    return _possibleConstructorReturn(this, _getPrototypeOf(_ProductDispatcher).apply(this, arguments));
  }

  _createClass(_ProductDispatcher, [{
    key: "__construct",
    value: function __construct() {
      _get(_getPrototypeOf(_ProductDispatcher.prototype), "__construct", this).call(this, 'Product');
    }
  }, {
    key: "onSuccess",
    value: function onSuccess(data, dispatch) {
      var items = data.products.items;
      /**
       * In case there are no items, or item count is
       * smaller then 0 => the product was not found.
       */

      if (!items || items.length <= 0) {
        dispatch(Object(_NoMatch_NoMatch_action__WEBPACK_IMPORTED_MODULE_1__["updateNoMatch"])(true));
        return;
      }

      var _items = _slicedToArray(items, 1),
          product = _items[0];

      var product_links = items.reduce(function (links, product) {
        var product_links = product.product_links;

        if (product_links) {
          Object.values(product_links).forEach(function (item) {
            links.push(item);
          });
        }

        return links;
      }, []);
      LinkedProductsDispatcher.then(function (_ref) {
        var dispatcher = _ref.default;

        if (product_links.length > 0) {
          dispatcher.handleData(dispatch, product_links);
        } else {
          dispatcher.clearLinkedProducts(dispatch);
        }
      });
      dispatch(Object(_Product_action__WEBPACK_IMPORTED_MODULE_2__["updateProductDetails"])(product));
    }
  }, {
    key: "onError",
    value: function onError(_, dispatch) {
      dispatch(Object(_NoMatch_NoMatch_action__WEBPACK_IMPORTED_MODULE_1__["updateNoMatch"])(true));
    }
  }, {
    key: "prepareRequest",
    value: function prepareRequest(options) {
      return _query_ProductList_query__WEBPACK_IMPORTED_MODULE_0__["default"].getQuery(options);
    }
  }]);

  return _ProductDispatcher;
}(Extensible(_util_Request__WEBPACK_IMPORTED_MODULE_3__["QueryDispatcher"]));
Object.defineProperty(_ProductDispatcher, 'name', {
  value: 'ProductDispatcher'
});

var ProductDispatcher = middleware(_ProductDispatcher, "Store/Product/Dispatcher");
/* harmony default export */ __webpack_exports__["default"] = (new ProductDispatcher());
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/store/ProductList/ProductList.dispatcher.js":
/*!*************************************************************!*\
  !*** ./src/app/store/ProductList/ProductList.dispatcher.js ***!
  \*************************************************************/
/*! exports provided: _ProductListDispatcher, ProductListDispatcher, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductListDispatcher", function() { return _ProductListDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductListDispatcher", function() { return ProductListDispatcher; });
/* harmony import */ var _query_ProductList_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../query/ProductList.query */ "./src/app/query/ProductList.query.js");
/* harmony import */ var _NoMatch_NoMatch_action__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../NoMatch/NoMatch.action */ "./src/app/store/NoMatch/NoMatch.action.js");
/* harmony import */ var _Notification_Notification_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Notification/Notification.action */ "./src/app/store/Notification/Notification.action.js");
/* harmony import */ var _ProductList_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ProductList.action */ "./src/app/store/ProductList/ProductList.action.js");
/* harmony import */ var _util_Request__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/Request */ "./src/app/util/Request/index.js");
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
 * Product List Dispatcher
 * @class ProductListDispatcher
 * @extends QueryDispatcher
 * @namespace Store/ProductList/Dispatcher
 */

var _ProductListDispatcher =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductListDispatcher, _Extensible);

  function _ProductListDispatcher() {
    _classCallCheck(this, _ProductListDispatcher);

    return _possibleConstructorReturn(this, _getPrototypeOf(_ProductListDispatcher).apply(this, arguments));
  }

  _createClass(_ProductListDispatcher, [{
    key: "__construct",
    value: function __construct() {
      _get(_getPrototypeOf(_ProductListDispatcher.prototype), "__construct", this).call(this, 'ProductList');
    }
  }, {
    key: "onSuccess",
    value: function onSuccess(data, dispatch, options) {
      var _data$products = data.products;
      _data$products = _data$products === void 0 ? {} : _data$products;
      var items = _data$products.items,
          total_count = _data$products.total_count,
          _data$products$page_i = _data$products.page_info;
      _data$products$page_i = _data$products$page_i === void 0 ? {} : _data$products$page_i;
      var total_pages = _data$products$page_i.total_pages;
      var args = options.args,
          isNext = options.isNext;
      var currentPage = args.currentPage;

      if (isNext) {
        return dispatch(Object(_ProductList_action__WEBPACK_IMPORTED_MODULE_3__["appendPage"])(items, currentPage));
      }

      return dispatch(Object(_ProductList_action__WEBPACK_IMPORTED_MODULE_3__["updateProductListItems"])(items, currentPage, total_count, total_pages, args));
    }
  }, {
    key: "onError",
    value: function onError(error, dispatch) {
      dispatch(Object(_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_2__["showNotification"])('error', 'Error fetching Product List!', error));
      dispatch(Object(_NoMatch_NoMatch_action__WEBPACK_IMPORTED_MODULE_1__["updateNoMatch"])(true));
    }
  }, {
    key: "prepareRequest",
    value: function prepareRequest(options, dispatch) {
      var isNext = options.isNext;

      if (!isNext) {
        dispatch(Object(_ProductList_action__WEBPACK_IMPORTED_MODULE_3__["updateLoadStatus"])(true));
      } else {
        dispatch(Object(_ProductList_action__WEBPACK_IMPORTED_MODULE_3__["updatePageLoadingStatus"])());
      }

      return _query_ProductList_query__WEBPACK_IMPORTED_MODULE_0__["default"].getQuery(options);
    }
  }]);

  return _ProductListDispatcher;
}(Extensible(_util_Request__WEBPACK_IMPORTED_MODULE_4__["QueryDispatcher"]));
Object.defineProperty(_ProductListDispatcher, 'name', {
  value: 'ProductListDispatcher'
});

var ProductListDispatcher = middleware(_ProductListDispatcher, "Store/ProductList/Dispatcher");
/* harmony default export */ __webpack_exports__["default"] = (new ProductListDispatcher());
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

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

/***/ }),

/***/ "./src/app/store/SearchBar/SearchBar.dispatcher.js":
/*!*********************************************************!*\
  !*** ./src/app/store/SearchBar/SearchBar.dispatcher.js ***!
  \*********************************************************/
/*! exports provided: _SearchBarDispatcher, SearchBarDispatcher, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_SearchBarDispatcher", function() { return _SearchBarDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchBarDispatcher", function() { return SearchBarDispatcher; });
/* harmony import */ var _query_ProductList_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../query/ProductList.query */ "./src/app/query/ProductList.query.js");
/* harmony import */ var _util_Request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/Request */ "./src/app/util/Request/index.js");
/* harmony import */ var _SearchBar_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SearchBar.action */ "./src/app/store/SearchBar/SearchBar.action.js");
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
 * Search Bar Dispatcher
 * @class SearchBarDispatcher
 * @extends QueryDispatcher
 * @namespace Store/SearchBar/Dispatcher
 */

var _SearchBarDispatcher =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_SearchBarDispatcher, _Extensible);

  function _SearchBarDispatcher() {
    _classCallCheck(this, _SearchBarDispatcher);

    return _possibleConstructorReturn(this, _getPrototypeOf(_SearchBarDispatcher).apply(this, arguments));
  }

  _createClass(_SearchBarDispatcher, [{
    key: "__construct",
    value: function __construct() {
      _get(_getPrototypeOf(_SearchBarDispatcher.prototype), "__construct", this).call(this, 'SearchBar');
    }
  }, {
    key: "onSuccess",
    value: function onSuccess(data, dispatch) {
      dispatch(Object(_SearchBar_action__WEBPACK_IMPORTED_MODULE_2__["updateLoadStatus"])(false));
      dispatch(Object(_SearchBar_action__WEBPACK_IMPORTED_MODULE_2__["updateSearchBar"])(data));
    }
  }, {
    key: "onError",
    value: function onError(_, dispatch) {
      dispatch(Object(_SearchBar_action__WEBPACK_IMPORTED_MODULE_2__["updateLoadStatus"])(false));
    }
  }, {
    key: "clearSearchResults",
    value: function clearSearchResults(dispatch) {
      dispatch(Object(_SearchBar_action__WEBPACK_IMPORTED_MODULE_2__["clearSearchResults"])());
    }
  }, {
    key: "prepareRequest",
    value: function prepareRequest(options, dispatch) {
      dispatch(Object(_SearchBar_action__WEBPACK_IMPORTED_MODULE_2__["updateLoadStatus"])(true));
      return _query_ProductList_query__WEBPACK_IMPORTED_MODULE_0__["default"].getQuery(_objectSpread2(_objectSpread2({}, options), {}, {
        notRequireInfo: true
      }));
    }
  }]);

  return _SearchBarDispatcher;
}(Extensible(_util_Request__WEBPACK_IMPORTED_MODULE_1__["QueryDispatcher"]));
Object.defineProperty(_SearchBarDispatcher, 'name', {
  value: 'SearchBarDispatcher'
});

var SearchBarDispatcher = middleware(_SearchBarDispatcher, "Store/SearchBar/Dispatcher");
/* harmony default export */ __webpack_exports__["default"] = (new SearchBarDispatcher());
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/store/UrlRewrites/UrlRewrites.dispatcher.js":
/*!*************************************************************!*\
  !*** ./src/app/store/UrlRewrites/UrlRewrites.dispatcher.js ***!
  \*************************************************************/
/*! exports provided: _UrlRewritesDispatcher, UrlRewritesDispatcher, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_UrlRewritesDispatcher", function() { return _UrlRewritesDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UrlRewritesDispatcher", function() { return UrlRewritesDispatcher; });
/* harmony import */ var _query_UrlRewrites_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../query/UrlRewrites.query */ "./src/app/query/UrlRewrites.query.js");
/* harmony import */ var _Notification_Notification_action__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Notification/Notification.action */ "./src/app/store/Notification/Notification.action.js");
/* harmony import */ var _UrlRewrites_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UrlRewrites.action */ "./src/app/store/UrlRewrites/UrlRewrites.action.js");
/* harmony import */ var _util_Request__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/Request */ "./src/app/util/Request/index.js");
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
 * Url Rewrite Dispathcer
 * @class UrlRewritesDispatcher
 * @extends RequestDispatcher
 * @namespace Store/UrlRewrites/Dispatcher
 */

var _UrlRewritesDispatcher =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_UrlRewritesDispatcher, _Extensible);

  function _UrlRewritesDispatcher() {
    _classCallCheck(this, _UrlRewritesDispatcher);

    return _possibleConstructorReturn(this, _getPrototypeOf(_UrlRewritesDispatcher).apply(this, arguments));
  }

  _createClass(_UrlRewritesDispatcher, [{
    key: "__construct",
    value: function __construct() {
      _get(_getPrototypeOf(_UrlRewritesDispatcher.prototype), "__construct", this).call(this, 'UrlRewrites');
    }
  }, {
    key: "onSuccess",
    value: function onSuccess(_ref, dispatch, _ref2) {
      var urlResolver = _ref.urlResolver;
      var urlParam = _ref2.urlParam;
      dispatch(Object(_UrlRewrites_action__WEBPACK_IMPORTED_MODULE_2__["updateUrlRewrite"])(urlResolver || {
        notFound: true
      }, urlParam));
    }
  }, {
    key: "onError",
    value: function onError(error, dispatch) {
      dispatch(Object(_UrlRewrites_action__WEBPACK_IMPORTED_MODULE_2__["setIsUrlRewritesLoading"])(false));
      dispatch(Object(_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_1__["showNotification"])('error', 'Error fetching URL-rewrites!', error));
    }
    /**
     * Prepare UrlRewrite requests
     * @param {Object} options A object containing different aspects of query, each item can be omitted
     * @return {Query} UrlRewrite query
     * @memberof UrlRewritesDispatcher
     */

  }, {
    key: "prepareRequest",
    value: function prepareRequest(options, dispatch) {
      dispatch(Object(_UrlRewrites_action__WEBPACK_IMPORTED_MODULE_2__["setIsUrlRewritesLoading"])(true));
      return [_query_UrlRewrites_query__WEBPACK_IMPORTED_MODULE_0__["default"].getQuery(this.processUrlOptions(options))];
    }
  }, {
    key: "processUrlOptions",
    value: function processUrlOptions(options) {
      var urlParam = options.urlParam; // FAILSAFE: Trim index.php if someone forgot to set "Use Web Server Rewrites" to "Yes"

      var trimmedParam = urlParam.replace('index.php/', '');
      return _objectSpread2(_objectSpread2({}, options), {}, {
        urlParam: trimmedParam.replace(new RegExp(window.storeRegexText), '')
      });
    }
  }]);

  return _UrlRewritesDispatcher;
}(Extensible(_util_Request__WEBPACK_IMPORTED_MODULE_3__["QueryDispatcher"]));
Object.defineProperty(_UrlRewritesDispatcher, 'name', {
  value: 'UrlRewritesDispatcher'
});

var UrlRewritesDispatcher = middleware(_UrlRewritesDispatcher, "Store/UrlRewrites/Dispatcher");
/* harmony default export */ __webpack_exports__["default"] = (new UrlRewritesDispatcher());
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/store/Wishlist/Wishlist.dispatcher.js":
/*!*******************************************************!*\
  !*** ./src/app/store/Wishlist/Wishlist.dispatcher.js ***!
  \*******************************************************/
/*! exports provided: CartDispatcher, _WishlistDispatcher, WishlistDispatcher, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, middleware, __) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartDispatcher", function() { return CartDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_WishlistDispatcher", function() { return _WishlistDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WishlistDispatcher", function() { return WishlistDispatcher; });
/* harmony import */ var _query_Wishlist_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../query/Wishlist.query */ "./src/app/query/Wishlist.query.js");
/* harmony import */ var _Notification_Notification_action__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Notification/Notification.action */ "./src/app/store/Notification/Notification.action.js");
/* harmony import */ var _Wishlist_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Wishlist.action */ "./src/app/store/Wishlist/Wishlist.action.js");
/* harmony import */ var _util_Auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/Auth */ "./src/app/util/Auth/index.js");
/* harmony import */ var _util_Request__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/Request */ "./src/app/util/Request/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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





var CartDispatcher = Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ../Cart/Cart.dispatcher */ "./src/app/store/Cart/Cart.dispatcher.js"));
/**
 * Product Wishlist Dispatcher
 * @class WishlistDispatcher
 * @namespace Store/Wishlist/Dispatcher
 */

var _WishlistDispatcher =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_WishlistDispatcher, _Extensible);

  function _WishlistDispatcher() {
    _classCallCheck(this, _WishlistDispatcher);

    return _possibleConstructorReturn(this, _getPrototypeOf(_WishlistDispatcher).apply(this, arguments));
  }

  _createClass(_WishlistDispatcher, [{
    key: "updateInitialWishlistData",
    value: function updateInitialWishlistData(dispatch) {
      if (Object(_util_Auth__WEBPACK_IMPORTED_MODULE_3__["isSignedIn"])()) {
        this._syncWishlistWithBE(dispatch);
      } else {
        dispatch(Object(_Wishlist_action__WEBPACK_IMPORTED_MODULE_2__["updateAllProductsInWishlist"])({}));
      }
    }
  }, {
    key: "_syncWishlistWithBE",
    value: function _syncWishlistWithBE(dispatch) {
      // Need to get current wishlist from BE, update wishlist
      return Object(_util_Request__WEBPACK_IMPORTED_MODULE_4__["fetchQuery"])(_query_Wishlist_query__WEBPACK_IMPORTED_MODULE_0__["default"].getWishlistQuery()).then(
      /** @namespace Store/Wishlist/Dispatcher/_syncWishlistWithBEFetchQueryThen */
      middleware(function (data) {
        if (data && data.wishlist && data.wishlist.items_count) {
          var wishlist = data.wishlist;
          var productsToAdd = wishlist.items.reduce(function (prev, wishlistItem) {
            var id = wishlistItem.id,
                sku = wishlistItem.sku,
                product = wishlistItem.product,
                description = wishlistItem.description,
                quantity = wishlistItem.qty;
            return _objectSpread2(_objectSpread2({}, prev), {}, _defineProperty({}, id, _objectSpread2(_objectSpread2({}, product), {}, {
              quantity: quantity,
              wishlist: {
                id: id,
                sku: sku,
                quantity: quantity,
                description: description
              }
            })));
          }, {});
          dispatch(Object(_Wishlist_action__WEBPACK_IMPORTED_MODULE_2__["updateAllProductsInWishlist"])(productsToAdd));
        } else {
          dispatch(Object(_Wishlist_action__WEBPACK_IMPORTED_MODULE_2__["updateIsLoading"])(false));
        }
      }, "Store/Wishlist/Dispatcher/_syncWishlistWithBEFetchQueryThen"),
      /** @namespace Store/Wishlist/Dispatcher/_syncWishlistWithBEFetchQueryError */
      middleware(function (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        dispatch(Object(_Wishlist_action__WEBPACK_IMPORTED_MODULE_2__["updateIsLoading"])(false));
      }, "Store/Wishlist/Dispatcher/_syncWishlistWithBEFetchQueryError"));
    }
  }, {
    key: "addItemToWishlist",
    value: function addItemToWishlist(dispatch, wishlistItem) {
      var _this = this;

      dispatch(Object(_Wishlist_action__WEBPACK_IMPORTED_MODULE_2__["updateIsLoading"])(true));
      dispatch(Object(_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_1__["showNotification"])('success', __('Product added to wish-list!')));
      return Object(_util_Request__WEBPACK_IMPORTED_MODULE_4__["fetchMutation"])(_query_Wishlist_query__WEBPACK_IMPORTED_MODULE_0__["default"].getSaveWishlistItemMutation(wishlistItem)).then(
      /** @namespace Store/Wishlist/Dispatcher/addItemToWishlistFetchMutationThen */
      middleware(function () {
        return _this._syncWishlistWithBE(dispatch);
      }, "Store/Wishlist/Dispatcher/addItemToWishlistFetchMutationThen"),
      /** @namespace Store/Wishlist/Dispatcher/addItemToWishlistFetchMutationError */
      middleware(function (error) {
        dispatch(Object(_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_1__["showNotification"])('error', __('Error updating wish list!'))); // eslint-disable-next-line no-console

        console.log(error);
      }, "Store/Wishlist/Dispatcher/addItemToWishlistFetchMutationError"));
    }
  }, {
    key: "updateWishlistItem",
    value: function updateWishlistItem(dispatch, options) {
      return Object(_util_Request__WEBPACK_IMPORTED_MODULE_4__["fetchMutation"])(_query_Wishlist_query__WEBPACK_IMPORTED_MODULE_0__["default"].getSaveWishlistItemMutation(options)).then(
      /** @namespace Store/Wishlist/Dispatcher/updateWishlistItemFetchMutationThen */
      middleware(function () {
        return dispatch(Object(_Wishlist_action__WEBPACK_IMPORTED_MODULE_2__["updateItemOptions"])(options));
      }, "Store/Wishlist/Dispatcher/updateWishlistItemFetchMutationThen"));
    }
  }, {
    key: "clearWishlist",
    value: function clearWishlist(dispatch) {
      return Object(_util_Request__WEBPACK_IMPORTED_MODULE_4__["fetchMutation"])(_query_Wishlist_query__WEBPACK_IMPORTED_MODULE_0__["default"].getClearWishlist()).then(
      /** @namespace Store/Wishlist/Dispatcher/clearWishlistFetchMutationThen */
      middleware(function () {
        return dispatch(Object(_Wishlist_action__WEBPACK_IMPORTED_MODULE_2__["clearWishlist"])());
      }, "Store/Wishlist/Dispatcher/clearWishlistFetchMutationThen")).catch(
      /** @namespace Store/Wishlist/Dispatcher/clearWishlistFetchMutationThenCatch */
      middleware(function () {
        return dispatch(Object(_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_1__["showNotification"])('error', __('Error clearing wish list!')));
      }, "Store/Wishlist/Dispatcher/clearWishlistFetchMutationThenCatch"));
    }
  }, {
    key: "moveWishlistToCart",
    value: function moveWishlistToCart(dispatch, sharingCode) {
      return Object(_util_Request__WEBPACK_IMPORTED_MODULE_4__["fetchMutation"])(_query_Wishlist_query__WEBPACK_IMPORTED_MODULE_0__["default"].getMoveWishlistToCart(sharingCode)).then(
      /** @namespace Store/Wishlist/Dispatcher/moveWishlistToCartFetchMutationThen */
      middleware(function () {
        dispatch(Object(_Wishlist_action__WEBPACK_IMPORTED_MODULE_2__["clearWishlist"])());
        CartDispatcher.then(function (_ref) {
          var dispatcher = _ref.default;
          return dispatcher._syncCartWithBE(dispatch);
        });
      }, "Store/Wishlist/Dispatcher/moveWishlistToCartFetchMutationThen"));
    }
  }, {
    key: "removeItemFromWishlist",
    value: function removeItemFromWishlist(dispatch, _ref2) {
      var item_id = _ref2.item_id,
          noMessages = _ref2.noMessages;

      if (!item_id) {
        return null;
      }

      dispatch(Object(_Wishlist_action__WEBPACK_IMPORTED_MODULE_2__["updateIsLoading"])(true));

      if (noMessages) {
        return Object(_util_Request__WEBPACK_IMPORTED_MODULE_4__["fetchMutation"])(_query_Wishlist_query__WEBPACK_IMPORTED_MODULE_0__["default"].getRemoveProductFromWishlistMutation(item_id)).then(
        /** @namespace Store/Wishlist/Dispatcher/removeItemFromWishlistNoMessagesFetchMutationThen */
        middleware(function () {
          return dispatch(Object(_Wishlist_action__WEBPACK_IMPORTED_MODULE_2__["removeItemFromWishlist"])(item_id));
        }, "Store/Wishlist/Dispatcher/removeItemFromWishlistNoMessagesFetchMutationThen"));
      }

      dispatch(Object(_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_1__["showNotification"])('info', __('Product has been removed from your Wish List!')));
      return Object(_util_Request__WEBPACK_IMPORTED_MODULE_4__["fetchMutation"])(_query_Wishlist_query__WEBPACK_IMPORTED_MODULE_0__["default"].getRemoveProductFromWishlistMutation(item_id)).then(
      /** @namespace Store/Wishlist/Dispatcher/removeItemFromWishlistFetchMutationThen */
      middleware(function () {
        return dispatch(Object(_Wishlist_action__WEBPACK_IMPORTED_MODULE_2__["removeItemFromWishlist"])(item_id));
      }, "Store/Wishlist/Dispatcher/removeItemFromWishlistFetchMutationThen"),
      /** @namespace Store/Wishlist/Dispatcher/removeItemFromWishlistFetchMutationError */
      middleware(function (error) {
        dispatch(Object(_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_1__["showNotification"])('error', __('Error updating wish list!'))); // eslint-disable-next-line no-console

        console.log(error);
      }, "Store/Wishlist/Dispatcher/removeItemFromWishlistFetchMutationError"));
    } // TODO: Need to make it in one request

  }, {
    key: "removeItemsFromWishlist",
    value: function removeItemsFromWishlist(dispatch, itemIdMap) {
      if (!itemIdMap.length) {
        return null;
      }

      return itemIdMap.map(function (id) {
        return Object(_util_Request__WEBPACK_IMPORTED_MODULE_4__["fetchMutation"])(_query_Wishlist_query__WEBPACK_IMPORTED_MODULE_0__["default"].getRemoveProductFromWishlistMutation(id)).then(
        /** @namespace Store/Wishlist/Dispatcher/removeItemsFromWishlistNoMessagesFetchMutationThen */
        middleware(function () {
          dispatch(Object(_Wishlist_action__WEBPACK_IMPORTED_MODULE_2__["removeItemFromWishlist"])(id));
          dispatch(Object(_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_1__["showNotification"])('info', __('Product has been removed from your Wish List!')));
        }, "Store/Wishlist/Dispatcher/removeItemsFromWishlistNoMessagesFetchMutationThen"),
        /** @namespace Store/Wishlist/Dispatcher/removeItemsFromWishlistFetchMutationError */
        middleware(function (error) {
          var _error = _slicedToArray(error, 1),
              message = _error[0];

          dispatch(Object(_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_1__["showNotification"])('error', message || __('Error updating wishlist!'))); // eslint-disable-next-line no-console

          console.log(error);
        }, "Store/Wishlist/Dispatcher/removeItemsFromWishlistFetchMutationError"));
      });
    }
  }]);

  return _WishlistDispatcher;
}(Extensible());
Object.defineProperty(_WishlistDispatcher, 'name', {
  value: 'WishlistDispatcher'
});

var WishlistDispatcher = middleware(_WishlistDispatcher, "Store/Wishlist/Dispatcher");
/* harmony default export */ __webpack_exports__["default"] = (new WishlistDispatcher());
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js")))

/***/ })

}]);
//# sourceMappingURL=dispatchers.js.map