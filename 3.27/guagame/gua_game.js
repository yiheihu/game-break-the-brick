class GuaGame {
    constructor(fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')
        //events
        var self = this
        window.addEventListener('keydown', event => {
            this.keydowns[event.key] = true
        })

        window.addEventListener('keyup', function(event){
            self.keydowns[event.key] = false
        })

        this.init()
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }
    drawImage(img) {
        this.context.drawImage(img.image, img.x, img.y)
    }

    registerAction(key, callback){
        this.actions[key] = callback
    }

    update(){
        this.scene.update()
    }

    draw(){
        this.scene.draw()
    }

    runloop(){
        //enents
        var g = this
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]) {
                g.actions[key]()
            }
        }

        // update
        g.update()

        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)

        // draw
         g.draw()

        // next run loop
        setTimeout(function(){
            g.runloop()
        }, 1000/window.fps)
    }

    init(){
        var g = this
        var loads = []
        // 预先载入所有的图片
        var names = Object.keys(g.images)
         for (var i = 0; i < names.length; i++) {
             let name = names[i]
             var path = g.images[name]
             let img = new Image()
             img.src = path
             // 每个图片加载成功后都会调用一个onload事件
             img.onload = function() {
                 g.images[name] = img
                 // 所有图片都成功载入之后 调用run
                 loads.push(1)
                 if (loads.length == names.length) {
                     g.run()
                 }
             }
         }

    }

    imageByName(name) {
        var g = this
        var img = g.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }

    runWithScene(scene) {
        var g = this
        g.scene = scene

        // 开始运行程序
        setTimeout(function(){
            g.runloop()
        }, 1000/window.fps)

    }

    replaceScene(scene) {
        this.scene = scene

    }

    run(){
        // runCallback(g)
        this.runCallback(this)
    }
}
