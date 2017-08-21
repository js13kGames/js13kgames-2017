(function() {
    var bubble = {};

    var isactive = false;
    var show = function(text, position, callback) {
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
                    callback.call();
                }, 4000);
                return;
            }
            dom.innerHTML += parts.shift() + ' ';
            setTimeout(show, 150);
        };
        show();
    };
    
    bubble.talk = function(texts, position, callback) {
        if (texts.length === 0) {
            if (callback !== undefined) callback.call();
            return;
        }
        var text = texts.shift();
        show(text, position || [5, 40], function() {
            bubble.talk(texts, position);
        });
    };

    bubble.name = 'bubble';
    muri.modules.push(bubble);
}());
