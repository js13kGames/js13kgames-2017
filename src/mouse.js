(function() {
    var mouse = {};
    var isEnabled = true;
    var canvas = document.getElementById('js13k-2017');

    var mouseSprite = kontra.sprite({
        x: -1,
        y: -1,
        width: 1,
        height: 1,
        color: 'green'
    });

    var clickEvent = function(evt) {
        if (isEnabled) {
            mouseSprite.x = Math.floor(evt.offsetX/8);
            mouseSprite.y = Math.floor(evt.offsetY/8);
        }
    };
    canvas.addEventListener('click', clickEvent);

    mouse.clickedOn = function(sprite) {
        return sprite.collidesWith(mouseSprite);
    };

    mouse.releaseClick = function() {
        mouseSprite.x = -1;
        mouseSprite.y = -1;
    };

    mouse.disable = function() {
        isEnabled = false;
        mouse.releaseClick();
        canvas.style.cursor = 'progress';
    };

    mouse.enable = function() {
        isEnabled = true;
        canvas.style.cursor = 'hand';
    };

    mouse.name = 'mouse';
    muri.modules.push(mouse);
}());
