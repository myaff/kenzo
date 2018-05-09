/**
 * Переключение классов по различным событиям
 * @module Wave
 */

let spriteImages 	= $('.js-wave-image');
let spriteImagesFull 	= $('.js-wave-image-full');


function init() {
  
  spriteImages.each(function(){
    let closest = $(this).parent()[0];
    let closestSizeX = closest.offsetWidth;
    let closestSizeY = closest.offsetHeight;
    let spriteSrc = [$(this).attr('src')];
    let initCanvasSlideshow = new CanvasSlideshow({
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
  
  spriteImagesFull.each(function(){
    let closest = $(this).parent()[0];
    let closestSizeX = closest.offsetWidth;
    let closestSizeY = closest.offsetHeight;
    let spriteSrc = [$(this).attr('src')];
    let initCanvasSlideshow = new CanvasSlideshow({
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

module.exports = { init };