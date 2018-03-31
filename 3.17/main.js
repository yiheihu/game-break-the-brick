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
        window.fps = Number(input.value)
    })

}

var __main = function () {

    var images = {
        ball: 'ball.png',
        block: 'block.png',
        paddle: 'paddle.png',
    }

    var game = GuaGame(window.fps, images, function(g){
        var paddle = Paddle(game)

        var ball = Ball(game)

        var paused = false

        var score = 0

        game.registerAction('a', function() {
            paddle.moveLeft()
        })
        game.registerAction('d', function() {
            paddle.moveRight()
        })
        game.registerAction('f', function() {
            ball.fire()
        })

        game.update = function() {
            if (window.paused) {
                return
            }
            ball.move()
            // 判断相撞
            if (paddle.collide(ball)) {
                // 这里应该调用一个ball.反弹()来实现
                ball.反弹()
            }

            // 判断 ball 和 blocks 相撞
            for (var i = 0; i < blocks.length; i++) {
                var block = blocks[i]
                if (block.collide(ball)) {
                    log('block 相撞')
                    block.kill()
                    ball.反弹()
                    score += 100
                }
            }
        }

        game.draw = function () {
            game.drawImage(paddle)
            game.drawImage(ball)
            for (var i = 0; i < blocks.length; i++) {
                var block = blocks[i]
                if (block.alive) {
                    game.drawImage(block)
                }
            }
            // draw labels
            game.context.fillText('分数:' + score, 10, 280)
        }
    })
    enableDebugMode(game, true)
}


__main()
