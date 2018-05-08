let spriteImages 	= document.querySelectorAll( '.js-wave-image' );
let spriteImagesSrc = [];

for ( let i = 0; i < spriteImages.length; i++ ) {
    let img = spriteImages[i];
    spriteImagesSrc.push( img.getAttribute('src' ) );
}

let initCanvasSlideshow = new CanvasSlideshow({
    sprites: spriteImagesSrc,
    displacementImage: 'build/img/clouds.jpg',
    autoPlay: true,
    autoPlaySpeed: [10, 3],
    displaceScale: [200, 70]
});