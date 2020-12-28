(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[2],{

/***/ "./node_modules/jsonp/index.js":
/*!*************************************!*\
  !*** ./node_modules/jsonp/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies
 */

var debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")('jsonp');

/**
 * Module exports.
 */

module.exports = jsonp;

/**
 * Callback index.
 */

var count = 0;

/**
 * Noop function.
 */

function noop(){}

/**
 * JSONP handler
 *
 * Options:
 *  - param {String} qs parameter (`callback`)
 *  - prefix {String} qs parameter (`__jp`)
 *  - name {String} qs parameter (`prefix` + incr)
 *  - timeout {Number} how long after a timeout error is emitted (`60000`)
 *
 * @param {String} url
 * @param {Object|Function} optional options / callback
 * @param {Function} optional callback
 */

function jsonp(url, opts, fn){
  if ('function' == typeof opts) {
    fn = opts;
    opts = {};
  }
  if (!opts) opts = {};

  var prefix = opts.prefix || '__jp';

  // use the callback name that was passed if one was provided.
  // otherwise generate a unique name by incrementing our counter.
  var id = opts.name || (prefix + (count++));

  var param = opts.param || 'callback';
  var timeout = null != opts.timeout ? opts.timeout : 60000;
  var enc = encodeURIComponent;
  var target = document.getElementsByTagName('script')[0] || document.head;
  var script;
  var timer;


  if (timeout) {
    timer = setTimeout(function(){
      cleanup();
      if (fn) fn(new Error('Timeout'));
    }, timeout);
  }

  function cleanup(){
    if (script.parentNode) script.parentNode.removeChild(script);
    window[id] = noop;
    if (timer) clearTimeout(timer);
  }

  function cancel(){
    if (window[id]) {
      cleanup();
    }
  }

  window[id] = function(data){
    debug('jsonp got', data);
    cleanup();
    if (fn) fn(null, data);
  };

  // add qs component
  url += (~url.indexOf('?') ? '&' : '?') + param + '=' + enc(id);
  url = url.replace('?&', '?');

  debug('jsonp req "%s"', url);

  // create script
  script = document.createElement('script');
  script.src = url;
  target.parentNode.insertBefore(script, target);

  return cancel;
}


/***/ }),

/***/ "./node_modules/keymirror/index.js":
/*!*****************************************!*\
  !*** ./node_modules/keymirror/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */



/**
 * Constructs an enumeration with keys equal to their value.
 *
 * For example:
 *
 *   var COLORS = keyMirror({blue: null, red: null});
 *   var myColor = COLORS.blue;
 *   var isColorValid = !!COLORS[myColor];
 *
 * The last line could not be performed if the values of the generated enum were
 * not equal to their keys.
 *
 *   Input:  {key1: val1, key2: val2}
 *   Output: {key1: key1, key2: key2}
 *
 * @param {object} obj
 * @return {object}
 */
var keyMirror = function(obj) {
  var ret = {};
  var key;
  if (!(obj instanceof Object && !Array.isArray(obj))) {
    throw new Error('keyMirror(...): Argument must be an object.');
  }
  for (key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    ret[key] = key;
  }
  return ret;
};

module.exports = keyMirror;


/***/ }),

/***/ "./node_modules/react-vimeo/lib/Play-Button.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-vimeo/lib/Play-Button.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable max-len */


var _class = function (_React$Component) {
  _inherits(_class, _React$Component);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'button',
        {
          className: 'vimeo-play-button',
          onClick: this.props.onClick,
          type: 'button' },
        _react2.default.createElement(
          'svg',
          {
            version: '1.1',
            viewBox: '0 0 100 100',
            xmlns: 'http://www.w3.org/2000/svg' },
          _react2.default.createElement('path', { d: 'M79.674,53.719c2.59-2.046,2.59-5.392,0-7.437L22.566,1.053C19.977-0.993,18,0.035,18,3.335v93.331c0,3.3,1.977,4.326,4.566,2.281L79.674,53.719z' })
        )
      );
    }
  }]);

  return _class;
}(_react2.default.Component);

_class.displayName = 'PlayButton';
_class.propTypes = {
  onClick: _propTypes2.default.func
};
exports.default = _class;
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/react-vimeo/lib/Spinner.js":
/*!*************************************************!*\
  !*** ./node_modules/react-vimeo/lib/Spinner.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable max-len */


/*
 * React component for Vimeo Loading Spinner created and rendered.
 * SVG Path is used for creating the spinner.
 */
var _class = function (_React$Component) {
  _inherits(_class, _React$Component);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'vimeo-loading' },
        _react2.default.createElement(
          'svg',
          {
            height: '32',
            viewBox: '0 0 32 32',
            width: '32',
            xmlns: 'http://www.w3.org/2000/svg' },
          _react2.default.createElement('path', {
            d: 'M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4',
            opacity: '.25' }),
          _react2.default.createElement('path', { d: 'M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z' })
        )
      );
    }
  }]);

  return _class;
}(_react2.default.Component);

_class.displayName = 'Spinner';
exports.default = _class;
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/react-vimeo/lib/Vimeo.js":
/*!***********************************************!*\
  !*** ./node_modules/react-vimeo/lib/Vimeo.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _keymirror = __webpack_require__(/*! keymirror */ "./node_modules/keymirror/index.js");

var _keymirror2 = _interopRequireDefault(_keymirror);

var _jsonp = __webpack_require__(/*! jsonp */ "./node_modules/jsonp/index.js");

var _jsonp2 = _interopRequireDefault(_jsonp);

var _debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");

var _debug2 = _interopRequireDefault(_debug);

var _PlayButton = __webpack_require__(/*! ./Play-Button */ "./node_modules/react-vimeo/lib/Play-Button.js");

var _PlayButton2 = _interopRequireDefault(_PlayButton);

var _Spinner = __webpack_require__(/*! ./Spinner */ "./node_modules/react-vimeo/lib/Spinner.js");

var _Spinner2 = _interopRequireDefault(_Spinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var debug = (0, _debug2.default)('vimeo:player');
var noop = function noop() {};
var playerEvents = (0, _keymirror2.default)({
  cueChange: null,
  ended: null,
  loaded: null,
  pause: null,
  play: null,
  progress: null,
  seeked: null,
  textTrackChange: null,
  timeUpdate: null,
  volumeChange: null
});

function capitalize() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return str.charAt(0).toUpperCase() + str.substring(1);
}

function getFuncForEvent(event, props) {
  return props['on' + capitalize(event)] || function () {};
}

function post(method, value, player, playerOrigin) {
  try {
    player.contentWindow.postMessage({ method: method, value: value }, playerOrigin);
  } catch (err) {
    return err;
  }
  return null;
}

var _class = function (_React$Component) {
  _inherits(_class, _React$Component);

  function _class() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _class);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      imageLoaded: false,
      playerOrigin: '*',
      showingVideo: _this.props.autoplay,
      thumb: null
    }, _this.addMessageListener = function () {
      var _context;

      var addEventListener = typeof window !== 'undefined' ? (_context = window).addEventListener.bind(_context) : noop;

      addEventListener('message', _this.onMessage);
    }, _this.onError = function (err) {
      if (_this.props.onError) {
        _this.props.onError(err);
      }
      throw err;
    }, _this.onMessage = function (_ref2) {
      var origin = _ref2.origin,
          data = _ref2.data;
      var onReady = _this.props.onReady;
      var playerOrigin = _this.state.playerOrigin;


      if (playerOrigin === '*') {
        _this.setState({
          playerOrigin: origin
        });
      }

      // Handle messages from the vimeo player only
      if (!/^https?:\/\/player.vimeo.com/.test(origin)) {
        return false;
      }

      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch (err) {
          debug('error parsing message', err);
          data = { event: '' };
        }
      }

      if (data.event === 'ready') {
        debug('player ready');
        _this.onReady(_this._player, playerOrigin === '*' ? origin : playerOrigin);
        return onReady(data);
      }
      if (!data.event) {
        // we get messages when the first event callbacks are added to the frame
        return;
      }
      debug('firing event: ', data.event);
      getFuncForEvent(data.event, _this.props)(data);
    }, _this.onReady = function (player, playerOrigin) {
      Object.keys(playerEvents).forEach(function (event) {
        var err = post('addEventListener', event.toLowerCase(), player, playerOrigin);
        if (err) {
          _this.onError(err);
        }
      });
    }, _this.playVideo = function (e) {
      e.preventDefault();
      _this.setState({ showingVideo: true });
    }, _this.getIframeUrl = function () {
      var videoId = _this.props.videoId;

      var query = _this.getIframeUrlQuery();
      return '//player.vimeo.com/video/' + videoId + '?' + query;
    }, _this.getIframeUrlQuery = function () {
      var str = [];
      Object.keys(_this.props.playerOptions).forEach(function (key) {
        str.push(key + '=' + _this.props.playerOptions[key]);
      });

      return str.join('&');
    }, _this.fetchVimeoData = function () {
      if (_this.state.imageLoaded) {
        return;
      }
      var id = _this.props.videoId;

      (0, _jsonp2.default)('//vimeo.com/api/v2/video/' + id + '.json', {
        prefix: 'vimeo'
      }, function (err, res) {
        if (err) {
          debug('jsonp err: ', err.message);
          _this.onError(err);
        }
        debug('jsonp response', res);
        _this.setState({
          thumb: res[0].thumbnail_large,
          imageLoaded: true
        });
      });
    }, _this.renderImage = function () {
      if (_this.state.showingVideo || !_this.state.imageLoaded) {
        return;
      }

      var style = {
        backgroundImage: 'url(' + _this.state.thumb + ')',
        display: !_this.state.showingVideo ? 'block' : 'none',
        height: '100%',
        width: '100%'
      };

      var playButton = _this.props.playButton ? (0, _react.cloneElement)(_this.props.playButton, { onClick: _this.playVideo }) : _react2.default.createElement(_PlayButton2.default, { onClick: _this.playVideo });

      return _react2.default.createElement(
        'div',
        {
          className: 'vimeo-image',
          style: style },
        playButton
      );
    }, _this.renderIframe = function () {
      if (!_this.state.showingVideo) {
        return;
      }

      _this.addMessageListener();

      var embedVideoStyle = {
        display: _this.state.showingVideo ? 'block' : 'none',
        height: '100%',
        width: '100%'
      };

      return _react2.default.createElement(
        'div',
        {
          className: 'vimeo-embed',
          style: embedVideoStyle },
        _react2.default.createElement('iframe', {
          frameBorder: '0',
          ref: function ref(el) {
            _this._player = el;
          },
          src: _this.getIframeUrl() })
      );
    }, _this.renderLoading = function (imageLoaded, loadingElement) {
      if (imageLoaded) {
        return;
      }
      if (loadingElement) {
        return loadingElement;
      }
      return _react2.default.createElement(_Spinner2.default, null);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_class, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.videoId !== this.props.videoId) {
        this.setState({
          thumb: null,
          imageLoaded: false,
          showingVideo: false
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.fetchVimeoData();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.fetchVimeoData();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _context2;

      var removeEventListener = typeof window !== 'undefined' ? (_context2 = window).removeEventListener.bind(_context2) : noop;

      removeEventListener('message', this.onMessage);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: this.props.className },
        this.renderLoading(this.state.imageLoaded, this.props.loading),
        this.renderImage(),
        this.renderIframe()
      );
    }
  }]);

  return _class;
}(_react2.default.Component);

_class.displayName = 'Vimeo';
_class.propTypes = {
  autoplay: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  loading: _propTypes2.default.element,
  playButton: _propTypes2.default.node,
  playerOptions: _propTypes2.default.object,
  videoId: _propTypes2.default.string.isRequired,

  // event callbacks
  onCueChange: _propTypes2.default.func,
  onEnded: _propTypes2.default.func,
  onError: _propTypes2.default.func,
  onLoaded: _propTypes2.default.func,
  onPause: _propTypes2.default.func,
  onPlay: _propTypes2.default.func,
  onProgress: _propTypes2.default.func,
  onReady: _propTypes2.default.func,
  onSeeked: _propTypes2.default.func,
  onTextTrackChanged: _propTypes2.default.func,
  onTimeUpdate: _propTypes2.default.func,
  onVolumeChange: _propTypes2.default.func
};

_class.defaultProps = function () {
  var defaults = Object.keys(playerEvents).concat(['ready']).reduce(function (defaults, event) {
    defaults['on' + capitalize(event)] = noop;
    return defaults;
  }, {});

  defaults.className = 'vimeo';
  defaults.playerOptions = { autoplay: 1 };
  defaults.autoplay = false;
  return defaults;
}();

exports.default = _class;
module.exports = exports['default'];

/***/ })

}]);
//# sourceMappingURL=2.js.map