var PlayScene =  cc.Scene.extend({
    onEnter: function() {
        this._super();

        console.log("Enter Play Scene");

        this.loadBackground();
        this.loadMenu();
        this.loadPlane();
    },

    // 载入背景
    loadBackground: function() {
        var layer = new PlayBackgroundLayer();
        this.addChild(layer);
    },

    // 载入飞机
    loadPlane: function() {
        var layer = new PlayPlaneLayer();
        this.addChild(layer);
    },

    // 载入菜单
    loadMenu: function() {
        var layer = new PlayMenuLayer();
        this.addChild(layer);
    }
});