var SceneEnd = function(game) {
    var s = {
        game: game,
    }
    // 初始化
    s.draw = function() {
        // draw labels
        game.context.fillText('游戏结束', 10, 280)
    }
    s.update = function() {

    }

    return s
}