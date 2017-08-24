(function() {
    var act1 = {};

    var controlPanelSprite = kontra.sprite({x: 16, y: 13, width: 3, height: 2});
    var doorAnimationSheet = null;
    var doorSprite = null;
    var roomState = {
        isDoorOpen: false
    };

    act1.init = function() {
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

        if (muri.currentRoom === 'stasis_dark') {
            muri.get('bubble')
                .story([
                    [['Beep', 'Bip, Bip'], [20, 15]],
                    [['Urgh ... ...', 'Where I am?', 'What happened?'], [35, 40]],
                    [['I can\'t see a thing ...', '... need to turn on the light ...'], [35, 40]]
                ]);
        }
    };

    act1.update = function() {
        doorSprite.update();
        if (muri.currentRoom === 'stasis') {
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

            if (muri.currentRoom === 'stasis_dark') {
                muri.currentRoom = 'stasis';
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

    act1.render = function() {
        if (muri.currentRoom === 'stasis') {
            doorSprite.render();
        }
    };

    muri.modules.push(act1);
}());
