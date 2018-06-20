var MainScene =  cc.Scene.extend({
    onEnter: function() {
        this._super();

        this.loadBackground();
        this.loadPlane();
    },

    // 载入背景
    loadBackground: function() {
        var layer = new MainBackgroundLayer();
        this.addChild(layer);
    },

    // 载入飞机
    loadPlane: function() {
        var layer = new MainPlaneLayer();
        this.addChild(layer);
    },
});