// Plot: You are in the dark, and you have no clue where you are
// and what happened. You wake up in completely dark and stumble
// around. You explore the area and you find out you are on a
// old space ship. You need to find out whats going on here and
// why you are here. After finding and combining some items, you
// find out that your stasis capsule had some malfunctioning and
// you are the only one on this mission. But what mission? And
// where are your crew members? Where are you? You are drifting
// along, lost in space with no hope of rescue. But you want to
// surrender.
// You find out that you are the only surrender on an ancient
// space ship, carring cargo from one place to another when
// space pirates killed the crew except you. You want to fly
// home, but you need to bring the ship back to life.

// TOOLS: Aseprite (DB16 Palett)

// Ship:
// Statis capsule room
// Cargo room
// Command station
// Crew quarters
// Machine/Engine room

// Act 1: No light at all. Only player. Can walk. If the player
// hit a wall (he stands in a corridor), he can switch on the light.
// He sees the room and the stasis capsule. Explore the room,
// find out more details about your current situation (statis
// no one is here, ship don't move, warning signs everywhere).

// Act 2: Open the pressure door, find a space suite, get a map
// fix a leak in the ship.

// Act 3: Go into the command station, find out more on the
// terminals, fix some things by exploring the rest of the ship.

// Act 4: Bring the ship back to operation, find the way home,
// end.

var muri = (function() {
    'use strict';
    
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
    muri.get = function(moduleName) {
        for (var i in muri.modules)
            if (muri.modules[i].name === moduleName)
                return muri.modules[i];
    };

    muri.newGame = function() {
        kontra.store.set('current-room', 'stasis_dark');
        muri.modules.forEach(function(m) {
            if (m.init !== undefined) m.init();
        });
    };

    muri.setup = function() {
        kontra.assets.load(
            'player.png',
            'room_stasis_dark.gif',
            'room_stasis.gif'
        ).then(function() {
            document.getElementById('loading').style.display = 'none';
            if (kontra.store.get('current-room') === null)
                kontra.store.set('current-room', 'stasis');
            var rooms = {
                stasis_dark: bg('stasis_dark'),
                stasis: bg('stasis')
            };

            kontra.gameLoop({
                update: function() {
                    var currentRoom = kontra.store.get('current-room');
                    rooms[currentRoom].update();
                    muri.modules.forEach(function(m) {
                        if (m.update !== undefined) m.update();
                    });
                },
                render: function() {
                    var currentRoom = kontra.store.get('current-room');
                    rooms[currentRoom].render();
                    muri.modules.forEach(function(m) {
                        if (m.render !== undefined) m.render();
                    });
                }
            }).start();
        });

        muri.newGame();
    };

    return muri;
}());

document
    .getElementById('newGame')
    .addEventListener('click', muri.newGame);
window.onload = muri.setup;
