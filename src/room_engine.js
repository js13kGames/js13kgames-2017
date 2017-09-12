(function() {
    'use strict';

    var engine = {};
    
    var background, door = null;
    var roomState = {
        firstVisit: true,
        engineBroken: true
    };

    var randomSounds = function() {
        var sound = muri.ra(['Brrz ...', 'EeeeKK!', 'Rrrrrm deng', 'Ponk, Ponk, Deng.', 'Uffz', 'Pok, Pok, Pok, ...']);
        var position = [
            30+Math.floor(Math.random()*50),
            12+Math.floor(Math.random()*20)
        ];

        muri.get('bubble')
            .talk([sound], position)
            .then(function() {
                if (roomState.engineBroken &&
                    muri.currentRoom === 'engine')
                    randomSounds();
            });
    };

    engine.init = function() {
        background = muri.bg('engine');
        door = muri.door('engine', [8, 10]);
    };

    engine.onEnter = function() {
        door.sprite.playAnimation('close');
        if (roomState.firstVisit) {
            roomState.firstVisit = false;
            muri.get('bubble')
                .talk([
                    'It smells like molted plastic and burned metal in here.',
                    'Something is broken here for sure.',
                    'I\'m afraid that I need to fix this mess somehow ...'
                ]);
        }

        if (roomState.engineBroken)
            randomSounds();
    };

    engine.update = function() {
    };

    engine.render = function() {
        background.render();
    };

    engine.name = 'engine';
    muri.rooms.push(engine);
}());
