(function() {
    'use strict';

    var stasis = {};

    var background, backgroundDark = null;
    var door = null;
    var roomState = {
        isDoorOpen: false,
        isLightOn: false,
        isIntroRunning: true
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
                    [['Beep', 'Bip, Bip'], [20, 15]],
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
        if (roomState.isLightOn && !door)
            door = muri.door('stasis', [76, 11]);
    };

    stasis.render = function() {
        if (roomState.isLightOn) {
            background.render();
        } else {
            backgroundDark.render();
        }
    };

    stasis.name = 'stasis';
    muri.rooms.push(stasis);
}());
