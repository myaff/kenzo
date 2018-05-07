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
	  Share: Share
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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmMmEwZDczYTQ1NjMyN2E3MTYxZiIsIndlYnBhY2s6Ly8vc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL2lucHV0LmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9mb3JtLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9tb2RhbC5qcyIsIndlYnBhY2s6Ly8vc3JjL2pzL2NvbXBvbmVudHMvYWNjb3JkaW9uLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy90YWJzLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9tYWluLW1lbnUuanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL3ZpZGVvLmpzIiwid2VicGFjazovLy9zcmMvanMvY29tcG9uZW50cy9hbmltYXRpb24uanMiLCJ3ZWJwYWNrOi8vL3NyYy9qcy9jb21wb25lbnRzL3NoYXJlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9rZW56by9idWlsZC9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmMmEwZDczYTQ1NjMyN2E3MTYxZiIsImxldCBEZXZpY2VEZXRlY3Rpb24gPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2RldmljZS1kZXRlY3Rpb25cIik7XHJcbmxldCBIZWxwZXJzID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9oZWxwZXJzXCIpO1xyXG5sZXQgSW5wdXQgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2lucHV0XCIpO1xyXG5sZXQgRm9ybSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvZm9ybVwiKTtcclxubGV0IE1vZGFsID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9tb2RhbFwiKTtcclxubGV0IEFjY29yZGlvbiA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvYWNjb3JkaW9uXCIpO1xyXG5sZXQgVGFicyA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvdGFic1wiKTtcclxubGV0IE1haW5NZW51ID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9tYWluLW1lbnVcIik7XHJcbmxldCBWaWRlbyA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvdmlkZW9cIik7XHJcbmxldCBBbmltYXRpb24gPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2FuaW1hdGlvblwiKTtcclxubGV0IFNoYXJlID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9zaGFyZVwiKTtcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcbiAgXHJcbiAgRGV2aWNlRGV0ZWN0aW9uLnJ1bigpO1xyXG4gIEhlbHBlcnMuaW5pdCgpO1xyXG4gIElucHV0LmluaXQoKTtcclxuICBGb3JtLmluaXQoKTtcclxuICBNb2RhbC5pbml0KCk7XHJcbiAgQWNjb3JkaW9uLmluaXQoKTtcclxuICBUYWJzLmluaXQoKTtcclxuICAvL01haW5NZW51LmluaXQoKTtcclxuICBWaWRlby5pbml0KCk7XHJcbiAgU2hhcmUuaW5pdCgpO1xyXG4gIFxyXG4gICQuYWZ0ZXJsYWcoZnVuY3Rpb24oKXtcclxuICAgICQoJ2h0bWwnKS5hZGRDbGFzcygnaXMtbG9hZGVkJyk7XHJcbiAgfSk7XHJcbiAgXHJcbiAgJCgnaHRtbCcpLmFkZENsYXNzKCdpcy1hbmltYXRpbmcnKTtcclxuICBcclxuICBpZiAoJCgnLnBhZ2UnKS5oYXNDbGFzcygncGFnZS0taG9tZScpKSB7XHJcbiAgICAkKCdodG1sLCBib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJ2hpZGRlbicpO1xyXG4gICAgJCgnLmpzLXBsYWNlaG9sZGVyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgJCgnaHRtbCwgYm9keScpLmNzcygnb3ZlcmZsb3cteScsICcnKTtcclxuICAgICAgJCgnaHRtbCcpLmFkZENsYXNzKCdpcy1sb2FkZWQnKTtcclxuICAgICAgQW5pbWF0aW9uLmluaXQoKTtcclxuICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuaG9tZS1wbGFjZWhvbGRlcicpLmZhZGVPdXQoNTAwKTtcclxuICAgICAgJCgnLmEtYW5pbS10ZXh0JykuYWRkQ2xhc3MoJ2FuaW1hdGUnKTtcclxuICAgIH0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBBbmltYXRpb24uaW5pdCgpO1xyXG4gIH1cclxuICBcclxufSk7XHJcblxyXG5cclxuLyoqXHJcbiAqINCh0L/QuNGB0L7QuiDRjdC60YHQv9C+0YDRgtC40YDRg9C10LzRi9GFINC80L7QtNGD0LvQtdC5LCDRh9GC0L7QsdGLINC40LzQtdGC0Ywg0Log0L3QuNC8INC00L7RgdGC0YPQvyDQuNC30LLQvdC1XHJcbiAqIEBleGFtcGxlXHJcbiAqIE1haW4uRm9ybS5pc0Zvcm1WYWxpZCgpO1xyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgRGV2aWNlRGV0ZWN0aW9uLFxyXG4gIEhlbHBlcnMsXHJcbiAgSW5wdXQsXHJcbiAgRm9ybSxcclxuICBNb2RhbCxcclxuICBBY2NvcmRpb24sXHJcbiAgVGFicyxcclxuICBNYWluTWVudSxcclxuICBWaWRlbyxcclxuICBTaGFyZVxyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvbWFpbi5qcyIsImxldCBicmVha3BvaW50cyA9IHtcclxuICBzbTogNzY3LFxyXG4gIG1kOiAxMDI0LFxyXG4gIGxnOiAxMjgwLFxyXG4gIHhsOiAxNjAwXHJcbn07XHJcblxyXG5mdW5jdGlvbiBpc01vYmlsZSgpe1xyXG4gIHJldHVybiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gYnJlYWtwb2ludHMuc20pO1xyXG59XHJcbmZ1bmN0aW9uIGlzVGFibGV0KCl7XHJcbiAgcmV0dXJuICgkKHdpbmRvdykud2lkdGgoKSA+IGJyZWFrcG9pbnRzLnNtICYmICQod2luZG93KS53aWR0aCgpIDw9IGJyZWFrcG9pbnRzLm1kKVxyXG59XHJcbmZ1bmN0aW9uIGlzVG91Y2goKXtcclxuICByZXR1cm4gJ29udG91Y2hzdGFydCcgaW4gd2luZG93IHx8IG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cztcclxufVxyXG5mdW5jdGlvbiBpc01vYmlsZVZlcnNpb24oKXtcclxuICByZXR1cm4gISF+d2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZihcIi9tb2JpbGUvXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBydW4oKXtcclxuICBpZihpc1RvdWNoKCkpe1xyXG4gICAgJCgnaHRtbCcpLnJlbW92ZUNsYXNzKCduby10b3VjaCcpLmFkZENsYXNzKCd0b3VjaCcpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoJ3RvdWNoJykuYWRkQ2xhc3MoJ25vLXRvdWNoJyk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtydW4sIGlzVG91Y2gsIGlzTW9iaWxlLCBpc1RhYmxldCwgaXNNb2JpbGVWZXJzaW9ufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvZGV2aWNlLWRldGVjdGlvbi5qcyIsIi8qKlxyXG4gKiBIZWxwZXJzXHJcbiAqIEBtb2R1bGUgSGVscGVyc1xyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBDYWxjdWxhdGUgc2Nyb2xsYmFyIHdpZHRoIGluIGVsZW1lbnRcclxuICogLSBpZiB0aGUgd2lkdGggaXMgMCBpdCBtZWFucyB0aGUgc2Nyb2xsYmFyIGlzIGZsb2F0ZWQvb3ZlcmxheWVkXHJcbiAqIC0gYWNjZXB0cyBcImNvbnRhaW5lclwiIHBhcmVtZXRlciBiZWNhdXNlIGllICYgZWRnZSBjYW4gaGF2ZSBkaWZmZXJlbnRcclxuICogICBzY3JvbGxiYXIgYmVoYXZpb3JzIGZvciBkaWZmZXJlbnQgZWxlbWVudHMgdXNpbmcgJy1tcy1vdmVyZmxvdy1zdHlsZSdcclxuICovXHJcbmZ1bmN0aW9uIGdldE5hdGl2ZVNjcm9sbGJhcldpZHRoIChjb250YWluZXIpIHtcclxuICBjb250YWluZXIgPSBjb250YWluZXIgfHwgZG9jdW1lbnQuYm9keTtcclxuXHJcbiAgbGV0IGZ1bGxXaWR0aCA9IDA7XHJcbiAgbGV0IGJhcldpZHRoID0gMDtcclxuXHJcbiAgbGV0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBsZXQgY2hpbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgd3JhcHBlci5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcbiAgd3JhcHBlci5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xyXG4gIHdyYXBwZXIuc3R5bGUuYm90dG9tID0gJzAnO1xyXG4gIHdyYXBwZXIuc3R5bGUucmlnaHQgPSAnMCc7XHJcbiAgd3JhcHBlci5zdHlsZS53aWR0aCA9ICcxMDBweCc7XHJcbiAgd3JhcHBlci5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG5cclxuICB3cmFwcGVyLmFwcGVuZENoaWxkKGNoaWxkKTtcclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQod3JhcHBlcik7XHJcblxyXG4gIGZ1bGxXaWR0aCA9IGNoaWxkLm9mZnNldFdpZHRoO1xyXG4gIHdyYXBwZXIuc3R5bGUub3ZlcmZsb3dZID0gJ3Njcm9sbCc7XHJcbiAgYmFyV2lkdGggPSBmdWxsV2lkdGggLSBjaGlsZC5vZmZzZXRXaWR0aDtcclxuXHJcbiAgY29udGFpbmVyLnJlbW92ZUNoaWxkKHdyYXBwZXIpO1xyXG5cclxuICByZXR1cm4gYmFyV2lkdGg7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaHJvdHRsZSBIZWxwZXJcclxuICogaHR0cHM6Ly9yZW15c2hhcnAuY29tLzIwMTAvMDcvMjEvdGhyb3R0bGluZy1mdW5jdGlvbi1jYWxsc1xyXG4gKi9cclxuZnVuY3Rpb24gdGhyb3R0bGUgKGZuLCB0aHJlc2hob2xkLCBzY29wZSkge1xyXG4gIHRocmVzaGhvbGQgfHwgKHRocmVzaGhvbGQgPSAyNTApO1xyXG4gIGxldCBsYXN0LFxyXG4gICAgZGVmZXJUaW1lcjtcclxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IGNvbnRleHQgPSBzY29wZSB8fCB0aGlzO1xyXG5cclxuICAgIGxldCBub3cgPSArbmV3IERhdGUoKSxcclxuICAgICAgYXJncyA9IGFyZ3VtZW50cztcclxuICAgIGlmIChsYXN0ICYmIG5vdyA8IGxhc3QgKyB0aHJlc2hob2xkKSB7XHJcbiAgICAgIC8vIGhvbGQgb24gdG8gaXRcclxuICAgICAgY2xlYXJUaW1lb3V0KGRlZmVyVGltZXIpO1xyXG4gICAgICBkZWZlclRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGFzdCA9IG5vdztcclxuICAgICAgICBmbi5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuICAgICAgfSwgdGhyZXNoaG9sZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsYXN0ID0gbm93O1xyXG4gICAgICBmbi5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qKiBcclxuICogRGVib3VuY2UgSGVscGVyXHJcbiAqIGh0dHBzOi8vcmVteXNoYXJwLmNvbS8yMDEwLzA3LzIxL3Rocm90dGxpbmctZnVuY3Rpb24tY2FsbHNcclxuICovXHJcbmZ1bmN0aW9uIGRlYm91bmNlIChmbiwgZGVsYXkpIHtcclxuICBsZXQgdGltZXIgPSBudWxsO1xyXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgY29udGV4dCA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICBjbGVhclRpbWVvdXQodGltZXIpO1xyXG4gICAgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgZm4uYXBwbHkoY29udGV4dCwgYXJncyk7XHJcbiAgICB9LCBkZWxheSk7XHJcbiAgfTtcclxufTtcclxuXHJcbmxldCB0aW1lcjtcclxubGV0IHRpbWVvdXQgPSBmYWxzZTtcclxubGV0IGRlbHRhID0gMjAwO1xyXG5mdW5jdGlvbiByZXNpemVFbmQoKSB7XHJcbiAgaWYgKG5ldyBEYXRlKCkgLSB0aW1lciA8IGRlbHRhKSB7XHJcbiAgICBzZXRUaW1lb3V0KHJlc2l6ZUVuZCwgZGVsdGEpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aW1lb3V0ID0gZmFsc2U7XHJcbiAgICAkKHdpbmRvdykudHJpZ2dlcigncmVzaXplZW5kJyk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVDbGFzc0lmKGVsLCBjb25kLCB0b2dnbGVkQ2xhc3Mpe1xyXG5cdGlmKGNvbmQpe1xyXG5cdFx0ZWwuYWRkQ2xhc3ModG9nZ2xlZENsYXNzKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0ZWwucmVtb3ZlQ2xhc3ModG9nZ2xlZENsYXNzKTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDQpNGD0L3QutGG0LjRjyDQtNC+0LHQsNCy0LvRj9C10YIg0Log0Y3Qu9C10LzQtdC90YLRgyDQutC70LDRgdGBLCDQtdGB0LvQuCDRgdGC0YDQsNC90LjRhtCwINC/0YDQvtC60YDRg9GH0LXQvdCwINCx0L7Qu9GM0YjQtSwg0YfQtdC8INC90LAg0YPQutCw0LfQsNC90L3QvtC1INC30L3QsNGH0LXQvdC40LUsIFxyXG4gKiDQuCDRg9Cx0LjRgNCw0LXRgiDQutC70LDRgdGBLCDQtdGB0LvQuCDQt9C90LDRh9C10L3QuNC1INC80LXQvdGM0YjQtVxyXG4gKiBAcGFyYW0ge29iamVjdH0gZWwgLSDRjdC70LXQvNC10L3Rgiwg0YEg0LrQvtGC0L7RgNGL0Lwg0LLQt9Cw0LjQvNC+0LTQtdC50YHRgtCy0YPQtdC8XHJcbiAqIEBwYXJhbSB7bWl4ZWR9IFtzY3JvbGxWYWx1ZT0wXSAtINC30L3QsNGH0LXQvdC40LUg0L/RgNC+0LrRgNGD0YLQutC4LCDQvdCwINC60L7RgtC+0YDQvtC8INC80LXQvdGP0LXQvCBjc3Mt0LrQu9Cw0YHRgSwg0L7QttC40LTQsNC10LzQvtC1INC30L3QsNGH0LXQvdC40LUgLSDRh9C40YHQu9C+INC40LvQuCDQutC70Y7Rh9C10LLQvtC1INGB0LvQvtCy0L4gJ3RoaXMnLiDQldGB0LvQuCDQv9C10YDQtdC00LDQvdC+ICd0aGlzJywg0L/QvtC00YHRgtCw0LLQu9GP0LXRgtGB0Y8g0L/QvtC70L7QttC10L3QuNC1IGVsLm9mZnNldCgpLnRvcCDQvNC40L3Rg9GBINC/0L7Qu9C+0LLQuNC90LAg0LLRi9GB0L7RgtGLINGN0LrRgNCw0L3QsFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW3RvZ2dsZWRDbGFzcz1zY3JvbGxlZF0gLSBjc3Mt0LrQu9Cw0YHRgSwg0LrQvtGC0L7RgNGL0Lkg0L/QtdGA0LXQutC70Y7Rh9Cw0LXQvFxyXG4gKi9cclxuZnVuY3Rpb24gdG9nZ2xlRWxlbWVudENsYXNzT25TY3JvbGwoZWwsIHNjcm9sbFZhbHVlID0gMCwgdG9nZ2xlZENsYXNzID0gJ3Njcm9sbGVkJyl7XHJcblx0aWYoZWwubGVuZ3RoID09IDApIHtcclxuXHRcdC8vY29uc29sZS5lcnJvcihcItCd0LXQvtCx0YXQvtC00LjQvNC+INC/0LXRgNC10LTQsNGC0Ywg0L7QsdGK0LXQutGCLCDRgSDQutC+0YLQvtGA0YvQvCDQstGLINGF0L7RgtC40YLQtSDQstC30LDQuNC80L7QtNC10LnRgdGC0LLQvtCy0LDRgtGMXCIpO1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHRcclxuXHRpZihzY3JvbGxWYWx1ZSA9PSAndGhpcycpIHtcclxuXHRcdHNjcm9sbFZhbHVlID0gZWwub2Zmc2V0KCkudG9wIC0gJCh3aW5kb3cpLm91dGVySGVpZ2h0KCkgLyAyO1xyXG5cdH1cclxuXHRcclxuXHQkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKGUpe1xyXG5cdFx0aWYoJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gc2Nyb2xsVmFsdWUpe1xyXG5cdFx0XHRlbC5hZGRDbGFzcyh0b2dnbGVkQ2xhc3MpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZWwucmVtb3ZlQ2xhc3ModG9nZ2xlZENsYXNzKTtcclxuXHRcdH1cclxuXHR9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC+0LHRi9GC0LjQuSDQtNC70Y8g0L/QtdGA0LXQutC70Y7Rh9Cw0YLQtdC70LXQuSDQutC70LDRgdGB0L7QslxyXG4gKiBAZXhhbXBsZVxyXG4gKiBIZWxwZXJzLmluaXQoKTtcclxuICovXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuICBcclxuICB0b2dnbGVFbGVtZW50Q2xhc3NPblNjcm9sbCgkKCcuaGVhZGVyJyksIDUwKTtcclxuICBcclxuICAkKCcuanMtaGlkZS1ibG9jaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgYmxvY2sgPSAkKHRoaXMpLmRhdGEoJ3RhcmdldCcpID09PSAnc2VsZicgPyAkKHRoaXMpLnBhcmVudCgpIDogJCh0aGlzKS5kYXRhKCd0YXJnZXQnKTtcclxuICAgIGJsb2NrLmZhZGVPdXQoNTAwKTtcclxuICB9KTtcclxuICBcclxuICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgIHRpbWVyID0gbmV3IERhdGUoKTtcclxuICAgIGlmICh0aW1lb3V0ID09PSBmYWxzZSkge1xyXG4gICAgICB0aW1lb3V0ID0gdHJ1ZTtcclxuICAgICAgc2V0VGltZW91dChyZXNpemVFbmQsIGRlbHRhKTtcclxuICAgIH1cclxuICB9KTtcclxuICBcclxuICAkKCcuYnRuLW1lbnUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgJCh0aGlzKS50b2dnbGVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgJCgnLmhlYWRlcicpLnRvZ2dsZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAkKCcubWFpbi1uYXYnKS5zbGlkZVRvZ2dsZSg1MDApO1xyXG4gICAgaWYgKE1haW4uRGV2aWNlRGV0ZWN0aW9uLmlzTW9iaWxlVmVyc2lvbigpKSB7XHJcbiAgICAgIGlmICgkKCcuaGVhZGVyJykuaGFzQ2xhc3MoJ2lzLW9wZW4nKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmNzcygnb3ZlcmZsb3cteScsICdoaWRkZW4nKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkKCdodG1sLCBib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJycpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgXHJcbiAgJCh3aW5kb3cpLnNjcm9sbCgkLmRlYm91bmNlKDI1MCwgdHJ1ZSwgZnVuY3Rpb24oKSB7XHJcbiAgICAkKCdodG1sJykuYWRkQ2xhc3MoJ2lzLXNjcm9sbGluZycpO1xyXG4gIH0pKTtcclxuICAkKHdpbmRvdykuc2Nyb2xsKCQuZGVib3VuY2UoMjUwLCBmdW5jdGlvbigpIHtcclxuICAgICQoJ2h0bWwnKS5yZW1vdmVDbGFzcygnaXMtc2Nyb2xsaW5nJyk7XHJcbiAgfSkpO1xyXG4gIFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0LCB0b2dnbGVDbGFzc0lmLCB0b2dnbGVFbGVtZW50Q2xhc3NPblNjcm9sbH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL2hlbHBlcnMuanMiLCIvKipcclxuICog0JzQvtC00YPQu9GMINC00LvRjyDRgNCw0LHQvtGC0YsgcGxhY2Vob2xkZXIg0LIg0Y3Qu9C10LzQtdC90YLQsNGFINGE0L7RgNC80YsgKC5maWVsZClcclxuICogQG1vZHVsZSBJbnB1dFxyXG4gKi9cclxuXHJcblxyXG4vKipcclxuICog0KPRgdGC0LDQvdC+0LLQuNGC0Ywg0YTQvtC60YPRgVxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAcGFyYW0ge29iamVjdH0gaW5wdXRcclxuICovXHJcbmZ1bmN0aW9uIGZvY3VzTGFiZWwoaW5wdXQpe1xyXG4gICAgaW5wdXQuY2xvc2VzdCgnLmZpZWxkJykuYWRkQ2xhc3MoXCJoYXMtZm9jdXNcIik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDQo9Cx0YDQsNGC0Ywg0YTQvtC60YPRgVxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAcGFyYW0ge29iamVjdH0gaW5wdXRcclxuICovXHJcbmZ1bmN0aW9uIGJsdXJMYWJlbChpbnB1dCl7XHJcbiAgICB2YXIgd3JhcHBlciA9IGlucHV0LmNsb3Nlc3QoJy5maWVsZCcpO1xyXG4gICAgd3JhcHBlci5yZW1vdmVDbGFzcyhcImhhcy1mb2N1c1wiKTtcclxufVxyXG5cclxuLyoqXHJcbiAqINCf0YDQvtCy0LXRgNC40YLRjCDQuNC90L/Rg9GCINC90LAg0L3QsNC70LjRh9C40LUgdmFsdWVcclxuICogQHByaXZhdGVcclxuICogQHBhcmFtIHtvYmplY3R9IGlucHV0XHJcbiAqL1xyXG5mdW5jdGlvbiBjaGVja0lucHV0KGlucHV0KXtcclxuICAgIHZhciB3cmFwcGVyID0gaW5wdXQuY2xvc2VzdCgnLmZpZWxkJyk7XHJcbiAgICBpZiAoaW5wdXQudmFsKCkubGVuZ3RoID4gMClcclxuICAgICAgICB3cmFwcGVyLmFkZENsYXNzKFwiaGFzLXZhbHVlXCIpO1xyXG4gICAgZWxzZVxyXG4gICAgICAgIHdyYXBwZXIucmVtb3ZlQ2xhc3MoXCJoYXMtdmFsdWVcIik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC+0LHRi9GC0LjQuSDQtNC70Y8g0LjQvdC/0YPRgtCwXHJcbiAqIEBleGFtcGxlXHJcbiAqIElucHV0LmluaXQoKTtcclxuICovXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuICAgIGxldCBpbnB1dHMgPSAkKCcuZmllbGRfX2lucHV0Jyk7XHJcbiAgICBsZXQgcGxhY2Vob2xkZXJzID0gJCgnLmZpZWxkX19wbGFjZWhvbGRlcicpO1xyXG4gICAgXHJcbiAgICBwbGFjZWhvbGRlcnMuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuZmllbGQnKS5maW5kKCcuZmllbGRfX2lucHV0JykuZm9jdXMoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlucHV0cy5lYWNoKGZ1bmN0aW9uKGksIGl0ZW0pIHtcclxuICAgICAgICBjaGVja0lucHV0KCQoaXRlbSkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaW5wdXRzLmZvY3VzKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgZm9jdXNMYWJlbCgkKHRoaXMpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlucHV0cy5ibHVyKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgYmx1ckxhYmVsKCQodGhpcykpO1xyXG4gICAgICAgIGNoZWNrSW5wdXQoJCh0aGlzKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL2lucHV0LmpzIiwiLyoqXHJcbiAqINCc0L7QtNGD0LvRjCDQtNC70Y8g0YDQsNCx0L7RgtGLINCk0L7RgNC8XHJcbiAqIEBtb2R1bGUgRm9ybVxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlRmllbGQoZmllbGQpIHtcclxuICBsZXQgaXNWYWxpZCA9IGZpZWxkLnZhbGlkaXR5LnZhbGlkO1xyXG4gIGxldCBmaWVsZENvbnRhaW5lciA9ICQoZmllbGQpLmNsb3Nlc3QoJy5maWVsZCcpO1xyXG4gIGlmIChpc1ZhbGlkKSB7XHJcbiAgICBmaWVsZENvbnRhaW5lci5yZW1vdmVDbGFzcygnaGFzLWVycm9yJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGZpZWxkQ29udGFpbmVyLmFkZENsYXNzKCdoYXMtZXJyb3InKTtcclxuICB9XHJcbiAgcmV0dXJuIGlzVmFsaWQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlRm9ybShlbEZvcm0pIHtcclxuICBsZXQgZXJyb3JzID0gMDtcclxuICBBcnJheS5mcm9tKGVsRm9ybS5lbGVtZW50cykuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XHJcbiAgICBsZXQgaXNWYWxpZEZpZWxkID0gdmFsaWRhdGVGaWVsZChpdGVtKTtcclxuICAgIGlmKCFpc1ZhbGlkRmllbGQpIHtcclxuICAgICAgZXJyb3JzICs9IDE7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgcmV0dXJuIGVycm9ycztcclxufVxyXG5cclxuLyoqXHJcbiAqINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5INGE0L7RgNC8XHJcbiAqIEBleGFtcGxlXHJcbiAqIEZvcm0uaW5pdCgpO1xyXG4gKi9cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gIGxldCBqc0Zvcm0gPSAkKCcuanMtZm9ybScpO1xyXG4gIFxyXG4gICQoJ2lucHV0LCB0ZXh0YXJlYScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG4gICAgdmFsaWRhdGVGaWVsZCh0aGlzKTtcclxuICB9KTtcclxuICBcclxuICBqc0Zvcm0uZWFjaChmdW5jdGlvbigpe1xyXG4gICAgbGV0IHNlbGYgPSAkKHRoaXMpO1xyXG4gICAgbGV0IHNlbGZGb3JtID0gc2VsZi5maW5kKCcuanMtZm9ybS1mb3JtJyk7XHJcbiAgICBsZXQgc2VsZlJlc3VsdCA9IHNlbGYuZmluZCgnLmpzLWZvcm0tcmVzdWx0Jyk7XHJcbiAgICBsZXQgc2VsZlN1Ym1pdCA9IHNlbGYuZmluZCgnLmpzLWZvcm0tc3VibWl0Jyk7XHJcbiAgICBcclxuICAgIHNlbGZTdWJtaXQub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGxldCBoYXNFcnJvciA9IHZhbGlkYXRlRm9ybShzZWxmRm9ybVswXSk7XHJcbiAgICAgIGlmICghaGFzRXJyb3IpIHtcclxuICAgICAgICBsZXQgcmVxdWVzdCA9ICQuYWpheCh7XHJcbiAgICAgICAgICB1cmw6ICdodHRwOi8vbG9jY2l0YW5lLmhzbXAucnUvYXBpL2VtYWlscy8nLFxyXG4gICAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgJ25hbWUnOiAkKHNlbGZGb3JtKS5maW5kKCdpbnB1dFtuYW1lPVwibmFtZVwiXScpLnZhbCgpLFxyXG4gICAgICAgICAgICAnZW1haWwnOiAkKHNlbGZGb3JtKS5maW5kKCdpbnB1dFtuYW1lPVwiZW1haWxcIl0nKS52YWwoKSxcclxuICAgICAgICAgICAgJ21lc3NhZ2UnOiAkKHNlbGZGb3JtKS5maW5kKCd0ZXh0YXJlYVtuYW1lPVwibWVzc2FnZVwiXScpLnZhbCgpLFxyXG4gICAgICAgICAgICAncGFnZSc6IHdpbmRvdy5sb2NhdGlvbi5ocmVmXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzZWxmU3VibWl0LmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmVxdWVzdC5kb25lKGZ1bmN0aW9uIChyZXNwb25zZSwgdGV4dFN0YXR1cywganFYSFIpIHtcclxuICAgICAgICAgIHNlbGYuYWRkQ2xhc3MoJ2lzLXN1Ym1pdHRlZCcpO1xyXG4gICAgICAgICAgc2VsZi50cmlnZ2VyKCdzdWJtaXR0ZWQnKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc2VsZlJlc3VsdC5zaG93KCk7XHJcbiAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL2Zvcm0uanMiLCIvKipcclxuICog0JLRgdC/0LvRi9Cy0LDRjtGJ0LjQtSDQvtC60L3QsFxyXG4gKiBAbW9kdWxlIE1vZGFsXHJcbiAqL1xyXG5cclxubGV0IGxheW91dCA9ICQoJy5sYXlvdXQnKTtcclxubGV0IHdyYXBwZXIgPSAkKCcubW9kYWxfX3dyYXBwZXInKTtcclxuIFxyXG5mdW5jdGlvbiBvcGVuTW9kYWwodGFyZ2V0KSB7XHJcbiAgbGV0IG1vZGFsID0gJCh0YXJnZXQpO1xyXG4gIGlmICghbGF5b3V0Lmhhc0NsYXNzKCdtb2RhbC1vcGVuJykpIHtcclxuICAgIGxheW91dC5hZGRDbGFzcygnbW9kYWwtb3BlbicpO1xyXG4gICAgJCgnaHRtbCwgYm9keScpLmNzcygnb3ZlcmZsb3cteScsICdoaWRkZW4nKTtcclxuICAgIHdyYXBwZXIuZmFkZUluKDMwMCkuYWRkQ2xhc3MoJ21vZGFsLW9wZW4nKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY2xvc2VQcmV2TW9kYWxzKHRhcmdldCk7XHJcbiAgfVxyXG4gIG1vZGFsLmZhZGVJbigzMDApLmFkZENsYXNzKCdpcy1vcGVuJyk7XHJcbiAgbW9kYWwudHJpZ2dlcignb3BlbmVkJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsb3NlTW9kYWwodGFyZ2V0KSB7XHJcbiAgbGV0IG1vZGFsID0gJCh0YXJnZXQpO1xyXG4gIG1vZGFsLmZhZGVPdXQoMzAwKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xyXG4gIHdyYXBwZXIuZmFkZU91dCgzMDApLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgbGF5b3V0LnJlbW92ZUNsYXNzKCdtb2RhbC1vcGVuJyk7XHJcbiAgJCgnaHRtbCwgYm9keScpLmNzcygnb3ZlcmZsb3cteScsICcnKTtcclxuICBtb2RhbC50cmlnZ2VyKCdjbG9zZWQnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xvc2VQcmV2TW9kYWxzKHRhcmdldCkge1xyXG4gIGxldCBtb2RhbCA9ICQodGFyZ2V0KTtcclxuICBtb2RhbC5zaWJsaW5ncygnLm1vZGFsLmlzLW9wZW4nKS5mYWRlT3V0KDMwMCkucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKS50cmlnZ2VyKCdjbG9zZWQnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINGB0L7QsdGL0YLQuNC5INC00LvRjyDQstGB0L/Qu9GL0LLQsNGO0YnQuNGFINC+0LrQvtC9XHJcbiAqIEBleGFtcGxlXHJcbiAqIE1vZGFsLmluaXQoKTtcclxuICovXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuICAgIFxyXG4gICQoJy5qcy1tb2RhbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGxldCB0YXJnZXQgPSAkKHRoaXMpLmRhdGEoJ3RhcmdldCcpO1xyXG4gICAgICBpZiAoISQodGFyZ2V0KS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAgICAgb3Blbk1vZGFsKHRhcmdldCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2xvc2VNb2RhbCh0YXJnZXQpO1xyXG4gICAgICB9XHJcbiAgfSk7XHJcbiAgXHJcbiAgJCgnLmJ0bi1jbG9zZS1tb2RhbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBsZXQgbW9kYWwgPSAkKHRoaXMpLmNsb3Nlc3QoJy5tb2RhbCcpO1xyXG4gICAgY2xvc2VNb2RhbChtb2RhbCk7XHJcbiAgfSk7XHJcbiAgXHJcbiAgJCgnLm1vZGFsX193cmFwcGVyJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgY2xvc2VNb2RhbCgnLm1vZGFsJyk7XHJcbiAgfSk7XHJcbiAgJCgnLm1vZGFsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICB9KTtcclxuICBcclxuICAkKCcubW9kYWwtLXZpZGVvJykub24oJ29wZW5lZCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAkKHRoaXMpLmZpbmQoJy5qcy1tb2RhbC12aWRlbycpWzBdLnBsYXkoKTtcclxuICB9KTtcclxuXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXQsIG9wZW5Nb2RhbCwgY2xvc2VNb2RhbH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL21vZGFsLmpzIiwiLyoqXHJcbiAqIEFjY29yZGlvblxyXG4gKiBAbW9kdWxlIEFjY29yZGlvblxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIG9wZW5BY2NvcmRpb24oYWNjb3JkaW9uKSB7XHJcbiAgbGV0IGFjY29yZGlvbkNvbnRlbnQgPSBhY2NvcmRpb24uZmluZCgnLmFjY29yZGlvbl9fYm9keScpLmVxKDApO1xyXG4gIGFjY29yZGlvbi5hZGRDbGFzcygnaXMtb3BlbicpO1xyXG4gIGFjY29yZGlvbkNvbnRlbnQuc2xpZGVEb3duKDUwMCk7XHJcbiAgYWNjb3JkaW9uLnRyaWdnZXIoJ29wZW5lZCcpO1xyXG59XHJcbmZ1bmN0aW9uIGNsb3NlQWNjb3JkaW9uKGFjY29yZGlvbikge1xyXG4gIGxldCBhY2NvcmRpb25Db250ZW50ID0gYWNjb3JkaW9uLmZpbmQoJy5hY2NvcmRpb25fX2JvZHknKS5lcSgwKTtcclxuICBcclxuICBhY2NvcmRpb24ucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICBhY2NvcmRpb25Db250ZW50LnNsaWRlVXAoNTAwKTtcclxuICBhY2NvcmRpb24udHJpZ2dlcignY2xvc2VkJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgLy8gaW5pdGlhbFxyXG4gICQoJy5hY2NvcmRpb24uaXMtb3BlbicpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIG9wZW5BY2NvcmRpb24oJCh0aGlzKSk7XHJcbiAgfSk7XHJcbiAgXHJcbiAgLy8gYWN0aW9uXHJcbiAgJCgnLmFjY29yZGlvbicpLm9uKCdjbGljaycsICcuYWNjb3JkaW9uX19oZWFkZXInLCBmdW5jdGlvbigpIHtcclxuICAgIGxldCBhY2NvcmRpb24gPSAkKHRoaXMpLmNsb3Nlc3QoJy5hY2NvcmRpb24nKTtcclxuICAgIGlmKGFjY29yZGlvbi5oYXNDbGFzcygnaXMtb3BlbicpKSB7XHJcbiAgICAgIGNsb3NlQWNjb3JkaW9uKGFjY29yZGlvbik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBvcGVuQWNjb3JkaW9uKGFjY29yZGlvbik7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0geyBpbml0IH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9jb21wb25lbnRzL2FjY29yZGlvbi5qcyIsIi8qKlxyXG4gKiBUYWJzXHJcbiAqIEBtb2R1bGUgVGFic1xyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIG9wZW5UYWIodGFiKSB7XHJcbiAgdGFiLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcclxuICBsZXQgdGFyZ2V0ID0gJCh0YWIuZGF0YSgndGFyZ2V0JykpO1xyXG4gIHRhcmdldC50b2dnbGVDbGFzcygnaXMtYWN0aXZlJykuc2xpZGVEb3duKDUwMCk7XHJcbiAgdGFyZ2V0LnRyaWdnZXIoJ29wZW5lZCcpO1xyXG59XHJcbmZ1bmN0aW9uIGNsb3NlVGFiKHRhYikge1xyXG4gIGxldCB0YXJnZXQgPSAkKHRhYi5kYXRhKCd0YXJnZXQnKSk7XHJcbiAgdGFiLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcclxuICB0YXJnZXQucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpLnNsaWRlVXAoNTAwKTtcclxuICB0YXJnZXQudHJpZ2dlcignY2xvc2VkJyk7XHJcbn1cclxuIFxyXG5mdW5jdGlvbiBpbml0KCkge1xyXG4gIC8vIGluaXRpYWxcclxuICAkKCcudGFicycpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIGxldCBpbml0aWFsQWN0aXZlO1xyXG4gICAgaWYoJCh0aGlzKS5maW5kKCcudGFiLmlzLWFjdGl2ZScpLmxlbmd0aCkge1xyXG4gICAgICBpbml0aWFsQWN0aXZlID0gJCh0aGlzKS5maW5kKCcudGFiLmlzLWFjdGl2ZScpLmVxKDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaW5pdGlhbEFjdGl2ZSA9ICQodGhpcykuZmluZCgnLnRhYicpLmVxKDApO1xyXG4gICAgfVxyXG4gICAgb3BlblRhYihpbml0aWFsQWN0aXZlKTtcclxuICB9KTtcclxuICBcclxuICBcclxuICAvLyBhY3Rpb25cclxuICAkKCcudGFiJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnaXMtYWN0aXZlJykpIHtcclxuICAgICAgY2xvc2VUYWIoJCh0aGlzKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkKHRoaXMpLnNpYmxpbmdzKCcuaXMtYWN0aXZlJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgIGNsb3NlVGFiKCQodGhpcykpO1xyXG4gICAgICB9KTtcclxuICAgICAgb3BlblRhYigkKHRoaXMpKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7IGluaXQgfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvdGFicy5qcyIsIi8qKlxyXG4gKiBNYWluTWVudVxyXG4gKiBAbW9kdWxlIE1haW5NZW51XHJcbiAqL1xyXG5cclxubGV0IG1haW5NZW51ID0ge1xyXG4gIGVsOiAkKCcubWFpbi1uYXYnKSxcclxuICBidG46ICQoJy5tYWluLW5hdi1idG4nKSxcclxuICBzdGF0ZTogZmFsc2VcclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tNZW51IChtZW51LCBtZW51U3RhdGUpIHtcclxuICBtZW51LnN0YXRlID0gbWVudVN0YXRlO1xyXG4gIGlmIChtZW51U3RhdGUpIHtcclxuICAgIG9wZW5NZW51KG1lbnUpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjbG9zZU1lbnUobWVudSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBvcGVuTWVudSAobWVudSkge1xyXG4gIG1lbnUuc3RhdGUgPSB0cnVlO1xyXG4gICQoJ2h0bWwsIGJvZHknKS5jc3MoJ292ZXJmbG93LXknLCAnaGlkZGVuJyk7XHJcbiAgbWVudS5idG4uYWRkQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICBtZW51LmVsLmZhZGVJbig1MDApO1xyXG4gIG1lbnUuZWwudHJpZ2dlcignb3BlbmVkJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsb3NlTWVudSAobWVudSkge1xyXG4gIG1lbnUuc3RhdGUgPSBmYWxzZTtcclxuICAkKCdodG1sLCBib2R5JykuY3NzKCdvdmVyZmxvdy15JywgJycpO1xyXG4gIG1lbnUuYnRuLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgbWVudS5lbC5mYWRlT3V0KDMwMCk7XHJcbiAgbWVudS5lbC50cmlnZ2VyKCdjbG9zZWQnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINC80LXQvdGOXHJcbiAqIEBleGFtcGxlXHJcbiAqIE1haW5NZW51LmluaXQoKTtcclxuICovXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuICBcclxuICBsZXQgaXNTbWFsbCA9IE1haW4uRGV2aWNlRGV0ZWN0aW9uLmlzTW9iaWxlKCkgfHwgTWFpbi5EZXZpY2VEZXRlY3Rpb24uaXNUYWJsZXQoKTtcclxuICBcclxuICAvLyBzZXQgaW5pdGlhbCBzdGF0ZVxyXG4gIGlmIChpc1NtYWxsKSB7XHJcbiAgICBjaGVja01lbnUobWFpbk1lbnUsICFpc1NtYWxsKTtcclxuICB9XHJcbiAgXHJcbiAgLy8gc2V0IHN0YXRlIGFmdGVyIHJlc2l6ZVxyXG4gICQod2luZG93KS5vbigncmVzaXplZW5kJywgZnVuY3Rpb24gKCkge1xyXG4gICAgaXNTbWFsbCA9IE1haW4uRGV2aWNlRGV0ZWN0aW9uLmlzTW9iaWxlKCkgfHwgTWFpbi5EZXZpY2VEZXRlY3Rpb24uaXNUYWJsZXQoKTtcclxuICAgIGNoZWNrTWVudShtYWluTWVudSwgIWlzU21hbGwpO1xyXG4gIH0pO1xyXG4gIFxyXG4gIC8vIHRvZ2dsZSBzdGF0ZSBieSBidG5cclxuICBtYWluTWVudS5idG4ub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBjaGVja01lbnUobWFpbk1lbnUsICFtYWluTWVudS5zdGF0ZSk7XHJcbiAgfSk7XHJcbiAgXHJcbiAgLy8gY2xvc2UgYnkgY2xpY2sgb3V0c2lkZVxyXG4gICQoJy5sYXlvdXQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgaXNTbWFsbCA9IE1haW4uRGV2aWNlRGV0ZWN0aW9uLmlzTW9iaWxlKCkgfHwgTWFpbi5EZXZpY2VEZXRlY3Rpb24uaXNUYWJsZXQoKTtcclxuICAgIGlmIChpc1NtYWxsKSB7XHJcbiAgICAgIGlmICghbWFpbk1lbnUuZWwuZmluZChlLnRhcmdldCkubGVuZ3RoKSB7XHJcbiAgICAgICAgY2xvc2VNZW51KG1haW5NZW51KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG4gIFxyXG4gIC8vIHN0b3AgYnViYmxpbmcgY2xpY2sgaW5zaWRlXHJcbiAgbWFpbk1lbnUuZWwub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgfSlcclxuICBcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdCwgY2hlY2tNZW51fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvbWFpbi1tZW51LmpzIiwiLyoqXHJcbiAqINCS0LjQtNC10L5cclxuICogQG1vZHVsZSBWaWRlb1xyXG4gKi9cclxuXHJcblxyXG4vKipcclxuICog0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0YHQvtCx0YvRgtC40Lkg0LTQu9GPINCy0YHQv9C70YvQstCw0Y7RidC40YUg0L7QutC+0L1cclxuICogQGV4YW1wbGVcclxuICogTW9kYWwuaW5pdCgpO1xyXG4gKi9cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gIFxyXG4gICQoJy5tb2RhbC0tdmlkZW8nKS5vbignb3BlbmVkJywgZnVuY3Rpb24oKXtcclxuICAgICQodGhpcykuZmluZCgnLmpzLW1vZGFsLXZpZGVvJylbMF0ucGxheSgpO1xyXG4gIH0pO1xyXG4gICQoJy5tb2RhbC0tdmlkZW8nKS5vbignY2xvc2VkJywgZnVuY3Rpb24oKXtcclxuICAgICQodGhpcykuZmluZCgnLmpzLW1vZGFsLXZpZGVvJylbMF0ucGF1c2UoKTtcclxuICB9KTtcclxuICBcclxuICAkKCd2aWRlbycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgc2VsZiA9ICQodGhpcylbMF07XHJcbiAgICBpZiAoc2VsZi5wYXVzZWQpIHtcclxuICAgICAgc2VsZi5wbGF5KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZWxmLnBhdXNlKCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtpbml0fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2NvbXBvbmVudHMvdmlkZW8uanMiLCIvKipcclxuICog0J/QtdGA0LXQutC70Y7Rh9C10L3QuNC1INC60LvQsNGB0YHQvtCyINC/0L4g0YDQsNC30LvQuNGH0L3Ri9C8INGB0L7QsdGL0YLQuNGP0LxcclxuICogQG1vZHVsZSBBbmltYXRpb25cclxuICovXHJcblxyXG5sZXQgc2Nyb2xsQW5pbWF0aW9uQmxvY2tzID0gJCgnLmEtc2Nyb2xsLWJveCcpO1xyXG5sZXQgcGFyYWxsYXhCbG9ja3MgPSAkKCcuYS1wYXJhbGxheC1ib3gnKTtcclxuIFxyXG5mdW5jdGlvbiBhZGRDbGFzc1RvZ2dsZXJTY2VuZSAoZWwsIGNvbnRyb2xsZXIpIHtcclxuICBuZXcgU2Nyb2xsTWFnaWMuU2NlbmUoe1xyXG4gICAgdHJpZ2dlckVsZW1lbnQ6IGVsLFxyXG4gICAgdHJpZ2dlckhvb2s6IDAuMlxyXG4gIH0pXHJcbiAgLnNldENsYXNzVG9nZ2xlKGVsLCAnYW5pbWF0ZScpXHJcbiAgLmFkZFRvKGNvbnRyb2xsZXIpXHJcbiAgLm9uKCdlbnRlcicsIGZ1bmN0aW9uKCl7XHJcbiAgICAkKCcuYS1pbmRpY2F0b3InKS5yZW1vdmVDbGFzcygnYWN0aXZlJykuZXEoJChlbCkuaW5kZXgoKSkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gIH0pXHJcbiAgLm9uKCdsZWF2ZScsIGZ1bmN0aW9uKCl7XHJcbiAgICAkKCcuYS1pbmRpY2F0b3InKS5yZW1vdmVDbGFzcygnYWN0aXZlJykuZXEoJChlbCkuaW5kZXgoKSAtIDEpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkQ2xhc3NUb2dnbGVyQ29udHJvbGxlciAoYW5pbWF0aW9uQmxvY2tzKSB7XHJcbiAgbGV0IGNvbnRyb2xsZXIgPSBuZXcgU2Nyb2xsTWFnaWMuQ29udHJvbGxlcigpO1xyXG4gIGFuaW1hdGlvbkJsb2Nrcy5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIGxldCBhRGVsYXkgPSAzMDA7XHJcbiAgICAgIGlmKHRoaXMub2Zmc2V0VG9wIDwgd2luZG93LmlubmVySGVpZ2h0KSB7XHJcbiAgICAgICAgYURlbGF5ID0gMTMwMDtcclxuICAgICAgfVxyXG4gICAgICBzZXRUaW1lb3V0KGFkZENsYXNzVG9nZ2xlclNjZW5lLCBhRGVsYXksIHRoaXMsIGNvbnRyb2xsZXIpO1xyXG4gICAgLy99XHJcbiAgfSk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBnZXRGcm9tUG9zaXRpb24gKGVsLCBkZWZhdWx0UG9zaXRpb24gPSBbMCwgMF0pe1xyXG4gIHJldHVybiAoZWwuYXR0cignZGF0YS1wYXJhbGxheC1mcm9tJykgIT09IHVuZGVmaW5lZCkgPyAoZWwuYXR0cignZGF0YS1wYXJhbGxheC1mcm9tJykpLnNwbGl0KCcsICcpIDogZGVmYXVsdFBvc2l0aW9uO1xyXG59XHJcbmZ1bmN0aW9uIGdldFRvUG9zaXRpb24gKGVsLCBkZWZhdWx0UG9zaXRpb24gPSBbMCwgMF0pe1xyXG4gIHJldHVybiAoZWwuYXR0cignZGF0YS1wYXJhbGxheC10bycpICE9PSB1bmRlZmluZWQpID8gKGVsLmF0dHIoJ2RhdGEtcGFyYWxsYXgtdG8nKSkuc3BsaXQoJywgJykgOiBkZWZhdWx0UG9zaXRpb247XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFBhcmFsbGF4VGltZWxpbmUgKGVsKSB7XHJcbiAgbGV0IHR3ZWVuID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcbiAgbGV0IHR3ZWVuc0FyciA9IFtdO1xyXG4gIGlmICgkKGVsKS5maW5kKCcuYS1wYXJhbGxheC1sZWZ0JykpIHtcclxuICAgIGxldCB0YXJnZXRFbCA9ICQoZWwpLmZpbmQoJy5hLXBhcmFsbGF4LWxlZnQnKTtcclxuICAgIGxldCBmcm9tUG9zID0gZ2V0RnJvbVBvc2l0aW9uKHRhcmdldEVsLCBbLTMwLCAzMF0pO1xyXG4gICAgbGV0IHRvUG9zID0gZ2V0VG9Qb3NpdGlvbih0YXJnZXRFbCk7XHJcbiAgICB0d2VlbnNBcnIucHVzaChUd2Vlbk1heC5mcm9tVG8odGFyZ2V0RWwsIDEsIHt4UGVyY2VudDogZnJvbVBvc1swXSwgeVBlcmNlbnQ6IGZyb21Qb3NbMV19LCB7eFBlcmNlbnQ6IHRvUG9zWzBdLCB5UGVyY2VudDogdG9Qb3NbMV0sIGVhc2U6IExpbmVhci5lYXNlTm9uZX0pKTtcclxuICB9XHJcbiAgaWYgKCQoZWwpLmZpbmQoJy5hLXBhcmFsbGF4LXJpZ2h0JykpIHtcclxuICAgIGxldCB0YXJnZXRFbCA9ICQoZWwpLmZpbmQoJy5hLXBhcmFsbGF4LXJpZ2h0Jyk7XHJcbiAgICBsZXQgZnJvbVBvcyA9IGdldEZyb21Qb3NpdGlvbih0YXJnZXRFbCwgWzMwLCAzMF0pO1xyXG4gICAgbGV0IHRvUG9zID0gZ2V0VG9Qb3NpdGlvbih0YXJnZXRFbCk7XHJcbiAgICB0d2VlbnNBcnIucHVzaChUd2Vlbk1heC5mcm9tVG8odGFyZ2V0RWwsIDEsIHt4UGVyY2VudDogZnJvbVBvc1swXSwgeVBlcmNlbnQ6IGZyb21Qb3NbMV19LCB7eFBlcmNlbnQ6IHRvUG9zWzBdLCB5UGVyY2VudDogdG9Qb3NbMV0sIGVhc2U6IExpbmVhci5lYXNlTm9uZX0pKTtcclxuICB9XHJcbiAgdHdlZW4uYWRkKHR3ZWVuc0Fycik7XHJcbiAgcmV0dXJuIHR3ZWVuO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRQYXJhbGxheFNjZW5lIChlbCwgdHdlZW4sIGNvbnRyb2xsZXIpIHtcclxuICBuZXcgU2Nyb2xsTWFnaWMuU2NlbmUoe1xyXG4gICAgdHJpZ2dlckVsZW1lbnQ6IGVsLFxyXG4gICAgdHJpZ2dlckhvb2s6IDAuMixcclxuICAgIGR1cmF0aW9uOiAkKGVsKS5oZWlnaHQoKVxyXG4gIH0pXHJcbiAgLnNldFR3ZWVuKHR3ZWVuKVxyXG4gIC5hZGRUbyhjb250cm9sbGVyKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkUGFyYWxsYXhDb250cm9sbGVyIChhbmltYXRpb25CbG9ja3MpIHtcclxuICBsZXQgY29udHJvbGxlciA9IG5ldyBTY3JvbGxNYWdpYy5Db250cm9sbGVyKCk7XHJcbiAgYW5pbWF0aW9uQmxvY2tzLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIGxldCB0d2VlbiA9IGdldFBhcmFsbGF4VGltZWxpbmUodGhpcyk7XHJcbiAgICBhZGRQYXJhbGxheFNjZW5lKHRoaXMsIHR3ZWVuLCBjb250cm9sbGVyKTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdCAoKSB7XHJcbiAgaWYgKHNjcm9sbEFuaW1hdGlvbkJsb2Nrcy5sZW5ndGggPiAwKXtcclxuICAgIC8vJCgnaHRtbCcpLmFkZENsYXNzKCdpcy1hbmltYXRpbmcnKTtcclxuICAgIGFkZENsYXNzVG9nZ2xlckNvbnRyb2xsZXIoc2Nyb2xsQW5pbWF0aW9uQmxvY2tzKTtcclxuICB9XHJcbiAgXHJcbiAgaWYgKCFNYWluLkRldmljZURldGVjdGlvbi5pc1RvdWNoKCkpe1xyXG4gICAgJCgnLmpzLWhvdmVyJykub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpe1xyXG4gICAgICBsZXQgc2VsZiA9ICQodGhpcyk7XHJcbiAgICAgIHNlbGYuYWRkQ2xhc3MoJ2EtZW50ZXInKTtcclxuICAgIH0pO1xyXG4gICAgJCgnLmpzLWhvdmVyJykub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpe1xyXG4gICAgICBsZXQgc2VsZiA9ICQodGhpcyk7XHJcbiAgICAgIHNlbGYucmVtb3ZlQ2xhc3MoJ2EtZW50ZXInKS5hZGRDbGFzcygnYS1sZWF2ZScpO1xyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgc2VsZi5yZW1vdmVDbGFzcygnYS1sZWF2ZScpO1xyXG4gICAgICB9LCAzMDAsIHNlbGYpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIFxyXG4gIGlmIChwYXJhbGxheEJsb2Nrcy5sZW5ndGggPiAwICYmICQod2luZG93KS53aWR0aCgpID4gMTAyNCl7XHJcbiAgICAkKCdodG1sJykuYWRkQ2xhc3MoJ2lzLWFuaW1hdGluZycpO1xyXG4gICAgYWRkUGFyYWxsYXhDb250cm9sbGVyKHBhcmFsbGF4QmxvY2tzKTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9hbmltYXRpb24uanMiLCJmdW5jdGlvbiBnZXRJY29uKGVsKSB7XHJcbiAgbGV0IGljb24gPSAnJztcclxuICBpZiAoZWwuaGFzQ2xhc3MoJ3lhLXNoYXJlMl9faXRlbV9zZXJ2aWNlX3Zrb250YWt0ZScpKSB7XHJcbiAgICBpY29uID0gJ3ZrJztcclxuICB9XHJcbiAgaWYgKGVsLmhhc0NsYXNzKCd5YS1zaGFyZTJfX2l0ZW1fc2VydmljZV9mYWNlYm9vaycpKSB7XHJcbiAgICBpY29uID0gJ2ZiJztcclxuICB9XHJcbiAgaWYgKGVsLmhhc0NsYXNzKCd5YS1zaGFyZTJfX2l0ZW1fc2VydmljZV90d2l0dGVyJykpIHtcclxuICAgIGljb24gPSAndHcnO1xyXG4gIH1cclxuICByZXR1cm4gJzxzdmcgY2xhc3M9XCJpY29uIHNvY2lhbC1pY29uXCI+PHVzZSB4bGluazpocmVmPVwiIycgKyBpY29uICsgJ1wiLz48L3N2Zz4nO1xyXG59XHJcbmZ1bmN0aW9uIGZpbGxJY29ucygpIHtcclxuICAkKCcjc2hhcmUgLnlhLXNoYXJlMl9faXRlbScpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICQodGhpcykuZmluZCgnLnlhLXNoYXJlMl9faWNvbicpLmh0bWwoZ2V0SWNvbigkKHRoaXMpKSk7XHJcbiAgfSk7XHJcbn1cclxuZnVuY3Rpb24gaW5pdCgpIHtcclxuICBZYS5zaGFyZTIoJ3NoYXJlJywge1xyXG4gICAgY29udGVudDoge1xyXG4gICAgICB1cmw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxyXG4gICAgICB0aXRsZTogJ0FxdWEgS2Vuem8nLFxyXG4gICAgICBkZXNjcmlwdGlvbjogXCJcIixcclxuICAgICAgLy9pbWFnZTogJ2J1aWxkL2ltZy9zaGFyZS5qcGcnXHJcbiAgICAgIGltYWdlOiAnaHR0cDovL25pb3hpbjMwZGF5cy5lbGxlLnJ1L2J1aWxkL2ltZy9zaGFyZS5qcGcnXHJcbiAgICB9LFxyXG4gICAgdGhlbWU6IHtcclxuICAgICAgc2VydmljZXM6ICd2a29udGFrdGUsZmFjZWJvb2ssdHdpdHRlcicsXHJcbiAgICAgIGJhcmU6IHRydWUsXHJcbiAgICAgIGxhbmc6ICdydSdcclxuICAgIH0sXHJcbiAgICBob29rczoge1xyXG4gICAgICBvbnJlYWR5OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBmaWxsSWNvbnMoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0ge2luaXR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvanMvY29tcG9uZW50cy9zaGFyZS5qcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVkE7Ozs7Ozs7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUMzQkE7Ozs7O0FBS0E7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFPQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7Ozs7Ozs7O0FDM0tBOzs7OztBQU1BOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDaEVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBWkE7QUFjQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQzFFQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RFQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDbkNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQzNDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOzs7Ozs7Ozs7QUM5RUE7Ozs7O0FBTUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7Ozs7Ozs7OztBQzlCQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBT0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN6R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFiQTtBQW1CQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=