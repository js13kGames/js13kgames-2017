this.muri = {
    init: function(kontra) {
        kontra.init('js13k-2017');
        kontra.assets.imagePath = 'assets/images';
        kontra.assets.load(
            'player.png',
            'room_stasis_dark.png',
            'room_stasis.png'
        ).then(function() {

        });
    }
};



(function(m) {
    var bubble = {};

    bubble.show = function() {
    };

    m.bubble = bubble;
    return bubble;
}(muri || {}));

    init: function() {
        muri.bubble.playerSprite = kontra.sprite({x: 0, y: 0, image: kontra.assets.images.player })
    },

    bubble: {
        isActive: false,
        playerSprite: false,

        show: function(text, position=[2, 7], delay=3, callback=false) {
            muri.bubble.isActive = true;
            var bubble = document.getElementById('bubble');
            bubble.style.display = '';
            bubble.style.left = position[0]*8;
            bubble.style.top = position[1]*8;
            bubble.innerHTML = text;
            setTimeout(function() {
                muri.bubble.isActive = false;
                bubble.style.display = 'none';
                if (callback !== false) callback.call();
            }, delay*1000);
        },

        talk: function(texts, position) {
            if (texts.length === 0) return;
            var text = texts.shift();
            var delay = Math.ceil(text.length/13);
            muri.bubble.show(text, position, delay, function() {
                muri.bubble.talk(texts, position);
            });
        },

        render: function() {
            if (muri.bubble.isActive) {
                muri.bubble.playerSprite.render();
            }
        }
    }
};
