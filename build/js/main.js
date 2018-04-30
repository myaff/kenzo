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
	var Animation = __webpack_require__(10);

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

	  $('html').addClass('is-animating');

	  if ($('.page').hasClass('page--home')) {
	    $('html, body').css('overflow-y', 'hidden');
	    $('.js-placeholder').on('click', function () {
	      $('html, body').css('overflow-y', '');
	      Animation.init();
	      $(this).closest('.home-placeholder').fadeOut(500);
	      $('.a-anim-text').addClass('animate');
	    });
	  } else {
	    Animation.init();
	  }
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

	  $(window).scroll($.debounce(250, true, function () {
	    $('html').addClass('is-scrolling');
	  }));
	  $(window).scroll($.debounce(250, function () {
	    $('html').removeClass('is-scrolling');
	  }));
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

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Переключение классов по различным событиям
	 * @module Animation
	 */

	var scrollAnimationBlocks = $('.a-scroll-box');
	var parallaxBlocks = $('.a-parallax-box');

	function addClassTogglerScene(el, controller) {
	  new ScrollMagic.Scene({
	    triggerElement: el,
	    triggerHook: 0.2
	  }).setClassToggle(el, 'animate').addTo(controller).on('enter', function () {
	    $('.a-indicator').removeClass('active').eq($(el).index()).addClass('active');
	  }).on('leave', function () {
	    $('.a-indicator').removeClass('active').eq($(el).index() - 1).addClass('active');
	  });
	}

	function addClassTogglerController(animationBlocks) {
	  var controller = new ScrollMagic.Controller();
	  animationBlocks.each(function () {
	    var aDelay = 300;
	    if (this.offsetTop < window.innerHeight) {
	      aDelay = 1300;
	    }
	    setTimeout(addClassTogglerScene, aDelay, this, controller);
	    //}
	  });
	}

	function getFromPosition(el) {
	  var defaultPosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	  return el.attr('data-parallax-from') !== undefined ? Number(el.attr('data-parallax-from')) : defaultPosition;
	}
	function getToPosition(el) {
	  var defaultPosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	  return el.attr('data-parallax-to') !== undefined ? Number(el.attr('data-parallax-to')) : defaultPosition;
	}

	function getParallaxTimeline(el) {
	  var tween = new TimelineMax();
	  var tweensArr = [];
	  if ($(el).find('.a-parallax-back')) {
	    var targetEl = $(el).find('.a-parallax-back');
	    var fromPos = getFromPosition(targetEl, -20);
	    var toPos = getToPosition(targetEl);
	    tweensArr.push(TweenMax.fromTo(targetEl, 1, { yPercent: fromPos }, { yPercent: toPos, ease: Linear.easeNone }));
	  }
	  if ($(el).find('.a-parallax-middle')) {
	    var _targetEl = $(el).find('.a-parallax-middle');
	    var _fromPos = getFromPosition(_targetEl, -15);
	    var _toPos = getToPosition(_targetEl);
	    tweensArr.push(TweenMax.fromTo(_targetEl, 1, { yPercent: _fromPos }, { yPercent: _toPos, ease: Linear.easeNone }));
	  }
	  if ($(el).find('.a-parallax-front')) {
	    var _targetEl2 = $(el).find('.a-parallax-front');
	    var _fromPos2 = getFromPosition(_targetEl2, -10);
	    var _toPos2 = getToPosition(_targetEl2, 10);
	    tweensArr.push(TweenMax.fromTo(_targetEl2, 1, { yPercent: _fromPos2 }, { yPercent: _toPos2, ease: Linear.easeNone }));
	  }
	  tween.add(tweensArr);
	  return tween;
	}

	function addParallaxScene(el, tween, controller) {
	  new ScrollMagic.Scene({
	    triggerElement: el,
	    triggerHook: 0,
	    duration: $(el).height()
	  }).setTween(tween).addTo(controller);
	}

	function addParallaxController(animationBlocks) {
	  var controller = new ScrollMagic.Controller();
	  animationBlocks.each(function () {
	    var tween = getParallaxTimeline(this);
	    addParallaxScene(this, tween, controller);
	  });
	}

	function init() {
	  if (scrollAnimationBlocks.length > 0) {
	    //$('html').addClass('is-animating');
	    addClassTogglerController(scrollAnimationBlocks);
	  }

	  if (!Main.DeviceDetection.isTouch()) {
	    $('.js-hover').on('mouseenter', function () {
	      var self = $(this);
	      self.addClass('a-enter');
	    });
	    $('.js-hover').on('mouseleave', function () {
	      var self = $(this);
	      self.removeClass('a-enter').addClass('a-leave');
	      setTimeout(function () {
	        self.removeClass('a-leave');
	      }, 300, self);
	    });
	  }

	  if (parallaxBlocks.length > 0 && $(window).width() > 1024) {
	    $('html').addClass('is-animating');
	    addParallaxController(parallaxBlocks);
	  }
	}

	module.exports = { init: init };

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiYmMwOGQ5ZGZhOTExYmI1N2ZiYiIsIndlYnBhY2s6Ly8vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2lucHV0LmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9mb3JtLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9tb2RhbC5qcyIsIndlYnBhY2s6Ly8vc3JjL2pzL2NvbXBvbmVudHMvYWNjb3JkaW9uLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy90YWJzLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9tYWluLW1lbnUuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL3ZpZGVvLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9hbmltYXRpb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2tlbnpvL2J1aWxkL2pzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGJiYzA4ZDlkZmE5MTFiYjU3ZmJiIiwibGV0IERldmljZURldGVjdGlvbiA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvZGV2aWNlLWRldGVjdGlvblwiKTtcclxubGV0IEhlbHBlcnMgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2hlbHBlcnNcIik7XHJcbmxldCBJbnB1dCA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvaW5wdXRcIik7XHJcbmxldCBGb3JtID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9mb3JtXCIpO1xyXG5sZXQgTW9kYWwgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL21vZGFsXCIpO1xyXG5sZXQgQWNjb3JkaW9uID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9hY2NvcmRpb25cIik7XHJcbmxldCBUYWJzID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy90YWJzXCIpO1xyXG5sZXQgTWFpbk1lbnUgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL21haW4tbWVudVwiKTtcclxubGV0IFZpZGVvID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy92aWRlb1wiKTtcclxubGV0IEFuaW1hdGlvbiA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvYW5pbWF0aW9uXCIpO1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuICBcclxuICBEZXZpY2VEZXRlY3Rpb24ucnVuKCk7XHJcbiAgSGVscGVycy5pbml0KCk7XHJcbiAgSW5wdXQuaW5pdCgpO1xyXG4gIEZvcm0uaW5pdCgpO1xyXG4gIE1vZGFsLmluaXQoKTtcclxuICBBY2NvcmRpb24uaW5pdCgpO1xyXG4gIFRhYnMuaW5pdCgpO1xyXG4gIC8vTWFpbk1lbnUuaW5pdCgpO1xyXG4gIFZpZGVvLmluaXQoKTtcclxuICBcclxuICAkKCdodG1sJykuYWRkQ2xhc3MoJ2lzLWFuaW1hdGluZycpO1xyXG4gIFxyXG4gIGlmICgkKCcucGFnZScpLmhhc0NsYXNzKCdwYWdlLS1ob21lJykpIHtcclxuICAgICQoJ2h0bWwsIGJvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnaGlkZGVuJyk7XHJcbiAgICAkKCcuanMtcGxhY2Vob2xkZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAkKCdodG1sLCBib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJycpO1xyXG4gICAgICBBbmltYXRpb24uaW5pdCgpO1xyXG4gICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5ob21lLXBsYWNlaG9sZGVyJykuZmFkZU91dCg1MDApO1xyXG4gICAgICAkKCcuYS1hbmltLXRleHQnKS5hZGRDbGFzcygnYW5pbWF0ZScpO1xyXG4gICAgfSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIEFuaW1hdGlvbi5pbml0KCk7XHJcbiAgfVxyXG4gIFxyXG59KTtcclxuXHJcblxyXG4vKipcclxuICog0KHQv9C40YHQvtC6INGN0LrRgdC/0L7RgNGC0LjRgNGD0LXQvNGL0YUg0LzQvtC00YPQu9C10LksINGH0YLQvtCx0Ysg0LjQvNC10YLRjCDQuiDQvdC40Lwg0LTQvtGB0YLRg9C/INC40LfQstC90LVcclxuICogQGV4YW1wbGVcclxuICogTWFpbi5Gb3JtLmlzRm9ybVZhbGlkKCk7XHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBEZXZpY2VEZXRlY3Rpb24sXHJcbiAgSGVscGVycyxcclxuICBJbnB1dCxcclxuICBGb3JtLFxyXG4gIE1vZGFsLFxyXG4gIEFjY29yZGlvbixcclxuICBUYWJzLFxyXG4gIE1haW5NZW51LFxyXG4gIFZpZGVvXHJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9tYWluLmpzIiwibGV0IGJyZWFrcG9pbnRzID0ge1xyXG4gIHNtOiA3NjcsXHJcbiAgbWQ6IDEwMjQsXHJcbiAgbGc6IDEyODAsXHJcbiAgeGw6IDE2MDBcclxufTtcclxuXHJcbmZ1bmN0aW9uIGlzTW9iaWxlKCl7XHJcbiAgcmV0dXJuICgkKHdpbmRvdykud2lkdGgoKSA8PSBicmVha3BvaW50cy5zbSk7XHJcbn1cclxuZnVuY3Rpb24gaXNUYWJsZXQoKXtcclxuICByZXR1cm4gKCQod2luZG93KS53aWR0aCgpID4gYnJlYWtwb2ludHMuc20gJiYgJCh3aW5kb3cpLndpZHRoKCkgPD0gYnJlYWtwb2ludHMubWQpXHJcbn1cclxuZnVuY3Rpb24gaXNUb3VjaCgpe1xyXG4gIHJldHVybiAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgfHwgbmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzO1xyXG59XHJcbmZ1bmN0aW9uIGlzTW9iaWxlVmVyc2lvbigpe1xyXG4gIHJldHVybiAhIX53aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKFwiL21vYmlsZS9cIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJ1bigpe1xyXG4gIGlmKGlzVG91Y2goKSl7XHJcbiAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoJ25vLXRvdWNoJykuYWRkQ2xhc3MoJ3RvdWNoJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgICQoJ2h0bWwnKS5yZW1vdmVDbGFzcygndG91Y2gnKS5hZGRDbGFzcygnbm8tdG91Y2gnKTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge3J1biwgaXNUb3VjaCwgaXNNb2JpbGUsIGlzVGFibGV0LCBpc01vYmlsZVZlcnNpb259O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9kZXZpY2UtZGV0ZWN0aW9uLmpzIiwiLyoqXHJcbiAqIEhlbHBlcnNcclxuICogQG1vZHVsZSBIZWxwZXJzXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZSBzY3JvbGxiYXIgd2lkdGggaW4gZWxlbWVudFxyXG4gKiAtIGlmIHRoZSB3aWR0aCBpcyAwIGl0IG1lYW5zIHRoZSBzY3JvbGxiYXIgaXMgZmxvYXRlZC9vdmVybGF5ZWRcclxuICogLSBhY2NlcHRzIFwiY29udGFpbmVyXCIgcGFyZW1ldGVyIGJlY2F1c2UgaWUgJiBlZGdlIGNhbiBoYXZlIGRpZmZlcmVudFxyXG4gKiAgIHNjcm9sbGJhciBiZWhhdmlvcnMgZm9yIGRpZmZlcmVudCBlbGVtZW50cyB1c2luZyAnLW1zLW92ZXJmbG93LXN0eWxlJ1xyXG4gKi9cclxuZnVuY3Rpb24gZ2V0TmF0aXZlU2Nyb2xsYmFyV2lkdGggKGNvbnRhaW5lcikge1xyXG4gIGNvbnRhaW5lciA9IGNvbnRhaW5lciB8fCBkb2N1bWVudC5ib2R5O1xyXG5cclxuICBsZXQgZnVsbFdpZHRoID0gMDtcclxuICBsZXQgYmFyV2lkdGggPSAwO1xyXG5cclxuICBsZXQgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIGxldCBjaGlsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICB3cmFwcGVyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICB3cmFwcGVyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XHJcbiAgd3JhcHBlci5zdHlsZS5ib3R0b20gPSAnMCc7XHJcbiAgd3JhcHBlci5zdHlsZS5yaWdodCA9ICcwJztcclxuICB3cmFwcGVyLnN0eWxlLndpZHRoID0gJzEwMHB4JztcclxuICB3cmFwcGVyLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcblxyXG4gIHdyYXBwZXIuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh3cmFwcGVyKTtcclxuXHJcbiAgZnVsbFdpZHRoID0gY2hpbGQub2Zmc2V0V2lkdGg7XHJcbiAgd3JhcHBlci5zdHlsZS5vdmVyZmxvd1kgPSAnc2Nyb2xsJztcclxuICBiYXJXaWR0aCA9IGZ1bGxXaWR0aCAtIGNoaWxkLm9mZnNldFdpZHRoO1xyXG5cclxuICBjb250YWluZXIucmVtb3ZlQ2hpbGQod3JhcHBlcik7XHJcblxyXG4gIHJldHVybiBiYXJXaWR0aDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRocm90dGxlIEhlbHBlclxyXG4gKiBodHRwczovL3JlbXlzaGFycC5jb20vMjAxMC8wNy8yMS90aHJvdHRsaW5nLWZ1bmN0aW9uLWNhbGxzXHJcbiAqL1xyXG5mdW5jdGlvbiB0aHJvdHRsZSAoZm4sIHRocmVzaGhvbGQsIHNjb3BlKSB7XHJcbiAgdGhyZXNoaG9sZCB8fCAodGhyZXNoaG9sZCA9IDI1MCk7XHJcbiAgbGV0IGxhc3QsXHJcbiAgICBkZWZlclRpbWVyO1xyXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgY29udGV4dCA9IHNjb3BlIHx8IHRoaXM7XHJcblxyXG4gICAgbGV0IG5vdyA9ICtuZXcgRGF0ZSgpLFxyXG4gICAgICBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgaWYgKGxhc3QgJiYgbm93IDwgbGFzdCArIHRocmVzaGhvbGQpIHtcclxuICAgICAgLy8gaG9sZCBvbiB0byBpdFxyXG4gICAgICBjbGVhclRpbWVvdXQoZGVmZXJUaW1lcik7XHJcbiAgICAgIGRlZmVyVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsYXN0ID0gbm93O1xyXG4gICAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG4gICAgICB9LCB0aHJlc2hob2xkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxhc3QgPSBub3c7XHJcbiAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLyoqIFxyXG4gKiBEZWJvdW5jZSBIZWxwZXJcclxuICogaHR0cHM6Ly9yZW15c2hhcnAuY29tLzIwMTAvMDcvMjEvdGhyb3R0bGluZy1mdW5jdGlvbi1jYWxsc1xyXG4gKi9cclxuZnVuY3Rpb24gZGVib3VuY2UgKGZuLCBkZWxheSkge1xyXG4gIGxldCB0aW1lciA9IG51bGw7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBjb250ZXh0ID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cztcclxuICAgIGNsZWFyVGltZW91dCh0aW1lcik7XHJcbiAgICB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICBmbi5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuICAgIH0sIGRlbGF5KTtcclxuICB9O1xyXG59O1xyXG5cclxubGV0IHRpbWVyO1xyXG5sZXQgdGltZW91dCA9IGZhbHNlO1xyXG5sZXQgZGVsdGEgPSAyMDA7XHJcbmZ1bmN0aW9uIHJlc2l6ZUVuZCgpIHtcclxuICBpZiAobmV3IERhdGUoKSAtIHRpbWVyIDwgZGVsdGEpIHtcclxuICAgIHNldFRpbWVvdXQocmVzaXplRW5kLCBkZWx0YSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRpbWVvdXQgPSBmYWxzZTtcclxuICAgICQod2luZG93KS50cmlnZ2VyKCdyZXNpemVlbmQnKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZUNsYXNzSWYoZWwsIGNvbmQsIHRvZ2dsZWRDbGFzcyl7XHJcblx0aWYoY29uZCl7XHJcblx0XHRlbC5hZGRDbGFzcyh0b2dnbGVkQ2xhc3MpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRlbC5yZW1vdmVDbGFzcyh0b2dnbGVkQ2xhc3MpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqINCk0YPQvdC60YbQuNGPINC00L7QsdCw0LLQu9GP0LXRgiDQuiDRjdC70LXQvNC10L3RgtGDINC60LvQsNGB0YEsINC10YHQu9C4INGB0YLRgNCw0L3QuNGG0LAg0L/RgNC+0LrRgNGD0YfQtdC90LAg0LHQvtC70YzRiNC1LCDRh9C10Lwg0L3QsCDRg9C60LDQt9Cw0L3QvdC+0LUg0LfQvdCw0YfQtdC90LjQtSwgXHJcbiAqINC4INGD0LHQuNGA0LDQtdGCINC60LvQsNGB0YEsINC10YHQu9C4INC30L3QsNGH0LXQvdC40LUg0LzQtdC90YzRiNC1XHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBlbCAtINGN0LvQtdC80LXQvdGCLCDRgSDQutC+0YLQvtGA0YvQvCDQstC30LDQuNC80L7QtNC10LnRgdGC0LLRg9C10LxcclxuICogQHBhcmFtIHttaXhlZH0gW3Njcm9sbFZhbHVlPTBdIC0g0LfQvdCw0YfQtdC90LjQtSDQv9GA0L7QutGA0YPRgtC60LgsINC90LAg0LrQvtGC0L7RgNC+0Lwg0LzQtdC90Y/QtdC8IGNzcy3QutC70LDRgdGBLCDQvtC20LjQtNCw0LXQvNC+0LUg0LfQvdCw0YfQtdC90LjQtSAtINGH0LjRgdC70L4g0LjQu9C4INC60LvRjtGH0LXQstC+0LUg0YHQu9C+0LLQviAndGhpcycuINCV0YHQu9C4INC/0LXRgNC10LTQsNC90L4gJ3RoaXMnLCDQv9C+0LTRgdGC0LDQstC70Y/QtdGC0YHRjyDQv9C+0LvQvtC20LXQvdC40LUgZWwub2Zmc2V0KCkudG9wINC80LjQvdGD0YEg0L/QvtC70L7QstC40L3QsCDQstGL0YHQvtGC0Ysg0Y3QutGA0LDQvdCwXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdG9nZ2xlZENsYXNzPXNjcm9sbGVkXSAtIGNzcy3QutC70LDRgdGBLCDQutC+0YLQvtGA0YvQuSDQv9C10YDQtdC60LvRjtGH0LDQtdC8XHJcbiAqL1xyXG5mdW5jdGlvbiB0b2dnbGVFbGVtZW50Q2xhc3NPblNjcm9sbChlbCwgc2Nyb2xsVmFsdWUgPSAwLCB0b2dnbGVkQ2xhc3MgPSAnc2Nyb2xsZWQnKXtcclxuXHRpZihlbC5sZW5ndGggPT0gMCkge1xyXG5cdFx0Ly9jb25zb2xlLmVycm9yKFwi0J3QtdC+0LHRhdC+0LTQuNC80L4g0L/QtdGA0LXQtNCw0YLRjCDQvtCx0YrQtdC60YIsINGBINC60L7RgtC+0YDRi9C8INCy0Ysg0YXQvtGC0LjRgtC1INCy0LfQsNC40LzQvtC00LXQudGB0YLQstC+0LLQsNGC0YxcIik7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cdFxyXG5cdGlmKHNjcm9sbFZhbHVlID09ICd0aGlzJykge1xyXG5cdFx0c2Nyb2xsVmFsdWUgPSBlbC5vZmZzZXQoKS50b3AgLSAkKHdpbmRvdykub3V0ZXJIZWlnaHQoKSAvIDI7XHJcblx0fVxyXG5cdFxyXG5cdCQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oZSl7XHJcblx0XHRpZigkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiBzY3JvbGxWYWx1ZSl7XHJcblx0XHRcdGVsLmFkZENsYXNzKHRvZ2dsZWRDbGFzcyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRlbC5yZW1vdmVDbGFzcyh0b2dnbGVkQ2xhc3MpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5INC00LvRjyDQv9C10YDQtdC60LvRjtGH0LDRgtC10LvQtdC5INC60LvQsNGB0YHQvtCyXHJcbiAqIEBleGFtcGxlXHJcbiAqIEhlbHBlcnMuaW5pdCgpO1xyXG4gKi9cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gIFxyXG4gIHRvZ2dsZUVsZW1lbnRDbGFzc09uU2Nyb2xsKCQoJy5oZWFkZXInKSwgNTApO1xyXG4gIFxyXG4gICQoJy5qcy1oaWRlLWJsb2NrJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgIGxldCBibG9jayA9ICQodGhpcykuZGF0YSgndGFyZ2V0JykgPT09ICdzZWxmJyA/ICQodGhpcykucGFyZW50KCkgOiAkKHRoaXMpLmRhdGEoJ3RhcmdldCcpO1xyXG4gICAgYmxvY2suZmFkZU91dCg1MDApO1xyXG4gIH0pO1xyXG4gIFxyXG4gICQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24gKCkge1xyXG4gICAgdGltZXIgPSBuZXcgRGF0ZSgpO1xyXG4gICAgaWYgKHRpbWVvdXQgPT09IGZhbHNlKSB7XHJcbiAgICAgIHRpbWVvdXQgPSB0cnVlO1xyXG4gICAgICBzZXRUaW1lb3V0KHJlc2l6ZUVuZCwgZGVsdGEpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIFxyXG4gICQoJy5idG4tbWVudScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAkKCcuaGVhZGVyJykudG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICQoJy5tYWluLW5hdicpLnNsaWRlVG9nZ2xlKDUwMCk7XHJcbiAgICBpZiAoTWFpbi5EZXZpY2VEZXRlY3Rpb24uaXNNb2JpbGVWZXJzaW9uKCkpIHtcclxuICAgICAgaWYgKCQoJy5oZWFkZXInKS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2lzLW9wZW4nKTtcclxuICAgICAgICAkKCdodG1sLCBib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJ2hpZGRlbicpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuICBcclxuICAkKHdpbmRvdykuc2Nyb2xsKCQuZGVib3VuY2UoMjUwLCB0cnVlLCBmdW5jdGlvbigpIHtcclxuICAgICQoJ2h0bWwnKS5hZGRDbGFzcygnaXMtc2Nyb2xsaW5nJyk7XHJcbiAgfSkpO1xyXG4gICQod2luZG93KS5zY3JvbGwoJC5kZWJvdW5jZSgyNTAsIGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnaHRtbCcpLnJlbW92ZUNsYXNzKCdpcy1zY3JvbGxpbmcnKTtcclxuICB9KSk7XHJcbiAgXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXQsIHRvZ2dsZUNsYXNzSWYsIHRvZ2dsZUVsZW1lbnRDbGFzc09uU2Nyb2xsfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvaGVscGVycy5qcyIsIi8qKlxyXG4gKiDQnNC+0LTRg9C70Ywg0LTQu9GPINGA0LDQsdC+0YLRiyBwbGFjZWhvbGRlciDQsiDRjdC70LXQvNC10L3RgtCw0YUg0YTQvtGA0LzRiyAoLmZpZWxkKVxyXG4gKiBAbW9kdWxlIElucHV0XHJcbiAqL1xyXG5cclxuXHJcbi8qKlxyXG4gKiDQo9GB0YLQsNC90L7QstC40YLRjCDRhNC+0LrRg9GBXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dFxyXG4gKi9cclxuZnVuY3Rpb24gZm9jdXNMYWJlbChpbnB1dCl7XHJcbiAgICBpbnB1dC5jbG9zZXN0KCcuZmllbGQnKS5hZGRDbGFzcyhcImhhcy1mb2N1c1wiKTtcclxufVxyXG5cclxuLyoqXHJcbiAqINCj0LHRgNCw0YLRjCDRhNC+0LrRg9GBXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dFxyXG4gKi9cclxuZnVuY3Rpb24gYmx1ckxhYmVsKGlucHV0KXtcclxuICAgIHZhciB3cmFwcGVyID0gaW5wdXQuY2xvc2VzdCgnLmZpZWxkJyk7XHJcbiAgICB3cmFwcGVyLnJlbW92ZUNsYXNzKFwiaGFzLWZvY3VzXCIpO1xyXG59XHJcblxyXG4vKipcclxuICog0J/RgNC+0LLQtdGA0LjRgtGMINC40L3Qv9GD0YIg0L3QsCDQvdCw0LvQuNGH0LjQtSB2YWx1ZVxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAcGFyYW0ge29iamVjdH0gaW5wdXRcclxuICovXHJcbmZ1bmN0aW9uIGNoZWNrSW5wdXQoaW5wdXQpe1xyXG4gICAgdmFyIHdyYXBwZXIgPSBpbnB1dC5jbG9zZXN0KCcuZmllbGQnKTtcclxuICAgIGlmIChpbnB1dC52YWwoKS5sZW5ndGggPiAwKVxyXG4gICAgICAgIHdyYXBwZXIuYWRkQ2xhc3MoXCJoYXMtdmFsdWVcIik7XHJcbiAgICBlbHNlXHJcbiAgICAgICAgd3JhcHBlci5yZW1vdmVDbGFzcyhcImhhcy12YWx1ZVwiKTtcclxufVxyXG5cclxuLyoqXHJcbiAqINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5INC00LvRjyDQuNC90L/Rg9GC0LBcclxuICogQGV4YW1wbGVcclxuICogSW5wdXQuaW5pdCgpO1xyXG4gKi9cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gICAgbGV0IGlucHV0cyA9ICQoJy5maWVsZF9faW5wdXQnKTtcclxuICAgIGxldCBwbGFjZWhvbGRlcnMgPSAkKCcuZmllbGRfX3BsYWNlaG9sZGVyJyk7XHJcbiAgICBcclxuICAgIHBsYWNlaG9sZGVycy5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5maWVsZCcpLmZpbmQoJy5maWVsZF9faW5wdXQnKS5mb2N1cygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaW5wdXRzLmVhY2goZnVuY3Rpb24oaSwgaXRlbSkge1xyXG4gICAgICAgIGNoZWNrSW5wdXQoJChpdGVtKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpbnB1dHMuZm9jdXMoZnVuY3Rpb24oKXtcclxuICAgICAgICBmb2N1c0xhYmVsKCQodGhpcykpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaW5wdXRzLmJsdXIoZnVuY3Rpb24oKXtcclxuICAgICAgICBibHVyTGFiZWwoJCh0aGlzKSk7XHJcbiAgICAgICAgY2hlY2tJbnB1dCgkKHRoaXMpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvaW5wdXQuanMiLCIvKipcclxuICog0JzQvtC00YPQu9GMINC00LvRjyDRgNCw0LHQvtGC0Ysg0KTQvtGA0LxcclxuICogQG1vZHVsZSBGb3JtXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGVGaWVsZChmaWVsZCkge1xyXG4gIGxldCBpc1ZhbGlkID0gZmllbGQudmFsaWRpdHkudmFsaWQ7XHJcbiAgbGV0IGZpZWxkQ29udGFpbmVyID0gJChmaWVsZCkuY2xvc2VzdCgnLmZpZWxkJyk7XHJcbiAgaWYgKGlzVmFsaWQpIHtcclxuICAgIGZpZWxkQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdoYXMtZXJyb3InKTtcclxuICB9IGVsc2Uge1xyXG4gICAgZmllbGRDb250YWluZXIuYWRkQ2xhc3MoJ2hhcy1lcnJvcicpO1xyXG4gIH1cclxuICByZXR1cm4gaXNWYWxpZDtcclxufVxyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGVGb3JtKGVsRm9ybSkge1xyXG4gIGxldCBlcnJvcnMgPSAwO1xyXG4gIEFycmF5LmZyb20oZWxGb3JtLmVsZW1lbnRzKS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgIGxldCBpc1ZhbGlkRmllbGQgPSB2YWxpZGF0ZUZpZWxkKGl0ZW0pO1xyXG4gICAgaWYoIWlzVmFsaWRGaWVsZCkge1xyXG4gICAgICBlcnJvcnMgKz0gMTtcclxuICAgIH1cclxuICB9KTtcclxuICByZXR1cm4gZXJyb3JzO1xyXG59XHJcblxyXG4vKipcclxuICog0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YHQvtCx0YvRgtC40Lkg0YTQvtGA0LxcclxuICogQGV4YW1wbGVcclxuICogRm9ybS5pbml0KCk7XHJcbiAqL1xyXG5mdW5jdGlvbiBpbml0KCl7XHJcbiAgbGV0IGpzRm9ybSA9ICQoJy5qcy1mb3JtJyk7XHJcbiAgXHJcbiAgJCgnaW5wdXQsIHRleHRhcmVhJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcbiAgICB2YWxpZGF0ZUZpZWxkKHRoaXMpO1xyXG4gIH0pO1xyXG4gIFxyXG4gIGpzRm9ybS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgc2VsZiA9ICQodGhpcyk7XHJcbiAgICBsZXQgc2VsZkZvcm0gPSBzZWxmLmZpbmQoJy5qcy1mb3JtLWZvcm0nKTtcclxuICAgIGxldCBzZWxmUmVzdWx0ID0gc2VsZi5maW5kKCcuanMtZm9ybS1yZXN1bHQnKTtcclxuICAgIGxldCBzZWxmU3VibWl0ID0gc2VsZi5maW5kKCcuanMtZm9ybS1zdWJtaXQnKTtcclxuICAgIFxyXG4gICAgc2VsZlN1Ym1pdC5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgbGV0IGhhc0Vycm9yID0gdmFsaWRhdGVGb3JtKHNlbGZGb3JtWzBdKTtcclxuICAgICAgaWYgKCFoYXNFcnJvcikge1xyXG4gICAgICAgIGxldCByZXF1ZXN0ID0gJC5hamF4KHtcclxuICAgICAgICAgIHVybDogJ2h0dHA6Ly9sb2NjaXRhbmUuaHNtcC5ydS9hcGkvZW1haWxzLycsXHJcbiAgICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAnbmFtZSc6ICQoc2VsZkZvcm0pLmZpbmQoJ2lucHV0W25hbWU9XCJuYW1lXCJdJykudmFsKCksXHJcbiAgICAgICAgICAgICdlbWFpbCc6ICQoc2VsZkZvcm0pLmZpbmQoJ2lucHV0W25hbWU9XCJlbWFpbFwiXScpLnZhbCgpLFxyXG4gICAgICAgICAgICAnbWVzc2FnZSc6ICQoc2VsZkZvcm0pLmZpbmQoJ3RleHRhcmVhW25hbWU9XCJtZXNzYWdlXCJdJykudmFsKCksXHJcbiAgICAgICAgICAgICdwYWdlJzogd2luZG93LmxvY2F0aW9uLmhyZWZcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNlbGZTdWJtaXQuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXF1ZXN0LmRvbmUoZnVuY3Rpb24gKHJlc3BvbnNlLCB0ZXh0U3RhdHVzLCBqcVhIUikge1xyXG4gICAgICAgICAgc2VsZi5hZGRDbGFzcygnaXMtc3VibWl0dGVkJyk7XHJcbiAgICAgICAgICBzZWxmLnRyaWdnZXIoJ3N1Ym1pdHRlZCcpO1xyXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBzZWxmUmVzdWx0LnNob3coKTtcclxuICAgICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvZm9ybS5qcyIsIi8qKlxyXG4gKiDQktGB0L/Qu9GL0LLQsNGO0YnQuNC1INC+0LrQvdCwXHJcbiAqIEBtb2R1bGUgTW9kYWxcclxuICovXHJcblxyXG5sZXQgbGF5b3V0ID0gJCgnLmxheW91dCcpO1xyXG5sZXQgd3JhcHBlciA9ICQoJy5tb2RhbF9fd3JhcHBlcicpO1xyXG4gXHJcbmZ1bmN0aW9uIG9wZW5Nb2RhbCh0YXJnZXQpIHtcclxuICBsZXQgbW9kYWwgPSAkKHRhcmdldCk7XHJcbiAgaWYgKCFsYXlvdXQuaGFzQ2xhc3MoJ21vZGFsLW9wZW4nKSkge1xyXG4gICAgbGF5b3V0LmFkZENsYXNzKCdtb2RhbC1vcGVuJyk7XHJcbiAgICAkKCdodG1sLCBib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJ2hpZGRlbicpO1xyXG4gICAgd3JhcHBlci5mYWRlSW4oMzAwKS5hZGRDbGFzcygnbW9kYWwtb3BlbicpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjbG9zZVByZXZNb2RhbHModGFyZ2V0KTtcclxuICB9XHJcbiAgbW9kYWwuZmFkZUluKDMwMCkuYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICBtb2RhbC50cmlnZ2VyKCdvcGVuZWQnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xvc2VNb2RhbCh0YXJnZXQpIHtcclxuICBsZXQgbW9kYWwgPSAkKHRhcmdldCk7XHJcbiAgbW9kYWwuZmFkZU91dCgzMDApLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgd3JhcHBlci5mYWRlT3V0KDMwMCkucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICBsYXlvdXQucmVtb3ZlQ2xhc3MoJ21vZGFsLW9wZW4nKTtcclxuICAkKCdodG1sLCBib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJycpO1xyXG4gIG1vZGFsLnRyaWdnZXIoJ2Nsb3NlZCcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbG9zZVByZXZNb2RhbHModGFyZ2V0KSB7XHJcbiAgbGV0IG1vZGFsID0gJCh0YXJnZXQpO1xyXG4gIG1vZGFsLnNpYmxpbmdzKCcubW9kYWwuaXMtb3BlbicpLmZhZGVPdXQoMzAwKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpLnRyaWdnZXIoJ2Nsb3NlZCcpO1xyXG59XHJcblxyXG4vKipcclxuICog0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YHQvtCx0YvRgtC40Lkg0LTQu9GPINCy0YHQv9C70YvQstCw0Y7RidC40YUg0L7QutC+0L1cclxuICogQGV4YW1wbGVcclxuICogTW9kYWwuaW5pdCgpO1xyXG4gKi9cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gICAgXHJcbiAgJCgnLmpzLW1vZGFsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgbGV0IHRhcmdldCA9ICQodGhpcykuZGF0YSgndGFyZ2V0Jyk7XHJcbiAgICAgIGlmICghJCh0YXJnZXQpLmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuICAgICAgICBvcGVuTW9kYWwodGFyZ2V0KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjbG9zZU1vZGFsKHRhcmdldCk7XHJcbiAgICAgIH1cclxuICB9KTtcclxuICBcclxuICAkKCcuYnRuLWNsb3NlLW1vZGFsJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGxldCBtb2RhbCA9ICQodGhpcykuY2xvc2VzdCgnLm1vZGFsJyk7XHJcbiAgICBjbG9zZU1vZGFsKG1vZGFsKTtcclxuICB9KTtcclxuICBcclxuICAkKCcubW9kYWxfX3dyYXBwZXInKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICBjbG9zZU1vZGFsKCcubW9kYWwnKTtcclxuICB9KTtcclxuICAkKCcubW9kYWwnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIH0pO1xyXG4gIFxyXG4gICQoJy5tb2RhbC0tdmlkZW8nKS5vbignb3BlbmVkJywgZnVuY3Rpb24oKXtcclxuICAgICQodGhpcykuZmluZCgnLmpzLW1vZGFsLXZpZGVvJylbMF0ucGxheSgpO1xyXG4gIH0pO1xyXG5cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdCwgb3Blbk1vZGFsLCBjbG9zZU1vZGFsfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvbW9kYWwuanMiLCIvKipcclxuICogQWNjb3JkaW9uXHJcbiAqIEBtb2R1bGUgQWNjb3JkaW9uXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gb3BlbkFjY29yZGlvbihhY2NvcmRpb24pIHtcclxuICBsZXQgYWNjb3JkaW9uQ29udGVudCA9IGFjY29yZGlvbi5maW5kKCcuYWNjb3JkaW9uX19ib2R5JykuZXEoMCk7XHJcbiAgYWNjb3JkaW9uLmFkZENsYXNzKCdpcy1vcGVuJyk7XHJcbiAgYWNjb3JkaW9uQ29udGVudC5zbGlkZURvd24oNTAwKTtcclxuICBhY2NvcmRpb24udHJpZ2dlcignb3BlbmVkJyk7XHJcbn1cclxuZnVuY3Rpb24gY2xvc2VBY2NvcmRpb24oYWNjb3JkaW9uKSB7XHJcbiAgbGV0IGFjY29yZGlvbkNvbnRlbnQgPSBhY2NvcmRpb24uZmluZCgnLmFjY29yZGlvbl9fYm9keScpLmVxKDApO1xyXG4gIFxyXG4gIGFjY29yZGlvbi5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xyXG4gIGFjY29yZGlvbkNvbnRlbnQuc2xpZGVVcCg1MDApO1xyXG4gIGFjY29yZGlvbi50cmlnZ2VyKCdjbG9zZWQnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdCgpIHtcclxuICAvLyBpbml0aWFsXHJcbiAgJCgnLmFjY29yZGlvbi5pcy1vcGVuJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgb3BlbkFjY29yZGlvbigkKHRoaXMpKTtcclxuICB9KTtcclxuICBcclxuICAvLyBhY3Rpb25cclxuICAkKCcuYWNjb3JkaW9uJykub24oJ2NsaWNrJywgJy5hY2NvcmRpb25fX2hlYWRlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IGFjY29yZGlvbiA9ICQodGhpcykuY2xvc2VzdCgnLmFjY29yZGlvbicpO1xyXG4gICAgaWYoYWNjb3JkaW9uLmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuICAgICAgY2xvc2VBY2NvcmRpb24oYWNjb3JkaW9uKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG9wZW5BY2NvcmRpb24oYWNjb3JkaW9uKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7IGluaXQgfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvYWNjb3JkaW9uLmpzIiwiLyoqXHJcbiAqIFRhYnNcclxuICogQG1vZHVsZSBUYWJzXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gb3BlblRhYih0YWIpIHtcclxuICB0YWIuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gIGxldCB0YXJnZXQgPSAkKHRhYi5kYXRhKCd0YXJnZXQnKSk7XHJcbiAgdGFyZ2V0LnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKS5zbGlkZURvd24oNTAwKTtcclxuICB0YXJnZXQudHJpZ2dlcignb3BlbmVkJyk7XHJcbn1cclxuZnVuY3Rpb24gY2xvc2VUYWIodGFiKSB7XHJcbiAgbGV0IHRhcmdldCA9ICQodGFiLmRhdGEoJ3RhcmdldCcpKTtcclxuICB0YWIucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gIHRhcmdldC5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJykuc2xpZGVVcCg1MDApO1xyXG4gIHRhcmdldC50cmlnZ2VyKCdjbG9zZWQnKTtcclxufVxyXG4gXHJcbmZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgLy8gaW5pdGlhbFxyXG4gICQoJy50YWJzJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgbGV0IGluaXRpYWxBY3RpdmU7XHJcbiAgICBpZigkKHRoaXMpLmZpbmQoJy50YWIuaXMtYWN0aXZlJykubGVuZ3RoKSB7XHJcbiAgICAgIGluaXRpYWxBY3RpdmUgPSAkKHRoaXMpLmZpbmQoJy50YWIuaXMtYWN0aXZlJykuZXEoMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpbml0aWFsQWN0aXZlID0gJCh0aGlzKS5maW5kKCcudGFiJykuZXEoMCk7XHJcbiAgICB9XHJcbiAgICBvcGVuVGFiKGluaXRpYWxBY3RpdmUpO1xyXG4gIH0pO1xyXG4gIFxyXG4gIFxyXG4gIC8vIGFjdGlvblxyXG4gICQoJy50YWInKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xyXG4gICAgICBjbG9zZVRhYigkKHRoaXMpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICQodGhpcykuc2libGluZ3MoJy5pcy1hY3RpdmUnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgY2xvc2VUYWIoJCh0aGlzKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBvcGVuVGFiKCQodGhpcykpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHsgaW5pdCB9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy90YWJzLmpzIiwiLyoqXHJcbiAqIE1haW5NZW51XHJcbiAqIEBtb2R1bGUgTWFpbk1lbnVcclxuICovXHJcblxyXG5sZXQgbWFpbk1lbnUgPSB7XHJcbiAgZWw6ICQoJy5tYWluLW5hdicpLFxyXG4gIGJ0bjogJCgnLm1haW4tbmF2LWJ0bicpLFxyXG4gIHN0YXRlOiBmYWxzZVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja01lbnUgKG1lbnUsIG1lbnVTdGF0ZSkge1xyXG4gIG1lbnUuc3RhdGUgPSBtZW51U3RhdGU7XHJcbiAgaWYgKG1lbnVTdGF0ZSkge1xyXG4gICAgb3Blbk1lbnUobWVudSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNsb3NlTWVudShtZW51KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9wZW5NZW51IChtZW51KSB7XHJcbiAgbWVudS5zdGF0ZSA9IHRydWU7XHJcbiAgJCgnaHRtbCwgYm9keScpLmNzcygnb3ZlcmZsb3cteScsICdoaWRkZW4nKTtcclxuICBtZW51LmJ0bi5hZGRDbGFzcygnaXMtb3BlbicpO1xyXG4gIG1lbnUuZWwuZmFkZUluKDUwMCk7XHJcbiAgbWVudS5lbC50cmlnZ2VyKCdvcGVuZWQnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xvc2VNZW51IChtZW51KSB7XHJcbiAgbWVudS5zdGF0ZSA9IGZhbHNlO1xyXG4gICQoJ2h0bWwsIGJvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnJyk7XHJcbiAgbWVudS5idG4ucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICBtZW51LmVsLmZhZGVPdXQoMzAwKTtcclxuICBtZW51LmVsLnRyaWdnZXIoJ2Nsb3NlZCcpO1xyXG59XHJcblxyXG4vKipcclxuICog0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0LzQtdC90Y5cclxuICogQGV4YW1wbGVcclxuICogTWFpbk1lbnUuaW5pdCgpO1xyXG4gKi9cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gIFxyXG4gIGxldCBpc1NtYWxsID0gTWFpbi5EZXZpY2VEZXRlY3Rpb24uaXNNb2JpbGUoKSB8fCBNYWluLkRldmljZURldGVjdGlvbi5pc1RhYmxldCgpO1xyXG4gIFxyXG4gIC8vIHNldCBpbml0aWFsIHN0YXRlXHJcbiAgaWYgKGlzU21hbGwpIHtcclxuICAgIGNoZWNrTWVudShtYWluTWVudSwgIWlzU21hbGwpO1xyXG4gIH1cclxuICBcclxuICAvLyBzZXQgc3RhdGUgYWZ0ZXIgcmVzaXplXHJcbiAgJCh3aW5kb3cpLm9uKCdyZXNpemVlbmQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpc1NtYWxsID0gTWFpbi5EZXZpY2VEZXRlY3Rpb24uaXNNb2JpbGUoKSB8fCBNYWluLkRldmljZURldGVjdGlvbi5pc1RhYmxldCgpO1xyXG4gICAgY2hlY2tNZW51KG1haW5NZW51LCAhaXNTbWFsbCk7XHJcbiAgfSk7XHJcbiAgXHJcbiAgLy8gdG9nZ2xlIHN0YXRlIGJ5IGJ0blxyXG4gIG1haW5NZW51LmJ0bi5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGNoZWNrTWVudShtYWluTWVudSwgIW1haW5NZW51LnN0YXRlKTtcclxuICB9KTtcclxuICBcclxuICAvLyBjbG9zZSBieSBjbGljayBvdXRzaWRlXHJcbiAgJCgnLmxheW91dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBpc1NtYWxsID0gTWFpbi5EZXZpY2VEZXRlY3Rpb24uaXNNb2JpbGUoKSB8fCBNYWluLkRldmljZURldGVjdGlvbi5pc1RhYmxldCgpO1xyXG4gICAgaWYgKGlzU21hbGwpIHtcclxuICAgICAgaWYgKCFtYWluTWVudS5lbC5maW5kKGUudGFyZ2V0KS5sZW5ndGgpIHtcclxuICAgICAgICBjbG9zZU1lbnUobWFpbk1lbnUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgXHJcbiAgLy8gc3RvcCBidWJibGluZyBjbGljayBpbnNpZGVcclxuICBtYWluTWVudS5lbC5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICB9KVxyXG4gIFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0LCBjaGVja01lbnV9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9tYWluLW1lbnUuanMiLCIvKipcclxuICog0JLQuNC00LXQvlxyXG4gKiBAbW9kdWxlIFZpZGVvXHJcbiAqL1xyXG5cclxuXHJcbi8qKlxyXG4gKiDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC+0LHRi9GC0LjQuSDQtNC70Y8g0LLRgdC/0LvRi9Cy0LDRjtGJ0LjRhSDQvtC60L7QvVxyXG4gKiBAZXhhbXBsZVxyXG4gKiBNb2RhbC5pbml0KCk7XHJcbiAqL1xyXG5mdW5jdGlvbiBpbml0KCl7XHJcbiAgXHJcbiAgJCgnLm1vZGFsLS12aWRlbycpLm9uKCdvcGVuZWQnLCBmdW5jdGlvbigpe1xyXG4gICAgJCh0aGlzKS5maW5kKCcuanMtbW9kYWwtdmlkZW8nKVswXS5wbGF5KCk7XHJcbiAgfSk7XHJcbiAgJCgnLm1vZGFsLS12aWRlbycpLm9uKCdjbG9zZWQnLCBmdW5jdGlvbigpe1xyXG4gICAgJCh0aGlzKS5maW5kKCcuanMtbW9kYWwtdmlkZW8nKVswXS5wYXVzZSgpO1xyXG4gIH0pO1xyXG4gIFxyXG4gICQoJ3ZpZGVvJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgIGxldCBzZWxmID0gJCh0aGlzKVswXTtcclxuICAgIGlmIChzZWxmLnBhdXNlZCkge1xyXG4gICAgICBzZWxmLnBsYXkoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNlbGYucGF1c2UoKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy92aWRlby5qcyIsIi8qKlxyXG4gKiDQn9C10YDQtdC60LvRjtGH0LXQvdC40LUg0LrQu9Cw0YHRgdC+0LIg0L/QviDRgNCw0LfQu9C40YfQvdGL0Lwg0YHQvtCx0YvRgtC40Y/QvFxyXG4gKiBAbW9kdWxlIEFuaW1hdGlvblxyXG4gKi9cclxuXHJcbmxldCBzY3JvbGxBbmltYXRpb25CbG9ja3MgPSAkKCcuYS1zY3JvbGwtYm94Jyk7XHJcbmxldCBwYXJhbGxheEJsb2NrcyA9ICQoJy5hLXBhcmFsbGF4LWJveCcpO1xyXG4gXHJcbmZ1bmN0aW9uIGFkZENsYXNzVG9nZ2xlclNjZW5lIChlbCwgY29udHJvbGxlcikge1xyXG4gIG5ldyBTY3JvbGxNYWdpYy5TY2VuZSh7XHJcbiAgICB0cmlnZ2VyRWxlbWVudDogZWwsXHJcbiAgICB0cmlnZ2VySG9vazogMC4yXHJcbiAgfSlcclxuICAuc2V0Q2xhc3NUb2dnbGUoZWwsICdhbmltYXRlJylcclxuICAuYWRkVG8oY29udHJvbGxlcilcclxuICAub24oJ2VudGVyJywgZnVuY3Rpb24oKXtcclxuICAgICQoJy5hLWluZGljYXRvcicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5lcSgkKGVsKS5pbmRleCgpKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgfSlcclxuICAub24oJ2xlYXZlJywgZnVuY3Rpb24oKXtcclxuICAgICQoJy5hLWluZGljYXRvcicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5lcSgkKGVsKS5pbmRleCgpIC0gMSkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRDbGFzc1RvZ2dsZXJDb250cm9sbGVyIChhbmltYXRpb25CbG9ja3MpIHtcclxuICBsZXQgY29udHJvbGxlciA9IG5ldyBTY3JvbGxNYWdpYy5Db250cm9sbGVyKCk7XHJcbiAgYW5pbWF0aW9uQmxvY2tzLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgbGV0IGFEZWxheSA9IDMwMDtcclxuICAgICAgaWYodGhpcy5vZmZzZXRUb3AgPCB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcclxuICAgICAgICBhRGVsYXkgPSAxMzAwO1xyXG4gICAgICB9XHJcbiAgICAgIHNldFRpbWVvdXQoYWRkQ2xhc3NUb2dnbGVyU2NlbmUsIGFEZWxheSwgdGhpcywgY29udHJvbGxlcik7XHJcbiAgICAvL31cclxuICB9KTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGdldEZyb21Qb3NpdGlvbiAoZWwsIGRlZmF1bHRQb3NpdGlvbiA9IDApe1xyXG4gIHJldHVybiAoZWwuYXR0cignZGF0YS1wYXJhbGxheC1mcm9tJykgIT09IHVuZGVmaW5lZCkgPyBOdW1iZXIoZWwuYXR0cignZGF0YS1wYXJhbGxheC1mcm9tJykpIDogZGVmYXVsdFBvc2l0aW9uO1xyXG59XHJcbmZ1bmN0aW9uIGdldFRvUG9zaXRpb24gKGVsLCBkZWZhdWx0UG9zaXRpb24gPSAwKXtcclxuICByZXR1cm4gKGVsLmF0dHIoJ2RhdGEtcGFyYWxsYXgtdG8nKSAhPT0gdW5kZWZpbmVkKSA/IE51bWJlcihlbC5hdHRyKCdkYXRhLXBhcmFsbGF4LXRvJykpIDogZGVmYXVsdFBvc2l0aW9uO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRQYXJhbGxheFRpbWVsaW5lIChlbCkge1xyXG4gIGxldCB0d2VlbiA9IG5ldyBUaW1lbGluZU1heCgpO1xyXG4gIGxldCB0d2VlbnNBcnIgPSBbXTtcclxuICBpZiAoJChlbCkuZmluZCgnLmEtcGFyYWxsYXgtYmFjaycpKSB7XHJcbiAgICBsZXQgdGFyZ2V0RWwgPSAkKGVsKS5maW5kKCcuYS1wYXJhbGxheC1iYWNrJyk7XHJcbiAgICBsZXQgZnJvbVBvcyA9IGdldEZyb21Qb3NpdGlvbih0YXJnZXRFbCwgLTIwKTtcclxuICAgIGxldCB0b1BvcyA9IGdldFRvUG9zaXRpb24odGFyZ2V0RWwpO1xyXG4gICAgdHdlZW5zQXJyLnB1c2goVHdlZW5NYXguZnJvbVRvKHRhcmdldEVsLCAxLCB7eVBlcmNlbnQ6IGZyb21Qb3N9LCB7eVBlcmNlbnQ6IHRvUG9zLCBlYXNlOiBMaW5lYXIuZWFzZU5vbmV9KSk7XHJcbiAgfVxyXG4gIGlmICgkKGVsKS5maW5kKCcuYS1wYXJhbGxheC1taWRkbGUnKSkge1xyXG4gICAgbGV0IHRhcmdldEVsID0gJChlbCkuZmluZCgnLmEtcGFyYWxsYXgtbWlkZGxlJyk7XHJcbiAgICBsZXQgZnJvbVBvcyA9IGdldEZyb21Qb3NpdGlvbih0YXJnZXRFbCwgLTE1KTtcclxuICAgIGxldCB0b1BvcyA9IGdldFRvUG9zaXRpb24odGFyZ2V0RWwpO1xyXG4gICAgdHdlZW5zQXJyLnB1c2goVHdlZW5NYXguZnJvbVRvKHRhcmdldEVsLCAxLCB7eVBlcmNlbnQ6IGZyb21Qb3N9LCB7eVBlcmNlbnQ6IHRvUG9zLCBlYXNlOiBMaW5lYXIuZWFzZU5vbmV9KSk7XHJcbiAgfVxyXG4gIGlmICgkKGVsKS5maW5kKCcuYS1wYXJhbGxheC1mcm9udCcpKSB7XHJcbiAgICBsZXQgdGFyZ2V0RWwgPSAkKGVsKS5maW5kKCcuYS1wYXJhbGxheC1mcm9udCcpO1xyXG4gICAgbGV0IGZyb21Qb3MgPSBnZXRGcm9tUG9zaXRpb24odGFyZ2V0RWwsIC0xMCk7XHJcbiAgICBsZXQgdG9Qb3MgPSBnZXRUb1Bvc2l0aW9uKHRhcmdldEVsLCAxMCk7XHJcbiAgICB0d2VlbnNBcnIucHVzaChUd2Vlbk1heC5mcm9tVG8odGFyZ2V0RWwsIDEsIHt5UGVyY2VudDogZnJvbVBvc30sIHt5UGVyY2VudDogdG9Qb3MsIGVhc2U6IExpbmVhci5lYXNlTm9uZX0pKTtcclxuICB9XHJcbiAgdHdlZW4uYWRkKHR3ZWVuc0Fycik7XHJcbiAgcmV0dXJuIHR3ZWVuO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRQYXJhbGxheFNjZW5lIChlbCwgdHdlZW4sIGNvbnRyb2xsZXIpIHtcclxuICBuZXcgU2Nyb2xsTWFnaWMuU2NlbmUoe1xyXG4gICAgdHJpZ2dlckVsZW1lbnQ6IGVsLFxyXG4gICAgdHJpZ2dlckhvb2s6IDAsXHJcbiAgICBkdXJhdGlvbjogJChlbCkuaGVpZ2h0KClcclxuICB9KVxyXG4gIC5zZXRUd2Vlbih0d2VlbilcclxuICAuYWRkVG8oY29udHJvbGxlcik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFBhcmFsbGF4Q29udHJvbGxlciAoYW5pbWF0aW9uQmxvY2tzKSB7XHJcbiAgbGV0IGNvbnRyb2xsZXIgPSBuZXcgU2Nyb2xsTWFnaWMuQ29udHJvbGxlcigpO1xyXG4gIGFuaW1hdGlvbkJsb2Nrcy5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgdHdlZW4gPSBnZXRQYXJhbGxheFRpbWVsaW5lKHRoaXMpO1xyXG4gICAgYWRkUGFyYWxsYXhTY2VuZSh0aGlzLCB0d2VlbiwgY29udHJvbGxlcik7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXQgKCkge1xyXG4gIGlmIChzY3JvbGxBbmltYXRpb25CbG9ja3MubGVuZ3RoID4gMCl7XHJcbiAgICAvLyQoJ2h0bWwnKS5hZGRDbGFzcygnaXMtYW5pbWF0aW5nJyk7XHJcbiAgICBhZGRDbGFzc1RvZ2dsZXJDb250cm9sbGVyKHNjcm9sbEFuaW1hdGlvbkJsb2Nrcyk7XHJcbiAgfVxyXG4gIFxyXG4gIGlmICghTWFpbi5EZXZpY2VEZXRlY3Rpb24uaXNUb3VjaCgpKXtcclxuICAgICQoJy5qcy1ob3ZlcicpLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKXtcclxuICAgICAgbGV0IHNlbGYgPSAkKHRoaXMpO1xyXG4gICAgICBzZWxmLmFkZENsYXNzKCdhLWVudGVyJyk7XHJcbiAgICB9KTtcclxuICAgICQoJy5qcy1ob3ZlcicpLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKXtcclxuICAgICAgbGV0IHNlbGYgPSAkKHRoaXMpO1xyXG4gICAgICBzZWxmLnJlbW92ZUNsYXNzKCdhLWVudGVyJykuYWRkQ2xhc3MoJ2EtbGVhdmUnKTtcclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgIHNlbGYucmVtb3ZlQ2xhc3MoJ2EtbGVhdmUnKTtcclxuICAgICAgfSwgMzAwLCBzZWxmKTtcclxuICAgIH0pO1xyXG4gIH1cclxuICBcclxuICBpZiAocGFyYWxsYXhCbG9ja3MubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDEwMjQpe1xyXG4gICAgJCgnaHRtbCcpLmFkZENsYXNzKCdpcy1hbmltYXRpbmcnKTtcclxuICAgIGFkZFBhcmFsbGF4Q29udHJvbGxlcihwYXJhbGxheEJsb2Nrcyk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvYW5pbWF0aW9uLmpzIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBOzs7Ozs7OztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDM0JBOzs7OztBQUtBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBT0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7Ozs7Ozs7OztBQzNLQTs7Ozs7QUFNQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ2hFQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQVpBO0FBY0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUMxRUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0RUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ25DQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUMzQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7Ozs7Ozs7O0FDOUVBOzs7OztBQU1BOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOzs7Ozs7Ozs7QUM5QkE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQU9BO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=