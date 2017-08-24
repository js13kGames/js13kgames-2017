(function() {
    var act1 = {};

    var controlPanelSprite = kontra.sprite({x: 16, y: 13, width: 3, height: 2});
    var doorSpriteSheet = null;
    var doorAnimation = null;

    act1.init = function() {
        doorSpriteSheet = kontra.spriteSheet({
            image: kontra.assets.images['stasis_door-sheet'],
            frameWidth: 23,
            frameHeight: 20,
            animations: {
                closed: {
                    frames: 0
                },
                opened: {
                    frames: 2
                },
                open: {
                    frames: '0..2',
                    frameRate: 6
                },
                close: {
                    frames: '2..0',
                    frameRate: 6
                }
            }
        });
        doorAnimation = kontra.sprite({
            x: 72, y: 8,
            animations: doorSpriteSheet.animations
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
        if (muri.currentRoom === 'stasis') {
            doorAnimation.closed.update();
            if (muri.get('mouse').clickedOn(doorAnimation)) {
                muri.get('mouse').releaseClick();
                doorAnimation.playAnimation('open');
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
            doorAnimation.closed.render();
        }
    };

    muri.modules.push(act1);
}());
