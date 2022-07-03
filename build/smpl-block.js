/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./Admin/js/block/utilities.js":
/*!*************************************!*\
  !*** ./Admin/js/block/utilities.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
/**
 * Post data method.
 * @param {url} url api url
 * @param {method} method request type
 * @returns
 */
const postData = async function () {
  let url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  let data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // Default options are marked with *
  const response = await fetch(url, {
    headers: {// 'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'same-origin',
    method: 'POST',
    // *GET, POST, PUT, DELETE, etc.
    body: data // body data type must match "Content-Type" header

  });
  const responseData = await response.json(); // parses JSON response into native JavaScript objects

  return responseData;
};

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************************!*\
  !*** ./Admin/js/smpl-block.js ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _block_utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block/utilities */ "./Admin/js/block/utilities.js");




wp.blocks.registerBlockType('smpl/shortcode', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Smple poll'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('This is simple poll discription.'),
  icon: 'businessperson',
  category: 'design',
  attributes: {
    companyName: {
      type: 'string'
    },
    companyPhone: {
      type: 'string'
    },
    companyContact: {
      type: 'string'
    },
    companyAddress: {
      type: 'string'
    },
    companyCity: {
      type: 'string'
    }
  },
  edit: simplePoll,
  save: function (props) {
    return null;
  }
});

function simplePoll(props) {
  const [poll, setPollData] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)({
    id: '',
    question: 'Sample Question?',
    answers: [{
      smpl_answers: 'yes'
    }, {
      smpl_answers: 'no'
    }],
    totalvotes: '0'
  });
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    let form = new FormData();
    form.append('nonce', smpl_block.nonce);
    form.append('action', 'get_last_poll');
    (0,_block_utilities__WEBPACK_IMPORTED_MODULE_3__.postData)(smpl_block.ajax_url, form).then(res => {
      if (res.data) {
        console.log(smpl_block);
        setPollData(res.data[0]);
      }
    });
  }, []);

  const submitVote = (e, answer_id, question_id) => {
    let form = new FormData();
    form.append('nonce', smpl_block.nonce);
    form.append('smpl_qid', question_id);
    form.append('smpl_aid', answer_id);
    form.append('action', 'give_vote');
    (0,_block_utilities__WEBPACK_IMPORTED_MODULE_3__.postData)(smpl_block.ajax_url, form).then(res => {
      console.log(res.data); // if (res.data) {
      // 	console.log(smpl_block);
      // 	setPollData(res.data[0]);
      // }
    });
  };

  function updateCompanyPhone(e) {
    props.setAttributes({
      companyPhone: e.target.value
    });
  }

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "makeUpYourBlockTypeName"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, poll.question), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "poll_answers"
  }, poll.answers.length && poll.answers.map(answer => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "radio",
      name: "smpl_answers",
      value: answer.smpl_answers,
      onClick: e => submitVote(e, answer.smpl_aid, answer.smpl_qid)
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      htmlFor: answer.smpl_answers
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(answer.smpl_answers)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null));
  })));
}
})();

/******/ })()
;
//# sourceMappingURL=smpl-block.js.map