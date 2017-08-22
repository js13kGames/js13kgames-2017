(function() {
    var act1 = {};

    muri.get('bubble')
        .story([
            [['Beep', 'Bip, Bip'], [20, 15]],
            [['Urgh ... ...', 'Where I am?', 'What happened?'], [35, 40]],
            [['I can\'t see a thing ...', '... need to turn on the light ...'], [35, 40]]
        ]);

    act1.update = function() {
    };

    act1.render = function() {
    };

    muri.modules.push(act1);
}());
