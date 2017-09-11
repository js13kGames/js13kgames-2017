(function() {
    'use strict';

    var lift = {};

    var buttonSheet, background = null;
    var buttons = [];
    var roomState = {
        position: 1
    };

    var createButtonEntity = function(i, room) {
        var e = muri.get('entity')
            .create('lift.button'+i,
                    kontra.sprite({x: 59, y: i*2+8+i*2,
                                   animations: buttonSheet.animations}))
            .addCallback(function() {
                buttons.forEach(function(b) { b.sprite.playAnimation('off'); });
                muri.get('entity').get('lift.button'+i).sprite.playAnimation('on');
                muri.get('bubble').talk([room], [65, i*4+8]);
                setTimeout(function() { muri.currentRoom = room; }, 1000);
            });
        e.sprite.playAnimation('off');
        return e;
    };

    lift.init = function() {
        buttonSheet = kontra.spriteSheet({
            image: kontra.assets.images.lift_button,
            frameWidth: 2, frameHeight: 2,
            animations: {
                on: {frames: 1},
                off: {frames: 0}
            }
        });

        background = kontra.sprite({
            x: 0, y: 0,
            image: kontra.assets.images.room_lift});
        buttons = [
            createButtonEntity(0, 'engine'), // Engine room
            createButtonEntity(1, 'stasis'), // Stasis
            createButtonEntity(2, 'hydro'),  // Hydro Deck
            createButtonEntity(3, 'bridge')  // Bridge
        ];
        buttons[1].sprite.playAnimation('on');
    };

    lift.update = function() {};

    lift.render = function() {
        background.render();
    };
    
    lift.name = 'lift';
    muri.rooms.push(lift);
}());
