
import { _decorator } from 'cc';
import  ssr  from '../../namespace/SSRLoSNamespace';
import {  ssrLoSStrategyPostProcessBase} from './SSRLoSStrategyPostProcessBase';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSStrategyPostProcessUnlimitedRange')
export class ssrLoSStrategyPostProcessUnlimitedRange  extends ssrLoSStrategyPostProcessBase{
 
    process () {
            var hitPointArray = this._losComponentCore.getHitPointArray(); 
            if (hitPointArray.length <= 0) { 
                return; 
            } 
            var blockingEdgeMap = {}; 
            var potentialBlockingEdgeMap = this._losComponentCore.getPotentialBlockingEdgeMap(); 
            var blockingEdgeArray = this._losComponentCore.getBlockingEdgeArray(); 
            var visibleEdgeArray = this._losComponentCore.getVisibleEdgeArray(); 
            var sightArea = this._losComponentCore.getSightArea(); 
            hitPointArray.push(hitPointArray[0]); 
            var preHitPoint = hitPointArray[0]; 
            for (var i = 1, l = hitPointArray.length; i < l; i ++) { 
                var currentHitPoint = hitPointArray[i]; 
                var sameEdgeID = ssr.LoS.Helper.getSameEdgeID(preHitPoint, currentHitPoint); 
                if (sameEdgeID != 0) { 
                    visibleEdgeArray.push( 
                        [ 
                            preHitPoint.getHitPoint(), 
                            currentHitPoint.getHitPoint() 
                        ] 
                    ); 
                    if (!blockingEdgeMap[sameEdgeID.toString()]) { 
                        blockingEdgeMap[sameEdgeID.toString()] = sameEdgeID; 
                        blockingEdgeArray.push(potentialBlockingEdgeMap[sameEdgeID.toString()]); 
                    } 
                } 
                sightArea.push( 
                    [ 
                        preHitPoint.getHitPoint(), 
                        currentHitPoint.getHitPoint() 
                    ]        
                ); 
                preHitPoint = currentHitPoint; 
            } 
            hitPointArray.pop(); 
    }

}

ssr.LoS.Strategy.PostProcess.UnlimitedRange = ssrLoSStrategyPostProcessUnlimitedRange;
