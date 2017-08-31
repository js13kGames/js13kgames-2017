(function() {
    "use strict";
    
    var bubble = {};

    var dom = document.getElementById('bubble');
    var resolveFn, fragmentTimer, delayTimer = null;
    var show = function(text, position) {
        return new Promise(function(resolve) {
            resolveFn = resolve;

            dom.innerHTML = '';
            dom.style.left = position[0]*8;
            dom.style.top = position[1]*8-18;

            var parts = text.split(' ');
            var showFragment = function() {
                if (parts.length === 0) {
                    delayTimer = setTimeout(resolve, 3000);
                    return;
                }
                dom.innerHTML += parts.shift() + ' ';
                fragmentTimer = setTimeout(showFragment, 140);
            };
            showFragment();
        });
    };

    bubble.skip = function(what) {
        clearTimeout(fragmentTimer);
        clearTimeout(delayTimer);
        dom.innerHTML = '';
        if (resolveFn) resolveFn(what || 'line');
    };

    bubble.talk = function(texts, position) {
        if (texts.length === 0) {
            dom.innerHTML = '';
            return;
        }
        bubble.skip('talk');
        var text = texts.shift();
        return show(text, position || [5, 52])
            .then(function(what) {
                if (what === 'talk') {
                    return Promise.resolve(what);
                }
                return bubble.talk(texts, position);
            });
    };

    bubble.story = function(talkList) {
        if (talkList.length === 0) {
            dom.innerHTML = '';
            return;   
        }
        bubble.skip('story');
        var params = talkList.shift();
        return bubble.talk(params[0], params[1])
            .then(function(what) {
                if (what === 'story') {
                    return Promise.resolve(what);
                }
                return bubble.story(talkList);
            });
    };

    bubble.name = 'bubble';
    muri.modules.push(bubble);
}());
