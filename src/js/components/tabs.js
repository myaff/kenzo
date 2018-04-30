/**
 * Tabs
 * @module Tabs
 */

function openTab(tab) {
  tab.addClass('is-active');
  let target = $(tab.data('target'));
  target.toggleClass('is-active').slideDown(500);
  target.trigger('opened');
}
function closeTab(tab) {
  let target = $(tab.data('target'));
  tab.removeClass('is-active');
  target.removeClass('is-active').slideUp(500);
  target.trigger('closed');
}
 
function init() {
  // initial
  $('.tabs').each(function(){
    let initialActive;
    if($(this).find('.tab.is-active').length) {
      initialActive = $(this).find('.tab.is-active').eq(0);
    } else {
      initialActive = $(this).find('.tab').eq(0);
    }
    openTab(initialActive);
  });
  
  
  // action
  $('.tab').on('click', function() {
    if ($(this).hasClass('is-active')) {
      closeTab($(this));
    } else {
      $(this).siblings('.is-active').each(function(){
        closeTab($(this));
      });
      openTab($(this));
    }
  });
}

module.exports = { init };