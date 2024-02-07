import { _decorator, Component, misc, Node, sys, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SneakyJoystick')
export class SneakyJoystick extends Component {
    @property(Node)
    public target: Node = 'null';
    @property(Node)
    public joystick: Node = 'null';

    onLoad() {
    }

    start() {
    }

    update(dt: any) {
        let keyboardSimulator = this.target.getComponent("KeyboardSimulator");
        let speed = 2;
        let degrees = undefined;
        let velocity = undefined;
        if (keyboardSimulator && !sys.isNative) {
            let moveDirection = 0;
            let rotationDelta = 0;
            let velocityScale = new Vec2(1, 1);
            let targetRotation = this.target.angle;
            if (keyboardSimulator.allKeys[38] || keyboardSimulator.allKeys[87]) {
                moveDirection = 1;
            }
            else if (keyboardSimulator.allKeys[40] || keyboardSimulator.allKeys[83]) {
                moveDirection = -1;
            }
            if (keyboardSimulator.allKeys[37] || keyboardSimulator.allKeys[65]) {
                rotationDelta = -2;
            }
            else if (keyboardSimulator.allKeys[39] || keyboardSimulator.allKeys[68]) {
                rotationDelta = 2;
            }
            if (rotationDelta != 0) {
                this.target.angle = (targetRotation - rotationDelta);
            }
            if (moveDirection != 0) {
                let desiredPosition = new Vec2(0, 0);
                let verlocityUnit = new Vec2(Math.cos(misc.degreesToRadians(this.target.angle)), Math.sin(misc.degreesToRadians(this.target.angle)));
                let velocity = verlocityUnit.multiplyScalar(speed);
                velocity.x *= Math.abs(velocityScale.x);
                velocity.y *= Math.abs(velocityScale.y);
                if (moveDirection == 1) {
                    desiredPosition = velocity;
                }
                else if (moveDirection == -1) {
                    desiredPosition = velocity.multiplyScalar(-1);
                }
                // desiredPosition.add(this.target.getPosition());
                const FinalPosition = new Vec3(desiredPosition.x, desiredPosition.y, 0);

                this.target.setPosition(FinalPosition.add(this.target.getPosition()));
            }
        }
        else {
            degrees = this.joystick.getComponent("SneakyJoystickCore").getDegrees();
            velocity = this.joystick.getComponent("SneakyJoystickCore").getVelocity();
            this.target.angle = degrees;
            let verlocityUnit = new Vec2(Math.cos(misc.degreesToRadians(degrees)), Math.sin(misc.degreesToRadians(degrees)));
            let fullVelocity = verlocityUnit.multiplyScalar(speed);
            fullVelocity.x *= Math.abs(velocity.x);
            fullVelocity.y *= Math.abs(velocity.y);
            this.target.setPosition(this.target.getPosition().add(fullVelocity));
        }
    }

}


/**
 * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
 */
// //
// cc.Class({
//     extends: cc.Component,
// 
//     properties: {
//         target: {
//             default: null,
//             type: cc.Node
//         },
//         joystick: {
//             default: null,
//             type: cc.Node
//         },
//     },
//     onLoad:function () {
// 
//     },
//     start:function () {
// 
//     },
//     update:function (dt) {
//         let keyboardSimulator = this.target.getComponent("KeyboardSimulator");
//         let speed = 2;
//         let degrees = undefined;
//         let velocity = undefined;
//         if (keyboardSimulator && !cc.sys.isNative) {
//             let moveDirection = 0;
//             let rotationDelta = 0;
//             let velocityScale = cc.v2(1, 1);
//             let targetRotation = this.target.angle;
//             if (keyboardSimulator.allKeys[38] || keyboardSimulator.allKeys[87]) {
//                 moveDirection = 1;
//             }
//             else if (keyboardSimulator.allKeys[40] || keyboardSimulator.allKeys[83]) {
//                 moveDirection = -1;
//             }
//             if (keyboardSimulator.allKeys[37] || keyboardSimulator.allKeys[65]) {
//                 rotationDelta = -2;
//             }
//             else if (keyboardSimulator.allKeys[39] || keyboardSimulator.allKeys[68]) {
//                 rotationDelta = 2;
//             }
//             if (rotationDelta != 0) {
//                 this.target.angle = (targetRotation - rotationDelta);
//             }
//             if (moveDirection != 0) {
//                 let desiredPosition = cc.v2(0, 0);
//                 let verlocityUnit = cc.v2(Math.cos(cc.misc.degreesToRadians(this.target.angle)), Math.sin(cc.misc.degreesToRadians(this.target.angle)));
//                 let velocity = verlocityUnit.mul(speed);
//                 velocity.x *= Math.abs(velocityScale.x);
//                 velocity.y *= Math.abs(velocityScale.y);
//                 if (moveDirection == 1) {
//                     desiredPosition = velocity;
//                 }   
//                 else if (moveDirection == -1) {
//                     desiredPosition = velocity.mul(-1);
//                 }
//                 this.target.setPosition(desiredPosition.add(this.target.getPosition()));
//             }
//         }
//         else {
//             degrees = this.joystick.getComponent("SneakyJoystickCore").getDegrees();
//             velocity = this.joystick.getComponent("SneakyJoystickCore").getVelocity();
//             this.target.angle = degrees;
//             let verlocityUnit = cc.v2(Math.cos(cc.misc.degreesToRadians(degrees)), Math.sin(cc.misc.degreesToRadians(degrees)));
//             let fullVelocity = verlocityUnit.mul(speed);
//             fullVelocity.x *= Math.abs(velocity.x);
//             fullVelocity.y *= Math.abs(velocity.y);
//             this.target.setPosition(this.target.getPosition().add(fullVelocity));
//         }  
//     },
// });
