// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        _accelerating: false,
        _direction: cc.Vec2,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.keyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.keyUp, this);

        let canvas = cc.find("Canvas");
        canvas.on("mousemove", this.changeDirection, this);
    },

    start () {

    },

    update (dt) {
        if (this._accelerating) {
            this.node.position = this.node.position.add(this._direction);
        }
    },

    keyDown (event) {
        if (event.keyCode == cc.macro.KEY.a) {
            this._accelerating = true;
        }
    },

    keyUp (event) {
        if (event.keyCode == cc.macro.KEY.a) {
            this._accelerating = false;
        }
    },

    changeDirection (event) {
        let mousePosition = event.getLocation();
        let direction = mousePosition.sub(this.node.position);
        this._direction = direction.normalize();
    },
});
