var MainPlaneLayer = cc.Layer.extend({
    plane: null,
    screenSize: null,
    bulletArray: null,

    ctor: function() {
        this._super();

        // 创建子弹数组
        this.bulletArray = new Array();

        // 得到屏幕的宽度和高度
        this.screenSize = cc.winSize;
        var width = this.screenSize.width;
        var height = this.screenSize.height;

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
        // 注册定时器
        this.registerTimer();

    },

    registerTimer: function() {
        // 添加子弹发射的定时器
        this.schedule(this.shootBullet, 0.5, cc.REPEAT_FOREVER, 0);
        // 添加系统的调度器
        this.scheduleUpdate();
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
                // 得到触发事件的飞机对象
                var plane = event.getCurrentTarget();
                // 得到飞机大小
                var planeSize = plane.getContentSize();
                // 得到屏幕大小
                var screenSize = this.target.screenSize;
                // 得到鼠标移动的距离
                var location = touch.getLocation();

                // 当鼠标的位置小于左边界，那么就让飞机的X位置固定
                if (location.x < (planeSize.width / 2)) {
                    // 设置飞机的移动
                    var placeAction = cc.place(planeSize.width / 2, location.y);
                    plane.runAction(placeAction);
                    return;
                }

                // 当鼠标的位置大于右边界，那么就让飞机的X位置固定
                if (location.x > (screenSize.width - planeSize.width / 2)) {
                    // 设置飞机的移动
                    var placeAction = cc.place(screenSize.width - planeSize.width / 2, location.y);
                    plane.runAction(placeAction);
                    return;
                }

                // 当鼠标的位置小于下边界，那么就让飞机的Y位置固定
                if (location.y < (planeSize.height / 2)) {
                    // 设置飞机的移动
                    var placeAction = cc.place(location.x, planeSize.height / 2);
                    plane.runAction(placeAction);
                    return;
                }

                // 当鼠标的位置大于上边界，那么就让飞机的Y位置固定
                if (location.y > (screenSize.height - planeSize.height / 2)) {
                    // 设置飞机的移动
                    var placeAction = cc.place(location.x, screenSize.height - planeSize.height / 2);
                    plane.runAction(placeAction);
                    return;
                }

                // 设置飞机的移动
                var placeAction = cc.place(location.x, location.y);
                plane.runAction(placeAction);
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
                    // 获取层中的飞机对象
                    var plane = this.target.plane;
                    // 获取当前飞机的位置
                    var currentPos = plane.getPosition();
                    // 获取当前飞机的大小
                    var planeSize = plane.getContentSize();
                    // 得到屏幕的大小
                    var screenSize = this.target.screenSize;

                    // 点击向左按钮
                    if(keyCode == 37) {
                        // 控制飞机所处位置不能小于左边线
                        if(currentPos.x > planeSize.width / 2) {
                            // 设置飞机的移动
                            var placeAction = cc.place(currentPos.x - 4, currentPos.y);
                            plane.runAction(placeAction);
                        }
                    }
                    // 点击向上按钮
                    if(keyCode == 38) {
                        // 控制飞机所处位置不能大于上边线
                        if(currentPos.y < (screenSize.height - planeSize.height / 2)) {
                            // 设置飞机的移动
                            var placeAction = cc.place(currentPos.x, currentPos.y + 4);
                            plane.runAction(placeAction);
                        }
                    }
                    // 点击向右按钮
                    if(keyCode == 39) {
                        // 控制飞机所处位置不能大于右边线
                        if(currentPos.x < (screenSize.width - planeSize.width / 2)) {
                            // 设置飞机的移动
                            var placeAction = cc.place(currentPos.x + 4, currentPos.y);
                            plane.runAction(placeAction);
                        }
                    }
                    // 点击向下按钮
                    if(keyCode == 40) {
                        // 控制飞机所处位置不能小于下边线
                        if(currentPos.y > planeSize.height / 2) {
                            // 设置飞机的移动
                            var placeAction = cc.place(currentPos.x, currentPos.y - 4);
                            plane.runAction(placeAction);
                        }                        
                    }
                    
                }
            });
           // 向本层添加键盘事件
            cc.eventManager.addListener(keyboardListener, this);
        } else {
            cc.log("键盘事件不支持");
        }
    },

    // 发射子弹的处理函数
    shootBullet: function() {
        cc.log("===shootBullet===");

        // 创建子弹的精灵
        var bullet = cc.Sprite.create(res.Bullet_png);
        // 设置子弹精灵的锚点
        bullet.setAnchorPoint(0.5, 0);

        // 把子弹添加到场景层
        this.addChild(bullet);

        // 设置子弹的在场景层中的位置
        bullet.setPosition(this.plane.getPositionX(), this.plane.getPositionY() + this.plane.getContentSize().height / 2);

        // 把子弹添加到子弹数组中
        this.bulletArray.push(bullet);
    },

    // 调度器的处理函数
    update: function(dt) {
        for(var i = 0; i < this.bulletArray.length; i++) {
            var bullet = this.bulletArray[i];
            bullet.setPosition(bullet.getPositionX(), bullet.getPositionY() + 3);
        }
    }
});