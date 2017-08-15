"use strict";

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



// TODO: draw the different rooms
// TODO: Put it on the screen, "player" movement (mouse is the player)
// TODO: "speech bubbles" for text
// TODO: Item store

(function() {
    kontra.init('js13k-2017');
    kontra.assets.load(
        'assets/images/test.png'
    ).then(function() {
        var image = new Image();
        image.src = 'assets/images/test.png';
        
        var sprite = kontra.sprite({
            x: 10,
            y: 20,
            width: 16,
            height: 16,
            dx: 0,
            image: image
        });

        var loop = kontra.gameLoop({
            update: function() {
                sprite.update();

                if (sprite.x > kontra.canvas.width) {
                    sprite.x = -sprite.width;
                }
            },
            render: function() {
                sprite.render();
            }
        });

        loop.start();
    });
})();
