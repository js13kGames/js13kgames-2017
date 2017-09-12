(function() {
    'use strict';

    var bridge = {};

    var background, door = null;
    var roomState = {
    };

    bridge.init = function() {
        background = muri.bg('bridge');
        door = muri.door('bridge', [83, 4]);
    };

    bridge.onEnter = function() {
        door.sprite.playAnimation('close');
    };

    bridge.update = function() {
    };

    bridge.render = function() {
        background.render();
    };

    bridge.name = 'bridge';
    muri.rooms.push(bridge);
}());
