
import { _decorator } from 'cc';
import  ssr  from '../../namespace/SSRLoSNamespace';
import { ssrLoSStrategyPreProcessBase } from './SSRLoSStrategyPreProcessBase';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSStrategyPreProcessLimitedRange')
export class ssrLoSStrategyPreProcessLimitedRange extends ssrLoSStrategyPreProcessBase {

}
ssr.LoS.Strategy.PreProcess.LimitedRange = ssrLoSStrategyPreProcessLimitedRange;
