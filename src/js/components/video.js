/**
 * Видео
 * @module Video
 */


/**
 * инициализация событий для всплывающих окон
 * @example
 * Modal.init();
 */
function init(){
  
  $('.modal--video').on('opened', function(){
    $(this).find('.js-modal-video')[0].play();
  });
  $('.modal--video').on('closed', function(){
    $(this).find('.js-modal-video')[0].pause();
  });
  
  $('video').on('click', function(){
    let self = $(this)[0];
    if (self.paused) {
      self.play();
    } else {
      self.pause();
    }
  });

}

module.exports = {init};