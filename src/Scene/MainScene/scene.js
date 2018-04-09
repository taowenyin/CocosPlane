var MainScene =  cc.Scene.extend({
    onEnter: function() {
        this._super();

        console.log("Enter Main Scene");

        this.loadBackground();
        this.loadMenu();
        this.loadPlane();
    },

    // 载入背景
    loadBackground: function() {
        var layer = new BackgroundLayer();
        this.addChild(layer);
    },

    // 载入飞机
    loadPlane: function() {
        var layer = new PlaneLayer();
        this.addChild(layer);
    },

    // 载入菜单
    loadMenu: function() {
        var layer = new MenuLayer();
        this.addChild(layer);
    }
});