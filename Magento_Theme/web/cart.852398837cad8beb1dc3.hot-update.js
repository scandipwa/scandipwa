webpackHotUpdate("cart",{

/***/ "./src/app/route/CartPage/CartPage.component.js":
/*!******************************************************!*\
  !*** ./src/app/route/CartPage/CartPage.component.js ***!
  \******************************************************/
/*! exports provided: _CartPage, CartPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_CartPage", function() { return _CartPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartPage", function() { return CartPage; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _component_CartCoupon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../component/CartCoupon */ "./src/app/component/CartCoupon/index.js");
/* harmony import */ var _component_CartItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../component/CartItem */ "./src/app/component/CartItem/index.js");
/* harmony import */ var _component_CmsBlock__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../component/CmsBlock */ "./src/app/component/CmsBlock/index.js");
/* harmony import */ var _component_ContentWrapper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../component/ContentWrapper */ "./src/app/component/ContentWrapper/index.js");
/* harmony import */ var _component_ExpandableContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../component/ExpandableContent */ "./src/app/component/ExpandableContent/index.js");
/* harmony import */ var _component_Link__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../component/Link */ "./src/app/component/Link/index.js");
/* harmony import */ var _component_ProductLinks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../component/ProductLinks */ "./src/app/component/ProductLinks/index.js");
/* harmony import */ var _store_LinkedProducts_LinkedProducts_reducer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../store/LinkedProducts/LinkedProducts.reducer */ "./src/app/store/LinkedProducts/LinkedProducts.reducer.js");
/* harmony import */ var _type_MiniCart__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../type/MiniCart */ "./src/app/type/MiniCart.js");
/* harmony import */ var _util_Price__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../util/Price */ "./src/app/util/Price/index.js");
/* harmony import */ var _CartPage_style__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./CartPage.style */ "./src/app/route/CartPage/CartPage.style.scss");
/* harmony import */ var _CartPage_style__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_CartPage_style__WEBPACK_IMPORTED_MODULE_12__);
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













/** @namespace Route/CartPage/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _CartPage =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_CartPage, _Extensible);

  function _CartPage() {
    _classCallCheck(this, _CartPage);

    return _possibleConstructorReturn(this, _getPrototypeOf(_CartPage).apply(this, arguments));
  }

  _createClass(_CartPage, [{
    key: "renderCartItems",
    value: function renderCartItems() {
      var _this$props$totals = this.props.totals,
          items = _this$props$totals.items,
          quote_currency_code = _this$props$totals.quote_currency_code;

      if (!items || items.length < 1) {
        return (
          /*#__PURE__*/
          _checkBEM(React, "p", {
            block: "CartPage",
            elem: "Empty"
          }, __('There are no products in cart.'))
        );
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null,
        /*#__PURE__*/
        _checkBEM(React, "p", {
          block: "CartPage",
          elem: "TableHead",
          "aria-hidden": true
        },
        /*#__PURE__*/
        _checkBEM(React, "span", null, __('item')),
        /*#__PURE__*/
        _checkBEM(React, "span", null, __('qty')),
        /*#__PURE__*/
        _checkBEM(React, "span", null, __('subtotal'))),
        /*#__PURE__*/
        _checkBEM(React, "ul", {
          block: "CartPage",
          elem: "Items",
          "aria-label": "List of items in cart"
        }, items.map(function (item) {
          return (
            /*#__PURE__*/
            _checkBEM(React, _component_CartItem__WEBPACK_IMPORTED_MODULE_3__["default"], {
              key: item.item_id,
              item: item,
              currency_code: quote_currency_code,
              isEditing: true,
              isLikeTable: true
            })
          );
        })))
      );
    }
  }, {
    key: "renderDiscountCode",
    value: function renderDiscountCode() {
      var coupon_code = this.props.totals.coupon_code;
      return (
        /*#__PURE__*/
        _checkBEM(React, _component_ExpandableContent__WEBPACK_IMPORTED_MODULE_6__["default"], {
          heading: __('Have a discount code?'),
          mix: {
            block: 'CartPage',
            elem: 'Discount'
          }
        },
        /*#__PURE__*/
        _checkBEM(React, _component_CartCoupon__WEBPACK_IMPORTED_MODULE_2__["default"], {
          couponCode: coupon_code
        }))
      );
    }
  }, {
    key: "renderPriceLine",
    value: function renderPriceLine(price) {
      var quote_currency_code = this.props.totals.quote_currency_code;
      return Object(_util_Price__WEBPACK_IMPORTED_MODULE_11__["formatPrice"])(price, quote_currency_code);
    }
  }, {
    key: "renderTotalDetails",
    value: function renderTotalDetails() {
      var isMobile = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var _this$props$totals2 = this.props.totals,
          _this$props$totals2$s = _this$props$totals2.subtotal,
          subtotal = _this$props$totals2$s === void 0 ? 0 : _this$props$totals2$s,
          _this$props$totals2$t = _this$props$totals2.tax_amount,
          tax_amount = _this$props$totals2$t === void 0 ? 0 : _this$props$totals2$t;
      return (
        /*#__PURE__*/
        _checkBEM(React, "dl", {
          block: "CartPage",
          elem: "TotalDetails",
          "aria-label": __('Order total details'),
          mods: {
            isMobile: isMobile
          }
        },
        /*#__PURE__*/
        _checkBEM(React, "dt", null, __('Subtotal:')),
        /*#__PURE__*/
        _checkBEM(React, "dd", null, this.renderPriceLine(subtotal)), this.renderDiscount(),
        /*#__PURE__*/
        _checkBEM(React, "dt", null, __('Tax:')),
        /*#__PURE__*/
        _checkBEM(React, "dd", null, this.renderPriceLine(tax_amount)))
      );
    }
  }, {
    key: "renderTotal",
    value: function renderTotal() {
      var _this$props$totals3 = this.props.totals,
          _this$props$totals3$s = _this$props$totals3.subtotal_with_discount,
          subtotal_with_discount = _this$props$totals3$s === void 0 ? 0 : _this$props$totals3$s,
          _this$props$totals3$t = _this$props$totals3.tax_amount,
          tax_amount = _this$props$totals3$t === void 0 ? 0 : _this$props$totals3$t;
      return (
        /*#__PURE__*/
        _checkBEM(React, "dl", {
          block: "CartPage",
          elem: "Total",
          "aria-label": "Complete order total"
        },
        /*#__PURE__*/
        _checkBEM(React, "dt", null, __('Order total:')),
        /*#__PURE__*/
        _checkBEM(React, "dd", null, this.renderPriceLine(subtotal_with_discount + tax_amount)))
      );
    }
  }, {
    key: "renderSecureCheckoutButton",
    value: function renderSecureCheckoutButton() {
      var _this$props = this.props,
          onCheckoutButtonClick = _this$props.onCheckoutButtonClick,
          hasOutOfStockProductsInCart = _this$props.hasOutOfStockProductsInCart;

      if (hasOutOfStockProductsInCart) {
        return (
          /*#__PURE__*/
          _checkBEM(React, "div", {
            block: "CartPage",
            elem: "OutOfStockProductsWarning"
          }, __('Remove out of stock products from cart'))
        );
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "button", {
          block: "CartPage",
          elem: "CheckoutButton",
          mix: {
            block: 'Button'
          },
          onClick: onCheckoutButtonClick
        },
        /*#__PURE__*/
        _checkBEM(React, "span", null), __('Secure checkout'))
      );
    }
  }, {
    key: "renderButtons",
    value: function renderButtons() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "CartPage",
          elem: "CheckoutButtons"
        }, this.renderSecureCheckoutButton(),
        /*#__PURE__*/
        _checkBEM(React, _component_Link__WEBPACK_IMPORTED_MODULE_7__["default"], {
          block: "CartPage",
          elem: "ContinueShopping",
          to: "/"
        }, __('Continue shopping')))
      );
    }
  }, {
    key: "renderTotals",
    value: function renderTotals() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "article", {
          block: "CartPage",
          elem: "Summary",
          mix: {
            block: 'FixedElement',
            elem: 'Bottom'
          }
        },
        /*#__PURE__*/
        _checkBEM(React, "h4", {
          block: "CartPage",
          elem: "SummaryHeading"
        }, __('Summary')), this.renderTotalDetails(), this.renderTotal(), this.renderButtons())
      );
    }
  }, {
    key: "renderDiscount",
    value: function renderDiscount() {
      var _this$props$totals4 = this.props.totals,
          applied_rule_ids = _this$props$totals4.applied_rule_ids,
          coupon_code = _this$props$totals4.coupon_code,
          _this$props$totals4$d = _this$props$totals4.discount_amount,
          discount_amount = _this$props$totals4$d === void 0 ? 0 : _this$props$totals4$d;

      if (!applied_rule_ids) {
        return null;
      }

      if (!coupon_code) {
        return (
          /*#__PURE__*/
          _checkBEM(React, React.Fragment, null,
          /*#__PURE__*/
          _checkBEM(React, "dt", null, __('Discount: ')),
          /*#__PURE__*/
          _checkBEM(React, "dd", null, "-".concat(this.renderPriceLine(Math.abs(discount_amount)))))
        );
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null,
        /*#__PURE__*/
        _checkBEM(React, "dt", null, __('Discount/Coupon '),
        /*#__PURE__*/
        _checkBEM(React, "strong", {
          block: "CartPage",
          elem: "DiscountCoupon"
        }, coupon_code.toUpperCase())),
        /*#__PURE__*/
        _checkBEM(React, "dd", null, "-".concat(this.renderPriceLine(Math.abs(discount_amount)))))
      );
    }
  }, {
    key: "renderCrossSellProducts",
    value: function renderCrossSellProducts() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _component_ProductLinks__WEBPACK_IMPORTED_MODULE_8__["default"], {
          linkType: _store_LinkedProducts_LinkedProducts_reducer__WEBPACK_IMPORTED_MODULE_9__["CROSS_SELL"],
          title: __('Frequently bought together')
        })
      );
    }
  }, {
    key: "renderPromoContent",
    value: function renderPromoContent() {
      var _window$contentConfig = window.contentConfiguration.cart_content;
      _window$contentConfig = _window$contentConfig === void 0 ? {} : _window$contentConfig;
      var cart_cms = _window$contentConfig.cart_cms;

      if (cart_cms) {
        return (
          /*#__PURE__*/
          _checkBEM(React, _component_CmsBlock__WEBPACK_IMPORTED_MODULE_4__["default"], {
            identifier: cart_cms
          })
        );
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "figure", {
          block: "CartPage",
          elem: "PromoBlock"
        },
        /*#__PURE__*/
        _checkBEM(React, "figcaption", {
          block: "CartPage",
          elem: "PromoText"
        }, __('Free shipping on order 49$ and more.')))
      );
    }
  }, {
    key: "renderPromo",
    value: function renderPromo() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "CartPage",
          elem: "Promo"
        }, this.renderPromoContent())
      );
    }
  }, {
    key: "renderHeading",
    value: function renderHeading() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "h1", {
          block: "CartPage",
          elem: "Heading"
        }, __('Shopping cart'))
      );
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "main", {
          block: "CartPage",
          "aria-label": "Cart Page"
        },
        /*#__PURE__*/
        _checkBEM(React, _component_ContentWrapper__WEBPACK_IMPORTED_MODULE_5__["default"], {
          wrapperMix: {
            block: 'CartPage',
            elem: 'Wrapper'
          },
          label: "Cart page details"
        },
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "CartPage",
          elem: "Static"
        }, this.renderHeading(), this.renderCartItems(), this.renderTotalDetails(true), this.renderDiscountCode(), this.renderCrossSellProducts()),
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "CartPage",
          elem: "Floating"
        }, this.renderPromo(), this.renderTotals())))
      );
    }
  }]);

  return _CartPage;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_CartPage, 'name', {
  value: 'CartPage'
});

var CartPage = middleware(_CartPage, "Route/CartPage/Component");

_defineProperty(CartPage, "propTypes", {
  totals: _type_MiniCart__WEBPACK_IMPORTED_MODULE_10__["TotalsType"].isRequired,
  onCheckoutButtonClick: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  hasOutOfStockProductsInCart: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool
});

_defineProperty(CartPage, "defaultProps", {
  hasOutOfStockProductsInCart: false
});

/* harmony default export */ __webpack_exports__["default"] = (CartPage);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/route/CartPage/CartPage.style.scss":
/*!****************************************************!*\
  !*** ./src/app/route/CartPage/CartPage.style.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1605720109002
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "?0fcd":
false

})
//# sourceMappingURL=cart.852398837cad8beb1dc3.hot-update.js.map