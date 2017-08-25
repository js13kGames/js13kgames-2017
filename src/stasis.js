(function() {
    var stasis = {};

    var controlPanelSprite = kontra.sprite({x: 16, y: 13, width: 3, height: 2});
    var background, backgroundDark = null;
    var doorAnimationSheet = null;
    var doorSprite = null;
    var roomState = {
        isDoorOpen: false,
        isLightOn: false
    };

    stasis.init = function() {
        doorAnimationSheet = kontra.spriteSheet({
            image: kontra.assets.images['stasis_door-sheet'],
            frameWidth: 24,
            frameHeight: 21,
            animations: {
                closed: {
                    frames: 0
                },
                opened: {
                    frames: 2
                },
                open: {
                    frames: '0..3',
                    frameRate: 6,
                },
                close: {
                    frames: '3..0',
                    frameRate: 6,
                }
            }
        });
        doorSprite = kontra.sprite({
            x: 72, y: 8,
            animations: doorAnimationSheet.animations
        });

        background = muri.bg('stasis');
        backgroundDark = muri.bg('stasis_dark');

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
        doorSprite.update();
        if (roomState.isLightOn) {
            if (muri.get('mouse').clickedOn(doorSprite)) {
                muri.get('mouse').releaseClick();
                if (!roomState.isDoorOpen) {
                    doorSprite.playAnimation('open');
                    roomState.isDoorOpen = true;
                } else {
                    doorSprite.playAnimation('close');
                    roomState.isDoorOpen = false;
                }
            }
        }

        if (muri.get('mouse').clickedOn(controlPanelSprite)) {
            muri.get('mouse').releaseClick();

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
        }
    };

    stasis.render = function() {
        if (roomState.isLightOn) {
            background.render();
        } else {
            backgroundDark.render();
        }

        if (roomState.isLightOn) {
            doorSprite.render();
        }
    };

    stasis.name = 'stasis';
    muri.rooms.push(stasis);
}());
