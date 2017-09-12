(function() {
    'use strict';

    var lift = {};

    var buttonSheet, background = null;
    var buttons = [];
    var roomState = {
        position: 1
    };

    var r = function(a) {
        return a[Math.floor(Math.random()*a.length)];       
    };

    var createButtonEntity = function(i, room) {
        var e = muri.get('entity')
            .create('lift.button'+i,
                    kontra.sprite({x: 59, y: i*2+8+i*2,
                                   animations: buttonSheet.animations}))
            .addCallback(function() {
                buttons.forEach(function(b) { b.sprite.playAnimation('off'); });
                muri.get('entity').get('lift.button'+i).sprite.playAnimation('on');
                var goMessage = r([
                    'Sure, ' + room,
                    'Okay, straight to ' + room,
                    'Set ' + room + ' for destination',
                    room + ', okay'
                ]);
                muri.get('bubble')
                    .talk([goMessage])
                    .then(function() {
                        muri.changeRoom(room);
                    });
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

        background = muri.bg('lift');
        buttons = [
            createButtonEntity(0, 'bridge'), // Bridge
            createButtonEntity(1, 'hydro'),  // Hydro Deck
            createButtonEntity(2, 'stasis'), // Stasis
            createButtonEntity(3, 'engine')  // Engine room
        ];
        buttons[1].sprite.playAnimation('on');
    };

    lift.onEnter = function(fromRoom) {
        var welcomeMessage = r([
            'Welcome on board, where do you want?',
            'Please specify your destination.',
            'Insert desired deck on console.',
            'What level please?'
        ]);
        muri.get('bubble').talk([welcomeMessage]);
    };

    lift.update = function() {};

    lift.render = function() {
        background.render();
    };
    
    lift.name = 'lift';
    muri.rooms.push(lift);
}());
