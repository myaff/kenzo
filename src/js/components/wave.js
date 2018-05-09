/**
 * Переключение классов по различным событиям
 * @module Wave
 */

const PIXI = require('pixi.js');
const ShockwaveFilter = require('@pixi/filter-shockwave');

function init() {
  
  $('.js-wave').each(function(){
    let size = {
      x: $(this).width(),
      y: $(this).height()
    };
    let app = new PIXI.Application(size.x, size.y);
    $(this).append(app.view);
    
    let sprite = PIXI.Sprite.fromImage($(this).data('img'));
    
    let waveFilter = new PIXI.filters['ShockwaveFilter']();
    // init wave params
    //waveFilter.params[0] = 10;
    //waveFilter.params[1] = 0.2;
    //waveFilter.params[2] = 0.1;
    //waveFilter.center[0] = 0.4;
    //waveFilter.center[1] = 0.1;
    //waveFilter.resolution = 2;
    //waveFilter.time = -0.1;
    waveFilter.center = 0.3;
    let filters = [waveFilter];
    
    sprite.filters = filters;
    app.stage.addChild(sprite);
    
  });
}

module.exports = { init };