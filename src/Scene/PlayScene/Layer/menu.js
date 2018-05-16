var MenuLayer = cc.Layer.extend({
    gameStartBtn: null,
    gameExitBtn: null,

    text: null,

    ctor: function() {
        this._super();

        // 得到屏幕的宽度和高度
        var screenSize = cc.winSize;
        var width = screenSize.width;
        var height = screenSize.height;

        // 创建游戏开始按钮的各状态精灵
        var gameStartNormal = cc.Sprite.create(res.Game_Start_Normal_png);
        var gameStartPress = cc.Sprite.create(res.Game_Start_Press_png);
        var gameStartDisable = cc.Sprite.create(res.Game_Start_Press_png);
        // 创建游戏退出按钮的各状态精灵
        var gameExitNormal = cc.Sprite.create(res.Game_Exit_Normal_png);
        var gameExitPress = cc.Sprite.create(res.Game_Exit_Press_png);
        var gameExitDisable = cc.Sprite.create(res.Game_Exit_Press_png);

        // 创建游戏菜单项
        var startMenuItem = cc.MenuItemSprite.create(
            gameStartNormal,
            gameStartPress,
            gameStartDisable,
            function() {
                cc.log("开始菜单的点击事件");
                cc.director.runScene(new cc.TransitionFlipX(2, new MainScene(), cc.TRANSITION_ORIENTATION_RIGHT_OVER));
            }
        );
        startMenuItem.setPositionY(startMenuItem.getPositionY() + 30);
        var exitMenuItem = cc.MenuItemSprite.create(
            gameExitNormal,
            gameExitPress,
            gameExitDisable,
            function() {
                cc.log("退出菜单的点击事件");
            }
        );
        exitMenuItem.setPositionY(exitMenuItem.getPositionY() - 30);

        // 把菜单项放入菜单容器中
        var menu = cc.Menu.create(startMenuItem, exitMenuItem);
        this.addChild(menu);
    },
});