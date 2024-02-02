import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Robot')
export class Robot extends Component {
    @property
    public useCamera = false;
    @property
    public isForceLoSUpdate = false;

    start () {
    }

}

