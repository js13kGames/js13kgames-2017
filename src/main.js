(function() {
    kontra.init('js13k-2017');
    //kontra.canvas.width = document.body.scrollWidth;
    //kontra.canvas.height = document.body.scrollHeight;

    var sprite = kontra.sprite({
        x: 100,
        y: 80,
        color: '#bb4444',
        width: 50,
        height: 50,
        dx: 1
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
})();
