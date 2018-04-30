/**
 * Всплывающие окна
 * @module Modal
 */

let layout = $('.layout');
let wrapper = $('.modal__wrapper');
 
function openModal(target) {
  let modal = $(target);
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
  let modal = $(target);
  modal.fadeOut(300).removeClass('is-open');
  wrapper.fadeOut(300).removeClass('is-open');
  layout.removeClass('modal-open');
  $('html, body').css('overflow-y', '');
  modal.trigger('closed');
}

function closePrevModals(target) {
  let modal = $(target);
  modal.siblings('.modal.is-open').fadeOut(300).removeClass('is-open').trigger('closed');
}

/**
 * инициализация событий для всплывающих окон
 * @example
 * Modal.init();
 */
function init(){
    
  $('.js-modal').on('click', function(e){
      e.preventDefault();
      let target = $(this).data('target');
      if (!$(target).hasClass('is-open')) {
        openModal(target);
      } else {
        closeModal(target);
      }
  });
  
  $('.btn-close-modal').on('click', function (e) {
    e.preventDefault();
    let modal = $(this).closest('.modal');
    closeModal(modal);
  });
  
  $('.modal__wrapper').on('click', function(e) {
    closeModal('.modal');
  });
  $('.modal').on('click', function(e) {
    e.stopPropagation();
  });
  
  $('.modal--video').on('opened', function(){
    $(this).find('.js-modal-video')[0].play();
  });

}

module.exports = {init, openModal, closeModal};