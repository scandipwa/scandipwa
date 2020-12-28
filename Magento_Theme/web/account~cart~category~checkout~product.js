(this["webpackJsonp"] = this["webpackJsonp"] || []).push([["account~cart~category~checkout~product"],{

/***/ "./src/app/component/ExpandableContent/ExpandableContent.component.js":
/*!****************************************************************************!*\
  !*** ./src/app/component/ExpandableContent/ExpandableContent.component.js ***!
  \****************************************************************************/
/*! exports provided: _ExpandableContent, ExpandableContent, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Extensible, React, middleware) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_ExpandableContent", function() { return _ExpandableContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExpandableContent", function() { return ExpandableContent; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _TextPlaceholder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../TextPlaceholder */ "./src/app/component/TextPlaceholder/index.js");
/* harmony import */ var _type_Common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../type/Common */ "./src/app/type/Common.js");
/* harmony import */ var _util_CSS__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/CSS */ "./src/app/util/CSS/index.js");
/* harmony import */ var _ExpandableContent_style__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ExpandableContent.style */ "./src/app/component/ExpandableContent/ExpandableContent.style.scss");
/* harmony import */ var _ExpandableContent_style__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ExpandableContent_style__WEBPACK_IMPORTED_MODULE_5__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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






/** @namespace Component/ExpandableContent/Component */

var _checkBEM = __webpack_require__(/*! babel-plugin-transform-rebem-jsx */ "./node_modules/babel-plugin-transform-rebem-jsx/build/index.js").checkBEMProps;

var _ExpandableContent =
/*#__PURE__*/
function (_Extensible) {
  _inherits(_ExpandableContent, _Extensible);

  function _ExpandableContent() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _ExpandableContent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_ExpandableContent)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "expandableContentRef",
    /*#__PURE__*/
    Object(react__WEBPACK_IMPORTED_MODULE_1__["createRef"])());

    _defineProperty(_assertThisInitialized(_this), "toggleExpand", function () {
      var onClick = _this.props.onClick;

      if (onClick) {
        onClick();
        return;
      }

      _this.setState(function (_ref) {
        var isContentExpanded = _ref.isContentExpanded;
        return {
          isContentExpanded: !isContentExpanded
        };
      }, function () {
        return _this.scrollToExpandedContent();
      });
    });

    return _this;
  }

  _createClass(_ExpandableContent, [{
    key: "__construct",
    value: function __construct(props) {
      _get(_getPrototypeOf(_ExpandableContent.prototype), "__construct", this).call(this, props);

      var isContentExpanded = this.props.isContentExpanded;
      this.state = {
        isContentExpanded: isContentExpanded,
        // eslint-disable-next-line react/no-unused-state
        prevIsContentExpanded: isContentExpanded
      };
    }
  }, {
    key: "scrollToExpandedContent",
    value: function scrollToExpandedContent() {
      var isContentExpanded = this.state.isContentExpanded;
      var elem = this.expandableContentRef && this.expandableContentRef.current;

      if (isContentExpanded && !elem) {
        return;
      }

      var elemToWindowTopDist = elem.getBoundingClientRect().top;
      var windowToPageTopDist = document.body.getBoundingClientRect().top;
      var topToElemDistance = elemToWindowTopDist - windowToPageTopDist;

      var _getFixedElementHeigh = Object(_util_CSS__WEBPACK_IMPORTED_MODULE_4__["getFixedElementHeight"])(),
          totalFixedElementHeight = _getFixedElementHeigh.total,
          bottomFixedElementHeight = _getFixedElementHeigh.bottom;

      var elemMaxOffsetHeight = screen.height > elem.offsetHeight + bottomFixedElementHeight ? elem.offsetHeight : screen.height - totalFixedElementHeight;
      var scrollTo = topToElemDistance - (screen.height - bottomFixedElementHeight - elemMaxOffsetHeight); // checking if button is in a view-port

      if (-windowToPageTopDist >= scrollTo) {
        return;
      }

      window.scrollTo({
        behavior: 'smooth',
        top: scrollTo
      });
    }
  }, {
    key: "renderButton",
    value: function renderButton() {
      var isContentExpanded = this.state.isContentExpanded;
      var _this$props = this.props,
          heading = _this$props.heading,
          subHeading = _this$props.subHeading,
          mix = _this$props.mix;
      return (
        /*#__PURE__*/
        _checkBEM(React, "button", {
          block: "ExpandableContent",
          elem: "Button",
          mods: {
            isContentExpanded: isContentExpanded
          },
          mix: _objectSpread2(_objectSpread2({}, mix), {}, {
            elem: 'ExpandableContentButton'
          }),
          onClick: this.toggleExpand
        },
        /*#__PURE__*/
        _checkBEM(React, "span", {
          block: "ExpandableContent",
          elem: "Heading",
          mix: _objectSpread2(_objectSpread2({}, mix), {}, {
            elem: 'ExpandableContentHeading'
          })
        }, typeof heading === 'string' ?
        /*#__PURE__*/
        _checkBEM(React, _TextPlaceholder__WEBPACK_IMPORTED_MODULE_2__["default"], {
          content: heading,
          length: "medium"
        }) : heading),
        /*#__PURE__*/
        _checkBEM(React, "span", {
          block: "ExpandableContent",
          elem: "SubHeading",
          mix: _objectSpread2(_objectSpread2({}, mix), {}, {
            elem: 'ExpandableContentSubHeading'
          })
        }, subHeading))
      );
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          mix = _this$props2.mix;
      var isContentExpanded = this.state.isContentExpanded;
      var mods = {
        isContentExpanded: isContentExpanded
      };
      return (
        /*#__PURE__*/
        _checkBEM(React, "div", {
          block: "ExpandableContent",
          elem: "Content",
          mods: mods,
          mix: _objectSpread2(_objectSpread2({}, mix), {}, {
            elem: 'ExpandableContentContent',
            mods: mods
          })
        }, children)
      );
    }
  }, {
    key: "render",
    value: function render() {
      var mix = this.props.mix;
      return (
        /*#__PURE__*/
        _checkBEM(React, "article", {
          block: "ExpandableContent",
          mix: mix,
          ref: this.expandableContentRef
        }, this.renderButton(), this.renderContent())
      );
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(_ref2, _ref3) {
      var isContentExpanded = _ref2.isContentExpanded;
      var prevIsContentExpanded = _ref3.prevIsContentExpanded;

      if (isContentExpanded !== prevIsContentExpanded) {
        return {
          prevIsContentExpanded: isContentExpanded,
          isContentExpanded: isContentExpanded
        };
      }

      return null;
    }
  }]);

  return _ExpandableContent;
}(Extensible(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
Object.defineProperty(_ExpandableContent, 'name', {
  value: 'ExpandableContent'
});

var ExpandableContent = middleware(_ExpandableContent, "Component/ExpandableContent/Component");

_defineProperty(ExpandableContent, "propTypes", {
  isContentExpanded: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  heading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object]),
  subHeading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  children: _type_Common__WEBPACK_IMPORTED_MODULE_3__["ChildrenType"].isRequired,
  mix: _type_Common__WEBPACK_IMPORTED_MODULE_3__["MixType"].isRequired,
  onClick: function onClick(props, propName, componentName) {
    var propValue = props[propName];

    if (propValue === null) {
      return;
    }

    if (typeof propValue === 'function') {
      return;
    }

    throw new Error("".concat(componentName, " only accepts null or string"));
  }
});

_defineProperty(ExpandableContent, "defaultProps", {
  subHeading: '',
  heading: '',
  isContentExpanded: false,
  onClick: null
});

/* harmony default export */ __webpack_exports__["default"] = (ExpandableContent);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./src/config/Extensibility/Middleware/Extensible */ "./src/config/Extensibility/Middleware/Extensible.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! ./src/config/Extensibility/Middleware */ "./src/config/Extensibility/Middleware/index.js")))

/***/ }),

/***/ "./src/app/component/ExpandableContent/ExpandableContent.style.scss":
/*!**************************************************************************!*\
  !*** ./src/app/component/ExpandableContent/ExpandableContent.style.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1608291337307
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/component/ExpandableContent/index.js":
/*!******************************************************!*\
  !*** ./src/app/component/ExpandableContent/index.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ExpandableContent_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ExpandableContent.component */ "./src/app/component/ExpandableContent/ExpandableContent.component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _ExpandableContent_component__WEBPACK_IMPORTED_MODULE_0__["default"]; });

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
//# sourceMappingURL=account~cart~category~checkout~product.js.map