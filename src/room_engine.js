(function() {
    'use strict';

    var engine = {};
    
    var background, door, lasers = null;
    var roomState = {
        firstVisit: true,
        engineBroken: false, //true,
        laserStates: [0, 0, 0]
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

    var laser = function(i) {
        var laserAnimationSheet = kontra.spriteSheet({
            image: kontra.assets.images.laser_sheet,
            frameWidth: 5, frameHeight: 10,
            animations: {
                0: {frames: 0},
                1: {frames: 1},
                2: {frames: 2},
            }
        });
        var laserSprite = kontra.sprite({
            x: 36+i*20, y: 14,
            animations: laserAnimationSheet.animations
        });
        return muri.get('entity')
            .create('engine.laser'+i, laserSprite)
            .addCallback(function() {
                if (!roomState.engineBroken) return;
                var state = roomState.laserStates[i] + 1;
                if (state > 2) state = 0;
                laserSprite.playAnimation(state);
                roomState.laserStates[i] = state;

                if (roomState.laserStates[0] == 2 &&
                    roomState.laserStates[1] == 2 &&
                    roomState.laserStates[2] == 2) {
                    roomState.engineBroken = false;
                    muri.get('bubble')
                        .talk([
                            'A huge beem light up and the whole ship vibrates.',
                            'You\'ve made it, the engine is running again!'
                        ]);
                }
            });
    };

    engine.init = function() {
        background = muri.bg('engine');
        door = muri.door('engine', [8, 10]);
        lasers = [
            laser(0),
            laser(1),
            laser(2)
        ];
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

    engine.render = function() {
        background.render();
    };

    engine.name = 'engine';
    engine.roomState = roomState;
    muri.rooms.push(engine);
}());
