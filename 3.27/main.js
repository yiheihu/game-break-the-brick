var loadLevel = function(game, n) {
    var level = levels[n-1]
    var blocks = []
    for (var i = 0; i < level.length; i ++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

var blocks = []
var enableDebugMode = function(game, enable) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(events) {
        var k = event.key
        if (event.key == 'p') {
            window.paused = !window.paused
        } else if('123456'.includes(k)) {
            blocks = loadLevel(game, Number(k))
        }
    })
    //控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event){
        var input = event.target
        var fpsValue = input.value
        if (fpsValue == 0) {
            fpsValue = 10
        }
        window.fps = Number(fpsValue)
    })

}

var __main = function () {

    window.fps = 30

    var images = {
        ball: 'img/ball.png',
        block: 'img/block.png',
        paddle: 'img/paddle.png',
    }

    var game = GuaGame.instance(window.fps, images, function(g){
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}


__main()
