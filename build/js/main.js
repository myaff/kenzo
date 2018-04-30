var Main =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/kenzo/build/js/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var DeviceDetection = __webpack_require__(1);
	var Helpers = __webpack_require__(2);
	var Input = __webpack_require__(3);
	var Form = __webpack_require__(4);
	var Modal = __webpack_require__(5);
	var Accordion = __webpack_require__(6);
	var Tabs = __webpack_require__(7);
	var MainMenu = __webpack_require__(8);
	var Video = __webpack_require__(9);

	$(document).ready(function () {

	  DeviceDetection.run();
	  Helpers.init();
	  Input.init();
	  Form.init();
	  Modal.init();
	  Accordion.init();
	  Tabs.init();
	  //MainMenu.init();
	  Video.init();
	});

	/**
	 * Список экспортируемых модулей, чтобы иметь к ним доступ извне
	 * @example
	 * Main.Form.isFormValid();
	 */
	module.exports = {
	  DeviceDetection: DeviceDetection,
	  Helpers: Helpers,
	  Input: Input,
	  Form: Form,
	  Modal: Modal,
	  Accordion: Accordion,
	  Tabs: Tabs,
	  MainMenu: MainMenu,
	  Video: Video
		};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	var breakpoints = {
	  sm: 767,
	  md: 1024,
	  lg: 1280,
	  xl: 1600
	};

	function isMobile() {
	  return $(window).width() <= breakpoints.sm;
	}
	function isTablet() {
	  return $(window).width() > breakpoints.sm && $(window).width() <= breakpoints.md;
	}
	function isTouch() {
	  return 'ontouchstart' in window || navigator.maxTouchPoints;
	}
	function isMobileVersion() {
	  return !!~window.location.href.indexOf("/mobile/");
	}

	function run() {
	  if (isTouch()) {
	    $('html').removeClass('no-touch').addClass('touch');
	  } else {
	    $('html').removeClass('touch').addClass('no-touch');
	  }
	}

	module.exports = { run: run, isTouch: isTouch, isMobile: isMobile, isTablet: isTablet, isMobileVersion: isMobileVersion };

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Helpers
	 * @module Helpers
	 */

	/**
	 * Calculate scrollbar width in element
	 * - if the width is 0 it means the scrollbar is floated/overlayed
	 * - accepts "container" paremeter because ie & edge can have different
	 *   scrollbar behaviors for different elements using '-ms-overflow-style'
	 */
	function getNativeScrollbarWidth(container) {
	  container = container || document.body;

	  var fullWidth = 0;
	  var barWidth = 0;

	  var wrapper = document.createElement('div');
	  var child = document.createElement('div');

	  wrapper.style.position = 'absolute';
	  wrapper.style.pointerEvents = 'none';
	  wrapper.style.bottom = '0';
	  wrapper.style.right = '0';
	  wrapper.style.width = '100px';
	  wrapper.style.overflow = 'hidden';

	  wrapper.appendChild(child);
	  container.appendChild(wrapper);

	  fullWidth = child.offsetWidth;
	  wrapper.style.overflowY = 'scroll';
	  barWidth = fullWidth - child.offsetWidth;

	  container.removeChild(wrapper);

	  return barWidth;
	}

	/**
	 * Throttle Helper
	 * https://remysharp.com/2010/07/21/throttling-function-calls
	 */
	function throttle(fn, threshhold, scope) {
	  threshhold || (threshhold = 250);
	  var last = void 0,
	      deferTimer = void 0;
	  return function () {
	    var context = scope || this;

	    var now = +new Date(),
	        args = arguments;
	    if (last && now < last + threshhold) {
	      // hold on to it
	      clearTimeout(deferTimer);
	      deferTimer = setTimeout(function () {
	        last = now;
	        fn.apply(context, args);
	      }, threshhold);
	    } else {
	      last = now;
	      fn.apply(context, args);
	    }
	  };
	}

	/** 
	 * Debounce Helper
	 * https://remysharp.com/2010/07/21/throttling-function-calls
	 */
	function debounce(fn, delay) {
	  var timer = null;
	  return function () {
	    var context = this,
	        args = arguments;
	    clearTimeout(timer);
	    timer = setTimeout(function () {
	      fn.apply(context, args);
	    }, delay);
	  };
	};

	var timer = void 0;
	var timeout = false;
	var delta = 200;
	function resizeEnd() {
	  if (new Date() - timer < delta) {
	    setTimeout(resizeEnd, delta);
	  } else {
	    timeout = false;
	    $(window).trigger('resizeend');
	  }
	}

	function toggleClassIf(el, cond, toggledClass) {
	  if (cond) {
	    el.addClass(toggledClass);
	  } else {
	    el.removeClass(toggledClass);
	  }
	}

	/**
	 * Функция добавляет к элементу класс, если страница прокручена больше, чем на указанное значение, 
	 * и убирает класс, если значение меньше
	 * @param {object} el - элемент, с которым взаимодействуем
	 * @param {mixed} [scrollValue=0] - значение прокрутки, на котором меняем css-класс, ожидаемое значение - число или ключевое слово 'this'. Если передано 'this', подставляется положение el.offset().top минус половина высоты экрана
	 * @param {string} [toggledClass=scrolled] - css-класс, который переключаем
	 */
	function toggleElementClassOnScroll(el) {
	  var scrollValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  var toggledClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'scrolled';

	  if (el.length == 0) {
	    //console.error("Необходимо передать объект, с которым вы хотите взаимодействовать");
	    return false;
	  }

	  if (scrollValue == 'this') {
	    scrollValue = el.offset().top - $(window).outerHeight() / 2;
	  }

	  $(window).on('scroll', function (e) {
	    if ($(window).scrollTop() > scrollValue) {
	      el.addClass(toggledClass);
	    } else {
	      el.removeClass(toggledClass);
	    }
	  });
	};

	/**
	 * инициализация событий для переключателей классов
	 * @example
	 * Helpers.init();
	 */
	function init() {

	  toggleElementClassOnScroll($('.header'), 50);

	  $('.js-hide-block').on('click', function () {
	    var block = $(this).data('target') === 'self' ? $(this).parent() : $(this).data('target');
	    block.fadeOut(500);
	  });

	  $(window).on('resize', function () {
	    timer = new Date();
	    if (timeout === false) {
	      timeout = true;
	      setTimeout(resizeEnd, delta);
	    }
	  });

	  $('.btn-menu').on('click', function () {
	    $(this).toggleClass('is-open');
	    $('.header').toggleClass('is-open');
	    $('.main-nav').slideToggle(500);
	    if (Main.DeviceDetection.isMobileVersion()) {
	      if ($('.header').hasClass('is-open')) {
	        console.log('is-open');
	        $('html, body').css('overflow-y', 'hidden');
	      } else {
	        $('html, body').css('overflow-y', '');
	      }
	    }
	  });
	}

	module.exports = { init: init, toggleClassIf: toggleClassIf, toggleElementClassOnScroll: toggleElementClassOnScroll };

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Модуль для работы placeholder в элементах формы (.field)
	 * @module Input
	 */

	/**
	 * Установить фокус
	 * @private
	 * @param {object} input
	 */
	function focusLabel(input) {
	    input.closest('.field').addClass("has-focus");
	}

	/**
	 * Убрать фокус
	 * @private
	 * @param {object} input
	 */
	function blurLabel(input) {
	    var wrapper = input.closest('.field');
	    wrapper.removeClass("has-focus");
	}

	/**
	 * Проверить инпут на наличие value
	 * @private
	 * @param {object} input
	 */
	function checkInput(input) {
	    var wrapper = input.closest('.field');
	    if (input.val().length > 0) wrapper.addClass("has-value");else wrapper.removeClass("has-value");
	}

	/**
	 * инициализация событий для инпута
	 * @example
	 * Input.init();
	 */
	function init() {
	    var inputs = $('.field__input');
	    var placeholders = $('.field__placeholder');

	    placeholders.click(function () {
	        $(this).closest('.field').find('.field__input').focus();
	    });

	    inputs.each(function (i, item) {
	        checkInput($(item));
	    });

	    inputs.focus(function () {
	        focusLabel($(this));
	    });

	    inputs.blur(function () {
	        blurLabel($(this));
	        checkInput($(this));
	    });
	}

	module.exports = { init: init };

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Модуль для работы Форм
	 * @module Form
	 */

	function validateField(field) {
	  var isValid = field.validity.valid;
	  var fieldContainer = $(field).closest('.field');
	  if (isValid) {
	    fieldContainer.removeClass('has-error');
	  } else {
	    fieldContainer.addClass('has-error');
	  }
	  return isValid;
	}

	function validateForm(elForm) {
	  var errors = 0;
	  Array.from(elForm.elements).forEach(function (item) {
	    var isValidField = validateField(item);
	    if (!isValidField) {
	      errors += 1;
	    }
	  });
	  return errors;
	}

	/**
	 * инициализация событий форм
	 * @example
	 * Form.init();
	 */
	function init() {
	  var jsForm = $('.js-form');

	  $('input, textarea').on('change', function () {
	    validateField(this);
	  });

	  jsForm.each(function () {
	    var self = $(this);
	    var selfForm = self.find('.js-form-form');
	    var selfResult = self.find('.js-form-result');
	    var selfSubmit = self.find('.js-form-submit');

	    selfSubmit.on('click', function (e) {
	      e.preventDefault();
	      var hasError = validateForm(selfForm[0]);
	      if (!hasError) {
	        var request = $.ajax({
	          url: 'http://loccitane.hsmp.ru/api/emails/',
	          type: 'POST',
	          dataType: 'json',
	          data: {
	            'name': $(selfForm).find('input[name="name"]').val(),
	            'email': $(selfForm).find('input[name="email"]').val(),
	            'message': $(selfForm).find('textarea[name="message"]').val(),
	            'page': window.location.href
	          },
	          beforeSend: function beforeSend() {
	            selfSubmit.attr('disabled', 'disabled');
	          }
	        });
	        request.done(function (response, textStatus, jqXHR) {
	          self.addClass('is-submitted');
	          self.trigger('submitted');
	          setTimeout(function () {
	            selfResult.show();
	          }, 300);
	        });
	      }
	    });
	  });
	}

	module.exports = { init: init };

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Всплывающие окна
	 * @module Modal
	 */

	var layout = $('.layout');
	var wrapper = $('.modal__wrapper');

	function openModal(target) {
	  var modal = $(target);
	  if (!layout.hasClass('modal-open')) {
	    layout.addClass('modal-open');
	    $('html, body').css('overflow-y', 'hidden');
	    wrapper.fadeIn(300).addClass('modal-open');
	  } else {
	    closePrevModals(target);
	  }
	  modal.fadeIn(300).addClass('is-open');
	  modal.trigger('opened');
	}

	function closeModal(target) {
	  var modal = $(target);
	  modal.fadeOut(300).removeClass('is-open');
	  wrapper.fadeOut(300).removeClass('is-open');
	  layout.removeClass('modal-open');
	  $('html, body').css('overflow-y', '');
	  modal.trigger('closed');
	}

	function closePrevModals(target) {
	  var modal = $(target);
	  modal.siblings('.modal.is-open').fadeOut(300).removeClass('is-open').trigger('closed');
	}

	/**
	 * инициализация событий для всплывающих окон
	 * @example
	 * Modal.init();
	 */
	function init() {

	  $('.js-modal').on('click', function (e) {
	    e.preventDefault();
	    var target = $(this).data('target');
	    if (!$(target).hasClass('is-open')) {
	      openModal(target);
	    } else {
	      closeModal(target);
	    }
	  });

	  $('.btn-close-modal').on('click', function (e) {
	    e.preventDefault();
	    var modal = $(this).closest('.modal');
	    closeModal(modal);
	  });

	  $('.modal__wrapper').on('click', function (e) {
	    closeModal('.modal');
	  });
	  $('.modal').on('click', function (e) {
	    e.stopPropagation();
	  });

	  $('.modal--video').on('opened', function () {
	    $(this).find('.js-modal-video')[0].play();
	  });
	}

	module.exports = { init: init, openModal: openModal, closeModal: closeModal };

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Accordion
	 * @module Accordion
	 */

	function openAccordion(accordion) {
	  var accordionContent = accordion.find('.accordion__body').eq(0);
	  accordion.addClass('is-open');
	  accordionContent.slideDown(500);
	  accordion.trigger('opened');
	}
	function closeAccordion(accordion) {
	  var accordionContent = accordion.find('.accordion__body').eq(0);

	  accordion.removeClass('is-open');
	  accordionContent.slideUp(500);
	  accordion.trigger('closed');
	}

	function init() {
	  // initial
	  $('.accordion.is-open').each(function () {
	    openAccordion($(this));
	  });

	  // action
	  $('.accordion').on('click', '.accordion__header', function () {
	    var accordion = $(this).closest('.accordion');
	    if (accordion.hasClass('is-open')) {
	      closeAccordion(accordion);
	    } else {
	      openAccordion(accordion);
	    }
	  });
	}

	module.exports = { init: init };

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Tabs
	 * @module Tabs
	 */

	function openTab(tab) {
	  tab.addClass('is-active');
	  var target = $(tab.data('target'));
	  target.toggleClass('is-active').slideDown(500);
	  target.trigger('opened');
	}
	function closeTab(tab) {
	  var target = $(tab.data('target'));
	  tab.removeClass('is-active');
	  target.removeClass('is-active').slideUp(500);
	  target.trigger('closed');
	}

	function init() {
	  // initial
	  $('.tabs').each(function () {
	    var initialActive = void 0;
	    if ($(this).find('.tab.is-active').length) {
	      initialActive = $(this).find('.tab.is-active').eq(0);
	    } else {
	      initialActive = $(this).find('.tab').eq(0);
	    }
	    openTab(initialActive);
	  });

	  // action
	  $('.tab').on('click', function () {
	    if ($(this).hasClass('is-active')) {
	      closeTab($(this));
	    } else {
	      $(this).siblings('.is-active').each(function () {
	        closeTab($(this));
	      });
	      openTab($(this));
	    }
	  });
	}

	module.exports = { init: init };

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * MainMenu
	 * @module MainMenu
	 */

	var mainMenu = {
	  el: $('.main-nav'),
	  btn: $('.main-nav-btn'),
	  state: false
	};

	function checkMenu(menu, menuState) {
	  menu.state = menuState;
	  if (menuState) {
	    openMenu(menu);
	  } else {
	    closeMenu(menu);
	  }
	}

	function openMenu(menu) {
	  menu.state = true;
	  $('html, body').css('overflow-y', 'hidden');
	  menu.btn.addClass('is-open');
	  menu.el.fadeIn(500);
	  menu.el.trigger('opened');
	}

	function closeMenu(menu) {
	  menu.state = false;
	  $('html, body').css('overflow-y', '');
	  menu.btn.removeClass('is-open');
	  menu.el.fadeOut(300);
	  menu.el.trigger('closed');
	}

	/**
	 * инициализация меню
	 * @example
	 * MainMenu.init();
	 */
	function init() {

	  var isSmall = Main.DeviceDetection.isMobile() || Main.DeviceDetection.isTablet();

	  // set initial state
	  if (isSmall) {
	    checkMenu(mainMenu, !isSmall);
	  }

	  // set state after resize
	  $(window).on('resizeend', function () {
	    isSmall = Main.DeviceDetection.isMobile() || Main.DeviceDetection.isTablet();
	    checkMenu(mainMenu, !isSmall);
	  });

	  // toggle state by btn
	  mainMenu.btn.on('click', function (e) {
	    e.stopPropagation();
	    checkMenu(mainMenu, !mainMenu.state);
	  });

	  // close by click outside
	  $('.layout').on('click', function (e) {
	    isSmall = Main.DeviceDetection.isMobile() || Main.DeviceDetection.isTablet();
	    if (isSmall) {
	      if (!mainMenu.el.find(e.target).length) {
	        closeMenu(mainMenu);
	      }
	    }
	  });

	  // stop bubbling click inside
	  mainMenu.el.on('click', function (e) {
	    e.stopPropagation();
	  });
	}

	module.exports = { init: init, checkMenu: checkMenu };

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Видео
	 * @module Video
	 */

	/**
	 * инициализация событий для всплывающих окон
	 * @example
	 * Modal.init();
	 */
	function init() {

	  $('.modal--video').on('opened', function () {
	    $(this).find('.js-modal-video')[0].play();
	  });
	  $('.modal--video').on('closed', function () {
	    $(this).find('.js-modal-video')[0].pause();
	  });

	  $('video').on('click', function () {
	    var self = $(this)[0];
	    if (self.paused) {
	      self.play();
	    } else {
	      self.pause();
	    }
	  });
	}

	module.exports = { init: init };

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4MDRjODE2ZGFjYTUwN2U2YmRkMSIsIndlYnBhY2s6Ly8vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2lucHV0LmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9mb3JtLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9tb2RhbC5qcyIsIndlYnBhY2s6Ly8vc3JjL2pzL2NvbXBvbmVudHMvYWNjb3JkaW9uLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy90YWJzLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9tYWluLW1lbnUuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL3ZpZGVvLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9rZW56by9idWlsZC9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA4MDRjODE2ZGFjYTUwN2U2YmRkMSIsImxldCBEZXZpY2VEZXRlY3Rpb24gPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb25cIik7XHJcbmxldCBIZWxwZXJzID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9oZWxwZXJzXCIpO1xyXG5sZXQgSW5wdXQgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2lucHV0XCIpO1xyXG5sZXQgRm9ybSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvZm9ybVwiKTtcclxubGV0IE1vZGFsID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9tb2RhbFwiKTtcclxubGV0IEFjY29yZGlvbiA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvYWNjb3JkaW9uXCIpO1xyXG5sZXQgVGFicyA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvdGFic1wiKTtcclxubGV0IE1haW5NZW51ID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9tYWluLW1lbnVcIik7XHJcbmxldCBWaWRlbyA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvdmlkZW9cIik7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gIFxyXG4gIERldmljZURldGVjdGlvbi5ydW4oKTtcclxuICBIZWxwZXJzLmluaXQoKTtcclxuICBJbnB1dC5pbml0KCk7XHJcbiAgRm9ybS5pbml0KCk7XHJcbiAgTW9kYWwuaW5pdCgpO1xyXG4gIEFjY29yZGlvbi5pbml0KCk7XHJcbiAgVGFicy5pbml0KCk7XHJcbiAgLy9NYWluTWVudS5pbml0KCk7XHJcbiAgVmlkZW8uaW5pdCgpO1xyXG59KTtcclxuXHJcblxyXG4vKipcclxuICog0KHQv9C40YHQvtC6INGN0LrRgdC/0L7RgNGC0LjRgNGD0LXQvNGL0YUg0LzQvtC00YPQu9C10LksINGH0YLQvtCx0Ysg0LjQvNC10YLRjCDQuiDQvdC40Lwg0LTQvtGB0YLRg9C/INC40LfQstC90LVcclxuICogQGV4YW1wbGVcclxuICogTWFpbi5Gb3JtLmlzRm9ybVZhbGlkKCk7XHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBEZXZpY2VEZXRlY3Rpb24sXHJcbiAgSGVscGVycyxcclxuICBJbnB1dCxcclxuICBGb3JtLFxyXG4gIE1vZGFsLFxyXG4gIEFjY29yZGlvbixcclxuICBUYWJzLFxyXG4gIE1haW5NZW51LFxyXG4gIFZpZGVvXHJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9tYWluLmpzIiwibGV0IGJyZWFrcG9pbnRzID0ge1xyXG4gIHNtOiA3NjcsXHJcbiAgbWQ6IDEwMjQsXHJcbiAgbGc6IDEyODAsXHJcbiAgeGw6IDE2MDBcclxufTtcclxuXHJcbmZ1bmN0aW9uIGlzTW9iaWxlKCl7XHJcbiAgcmV0dXJuICgkKHdpbmRvdykud2lkdGgoKSA8PSBicmVha3BvaW50cy5zbSk7XHJcbn1cclxuZnVuY3Rpb24gaXNUYWJsZXQoKXtcclxuICByZXR1cm4gKCQod2luZG93KS53aWR0aCgpID4gYnJlYWtwb2ludHMuc20gJiYgJCh3aW5kb3cpLndpZHRoKCkgPD0gYnJlYWtwb2ludHMubWQpXHJcbn1cclxuZnVuY3Rpb24gaXNUb3VjaCgpe1xyXG4gIHJldHVybiAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgfHwgbmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzO1xyXG59XHJcbmZ1bmN0aW9uIGlzTW9iaWxlVmVyc2lvbigpe1xyXG4gIHJldHVybiAhIX53aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKFwiL21vYmlsZS9cIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJ1bigpe1xyXG4gIGlmKGlzVG91Y2goKSl7XHJcbiAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoJ25vLXRvdWNoJykuYWRkQ2xhc3MoJ3RvdWNoJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgICQoJ2h0bWwnKS5yZW1vdmVDbGFzcygndG91Y2gnKS5hZGRDbGFzcygnbm8tdG91Y2gnKTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge3J1biwgaXNUb3VjaCwgaXNNb2JpbGUsIGlzVGFibGV0LCBpc01vYmlsZVZlcnNpb259O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9kZXZpY2UtZGV0ZWN0aW9uLmpzIiwiLyoqXHJcbiAqIEhlbHBlcnNcclxuICogQG1vZHVsZSBIZWxwZXJzXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZSBzY3JvbGxiYXIgd2lkdGggaW4gZWxlbWVudFxyXG4gKiAtIGlmIHRoZSB3aWR0aCBpcyAwIGl0IG1lYW5zIHRoZSBzY3JvbGxiYXIgaXMgZmxvYXRlZC9vdmVybGF5ZWRcclxuICogLSBhY2NlcHRzIFwiY29udGFpbmVyXCIgcGFyZW1ldGVyIGJlY2F1c2UgaWUgJiBlZGdlIGNhbiBoYXZlIGRpZmZlcmVudFxyXG4gKiAgIHNjcm9sbGJhciBiZWhhdmlvcnMgZm9yIGRpZmZlcmVudCBlbGVtZW50cyB1c2luZyAnLW1zLW92ZXJmbG93LXN0eWxlJ1xyXG4gKi9cclxuZnVuY3Rpb24gZ2V0TmF0aXZlU2Nyb2xsYmFyV2lkdGggKGNvbnRhaW5lcikge1xyXG4gIGNvbnRhaW5lciA9IGNvbnRhaW5lciB8fCBkb2N1bWVudC5ib2R5O1xyXG5cclxuICBsZXQgZnVsbFdpZHRoID0gMDtcclxuICBsZXQgYmFyV2lkdGggPSAwO1xyXG5cclxuICBsZXQgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIGxldCBjaGlsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICB3cmFwcGVyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICB3cmFwcGVyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XHJcbiAgd3JhcHBlci5zdHlsZS5ib3R0b20gPSAnMCc7XHJcbiAgd3JhcHBlci5zdHlsZS5yaWdodCA9ICcwJztcclxuICB3cmFwcGVyLnN0eWxlLndpZHRoID0gJzEwMHB4JztcclxuICB3cmFwcGVyLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcblxyXG4gIHdyYXBwZXIuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh3cmFwcGVyKTtcclxuXHJcbiAgZnVsbFdpZHRoID0gY2hpbGQub2Zmc2V0V2lkdGg7XHJcbiAgd3JhcHBlci5zdHlsZS5vdmVyZmxvd1kgPSAnc2Nyb2xsJztcclxuICBiYXJXaWR0aCA9IGZ1bGxXaWR0aCAtIGNoaWxkLm9mZnNldFdpZHRoO1xyXG5cclxuICBjb250YWluZXIucmVtb3ZlQ2hpbGQod3JhcHBlcik7XHJcblxyXG4gIHJldHVybiBiYXJXaWR0aDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRocm90dGxlIEhlbHBlclxyXG4gKiBodHRwczovL3JlbXlzaGFycC5jb20vMjAxMC8wNy8yMS90aHJvdHRsaW5nLWZ1bmN0aW9uLWNhbGxzXHJcbiAqL1xyXG5mdW5jdGlvbiB0aHJvdHRsZSAoZm4sIHRocmVzaGhvbGQsIHNjb3BlKSB7XHJcbiAgdGhyZXNoaG9sZCB8fCAodGhyZXNoaG9sZCA9IDI1MCk7XHJcbiAgbGV0IGxhc3QsXHJcbiAgICBkZWZlclRpbWVyO1xyXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgY29udGV4dCA9IHNjb3BlIHx8IHRoaXM7XHJcblxyXG4gICAgbGV0IG5vdyA9ICtuZXcgRGF0ZSgpLFxyXG4gICAgICBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgaWYgKGxhc3QgJiYgbm93IDwgbGFzdCArIHRocmVzaGhvbGQpIHtcclxuICAgICAgLy8gaG9sZCBvbiB0byBpdFxyXG4gICAgICBjbGVhclRpbWVvdXQoZGVmZXJUaW1lcik7XHJcbiAgICAgIGRlZmVyVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsYXN0ID0gbm93O1xyXG4gICAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG4gICAgICB9LCB0aHJlc2hob2xkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxhc3QgPSBub3c7XHJcbiAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLyoqIFxyXG4gKiBEZWJvdW5jZSBIZWxwZXJcclxuICogaHR0cHM6Ly9yZW15c2hhcnAuY29tLzIwMTAvMDcvMjEvdGhyb3R0bGluZy1mdW5jdGlvbi1jYWxsc1xyXG4gKi9cclxuZnVuY3Rpb24gZGVib3VuY2UgKGZuLCBkZWxheSkge1xyXG4gIGxldCB0aW1lciA9IG51bGw7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBjb250ZXh0ID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cztcclxuICAgIGNsZWFyVGltZW91dCh0aW1lcik7XHJcbiAgICB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICBmbi5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuICAgIH0sIGRlbGF5KTtcclxuICB9O1xyXG59O1xyXG5cclxubGV0IHRpbWVyO1xyXG5sZXQgdGltZW91dCA9IGZhbHNlO1xyXG5sZXQgZGVsdGEgPSAyMDA7XHJcbmZ1bmN0aW9uIHJlc2l6ZUVuZCgpIHtcclxuICBpZiAobmV3IERhdGUoKSAtIHRpbWVyIDwgZGVsdGEpIHtcclxuICAgIHNldFRpbWVvdXQocmVzaXplRW5kLCBkZWx0YSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRpbWVvdXQgPSBmYWxzZTtcclxuICAgICQod2luZG93KS50cmlnZ2VyKCdyZXNpemVlbmQnKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZUNsYXNzSWYoZWwsIGNvbmQsIHRvZ2dsZWRDbGFzcyl7XHJcblx0aWYoY29uZCl7XHJcblx0XHRlbC5hZGRDbGFzcyh0b2dnbGVkQ2xhc3MpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRlbC5yZW1vdmVDbGFzcyh0b2dnbGVkQ2xhc3MpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqINCk0YPQvdC60YbQuNGPINC00L7QsdCw0LLQu9GP0LXRgiDQuiDRjdC70LXQvNC10L3RgtGDINC60LvQsNGB0YEsINC10YHQu9C4INGB0YLRgNCw0L3QuNGG0LAg0L/RgNC+0LrRgNGD0YfQtdC90LAg0LHQvtC70YzRiNC1LCDRh9C10Lwg0L3QsCDRg9C60LDQt9Cw0L3QvdC+0LUg0LfQvdCw0YfQtdC90LjQtSwgXHJcbiAqINC4INGD0LHQuNGA0LDQtdGCINC60LvQsNGB0YEsINC10YHQu9C4INC30L3QsNGH0LXQvdC40LUg0LzQtdC90YzRiNC1XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBlbCAtINGN0LvQtdC80LXQvdGCLCDRgSDQutC+0YLQvtGA0YvQvCDQstC30LDQuNC80L7QtNC10LnRgdGC0LLRg9C10LxcclxuICogQHBhcmFtIHttaXhlZH0gW3Njcm9sbFZhbHVlPTBdIC0g0LfQvdCw0YfQtdC90LjQtSDQv9GA0L7QutGA0YPRgtC60LgsINC90LAg0LrQvtGC0L7RgNC+0Lwg0LzQtdC90Y/QtdC8IGNzcy3QutC70LDRgdGBLCDQvtC20LjQtNCw0LXQvNC+0LUg0LfQvdCw0YfQtdC90LjQtSAtINGH0LjRgdC70L4g0LjQu9C4INC60LvRjtGH0LXQstC+0LUg0YHQu9C+0LLQviAndGhpcycuINCV0YHQu9C4INC/0LXRgNC10LTQsNC90L4gJ3RoaXMnLCDQv9C+0LTRgdGC0LDQstC70Y/QtdGC0YHRjyDQv9C+0LvQvtC20LXQvdC40LUgZWwub2Zmc2V0KCkudG9wINC80LjQvdGD0YEg0L/QvtC70L7QstC40L3QsCDQstGL0YHQvtGC0Ysg0Y3QutGA0LDQvdCwXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdG9nZ2xlZENsYXNzPXNjcm9sbGVkXSAtIGNzcy3QutC70LDRgdGBLCDQutC+0YLQvtGA0YvQuSDQv9C10YDQtdC60LvRjtGH0LDQtdC8XHJcbiAqL1xyXG5mdW5jdGlvbiB0b2dnbGVFbGVtZW50Q2xhc3NPblNjcm9sbChlbCwgc2Nyb2xsVmFsdWUgPSAwLCB0b2dnbGVkQ2xhc3MgPSAnc2Nyb2xsZWQnKXtcclxuXHRpZihlbC5sZW5ndGggPT0gMCkge1xyXG5cdFx0Ly9jb25zb2xlLmVycm9yKFwi0J3QtdC+0LHRhdC+0LTQuNC80L4g0L/QtdGA0LXQtNCw0YLRjCDQvtCx0YrQtdC60YIsINGBINC60L7RgtC+0YDRi9C8INCy0Ysg0YXQvtGC0LjRgtC1INCy0LfQsNC40LzQvtC00LXQudGB0YLQstC+0LLQsNGC0YxcIik7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cdFxyXG5cdGlmKHNjcm9sbFZhbHVlID09ICd0aGlzJykge1xyXG5cdFx0c2Nyb2xsVmFsdWUgPSBlbC5vZmZzZXQoKS50b3AgLSAkKHdpbmRvdykub3V0ZXJIZWlnaHQoKSAvIDI7XHJcblx0fVxyXG5cdFxyXG5cdCQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oZSl7XHJcblx0XHRpZigkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiBzY3JvbGxWYWx1ZSl7XHJcblx0XHRcdGVsLmFkZENsYXNzKHRvZ2dsZWRDbGFzcyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRlbC5yZW1vdmVDbGFzcyh0b2dnbGVkQ2xhc3MpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5INC00LvRjyDQv9C10YDQtdC60LvRjtGH0LDRgtC10LvQtdC5INC60LvQsNGB0YHQvtCyXHJcbiAqIEBleGFtcGxlXHJcbiAqIEhlbHBlcnMuaW5pdCgpO1xyXG4gKi9cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gIFxyXG4gIHRvZ2dsZUVsZW1lbnRDbGFzc09uU2Nyb2xsKCQoJy5oZWFkZXInKSwgNTApO1xyXG4gIFxyXG4gICQoJy5qcy1oaWRlLWJsb2NrJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgIGxldCBibG9jayA9ICQodGhpcykuZGF0YSgndGFyZ2V0JykgPT09ICdzZWxmJyA/ICQodGhpcykucGFyZW50KCkgOiAkKHRoaXMpLmRhdGEoJ3RhcmdldCcpO1xyXG4gICAgYmxvY2suZmFkZU91dCg1MDApO1xyXG4gIH0pO1xyXG4gIFxyXG4gICQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24gKCkge1xyXG4gICAgdGltZXIgPSBuZXcgRGF0ZSgpO1xyXG4gICAgaWYgKHRpbWVvdXQgPT09IGZhbHNlKSB7XHJcbiAgICAgIHRpbWVvdXQgPSB0cnVlO1xyXG4gICAgICBzZXRUaW1lb3V0KHJlc2l6ZUVuZCwgZGVsdGEpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIFxyXG4gICQoJy5idG4tbWVudScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAkKCcuaGVhZGVyJykudG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICQoJy5tYWluLW5hdicpLnNsaWRlVG9nZ2xlKDUwMCk7XHJcbiAgICBpZiAoTWFpbi5EZXZpY2VEZXRlY3Rpb24uaXNNb2JpbGVWZXJzaW9uKCkpIHtcclxuICAgICAgaWYgKCQoJy5oZWFkZXInKS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2lzLW9wZW4nKTtcclxuICAgICAgICAkKCdodG1sLCBib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJ2hpZGRlbicpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuICBcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdCwgdG9nZ2xlQ2xhc3NJZiwgdG9nZ2xlRWxlbWVudENsYXNzT25TY3JvbGx9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9oZWxwZXJzLmpzIiwiLyoqXHJcbiAqINCc0L7QtNGD0LvRjCDQtNC70Y8g0YDQsNCx0L7RgtGLIHBsYWNlaG9sZGVyINCyINGN0LvQtdC80LXQvdGC0LDRhSDRhNC+0YDQvNGLICguZmllbGQpXHJcbiAqIEBtb2R1bGUgSW5wdXRcclxuICovXHJcblxyXG5cclxuLyoqXHJcbiAqINCj0YHRgtCw0L3QvtCy0LjRgtGMINGE0L7QutGD0YFcclxuICogQHByaXZhdGVcclxuICogQHBhcmFtIHtvYmplY3R9IGlucHV0XHJcbiAqL1xyXG5mdW5jdGlvbiBmb2N1c0xhYmVsKGlucHV0KXtcclxuICAgIGlucHV0LmNsb3Nlc3QoJy5maWVsZCcpLmFkZENsYXNzKFwiaGFzLWZvY3VzXCIpO1xyXG59XHJcblxyXG4vKipcclxuICog0KPQsdGA0LDRgtGMINGE0L7QutGD0YFcclxuICogQHByaXZhdGVcclxuICogQHBhcmFtIHtvYmplY3R9IGlucHV0XHJcbiAqL1xyXG5mdW5jdGlvbiBibHVyTGFiZWwoaW5wdXQpe1xyXG4gICAgdmFyIHdyYXBwZXIgPSBpbnB1dC5jbG9zZXN0KCcuZmllbGQnKTtcclxuICAgIHdyYXBwZXIucmVtb3ZlQ2xhc3MoXCJoYXMtZm9jdXNcIik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDQn9GA0L7QstC10YDQuNGC0Ywg0LjQvdC/0YPRgiDQvdCwINC90LDQu9C40YfQuNC1IHZhbHVlXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dFxyXG4gKi9cclxuZnVuY3Rpb24gY2hlY2tJbnB1dChpbnB1dCl7XHJcbiAgICB2YXIgd3JhcHBlciA9IGlucHV0LmNsb3Nlc3QoJy5maWVsZCcpO1xyXG4gICAgaWYgKGlucHV0LnZhbCgpLmxlbmd0aCA+IDApXHJcbiAgICAgICAgd3JhcHBlci5hZGRDbGFzcyhcImhhcy12YWx1ZVwiKTtcclxuICAgIGVsc2VcclxuICAgICAgICB3cmFwcGVyLnJlbW92ZUNsYXNzKFwiaGFzLXZhbHVlXCIpO1xyXG59XHJcblxyXG4vKipcclxuICog0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YHQvtCx0YvRgtC40Lkg0LTQu9GPINC40L3Qv9GD0YLQsFxyXG4gKiBAZXhhbXBsZVxyXG4gKiBJbnB1dC5pbml0KCk7XHJcbiAqL1xyXG5mdW5jdGlvbiBpbml0KCl7XHJcbiAgICBsZXQgaW5wdXRzID0gJCgnLmZpZWxkX19pbnB1dCcpO1xyXG4gICAgbGV0IHBsYWNlaG9sZGVycyA9ICQoJy5maWVsZF9fcGxhY2Vob2xkZXInKTtcclxuICAgIFxyXG4gICAgcGxhY2Vob2xkZXJzLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICQodGhpcykuY2xvc2VzdCgnLmZpZWxkJykuZmluZCgnLmZpZWxkX19pbnB1dCcpLmZvY3VzKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpbnB1dHMuZWFjaChmdW5jdGlvbihpLCBpdGVtKSB7XHJcbiAgICAgICAgY2hlY2tJbnB1dCgkKGl0ZW0pKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlucHV0cy5mb2N1cyhmdW5jdGlvbigpe1xyXG4gICAgICAgIGZvY3VzTGFiZWwoJCh0aGlzKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpbnB1dHMuYmx1cihmdW5jdGlvbigpe1xyXG4gICAgICAgIGJsdXJMYWJlbCgkKHRoaXMpKTtcclxuICAgICAgICBjaGVja0lucHV0KCQodGhpcykpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9pbnB1dC5qcyIsIi8qKlxyXG4gKiDQnNC+0LTRg9C70Ywg0LTQu9GPINGA0LDQsdC+0YLRiyDQpNC+0YDQvFxyXG4gKiBAbW9kdWxlIEZvcm1cclxuICovXHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZUZpZWxkKGZpZWxkKSB7XHJcbiAgbGV0IGlzVmFsaWQgPSBmaWVsZC52YWxpZGl0eS52YWxpZDtcclxuICBsZXQgZmllbGRDb250YWluZXIgPSAkKGZpZWxkKS5jbG9zZXN0KCcuZmllbGQnKTtcclxuICBpZiAoaXNWYWxpZCkge1xyXG4gICAgZmllbGRDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2hhcy1lcnJvcicpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBmaWVsZENvbnRhaW5lci5hZGRDbGFzcygnaGFzLWVycm9yJyk7XHJcbiAgfVxyXG4gIHJldHVybiBpc1ZhbGlkO1xyXG59XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZUZvcm0oZWxGb3JtKSB7XHJcbiAgbGV0IGVycm9ycyA9IDA7XHJcbiAgQXJyYXkuZnJvbShlbEZvcm0uZWxlbWVudHMpLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgbGV0IGlzVmFsaWRGaWVsZCA9IHZhbGlkYXRlRmllbGQoaXRlbSk7XHJcbiAgICBpZighaXNWYWxpZEZpZWxkKSB7XHJcbiAgICAgIGVycm9ycyArPSAxO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIHJldHVybiBlcnJvcnM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC+0LHRi9GC0LjQuSDRhNC+0YDQvFxyXG4gKiBAZXhhbXBsZVxyXG4gKiBGb3JtLmluaXQoKTtcclxuICovXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuICBsZXQganNGb3JtID0gJCgnLmpzLWZvcm0nKTtcclxuICBcclxuICAkKCdpbnB1dCwgdGV4dGFyZWEnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuICAgIHZhbGlkYXRlRmllbGQodGhpcyk7XHJcbiAgfSk7XHJcbiAgXHJcbiAganNGb3JtLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIGxldCBzZWxmID0gJCh0aGlzKTtcclxuICAgIGxldCBzZWxmRm9ybSA9IHNlbGYuZmluZCgnLmpzLWZvcm0tZm9ybScpO1xyXG4gICAgbGV0IHNlbGZSZXN1bHQgPSBzZWxmLmZpbmQoJy5qcy1mb3JtLXJlc3VsdCcpO1xyXG4gICAgbGV0IHNlbGZTdWJtaXQgPSBzZWxmLmZpbmQoJy5qcy1mb3JtLXN1Ym1pdCcpO1xyXG4gICAgXHJcbiAgICBzZWxmU3VibWl0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBsZXQgaGFzRXJyb3IgPSB2YWxpZGF0ZUZvcm0oc2VsZkZvcm1bMF0pO1xyXG4gICAgICBpZiAoIWhhc0Vycm9yKSB7XHJcbiAgICAgICAgbGV0IHJlcXVlc3QgPSAkLmFqYXgoe1xyXG4gICAgICAgICAgdXJsOiAnaHR0cDovL2xvY2NpdGFuZS5oc21wLnJ1L2FwaS9lbWFpbHMvJyxcclxuICAgICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICduYW1lJzogJChzZWxmRm9ybSkuZmluZCgnaW5wdXRbbmFtZT1cIm5hbWVcIl0nKS52YWwoKSxcclxuICAgICAgICAgICAgJ2VtYWlsJzogJChzZWxmRm9ybSkuZmluZCgnaW5wdXRbbmFtZT1cImVtYWlsXCJdJykudmFsKCksXHJcbiAgICAgICAgICAgICdtZXNzYWdlJzogJChzZWxmRm9ybSkuZmluZCgndGV4dGFyZWFbbmFtZT1cIm1lc3NhZ2VcIl0nKS52YWwoKSxcclxuICAgICAgICAgICAgJ3BhZ2UnOiB3aW5kb3cubG9jYXRpb24uaHJlZlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2VsZlN1Ym1pdC5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJlcXVlc3QuZG9uZShmdW5jdGlvbiAocmVzcG9uc2UsIHRleHRTdGF0dXMsIGpxWEhSKSB7XHJcbiAgICAgICAgICBzZWxmLmFkZENsYXNzKCdpcy1zdWJtaXR0ZWQnKTtcclxuICAgICAgICAgIHNlbGYudHJpZ2dlcignc3VibWl0dGVkJyk7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNlbGZSZXN1bHQuc2hvdygpO1xyXG4gICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9mb3JtLmpzIiwiLyoqXHJcbiAqINCS0YHQv9C70YvQstCw0Y7RidC40LUg0L7QutC90LBcclxuICogQG1vZHVsZSBNb2RhbFxyXG4gKi9cclxuXHJcbmxldCBsYXlvdXQgPSAkKCcubGF5b3V0Jyk7XHJcbmxldCB3cmFwcGVyID0gJCgnLm1vZGFsX193cmFwcGVyJyk7XHJcbiBcclxuZnVuY3Rpb24gb3Blbk1vZGFsKHRhcmdldCkge1xyXG4gIGxldCBtb2RhbCA9ICQodGFyZ2V0KTtcclxuICBpZiAoIWxheW91dC5oYXNDbGFzcygnbW9kYWwtb3BlbicpKSB7XHJcbiAgICBsYXlvdXQuYWRkQ2xhc3MoJ21vZGFsLW9wZW4nKTtcclxuICAgICQoJ2h0bWwsIGJvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnaGlkZGVuJyk7XHJcbiAgICB3cmFwcGVyLmZhZGVJbigzMDApLmFkZENsYXNzKCdtb2RhbC1vcGVuJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNsb3NlUHJldk1vZGFscyh0YXJnZXQpO1xyXG4gIH1cclxuICBtb2RhbC5mYWRlSW4oMzAwKS5hZGRDbGFzcygnaXMtb3BlbicpO1xyXG4gIG1vZGFsLnRyaWdnZXIoJ29wZW5lZCcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbG9zZU1vZGFsKHRhcmdldCkge1xyXG4gIGxldCBtb2RhbCA9ICQodGFyZ2V0KTtcclxuICBtb2RhbC5mYWRlT3V0KDMwMCkucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICB3cmFwcGVyLmZhZGVPdXQoMzAwKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xyXG4gIGxheW91dC5yZW1vdmVDbGFzcygnbW9kYWwtb3BlbicpO1xyXG4gICQoJ2h0bWwsIGJvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnJyk7XHJcbiAgbW9kYWwudHJpZ2dlcignY2xvc2VkJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsb3NlUHJldk1vZGFscyh0YXJnZXQpIHtcclxuICBsZXQgbW9kYWwgPSAkKHRhcmdldCk7XHJcbiAgbW9kYWwuc2libGluZ3MoJy5tb2RhbC5pcy1vcGVuJykuZmFkZU91dCgzMDApLnJlbW92ZUNsYXNzKCdpcy1vcGVuJykudHJpZ2dlcignY2xvc2VkJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC+0LHRi9GC0LjQuSDQtNC70Y8g0LLRgdC/0LvRi9Cy0LDRjtGJ0LjRhSDQvtC60L7QvVxyXG4gKiBAZXhhbXBsZVxyXG4gKiBNb2RhbC5pbml0KCk7XHJcbiAqL1xyXG5mdW5jdGlvbiBpbml0KCl7XHJcbiAgICBcclxuICAkKCcuanMtbW9kYWwnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBsZXQgdGFyZ2V0ID0gJCh0aGlzKS5kYXRhKCd0YXJnZXQnKTtcclxuICAgICAgaWYgKCEkKHRhcmdldCkuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG4gICAgICAgIG9wZW5Nb2RhbCh0YXJnZXQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNsb3NlTW9kYWwodGFyZ2V0KTtcclxuICAgICAgfVxyXG4gIH0pO1xyXG4gIFxyXG4gICQoJy5idG4tY2xvc2UtbW9kYWwnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgbGV0IG1vZGFsID0gJCh0aGlzKS5jbG9zZXN0KCcubW9kYWwnKTtcclxuICAgIGNsb3NlTW9kYWwobW9kYWwpO1xyXG4gIH0pO1xyXG4gIFxyXG4gICQoJy5tb2RhbF9fd3JhcHBlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgIGNsb3NlTW9kYWwoJy5tb2RhbCcpO1xyXG4gIH0pO1xyXG4gICQoJy5tb2RhbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgfSk7XHJcbiAgXHJcbiAgJCgnLm1vZGFsLS12aWRlbycpLm9uKCdvcGVuZWQnLCBmdW5jdGlvbigpe1xyXG4gICAgJCh0aGlzKS5maW5kKCcuanMtbW9kYWwtdmlkZW8nKVswXS5wbGF5KCk7XHJcbiAgfSk7XHJcblxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0LCBvcGVuTW9kYWwsIGNsb3NlTW9kYWx9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9tb2RhbC5qcyIsIi8qKlxyXG4gKiBBY2NvcmRpb25cclxuICogQG1vZHVsZSBBY2NvcmRpb25cclxuICovXHJcblxyXG5mdW5jdGlvbiBvcGVuQWNjb3JkaW9uKGFjY29yZGlvbikge1xyXG4gIGxldCBhY2NvcmRpb25Db250ZW50ID0gYWNjb3JkaW9uLmZpbmQoJy5hY2NvcmRpb25fX2JvZHknKS5lcSgwKTtcclxuICBhY2NvcmRpb24uYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICBhY2NvcmRpb25Db250ZW50LnNsaWRlRG93big1MDApO1xyXG4gIGFjY29yZGlvbi50cmlnZ2VyKCdvcGVuZWQnKTtcclxufVxyXG5mdW5jdGlvbiBjbG9zZUFjY29yZGlvbihhY2NvcmRpb24pIHtcclxuICBsZXQgYWNjb3JkaW9uQ29udGVudCA9IGFjY29yZGlvbi5maW5kKCcuYWNjb3JkaW9uX19ib2R5JykuZXEoMCk7XHJcbiAgXHJcbiAgYWNjb3JkaW9uLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgYWNjb3JkaW9uQ29udGVudC5zbGlkZVVwKDUwMCk7XHJcbiAgYWNjb3JkaW9uLnRyaWdnZXIoJ2Nsb3NlZCcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0KCkge1xyXG4gIC8vIGluaXRpYWxcclxuICAkKCcuYWNjb3JkaW9uLmlzLW9wZW4nKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICBvcGVuQWNjb3JkaW9uKCQodGhpcykpO1xyXG4gIH0pO1xyXG4gIFxyXG4gIC8vIGFjdGlvblxyXG4gICQoJy5hY2NvcmRpb24nKS5vbignY2xpY2snLCAnLmFjY29yZGlvbl9faGVhZGVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgYWNjb3JkaW9uID0gJCh0aGlzKS5jbG9zZXN0KCcuYWNjb3JkaW9uJyk7XHJcbiAgICBpZihhY2NvcmRpb24uaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG4gICAgICBjbG9zZUFjY29yZGlvbihhY2NvcmRpb24pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb3BlbkFjY29yZGlvbihhY2NvcmRpb24pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHsgaW5pdCB9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9hY2NvcmRpb24uanMiLCIvKipcclxuICogVGFic1xyXG4gKiBAbW9kdWxlIFRhYnNcclxuICovXHJcblxyXG5mdW5jdGlvbiBvcGVuVGFiKHRhYikge1xyXG4gIHRhYi5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgbGV0IHRhcmdldCA9ICQodGFiLmRhdGEoJ3RhcmdldCcpKTtcclxuICB0YXJnZXQudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpLnNsaWRlRG93big1MDApO1xyXG4gIHRhcmdldC50cmlnZ2VyKCdvcGVuZWQnKTtcclxufVxyXG5mdW5jdGlvbiBjbG9zZVRhYih0YWIpIHtcclxuICBsZXQgdGFyZ2V0ID0gJCh0YWIuZGF0YSgndGFyZ2V0JykpO1xyXG4gIHRhYi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgdGFyZ2V0LnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKS5zbGlkZVVwKDUwMCk7XHJcbiAgdGFyZ2V0LnRyaWdnZXIoJ2Nsb3NlZCcpO1xyXG59XHJcbiBcclxuZnVuY3Rpb24gaW5pdCgpIHtcclxuICAvLyBpbml0aWFsXHJcbiAgJCgnLnRhYnMnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgaW5pdGlhbEFjdGl2ZTtcclxuICAgIGlmKCQodGhpcykuZmluZCgnLnRhYi5pcy1hY3RpdmUnKS5sZW5ndGgpIHtcclxuICAgICAgaW5pdGlhbEFjdGl2ZSA9ICQodGhpcykuZmluZCgnLnRhYi5pcy1hY3RpdmUnKS5lcSgwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGluaXRpYWxBY3RpdmUgPSAkKHRoaXMpLmZpbmQoJy50YWInKS5lcSgwKTtcclxuICAgIH1cclxuICAgIG9wZW5UYWIoaW5pdGlhbEFjdGl2ZSk7XHJcbiAgfSk7XHJcbiAgXHJcbiAgXHJcbiAgLy8gYWN0aW9uXHJcbiAgJCgnLnRhYicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XHJcbiAgICAgIGNsb3NlVGFiKCQodGhpcykpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJCh0aGlzKS5zaWJsaW5ncygnLmlzLWFjdGl2ZScpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICBjbG9zZVRhYigkKHRoaXMpKTtcclxuICAgICAgfSk7XHJcbiAgICAgIG9wZW5UYWIoJCh0aGlzKSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0geyBpbml0IH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL3RhYnMuanMiLCIvKipcclxuICogTWFpbk1lbnVcclxuICogQG1vZHVsZSBNYWluTWVudVxyXG4gKi9cclxuXHJcbmxldCBtYWluTWVudSA9IHtcclxuICBlbDogJCgnLm1haW4tbmF2JyksXHJcbiAgYnRuOiAkKCcubWFpbi1uYXYtYnRuJyksXHJcbiAgc3RhdGU6IGZhbHNlXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrTWVudSAobWVudSwgbWVudVN0YXRlKSB7XHJcbiAgbWVudS5zdGF0ZSA9IG1lbnVTdGF0ZTtcclxuICBpZiAobWVudVN0YXRlKSB7XHJcbiAgICBvcGVuTWVudShtZW51KTtcclxuICB9IGVsc2Uge1xyXG4gICAgY2xvc2VNZW51KG1lbnUpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gb3Blbk1lbnUgKG1lbnUpIHtcclxuICBtZW51LnN0YXRlID0gdHJ1ZTtcclxuICAkKCdodG1sLCBib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJ2hpZGRlbicpO1xyXG4gIG1lbnUuYnRuLmFkZENsYXNzKCdpcy1vcGVuJyk7XHJcbiAgbWVudS5lbC5mYWRlSW4oNTAwKTtcclxuICBtZW51LmVsLnRyaWdnZXIoJ29wZW5lZCcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbG9zZU1lbnUgKG1lbnUpIHtcclxuICBtZW51LnN0YXRlID0gZmFsc2U7XHJcbiAgJCgnaHRtbCwgYm9keScpLmNzcygnb3ZlcmZsb3cteScsICcnKTtcclxuICBtZW51LmJ0bi5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xyXG4gIG1lbnUuZWwuZmFkZU91dCgzMDApO1xyXG4gIG1lbnUuZWwudHJpZ2dlcignY2xvc2VkJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDQvNC10L3RjlxyXG4gKiBAZXhhbXBsZVxyXG4gKiBNYWluTWVudS5pbml0KCk7XHJcbiAqL1xyXG5mdW5jdGlvbiBpbml0KCl7XHJcbiAgXHJcbiAgbGV0IGlzU21hbGwgPSBNYWluLkRldmljZURldGVjdGlvbi5pc01vYmlsZSgpIHx8IE1haW4uRGV2aWNlRGV0ZWN0aW9uLmlzVGFibGV0KCk7XHJcbiAgXHJcbiAgLy8gc2V0IGluaXRpYWwgc3RhdGVcclxuICBpZiAoaXNTbWFsbCkge1xyXG4gICAgY2hlY2tNZW51KG1haW5NZW51LCAhaXNTbWFsbCk7XHJcbiAgfVxyXG4gIFxyXG4gIC8vIHNldCBzdGF0ZSBhZnRlciByZXNpemVcclxuICAkKHdpbmRvdykub24oJ3Jlc2l6ZWVuZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgIGlzU21hbGwgPSBNYWluLkRldmljZURldGVjdGlvbi5pc01vYmlsZSgpIHx8IE1haW4uRGV2aWNlRGV0ZWN0aW9uLmlzVGFibGV0KCk7XHJcbiAgICBjaGVja01lbnUobWFpbk1lbnUsICFpc1NtYWxsKTtcclxuICB9KTtcclxuICBcclxuICAvLyB0b2dnbGUgc3RhdGUgYnkgYnRuXHJcbiAgbWFpbk1lbnUuYnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgY2hlY2tNZW51KG1haW5NZW51LCAhbWFpbk1lbnUuc3RhdGUpO1xyXG4gIH0pO1xyXG4gIFxyXG4gIC8vIGNsb3NlIGJ5IGNsaWNrIG91dHNpZGVcclxuICAkKCcubGF5b3V0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGlzU21hbGwgPSBNYWluLkRldmljZURldGVjdGlvbi5pc01vYmlsZSgpIHx8IE1haW4uRGV2aWNlRGV0ZWN0aW9uLmlzVGFibGV0KCk7XHJcbiAgICBpZiAoaXNTbWFsbCkge1xyXG4gICAgICBpZiAoIW1haW5NZW51LmVsLmZpbmQoZS50YXJnZXQpLmxlbmd0aCkge1xyXG4gICAgICAgIGNsb3NlTWVudShtYWluTWVudSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuICBcclxuICAvLyBzdG9wIGJ1YmJsaW5nIGNsaWNrIGluc2lkZVxyXG4gIG1haW5NZW51LmVsLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIH0pXHJcbiAgXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXQsIGNoZWNrTWVudX07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL21haW4tbWVudS5qcyIsIi8qKlxyXG4gKiDQktC40LTQtdC+XHJcbiAqIEBtb2R1bGUgVmlkZW9cclxuICovXHJcblxyXG5cclxuLyoqXHJcbiAqINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5INC00LvRjyDQstGB0L/Qu9GL0LLQsNGO0YnQuNGFINC+0LrQvtC9XHJcbiAqIEBleGFtcGxlXHJcbiAqIE1vZGFsLmluaXQoKTtcclxuICovXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuICBcclxuICAkKCcubW9kYWwtLXZpZGVvJykub24oJ29wZW5lZCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAkKHRoaXMpLmZpbmQoJy5qcy1tb2RhbC12aWRlbycpWzBdLnBsYXkoKTtcclxuICB9KTtcclxuICAkKCcubW9kYWwtLXZpZGVvJykub24oJ2Nsb3NlZCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAkKHRoaXMpLmZpbmQoJy5qcy1tb2RhbC12aWRlbycpWzBdLnBhdXNlKCk7XHJcbiAgfSk7XHJcbiAgXHJcbiAgJCgndmlkZW8nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgbGV0IHNlbGYgPSAkKHRoaXMpWzBdO1xyXG4gICAgaWYgKHNlbGYucGF1c2VkKSB7XHJcbiAgICAgIHNlbGYucGxheSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2VsZi5wYXVzZSgpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL3ZpZGVvLmpzIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBOzs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDM0JBOzs7OztBQUtBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBT0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOzs7Ozs7Ozs7QUNwS0E7Ozs7O0FBTUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNoRUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFaQTtBQWNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDMUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdEVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNuQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDM0NBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7Ozs7Ozs7OztBQzlFQTs7Ozs7QUFNQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=