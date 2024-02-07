/****************************************************************************
Copyright (c) 2017-2018 SuperSuRaccoon

Site: http://www.supersuraccoon-cocos2d.com
Mail: supersuraccoon@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
****************************************************************************/
/**
* ssr.LoS.Data.BoundaryNull
* @class
* @extends ssr.LoS.Data.Boundary
*/
/**
* The constructor
* @function
*/
import { _decorator } from 'cc';
import ssr from '../namespace/SSRLoSNamespace';
import { ssrLoSDataBoundary } from './SSRLoSDataBoundary';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSDataBoundaryNull')
export class ssrLoSDataBoundaryNull extends ssrLoSDataBoundary {
    constructor() {
        super();
        this._type = ssr.LoS.Constant.BOUNDARY_TYPE.NULL;
    }

}
ssr.LoS.Data.BoundaryNull = ssrLoSDataBoundaryNull;

/**
 * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
 */
// /****************************************************************************
//  Copyright (c) 2017-2018 SuperSuRaccoon
//  
//  Site: http://www.supersuraccoon-cocos2d.com
//  Mail: supersuraccoon@gmail.com
// 
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
// 
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
// 
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//  THE SOFTWARE.
//  ****************************************************************************/
// 
// const ssr = require('../namespace/SSRLoSNamespace'); 
// const Boundary = require('./SSRLoSDataBoundary');
// 
// /**
//  * ssr.LoS.Data.BoundaryNull
//  * @class
//  * @extends ssr.LoS.Data.Boundary
//  */
// ssr.LoS.Data.BoundaryNull = cc.Class( /** @lends ssr.LoS.Data.BoundaryNull# */ {
// 	name: "ssr.LoS.Data.BoundaryNull",
//     "extends": Boundary,
//     /**
//      * The constructor
//      * @function
//      */
//     constructor:function() {
//         this._type = ssr.LoS.Constant.BOUNDARY_TYPE.NULL;
//     }
// });
