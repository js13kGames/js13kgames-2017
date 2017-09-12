(function() {
    'use strict';
    
    var entity = {};
    var allEntities = [];

    entity.get = function(name) {
        for (var i in allEntities)
            if (allEntities[i].name === name)
                return allEntities[i];
        return false;
    };

    entity.create = function(name, sprite) {
        var e = {
            name: name,
            sprite: sprite,
            callbacks: [],
            addCallback: function(callback) {
                this.callbacks.push(callback);
                return this;
            },
            invisible: false
        };
        allEntities.push(e);
        return e;
    };

    entity.update = function() {
        var clickedOnASprite = false;
        allEntities.forEach(function(e) {
            if (e.name.split('.')[0] !== muri.currentRoom) return;
            e.sprite.update();
            if (muri.get('mouse').clickedOn(e.sprite)) {
                clickedOnASprite = true;
                e.callbacks.forEach(function(c) {
                    c();
                });
            }
        });

        if (clickedOnASprite)
            muri.get('mouse').releaseClick();
    };

    entity.render = function() {
        allEntities.forEach(function(e) {
            if (e.name.split('.')[0] === muri.currentRoom && !e.invisible)
                e.sprite.render();
        });
    };

    entity.name = 'entity';
    muri.modules.push(entity);
}());
