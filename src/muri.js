var muri = {
    bubble: function(text, position=[2, 7], delay=3, callback=false) {
        var bubble = document.getElementById('bubble');
        bubble.style.display = '';
        bubble.style.left = position[0]*8;
        bubble.style.top = position[1]*8;
        bubble.innerHTML = text;
        setTimeout(function() {
            bubble.style.display = 'none';
            if (callback !== false) callback.call();
        }, delay*1000);
    },

    talk: function(texts, position) {
        if (texts.length === 0) return;
        var text = texts.shift();
        var delay = Math.ceil(text.length/13);
        this.bubble(text, position, delay, function() {
            muri.talk(texts, position);
        });
    }
};
