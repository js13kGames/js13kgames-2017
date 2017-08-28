(function() {
    var entity = {};
    var allEntities = [];

    entity.get = function(name) {
        for (var i in allEntities)
            if (allEntities[i].name === name)
                return allEntities[i];
        return false;
    };

    entity.create = function(name, sprite) {
        allEntities.push({
            name: name,
            sprite: sprite,
            callbacks: []
        });
        return {
            addCallback: function(callback) {
                entity.get(name).callbacks.push(callback);
                return this;
            }
        };
    };

    entity.update = function() {
        var clickedOnASprite = false;
        allEntities.forEach(function(e) {
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
            e.sprite.render();
        });
    };

    entity.name = 'entity';
    muri.modules.push(entity);
}());
