(function() {
    var act1 = {};

    muri.get('bubble')
        .story([
            [['Beep ...', 'Click, Click, Click ...'], [20, 15]],
            [['Urgh ... ....', 'What is wrong with me? ...'], [5, 40]]
        ]).then(function() {
            console.log("asdf");
        })

    act1.update = function() {
    };

    act1.render = function() {
    };

    muri.modules.push(act1);
}());
