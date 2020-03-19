/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/front-end/accordion.js":
/*!***************************************!*\
  !*** ./src/js/front-end/accordion.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\n//toggle function\nvar toggle = function toggle(e) {\n  var clicked = e;\n  var width = document.body.clientWidth;\n\n  var checkClassName = function checkClassName(el, term) {\n    return el.classList && _toConsumableArray(el.classList).includes(term);\n  };\n\n  var getCurrDisplay = function getCurrDisplay(el) {\n    return window.getComputedStyle(el).getPropertyValue('display');\n  };\n\n  switch (true) {\n    case checkClassName(clicked, 'accordion__heading--footer'):\n      // specifically footer accordion\n      document.querySelectorAll('.accordion__heading--footer').forEach(function (el) {\n        var contentId = el.getAttribute('aria-controls');\n        var icons = el.querySelectorAll('.accordion__icon');\n        var plusIcon = el.querySelector('.accordion__icon__plus');\n        var minusIcon = el.querySelector('.accordion__icon__minus');\n        var content = document.querySelector('#' + contentId);\n        var currAttr = getCurrDisplay(content);\n\n        if (el.getAttribute('aria-expanded') && el !== clicked) {\n          el.setAttribute('aria-expanded', 'false');\n\n          if (content.getAttribute('state-animating') === null) {\n            hideFooter(minusIcon);\n            showFooter(plusIcon);\n            content.style.height = 0;\n            hideFooter(content);\n            content.setAttribute('state-animating', 'true');\n            setTimeout(function () {\n              hideFooter(content);\n              content.removeAttribute('state-animating');\n            }, 200);\n          }\n        } else if (el === clicked) {\n          var _expanded = clicked.getAttribute('aria-expanded') === \"false\" ? true : false;\n\n          clicked.setAttribute('aria-expanded', _expanded);\n\n          if (currAttr && currAttr !== 'none' && content.getAttribute('state-animating') === null) {\n            icons.forEach(function (icon) {\n              swapIcon(icon);\n            });\n            content.style.height = 0;\n            content.setAttribute('state-animating', 'true');\n            setTimeout(function () {\n              hideFooter(content);\n              content.removeAttribute('state-animating');\n            }, 200);\n          } else if (content.getAttribute('state-animating') === null) {\n            icons.forEach(function (icon) {\n              swapIcon(icon);\n            });\n            showFooter(content);\n            content.setAttribute('state-animating', 'true');\n            setTimeout(function () {\n              content.removeAttribute('state-animating');\n            }, 200);\n            content.style.height = content.scrollHeight + \"px\";\n          }\n        }\n      });\n      break;\n\n    case checkClassName(clicked, 'accordion__heading'):\n      // accordion\n      var contentId = clicked.getAttribute('aria-controls');\n      var icons = clicked.querySelectorAll('.accordion__icon');\n      var content = document.querySelector('#' + contentId);\n      var currAttr = getCurrDisplay(content);\n      var expanded = clicked.getAttribute('aria-expanded') === \"false\" ? true : false;\n      clicked.setAttribute('aria-expanded', expanded);\n\n      if (currAttr && currAttr !== 'none' && content.getAttribute('state-animating') === null) {\n        icons.forEach(function (icon) {\n          swapIcon(icon);\n        });\n        content.style.height = 0;\n        content.setAttribute('state-animating', 'true');\n        setTimeout(function () {\n          hideFooter(content);\n          content.removeAttribute('state-animating');\n        }, 200);\n      } else if (content.getAttribute('state-animating') === null) {\n        icons.forEach(function (icon) {\n          swapIcon(icon);\n        });\n        showFooter(content);\n        content.setAttribute('state-animating', 'true');\n        setTimeout(function () {\n          content.removeAttribute('state-animating');\n          content.style.height = 'auto';\n        }, 200);\n        content.style.height = content.scrollHeight + \"px\";\n      }\n\n      break;\n  }\n}; // Hide an element\n\n\nvar hide = function hide(elem) {\n  var toggler = elem.previousElementSibling;\n  if (toggler) toggler.setAttribute('aria-expanded', 'false');\n  elem.classList.add('hide');\n  elem.classList.remove('show');\n}; // show an element\n\n\nvar show = function show(elem) {\n  var toggler = elem.previousElementSibling;\n  if (toggler) toggler.setAttribute('aria-expanded', 'true');\n  elem.classList.add('show');\n  elem.classList.remove('hide');\n}; // Hide an footer element\n\n\nvar hideFooter = function hideFooter(elem) {\n  if (elem.classList) {\n    elem.classList.add('hide');\n    elem.classList.remove('show');\n  } else if (elem.nodeName === \"svg\") {\n    if (elem.getAttribute('class').indexOf('hide') <= -1) {\n      elem.setAttribute('class', elem.getAttribute('class') + ' hide');\n    } else if (elem.getAttribute('class').indexOf('show') > -1) {\n      elem.setAttribute('class', elem.getAttribute('class').replace('show', ''));\n    }\n  }\n}; // show an footer element\n\n\nvar showFooter = function showFooter(elem) {\n  if (elem.classList) {\n    elem.classList.add('show');\n    elem.classList.remove('hide');\n  } else if (elem.nodeName === \"svg\") {\n    if (elem.getAttribute('class').indexOf('show') <= -1) {\n      elem.setAttribute('class', elem.getAttribute('class') + ' show');\n    }\n\n    if (elem.getAttribute('class').indexOf('hide') > -1) {\n      elem.setAttribute('class', elem.getAttribute('class').replace('hide', ''));\n    }\n  }\n}; //Reset visibility\n\n\nvar resetStyles = function resetStyles(elems) {\n  var _iteratorNormalCompletion = true;\n  var _didIteratorError = false;\n  var _iteratorError = undefined;\n\n  try {\n    for (var _iterator = elems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n      var elem = _step.value;\n      if (_toConsumableArray(elem.classList).includes('dropdown-button')) elem.setAttribute('aria-expanded', 'false');\n      elem.classList.remove('hide', 'show', 'selected');\n      var relatedMenu = elem.nextElementSibling;\n      if (relatedMenu) relatedMenu.classList.remove('hide', 'show', 'selected');\n      elem.removeAttribute('style');\n    }\n  } catch (err) {\n    _didIteratorError = true;\n    _iteratorError = err;\n  } finally {\n    try {\n      if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n        _iterator[\"return\"]();\n      }\n    } finally {\n      if (_didIteratorError) {\n        throw _iteratorError;\n      }\n    }\n  }\n}; //Change element display\n\n\nvar swapIcon = function swapIcon(el) {\n  var currAttr = window.getComputedStyle(el).getPropertyValue('display');\n\n  if (currAttr && currAttr !== 'none') {\n    hideFooter(el);\n  } else {\n    showFooter(el);\n  }\n}; //Collapse footer  and show icon at the beginning on small screen\n\n\nvar width = document.body.clientWidth;\ndocument.querySelectorAll('.accordion__heading--footer').forEach(function (el) {\n  if (width < 768) {\n    el.setAttribute('aria-expanded', false);\n    el.setAttribute('aria-disabled', false);\n  }\n});\ndocument.querySelectorAll('.accordion__content--footer').forEach(function (el) {\n  if (width < 768) {\n    hideFooter(el);\n  }\n});\ndocument.querySelectorAll('.accordion__heading--footer>.accordion__icon__plus').forEach(function (el) {\n  if (width < 768) {\n    showFooter(el);\n  }\n});\ndocument.querySelectorAll('.accordion__heading--footer>.accordion__icon__minus').forEach(function (el) {\n  if (width < 768) {\n    hideFooter(el);\n  }\n});\n[].concat(_toConsumableArray(document.querySelectorAll('.header__mainNav-dropDownInner')), _toConsumableArray(document.querySelectorAll('.header__mainNav-dropDownOuter'))).forEach(function (el) {\n  if (width < 768) {\n    hide(el);\n  }\n});\n\nvar assignListeners = function assignListeners() {\n  document.addEventListener('click', function (event) {\n    var e = event.target;\n\n    if (e.classList && e.classList.contains('accordion__heading--footer')) {\n      var _width = document.body.clientWidth;\n\n      if (_width <= 768) {\n        toggle(e);\n      }\n    } else if (e.classList && e.classList.contains('accordion__heading')) {\n      toggle(e);\n    }\n  });\n}; //Reset\n\n\nwindow.addEventListener('resize', function () {\n  var width = document.body.clientWidth;\n  document.querySelectorAll('.accordion__heading--footer').forEach(function (el) {\n    var content = document.querySelector('#' + el.getAttribute('aria-controls'));\n    var icons = el.querySelectorAll('.accordion__icon');\n    var currAttr = window.getComputedStyle(content).getPropertyValue('display');\n\n    if (width >= 768) {\n      el.setAttribute('aria-expanded', true);\n      el.setAttribute('aria-disabled', true);\n      icons.forEach(function (el) {\n        if (el.getAttribute('class').indexOf('hide') > -1) {\n          el.setAttribute('class', el.getAttribute('class').replace('hide', ''));\n        }\n\n        if (el.getAttribute('class').indexOf('show') > -1) {\n          el.setAttribute('class', el.getAttribute('class').replace('show', ''));\n        }\n      });\n      content.classList.remove('hide', 'show');\n      content.removeAttribute('style');\n    } else if (currAttr !== \"none\") {\n      el.setAttribute('aria-expanded', true);\n      el.setAttribute('aria-disabled', false);\n    } else {\n      el.setAttribute('aria-expanded', false);\n      el.setAttribute('aria-disabled', false);\n    }\n  });\n});\nassignListeners();\n\n//# sourceURL=webpack:///./src/js/front-end/accordion.js?");

/***/ }),

/***/ "./src/js/front-end/app.js":
/*!*********************************!*\
  !*** ./src/js/front-end/app.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _navigation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./navigation.js */ \"./src/js/front-end/navigation.js\");\n/* harmony import */ var _navigation_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_navigation_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _accordion_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./accordion.js */ \"./src/js/front-end/accordion.js\");\n/* harmony import */ var _accordion_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_accordion_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _skip_link_focus_fix_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./skip-link-focus-fix.js */ \"./src/js/front-end/skip-link-focus-fix.js\");\n/* harmony import */ var _skip_link_focus_fix_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_skip_link_focus_fix_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _hideAjaxLoadMoreButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hideAjaxLoadMoreButton */ \"./src/js/front-end/hideAjaxLoadMoreButton.js\");\n/* harmony import */ var _hideAjaxLoadMoreButton__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_hideAjaxLoadMoreButton__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _google_graph_spacing_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./google-graph-spacing.js */ \"./src/js/front-end/google-graph-spacing.js\");\n/* harmony import */ var _google_graph_spacing_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_google_graph_spacing_js__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/js/front-end/app.js?");

/***/ }),

/***/ "./src/js/front-end/google-graph-spacing.js":
/*!**************************************************!*\
  !*** ./src/js/front-end/google-graph-spacing.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("if (typeof wpDataCharts !== 'undefined') {\n  Object.keys(wpDataCharts).map(function (i) {\n    // set better sizing for all charts\n    wpDataCharts[i].render_data.options.chartArea.width = \"70%\";\n    wpDataCharts[i].render_data.options.chartArea.height = \"85%\";\n    wpDataCharts[i].render_data.options.chartArea.top = \"0\"; // set available colors for pie chart\n\n    if (wpDataCharts[i].render_data.type === 'google_pie_chart') {\n      wpDataCharts[i].render_data.options.colors = ['#DAAA00', '#6F727B', '#C4BFC0', '#EBD99F', '#FFFFFF', '#AA864B', '#827839'];\n      wpDataCharts[i].render_data.options.pieSliceTextStyle = {\n        color: 'black'\n      }; // wpDataCharts[i].render_data.options.slices = {4: {textStyle: {color: 'black'}}}\n\n      wpDataCharts[i].render_data.options.pieSliceBorderColor = '';\n    }\n  });\n}\n\n//# sourceURL=webpack:///./src/js/front-end/google-graph-spacing.js?");

/***/ }),

/***/ "./src/js/front-end/hideAjaxLoadMoreButton.js":
/*!****************************************************!*\
  !*** ./src/js/front-end/hideAjaxLoadMoreButton.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\nwindow.almDone = function () {\n  _toConsumableArray(document.querySelectorAll('.alm-btn-wrap')).forEach(function (el) {\n    el.style.display = \"none\";\n  });\n};\n\nwindow.almDone();\n\n//# sourceURL=webpack:///./src/js/front-end/hideAjaxLoadMoreButton.js?");

/***/ }),

/***/ "./src/js/front-end/navigation.js":
/*!****************************************!*\
  !*** ./src/js/front-end/navigation.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("document.addEventListener('DOMContentLoaded', function () {\n  // Get all \"navbar-burger\" elements\n  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);\n  var $aside = document.querySelector('.side-nav'); // Check if there are any navbar burgers\n\n  if ($navbarBurgers.length > 0) {\n    // Add a click event on each of them\n    $navbarBurgers.forEach(function (el) {\n      el.addEventListener('click', function () {\n        // Get the target from the \"data-target\" attribute\n        var target = el.dataset.target;\n        var $target = Array.prototype.slice.call(document.querySelectorAll(target), 0);\n        var $navBar = document.querySelector('.purdue-navbar-white');\n        var $button = document.querySelector('.purdue-navbar-black>.navbar-end');\n        var expanded = el.getAttribute('aria-expanded') === \"false\" ? true : false;\n        el.setAttribute('aria-expanded', expanded); // Toggle the \"is-active\" class on both the \"navbar-burger\" and the \"navbar-menu\"\n\n        el.classList.toggle('is-active');\n\n        if ($aside) {\n          $aside.classList.toggle('is-active');\n        }\n\n        $target.forEach(function (t) {\n          return t.classList.toggle('is-active');\n        });\n\n        if ($navBar) {\n          $navBar.classList.toggle('is-active');\n        }\n\n        if ($button) {\n          $button.classList.toggle('is-active');\n        }\n      });\n    });\n  }\n\n  var width = document.body.clientWidth;\n  var dropdowns = Array.prototype.slice.call(document.querySelectorAll('.navbar-dropdown'), 0);\n  dropdowns.forEach(function (el) {\n    var subDropdowns = Array.prototype.slice.call(el.querySelectorAll('.submenu'), 0);\n\n    if (width < 1023 && el.style.display !== \"none\" && subDropdowns.lenght > 0) {\n      subDropdowns.forEach(function (e) {\n        Array.prototype.slice.call(e.querySelectorAll('.navbar-dropdown-submenu'), 0).style.display = \"block\";\n      });\n    }\n  }); // sidenav\n  // on page load open current dropdown\n\n  var $currentpage = window.location.href;\n\n  if ($aside) {\n    var $sidenav = $aside.querySelector('.navbar-menu'); //top level menu\n\n    var $navbar_topitems = Array.prototype.slice.call($sidenav.querySelectorAll('.navbar-item:not(.submenu)'), 0); //submenu\n\n    var $navbar_subitems = Array.prototype.slice.call($sidenav.querySelectorAll('.submenu'), 0);\n\n    if ($navbar_topitems.length > 0) {\n      $navbar_topitems.forEach(function (el) {\n        var $href = el.firstChild.getAttribute('href');\n\n        if ($href === $currentpage) {\n          el.classList.add('active');\n\n          if (el.classList.contains('has-dropdown')) {\n            var $dropdown_link = el.querySelector('.navbar-link');\n            var $dropdown_content = el.querySelector('.navbar-dropdown');\n            $dropdown_link.classList.add('navbar-link-open');\n            $dropdown_content.classList.add('is-active');\n          }\n        }\n      });\n    }\n\n    if ($navbar_subitems.length > 0) {\n      $navbar_subitems.forEach(function (el) {\n        var $href = el.firstChild.getAttribute('href');\n\n        if ($currentpage.includes($href)) {\n          el.classList.add('active');\n          el.parentElement.parentElement.classList.add('active');\n          el.parentElement.parentElement.firstChild.classList.add('navbar-link-open');\n          el.parentElement.classList.add('is-active');\n        }\n\n        el.addEventListener('click', function (e) {\n          var clicked = e.target;\n          $navbar_subitems.forEach(function (ea) {\n            if (ea !== clicked) {\n              ea.classList.remove('active');\n            }\n          });\n          el.classList.add('active');\n\n          if (width <= 1024) {\n            // close menu dropdown\n            $navbarBurgers.forEach(function (el) {\n              // Get the target from the \"data-target\" attribute\n              var target = el.dataset.target;\n              var $target = Array.prototype.slice.call(document.querySelectorAll(target), 0);\n              var expanded = el.getAttribute('aria-expanded') === \"false\" ? true : false;\n              el.setAttribute('aria-expanded', expanded); // Toggle the \"is-active\" class on both the \"navbar-burger\" and the \"navbar-menu\"\n\n              el.classList.toggle('is-active');\n\n              if ($aside) {\n                $aside.classList.toggle('is-active');\n              }\n\n              $target.forEach(function (t) {\n                return t.classList.toggle('is-active');\n              });\n            });\n          }\n        });\n      });\n    } //on click open drop down\n\n\n    var $outerSideDropdowns = Array.prototype.slice.call($sidenav.querySelectorAll('.has-dropdown:not(.submenu)'), 0);\n\n    if ($outerSideDropdowns.length > 0) {\n      $outerSideDropdowns.forEach(function (el) {\n        var $dropdown_link = el.querySelector('.navbar-link');\n        var $dropdown_content = el.querySelector('.navbar-dropdown');\n        $dropdown_link.addEventListener('click', function () {\n          event.preventDefault();\n          $dropdown_link.classList.toggle('navbar-link-open');\n          var expanded = el.getAttribute('aria-expanded') === \"true\" ? false : true;\n          el.setAttribute('aria-expanded', expanded);\n          $dropdown_content.classList.toggle('is-active');\n          $dropdown_content.style.height = $dropdown_content.scrollHeight + \"px\";\n          window.location.href = $dropdown_link.href;\n        });\n      });\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/js/front-end/navigation.js?");

/***/ }),

/***/ "./src/js/front-end/skip-link-focus-fix.js":
/*!*************************************************!*\
  !*** ./src/js/front-end/skip-link-focus-fix.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * File skip-link-focus-fix.js.\n *\n * Helps with accessibility for keyboard only users.\n *\n * Learn more: https://git.io/vWdr2\n */\n(function () {\n  var isIe = /(trident|msie)/i.test(navigator.userAgent);\n\n  if (isIe && document.getElementById && window.addEventListener) {\n    window.addEventListener('hashchange', function () {\n      var id = location.hash.substring(1),\n          element;\n\n      if (!/^[A-z0-9_-]+$/.test(id)) {\n        return;\n      }\n\n      element = document.getElementById(id);\n\n      if (element) {\n        if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {\n          element.tabIndex = -1;\n        }\n\n        element.focus();\n      }\n    }, false);\n  }\n})();\n\n//# sourceURL=webpack:///./src/js/front-end/skip-link-focus-fix.js?");

/***/ }),

/***/ "./src/style/front-end/app.scss":
/*!**************************************!*\
  !*** ./src/style/front-end/app.scss ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/style/front-end/app.scss?");

/***/ }),

/***/ 0:
/*!**********************************************************************!*\
  !*** multi ./src/js/front-end/app.js ./src/style/front-end/app.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./src/js/front-end/app.js */\"./src/js/front-end/app.js\");\nmodule.exports = __webpack_require__(/*! ./src/style/front-end/app.scss */\"./src/style/front-end/app.scss\");\n\n\n//# sourceURL=webpack:///multi_./src/js/front-end/app.js_./src/style/front-end/app.scss?");

/***/ })

/******/ });