(this["webpackJsonp"] = this["webpackJsonp"] || []).push([["product"],{

/***/ "./src/app/component/CarouselScroll/CarouselScroll.component.js":
/*!**********************************************************************!*\
  !*** ./src/app/component/CarouselScroll/CarouselScroll.component.js ***!
  \**********************************************************************/
/*! exports provided: _CarouselScroll, CarouselScroll, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_CarouselScroll", function() { return _CarouselScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarouselScroll", function() { return CarouselScroll; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CarouselScrollArrow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CarouselScrollArrow */ "./src/app/component/CarouselScrollArrow/index.js");
/* harmony import */ var _CarouselScrollItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../CarouselScrollItem */ "./src/app/component/CarouselScrollItem/index.js");
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _util_CSS__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../util/CSS */ "./src/app/util/CSS/index.js");
/* harmony import */ var _CarouselScroll_style__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CarouselScroll.style */ "./src/app/component/CarouselScroll/CarouselScroll.style.scss");
/* harmony import */ var _CarouselScroll_style__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_CarouselScroll_style__WEBPACK_IMPORTED_MODULE_6__);
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







/** @namespace Component/CarouselScroll/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _CarouselScroll =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_CarouselScroll, _Extensible);

  function _CarouselScroll() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _CarouselScroll);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_CarouselScroll)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      activeItemId: 0
    });

    _defineProperty(_assertThisInitialized(_this), "itemRef",
    /*#__PURE__*/
    Object(react__WEBPACK_IMPORTED_MODULE_1__["createRef"])());

    _defineProperty(_assertThisInitialized(_this), "carouselRef",
    /*#__PURE__*/
    Object(react__WEBPACK_IMPORTED_MODULE_1__["createRef"])());

    _defineProperty(_assertThisInitialized(_this), "handleArrowClick", function (isNextArrow) {
      var children = _this.props.children;
      var prevActiveItemId = _this.state.activeItemId;
      var activeItemId = prevActiveItemId + (isNextArrow ? 1 : -1);

      if (children.length - 1 < activeItemId || activeItemId < 0) {
        return;
      }

      _this.handleChange(activeItemId);
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (nextId) {
      var onChange = _this.props.onChange;

      _this.setTranslate(nextId);

      _this.setState({
        activeItemId: nextId
      });

      onChange(nextId);
    });

    _defineProperty(_assertThisInitialized(_this), "renderContentItem", function (child, key) {
      var activeItemId = _this.state.activeItemId;
      return (
        /*#__PURE__*/
        _checkBEM(React, _CarouselScrollItem__WEBPACK_IMPORTED_MODULE_3__["default"], {
          key: key,
          position: key,
          onClick: _this.handleChange,
          itemRef: _this.itemRef,
          isActive: key === activeItemId
        }, child)
      );
    });

    return _this;
  }

  _createClass(_CarouselScroll, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var showedItemCount = this.props.showedItemCount;
      var heightSize = 100;
      var height = "".concat(heightSize / showedItemCount, "%");
      _util_CSS__WEBPACK_IMPORTED_MODULE_5__["default"].setVariable(this.carouselRef, 'carousel-item-height', height);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var prevChildrenLength = prevProps.children.length;
      var _this$props = this.props,
          activeItemId = _this$props.activeItemId,
          childrenLength = _this$props.children.length;
      var prevActiveItemId = this.state.activeItemId;

      if (prevChildrenLength !== childrenLength) {
        this.handleReset();
        return;
      }

      if (activeItemId !== null && activeItemId !== prevActiveItemId) {
        this.handleChange(activeItemId);
      }
    }
  }, {
    key: "getNextTranslate",
    value: function getNextTranslate(nextId) {
      var _this$props2 = this.props,
          showedItemCount = _this$props2.showedItemCount,
          showedActiveItemNr = _this$props2.showedActiveItemNr,
          childrenLength = _this$props2.children.length;
      var offsetHeight = this.itemRef.current.offsetHeight; // When selected item isnt reached wanted position

      if (nextId < showedActiveItemNr - 1 || childrenLength <= showedItemCount) {
        return 0;
      }

      var isEndReached = showedItemCount - showedActiveItemNr + nextId + 1 > childrenLength;
      var position = isEndReached ? childrenLength - showedItemCount : nextId - (showedActiveItemNr - 1);
      return "".concat(-position * offsetHeight, "px");
    }
  }, {
    key: "setTranslate",
    value: function setTranslate(nextId) {
      var _this$props3 = this.props,
          childrenLength = _this$props3.children.length,
          showedItemCount = _this$props3.showedItemCount;

      if (childrenLength <= showedItemCount) {
        return;
      }

      var translate = this.getNextTranslate(nextId);
      _util_CSS__WEBPACK_IMPORTED_MODULE_5__["default"].setVariable(this.carouselRef, 'translateY', translate);
    }
  }, {
    key: "handleReset",
    value: function handleReset() {
      var onChange = this.props.onChange;
      var activeItemId = 0;
      _util_CSS__WEBPACK_IMPORTED_MODULE_5__["default"].setVariable(this.carouselRef, 'translateY', 0);
      onChange(activeItemId);
      this.setState({
        activeItemId: activeItemId
      });
    }
  }, {
    key: "renderArrow",
    value: function renderArrow() {
      var isNextArrow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var _this$props4 = this.props,
          showArrow = _this$props4.showArrow,
          childrenLength = _this$props4.children.length,
          showedItemCount = _this$props4.showedItemCount;
      var activeItemId = this.state.activeItemId;

      if (!showArrow || childrenLength <= showedItemCount) {
        return null;
      }

      var isDisabled = isNextArrow ? activeItemId === childrenLength - 1 : !activeItemId;
      return (
        /*#__PURE__*/
        _checkBEM(React, _CarouselScrollArrow__WEBPACK_IMPORTED_MODULE_2__["default"], {
          isNextArrow: isNextArrow,
          isDisabled: isDisabled,
          onClick: this.handleArrowClick
        })
      );
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var children = this.props.children;
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "CarouselScroll",
          elem: "ContentWrapper"
        },
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "CarouselScroll",
          elem: "Content"
        }, children.map(this.renderContentItem)))
      );
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "CarouselScroll",
          ref: this.carouselRef
        }, this.renderArrow(), this.renderContent(), this.renderArrow(true))
      );
    }
  }]);

  return _CarouselScroll;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_CarouselScroll, 'name', {
  value: 'CarouselScroll'
});

var CarouselScroll = middleware(_CarouselScroll, "Component/CarouselScroll/Component");

_defineProperty(CarouselScroll, "propTypes", {
  children: _type_Common__WEBPACK_IMPORTED_MODULE_4__["ChildrenType"].isRequired,
  showArrow: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  showedItemCount: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  showedActiveItemNr: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  activeItemId: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number
});

_defineProperty(CarouselScroll, "defaultProps", {
  showArrow: true,
  showedItemCount: 1,
  showedActiveItemNr: 2,
  onChange: function onChange() {},
  activeItemId: null
});

/* harmony default export */ __webpack_exports__["default"] = (CarouselScroll);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/CarouselScroll/CarouselScroll.style.scss":
/*!********************************************************************!*\
  !*** ./src/app/component/CarouselScroll/CarouselScroll.style.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340866
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/CarouselScroll/index.js":
/*!***************************************************!*\
  !*** ./src/app/component/CarouselScroll/index.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CarouselScroll_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CarouselScroll.component */ "./src/app/component/CarouselScroll/CarouselScroll.component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _CarouselScroll_component__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/CarouselScrollArrow/CarouselScrollArrow.component.js":
/*!********************************************************************************!*\
  !*** ./src/app/component/CarouselScrollArrow/CarouselScrollArrow.component.js ***!
  \********************************************************************************/
/*! exports provided: _CarouselScrollArrow, CarouselScrollArrow, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_CarouselScrollArrow", function() { return _CarouselScrollArrow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarouselScrollArrow", function() { return CarouselScrollArrow; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CarouselScrollArrow_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CarouselScrollArrow.style */ "./src/app/component/CarouselScrollArrow/CarouselScrollArrow.style.scss");
/* harmony import */ var _CarouselScrollArrow_style__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_CarouselScrollArrow_style__WEBPACK_IMPORTED_MODULE_2__);
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



/** @namespace Component/CarouselScrollArrow/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _CarouselScrollArrow =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_CarouselScrollArrow, _Extensible);

  function _CarouselScrollArrow() {
    _classCallCheck(this, _CarouselScrollArrow);

    return _possibleConstructorReturn(this, _getPrototypeOf(_CarouselScrollArrow).apply(this, arguments));
  }

  _createClass(_CarouselScrollArrow, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          mods = _this$props.mods,
          onClick = _this$props.onClick;
      return (
        /*#__PURE__*/
        _checkBEM(React, "button", {
          block: "CarouselScrollArrow",
          mods: mods,
          onClick: onClick,
          "aria-label": "Arrow"
        })
      );
    }
  }]);

  return _CarouselScrollArrow;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_CarouselScrollArrow, 'name', {
  value: 'CarouselScrollArrow'
});

var CarouselScrollArrow = middleware(_CarouselScrollArrow, "Component/CarouselScrollArrow/Component");

_defineProperty(CarouselScrollArrow, "propTypes", {
  mods: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func
});

_defineProperty(CarouselScrollArrow, "defaultProps", {
  mods: {},
  onClick: function onClick() {}
});

/* harmony default export */ __webpack_exports__["default"] = (CarouselScrollArrow);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/CarouselScrollArrow/CarouselScrollArrow.container.js":
/*!********************************************************************************!*\
  !*** ./src/app/component/CarouselScrollArrow/CarouselScrollArrow.container.js ***!
  \********************************************************************************/
/*! exports provided: _CarouselScrollArrowContainer, CarouselScrollArrowContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_CarouselScrollArrowContainer", function() { return _CarouselScrollArrowContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarouselScrollArrowContainer", function() { return CarouselScrollArrowContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CarouselScrollArrow_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CarouselScrollArrow.component */ "./src/app/component/CarouselScrollArrow/CarouselScrollArrow.component.js");
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



/** @namespace Component/CarouselScrollArrow/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _CarouselScrollArrowContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_CarouselScrollArrowContainer, _Extensible);

  function _CarouselScrollArrowContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _CarouselScrollArrowContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_CarouselScrollArrowContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      onClick: _this.onClick.bind(_assertThisInitialized(_this))
    });

    _defineProperty(_assertThisInitialized(_this), "containerProps", function () {
      var _this$props = _this.props,
          isNextArrow = _this$props.isNextArrow,
          isDisabled = _this$props.isDisabled;
      return {
        mods: {
          isNextArrow: isNextArrow,
          isDisabled: isDisabled
        }
      };
    });

    return _this;
  }

  _createClass(_CarouselScrollArrowContainer, [{
    key: "onClick",
    value: function onClick() {
      var _this$props2 = this.props,
          onClick = _this$props2.onClick,
          isNextArrow = _this$props2.isNextArrow;
      onClick(isNextArrow);
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _CarouselScrollArrow_component__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({}, this.containerFunctions, this.containerProps()))
      );
    }
  }]);

  return _CarouselScrollArrowContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_CarouselScrollArrowContainer, 'name', {
  value: 'CarouselScrollArrowContainer'
});

var CarouselScrollArrowContainer = middleware(_CarouselScrollArrowContainer, "Component/CarouselScrollArrow/Container");

_defineProperty(CarouselScrollArrowContainer, "propTypes", {
  isNextArrow: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  isDisabled: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (CarouselScrollArrowContainer);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/CarouselScrollArrow/CarouselScrollArrow.style.scss":
/*!******************************************************************************!*\
  !*** ./src/app/component/CarouselScrollArrow/CarouselScrollArrow.style.scss ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340942
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/CarouselScrollArrow/index.js":
/*!********************************************************!*\
  !*** ./src/app/component/CarouselScrollArrow/index.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CarouselScrollArrow_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CarouselScrollArrow.container */ "./src/app/component/CarouselScrollArrow/CarouselScrollArrow.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _CarouselScrollArrow_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/CarouselScrollItem/CarouselScrollItem.component.js":
/*!******************************************************************************!*\
  !*** ./src/app/component/CarouselScrollItem/CarouselScrollItem.component.js ***!
  \******************************************************************************/
/*! exports provided: _CarouselScrollItem, CarouselScrollItem, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_CarouselScrollItem", function() { return _CarouselScrollItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarouselScrollItem", function() { return CarouselScrollItem; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _CarouselScrollItem_style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CarouselScrollItem.style */ "./src/app/component/CarouselScrollItem/CarouselScrollItem.style.scss");
/* harmony import */ var _CarouselScrollItem_style__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_CarouselScrollItem_style__WEBPACK_IMPORTED_MODULE_3__);
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




/** @namespace Component/CarouselScrollItem/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _CarouselScrollItem =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_CarouselScrollItem, _Extensible);

  function _CarouselScrollItem() {
    _classCallCheck(this, _CarouselScrollItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(_CarouselScrollItem).apply(this, arguments));
  }

  _createClass(_CarouselScrollItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isActive = _this$props.isActive,
          itemRef = _this$props.itemRef,
          onClick = _this$props.onClick,
          children = _this$props.children;
      return (
        /*#__PURE__*/
        _checkBEM(React, "button", {
          block: "CarouselScrollItem",
          mods: {
            isActive: isActive
          },
          ref: itemRef,
          onClick: onClick
        }, children)
      );
    }
  }]);

  return _CarouselScrollItem;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_CarouselScrollItem, 'name', {
  value: 'CarouselScrollItem'
});

var CarouselScrollItem = middleware(_CarouselScrollItem, "Component/CarouselScrollItem/Component");

_defineProperty(CarouselScrollItem, "propTypes", {
  isActive: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  itemRef: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
    current: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.instanceOf(Element)
  })]).isRequired,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  children: _type_Common__WEBPACK_IMPORTED_MODULE_2__["ChildrenType"].isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (CarouselScrollItem);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/CarouselScrollItem/CarouselScrollItem.container.js":
/*!******************************************************************************!*\
  !*** ./src/app/component/CarouselScrollItem/CarouselScrollItem.container.js ***!
  \******************************************************************************/
/*! exports provided: _CarouselScrollItemContainer, CarouselScrollItemContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_CarouselScrollItemContainer", function() { return _CarouselScrollItemContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarouselScrollItemContainer", function() { return CarouselScrollItemContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _CarouselScrollItem_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CarouselScrollItem.component */ "./src/app/component/CarouselScrollItem/CarouselScrollItem.component.js");
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




/** @namespace Component/CarouselScrollItem/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _CarouselScrollItemContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_CarouselScrollItemContainer, _Extensible);

  function _CarouselScrollItemContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _CarouselScrollItemContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_CarouselScrollItemContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      onClick: _this.onClick.bind(_assertThisInitialized(_this))
    });

    _defineProperty(_assertThisInitialized(_this), "containerProps", function () {
      var _this$props = _this.props,
          isActive = _this$props.isActive,
          itemRef = _this$props.itemRef,
          children = _this$props.children;
      return {
        isActive: isActive,
        itemRef: itemRef,
        children: children
      };
    });

    return _this;
  }

  _createClass(_CarouselScrollItemContainer, [{
    key: "onClick",
    value: function onClick() {
      var _this$props2 = this.props,
          onClick = _this$props2.onClick,
          position = _this$props2.position;
      onClick(position);
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _CarouselScrollItem_component__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({}, this.containerFunctions, this.containerProps()))
      );
    }
  }]);

  return _CarouselScrollItemContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_CarouselScrollItemContainer, 'name', {
  value: 'CarouselScrollItemContainer'
});

var CarouselScrollItemContainer = middleware(_CarouselScrollItemContainer, "Component/CarouselScrollItem/Container");

_defineProperty(CarouselScrollItemContainer, "propTypes", {
  isActive: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  itemRef: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
    current: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.instanceOf(Element)
  })]),
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  children: _type_Common__WEBPACK_IMPORTED_MODULE_2__["ChildrenType"],
  position: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number.isRequired
});

_defineProperty(CarouselScrollItemContainer, "defaultProps", {
  isActive: false,
  itemRef: function itemRef() {},
  onClick: function onClick() {},
  children: []
});

/* harmony default export */ __webpack_exports__["default"] = (CarouselScrollItemContainer);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/CarouselScrollItem/CarouselScrollItem.style.scss":
/*!****************************************************************************!*\
  !*** ./src/app/component/CarouselScrollItem/CarouselScrollItem.style.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340933
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/CarouselScrollItem/index.js":
/*!*******************************************************!*\
  !*** ./src/app/component/CarouselScrollItem/index.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CarouselScrollItem_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CarouselScrollItem.container */ "./src/app/component/CarouselScrollItem/CarouselScrollItem.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _CarouselScrollItem_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/GroupedProductList/GroupedProductList.component.js":
/*!******************************************************************************!*\
  !*** ./src/app/component/GroupedProductList/GroupedProductList.component.js ***!
  \******************************************************************************/
/*! exports provided: _GroupedProductList, GroupedProductList, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_GroupedProductList", function() { return _GroupedProductList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupedProductList", function() { return GroupedProductList; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _GroupedProductsItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../GroupedProductsItem */ "./src/app/component/GroupedProductsItem/index.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
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
 * Product description
 * @class GroupedProductList
 * @namespace Component/GroupedProductList/Component
 */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _GroupedProductList =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_GroupedProductList, _Extensible);

  function _GroupedProductList() {
    _classCallCheck(this, _GroupedProductList);

    return _possibleConstructorReturn(this, _getPrototypeOf(_GroupedProductList).apply(this, arguments));
  }

  _createClass(_GroupedProductList, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var clearGroupedProductQuantity = this.props.clearGroupedProductQuantity;
      clearGroupedProductQuantity();
    }
  }, {
    key: "renderProductList",
    value: function renderProductList(items) {
      var _this$props = this.props,
          groupedProductQuantity = _this$props.groupedProductQuantity,
          setGroupedProductQuantity = _this$props.setGroupedProductQuantity;
      return (
        /*#__PURE__*/
        _checkBEM(React, "ul", null, items.map(function (_ref) {
          var product = _ref.product,
              id = _ref.product.id,
              qty = _ref.qty;
          return (
            /*#__PURE__*/
            _checkBEM(React, _GroupedProductsItem__WEBPACK_IMPORTED_MODULE_2__["default"], {
              key: id,
              product: product,
              defaultQuantity: qty,
              groupedProductQuantity: groupedProductQuantity,
              setGroupedProductQuantity: setGroupedProductQuantity
            })
          );
        }))
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props$product = this.props.product,
          items = _this$props$product.items,
          type_id = _this$props$product.type_id;

      if (type_id !== 'grouped') {
        return null;
      }

      if (!items) {
        return null;
      }

      return this.renderProductList(items);
    }
  }]);

  return _GroupedProductList;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_GroupedProductList, 'name', {
  value: 'GroupedProductList'
});

var GroupedProductList = middleware(_GroupedProductList, "Component/GroupedProductList/Component");

_defineProperty(GroupedProductList, "propTypes", {
  product: _type_ProductList__WEBPACK_IMPORTED_MODULE_3__["ProductType"].isRequired,
  groupedProductQuantity: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number).isRequired,
  clearGroupedProductQuantity: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  setGroupedProductQuantity: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (GroupedProductList);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/GroupedProductList/index.js":
/*!*******************************************************!*\
  !*** ./src/app/component/GroupedProductList/index.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GroupedProductList_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GroupedProductList.component */ "./src/app/component/GroupedProductList/GroupedProductList.component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _GroupedProductList_component__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/GroupedProductsItem/GroupedProductsItem.component.js":
/*!********************************************************************************!*\
  !*** ./src/app/component/GroupedProductsItem/GroupedProductsItem.component.js ***!
  \********************************************************************************/
/*! exports provided: _GroupedProductsItem, GroupedProductsItem, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_GroupedProductsItem", function() { return _GroupedProductsItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupedProductsItem", function() { return GroupedProductsItem; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Field */ "./src/app/component/Field/index.js");
/* harmony import */ var _Image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Image */ "./src/app/component/Image/index.js");
/* harmony import */ var _ProductPrice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ProductPrice */ "./src/app/component/ProductPrice/index.js");
/* harmony import */ var _TextPlaceholder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../TextPlaceholder */ "./src/app/component/TextPlaceholder/index.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _util_Media__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../util/Media */ "./src/app/util/Media/index.js");
/* harmony import */ var _GroupedProductsItem_style__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./GroupedProductsItem.style */ "./src/app/component/GroupedProductsItem/GroupedProductsItem.style.scss");
/* harmony import */ var _GroupedProductsItem_style__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_GroupedProductsItem_style__WEBPACK_IMPORTED_MODULE_8__);
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
 * Grouped Product Item
 * @class GroupedProduct
 * @namespace Component/GroupedProductsItem/Component
 */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _GroupedProductsItem =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_GroupedProductsItem, _Extensible);

  function _GroupedProductsItem() {
    _classCallCheck(this, _GroupedProductsItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(_GroupedProductsItem).apply(this, arguments));
  }

  _createClass(_GroupedProductsItem, [{
    key: "renderTitle",
    value: function renderTitle() {
      var _this$props$product = this.props.product,
          name = _this$props$product.name,
          price_range = _this$props$product.price_range;
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "GroupedProductsItem",
          elem: "Title"
        },
        /*#__PURE__*/
        _checkBEM(React, "p", null,
        /*#__PURE__*/
        _checkBEM(React, _TextPlaceholder__WEBPACK_IMPORTED_MODULE_5__["default"], {
          content: name
        })),
        /*#__PURE__*/
        _checkBEM(React, _ProductPrice__WEBPACK_IMPORTED_MODULE_4__["default"], {
          price: price_range,
          mods: {
            type: 'regular'
          }
        }))
      );
    }
  }, {
    key: "renderQuantity",
    value: function renderQuantity() {
      var _this$props = this.props,
          changeCount = _this$props.changeCount,
          itemCount = _this$props.itemCount;
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "GroupedProductsItem",
          elem: "Quantity"
        },
        /*#__PURE__*/
        _checkBEM(React, _Field__WEBPACK_IMPORTED_MODULE_2__["default"], {
          type: "number",
          id: "HeaderInput",
          name: "HeaderInput",
          onChange: changeCount,
          value: itemCount,
          min: 0
        }))
      );
    }
  }, {
    key: "renderImage",
    value: function renderImage() {
      var thumb_url = this.props.product.thumbnail.path;
      return (
        /*#__PURE__*/
        _checkBEM(React, _Image__WEBPACK_IMPORTED_MODULE_3__["default"], {
          mix: {
            block: 'GroupedProductsItem',
            elem: 'Image'
          },
          src: thumb_url && Object(_util_Media__WEBPACK_IMPORTED_MODULE_7__["default"])(thumb_url, _util_Media__WEBPACK_IMPORTED_MODULE_7__["PRODUCT_MEDIA"]),
          alt: "Product Thumbnail"
        })
      );
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "li", {
          block: "GroupedProductsItem",
          "aria-label": "Product Item"
        }, this.renderImage(), this.renderTitle(), this.renderQuantity())
      );
    }
  }]);

  return _GroupedProductsItem;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_GroupedProductsItem, 'name', {
  value: 'GroupedProductsItem'
});

var GroupedProductsItem = middleware(_GroupedProductsItem, "Component/GroupedProductsItem/Component");

_defineProperty(GroupedProductsItem, "propTypes", {
  product: _type_ProductList__WEBPACK_IMPORTED_MODULE_6__["ProductType"].isRequired,
  changeCount: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  itemCount: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (GroupedProductsItem);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/GroupedProductsItem/GroupedProductsItem.container.js":
/*!********************************************************************************!*\
  !*** ./src/app/component/GroupedProductsItem/GroupedProductsItem.container.js ***!
  \********************************************************************************/
/*! exports provided: _GroupedProductsItemContainer, GroupedProductsItemContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_GroupedProductsItemContainer", function() { return _GroupedProductsItemContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupedProductsItemContainer", function() { return GroupedProductsItemContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _GroupedProductsItem_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GroupedProductsItem.component */ "./src/app/component/GroupedProductsItem/GroupedProductsItem.component.js");
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




/** @namespace Component/GroupedProductsItem/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _GroupedProductsItemContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_GroupedProductsItemContainer, _Extensible);

  function _GroupedProductsItemContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _GroupedProductsItemContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_GroupedProductsItemContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      changeCount: _this.changeCount.bind(_assertThisInitialized(_this))
    });

    _defineProperty(_assertThisInitialized(_this), "containerProps", function () {
      return {
        itemCount: _this._getCurrentQuantity()
      };
    });

    return _this;
  }

  _createClass(_GroupedProductsItemContainer, [{
    key: "__construct",
    value: function __construct(props) {
      _get(_getPrototypeOf(_GroupedProductsItemContainer.prototype), "__construct", this).call(this, props);

      var defaultQuantity = this.props.defaultQuantity;
      this.changeCount(defaultQuantity);
    }
  }, {
    key: "_getCurrentQuantity",

    /**
     * Get the selected quantity of grouped product
     * @return {Number} product quantity
     */
    value: function _getCurrentQuantity() {
      var _this$props = this.props,
          id = _this$props.product.id,
          groupedProductQuantity = _this$props.groupedProductQuantity;
      return groupedProductQuantity[id] || 0;
    }
  }, {
    key: "changeCount",
    value: function changeCount(itemCount) {
      var _this$props2 = this.props,
          setGroupedProductQuantity = _this$props2.setGroupedProductQuantity,
          id = _this$props2.product.id;
      setGroupedProductQuantity(id, itemCount);
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _GroupedProductsItem_component__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({}, this.props, this.containerFunctions, this.containerProps()))
      );
    }
  }]);

  return _GroupedProductsItemContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_GroupedProductsItemContainer, 'name', {
  value: 'GroupedProductsItemContainer'
});

var GroupedProductsItemContainer = middleware(_GroupedProductsItemContainer, "Component/GroupedProductsItem/Container");

_defineProperty(GroupedProductsItemContainer, "propTypes", {
  product: _type_ProductList__WEBPACK_IMPORTED_MODULE_2__["ProductType"].isRequired,
  groupedProductQuantity: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number).isRequired,
  setGroupedProductQuantity: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  defaultQuantity: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (GroupedProductsItemContainer);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/GroupedProductsItem/GroupedProductsItem.style.scss":
/*!******************************************************************************!*\
  !*** ./src/app/component/GroupedProductsItem/GroupedProductsItem.style.scss ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340955
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/GroupedProductsItem/index.js":
/*!********************************************************!*\
  !*** ./src/app/component/GroupedProductsItem/index.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GroupedProductsItem_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GroupedProductsItem.container */ "./src/app/component/GroupedProductsItem/GroupedProductsItem.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _GroupedProductsItem_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/ImageZoomPopup/ImageZoomPopup.component.js":
/*!**********************************************************************!*\
  !*** ./src/app/component/ImageZoomPopup/ImageZoomPopup.component.js ***!
  \**********************************************************************/
/*! exports provided: _ImageZoomPopup, ImageZoomPopup, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ImageZoomPopup", function() { return _ImageZoomPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageZoomPopup", function() { return ImageZoomPopup; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _TranslateOnCursorMove__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../TranslateOnCursorMove */ "./src/app/component/TranslateOnCursorMove/index.js");
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _ImageZoomPopup_style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ImageZoomPopup.style */ "./src/app/component/ImageZoomPopup/ImageZoomPopup.style.scss");
/* harmony import */ var _ImageZoomPopup_style__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ImageZoomPopup_style__WEBPACK_IMPORTED_MODULE_4__);
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





/** @namespace Component/ImageZoomPopup/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ImageZoomPopup =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ImageZoomPopup, _Extensible);

  function _ImageZoomPopup() {
    _classCallCheck(this, _ImageZoomPopup);

    return _possibleConstructorReturn(this, _getPrototypeOf(_ImageZoomPopup).apply(this, arguments));
  }

  _createClass(_ImageZoomPopup, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          activeImageId = _this$props.activeImageId;
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ImageZoomPopup"
        },
        /*#__PURE__*/
        _checkBEM(React, _TranslateOnCursorMove__WEBPACK_IMPORTED_MODULE_2__["default"], {
          activeImageId: activeImageId
        }, children))
      );
    }
  }]);

  return _ImageZoomPopup;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ImageZoomPopup, 'name', {
  value: 'ImageZoomPopup'
});

var ImageZoomPopup = middleware(_ImageZoomPopup, "Component/ImageZoomPopup/Component");

_defineProperty(ImageZoomPopup, "propTypes", {
  children: _type_Common__WEBPACK_IMPORTED_MODULE_3__["ChildrenType"].isRequired,
  activeImageId: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (ImageZoomPopup);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ImageZoomPopup/ImageZoomPopup.container.js":
/*!**********************************************************************!*\
  !*** ./src/app/component/ImageZoomPopup/ImageZoomPopup.container.js ***!
  \**********************************************************************/
/*! exports provided: mapStateToProps, mapDispatchToProps, _ImageZoomPopupContainer, ImageZoomPopupContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ImageZoomPopupContainer", function() { return _ImageZoomPopupContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageZoomPopupContainer", function() { return ImageZoomPopupContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _Popup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Popup */ "./src/app/component/Popup/index.js");
/* harmony import */ var _store_Overlay_Overlay_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/Overlay/Overlay.action */ "./src/app/store/Overlay/Overlay.action.js");
/* harmony import */ var _store_Popup_Popup_action__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store/Popup/Popup.action */ "./src/app/store/Popup/Popup.action.js");
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _ImageZoomPopup_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ImageZoomPopup.component */ "./src/app/component/ImageZoomPopup/ImageZoomPopup.component.js");
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








/** @namespace Component/ImageZoomPopup/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    isMobile: state.ConfigReducer.device.isMobile
  };
}, "Component/ImageZoomPopup/Container/mapStateToProps");
/** @namespace Component/ImageZoomPopup/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    showPopup: function showPopup(id, payload) {
      return dispatch(Object(_store_Popup_Popup_action__WEBPACK_IMPORTED_MODULE_5__["showPopup"])(id, payload));
    },
    hideActiveOverlay: function hideActiveOverlay() {
      return dispatch(Object(_store_Overlay_Overlay_action__WEBPACK_IMPORTED_MODULE_4__["hideActiveOverlay"])());
    }
  };
}, "Component/ImageZoomPopup/Container/mapDispatchToProps");
/** @namespace Component/MyAccountAddressBook/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ImageZoomPopupContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ImageZoomPopupContainer, _Extensible);

  function _ImageZoomPopupContainer() {
    _classCallCheck(this, _ImageZoomPopupContainer);

    return _possibleConstructorReturn(this, _getPrototypeOf(_ImageZoomPopupContainer).apply(this, arguments));
  }

  _createClass(_ImageZoomPopupContainer, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var prevIsActive = prevProps.isActive,
          popupId = prevProps.popupId;
      var _this$props = this.props,
          isActive = _this$props.isActive,
          showPopup = _this$props.showPopup;

      if (prevIsActive !== isActive && isActive) {
        showPopup(popupId, {});
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          isActive = _this$props2.isActive,
          children = _this$props2.children,
          mix = _this$props2.mix,
          popupId = _this$props2.popupId,
          isMobile = _this$props2.isMobile,
          onClose = _this$props2.onClose;

      if (!isActive || isMobile) {
        return children;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, _Popup__WEBPACK_IMPORTED_MODULE_3__["default"], {
          id: popupId,
          clickOutside: false,
          mix: {
            block: 'ImageZoomPopup',
            mix: mix
          },
          contentMix: {
            block: 'ImageZoomPopup',
            elem: 'PopupContent'
          },
          onClose: onClose
        },
        /*#__PURE__*/
        _checkBEM(React, _ImageZoomPopup_component__WEBPACK_IMPORTED_MODULE_7__["default"], this.props))
      );
    }
  }]);

  return _ImageZoomPopupContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ImageZoomPopupContainer, 'name', {
  value: 'ImageZoomPopupContainer'
});

var ImageZoomPopupContainer = middleware(_ImageZoomPopupContainer, "Component/MyAccountAddressBook/Container");

_defineProperty(ImageZoomPopupContainer, "propTypes", {
  children: _type_Common__WEBPACK_IMPORTED_MODULE_6__["ChildrenType"].isRequired,
  showPopup: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  hideActiveOverlay: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  onClose: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  popupId: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  isActive: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  isMobile: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  mix: _type_Common__WEBPACK_IMPORTED_MODULE_6__["MixType"]
});

_defineProperty(ImageZoomPopupContainer, "defaultProps", {
  onClose: function onClose() {},
  mix: {}
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(ImageZoomPopupContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/ImageZoomPopup/ImageZoomPopup.style.scss":
/*!********************************************************************!*\
  !*** ./src/app/component/ImageZoomPopup/ImageZoomPopup.style.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340899
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ImageZoomPopup/index.js":
/*!***************************************************!*\
  !*** ./src/app/component/ImageZoomPopup/index.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ImageZoomPopup_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ImageZoomPopup.container */ "./src/app/component/ImageZoomPopup/ImageZoomPopup.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ImageZoomPopup_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/ProductActions/ProductActions.component.js":
/*!**********************************************************************!*\
  !*** ./src/app/component/ProductActions/ProductActions.component.js ***!
  \**********************************************************************/
/*! exports provided: _ProductActions, ProductActions, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, __, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductActions", function() { return _ProductActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductActions", function() { return ProductActions; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AddToCart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AddToCart */ "./src/app/component/AddToCart/index.js");
/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Field */ "./src/app/component/Field/index.js");
/* harmony import */ var _GroupedProductList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../GroupedProductList */ "./src/app/component/GroupedProductList/index.js");
/* harmony import */ var _Html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Html */ "./src/app/component/Html/index.js");
/* harmony import */ var _ProductBundleItems__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ProductBundleItems */ "./src/app/component/ProductBundleItems/index.js");
/* harmony import */ var _ProductConfigurableAttributes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../ProductConfigurableAttributes */ "./src/app/component/ProductConfigurableAttributes/index.js");
/* harmony import */ var _ProductCustomizableOptions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../ProductCustomizableOptions */ "./src/app/component/ProductCustomizableOptions/index.js");
/* harmony import */ var _ProductPrice__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../ProductPrice */ "./src/app/component/ProductPrice/index.js");
/* harmony import */ var _ProductReviewRating__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../ProductReviewRating */ "./src/app/component/ProductReviewRating/index.js");
/* harmony import */ var _ProductWishlistButton__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../ProductWishlistButton */ "./src/app/component/ProductWishlistButton/index.js");
/* harmony import */ var _TextPlaceholder__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../TextPlaceholder */ "./src/app/component/TextPlaceholder/index.js");
/* harmony import */ var _TierPrices__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../TierPrices */ "./src/app/component/TierPrices/index.js");
/* harmony import */ var _type_Device__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../type/Device */ "./src/app/type/Device.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _util_Product__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../util/Product */ "./src/app/util/Product/index.js");
/* harmony import */ var _ProductActions_style__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./ProductActions.style */ "./src/app/component/ProductActions/ProductActions.style.scss");
/* harmony import */ var _ProductActions_style__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_ProductActions_style__WEBPACK_IMPORTED_MODULE_17__);
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

/* eslint-disable no-restricted-syntax */

/* eslint-disable react/no-array-index-key */
// Disabled due placeholder needs


















/**
 * Product actions
 * @class ProductActions
 * @namespace Component/ProductActions/Component
 */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductActions =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductActions, _Extensible);

  function _ProductActions() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ProductActions);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ProductActions)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "configurableOptionsRef",
    /*#__PURE__*/
    Object(react__WEBPACK_IMPORTED_MODULE_1__["createRef"])());

    _defineProperty(_assertThisInitialized(_this), "groupedProductsRef",
    /*#__PURE__*/
    Object(react__WEBPACK_IMPORTED_MODULE_1__["createRef"])());

    return _this;
  }

  _createClass(_ProductActions, [{
    key: "renderStock",
    value: function renderStock(stockStatus) {
      if (stockStatus === 'OUT_OF_STOCK') {
        return __('Out of stock');
      }

      return __('In stock');
    }
  }, {
    key: "renderSkuAndStock",
    value: function renderSkuAndStock() {
      var _this$props = this.props,
          product = _this$props.product,
          variants = _this$props.product.variants,
          configurableVariantIndex = _this$props.configurableVariantIndex,
          showOnlyIfLoaded = _this$props.showOnlyIfLoaded;
      var productOrVariant = variants && variants[configurableVariantIndex] !== undefined ? variants[configurableVariantIndex] : product;
      var sku = productOrVariant.sku,
          stock_status = productOrVariant.stock_status;
      return (
        /*#__PURE__*/
        _checkBEM(React, "section", {
          block: "ProductActions",
          elem: "Section",
          mods: {
            type: 'sku'
          },
          "aria-label": "Product SKU and availability"
        }, showOnlyIfLoaded(sku,
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null,
        /*#__PURE__*/
        _checkBEM(React, "span", {
          block: "ProductActions",
          elem: "Sku"
        }, "SKU:"),
        /*#__PURE__*/
        _checkBEM(React, "span", {
          block: "ProductActions",
          elem: "Sku",
          itemProp: "sku"
        }, "".concat(sku)),
        /*#__PURE__*/
        _checkBEM(React, "span", {
          block: "ProductActions",
          elem: "Stock"
        }, this.renderStock(stock_status))),
        /*#__PURE__*/
        _checkBEM(React, _TextPlaceholder__WEBPACK_IMPORTED_MODULE_12__["default"], null)))
      );
    }
  }, {
    key: "renderConfigurableAttributes",
    value: function renderConfigurableAttributes() {
      var _this$props2 = this.props,
          getLink = _this$props2.getLink,
          updateConfigurableVariant = _this$props2.updateConfigurableVariant,
          parameters = _this$props2.parameters,
          areDetailsLoaded = _this$props2.areDetailsLoaded,
          _this$props2$product = _this$props2.product,
          configurable_options = _this$props2$product.configurable_options,
          type_id = _this$props2$product.type_id,
          getIsConfigurableAttributeAvailable = _this$props2.getIsConfigurableAttributeAvailable;

      if (type_id !== 'configurable') {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          ref: this.configurableOptionsRef,
          block: "ProductActions",
          elem: "AttributesWrapper"
        },
        /*#__PURE__*/
        _checkBEM(React, _ProductConfigurableAttributes__WEBPACK_IMPORTED_MODULE_7__["default"] // eslint-disable-next-line no-magic-numbers
        , {
          numberOfPlaceholders: [2, 4],
          mix: {
            block: 'ProductActions',
            elem: 'Attributes'
          },
          isReady: areDetailsLoaded,
          getLink: getLink,
          parameters: parameters,
          updateConfigurableVariant: updateConfigurableVariant,
          configurable_options: configurable_options,
          getIsConfigurableAttributeAvailable: getIsConfigurableAttributeAvailable,
          isContentExpanded: true
        }))
      );
    }
  }, {
    key: "renderBundleItems",
    value: function renderBundleItems() {
      var _this$props3 = this.props,
          _this$props3$product = _this$props3.product,
          items = _this$props3$product.items,
          type_id = _this$props3$product.type_id,
          price_range = _this$props3$product.price_range,
          maxQuantity = _this$props3.maxQuantity,
          getSelectedCustomizableOptions = _this$props3.getSelectedCustomizableOptions,
          productOptionsData = _this$props3.productOptionsData,
          setBundlePrice = _this$props3.setBundlePrice;

      if (type_id !== _util_Product__WEBPACK_IMPORTED_MODULE_16__["BUNDLE"]) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "section", {
          block: "ProductActions",
          elem: "Section",
          mods: {
            type: 'bundle_items'
          }
        },
        /*#__PURE__*/
        _checkBEM(React, _ProductBundleItems__WEBPACK_IMPORTED_MODULE_6__["default"], {
          items: items,
          getSelectedCustomizableOptions: getSelectedCustomizableOptions,
          maxQuantity: maxQuantity,
          productOptionsData: productOptionsData,
          setBundlePrice: setBundlePrice,
          price_range: price_range
        }))
      );
    }
  }, {
    key: "renderShortDescriptionContent",
    value: function renderShortDescriptionContent() {
      var short_description = this.props.product.short_description;

      var _ref = short_description || {},
          html = _ref.html;

      var htmlWithItemProp = "<div itemProp=\"description\">".concat(html, "</div>");
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductActions",
          elem: "ShortDescription"
        }, html ?
        /*#__PURE__*/
        _checkBEM(React, _Html__WEBPACK_IMPORTED_MODULE_5__["default"], {
          content: htmlWithItemProp
        }) :
        /*#__PURE__*/
        _checkBEM(React, "p", null,
        /*#__PURE__*/
        _checkBEM(React, _TextPlaceholder__WEBPACK_IMPORTED_MODULE_12__["default"], {
          length: "long"
        })))
      );
    }
  }, {
    key: "renderShortDescription",
    value: function renderShortDescription() {
      var _this$props$product = this.props.product,
          short_description = _this$props$product.short_description,
          id = _this$props$product.id;

      var _ref2 = short_description || {},
          html = _ref2.html;

      if (!html && id) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "section", {
          block: "ProductActions",
          elem: "Section",
          mods: {
            type: 'short'
          },
          "aria-label": "Product short description"
        }, this.renderShortDescriptionContent())
      );
    }
  }, {
    key: "renderNameAndBrand",
    value: function renderNameAndBrand() {
      var _this$props4 = this.props,
          _this$props4$product = _this$props4.product,
          name = _this$props4$product.name,
          _this$props4$product$ = _this$props4$product.attributes;
      _this$props4$product$ = _this$props4$product$ === void 0 ? {} : _this$props4$product$;
      var _this$props4$product$2 = _this$props4$product$.brand;
      _this$props4$product$2 = _this$props4$product$2 === void 0 ? {} : _this$props4$product$2;
      var brand = _this$props4$product$2.attribute_value,
          showOnlyIfLoaded = _this$props4.showOnlyIfLoaded;
      return (
        /*#__PURE__*/
        _checkBEM(React, "section", {
          block: "ProductActions",
          elem: "Section",
          mods: {
            type: 'name'
          }
        }, showOnlyIfLoaded(brand,
        /*#__PURE__*/
        _checkBEM(React, "h4", {
          block: "ProductActions",
          elem: "Brand",
          itemProp: "brand"
        },
        /*#__PURE__*/
        _checkBEM(React, _TextPlaceholder__WEBPACK_IMPORTED_MODULE_12__["default"], {
          content: brand
        }))),
        /*#__PURE__*/
        _checkBEM(React, "h1", {
          block: "ProductActions",
          elem: "Title",
          itemProp: "name"
        },
        /*#__PURE__*/
        _checkBEM(React, _TextPlaceholder__WEBPACK_IMPORTED_MODULE_12__["default"], {
          content: name,
          length: "medium"
        })))
      );
    }
  }, {
    key: "renderCustomizableOptions",
    value: function renderCustomizableOptions() {
      var _this$props5 = this.props,
          options = _this$props5.product.options,
          getSelectedCustomizableOptions = _this$props5.getSelectedCustomizableOptions,
          productOptionsData = _this$props5.productOptionsData,
          device = _this$props5.device;

      if (device.isMobile) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "section", {
          block: "ProductActions",
          elem: "Section",
          mods: {
            type: 'customizable_options'
          }
        },
        /*#__PURE__*/
        _checkBEM(React, _ProductCustomizableOptions__WEBPACK_IMPORTED_MODULE_8__["default"], {
          options: options,
          getSelectedCustomizableOptions: getSelectedCustomizableOptions,
          productOptionsData: productOptionsData
        }))
      );
    }
  }, {
    key: "renderQuantityInput",
    value: function renderQuantityInput() {
      var _this$props6 = this.props,
          quantity = _this$props6.quantity,
          maxQuantity = _this$props6.maxQuantity,
          minQuantity = _this$props6.minQuantity,
          setQuantity = _this$props6.setQuantity,
          type_id = _this$props6.product.type_id;

      if (type_id === _util_Product__WEBPACK_IMPORTED_MODULE_16__["GROUPED"]) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, _Field__WEBPACK_IMPORTED_MODULE_3__["default"], {
          id: "item_qty",
          name: "item_qty",
          type: "number",
          value: quantity,
          max: maxQuantity,
          min: minQuantity,
          mix: {
            block: 'ProductActions',
            elem: 'Qty'
          },
          onChange: setQuantity
        })
      );
    }
  }, {
    key: "renderAddToCart",
    value: function renderAddToCart() {
      var _this$props7 = this.props,
          configurableVariantIndex = _this$props7.configurableVariantIndex,
          product = _this$props7.product,
          quantity = _this$props7.quantity,
          groupedProductQuantity = _this$props7.groupedProductQuantity,
          onProductValidationError = _this$props7.onProductValidationError,
          productOptionsData = _this$props7.productOptionsData;
      return (
        /*#__PURE__*/
        _checkBEM(React, _AddToCart__WEBPACK_IMPORTED_MODULE_2__["default"], {
          product: product,
          configurableVariantIndex: configurableVariantIndex,
          mix: {
            block: 'ProductActions',
            elem: 'AddToCart'
          },
          quantity: quantity,
          groupedProductQuantity: groupedProductQuantity,
          onProductValidationError: onProductValidationError,
          productOptionsData: productOptionsData
        })
      );
    }
  }, {
    key: "renderOfferCount",
    value: function renderOfferCount() {
      var offerCount = this.props.offerCount;

      if (offerCount > 1) {
        return (
          /*#__PURE__*/
          _checkBEM(React, "meta", {
            itemProp: "offerCount",
            content: offerCount
          })
        );
      }

      return null;
    }
  }, {
    key: "renderSchema",
    value: function renderSchema() {
      var _this$props8 = this.props,
          productName = _this$props8.productName,
          stockMeta = _this$props8.stockMeta,
          metaLink = _this$props8.metaLink;
      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null, this.renderOfferCount(),
        /*#__PURE__*/
        _checkBEM(React, "meta", {
          itemProp: "availability",
          content: stockMeta
        }),
        /*#__PURE__*/
        _checkBEM(React, "a", {
          block: "ProductActions",
          elem: "Schema-Url",
          itemProp: "url",
          href: metaLink
        }, productName))
      );
    }
  }, {
    key: "renderConfigurablePriceBadge",
    value: function renderConfigurablePriceBadge() {
      var _this$props9 = this.props,
          configurableVariantIndex = _this$props9.configurableVariantIndex,
          type_id = _this$props9.product.type_id;

      if (type_id !== _util_Product__WEBPACK_IMPORTED_MODULE_16__["CONFIGURABLE"] || configurableVariantIndex > -1) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "p", {
          mix: {
            block: 'ProductActions',
            elem: 'ConfigurablePriceBadge'
          }
        }, __('As Low as'))
      );
    }
  }, {
    key: "renderPriceWithSchema",
    value: function renderPriceWithSchema() {
      var _this$props10 = this.props,
          productPrice = _this$props10.productPrice,
          offerCount = _this$props10.offerCount;
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductActions",
          elem: "PriceWrapper"
        }, this.renderConfigurablePriceBadge(), this.renderSchema(),
        /*#__PURE__*/
        _checkBEM(React, _ProductPrice__WEBPACK_IMPORTED_MODULE_9__["default"], {
          isSchemaRequired: true,
          variantsCount: offerCount,
          price: productPrice,
          mix: {
            block: 'ProductActions',
            elem: 'Price'
          }
        }))
      );
    }
  }, {
    key: "renderPriceWithGlobalSchema",
    value: function renderPriceWithGlobalSchema() {
      var _this$props11 = this.props,
          offerType = _this$props11.offerType,
          type_id = _this$props11.product.type_id;

      if (type_id === _util_Product__WEBPACK_IMPORTED_MODULE_16__["GROUPED"]) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductActions",
          elem: "Schema",
          itemType: offerType,
          itemProp: "offers",
          itemScope: true
        }, this.renderPriceWithSchema())
      );
    }
  }, {
    key: "renderProductWishlistButton",
    value: function renderProductWishlistButton() {
      var _this$props12 = this.props,
          product = _this$props12.product,
          quantity = _this$props12.quantity,
          configurableVariantIndex = _this$props12.configurableVariantIndex,
          onProductValidationError = _this$props12.onProductValidationError;
      return (
        /*#__PURE__*/
        _checkBEM(React, _ProductWishlistButton__WEBPACK_IMPORTED_MODULE_11__["default"], {
          product: product,
          quantity: quantity,
          configurableVariantIndex: configurableVariantIndex,
          onProductValidationError: onProductValidationError
        })
      );
    }
  }, {
    key: "renderReviews",
    value: function renderReviews() {
      var _this$props$product$r = this.props.product.review_summary;
      _this$props$product$r = _this$props$product$r === void 0 ? {} : _this$props$product$r;
      var rating_summary = _this$props$product$r.rating_summary,
          review_count = _this$props$product$r.review_count;

      if (!rating_summary) {
        return null;
      }

      var ONE_FIFTH_OF_A_HUNDRED = 20;
      var rating = parseFloat(rating_summary / ONE_FIFTH_OF_A_HUNDRED).toFixed(2);
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductActions",
          elem: "Reviews"
        },
        /*#__PURE__*/
        _checkBEM(React, _ProductReviewRating__WEBPACK_IMPORTED_MODULE_10__["default"], {
          summary: rating_summary || 0
        }),
        /*#__PURE__*/
        _checkBEM(React, "p", {
          block: "ProductActions",
          elem: "ReviewLabel"
        }, rating,
        /*#__PURE__*/
        _checkBEM(React, "span", null, __('%s reviews', review_count))))
      );
    }
  }, {
    key: "renderGroupedItems",
    value: function renderGroupedItems() {
      var _this$props13 = this.props,
          product = _this$props13.product,
          type_id = _this$props13.product.type_id,
          groupedProductQuantity = _this$props13.groupedProductQuantity,
          setGroupedProductQuantity = _this$props13.setGroupedProductQuantity,
          clearGroupedProductQuantity = _this$props13.clearGroupedProductQuantity;

      if (type_id !== _util_Product__WEBPACK_IMPORTED_MODULE_16__["GROUPED"]) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductActions",
          elem: "GroupedItems",
          ref: this.groupedProductsRef
        },
        /*#__PURE__*/
        _checkBEM(React, _GroupedProductList__WEBPACK_IMPORTED_MODULE_4__["default"], {
          product: product,
          clearGroupedProductQuantity: clearGroupedProductQuantity,
          groupedProductQuantity: groupedProductQuantity,
          setGroupedProductQuantity: setGroupedProductQuantity
        }))
      );
    }
  }, {
    key: "renderTierPrices",
    value: function renderTierPrices() {
      var productOrVariant = this.props.productOrVariant;
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductActions",
          elem: "TierPrices"
        },
        /*#__PURE__*/
        _checkBEM(React, _TierPrices__WEBPACK_IMPORTED_MODULE_13__["default"], {
          product: productOrVariant
        }))
      );
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "article", {
          block: "ProductActions"
        }, this.renderPriceWithGlobalSchema(), this.renderShortDescription(),
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductActions",
          elem: "AddToCartWrapper",
          mix: {
            block: 'FixedElement',
            elem: 'Bottom'
          }
        }, this.renderQuantityInput(), this.renderAddToCart(), this.renderProductWishlistButton()), this.renderReviews(), this.renderNameAndBrand(), this.renderSkuAndStock(), this.renderConfigurableAttributes(), this.renderCustomizableOptions(), this.renderBundleItems(), this.renderGroupedItems(), this.renderTierPrices())
      );
    }
  }]);

  return _ProductActions;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductActions, 'name', {
  value: 'ProductActions'
});

var ProductActions = middleware(_ProductActions, "Component/ProductActions/Component");

_defineProperty(ProductActions, "propTypes", {
  product: _type_ProductList__WEBPACK_IMPORTED_MODULE_15__["ProductType"].isRequired,
  productOrVariant: _type_ProductList__WEBPACK_IMPORTED_MODULE_15__["ProductType"].isRequired,
  minQuantity: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number.isRequired,
  maxQuantity: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number.isRequired,
  configurableVariantIndex: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  showOnlyIfLoaded: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  quantity: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number.isRequired,
  areDetailsLoaded: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  getLink: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  setQuantity: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  updateConfigurableVariant: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  parameters: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string).isRequired,
  getIsConfigurableAttributeAvailable: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  groupedProductQuantity: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number).isRequired,
  clearGroupedProductQuantity: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  setGroupedProductQuantity: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  onProductValidationError: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  getSelectedCustomizableOptions: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  productOptionsData: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object.isRequired,
  setBundlePrice: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  productPrice: _type_ProductList__WEBPACK_IMPORTED_MODULE_15__["PriceType"],
  productName: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  offerCount: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number.isRequired,
  offerType: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  stockMeta: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  metaLink: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  device: _type_Device__WEBPACK_IMPORTED_MODULE_14__["DeviceType"].isRequired
});

_defineProperty(ProductActions, "defaultProps", {
  configurableVariantIndex: 0,
  productPrice: {},
  productName: ''
});

/* harmony default export */ __webpack_exports__["default"] = (ProductActions);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductActions/ProductActions.config.js":
/*!*******************************************************************!*\
  !*** ./src/app/component/ProductActions/ProductActions.config.js ***!
  \*******************************************************************/
/*! exports provided: DEFAULT_MAX_PRODUCTS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_MAX_PRODUCTS", function() { return DEFAULT_MAX_PRODUCTS; });
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
var DEFAULT_MAX_PRODUCTS = 99;

/***/ }),

/***/ "./src/app/component/ProductActions/ProductActions.container.js":
/*!**********************************************************************!*\
  !*** ./src/app/component/ProductActions/ProductActions.container.js ***!
  \**********************************************************************/
/*! exports provided: mapStateToProps, _ProductActionsContainer, ProductActionsContainer, mapDispatchToProps, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductActionsContainer", function() { return _ProductActionsContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductActionsContainer", function() { return ProductActionsContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _util_Product__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/Product */ "./src/app/util/Product/index.js");
/* harmony import */ var _ProductActions_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ProductActions.component */ "./src/app/component/ProductActions/ProductActions.component.js");
/* harmony import */ var _ProductActions_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ProductActions.config */ "./src/app/component/ProductActions/ProductActions.config.js");
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







/** @namespace Component/ProductActions/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    groupedProductQuantity: state.ProductReducer.groupedProductQuantity,
    device: state.ConfigReducer.device
  };
}, "Component/ProductActions/Container/mapStateToProps");
/** @namespace Component/ProductActions/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductActionsContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductActionsContainer, _Extensible);

  function _ProductActionsContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ProductActionsContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ProductActionsContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      quantity: 1,
      groupedProductQuantity: {}
    });

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      showOnlyIfLoaded: _this.showOnlyIfLoaded.bind(_assertThisInitialized(_this)),
      onProductValidationError: _this.onProductValidationError.bind(_assertThisInitialized(_this)),
      getIsOptionInCurrentVariant: _this.getIsOptionInCurrentVariant.bind(_assertThisInitialized(_this)),
      setQuantity: _this.setQuantity.bind(_assertThisInitialized(_this)),
      setGroupedProductQuantity: _this._setGroupedProductQuantity.bind(_assertThisInitialized(_this)),
      clearGroupedProductQuantity: _this._clearGroupedProductQuantity.bind(_assertThisInitialized(_this)),
      getIsConfigurableAttributeAvailable: _this.getIsConfigurableAttributeAvailable.bind(_assertThisInitialized(_this))
    });

    _defineProperty(_assertThisInitialized(_this), "onConfigurableProductError", _this.onProductError.bind(_assertThisInitialized(_this), _this.configurableOptionsRef));

    _defineProperty(_assertThisInitialized(_this), "onGroupedProductError", _this.onProductError.bind(_assertThisInitialized(_this), _this.groupedProductsRef));

    _defineProperty(_assertThisInitialized(_this), "containerProps", function () {
      return {
        minQuantity: ProductActionsContainer.getMinQuantity(_this.props),
        maxQuantity: ProductActionsContainer.getMaxQuantity(_this.props),
        groupedProductQuantity: _this._getGroupedProductQuantity(),
        productPrice: _this.getProductPrice(),
        productName: _this.getProductName(),
        offerCount: _this.getOfferCount(),
        offerType: _this.getOfferType(),
        stockMeta: _this.getStockMeta(),
        metaLink: _this.getMetaLink()
      };
    });

    return _this;
  }

  _createClass(_ProductActionsContainer, [{
    key: "onProductError",
    value: function onProductError(ref) {
      if (!ref) {
        return;
      }

      var current = ref.current;
      current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      current.classList.remove('animate'); // eslint-disable-next-line no-unused-expressions

      current.offsetWidth; // trigger a DOM reflow

      current.classList.add('animate');
    }
  }, {
    key: "onProductValidationError",
    value: function onProductValidationError(type) {
      switch (type) {
        case _util_Product__WEBPACK_IMPORTED_MODULE_4__["CONFIGURABLE"]:
          this.onConfigurableProductError();
          break;

        case _util_Product__WEBPACK_IMPORTED_MODULE_4__["GROUPED"]:
          this.onGroupedProductError();
          break;

        default:
          break;
      }
    }
  }, {
    key: "setQuantity",
    value: function setQuantity(value) {
      this.setState({
        quantity: +value
      });
    } // TODO: make key=>value based

  }, {
    key: "getIsOptionInCurrentVariant",
    value: function getIsOptionInCurrentVariant(attribute, value) {
      var _this$props = this.props,
          configurableVariantIndex = _this$props.configurableVariantIndex,
          variants = _this$props.product.variants;

      if (!variants) {
        return false;
      }

      return variants[configurableVariantIndex].product[attribute] === value;
    }
  }, {
    key: "getIsConfigurableAttributeAvailable",
    value: function getIsConfigurableAttributeAvailable(_ref) {
      var attribute_code = _ref.attribute_code,
          attribute_value = _ref.attribute_value;
      var _this$props2 = this.props,
          parameters = _this$props2.parameters,
          variants = _this$props2.product.variants;
      var isAttributeSelected = Object.hasOwnProperty.call(parameters, attribute_code); // If value matches current attribute_value, option should be enabled

      if (isAttributeSelected && parameters[attribute_code] === attribute_value) {
        return true;
      }

      var parameterPairs = Object.entries(parameters);
      var selectedAttributes = isAttributeSelected // Need to exclude itself, otherwise different attribute_values of the same attribute_code will always be disabled
      ? parameterPairs.filter(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 1),
            key = _ref3[0];

        return key !== attribute_code;
      }) : parameterPairs;
      return variants.some(function (_ref4) {
        var stock_status = _ref4.stock_status,
            attributes = _ref4.attributes;

        var _ref5 = attributes[attribute_code] || {},
            foundValue = _ref5.attribute_value;

        return stock_status === 'IN_STOCK' // Variant must have currently checked attribute_code and attribute_value
        && foundValue === attribute_value // Variant must have all currently selected attributes
        && selectedAttributes.every(function (_ref6) {
          var _ref7 = _slicedToArray(_ref6, 2),
              key = _ref7[0],
              value = _ref7[1];

          return attributes[key].attribute_value === value;
        });
      });
    }
  }, {
    key: "getProductName",
    value: function getProductName() {
      var _this$props3 = this.props,
          product = _this$props3.product,
          _this$props3$product$ = _this$props3.product.variants,
          variants = _this$props3$product$ === void 0 ? [] : _this$props3$product$,
          configurableVariantIndex = _this$props3.configurableVariantIndex;

      var _ref8 = variants[configurableVariantIndex] || product,
          name = _ref8.name;

      return name;
    }
  }, {
    key: "getMetaLink",
    value: function getMetaLink() {
      var getLink = this.props.getLink;
      return window.location.origin + getLink().replace(/\?.*/, '');
    }
  }, {
    key: "getStockMeta",
    value: function getStockMeta() {
      var _this$props4 = this.props,
          product = _this$props4.product,
          _this$props4$product$ = _this$props4.product.variants,
          variants = _this$props4$product$ === void 0 ? [] : _this$props4$product$,
          configurableVariantIndex = _this$props4.configurableVariantIndex;

      var _ref9 = variants[configurableVariantIndex] || product,
          stock_status = _ref9.stock_status;

      if (stock_status === 'OUT_OF_STOCK') {
        return 'https://schema.org/OutOfStock';
      }

      return 'https://schema.org/InStock';
    }
  }, {
    key: "getOfferType",
    value: function getOfferType() {
      var variants = this.props.product.variants;

      if (variants && variants.length >= 1) {
        return 'https://schema.org/AggregateOffer';
      }

      return 'https://schema.org/Offer';
    }
  }, {
    key: "getOfferCount",
    value: function getOfferCount() {
      var variants = this.props.product.variants;

      if (variants && variants.length) {
        return variants.length;
      }

      return 0;
    }
  }, {
    key: "getProductPrice",
    value: function getProductPrice() {
      var _this$props5 = this.props,
          product = _this$props5.product,
          _this$props5$product = _this$props5.product,
          _this$props5$product$ = _this$props5$product.variants,
          variants = _this$props5$product$ === void 0 ? [] : _this$props5$product$,
          type_id = _this$props5$product.type_id,
          configurableVariantIndex = _this$props5.configurableVariantIndex,
          selectedBundlePrice = _this$props5.selectedBundlePrice;

      var _ref10 = variants[configurableVariantIndex] || product,
          price_range = _ref10.price_range;

      if (type_id === _util_Product__WEBPACK_IMPORTED_MODULE_4__["BUNDLE"]) {
        var _product$price_range$ = product.price_range.minimum_price,
            currency = _product$price_range$.regular_price.currency,
            percent_off = _product$price_range$.discount.percent_off; // eslint-disable-next-line no-magic-numbers

        var finalBundlePrice = selectedBundlePrice - selectedBundlePrice * (percent_off / 100);
        var priceValue = {
          value: finalBundlePrice,
          currency: currency
        };
        return {
          minimum_price: {
            final_price: priceValue,
            regular_price: priceValue
          }
        };
      }

      return price_range;
    }
  }, {
    key: "_getGroupedProductQuantity",
    value: function _getGroupedProductQuantity() {
      var groupedProductQuantity = this.state.groupedProductQuantity;
      return groupedProductQuantity;
    }
  }, {
    key: "_setGroupedProductQuantity",
    value: function _setGroupedProductQuantity(id, value) {
      this.setState(function (_ref11) {
        var groupedProductQuantity = _ref11.groupedProductQuantity;
        return {
          groupedProductQuantity: _objectSpread2(_objectSpread2({}, groupedProductQuantity), {}, _defineProperty({}, id, value))
        };
      });
    }
  }, {
    key: "_clearGroupedProductQuantity",
    value: function _clearGroupedProductQuantity() {
      this.setState({
        groupedProductQuantity: {}
      });
    }
  }, {
    key: "showOnlyIfLoaded",
    value: function showOnlyIfLoaded(expression, content) {
      var placeholder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : content;
      var areDetailsLoaded = this.props.areDetailsLoaded;

      if (!areDetailsLoaded) {
        return placeholder;
      }

      if (areDetailsLoaded && !expression) {
        return null;
      }

      return content;
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _ProductActions_component__WEBPACK_IMPORTED_MODULE_5__["default"], _extends({}, this.props, this.state, this.containerProps(), this.containerFunctions))
      );
    }
  }], [{
    key: "getMinQuantity",
    value: function getMinQuantity(props) {
      var _props$product = props.product;
      _props$product = _props$product === void 0 ? {} : _props$product;
      var _props$product$stock_ = _props$product.stock_item;
      _props$product$stock_ = _props$product$stock_ === void 0 ? {} : _props$product$stock_;
      var min_sale_qty = _props$product$stock_.min_sale_qty,
          variants = _props$product.variants,
          configurableVariantIndex = props.configurableVariantIndex;

      if (!min_sale_qty) {
        return 1;
      }

      if (!configurableVariantIndex && !variants) {
        return min_sale_qty;
      }

      var _ref12 = variants[configurableVariantIndex] || {},
          _ref12$stock_item = _ref12.stock_item;

      _ref12$stock_item = _ref12$stock_item === void 0 ? {} : _ref12$stock_item;
      var minVariantQty = _ref12$stock_item.min_sale_qty;
      return minVariantQty || min_sale_qty;
    }
  }, {
    key: "getMaxQuantity",
    value: function getMaxQuantity(props) {
      var _props$product2 = props.product;
      _props$product2 = _props$product2 === void 0 ? {} : _props$product2;
      var _props$product2$stock = _props$product2.stock_item;
      _props$product2$stock = _props$product2$stock === void 0 ? {} : _props$product2$stock;
      var max_sale_qty = _props$product2$stock.max_sale_qty,
          variants = _props$product2.variants,
          configurableVariantIndex = props.configurableVariantIndex;

      if (!max_sale_qty) {
        return _ProductActions_config__WEBPACK_IMPORTED_MODULE_6__["DEFAULT_MAX_PRODUCTS"];
      }

      if (configurableVariantIndex === -1 || !Object.keys(variants).length) {
        return max_sale_qty;
      }

      var _ref13 = variants[configurableVariantIndex] || {},
          _ref13$stock_item = _ref13.stock_item;

      _ref13$stock_item = _ref13$stock_item === void 0 ? {} : _ref13$stock_item;
      var maxVariantQty = _ref13$stock_item.max_sale_qty;
      return maxVariantQty || max_sale_qty;
    }
  }, {
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var quantity = state.quantity;
      var minQty = ProductActionsContainer.getMinQuantity(props);
      var maxQty = ProductActionsContainer.getMaxQuantity(props);

      if (quantity < minQty) {
        return {
          quantity: minQty
        };
      }

      if (quantity > maxQty) {
        return {
          quantity: maxQty
        };
      }

      return null;
    }
  }]);

  return _ProductActionsContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/** @namespace Component/ProductActions/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars

Object.defineProperty(_ProductActionsContainer, 'name', {
  value: 'ProductActionsContainer'
});

var ProductActionsContainer = middleware(_ProductActionsContainer, "Component/ProductActions/Container");

_defineProperty(ProductActionsContainer, "propTypes", {
  product: _type_ProductList__WEBPACK_IMPORTED_MODULE_3__["ProductType"].isRequired,
  productOrVariant: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object.isRequired,
  configurableVariantIndex: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number.isRequired,
  areDetailsLoaded: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  parameters: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string).isRequired,
  selectedBundlePrice: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number.isRequired,
  getLink: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

var mapDispatchToProps = middleware(function (dispatch) {
  return {};
}, "Component/ProductActions/Container/mapDispatchToProps");
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(ProductActionsContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/ProductActions/ProductActions.style.scss":
/*!********************************************************************!*\
  !*** ./src/app/component/ProductActions/ProductActions.style.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340439
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ProductActions/index.js":
/*!***************************************************!*\
  !*** ./src/app/component/ProductActions/index.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProductActions_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductActions.container */ "./src/app/component/ProductActions/ProductActions.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ProductActions_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/ProductAttributes/ProductAttributes.component.js":
/*!****************************************************************************!*\
  !*** ./src/app/component/ProductAttributes/ProductAttributes.component.js ***!
  \****************************************************************************/
/*! exports provided: _ProductAttributes, ProductAttributes, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductAttributes", function() { return _ProductAttributes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductAttributes", function() { return ProductAttributes; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ContentWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ContentWrapper */ "./src/app/component/ContentWrapper/index.js");
/* harmony import */ var _ExpandableContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ExpandableContent */ "./src/app/component/ExpandableContent/index.js");
/* harmony import */ var _ProductAttributeValue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ProductAttributeValue */ "./src/app/component/ProductAttributeValue/index.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _ProductAttributes_style__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ProductAttributes.style */ "./src/app/component/ProductAttributes/ProductAttributes.style.scss");
/* harmony import */ var _ProductAttributes_style__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_ProductAttributes_style__WEBPACK_IMPORTED_MODULE_6__);
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







/** @namespace Component/ProductAttributes/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductAttributes =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductAttributes, _Extensible);

  function _ProductAttributes() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ProductAttributes);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ProductAttributes)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "renderAttribute", function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          attributeLabel = _ref2[0],
          valueLabel = _ref2[1];

      return (
        /*#__PURE__*/
        _checkBEM(React, react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], {
          key: attributeLabel
        },
        /*#__PURE__*/
        _checkBEM(React, "dt", {
          block: "ProductAttributes",
          elem: "AttributeLabel"
        }, attributeLabel),
        /*#__PURE__*/
        _checkBEM(React, "dd", {
          block: "ProductAttributes",
          elem: "ValueLabel"
        },
        /*#__PURE__*/
        _checkBEM(React, _ProductAttributeValue__WEBPACK_IMPORTED_MODULE_4__["default"], {
          key: attributeLabel,
          attribute: valueLabel,
          isFormattedAsText: true
        })))
      );
    });

    return _this;
  }

  _createClass(_ProductAttributes, [{
    key: "renderAttributes",
    value: function renderAttributes() {
      var attributesWithValues = this.props.attributesWithValues;

      if (!Object.keys(attributesWithValues).length) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "dl", {
          block: "ProductAttributes",
          elem: "Attributes"
        }, Object.entries(attributesWithValues).map(this.renderAttribute))
      );
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var areDetailsLoaded = this.props.areDetailsLoaded;
      var heading = areDetailsLoaded ? __('Product attributes') : '';
      return (
        /*#__PURE__*/
        _checkBEM(React, _ExpandableContent__WEBPACK_IMPORTED_MODULE_3__["default"] // show placeholder if the details are not loaded
        , {
          heading: heading,
          mix: {
            block: 'ProductAttributes',
            elem: 'Content'
          }
        }, this.renderAttributes())
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          areDetailsLoaded = _this$props.areDetailsLoaded,
          _this$props$product$d = _this$props.product.description;
      _this$props$product$d = _this$props$product$d === void 0 ? {} : _this$props$product$d;
      var html = _this$props$product$d.html;

      if (!html && areDetailsLoaded) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, _ContentWrapper__WEBPACK_IMPORTED_MODULE_2__["default"], {
          label: "Product attributes",
          mix: {
            block: 'ProductAttributes'
          },
          wrapperMix: {
            block: 'ProductAttributes',
            elem: 'Wrapper'
          }
        }, this.renderContent())
      );
    }
  }]);

  return _ProductAttributes;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductAttributes, 'name', {
  value: 'ProductAttributes'
});

var ProductAttributes = middleware(_ProductAttributes, "Component/ProductAttributes/Component");

_defineProperty(ProductAttributes, "propTypes", {
  product: _type_ProductList__WEBPACK_IMPORTED_MODULE_5__["ProductType"].isRequired,
  areDetailsLoaded: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  attributesWithValues: _type_ProductList__WEBPACK_IMPORTED_MODULE_5__["AttributeType"].isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (ProductAttributes);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductAttributes/ProductAttributes.container.js":
/*!****************************************************************************!*\
  !*** ./src/app/component/ProductAttributes/ProductAttributes.container.js ***!
  \****************************************************************************/
/*! exports provided: _ProductAttributesContainer, ProductAttributesContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductAttributesContainer", function() { return _ProductAttributesContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductAttributesContainer", function() { return ProductAttributesContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _ProductAttributes_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ProductAttributes.component */ "./src/app/component/ProductAttributes/ProductAttributes.component.js");
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



/** @namespace Component/ProductAttributes/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductAttributesContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductAttributesContainer, _Extensible);

  function _ProductAttributesContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ProductAttributesContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ProductAttributesContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerProps", function () {
      return {
        attributesWithValues: _this._getAttributesWithValues()
      };
    });

    return _this;
  }

  _createClass(_ProductAttributesContainer, [{
    key: "_getAttributesWithValues",
    value: function _getAttributesWithValues() {
      var _this$props$product = this.props.product,
          _this$props$product$a = _this$props$product.attributes,
          attributes = _this$props$product$a === void 0 ? {} : _this$props$product$a,
          _this$props$product$p = _this$props$product.parameters,
          parameters = _this$props$product$p === void 0 ? {} : _this$props$product$p;
      var allAttribsWithValues = Object.entries(attributes).reduce(function (acc, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            val = _ref2[1];

        var attribute_label = val.attribute_label,
            attribute_value = val.attribute_value;

        if (attribute_value) {
          return _objectSpread2(_objectSpread2({}, acc), {}, _defineProperty({}, attribute_label, val));
        }

        var valueIndexFromParameter = parameters[key];

        if (valueIndexFromParameter) {
          return _objectSpread2(_objectSpread2({}, acc), {}, _defineProperty({}, attribute_label, _objectSpread2(_objectSpread2({}, val), {}, {
            attribute_value: valueIndexFromParameter
          })));
        }

        return acc;
      }, {});
      return allAttribsWithValues;
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _ProductAttributes_component__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({}, this.props, this.containerProps()))
      );
    }
  }]);

  return _ProductAttributesContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]));
Object.defineProperty(_ProductAttributesContainer, 'name', {
  value: 'ProductAttributesContainer'
});

var ProductAttributesContainer = middleware(_ProductAttributesContainer, "Component/ProductAttributes/Container");

_defineProperty(ProductAttributesContainer, "propTypes", {
  product: _type_ProductList__WEBPACK_IMPORTED_MODULE_1__["ProductType"].isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (ProductAttributesContainer);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductAttributes/ProductAttributes.style.scss":
/*!**************************************************************************!*\
  !*** ./src/app/component/ProductAttributes/ProductAttributes.style.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340386
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ProductAttributes/index.js":
/*!******************************************************!*\
  !*** ./src/app/component/ProductAttributes/index.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProductAttributes_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductAttributes.container */ "./src/app/component/ProductAttributes/ProductAttributes.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ProductAttributes_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/ProductBundleItem/ProductBundleItem.component.js":
/*!****************************************************************************!*\
  !*** ./src/app/component/ProductBundleItem/ProductBundleItem.component.js ***!
  \****************************************************************************/
/*! exports provided: _ProductBundleItem, ProductBundleItem, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductBundleItem", function() { return _ProductBundleItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductBundleItem", function() { return ProductBundleItem; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Field */ "./src/app/component/Field/index.js");
/* harmony import */ var _ProductCustomizableOption_ProductCustomizableOption_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ProductCustomizableOption/ProductCustomizableOption.component */ "./src/app/component/ProductCustomizableOption/ProductCustomizableOption.component.js");
/* harmony import */ var _ProductBundleItem_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ProductBundleItem.config */ "./src/app/component/ProductBundleItem/ProductBundleItem.config.js");
/* harmony import */ var _ProductBundleItem_style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ProductBundleItem.style */ "./src/app/component/ProductBundleItem/ProductBundleItem.style.scss");
/* harmony import */ var _ProductBundleItem_style__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ProductBundleItem_style__WEBPACK_IMPORTED_MODULE_4__);
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





/** @namespace Component/ProductBundleItem/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductBundleItem =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductBundleItem, _Extensible);

  function _ProductBundleItem() {
    var _getPrototypeOf2, _defineProperty2;

    var _this;

    _classCallCheck(this, _ProductBundleItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ProductBundleItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "renderMap", (_defineProperty2 = {}, _defineProperty(_defineProperty2, _ProductBundleItem_config__WEBPACK_IMPORTED_MODULE_3__["CHECKBOX"], _this.renderCheckboxValues.bind(_assertThisInitialized(_this))), _defineProperty(_defineProperty2, _ProductBundleItem_config__WEBPACK_IMPORTED_MODULE_3__["MULTI"], _this.renderCheckboxValues.bind(_assertThisInitialized(_this))), _defineProperty(_defineProperty2, _ProductBundleItem_config__WEBPACK_IMPORTED_MODULE_3__["RADIO"], _this.renderDropdownValues.bind(_assertThisInitialized(_this))), _defineProperty(_defineProperty2, _ProductBundleItem_config__WEBPACK_IMPORTED_MODULE_3__["SELECT"], _this.renderDropdownValues.bind(_assertThisInitialized(_this))), _defineProperty2));

    _defineProperty(_assertThisInitialized(_this), "renderOptionCheckboxValue", function (item) {
      var _this$props = _this.props,
          getSelectedCheckboxValue = _this$props.getSelectedCheckboxValue,
          renderOptionLabel = _this$props.renderOptionLabel;
      var id = item.id,
          label = item.label,
          value = item.product.price_range.minimum_price.regular_price.value,
          price_type = item.price_type,
          quantity = item.quantity,
          is_default = item.is_default;
      var priceLabel = renderOptionLabel(price_type, value);
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          key: id
        },
        /*#__PURE__*/
        _checkBEM(React, _Field__WEBPACK_IMPORTED_MODULE_1__["default"], {
          type: "checkbox",
          label: _this.renderHeading(label, priceLabel, quantity),
          id: "option-".concat(id),
          name: "option-".concat(id),
          value: id,
          checked: is_default,
          onChange: getSelectedCheckboxValue
        }))
      );
    });

    _defineProperty(_assertThisInitialized(_this), "renderQtyInput", function (item) {
      var _this$props2 = _this.props,
          selectedDropdownValue = _this$props2.selectedDropdownValue,
          setDropdownItemQuantity = _this$props2.setDropdownItemQuantity,
          maxQuantity = _this$props2.maxQuantity;
      var id = item.id,
          quantity = item.quantity,
          can_change_quantity = item.can_change_quantity;

      if (id !== selectedDropdownValue || !can_change_quantity) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, _Field__WEBPACK_IMPORTED_MODULE_1__["default"], {
          key: id,
          id: "item_qty",
          name: "item_qty",
          type: "number",
          value: quantity,
          max: maxQuantity,
          min: 1,
          mix: {
            block: 'ProductBundleItems',
            elem: 'Qty'
          },
          onChange: setDropdownItemQuantity
        })
      );
    });

    return _this;
  }

  _createClass(_ProductBundleItem, [{
    key: "renderHeading",
    value: function renderHeading(mainTitle, titleBold, quantity) {
      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null,
        /*#__PURE__*/
        _checkBEM(React, "span", {
          block: "ProductBundleItem",
          elem: "Heading"
        }, "".concat(quantity, " x ").concat(mainTitle, " + ")),
        /*#__PURE__*/
        _checkBEM(React, "span", {
          block: "ProductBundleItem",
          elem: "HeadingBold"
        }, titleBold))
      );
    }
  }, {
    key: "renderOptionDropdownValues",
    value: function renderOptionDropdownValues(values) {
      var _this$props3 = this.props,
          options = _this$props3.option.options,
          getDropdownOptions = _this$props3.getDropdownOptions,
          selectedDropdownValue = _this$props3.selectedDropdownValue,
          setDropdownValue = _this$props3.setDropdownValue;
      var dropdownOptions = getDropdownOptions(values);
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductBundleItem",
          elem: "DropdownWrapper"
        },
        /*#__PURE__*/
        _checkBEM(React, _Field__WEBPACK_IMPORTED_MODULE_1__["default"], {
          id: "bundle-options-dropdown",
          name: "bundle-options-dropdown",
          type: "select",
          mix: {
            block: 'ProductBundleItem',
            elem: 'Select'
          },
          placeholder: __('Choose Option'),
          selectOptions: dropdownOptions,
          value: selectedDropdownValue,
          onChange: setDropdownValue
        }), options.map(this.renderQtyInput))
      );
    }
  }, {
    key: "renderCheckboxValues",
    value: function renderCheckboxValues() {
      var _this$props$option = this.props.option,
          required = _this$props$option.required,
          options = _this$props$option.options;
      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null, options.map(this.renderOptionCheckboxValue), this.renderRequired(required))
      );
    }
  }, {
    key: "renderDropdownValues",
    value: function renderDropdownValues() {
      var _this$props$option2 = this.props.option,
          required = _this$props$option2.required,
          options = _this$props$option2.options;
      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null, this.renderOptionDropdownValues(options), this.renderRequired(required))
      );
    }
  }, {
    key: "render",
    value: function render() {
      var optionType = this.props.optionType;
      var render = this.renderMap[optionType];

      if (!render) {
        return null;
      }

      var title = this.props.option.title;
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductBundleItem",
          elem: "Wrapper"
        },
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductBundleItem",
          elem: "Title"
        }, title), render())
      );
    }
  }]);

  return _ProductBundleItem;
}(Extensible(_ProductCustomizableOption_ProductCustomizableOption_component__WEBPACK_IMPORTED_MODULE_2__["default"]));
Object.defineProperty(_ProductBundleItem, 'name', {
  value: 'ProductBundleItem'
});

var ProductBundleItem = middleware(_ProductBundleItem, "Component/ProductBundleItem/Component");

_defineProperty(ProductBundleItem, "propTypes", _objectSpread2(_objectSpread2({}, _ProductCustomizableOption_ProductCustomizableOption_component__WEBPACK_IMPORTED_MODULE_2__["default"].propTypes), {}, {
  maxQuantity: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number.isRequired,
  setDropdownItemQuantity: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
}));

/* harmony default export */ __webpack_exports__["default"] = (ProductBundleItem);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductBundleItem/ProductBundleItem.config.js":
/*!*************************************************************************!*\
  !*** ./src/app/component/ProductBundleItem/ProductBundleItem.config.js ***!
  \*************************************************************************/
/*! exports provided: CHECKBOX, MULTI, SELECT, RADIO */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHECKBOX", function() { return CHECKBOX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MULTI", function() { return MULTI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SELECT", function() { return SELECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RADIO", function() { return RADIO; });
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
var CHECKBOX = 'checkbox';
var MULTI = 'multi';
var SELECT = 'select';
var RADIO = 'radio';

/***/ }),

/***/ "./src/app/component/ProductBundleItem/ProductBundleItem.container.js":
/*!****************************************************************************!*\
  !*** ./src/app/component/ProductBundleItem/ProductBundleItem.container.js ***!
  \****************************************************************************/
/*! exports provided: _ProductBundleItemContainer, ProductBundleItemContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductBundleItemContainer", function() { return _ProductBundleItemContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductBundleItemContainer", function() { return ProductBundleItemContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ProductCustomizableOption_ProductCustomizableOption_container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ProductCustomizableOption/ProductCustomizableOption.container */ "./src/app/component/ProductCustomizableOption/ProductCustomizableOption.container.js");
/* harmony import */ var _ProductBundleItem_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ProductBundleItem.component */ "./src/app/component/ProductBundleItem/ProductBundleItem.component.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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



/** @namespace Component/ProductBundleItem/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductBundleItemContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductBundleItemContainer, _Extensible);

  function _ProductBundleItemContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ProductBundleItemContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ProductBundleItemContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", _objectSpread2(_objectSpread2({}, _this.containerFunctions), {}, {
      setDropdownItemQuantity: _this.setDropdownItemQuantity.bind(_assertThisInitialized(_this))
    }));

    return _this;
  }

  _createClass(_ProductBundleItemContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getDefaultValues();
    }
  }, {
    key: "getDefaultValues",
    value: function getDefaultValues() {
      var _this$containerProps = this.containerProps(),
          optionType = _this$containerProps.optionType;

      switch (optionType) {
        case 'select':
        case 'radio':
          // handle radio as select
          this.setDefaultDropdownValue();
          break;

        case 'checkbox':
        case 'multi':
          // handle multi-select as checkbox
          this.setDefaultCheckboxValue();
          break;

        default:
          return null;
      }

      return null;
    }
  }, {
    key: "setDefaultDropdownValue",
    value: function setDefaultDropdownValue() {
      var _this2 = this;

      var _this$props = this.props,
          setSelectedDropdownValue = _this$props.setSelectedDropdownValue,
          _this$props$option = _this$props.option,
          option_id = _this$props$option.option_id,
          options = _this$props$option.options;
      return options.reduce(function (acc, _ref) {
        var is_default = _ref.is_default,
            id = _ref.id,
            quantity = _ref.quantity;

        if (is_default) {
          var value = id.toString();
          setSelectedDropdownValue(option_id, {
            value: value,
            quantity: quantity
          });

          _this2.setState({
            selectedDropdownValue: id
          });
        }

        return acc;
      }, []);
    }
  }, {
    key: "setDefaultCheckboxValue",
    value: function setDefaultCheckboxValue() {
      var _this$props2 = this.props,
          _this$props2$option = _this$props2.option,
          option_id = _this$props2$option.option_id,
          options = _this$props2$option.options,
          setSelectedCheckboxValues = _this$props2.setSelectedCheckboxValues;
      return options.reduce(function (acc, _ref2) {
        var is_default = _ref2.is_default,
            id = _ref2.id,
            quantity = _ref2.quantity;

        if (is_default) {
          var value = id.toString();
          setSelectedCheckboxValues(option_id, {
            value: value,
            quantity: quantity
          });
        }

        return acc;
      }, []);
    }
  }, {
    key: "getIsRequiredSelected",
    value: function getIsRequiredSelected() {
      var _this$props3 = this.props,
          productOptionsData = _this$props3.productOptionsData,
          _this$props3$productO = _this$props3.productOptionsData,
          requiredOptions = _this$props3$productO.requiredOptions,
          productOptions = _this$props3$productO.productOptions,
          productOptionsMulti = _this$props3$productO.productOptionsMulti,
          option_id = _this$props3.option.option_id;

      if (Object.keys(productOptionsData).length < 1 || !requiredOptions) {
        return true;
      }

      var selectedItems = [].concat(_toConsumableArray(productOptions || []), _toConsumableArray(productOptionsMulti || []));
      var isRequired = requiredOptions.reduce(function (acc, item) {
        if (item === option_id) {
          acc.push(item);
        }

        return acc;
      }, []);

      if (!isRequired.length) {
        return true;
      }

      var isRequiredSelected = selectedItems.reduce(function (acc, _ref3) {
        var id = _ref3.id;

        if (isRequired[0] === id) {
          acc.push(id);
        }

        return acc;
      }, []);
      return !!isRequiredSelected.length;
    }
  }, {
    key: "getSelectedCheckboxValue",
    value: function getSelectedCheckboxValue(value) {
      var _this$props4 = this.props,
          option_id = _this$props4.option.option_id,
          setSelectedCheckboxValues = _this$props4.setSelectedCheckboxValues;
      var selectedValue = this.getSelectedOptionData(value);
      setSelectedCheckboxValues(option_id, selectedValue);
    }
  }, {
    key: "setDropdownItemQuantity",
    value: function setDropdownItemQuantity(quantity) {
      var _this$props5 = this.props,
          setSelectedDropdownValue = _this$props5.setSelectedDropdownValue,
          option_id = _this$props5.option.option_id;
      var selectedDropdownValue = this.state.selectedDropdownValue;
      var value = selectedDropdownValue.toString();
      var selectedValue = {
        value: value,
        quantity: quantity
      };
      setSelectedDropdownValue(option_id, selectedValue);
    }
  }, {
    key: "setDropdownValue",
    value: function setDropdownValue(value) {
      var _this$props6 = this.props,
          setSelectedDropdownValue = _this$props6.setSelectedDropdownValue,
          option = _this$props6.option,
          option_id = _this$props6.option.option_id;
      var selectedDropdownValue = this.state.selectedDropdownValue;

      if (selectedDropdownValue === value) {
        setSelectedDropdownValue(null, option);
        this.setState({
          selectedDropdownValue: 0
        });
      } else {
        this.setState({
          selectedDropdownValue: parseInt(value, 10)
        });
        var selectedValue = this.getSelectedOptionData(value.toString());
        setSelectedDropdownValue(option_id, selectedValue);
      }
    }
  }, {
    key: "getSelectedOptionData",
    value: function getSelectedOptionData(optionId) {
      var options = this.props.option.options;
      return options.reduce(function (parameters, _ref4) {
        var id = _ref4.id,
            quantity = _ref4.quantity;
        var value = id.toString();

        if (optionId === value) {
          return {
            value: value,
            quantity: quantity
          };
        }

        return parameters;
      }, {});
    }
  }, {
    key: "getDropdownOptions",
    value: function getDropdownOptions(values) {
      var _this3 = this;

      return values.reduce(function (acc, _ref5) {
        var id = _ref5.id,
            label = _ref5.label,
            price_type = _ref5.price_type,
            quantity = _ref5.quantity,
            can_change_quantity = _ref5.can_change_quantity,
            value = _ref5.product.price_range.minimum_price.regular_price.value;
        var percent_off = _this3.props.price_range.minimum_price.discount.percent_off; // eslint-disable-next-line no-magic-numbers

        var finalPrice = value - value * (percent_off / 100);
        var dropdownLabel = !can_change_quantity ? "".concat(quantity, " x ").concat(label, " + ").concat(_this3.renderOptionLabel(price_type, finalPrice)) : "".concat(label, " + ").concat(_this3.renderOptionLabel(price_type, finalPrice));
        acc.push({
          id: id,
          name: label,
          value: id,
          label: dropdownLabel
        });
        return acc;
      }, []);
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _ProductBundleItem_component__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({}, this.props, this.state, this.containerFunctions, this.containerProps()))
      );
    }
  }]);

  return _ProductBundleItemContainer;
}(Extensible(_ProductCustomizableOption_ProductCustomizableOption_container__WEBPACK_IMPORTED_MODULE_1__["default"]));
Object.defineProperty(_ProductBundleItemContainer, 'name', {
  value: 'ProductBundleItemContainer'
});

var ProductBundleItemContainer = middleware(_ProductBundleItemContainer, "Component/ProductBundleItem/Container");

_defineProperty(ProductBundleItemContainer, "propTypes", _objectSpread2(_objectSpread2({}, _ProductCustomizableOption_ProductCustomizableOption_container__WEBPACK_IMPORTED_MODULE_1__["default"].propTypes), {}, {
  setCustomizableOptionTextFieldValue: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  updateQuantity: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
}));

_defineProperty(ProductBundleItemContainer, "defaultProps", _objectSpread2(_objectSpread2({}, _ProductCustomizableOption_ProductCustomizableOption_container__WEBPACK_IMPORTED_MODULE_1__["default"].defaultProps), {}, {
  setCustomizableOptionTextFieldValue: function setCustomizableOptionTextFieldValue() {}
}));

/* harmony default export */ __webpack_exports__["default"] = (ProductBundleItemContainer);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductBundleItem/ProductBundleItem.style.scss":
/*!**************************************************************************!*\
  !*** ./src/app/component/ProductBundleItem/ProductBundleItem.style.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340981
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ProductBundleItem/index.js":
/*!******************************************************!*\
  !*** ./src/app/component/ProductBundleItem/index.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProductBundleItem_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductBundleItem.container */ "./src/app/component/ProductBundleItem/ProductBundleItem.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ProductBundleItem_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/ProductBundleItems/ProductBundleItems.component.js":
/*!******************************************************************************!*\
  !*** ./src/app/component/ProductBundleItems/ProductBundleItems.component.js ***!
  \******************************************************************************/
/*! exports provided: _ProductBundleItems, ProductBundleItems, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductBundleItems", function() { return _ProductBundleItems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductBundleItems", function() { return ProductBundleItems; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ProductBundleItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ProductBundleItem */ "./src/app/component/ProductBundleItem/index.js");
/* harmony import */ var _ProductCustomizableOptions_ProductCustomizableOptions_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ProductCustomizableOptions/ProductCustomizableOptions.component */ "./src/app/component/ProductCustomizableOptions/ProductCustomizableOptions.component.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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




/** @namespace Component/ProductBundleItems/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductBundleItems =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductBundleItems, _Extensible);

  function _ProductBundleItems() {
    _classCallCheck(this, _ProductBundleItems);

    return _possibleConstructorReturn(this, _getPrototypeOf(_ProductBundleItems).apply(this, arguments));
  }

  _createClass(_ProductBundleItems, [{
    key: "renderContent",
    value: function renderContent() {
      var _this$props = this.props,
          items = _this$props.items,
          setSelectedCheckboxValues = _this$props.setSelectedCheckboxValues,
          setSelectedDropdownValue = _this$props.setSelectedDropdownValue,
          maxQuantity = _this$props.maxQuantity,
          updateQuantity = _this$props.updateQuantity,
          productOptionsData = _this$props.productOptionsData,
          price_range = _this$props.price_range;
      return items.map(function (item, key) {
        return (
          /*#__PURE__*/
          _checkBEM(react__WEBPACK_IMPORTED_MODULE_1___default.a, _ProductBundleItem__WEBPACK_IMPORTED_MODULE_2__["default"], {
            option: item,
            price_range: price_range
            /* eslint-disable-next-line react/no-array-index-key */
            ,
            key: key,
            setSelectedCheckboxValues: setSelectedCheckboxValues,
            setSelectedDropdownValue: setSelectedDropdownValue,
            maxQuantity: maxQuantity,
            updateQuantity: updateQuantity,
            productOptionsData: productOptionsData
          })
        );
      });
    }
  }]);

  return _ProductBundleItems;
}(Extensible(_ProductCustomizableOptions_ProductCustomizableOptions_component__WEBPACK_IMPORTED_MODULE_3__["default"]));
Object.defineProperty(_ProductBundleItems, 'name', {
  value: 'ProductBundleItems'
});

var ProductBundleItems = middleware(_ProductBundleItems, "Component/ProductBundleItems/Component");

_defineProperty(ProductBundleItems, "propTypes", _objectSpread2(_objectSpread2({}, _ProductCustomizableOptions_ProductCustomizableOptions_component__WEBPACK_IMPORTED_MODULE_3__["default"].propTypes), {}, {
  items: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.array,
  maxQuantity: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number.isRequired,
  updateQuantity: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
}));

_defineProperty(ProductBundleItems, "defaultProps", {
  items: []
});

/* harmony default export */ __webpack_exports__["default"] = (ProductBundleItems);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductBundleItems/ProductBundleItems.container.js":
/*!******************************************************************************!*\
  !*** ./src/app/component/ProductBundleItems/ProductBundleItems.container.js ***!
  \******************************************************************************/
/*! exports provided: _ProductBundleItemsContainer, ProductBundleItemsContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductBundleItemsContainer", function() { return _ProductBundleItemsContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductBundleItemsContainer", function() { return ProductBundleItemsContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ProductCustomizableOptions_ProductCustomizableOptions_container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ProductCustomizableOptions/ProductCustomizableOptions.container */ "./src/app/component/ProductCustomizableOptions/ProductCustomizableOptions.container.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _ProductBundleItems_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ProductBundleItems.component */ "./src/app/component/ProductBundleItems/ProductBundleItems.component.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

/* eslint-disable fp/no-let */

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




/** @namespace Component/ProductBundleItems/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductBundleItemsContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductBundleItemsContainer, _Extensible);

  function _ProductBundleItemsContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ProductBundleItemsContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ProductBundleItemsContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", _objectSpread2(_objectSpread2({}, _this.containerFunctions), {}, {
      updateQuantity: _this.updateQuantity.bind(_assertThisInitialized(_this))
    }));

    _defineProperty(_assertThisInitialized(_this), "getItemsPrice", function (item) {
      var _this$state = _this.state,
          selectedDropdownOptions = _this$state.selectedDropdownOptions,
          selectedCheckboxValues = _this$state.selectedCheckboxValues;
      var price = 0;

      if (selectedCheckboxValues.length) {
        price += _this.getOptionPrice(item, selectedCheckboxValues);
      }

      if (selectedDropdownOptions.length) {
        price += _this.getOptionPrice(item, selectedDropdownOptions);
      }

      return price;
    });

    return _this;
  }

  _createClass(_ProductBundleItemsContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var items = this.props.items;

      if (items) {
        this.stopLoading();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(_, prevState) {
      var items = this.props.items;
      var _this$state2 = this.state,
          selectedCheckboxValues = _this$state2.selectedCheckboxValues,
          selectedDropdownOptions = _this$state2.selectedDropdownOptions,
          isLoading = _this$state2.isLoading;
      var prevSelectedCheckboxValues = prevState.selectedCheckboxValues,
          prevSelectedDropdownOptions = prevState.selectedDropdownOptions;

      if (items && isLoading) {
        this.stopLoading();
      }

      if (selectedDropdownOptions !== prevSelectedDropdownOptions || selectedCheckboxValues !== prevSelectedCheckboxValues) {
        this.updateSelectedOptions();
      }
    }
  }, {
    key: "stopLoading",
    value: function stopLoading() {
      this.setState({
        isLoading: false
      });
    }
  }, {
    key: "getOptionPrice",
    value: function getOptionPrice(item, selectedValues) {
      var option_id = item.option_id;
      var price = 0;
      selectedValues.reduce(function (acc, _ref) {
        var id = _ref.id,
            quantity = _ref.quantity,
            value = _ref.value;

        if (option_id === id) {
          var options = item.options;
          options.reduce(function (acc, _ref2) {
            var optionId = _ref2.id,
                product = _ref2.product;

            if (JSON.stringify(value) === JSON.stringify([optionId.toString()])) {
              var _value = product.price_range.minimum_price.regular_price.value;
              price += _value * quantity;
            }

            return acc;
          }, []);
        }

        return acc;
      }, []);
      return price;
    }
  }, {
    key: "getTotalPrice",
    value: function getTotalPrice() {
      var items = this.props.items;
      var totalPrice = 0;
      var priceValues = items.map(this.getItemsPrice);
      priceValues.reduce(function (acc, item) {
        totalPrice += item;
        return acc;
      }, []);
      return totalPrice;
    }
  }, {
    key: "updateSelectedOptions",
    value: function updateSelectedOptions() {
      var _this$props = this.props,
          getSelectedCustomizableOptions = _this$props.getSelectedCustomizableOptions,
          setBundlePrice = _this$props.setBundlePrice;
      var _this$state3 = this.state,
          selectedDropdownOptions = _this$state3.selectedDropdownOptions,
          selectedCheckboxValues = _this$state3.selectedCheckboxValues;
      var bundleOptions = [];
      var bundlePrice = this.getTotalPrice();
      bundleOptions.push.apply(bundleOptions, bundleOptions.concat(_toConsumableArray(selectedCheckboxValues), _toConsumableArray(selectedDropdownOptions)));
      getSelectedCustomizableOptions(bundleOptions);
      setBundlePrice(bundlePrice);
    }
  }, {
    key: "setSelectedDropdownValue",
    value: function setSelectedDropdownValue(id, option) {
      var selectedDropdownOptions = this.state.selectedDropdownOptions;
      var value = option.value,
          quantity = option.quantity,
          option_id = option.option_id;

      if (!id) {
        var filteredOptions = selectedDropdownOptions.filter(function (item) {
          return item.id !== option_id;
        });
        this.setState({
          selectedDropdownOptions: filteredOptions
        });
        return;
      }

      var optionData = {
        id: id,
        quantity: quantity,
        value: [value]
      };

      if (selectedDropdownOptions.some(function (_ref3) {
        var val = _ref3.id;
        return val === id;
      })) {
        var filteredItems = selectedDropdownOptions.filter(function (item) {
          return item.id !== id;
        });
        this.setState({
          selectedDropdownOptions: filteredItems.concat(optionData)
        });
        return;
      }

      var newItemData = selectedDropdownOptions;
      newItemData.push(optionData);
      this.setState({
        selectedDropdownOptions: Array.from(newItemData)
      });
    }
  }, {
    key: "updateQuantity",
    value: function updateQuantity(value, quantity) {
      var selectedCheckboxValues = this.state.selectedCheckboxValues;
      this.setState({
        selectedCheckboxValues: selectedCheckboxValues.map(function (el) {
          return JSON.stringify(el.value) === JSON.stringify(value) ? _objectSpread2(_objectSpread2({}, el), {}, {
            quantity: quantity
          }) : el;
        })
      });
    }
  }, {
    key: "setSelectedCheckboxValues",
    value: function setSelectedCheckboxValues(id, optionData) {
      var selectedCheckboxValues = this.state.selectedCheckboxValues;
      var value = optionData.value,
          quantity = optionData.quantity;
      var selectedValue = {
        id: id,
        quantity: quantity,
        value: [value]
      };

      if (selectedCheckboxValues.some(function (_ref4) {
        var val = _ref4.value;
        return JSON.stringify([value]) === JSON.stringify(val);
      })) {
        this.setState({
          selectedCheckboxValues: selectedCheckboxValues.filter(function (item) {
            return JSON.stringify(item.value) !== JSON.stringify([value]);
          }) || []
        });
        return;
      }

      var newItemData = selectedCheckboxValues;
      newItemData.push(selectedValue);
      this.setState({
        selectedCheckboxValues: Array.from(newItemData)
      });
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _ProductBundleItems_component__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({}, this.props, this.state, this.containerFunctions))
      );
    }
  }]);

  return _ProductBundleItemsContainer;
}(Extensible(_ProductCustomizableOptions_ProductCustomizableOptions_container__WEBPACK_IMPORTED_MODULE_1__["default"]));
Object.defineProperty(_ProductBundleItemsContainer, 'name', {
  value: 'ProductBundleItemsContainer'
});

var ProductBundleItemsContainer = middleware(_ProductBundleItemsContainer, "Component/ProductBundleItems/Container");

_defineProperty(ProductBundleItemsContainer, "propTypes", _objectSpread2(_objectSpread2({}, _ProductCustomizableOptions_ProductCustomizableOptions_container__WEBPACK_IMPORTED_MODULE_1__["default"].propTypes), {}, {
  items: _type_ProductList__WEBPACK_IMPORTED_MODULE_2__["ProductItemsType"],
  setBundlePrice: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
}));

_defineProperty(ProductBundleItemsContainer, "defaultProps", {
  items: []
});

/* harmony default export */ __webpack_exports__["default"] = (ProductBundleItemsContainer);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductBundleItems/index.js":
/*!*******************************************************!*\
  !*** ./src/app/component/ProductBundleItems/index.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProductBundleItems_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductBundleItems.container */ "./src/app/component/ProductBundleItems/ProductBundleItems.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ProductBundleItems_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/ProductConfigurableAttributes/index.js":
/*!******************************************************************!*\
  !*** ./src/app/component/ProductConfigurableAttributes/index.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProductConfigurableAttributes_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductConfigurableAttributes.container */ "./src/app/component/ProductConfigurableAttributes/ProductConfigurableAttributes.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ProductConfigurableAttributes_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/ProductCustomizableOption/ProductCustomizableOption.component.js":
/*!********************************************************************************************!*\
  !*** ./src/app/component/ProductCustomizableOption/ProductCustomizableOption.component.js ***!
  \********************************************************************************************/
/*! exports provided: _ProductCustomizableOption, ProductCustomizableOption, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductCustomizableOption", function() { return _ProductCustomizableOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductCustomizableOption", function() { return ProductCustomizableOption; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ExpandableContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ExpandableContent */ "./src/app/component/ExpandableContent/index.js");
/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Field */ "./src/app/component/Field/index.js");
/* harmony import */ var _ProductCustomizableOption_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ProductCustomizableOption.config */ "./src/app/component/ProductCustomizableOption/ProductCustomizableOption.config.js");
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





/** @namespace Component/ProductCustomizableOption/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductCustomizableOption =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductCustomizableOption, _Extensible);

  function _ProductCustomizableOption() {
    var _getPrototypeOf2, _defineProperty2;

    var _this;

    _classCallCheck(this, _ProductCustomizableOption);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ProductCustomizableOption)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "renderMap", (_defineProperty2 = {}, _defineProperty(_defineProperty2, _ProductCustomizableOption_config__WEBPACK_IMPORTED_MODULE_4__["CHECKBOX"], {
      render: function render() {
        return _this.renderCheckboxValues();
      },
      title: function title() {
        return _this.renderTitle();
      }
    }), _defineProperty(_defineProperty2, _ProductCustomizableOption_config__WEBPACK_IMPORTED_MODULE_4__["DROPDOWN"], {
      render: function render() {
        return _this.renderDropdownValues();
      },
      title: function title() {
        return _this.renderTitle();
      }
    }), _defineProperty(_defineProperty2, _ProductCustomizableOption_config__WEBPACK_IMPORTED_MODULE_4__["TEXT_FIELD"], {
      render: function render() {
        return _this.renderTextField();
      },
      title: function title() {
        return _this.renderTextFieldTitle();
      }
    }), _defineProperty(_defineProperty2, _ProductCustomizableOption_config__WEBPACK_IMPORTED_MODULE_4__["AREA_FIELD"], {
      render: function render() {
        return _this.renderTextField();
      },
      title: function title() {
        return _this.renderTextFieldTitle();
      }
    }), _defineProperty2));

    _defineProperty(_assertThisInitialized(_this), "renderOptionCheckboxValue", function (item) {
      var _this$props = _this.props,
          getSelectedCheckboxValue = _this$props.getSelectedCheckboxValue,
          renderOptionLabel = _this$props.renderOptionLabel;
      var option_type_id = item.option_type_id,
          title = item.title,
          price = item.price,
          price_type = item.price_type;
      var priceLabel = renderOptionLabel(price_type, price);
      return (
        /*#__PURE__*/
        _checkBEM(React, _Field__WEBPACK_IMPORTED_MODULE_3__["default"], {
          type: "checkbox",
          label: _this.renderHeading(title, priceLabel),
          key: option_type_id,
          id: "option-".concat(option_type_id),
          name: "option-".concat(option_type_id),
          value: option_type_id,
          onChange: getSelectedCheckboxValue
        })
      );
    });

    return _this;
  }

  _createClass(_ProductCustomizableOption, [{
    key: "renderRequired",
    value: function renderRequired(isRequired) {
      var requiredSelected = this.props.requiredSelected; // skip undefined and false

      if (isRequired !== true || requiredSelected) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductCustomizableOptions",
          elem: "Required"
        }, __('This field is required!'))
      );
    }
  }, {
    key: "renderHeading",
    value: function renderHeading(mainTitle, titleBold) {
      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null,
        /*#__PURE__*/
        _checkBEM(React, "span", {
          block: "ProductCustomizableOptions",
          elem: "Heading"
        }, "".concat(mainTitle, " + ")),
        /*#__PURE__*/
        _checkBEM(React, "span", {
          block: "ProductCustomizableOptions",
          elem: "HeadingBold"
        }, titleBold))
      );
    }
  }, {
    key: "renderOptionDropdownValues",
    value: function renderOptionDropdownValues(values) {
      var _this$props2 = this.props,
          getDropdownOptions = _this$props2.getDropdownOptions,
          selectedDropdownValue = _this$props2.selectedDropdownValue,
          setDropdownValue = _this$props2.setDropdownValue;
      var dropdownOptions = getDropdownOptions(values);
      return (
        /*#__PURE__*/
        _checkBEM(React, _Field__WEBPACK_IMPORTED_MODULE_3__["default"], {
          id: "customizable-options-dropdown",
          name: "customizable-options-dropdown",
          type: "select",
          mix: {
            block: 'CustomizableOptions',
            elem: 'Select'
          },
          placeholder: __('Choose Option'),
          selectOptions: dropdownOptions,
          value: selectedDropdownValue,
          onChange: setDropdownValue
        })
      );
    }
  }, {
    key: "renderMaxCharacters",
    value: function renderMaxCharacters(max_characters) {
      if (max_characters <= 0) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductCustomizableOptions",
          elem: "Information"
        }, __('Maximum %s characters', max_characters))
      );
    }
  }, {
    key: "renderCheckboxValues",
    value: function renderCheckboxValues() {
      var _this$props$option = this.props.option,
          required = _this$props$option.required,
          data = _this$props$option.data;
      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null, data.map(this.renderOptionCheckboxValue), this.renderRequired(required))
      );
    }
  }, {
    key: "renderDropdownValues",
    value: function renderDropdownValues() {
      var _this$props$option2 = this.props.option,
          required = _this$props$option2.required,
          data = _this$props$option2.data;
      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null, this.renderOptionDropdownValues(data), this.renderRequired(required))
      );
    }
  }, {
    key: "renderTextField",
    value: function renderTextField() {
      var _this$props3 = this.props,
          _this$props3$option = _this$props3.option,
          required = _this$props3$option.required,
          data = _this$props3$option.data,
          updateTextFieldValue = _this$props3.updateTextFieldValue,
          textValue = _this$props3.textValue,
          optionType = _this$props3.optionType;
      var max_characters = data.max_characters;
      var fieldType = optionType === 'field' ? 'text' : 'textarea';
      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null,
        /*#__PURE__*/
        _checkBEM(React, _Field__WEBPACK_IMPORTED_MODULE_3__["default"], {
          id: "customizable-options-".concat(optionType),
          name: "customizable-options-".concat(optionType),
          type: fieldType,
          maxLength: max_characters > 0 ? max_characters : null,
          value: textValue,
          onChange: updateTextFieldValue
        }), this.renderRequired(required), this.renderMaxCharacters(max_characters))
      );
    }
  }, {
    key: "renderTitle",
    value: function renderTitle() {
      var option = this.props.option;
      var title = option.title;
      return title;
    }
  }, {
    key: "renderTextFieldTitle",
    value: function renderTextFieldTitle() {
      var _this$props4 = this.props,
          renderOptionLabel = _this$props4.renderOptionLabel,
          _this$props4$option = _this$props4.option,
          title = _this$props4$option.title,
          _this$props4$option$d = _this$props4$option.data,
          price_type = _this$props4$option$d.price_type,
          price = _this$props4$option$d.price;
      var priceLabel = renderOptionLabel(price_type, price);
      return this.renderHeading(title, priceLabel);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          option_id = _this$props5.option.option_id,
          optionType = _this$props5.optionType;
      var optionRenderMap = this.renderMap[optionType];

      if (!optionRenderMap) {
        return null;
      }

      var render = optionRenderMap.render,
          title = optionRenderMap.title;
      return (
        /*#__PURE__*/
        _checkBEM(React, _ExpandableContent__WEBPACK_IMPORTED_MODULE_2__["default"], {
          heading: title(),
          mix: {
            block: 'ProductCustomizableOptions',
            elem: 'Content'
          },
          key: option_id,
          isContentExpanded: true
        }, render())
      );
    }
  }]);

  return _ProductCustomizableOption;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductCustomizableOption, 'name', {
  value: 'ProductCustomizableOption'
});

var ProductCustomizableOption = middleware(_ProductCustomizableOption, "Component/ProductCustomizableOption/Component");

_defineProperty(ProductCustomizableOption, "propTypes", {
  option: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object.isRequired,
  textValue: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  getSelectedCheckboxValue: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  renderOptionLabel: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  updateTextFieldValue: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  setDropdownValue: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  selectedDropdownValue: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number.isRequired,
  optionType: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  getDropdownOptions: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  requiredSelected: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (ProductCustomizableOption);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductCustomizableOption/ProductCustomizableOption.config.js":
/*!*****************************************************************************************!*\
  !*** ./src/app/component/ProductCustomizableOption/ProductCustomizableOption.config.js ***!
  \*****************************************************************************************/
/*! exports provided: CHECKBOX, DROPDOWN, TEXT_FIELD, AREA_FIELD */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHECKBOX", function() { return CHECKBOX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DROPDOWN", function() { return DROPDOWN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TEXT_FIELD", function() { return TEXT_FIELD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AREA_FIELD", function() { return AREA_FIELD; });
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
var CHECKBOX = 'checkbox';
var DROPDOWN = 'dropdown';
var TEXT_FIELD = 'field';
var AREA_FIELD = 'area';

/***/ }),

/***/ "./src/app/component/ProductCustomizableOption/ProductCustomizableOption.container.js":
/*!********************************************************************************************!*\
  !*** ./src/app/component/ProductCustomizableOption/ProductCustomizableOption.container.js ***!
  \********************************************************************************************/
/*! exports provided: _ProductCustomizableOptionContainer, ProductCustomizableOptionContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductCustomizableOptionContainer", function() { return _ProductCustomizableOptionContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductCustomizableOptionContainer", function() { return ProductCustomizableOptionContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _util_Price__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/Price */ "./src/app/util/Price/index.js");
/* harmony import */ var _ProductCustomizableOption_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ProductCustomizableOption.component */ "./src/app/component/ProductCustomizableOption/ProductCustomizableOption.component.js");
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




/** @namespace Component/ProductCustomizableOption/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductCustomizableOptionContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductCustomizableOptionContainer, _Extensible);

  function _ProductCustomizableOptionContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ProductCustomizableOptionContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ProductCustomizableOptionContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      textValue: '',
      selectedDropdownValue: 0
    });

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      getDropdownOptions: _this.getDropdownOptions.bind(_assertThisInitialized(_this)),
      getSelectedCheckboxValue: _this.getSelectedCheckboxValue.bind(_assertThisInitialized(_this)),
      updateTextFieldValue: _this.updateTextFieldValue.bind(_assertThisInitialized(_this)),
      setDropdownValue: _this.setDropdownValue.bind(_assertThisInitialized(_this)),
      renderOptionLabel: _this.renderOptionLabel.bind(_assertThisInitialized(_this))
    });

    _defineProperty(_assertThisInitialized(_this), "containerProps", function () {
      return {
        optionType: _this.getOptionType(),
        requiredSelected: _this.getIsRequiredSelected()
      };
    });

    return _this;
  }

  _createClass(_ProductCustomizableOptionContainer, [{
    key: "getOptionType",
    value: function getOptionType() {
      var option = this.props.option;
      var type = option.type;
      return type;
    }
  }, {
    key: "getIsRequiredSelected",
    value: function getIsRequiredSelected() {
      var _this$props = this.props,
          productOptionsData = _this$props.productOptionsData,
          _this$props$productOp = _this$props.productOptionsData,
          requiredOptions = _this$props$productOp.requiredOptions,
          productOptions = _this$props$productOp.productOptions,
          productOptionsMulti = _this$props$productOp.productOptionsMulti,
          option_id = _this$props.option.option_id;

      if (Object.keys(productOptionsData).length < 1 || !requiredOptions) {
        return true;
      }

      var selectedItems = [].concat(_toConsumableArray(productOptions || []), _toConsumableArray(productOptionsMulti || []));
      var isRequired = requiredOptions.reduce(function (acc, item) {
        if (item === option_id) {
          acc.push(item);
        }

        return acc;
      }, []);

      if (!isRequired.length) {
        return true;
      }

      var isRequiredSelected = selectedItems.reduce(function (acc, _ref) {
        var option_id = _ref.option_id;

        if (isRequired[0] === option_id) {
          acc.push(option_id);
        }

        return acc;
      }, []);
      return !!isRequiredSelected.length;
    }
  }, {
    key: "renderOptionLabel",
    value: function renderOptionLabel(priceType, price) {
      switch (priceType) {
        case 'PERCENT':
          return "".concat(price, "%");

        default:
          /* TODO: get currency code */
          return Object(_util_Price__WEBPACK_IMPORTED_MODULE_2__["formatPrice"])(price);
      }
    }
  }, {
    key: "getSelectedCheckboxValue",
    value: function getSelectedCheckboxValue(value) {
      var _this$props2 = this.props,
          option = _this$props2.option,
          setSelectedCheckboxValues = _this$props2.setSelectedCheckboxValues;
      var option_id = option.option_id;
      setSelectedCheckboxValues(option_id, value);
    }
  }, {
    key: "updateTextFieldValue",
    value: function updateTextFieldValue(value) {
      var _this$props3 = this.props,
          option = _this$props3.option,
          setCustomizableOptionTextFieldValue = _this$props3.setCustomizableOptionTextFieldValue;
      var option_id = option.option_id;
      setCustomizableOptionTextFieldValue(option_id, value);
      this.setState({
        fieldValue: value
      });
    }
  }, {
    key: "setDropdownValue",
    value: function setDropdownValue(value) {
      var _this$props4 = this.props,
          setSelectedDropdownValue = _this$props4.setSelectedDropdownValue,
          option = _this$props4.option;
      var selectedDropdownValue = this.state.selectedDropdownValue;

      if (selectedDropdownValue === value) {
        setSelectedDropdownValue(null, option);
        this.setState({
          selectedDropdownValue: 0
        });
      } else {
        setSelectedDropdownValue(value, option);
        this.setState({
          selectedDropdownValue: parseInt(value, 10)
        });
      }
    }
  }, {
    key: "getDropdownOptions",
    value: function getDropdownOptions(values) {
      var _this2 = this;

      return values.reduce(function (acc, _ref2) {
        var option_type_id = _ref2.option_type_id,
            title = _ref2.title,
            price = _ref2.price,
            price_type = _ref2.price_type;
        acc.push({
          id: option_type_id,
          name: title,
          value: option_type_id,
          label: "".concat(title, " + ").concat(_this2.renderOptionLabel(price_type, price))
        });
        return acc;
      }, []);
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _ProductCustomizableOption_component__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({}, this.props, this.state, this.containerFunctions, this.containerProps()))
      );
    }
  }]);

  return _ProductCustomizableOptionContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductCustomizableOptionContainer, 'name', {
  value: 'ProductCustomizableOptionContainer'
});

var ProductCustomizableOptionContainer = middleware(_ProductCustomizableOptionContainer, "Component/ProductCustomizableOption/Container");

_defineProperty(ProductCustomizableOptionContainer, "propTypes", {
  option: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object.isRequired,
  productOptionsData: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object.isRequired,
  setSelectedCheckboxValues: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  setCustomizableOptionTextFieldValue: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  setSelectedDropdownValue: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (ProductCustomizableOptionContainer);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductCustomizableOption/index.js":
/*!**************************************************************!*\
  !*** ./src/app/component/ProductCustomizableOption/index.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProductCustomizableOption_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductCustomizableOption.container */ "./src/app/component/ProductCustomizableOption/ProductCustomizableOption.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ProductCustomizableOption_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/ProductCustomizableOptions/ProductCustomizableOptions.component.js":
/*!**********************************************************************************************!*\
  !*** ./src/app/component/ProductCustomizableOptions/ProductCustomizableOptions.component.js ***!
  \**********************************************************************************************/
/*! exports provided: _ProductCustomizableOptions, ProductCustomizableOptions, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductCustomizableOptions", function() { return _ProductCustomizableOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductCustomizableOptions", function() { return ProductCustomizableOptions; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ProductCustomizableOption__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ProductCustomizableOption */ "./src/app/component/ProductCustomizableOption/index.js");
/* harmony import */ var _ProductCustomizableOptions_style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ProductCustomizableOptions.style */ "./src/app/component/ProductCustomizableOptions/ProductCustomizableOptions.style.scss");
/* harmony import */ var _ProductCustomizableOptions_style__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ProductCustomizableOptions_style__WEBPACK_IMPORTED_MODULE_3__);
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




/** @namespace Component/ProductCustomizableOptions/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductCustomizableOptions =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductCustomizableOptions, _Extensible);

  function _ProductCustomizableOptions() {
    _classCallCheck(this, _ProductCustomizableOptions);

    return _possibleConstructorReturn(this, _getPrototypeOf(_ProductCustomizableOptions).apply(this, arguments));
  }

  _createClass(_ProductCustomizableOptions, [{
    key: "renderContent",
    value: function renderContent() {
      var _this$props = this.props,
          options = _this$props.options,
          productOptionsData = _this$props.productOptionsData,
          setSelectedCheckboxValues = _this$props.setSelectedCheckboxValues,
          setCustomizableOptionTextFieldValue = _this$props.setCustomizableOptionTextFieldValue,
          setSelectedDropdownValue = _this$props.setSelectedDropdownValue;
      return options.map(function (option, key) {
        return (
          /*#__PURE__*/
          _checkBEM(React, _ProductCustomizableOption__WEBPACK_IMPORTED_MODULE_2__["default"], {
            option: option
            /* eslint-disable-next-line react/no-array-index-key */
            ,
            key: key,
            setSelectedCheckboxValues: setSelectedCheckboxValues,
            setCustomizableOptionTextFieldValue: setCustomizableOptionTextFieldValue,
            setSelectedDropdownValue: setSelectedDropdownValue,
            productOptionsData: productOptionsData
          })
        );
      });
    }
  }, {
    key: "renderPlaceholder",
    value: function renderPlaceholder() {
      var isLoading = this.props.isLoading;
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductCustomizableOptions",
          mods: {
            isLoading: isLoading,
            isPlaceholder: true
          }
        })
      );
    }
  }, {
    key: "render",
    value: function render() {
      var isLoading = this.props.isLoading;

      if (isLoading) {
        return this.renderPlaceholder();
      }

      return this.renderContent();
    }
  }]);

  return _ProductCustomizableOptions;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductCustomizableOptions, 'name', {
  value: 'ProductCustomizableOptions'
});

var ProductCustomizableOptions = middleware(_ProductCustomizableOptions, "Component/ProductCustomizableOptions/Component");

_defineProperty(ProductCustomizableOptions, "propTypes", {
  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  options: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.array,
  productOptionsData: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object.isRequired,
  setSelectedDropdownValue: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  setSelectedCheckboxValues: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  setCustomizableOptionTextFieldValue: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

_defineProperty(ProductCustomizableOptions, "defaultProps", {
  options: []
});

/* harmony default export */ __webpack_exports__["default"] = (ProductCustomizableOptions);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductCustomizableOptions/ProductCustomizableOptions.container.js":
/*!**********************************************************************************************!*\
  !*** ./src/app/component/ProductCustomizableOptions/ProductCustomizableOptions.container.js ***!
  \**********************************************************************************************/
/*! exports provided: _ProductCustomizableOptionsContainer, ProductCustomizableOptionsContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductCustomizableOptionsContainer", function() { return _ProductCustomizableOptionsContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductCustomizableOptionsContainer", function() { return ProductCustomizableOptionsContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _ProductCustomizableOptions_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ProductCustomizableOptions.component */ "./src/app/component/ProductCustomizableOptions/ProductCustomizableOptions.component.js");
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




/** @namespace Component/ProductCustomizableOptions/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductCustomizableOptionsContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductCustomizableOptionsContainer, _Extensible);

  function _ProductCustomizableOptionsContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ProductCustomizableOptionsContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ProductCustomizableOptionsContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isLoading: true,
      selectedCheckboxValues: [],
      selectedDropdownOptions: [],
      textFieldValues: []
    });

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      setSelectedDropdownValue: _this.setSelectedDropdownValue.bind(_assertThisInitialized(_this)),
      setSelectedCheckboxValues: _this.setSelectedCheckboxValues.bind(_assertThisInitialized(_this)),
      setCustomizableOptionTextFieldValue: _this.setCustomizableOptionTextFieldValue.bind(_assertThisInitialized(_this))
    });

    return _this;
  }

  _createClass(_ProductCustomizableOptionsContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var options = this.props.options;

      if (options) {
        this.stopLoading();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(_, prevState) {
      var options = this.props.options;
      var _this$state = this.state,
          selectedCheckboxValues = _this$state.selectedCheckboxValues,
          selectedDropdownOptions = _this$state.selectedDropdownOptions,
          textFieldValues = _this$state.textFieldValues,
          isLoading = _this$state.isLoading;
      var prevSelectedCheckboxValues = prevState.selectedCheckboxValues,
          prevSelectedDropdownOptions = prevState.selectedDropdownOptions,
          prevTextFieldValues = prevState.textFieldValues;

      if (options && isLoading) {
        this.stopLoading();
      }

      if (selectedCheckboxValues !== prevSelectedCheckboxValues) {
        this.updateSelectedOptionsArray();
      }

      if (textFieldValues !== prevTextFieldValues || selectedDropdownOptions !== prevSelectedDropdownOptions) {
        this.updateSelectedOptions();
      }
    }
  }, {
    key: "stopLoading",
    value: function stopLoading() {
      this.setState({
        isLoading: false
      });
    }
  }, {
    key: "updateSelectedOptionsArray",
    value: function updateSelectedOptionsArray() {
      var getSelectedCustomizableOptions = this.props.getSelectedCustomizableOptions;
      var selectedCheckboxValues = this.state.selectedCheckboxValues;
      var customizableOptions = [];
      customizableOptions.push.apply(customizableOptions, customizableOptions.concat(_toConsumableArray(selectedCheckboxValues)));
      getSelectedCustomizableOptions(customizableOptions, true);
    }
  }, {
    key: "updateSelectedOptions",
    value: function updateSelectedOptions() {
      var getSelectedCustomizableOptions = this.props.getSelectedCustomizableOptions;
      var _this$state2 = this.state,
          selectedDropdownOptions = _this$state2.selectedDropdownOptions,
          textFieldValues = _this$state2.textFieldValues;
      var customizableOptions = [];
      customizableOptions.push.apply(customizableOptions, customizableOptions.concat(_toConsumableArray(textFieldValues), _toConsumableArray(selectedDropdownOptions)));
      getSelectedCustomizableOptions(customizableOptions);
    }
  }, {
    key: "setCustomizableOptionTextFieldValue",
    value: function setCustomizableOptionTextFieldValue(option_id, option_value) {
      var textFieldValues = this.state.textFieldValues;

      if (!option_value) {
        var filteredOptions = textFieldValues.filter(function (item) {
          return item.option_id !== option_id;
        });
        return this.setState({
          textFieldValues: filteredOptions
        });
      }

      var textFieldValue = {
        option_id: option_id,
        option_value: option_value
      };

      if (textFieldValues.some(function (_ref) {
        var val = _ref.option_id;
        return option_id === val;
      })) {
        var filteredItems = textFieldValues.filter(function (value) {
          return value.option_id !== option_id;
        });
        return this.setState({
          textFieldValues: filteredItems.concat(textFieldValue)
        });
      }

      return this.setState({
        textFieldValues: [].concat(_toConsumableArray(textFieldValues), [textFieldValue])
      });
    }
  }, {
    key: "setSelectedDropdownValue",
    value: function setSelectedDropdownValue(value, option) {
      var selectedDropdownOptions = this.state.selectedDropdownOptions;
      var option_id = option.option_id;

      if (!value) {
        var filteredOptions = selectedDropdownOptions.filter(function (item) {
          return item.option_id !== option_id;
        });
        return this.setState({
          selectedDropdownOptions: filteredOptions
        });
      }

      var optionData = {
        option_id: option_id,
        option_value: value
      };

      if (selectedDropdownOptions.some(function (_ref2) {
        var val = _ref2.option_id;
        return option_id === val;
      })) {
        var filteredItems = selectedDropdownOptions.filter(function (value) {
          return value.option_id !== option_id;
        });
        return this.setState({
          selectedDropdownOptions: filteredItems.concat(optionData)
        });
      }

      return this.setState({
        selectedDropdownOptions: [].concat(_toConsumableArray(selectedDropdownOptions), [optionData])
      });
    }
  }, {
    key: "setSelectedCheckboxValues",
    value: function setSelectedCheckboxValues(option_id, option_value) {
      var selectedCheckboxValues = this.state.selectedCheckboxValues;
      var selectedValue = {
        option_id: option_id,
        option_value: option_value
      };

      if (selectedCheckboxValues.some(function (_ref3) {
        var val = _ref3.option_value;
        return option_value === val;
      })) {
        this.setState({
          selectedCheckboxValues: selectedCheckboxValues.filter(function (value) {
            return value.option_value !== option_value;
          }) || []
        });
        return;
      }

      this.setState({
        selectedCheckboxValues: [].concat(_toConsumableArray(selectedCheckboxValues), [selectedValue])
      });
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _ProductCustomizableOptions_component__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({}, this.props, this.state, this.containerFunctions))
      );
    }
  }]);

  return _ProductCustomizableOptionsContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductCustomizableOptionsContainer, 'name', {
  value: 'ProductCustomizableOptionsContainer'
});

var ProductCustomizableOptionsContainer = middleware(_ProductCustomizableOptionsContainer, "Component/ProductCustomizableOptions/Container");

_defineProperty(ProductCustomizableOptionsContainer, "propTypes", {
  options: _type_ProductList__WEBPACK_IMPORTED_MODULE_2__["OptionsType"],
  getSelectedCustomizableOptions: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

_defineProperty(ProductCustomizableOptionsContainer, "defaultProps", {
  options: []
});

/* harmony default export */ __webpack_exports__["default"] = (ProductCustomizableOptionsContainer);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductCustomizableOptions/ProductCustomizableOptions.style.scss":
/*!********************************************************************************************!*\
  !*** ./src/app/component/ProductCustomizableOptions/ProductCustomizableOptions.style.scss ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340348
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ProductCustomizableOptions/index.js":
/*!***************************************************************!*\
  !*** ./src/app/component/ProductCustomizableOptions/index.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProductCustomizableOptions_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductCustomizableOptions.container */ "./src/app/component/ProductCustomizableOptions/ProductCustomizableOptions.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ProductCustomizableOptions_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/ProductGallery/ProductGallery.component.js":
/*!**********************************************************************!*\
  !*** ./src/app/component/ProductGallery/ProductGallery.component.js ***!
  \**********************************************************************/
/*! exports provided: _ProductGallery, ProductGallery, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductGallery", function() { return _ProductGallery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductGallery", function() { return ProductGallery; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/es/index.js");
/* harmony import */ var react_zoom_pan_pinch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-zoom-pan-pinch */ "./node_modules/react-zoom-pan-pinch/dist/index.es.js");
/* harmony import */ var _CarouselScroll__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../CarouselScroll */ "./src/app/component/CarouselScroll/index.js");
/* harmony import */ var _Image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Image */ "./src/app/component/Image/index.js");
/* harmony import */ var _ProductGalleryBaseImage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ProductGalleryBaseImage */ "./src/app/component/ProductGalleryBaseImage/index.js");
/* harmony import */ var _ProductGalleryThumbnailImage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../ProductGalleryThumbnailImage */ "./src/app/component/ProductGalleryThumbnailImage/index.js");
/* harmony import */ var _Slider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Slider */ "./src/app/component/Slider/index.js");
/* harmony import */ var _VideoPopup__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../VideoPopup */ "./src/app/component/VideoPopup/index.js");
/* harmony import */ var _VideoThumbnail__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../VideoThumbnail */ "./src/app/component/VideoThumbnail/index.js");
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _util_CSS__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../util/CSS */ "./src/app/util/CSS/index.js");
/* harmony import */ var _ProductGallery_config__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./ProductGallery.config */ "./src/app/component/ProductGallery/ProductGallery.config.js");
/* harmony import */ var _ProductGallery_style__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./ProductGallery.style */ "./src/app/component/ProductGallery/ProductGallery.style.scss");
/* harmony import */ var _ProductGallery_style__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_ProductGallery_style__WEBPACK_IMPORTED_MODULE_14__);
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















/**
 * Product gallery
 * @class ProductGallery
 * @namespace Component/ProductGallery/Component
 */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductGallery =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductGallery, _Extensible);

  function _ProductGallery() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ProductGallery);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ProductGallery)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "maxScale", _ProductGallery_config__WEBPACK_IMPORTED_MODULE_13__["MAX_ZOOM_SCALE"]);

    _defineProperty(_assertThisInitialized(_this), "imageRef",
    /*#__PURE__*/
    Object(react__WEBPACK_IMPORTED_MODULE_1__["createRef"])());

    _defineProperty(_assertThisInitialized(_this), "state", {
      scrollEnabled: true
    });

    _defineProperty(_assertThisInitialized(_this), "handleSliderClick", function () {
      var handleImageZoomPopupActiveChange = _this.props.handleImageZoomPopupActiveChange;
      handleImageZoomPopupActiveChange(true);
    });

    _defineProperty(_assertThisInitialized(_this), "renderAdditionalPicture", function (media) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return (
        /*#__PURE__*/
        _checkBEM(React, _ProductGalleryThumbnailImage__WEBPACK_IMPORTED_MODULE_7__["default"], {
          key: index,
          media: media
        })
      );
    });

    _defineProperty(_assertThisInitialized(_this), "onWheel", function (zoomState) {
      var scale = zoomState.scale;

      if (_this.timeout) {
        return;
      }

      if (scale === 1 || scale === _ProductGallery_config__WEBPACK_IMPORTED_MODULE_13__["MAX_ZOOM_SCALE"]) {
        _this.stopScrolling();
      }
    });

    return _this;
  }

  _createClass(_ProductGallery, [{
    key: "__construct",
    value: function __construct(props, context) {
      _get(_getPrototypeOf(_ProductGallery.prototype), "__construct", this).call(this, props, context);

      this.renderSlide = this.renderSlide.bind(this);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateSharedDestinationElement();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          productId = _this$props.productId,
          pathname = _this$props.location.pathname,
          sliderRef = _this$props.sliderRef;
      var prevProductId = prevProps.productId,
          prevPathname = prevProps.location.pathname;

      if (productId !== prevProductId) {
        this.updateSharedDestinationElement();
      }

      if (sliderRef && pathname !== prevPathname) {
        _util_CSS__WEBPACK_IMPORTED_MODULE_12__["default"].setVariable(sliderRef.current.draggableRef, 'animation-speed', 0);
      }
    }
  }, {
    key: "updateSharedDestinationElement",
    value: function updateSharedDestinationElement() {
      var registerSharedElementDestination = this.props.registerSharedElementDestination;
      registerSharedElementDestination(this.imageRef);
    }
  }, {
    key: "renderVideo",

    /**
     * Renders a video thumbnail which opens popup player on click/tap
     * @param media
     * @param index
     * @returns {*}
     * @private
     */
    value: function renderVideo(media, index) {
      return (
        /*#__PURE__*/
        _checkBEM(React, _VideoThumbnail__WEBPACK_IMPORTED_MODULE_10__["default"], {
          key: index,
          media: media
        })
      );
    }
  }, {
    key: "renderPlaceholder",
    value: function renderPlaceholder(index) {
      return (
        /*#__PURE__*/
        _checkBEM(React, _Image__WEBPACK_IMPORTED_MODULE_5__["default"], {
          key: index,
          ratio: "custom",
          mix: {
            block: 'ProductGallery',
            elem: 'SliderImage',
            mods: {
              isPlaceholder: true
            }
          },
          isPlaceholder: true
        })
      );
    }
  }, {
    key: "stopScrolling",
    value: function stopScrolling() {
      var _this2 = this;

      this.setState({
        scrollEnabled: false
      });
      this.timeout = setTimeout(function () {
        _this2.setState({
          scrollEnabled: true
        });

        _this2.timeout = null; // 20 ms is time give to scroll down, usually that is enough
        // eslint-disable-next-line no-magic-numbers
      }, 20);
    }
  }, {
    key: "renderImage",

    /**
     * Renders a product image to be displayed in the gallery
     * @param mediaData
     * @param index
     * @returns {*}
     * @private
     */
    value: function renderImage(mediaData, index) {
      var _this$props2 = this.props,
          isZoomEnabled = _this$props2.isZoomEnabled,
          handleZoomChange = _this$props2.handleZoomChange,
          disableZoom = _this$props2.disableZoom,
          isMobile = _this$props2.isMobile,
          isImageZoomPopupActive = _this$props2.isImageZoomPopupActive;
      var scrollEnabled = this.state.scrollEnabled;

      if (!isMobile) {
        var src = mediaData.base.url;
        var style = isImageZoomPopupActive ? {
          height: 'auto'
        } : {};
        return (
          /*#__PURE__*/
          _checkBEM(React, _Image__WEBPACK_IMPORTED_MODULE_5__["default"], {
            key: index,
            src: src,
            ratio: "custom",
            mix: {
              block: 'ProductGallery',
              elem: 'SliderImage',
              mods: {
                isPlaceholder: !src
              }
            },
            isPlaceholder: !src,
            style: style
          })
        );
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, react_zoom_pan_pinch__WEBPACK_IMPORTED_MODULE_3__["TransformWrapper"], {
          key: index,
          onZoomChange: handleZoomChange,
          onWheelStart: this.onWheelStart,
          onWheel: this.onWheel,
          wheel: {
            limitsOnWheel: true,
            disabled: !scrollEnabled
          } //   doubleClick={ { mode: 'reset' } }
          ,
          pan: {
            disabled: !isZoomEnabled,
            limitToWrapperBounds: true,
            velocity: false
          },
          options: {
            limitToBounds: true,
            minScale: 1
          }
        }, function (_ref) {
          var scale = _ref.scale,
              previousScale = _ref.previousScale,
              resetTransform = _ref.resetTransform,
              setTransform = _ref.setTransform;

          if (scale === 1 && previousScale !== 1) {
            resetTransform();
          }

          return (
            /*#__PURE__*/
            _checkBEM(React, _ProductGalleryBaseImage__WEBPACK_IMPORTED_MODULE_6__["default"], {
              setTransform: setTransform,
              index: index,
              mediaData: mediaData,
              scale: scale,
              previousScale: previousScale,
              disableZoom: disableZoom,
              isZoomEnabled: isZoomEnabled
            })
          );
        })
      );
    }
    /**
     * Checks for the type of the slide and renders it accordingly
     * @param media
     * @param index
     * @returns {null|*}
     */

  }, {
    key: "renderSlide",
    value: function renderSlide(media, index) {
      var media_type = media.media_type;

      switch (media_type) {
        case _ProductGallery_config__WEBPACK_IMPORTED_MODULE_13__["IMAGE_TYPE"]:
          return this.renderImage(media, index);

        case _ProductGallery_config__WEBPACK_IMPORTED_MODULE_13__["VIDEO_TYPE"]:
          return this.renderVideo(media, index);

        case _ProductGallery_config__WEBPACK_IMPORTED_MODULE_13__["PLACEHOLDER_TYPE"]:
          return this.renderPlaceholder(index);

        default:
          return null;
      }
    }
  }, {
    key: "renderAdditionalPictures",
    value: function renderAdditionalPictures() {
      var _this$props3 = this.props,
          gallery = _this$props3.gallery,
          isImageZoomPopupActive = _this$props3.isImageZoomPopupActive,
          activeImage = _this$props3.activeImage,
          onActiveImageChange = _this$props3.onActiveImageChange;

      if (gallery.length === 1) {
        return (
          /*#__PURE__*/
          _checkBEM(React, "div", {
            block: "ProductGallery",
            elem: "Additional"
          })
        );
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductGallery",
          elem: "Additional",
          mods: {
            isImageZoomPopupActive: isImageZoomPopupActive
          }
        },
        /*#__PURE__*/
        _checkBEM(React, _CarouselScroll__WEBPACK_IMPORTED_MODULE_4__["default"], {
          activeItemId: activeImage,
          onChange: onActiveImageChange,
          showedItemCount: 4
        }, gallery.map(this.renderAdditionalPicture)))
      );
    }
  }, {
    key: "renderSlider",
    value: function renderSlider() {
      var _this$props4 = this.props,
          gallery = _this$props4.gallery,
          activeImage = _this$props4.activeImage,
          isZoomEnabled = _this$props4.isZoomEnabled,
          onActiveImageChange = _this$props4.onActiveImageChange,
          isImageZoomPopupActive = _this$props4.isImageZoomPopupActive,
          sliderRef = _this$props4.sliderRef;
      var mods = {
        isImageZoomPopupActive: isImageZoomPopupActive,
        isZoomInCursor: !isImageZoomPopupActive
      };
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          ref: this.imageRef,
          block: "ProductGallery",
          elem: "SliderWrapper"
        },
        /*#__PURE__*/
        _checkBEM(React, _Slider__WEBPACK_IMPORTED_MODULE_8__["default"], {
          sliderRef: sliderRef,
          mix: {
            block: 'ProductGallery',
            elem: 'Slider',
            mods: mods
          },
          showCrumbs: true,
          activeImage: activeImage,
          onActiveImageChange: onActiveImageChange,
          isInteractionDisabled: isZoomEnabled,
          onClick: this.handleSliderClick,
          sliderHeight: isImageZoomPopupActive ? '100%' : 0,
          isHeightTransitionDisabledOnMount: true
        }, gallery.map(this.renderSlide)))
      );
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductGallery"
        }, this.renderAdditionalPictures(), this.renderSlider(),
        /*#__PURE__*/
        _checkBEM(React, _VideoPopup__WEBPACK_IMPORTED_MODULE_9__["default"], null))
      );
    }
  }]);

  return _ProductGallery;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductGallery, 'name', {
  value: 'ProductGallery'
});

var ProductGallery = middleware(_ProductGallery, "Component/ProductGallery/Component");

_defineProperty(ProductGallery, "propTypes", {
  gallery: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
    id: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string]),
    image: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
    isPlaceholder: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
    alt: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
    type: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
  })).isRequired,
  productId: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  isZoomEnabled: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  activeImage: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number.isRequired,
  onActiveImageChange: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  handleZoomChange: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  registerSharedElementDestination: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  disableZoom: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  location: _type_Common__WEBPACK_IMPORTED_MODULE_11__["LocationType"].isRequired,
  sliderRef: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object.isRequired,
  handleImageZoomPopupActiveChange: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  isMobile: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  isImageZoomPopupActive: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired
});

_defineProperty(ProductGallery, "defaultProps", {
  productId: 0
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_router__WEBPACK_IMPORTED_MODULE_2__["withRouter"])(ProductGallery));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductGallery/ProductGallery.config.js":
/*!*******************************************************************!*\
  !*** ./src/app/component/ProductGallery/ProductGallery.config.js ***!
  \*******************************************************************/
/*! exports provided: MAX_ZOOM_SCALE, IMAGE_TYPE, VIDEO_TYPE, PLACEHOLDER_TYPE, THUMBNAIL_KEY, AMOUNT_OF_PLACEHOLDERS, PRODUCT_GALERY_POPUP_ID */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_ZOOM_SCALE", function() { return MAX_ZOOM_SCALE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IMAGE_TYPE", function() { return IMAGE_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VIDEO_TYPE", function() { return VIDEO_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLACEHOLDER_TYPE", function() { return PLACEHOLDER_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "THUMBNAIL_KEY", function() { return THUMBNAIL_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AMOUNT_OF_PLACEHOLDERS", function() { return AMOUNT_OF_PLACEHOLDERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PRODUCT_GALERY_POPUP_ID", function() { return PRODUCT_GALERY_POPUP_ID; });
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
var MAX_ZOOM_SCALE = 8;
var IMAGE_TYPE = 'image';
var VIDEO_TYPE = 'external-video';
var PLACEHOLDER_TYPE = 'placeholder';
var THUMBNAIL_KEY = 'small_image';
var AMOUNT_OF_PLACEHOLDERS = 0;
var PRODUCT_GALERY_POPUP_ID = 'ProductGalleryPopup';

/***/ }),

/***/ "./src/app/component/ProductGallery/ProductGallery.container.js":
/*!**********************************************************************!*\
  !*** ./src/app/component/ProductGallery/ProductGallery.container.js ***!
  \**********************************************************************/
/*! exports provided: mapStateToProps, mapDispatchToProps, _ProductGalleryContainer, ProductGalleryContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductGalleryContainer", function() { return _ProductGalleryContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductGalleryContainer", function() { return ProductGalleryContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var unstated__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! unstated */ "./node_modules/unstated/lib/unstated.es.js");
/* harmony import */ var _ImageZoomPopup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ImageZoomPopup */ "./src/app/component/ImageZoomPopup/index.js");
/* harmony import */ var _SharedTransition_SharedTransition_unstated__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../SharedTransition/SharedTransition.unstated */ "./src/app/component/SharedTransition/SharedTransition.unstated.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _ProductGallery_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ProductGallery.component */ "./src/app/component/ProductGallery/ProductGallery.component.js");
/* harmony import */ var _ProductGallery_config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ProductGallery.config */ "./src/app/component/ProductGallery/ProductGallery.config.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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









/** @namespace Component/ProductGallery/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    isMobile: state.ConfigReducer.device.isMobile
  };
}, "Component/ProductGallery/Container/mapStateToProps");
/** @namespace Component/ProductGallery/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars

var mapDispatchToProps = middleware(function (dispatch) {
  return {};
}, "Component/ProductGallery/Container/mapDispatchToProps");
/** @namespace Component/ProductGallery/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductGalleryContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductGalleryContainer, _Extensible);

  function _ProductGalleryContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ProductGalleryContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ProductGalleryContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "sliderRef",
    /*#__PURE__*/
    Object(react__WEBPACK_IMPORTED_MODULE_1__["createRef"])());

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      onActiveImageChange: _this.onActiveImageChange.bind(_assertThisInitialized(_this)),
      handleZoomChange: _this.handleZoomChange.bind(_assertThisInitialized(_this)),
      disableZoom: _this.disableZoom.bind(_assertThisInitialized(_this)),
      handleImageZoomPopupActiveChange: _this.handleImageZoomPopupActiveChange.bind(_assertThisInitialized(_this))
    });

    _defineProperty(_assertThisInitialized(_this), "containerProps", function () {
      var _this$state = _this.state,
          activeImage = _this$state.activeImage,
          isZoomEnabled = _this$state.isZoomEnabled,
          isImageZoomPopupActive = _this$state.isImageZoomPopupActive;
      var _this$props = _this.props,
          id = _this$props.product.id,
          isMobile = _this$props.isMobile;
      return {
        gallery: _this.getGalleryPictures(),
        productName: _this._getProductName(),
        activeImage: activeImage,
        isZoomEnabled: isZoomEnabled,
        productId: id,
        isMobile: isMobile,
        isImageZoomPopupActive: isImageZoomPopupActive,
        sliderRef: _this.sliderRef
      };
    });

    _defineProperty(_assertThisInitialized(_this), "handleImageZoomPopupClose", function () {
      _this.handleImageZoomPopupActiveChange(false);
    });

    return _this;
  }

  _createClass(_ProductGalleryContainer, [{
    key: "__construct",
    value: function __construct(props) {
      _get(_getPrototypeOf(_ProductGalleryContainer.prototype), "__construct", this).call(this, props);

      var id = props.product.id;
      this.state = {
        activeImage: 0,
        isZoomEnabled: false,
        prevProdId: id,
        isImageZoomPopupActive: false
      };
    }
  }, {
    key: "handleImageZoomPopupActiveChange",
    value: function handleImageZoomPopupActiveChange(isImageZoomPopupActive) {
      var isMobile = this.props.isMobile;

      if (isMobile) {
        return;
      }

      this.setState({
        isImageZoomPopupActive: isImageZoomPopupActive
      });
    }
  }, {
    key: "onActiveImageChange",
    value: function onActiveImageChange(activeImage) {
      this.setState({
        activeImage: activeImage,
        isZoomEnabled: false
      });
    }
  }, {
    key: "getGalleryPictures",
    value: function getGalleryPictures() {
      var _this$props2 = this.props,
          areDetailsLoaded = _this$props2.areDetailsLoaded,
          _this$props2$product = _this$props2.product,
          _this$props2$product$ = _this$props2$product.media_gallery_entries,
          mediaGallery = _this$props2$product$ === void 0 ? [] : _this$props2$product$,
          _this$props2$product$2 = _this$props2$product[_ProductGallery_config__WEBPACK_IMPORTED_MODULE_8__["THUMBNAIL_KEY"]];
      _this$props2$product$2 = _this$props2$product$2 === void 0 ? {} : _this$props2$product$2;
      var url = _this$props2$product$2.url,
          name = _this$props2$product.name;

      if (mediaGallery.length) {
        return Object.values(mediaGallery.reduce(function (acc, srcMedia) {
          var types = srcMedia.types,
              position = srcMedia.position,
              disabled = srcMedia.disabled;
          var canBeShown = !disabled;

          if (!canBeShown) {
            return acc;
          }

          var isThumbnail = types.includes(_ProductGallery_config__WEBPACK_IMPORTED_MODULE_8__["THUMBNAIL_KEY"]);
          var key = isThumbnail ? 0 : position + 1;
          return _objectSpread2(_objectSpread2({}, acc), {}, _defineProperty({}, key, srcMedia));
        }, {}));
      }

      if (!url) {
        return Array(_ProductGallery_config__WEBPACK_IMPORTED_MODULE_8__["AMOUNT_OF_PLACEHOLDERS"] + 1).fill({
          media_type: 'placeholder'
        });
      }

      var placeholders = !areDetailsLoaded ? Array(_ProductGallery_config__WEBPACK_IMPORTED_MODULE_8__["AMOUNT_OF_PLACEHOLDERS"]).fill({
        media_type: 'placeholder'
      }) : [];
      return [{
        thumbnail: {
          url: url
        },
        base: {
          url: url
        },
        id: _ProductGallery_config__WEBPACK_IMPORTED_MODULE_8__["THUMBNAIL_KEY"],
        label: name,
        media_type: _ProductGallery_config__WEBPACK_IMPORTED_MODULE_8__["IMAGE_TYPE"]
      }].concat(_toConsumableArray(placeholders));
    }
  }, {
    key: "_getProductName",

    /**
     * Returns the name of the product this gallery if for
     * @private
     */
    value: function _getProductName() {
      var name = this.props.product.name;
      return name;
    }
  }, {
    key: "disableZoom",
    value: function disableZoom() {
      document.documentElement.classList.remove('overscrollPrevented');
      this.setState({
        isZoomEnabled: false
      });
    }
  }, {
    key: "handleZoomChange",
    value: function handleZoomChange(args) {
      var isZoomEnabled = this.state.isZoomEnabled;

      if (args.scale !== 1) {
        if (isZoomEnabled) {
          return;
        }

        document.documentElement.classList.add('overscrollPrevented');
        this.setState({
          isZoomEnabled: true
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state2 = this.state,
          isImageZoomPopupActive = _this$state2.isImageZoomPopupActive,
          activeImage = _this$state2.activeImage;
      return (
        /*#__PURE__*/
        _checkBEM(React, _ImageZoomPopup__WEBPACK_IMPORTED_MODULE_4__["default"], {
          isActive: isImageZoomPopupActive,
          onClose: this.handleImageZoomPopupClose,
          activeImageId: activeImage,
          popupId: _ProductGallery_config__WEBPACK_IMPORTED_MODULE_8__["PRODUCT_GALERY_POPUP_ID"]
        },
        /*#__PURE__*/
        _checkBEM(React, unstated__WEBPACK_IMPORTED_MODULE_3__["Subscribe"], {
          to: [_SharedTransition_SharedTransition_unstated__WEBPACK_IMPORTED_MODULE_5__["default"]]
        }, function (_ref) {
          var registerSharedElementDestination = _ref.registerSharedElementDestination;
          return (
            /*#__PURE__*/
            _checkBEM(React, _ProductGallery_component__WEBPACK_IMPORTED_MODULE_7__["default"], _extends({
              registerSharedElementDestination: registerSharedElementDestination
            }, _this2.containerProps(), _this2.containerFunctions))
          );
        }))
      );
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var id = props.product.id;
      var prevProdId = state.prevProdId;

      if (prevProdId === id) {
        return null;
      }

      return {
        prevProdId: id,
        activeImage: 0
      };
    }
  }]);

  return _ProductGalleryContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductGalleryContainer, 'name', {
  value: 'ProductGalleryContainer'
});

var ProductGalleryContainer = middleware(_ProductGalleryContainer, "Component/ProductGallery/Container");

_defineProperty(ProductGalleryContainer, "propTypes", {
  product: _type_ProductList__WEBPACK_IMPORTED_MODULE_6__["ProductType"].isRequired,
  areDetailsLoaded: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  isMobile: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired
});

_defineProperty(ProductGalleryContainer, "defaultProps", {
  areDetailsLoaded: false
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(ProductGalleryContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/ProductGallery/ProductGallery.style.scss":
/*!********************************************************************!*\
  !*** ./src/app/component/ProductGallery/ProductGallery.style.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340474
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ProductGallery/index.js":
/*!***************************************************!*\
  !*** ./src/app/component/ProductGallery/index.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProductGallery_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductGallery.container */ "./src/app/component/ProductGallery/ProductGallery.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ProductGallery_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/ProductGalleryBaseImage/ProductGalleryBaseImage.component.js":
/*!****************************************************************************************!*\
  !*** ./src/app/component/ProductGalleryBaseImage/ProductGalleryBaseImage.component.js ***!
  \****************************************************************************************/
/*! exports provided: _ProductGalleryBaseImage, ProductGalleryBaseImage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductGalleryBaseImage", function() { return _ProductGalleryBaseImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductGalleryBaseImage", function() { return ProductGalleryBaseImage; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_zoom_pan_pinch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-zoom-pan-pinch */ "./node_modules/react-zoom-pan-pinch/dist/index.es.js");
/* harmony import */ var _Image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Image */ "./src/app/component/Image/index.js");
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




/** @namespace Component/ProductGalleryBaseImage/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductGalleryBaseImage =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductGalleryBaseImage, _Extensible);

  function _ProductGalleryBaseImage() {
    _classCallCheck(this, _ProductGalleryBaseImage);

    return _possibleConstructorReturn(this, _getPrototypeOf(_ProductGalleryBaseImage).apply(this, arguments));
  }

  _createClass(_ProductGalleryBaseImage, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          src = _this$props.src,
          alt = _this$props.alt;
      return (
        /*#__PURE__*/
        _checkBEM(React, react_zoom_pan_pinch__WEBPACK_IMPORTED_MODULE_2__["TransformComponent"], null,
        /*#__PURE__*/
        _checkBEM(React, _Image__WEBPACK_IMPORTED_MODULE_3__["default"], {
          src: src,
          ratio: "custom",
          mix: {
            block: 'ProductGallery',
            elem: 'SliderImage',
            mods: {
              isPlaceholder: !src
            }
          },
          isPlaceholder: !src,
          alt: alt
        }),
        /*#__PURE__*/
        _checkBEM(React, "img", {
          style: {
            display: 'none'
          },
          alt: alt,
          src: src,
          itemProp: "image"
        }))
      );
    }
  }]);

  return _ProductGalleryBaseImage;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductGalleryBaseImage, 'name', {
  value: 'ProductGalleryBaseImage'
});

var ProductGalleryBaseImage = middleware(_ProductGalleryBaseImage, "Component/ProductGalleryBaseImage/Component");

_defineProperty(ProductGalleryBaseImage, "propTypes", {
  src: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  alt: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (ProductGalleryBaseImage);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductGalleryBaseImage/ProductGalleryBaseImage.config.js":
/*!*************************************************************************************!*\
  !*** ./src/app/component/ProductGalleryBaseImage/ProductGalleryBaseImage.config.js ***!
  \*************************************************************************************/
/*! exports provided: TRANSFORMATION_DELAY, TRANSFORMATION_SPEED, INITIAL_SCALE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TRANSFORMATION_DELAY", function() { return TRANSFORMATION_DELAY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TRANSFORMATION_SPEED", function() { return TRANSFORMATION_SPEED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INITIAL_SCALE", function() { return INITIAL_SCALE; });
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
var TRANSFORMATION_DELAY = 0;
var TRANSFORMATION_SPEED = 0;
var INITIAL_SCALE = 1;

/***/ }),

/***/ "./src/app/component/ProductGalleryBaseImage/ProductGalleryBaseImage.container.js":
/*!****************************************************************************************!*\
  !*** ./src/app/component/ProductGalleryBaseImage/ProductGalleryBaseImage.container.js ***!
  \****************************************************************************************/
/*! exports provided: _ProductGalleryBaseImageContainer, ProductGalleryBaseImageContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductGalleryBaseImageContainer", function() { return _ProductGalleryBaseImageContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductGalleryBaseImageContainer", function() { return ProductGalleryBaseImageContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/es/index.js");
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _util_Media_Media__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/Media/Media */ "./src/app/util/Media/Media.js");
/* harmony import */ var _ProductGalleryBaseImage_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ProductGalleryBaseImage.component */ "./src/app/component/ProductGalleryBaseImage/ProductGalleryBaseImage.component.js");
/* harmony import */ var _ProductGalleryBaseImage_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ProductGalleryBaseImage.config */ "./src/app/component/ProductGalleryBaseImage/ProductGalleryBaseImage.config.js");
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







/** @namespace Component/ProductGalleryBaseImage/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductGalleryBaseImageContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductGalleryBaseImageContainer, _Extensible);

  function _ProductGalleryBaseImageContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ProductGalleryBaseImageContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ProductGalleryBaseImageContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerProps", function () {
      return {
        alt: _this._getAlt(),
        src: _this._getSrc()
      };
    });

    return _this;
  }

  _createClass(_ProductGalleryBaseImageContainer, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var _this$props = this.props,
          scale = _this$props.scale,
          id = _this$props.mediaData.id;
      var nextScale = nextProps.scale,
          nextId = nextProps.mediaData.id;

      if (scale !== nextScale || id !== nextId) {
        return true;
      }

      return false;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props2 = this.props,
          scale = _this$props2.scale,
          previousScale = _this$props2.previousScale,
          disableZoom = _this$props2.disableZoom,
          pathname = _this$props2.location.pathname,
          setTransform = _this$props2.setTransform;
      var prevPathname = prevProps.location.pathname;

      if (pathname !== prevPathname && scale !== _ProductGalleryBaseImage_config__WEBPACK_IMPORTED_MODULE_6__["INITIAL_SCALE"]) {
        setTimeout(function () {
          return setTransform(null, null, _ProductGalleryBaseImage_config__WEBPACK_IMPORTED_MODULE_6__["INITIAL_SCALE"], _ProductGalleryBaseImage_config__WEBPACK_IMPORTED_MODULE_6__["TRANSFORMATION_SPEED"]);
        }, _ProductGalleryBaseImage_config__WEBPACK_IMPORTED_MODULE_6__["TRANSFORMATION_DELAY"]);
      }

      if (scale === 1 && previousScale !== 1) {
        disableZoom();
      }
    }
  }, {
    key: "_getAlt",
    value: function _getAlt() {
      var _this$props$mediaData = this.props.mediaData;
      _this$props$mediaData = _this$props$mediaData === void 0 ? {} : _this$props$mediaData;
      var label = _this$props$mediaData.label;
      return label || '';
    }
  }, {
    key: "_getSrc",
    value: function _getSrc() {
      var _this$props3 = this.props,
          _this$props3$mediaDat = _this$props3.mediaData,
          file = _this$props3$mediaDat.file,
          _this$props3$mediaDat2 = _this$props3$mediaDat.base;
      _this$props3$mediaDat2 = _this$props3$mediaDat2 === void 0 ? {} : _this$props3$mediaDat2;
      var baseUrl = _this$props3$mediaDat2.url,
          isZoomEnabled = _this$props3.isZoomEnabled;

      if (!isZoomEnabled) {
        return baseUrl || Object(_util_Media_Media__WEBPACK_IMPORTED_MODULE_4__["default"])(file, _util_Media_Media__WEBPACK_IMPORTED_MODULE_4__["PRODUCT_MEDIA"]);
      }

      return file ? Object(_util_Media_Media__WEBPACK_IMPORTED_MODULE_4__["default"])(file, _util_Media_Media__WEBPACK_IMPORTED_MODULE_4__["PRODUCT_MEDIA"]) : baseUrl;
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _ProductGalleryBaseImage_component__WEBPACK_IMPORTED_MODULE_5__["default"], this.containerProps())
      );
    }
  }]);

  return _ProductGalleryBaseImageContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));
Object.defineProperty(_ProductGalleryBaseImageContainer, 'name', {
  value: 'ProductGalleryBaseImageContainer'
});

var ProductGalleryBaseImageContainer = middleware(_ProductGalleryBaseImageContainer, "Component/ProductGalleryBaseImage/Container");

_defineProperty(ProductGalleryBaseImageContainer, "propTypes", {
  disableZoom: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  scale: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number.isRequired,
  previousScale: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number.isRequired,
  index: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number.isRequired,
  mediaData: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
    id: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number]),
    label: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
    file: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
    base: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
      url: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
    })
  }).isRequired,
  isZoomEnabled: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  setTransform: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  location: _type_Common__WEBPACK_IMPORTED_MODULE_3__["LocationType"].isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_router__WEBPACK_IMPORTED_MODULE_2__["withRouter"])(ProductGalleryBaseImageContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductGalleryBaseImage/index.js":
/*!************************************************************!*\
  !*** ./src/app/component/ProductGalleryBaseImage/index.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProductGalleryBaseImage_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductGalleryBaseImage.container */ "./src/app/component/ProductGalleryBaseImage/ProductGalleryBaseImage.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ProductGalleryBaseImage_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/ProductGalleryThumbnailImage/ProductGalleryThumbnailImage.component.js":
/*!**************************************************************************************************!*\
  !*** ./src/app/component/ProductGalleryThumbnailImage/ProductGalleryThumbnailImage.component.js ***!
  \**************************************************************************************************/
/*! exports provided: _ProductGalleryThumbnailImage, ProductGalleryThumbnailImage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductGalleryThumbnailImage", function() { return _ProductGalleryThumbnailImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductGalleryThumbnailImage", function() { return ProductGalleryThumbnailImage; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Image */ "./src/app/component/Image/index.js");
/* harmony import */ var _ProductGallery_ProductGallery_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ProductGallery/ProductGallery.config */ "./src/app/component/ProductGallery/ProductGallery.config.js");
/* harmony import */ var _util_Media__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/Media */ "./src/app/util/Media/index.js");
/* harmony import */ var _ProductGalleryThumbnailImage_style__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ProductGalleryThumbnailImage.style */ "./src/app/component/ProductGalleryThumbnailImage/ProductGalleryThumbnailImage.style.scss");
/* harmony import */ var _ProductGalleryThumbnailImage_style__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ProductGalleryThumbnailImage_style__WEBPACK_IMPORTED_MODULE_5__);
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






/** @namespace Component/ProductGalleryThumbnailImage/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductGalleryThumbnailImage =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductGalleryThumbnailImage, _Extensible);

  function _ProductGalleryThumbnailImage() {
    _classCallCheck(this, _ProductGalleryThumbnailImage);

    return _possibleConstructorReturn(this, _getPrototypeOf(_ProductGalleryThumbnailImage).apply(this, arguments));
  }

  _createClass(_ProductGalleryThumbnailImage, [{
    key: "renderMedia",
    value: function renderMedia() {
      var media_type = this.props.media.media_type;

      switch (media_type) {
        case _ProductGallery_ProductGallery_config__WEBPACK_IMPORTED_MODULE_3__["VIDEO_TYPE"]:
          return this.renderVideo();

        case _ProductGallery_ProductGallery_config__WEBPACK_IMPORTED_MODULE_3__["IMAGE_TYPE"]:
          return this.renderImage();

        case _ProductGallery_ProductGallery_config__WEBPACK_IMPORTED_MODULE_3__["PLACEHOLDER_TYPE"]:
          return this.renderPlaceholder();

        default:
          return null;
      }
    }
  }, {
    key: "renderPlaceholder",
    value: function renderPlaceholder() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _Image__WEBPACK_IMPORTED_MODULE_2__["default"], {
          ratio: "custom",
          mix: {
            block: 'ProductGalleryThumbnailImage'
          },
          isPlaceholder: true
        })
      );
    }
  }, {
    key: "renderVideo",
    value: function renderVideo() {
      var _this$props$media = this.props.media,
          url = _this$props$media.thumbnail.url,
          label = _this$props$media.label;
      return (
        /*#__PURE__*/
        _checkBEM(React, _Image__WEBPACK_IMPORTED_MODULE_2__["default"], {
          ratio: "custom",
          src: url,
          alt: label,
          mix: {
            block: 'ProductGalleryThumbnailImage'
          }
        })
      );
    }
  }, {
    key: "renderImage",
    value: function renderImage() {
      var _this$props$media2 = this.props.media,
          alt = _this$props$media2.label,
          file = _this$props$media2.file,
          _this$props$media2$th = _this$props$media2.thumbnail;
      _this$props$media2$th = _this$props$media2$th === void 0 ? {} : _this$props$media2$th;
      var thumbnailUrl = _this$props$media2$th.url,
          id = _this$props$media2.id;

      if (id === _ProductGallery_ProductGallery_config__WEBPACK_IMPORTED_MODULE_3__["THUMBNAIL_KEY"]) {
        return this.renderPlaceholder();
      }

      var src = thumbnailUrl || Object(_util_Media__WEBPACK_IMPORTED_MODULE_4__["default"])(file, _util_Media__WEBPACK_IMPORTED_MODULE_4__["PRODUCT_MEDIA"]);
      return (
        /*#__PURE__*/
        _checkBEM(React, _Image__WEBPACK_IMPORTED_MODULE_2__["default"], {
          src: src,
          alt: alt,
          ratio: "custom",
          mix: {
            block: 'ProductGalleryThumbnailImage'
          }
        })
      );
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductGalleryThumbnailImage"
        }, this.renderMedia())
      );
    }
  }]);

  return _ProductGalleryThumbnailImage;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductGalleryThumbnailImage, 'name', {
  value: 'ProductGalleryThumbnailImage'
});

var ProductGalleryThumbnailImage = middleware(_ProductGalleryThumbnailImage, "Component/ProductGalleryThumbnailImage/Component");

_defineProperty(ProductGalleryThumbnailImage, "propTypes", {
  media: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
    label: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
    file: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
    media_type: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
    id: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number]),
    thumbnail: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
      url: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
    })
  }).isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (ProductGalleryThumbnailImage);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductGalleryThumbnailImage/ProductGalleryThumbnailImage.style.scss":
/*!************************************************************************************************!*\
  !*** ./src/app/component/ProductGalleryThumbnailImage/ProductGalleryThumbnailImage.style.scss ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340801
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ProductGalleryThumbnailImage/index.js":
/*!*****************************************************************!*\
  !*** ./src/app/component/ProductGalleryThumbnailImage/index.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProductGalleryThumbnailImage_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductGalleryThumbnailImage.component */ "./src/app/component/ProductGalleryThumbnailImage/ProductGalleryThumbnailImage.component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ProductGalleryThumbnailImage_component__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/ProductInformation/ProductInformation.component.js":
/*!******************************************************************************!*\
  !*** ./src/app/component/ProductInformation/ProductInformation.component.js ***!
  \******************************************************************************/
/*! exports provided: _ProductInformation, ProductInformation, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductInformation", function() { return _ProductInformation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductInformation", function() { return ProductInformation; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ContentWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ContentWrapper */ "./src/app/component/ContentWrapper/index.js");
/* harmony import */ var _ExpandableContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ExpandableContent */ "./src/app/component/ExpandableContent/index.js");
/* harmony import */ var _Html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Html */ "./src/app/component/Html/index.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _ProductInformation_style__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ProductInformation.style */ "./src/app/component/ProductInformation/ProductInformation.style.scss");
/* harmony import */ var _ProductInformation_style__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_ProductInformation_style__WEBPACK_IMPORTED_MODULE_6__);
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







/** @namespace Component/ProductInformation/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductInformation =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductInformation, _Extensible);

  function _ProductInformation() {
    _classCallCheck(this, _ProductInformation);

    return _possibleConstructorReturn(this, _getPrototypeOf(_ProductInformation).apply(this, arguments));
  }

  _createClass(_ProductInformation, [{
    key: "renderDescription",
    value: function renderDescription() {
      var _this$props$product$d = this.props.product.description;
      _this$props$product$d = _this$props$product$d === void 0 ? {} : _this$props$product$d;
      var html = _this$props$product$d.html;

      if (!html) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "div", null,
        /*#__PURE__*/
        _checkBEM(React, _Html__WEBPACK_IMPORTED_MODULE_4__["default"], {
          content: html
        }))
      );
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var areDetailsLoaded = this.props.areDetailsLoaded;
      var heading = areDetailsLoaded ? __('Product information') : '';
      return (
        /*#__PURE__*/
        _checkBEM(React, _ExpandableContent__WEBPACK_IMPORTED_MODULE_3__["default"] // show placeholder if the details are not loaded
        , {
          heading: heading,
          mix: {
            block: 'ProductInformation',
            elem: 'Content'
          }
        }, this.renderDescription())
      );
    }
  }, {
    key: "isHTMLWhiteSpaceOrUndefined",
    value: function isHTMLWhiteSpaceOrUndefined(htmlString) {
      if (!htmlString || htmlString.trim() === '') {
        return true;
      } // creates a DOM object from string


      var parser = new DOMParser();
      var document = parser.parseFromString(htmlString.trim(), 'text/html'); // handles the case of plain text

      if (document.body.children.length === 0) {
        return false;
      } // check if at least one HTML element has content


      var elementsWithContent = Array.from(document.body.children).filter(function (element) {
        return element.innerText !== '';
      });
      return elementsWithContent.length === 0;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          areDetailsLoaded = _this$props.areDetailsLoaded,
          _this$props$product$d2 = _this$props.product.description;
      _this$props$product$d2 = _this$props$product$d2 === void 0 ? {} : _this$props$product$d2;
      var html = _this$props$product$d2.html;

      if (this.isHTMLWhiteSpaceOrUndefined(html) && areDetailsLoaded) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, _ContentWrapper__WEBPACK_IMPORTED_MODULE_2__["default"], {
          label: "Product information",
          mix: {
            block: 'ProductInformation'
          },
          wrapperMix: {
            block: 'ProductInformation',
            elem: 'Wrapper'
          }
        }, this.renderContent())
      );
    }
  }]);

  return _ProductInformation;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductInformation, 'name', {
  value: 'ProductInformation'
});

var ProductInformation = middleware(_ProductInformation, "Component/ProductInformation/Component");

_defineProperty(ProductInformation, "propTypes", {
  product: _type_ProductList__WEBPACK_IMPORTED_MODULE_5__["ProductType"].isRequired,
  areDetailsLoaded: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (ProductInformation);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductInformation/ProductInformation.style.scss":
/*!****************************************************************************!*\
  !*** ./src/app/component/ProductInformation/ProductInformation.style.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340235
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ProductInformation/index.js":
/*!*******************************************************!*\
  !*** ./src/app/component/ProductInformation/index.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProductInformation_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductInformation.component */ "./src/app/component/ProductInformation/ProductInformation.component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ProductInformation_component__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/ProductReviewForm/ProductReviewForm.component.js":
/*!****************************************************************************!*\
  !*** ./src/app/component/ProductReviewForm/ProductReviewForm.component.js ***!
  \****************************************************************************/
/*! exports provided: _ProductReviewForm, ProductReviewForm, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, __, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductReviewForm", function() { return _ProductReviewForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductReviewForm", function() { return ProductReviewForm; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Field */ "./src/app/component/Field/index.js");
/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Form */ "./src/app/component/Form/index.js");
/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Loader */ "./src/app/component/Loader/index.js");
/* harmony import */ var _ReviewStar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ReviewStar */ "./src/app/component/ReviewStar/index.js");
/* harmony import */ var _type_Rating__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../type/Rating */ "./src/app/type/Rating.js");
/* harmony import */ var _ProductReviewForm_style__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ProductReviewForm.style */ "./src/app/component/ProductReviewForm/ProductReviewForm.style.scss");
/* harmony import */ var _ProductReviewForm_style__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_ProductReviewForm_style__WEBPACK_IMPORTED_MODULE_7__);
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
 * ProductReviewForm
 * @class ProductReviewForm
 * @namespace Component/ProductReviewForm/Component
 */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductReviewForm =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductReviewForm, _Extensible);

  function _ProductReviewForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ProductReviewForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ProductReviewForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "ratingTitleMap", {
      1: __('Awful'),
      2: __('Bad'),
      3: __('Average'),
      4: __('Good'),
      5: __('Awesome')
    });

    return _this;
  }

  _createClass(_ProductReviewForm, [{
    key: "renderReviewStar",
    value: function renderReviewStar(options, rating_id) {
      var _this$props = this.props,
          ratingData = _this$props.ratingData,
          onStarRatingClick = _this$props.onStarRatingClick;
      var option_id = options.option_id,
          value = options.value;
      var isChecked = !!ratingData[rating_id] && ratingData[rating_id] === option_id;
      return (
        /*#__PURE__*/
        _checkBEM(React, _ReviewStar__WEBPACK_IMPORTED_MODULE_5__["default"], {
          key: option_id,
          name: rating_id,
          value: value,
          title: this.ratingTitleMap[value],
          isChecked: isChecked,
          option_id: option_id,
          rating_id: rating_id,
          onStarRatingClick: onStarRatingClick
        })
      );
    }
  }, {
    key: "renderReviewRating",
    value: function renderReviewRating() {
      var _this2 = this;

      var reviewRatings = this.props.reviewRatings;
      return reviewRatings.map(function (rating) {
        var rating_id = rating.rating_id,
            rating_code = rating.rating_code,
            rating_options = rating.rating_options;
        return (
          /*#__PURE__*/
          _checkBEM(React, "fieldset", {
            block: "ProductReviewForm",
            elem: "Rating",
            key: rating_id
          },
          /*#__PURE__*/
          _checkBEM(React, "legend", {
            block: "ProductReviewForm",
            elem: "Legend"
          }, rating_code), rating_options.sort(function (_ref, _ref2) {
            var value = _ref.value;
            var nextValue = _ref2.value;
            return nextValue - value;
          }).map(function (option) {
            return _this2.renderReviewStar(option, rating_id);
          }))
        );
      });
    }
  }, {
    key: "renderButton",
    value: function renderButton() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "button", {
          block: "ProductReviewForm",
          elem: "Button",
          type: "submit",
          mix: {
            block: 'Button'
          }
        }, __('Submit Review'))
      );
    }
  }, {
    key: "renderReviewFormContent",
    value: function renderReviewFormContent() {
      var _this$props2 = this.props,
          handleNicknameChange = _this$props2.handleNicknameChange,
          handleSummaryChange = _this$props2.handleSummaryChange,
          handleDetailChange = _this$props2.handleDetailChange,
          reviewData = _this$props2.reviewData;
      var _reviewData$nickname = reviewData.nickname,
          nickname = _reviewData$nickname === void 0 ? '' : _reviewData$nickname,
          _reviewData$summary = reviewData.summary,
          summary = _reviewData$summary === void 0 ? '' : _reviewData$summary,
          _reviewData$detail = reviewData.detail,
          detail = _reviewData$detail === void 0 ? '' : _reviewData$detail;
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductReviewForm",
          elem: "Wrapper"
        },
        /*#__PURE__*/
        _checkBEM(React, "div", null, this.renderReviewRating()),
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductReviewForm",
          elem: "Content"
        },
        /*#__PURE__*/
        _checkBEM(React, _Field__WEBPACK_IMPORTED_MODULE_2__["default"], {
          type: "text",
          label: __('Nickname'),
          id: "nickname",
          name: "nickname",
          validation: ['notEmpty'],
          value: nickname,
          onChange: handleNicknameChange
        }),
        /*#__PURE__*/
        _checkBEM(React, _Field__WEBPACK_IMPORTED_MODULE_2__["default"], {
          type: "text",
          label: __('Summary'),
          id: "title",
          name: "title",
          validation: ['notEmpty'],
          value: summary,
          onChange: handleSummaryChange
        }),
        /*#__PURE__*/
        _checkBEM(React, _Field__WEBPACK_IMPORTED_MODULE_2__["default"], {
          type: "textarea",
          label: __('Review'),
          id: "detail",
          name: "detail",
          validation: ['notEmpty'],
          value: detail,
          onChange: handleDetailChange
        })))
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          isLoading = _this$props3.isLoading,
          onReviewSubmitAttempt = _this$props3.onReviewSubmitAttempt,
          onReviewSubmitSuccess = _this$props3.onReviewSubmitSuccess,
          onReviewError = _this$props3.onReviewError;
      return (
        /*#__PURE__*/
        _checkBEM(React, _Form__WEBPACK_IMPORTED_MODULE_3__["default"], {
          key: "product-review",
          mix: {
            block: 'ProductReviewForm'
          },
          onSubmit: onReviewSubmitAttempt,
          onSubmitSuccess: onReviewSubmitSuccess,
          onSubmitError: onReviewError
        },
        /*#__PURE__*/
        _checkBEM(React, _Loader__WEBPACK_IMPORTED_MODULE_4__["default"], {
          isLoading: isLoading
        }), this.renderReviewFormContent(), this.renderButton())
      );
    }
  }]);

  return _ProductReviewForm;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductReviewForm, 'name', {
  value: 'ProductReviewForm'
});

var ProductReviewForm = middleware(_ProductReviewForm, "Component/ProductReviewForm/Component");

_defineProperty(ProductReviewForm, "propTypes", {
  reviewRatings: _type_Rating__WEBPACK_IMPORTED_MODULE_6__["RatingItemsType"].isRequired,
  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  onReviewSubmitAttempt: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  onReviewSubmitSuccess: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  onReviewError: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  onStarRatingClick: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  handleNicknameChange: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  handleSummaryChange: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  handleDetailChange: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  ratingData: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string).isRequired,
  reviewData: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
    nickname: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
    summary: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
    detail: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
  }).isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (ProductReviewForm);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductReviewForm/ProductReviewForm.container.js":
/*!****************************************************************************!*\
  !*** ./src/app/component/ProductReviewForm/ProductReviewForm.container.js ***!
  \****************************************************************************/
/*! exports provided: ReviewDispatcher, mapStateToProps, mapDispatchToProps, _ProductReviewFormContainer, ProductReviewFormContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReviewDispatcher", function() { return ReviewDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductReviewFormContainer", function() { return _ProductReviewFormContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductReviewFormContainer", function() { return ProductReviewFormContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store/Navigation/Navigation.action */ "./src/app/store/Navigation/Navigation.action.js");
/* harmony import */ var _store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/Navigation/Navigation.reducer */ "./src/app/store/Navigation/Navigation.reducer.js");
/* harmony import */ var _store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store/Notification/Notification.action */ "./src/app/store/Notification/Notification.action.js");
/* harmony import */ var _store_Overlay_Overlay_action__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../store/Overlay/Overlay.action */ "./src/app/store/Overlay/Overlay.action.js");
/* harmony import */ var _type_Account__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../type/Account */ "./src/app/type/Account.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _type_Rating__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../type/Rating */ "./src/app/type/Rating.js");
/* harmony import */ var _ProductReviewForm_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ProductReviewForm.component */ "./src/app/component/ProductReviewForm/ProductReviewForm.component.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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











var ReviewDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/Review/Review.dispatcher */ "./src/app/store/Review/Review.dispatcher.js"));
/** @namespace Component/ProductReviewForm/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    customer: state.MyAccountReducer.customer,
    isSignedIn: state.MyAccountReducer.isSignedIn,
    reviewRatings: state.ConfigReducer.reviewRatings
  };
}, "Component/ProductReviewForm/Container/mapStateToProps");
/** @namespace Component/ProductReviewForm/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    addReview: function addReview(options) {
      return ReviewDispatcher.then(function (_ref) {
        var dispatcher = _ref.default;
        return dispatcher.submitProductReview(dispatch, options);
      });
    },
    showNotification: function showNotification(type, message) {
      return dispatch(Object(_store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_5__["showNotification"])(type, message));
    },
    hideActiveOverlay: function hideActiveOverlay() {
      return dispatch(Object(_store_Overlay_Overlay_action__WEBPACK_IMPORTED_MODULE_6__["hideActiveOverlay"])());
    },
    goToPreviousHeaderState: function goToPreviousHeaderState() {
      return dispatch(Object(_store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_3__["goToPreviousNavigationState"])(_store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_4__["TOP_NAVIGATION_TYPE"]));
    }
  };
}, "Component/ProductReviewForm/Container/mapDispatchToProps");
/** @namespace Component/ProductReviewForm/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductReviewFormContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductReviewFormContainer, _Extensible);

  function _ProductReviewFormContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ProductReviewFormContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ProductReviewFormContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      onReviewSubmitAttempt: _this._onReviewSubmitAttempt.bind(_assertThisInitialized(_this)),
      onReviewSubmitSuccess: _this._onReviewSubmitSuccess.bind(_assertThisInitialized(_this)),
      onStarRatingClick: _this._onStarRatingClick.bind(_assertThisInitialized(_this)),
      handleNicknameChange: _this._handleFieldChange.bind(_assertThisInitialized(_this), 'nickname'),
      handleSummaryChange: _this._handleFieldChange.bind(_assertThisInitialized(_this), 'summary'),
      handleDetailChange: _this._handleFieldChange.bind(_assertThisInitialized(_this), 'detail'),
      onReviewError: _this._onReviewError.bind(_assertThisInitialized(_this))
    });

    return _this;
  }

  _createClass(_ProductReviewFormContainer, [{
    key: "__construct",
    value: function __construct(props) {
      _get(_getPrototypeOf(_ProductReviewFormContainer.prototype), "__construct", this).call(this, props);

      var nickname = this.props.customer.firstname;
      var reviewData = {
        nickname: nickname
      };
      this.state = {
        isLoading: false,
        ratingData: {},
        reviewData: reviewData
      };
    }
  }, {
    key: "_onReviewError",
    value: function _onReviewError() {
      this.setState({
        isLoading: false
      });
    }
  }, {
    key: "_onReviewSubmitAttempt",
    value: function _onReviewSubmitAttempt(_, invalidFields) {
      var _this$props = this.props,
          showNotification = _this$props.showNotification,
          reviewRatings = _this$props.reviewRatings;
      var ratingData = this.state.ratingData;
      var reviewsAreNotValid = invalidFields || !reviewRatings.every(function (_ref2) {
        var rating_id = _ref2.rating_id;
        return ratingData[rating_id];
      });

      if (reviewsAreNotValid) {
        showNotification('info', 'Incorrect data! Please check review fields.');
      }

      this.setState({
        isLoading: !reviewsAreNotValid
      });
    }
  }, {
    key: "_onReviewSubmitSuccess",
    value: function _onReviewSubmitSuccess(fields) {
      var _this2 = this;

      var _this$props2 = this.props,
          product = _this$props2.product,
          addReview = _this$props2.addReview,
          hideActiveOverlay = _this$props2.hideActiveOverlay,
          goToPreviousHeaderState = _this$props2.goToPreviousHeaderState;
      var _this$state = this.state,
          rating_data = _this$state.ratingData,
          isLoading = _this$state.isLoading;
      var nickname = fields.nickname,
          title = fields.title,
          detail = fields.detail;
      var product_sku = product.sku;

      if (Object.keys(rating_data).length && isLoading) {
        addReview({
          nickname: nickname,
          title: title,
          detail: detail,
          product_sku: product_sku,
          rating_data: rating_data
        }).then(
        /** @namespace Component/ProductReviewForm/Container/addReviewThen */
        middleware(function (success) {
          if (success) {
            _this2.setState({
              ratingData: {},
              reviewData: {},
              isLoading: false
            });

            goToPreviousHeaderState();
            hideActiveOverlay();
            return;
          }

          _this2.setState({
            isLoading: false
          });
        }, "Component/ProductReviewForm/Container/addReviewThen"));
      }
    }
  }, {
    key: "_onStarRatingClick",
    value: function _onStarRatingClick(rating_id, option_id) {
      this.setState(function (_ref3) {
        var ratingData = _ref3.ratingData;
        return {
          ratingData: _objectSpread2(_objectSpread2({}, ratingData), {}, _defineProperty({}, rating_id, option_id))
        };
      });
    }
  }, {
    key: "_handleFieldChange",
    value: function _handleFieldChange(fieldName, value) {
      this.setState(function (_ref4) {
        var reviewData = _ref4.reviewData;
        return {
          reviewData: _objectSpread2(_objectSpread2({}, reviewData), {}, _defineProperty({}, fieldName, value))
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _ProductReviewForm_component__WEBPACK_IMPORTED_MODULE_10__["default"], _extends({}, this.props, this.containerFunctions, this.state))
      );
    }
  }]);

  return _ProductReviewFormContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductReviewFormContainer, 'name', {
  value: 'ProductReviewFormContainer'
});

var ProductReviewFormContainer = middleware(_ProductReviewFormContainer, "Component/ProductReviewForm/Container");

_defineProperty(ProductReviewFormContainer, "propTypes", {
  showNotification: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  goToPreviousHeaderState: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  hideActiveOverlay: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  reviewRatings: _type_Rating__WEBPACK_IMPORTED_MODULE_9__["RatingItemsType"].isRequired,
  product: _type_ProductList__WEBPACK_IMPORTED_MODULE_8__["ProductType"].isRequired,
  addReview: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  customer: _type_Account__WEBPACK_IMPORTED_MODULE_7__["customerType"].isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(ProductReviewFormContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/ProductReviewForm/ProductReviewForm.style.scss":
/*!**************************************************************************!*\
  !*** ./src/app/component/ProductReviewForm/ProductReviewForm.style.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340693
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ProductReviewForm/index.js":
/*!******************************************************!*\
  !*** ./src/app/component/ProductReviewForm/index.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProductReviewForm_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductReviewForm.container */ "./src/app/component/ProductReviewForm/ProductReviewForm.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ProductReviewForm_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/ProductReviewItem/ProductReviewItem.component.js":
/*!****************************************************************************!*\
  !*** ./src/app/component/ProductReviewItem/ProductReviewItem.component.js ***!
  \****************************************************************************/
/*! exports provided: _ProductReviewItem, ProductReviewItem, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductReviewItem", function() { return _ProductReviewItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductReviewItem", function() { return ProductReviewItem; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ProductReviewRating__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ProductReviewRating */ "./src/app/component/ProductReviewRating/index.js");
/* harmony import */ var _ProductReviewItem_style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ProductReviewItem.style */ "./src/app/component/ProductReviewItem/ProductReviewItem.style.scss");
/* harmony import */ var _ProductReviewItem_style__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ProductReviewItem_style__WEBPACK_IMPORTED_MODULE_3__);
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
 * @class ProductReviewItem
 * @namespace Component/ProductReviewItem/Component
 */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductReviewItem =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductReviewItem, _Extensible);

  function _ProductReviewItem() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ProductReviewItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ProductReviewItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "renderReviewListItemRating", function (ratingVoteItem, i) {
      var rating_code = ratingVoteItem.rating_code,
          percent = ratingVoteItem.percent;
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          key: i,
          block: "ProductReviewItem",
          elem: "RatingSummaryItem",
          itemType: "http://schema.org/Rating",
          itemScope: true,
          itemProp: "reviewRating"
        },
        /*#__PURE__*/
        _checkBEM(React, "p", {
          itemProp: "name"
        }, rating_code),
        /*#__PURE__*/
        _checkBEM(React, "meta", {
          itemProp: "ratingValue",
          content: percent
        }),
        /*#__PURE__*/
        _checkBEM(React, "meta", {
          itemProp: "worstRating",
          content: 0
        }),
        /*#__PURE__*/
        _checkBEM(React, "meta", {
          itemProp: "bestRating",
          content: 100
        }),
        /*#__PURE__*/
        _checkBEM(React, _ProductReviewRating__WEBPACK_IMPORTED_MODULE_2__["default"], {
          summary: percent,
          code: rating_code
        }))
      );
    });

    return _this;
  }

  _createClass(_ProductReviewItem, [{
    key: "getFormattedDate",
    value: function getFormattedDate(created_at) {
      // Safari bug
      var fixedDate = created_at.replace(/-/g, '/');
      var date = new Date(fixedDate);
      return date ? date.toDateString() : created_at;
    }
  }, {
    key: "renderAuthor",
    value: function renderAuthor(reviewItem) {
      var nickname = reviewItem.nickname,
          created_at = reviewItem.created_at;
      return (
        /*#__PURE__*/
        _checkBEM(React, "p", {
          block: "ProductReviewItem",
          elem: "ReviewAuthor"
        }, __('Written by '),
        /*#__PURE__*/
        _checkBEM(React, "strong", {
          itemProp: "author"
        }, nickname),
        /*#__PURE__*/
        _checkBEM(React, "meta", {
          itemProp: "datePublished",
          content: this.getFormattedDate(created_at)
        }), __(', written at %s', this.getFormattedDate(created_at)))
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          reviewItem = _this$props.reviewItem,
          _this$props$reviewIte = _this$props.reviewItem,
          title = _this$props$reviewIte.title,
          detail = _this$props$reviewIte.detail,
          rating_votes = _this$props$reviewIte.rating_votes;
      return (
        /*#__PURE__*/
        _checkBEM(React, "li", {
          block: "ProductReviewItem",
          itemType: "http://schema.org/Review",
          itemProp: "review",
          itemScope: true
        },
        /*#__PURE__*/
        _checkBEM(React, "h4", {
          block: "ProductReviewItem",
          elem: "ReviewTitle",
          itemProp: "name"
        }, title),
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductReviewItem",
          elem: "RatingSummary"
        }, rating_votes.map(this.renderReviewListItemRating)),
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductReviewItem",
          elem: "ReviewContent"
        },
        /*#__PURE__*/
        _checkBEM(React, "p", {
          block: "ProductReviewItem",
          elem: "ReviewDetails",
          itemProp: "reviewBody"
        }, detail), this.renderAuthor(reviewItem)))
      );
    }
  }]);

  return _ProductReviewItem;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductReviewItem, 'name', {
  value: 'ProductReviewItem'
});

var ProductReviewItem = middleware(_ProductReviewItem, "Component/ProductReviewItem/Component");

_defineProperty(ProductReviewItem, "propTypes", {
  reviewItem: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (ProductReviewItem);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductReviewItem/ProductReviewItem.style.scss":
/*!**************************************************************************!*\
  !*** ./src/app/component/ProductReviewItem/ProductReviewItem.style.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608294466438
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ProductReviewItem/index.js":
/*!******************************************************!*\
  !*** ./src/app/component/ProductReviewItem/index.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProductReviewItem_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductReviewItem.component */ "./src/app/component/ProductReviewItem/ProductReviewItem.component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ProductReviewItem_component__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/ProductReviewList/ProductReviewList.component.js":
/*!****************************************************************************!*\
  !*** ./src/app/component/ProductReviewList/ProductReviewList.component.js ***!
  \****************************************************************************/
/*! exports provided: _ProductReviewList, ProductReviewList, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductReviewList", function() { return _ProductReviewList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductReviewList", function() { return ProductReviewList; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ProductReviewItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ProductReviewItem */ "./src/app/component/ProductReviewItem/index.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _ProductReviewList_style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ProductReviewList.style */ "./src/app/component/ProductReviewList/ProductReviewList.style.scss");
/* harmony import */ var _ProductReviewList_style__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ProductReviewList_style__WEBPACK_IMPORTED_MODULE_3__);
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
 * @class ProductReviewList
 * @namespace Component/ProductReviewList/Component
 */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductReviewList =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductReviewList, _Extensible);

  function _ProductReviewList() {
    _classCallCheck(this, _ProductReviewList);

    return _possibleConstructorReturn(this, _getPrototypeOf(_ProductReviewList).apply(this, arguments));
  }

  _createClass(_ProductReviewList, [{
    key: "renderReviews",
    value: function renderReviews() {
      var reviews = this.props.product.reviews;
      return reviews.map(function (reviewItem, i) {
        return (
          /*#__PURE__*/
          _checkBEM(React, _ProductReviewItem__WEBPACK_IMPORTED_MODULE_1__["default"], {
            reviewItem: reviewItem // eslint-disable-next-line react/no-array-index-key
            ,
            key: i
          })
        );
      });
    }
  }, {
    key: "render",
    value: function render() {
      var product = this.props.product;
      var hasReviews = product.reviews && Object.keys(product.reviews).length > 0;

      if (!hasReviews) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "ul", {
          block: "ProductReviewList"
        }, this.renderReviews())
      );
    }
  }]);

  return _ProductReviewList;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]));
Object.defineProperty(_ProductReviewList, 'name', {
  value: 'ProductReviewList'
});

var ProductReviewList = middleware(_ProductReviewList, "Component/ProductReviewList/Component");

_defineProperty(ProductReviewList, "propTypes", {
  product: _type_ProductList__WEBPACK_IMPORTED_MODULE_2__["ProductType"].isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (ProductReviewList);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductReviewList/ProductReviewList.style.scss":
/*!**************************************************************************!*\
  !*** ./src/app/component/ProductReviewList/ProductReviewList.style.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340610
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ProductReviewList/index.js":
/*!******************************************************!*\
  !*** ./src/app/component/ProductReviewList/index.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProductReviewList_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductReviewList.component */ "./src/app/component/ProductReviewList/ProductReviewList.component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ProductReviewList_component__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/ProductReviews/ProductReviews.component.js":
/*!**********************************************************************!*\
  !*** ./src/app/component/ProductReviews/ProductReviews.component.js ***!
  \**********************************************************************/
/*! exports provided: _ProductReviews, ProductReviews, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductReviews", function() { return _ProductReviews; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductReviews", function() { return ProductReviews; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ContentWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ContentWrapper */ "./src/app/component/ContentWrapper/index.js");
/* harmony import */ var _ExpandableContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ExpandableContent */ "./src/app/component/ExpandableContent/index.js");
/* harmony import */ var _Popup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Popup */ "./src/app/component/Popup/index.js");
/* harmony import */ var _ProductReviewForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ProductReviewForm */ "./src/app/component/ProductReviewForm/index.js");
/* harmony import */ var _ProductReviewList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ProductReviewList */ "./src/app/component/ProductReviewList/index.js");
/* harmony import */ var _ProductReviewRating__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../ProductReviewRating */ "./src/app/component/ProductReviewRating/index.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _ProductReviews_config__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ProductReviews.config */ "./src/app/component/ProductReviews/ProductReviews.config.js");
/* harmony import */ var _ProductReviews_style__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ProductReviews.style */ "./src/app/component/ProductReviews/ProductReviews.style.scss");
/* harmony import */ var _ProductReviews_style__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_ProductReviews_style__WEBPACK_IMPORTED_MODULE_10__);
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











/** @namespace Component/ProductReviews/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductReviews =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductReviews, _Extensible);

  function _ProductReviews() {
    _classCallCheck(this, _ProductReviews);

    return _possibleConstructorReturn(this, _getPrototypeOf(_ProductReviews).apply(this, arguments));
  }

  _createClass(_ProductReviews, [{
    key: "renderPopup",
    value: function renderPopup() {
      var product = this.props.product;
      return (
        /*#__PURE__*/
        _checkBEM(React, _Popup__WEBPACK_IMPORTED_MODULE_4__["default"], {
          id: _ProductReviews_config__WEBPACK_IMPORTED_MODULE_9__["REVIEW_POPUP_ID"],
          mix: {
            block: 'ProductReviews',
            elem: 'Popup'
          }
        },
        /*#__PURE__*/
        _checkBEM(React, _ProductReviewForm__WEBPACK_IMPORTED_MODULE_5__["default"], {
          product: product
        }))
      );
    }
  }, {
    key: "renderButton",
    value: function renderButton() {
      var showPopup = this.props.showPopup;
      return (
        /*#__PURE__*/
        _checkBEM(React, "button", {
          block: "ProductReviews",
          elem: "Button",
          mix: {
            block: 'Button'
          },
          onClick: showPopup
        }, __('Write a new review'))
      );
    }
  }, {
    key: "renderNoRating",
    value: function renderNoRating() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "p", null, __('There are no reviews yet! Click button on the right to submit one!'))
      );
    }
  }, {
    key: "renderRatingSchema",
    value: function renderRatingSchema(percent, reviewCount) {
      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null,
        /*#__PURE__*/
        _checkBEM(React, "meta", {
          itemProp: "ratingValue",
          content: percent
        }),
        /*#__PURE__*/
        _checkBEM(React, "meta", {
          itemProp: "worstRating",
          content: 0
        }),
        /*#__PURE__*/
        _checkBEM(React, "meta", {
          itemProp: "bestRating",
          content: 100
        }),
        /*#__PURE__*/
        _checkBEM(React, "meta", {
          itemProp: "reviewCount",
          content: reviewCount
        }))
      );
    }
  }, {
    key: "renderRatingData",
    value: function renderRatingData() {
      var _this$props$product$r = this.props.product.review_summary;
      _this$props$product$r = _this$props$product$r === void 0 ? {} : _this$props$product$r;
      var rating_summary = _this$props$product$r.rating_summary,
          review_count = _this$props$product$r.review_count;
      var STARS_COUNT = 5;
      var PERCENT = 100; // eslint-disable-next-line no-mixed-operators

      var percent = parseFloat(STARS_COUNT * (rating_summary || 0) / PERCENT).toFixed(2);

      if (!review_count) {
        return this.renderNoRating();
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null, this.renderRatingSchema(rating_summary, review_count),
        /*#__PURE__*/
        _checkBEM(React, _ProductReviewRating__WEBPACK_IMPORTED_MODULE_7__["default"], {
          mix: {
            block: 'ProductReviews',
            elem: 'SummaryRating'
          },
          summary: rating_summary
        }),
        /*#__PURE__*/
        _checkBEM(React, "p", {
          block: "ProductReviews",
          elem: "SummaryDetails"
        }, percent,
        /*#__PURE__*/
        _checkBEM(React, "span", null, __('%s reviews', review_count || 0))))
      );
    }
  }, {
    key: "renderSummary",
    value: function renderSummary() {
      var _this$props$product$r2 = this.props.product.review_summary;
      _this$props$product$r2 = _this$props$product$r2 === void 0 ? {} : _this$props$product$r2;
      var review_count = _this$props$product$r2.review_count;
      var reviewSchemaObject = review_count ? {
        itemType: 'http://schema.org/AggregateRating',
        itemProp: 'aggregateRating',
        itemScope: true
      } : {};
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", _extends({
          block: "ProductReviews",
          elem: "Summary"
        }, reviewSchemaObject),
        /*#__PURE__*/
        _checkBEM(React, "h3", {
          block: "ProductReviews",
          elem: "Title"
        }, __('Customer reviews')), this.renderRatingData(), this.renderButton())
      );
    }
  }, {
    key: "renderList",
    value: function renderList() {
      var product = this.props.product;
      return (
        /*#__PURE__*/
        _checkBEM(React, _ProductReviewList__WEBPACK_IMPORTED_MODULE_6__["default"], {
          product: product
        })
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          product = _this$props.product,
          areDetailsLoaded = _this$props.areDetailsLoaded;
      var _product$review_summa = product.review_summary;
      _product$review_summa = _product$review_summa === void 0 ? {} : _product$review_summa;
      var review_count = _product$review_summa.review_count;
      var heading = areDetailsLoaded ? __('Product reviews (%s)', review_count || '0') : '';
      return (
        /*#__PURE__*/
        _checkBEM(React, _ContentWrapper__WEBPACK_IMPORTED_MODULE_2__["default"], {
          label: "Product reviews",
          mix: {
            block: 'ProductReviews'
          },
          wrapperMix: {
            block: 'ProductReviews',
            elem: 'Wrapper'
          }
        },
        /*#__PURE__*/
        _checkBEM(React, _ExpandableContent__WEBPACK_IMPORTED_MODULE_3__["default"], {
          mix: {
            block: 'ProductReviews',
            elem: 'Content'
          },
          heading: heading
        }, this.renderSummary(), this.renderList(), this.renderPopup()))
      );
    }
  }]);

  return _ProductReviews;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductReviews, 'name', {
  value: 'ProductReviews'
});

var ProductReviews = middleware(_ProductReviews, "Component/ProductReviews/Component");

_defineProperty(ProductReviews, "propTypes", {
  product: _type_ProductList__WEBPACK_IMPORTED_MODULE_8__["ProductType"].isRequired,
  showPopup: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  areDetailsLoaded: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool
});

_defineProperty(ProductReviews, "defaultProps", {
  areDetailsLoaded: false
});

/* harmony default export */ __webpack_exports__["default"] = (ProductReviews);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductReviews/ProductReviews.config.js":
/*!*******************************************************************!*\
  !*** ./src/app/component/ProductReviews/ProductReviews.config.js ***!
  \*******************************************************************/
/*! exports provided: REVIEW_POPUP_ID */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REVIEW_POPUP_ID", function() { return REVIEW_POPUP_ID; });
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
var REVIEW_POPUP_ID = 'REVIEW_POPUP_ID';

/***/ }),

/***/ "./src/app/component/ProductReviews/ProductReviews.container.js":
/*!**********************************************************************!*\
  !*** ./src/app/component/ProductReviews/ProductReviews.container.js ***!
  \**********************************************************************/
/*! exports provided: mapStateToProps, mapDispatchToProps, _ProductReviewsContainer, ProductReviewsContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, __, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductReviewsContainer", function() { return _ProductReviewsContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductReviewsContainer", function() { return ProductReviewsContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store/Notification/Notification.action */ "./src/app/store/Notification/Notification.action.js");
/* harmony import */ var _store_Popup_Popup_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/Popup/Popup.action */ "./src/app/store/Popup/Popup.action.js");
/* harmony import */ var _util_Auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../util/Auth */ "./src/app/util/Auth/index.js");
/* harmony import */ var _ProductReviews_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ProductReviews.component */ "./src/app/component/ProductReviews/ProductReviews.component.js");
/* harmony import */ var _ProductReviews_config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ProductReviews.config */ "./src/app/component/ProductReviews/ProductReviews.config.js");
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








/** @namespace Component/ProductReviews/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    isEnabled: state.ConfigReducer.reviews_are_enabled,
    isGuestEnabled: state.ConfigReducer.reviews_allow_guest
  };
}, "Component/ProductReviews/Container/mapStateToProps");
/** @namespace Component/ProductReviews/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    showPopup: function showPopup(payload) {
      return dispatch(Object(_store_Popup_Popup_action__WEBPACK_IMPORTED_MODULE_4__["showPopup"])(_ProductReviews_config__WEBPACK_IMPORTED_MODULE_7__["REVIEW_POPUP_ID"], payload));
    },
    showInfoNotification: function showInfoNotification(message) {
      return dispatch(Object(_store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_3__["showNotification"])('info', message));
    }
  };
}, "Component/ProductReviews/Container/mapDispatchToProps");
/** @namespace Component/ProductReviews/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductReviewsContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductReviewsContainer, _Extensible);

  function _ProductReviewsContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ProductReviewsContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ProductReviewsContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      showPopup: _this._showPopup.bind(_assertThisInitialized(_this))
    });

    return _this;
  }

  _createClass(_ProductReviewsContainer, [{
    key: "_showPopup",
    value: function _showPopup() {
      var _this$props = this.props,
          showPopup = _this$props.showPopup,
          isGuestEnabled = _this$props.isGuestEnabled,
          showInfoNotification = _this$props.showInfoNotification; // if not logged in and guest reviews are not enabled

      if (!Object(_util_Auth__WEBPACK_IMPORTED_MODULE_5__["isSignedIn"])() && !isGuestEnabled) {
        showInfoNotification(__('You must login or register to review products.'));
        return;
      }

      showPopup({
        title: __('Write a new review')
      });
    }
  }, {
    key: "render",
    value: function render() {
      var isEnabled = this.props.isEnabled;

      if (!isEnabled) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, _ProductReviews_component__WEBPACK_IMPORTED_MODULE_6__["default"], _extends({}, this.props, this.containerFunctions))
      );
    }
  }]);

  return _ProductReviewsContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductReviewsContainer, 'name', {
  value: 'ProductReviewsContainer'
});

var ProductReviewsContainer = middleware(_ProductReviewsContainer, "Component/ProductReviews/Container");

_defineProperty(ProductReviewsContainer, "propTypes", {
  showInfoNotification: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  showPopup: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  isGuestEnabled: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  isEnabled: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool
});

_defineProperty(ProductReviewsContainer, "defaultProps", {
  isEnabled: true,
  isGuestEnabled: true
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(ProductReviewsContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/ProductReviews/ProductReviews.style.scss":
/*!********************************************************************!*\
  !*** ./src/app/component/ProductReviews/ProductReviews.style.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340276
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ProductReviews/index.js":
/*!***************************************************!*\
  !*** ./src/app/component/ProductReviews/index.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProductReviews_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductReviews.container */ "./src/app/component/ProductReviews/ProductReviews.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ProductReviews_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/ProductTab/ProductTab.component.js":
/*!**************************************************************!*\
  !*** ./src/app/component/ProductTab/ProductTab.component.js ***!
  \**************************************************************/
/*! exports provided: _ProductTab, ProductTab, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductTab", function() { return _ProductTab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductTab", function() { return ProductTab; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ProductTab_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ProductTab.style */ "./src/app/component/ProductTab/ProductTab.style.scss");
/* harmony import */ var _ProductTab_style__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ProductTab_style__WEBPACK_IMPORTED_MODULE_2__);
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



/** @namespace Component/ProductTab/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductTab =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductTab, _Extensible);

  function _ProductTab() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ProductTab);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ProductTab)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onClick", function () {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          tabName = _this$props.tabName;
      onClick(tabName);
    });

    return _this;
  }

  _createClass(_ProductTab, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          tabName = _this$props2.tabName,
          isActive = _this$props2.isActive;
      return (
        /*#__PURE__*/
        _checkBEM(React, "li", {
          block: "ProductTab",
          elem: "Item",
          mods: {
            isActive: isActive
          }
        },
        /*#__PURE__*/
        _checkBEM(React, "button", {
          mix: {
            block: 'ProductTab',
            elem: 'Button'
          },
          onClick: this.onClick
        }, tabName.toUpperCase()))
      );
    }
  }]);

  return _ProductTab;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductTab, 'name', {
  value: 'ProductTab'
});

var ProductTab = middleware(_ProductTab, "Component/ProductTab/Component");

_defineProperty(ProductTab, "propTypes", {
  tabName: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  isActive: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool
});

_defineProperty(ProductTab, "defaultProps", {
  onClick: function onClick() {},
  isActive: false
});

/* harmony default export */ __webpack_exports__["default"] = (ProductTab);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductTab/ProductTab.style.scss":
/*!************************************************************!*\
  !*** ./src/app/component/ProductTab/ProductTab.style.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340910
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ProductTab/index.js":
/*!***********************************************!*\
  !*** ./src/app/component/ProductTab/index.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProductTab_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductTab.component */ "./src/app/component/ProductTab/ProductTab.component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ProductTab_component__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/ProductTabs/ProductTabs.component.js":
/*!****************************************************************!*\
  !*** ./src/app/component/ProductTabs/ProductTabs.component.js ***!
  \****************************************************************/
/*! exports provided: _ProductTabs, ProductTabs, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductTabs", function() { return _ProductTabs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductTabs", function() { return ProductTabs; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ContentWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ContentWrapper */ "./src/app/component/ContentWrapper/index.js");
/* harmony import */ var _ProductTab__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ProductTab */ "./src/app/component/ProductTab/index.js");
/* harmony import */ var _util_Mobile__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/Mobile */ "./src/app/util/Mobile/index.js");
/* harmony import */ var _ProductTabs_style__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ProductTabs.style */ "./src/app/component/ProductTabs/ProductTabs.style.scss");
/* harmony import */ var _ProductTabs_style__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ProductTabs_style__WEBPACK_IMPORTED_MODULE_5__);
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






/** @namespace Component/ProductTabs/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductTabs =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductTabs, _Extensible);

  function _ProductTabs() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ProductTabs);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ProductTabs)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onTabClick", function (activeTab) {
      _this.setState({
        activeTab: activeTab
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderTab", function (_, i) {
      var tabNames = _this.props.tabNames;
      var activeTab = _this.state.activeTab;
      return (
        /*#__PURE__*/
        _checkBEM(React, _ProductTab__WEBPACK_IMPORTED_MODULE_3__["default"], {
          tabName: tabNames[i],
          key: tabNames[i],
          onClick: _this.onTabClick,
          isActive: tabNames[i].toLowerCase() === activeTab.toLowerCase()
        })
      );
    });

    return _this;
  }

  _createClass(_ProductTabs, [{
    key: "__construct",
    value: function __construct(props) {
      _get(_getPrototypeOf(_ProductTabs.prototype), "__construct", this).call(this, props);

      var _this$props = this.props,
          defaultTab = _this$props.defaultTab,
          tabNames = _this$props.tabNames;
      this.state = {
        activeTab: defaultTab || tabNames[0]
      };
    }
  }, {
    key: "renderActiveTab",
    value: function renderActiveTab(activeTab, childrenArray) {
      var tabNames = this.props.tabNames;
      return childrenArray.map(function (item, i) {
        if (tabNames[i].toLowerCase() === activeTab.toLowerCase()) {
          return item;
        }

        return false;
      });
    }
  }, {
    key: "renderAllTabs",
    value: function renderAllTabs(childrenArray) {
      return childrenArray.map(function (item) {
        return item;
      });
    }
  }, {
    key: "renderTabs",
    value: function renderTabs() {
      var children = this.props.children;
      var activeTab = this.state.activeTab;
      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null,
        /*#__PURE__*/
        _checkBEM(React, "ul", {
          block: "ProductTabs"
        }, children.map(this.renderTab)), _util_Mobile__WEBPACK_IMPORTED_MODULE_4__["isMobile"].any() ? this.renderAllTabs(children) : this.renderActiveTab(activeTab, children))
      );
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _ContentWrapper__WEBPACK_IMPORTED_MODULE_2__["default"], {
          wrapperMix: {
            block: 'ProductTabs',
            elem: 'Wrapper'
          },
          label: __('Product tabs')
        }, this.renderTabs())
      );
    }
  }]);

  return _ProductTabs;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductTabs, 'name', {
  value: 'ProductTabs'
});

var ProductTabs = middleware(_ProductTabs, "Component/ProductTabs/Component");

_defineProperty(ProductTabs, "propTypes", {
  tabNames: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string).isRequired,
  children: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.node,
  defaultTab: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
});

_defineProperty(ProductTabs, "defaultProps", {
  children: null,
  defaultTab: null
});

/* harmony default export */ __webpack_exports__["default"] = (ProductTabs);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductTabs/ProductTabs.style.scss":
/*!**************************************************************!*\
  !*** ./src/app/component/ProductTabs/ProductTabs.style.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340184
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ProductTabs/index.js":
/*!************************************************!*\
  !*** ./src/app/component/ProductTabs/index.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProductTabs_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductTabs.component */ "./src/app/component/ProductTabs/ProductTabs.component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ProductTabs_component__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./src/app/component/ProductWishlistButton/ProductWishlistButton.component.js":
/*!************************************************************************************!*\
  !*** ./src/app/component/ProductWishlistButton/ProductWishlistButton.component.js ***!
  \************************************************************************************/
/*! exports provided: _ProductWishlistButton, ProductWishlistButton, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, __, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductWishlistButton", function() { return _ProductWishlistButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductWishlistButton", function() { return ProductWishlistButton; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Loader */ "./src/app/component/Loader/index.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _util_Auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/Auth */ "./src/app/util/Auth/index.js");
/* harmony import */ var _ProductWishlistButton_style__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ProductWishlistButton.style */ "./src/app/component/ProductWishlistButton/ProductWishlistButton.style.scss");
/* harmony import */ var _ProductWishlistButton_style__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ProductWishlistButton_style__WEBPACK_IMPORTED_MODULE_5__);
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

/* eslint-disable max-len */

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






/** @namespace Component/ProductWishlistButton/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductWishlistButton =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductWishlistButton, _Extensible);

  function _ProductWishlistButton() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ProductWishlistButton);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ProductWishlistButton)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "getTitle", function () {
      var _this$props = _this.props,
          isInWishlist = _this$props.isInWishlist,
          isReady = _this$props.isReady;

      if (!Object(_util_Auth__WEBPACK_IMPORTED_MODULE_4__["isSignedIn"])()) {
        return __('Please sign in first!');
      }

      if (!isReady) {
        return __('Please select variant first!');
      }

      if (isInWishlist) {
        return __('Remove from Wishlist');
      }

      return __('Add to Wishlist');
    });

    _defineProperty(_assertThisInitialized(_this), "onClick", function () {
      var _this$props2 = _this.props,
          product = _this$props2.product,
          quantity = _this$props2.quantity,
          isInWishlist = _this$props2.isInWishlist,
          addToWishlist = _this$props2.addToWishlist,
          removeFromWishlist = _this$props2.removeFromWishlist;

      if (!isInWishlist) {
        return addToWishlist(product, quantity);
      }

      return removeFromWishlist(product, quantity);
    });

    return _this;
  }

  _createClass(_ProductWishlistButton, [{
    key: "renderButton",
    value: function renderButton() {
      var _this$props3 = this.props,
          isInWishlist = _this$props3.isInWishlist,
          isDisabled = _this$props3.isDisabled,
          mix = _this$props3.mix;
      return (
        /*#__PURE__*/
        _checkBEM(React, "button", {
          block: "ProductWishlistButton",
          elem: "Button",
          mods: {
            isInWishlist: isInWishlist,
            isDisabled: isDisabled
          },
          mix: {
            block: 'Button',
            mods: {
              isHollow: !isInWishlist
            },
            mix: mix
          },
          title: this.getTitle(),
          onClick: this.onClick
        },
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductWishlistButton",
          elem: "Heart"
        }))
      );
    }
  }, {
    key: "renderLoader",
    value: function renderLoader() {
      var isLoading = this.props.isLoading;
      return (
        /*#__PURE__*/
        _checkBEM(React, _Loader__WEBPACK_IMPORTED_MODULE_2__["default"], {
          isLoading: isLoading
        })
      );
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ProductWishlistButton"
        }, this.renderButton(), this.renderLoader())
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props$product = this.props.product;
      _this$props$product = _this$props$product === void 0 ? {} : _this$props$product;
      var id = _this$props$product.id;

      if (id !== -1) {
        return this.renderContent();
      }

      return null;
    }
  }]);

  return _ProductWishlistButton;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductWishlistButton, 'name', {
  value: 'ProductWishlistButton'
});

var ProductWishlistButton = middleware(_ProductWishlistButton, "Component/ProductWishlistButton/Component");

_defineProperty(ProductWishlistButton, "propTypes", {
  isReady: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  quantity: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  isDisabled: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  isInWishlist: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  product: _type_ProductList__WEBPACK_IMPORTED_MODULE_3__["ProductType"].isRequired,
  addToWishlist: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  removeFromWishlist: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  mix: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
    block: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
    elem: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
    mod: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
  })
});

_defineProperty(ProductWishlistButton, "defaultProps", {
  mix: {},
  quantity: 1,
  isReady: true,
  isLoading: false,
  isDisabled: false,
  isInWishlist: false
});

/* harmony default export */ __webpack_exports__["default"] = (ProductWishlistButton);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ProductWishlistButton/ProductWishlistButton.config.js":
/*!*********************************************************************************!*\
  !*** ./src/app/component/ProductWishlistButton/ProductWishlistButton.config.js ***!
  \*********************************************************************************/
/*! exports provided: ERROR_CONFIGURABLE_NOT_PROVIDED */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERROR_CONFIGURABLE_NOT_PROVIDED", function() { return ERROR_CONFIGURABLE_NOT_PROVIDED; });
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
var ERROR_CONFIGURABLE_NOT_PROVIDED = 'ERROR_CONFIGURABLE_NOT_PROVIDED';

/***/ }),

/***/ "./src/app/component/ProductWishlistButton/ProductWishlistButton.container.js":
/*!************************************************************************************!*\
  !*** ./src/app/component/ProductWishlistButton/ProductWishlistButton.container.js ***!
  \************************************************************************************/
/*! exports provided: WishlistDispatcher, mapStateToProps, mapDispatchToProps, _ProductWishlistButtonContainer, ProductWishlistButtonContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, __, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WishlistDispatcher", function() { return WishlistDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductWishlistButtonContainer", function() { return _ProductWishlistButtonContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductWishlistButtonContainer", function() { return ProductWishlistButtonContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store/Notification/Notification.action */ "./src/app/store/Notification/Notification.action.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _util_Auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../util/Auth */ "./src/app/util/Auth/index.js");
/* harmony import */ var _util_Product__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../util/Product */ "./src/app/util/Product/index.js");
/* harmony import */ var _ProductWishlistButton_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ProductWishlistButton.component */ "./src/app/component/ProductWishlistButton/ProductWishlistButton.component.js");
/* harmony import */ var _ProductWishlistButton_config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ProductWishlistButton.config */ "./src/app/component/ProductWishlistButton/ProductWishlistButton.config.js");
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









var WishlistDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/Wishlist/Wishlist.dispatcher */ "./src/app/store/Wishlist/Wishlist.dispatcher.js"));
/** @namespace Component/ProductWishlistButton/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    productsInWishlist: state.WishlistReducer.productsInWishlist,
    isLoading: state.WishlistReducer.isLoading
  };
}, "Component/ProductWishlistButton/Container/mapStateToProps");
/** @namespace Component/ProductWishlistButton/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    addProductToWishlist: function addProductToWishlist(wishlistItem) {
      return WishlistDispatcher.then(function (_ref) {
        var dispatcher = _ref.default;
        return dispatcher.addItemToWishlist(dispatch, wishlistItem);
      });
    },
    removeProductFromWishlist: function removeProductFromWishlist(options) {
      return WishlistDispatcher.then(function (_ref2) {
        var dispatcher = _ref2.default;
        return dispatcher.removeItemFromWishlist(dispatch, options);
      });
    },
    showNotification: function showNotification(type, message) {
      return dispatch(Object(_store_Notification_Notification_action__WEBPACK_IMPORTED_MODULE_3__["showNotification"])(type, message));
    }
  };
}, "Component/ProductWishlistButton/Container/mapDispatchToProps");
/** @namespace Component/ProductWishlistButton/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductWishlistButtonContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductWishlistButtonContainer, _Extensible);

  function _ProductWishlistButtonContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ProductWishlistButtonContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ProductWishlistButtonContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerProps", function () {
      return {
        isDisabled: _this.isDisabled(),
        isInWishlist: _this.isInWishlist(),
        isReady: _this._getIsProductReady()
      };
    });

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", function () {
      return {
        addToWishlist: _this.toggleProductInWishlist.bind(_assertThisInitialized(_this), true),
        removeFromWishlist: _this.toggleProductInWishlist.bind(_assertThisInitialized(_this), false)
      };
    });

    _defineProperty(_assertThisInitialized(_this), "toggleProductInWishlist", function () {
      var add = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var _this$props = _this.props,
          _this$props$product = _this$props.product,
          sku = _this$props$product.sku,
          type_id = _this$props$product.type_id,
          quantity = _this$props.quantity,
          isLoading = _this$props.isLoading,
          showNotification = _this$props.showNotification,
          productsInWishlist = _this$props.productsInWishlist,
          addProductToWishlist = _this$props.addProductToWishlist,
          onProductValidationError = _this$props.onProductValidationError,
          removeProductFromWishlist = _this$props.removeProductFromWishlist;

      if (!Object(_util_Auth__WEBPACK_IMPORTED_MODULE_5__["isSignedIn"])()) {
        return showNotification('info', __('You must login or register to add items to your wishlist.'));
      }

      if (isLoading) {
        return null;
      }

      var product = _this._getProductVariant();

      if (product === _ProductWishlistButton_config__WEBPACK_IMPORTED_MODULE_8__["ERROR_CONFIGURABLE_NOT_PROVIDED"]) {
        onProductValidationError(type_id);
        return showNotification('info', __('Please, select desirable option first!'));
      }

      var variantSku = product.sku,
          product_option = product.product_option;

      if (add) {
        return addProductToWishlist({
          sku: sku,
          product_option: product_option,
          quantity: quantity
        });
      }

      var _Object$values$find = Object.values(productsInWishlist).find(function (_ref3) {
        var sku = _ref3.wishlist.sku;
        return sku === variantSku;
      }),
          item_id = _Object$values$find.wishlist.id;

      return removeProductFromWishlist({
        item_id: item_id,
        sku: variantSku
      });
    });

    _defineProperty(_assertThisInitialized(_this), "isDisabled", function () {
      var isLoading = _this.props.isLoading;

      var product = _this._getProductVariant();

      if (product === _ProductWishlistButton_config__WEBPACK_IMPORTED_MODULE_8__["ERROR_CONFIGURABLE_NOT_PROVIDED"]) {
        return true;
      }

      return isLoading || !Object(_util_Auth__WEBPACK_IMPORTED_MODULE_5__["isSignedIn"])();
    });

    _defineProperty(_assertThisInitialized(_this), "isInWishlist", function () {
      var productsInWishlist = _this.props.productsInWishlist;

      var product = _this._getProductVariant();

      if (product === _ProductWishlistButton_config__WEBPACK_IMPORTED_MODULE_8__["ERROR_CONFIGURABLE_NOT_PROVIDED"]) {
        return false;
      }

      var productSku = product.sku;
      return Object.values(productsInWishlist).findIndex(function (_ref4) {
        var sku = _ref4.wishlist.sku;
        return sku === productSku;
      }) >= 0;
    });

    return _this;
  }

  _createClass(_ProductWishlistButtonContainer, [{
    key: "_getIsProductReady",
    value: function _getIsProductReady() {
      var _this$props2 = this.props,
          type_id = _this$props2.product.type_id,
          configurableVariantIndex = _this$props2.configurableVariantIndex;

      if (type_id === 'configurable' && configurableVariantIndex < 0) {
        return false;
      }

      return true;
    }
  }, {
    key: "_getProductVariant",
    value: function _getProductVariant() {
      var _this$props3 = this.props,
          product = _this$props3.product,
          type_id = _this$props3.product.type_id,
          configurableVariantIndex = _this$props3.configurableVariantIndex;

      if (type_id === 'configurable') {
        if (configurableVariantIndex < 0) {
          return _ProductWishlistButton_config__WEBPACK_IMPORTED_MODULE_8__["ERROR_CONFIGURABLE_NOT_PROVIDED"];
        }

        var extension_attributes = Object(_util_Product__WEBPACK_IMPORTED_MODULE_6__["getExtensionAttributes"])(_objectSpread2(_objectSpread2({}, product), {}, {
          configurableVariantIndex: configurableVariantIndex
        }));
        var variant = product.variants[configurableVariantIndex];
        return _objectSpread2(_objectSpread2({}, variant), {}, {
          product_option: {
            extension_attributes: extension_attributes
          }
        });
      }

      return product;
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _ProductWishlistButton_component__WEBPACK_IMPORTED_MODULE_7__["default"], _extends({}, this.props, this.containerProps(), this.containerFunctions()))
      );
    }
  }]);

  return _ProductWishlistButtonContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductWishlistButtonContainer, 'name', {
  value: 'ProductWishlistButtonContainer'
});

var ProductWishlistButtonContainer = middleware(_ProductWishlistButtonContainer, "Component/ProductWishlistButton/Container");

_defineProperty(ProductWishlistButtonContainer, "propTypes", {
  quantity: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  product: _type_ProductList__WEBPACK_IMPORTED_MODULE_4__["ProductType"].isRequired,
  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  configurableVariantIndex: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  showNotification: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  productsInWishlist: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.objectOf(_type_ProductList__WEBPACK_IMPORTED_MODULE_4__["ProductType"]).isRequired,
  addProductToWishlist: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  onProductValidationError: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  removeProductFromWishlist: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

_defineProperty(ProductWishlistButtonContainer, "defaultProps", {
  quantity: 1,
  onProductValidationError: function onProductValidationError() {},
  configurableVariantIndex: -2
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(ProductWishlistButtonContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/ProductWishlistButton/ProductWishlistButton.style.scss":
/*!**********************************************************************************!*\
  !*** ./src/app/component/ProductWishlistButton/ProductWishlistButton.style.scss ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340768
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ProductWishlistButton/index.js":
/*!**********************************************************!*\
  !*** ./src/app/component/ProductWishlistButton/index.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProductWishlistButton_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductWishlistButton.container */ "./src/app/component/ProductWishlistButton/ProductWishlistButton.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ProductWishlistButton_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/ReviewStar/ReviewStar.component.js":
/*!**************************************************************!*\
  !*** ./src/app/component/ReviewStar/ReviewStar.component.js ***!
  \**************************************************************/
/*! exports provided: _ReviewStar, ReviewStar, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ReviewStar", function() { return _ReviewStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReviewStar", function() { return ReviewStar; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ReviewStar_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ReviewStar.style */ "./src/app/component/ReviewStar/ReviewStar.style.scss");
/* harmony import */ var _ReviewStar_style__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ReviewStar_style__WEBPACK_IMPORTED_MODULE_2__);
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



/** @namespace Component/ReviewStar/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ReviewStar =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ReviewStar, _Extensible);

  function _ReviewStar() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ReviewStar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ReviewStar)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onStarRatingClick", function () {
      var _this$props = _this.props,
          rating_id = _this$props.rating_id,
          option_id = _this$props.option_id,
          onStarRatingClick = _this$props.onStarRatingClick;
      onStarRatingClick(rating_id, option_id);
    });

    return _this;
  }

  _createClass(_ReviewStar, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          name = _this$props2.name,
          value = _this$props2.value,
          title = _this$props2.title,
          isChecked = _this$props2.isChecked,
          rating_id = _this$props2.rating_id,
          option_id = _this$props2.option_id;
      return (
        /*#__PURE__*/
        _checkBEM(React, "input", {
          block: "ReviewStar",
          type: "radio",
          id: option_id + rating_id,
          name: name,
          value: value,
          title: title,
          checked: isChecked,
          onChange: this.onStarRatingClick
        })
      );
    }
  }]);

  return _ReviewStar;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ReviewStar, 'name', {
  value: 'ReviewStar'
});

var ReviewStar = middleware(_ReviewStar, "Component/ReviewStar/Component");

_defineProperty(ReviewStar, "propTypes", {
  value: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  name: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  title: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  isChecked: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  option_id: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  rating_id: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string.isRequired,
  onStarRatingClick: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (ReviewStar);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ReviewStar/ReviewStar.style.scss":
/*!************************************************************!*\
  !*** ./src/app/component/ReviewStar/ReviewStar.style.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340875
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ReviewStar/index.js":
/*!***********************************************!*\
  !*** ./src/app/component/ReviewStar/index.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ReviewStar_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReviewStar.component */ "./src/app/component/ReviewStar/ReviewStar.component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ReviewStar_component__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/TranslateOnCursorMove/TranslateOnCursorMove.component.js":
/*!************************************************************************************!*\
  !*** ./src/app/component/TranslateOnCursorMove/TranslateOnCursorMove.component.js ***!
  \************************************************************************************/
/*! exports provided: _TranslateOnCursorMove, TranslateOnCursorMove, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_TranslateOnCursorMove", function() { return _TranslateOnCursorMove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TranslateOnCursorMove", function() { return TranslateOnCursorMove; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _util_CSS__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/CSS */ "./src/app/util/CSS/index.js");
/* harmony import */ var _TranslateOnCursorMove_style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TranslateOnCursorMove.style */ "./src/app/component/TranslateOnCursorMove/TranslateOnCursorMove.style.scss");
/* harmony import */ var _TranslateOnCursorMove_style__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_TranslateOnCursorMove_style__WEBPACK_IMPORTED_MODULE_4__);
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





/** @namespace Component/TranslateOnCursorMove/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _TranslateOnCursorMove =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_TranslateOnCursorMove, _Extensible);

  function _TranslateOnCursorMove() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _TranslateOnCursorMove);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_TranslateOnCursorMove)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "ref",
    /*#__PURE__*/
    Object(react__WEBPACK_IMPORTED_MODULE_1__["createRef"])());

    _defineProperty(_assertThisInitialized(_this), "handleMouseMove", function (_ref) {
      var wrapperPageY = _ref.pageY;
      var activeImageId = _this.props.activeImageId; // Space from top and bottom to shrink mouse move watch area

      var paddingY = 90; // TODO: need to think how to implement more dynamic way

      var innerHeight = _this.ref.current.children[0].children[1].children[0].children[0].children[activeImageId].children[0].getBoundingClientRect().height;

      var _this$ref$current$get = _this.ref.current.getBoundingClientRect(),
          wrapperHeight = _this$ref$current$get.height,
          top = _this$ref$current$get.top;

      var pageY = wrapperPageY - top; // When mouse is reached top or bottom

      if (wrapperPageY < paddingY + top || wrapperPageY > wrapperHeight + top - paddingY) {
        return;
      }

      var ratio = (innerHeight - wrapperHeight) / (wrapperHeight - paddingY * 2);
      var translate = (pageY - paddingY) * ratio;
      _util_CSS__WEBPACK_IMPORTED_MODULE_3__["default"].setVariable(_this.ref, 'translateYOnCursorMove', "".concat(-translate, "px"));
    });

    return _this;
  }

  _createClass(_TranslateOnCursorMove, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          isMobile = _this$props.isMobile;

      if (isMobile) {
        return children;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "TranslateOnCursorMove",
          onMouseMove: this.handleMouseMove,
          ref: this.ref
        }, children)
      );
    }
  }]);

  return _TranslateOnCursorMove;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_TranslateOnCursorMove, 'name', {
  value: 'TranslateOnCursorMove'
});

var TranslateOnCursorMove = middleware(_TranslateOnCursorMove, "Component/TranslateOnCursorMove/Component");

_defineProperty(TranslateOnCursorMove, "propTypes", {
  children: _type_Common__WEBPACK_IMPORTED_MODULE_2__["ChildrenType"].isRequired,
  activeImageId: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number.isRequired,
  isMobile: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired
});

_defineProperty(TranslateOnCursorMove, "defaultProps", {});

/* harmony default export */ __webpack_exports__["default"] = (TranslateOnCursorMove);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/TranslateOnCursorMove/TranslateOnCursorMove.container.js":
/*!************************************************************************************!*\
  !*** ./src/app/component/TranslateOnCursorMove/TranslateOnCursorMove.container.js ***!
  \************************************************************************************/
/*! exports provided: mapStateToProps, mapDispatchToProps, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _TranslateOnCursorMove_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TranslateOnCursorMove.component */ "./src/app/component/TranslateOnCursorMove/TranslateOnCursorMove.component.js");
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


/** @namespace Component/Slider/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    isMobile: state.ConfigReducer.device.isMobile
  };
}, "Component/Slider/Container/mapStateToProps");
/** @namespace Component/Slider/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars

var mapDispatchToProps = middleware(function (dispatch) {
  return {};
}, "Component/Slider/Container/mapDispatchToProps"); // eslint-disable-next-line @scandipwa/scandipwa-guidelines/always-both-mappings

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["connect"])(mapStateToProps, mapDispatchToProps)(_TranslateOnCursorMove_component__WEBPACK_IMPORTED_MODULE_1__["default"]));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/TranslateOnCursorMove/TranslateOnCursorMove.style.scss":
/*!**********************************************************************************!*\
  !*** ./src/app/component/TranslateOnCursorMove/TranslateOnCursorMove.style.scss ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340991
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/TranslateOnCursorMove/index.js":
/*!**********************************************************!*\
  !*** ./src/app/component/TranslateOnCursorMove/index.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TranslateOnCursorMove_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TranslateOnCursorMove.container */ "./src/app/component/TranslateOnCursorMove/TranslateOnCursorMove.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _TranslateOnCursorMove_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/VideoPopup/VideoPopup.component.js":
/*!**************************************************************!*\
  !*** ./src/app/component/VideoPopup/VideoPopup.component.js ***!
  \**************************************************************/
/*! exports provided: _VideoPopup, VideoPopup, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, middleware, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_VideoPopup", function() { return _VideoPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoPopup", function() { return VideoPopup; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Popup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Popup */ "./src/app/component/Popup/index.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _util_Promise__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/Promise */ "./src/app/util/Promise/index.js");
/* harmony import */ var _VideoPopup_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./VideoPopup.config */ "./src/app/component/VideoPopup/VideoPopup.config.js");
/* harmony import */ var _VideoPopup_style__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./VideoPopup.style */ "./src/app/component/VideoPopup/VideoPopup.style.scss");
/* harmony import */ var _VideoPopup_style__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_VideoPopup_style__WEBPACK_IMPORTED_MODULE_5__);
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

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable react/no-unused-state */

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
 * A popup capable of displaying a video
 * @class VideoPopup
 * @namespace Component/VideoPopup/Component
 */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _VideoPopup =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_VideoPopup, _Extensible);

  function _VideoPopup() {
    _classCallCheck(this, _VideoPopup);

    return _possibleConstructorReturn(this, _getPrototypeOf(_VideoPopup).apply(this, arguments));
  }

  _createClass(_VideoPopup, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      this.loadVimeoLibrary();
      this.loadYouTubeLibrary();
      Promise.all([this.vimeoPromise, this.youTubePromise]).then(
      /** @namespace Component/VideoPopup/Component/videoLibrariesThen */
      middleware(function () {
        return _this.forceUpdate();
      }, "Component/VideoPopup/Component/videoLibrariesThen"));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.youTubePromise) {
        this.youTubePromise.cancel();
      }

      if (this.vimeoPromise) {
        this.vimeoPromise.cancel();
      }
    }
    /**
     * Renders a video provided by Vimeo
     * @param videoId
     * @returns {*}
     * @private
     */

  }, {
    key: "_renderVimeoVideo",
    value: function _renderVimeoVideo(videoId) {
      var Vimeo = this.vimeoComponent;

      if (!Vimeo) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, Vimeo, {
          videoId: videoId,
          autoplay: true
        })
      );
    }
    /**
     * Renders a video provided by Youtube
     * @param videoId
     * @returns {*}
     * @private
     */

  }, {
    key: "_renderYoutubeVideo",
    value: function _renderYoutubeVideo(videoId) {
      var YouTube = this.youTubeComponent;

      if (!YouTube) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, YouTube, {
          videoId: videoId,
          containerClassName: "VideoPopup-YouTubeContainer" // eslint-disable-next-line react/forbid-component-props
          ,
          className: "VideoPopup-YouTube",
          opts: {
            playerVars: {
              autoplay: 1
            }
          }
        })
      );
    }
  }, {
    key: "loadVimeoLibrary",
    value: function loadVimeoLibrary() {
      var _this2 = this;

      this.vimeoPromise = Object(_util_Promise__WEBPACK_IMPORTED_MODULE_3__["makeCancelable"])(Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(2)]).then(__webpack_require__.t.bind(null, /*! react-vimeo */ "./node_modules/react-vimeo/lib/Vimeo.js", 7)));
      this.vimeoPromise.promise.then(
      /** @namespace Component/VideoPopup/Component/vimeoPromisePromiseThen */
      middleware(function (_ref) {
        var vimeo = _ref.default;
        _this2.vimeoComponent = vimeo;
      }, "Component/VideoPopup/Component/vimeoPromisePromiseThen"));
    }
  }, {
    key: "loadYouTubeLibrary",
    value: function loadYouTubeLibrary() {
      var _this3 = this;

      this.youTubePromise = Object(_util_Promise__WEBPACK_IMPORTED_MODULE_3__["makeCancelable"])(Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1)]).then(__webpack_require__.bind(null, /*! react-youtube */ "./node_modules/react-youtube/es/YouTube.js")));
      this.youTubePromise.promise.then(
      /** @namespace Component/VideoPopup/Component/youTubePromisePromiseThen */
      middleware(function (_ref2) {
        var youTube = _ref2.default;
        _this3.youTubeComponent = youTube;
      }, "Component/VideoPopup/Component/youTubePromisePromiseThen"));
    }
    /**
     * Parses the video URL and renders the video accordingly
     * @returns {null|*}
     * @private
     */

  }, {
    key: "_renderVideoContent",
    value: function _renderVideoContent() {
      var _this$props$payload$m = this.props.payload.media;
      _this$props$payload$m = _this$props$payload$m === void 0 ? {} : _this$props$payload$m;
      var _this$props$payload$m2 = _this$props$payload$m.video_content;
      _this$props$payload$m2 = _this$props$payload$m2 === void 0 ? {} : _this$props$payload$m2;
      var video_url = _this$props$payload$m2.video_url;

      if (!video_url) {
        return null;
      }

      var _ref3 = _VideoPopup_config__WEBPACK_IMPORTED_MODULE_4__["VIMEO_FORMAT"].exec(video_url) || [],
          _ref4 = _slicedToArray(_ref3, 2),
          vimeoId = _ref4[1];

      if (vimeoId) {
        return this._renderVimeoVideo(vimeoId);
      }

      var _YOUTUBE_FORMAT$exec = _VideoPopup_config__WEBPACK_IMPORTED_MODULE_4__["YOUTUBE_FORMAT"].exec(video_url),
          _YOUTUBE_FORMAT$exec2 = _slicedToArray(_YOUTUBE_FORMAT$exec, 2),
          youtubeId = _YOUTUBE_FORMAT$exec2[1];

      if (youtubeId) {
        return this._renderYoutubeVideo(youtubeId);
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _Popup__WEBPACK_IMPORTED_MODULE_1__["default"], {
          id: _VideoPopup_config__WEBPACK_IMPORTED_MODULE_4__["VIDEO_POPUP_ID"],
          mix: {
            block: 'VideoPopup'
          }
        },
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "VideoPopup",
          elem: "VideoPlayer"
        },
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "VideoPopup",
          elem: "PlayerContent"
        }, this._renderVideoContent())))
      );
    }
  }]);

  return _VideoPopup;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]));
Object.defineProperty(_VideoPopup, 'name', {
  value: 'VideoPopup'
});

var VideoPopup = middleware(_VideoPopup, "Component/VideoPopup/Component");

_defineProperty(VideoPopup, "propTypes", {
  payload: _type_ProductList__WEBPACK_IMPORTED_MODULE_2__["MediaItemType"].isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (VideoPopup);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/VideoPopup/VideoPopup.config.js":
/*!***********************************************************!*\
  !*** ./src/app/component/VideoPopup/VideoPopup.config.js ***!
  \***********************************************************/
/*! exports provided: VIDEO_POPUP_ID, VIMEO_FORMAT, YOUTUBE_FORMAT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VIDEO_POPUP_ID", function() { return VIDEO_POPUP_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VIMEO_FORMAT", function() { return VIMEO_FORMAT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YOUTUBE_FORMAT", function() { return YOUTUBE_FORMAT; });
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
var VIDEO_POPUP_ID = 'VIDEO_POPUP_ID';
/**
 * An expression that checks for vimeo URLs described in https://developer.vimeo.com/api/oembed/videos#table-1 and matches the video id
 * @type {RegExp}
 */

var VIMEO_FORMAT = new RegExp('(?:https?//)?vimeo.com[\\w/]*/(\\d+)$');
var YOUTUBE_FORMAT = new RegExp('(?:https?//)?www.youtube.com/watch\\?v=(\\w+)');

/***/ }),

/***/ "./src/app/component/VideoPopup/VideoPopup.container.js":
/*!**************************************************************!*\
  !*** ./src/app/component/VideoPopup/VideoPopup.container.js ***!
  \**************************************************************/
/*! exports provided: mapStateToProps, mapDispatchToProps, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _VideoPopup_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VideoPopup.component */ "./src/app/component/VideoPopup/VideoPopup.component.js");
/* harmony import */ var _VideoPopup_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VideoPopup.config */ "./src/app/component/VideoPopup/VideoPopup.config.js");
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



/** @namespace Component/VideoPopup/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    payload: state.PopupReducer.popupPayload[_VideoPopup_config__WEBPACK_IMPORTED_MODULE_2__["VIDEO_POPUP_ID"]] || {}
  };
}, "Component/VideoPopup/Container/mapStateToProps");
/** @namespace Component/VideoPopup/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars

var mapDispatchToProps = middleware(function (dispatch) {
  return {};
}, "Component/VideoPopup/Container/mapDispatchToProps");
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["connect"])(mapStateToProps, mapDispatchToProps)(_VideoPopup_component__WEBPACK_IMPORTED_MODULE_1__["default"]));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/VideoPopup/VideoPopup.style.scss":
/*!************************************************************!*\
  !*** ./src/app/component/VideoPopup/VideoPopup.style.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340849
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/VideoPopup/index.js":
/*!***********************************************!*\
  !*** ./src/app/component/VideoPopup/index.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VideoPopup_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VideoPopup.container */ "./src/app/component/VideoPopup/VideoPopup.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _VideoPopup_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/component/VideoThumbnail/VideoThumbnail.component.js":
/*!**********************************************************************!*\
  !*** ./src/app/component/VideoThumbnail/VideoThumbnail.component.js ***!
  \**********************************************************************/
/*! exports provided: _VideoThumbnail, VideoThumbnail, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_VideoThumbnail", function() { return _VideoThumbnail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoThumbnail", function() { return VideoThumbnail; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Image_Image_container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Image/Image.container */ "./src/app/component/Image/Image.container.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _VideoThumbnail_style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./VideoThumbnail.style */ "./src/app/component/VideoThumbnail/VideoThumbnail.style.scss");
/* harmony import */ var _VideoThumbnail_style__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_VideoThumbnail_style__WEBPACK_IMPORTED_MODULE_4__);
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

/* eslint-disable react/no-unused-state */

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
 * VideoThumbnail component
 * @class VideoThumbnail
 * @namespace Component/VideoThumbnail/Component/videoThumbnail
 */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _VideoThumbnail =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_VideoThumbnail, _Extensible);

  function _VideoThumbnail() {
    _classCallCheck(this, _VideoThumbnail);

    return _possibleConstructorReturn(this, _getPrototypeOf(_VideoThumbnail).apply(this, arguments));
  }

  _createClass(_VideoThumbnail, [{
    key: "renderPlayIcon",

    /**
     * Renders an icon indicating that the video can be played
     * @namespace Component/VideoThumbnail/Component
    */
    value: function renderPlayIcon() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "span", {
          block: "VideoThumbnail",
          elem: "PlayIcon"
        }, __('Play video'))
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          _this$props$media = _this$props.media,
          url = _this$props$media.thumbnail.url,
          video_title = _this$props$media.video_content.video_title,
          onPlayClick = _this$props.onPlayClick;
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "VideoThumbnail"
        },
        /*#__PURE__*/
        _checkBEM(React, "button", {
          block: "VideoThumbnail",
          elem: "Button",
          onClick: onPlayClick,
          title: __('Play video %s', video_title)
        },
        /*#__PURE__*/
        _checkBEM(React, _Image_Image_container__WEBPACK_IMPORTED_MODULE_2__["default"], {
          src: url,
          ratio: "custom",
          mix: {
            block: 'VideoThumbnail',
            elem: 'Thumbnail',
            mods: {
              isPlaceholder: !url
            }
          },
          isPlaceholder: !url,
          alt: video_title
        }), this.renderPlayIcon()))
      );
    }
  }]);

  return _VideoThumbnail;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_VideoThumbnail, 'name', {
  value: 'VideoThumbnail'
});

var VideoThumbnail = middleware(_VideoThumbnail, "Component/VideoThumbnail/Component/videoThumbnail");

_defineProperty(VideoThumbnail, "propTypes", {
  media: _type_ProductList__WEBPACK_IMPORTED_MODULE_3__["MediaItemType"].isRequired,
  onPlayClick: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (VideoThumbnail);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/VideoThumbnail/VideoThumbnail.container.js":
/*!**********************************************************************!*\
  !*** ./src/app/component/VideoThumbnail/VideoThumbnail.container.js ***!
  \**********************************************************************/
/*! exports provided: mapDispatchToProps, _VideoThumbnailContainer, VideoThumbnailContainer, mapStateToProps, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_VideoThumbnailContainer", function() { return _VideoThumbnailContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoThumbnailContainer", function() { return VideoThumbnailContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _VideoPopup_VideoPopup_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../VideoPopup/VideoPopup.config */ "./src/app/component/VideoPopup/VideoPopup.config.js");
/* harmony import */ var _store_Popup_Popup_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/Popup/Popup.action */ "./src/app/store/Popup/Popup.action.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _VideoThumbnail_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./VideoThumbnail.component */ "./src/app/component/VideoThumbnail/VideoThumbnail.component.js");
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







/** @namespace Component/VideoThumbnail/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    showPopup: function showPopup(payload) {
      return dispatch(Object(_store_Popup_Popup_action__WEBPACK_IMPORTED_MODULE_4__["showPopup"])(_VideoPopup_VideoPopup_config__WEBPACK_IMPORTED_MODULE_3__["VIDEO_POPUP_ID"], payload));
    }
  };
}, "Component/VideoThumbnail/Container/mapDispatchToProps");
/**
 * @class VideoThumbnailContainer
 * @namespace Component/VideoThumbnail/Container/videoThumbnailContainer
 */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _VideoThumbnailContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_VideoThumbnailContainer, _Extensible);

  function _VideoThumbnailContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _VideoThumbnailContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_VideoThumbnailContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      onPlayClick: _this._onPlayClick.bind(_assertThisInitialized(_this))
    });

    return _this;
  }

  _createClass(_VideoThumbnailContainer, [{
    key: "_onPlayClick",

    /**
     * Handles events that occur when the user clicks or taps on a video thumbnail.
     * Displays a popup with the corresponding video.
     * @param event
     * @private
     */
    value: function _onPlayClick(event) {
      var _this$props = this.props,
          media = _this$props.media,
          _this$props$media = _this$props.media;
      _this$props$media = _this$props$media === void 0 ? {} : _this$props$media;
      var _this$props$media$vid = _this$props$media.video_content;
      _this$props$media$vid = _this$props$media$vid === void 0 ? {} : _this$props$media$vid;
      var video_title = _this$props$media$vid.video_title,
          showPopup = _this$props.showPopup;
      event.preventDefault();
      showPopup({
        media: media,
        title: video_title
      });
    }
  }, {
    key: "render",
    value: function render() {
      var media = this.props.media;
      return (
        /*#__PURE__*/
        _checkBEM(React, _VideoThumbnail_component__WEBPACK_IMPORTED_MODULE_6__["default"], _extends({
          media: media
        }, this.containerFunctions))
      );
    }
  }]);

  return _VideoThumbnailContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/** @namespace Component/VideoThumbnail/Container/mapStateToProps * @namespace Component/VideoThumbnail/Container
 */
// eslint-disable-next-line no-unused-vars

Object.defineProperty(_VideoThumbnailContainer, 'name', {
  value: 'VideoThumbnailContainer'
});

var VideoThumbnailContainer = middleware(_VideoThumbnailContainer, "Component/VideoThumbnail/Container/videoThumbnailContainer");

_defineProperty(VideoThumbnailContainer, "propTypes", {
  media: _type_ProductList__WEBPACK_IMPORTED_MODULE_5__["MediaItemType"].isRequired,
  showPopup: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

var mapStateToProps = middleware(function (state) {
  return {};
}, "Component/VideoThumbnail/Container/mapStateToProps");
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(VideoThumbnailContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/VideoThumbnail/VideoThumbnail.style.scss":
/*!********************************************************************!*\
  !*** ./src/app/component/VideoThumbnail/VideoThumbnail.style.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340839
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/VideoThumbnail/index.js":
/*!***************************************************!*\
  !*** ./src/app/component/VideoThumbnail/index.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VideoThumbnail_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VideoThumbnail.container */ "./src/app/component/VideoThumbnail/VideoThumbnail.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _VideoThumbnail_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/route/ProductPage/ProductPage.component.js":
/*!************************************************************!*\
  !*** ./src/app/route/ProductPage/ProductPage.component.js ***!
  \************************************************************/
/*! exports provided: _ProductPage, ProductPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, __, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductPage", function() { return _ProductPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductPage", function() { return ProductPage; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _component_ContentWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../component/ContentWrapper */ "./src/app/component/ContentWrapper/index.js");
/* harmony import */ var _component_ProductActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../component/ProductActions */ "./src/app/component/ProductActions/index.js");
/* harmony import */ var _component_ProductAttributes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../component/ProductAttributes */ "./src/app/component/ProductAttributes/index.js");
/* harmony import */ var _component_ProductCustomizableOptions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../component/ProductCustomizableOptions */ "./src/app/component/ProductCustomizableOptions/index.js");
/* harmony import */ var _component_ProductGallery__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../component/ProductGallery */ "./src/app/component/ProductGallery/index.js");
/* harmony import */ var _component_ProductInformation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../component/ProductInformation */ "./src/app/component/ProductInformation/index.js");
/* harmony import */ var _component_ProductLinks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../component/ProductLinks */ "./src/app/component/ProductLinks/index.js");
/* harmony import */ var _component_ProductReviews__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../component/ProductReviews */ "./src/app/component/ProductReviews/index.js");
/* harmony import */ var _component_ProductTabs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../component/ProductTabs */ "./src/app/component/ProductTabs/index.js");
/* harmony import */ var _store_LinkedProducts_LinkedProducts_reducer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../store/LinkedProducts/LinkedProducts.reducer */ "./src/app/store/LinkedProducts/LinkedProducts.reducer.js");
/* harmony import */ var _type_Device__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../type/Device */ "./src/app/type/Device.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _ProductPage_style__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./ProductPage.style */ "./src/app/route/ProductPage/ProductPage.style.scss");
/* harmony import */ var _ProductPage_style__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_ProductPage_style__WEBPACK_IMPORTED_MODULE_14__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

/* eslint-disable react/no-unused-state */

/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-ProductReviewListtheme
 */















/** @namespace Route/ProductPage/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductPage =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductPage, _Extensible);

  function _ProductPage() {
    _classCallCheck(this, _ProductPage);

    return _possibleConstructorReturn(this, _getPrototypeOf(_ProductPage).apply(this, arguments));
  }

  _createClass(_ProductPage, [{
    key: "renderProductPageContent",
    value: function renderProductPageContent() {
      var _this$props = this.props,
          configurableVariantIndex = _this$props.configurableVariantIndex,
          parameters = _this$props.parameters,
          getLink = _this$props.getLink,
          dataSource = _this$props.dataSource,
          updateConfigurableVariant = _this$props.updateConfigurableVariant,
          productOrVariant = _this$props.productOrVariant,
          areDetailsLoaded = _this$props.areDetailsLoaded,
          getSelectedCustomizableOptions = _this$props.getSelectedCustomizableOptions,
          productOptionsData = _this$props.productOptionsData,
          setBundlePrice = _this$props.setBundlePrice,
          selectedBundlePrice = _this$props.selectedBundlePrice;
      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null,
        /*#__PURE__*/
        _checkBEM(React, _component_ProductGallery__WEBPACK_IMPORTED_MODULE_6__["default"], {
          product: productOrVariant,
          areDetailsLoaded: areDetailsLoaded
        }),
        /*#__PURE__*/
        _checkBEM(React, _component_ProductActions__WEBPACK_IMPORTED_MODULE_3__["default"], {
          getLink: getLink,
          updateConfigurableVariant: updateConfigurableVariant,
          product: dataSource,
          productOrVariant: productOrVariant,
          parameters: parameters,
          areDetailsLoaded: areDetailsLoaded,
          configurableVariantIndex: configurableVariantIndex,
          getSelectedCustomizableOptions: getSelectedCustomizableOptions,
          productOptionsData: productOptionsData,
          setBundlePrice: setBundlePrice,
          selectedBundlePrice: selectedBundlePrice
        }))
      );
    }
  }, {
    key: "renderCustomizableOptions",
    value: function renderCustomizableOptions() {
      var _this$props2 = this.props,
          options = _this$props2.dataSource.options,
          getSelectedCustomizableOptions = _this$props2.getSelectedCustomizableOptions,
          productOptionsData = _this$props2.productOptionsData,
          device = _this$props2.device;

      if (!device.isMobile) {
        return null;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, _component_ProductCustomizableOptions__WEBPACK_IMPORTED_MODULE_5__["default"], {
          options: options || [],
          getSelectedCustomizableOptions: getSelectedCustomizableOptions,
          productOptionsData: productOptionsData
        })
      );
    }
  }, {
    key: "renderAdditionalSections",
    value: function renderAdditionalSections() {
      var _this$props3 = this.props,
          dataSource = _this$props3.dataSource,
          parameters = _this$props3.parameters,
          areDetailsLoaded = _this$props3.areDetailsLoaded;
      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null, this.renderCustomizableOptions(),
        /*#__PURE__*/
        _checkBEM(React, _component_ProductTabs__WEBPACK_IMPORTED_MODULE_10__["default"], {
          tabNames: [__('About'), __('Details'), __('Reviews')]
        },
        /*#__PURE__*/
        _checkBEM(React, _component_ProductInformation__WEBPACK_IMPORTED_MODULE_7__["default"], {
          product: _objectSpread2(_objectSpread2({}, dataSource), {}, {
            parameters: parameters
          }),
          areDetailsLoaded: areDetailsLoaded
        }),
        /*#__PURE__*/
        _checkBEM(React, _component_ProductAttributes__WEBPACK_IMPORTED_MODULE_4__["default"], {
          product: _objectSpread2(_objectSpread2({}, dataSource), {}, {
            parameters: parameters
          }),
          areDetailsLoaded: areDetailsLoaded
        }),
        /*#__PURE__*/
        _checkBEM(React, _component_ProductReviews__WEBPACK_IMPORTED_MODULE_9__["default"], {
          product: dataSource,
          areDetailsLoaded: areDetailsLoaded
        })),
        /*#__PURE__*/
        _checkBEM(React, _component_ProductLinks__WEBPACK_IMPORTED_MODULE_8__["default"], {
          linkType: _store_LinkedProducts_LinkedProducts_reducer__WEBPACK_IMPORTED_MODULE_11__["RELATED"],
          title: __('Recommended for you'),
          areDetailsLoaded: areDetailsLoaded
        }),
        /*#__PURE__*/
        _checkBEM(React, _component_ProductLinks__WEBPACK_IMPORTED_MODULE_8__["default"], {
          linkType: _store_LinkedProducts_LinkedProducts_reducer__WEBPACK_IMPORTED_MODULE_11__["UPSELL"],
          title: __('You might also like'),
          areDetailsLoaded: areDetailsLoaded
        }))
      );
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, "main", {
          block: "ProductPage",
          "aria-label": "Product page",
          itemScope: true,
          itemType: "http://schema.org/Product"
        },
        /*#__PURE__*/
        _checkBEM(React, _component_ContentWrapper__WEBPACK_IMPORTED_MODULE_2__["default"], {
          wrapperMix: {
            block: 'ProductPage',
            elem: 'Wrapper'
          },
          label: __('Main product details')
        }, this.renderProductPageContent()), this.renderAdditionalSections())
      );
    }
  }]);

  return _ProductPage;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductPage, 'name', {
  value: 'ProductPage'
});

var ProductPage = middleware(_ProductPage, "Route/ProductPage/Component");

_defineProperty(ProductPage, "propTypes", {
  configurableVariantIndex: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number.isRequired,
  productOrVariant: _type_ProductList__WEBPACK_IMPORTED_MODULE_13__["ProductType"].isRequired,
  getLink: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  parameters: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.objectOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string).isRequired,
  updateConfigurableVariant: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  dataSource: _type_ProductList__WEBPACK_IMPORTED_MODULE_13__["ProductType"].isRequired,
  areDetailsLoaded: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  getSelectedCustomizableOptions: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  productOptionsData: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object.isRequired,
  setBundlePrice: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  selectedBundlePrice: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number.isRequired,
  device: _type_Device__WEBPACK_IMPORTED_MODULE_12__["DeviceType"].isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (ProductPage);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/TranslationFunction */ "./src/config/TranslationFunction/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/route/ProductPage/ProductPage.container.js":
/*!************************************************************!*\
  !*** ./src/app/route/ProductPage/ProductPage.container.js ***!
  \************************************************************/
/*! exports provided: BreadcrumbsDispatcher, MetaDispatcher, ProductDispatcher, mapStateToProps, mapDispatchToProps, _ProductPageContainer, ProductPageContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BreadcrumbsDispatcher", function() { return BreadcrumbsDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetaDispatcher", function() { return MetaDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductDispatcher", function() { return ProductDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ProductPageContainer", function() { return _ProductPageContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductPageContainer", function() { return ProductPageContainer; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/es/index.js");
/* harmony import */ var _component_Header_Header_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../component/Header/Header.config */ "./src/app/component/Header/Header.config.js");
/* harmony import */ var _component_NavigationAbstract_NavigationAbstract_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../component/NavigationAbstract/NavigationAbstract.config */ "./src/app/component/NavigationAbstract/NavigationAbstract.config.js");
/* harmony import */ var _component_NavigationTabs_NavigationTabs_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../component/NavigationTabs/NavigationTabs.config */ "./src/app/component/NavigationTabs/NavigationTabs.config.js");
/* harmony import */ var _CategoryPage_CategoryPage_config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../CategoryPage/CategoryPage.config */ "./src/app/route/CategoryPage/CategoryPage.config.js");
/* harmony import */ var _store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../store/Navigation/Navigation.action */ "./src/app/store/Navigation/Navigation.action.js");
/* harmony import */ var _store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../store/Navigation/Navigation.reducer */ "./src/app/store/Navigation/Navigation.reducer.js");
/* harmony import */ var _store_Offline_Offline_action__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../store/Offline/Offline.action */ "./src/app/store/Offline/Offline.action.js");
/* harmony import */ var _store_RecentlyViewedProducts_RecentlyViewedProducts_action__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../store/RecentlyViewedProducts/RecentlyViewedProducts.action */ "./src/app/store/RecentlyViewedProducts/RecentlyViewedProducts.action.js");
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _type_ProductList__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../type/ProductList */ "./src/app/type/ProductList.js");
/* harmony import */ var _util_Product__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../util/Product */ "./src/app/util/Product/index.js");
/* harmony import */ var _util_Request__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../util/Request */ "./src/app/util/Request/index.js");
/* harmony import */ var _util_Url__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../util/Url */ "./src/app/util/Url/index.js");
/* harmony import */ var _ProductPage_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./ProductPage.component */ "./src/app/route/ProductPage/ProductPage.component.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

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


















var BreadcrumbsDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/Breadcrumbs/Breadcrumbs.dispatcher */ "./src/app/store/Breadcrumbs/Breadcrumbs.dispatcher.js"));
var MetaDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/Meta/Meta.dispatcher */ "./src/app/store/Meta/Meta.dispatcher.js"));
var ProductDispatcher = __webpack_require__.e(/*! import() | dispatchers */ "dispatchers").then(__webpack_require__.bind(null, /*! ../../store/Product/Product.dispatcher */ "./src/app/store/Product/Product.dispatcher.js"));
/** @namespace Route/ProductPage/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    isOffline: state.OfflineReducer.isOffline,
    product: state.ProductReducer.product,
    navigation: state.NavigationReducer[_store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_9__["TOP_NAVIGATION_TYPE"]],
    metaTitle: state.MetaReducer.title,
    device: state.ConfigReducer.device
  };
}, "Route/ProductPage/Container/mapStateToProps");
/** @namespace Route/ProductPage/Container/mapDispatchToProps */

var mapDispatchToProps = middleware(function (dispatch) {
  return {
    changeHeaderState: function changeHeaderState(state) {
      return dispatch(Object(_store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_8__["changeNavigationState"])(_store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_9__["TOP_NAVIGATION_TYPE"], state));
    },
    changeNavigationState: function changeNavigationState(state) {
      return dispatch(Object(_store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_8__["changeNavigationState"])(_store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_9__["BOTTOM_NAVIGATION_TYPE"], state));
    },
    requestProduct: function requestProduct(options) {
      // TODO: check linked products, there might be issues :'(
      ProductDispatcher.then(function (_ref) {
        var dispatcher = _ref.default;
        return dispatcher.handleData(dispatch, options);
      });
    },
    setBigOfflineNotice: function setBigOfflineNotice(isBig) {
      return dispatch(Object(_store_Offline_Offline_action__WEBPACK_IMPORTED_MODULE_10__["setBigOfflineNotice"])(isBig));
    },
    updateBreadcrumbs: function updateBreadcrumbs(breadcrumbs) {
      return BreadcrumbsDispatcher.then(function (_ref2) {
        var dispatcher = _ref2.default;
        return dispatcher.updateWithProduct(breadcrumbs, dispatch);
      });
    },
    updateMetaFromProduct: function updateMetaFromProduct(product) {
      return MetaDispatcher.then(function (_ref3) {
        var dispatcher = _ref3.default;
        return dispatcher.updateWithProduct(product, dispatch);
      });
    },
    goToPreviousNavigationState: function goToPreviousNavigationState(state) {
      return dispatch(Object(_store_Navigation_Navigation_action__WEBPACK_IMPORTED_MODULE_8__["goToPreviousNavigationState"])(_store_Navigation_Navigation_reducer__WEBPACK_IMPORTED_MODULE_9__["TOP_NAVIGATION_TYPE"], state));
    },
    updateRecentlyViewedProducts: function updateRecentlyViewedProducts(products) {
      return dispatch(Object(_store_RecentlyViewedProducts_RecentlyViewedProducts_action__WEBPACK_IMPORTED_MODULE_11__["updateRecentlyViewedProducts"])(products));
    }
  };
}, "Route/ProductPage/Container/mapDispatchToProps");
/** @namespace Route/ProductPage/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ProductPageContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ProductPageContainer, _Extensible);

  function _ProductPageContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ProductPageContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ProductPageContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      configurableVariantIndex: -1,
      parameters: {},
      productOptionsData: {},
      selectedBundlePrice: 0,
      currentProductSKU: ''
    });

    _defineProperty(_assertThisInitialized(_this), "containerFunctions", {
      updateConfigurableVariant: _this.updateConfigurableVariant.bind(_assertThisInitialized(_this)),
      getLink: _this.getLink.bind(_assertThisInitialized(_this)),
      getSelectedCustomizableOptions: _this.getSelectedCustomizableOptions.bind(_assertThisInitialized(_this)),
      setBundlePrice: _this.setBundlePrice.bind(_assertThisInitialized(_this))
    });

    _defineProperty(_assertThisInitialized(_this), "setOfflineNoticeSize", function () {
      var _this$props = _this.props,
          setBigOfflineNotice = _this$props.setBigOfflineNotice,
          productSKU = _this$props.productSKU;

      var _this$getDataSource = _this.getDataSource(),
          sku = _this$getDataSource.sku;
      /**
       * If there is any information about the product, in example,
       * we know it's URL-rewrite SKU is matching the product SKU -
       * show the small offline notice, else - show larger one.
       */


      if (sku !== productSKU) {
        setBigOfflineNotice(true);
      } else {
        setBigOfflineNotice(false);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "containerProps", function () {
      return {
        productOrVariant: _this.getProductOrVariant(),
        dataSource: _this.getDataSource(),
        areDetailsLoaded: _this.getAreDetailsLoaded()
      };
    });

    return _this;
  }

  _createClass(_ProductPageContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      /**
       * Always make sure the navigation switches into the MENU tab
       * */
      this.updateNavigationState();
      /**
       * Ensure transition PDP => homepage => PDP always having proper meta
       */

      this.updateMeta();
      /**
       * Make sure to update header state, the data-source will
       * define the correct information to use for update
       * (it can be a product, history state product or an empty object).
       */

      this.updateHeaderState();
      this.updateBreadcrumbs();
      this.scrollTopIfPreviousPageWasPLP();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _history, _history$state, _history$state$state;

      var _this$props2 = this.props,
          isOffline = _this$props2.isOffline,
          productSKU = _this$props2.productSKU,
          _this$props2$product = _this$props2.product,
          sku = _this$props2$product.sku,
          options = _this$props2$product.options,
          items = _this$props2$product.items;
      var prevProductSKU = prevProps.productSKU,
          _prevProps$product = prevProps.product,
          prevSku = _prevProps$product.sku,
          prevOptions = _prevProps$product.options,
          prevItems = _prevProps$product.items;

      var _ref4 = ((_history = history) === null || _history === void 0 ? void 0 : (_history$state = _history.state) === null || _history$state === void 0 ? void 0 : (_history$state$state = _history$state.state) === null || _history$state$state === void 0 ? void 0 : _history$state$state.product) || {},
          stateSKU = _ref4.sku;

      if (isOffline) {
        Object(_util_Request__WEBPACK_IMPORTED_MODULE_15__["debounce"])(this.setOfflineNoticeSize, _CategoryPage_CategoryPage_config__WEBPACK_IMPORTED_MODULE_7__["LOADING_TIME"])();
      }
      /**
       * We should also update product based data if, the URL
       * rewrite SKU has changed to matching the product history SKU
       * one. At this point there could be sufficient data for
       * some updates (i.e. header state).
       */


      if (productSKU !== prevProductSKU && stateSKU === productSKU) {
        this.updateHeaderState();
      }
      /**
       * If the currently loaded category ID does not match the ID of
       * category ID from URL rewrite, request category.
       */


      if (productSKU !== sku) {
        this.requestProduct();
      }
      /**
       * If product ID was changed => it is loaded => we need to
       * update product specific information, i.e. breadcrumbs.
       */


      if (sku !== prevSku) {
        this.updateBreadcrumbs();
        this.updateHeaderState();
        this.updateMeta();
      }
      /**
       * LEGACY: needed to make sure required items are
       * selected in the bundle product.
       */


      if (JSON.stringify(options) !== JSON.stringify(prevOptions)) {
        this.getRequiredProductOptions(options);
      }
      /**
       * LEGACY needed to make sure required options are
       * selected in the customizable options product.
       */


      if (JSON.stringify(items) !== JSON.stringify(prevItems)) {
        this.getRequiredProductOptions(items);
      }

      this._addToRecentlyViewedProducts();
    }
  }, {
    key: "_addToRecentlyViewedProducts",
    value: function _addToRecentlyViewedProducts() {
      var _this$props3 = this.props,
          product = _this$props3.product,
          sku = _this$props3.product.sku,
          updateRecentlyViewedProducts = _this$props3.updateRecentlyViewedProducts; // necessary for skipping not loaded products

      if (!sku) {
        return;
      }

      updateRecentlyViewedProducts(product);
    }
  }, {
    key: "scrollTopIfPreviousPageWasPLP",
    value: function scrollTopIfPreviousPageWasPLP() {
      var _this$props$navigatio = this.props.navigation,
          navigationStateHistory = _this$props$navigatio.navigationStateHistory,
          length = _this$props$navigatio.navigationStateHistory.length;
      var minNavStackLength = 2; // When first load is PDP

      if (length <= minNavStackLength) {
        return;
      } // Minus two, one so array keys match length, one for previous item.


      var prevPageId = length - 2;
      var prevName = navigationStateHistory[prevPageId].name; // One before prev page

      var beforePrevPageId = prevPageId - 1;
      var beforePrevName = navigationStateHistory[beforePrevPageId].name;
      /**
       * For some reason on desktop going from PLP to PDP
       * in navigation stack is added default name between
       */

      if (_component_Header_Header_config__WEBPACK_IMPORTED_MODULE_4__["CATEGORY"] === prevName || beforePrevName === _component_Header_Header_config__WEBPACK_IMPORTED_MODULE_4__["CATEGORY"] && prevName === _component_NavigationAbstract_NavigationAbstract_config__WEBPACK_IMPORTED_MODULE_5__["DEFAULT_STATE_NAME"]) {
        window.scrollTo(0, 0);
      }
    }
  }, {
    key: "getLink",
    value: function getLink(key, value) {
      var _this$props$location = this.props.location,
          search = _this$props$location.search,
          pathname = _this$props$location.pathname;

      var obj = _objectSpread2({}, Object(_util_Url__WEBPACK_IMPORTED_MODULE_16__["convertQueryStringToKeyValuePairs"])(search));

      if (key) {
        obj[key] = value;
      }

      var query = Object(_util_Url__WEBPACK_IMPORTED_MODULE_16__["objectToUri"])(obj);
      return "".concat(pathname).concat(query);
    }
  }, {
    key: "getRequiredProductOptions",
    value: function getRequiredProductOptions(options) {
      var productOptionsData = this.state.productOptionsData;

      if (!options) {
        return [];
      }

      var requiredOptions = options.reduce(function (acc, _ref5) {
        var option_id = _ref5.option_id,
            required = _ref5.required;

        if (required) {
          acc.push(option_id);
        }

        return acc;
      }, []);
      return this.setState({
        productOptionsData: _objectSpread2(_objectSpread2({}, productOptionsData), {}, {
          requiredOptions: requiredOptions
        })
      });
    }
  }, {
    key: "setBundlePrice",
    value: function setBundlePrice(price) {
      this.setState({
        selectedBundlePrice: price
      });
    }
  }, {
    key: "getSelectedCustomizableOptions",
    value: function getSelectedCustomizableOptions(values) {
      var updateArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var productOptionsData = this.state.productOptionsData;

      if (updateArray) {
        this.setState({
          productOptionsData: _objectSpread2(_objectSpread2({}, productOptionsData), {}, {
            productOptionsMulti: values
          })
        });
      } else {
        this.setState({
          productOptionsData: _objectSpread2(_objectSpread2({}, productOptionsData), {}, {
            productOptions: values
          })
        });
      }
    }
  }, {
    key: "getIsConfigurableParameterSelected",
    value: function getIsConfigurableParameterSelected(parameters, key, value) {
      return Object.hasOwnProperty.call(parameters, key) && parameters[key] === value;
    }
  }, {
    key: "getNewParameters",
    value: function getNewParameters(key, value) {
      var parameters = this.state.parameters; // If value is already selected, than we remove the key to achieve deselection

      if (this.getIsConfigurableParameterSelected(parameters, key, value)) {
        var oldValue = parameters[key],
            newParameters = _objectWithoutProperties(parameters, [key].map(_toPropertyKey));

        return newParameters;
      }

      return _objectSpread2(_objectSpread2({}, parameters), {}, _defineProperty({}, key, value.toString()));
    }
  }, {
    key: "updateConfigurableVariant",
    value: function updateConfigurableVariant(key, value) {
      var parameters = this.getNewParameters(key, value);
      this.setState({
        parameters: parameters
      });
      this.updateUrl(key, value, parameters);
      this.updateConfigurableVariantIndex(parameters);
    }
  }, {
    key: "updateUrl",
    value: function updateUrl(key, value, parameters) {
      var _this$props4 = this.props,
          location = _this$props4.location,
          history = _this$props4.history;
      var isParameterSelected = this.getIsConfigurableParameterSelected(parameters, key, value);

      if (isParameterSelected) {
        Object(_util_Url__WEBPACK_IMPORTED_MODULE_16__["updateQueryParamWithoutHistory"])(key, value, history, location);
      } else {
        Object(_util_Url__WEBPACK_IMPORTED_MODULE_16__["removeQueryParamWithoutHistory"])(key, history, location);
      }
    }
  }, {
    key: "updateConfigurableVariantIndex",
    value: function updateConfigurableVariantIndex(parameters) {
      var _this$props$product = this.props.product,
          variants = _this$props$product.variants,
          configurable_options = _this$props$product.configurable_options;
      var configurableVariantIndex = this.state.configurableVariantIndex;
      var newIndex = Object.keys(parameters).length === Object.keys(configurable_options).length ? Object(_util_Product__WEBPACK_IMPORTED_MODULE_14__["getVariantIndex"])(variants, parameters) // Not all parameters are selected yet, therefore variantIndex must be invalid
      : -1;

      if (configurableVariantIndex !== newIndex) {
        this.setState({
          configurableVariantIndex: newIndex
        });
      }
    }
  }, {
    key: "getAreDetailsLoaded",
    value: function getAreDetailsLoaded() {
      var product = this.props.product;
      var dataSource = this.getDataSource();
      return dataSource === product;
    }
  }, {
    key: "getProductOrVariant",
    value: function getProductOrVariant() {
      var dataSource = this.getDataSource();
      var variants = dataSource.variants;
      var currentVariantIndex = this.getConfigurableVariantIndex(variants);
      var variant = variants && variants[currentVariantIndex];
      return variant || dataSource;
    }
  }, {
    key: "getConfigurableVariantIndex",
    value: function getConfigurableVariantIndex(variants) {
      var _this$state = this.state,
          configurableVariantIndex = _this$state.configurableVariantIndex,
          parameters = _this$state.parameters;

      if (configurableVariantIndex >= 0) {
        return configurableVariantIndex;
      }

      if (variants) {
        return Object(_util_Product__WEBPACK_IMPORTED_MODULE_14__["getVariantIndex"])(variants, parameters);
      }

      return -1;
    }
  }, {
    key: "getDataSource",
    value: function getDataSource() {
      var _history2, _history2$state;

      var _this$props5 = this.props,
          productSKU = _this$props5.productSKU,
          product = _this$props5.product;
      var sku = product.sku;

      var _ref6 = ((_history2 = history) === null || _history2 === void 0 ? void 0 : (_history2$state = _history2.state) === null || _history2$state === void 0 ? void 0 : _history2$state.state) || {},
          stateProduct = _ref6.product;

      var _ref7 = stateProduct || {},
          stateSKU = _ref7.sku;
      /**
       * If URL rewrite requested matches loaded product SKU
       * assume it is a data-source.
       */


      if (productSKU === sku) {
        return product;
      }
      /**
       * If URL rewrite requested matches product SKU from
       * history state - it is a data-source.
       */


      if (productSKU === stateSKU) {
        return stateProduct;
      }
      /**
       * Else there is no place to get a up-to-date
       * information about the product from.
       */


      return {};
    }
  }, {
    key: "getProductRequestFilter",
    value: function getProductRequestFilter() {
      var productSKU = this.props.productSKU;
      return {
        productSKU: productSKU
      };
    }
  }, {
    key: "requestProduct",
    value: function requestProduct() {
      var _this$props6 = this.props,
          requestProduct = _this$props6.requestProduct,
          productSKU = _this$props6.productSKU;
      var currentProductSKU = this.state.currentProductSKU;
      /**
       * If URL rewrite was not passed - do not request the product.
       */

      if (!productSKU) {
        return;
      }
      /**
       * Skip loading the same product SKU the second time
       */


      if (currentProductSKU === productSKU) {
        return;
      }

      this.setState({
        currentProductSKU: productSKU
      });
      var options = {
        isSingleProduct: true,
        args: {
          filter: this.getProductRequestFilter()
        }
      };
      requestProduct(options);
    }
  }, {
    key: "updateNavigationState",
    value: function updateNavigationState() {
      var changeNavigationState = this.props.changeNavigationState;
      changeNavigationState({
        name: _component_NavigationTabs_NavigationTabs_config__WEBPACK_IMPORTED_MODULE_6__["MENU_TAB"]
      });
    }
  }, {
    key: "updateMeta",
    value: function updateMeta() {
      var updateMetaFromProduct = this.props.updateMetaFromProduct;
      updateMetaFromProduct(this.getDataSource());
    }
  }, {
    key: "updateHeaderState",
    value: function updateHeaderState() {
      var _this$getDataSource2 = this.getDataSource(),
          _this$getDataSource2$ = _this$getDataSource2.name,
          name = _this$getDataSource2$ === void 0 ? '' : _this$getDataSource2$;

      var changeHeaderState = this.props.changeHeaderState;
      changeHeaderState({
        name: _component_Header_Header_config__WEBPACK_IMPORTED_MODULE_4__["PDP"],
        title: name,
        onBackClick: function onBackClick() {
          return history.back();
        }
      });
    }
  }, {
    key: "updateBreadcrumbs",
    value: function updateBreadcrumbs() {
      var updateBreadcrumbs = this.props.updateBreadcrumbs;
      updateBreadcrumbs(this.getDataSource());
    }
  }, {
    key: "render",
    value: function render() {
      return (
        /*#__PURE__*/
        _checkBEM(React, _ProductPage_component__WEBPACK_IMPORTED_MODULE_17__["default"], _extends({}, this.props, this.state, this.containerFunctions, this.containerProps()))
      );
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var _props$product = props.product,
          sku = _props$product.sku,
          variants = _props$product.variants,
          configurable_options = _props$product.configurable_options,
          search = props.location.search;
      var prevSKU = state.currentProductSKU;
      var currentProductSKU = prevSKU === sku ? '' : prevSKU;
      /**
       * If the product we expect to load is loaded -
       * reset expected SKU
       */

      if (!configurable_options && !variants) {
        return {
          currentProductSKU: currentProductSKU
        };
      }

      var parameters = Object.entries(Object(_util_Url__WEBPACK_IMPORTED_MODULE_16__["convertQueryStringToKeyValuePairs"])(search)).reduce(function (acc, _ref8) {
        var _ref9 = _slicedToArray(_ref8, 2),
            key = _ref9[0],
            value = _ref9[1];

        if (key in configurable_options) {
          return _objectSpread2(_objectSpread2({}, acc), {}, _defineProperty({}, key, value));
        }

        return acc;
      }, {});

      if (Object.keys(parameters).length !== Object.keys(configurable_options).length) {
        return {
          parameters: parameters,
          currentProductSKU: currentProductSKU
        };
      }

      var configurableVariantIndex = Object(_util_Product__WEBPACK_IMPORTED_MODULE_14__["getVariantIndex"])(variants, parameters);
      return {
        parameters: parameters,
        currentProductSKU: currentProductSKU,
        configurableVariantIndex: configurableVariantIndex
      };
    }
  }]);

  return _ProductPageContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ProductPageContainer, 'name', {
  value: 'ProductPageContainer'
});

var ProductPageContainer = middleware(_ProductPageContainer, "Route/ProductPage/Container");

_defineProperty(ProductPageContainer, "propTypes", {
  location: _type_Common__WEBPACK_IMPORTED_MODULE_12__["LocationType"],
  changeHeaderState: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  setBigOfflineNotice: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  changeNavigationState: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  updateMetaFromProduct: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  updateBreadcrumbs: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  requestProduct: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  isOffline: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  productSKU: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  product: _type_ProductList__WEBPACK_IMPORTED_MODULE_13__["ProductType"].isRequired,
  history: _type_Common__WEBPACK_IMPORTED_MODULE_12__["HistoryType"].isRequired,
  match: _type_Common__WEBPACK_IMPORTED_MODULE_12__["MatchType"].isRequired,
  goToPreviousNavigationState: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  navigation: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape).isRequired,
  metaTitle: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  updateRecentlyViewedProducts: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

_defineProperty(ProductPageContainer, "defaultProps", {
  location: {
    state: {}
  },
  productSKU: '',
  metaTitle: undefined
});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_router__WEBPACK_IMPORTED_MODULE_3__["withRouter"])(Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(ProductPageContainer)));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/route/ProductPage/ProductPage.style.scss":
/*!**********************************************************!*\
  !*** ./src/app/route/ProductPage/ProductPage.style.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291339281
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/route/ProductPage/index.js":
/*!********************************************!*\
  !*** ./src/app/route/ProductPage/index.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProductPage_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductPage.container */ "./src/app/route/ProductPage/ProductPage.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ProductPage_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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

/***/ "./src/app/type/Account.js":
/*!*********************************!*\
  !*** ./src/app/type/Account.js ***!
  \*********************************/
/*! exports provided: regionType, addressType, addressesType, customerType, baseOrderInfoType, orderType, ordersType, DASHBOARD, MY_ORDERS, MY_WISHLIST, ADDRESS_BOOK, NEWSLETTER_SUBSCRIPTION, activeTabType, tabType, tabMapType, signInStateType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "regionType", function() { return regionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addressType", function() { return addressType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addressesType", function() { return addressesType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "customerType", function() { return customerType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "baseOrderInfoType", function() { return baseOrderInfoType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "orderType", function() { return orderType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ordersType", function() { return ordersType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DASHBOARD", function() { return DASHBOARD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MY_ORDERS", function() { return MY_ORDERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MY_WISHLIST", function() { return MY_WISHLIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADDRESS_BOOK", function() { return ADDRESS_BOOK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NEWSLETTER_SUBSCRIPTION", function() { return NEWSLETTER_SUBSCRIPTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "activeTabType", function() { return activeTabType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tabType", function() { return tabType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tabMapType", function() { return tabMapType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signInStateType", function() { return signInStateType; });
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

var regionType = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
  region_code: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  region: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  region_id: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number
})]);
var addressType = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
  city: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  country_id: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  customer_id: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  default_billing: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  default_shipping: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  firstname: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  id: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  lastname: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  middlename: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  postcode: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  prefix: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  regionType: regionType,
  street: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string)]),
  suffix: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  telephone: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
});
var addressesType = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(addressType);
var customerType = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
  addressesType: addressesType,
  created_at: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  default_billing: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  default_shipping: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  dob: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.date,
  email: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  firstname: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  group_id: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  id: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  is_subscribed: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  lastname: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  middlename: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  prefix: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  suffix: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  taxvat: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
});
var baseOrderInfoType = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
  id: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  increment_id: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  created_at: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  status_label: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  grand_total: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  subtotal: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
}); // TODO: remove objects

var orderType = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
  base_order_info: baseOrderInfoType,
  order_products: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.array,
  payment_info: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object,
  shipping_info: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object
});
var ordersType = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(orderType);
var DASHBOARD = 'dashboard';
var MY_ORDERS = 'my-orders';
var MY_WISHLIST = 'my-wishlist';
var ADDRESS_BOOK = 'address-book';
var NEWSLETTER_SUBSCRIPTION = 'newsletter-subscription';
var activeTabType = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string;
var tabType = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
  url: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  name: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
});
var tabMapType = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.objectOf(tabType);
var signInStateType = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string;

/***/ }),

/***/ "./src/app/type/Rating.js":
/*!********************************!*\
  !*** ./src/app/type/Rating.js ***!
  \********************************/
/*! exports provided: RatingOptionItemType, RatingItemsType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RatingOptionItemType", function() { return RatingOptionItemType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RatingItemsType", function() { return RatingItemsType; });
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

var RatingOptionItemType = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
  option_id: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  value: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
});
var RatingItemsType = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
  rating_id: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  rating_code: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  rating_options: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(RatingOptionItemType)
}));

/***/ })

}]);
//# sourceMappingURL=product.js.map