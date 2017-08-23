(function() {
    var bubble = {};

    var show = function(text, position) {
        return new Promise(function(resolve) {
            muri.get('mouse').disable();

            var dom = document.getElementById('bubble');
            dom.style.display = '';
            dom.style.left = position[0]*8;
            dom.style.top = position[1]*8;
            dom.innerHTML = '';

            parts = text.split(' ');
            var show = function() {
                if (parts.length === 0) {
                    setTimeout(function() {
                        muri.get('mouse').enable();
                        dom.style.display = 'none';
                        return resolve();
                    }, 2000);
                    return;
                }
                dom.innerHTML += parts.shift() + ' ';
                setTimeout(show, 150);
            };
            show();
        });
    };
    
    bubble.talk = function(texts, position) {
        if (texts.length === 0) return;
        var text = texts.shift();
        return show(text, position || [5, 44]).then(function() {
            return bubble.talk(texts, position);
        });
    };

    bubble.story = function(talkList) {
        if (talkList.length === 0) return;
        var params = talkList.shift();
        return bubble.talk(params[0], params[1]).then(function() {
            return bubble.story(talkList);
        });
    };

    bubble.name = 'bubble';
    muri.modules.push(bubble);
}());
