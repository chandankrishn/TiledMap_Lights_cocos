import { _decorator, Component, Node, Rect } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SneakyJoystickCore')
export class SneakyJoystickCore extends Component {
    @property(Node)
    public backgroundSprite: Node = null;
    @property(Node)
    public backgroundPressedSprite: Node = null;
    @property(Node)
    public thumbSprite: Node = null;
    @property(Node)
    public thumbPressedSprite: Node = null;
    @property
    public rePositionRect = new Rect();

    onLoad () {
            // this.stickPosition = cc.v2(0, 0); 
            // this.degrees = 0.0; 
            // this.velocity = cc.v2(0, 0); 
            // this.node.setContentSize(this.backgroundSprite.getContentSize()); 
            // this.joystickRadius = this.backgroundSprite.getContentSize().width / 2; 
            // this.joystickRadiusSq = (this.joystickRadius * this.joystickRadius); 
            // this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this); 
            // this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this); 
            // this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this); 
            // this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this); 
    }

    update (dt: any) {
            // this.thumbSprite.setPosition(this.stickPosition); 
            // this.thumbPressedSprite.setPosition(this.stickPosition); 
    }

    onTouchStart (event: any) {
            // var location = event.getLocation(); 
            // location = this.node.parent.convertToNodeSpaceAR(location); 
            // if (this.rePositionRect.contains(location)) { 
                // this.node.setPosition(location); 
            // } 
            // location = this.node.convertToNodeSpaceAR(event.getLocation()); 
            // this.node.opacity = 150; 
            // if (this.JoySneakyTouchBegin(location)) { 
                // event.stopPropagation(); 
            // }; 
    }

    onTouchMove (event: any) {
            // var location = event.getLocation(); 
            // location = this.node.convertToNodeSpaceAR(location); 
            // this.JoySneakyTouchMove(location); 
    }

    onTouchEnd (event: any) {
            // var location = event.getLocation(); 
            // location = this.node.convertToNodeSpaceAR(location); 
            // this.JoySneakyTouchEnd(location); 
            // this.node.opacity = 50; 
    }

    JoySneakyTouchBegin (location: any) {
            // this.backgroundSprite.visible = false; 
            // this.backgroundPressedSprite.visible = true; 
            // this.thumbSprite.visible = false; 
            // this.thumbPressedSprite.visible = true; 
            // var dSq = location.x * location.x + location.y * location.y; 
            // if(this.joystickRadiusSq > dSq) { 
                // this.updateVelocity(location); 
                // return true; 
            // } 
    }

    JoySneakyTouchMove (location: any) {
            // this.updateVelocity(location); 
    }

    JoySneakyTouchEnd (location: any) {
            // this.velocity = cc.v2(0, 0); 
            // this.stickPosition = cc.v2(0, 0); 
            // this.backgroundSprite.visible = true; 
            // this.backgroundPressedSprite.visible = false; 
            // this.thumbSprite.visible = false; 
            // this.thumbPressedSprite.visible = false; 
    }

    updateVelocity (point: any) {
            // var SJ_PI = 3.14159265359; 
            // var SJ_PI_X_2 = 6.28318530718; 
            // var SJ_RAD2DEG = 180.0 / SJ_PI; 
            // var dx = point.x; 
            // var dy = point.y; 
            // var dSq = dx * dx + dy * dy; 
            // if(dSq <= 0) { 
                // this.velocity = cc.v2(0, 0); 
                // this.degrees = 0.0; 
                // this.stickPosition = point; 
                // return; 
            // } 
            // var angle = Math.atan2(dy, dx); 
            // if(angle < 0) { 
                // angle += SJ_PI_X_2; 
            // } 
            // var cosAngle = Math.cos(angle); 
            // var sinAngle = Math.sin(angle); 
            // if (dSq > this.joystickRadiusSq) { 
                // dx = cosAngle * this.joystickRadius; 
                // dy = sinAngle * this.joystickRadius; 
            // } 
            // this.velocity = cc.v2(dx / this.joystickRadius, dy / this.joystickRadius); 
            // this.degrees = angle * SJ_RAD2DEG; 
            // this.stickPosition = cc.v2(dx, dy); 
    }

    getVelocity () {
            // return this.velocity; 
    }

    getDegrees () {
            // return this.degrees; 
    }

}


/**
 * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
 */
// //
// var SneakyJoystickCore = cc.Class({
//     extends: cc.Component,
//     properties: {
//         backgroundSprite: {
//             default: null,
//             type: cc.Node
//         },
//         backgroundPressedSprite: {
//             default: null,
//             type: cc.Node
//         },
//         thumbSprite: {
//             default: null,
//             type: cc.Node
//         },
//         thumbPressedSprite: {
//             default: null,
//             type: cc.Node
//         },
//         rePositionRect: {
//             default: cc.rect(0, 0, 0, 0)
//         }
// 
//     },
//     onLoad:function() {
//         this.stickPosition = cc.v2(0, 0);
//         this.degrees = 0.0;
//         this.velocity = cc.v2(0, 0);
// 
//         this.node.setContentSize(this.backgroundSprite.getContentSize());
//         this.joystickRadius = this.backgroundSprite.getContentSize().width / 2;
//         this.joystickRadiusSq = (this.joystickRadius * this.joystickRadius);
// 
//         this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
//         this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
//         this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
//         this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
//     },
//     update:function(dt) {
//         this.thumbSprite.setPosition(this.stickPosition);
//         this.thumbPressedSprite.setPosition(this.stickPosition);
//     },
//     //
//     onTouchStart:function(event) {
//         var location = event.getLocation();
//         location = this.node.parent.convertToNodeSpaceAR(location);
//         if (this.rePositionRect.contains(location)) {
//             this.node.setPosition(location);
//         }
//         location = this.node.convertToNodeSpaceAR(event.getLocation());
//         this.node.opacity = 150;
//         if (this.JoySneakyTouchBegin(location)) {
//             event.stopPropagation();
//         };
//     },
//     onTouchMove:function(event) {
//         var location = event.getLocation();
//         location = this.node.convertToNodeSpaceAR(location);
//         this.JoySneakyTouchMove(location);
//     },
//     onTouchEnd:function(event) {
//         var location = event.getLocation();
//         location = this.node.convertToNodeSpaceAR(location);
//         this.JoySneakyTouchEnd(location);
//         this.node.opacity = 50;
//     },
//     JoySneakyTouchBegin:function(location) {
//         this.backgroundSprite.visible = false;
//         this.backgroundPressedSprite.visible = true;
//         this.thumbSprite.visible = false;
//         this.thumbPressedSprite.visible = true;
//         var dSq = location.x * location.x + location.y * location.y;
//         if(this.joystickRadiusSq > dSq) {
//             this.updateVelocity(location);
//             return true;
//         }
//     },
//     JoySneakyTouchMove:function(location) {
//         this.updateVelocity(location);
//     },
//     JoySneakyTouchEnd:function(location) {
//         this.velocity = cc.v2(0, 0);
//         this.stickPosition = cc.v2(0, 0);
//         this.backgroundSprite.visible = true;
//         this.backgroundPressedSprite.visible = false;
//         this.thumbSprite.visible = false;
//         this.thumbPressedSprite.visible = false;
//     },
//     updateVelocity:function(point) {
//         var SJ_PI = 3.14159265359;
//         var SJ_PI_X_2 = 6.28318530718;
//         var SJ_RAD2DEG = 180.0 / SJ_PI;
// 
//         var dx = point.x;
//         var dy = point.y;
//         var dSq = dx * dx + dy * dy;
// 
//         if(dSq <= 0) {
//             this.velocity = cc.v2(0, 0);
//             this.degrees = 0.0;
//             this.stickPosition = point;
//             return;
//         }
// 
//         var angle = Math.atan2(dy, dx);
//         if(angle < 0) {
//             angle += SJ_PI_X_2;
//         }
//         var cosAngle = Math.cos(angle);
//         var sinAngle = Math.sin(angle);
//     
//         if (dSq > this.joystickRadiusSq) {
//             dx = cosAngle * this.joystickRadius;
//             dy = sinAngle * this.joystickRadius;
//         }
//         this.velocity = cc.v2(dx / this.joystickRadius, dy / this.joystickRadius);
//         this.degrees = angle * SJ_RAD2DEG;
//         this.stickPosition = cc.v2(dx, dy);
//     },
//     getVelocity:function() {
//         return this.velocity;
//     },
//     getDegrees:function() {
//         return this.degrees;
//     }
// });
