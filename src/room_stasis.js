(function() {
    'use strict';

    var stasis = {};

    var background, backgroundDark = null;
    var door, liftBox = null;
    var roomState = {
        isDoorOpen: false,
        isLightOn: true, //false
        isIntroRunning: false, //true
        hydroDoorBroken: false, // true
        liftSwitches: ['off', 'off', 'off', 'off', 'off']
    };

    var toggleLiftSwitch = function(i) {
        if (!roomState.hydroDoorBroken) return;
        var state = roomState.liftSwitches[i];
        var newState = state == 'on' ? 'off' : 'on';
        muri.get('entity').get('stasis.liftSwitch'+i).sprite.playAnimation(newState);
        roomState.liftSwitches[i] = newState;
    };

    var liftSwitch = function(i) {
        var switchAnimation = kontra.spriteSheet({
            image: kontra.assets.images.toggleSwitch_sheet,
            frameWidth: 2, frameHeight: 1,
            animations: {
                'off': {frames: 0},
                'on': {frames: 1}
            }
        });
        var liftSwitch = kontra.sprite({
            x: 95, y: 16+i*2,
            animations: switchAnimation.animations
        });

        return muri.get('entity')
            .create('stasis.liftSwitch'+i, liftSwitch)
            .addCallback(function() {
                toggleLiftSwitch(i);
                var randomSwitch = Math.floor(Math.random()*roomState.liftSwitches.length);
                if (randomSwitch !== i)
                    toggleLiftSwitch(randomSwitch);

                var solved = true;
                console.log(roomState.liftSwitches);
                roomState.liftSwitches.forEach(function(s) {
                    console.log(s);
                    if (s === 'off') solved = false;
                });
                if (solved) {
                    muri.get('bubble')
                        .talk([
                            'Once again, the ship shakes like crazy.',
                            'Something broke or looses inside the lift and metal scrapes against the hull.',
                            'Not sure if this is a good sign ...']);
                    muri.room('lift').roomState.hydroDoorBroken = false;
                    roomState.hydroDoorBroken = false;
                }
            });
    };

    stasis.init = function() {
        background = muri.bg('stasis');
        backgroundDark = muri.bg('stasis_dark');

        muri.get('entity')
            .create('stasis.lightSwitch',
                    kontra.sprite({x: 9, y: 11, width: 3, height: 2,
                                   image: kontra.assets.images.stasis_lightSwitch}))
            .addCallback(function() {
                if (roomState.isIntroRunning) return;
                if (!roomState.isLightOn) {
                    roomState.isLightOn = true;
                    muri.get('bubble')
                        .talk([
                            'Ah, much better.',
                            'Looks like something happened to my stasis capsule.'
                        ]);
                } else {
                    muri.get('bubble')
                        .talk(['No, I will not turn off the light again!']);
                }
            });

        if (!roomState.isLightOn) {
            muri.get('bubble')
                .story([
                    [['Beep', 'Bip, Bip'], [17, 15]],
                    [['Urgh ... ...', 'Where I am?', 'What happened?'], [40, 35]],
                    [['I can\'t see a thing ...', '... need to turn on the light ...'], [40, 35]]
                ])
                .then(function() {
                    roomState.isIntroRunning = false;
                });
        }
    };

    stasis.onEnter = function(prevRoom) {
        door.sprite.playAnimation('close');
    };

    stasis.update = function() {
        if (roomState.isLightOn && !door) {
            door = muri.door('stasis', [76, 11]);
            muri.get('entity')
                .create('stasis.capsule',
                        kontra.sprite({x: 21, y: 21, width: 32, height: 8}))
                .addCallback(function() {
                    muri.get('bubble')
                        .talk([
                            'That\'s my stasis capsule.',
                            'It looks like the capsule itself is intact but had a malfunction.',
                            'I am not an engineer, so I have noe idea whats wrong here ...'
                        ]);
                })
                .invisible = true;
        }

        if (!muri.room('engine').roomState.engineBroken && !liftBox) {
            liftBox = kontra.sprite({x: 94, y: 15, width: 4, height: 11, color: '#000'});
            liftSwitch(0);
            liftSwitch(1);
            liftSwitch(2);
            liftSwitch(3);
            liftSwitch(4);
        }
    };

    stasis.render = function() {
        if (roomState.isLightOn) {
            background.render();
            if (liftBox) liftBox.render();
        } else {
            backgroundDark.render();
        }
    };

    stasis.name = 'stasis';
    muri.rooms.push(stasis);
}());
