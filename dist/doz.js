// [DOZ]  Build version: 1.12.1  
 (function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Doz", [], factory);
	else if(typeof exports === 'object')
		exports["Doz"] = factory();
	else
		root["Doz"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    INSTANCE: '__DOZ_INSTANCE__',
    DIR_IS: '__DOZ_D_IS__',
    CMP_INSTANCE: '__DOZ_CMP_INSTANCE__',
    NS: {
        SVG: 'http://www.w3.org/2000/svg'
    },
    TAG: {
        ROOT: 'dz-root',
        EACH: 'dz-each-root',
        APP: 'dz-app',
        EMPTY: 'dz-empty',
        MOUNT: 'dz-mount',
        SUFFIX_ROOT: '-root',
        TEXT_NODE_PLACE: 'dz-text-node'
    },
    REGEX: {
        IS_CUSTOM_TAG: /^\w+-[\w-]+$/,
        IS_CUSTOM_TAG_STRING: /<\w+-[\w-]+/,
        IS_BIND: /^d-bind$/,
        IS_REF: /^d-ref$/,
        IS_ALIAS: /^d:alias$/,
        IS_STORE: /^d:store$/,
        IS_COMPONENT_LISTENER: /^d:on-(\w+)$/,
        IS_LISTENER: /^on/,
        IS_ID_SELECTOR: /^#[\w-_:.]+$/,
        IS_PARENT_METHOD: /^parent.(.*)/,
        IS_STRING_QUOTED: /^"\w+"/,
        IS_SVG: /^svg$/,
        IS_SFC: /^(class\s|function\s+_class)/,
        GET_LISTENER: /^this.(.*)\((.*)\)/,
        TRIM_QUOTES: /^["'](.*)["']$/,
        THIS_TARGET: /\B\$this(?!\w)/g,
        HTML_MARKUP: /<!--[^]*?(?=-->)-->|<(\/?)([a-z][-.0-9_a-z]*)\s*([^>]*?)(\/?)>/ig,
        HTML_ATTRIBUTE: /(^|\s)([\w-:]+)(\s*=\s*("([^"]+)"|'([^']+)'|(\S+)))?/ig,
        REMOVE_NLS: /\n\s+/gm,
        REPLACE_QUOT: /"/g
    },
    ATTR: {
        // Attributes for HTMLElement
        BIND: 'd-bind',
        REF: 'd-ref',
        IS: 'd-is',
        // Attributes for Components
        ALIAS: 'd:alias',
        STORE: 'd:store',
        LISTENER: 'd:on',
        ID: 'd:id',
        FORCE_UPDATE: 'forceupdate'
    }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var data = __webpack_require__(23);

/**
 * Register a component to global
 * @param cmp
 */
function registerComponent(cmp) {

    var tag = cmp.tag.toUpperCase();

    if (Object.prototype.hasOwnProperty.call(data.components, tag)) console.warn('Doz', 'component ' + tag + ' overwritten');

    data.components[tag] = cmp;
}

/**
 * Remove all global components
 */
function removeAll() {
    data.components = {};
    data.plugins = [];
}

/**
 * Get component from global
 * @param tag
 * @returns {*}
 */
function getComponent(tag) {
    tag = tag.toUpperCase();
    return data.components[tag];
}

/**
 * Register a plugin to global
 * @param plugin
 */
function registerPlugin(plugin) {
    data.plugins.push(plugin);
}

module.exports = {
    registerComponent: registerComponent,
    registerPlugin: registerPlugin,
    getComponent: getComponent,
    removeAll: removeAll,
    data: data
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var delay = __webpack_require__(8);

function callBeforeCreate(context) {
    if (typeof context.onBeforeCreate === 'function') {
        return context.onBeforeCreate.call(context);
    }
}

function callCreate(context) {
    if (typeof context.onCreate === 'function') {
        context.onCreate.call(context);
    }
}

function callConfigCreate(context) {
    if (typeof context.onConfigCreate === 'function') {
        context.onConfigCreate.call(context);
    }
}

function callBeforeMount(context) {
    if (typeof context.onBeforeMount === 'function') {
        return context.onBeforeMount.call(context);
    }
}

function callMount(context) {
    if (typeof context.onMount === 'function') {
        context.onMount.call(context);
    }
}

function callMountAsync(context) {
    if (typeof context.onMountAsync === 'function') {
        delay(function () {
            context.onMountAsync.call(context);
        });
    }
}

function callBeforeUpdate(context, changes) {
    if (typeof context.onBeforeUpdate === 'function') {
        return context.onBeforeUpdate.call(context, changes);
    }
}

function callUpdate(context, changes) {
    if (typeof context.onUpdate === 'function') {
        context.onUpdate.call(context, changes);
    }
}

function callAfterRender(context, changes) {
    if (typeof context.onAfterRender === 'function') {
        return context.onAfterRender.call(context, changes);
    }
}

function callBeforeUnmount(context) {
    if (typeof context.onBeforeUnmount === 'function') {
        return context.onBeforeUnmount.call(context);
    }
}

function callUnmount(context) {
    if (typeof context.onUnmount === 'function') {
        context.onUnmount.call(context);
    }
}

function callBeforeDestroy(context) {
    if (typeof context.onBeforeDestroy === 'function') {
        return context.onBeforeDestroy.call(context);
    }
}

function callDestroy(context) {
    if (typeof context.onDestroy === 'function') {
        context.onDestroy.call(context);
        context = null;
    }
}

module.exports = {
    callBeforeCreate: callBeforeCreate,
    callCreate: callCreate,
    callConfigCreate: callConfigCreate,
    callBeforeMount: callBeforeMount,
    callMount: callMount,
    callMountAsync: callMountAsync,
    callBeforeUpdate: callBeforeUpdate,
    callUpdate: callUpdate,
    callAfterRender: callAfterRender,
    callBeforeUnmount: callBeforeUnmount,
    callUnmount: callUnmount,
    callBeforeDestroy: callBeforeDestroy,
    callDestroy: callDestroy
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var castStringTo = __webpack_require__(9);
var dashToCamel = __webpack_require__(10);

var _require = __webpack_require__(0),
    REGEX = _require.REGEX,
    ATTR = _require.ATTR,
    TAG = _require.TAG,
    DIR_IS = _require.DIR_IS;

var regExcludeSpecial = new RegExp('</?' + TAG.TEXT_NODE_PLACE + '?>$');

var selfClosingElements = {
    meta: true,
    img: true,
    link: true,
    input: true,
    area: true,
    br: true,
    hr: true
};

var elementsClosedByOpening = {
    li: { li: true },
    p: { p: true, div: true },
    td: { td: true, th: true },
    th: { td: true, th: true }
};

var elementsClosedByClosing = {
    li: { ul: true, ol: true },
    a: { div: true },
    b: { div: true },
    i: { div: true },
    p: { div: true },
    td: { tr: true, table: true },
    th: { tr: true, table: true }
};

function last(arr) {
    return arr[arr.length - 1];
}

function removeNLS(str) {
    return str.replace(REGEX.REMOVE_NLS, ' ');
}

var Element = function () {
    function Element(name, props, isSVG) {
        _classCallCheck(this, Element);

        this.type = name;
        this.props = Object.assign({}, props);
        this.children = [];
        this.isSVG = isSVG || REGEX.IS_SVG.test(name);
    }

    _createClass(Element, [{
        key: 'appendChild',
        value: function appendChild(node) {
            this.children.push(node);
            return node;
        }
    }]);

    return Element;
}();

function compile(data) {

    if (!data) return '';

    var root = new Element(null, {});
    var stack = [root];
    var currentParent = root;
    var lastTextPos = -1;
    var match = void 0;
    var props = void 0;

    while (match = REGEX.HTML_MARKUP.exec(data)) {

        if (lastTextPos > -1) {
            if (lastTextPos > -1 && lastTextPos + match[0].length < REGEX.HTML_MARKUP.lastIndex) {
                // remove new line space
                var text = removeNLS(data.substring(lastTextPos, REGEX.HTML_MARKUP.lastIndex - match[0].length));
                // if has content
                if (text) currentParent.appendChild(text);
            }
        }

        lastTextPos = REGEX.HTML_MARKUP.lastIndex;
        if (match[0][1] === '!') {
            // this is a comment or style
            continue;
        }

        // exclude special text node
        if (regExcludeSpecial.test(match[0])) {
            continue;
        }

        if (!match[1]) {
            // not </ tags
            props = {};
            for (var attMatch; attMatch = REGEX.HTML_ATTRIBUTE.exec(match[3]);) {
                props[attMatch[2]] = attMatch[5] || attMatch[6] || '';
                propsFixer(match[0].substring(1, match[0].length - 1), attMatch[2], props[attMatch[2]], props);
            }

            if (!match[4] && elementsClosedByOpening[currentParent.type]) {
                if (elementsClosedByOpening[currentParent.type][match[2]]) {
                    stack.pop();
                    currentParent = last(stack);
                }
            }

            currentParent = currentParent.appendChild(new Element(match[2], props, currentParent.isSVG));
            stack.push(currentParent);
        }

        if (match[1] || match[4] || selfClosingElements[match[2]]) {
            // </ or /> or <br> etc.
            while (true) {
                if (currentParent.type === match[2]) {
                    stack.pop();
                    currentParent = last(stack);
                    break;
                } else {
                    // Trying to close current tag, and move on
                    if (elementsClosedByClosing[currentParent.type]) {
                        if (elementsClosedByClosing[currentParent.type][match[2]]) {
                            stack.pop();
                            currentParent = last(stack);
                            continue;
                        }
                    }
                    // Use aggressive strategy to handle unmatching markups.
                    break;
                }
            }
        }
    }

    if (root.children.length > 1) {
        root.type = TAG.ROOT;
    } else if (root.children.length) {
        return root.children[0];
    }

    return root;
}

function serializeProps(node) {
    var props = {};

    if (node.attributes) {
        var attributes = Array.from(node.attributes);
        for (var j = attributes.length - 1; j >= 0; --j) {
            var attr = attributes[j];

            propsFixer(node.nodeName, attr.name, attr.nodeValue, props, node[DIR_IS]);
        }
    }
    return props;
}

function propsFixer(nName, aName, aValue, props, dIS) {
    var isComponentListener = aName.match(REGEX.IS_COMPONENT_LISTENER);
    if (isComponentListener) {
        if (props[ATTR.LISTENER] === undefined) props[ATTR.LISTENER] = {};
        props[ATTR.LISTENER][isComponentListener[1]] = aValue;
        delete props[aName];
    } else {
        if (REGEX.IS_STRING_QUOTED.test(aValue)) aValue = aValue.replace(REGEX.REPLACE_QUOT, '&quot;');
        props[REGEX.IS_CUSTOM_TAG.test(nName) || dIS ? dashToCamel(aName) : aName] = aName === ATTR.FORCE_UPDATE ? true : castStringTo(aValue);
    }
}

module.exports = {
    compile: compile,
    serializeProps: serializeProps,
    propsFixer: propsFixer
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = __webpack_require__(0),
    TAG = _require.TAG,
    CMP_INSTANCE = _require.CMP_INSTANCE,
    INSTANCE = _require.INSTANCE,
    REGEX = _require.REGEX;

var observer = __webpack_require__(26);
var hooks = __webpack_require__(2);
var update = __webpack_require__(30).updateElement;
var store = __webpack_require__(34);
var ids = __webpack_require__(35);
//const proxy = require('../utils/proxy');
var toInlineStyle = __webpack_require__(36);
var queueReady = __webpack_require__(37);
var queueDraw = __webpack_require__(38);
var extendInstance = __webpack_require__(39);
var cloneObject = __webpack_require__(40);
var toLiteralString = __webpack_require__(13);
var removeAllAttributes = __webpack_require__(41);
var h = __webpack_require__(14);
var loadLocal = __webpack_require__(42);
var localMixin = __webpack_require__(43);

var _require2 = __webpack_require__(3),
    compile = _require2.compile;

var Component = function () {
    function Component(opt) {
        _classCallCheck(this, Component);

        Object.defineProperties(this, {
            _isSubclass: {
                value: this.__proto__.constructor !== Component
            },
            _rawProps: {
                value: {},
                writable: true
            }
        });

        opt.cmp = opt.cmp || {
            tag: opt.tag,
            cfg: {}
        };

        this._initRawProps(opt);

        defineProperties(this, opt);

        // Assign cfg to instance
        extendInstance(this, opt.cmp.cfg, opt.dProps);

        // Create mixin
        localMixin(this);

        // Load local components
        loadLocal(this);

        var beforeCreate = hooks.callBeforeCreate(this);
        if (beforeCreate === false) return;

        // Create observer to props
        observer.create(this);
        // Create shared store
        store.create(this);
        // Create ID
        ids.create(this);
        // Add callback to ready queue
        queueReady.add(this);
        // Add callback app draw
        queueDraw.add(this);
        // Call create
        hooks.callCreate(this);
    }

    _createClass(Component, [{
        key: 'getHTMLElement',
        value: function getHTMLElement() {
            return this._parentElement;
        }
    }, {
        key: 'beginSafeRender',
        value: function beginSafeRender() {
            //proxy.beginRender(this.props)
        }
    }, {
        key: 'endSafeRender',
        value: function endSafeRender() {
            //proxy.endRender(this.props)
        }
    }, {
        key: 'emit',
        value: function emit(name) {
            if (this._callback && this._callback[name] !== undefined && this.parent[this._callback[name]] !== undefined && typeof this.parent[this._callback[name]] === 'function') {
                for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                }

                this.parent[this._callback[name]].apply(this.parent, args);
            }
        }
    }, {
        key: 'each',
        value: function each(obj, func) {
            var safe = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var res = void 0;
            if (Array.isArray(obj)) {
                //if (safe) this.beginSafeRender();
                res = obj.map(func).map(function (stringEl) {
                    if (typeof stringEl === 'string') {
                        return stringEl.trim();
                    }
                }).join('');
                //if (safe) this.endSafeRender();
            }
            return res;
        }
    }, {
        key: 'toStyle',
        value: function toStyle(obj) {
            return toInlineStyle(obj);
        }
    }, {
        key: 'getStore',
        value: function getStore(storeName) {
            return this.app.getStore(storeName);
        }
    }, {
        key: 'getComponentById',
        value: function getComponentById(id) {
            return this.app.getComponentById(id);
        }
    }, {
        key: 'getCmp',
        value: function getCmp(id) {
            return this.app.getComponentById(id);
        }
    }, {
        key: 'template',
        value: function template() {
            return '';
        }
    }, {
        key: 'render',
        value: function render(initial) {
            //this.beginSafeRender();
            var template = this.template(h);
            //this.endSafeRender();
            var next = compile(template);
            this.app.emit('draw', next, this._prev, this);
            queueDraw.emit(this, next, this._prev);

            drawDynamic(this);

            var rootElement = update(this._cfgRoot, next, this._prev, 0, this, initial);

            //Remove attributes from component tag
            removeAllAttributes(this._cfgRoot, ['data-is']);

            if (!this._rootElement && rootElement) {
                this._rootElement = rootElement;
                this._parentElement = rootElement.parentNode;
            }

            this._prev = next;

            hooks.callAfterRender(this);
        }
    }, {
        key: 'mount',
        value: function mount(template) {
            var _this = this;

            var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


            if (this._unmounted) {
                if (hooks.callBeforeMount(this) === false) return this;

                this._unmountedParentNode.appendChild(this._rootElement.parentNode);
                this._unmounted = false;
                this._unmountedParentNode = null;

                hooks.callMount(this);

                var _defined = function _defined(child) {
                    _this.children[child].mount();
                };

                var _defined2 = Object.keys(this.children);

                for (var _i2 = 0; _i2 <= _defined2.length - 1; _i2++) {
                    _defined(_defined2[_i2], _i2, _defined2);
                }

                return this;
            } else if (template) {
                if (this._rootElement.nodeType !== 1) {
                    var newElement = document.createElement(this.tag + TAG.SUFFIX_ROOT);
                    this._rootElement.parentNode.replaceChild(newElement, this._rootElement);
                    this._rootElement = newElement;
                    this._rootElement[CMP_INSTANCE] = this;
                }

                var root = this._rootElement;

                if (typeof cfg.selector === 'string') root = root.querySelector(cfg.selector);else if (cfg.selector instanceof HTMLElement) root = cfg.selector;

                this._unmounted = false;
                this._unmountedParentNode = null;
                return this.app.mount(template, root, this);
            }
        }
    }, {
        key: 'unmount',
        value: function unmount() {
            var onlyInstance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var _this2 = this;

            var byDestroy = arguments[1];
            var silently = arguments[2];

            if (!onlyInstance && (Boolean(this._unmountedParentNode) || !this._rootElement || !this._rootElement.parentNode || !this._rootElement.parentNode.parentNode)) {
                return;
            }

            if (hooks.callBeforeUnmount(this) === false) return false;

            this._unmountedParentNode = this._rootElement.parentNode.parentNode;

            if (!onlyInstance) {
                this._rootElement.parentNode.parentNode.removeChild(this._rootElement.parentNode);
            } else this._rootElement.parentNode.innerHTML = '';

            this._unmounted = !byDestroy;

            if (!silently) hooks.callUnmount(this);

            var _defined3 = function _defined3(child) {
                _this2.children[child].unmount(onlyInstance, byDestroy, silently);
            };

            var _defined4 = Object.keys(this.children);

            for (var _i4 = 0; _i4 <= _defined4.length - 1; _i4++) {
                _defined3(_defined4[_i4], _i4, _defined4);
            }

            return this;
        }
    }, {
        key: 'destroy',
        value: function destroy(onlyInstance) {
            var _this3 = this;

            if (this.unmount(onlyInstance, true) === false) return;

            if (!onlyInstance && (!this._rootElement || hooks.callBeforeDestroy(this) === false || !this._rootElement.parentNode)) {
                return;
            }

            var _defined5 = function _defined5(child) {
                _this3.children[child].destroy();
            };

            var _defined6 = Object.keys(this.children);

            for (var _i6 = 0; _i6 <= _defined6.length - 1; _i6++) {
                _defined5(_defined6[_i6], _i6, _defined6);
            }

            hooks.callDestroy(this);
        }
    }, {
        key: '_initTemplate',
        value: function _initTemplate(opt) {
            if (typeof opt.cmp.cfg.template === 'string') {
                var contentTpl = opt.cmp.cfg.template;
                if (REGEX.IS_ID_SELECTOR.test(contentTpl)) {
                    opt.cmp.cfg.template = function () {
                        var contentStr = toLiteralString(document.querySelector(contentTpl).innerHTML);
                        return eval('`' + contentStr + '`');
                    };
                } else {
                    opt.cmp.cfg.template = function () {
                        contentTpl = toLiteralString(contentTpl);
                        return eval('`' + contentTpl + '`');
                    };
                }
            }
        }
    }, {
        key: '_initRawProps',
        value: function _initRawProps(opt) {
            if (!this._isSubclass) {
                this._rawProps = Object.assign({}, typeof opt.cmp.cfg.props === 'function' ? opt.cmp.cfg.props() : opt.cmp.cfg.props, opt.props);

                this._initTemplate(opt);
            } else {
                this._rawProps = Object.assign({}, opt.props);
            }
        }
    }, {
        key: 'props',
        set: function set(props) {
            if (typeof props === 'function') props = props();
            this._rawProps = Object.assign({}, props, this._opt.props);
            observer.create(this);
            store.sync(this);
        },
        get: function get() {
            return this._props;
        }
    }, {
        key: 'config',
        set: function set(obj) {
            if (!this._isSubclass) throw new Error('Config is allowed only for classes');

            if (this._configured) throw new Error('Already configured');

            if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') throw new TypeError('Config must be an object');

            if (_typeof(obj.mixin) === 'object') {
                this.mixin = obj.mixin;
                localMixin(this);
            }

            if (_typeof(obj.propsListener) === 'object') {
                this.propsListener = obj.propsListener;
            }

            if (_typeof(obj.components) === 'object') {
                this.components = obj.components;
                loadLocal(this);
            }

            if (typeof obj.store === 'string') {
                this.store = obj.store;
                store.create(this);
            }

            if (typeof obj.id === 'string') {
                this.id = obj.id;
                ids.create(this);
            }

            if (typeof obj.autoCreateChildren === 'boolean') {
                this.autoCreateChildren = obj.autoCreateChildren;
            }

            if (typeof obj.updateChildrenProps === 'boolean') {
                this.updateChildrenProps = obj.updateChildrenProps;
            }

            this._configured = true;

            hooks.callConfigCreate(this);
        }
    }]);

    return Component;
}();

function defineProperties(obj, opt) {

    Object.defineProperties(obj, {
        //Private
        _opt: {
            value: opt
        },
        _cfgRoot: {
            value: opt.root
        },
        _publicProps: {
            value: Object.assign({}, opt.props)
        },
        _initialProps: {
            value: cloneObject(obj._rawProps)
        },
        _callback: {
            value: opt.dProps['callback']
        },
        _isRendered: {
            value: false,
            writable: true
        },
        _prev: {
            value: null,
            writable: true
        },
        _rootElement: {
            value: null,
            writable: true
        },
        _parentElement: {
            value: null,
            writable: true
        },
        _boundElements: {
            value: {},
            writable: true
        },
        _components: {
            value: {},
            writable: true
        },
        _processing: {
            value: [],
            writable: true
        },
        _dynamicChildren: {
            value: [],
            writable: true
        },
        _unmounted: {
            value: false,
            writable: true
        },
        _unmountedParentNode: {
            value: null,
            writable: true
        },
        _configured: {
            value: false,
            writable: true
        },
        _props: {
            value: {},
            writable: true
        },
        _computedCache: {
            value: new Map()
        },

        //Public
        tag: {
            value: opt.cmp.tag,
            enumerable: true
        },
        app: {
            value: opt.app,
            enumerable: true
        },
        parent: {
            value: opt.parentCmp,
            enumerable: true,
            configurable: true
        },
        appRoot: {
            value: opt.app._root,
            enumerable: true
        },
        action: {
            value: opt.app.action,
            enumerable: true
        },
        shared: {
            value: opt.app.shared,
            writable: true,
            enumerable: true
        },
        ref: {
            value: {},
            enumerable: true
        },
        children: {
            value: {},
            enumerable: true
        },
        rawChildren: {
            value: [],
            enumerable: true
        },
        autoCreateChildren: {
            value: true,
            enumerable: true,
            writable: true
        },
        updateChildrenProps: {
            value: true,
            enumerable: true,
            writable: true
        },
        mixin: {
            value: [],
            enumerable: true,
            writable: true
        }
    });
}

function drawDynamic(instance) {
    clearDynamic(instance);

    var index = instance._processing.length - 1;

    while (index >= 0) {
        var item = instance._processing[index];
        var root = item.node.parentNode;

        if (item.node[INSTANCE]) {
            item.node[INSTANCE].destroy(true);
        }

        if (item.node.innerHTML === '') {
            var dynamicInstance = __webpack_require__(5).get({
                root: root,
                template: item.node.outerHTML,
                app: instance.app,
                parent: instance
            });

            if (dynamicInstance) {
                instance._dynamicChildren.push(dynamicInstance._rootElement.parentNode);
                root.replaceChild(dynamicInstance._rootElement.parentNode, item.node);
                dynamicInstance._rootElement.parentNode[INSTANCE] = dynamicInstance;
                instance._processing.splice(index, 1);
            }
        }
        index -= 1;
    }
}

function clearDynamic(instance) {
    var index = instance._dynamicChildren.length - 1;

    while (index >= 0) {
        var item = instance._dynamicChildren[index];

        if (!document.body.contains(item) && item[INSTANCE]) {
            item[INSTANCE].destroy(true);
            instance._dynamicChildren.splice(index, 1);
        }
        index -= 1;
    }
}

module.exports = {
    Component: Component,
    defineProperties: defineProperties,
    clearDynamic: clearDynamic,
    drawDynamic: drawDynamic
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var html = __webpack_require__(6);

var _require = __webpack_require__(21),
    scopedInner = _require.scopedInner;

var _require2 = __webpack_require__(0),
    CMP_INSTANCE = _require2.CMP_INSTANCE,
    ATTR = _require2.ATTR,
    DIR_IS = _require2.DIR_IS,
    REGEX = _require2.REGEX;

var collection = __webpack_require__(1);
var hooks = __webpack_require__(2);

var _require3 = __webpack_require__(3),
    serializeProps = _require3.serializeProps;

var _require4 = __webpack_require__(24),
    extract = _require4.extract;

var hmr = __webpack_require__(25);

var _require5 = __webpack_require__(4),
    Component = _require5.Component;

function get() {
    var cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    if (!cfg.root) return;

    cfg.template = typeof cfg.template === 'string' ? html.create(cfg.template) : cfg.template;

    cfg.root.appendChild(cfg.template);

    var component = null;
    var parentElement = void 0;
    var cmpName = void 0;
    var trash = [];

    function walk(child) {
        var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        while (child) {

            if (child.nodeName === 'STYLE') {
                var dataSetId = parent.cmp._rootElement.parentNode.dataset.is;
                var tagByData = void 0;
                if (dataSetId) tagByData = '[data-is="' + dataSetId + '"]';
                scopedInner(child.textContent, parent.cmp.tag, tagByData);
                var emptyStyle = document.createElement('script');
                emptyStyle.type = 'text/style';
                emptyStyle.textContent = ' ';
                emptyStyle.dataset.id = parent.cmp.tag + '--style';
                emptyStyle.dataset.owner = parent.cmp.tag;
                if (tagByData) emptyStyle.dataset.ownerByData = tagByData;
                child.parentNode.replaceChild(emptyStyle, child);
                child = emptyStyle.nextSibling;
                continue;
            }

            if (typeof child.getAttribute === 'function' && child.hasAttribute(ATTR.IS)) {
                cmpName = child.getAttribute(ATTR.IS).toLowerCase();
                child.removeAttribute(ATTR.IS);
                child.dataset.is = cmpName;
                child[DIR_IS] = true;
            } else cmpName = child.nodeName.toLowerCase();

            var localComponents = {};

            if (parent.cmp && parent.cmp._components) {
                localComponents = parent.cmp._components;
            }

            var cmp = cfg.autoCmp || localComponents[cmpName] || cfg.app._components[cmpName] || collection.getComponent(cmpName);

            if (cmp) {

                if (parent.cmp) {
                    var rawChild = child.outerHTML;
                    parent.cmp.rawChildren.push(rawChild);
                }

                // For node created by mount method
                if (parent.cmp && parent.cmp.mounted) {
                    child = child.nextSibling;
                    continue;
                }

                if (parent.cmp && parent.cmp.autoCreateChildren === false) {
                    trash.push(child);
                    child = child.nextSibling;
                    continue;
                }

                var props = serializeProps(child);
                var dProps = extract(props);

                var newElement = void 0;

                if (typeof cmp.cfg === 'function') {
                    // This implements single function component
                    if (!REGEX.IS_SFC.test(Function.prototype.toString.call(cmp.cfg))) {
                        var func = cmp.cfg;
                        cmp.cfg = function (_Component) {
                            _inherits(_class, _Component);

                            function _class() {
                                _classCallCheck(this, _class);

                                return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
                            }

                            return _class;
                        }(Component);
                        cmp.cfg.prototype.template = func;
                    }

                    newElement = new cmp.cfg({
                        tag: cmpName,
                        root: child,
                        app: cfg.app,
                        props: props,
                        dProps: dProps,
                        parentCmp: parent.cmp || cfg.parent
                    });
                } else {
                    newElement = new Component({
                        tag: cmpName,
                        cmp: cmp,
                        root: child,
                        app: cfg.app,
                        props: props,
                        dProps: dProps,
                        parentCmp: parent.cmp || cfg.parent
                    });
                }

                if (!newElement) {
                    child = child.nextSibling;
                    continue;
                }

                if (_typeof(newElement.module) === 'object') {
                    hmr(newElement, newElement.module);
                }

                if (hooks.callBeforeMount(newElement) !== false) {
                    newElement._isRendered = true;
                    newElement.render(true);

                    if (!component) {
                        component = newElement;
                    }

                    newElement._rootElement[CMP_INSTANCE] = newElement;

                    child.insertBefore(newElement._rootElement, child.firstChild);

                    hooks.callMount(newElement);
                    hooks.callMountAsync(newElement);
                }

                parentElement = newElement;

                if (parent.cmp) {
                    var n = Object.keys(parent.cmp.children).length;
                    parent.cmp.children[newElement.alias ? newElement.alias : n++] = newElement;
                }

                cfg.autoCmp = null;
            }

            if (child.hasChildNodes()) {
                walk(child.firstChild, { cmp: parentElement });
            }

            if (!cmp) {
                parentElement = parent.cmp;
            }

            child = child.nextSibling;
        }
    }

    walk(cfg.template);

    var _defined = function _defined(child) {
        return child.remove();
    };

    for (var _i2 = 0; _i2 <= trash.length - 1; _i2++) {
        _defined(trash[_i2], _i2, trash);
    }

    return component;
}

module.exports = {
    get: get
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexN = /\n/g;
var regexS = /\s+/g;
var replace = ' ';
var decoder = void 0;

var html = {
    /**
     * Create DOM element
     * @param str html string
     * @param wrapper tag string
     * @returns {Element | Node | null}
     */
    create: function create(str, wrapper) {
        var element = void 0;
        str = str.replace(regexN, replace);
        str = str.replace(regexS, replace);

        var template = document.createElement('div');
        template.innerHTML = str;

        if (wrapper && template.childNodes.length > 1) {
            element = document.createElement(wrapper);
            element.innerHTML = template.innerHTML;
        } else {
            element = template.firstChild || document.createTextNode('');
        }

        return element;
    },
    decode: function decode(str) {
        decoder = decoder || document.createElement('div');
        decoder.innerHTML = str;
        return decoder.textContent;
    }
};

module.exports = html;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
// Add tag prefix to animation name inside keyframe
(@(?:[\w-]+-)?keyframes\s+)([\w-_]+)

// Add tag prefix to animation
((?:[\w-]+-)?animation(?:-name)?(?:\s+)?:(?:\s+))([\w-_]+)
 */

function composeStyleInner(cssContent, tag, tagByData) {
    if (typeof cssContent !== 'string') return;

    tag = tagByData || tag;

    cssContent = cssContent.replace(/{/g, '{\n').replace(/}/g, '}\n').replace(/^(\s+)?:root(\s+)?{/gm, tag + ' {').replace(/:root/g, '').replace(/(@(?:[\w-]+-)?keyframes\s+)([\w-_]+)/g, '$1 ' + tag + '-$2').replace(/((?:[\w-]+-)?animation(?:-name)?(?:\s+)?:(?:\s+))([\w-_]+)/g, '$1 ' + tag + '-$2').replace(/[^\s].*{/gm, function (match) {

        if (/^(@|(from|to|\d+%)[^-_])/.test(match)) return match;

        var part = match.split(',');
        var sameTag = new RegExp('^' + tag.replace(/[[\]]/g, '\\$&') + '(\\s+)?{');

        for (var i = 0; i < part.length; i++) {
            if (sameTag.test(part[i].trim())) continue;

            if (/^:global/.test(part[i])) part[i] = part[i].replace(':global', '');else part[i] = tag + ' ' + part[i];
        }
        match = part.join(',');
        return match;
    });

    cssContent = cssContent.replace(/\s{2,}/g, ' ').replace(/{ /g, '{').replace(/ }/g, '}').replace(/\n/g, '').trim();

    return cssContent;
}

module.exports = composeStyleInner;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function delay(cb) {
    if (window.requestAnimationFrame !== undefined) return window.requestAnimationFrame(cb);else return window.setTimeout(cb);
}

module.exports = delay;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var test = {
    'undefined': undefined,
    'null': null,
    'NaN': NaN,
    'Infinity': Infinity,
    'true': true,
    'false': false,
    '0': 0
};

function castStringTo(obj) {
    if (typeof obj !== 'string') {
        return obj;
    }

    if (test.hasOwnProperty(obj)) {
        return test[obj];
    } else if (/^[{\[]/.test(obj)) {
        try {
            return JSON.parse(obj);
        } catch (e) {}
    } else if (/^[0-9]/.test(obj)) {
        var num = parseFloat(obj);
        if (!isNaN(num)) {
            if (isFinite(obj)) {
                if (obj.toLowerCase().indexOf('0x') === 0) {
                    return parseInt(obj, 16);
                }
                return num;
            }
        }
    }
    return obj;
}

module.exports = castStringTo;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function dashToCamel(s) {
    return s.replace(/(-\w)/g, function (m) {
        return m[1].toUpperCase();
    });
}

module.exports = dashToCamel;

/***/ }),
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function camelToDash(s) {
    return s.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
}

module.exports = camelToDash;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function toLiteralString(str) {
    return str.replace(/{{/gm, '${').replace(/}}/gm, '}');
}

module.exports = toLiteralString;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _require = __webpack_require__(0),
    TAG = _require.TAG;

var tag = TAG.TEXT_NODE_PLACE;
var LESS = '<';
var GREATER = '>';

var regOpen = new RegExp('<' + tag + '>(\\s+)?<', 'gi');
var regClose = new RegExp('>(\\s+)?</' + tag + '>', 'gi');

/**
 * This method add special tag to value placeholder
 * @param strings
 * @param value
 * @returns {*}
 */
module.exports = function (strings) {
    var result = strings[0];
    var allowTag = false;

    for (var _len = arguments.length, value = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        value[_key - 1] = arguments[_key];
    }

    for (var i = 0; i < value.length; ++i) {
        var _defined = function _defined(char) {
            if (char === LESS) allowTag = false;
            if (char === GREATER) allowTag = true;
        };

        var _defined2 = [].concat(_toConsumableArray(strings[i]));

        for (var _i2 = 0; _i2 <= _defined2.length - 1; _i2++) {
            _defined(_defined2[_i2], _i2, _defined2);
        }

        if (/<\/?style>/ig.test(strings[i])) allowTag = false;

        if (allowTag) result += '<' + tag + '>' + value[i] + '</' + tag + '>' + strings[i + 1];else result += '' + value[i] + strings[i + 1];
    }

    result = result.replace(regOpen, LESS).replace(regClose, GREATER);

    return result;
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function mixin(target) {
    var sources = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];


    if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object' || target == null) {
        throw new TypeError('expected an object');
    }

    if (!Array.isArray(sources)) {
        sources = [sources];
    }

    for (var j = sources.length - 1; j >= 0; --j) {
        var keys = Object.keys(sources[j]);
        for (var i = keys.length - 1; i >= 0; --i) {
            var index = keys[i];
            if (typeof target[index] === 'undefined') {
                target[index] = sources[j][index];
            } else {
                console.warn('Doz', 'mixin failed for already defined property: ' + index);
            }
        }
    }

    return target;
}

module.exports = mixin;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(1),
    registerPlugin = _require.registerPlugin,
    data = _require.data;

function use(plugin) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (typeof plugin !== 'function') {
        throw new TypeError('Plugin must be a function');
    }

    plugin['options'] = options;

    registerPlugin(plugin);
}

function load(app) {
    var _defined = function _defined(func) {
        func(app.constructor, app, func.options);
    };

    var _defined2 = data.plugins;

    for (var _i2 = 0; _i2 <= _defined2.length - 1; _i2++) {
        _defined(_defined2[_i2], _i2, _defined2);
    }
}

module.exports = {
    use: use,
    load: load
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(18);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Doz = __webpack_require__(19);
var collection = __webpack_require__(1);

var _require = __webpack_require__(16),
    use = _require.use;

var component = __webpack_require__(44);

var _require2 = __webpack_require__(4),
    Component = _require2.Component;

var mixin = __webpack_require__(45);
var h = __webpack_require__(14);

var _require3 = __webpack_require__(3),
    compile = _require3.compile;

Object.defineProperties(Doz, {
    collection: {
        value: collection,
        enumerable: true
    },
    compile: {
        value: compile,
        enumerable: true
    },
    Component: {
        value: Component,
        enumerable: true
    },
    component: {
        value: component,
        enumerable: true
    },
    define: {
        value: component,
        enumerable: true
    },
    h: {
        value: h,
        enumerable: true
    },
    mixin: {
        value: mixin,
        enumerable: true
    },
    use: {
        value: use,
        enumerable: true
    },
    version: {
        value: '1.12.1',
        enumerable: true
    }
});

module.exports = Doz;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var bind = __webpack_require__(20);
var instances = __webpack_require__(5);

var _require = __webpack_require__(0),
    TAG = _require.TAG,
    REGEX = _require.REGEX;

var toLiteralString = __webpack_require__(13);
var plugin = __webpack_require__(16);

var Doz = function () {
    function Doz() {
        var _this = this;

        var cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Doz);

        this.baseTemplate = '<' + TAG.APP + '></' + TAG.APP + '>';

        if (REGEX.IS_ID_SELECTOR.test(cfg.root)) {
            cfg.root = document.getElementById(cfg.root.substring(1));
        }

        if (REGEX.IS_ID_SELECTOR.test(cfg.template)) {
            cfg.template = document.getElementById(cfg.template.substring(1));
            cfg.template = cfg.template.innerHTML;
        }

        if (!(cfg.root instanceof HTMLElement)) {
            throw new TypeError('root must be an HTMLElement or an valid ID selector like #example-root');
        }

        if (!(cfg.template instanceof HTMLElement || typeof cfg.template === 'string' || typeof cfg.template === 'function')) {
            throw new TypeError('template must be a string or an HTMLElement or a function or an valid ID selector like #example-template');
        }

        // Remove if already exists
        var appNode = document.querySelector(TAG.APP);
        if (appNode) {
            appNode.parentNode.removeChild(appNode);
        }

        this.cfg = Object.assign({}, {
            components: [],
            shared: {},
            propsListener: null,
            actions: {},
            autoDraw: true
        }, cfg);

        Object.defineProperties(this, {
            _components: {
                value: {},
                writable: true
            },
            _usedComponents: {
                value: {},
                writable: true
            },
            _stores: {
                value: {},
                writable: true
            },
            _cache: {
                value: new Map()
            },
            _ids: {
                value: {},
                writable: true
            },
            _onAppReadyCB: {
                value: [],
                writable: true
            },
            _callAppReady: {
                value: function value() {
                    var _defined = function _defined(cb) {
                        if (typeof cb === 'function' && cb._instance) {
                            cb.call(cb._instance);
                        }
                    };

                    var _defined2 = this._onAppReadyCB;

                    for (var _i2 = 0; _i2 <= _defined2.length - 1; _i2++) {
                        _defined(_defined2[_i2], _i2, _defined2);
                    }

                    this._onAppReadyCB = [];
                }
            },
            _onAppDrawCB: {
                value: [],
                writable: true
            },
            _onAppCB: {
                value: {},
                writable: true
            },
            _root: {
                value: this.cfg.root
            },
            action: {
                value: bind(this.cfg.actions, this),
                enumerable: true
            },
            shared: {
                value: this.cfg.shared,
                writable: true,
                enumerable: true
            },
            mount: {
                value: function value(template, root) {
                    var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this._tree;


                    if (typeof root === 'string') {
                        root = document.querySelector(root);
                    }

                    root = root || parent._rootElement;

                    if (!(root instanceof HTMLElement)) {
                        throw new TypeError('root must be an HTMLElement or an valid selector like #example-root');
                    }

                    var contentStr = eval('`' + toLiteralString(template) + '`');
                    var autoCmp = {
                        tag: TAG.MOUNT,
                        cfg: {
                            props: {},
                            template: function template() {
                                return '<' + TAG.ROOT + '>' + contentStr + '</' + TAG.ROOT + '>';
                            }
                        }
                    };

                    return instances.get({
                        root: root,
                        template: '<' + TAG.MOUNT + '></' + TAG.MOUNT + '>',
                        app: this,
                        parentCmp: parent,
                        autoCmp: autoCmp,
                        mount: true
                    });
                },
                enumerable: true
            }
        });

        if (Array.isArray(this.cfg.components)) {
            var _defined3 = function _defined3(cmp) {
                if ((typeof cmp === 'undefined' ? 'undefined' : _typeof(cmp)) === 'object' && typeof cmp.tag === 'string' && _typeof(cmp.cfg) === 'object') {
                    _this._components[cmp.tag] = cmp;
                }
            };

            var _defined4 = this.cfg.components;

            for (var _i4 = 0; _i4 <= _defined4.length - 1; _i4++) {
                _defined3(_defined4[_i4], _i4, _defined4);
            }
        } else if (_typeof(this.cfg.components) === 'object') {
            var _defined5 = function _defined5(objName) {
                _this._components[objName] = {
                    tag: objName,
                    cfg: _this.cfg.components[objName]
                };
            };

            var _defined6 = Object.keys(this.cfg.components);

            for (var _i6 = 0; _i6 <= _defined6.length - 1; _i6++) {
                _defined5(_defined6[_i6], _i6, _defined6);
            }
        }

        this._components[TAG.APP] = {
            tag: TAG.APP,
            cfg: {
                template: typeof cfg.template === 'function' ? cfg.template : function () {
                    var contentStr = toLiteralString(cfg.template);
                    if (/\${.*?}/g.test(contentStr)) return eval('`' + contentStr + '`');else return contentStr;
                }
            }
        };

        var _defined7 = function _defined7(p) {
            if (!['template', 'root'].includes(p)) _this._components[TAG.APP].cfg[p] = cfg[p];
        };

        var _defined8 = Object.keys(cfg);

        for (var _i8 = 0; _i8 <= _defined8.length - 1; _i8++) {
            _defined7(_defined8[_i8], _i8, _defined8);
        }

        plugin.load(this);

        if (this.cfg.autoDraw) this.draw();

        this._callAppReady();
        this.emit('ready', this);
    }

    _createClass(Doz, [{
        key: 'draw',
        value: function draw() {

            if (!this.cfg.autoDraw) this.cfg.root.innerHTML = '';

            this._tree = instances.get({
                root: this.cfg.root,
                template: this.baseTemplate,
                app: this
            }) || [];

            return this;
        }
    }, {
        key: 'getComponent',
        value: function getComponent(alias) {
            return this._tree ? this._tree.children[alias] : undefined;
        }
    }, {
        key: 'getComponentById',
        value: function getComponentById(id) {
            return this._ids[id];
        }
    }, {
        key: 'getStore',
        value: function getStore(store) {
            return this._stores[store];
        }
    }, {
        key: 'on',
        value: function on(event, callback) {
            if (typeof event !== 'string') throw new TypeError('Event must be a string');

            if (typeof callback !== 'function') throw new TypeError('Callback must be a function');

            if (!this._onAppCB[event]) {
                this._onAppCB[event] = [];
            }

            this._onAppCB[event].push(callback);

            return this;
        }
    }, {
        key: 'emit',
        value: function emit(event) {
            var _this2 = this;

            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            if (this._onAppCB[event]) {
                var _defined9 = function _defined9(func) {
                    func.apply(_this2, args);
                };

                var _defined10 = this._onAppCB[event];

                for (var _i10 = 0; _i10 <= _defined10.length - 1; _i10++) {
                    _defined9(_defined10[_i10], _i10, _defined10);
                }
            }

            return this;
        }
    }]);

    return Doz;
}();

module.exports = Doz;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function bind(obj, context) {
    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || obj == null) {
        throw new TypeError('expected an object');
    }

    var target = Object.assign({}, obj);

    var keys = Object.keys(obj);

    for (var i = keys.length - 1; i >= 0; --i) {
        var item = target[keys[i]];
        if (typeof item === 'function') {
            target[keys[i]] = item.bind(context);
        } else if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && item != null) {
            target[keys[i]] = bind(item, context);
        }
    }

    return target;
}

module.exports = bind;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var composeStyleInner = __webpack_require__(7);
var createStyle = __webpack_require__(22);

function scopedInner(cssContent, tag, tagByData) {
    if (typeof cssContent !== 'string') return;
    cssContent = composeStyleInner(cssContent, tag, tagByData);
    return createStyle(cssContent, tag);
}

module.exports = {
    scopedInner: scopedInner
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function createStyle(cssContent, tag) {
    var result = void 0;
    var styleId = tag + '--style';
    var styleExists = document.querySelector('#' + styleId);

    if (styleExists) {
        result = styleExists.innerHTML = cssContent;
    } else {
        var styleEl = document.createElement('style');
        styleEl.id = styleId;
        result = styleEl.innerHTML = cssContent;
        document.head.appendChild(styleEl);
    }

    return result;
}

module.exports = createStyle;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    components: {},
    plugins: []
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(0),
    ATTR = _require.ATTR;

function extract(props) {

    var dProps = {};

    if (props[ATTR.ALIAS] !== undefined) {
        dProps['alias'] = props[ATTR.ALIAS];
        delete props[ATTR.ALIAS];
    }

    if (props[ATTR.STORE] !== undefined) {
        dProps['store'] = props[ATTR.STORE];
        delete props[ATTR.STORE];
    }

    if (props[ATTR.LISTENER] !== undefined) {
        dProps['callback'] = props[ATTR.LISTENER];
        delete props[ATTR.LISTENER];
    }

    if (props[ATTR.ID] !== undefined) {
        dProps['id'] = props[ATTR.ID];
        delete props[ATTR.ID];
    }

    return dProps;
}

module.exports = {
    extract: extract
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function hmr(instance, _module) {
    if (!_module || !_module.hot) return;
    var NS_PROPS = '__doz_hmr_props_store__';
    var NS_INIT_PROPS = '__doz_hmr_init_props_store__';

    window[NS_PROPS] = window[NS_PROPS] || {};
    window[NS_INIT_PROPS] = window[NS_INIT_PROPS] || {};
    var id = _module.id;
    window[NS_PROPS][id] = window[NS_PROPS][id] || new Map();
    window[NS_INIT_PROPS][id] = window[NS_INIT_PROPS][id] || new Map();

    var _defined = function _defined(p) {
        if (instance._initialProps[p] === window[NS_INIT_PROPS][id].get(p)) instance.props[p] = window[NS_PROPS][id].get(p) || instance.props[p];else instance.props[p] = instance._initialProps[p];
    };

    var _defined2 = Object.keys(instance.props);

    for (var _i2 = 0; _i2 <= _defined2.length - 1; _i2++) {
        _defined(_defined2[_i2], _i2, _defined2);
    }

    _module.hot.dispose(function () {
        var _defined3 = function _defined3(p) {
            window[NS_PROPS][id].set(p, instance.props[p]);
            window[NS_INIT_PROPS][id].set(p, instance._initialProps[p]);
        };

        var _defined4 = Object.keys(instance.props);

        for (var _i4 = 0; _i4 <= _defined4.length - 1; _i4++) {
            _defined3(_defined4[_i4], _i4, _defined4);
        }
    });
}

module.exports = hmr;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//const proxy = require('../utils/proxy');
var proxy = __webpack_require__(46);
var events = __webpack_require__(2);
var updateBoundElements = __webpack_require__(28);
var propsListener = __webpack_require__(29);

function sanitize(str) {
    return typeof str === 'string' ? str.replace(/&(?!\w+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') : str;
}

function create(instance) {
    instance._props = proxy.create(instance._rawProps, function (change) {
        if (!instance._isRendered) return;
        var changes = [change];
        var res = events.callBeforeUpdate(instance, changes);
        console.log('uapda', changes);

        setTimeout(function () {
            events.callUpdate(instance, changes);
            instance.render();
            propsListener(instance, changes);
            updateBoundElements(instance, changes);
        });
        return res !== false;
    }, function (value, oldValue, currentPath) {

        //value = sanitize(value);

        if (instance.propsConvert) {
            if (_typeof(instance.propsConvert) === 'object') {
                var propPath = instance.propsConvert[currentPath];
                var func = instance[propPath] || propPath;
                if (typeof func === 'function') {
                    return func.call(instance, value, oldValue);
                }
            }
        }

        if (instance.propsComputed) {
            if (_typeof(instance.propsComputed) === 'object') {
                var cached = instance._computedCache.get(currentPath);
                if (cached === undefined) {
                    cached = new Map();
                    instance._computedCache.set(currentPath, cached);
                } else {
                    var cachedValue = cached.get(value);
                    if (cachedValue !== undefined) {
                        return cachedValue;
                    }
                }
                var _propPath = instance.propsComputed[currentPath];
                var _func = instance[_propPath] || _propPath;
                if (typeof _func === 'function') {
                    var result = _func.call(instance, value, oldValue);
                    cached.set(value, result);
                    return result;
                }
            }
        }
        return value;
    });
}

function _create(instance) {

    if (instance._props.__isProxy) proxy.remove(instance._props);

    instance._props = proxy.create(instance._rawProps, null, function (changes) {
        if (!instance._isRendered) return;
        events.callUpdate(instance, changes);
        instance.render();
        propsListener(instance, changes);
        updateBoundElements(instance, changes);
    }, function (value, oldValue, currentPath) {
        if (instance.propsConvert) {
            if (_typeof(instance.propsConvert) === 'object') {
                var propPath = instance.propsConvert[currentPath];
                var func = instance[propPath] || propPath;
                if (typeof func === 'function') {
                    return func.call(instance, value, oldValue);
                }
            }
        }

        if (instance.propsComputed) {
            if (_typeof(instance.propsComputed) === 'object') {
                var cached = instance._computedCache.get(currentPath);
                if (cached === undefined) {
                    cached = new Map();
                    instance._computedCache.set(currentPath, cached);
                } else {
                    var cachedValue = cached.get(value);
                    if (cachedValue !== undefined) {
                        return cachedValue;
                    }
                }
                var _propPath2 = instance.propsComputed[currentPath];
                var _func2 = instance[_propPath2] || _propPath2;
                if (typeof _func2 === 'function') {
                    var result = _func2.call(instance, value, oldValue);
                    cached.set(value, result);
                    return result;
                }
            }
        }
        return value;
    });

    proxy.beforeChange(instance._props, function (changes) {
        var res = events.callBeforeUpdate(instance, changes);
        if (res === false) return false;
    });
}

module.exports = {
    create: create
};

/***/ }),
/* 27 */,
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function updateBoundElements(instance, changes) {
    var _defined = function _defined(item) {
        if (Object.prototype.hasOwnProperty.call(instance._boundElements, item.property)) {
            var _defined2 = function _defined2(element) {
                if (element.type === 'checkbox') {
                    if (!element.defaultValue) element.checked = item.newValue;else if (Array.isArray(item.newValue)) {
                        var inputs = document.querySelectorAll('input[name=' + element.name + '][type=checkbox]');

                        var _defined4 = function _defined4(input) {
                            return input.checked = item.newValue.includes(input.value);
                        };

                        var _defined5 = [].concat(_toConsumableArray(inputs));

                        for (var _i6 = 0; _i6 <= _defined5.length - 1; _i6++) {
                            _defined4(_defined5[_i6], _i6, _defined5);
                        }
                    }
                } else if (element.type === 'radio') {
                    element.checked = element.value === item.newValue;
                } else if (element.type === 'select-multiple' && Array.isArray(item.newValue)) {
                    var _defined6 = function _defined6(option) {
                        return option.selected = item.newValue.includes(option.value);
                    };

                    var _defined7 = [].concat(_toConsumableArray(element.options));

                    for (var _i8 = 0; _i8 <= _defined7.length - 1; _i8++) {
                        _defined6(_defined7[_i8], _i8, _defined7);
                    }
                } else {
                    element.value = item.newValue;
                }
            };

            var _defined3 = instance._boundElements[item.property];

            for (var _i4 = 0; _i4 <= _defined3.length - 1; _i4++) {
                _defined2(_defined3[_i4], _i4, _defined3);
            }
        }
    };

    for (var _i2 = 0; _i2 <= changes.length - 1; _i2++) {
        _defined(changes[_i2], _i2, changes);
    }
}

module.exports = updateBoundElements;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function propsListener(instance, changes) {
    if (!instance.propsListener || _typeof(instance.propsListener) !== 'object') return;

    for (var i = 0; i < changes.length; i++) {
        var item = changes[i];
        var propPath = instance.propsListener[item.currentPath];
        if (item.type === 'update' && propPath) {
            var func = instance[propPath] || propPath;
            if (typeof func === 'function') {
                func.call(instance, item.newValue, item.previousValue);
            }
        }
    }
}

module.exports = propsListener;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var element = __webpack_require__(31);

module.exports = {
    updateElement: element.update
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _require = __webpack_require__(32),
    attach = _require.attach,
    updateAttributes = _require.updateAttributes;

var deadChildren = [];

var _require2 = __webpack_require__(0),
    INSTANCE = _require2.INSTANCE,
    TAG = _require2.TAG,
    NS = _require2.NS,
    CMP_INSTANCE = _require2.CMP_INSTANCE,
    ATTR = _require2.ATTR,
    DIR_IS = _require2.DIR_IS;

var html = __webpack_require__(6);
var composeStyleInner = __webpack_require__(7);

var storeElementNode = Object.create(null);

function isChanged(nodeA, nodeB) {
    return (typeof nodeA === 'undefined' ? 'undefined' : _typeof(nodeA)) !== (typeof nodeB === 'undefined' ? 'undefined' : _typeof(nodeB)) || typeof nodeA === 'string' && nodeA !== nodeB || nodeA.type !== nodeB.type || nodeA.props && nodeA.props.forceupdate;
}

function canDecode(str) {
    return (/&\w+;/.test(str) ? html.decode(str) : str
    );
}

function create(node, cmp, initial) {
    if (typeof node === 'undefined') return;

    var nodeStored = void 0;
    var $el = void 0;

    if (typeof node === 'string') {
        return document.createTextNode(
        // use decode only if necessary
        canDecode(node));
    }

    if (node.type[0] === '#') {
        node.type = TAG.EMPTY;
    }

    nodeStored = storeElementNode[node.type];
    if (nodeStored) {
        $el = nodeStored.cloneNode();
    } else {
        $el = node.isSVG ? document.createElementNS(NS.SVG, node.type) : document.createElement(node.type);

        storeElementNode[node.type] = $el.cloneNode(true);
    }

    attach($el, node.props, cmp);

    var _defined2 = node.children;

    var _defined3 = function _defined3(item) {
        return create(item, cmp, initial);
    };

    var _defined = new Array(_defined2.length);

    for (var _i4 = 0; _i4 <= _defined2.length - 1; _i4++) {
        _defined[_i4] = _defined3(_defined2[_i4], _i4, _defined2);
    }

    for (var _i2 = 0; _i2 <= _defined.length - 1; _i2++) {
        $el.appendChild.bind($el)(_defined[_i2], _i2, _defined);
    }

    if (typeof $el.hasAttribute === 'function') if ((node.type.indexOf('-') !== -1 || typeof $el.hasAttribute === 'function' && $el.hasAttribute(ATTR.IS)) && !initial) {
        cmp._processing.push({ node: $el, action: 'create' });
    }

    return $el;
}

function update($parent, newNode, oldNode) {
    var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var cmp = arguments[4];
    var initial = arguments[5];


    if (!$parent) return;

    if (!oldNode) {
        var rootElement = create(newNode, cmp, initial);
        $parent.appendChild(rootElement);
        return rootElement;
    } else if (!newNode) {
        if ($parent.childNodes[index]) {
            deadChildren.push($parent.childNodes[index]);
        }
    } else if (isChanged(newNode, oldNode)) {
        var oldElement = $parent.childNodes[index];
        // Reuse text node
        if (typeof newNode === 'string' && typeof oldNode === 'string') {
            oldElement.textContent = canDecode(newNode);
            if ($parent.nodeName === 'SCRIPT') {
                // it could be heavy
                if ($parent.type === 'text/style' && $parent.dataset.id && $parent.dataset.owner) {
                    document.getElementById($parent.dataset.id).textContent = composeStyleInner(oldElement.textContent, $parent.dataset.owner, $parent.dataset.ownerByData);
                }
            }
            return oldElement;
        }

        var newElement = create(newNode, cmp, initial);

        //Re-assign CMP INSTANCE to new element
        if (oldElement[CMP_INSTANCE]) {
            newElement[CMP_INSTANCE] = oldElement[CMP_INSTANCE];
            newElement[CMP_INSTANCE]._rootElement = newElement;
        }

        $parent.replaceChild(newElement, oldElement);
        return newElement;
    } else if (newNode.type) {

        var updated = updateAttributes($parent.childNodes[index], newNode.props, oldNode.props, cmp);

        if ($parent.childNodes[index]) {
            var dynInstance = $parent.childNodes[index][INSTANCE];
            if (dynInstance && updated.length) {
                var _defined4 = function _defined4(props) {
                    var _defined5 = function _defined5(name) {
                        dynInstance.props[name] = props[name];
                    };

                    var _defined6 = Object.keys(props);

                    for (var _i8 = 0; _i8 <= _defined6.length - 1; _i8++) {
                        _defined5(_defined6[_i8], _i8, _defined6);
                    }
                };

                for (var _i6 = 0; _i6 <= updated.length - 1; _i6++) {
                    _defined4(updated[_i6], _i6, updated);
                }

                return;
            }
        }

        var newLength = newNode.children.length;
        var oldLength = oldNode.children.length;

        for (var i = 0; i < newLength || i < oldLength; i++) {
            update($parent.childNodes[index], newNode.children[i], oldNode.children[i], i, cmp, initial);
        }

        clearDead();
    }
}

function clearDead() {
    var dl = deadChildren.length;

    while (dl--) {
        deadChildren[dl].parentNode.removeChild(deadChildren[dl]);
        deadChildren.splice(dl, 1);
    }
}

module.exports = {
    create: create,
    update: update
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _require = __webpack_require__(0),
    REGEX = _require.REGEX,
    ATTR = _require.ATTR,
    CMP_INSTANCE = _require.CMP_INSTANCE,
    DIR_IS = _require.DIR_IS;

var castStringTo = __webpack_require__(9);
var dashToCamel = __webpack_require__(10);
var camelToDash = __webpack_require__(12);
var objectPath = __webpack_require__(33);
var delay = __webpack_require__(8);

function isEventAttribute(name) {
    return REGEX.IS_LISTENER.test(name);
}

function isBindAttribute(name) {
    return name === ATTR.BIND;
}

function isRefAttribute(name) {
    return name === ATTR.REF;
}

function canBind($target) {
    return ['INPUT', 'TEXTAREA', 'SELECT'].indexOf($target.nodeName) !== -1;
}

function setAttribute($target, name, value, cmp) {
    if (REGEX.IS_CUSTOM_TAG.test($target.nodeName) || $target[DIR_IS]) {
        name = camelToDash(name);
    }
    if (isCustomAttribute(name)) {} else if (typeof value === 'boolean') {
        setBooleanAttribute($target, name, value);
    } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
        try {
            $target.setAttribute(name, JSON.stringify(value));
        } catch (e) {}
    } else {
        $target.setAttribute(name, value);
    }
}

function removeAttribute($target, name, value) {
    if (isCustomAttribute(name) || !$target) {} else {
        $target.removeAttribute(name);
    }
}

function updateAttribute($target, name, newVal, oldVal, cmp) {
    if (newVal === '') {
        removeAttribute($target, name, oldVal, cmp);
        updateChildren(cmp, name, newVal, $target);
    } else if (oldVal === '' || newVal !== oldVal) {
        setAttribute($target, name, newVal, cmp);
        updateChildren(cmp, name, newVal, $target);
    }
}

function updateChildren(cmp, name, value, $target) {
    if (cmp && cmp.updateChildrenProps && $target) {
        name = dashToCamel(name);
        var firstChild = $target.firstChild;
        if (firstChild && firstChild[CMP_INSTANCE] && Object.prototype.hasOwnProperty.call(firstChild[CMP_INSTANCE]._publicProps, name)) {
            firstChild[CMP_INSTANCE].props[name] = value;
        }
    }
}

function updateAttributes($target, newProps) {
    var oldProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var cmp = arguments[3];

    var props = Object.assign({}, newProps, oldProps);
    var updated = [];

    var _defined = function _defined(name) {
        updateAttribute($target, name, newProps[name], oldProps[name], cmp);
        if (newProps[name] !== oldProps[name]) {
            var obj = {};
            obj[name] = newProps[name];
            updated.push(obj);
        }
    };

    var _defined2 = Object.keys(props);

    for (var _i2 = 0; _i2 <= _defined2.length - 1; _i2++) {
        _defined(_defined2[_i2], _i2, _defined2);
    }

    return updated;
}

function isCustomAttribute(name) {
    return isEventAttribute(name) || isBindAttribute(name) || isRefAttribute(name) || name === ATTR.FORCE_UPDATE;
}

function setBooleanAttribute($target, name, value) {
    if (!$target) return;
    $target.setAttribute(name, value);
    $target[name] = value;
}

function extractEventName(name) {
    return name.slice(2).toLowerCase();
}

function trimQuotes(str) {
    return str.replace(REGEX.TRIM_QUOTES, '$1');
}

function addEventListener($target, name, value, cmp) {

    if (!isEventAttribute(name)) return;

    var match = value.match(REGEX.GET_LISTENER);

    if (match) {
        var args = null;
        var handler = match[1];
        var stringArgs = match[2];
        if (stringArgs) {
            var _defined3 = stringArgs.split(',');

            args = new Array(_defined3.length);

            var _defined4 = function _defined4(item) {
                item = item.trim();
                return item === 'this' ? cmp : castStringTo(trimQuotes(item));
            };

            for (var _i4 = 0; _i4 <= _defined3.length - 1; _i4++) {
                args[_i4] = _defined4(_defined3[_i4], _i4, _defined3);
            }
        }

        var isParentMethod = handler.match(REGEX.IS_PARENT_METHOD);

        if (isParentMethod) {
            handler = isParentMethod[1];
            cmp = cmp.parent;
        }

        var method = objectPath(handler, cmp);

        if (method !== undefined) {
            value = args ? method.bind.apply(method, [cmp].concat(_toConsumableArray(args))) : method.bind(cmp);
        }
    }

    if (typeof value === 'function') $target.addEventListener(extractEventName(name), value);else {
        value = value.replace(REGEX.THIS_TARGET, '$target');

        var _func = function _func() {
            eval(value);
        };
        $target.addEventListener(extractEventName(name), _func.bind(cmp));
    }
}

function setBind($target, name, value, cmp) {
    if (!isBindAttribute(name) || !canBind($target)) return;
    if (typeof cmp.props[value] !== 'undefined') {

        var events = ['compositionstart', 'compositionend', 'input', 'change'];

        var _defined5 = function _defined5(event) {
            $target.addEventListener(event, function (e) {
                var _value = void 0;
                if (this.type === 'checkbox') {
                    if (!this.defaultValue) cmp.props[value] = this.checked;else {
                        var inputs = document.querySelectorAll('input[name=' + this.name + '][type=checkbox]:checked');

                        var _defined6 = [].concat(_toConsumableArray(inputs));

                        _value = new Array(_defined6.length);

                        var _defined7 = function _defined7(input) {
                            return input.value;
                        };

                        for (var _i8 = 0; _i8 <= _defined6.length - 1; _i8++) {
                            _value[_i8] = _defined7(_defined6[_i8], _i8, _defined6);
                        }

                        cmp.props[value] = _value;
                    }
                } else {
                    _value = this.value;
                    if (this.multiple) {
                        var _defined10 = [].concat(_toConsumableArray(this.options));

                        var _defined11 = function _defined11(option) {
                            return option.selected;
                        };

                        var _defined8 = [];

                        for (var _i12 = 0; _i12 <= _defined10.length - 1; _i12++) {
                            if (_defined11(_defined10[_i12], _i12, _defined10)) _defined8.push(_defined10[_i12]);
                        }

                        _value = new Array(_defined8.length);

                        var _defined9 = function _defined9(option) {
                            return option.value;
                        };

                        for (var _i10 = 0; _i10 <= _defined8.length - 1; _i10++) {
                            _value[_i10] = _defined9(_defined8[_i10], _i10, _defined8);
                        }
                    }
                    cmp.props[value] = _value;
                }
            });
        };

        for (var _i6 = 0; _i6 <= events.length - 1; _i6++) {
            _defined5(events[_i6], _i6, events);
        }

        if (Object.prototype.hasOwnProperty.call(cmp._boundElements, value)) {
            cmp._boundElements[value].push($target);
        } else {
            cmp._boundElements[value] = [$target];
        }

        return true;
    }
}

function setRef($target, name, value, cmp) {
    if (!isRefAttribute(name)) return;
    cmp.ref[value] = $target;
}

function attach($target, props, cmp) {

    var bindValue = void 0;
    var name = void 0;

    var propsKeys = Object.keys(props);

    for (var i = 0, len = propsKeys.length; i < len; i++) {
        name = propsKeys[i];
        setAttribute($target, name, props[name], cmp);
        addEventListener($target, name, props[name], cmp);
        if (setBind($target, name, props[name], cmp)) {
            bindValue = cmp.props[props[name]];
        }
        setRef($target, name, props[name], cmp);
    }

    var datasetArray = Object.keys($target.dataset);
    for (var _i13 = 0; _i13 < datasetArray.length; _i13++) {
        if (REGEX.IS_LISTENER.test(datasetArray[_i13])) addEventListener($target, _i13, $target.dataset[datasetArray[_i13]], cmp);
    }

    // too slow
    /*for (let i in $target.dataset) {
        console.log(i)
        if (Object.prototype.hasOwnProperty.call($target.dataset, i) && REGEX.IS_LISTENER.test(i)) {
            addEventListener($target, i, $target.dataset[i], cmp);
        }
    }*/

    if (typeof bindValue === 'undefined') return;

    delay(function () {
        var inputs = void 0;
        var input = void 0;
        if ($target.type === 'radio') {
            inputs = document.querySelectorAll('input[name=' + $target.name + '][type=radio]');
            for (var _i14 = 0, _len = inputs.length; _i14 < _len; _i14++) {
                input = inputs[_i14];
                input.checked = bindValue === input.value;
            }
        } else if ($target.type === 'checkbox') {
            if ((typeof bindValue === 'undefined' ? 'undefined' : _typeof(bindValue)) === 'object') {
                inputs = document.querySelectorAll('input[name=' + $target.name + '][type=checkbox]');
                for (var _i15 = 0, _len2 = inputs.length; _i15 < _len2; _i15++) {
                    input = inputs[_i15];
                    input.checked = Array.from(bindValue).includes(input.value);
                }
            } else $target.checked = bindValue;
        } else {
            $target.value = bindValue;
        }
    });
}

module.exports = {
    attach: attach,
    updateAttributes: updateAttributes
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function getByPath(path, obj) {
    return path.split('.').reduce(function (res, prop) {
        return res ? res[prop] : undefined;
    }, obj);
}

function getLast(path, obj) {
    if (path.indexOf('.') !== -1) {
        path = path.split('.');
        path.pop();
        path = path.join('.');
    }
    return getByPath(path, obj);
}

module.exports = getByPath;
module.exports.getLast = getLast;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function create(instance) {
    var storeName = instance.store;
    if (typeof storeName === 'string') {
        if (instance.app._stores[storeName] !== undefined) {
            throw new Error('Store already defined: ' + storeName);
        }
        instance.app._stores[storeName] = instance.props;
    }
}

function sync(instance) {
    var storeName = instance.store;
    if (typeof storeName === 'string' && instance.app._stores[storeName] !== undefined) {
        instance.app._stores[storeName] = instance.props;
    }
}

module.exports = {
    create: create,
    sync: sync
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function create(instance) {

    var id = instance.id;

    if (typeof id === 'string') {
        if (instance.app._ids[id] !== undefined) {
            throw new Error('ID already defined: ' + id);
        }
        instance.app._ids[id] = instance;
    }
}

module.exports = {
    create: create
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var camelToDash = __webpack_require__(12);

function toInlineStyle(obj) {
    var withStyle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var _defined = Object.entries(obj);

    var _defined2 = function _defined2(styleString, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            propName = _ref2[0],
            propValue = _ref2[1];

        return '' + styleString + camelToDash(propName) + ':' + propValue + ';';
    };

    var _acc = '';

    for (var _i2 = 0; _i2 <= _defined.length - 1; _i2++) {
        _acc = _defined2(_acc, _defined[_i2], _i2, _defined);
    }

    obj = _acc;

    return withStyle ? 'style="' + obj + '"' : obj;
}

module.exports = toInlineStyle;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function add(instance) {
    if (typeof instance.onAppReady === 'function') {
        instance.onAppReady._instance = instance;
        instance.app._onAppReadyCB.push(instance.onAppReady);
    }
}

module.exports = {
    add: add
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function add(instance) {
    if (typeof instance.onAppDraw === 'function') {
        instance.onAppDraw._instance = instance;
        instance.app._onAppDrawCB.push(instance.onAppDraw);
    }
}

function emit(instance, next, prev) {
    var _defined = function _defined(cb) {
        if (typeof cb === 'function' && cb._instance) {
            cb.call(cb._instance, next, prev, instance);
        }
    };

    var _defined2 = instance.app._onAppDrawCB;

    for (var _i2 = 0; _i2 <= _defined2.length - 1; _i2++) {
        _defined(_defined2[_i2], _i2, _defined2);
    }
}

module.exports = {
    add: add,
    emit: emit
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function extendInstance(instance, cfg, dProps) {
    Object.assign(instance, cfg, dProps);
}

module.exports = extendInstance;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function cloneObject(obj) {
    return JSON.parse(JSON.stringify(obj));
}

module.exports = cloneObject;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function removeAllAttributes(el) {
    var exclude = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    var attributeName = void 0;
    for (var i = el.attributes.length - 1; i >= 0; i--) {
        attributeName = el.attributes[i].name;
        if (exclude.includes(attributeName)) continue;
        el.removeAttribute(attributeName);
    }
}

module.exports = removeAllAttributes;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function loadLocal(instance) {

    // Add local components
    if (Array.isArray(instance.components)) {
        var _defined = function _defined(cmp) {
            if ((typeof cmp === 'undefined' ? 'undefined' : _typeof(cmp)) === 'object' && typeof cmp.tag === 'string' && _typeof(cmp.cfg) === 'object') {
                instance._components[cmp.tag] = cmp;
            }
        };

        var _defined2 = instance.components;

        for (var _i2 = 0; _i2 <= _defined2.length - 1; _i2++) {
            _defined(_defined2[_i2], _i2, _defined2);
        }

        delete instance.components;
    } else if (_typeof(instance.components) === 'object') {
        var _defined3 = function _defined3(objName) {
            instance._components[objName] = {
                tag: objName,
                cfg: instance.components[objName]
            };
        };

        var _defined4 = Object.keys(instance.components);

        for (var _i4 = 0; _i4 <= _defined4.length - 1; _i4++) {
            _defined3(_defined4[_i4], _i4, _defined4);
        }

        delete instance.components;
    }
}

module.exports = loadLocal;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mixin = __webpack_require__(15);

function localMixin(instance) {
    mixin(instance, instance.mixin);
    instance.mixin = [];
}

module.exports = localMixin;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(1),
    registerComponent = _require.registerComponent;

var _require2 = __webpack_require__(0),
    REGEX = _require2.REGEX;

function component(tag) {
    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


    if (typeof tag !== 'string') {
        throw new TypeError('Tag must be a string');
    }

    if (!REGEX.IS_CUSTOM_TAG.test(tag)) {
        throw new TypeError('Tag must contain a dash (-) like my-component');
    }

    var cmp = {
        tag: tag,
        cfg: cfg
    };

    registerComponent(cmp);
}

module.exports = component;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(4),
    Component = _require.Component;

var mixin = __webpack_require__(15);

function globalMixin(obj) {
    mixin(Component.prototype, obj);
}

module.exports = globalMixin;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Simple utility function to add a new property to an existing object path.  Examples:
 *
 * - getPath('obj.nested', 'prop') => 'obj.nested.prop'
 * - getPath('', 'prop') => 'prop'
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function getPath(path, prop) {
    if (path.length !== 0) return path + "." + prop;else return prop;
}

module.exports = function () {
    function _create(target, validator, manipulator, path, lastInPath) {
        // Keeps track of the proxies we've already made so that we don't have to recreate any.
        var proxies = {};

        var proxyHandler = {
            get: function get(target, prop) {
                // Special properties
                if (prop === '__target') return target;
                if (prop === '__isProxy') return true;
                // Cache target[prop] for performance
                var value = target[prop];
                // Functions
                if (typeof value === 'function') {
                    return function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        if (validator({
                            currentPath: path,
                            property: lastInPath,
                            target: target,
                            type: 'function',
                            function: prop,
                            arguments: args
                        })) {
                            // If `this` is a proxy, be sure to apply to __target instead
                            return value.apply(this.__isProxy ? this.__target : this, args);
                        }
                    };
                } // Objects
                else if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object' && value !== null && target.hasOwnProperty(prop)) {
                        // Return existing proxy if we have one, otherwise create a new one
                        var existingProxy = proxies[prop];
                        if (existingProxy && existingProxy.__target === value) {
                            return existingProxy;
                        } else {
                            var proxy = _create(value, validator, manipulator, getPath(path, prop), prop);
                            proxies[prop] = proxy;
                            return proxy;
                        }
                    }
                    // All else
                    else {
                            return value;
                        }
            },
            set: function set(target, prop, value) {

                var previousValue = target[prop];
                var currentPath = getPath(path, prop);

                if (typeof manipulator === 'function') {
                    value = manipulator(value, prop, currentPath);
                }

                if (validator({
                    currentPath: currentPath,
                    target: target,
                    type: previousValue === undefined ? 'add' : 'update',
                    property: prop,
                    newValue: value,
                    previousValue: previousValue
                })) {
                    target[prop] = value;
                }
                return true;
            },
            deleteProperty: function deleteProperty(target, prop) {

                var previousValue = target[prop];

                if (validator({
                    currentPath: getPath(path, prop),
                    target: target,
                    type: 'delete',
                    property: prop,
                    newValue: null,
                    previousValue: previousValue
                })) {
                    delete target[prop];
                }
                return true;
            }
        };
        return new Proxy(target, proxyHandler);
    }
    return {
        create: function create(target, validator, manipulator) {
            return _create(target, validator, manipulator, '', '');
        }
    };
}();

/***/ })
/******/ ]);
}); 