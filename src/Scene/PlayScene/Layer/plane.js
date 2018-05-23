var PlayPlaneLayer = cc.Layer.extend({
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
        this.plane.setPosition(cc.p(width / 2, height / 2 - 150));

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
    }
});