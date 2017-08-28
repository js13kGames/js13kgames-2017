(function() {
    var bubble = {};

    var activeTalk = false;
    var skip = false;
    var dom = document.getElementById('bubble');

    var show = function(text, position) {
        return new Promise(function(resolve, reject) {
            dom.style.display = '';
            dom.style.left = position[0]*8;
            dom.style.top = position[1]*8;
            dom.innerHTML = '';

            parts = text.split(' ');
            var showFragment = function() {
                if (skip) {
                    dom.innerHTML = '';
                    dom.style.display = 'none';
                    skip = false;
                    throw new Error('dfad');
                }
                if (parts.length === 0) {
                    setTimeout(function() {
                        dom.style.display = 'none';
                        return resolve();
                    }, 1500);
                    return;
                }
                dom.innerHTML += parts.shift() + ' ';
                setTimeout(showFragment, 150);
            };
            showFragment();
        });
    };

    bubble.skip = function() {
        dom.innerHTML = '';
        skip = true;
    };

    bubble.stop = function() {
        bubble.skip();
        if (!activeTalk) return;
        activeTalk.reject();
        activeTalk = false;
    };
    
    bubble.talk = function(texts, position) {
        if (texts.length === 0) return;
        var text = texts.shift();
        return show(text, position || [5, 44])
            .then(function() {return bubble.talk(texts, position);})
            .catch(function() { return; });
    };

    bubble.story = function(talkList) {
        if (talkList.length === 0) return;
        var params = talkList.shift();
        var activeTalk = bubble.talk(params[0], params[1])
            .then(function() {return bubble.story(talkList);})
            .catch(function() { return; });

        return activeTalk;
    };

    bubble.name = 'bubble';
    muri.modules.push(bubble);
}());
