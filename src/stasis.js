(function() {
    var stasis = {};

    var background, backgroundDark = null;
    var doorAnimationSheet = null;
    var doorSprite = null;
    var roomState = {
        isDoorOpen: false,
        isLightOn: false
    };

    stasis.init = function() {
        doorAnimationSheet = kontra.spriteSheet({
            image: kontra.assets.images.stasis_doorSheet,
            frameWidth: 24, frameHeight: 21,
            animations: {
                closed: {frames: 0},
                opened: {frames: 2},
                open: {frames: '0..3', frameRate: 6},
                close: {frames: '3..0', frameRate: 6}
            }
        });
        doorSprite = kontra.sprite({
            x: 72, y: 8,
            animations: doorAnimationSheet.animations
        });

        background = muri.bg('stasis');
        backgroundDark = muri.bg('stasis_dark');

        muri.get('entity')
            .create('stasis.lightSwitch',
                    kontra.sprite({x: 16, y: 13, width: 3, height: 2,
                                   image: kontra.assets.images.stasis_lightSwitch}))
            .addCallback(function() {
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
                    [['Urgh ... ...', 'Where I am?', 'What happened?'], [35, 40]],
                    [['I can\'t see a thing ...', '... need to turn on the light ...'], [35, 40]]
                ]);
        }
    };

    stasis.update = function() {
        if (roomState.isLightOn &&
            !muri.get('entity').get('stasis.door')) {
            muri.get('entity')
                .create('stasis.door', doorSprite)
                .addCallback(function() {
                    if (!roomState.isDoorOpen) {
                        doorSprite.playAnimation('open');
                        roomState.isDoorOpen = true;
                    } else {
                        doorSprite.playAnimation('close');
                        roomState.isDoorOpen = false;
                    }
                });
        }
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
