(this["webpackJsonp"] = this["webpackJsonp"] || []).push([["account~cart~checkout~cms~misc~product"],{

/***/ "./src/app/component/Draggable/Draggable.component.js":
/*!************************************************************!*\
  !*** ./src/app/component/Draggable/Draggable.component.js ***!
  \************************************************************/
/*! exports provided: _Draggable, Draggable, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_Draggable", function() { return _Draggable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Draggable", function() { return Draggable; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _Draggable_style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Draggable.style */ "./src/app/component/Draggable/Draggable.style.scss");
/* harmony import */ var _Draggable_style__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Draggable_style__WEBPACK_IMPORTED_MODULE_3__);
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




/** @namespace Component/Draggable/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _Draggable =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_Draggable, _Extensible);

  function _Draggable() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _Draggable);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_Draggable)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isDragging: false,
      originalX: 0,
      translateX: 0,
      lastTranslateX: 0,
      originalY: 0,
      translateY: 0,
      lastTranslateY: 0
    });

    _defineProperty(_assertThisInitialized(_this), "handleTouchStart", function (_ref) {
      var touches = _ref.touches;
      window.addEventListener('touchmove', _this.handleTouchMove);
      window.addEventListener('touchend', _this.handleTouchEnd);

      if (touches.length === 1) {
        _this._handleDragStart(touches[0]);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseDown", function (event) {
      window.addEventListener('mousemove', _this.handleMouseMove);
      window.addEventListener('mouseup', _this.handleMouseUp);
      event.preventDefault();

      _this._handleDragStart(event);
    });

    _defineProperty(_assertThisInitialized(_this), "handleTouchMove", function (_ref2) {
      var touches = _ref2.touches;

      if (touches.length === 1) {
        _this.handleMouseMove(touches[0]);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseMove", function (_ref3) {
      var clientX = _ref3.clientX,
          clientY = _ref3.clientY;
      var isDragging = _this.state.isDragging;
      var _this$props = _this.props,
          shiftX = _this$props.shiftX,
          shiftY = _this$props.shiftY;

      if (!isDragging) {
        return;
      }

      _this.setState(function (_ref4) {
        var originalX = _ref4.originalX,
            originalY = _ref4.originalY;
        return {
          translateX: clientX - originalX + shiftX,
          translateY: clientY - originalY + shiftY
        };
      }, function () {
        var onDrag = _this.props.onDrag;

        if (onDrag) {
          onDrag(_objectSpread2(_objectSpread2({}, _this.state), {}, {
            clientX: clientX,
            clientY: clientY
          }));
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleTouchEnd", function () {
      window.removeEventListener('touchmove', _this.handleTouchMove);
      window.removeEventListener('touchend', _this.handleTouchEnd);

      _this._handleDragEnd();
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseUp", function () {
      window.removeEventListener('mousemove', _this.handleMouseMove);
      window.removeEventListener('mouseup', _this.handleMouseUp);

      _this._handleDragEnd();
    });

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (e) {
      var onClick = _this.props.onClick;

      if (onClick) {
        onClick(_this.state, function (newState) {
          return _this.setState(_objectSpread2(_objectSpread2({}, newState), {}, {
            isDragging: false,
            translateX: 0,
            translateY: 0
          }));
        }, e);
      }
    });

    return _this;
  }

  _createClass(_Draggable, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('mousemove', this.handleMouseMove);
      window.removeEventListener('mouseup', this.handleMouseUp);
      window.removeEventListener('touchmove', this.handleTouchMove);
      window.removeEventListener('touchend', this.handleTouchEnd);
    }
  }, {
    key: "_handleDragStart",
    value: function _handleDragStart(_ref5) {
      var clientX = _ref5.clientX,
          clientY = _ref5.clientY;
      var onDragStart = this.props.onDragStart;

      if (onDragStart) {
        onDragStart();
      }

      this.setState({
        originalX: clientX,
        originalY: clientY,
        isDragging: true
      });
    }
  }, {
    key: "_handleDragEnd",
    value: function _handleDragEnd() {
      var _this2 = this;

      var onDragEnd = this.props.onDragEnd;
      onDragEnd(this.state, function (newState) {
        return _this2.setState(_objectSpread2(_objectSpread2({}, newState), {}, {
          isDragging: false,
          translateX: 0,
          translateY: 0
        }));
      }); // TO STAY WHERE RELEASED
      // originalX: 0,
      // lastTranslateX: translateX,
      // originalY: 0,
      // lastTranslateY: translateY,
      // TO RETURN INTO INITIAL
      // originalX: 0,
      // lastTranslateX: 0
      // originalY: 0,
      // lastTranslateY: 0
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          handleFocus = _this$props2.handleFocus,
          handleKey = _this$props2.handleKey,
          draggableRef = _this$props2.draggableRef,
          mix = _this$props2.mix;
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "Draggable",
          mix: mix,
          ref: draggableRef,
          onMouseDown: this.handleMouseDown,
          onTouchStart: this.handleTouchStart,
          onClick: this.handleClick,
          onContextMenu: this.handleClick,
          onKeyDown: handleKey,
          onFocus: handleFocus,
          tabIndex: 0,
          role: "button",
          "aria-label": "Draggable area"
        }, children)
      );
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var shiftX = props.shiftX,
          shiftY = props.shiftY;
      var lastTranslateX = state.lastTranslateX,
          lastTranslateY = state.lastTranslateY;

      if (shiftX !== lastTranslateX || shiftY !== lastTranslateY) {
        return {
          lastTranslateX: shiftX,
          lastTranslateY: shiftY
        };
      }

      return null;
    }
  }]);

  return _Draggable;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_Draggable, 'name', {
  value: 'Draggable'
});

var Draggable = middleware(_Draggable, "Component/Draggable/Component");

_defineProperty(Draggable, "propTypes", {
  shiftX: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  shiftY: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  onDragStart: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  onDragEnd: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  handleFocus: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  handleKey: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  onDrag: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  children: _type_Common__WEBPACK_IMPORTED_MODULE_2__["ChildrenType"].isRequired,
  mix: _type_Common__WEBPACK_IMPORTED_MODULE_2__["MixType"],
  draggableRef: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
    current: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.instanceOf(Element)
  })])
});

_defineProperty(Draggable, "defaultProps", {
  shiftX: 0,
  shiftY: 0,
  onDragStart: function onDragStart() {},
  onDragEnd: function onDragEnd(state, callback) {
    var translateX = state.translateX,
        translateY = state.translateY;
    callback({
      originalX: 0,
      originalY: 0,
      shiftX: translateX,
      shiftY: translateY
    });
  },
  onClick: function onClick() {},
  onDrag: function onDrag() {},
  handleFocus: function handleFocus() {},
  handleKey: function handleKey() {},
  draggableRef: function draggableRef() {},
  mix: {}
});

/* harmony default export */ __webpack_exports__["default"] = (Draggable);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/Draggable/Draggable.style.scss":
/*!**********************************************************!*\
  !*** ./src/app/component/Draggable/Draggable.style.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340586
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/Draggable/index.js":
/*!**********************************************!*\
  !*** ./src/app/component/Draggable/index.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Draggable_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Draggable.component */ "./src/app/component/Draggable/Draggable.component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _Draggable_component__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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
//# sourceMappingURL=account~cart~checkout~cms~misc~product.js.map