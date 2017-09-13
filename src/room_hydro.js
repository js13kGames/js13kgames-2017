(function() {
    'use strict';

    var hydro = {};
    
    var background, door, keycard = null;

    hydro.init = function() {
        background = muri.bg('hydro');
        door = muri.door('hydro', [38, 9]);
        keycard = muri.get('entity')
            .create('hydro.keycard', kontra.sprite({x: 55, y: 28, image: kontra.assets.images.keycard}))
            .addCallback(function() {
                muri.get('bubble')
                    .talk([
                        'Thats interesting ... ',
                        'The keycard from the captain.',
                        'That can be handy some day.'
                    ]);
                muri.room('lift').roomState.bridgeAccessible = true;
                muri.get('entity').get('hydro.keycard').invisible = true;
            });
    };

    hydro.onEnter = function() {
        door.sprite.playAnimation('close');
    };

    hydro.render = function() {
        background.render();
    };

    hydro.name = 'hydro';
    muri.rooms.push(hydro);
}());
