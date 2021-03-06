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

    muri.ra = function(a) {
        return a[Math.floor(Math.random()*a.length)];       
    };

    muri.bg = function(room) {
        return kontra.sprite({
            x: 0, y: 0,
            image: kontra.assets.images['room_'+room]
        });
    };
    muri.currentRoom = 'stasis';
    muri.modules = [];
    muri.rooms = [];
    var fetchObject = function(type) {
        return function(name) {
            for (var i in muri[type])
                if (muri[type][i].name === name)
                    return muri[type][i];
        };
    };
    muri.get = fetchObject('modules');
    muri.room = fetchObject('rooms');

    muri.changeRoom = function(room) {
        var fromRoom = muri.currentRoom;
        muri.currentRoom = room;
        if (muri.room(room).onEnter !== undefined)
            muri.room(room).onEnter(fromRoom);
    };

    muri.door = function(room, position) {
        var doorAnimationSheet = kontra.spriteSheet({
            image: kontra.assets.images.door_sheet,
            frameWidth: 13, frameHeight: 22,
            animations: {
                closed: {frames: 0},
                opened: {frames: 5},
                open: {frames: '0..5', frameRate: 6},
                close: {frames: '5..0', frameRate: 6}
            }
        });
        var doorSprite = kontra.sprite({
            x: position[0], y: position[1],
            animations: doorAnimationSheet.animations
        });
        return muri.get('entity')
            .create(room+'.door', doorSprite)
            .addCallback(function() {
                doorSprite.playAnimation('open');
                setTimeout(function() { muri.changeRoom('lift'); }, 1000);
            });
    };

    muri.end = function(reason, again) {
        muri.changeRoom('end');
        muri.get('bubble')
            .talk(reason, [20, 20])
            .then(function() {
                if (again)
                    document.getElementById('tryagain').style.display = 'block';
            });
    };

    muri.setup = function() {
        kontra.assets.load(
            'room_stasis_dark.png',
            'room_stasis.png',
            'room_engine.png',
            'room_hydro.png',
            'door_sheet.png',
            'toggleSwitch_sheet.png',
            'keycard.png',
            'laser_sheet.png',
            'stasis_lightSwitch.png',
            'room_lift.png',
            'lift_button.png'
        ).then(function() {
            document.getElementById('loading').style.display = 'none';
            muri.modules.forEach(function(m) {
                if (m.init !== undefined) m.init();
            });
            muri.rooms.forEach(function(r) {
                if (r.init !== undefined) r.init();
            });

            kontra.gameLoop({
                update: function() {
                    var r = muri.room(muri.currentRoom);
                    if (r.update !== undefined) r.update();
                    muri.modules.forEach(function(m) {
                        if (m.update !== undefined) m.update();
                    });

                    if (!muri.get('mouse').isClickReleased()) {
                        muri.get('mouse').releaseClick();
                        muri.get('bubble').skip();
                    }
                },
                render: function() {
                    var r = muri.room(muri.currentRoom);
                    if (r.render !== undefined) r.render();
                    muri.modules.forEach(function(m) {
                        if (m.render !== undefined && m.name !== 'entity')
                            m.render();
                    });
                    muri.get('entity').render();
                }
            }).start();
        });
    };

    return muri;
}());

window.onload = muri.setup;
