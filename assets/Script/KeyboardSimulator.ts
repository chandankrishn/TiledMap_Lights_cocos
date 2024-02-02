import { _decorator, Component, input, Input } from 'cc';
const { ccclass } = _decorator;

@ccclass('KeyboardSimulator')
export class KeyboardSimulator extends Component {
    allKeys: {} ;

    onLoad () {
            this.allKeys = {}; 
            input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this); 
            input.on(Input.EventType.KEY_UP, this.onKeyUp, this); 
    }

    onDestroy () {
            input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this); 
            input.off(Input.EventType.KEY_UP, this.onKeyUp, this); 
    }

    onKeyDown (event: any) {
            this.allKeys[event.keyCode] = true; 
    }

    onKeyUp (event: any) {
            this.allKeys[event.keyCode] = false; 
    }

}

