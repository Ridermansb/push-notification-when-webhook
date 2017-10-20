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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 169);
/******/ })
/************************************************************************/
/******/ ({

/***/ 169:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nself.addEventListener('push', function (event) {\n    var notificationData = event.data.json();\n\n    event.waitUntil(self.registration.showNotification(notificationData.title, {\n        body: notificationData.body,\n        icon: notificationData.icon,\n        tag: notificationData.tag\n    }));\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTY5LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9zdy5qcz9hYTUwIl0sInNvdXJjZXNDb250ZW50IjpbInNlbGYuYWRkRXZlbnRMaXN0ZW5lcigncHVzaCcsIChldmVudCkgPT4ge1xuICAgIGNvbnN0IG5vdGlmaWNhdGlvbkRhdGEgPSBldmVudC5kYXRhLmpzb24oKTtcblxuICAgIGV2ZW50LndhaXRVbnRpbChcbiAgICAgICAgc2VsZi5yZWdpc3RyYXRpb24uc2hvd05vdGlmaWNhdGlvbihub3RpZmljYXRpb25EYXRhLnRpdGxlLCB7XG4gICAgICAgICAgICBib2R5OiBub3RpZmljYXRpb25EYXRhLmJvZHksXG4gICAgICAgICAgICBpY29uOiBub3RpZmljYXRpb25EYXRhLmljb24sXG4gICAgICAgICAgICB0YWc6IG5vdGlmaWNhdGlvbkRhdGEudGFnLFxuICAgICAgICB9KSxcbiAgICApO1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9zdy5qcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUhBO0FBTUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///169\n");

/***/ })

/******/ });