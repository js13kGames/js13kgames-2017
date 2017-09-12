(function() {
    'use strict';

    var engine = {};
    
    var background, door = null;
    var roomState = {
    };

    engine.init = function() {
        background = muri.bg('engine');
        door = muri.door('engine', [8, 10]);
    };

    engine.onEnter = function() {
        door.sprite.playAnimation('close');
    };

    engine.update = function() {
    };

    engine.render = function() {
        background.render();
    };

    engine.name = 'engine';
    muri.rooms.push(engine);
}());
