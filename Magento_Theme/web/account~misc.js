(this["webpackJsonp"] = this["webpackJsonp"] || []).push([["account~misc"],{

/***/ "./src/app/component/MyAccountMyWishlist/MyAccountMyWishlist.component.js":
/*!********************************************************************************!*\
  !*** ./src/app/component/MyAccountMyWishlist/MyAccountMyWishlist.component.js ***!
  \********************************************************************************/
/*! exports provided: _MyAccountMyWishlist, MyAccountMyWishlist, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MyAccountMyWishlist", function() { return _MyAccountMyWishlist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountMyWishlist", function() { return MyAccountMyWishlist; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Loader */ "./src/app/component/Loader/index.js");
/* harmony import */ var _ProductCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ProductCard */ "./src/app/component/ProductCard/index.js");
/* harmony import */ var _ShareWishlistPopup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ShareWishlistPopup */ "./src/app/component/ShareWishlistPopup/index.js");
/* harmony import */ var _WishlistItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../WishlistItem */ "./src/app/component/WishlistItem/index.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _util_CSS__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../util/CSS */ "./src/app/util/CSS/index.js");
/* harmony import */ var _MyAccountMyWishlist_style__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./MyAccountMyWishlist.style */ "./src/app/component/MyAccountMyWishlist/MyAccountMyWishlist.style.scss");
/* harmony import */ var _MyAccountMyWishlist_style__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_MyAccountMyWishlist_style__WEBPACK_IMPORTED_MODULE_8__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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









/** @namespace Component/MyAccountMyWishlist/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MyAccountMyWishlist =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MyAccountMyWishlist, _Extensible);

  function _MyAccountMyWishlist() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _MyAccountMyWishlist);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_MyAccountMyWishlist)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      selectedIdMap: []
    });

    _defineProperty(_assertThisInitialized(_this), "actionLineMobileRef",
    /*#__PURE__*/
    Object(react__WEBPACK_IMPORTED_MODULE_1__["createRef"])());

    _defineProperty(_assertThisInitialized(_this), "productsRef",
    /*#__PURE__*/
    Object(react__WEBPACK_IMPORTED_MODULE_1__["createRef"])());

    _defineProperty(_assertThisInitialized(_this), "handleSelectIdChange", function (id) {
      var prevSelectedIdMap = _this.state.selectedIdMap;
      var selectIdIndex = prevSelectedIdMap.findIndex(function (selectId) {
        return selectId === id;
      });
      var selectedIdMap = Array.from(prevSelectedIdMap);

      if (selectIdIndex === -1) {
        selectedIdMap.push(id);
      } else {
        selectedIdMap.splice(selectIdIndex, 1);
      }

      _this.setState({
        selectedIdMap: selectedIdMap
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleRemoveButtonClick", function () {
      // Removes selected items from wishlist
      var removeSelectedFromWishlist = _this.props.removeSelectedFromWishlist;
      var selectedIdMap = _this.state.selectedIdMap;
      removeSelectedFromWishlist(selectedIdMap);

      _this.setState({
        selectedIdMap: []
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderNoProductsFound", function () {
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", null,
        /*#__PURE__*/
        _checkBEM(React, "p", null, __('Wishlist is empty!')))
      );
    });

    _defineProperty(_assertThisInitialized(_this), "renderProduct", function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          id = _ref2[0],
          product = _ref2[1];

      var isEditingActive = _this.props.isEditingActive;
      return (
        /*#__PURE__*/
        _checkBEM(React, _WishlistItem__WEBPACK_IMPORTED_MODULE_5__["default"], {
          key: id,
          product: product,
          isEditingActive: isEditingActive,
          handleSelectIdChange: _this.handleSelectIdChange
        })
      );
    });

    return _this;
  }

  _createClass(_MyAccountMyWishlist, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setActionLineHeight();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var prevIsEditingActive = prevProps.isEditingActive,
          prevIsMobile = prevProps.isMobile;
      var _this$props = this.props,
          isEditingActive = _this$props.isEditingActive,
          isMobile = _this$props.isMobile;
      var prevActionLineHeight = this.state.actionLineHeight;
      var actionLineHeight = this.state.actionLineHeight;

      if (prevIsEditingActive !== isEditingActive && prevActionLineHeight === actionLineHeight || isMobile !== prevIsMobile) {
        this.setActionLineHeight();
      }
    }
  }, {
    key: "setActionLineHeight",
    value: function setActionLineHeight() {
      var isMobile = this.props.isMobile;
      var current = this.actionLineMobileRef.current;

      if (!current) {
        return;
      }

      _util_CSS__WEBPACK_IMPORTED_MODULE_7__["default"].setVariable(this.productsRef, 'myaccount-wihslist-products-margin-bottom', isMobile ? "".concat(current.clientHeight, "px") : 0);
    }
  }, {
    key: "renderProducts",
    value: function renderProducts() {
      var _this$props2 = this.props,
          isWishlistLoading = _this$props2.isWishlistLoading,
          isWishlistEmpty = _this$props2.isWishlistEmpty,
          wishlistItems = _this$props2.wishlistItems;

      if (isWishlistLoading && isWishlistEmpty) {
        return this.renderPlaceholders();
      }

      return Object.entries(wishlistItems).map(this.renderProduct);
    }
  }, {
    key: "renderClearWishlist",
    value: function renderClearWishlist() {
      var _this$props3 = this.props,
          removeAll = _this$props3.removeAll,
          isActionsDisabled = _this$props3.isActionsDisabled;
      return (
        /*#__PURE__*/
        _checkBEM(React, "button", {
          block: "Button",
          mods: {
            likeLink: true
          },
          mix: {
            block: 'MyAccountMyWishlist',
            elem: 'ClearWishlistButton'
          },
          onClick: removeAll,
          disabled: isActionsDisabled
        }, __('Clear Wishlist'))
      );
    }
  }, {
    key: "renderAddAllToCart",
    value: function renderAddAllToCart() {
      var _this$props4 = this.props,
          addAllToCart = _this$props4.addAllToCart,
          isActionsDisabled = _this$props4.isActionsDisabled,
          isEditingActive = _this$props4.isEditingActive,
          isMobile = _this$props4.isMobile;
      var isDisabled = isMobile && isEditingActive || isActionsDisabled;
      return (
        /*#__PURE__*/
        _checkBEM(React, "button", {
          block: "Button",
          mix: {
            block: 'MyAccountMyWishlist',
            elem: 'Button'
          },
          onClick: addAllToCart,
          disabled: isDisabled
        }, __('Add All to Cart'))
      );
    }
  }, {
    key: "renderShareWishlistButton",
    value: function renderShareWishlistButton() {
      var _this$props5 = this.props,
          isWishlistLoading = _this$props5.isWishlistLoading,
          shareWishlist = _this$props5.shareWishlist,
          isWishlistEmpty = _this$props5.isWishlistEmpty;
      var disabled = isWishlistLoading || isWishlistEmpty;
      return (
        /*#__PURE__*/
        _checkBEM(React, "button", {
          mix: {
            block: 'MyAccountMyWishlist',
            elem: 'ShareWishlistButton'
          },
          onClick: shareWishlist,
          disabled: disabled,
          "aria-label": "Share"
        })
      );
    }
  }, {
    key: "renderRemoveItemsButton",
    value: function renderRemoveItemsButton() {
      var _this$props6 = this.props,
          isActionsDisabled = _this$props6.isActionsDisabled,
          isMobile = _this$props6.isMobile;
      var selectedIdMap = this.state.selectedIdMap;
      var isDisabled = isActionsDisabled || isMobile && !selectedIdMap.length;
      return (
        /*#__PURE__*/
        _checkBEM(React, "button", {
          block: "Button",
          mods: {
            likeLink: true
          },
          mix: {
            block: 'MyAccountMyWishlist',
            elem: 'ClearRemoveItemsButton'
          },
          onClick: this.handleRemoveButtonClick,
          disabled: isDisabled
        }, selectedIdMap.length === 1 ? __('Remove item (%s)', 1) : __('Remove items (%s)', selectedIdMap.length))
      );
    }
  }, {
    key: "renderActionBarAction",
    value: function renderActionBarAction() {
      var isEditingActive = this.props.isEditingActive;

      if (!isEditingActive) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "MyAccountMyWishlist",
          elem: "ActionBarActionWrapper"
        }, this.renderRemoveItemsButton(), this.renderClearWishlist())
      );
    }
  }, {
    key: "renderActionBarMobile",
    value: function renderActionBarMobile() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          ref: this.actionLineMobileRef,
          block: "MyAccountMyWishlist",
          elem: "ActionBar"
        }, this.renderActionBarAction(), this.renderAddAllToCart())
      );
    }
  }, {
    key: "renderActionBar",
    value: function renderActionBar() {
      var isMobile = this.props.isMobile;

      if (isMobile) {
        return this.renderActionBarMobile();
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "MyAccountMyWishlist",
          elem: "ActionBar"
        }, this.renderClearWishlist(), this.renderShareWishlistButton(), this.renderAddAllToCart())
      );
    }
  }, {
    key: "renderPlaceholders",
    value: function renderPlaceholders() {
      return Array.from({
        length: 2
      }, function (_, i) {
        return (
          /*#__PURE__*/
          _checkBEM(React, _ProductCard__WEBPACK_IMPORTED_MODULE_3__["default"], {
            key: i
          })
        );
      });
    }
  }, {
    key: "renderShareWishlist",
    value: function renderShareWishlist() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _ShareWishlistPopup__WEBPACK_IMPORTED_MODULE_4__["default"], null)
      );
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this$props7 = this.props,
          isWishlistLoading = _this$props7.isWishlistLoading,
          isWishlistEmpty = _this$props7.isWishlistEmpty,
          isLoading = _this$props7.isLoading;

      if (isWishlistEmpty && !isWishlistLoading) {
        return this.renderNoProductsFound();
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "MyAccountMyWishlist",
          elem: "Products",
          ref: this.productsRef
        },
        /*#__PURE__*/
        _checkBEM(React, _Loader__WEBPACK_IMPORTED_MODULE_2__["default"], {
          isLoading: isLoading
        }), this.renderProducts())
      );
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "MyAccountMyWishlist"
        }, this.renderShareWishlist(), this.renderContent(), this.renderActionBar())
      );
    }
  }]);

  return _MyAccountMyWishlist;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_MyAccountMyWishlist, 'name', {
  value: 'MyAccountMyWishlist'
});

var MyAccountMyWishlist = middleware(_MyAccountMyWishlist, "Component/MyAccountMyWishlist/Component");

_defineProperty(MyAccountMyWishlist, "propTypes", {
  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  isWishlistLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  removeAll: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  addAllToCart: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  shareWishlist: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  isWishlistEmpty: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  wishlistItems: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.objectOf(_type_ProductList__WEBPACK_IMPORTED_MODULE_6__["ProductType"]).isRequired,
  isActionsDisabled: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  isEditingActive: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  isMobile: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  removeSelectedFromWishlist: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (MyAccountMyWishlist);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/MyAccountMyWishlist/MyAccountMyWishlist.container.js":
/*!********************************************************************************!*\
  !*** ./src/app/component/MyAccountMyWishlist/MyAccountMyWishlist.container.js ***!
  \********************************************************************************/
/*! exports provided: WishlistDispatcher, mapStateToProps, mapDispatchToProps, _MyAccountMyWishlistContainer, MyAccountMyWishlistContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, __, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WishlistDispatcher", function() { return WishlistDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MyAccountMyWishlistContainer", function() { return _MyAccountMyWishlistContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountMyWishlistContainer", function() { return MyAccountMyWishlistContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _ShareWishlistPopup_ShareWishlistPopup_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ShareWishlistPopup/ShareWishlistPopup.config */ "./src/app/component/ShareWishlistPopup/ShareWishlistPopup.config.js");
/* harmony import */ var _store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/Notification/Notification.action */ "./src/app/store/Notification/Notification.action.js");
/* harmony import */ var _store_Popup_Popup_action__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store/Popup/Popup.action */ "./src/app/store/Popup/Popup.action.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _MyAccountMyWishlist_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./MyAccountMyWishlist.component */ "./src/app/component/MyAccountMyWishlist/MyAccountMyWishlist.component.js");
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








var WishlistDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/Wishlist/Wishlist.dispatcher */ "./src/app/store/Wishlist/Wishlist.dispatcher.js"));
/** @namespace Component/MyAccountMyWishlist/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    wishlistItems: state.WishlistReducer.productsInWishlist,
    isWishlistLoading: state.WishlistReducer.isLoading,
    isMobile: state.ConfigReducer.device.isMobile
  };
}, "Component/MyAccountMyWishlist/Container/mapStateToProps");
/** @namespace Component/MyAccountMyWishlist/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    clearWishlist: function clearWishlist() {
      return WishlistDispatcher.then(function (_ref) {
        var dispatcher = _ref.default;
        return dispatcher.clearWishlist(dispatch);
      });
    },
    moveWishlistToCart: function moveWishlistToCart() {
      return WishlistDispatcher.then(function (_ref2) {
        var dispatcher = _ref2.default;
        return dispatcher.moveWishlistToCart(dispatch);
      });
    },
    showPopup: function showPopup(payload) {
      return dispatch(Object(_store_Popup_Popup_action__WEBPACK_IMPORTED_MODULE_5__["showPopup"])(_ShareWishlistPopup_ShareWishlistPopup_config__WEBPACK_IMPORTED_MODULE_3__["SHARE_WISHLIST_POPUP_ID"], payload));
    },
    showNotification: function showNotification(message) {
      return dispatch(Object(_store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_4__["showNotification"])('success', message));
    },
    removeSelectedFromWishlist: function removeSelectedFromWishlist(options) {
      return WishlistDispatcher.then(function (_ref3) {
        var dispatcher = _ref3.default;
        return dispatcher.removeItemsFromWishlist(dispatch, options);
      });
    }
  };
}, "Component/MyAccountMyWishlist/Container/mapDispatchToProps");
/** @namespace Component/MyAccountMyWishlist/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _MyAccountMyWishlistContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_MyAccountMyWishlistContainer, _Extensible);

  function _MyAccountMyWishlistContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _MyAccountMyWishlistContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_MyAccountMyWishlistContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isLoading: false
    });

    _defineProperty(_assertThisInitialized(_this), "containerProps", function () {
      var isLoading = _this.state.isLoading;
      var isWishlistLoading = _this.props.isWishlistLoading;

      var isWishlistEmpty = _this._getIsWishlistEmpty();

      return {
        isWishlistEmpty: isWishlistEmpty,
        isLoading: isLoading,
        isActionsDisabled: isWishlistLoading || isWishlistEmpty
      };
    });

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", function () {
      return {
        removeAll: _this.removeAll,
        addAllToCart: _this.addAllToCart,
        shareWishlist: _this.shareWishlist,
        removeSelectedFromWishlist: _this.removeSelectedFromWishlist
      };
    });

    _defineProperty(_assertThisInitialized(_this), "addAllToCart", function () {
      var moveWishlistToCart = _this.props.moveWishlistToCart;

      _this.setState({
        isLoading: true
      });

      return moveWishlistToCart().then(
      /** @namespace Component/MyAccountMyWishlist/Container/moveWishlistToCartThen */
      middleware(function () {
        return _this.showNotificationAndRemoveLoading('Wishlist moved to cart');
      }, "Component/MyAccountMyWishlist/Container/moveWishlistToCartThen"));
    });

    _defineProperty(_assertThisInitialized(_this), "removeAll", function () {
      var clearWishlist = _this.props.clearWishlist;

      _this.setState({
        isLoading: true
      });

      return clearWishlist().then(
      /** @namespace Component/MyAccountMyWishlist/Container/clearWishlistThen */
      middleware(function () {
        return _this.showNotificationAndRemoveLoading('Wishlist cleared');
      }, "Component/MyAccountMyWishlist/Container/clearWishlistThen"));
    });

    _defineProperty(_assertThisInitialized(_this), "removeSelectedFromWishlist", function (selectedIdMap) {
      var removeSelectedFromWishlist = _this.props.removeSelectedFromWishlist;
      return removeSelectedFromWishlist(selectedIdMap);
    });

    _defineProperty(_assertThisInitialized(_this), "shareWishlist", function () {
      var showPopup = _this.props.showPopup;
      showPopup({
        title: __('Share Wishlist')
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_getIsWishlistEmpty", function () {
      var wishlistItems = _this.props.wishlistItems;
      return Object.entries(wishlistItems).length <= 0;
    });

    return _this;
  }

  _createClass(_MyAccountMyWishlistContainer, [{
    key: "showNotificationAndRemoveLoading",
    value: function showNotificationAndRemoveLoading(message) {
      var showNotification = this.props.showNotification;
      this.setState({
        isLoading: false
      });
      showNotification(message);
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _MyAccountMyWishlist_component__WEBPACK_IMPORTED_MODULE_7__["default"], _extends({}, this.props, this.containerProps(), this.containerFunctions()))
      );
    }
  }]);

  return _MyAccountMyWishlistContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_MyAccountMyWishlistContainer, 'name', {
  value: 'MyAccountMyWishlistContainer'
});

var MyAccountMyWishlistContainer = middleware(_MyAccountMyWishlistContainer, "Component/MyAccountMyWishlist/Container");

_defineProperty(MyAccountMyWishlistContainer, "propTypes", {
  showPopup: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  clearWishlist: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  showNotification: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  moveWishlistToCart: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  wishlistItems: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.objectOf(_type_ProductList__WEBPACK_IMPORTED_MODULE_6__["ProductType"]).isRequired,
  isWishlistLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  removeSelectedFromWishlist: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(MyAccountMyWishlistContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/MyAccountMyWishlist/MyAccountMyWishlist.style.scss":
/*!******************************************************************************!*\
  !*** ./src/app/component/MyAccountMyWishlist/MyAccountMyWishlist.style.scss ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291336168
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ShareWishlistForm/ShareWishlistForm.component.js":
/*!****************************************************************************!*\
  !*** ./src/app/component/ShareWishlistForm/ShareWishlistForm.component.js ***!
  \****************************************************************************/
/*! exports provided: _ShareWishlistForm, ShareWishlistForm, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ShareWishlistForm", function() { return _ShareWishlistForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShareWishlistForm", function() { return ShareWishlistForm; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _FieldForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FieldForm */ "./src/app/component/FieldForm/index.js");
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


/** @namespace Component/ShareWishlistForm/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ShareWishlistForm =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ShareWishlistForm, _Extensible);

  function _ShareWishlistForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ShareWishlistForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ShareWishlistForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onFormSuccess", function (fields) {
      var onSave = _this.props.onSave;
      onSave(fields);
    });

    return _this;
  }

  _createClass(_ShareWishlistForm, [{
    key: "renderActions",
    value: function renderActions() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "button", {
          type: "submit",
          block: "Button"
        }, __('Share Wishlist'))
      );
    }
  }, {
    key: "fieldMap",
    get: function get() {
      return {
        emails: {
          label: __('Email addresses, separated by commas'),
          validation: ['notEmpty', 'emails']
        },
        message: {
          type: 'textarea',
          label: __('Message')
        }
      };
    }
  }]);

  return _ShareWishlistForm;
}(Extensible(_FieldForm__WEBPACK_IMPORTED_MODULE_1__["default"]));
Object.defineProperty(_ShareWishlistForm, 'name', {
  value: 'ShareWishlistForm'
});

var ShareWishlistForm = middleware(_ShareWishlistForm, "Component/ShareWishlistForm/Component");

_defineProperty(ShareWishlistForm, "propTypes", {
  onSave: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (ShareWishlistForm);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ShareWishlistForm/index.js":
/*!******************************************************!*\
  !*** ./src/app/component/ShareWishlistForm/index.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ShareWishlistForm_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ShareWishlistForm.component */ "./src/app/component/ShareWishlistForm/ShareWishlistForm.component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ShareWishlistForm_component__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/ShareWishlistPopup/ShareWishlistPopup.component.js":
/*!******************************************************************************!*\
  !*** ./src/app/component/ShareWishlistPopup/ShareWishlistPopup.component.js ***!
  \******************************************************************************/
/*! exports provided: _ShareWishlistPopup, ShareWishlistPopup, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ShareWishlistPopup", function() { return _ShareWishlistPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShareWishlistPopup", function() { return ShareWishlistPopup; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Popup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Popup */ "./src/app/component/Popup/index.js");
/* harmony import */ var _ShareWishlistForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ShareWishlistForm */ "./src/app/component/ShareWishlistForm/index.js");
/* harmony import */ var _ShareWishlistPopup_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ShareWishlistPopup.config */ "./src/app/component/ShareWishlistPopup/ShareWishlistPopup.config.js");
/* harmony import */ var _ShareWishlistPopup_style__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ShareWishlistPopup.style */ "./src/app/component/ShareWishlistPopup/ShareWishlistPopup.style.scss");
/* harmony import */ var _ShareWishlistPopup_style__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ShareWishlistPopup_style__WEBPACK_IMPORTED_MODULE_5__);
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






/** @namespace Component/ShareWishlistPopup/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ShareWishlistPopup =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ShareWishlistPopup, _Extensible);

  function _ShareWishlistPopup() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ShareWishlistPopup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ShareWishlistPopup)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {});

    return _this;
  }

  _createClass(_ShareWishlistPopup, [{
    key: "renderContent",
    value: function renderContent() {
      var handleFormData = this.props.handleFormData;
      return (
        /*#__PURE__*/
        _checkBEM(React, _ShareWishlistForm__WEBPACK_IMPORTED_MODULE_3__["default"], {
          onSave: handleFormData
        })
      );
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _Popup__WEBPACK_IMPORTED_MODULE_2__["default"], {
          id: _ShareWishlistPopup_config__WEBPACK_IMPORTED_MODULE_4__["SHARE_WISHLIST_POPUP_ID"],
          clickOutside: false,
          mix: {
            block: 'ShareWishlistPopup'
          }
        }, this.renderContent())
      );
    }
  }]);

  return _ShareWishlistPopup;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ShareWishlistPopup, 'name', {
  value: 'ShareWishlistPopup'
});

var ShareWishlistPopup = middleware(_ShareWishlistPopup, "Component/ShareWishlistPopup/Component");

_defineProperty(ShareWishlistPopup, "propTypes", {
  handleFormData: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (ShareWishlistPopup);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ShareWishlistPopup/ShareWishlistPopup.container.js":
/*!******************************************************************************!*\
  !*** ./src/app/component/ShareWishlistPopup/ShareWishlistPopup.container.js ***!
  \******************************************************************************/
/*! exports provided: mapDispatchToProps, _ShareWishlistPopupContainer, ShareWishlistPopupContainer, mapStateToProps, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, __, Extensible, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ShareWishlistPopupContainer", function() { return _ShareWishlistPopupContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShareWishlistPopupContainer", function() { return ShareWishlistPopupContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _query_Wishlist_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../query/Wishlist.query */ "./src/app/query/Wishlist.query.js");
/* harmony import */ var _store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/Notification/Notification.action */ "./src/app/store/Notification/Notification.action.js");
/* harmony import */ var _store_Popup_Popup_action__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store/Popup/Popup.action */ "./src/app/store/Popup/Popup.action.js");
/* harmony import */ var _util_Request__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../util/Request */ "./src/app/util/Request/index.js");
/* harmony import */ var _ShareWishlistPopup_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ShareWishlistPopup.component */ "./src/app/component/ShareWishlistPopup/ShareWishlistPopup.component.js");
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








/** @namespace Component/ShareWishlistPopup/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    showNotification: function showNotification(message) {
      return dispatch(Object(_store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_4__["showNotification"])('success', __(message)));
    },
    showError: function showError(message) {
      return dispatch(Object(_store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_4__["showNotification"])('error', __(message)));
    },
    hidePopup: function hidePopup() {
      return dispatch(Object(_store_Popup_Popup_action__WEBPACK_IMPORTED_MODULE_5__["showPopup"])('', {}));
    }
  };
}, "Component/ShareWishlistPopup/Container/mapDispatchToProps");
/** @namespace Component/ShareWishlistPopup/Container/shareWishlistPopupContainer */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ShareWishlistPopupContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ShareWishlistPopupContainer, _Extensible);

  function _ShareWishlistPopupContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ShareWishlistPopupContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ShareWishlistPopupContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleFormData", function (fields) {
      var _this$props = _this.props,
          hidePopup = _this$props.hidePopup,
          showError = _this$props.showError,
          showNotification = _this$props.showNotification;
      var message = fields.message,
          initialEmails = fields.emails;
      var emails = initialEmails.split(',').map(function (email) {
        return email.trim();
      });
      Object(_util_Request__WEBPACK_IMPORTED_MODULE_6__["fetchMutation"])(_query_Wishlist_query__WEBPACK_IMPORTED_MODULE_3__["default"].getShareWishlistMutation({
        message: message,
        emails: emails
      })).then(
      /** @namespace Component/ShareWishlistPopup/Container/handleFormDataFetchMutationThen */
      middleware(function () {
        showNotification('Wishlist has been shared');
        hidePopup();
      }, "Component/ShareWishlistPopup/Container/handleFormDataFetchMutationThen"),
      /** @namespace Component/ShareWishlistPopup/Container/handleFormDataFetchMutationCatch */
      middleware(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            message = _ref2[0].message;

        return showError(message);
      }, "Component/ShareWishlistPopup/Container/handleFormDataFetchMutationCatch"));
    });

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", function () {
      return {
        handleFormData: _this.handleFormData
      };
    });

    return _this;
  }

  _createClass(_ShareWishlistPopupContainer, [{
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _ShareWishlistPopup_component__WEBPACK_IMPORTED_MODULE_7__["default"], _extends({}, this.props, this.containerFunctions()))
      );
    }
  }]);

  return _ShareWishlistPopupContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/** @namespace Component/ShareWishlistPopup/Container/mapStateToProps */
// eslint-disable-next-line no-unused-vars

Object.defineProperty(_ShareWishlistPopupContainer, 'name', {
  value: 'ShareWishlistPopupContainer'
});

var ShareWishlistPopupContainer = middleware(_ShareWishlistPopupContainer, "Component/ShareWishlistPopup/Container/shareWishlistPopupContainer");

_defineProperty(ShareWishlistPopupContainer, "propTypes", {
  showError: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  hidePopup: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  showNotification: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

var mapStateToProps = middleware(function (state) {
  return {};
}, "Component/ShareWishlistPopup/Container/mapStateToProps");
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(ShareWishlistPopupContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/ShareWishlistPopup/ShareWishlistPopup.style.scss":
/*!****************************************************************************!*\
  !*** ./src/app/component/ShareWishlistPopup/ShareWishlistPopup.style.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340089
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ShareWishlistPopup/index.js":
/*!*******************************************************!*\
  !*** ./src/app/component/ShareWishlistPopup/index.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ShareWishlistPopup_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ShareWishlistPopup.container */ "./src/app/component/ShareWishlistPopup/ShareWishlistPopup.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ShareWishlistPopup_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/WishlistItem/WishlistItem.config.js":
/*!***************************************************************!*\
  !*** ./src/app/component/WishlistItem/WishlistItem.config.js ***!
  \***************************************************************/
/*! exports provided: UPDATE_WISHLIST_FREQUENCY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_WISHLIST_FREQUENCY", function() { return UPDATE_WISHLIST_FREQUENCY; });
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
var UPDATE_WISHLIST_FREQUENCY = 1000; // (ms)

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

      return attributes ? Object.values(attributes).reduce(function (acc, _ref6) {
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
      }, []) : [];
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
          },
          onAheadOfDragItemRemoveThreshold: this.containerFunctions.removeItem
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
      // 1608291340037
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/WishlistItem/index.js":
/*!*************************************************!*\
  !*** ./src/app/component/WishlistItem/index.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WishlistItem_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WishlistItem.container */ "./src/app/component/WishlistItem/WishlistItem.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _WishlistItem_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ })

}]);
//# sourceMappingURL=account~misc.js.map