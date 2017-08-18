var muri = (function() {
    kontra.init('js13k-2017');
    kontra.assets.imagePath = 'assets/images';

    var muri = {};

    var bg = function(room) {
        return kontra.sprite({
            x: 0, y: 0,
            image: kontra.assets.images['room_'+room]
        });
    };
    muri.modules = [];

    muri.start = function() {
        kontra.assets.load(
            'player.png',
            'room_stasis_dark.png',
            'room_stasis.png'
        ).then(function() {
            document.getElementById('loading').style.display = 'none';
            if (kontra.store.get('current-room') === null)
                kontra.store.set('current-room', 'stasis_dark');

            var rooms = {
                stasis_dark: bg('stasis_dark'),
                stasis: bg('stasis')
            };

            kontra.gameLoop({
                update: function() {
                    var currentRoom = kontra.store.get('current-room');
                    rooms[currentRoom].update();
                    for (m in muri.modules) m.update();
                },
                render: function() {
                    var currentRoom = kontra.store.get('current-room');
                    rooms[currentRoom].render();
                    for (m in muri.modules) m.render();
                }
            }).start();
        });
    };

    return muri;
}());

window.onload = muri.start;
