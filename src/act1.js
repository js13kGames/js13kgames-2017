(function() {
    var act1 = {};

    var controlPanelSprite = kontra.sprite({x: 16, y: 13, width: 3, height: 2});

    act1.init = function() {
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
    };

    muri.modules.push(act1);
}());
