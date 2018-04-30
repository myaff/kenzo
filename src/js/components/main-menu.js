/**
 * MainMenu
 * @module MainMenu
 */

let mainMenu = {
  el: $('.main-nav'),
  btn: $('.main-nav-btn'),
  state: false
}

function checkMenu (menu, menuState) {
  menu.state = menuState;
  if (menuState) {
    openMenu(menu);
  } else {
    closeMenu(menu);
  }
}

function openMenu (menu) {
  menu.state = true;
  $('html, body').css('overflow-y', 'hidden');
  menu.btn.addClass('is-open');
  menu.el.fadeIn(500);
  menu.el.trigger('opened');
}

function closeMenu (menu) {
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
function init(){
  
  let isSmall = Main.DeviceDetection.isMobile() || Main.DeviceDetection.isTablet();
  
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
  })
  
}

module.exports = {init, checkMenu};