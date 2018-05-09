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
	var Share = __webpack_require__(11);
	var Wave = __webpack_require__(12);

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
	  Share.init();

	  if (DeviceDetection.isDesktop()) {
	    Wave.init();
	  }

	  $.afterlag(function () {
	    $('html').addClass('is-loaded');
	  });

	  $('html').addClass('is-animating');

	  if ($('.page').hasClass('page--home')) {
	    $('html, body').css('overflow-y', 'hidden');
	    $('.js-placeholder').on('click', function () {
	      $('html, body').css('overflow-y', '');
	      $('html').addClass('is-loaded');
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
	  Video: Video,
	  Share: Share,
	  Wave: Wave
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
	function isDesktop() {
	  return $(window).width() > breakpoints.md;
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

	module.exports = { run: run, isTouch: isTouch, isMobile: isMobile, isTablet: isTablet, isDesktop: isDesktop, isMobileVersion: isMobileVersion };

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
	  var defaultPosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 0];

	  return el.attr('data-parallax-from') !== undefined ? el.attr('data-parallax-from').split(', ') : defaultPosition;
	}
	function getToPosition(el) {
	  var defaultPosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 0];

	  return el.attr('data-parallax-to') !== undefined ? el.attr('data-parallax-to').split(', ') : defaultPosition;
	}

	function getParallaxTimeline(el) {
	  var tween = new TimelineMax();
	  var tweensArr = [];
	  if ($(el).find('.a-parallax-left')) {
	    var targetEl = $(el).find('.a-parallax-left');
	    var fromPos = getFromPosition(targetEl, [-30, 30]);
	    var toPos = getToPosition(targetEl);
	    tweensArr.push(TweenMax.fromTo(targetEl, 1, { xPercent: fromPos[0], yPercent: fromPos[1] }, { xPercent: toPos[0], yPercent: toPos[1], ease: Linear.easeNone }));
	  }
	  if ($(el).find('.a-parallax-right')) {
	    var _targetEl = $(el).find('.a-parallax-right');
	    var _fromPos = getFromPosition(_targetEl, [30, 30]);
	    var _toPos = getToPosition(_targetEl);
	    tweensArr.push(TweenMax.fromTo(_targetEl, 1, { xPercent: _fromPos[0], yPercent: _fromPos[1] }, { xPercent: _toPos[0], yPercent: _toPos[1], ease: Linear.easeNone }));
	  }
	  tween.add(tweensArr);
	  return tween;
	}

	function addParallaxScene(el, tween, controller) {
	  new ScrollMagic.Scene({
	    triggerElement: el,
	    triggerHook: 0.2,
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

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	'use strict';

	function getIcon(el) {
	  var icon = '';
	  if (el.hasClass('ya-share2__item_service_vkontakte')) {
	    icon = 'vk';
	  }
	  if (el.hasClass('ya-share2__item_service_facebook')) {
	    icon = 'fb';
	  }
	  if (el.hasClass('ya-share2__item_service_twitter')) {
	    icon = 'tw';
	  }
	  return '<svg class="icon social-icon"><use xlink:href="#' + icon + '"/></svg>';
	}
	function fillIcons() {
	  $('#share .ya-share2__item').each(function () {
	    $(this).find('.ya-share2__icon').html(getIcon($(this)));
	  });
	}
	function init() {
	  Ya.share2('share', {
	    content: {
	      url: window.location.href,
	      title: 'Aqua Kenzo',
	      description: "",
	      //image: 'build/img/share.jpg'
	      image: 'http://nioxin30days.elle.ru/build/img/share.jpg'
	    },
	    theme: {
	      services: 'vkontakte,facebook,twitter',
	      bare: true,
	      lang: 'ru'
	    },
	    hooks: {
	      onready: function onready() {
	        fillIcons();
	      }
	    }
	  });
	}
	module.exports = { init: init };

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Переключение классов по различным событиям
	 * @module Wave
	 */

	var spriteImages = $('.js-wave-image');
	var spriteImagesFull = $('.js-wave-image-full');

	function init() {

	  spriteImages.each(function () {
	    var closest = $(this).parent()[0];
	    var closestSizeX = closest.offsetWidth;
	    var closestSizeY = closest.offsetHeight;
	    var spriteSrc = [$(this).attr('src')];
	    var initCanvasSlideshow = new CanvasSlideshow({
	      sprites: spriteSrc,
	      displacementImage: 'build/img/clouds.jpg',
	      autoPlay: true,
	      autoPlaySpeed: [10, 3],
	      displaceScale: [200, 70],
	      stageWidth: closestSizeX,
	      stageHeight: closestSizeY,
	      fullScreen: false,
	      closestContainer: closest
	    });
	  });

	  spriteImagesFull.each(function () {
	    var closest = $(this).parent()[0];
	    var closestSizeX = closest.offsetWidth;
	    var closestSizeY = closest.offsetHeight;
	    var spriteSrc = [$(this).attr('src')];
	    var initCanvasSlideshow = new CanvasSlideshow({
	      sprites: spriteSrc,
	      displacementImage: 'build/img/clouds.jpg',
	      autoPlay: true,
	      autoPlaySpeed: [10, 3],
	      displaceScale: [200, 70],
	      stageWidth: closestSizeX,
	      stageHeight: closestSizeY,
	      fullScreen: true,
	      closestContainer: closest
	    });
	  });
	}

	module.exports = { init: init };

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBlNDJhMWI4MGVlYzBlNmZmYzFhNyIsIndlYnBhY2s6Ly8vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2lucHV0LmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9mb3JtLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9tb2RhbC5qcyIsIndlYnBhY2s6Ly8vc3JjL2pzL2NvbXBvbmVudHMvYWNjb3JkaW9uLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy90YWJzLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9tYWluLW1lbnUuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL3ZpZGVvLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9hbmltYXRpb24uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL3NoYXJlLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy93YXZlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9rZW56by9idWlsZC9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlNDJhMWI4MGVlYzBlNmZmYzFhNyIsImxldCBEZXZpY2VEZXRlY3Rpb24gPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb25cIik7XHJcbmxldCBIZWxwZXJzID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9oZWxwZXJzXCIpO1xyXG5sZXQgSW5wdXQgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2lucHV0XCIpO1xyXG5sZXQgRm9ybSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvZm9ybVwiKTtcclxubGV0IE1vZGFsID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9tb2RhbFwiKTtcclxubGV0IEFjY29yZGlvbiA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvYWNjb3JkaW9uXCIpO1xyXG5sZXQgVGFicyA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvdGFic1wiKTtcclxubGV0IE1haW5NZW51ID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9tYWluLW1lbnVcIik7XHJcbmxldCBWaWRlbyA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvdmlkZW9cIik7XHJcbmxldCBBbmltYXRpb24gPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2FuaW1hdGlvblwiKTtcclxubGV0IFNoYXJlID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9zaGFyZVwiKTtcclxubGV0IFdhdmUgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3dhdmVcIik7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gIFxyXG4gIERldmljZURldGVjdGlvbi5ydW4oKTtcclxuICBIZWxwZXJzLmluaXQoKTtcclxuICBJbnB1dC5pbml0KCk7XHJcbiAgRm9ybS5pbml0KCk7XHJcbiAgTW9kYWwuaW5pdCgpO1xyXG4gIEFjY29yZGlvbi5pbml0KCk7XHJcbiAgVGFicy5pbml0KCk7XHJcbiAgLy9NYWluTWVudS5pbml0KCk7XHJcbiAgVmlkZW8uaW5pdCgpO1xyXG4gIFNoYXJlLmluaXQoKTtcclxuICBcclxuICBpZiAoRGV2aWNlRGV0ZWN0aW9uLmlzRGVza3RvcCgpKSB7XHJcbiAgICBXYXZlLmluaXQoKTtcclxuICB9XHJcbiAgXHJcbiAgJC5hZnRlcmxhZyhmdW5jdGlvbigpe1xyXG4gICAgJCgnaHRtbCcpLmFkZENsYXNzKCdpcy1sb2FkZWQnKTtcclxuICB9KTtcclxuICBcclxuICAkKCdodG1sJykuYWRkQ2xhc3MoJ2lzLWFuaW1hdGluZycpO1xyXG4gIFxyXG4gIGlmICgkKCcucGFnZScpLmhhc0NsYXNzKCdwYWdlLS1ob21lJykpIHtcclxuICAgICQoJ2h0bWwsIGJvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnaGlkZGVuJyk7XHJcbiAgICAkKCcuanMtcGxhY2Vob2xkZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAkKCdodG1sLCBib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJycpO1xyXG4gICAgICAkKCdodG1sJykuYWRkQ2xhc3MoJ2lzLWxvYWRlZCcpO1xyXG4gICAgICBBbmltYXRpb24uaW5pdCgpO1xyXG4gICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5ob21lLXBsYWNlaG9sZGVyJykuZmFkZU91dCg1MDApO1xyXG4gICAgICAkKCcuYS1hbmltLXRleHQnKS5hZGRDbGFzcygnYW5pbWF0ZScpO1xyXG4gICAgfSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIEFuaW1hdGlvbi5pbml0KCk7XHJcbiAgfVxyXG4gIFxyXG59KTtcclxuXHJcblxyXG4vKipcclxuICog0KHQv9C40YHQvtC6INGN0LrRgdC/0L7RgNGC0LjRgNGD0LXQvNGL0YUg0LzQvtC00YPQu9C10LksINGH0YLQvtCx0Ysg0LjQvNC10YLRjCDQuiDQvdC40Lwg0LTQvtGB0YLRg9C/INC40LfQstC90LVcclxuICogQGV4YW1wbGVcclxuICogTWFpbi5Gb3JtLmlzRm9ybVZhbGlkKCk7XHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBEZXZpY2VEZXRlY3Rpb24sXHJcbiAgSGVscGVycyxcclxuICBJbnB1dCxcclxuICBGb3JtLFxyXG4gIE1vZGFsLFxyXG4gIEFjY29yZGlvbixcclxuICBUYWJzLFxyXG4gIE1haW5NZW51LFxyXG4gIFZpZGVvLFxyXG4gIFNoYXJlLFxyXG4gIFdhdmVcclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL21haW4uanMiLCJsZXQgYnJlYWtwb2ludHMgPSB7XHJcbiAgc206IDc2NyxcclxuICBtZDogMTAyNCxcclxuICBsZzogMTI4MCxcclxuICB4bDogMTYwMFxyXG59O1xyXG5cclxuZnVuY3Rpb24gaXNNb2JpbGUoKXtcclxuICByZXR1cm4gKCQod2luZG93KS53aWR0aCgpIDw9IGJyZWFrcG9pbnRzLnNtKTtcclxufVxyXG5mdW5jdGlvbiBpc1RhYmxldCgpe1xyXG4gIHJldHVybiAoJCh3aW5kb3cpLndpZHRoKCkgPiBicmVha3BvaW50cy5zbSAmJiAkKHdpbmRvdykud2lkdGgoKSA8PSBicmVha3BvaW50cy5tZClcclxufVxyXG5mdW5jdGlvbiBpc0Rlc2t0b3AoKXtcclxuICByZXR1cm4gKCQod2luZG93KS53aWR0aCgpID4gYnJlYWtwb2ludHMubWQpXHJcbn1cclxuZnVuY3Rpb24gaXNUb3VjaCgpe1xyXG4gIHJldHVybiAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgfHwgbmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzO1xyXG59XHJcbmZ1bmN0aW9uIGlzTW9iaWxlVmVyc2lvbigpe1xyXG4gIHJldHVybiAhIX53aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKFwiL21vYmlsZS9cIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJ1bigpe1xyXG4gIGlmKGlzVG91Y2goKSl7XHJcbiAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoJ25vLXRvdWNoJykuYWRkQ2xhc3MoJ3RvdWNoJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgICQoJ2h0bWwnKS5yZW1vdmVDbGFzcygndG91Y2gnKS5hZGRDbGFzcygnbm8tdG91Y2gnKTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge3J1biwgaXNUb3VjaCwgaXNNb2JpbGUsIGlzVGFibGV0LCBpc0Rlc2t0b3AsIGlzTW9iaWxlVmVyc2lvbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb24uanMiLCIvKipcclxuICogSGVscGVyc1xyXG4gKiBAbW9kdWxlIEhlbHBlcnNcclxuICovXHJcblxyXG4vKipcclxuICogQ2FsY3VsYXRlIHNjcm9sbGJhciB3aWR0aCBpbiBlbGVtZW50XHJcbiAqIC0gaWYgdGhlIHdpZHRoIGlzIDAgaXQgbWVhbnMgdGhlIHNjcm9sbGJhciBpcyBmbG9hdGVkL292ZXJsYXllZFxyXG4gKiAtIGFjY2VwdHMgXCJjb250YWluZXJcIiBwYXJlbWV0ZXIgYmVjYXVzZSBpZSAmIGVkZ2UgY2FuIGhhdmUgZGlmZmVyZW50XHJcbiAqICAgc2Nyb2xsYmFyIGJlaGF2aW9ycyBmb3IgZGlmZmVyZW50IGVsZW1lbnRzIHVzaW5nICctbXMtb3ZlcmZsb3ctc3R5bGUnXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXROYXRpdmVTY3JvbGxiYXJXaWR0aCAoY29udGFpbmVyKSB7XHJcbiAgY29udGFpbmVyID0gY29udGFpbmVyIHx8IGRvY3VtZW50LmJvZHk7XHJcblxyXG4gIGxldCBmdWxsV2lkdGggPSAwO1xyXG4gIGxldCBiYXJXaWR0aCA9IDA7XHJcblxyXG4gIGxldCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgbGV0IGNoaWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gIHdyYXBwZXIuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gIHdyYXBwZXIuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcclxuICB3cmFwcGVyLnN0eWxlLmJvdHRvbSA9ICcwJztcclxuICB3cmFwcGVyLnN0eWxlLnJpZ2h0ID0gJzAnO1xyXG4gIHdyYXBwZXIuc3R5bGUud2lkdGggPSAnMTAwcHgnO1xyXG4gIHdyYXBwZXIuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuXHJcbiAgd3JhcHBlci5hcHBlbmRDaGlsZChjaGlsZCk7XHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHdyYXBwZXIpO1xyXG5cclxuICBmdWxsV2lkdGggPSBjaGlsZC5vZmZzZXRXaWR0aDtcclxuICB3cmFwcGVyLnN0eWxlLm92ZXJmbG93WSA9ICdzY3JvbGwnO1xyXG4gIGJhcldpZHRoID0gZnVsbFdpZHRoIC0gY2hpbGQub2Zmc2V0V2lkdGg7XHJcblxyXG4gIGNvbnRhaW5lci5yZW1vdmVDaGlsZCh3cmFwcGVyKTtcclxuXHJcbiAgcmV0dXJuIGJhcldpZHRoO1xyXG59XHJcblxyXG4vKipcclxuICogVGhyb3R0bGUgSGVscGVyXHJcbiAqIGh0dHBzOi8vcmVteXNoYXJwLmNvbS8yMDEwLzA3LzIxL3Rocm90dGxpbmctZnVuY3Rpb24tY2FsbHNcclxuICovXHJcbmZ1bmN0aW9uIHRocm90dGxlIChmbiwgdGhyZXNoaG9sZCwgc2NvcGUpIHtcclxuICB0aHJlc2hob2xkIHx8ICh0aHJlc2hob2xkID0gMjUwKTtcclxuICBsZXQgbGFzdCxcclxuICAgIGRlZmVyVGltZXI7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBjb250ZXh0ID0gc2NvcGUgfHwgdGhpcztcclxuXHJcbiAgICBsZXQgbm93ID0gK25ldyBEYXRlKCksXHJcbiAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICBpZiAobGFzdCAmJiBub3cgPCBsYXN0ICsgdGhyZXNoaG9sZCkge1xyXG4gICAgICAvLyBob2xkIG9uIHRvIGl0XHJcbiAgICAgIGNsZWFyVGltZW91dChkZWZlclRpbWVyKTtcclxuICAgICAgZGVmZXJUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxhc3QgPSBub3c7XHJcbiAgICAgICAgZm4uYXBwbHkoY29udGV4dCwgYXJncyk7XHJcbiAgICAgIH0sIHRocmVzaGhvbGQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGFzdCA9IG5vdztcclxuICAgICAgZm4uYXBwbHkoY29udGV4dCwgYXJncyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKiogXHJcbiAqIERlYm91bmNlIEhlbHBlclxyXG4gKiBodHRwczovL3JlbXlzaGFycC5jb20vMjAxMC8wNy8yMS90aHJvdHRsaW5nLWZ1bmN0aW9uLWNhbGxzXHJcbiAqL1xyXG5mdW5jdGlvbiBkZWJvdW5jZSAoZm4sIGRlbGF5KSB7XHJcbiAgbGV0IHRpbWVyID0gbnVsbDtcclxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcclxuICAgIHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG4gICAgfSwgZGVsYXkpO1xyXG4gIH07XHJcbn07XHJcblxyXG5sZXQgdGltZXI7XHJcbmxldCB0aW1lb3V0ID0gZmFsc2U7XHJcbmxldCBkZWx0YSA9IDIwMDtcclxuZnVuY3Rpb24gcmVzaXplRW5kKCkge1xyXG4gIGlmIChuZXcgRGF0ZSgpIC0gdGltZXIgPCBkZWx0YSkge1xyXG4gICAgc2V0VGltZW91dChyZXNpemVFbmQsIGRlbHRhKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGltZW91dCA9IGZhbHNlO1xyXG4gICAgJCh3aW5kb3cpLnRyaWdnZXIoJ3Jlc2l6ZWVuZCcpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlQ2xhc3NJZihlbCwgY29uZCwgdG9nZ2xlZENsYXNzKXtcclxuXHRpZihjb25kKXtcclxuXHRcdGVsLmFkZENsYXNzKHRvZ2dsZWRDbGFzcyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGVsLnJlbW92ZUNsYXNzKHRvZ2dsZWRDbGFzcyk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICog0KTRg9C90LrRhtC40Y8g0LTQvtCx0LDQstC70Y/QtdGCINC6INGN0LvQtdC80LXQvdGC0YMg0LrQu9Cw0YHRgSwg0LXRgdC70Lgg0YHRgtGA0LDQvdC40YbQsCDQv9GA0L7QutGA0YPRh9C10L3QsCDQsdC+0LvRjNGI0LUsINGH0LXQvCDQvdCwINGD0LrQsNC30LDQvdC90L7QtSDQt9C90LDRh9C10L3QuNC1LCBcclxuICog0Lgg0YPQsdC40YDQsNC10YIg0LrQu9Cw0YHRgSwg0LXRgdC70Lgg0LfQvdCw0YfQtdC90LjQtSDQvNC10L3RjNGI0LVcclxuICogQHBhcmFtIHtvYmplY3R9IGVsIC0g0Y3Qu9C10LzQtdC90YIsINGBINC60L7RgtC+0YDRi9C8INCy0LfQsNC40LzQvtC00LXQudGB0YLQstGD0LXQvFxyXG4gKiBAcGFyYW0ge21peGVkfSBbc2Nyb2xsVmFsdWU9MF0gLSDQt9C90LDRh9C10L3QuNC1INC/0YDQvtC60YDRg9GC0LrQuCwg0L3QsCDQutC+0YLQvtGA0L7QvCDQvNC10L3Rj9C10LwgY3NzLdC60LvQsNGB0YEsINC+0LbQuNC00LDQtdC80L7QtSDQt9C90LDRh9C10L3QuNC1IC0g0YfQuNGB0LvQviDQuNC70Lgg0LrQu9GO0YfQtdCy0L7QtSDRgdC70L7QstC+ICd0aGlzJy4g0JXRgdC70Lgg0L/QtdGA0LXQtNCw0L3QviAndGhpcycsINC/0L7QtNGB0YLQsNCy0LvRj9C10YLRgdGPINC/0L7Qu9C+0LbQtdC90LjQtSBlbC5vZmZzZXQoKS50b3Ag0LzQuNC90YPRgSDQv9C+0LvQvtCy0LjQvdCwINCy0YvRgdC+0YLRiyDRjdC60YDQsNC90LBcclxuICogQHBhcmFtIHtzdHJpbmd9IFt0b2dnbGVkQ2xhc3M9c2Nyb2xsZWRdIC0gY3NzLdC60LvQsNGB0YEsINC60L7RgtC+0YDRi9C5INC/0LXRgNC10LrQu9GO0YfQsNC10LxcclxuICovXHJcbmZ1bmN0aW9uIHRvZ2dsZUVsZW1lbnRDbGFzc09uU2Nyb2xsKGVsLCBzY3JvbGxWYWx1ZSA9IDAsIHRvZ2dsZWRDbGFzcyA9ICdzY3JvbGxlZCcpe1xyXG5cdGlmKGVsLmxlbmd0aCA9PSAwKSB7XHJcblx0XHQvL2NvbnNvbGUuZXJyb3IoXCLQndC10L7QsdGF0L7QtNC40LzQviDQv9C10YDQtdC00LDRgtGMINC+0LHRitC10LrRgiwg0YEg0LrQvtGC0L7RgNGL0Lwg0LLRiyDRhdC+0YLQuNGC0LUg0LLQt9Cw0LjQvNC+0LTQtdC50YHRgtCy0L7QstCw0YLRjFwiKTtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0XHJcblx0aWYoc2Nyb2xsVmFsdWUgPT0gJ3RoaXMnKSB7XHJcblx0XHRzY3JvbGxWYWx1ZSA9IGVsLm9mZnNldCgpLnRvcCAtICQod2luZG93KS5vdXRlckhlaWdodCgpIC8gMjtcclxuXHR9XHJcblx0XHJcblx0JCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbihlKXtcclxuXHRcdGlmKCQod2luZG93KS5zY3JvbGxUb3AoKSA+IHNjcm9sbFZhbHVlKXtcclxuXHRcdFx0ZWwuYWRkQ2xhc3ModG9nZ2xlZENsYXNzKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGVsLnJlbW92ZUNsYXNzKHRvZ2dsZWRDbGFzcyk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn07XHJcblxyXG4vKipcclxuICog0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YHQvtCx0YvRgtC40Lkg0LTQu9GPINC/0LXRgNC10LrQu9GO0YfQsNGC0LXQu9C10Lkg0LrQu9Cw0YHRgdC+0LJcclxuICogQGV4YW1wbGVcclxuICogSGVscGVycy5pbml0KCk7XHJcbiAqL1xyXG5mdW5jdGlvbiBpbml0KCl7XHJcbiAgXHJcbiAgdG9nZ2xlRWxlbWVudENsYXNzT25TY3JvbGwoJCgnLmhlYWRlcicpLCA1MCk7XHJcbiAgXHJcbiAgJCgnLmpzLWhpZGUtYmxvY2snKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgbGV0IGJsb2NrID0gJCh0aGlzKS5kYXRhKCd0YXJnZXQnKSA9PT0gJ3NlbGYnID8gJCh0aGlzKS5wYXJlbnQoKSA6ICQodGhpcykuZGF0YSgndGFyZ2V0Jyk7XHJcbiAgICBibG9jay5mYWRlT3V0KDUwMCk7XHJcbiAgfSk7XHJcbiAgXHJcbiAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aW1lciA9IG5ldyBEYXRlKCk7XHJcbiAgICBpZiAodGltZW91dCA9PT0gZmFsc2UpIHtcclxuICAgICAgdGltZW91dCA9IHRydWU7XHJcbiAgICAgIHNldFRpbWVvdXQocmVzaXplRW5kLCBkZWx0YSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgXHJcbiAgJCgnLmJ0bi1tZW51Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICQoJy5oZWFkZXInKS50b2dnbGVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgJCgnLm1haW4tbmF2Jykuc2xpZGVUb2dnbGUoNTAwKTtcclxuICAgIGlmIChNYWluLkRldmljZURldGVjdGlvbi5pc01vYmlsZVZlcnNpb24oKSkge1xyXG4gICAgICBpZiAoJCgnLmhlYWRlcicpLmhhc0NsYXNzKCdpcy1vcGVuJykpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnaXMtb3BlbicpO1xyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnaGlkZGVuJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmNzcygnb3ZlcmZsb3cteScsICcnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG4gIFxyXG4gICQod2luZG93KS5zY3JvbGwoJC5kZWJvdW5jZSgyNTAsIHRydWUsIGZ1bmN0aW9uKCkge1xyXG4gICAgJCgnaHRtbCcpLmFkZENsYXNzKCdpcy1zY3JvbGxpbmcnKTtcclxuICB9KSk7XHJcbiAgJCh3aW5kb3cpLnNjcm9sbCgkLmRlYm91bmNlKDI1MCwgZnVuY3Rpb24oKSB7XHJcbiAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoJ2lzLXNjcm9sbGluZycpO1xyXG4gIH0pKTtcclxuICBcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdCwgdG9nZ2xlQ2xhc3NJZiwgdG9nZ2xlRWxlbWVudENsYXNzT25TY3JvbGx9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9oZWxwZXJzLmpzIiwiLyoqXHJcbiAqINCc0L7QtNGD0LvRjCDQtNC70Y8g0YDQsNCx0L7RgtGLIHBsYWNlaG9sZGVyINCyINGN0LvQtdC80LXQvdGC0LDRhSDRhNC+0YDQvNGLICguZmllbGQpXHJcbiAqIEBtb2R1bGUgSW5wdXRcclxuICovXHJcblxyXG5cclxuLyoqXHJcbiAqINCj0YHRgtCw0L3QvtCy0LjRgtGMINGE0L7QutGD0YFcclxuICogQHByaXZhdGVcclxuICogQHBhcmFtIHtvYmplY3R9IGlucHV0XHJcbiAqL1xyXG5mdW5jdGlvbiBmb2N1c0xhYmVsKGlucHV0KXtcclxuICAgIGlucHV0LmNsb3Nlc3QoJy5maWVsZCcpLmFkZENsYXNzKFwiaGFzLWZvY3VzXCIpO1xyXG59XHJcblxyXG4vKipcclxuICog0KPQsdGA0LDRgtGMINGE0L7QutGD0YFcclxuICogQHByaXZhdGVcclxuICogQHBhcmFtIHtvYmplY3R9IGlucHV0XHJcbiAqL1xyXG5mdW5jdGlvbiBibHVyTGFiZWwoaW5wdXQpe1xyXG4gICAgdmFyIHdyYXBwZXIgPSBpbnB1dC5jbG9zZXN0KCcuZmllbGQnKTtcclxuICAgIHdyYXBwZXIucmVtb3ZlQ2xhc3MoXCJoYXMtZm9jdXNcIik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDQn9GA0L7QstC10YDQuNGC0Ywg0LjQvdC/0YPRgiDQvdCwINC90LDQu9C40YfQuNC1IHZhbHVlXHJcbiAqIEBwcml2YXRlXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dFxyXG4gKi9cclxuZnVuY3Rpb24gY2hlY2tJbnB1dChpbnB1dCl7XHJcbiAgICB2YXIgd3JhcHBlciA9IGlucHV0LmNsb3Nlc3QoJy5maWVsZCcpO1xyXG4gICAgaWYgKGlucHV0LnZhbCgpLmxlbmd0aCA+IDApXHJcbiAgICAgICAgd3JhcHBlci5hZGRDbGFzcyhcImhhcy12YWx1ZVwiKTtcclxuICAgIGVsc2VcclxuICAgICAgICB3cmFwcGVyLnJlbW92ZUNsYXNzKFwiaGFzLXZhbHVlXCIpO1xyXG59XHJcblxyXG4vKipcclxuICog0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YHQvtCx0YvRgtC40Lkg0LTQu9GPINC40L3Qv9GD0YLQsFxyXG4gKiBAZXhhbXBsZVxyXG4gKiBJbnB1dC5pbml0KCk7XHJcbiAqL1xyXG5mdW5jdGlvbiBpbml0KCl7XHJcbiAgICBsZXQgaW5wdXRzID0gJCgnLmZpZWxkX19pbnB1dCcpO1xyXG4gICAgbGV0IHBsYWNlaG9sZGVycyA9ICQoJy5maWVsZF9fcGxhY2Vob2xkZXInKTtcclxuICAgIFxyXG4gICAgcGxhY2Vob2xkZXJzLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICQodGhpcykuY2xvc2VzdCgnLmZpZWxkJykuZmluZCgnLmZpZWxkX19pbnB1dCcpLmZvY3VzKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpbnB1dHMuZWFjaChmdW5jdGlvbihpLCBpdGVtKSB7XHJcbiAgICAgICAgY2hlY2tJbnB1dCgkKGl0ZW0pKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlucHV0cy5mb2N1cyhmdW5jdGlvbigpe1xyXG4gICAgICAgIGZvY3VzTGFiZWwoJCh0aGlzKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpbnB1dHMuYmx1cihmdW5jdGlvbigpe1xyXG4gICAgICAgIGJsdXJMYWJlbCgkKHRoaXMpKTtcclxuICAgICAgICBjaGVja0lucHV0KCQodGhpcykpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9pbnB1dC5qcyIsIi8qKlxyXG4gKiDQnNC+0LTRg9C70Ywg0LTQu9GPINGA0LDQsdC+0YLRiyDQpNC+0YDQvFxyXG4gKiBAbW9kdWxlIEZvcm1cclxuICovXHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZUZpZWxkKGZpZWxkKSB7XHJcbiAgbGV0IGlzVmFsaWQgPSBmaWVsZC52YWxpZGl0eS52YWxpZDtcclxuICBsZXQgZmllbGRDb250YWluZXIgPSAkKGZpZWxkKS5jbG9zZXN0KCcuZmllbGQnKTtcclxuICBpZiAoaXNWYWxpZCkge1xyXG4gICAgZmllbGRDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2hhcy1lcnJvcicpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBmaWVsZENvbnRhaW5lci5hZGRDbGFzcygnaGFzLWVycm9yJyk7XHJcbiAgfVxyXG4gIHJldHVybiBpc1ZhbGlkO1xyXG59XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZUZvcm0oZWxGb3JtKSB7XHJcbiAgbGV0IGVycm9ycyA9IDA7XHJcbiAgQXJyYXkuZnJvbShlbEZvcm0uZWxlbWVudHMpLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgbGV0IGlzVmFsaWRGaWVsZCA9IHZhbGlkYXRlRmllbGQoaXRlbSk7XHJcbiAgICBpZighaXNWYWxpZEZpZWxkKSB7XHJcbiAgICAgIGVycm9ycyArPSAxO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIHJldHVybiBlcnJvcnM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC+0LHRi9GC0LjQuSDRhNC+0YDQvFxyXG4gKiBAZXhhbXBsZVxyXG4gKiBGb3JtLmluaXQoKTtcclxuICovXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuICBsZXQganNGb3JtID0gJCgnLmpzLWZvcm0nKTtcclxuICBcclxuICAkKCdpbnB1dCwgdGV4dGFyZWEnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuICAgIHZhbGlkYXRlRmllbGQodGhpcyk7XHJcbiAgfSk7XHJcbiAgXHJcbiAganNGb3JtLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIGxldCBzZWxmID0gJCh0aGlzKTtcclxuICAgIGxldCBzZWxmRm9ybSA9IHNlbGYuZmluZCgnLmpzLWZvcm0tZm9ybScpO1xyXG4gICAgbGV0IHNlbGZSZXN1bHQgPSBzZWxmLmZpbmQoJy5qcy1mb3JtLXJlc3VsdCcpO1xyXG4gICAgbGV0IHNlbGZTdWJtaXQgPSBzZWxmLmZpbmQoJy5qcy1mb3JtLXN1Ym1pdCcpO1xyXG4gICAgXHJcbiAgICBzZWxmU3VibWl0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBsZXQgaGFzRXJyb3IgPSB2YWxpZGF0ZUZvcm0oc2VsZkZvcm1bMF0pO1xyXG4gICAgICBpZiAoIWhhc0Vycm9yKSB7XHJcbiAgICAgICAgbGV0IHJlcXVlc3QgPSAkLmFqYXgoe1xyXG4gICAgICAgICAgdXJsOiAnaHR0cDovL2xvY2NpdGFuZS5oc21wLnJ1L2FwaS9lbWFpbHMvJyxcclxuICAgICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICduYW1lJzogJChzZWxmRm9ybSkuZmluZCgnaW5wdXRbbmFtZT1cIm5hbWVcIl0nKS52YWwoKSxcclxuICAgICAgICAgICAgJ2VtYWlsJzogJChzZWxmRm9ybSkuZmluZCgnaW5wdXRbbmFtZT1cImVtYWlsXCJdJykudmFsKCksXHJcbiAgICAgICAgICAgICdtZXNzYWdlJzogJChzZWxmRm9ybSkuZmluZCgndGV4dGFyZWFbbmFtZT1cIm1lc3NhZ2VcIl0nKS52YWwoKSxcclxuICAgICAgICAgICAgJ3BhZ2UnOiB3aW5kb3cubG9jYXRpb24uaHJlZlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2VsZlN1Ym1pdC5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJlcXVlc3QuZG9uZShmdW5jdGlvbiAocmVzcG9uc2UsIHRleHRTdGF0dXMsIGpxWEhSKSB7XHJcbiAgICAgICAgICBzZWxmLmFkZENsYXNzKCdpcy1zdWJtaXR0ZWQnKTtcclxuICAgICAgICAgIHNlbGYudHJpZ2dlcignc3VibWl0dGVkJyk7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNlbGZSZXN1bHQuc2hvdygpO1xyXG4gICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9mb3JtLmpzIiwiLyoqXHJcbiAqINCS0YHQv9C70YvQstCw0Y7RidC40LUg0L7QutC90LBcclxuICogQG1vZHVsZSBNb2RhbFxyXG4gKi9cclxuXHJcbmxldCBsYXlvdXQgPSAkKCcubGF5b3V0Jyk7XHJcbmxldCB3cmFwcGVyID0gJCgnLm1vZGFsX193cmFwcGVyJyk7XHJcbiBcclxuZnVuY3Rpb24gb3Blbk1vZGFsKHRhcmdldCkge1xyXG4gIGxldCBtb2RhbCA9ICQodGFyZ2V0KTtcclxuICBpZiAoIWxheW91dC5oYXNDbGFzcygnbW9kYWwtb3BlbicpKSB7XHJcbiAgICBsYXlvdXQuYWRkQ2xhc3MoJ21vZGFsLW9wZW4nKTtcclxuICAgICQoJ2h0bWwsIGJvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnaGlkZGVuJyk7XHJcbiAgICB3cmFwcGVyLmZhZGVJbigzMDApLmFkZENsYXNzKCdtb2RhbC1vcGVuJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNsb3NlUHJldk1vZGFscyh0YXJnZXQpO1xyXG4gIH1cclxuICBtb2RhbC5mYWRlSW4oMzAwKS5hZGRDbGFzcygnaXMtb3BlbicpO1xyXG4gIG1vZGFsLnRyaWdnZXIoJ29wZW5lZCcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbG9zZU1vZGFsKHRhcmdldCkge1xyXG4gIGxldCBtb2RhbCA9ICQodGFyZ2V0KTtcclxuICBtb2RhbC5mYWRlT3V0KDMwMCkucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICB3cmFwcGVyLmZhZGVPdXQoMzAwKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xyXG4gIGxheW91dC5yZW1vdmVDbGFzcygnbW9kYWwtb3BlbicpO1xyXG4gICQoJ2h0bWwsIGJvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnJyk7XHJcbiAgbW9kYWwudHJpZ2dlcignY2xvc2VkJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsb3NlUHJldk1vZGFscyh0YXJnZXQpIHtcclxuICBsZXQgbW9kYWwgPSAkKHRhcmdldCk7XHJcbiAgbW9kYWwuc2libGluZ3MoJy5tb2RhbC5pcy1vcGVuJykuZmFkZU91dCgzMDApLnJlbW92ZUNsYXNzKCdpcy1vcGVuJykudHJpZ2dlcignY2xvc2VkJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC+0LHRi9GC0LjQuSDQtNC70Y8g0LLRgdC/0LvRi9Cy0LDRjtGJ0LjRhSDQvtC60L7QvVxyXG4gKiBAZXhhbXBsZVxyXG4gKiBNb2RhbC5pbml0KCk7XHJcbiAqL1xyXG5mdW5jdGlvbiBpbml0KCl7XHJcbiAgICBcclxuICAkKCcuanMtbW9kYWwnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBsZXQgdGFyZ2V0ID0gJCh0aGlzKS5kYXRhKCd0YXJnZXQnKTtcclxuICAgICAgaWYgKCEkKHRhcmdldCkuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG4gICAgICAgIG9wZW5Nb2RhbCh0YXJnZXQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNsb3NlTW9kYWwodGFyZ2V0KTtcclxuICAgICAgfVxyXG4gIH0pO1xyXG4gIFxyXG4gICQoJy5idG4tY2xvc2UtbW9kYWwnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgbGV0IG1vZGFsID0gJCh0aGlzKS5jbG9zZXN0KCcubW9kYWwnKTtcclxuICAgIGNsb3NlTW9kYWwobW9kYWwpO1xyXG4gIH0pO1xyXG4gIFxyXG4gICQoJy5tb2RhbF9fd3JhcHBlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgIGNsb3NlTW9kYWwoJy5tb2RhbCcpO1xyXG4gIH0pO1xyXG4gICQoJy5tb2RhbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgfSk7XHJcbiAgXHJcbiAgJCgnLm1vZGFsLS12aWRlbycpLm9uKCdvcGVuZWQnLCBmdW5jdGlvbigpe1xyXG4gICAgJCh0aGlzKS5maW5kKCcuanMtbW9kYWwtdmlkZW8nKVswXS5wbGF5KCk7XHJcbiAgfSk7XHJcblxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0LCBvcGVuTW9kYWwsIGNsb3NlTW9kYWx9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9tb2RhbC5qcyIsIi8qKlxyXG4gKiBBY2NvcmRpb25cclxuICogQG1vZHVsZSBBY2NvcmRpb25cclxuICovXHJcblxyXG5mdW5jdGlvbiBvcGVuQWNjb3JkaW9uKGFjY29yZGlvbikge1xyXG4gIGxldCBhY2NvcmRpb25Db250ZW50ID0gYWNjb3JkaW9uLmZpbmQoJy5hY2NvcmRpb25fX2JvZHknKS5lcSgwKTtcclxuICBhY2NvcmRpb24uYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICBhY2NvcmRpb25Db250ZW50LnNsaWRlRG93big1MDApO1xyXG4gIGFjY29yZGlvbi50cmlnZ2VyKCdvcGVuZWQnKTtcclxufVxyXG5mdW5jdGlvbiBjbG9zZUFjY29yZGlvbihhY2NvcmRpb24pIHtcclxuICBsZXQgYWNjb3JkaW9uQ29udGVudCA9IGFjY29yZGlvbi5maW5kKCcuYWNjb3JkaW9uX19ib2R5JykuZXEoMCk7XHJcbiAgXHJcbiAgYWNjb3JkaW9uLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgYWNjb3JkaW9uQ29udGVudC5zbGlkZVVwKDUwMCk7XHJcbiAgYWNjb3JkaW9uLnRyaWdnZXIoJ2Nsb3NlZCcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0KCkge1xyXG4gIC8vIGluaXRpYWxcclxuICAkKCcuYWNjb3JkaW9uLmlzLW9wZW4nKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICBvcGVuQWNjb3JkaW9uKCQodGhpcykpO1xyXG4gIH0pO1xyXG4gIFxyXG4gIC8vIGFjdGlvblxyXG4gICQoJy5hY2NvcmRpb24nKS5vbignY2xpY2snLCAnLmFjY29yZGlvbl9faGVhZGVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgYWNjb3JkaW9uID0gJCh0aGlzKS5jbG9zZXN0KCcuYWNjb3JkaW9uJyk7XHJcbiAgICBpZihhY2NvcmRpb24uaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG4gICAgICBjbG9zZUFjY29yZGlvbihhY2NvcmRpb24pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb3BlbkFjY29yZGlvbihhY2NvcmRpb24pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHsgaW5pdCB9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9hY2NvcmRpb24uanMiLCIvKipcclxuICogVGFic1xyXG4gKiBAbW9kdWxlIFRhYnNcclxuICovXHJcblxyXG5mdW5jdGlvbiBvcGVuVGFiKHRhYikge1xyXG4gIHRhYi5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgbGV0IHRhcmdldCA9ICQodGFiLmRhdGEoJ3RhcmdldCcpKTtcclxuICB0YXJnZXQudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpLnNsaWRlRG93big1MDApO1xyXG4gIHRhcmdldC50cmlnZ2VyKCdvcGVuZWQnKTtcclxufVxyXG5mdW5jdGlvbiBjbG9zZVRhYih0YWIpIHtcclxuICBsZXQgdGFyZ2V0ID0gJCh0YWIuZGF0YSgndGFyZ2V0JykpO1xyXG4gIHRhYi5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgdGFyZ2V0LnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKS5zbGlkZVVwKDUwMCk7XHJcbiAgdGFyZ2V0LnRyaWdnZXIoJ2Nsb3NlZCcpO1xyXG59XHJcbiBcclxuZnVuY3Rpb24gaW5pdCgpIHtcclxuICAvLyBpbml0aWFsXHJcbiAgJCgnLnRhYnMnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgaW5pdGlhbEFjdGl2ZTtcclxuICAgIGlmKCQodGhpcykuZmluZCgnLnRhYi5pcy1hY3RpdmUnKS5sZW5ndGgpIHtcclxuICAgICAgaW5pdGlhbEFjdGl2ZSA9ICQodGhpcykuZmluZCgnLnRhYi5pcy1hY3RpdmUnKS5lcSgwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGluaXRpYWxBY3RpdmUgPSAkKHRoaXMpLmZpbmQoJy50YWInKS5lcSgwKTtcclxuICAgIH1cclxuICAgIG9wZW5UYWIoaW5pdGlhbEFjdGl2ZSk7XHJcbiAgfSk7XHJcbiAgXHJcbiAgXHJcbiAgLy8gYWN0aW9uXHJcbiAgJCgnLnRhYicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XHJcbiAgICAgIGNsb3NlVGFiKCQodGhpcykpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJCh0aGlzKS5zaWJsaW5ncygnLmlzLWFjdGl2ZScpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICBjbG9zZVRhYigkKHRoaXMpKTtcclxuICAgICAgfSk7XHJcbiAgICAgIG9wZW5UYWIoJCh0aGlzKSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0geyBpbml0IH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL3RhYnMuanMiLCIvKipcclxuICogTWFpbk1lbnVcclxuICogQG1vZHVsZSBNYWluTWVudVxyXG4gKi9cclxuXHJcbmxldCBtYWluTWVudSA9IHtcclxuICBlbDogJCgnLm1haW4tbmF2JyksXHJcbiAgYnRuOiAkKCcubWFpbi1uYXYtYnRuJyksXHJcbiAgc3RhdGU6IGZhbHNlXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrTWVudSAobWVudSwgbWVudVN0YXRlKSB7XHJcbiAgbWVudS5zdGF0ZSA9IG1lbnVTdGF0ZTtcclxuICBpZiAobWVudVN0YXRlKSB7XHJcbiAgICBvcGVuTWVudShtZW51KTtcclxuICB9IGVsc2Uge1xyXG4gICAgY2xvc2VNZW51KG1lbnUpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gb3Blbk1lbnUgKG1lbnUpIHtcclxuICBtZW51LnN0YXRlID0gdHJ1ZTtcclxuICAkKCdodG1sLCBib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJ2hpZGRlbicpO1xyXG4gIG1lbnUuYnRuLmFkZENsYXNzKCdpcy1vcGVuJyk7XHJcbiAgbWVudS5lbC5mYWRlSW4oNTAwKTtcclxuICBtZW51LmVsLnRyaWdnZXIoJ29wZW5lZCcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbG9zZU1lbnUgKG1lbnUpIHtcclxuICBtZW51LnN0YXRlID0gZmFsc2U7XHJcbiAgJCgnaHRtbCwgYm9keScpLmNzcygnb3ZlcmZsb3cteScsICcnKTtcclxuICBtZW51LmJ0bi5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xyXG4gIG1lbnUuZWwuZmFkZU91dCgzMDApO1xyXG4gIG1lbnUuZWwudHJpZ2dlcignY2xvc2VkJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDQvNC10L3RjlxyXG4gKiBAZXhhbXBsZVxyXG4gKiBNYWluTWVudS5pbml0KCk7XHJcbiAqL1xyXG5mdW5jdGlvbiBpbml0KCl7XHJcbiAgXHJcbiAgbGV0IGlzU21hbGwgPSBNYWluLkRldmljZURldGVjdGlvbi5pc01vYmlsZSgpIHx8IE1haW4uRGV2aWNlRGV0ZWN0aW9uLmlzVGFibGV0KCk7XHJcbiAgXHJcbiAgLy8gc2V0IGluaXRpYWwgc3RhdGVcclxuICBpZiAoaXNTbWFsbCkge1xyXG4gICAgY2hlY2tNZW51KG1haW5NZW51LCAhaXNTbWFsbCk7XHJcbiAgfVxyXG4gIFxyXG4gIC8vIHNldCBzdGF0ZSBhZnRlciByZXNpemVcclxuICAkKHdpbmRvdykub24oJ3Jlc2l6ZWVuZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgIGlzU21hbGwgPSBNYWluLkRldmljZURldGVjdGlvbi5pc01vYmlsZSgpIHx8IE1haW4uRGV2aWNlRGV0ZWN0aW9uLmlzVGFibGV0KCk7XHJcbiAgICBjaGVja01lbnUobWFpbk1lbnUsICFpc1NtYWxsKTtcclxuICB9KTtcclxuICBcclxuICAvLyB0b2dnbGUgc3RhdGUgYnkgYnRuXHJcbiAgbWFpbk1lbnUuYnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgY2hlY2tNZW51KG1haW5NZW51LCAhbWFpbk1lbnUuc3RhdGUpO1xyXG4gIH0pO1xyXG4gIFxyXG4gIC8vIGNsb3NlIGJ5IGNsaWNrIG91dHNpZGVcclxuICAkKCcubGF5b3V0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGlzU21hbGwgPSBNYWluLkRldmljZURldGVjdGlvbi5pc01vYmlsZSgpIHx8IE1haW4uRGV2aWNlRGV0ZWN0aW9uLmlzVGFibGV0KCk7XHJcbiAgICBpZiAoaXNTbWFsbCkge1xyXG4gICAgICBpZiAoIW1haW5NZW51LmVsLmZpbmQoZS50YXJnZXQpLmxlbmd0aCkge1xyXG4gICAgICAgIGNsb3NlTWVudShtYWluTWVudSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuICBcclxuICAvLyBzdG9wIGJ1YmJsaW5nIGNsaWNrIGluc2lkZVxyXG4gIG1haW5NZW51LmVsLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIH0pXHJcbiAgXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXQsIGNoZWNrTWVudX07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL21haW4tbWVudS5qcyIsIi8qKlxyXG4gKiDQktC40LTQtdC+XHJcbiAqIEBtb2R1bGUgVmlkZW9cclxuICovXHJcblxyXG5cclxuLyoqXHJcbiAqINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5INC00LvRjyDQstGB0L/Qu9GL0LLQsNGO0YnQuNGFINC+0LrQvtC9XHJcbiAqIEBleGFtcGxlXHJcbiAqIE1vZGFsLmluaXQoKTtcclxuICovXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuICBcclxuICAkKCcubW9kYWwtLXZpZGVvJykub24oJ29wZW5lZCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAkKHRoaXMpLmZpbmQoJy5qcy1tb2RhbC12aWRlbycpWzBdLnBsYXkoKTtcclxuICB9KTtcclxuICAkKCcubW9kYWwtLXZpZGVvJykub24oJ2Nsb3NlZCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAkKHRoaXMpLmZpbmQoJy5qcy1tb2RhbC12aWRlbycpWzBdLnBhdXNlKCk7XHJcbiAgfSk7XHJcbiAgXHJcbiAgJCgndmlkZW8nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgbGV0IHNlbGYgPSAkKHRoaXMpWzBdO1xyXG4gICAgaWYgKHNlbGYucGF1c2VkKSB7XHJcbiAgICAgIHNlbGYucGxheSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2VsZi5wYXVzZSgpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL3ZpZGVvLmpzIiwiLyoqXHJcbiAqINCf0LXRgNC10LrQu9GO0YfQtdC90LjQtSDQutC70LDRgdGB0L7QsiDQv9C+INGA0LDQt9C70LjRh9C90YvQvCDRgdC+0LHRi9GC0LjRj9C8XHJcbiAqIEBtb2R1bGUgQW5pbWF0aW9uXHJcbiAqL1xyXG5cclxubGV0IHNjcm9sbEFuaW1hdGlvbkJsb2NrcyA9ICQoJy5hLXNjcm9sbC1ib3gnKTtcclxubGV0IHBhcmFsbGF4QmxvY2tzID0gJCgnLmEtcGFyYWxsYXgtYm94Jyk7XHJcbiBcclxuZnVuY3Rpb24gYWRkQ2xhc3NUb2dnbGVyU2NlbmUgKGVsLCBjb250cm9sbGVyKSB7XHJcbiAgbmV3IFNjcm9sbE1hZ2ljLlNjZW5lKHtcclxuICAgIHRyaWdnZXJFbGVtZW50OiBlbCxcclxuICAgIHRyaWdnZXJIb29rOiAwLjJcclxuICB9KVxyXG4gIC5zZXRDbGFzc1RvZ2dsZShlbCwgJ2FuaW1hdGUnKVxyXG4gIC5hZGRUbyhjb250cm9sbGVyKVxyXG4gIC5vbignZW50ZXInLCBmdW5jdGlvbigpe1xyXG4gICAgJCgnLmEtaW5kaWNhdG9yJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmVxKCQoZWwpLmluZGV4KCkpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICB9KVxyXG4gIC5vbignbGVhdmUnLCBmdW5jdGlvbigpe1xyXG4gICAgJCgnLmEtaW5kaWNhdG9yJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmVxKCQoZWwpLmluZGV4KCkgLSAxKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZENsYXNzVG9nZ2xlckNvbnRyb2xsZXIgKGFuaW1hdGlvbkJsb2Nrcykge1xyXG4gIGxldCBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcclxuICBhbmltYXRpb25CbG9ja3MuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICBsZXQgYURlbGF5ID0gMzAwO1xyXG4gICAgICBpZih0aGlzLm9mZnNldFRvcCA8IHdpbmRvdy5pbm5lckhlaWdodCkge1xyXG4gICAgICAgIGFEZWxheSA9IDEzMDA7XHJcbiAgICAgIH1cclxuICAgICAgc2V0VGltZW91dChhZGRDbGFzc1RvZ2dsZXJTY2VuZSwgYURlbGF5LCB0aGlzLCBjb250cm9sbGVyKTtcclxuICAgIC8vfVxyXG4gIH0pO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0RnJvbVBvc2l0aW9uIChlbCwgZGVmYXVsdFBvc2l0aW9uID0gWzAsIDBdKXtcclxuICByZXR1cm4gKGVsLmF0dHIoJ2RhdGEtcGFyYWxsYXgtZnJvbScpICE9PSB1bmRlZmluZWQpID8gKGVsLmF0dHIoJ2RhdGEtcGFyYWxsYXgtZnJvbScpKS5zcGxpdCgnLCAnKSA6IGRlZmF1bHRQb3NpdGlvbjtcclxufVxyXG5mdW5jdGlvbiBnZXRUb1Bvc2l0aW9uIChlbCwgZGVmYXVsdFBvc2l0aW9uID0gWzAsIDBdKXtcclxuICByZXR1cm4gKGVsLmF0dHIoJ2RhdGEtcGFyYWxsYXgtdG8nKSAhPT0gdW5kZWZpbmVkKSA/IChlbC5hdHRyKCdkYXRhLXBhcmFsbGF4LXRvJykpLnNwbGl0KCcsICcpIDogZGVmYXVsdFBvc2l0aW9uO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRQYXJhbGxheFRpbWVsaW5lIChlbCkge1xyXG4gIGxldCB0d2VlbiA9IG5ldyBUaW1lbGluZU1heCgpO1xyXG4gIGxldCB0d2VlbnNBcnIgPSBbXTtcclxuICBpZiAoJChlbCkuZmluZCgnLmEtcGFyYWxsYXgtbGVmdCcpKSB7XHJcbiAgICBsZXQgdGFyZ2V0RWwgPSAkKGVsKS5maW5kKCcuYS1wYXJhbGxheC1sZWZ0Jyk7XHJcbiAgICBsZXQgZnJvbVBvcyA9IGdldEZyb21Qb3NpdGlvbih0YXJnZXRFbCwgWy0zMCwgMzBdKTtcclxuICAgIGxldCB0b1BvcyA9IGdldFRvUG9zaXRpb24odGFyZ2V0RWwpO1xyXG4gICAgdHdlZW5zQXJyLnB1c2goVHdlZW5NYXguZnJvbVRvKHRhcmdldEVsLCAxLCB7eFBlcmNlbnQ6IGZyb21Qb3NbMF0sIHlQZXJjZW50OiBmcm9tUG9zWzFdfSwge3hQZXJjZW50OiB0b1Bvc1swXSwgeVBlcmNlbnQ6IHRvUG9zWzFdLCBlYXNlOiBMaW5lYXIuZWFzZU5vbmV9KSk7XHJcbiAgfVxyXG4gIGlmICgkKGVsKS5maW5kKCcuYS1wYXJhbGxheC1yaWdodCcpKSB7XHJcbiAgICBsZXQgdGFyZ2V0RWwgPSAkKGVsKS5maW5kKCcuYS1wYXJhbGxheC1yaWdodCcpO1xyXG4gICAgbGV0IGZyb21Qb3MgPSBnZXRGcm9tUG9zaXRpb24odGFyZ2V0RWwsIFszMCwgMzBdKTtcclxuICAgIGxldCB0b1BvcyA9IGdldFRvUG9zaXRpb24odGFyZ2V0RWwpO1xyXG4gICAgdHdlZW5zQXJyLnB1c2goVHdlZW5NYXguZnJvbVRvKHRhcmdldEVsLCAxLCB7eFBlcmNlbnQ6IGZyb21Qb3NbMF0sIHlQZXJjZW50OiBmcm9tUG9zWzFdfSwge3hQZXJjZW50OiB0b1Bvc1swXSwgeVBlcmNlbnQ6IHRvUG9zWzFdLCBlYXNlOiBMaW5lYXIuZWFzZU5vbmV9KSk7XHJcbiAgfVxyXG4gIHR3ZWVuLmFkZCh0d2VlbnNBcnIpO1xyXG4gIHJldHVybiB0d2VlbjtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkUGFyYWxsYXhTY2VuZSAoZWwsIHR3ZWVuLCBjb250cm9sbGVyKSB7XHJcbiAgbmV3IFNjcm9sbE1hZ2ljLlNjZW5lKHtcclxuICAgIHRyaWdnZXJFbGVtZW50OiBlbCxcclxuICAgIHRyaWdnZXJIb29rOiAwLjIsXHJcbiAgICBkdXJhdGlvbjogJChlbCkuaGVpZ2h0KClcclxuICB9KVxyXG4gIC5zZXRUd2Vlbih0d2VlbilcclxuICAuYWRkVG8oY29udHJvbGxlcik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFBhcmFsbGF4Q29udHJvbGxlciAoYW5pbWF0aW9uQmxvY2tzKSB7XHJcbiAgbGV0IGNvbnRyb2xsZXIgPSBuZXcgU2Nyb2xsTWFnaWMuQ29udHJvbGxlcigpO1xyXG4gIGFuaW1hdGlvbkJsb2Nrcy5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgdHdlZW4gPSBnZXRQYXJhbGxheFRpbWVsaW5lKHRoaXMpO1xyXG4gICAgYWRkUGFyYWxsYXhTY2VuZSh0aGlzLCB0d2VlbiwgY29udHJvbGxlcik7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXQgKCkge1xyXG4gIGlmIChzY3JvbGxBbmltYXRpb25CbG9ja3MubGVuZ3RoID4gMCl7XHJcbiAgICAvLyQoJ2h0bWwnKS5hZGRDbGFzcygnaXMtYW5pbWF0aW5nJyk7XHJcbiAgICBhZGRDbGFzc1RvZ2dsZXJDb250cm9sbGVyKHNjcm9sbEFuaW1hdGlvbkJsb2Nrcyk7XHJcbiAgfVxyXG4gIFxyXG4gIGlmICghTWFpbi5EZXZpY2VEZXRlY3Rpb24uaXNUb3VjaCgpKXtcclxuICAgICQoJy5qcy1ob3ZlcicpLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKXtcclxuICAgICAgbGV0IHNlbGYgPSAkKHRoaXMpO1xyXG4gICAgICBzZWxmLmFkZENsYXNzKCdhLWVudGVyJyk7XHJcbiAgICB9KTtcclxuICAgICQoJy5qcy1ob3ZlcicpLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKXtcclxuICAgICAgbGV0IHNlbGYgPSAkKHRoaXMpO1xyXG4gICAgICBzZWxmLnJlbW92ZUNsYXNzKCdhLWVudGVyJykuYWRkQ2xhc3MoJ2EtbGVhdmUnKTtcclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgIHNlbGYucmVtb3ZlQ2xhc3MoJ2EtbGVhdmUnKTtcclxuICAgICAgfSwgMzAwLCBzZWxmKTtcclxuICAgIH0pO1xyXG4gIH1cclxuICBcclxuICBpZiAocGFyYWxsYXhCbG9ja3MubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDEwMjQpe1xyXG4gICAgJCgnaHRtbCcpLmFkZENsYXNzKCdpcy1hbmltYXRpbmcnKTtcclxuICAgIGFkZFBhcmFsbGF4Q29udHJvbGxlcihwYXJhbGxheEJsb2Nrcyk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvYW5pbWF0aW9uLmpzIiwiZnVuY3Rpb24gZ2V0SWNvbihlbCkge1xyXG4gIGxldCBpY29uID0gJyc7XHJcbiAgaWYgKGVsLmhhc0NsYXNzKCd5YS1zaGFyZTJfX2l0ZW1fc2VydmljZV92a29udGFrdGUnKSkge1xyXG4gICAgaWNvbiA9ICd2ayc7XHJcbiAgfVxyXG4gIGlmIChlbC5oYXNDbGFzcygneWEtc2hhcmUyX19pdGVtX3NlcnZpY2VfZmFjZWJvb2snKSkge1xyXG4gICAgaWNvbiA9ICdmYic7XHJcbiAgfVxyXG4gIGlmIChlbC5oYXNDbGFzcygneWEtc2hhcmUyX19pdGVtX3NlcnZpY2VfdHdpdHRlcicpKSB7XHJcbiAgICBpY29uID0gJ3R3JztcclxuICB9XHJcbiAgcmV0dXJuICc8c3ZnIGNsYXNzPVwiaWNvbiBzb2NpYWwtaWNvblwiPjx1c2UgeGxpbms6aHJlZj1cIiMnICsgaWNvbiArICdcIi8+PC9zdmc+JztcclxufVxyXG5mdW5jdGlvbiBmaWxsSWNvbnMoKSB7XHJcbiAgJCgnI3NoYXJlIC55YS1zaGFyZTJfX2l0ZW0nKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAkKHRoaXMpLmZpbmQoJy55YS1zaGFyZTJfX2ljb24nKS5odG1sKGdldEljb24oJCh0aGlzKSkpO1xyXG4gIH0pO1xyXG59XHJcbmZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgWWEuc2hhcmUyKCdzaGFyZScsIHtcclxuICAgIGNvbnRlbnQ6IHtcclxuICAgICAgdXJsOiB3aW5kb3cubG9jYXRpb24uaHJlZixcclxuICAgICAgdGl0bGU6ICdBcXVhIEtlbnpvJyxcclxuICAgICAgZGVzY3JpcHRpb246IFwiXCIsXHJcbiAgICAgIC8vaW1hZ2U6ICdidWlsZC9pbWcvc2hhcmUuanBnJ1xyXG4gICAgICBpbWFnZTogJ2h0dHA6Ly9uaW94aW4zMGRheXMuZWxsZS5ydS9idWlsZC9pbWcvc2hhcmUuanBnJ1xyXG4gICAgfSxcclxuICAgIHRoZW1lOiB7XHJcbiAgICAgIHNlcnZpY2VzOiAndmtvbnRha3RlLGZhY2Vib29rLHR3aXR0ZXInLFxyXG4gICAgICBiYXJlOiB0cnVlLFxyXG4gICAgICBsYW5nOiAncnUnXHJcbiAgICB9LFxyXG4gICAgaG9va3M6IHtcclxuICAgICAgb25yZWFkeTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZmlsbEljb25zKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvc2hhcmUuanMiLCIvKipcclxuICog0J/QtdGA0LXQutC70Y7Rh9C10L3QuNC1INC60LvQsNGB0YHQvtCyINC/0L4g0YDQsNC30LvQuNGH0L3Ri9C8INGB0L7QsdGL0YLQuNGP0LxcclxuICogQG1vZHVsZSBXYXZlXHJcbiAqL1xyXG5cclxubGV0IHNwcml0ZUltYWdlcyBcdD0gJCgnLmpzLXdhdmUtaW1hZ2UnKTtcclxubGV0IHNwcml0ZUltYWdlc0Z1bGwgXHQ9ICQoJy5qcy13YXZlLWltYWdlLWZ1bGwnKTtcclxuXHJcblxyXG5mdW5jdGlvbiBpbml0KCkge1xyXG4gIFxyXG4gIHNwcml0ZUltYWdlcy5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgY2xvc2VzdCA9ICQodGhpcykucGFyZW50KClbMF07XHJcbiAgICBsZXQgY2xvc2VzdFNpemVYID0gY2xvc2VzdC5vZmZzZXRXaWR0aDtcclxuICAgIGxldCBjbG9zZXN0U2l6ZVkgPSBjbG9zZXN0Lm9mZnNldEhlaWdodDtcclxuICAgIGxldCBzcHJpdGVTcmMgPSBbJCh0aGlzKS5hdHRyKCdzcmMnKV07XHJcbiAgICBsZXQgaW5pdENhbnZhc1NsaWRlc2hvdyA9IG5ldyBDYW52YXNTbGlkZXNob3coe1xyXG4gICAgICBzcHJpdGVzOiBzcHJpdGVTcmMsXHJcbiAgICAgIGRpc3BsYWNlbWVudEltYWdlOiAnYnVpbGQvaW1nL2Nsb3Vkcy5qcGcnLFxyXG4gICAgICBhdXRvUGxheTogdHJ1ZSxcclxuICAgICAgYXV0b1BsYXlTcGVlZDogWzEwLCAzXSxcclxuICAgICAgZGlzcGxhY2VTY2FsZTogWzIwMCwgNzBdLFxyXG4gICAgICBzdGFnZVdpZHRoOiBjbG9zZXN0U2l6ZVgsXHJcbiAgICAgIHN0YWdlSGVpZ2h0OiBjbG9zZXN0U2l6ZVksXHJcbiAgICAgIGZ1bGxTY3JlZW46IGZhbHNlLFxyXG4gICAgICBjbG9zZXN0Q29udGFpbmVyOiBjbG9zZXN0XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBcclxuICBzcHJpdGVJbWFnZXNGdWxsLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIGxldCBjbG9zZXN0ID0gJCh0aGlzKS5wYXJlbnQoKVswXTtcclxuICAgIGxldCBjbG9zZXN0U2l6ZVggPSBjbG9zZXN0Lm9mZnNldFdpZHRoO1xyXG4gICAgbGV0IGNsb3Nlc3RTaXplWSA9IGNsb3Nlc3Qub2Zmc2V0SGVpZ2h0O1xyXG4gICAgbGV0IHNwcml0ZVNyYyA9IFskKHRoaXMpLmF0dHIoJ3NyYycpXTtcclxuICAgIGxldCBpbml0Q2FudmFzU2xpZGVzaG93ID0gbmV3IENhbnZhc1NsaWRlc2hvdyh7XHJcbiAgICAgIHNwcml0ZXM6IHNwcml0ZVNyYyxcclxuICAgICAgZGlzcGxhY2VtZW50SW1hZ2U6ICdidWlsZC9pbWcvY2xvdWRzLmpwZycsXHJcbiAgICAgIGF1dG9QbGF5OiB0cnVlLFxyXG4gICAgICBhdXRvUGxheVNwZWVkOiBbMTAsIDNdLFxyXG4gICAgICBkaXNwbGFjZVNjYWxlOiBbMjAwLCA3MF0sXHJcbiAgICAgIHN0YWdlV2lkdGg6IGNsb3Nlc3RTaXplWCxcclxuICAgICAgc3RhZ2VIZWlnaHQ6IGNsb3Nlc3RTaXplWSxcclxuICAgICAgZnVsbFNjcmVlbjogdHJ1ZSxcclxuICAgICAgY2xvc2VzdENvbnRhaW5lcjogY2xvc2VzdFxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0geyBpbml0IH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL3dhdmUuanMiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVhBOzs7Ozs7OztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDOUJBOzs7OztBQUtBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBT0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7Ozs7Ozs7OztBQzNLQTs7Ozs7QUFNQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ2hFQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQVpBO0FBY0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUMxRUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0RUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ25DQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUMzQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7Ozs7Ozs7O0FDOUVBOzs7OztBQU1BOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOzs7Ozs7Ozs7QUM5QkE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQU9BO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDekdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBYkE7QUFtQkE7Ozs7Ozs7OztBQ3RDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFXQTtBQUVBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9