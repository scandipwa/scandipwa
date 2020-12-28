(this["webpackJsonp"] = this["webpackJsonp"] || []).push([["account~cart~checkout~misc"],{

/***/ "./src/app/component/SwipeToDelete/SwipeToDelete.component.js":
/*!********************************************************************!*\
  !*** ./src/app/component/SwipeToDelete/SwipeToDelete.component.js ***!
  \********************************************************************/
/*! exports provided: _SwipeToDelete, SwipeToDelete, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_SwipeToDelete", function() { return _SwipeToDelete; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SwipeToDelete", function() { return SwipeToDelete; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Draggable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Draggable */ "./src/app/component/Draggable/index.js");
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _util_CSS__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/CSS */ "./src/app/util/CSS/index.js");
/* harmony import */ var _SwipeToDelete_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SwipeToDelete.config */ "./src/app/component/SwipeToDelete/SwipeToDelete.config.js");
/* harmony import */ var _SwipeToDelete_style__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SwipeToDelete.style */ "./src/app/component/SwipeToDelete/SwipeToDelete.style.scss");
/* harmony import */ var _SwipeToDelete_style__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_SwipeToDelete_style__WEBPACK_IMPORTED_MODULE_6__);
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







/** @namespace Component/SwipeToDelete/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _SwipeToDelete =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_SwipeToDelete, _Extensible);

  function _SwipeToDelete() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _SwipeToDelete);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_SwipeToDelete)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isRightSideOpen: false,
      isAheadRemoveItemThreshold: false
    });

    _defineProperty(_assertThisInitialized(_this), "draggableRef",
    /*#__PURE__*/
    Object(react__WEBPACK_IMPORTED_MODULE_1__["createRef"])());

    _defineProperty(_assertThisInitialized(_this), "draggableRemoveThreshold", void 0);

    _defineProperty(_assertThisInitialized(_this), "draggableWidth", void 0);

    _defineProperty(_assertThisInitialized(_this), "handleDragStart", function () {
      // Remove animation when drag starts
      _this.setAnimationSpeedStyle(0);
    });

    _defineProperty(_assertThisInitialized(_this), "handleDrag", function (_ref) {
      var translateX = _ref.translateX;
      var dragRightOpenThreshold = _this.props.dragRightOpenThreshold;
      var _this$state = _this.state,
          isRightSideOpen = _this$state.isRightSideOpen,
          isAheadRemoveItemThreshold = _this$state.isAheadRemoveItemThreshold;

      var _assertThisInitialize = _assertThisInitialized(_this),
          draggableRemoveThreshold = _assertThisInitialize.draggableRemoveThreshold;

      var nextIsAheadRemoveItemThreshold = Math.abs(translateX) > draggableRemoveThreshold;

      if (isAheadRemoveItemThreshold !== nextIsAheadRemoveItemThreshold) {
        _this.setState({
          isAheadRemoveItemThreshold: nextIsAheadRemoveItemThreshold
        });
      } // When dragging to left from current start point, going negative translateX


      if (translateX <= 0) {
        var translate = isRightSideOpen // Add (remove to have minus value) opened content width, to have full -translateX value
        ? translateX - dragRightOpenThreshold : translateX;

        _this.setTranslateXStyle(translate);

        return;
      } // When dragging to right from current start point, going positive translateX


      if (translateX > 0) {
        // When translate goes out of screen
        if (!isRightSideOpen || isRightSideOpen && translateX - dragRightOpenThreshold > 0) {
          _this.setTranslateXStyle(0);

          return;
        } // When content is opened and dragging to right side


        if (translateX - dragRightOpenThreshold < 0 && isRightSideOpen) {
          // Add (remove to have minus value) opened content width, to have full -translateX value
          _this.setTranslateXStyle(translateX - dragRightOpenThreshold);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleDragEnd", function (_ref2) {
      var translateX = _ref2.translateX;
      var _this$props = _this.props,
          dragRightOpenThreshold = _this$props.dragRightOpenThreshold,
          dragRightOpenTriggerThreshold = _this$props.dragRightOpenTriggerThreshold,
          onAheadOfDragItemRemoveThreshold = _this$props.onAheadOfDragItemRemoveThreshold,
          animationDurationOnRemove = _this$props.animationDurationOnRemove;
      var isAheadRemoveItemThreshold = _this.state.isAheadRemoveItemThreshold;

      var _assertThisInitialize2 = _assertThisInitialized(_this),
          draggableWidth = _assertThisInitialize2.draggableWidth;

      var shouldOpen = translateX > -dragRightOpenTriggerThreshold;

      if (isAheadRemoveItemThreshold) {
        // swipe to the end
        _this.setAnimationSpeedStyle(animationDurationOnRemove);

        _this.setTranslateXStyle(-draggableWidth);

        onAheadOfDragItemRemoveThreshold();
        return;
      }

      _this.setAnimationSpeedStyle();

      _this.setState({
        isRightSideOpen: !shouldOpen
      });

      if (shouldOpen) {
        _this.setTranslateXStyle(0);

        return;
      }

      _this.setTranslateXStyle(-dragRightOpenThreshold);
    });

    return _this;
  }

  _createClass(_SwipeToDelete, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // Sets default style
      this.setTranslateXStyle(0);
      this.setRightSideContentWidth();
      this.setDraggableWidth();
      this.setDraggableRemoveThreshold();
    }
  }, {
    key: "setRightSideContentWidth",
    value: function setRightSideContentWidth() {
      var dragRightOpenThreshold = this.props.dragRightOpenThreshold;
      _util_CSS__WEBPACK_IMPORTED_MODULE_4__["default"].setVariable(this.draggableRef, 'right-side-content-width', "".concat(dragRightOpenThreshold, "px"));
    }
  }, {
    key: "setTranslateXStyle",
    value: function setTranslateXStyle(translate) {
      _util_CSS__WEBPACK_IMPORTED_MODULE_4__["default"].setVariable(this.draggableRef, 'translateX', "".concat(translate, "px"));
    }
  }, {
    key: "setDraggableWidth",
    value: function setDraggableWidth() {
      var draggableRef = this.draggableRef;

      var _draggableRef$current = draggableRef.current.getBoundingClientRect(),
          width = _draggableRef$current.width;

      this.draggableWidth = width;
    }
  }, {
    key: "setDraggableRemoveThreshold",
    value: function setDraggableRemoveThreshold() {
      var draggableWidth = this.draggableWidth;
      var _this$props2 = this.props,
          dragRightOpenThreshold = _this$props2.dragRightOpenThreshold,
          dragItemRemoveThreshold = _this$props2.dragItemRemoveThreshold;
      this.draggableRemoveThreshold = draggableWidth * dragItemRemoveThreshold - dragRightOpenThreshold;
    }
  }, {
    key: "setAnimationSpeedStyle",
    value: function setAnimationSpeedStyle(specAnimationDuration) {
      var animationDuration = this.props.animationDuration;
      var duration = specAnimationDuration === undefined ? animationDuration : specAnimationDuration;
      _util_CSS__WEBPACK_IMPORTED_MODULE_4__["default"].setVariable(this.draggableRef, 'animation-speed', "".concat(duration, "ms"));
    }
  }, {
    key: "renderRightSideContent",
    value: function renderRightSideContent() {
      var _this$props3 = this.props,
          renderRightSideContent = _this$props3.renderRightSideContent,
          rightSideMix = _this$props3.rightSideMix;
      var isAheadRemoveItemThreshold = this.state.isAheadRemoveItemThreshold;
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "SwipeToDelete",
          elem: "RightSideContentWrapper"
        },
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "SwipeToDelete",
          elem: "RightSideContent",
          mods: {
            isAheadRemoveItemThreshold: isAheadRemoveItemThreshold
          },
          mix: rightSideMix
        }, renderRightSideContent()))
      );
    }
  }, {
    key: "renderChildren",
    value: function renderChildren() {
      var children = this.props.children;
      return (
        /*#__PURE__*/
        _checkBEM(React, React.Fragment, null,
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "SwipeToDelete",
          role: "button",
          tabIndex: "0" // eslint-disable-next-line react/jsx-no-bind
          ,
          onMouseDown: function onMouseDown(e) {
            return e.stopPropagation();
          }
        }, children), this.renderRightSideContent())
      );
    }
  }, {
    key: "render",
    value: function render() {
      var topElemMix = this.props.topElemMix;
      return (
        /*#__PURE__*/
        _checkBEM(React, _Draggable__WEBPACK_IMPORTED_MODULE_2__["default"], {
          onDrag: this.handleDrag,
          draggableRef: this.draggableRef,
          onDragStart: this.handleDragStart,
          onDragEnd: this.handleDragEnd,
          mix: topElemMix
        }, this.renderChildren())
      );
    }
  }]);

  return _SwipeToDelete;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_SwipeToDelete, 'name', {
  value: 'SwipeToDelete'
});

var SwipeToDelete = middleware(_SwipeToDelete, "Component/SwipeToDelete/Component");

_defineProperty(SwipeToDelete, "propTypes", {
  children: _type_Common__WEBPACK_IMPORTED_MODULE_3__["ChildrenType"].isRequired,
  dragRightOpenTriggerThreshold: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  dragRightOpenThreshold: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  dragItemRemoveThreshold: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  animationDuration: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  animationDurationOnRemove: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  renderRightSideContent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  rightSideMix: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object,
  topElemMix: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object,
  onAheadOfDragItemRemoveThreshold: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func
});

_defineProperty(SwipeToDelete, "defaultProps", {
  // Threshold after we open right side
  dragRightOpenTriggerThreshold: _SwipeToDelete_config__WEBPACK_IMPORTED_MODULE_5__["DRAG_RIGHT_OPEN_TRIGGER_THRESHOLD"],
  // Width of opened right side
  dragRightOpenThreshold: _SwipeToDelete_config__WEBPACK_IMPORTED_MODULE_5__["DRAG_RIGHT_OPEN_THRESHOLD"],
  // Threshold after we remove item on touchend as percentage of item width
  dragItemRemoveThreshold: _SwipeToDelete_config__WEBPACK_IMPORTED_MODULE_5__["DRAG_ITEM_REMOVE_THRESHOLD"],
  animationDuration: _SwipeToDelete_config__WEBPACK_IMPORTED_MODULE_5__["ANIMATION_DURATION"],
  animationDurationOnRemove: _SwipeToDelete_config__WEBPACK_IMPORTED_MODULE_5__["ANIMATION_DURATION_ON_REMOVE"],
  renderRightSideContent: function renderRightSideContent() {},
  rightSideMix: {},
  topElemMix: {},
  onAheadOfDragItemRemoveThreshold: function onAheadOfDragItemRemoveThreshold() {}
});

/* harmony default export */ __webpack_exports__["default"] = (SwipeToDelete);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/SwipeToDelete/SwipeToDelete.config.js":
/*!*****************************************************************!*\
  !*** ./src/app/component/SwipeToDelete/SwipeToDelete.config.js ***!
  \*****************************************************************/
/*! exports provided: DRAG_RIGHT_OPEN_THRESHOLD, DRAG_RIGHT_OPEN_TRIGGER_THRESHOLD, DRAG_ITEM_REMOVE_THRESHOLD, ANIMATION_DURATION, ANIMATION_DURATION_ON_REMOVE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DRAG_RIGHT_OPEN_THRESHOLD", function() { return DRAG_RIGHT_OPEN_THRESHOLD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DRAG_RIGHT_OPEN_TRIGGER_THRESHOLD", function() { return DRAG_RIGHT_OPEN_TRIGGER_THRESHOLD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DRAG_ITEM_REMOVE_THRESHOLD", function() { return DRAG_ITEM_REMOVE_THRESHOLD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ANIMATION_DURATION", function() { return ANIMATION_DURATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ANIMATION_DURATION_ON_REMOVE", function() { return ANIMATION_DURATION_ON_REMOVE; });
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
// Width of opened right side
var DRAG_RIGHT_OPEN_THRESHOLD = 80; // Threshold after we open right side

var DRAG_RIGHT_OPEN_TRIGGER_THRESHOLD = DRAG_RIGHT_OPEN_THRESHOLD / 2; // Threshold after we remove item on touchend as percentage of item width

var DRAG_ITEM_REMOVE_THRESHOLD = 0.8;
var ANIMATION_DURATION = 300;
var ANIMATION_DURATION_ON_REMOVE = 180;

/***/ }),

/***/ "./src/app/component/SwipeToDelete/SwipeToDelete.container.js":
/*!********************************************************************!*\
  !*** ./src/app/component/SwipeToDelete/SwipeToDelete.container.js ***!
  \********************************************************************/
/*! exports provided: mapStateToProps, _SwipeToDeleteContainer, SwipeToDeleteContainer, mapDispatchToProps, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(middleware, Extensible, React) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_SwipeToDeleteContainer", function() { return _SwipeToDeleteContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SwipeToDeleteContainer", function() { return SwipeToDeleteContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDispatchToProps", function() { return mapDispatchToProps; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _SwipeToDelete_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SwipeToDelete.component */ "./src/app/component/SwipeToDelete/SwipeToDelete.component.js");
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

/* eslint-disable react/prop-types */

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





/** @namespace Component/Link/Container/mapStateToProps */

var mapStateToProps = middleware(function (state) {
  return {
    isMobile: state.ConfigReducer.device.isMobile
  };
}, "Component/Link/Container/mapStateToProps");
/** @namespace Component/Link/Container */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _SwipeToDeleteContainer =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_SwipeToDeleteContainer, _Extensible);

  function _SwipeToDeleteContainer() {
    _classCallCheck(this, _SwipeToDeleteContainer);

    return _possibleConstructorReturn(this, _getPrototypeOf(_SwipeToDeleteContainer).apply(this, arguments));
  }

  _createClass(_SwipeToDeleteContainer, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isMobile = _this$props.isMobile,
          children = _this$props.children;

      if (!isMobile) {
        return children;
      }

      return (
        /*#__PURE__*/
        _checkBEM(React, _SwipeToDelete_component__WEBPACK_IMPORTED_MODULE_4__["default"], this.props)
      );
    }
  }]);

  return _SwipeToDeleteContainer;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/** @namespace Component/Link/Container/mapDispatchToProps */
// eslint-disable-next-line no-unused-vars

Object.defineProperty(_SwipeToDeleteContainer, 'name', {
  value: 'SwipeToDeleteContainer'
});

var SwipeToDeleteContainer = middleware(_SwipeToDeleteContainer, "Component/Link/Container");

_defineProperty(SwipeToDeleteContainer, "propTypes", {
  isMobile: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool.isRequired,
  children: _type_Common__WEBPACK_IMPORTED_MODULE_3__["ChildrenType"].isRequired
});

var mapDispatchToProps = middleware(function (dispatch) {
  return {};
}, "Component/Link/Container/mapDispatchToProps");
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(SwipeToDeleteContainer));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")))

/***/ }),

/***/ "./src/app/component/SwipeToDelete/SwipeToDelete.style.scss":
/*!******************************************************************!*\
  !*** ./src/app/component/SwipeToDelete/SwipeToDelete.style.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291340211
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/SwipeToDelete/index.js":
/*!**************************************************!*\
  !*** ./src/app/component/SwipeToDelete/index.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SwipeToDelete_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SwipeToDelete.container */ "./src/app/component/SwipeToDelete/SwipeToDelete.container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _SwipeToDelete_container__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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
//# sourceMappingURL=account~cart~checkout~misc.js.map