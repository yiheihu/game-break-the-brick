var Block = function(game, position) {
    // position 是[0, 0]格式
    var img = game.imageByName('block')
    var o = {
        'x': position[0],
        'y': position[1],
        // 'w': 50,
        // 'h': 20,
        alive: true,
        lifes: position[2] || 1
    }
    o.image = img.image
    o.w = img.height
    o.h = img.width
    o.kill = function() {
        o.lifes--
        if (o.lifes < 1 ) {
            o.alive = false
        }
    }

    o.collide = function (b) {
        return o.alive && (rectIntersects(o, b) || rectIntersects(b, o))
    }
    return o
}
