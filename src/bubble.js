(function() {
    var bubble = {};

    var isactive = false;
    var show = function(text, position) {
        return new Promise(function(resolve) {
            isactive = true;

            var dom = document.getElementById('bubble');
            dom.style.display = '';
            dom.style.left = position[0]*8;
            dom.style.top = position[1]*8;
            dom.innerHTML = '';

            parts = text.split(' ');
            var show = function() {
                if (parts.length === 0) {
                    setTimeout(function() {
                        isactive = false;
                        dom.style.display = 'none';
                        return resolve();
                    }, 4000);
                    return;
                }
                dom.innerHTML += parts.shift() + ' ';
                setTimeout(show, 150);
            };
            show();
        });
    };
    
    bubble.talk = function(texts, position) {
        return new Promise(function(resolve) {
            if (texts.length === 0) {
                return resolve();
            }
            var text = texts.shift();
            show(text, position || [5, 40]).then(function() {
                bubble.talk(texts, position);
            });
        });
    };

    bubble.story = function(talkList) {
        return new Promise(function(resolve, reject) {
            if (talkList.length === 0) {
                return resolve();
            }
            var params = talkList.shift();
            bubble.talk(params[0], params[1]).then(function() {
                bubble.story(talkList);
            });
        });
    };

    bubble.name = 'bubble';
    muri.modules.push(bubble);
}());
