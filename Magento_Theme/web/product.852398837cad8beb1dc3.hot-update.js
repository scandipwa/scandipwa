webpackHotUpdate("product",{

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
      // 1605720265555
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
      // 1605720265561
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
      // 1605720265601
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

/***/ "./src/app/component/GroupedProductsItem/GroupedProductsItem.style.scss":
/*!******************************************************************************!*\
  !*** ./src/app/component/GroupedProductsItem/GroupedProductsItem.style.scss ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1605720115450
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

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
      // 1605720265551
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

/***/ "./src/app/component/ProductActions/ProductActions.style.scss":
/*!********************************************************************!*\
  !*** ./src/app/component/ProductActions/ProductActions.style.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1605720115051
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ProductBundleItem/ProductBundleItem.style.scss":
/*!**************************************************************************!*\
  !*** ./src/app/component/ProductBundleItem/ProductBundleItem.style.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1605720115441
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ProductCustomizableOptions/ProductCustomizableOptions.style.scss":
/*!********************************************************************************************!*\
  !*** ./src/app/component/ProductCustomizableOptions/ProductCustomizableOptions.style.scss ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1605720114832
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

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
        isZoomInCursor: gallery.length > 1 && !isImageZoomPopupActive
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
      // 1605720264639
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
      // 1605720264882
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ProductInformation/ProductInformation.style.scss":
/*!****************************************************************************!*\
  !*** ./src/app/component/ProductInformation/ProductInformation.style.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1605720114783
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

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

/***/ "./src/app/component/ProductReviewForm/ProductReviewForm.style.scss":
/*!**************************************************************************!*\
  !*** ./src/app/component/ProductReviewForm/ProductReviewForm.style.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1605720115279
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

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
      // 1605720115415
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

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
      // 1605720115185
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ProductReviews/ProductReviews.style.scss":
/*!********************************************************************!*\
  !*** ./src/app/component/ProductReviews/ProductReviews.style.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1605720114896
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ProductWishlistButton/ProductWishlistButton.style.scss":
/*!**********************************************************************************!*\
  !*** ./src/app/component/ProductWishlistButton/ProductWishlistButton.style.scss ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1605720115361
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

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
      // 1605720115402
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

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
      // 1605720265582
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

/***/ "./src/app/component/VideoPopup/VideoPopup.style.scss":
/*!************************************************************!*\
  !*** ./src/app/component/VideoPopup/VideoPopup.style.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1605720115268
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/VideoThumbnail/VideoThumbnail.style.scss":
/*!********************************************************************!*\
  !*** ./src/app/component/VideoThumbnail/VideoThumbnail.style.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1605720115236
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/route/ProductPage/ProductPage.style.scss":
/*!**********************************************************!*\
  !*** ./src/app/route/ProductPage/ProductPage.style.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1605720114264
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

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

/***/ }),

/***/ "?0015":
false,

/***/ "?3a6e":
false,

/***/ "?4462":
false,

/***/ "?4732":
false,

/***/ "?4d55":
false,

/***/ "?4f07":
false,

/***/ "?6b7e":
false,

/***/ "?6c3d":
false,

/***/ "?9271":
false,

/***/ "?9991":
false,

/***/ "?a47f":
false,

/***/ "?d8da":
false,

/***/ "?e0c0":
false,

/***/ "?e485":
false,

/***/ "?f09e":
false,

/***/ "?ffc9":
false

})
//# sourceMappingURL=product.852398837cad8beb1dc3.hot-update.js.map