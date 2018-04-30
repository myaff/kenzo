/**
 * Accordion
 * @module Accordion
 */

function openAccordion(accordion) {
  let accordionContent = accordion.find('.accordion__body').eq(0);
  accordion.addClass('is-open');
  accordionContent.slideDown(500);
  accordion.trigger('opened');
}
function closeAccordion(accordion) {
  let accordionContent = accordion.find('.accordion__body').eq(0);
  
  accordion.removeClass('is-open');
  accordionContent.slideUp(500);
  accordion.trigger('closed');
}

function init() {
  // initial
  $('.accordion.is-open').each(function(){
    openAccordion($(this));
  });
  
  // action
  $('.accordion').on('click', '.accordion__header', function() {
    let accordion = $(this).closest('.accordion');
    if(accordion.hasClass('is-open')) {
      closeAccordion(accordion);
    } else {
      openAccordion(accordion);
    }
  });
}

module.exports = { init };