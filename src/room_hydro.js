(function() {
    'use strict';

    var hydro = {};
    
    var background, door = null;
    var roomState = {
    };

    hydro.init = function() {
        background = muri.bg('hydro');
        door = muri.door('hydro', [38, 9]);
    };

    hydro.onEnter = function() {
        door.sprite.playAnimation('close');
    };

    hydro.update = function() {
    };

    hydro.render = function() {
        background.render();
    };

    hydro.name = 'hydro';
    muri.rooms.push(hydro);
}());
