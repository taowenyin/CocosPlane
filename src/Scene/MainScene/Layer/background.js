var BackgroundLayer = cc.Layer.extend({
    bg01:null,
    bg02:null,

    ctor: function() {
        this._super();

        // 得到屏幕的宽度和高度
        var screenSize = cc.winSize;
        var width = screenSize.width;
        var height = screenSize.height;

        // 创建背景的精灵对象
        this.bg01 = cc.Sprite.create(res.BG_01_png);
        // 设置背景的锚点为左下角
        this.bg01.setAnchorPoint(0, 0);
        this.bg02 = cc.Sprite.create(res.BG_02_png);
        this.bg02.setAnchorPoint(0, 0);

        // 把精灵添加到场景层中
        this.addChild(this.bg01);
        this.addChild(this.bg02);

        // 把背景1设置到屏幕的中间
        this.bg01.setPosition(cc.p(0, 0));
        // 设置背景2的X轴坐标为0，Y轴坐标为背景1的高度
        this.bg02.setPosition(cc.p(0, this.bg01.getContentSize().height));

        // 启动帧定时器
        this.scheduleUpdate();
    },

    update: function(dt) {
        // 获取背景1的Y坐标
        var pos01Y = this.bg01.getPositionY();
        var pos02Y = this.bg02.getPositionY();

        // 修改背景1的Y坐标值
        pos01Y -= 2;
        pos02Y -= 2;

        this.bg01.setPositionY(pos01Y);
        this.bg02.setPositionY(pos02Y);
    }
});