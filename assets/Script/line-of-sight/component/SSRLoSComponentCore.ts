import { _decorator, Component, Enum, UITransform } from 'cc';
import ssr from '../namespace/SSRLoSNamespace';
const { ccclass, menu, property } = _decorator;

let LOS_SIGHT_MODE = Enum(
    {
        "UNKNOWN": 0,
        "UNLIMITED_RANGE": 1,
        "FULL_ANGLE": 2,
        "REFLEX_ANGLE": 3,
        "NON_REFLEX_ANGLE": 4
    }
);
@ccclass('SSRLoSComponentCore')
@menu('ssr/LoS/Core')
export class SSRLoSComponentCore extends Component {
    // @property
    public radius = -1;
    // @property
    public centralAngle = 0;
    public mode = LOS_SIGHT_MODE.UNLIMITED_RANGE;
    _loSCore: any;



    // radius: {
    //     default         : -1,
    //     displayName     : "radius",
    //     tooltip         : "radius",
    //     min             : -1,
    //     notify          : function() {this.updateMode();},
    // }
    // centralAngle: {
    //     default         : 0,
    //     displayName     : "centralAngle",
    //     tooltip         : "centralAngle",
    //     min             : 0,
    //     max             : 360,
    //     notify          : function() {this.updateMode();},
    // },
    // mode: {
    //     default         : LOS_SIGHT_MODE.UNLIMITED_RANGE,
    //     type            : LOS_SIGHT_MODE,
    //     displayName     : "mode",
    //     tooltip         : "mode",
    //     readonly        : true
    // }

    updateMode() {
        // this.node.getWorldPosition();
        if (this.radius == -1) {
            this.mode = LOS_SIGHT_MODE.UNLIMITED_RANGE;
        }
        else {
            if (this.centralAngle > 0 && this.centralAngle <= 180) {
                this.mode = LOS_SIGHT_MODE.REFLEX_ANGLE;
            }
            else if (this.centralAngle > 180 && this.centralAngle <= 360) {
                this.mode = LOS_SIGHT_MODE.NON_REFLEX_ANGLE;
            }
            else {
                this.mode = LOS_SIGHT_MODE.FULL_ANGLE;
            }
        }
    }

    onLoad() {
        this._loSCore = new ssr.LoS.Core(this.node);
        if (this.radius > 0) {
            this._loSCore.setRadius(this.radius);
        }
        if (this.centralAngle > 0) {
            this._loSCore.setCentralAngle(this.centralAngle);
        }
    }

    updateSightNode() {
        this._loSCore.angle = this.node.angle;
        return this._loSCore.update();
    }

    getLoSCore() {
        return this._loSCore;
    }

}
