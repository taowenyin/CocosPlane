var PlaneLayer = cc.Layer.extend({
    plane: null,

    ctor: function() {
        this._super();

        // 得到屏幕的宽度和高度
        var screenSize = cc.winSize;
        var width = screenSize.width;
        var height = screenSize.height;

        // 创建飞机的精灵
        this.plane = cc.Sprite.create(res.HERO_01_png);
        // 设置飞机精灵的锚点
        this.plane.setAnchorPoint(0.5, 0.5);

        // 把飞机添加到场景层
        this.addChild(this.plane);

        // 设置飞机的在场景层中的位置
        this.plane.setPosition(cc.p(width / 2, height / 2));

        // 创建一个帧动画对象
        var animation = new cc.Animation();
        // 向帧动画中添加每一帧的图片
        animation.addSpriteFrameWithFile(res.HERO_01_png);
        animation.addSpriteFrameWithFile(res.HERO_02_png);
        // 设置帧动画中每一帧的时间间隔
        animation.setDelayPerUnit(0.15);
        // 播放完动画后恢复到开始
        animation.setRestoreOriginalFrame(true);

        // 创建播放帧动画的对象
        var animate = cc.animate(animation);
        // 设置动画始终播放
        animate.repeatForever();

        // 使飞机播放该动画
        this.plane.runAction(animate);

        // 创建一个定时器
        // 第1个参数为定时器的回调函数
        // 第2个参数为每次执行回调的间隔，
        // 第3个参数为定时器执行的次数（注意，该值从0开始，0表示执行1次）
        // 第4个参数为定时器启动的延时
        // 第5个参数为定时器的键值
        this.schedule(this.runSpriteAction, 5, 0, 2, "timer");
    },

    runSpriteAction: function() {

    }
});