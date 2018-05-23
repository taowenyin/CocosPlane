var MainPlaneLayer = cc.Layer.extend({
    plane: null,
    str: "xxx",

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

        // 注册事件
        this.registerEvent();
    },

    registerEvent: function() {
        // 添加点击事件的监听器        
        var touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            target: this,
            onTouchBegan: function(touch, event) {
                // 获取当前事件绑定的对象
                var target = event.getCurrentTarget();
                // 把点击的位置转化为绑定对象节点中的位置
                var posInNode = target.convertToNodeSpace(touch.getLocation());

                // 获取绑定对象的大小
                var size = target.getContentSize();
                // 形成绑定对象的矩形
                var rect = cc.rect(0, 0, size.width, size.height);

                // 判断点击位置是否在节点矩形中
                if(!(cc.rectContainsPoint(rect, posInNode))) {
                    return false;
                }

                return true;
            },
            onTouchMoved: function(touch, event) {
                console.log("onTouchMoved");
            },
            onTouchEnded: function(touch, event) {
                console.log("onTouchEnded");
            }
        });
        // 向飞机添加点击事件
        cc.eventManager.addListener(touchListener, this.plane);

        // 判断当前系统是否支持键盘
        if('keyboard' in cc.sys.capabilities) {
            // 创建键盘事件的监听函数
            var keyboardListener = cc.EventListener.create({
                event: cc.EventListener.KEYBOARD,
                target: this,
                onKeyPressed: function(keyCode, event) {
                    // 点击向左按钮
                    if(keyCode == 37) {
                        cc.log('点击向左按钮');
                    }
                    // 点击向上按钮
                    if(keyCode == 38) {
                        cc.log('点击向上按钮');
                    }
                    // 点击向右按钮
                    if(keyCode == 39) {
                        cc.log('点击向右按钮');
                    }
                    // 点击向下按钮
                    if(keyCode == 40) {
                        cc.log('点击向下按钮');
                    }
                    
                },
                onKeyReleased: function(keyCode, event) {
                    
                }
            });
           // 向本层添加键盘事件
            cc.eventManager.addListener(keyboardListener, this);
        } else {
            cc.log("键盘事件不支持");
        }
    }
});