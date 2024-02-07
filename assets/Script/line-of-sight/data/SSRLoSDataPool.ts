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
* @classdesc Object pool support for storing data.
* @class
* @extends cc.Class
* @prop {Object.<Number, Object>}         pool                      - Object pool
*/
/**
* The constructor
* @function
*/
/**
* Generate id for instance
* @function
* @return {Number}
*/
/**
* Put object into the pool.
* @function
* @param {Object} obj
*/
/**
* If the given class has unused object in the pool.
* @function
* @param {cc.Class} objClass
* @return {Boolean}
*/
/**
* Remove object from the pool.
* @function
* @param {Object} obj
*/
/**
* Get an object from the pool with the given Class type.
* @function
* @param {cc.Class} objClass
*/
/**
* Rest the pool.
* @function
*/
import { _decorator } from 'cc';
import ssr from '../namespace/SSRLoSNamespace';
const { ccclass, property } = _decorator;

@ccclass('ssrLoSDataPool')
export class ssrLoSDataPool {
    _pool!: {};

    constructor() {
        this._pool = {};
    }

    getNewID() {
        return ssr.LoS.Data.Pool.id++;
    }

    put(obj: any) {
        let pid = obj.constructor.prototype['__pid'];
        if (!pid) {
            let desc = { writable: true, enumerable: false, configurable: true, value: 0 };
            desc.value = this.getNewID();
            Object.defineProperty(obj.constructor.prototype, '__pid', desc);
        }
        if (!this._pool[pid]) {
            this._pool[pid] = [];
        }
        this._pool[pid].push(obj);
    }

    has(objClass: any) {
        let pid = objClass.prototype['__pid'];
        let list = this._pool[pid];
        if (!list || list.length === 0) {
            return false;
        }
        return true;
    }

    remove(obj: any) {
        let pid = obj.constructor.prototype['__pid'];
        if (pid) {
            let list = this._pool[pid];
            if (list) {
                for (let i = 0; i < list.length; i++) {
                    if (obj === list[i]) {
                        list.splice(i, 1);
                    }
                }
            }
        }
    }

    get(objClass: any) {
        if (this.has(objClass)) {
            let pid = objClass.prototype['__pid'];
            let list = this._pool[pid];
            let args = Array.prototype.slice.call(arguments);
            args.shift();
            let obj = list.pop();
            return obj;
        }
    }

    reset() {
        this._pool = {};
    }

}

ssr.LoS.Data.Pool = ssrLoSDataPool;
ssr.LoS.Data.Pool.id = (0 | (Math.random() * 998));
ssr.LoS.Data.Pool.instanceId = (0 | (Math.random() * 998));
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
// 
// /**
//  * @classdesc Object pool support for storing data.
//  * @class
//  * @extends cc.Class
//  * @prop {Object.<Number, Object>}         pool                      - Object pool
//  */
// ssr.LoS.Data.Pool = cc.Class( /** @lends ssr.LoS.Data.Pool# */ {
//     name: "ssr.LoS.Data.Pool",
//     "extends": cc.Object,
//     /**
//      * The constructor
//      * @function
//      */
//     constructor:function() {
//         this._pool = {};
//     },
//     /**
//      * Generate id for instance
//      * @function
//      * @return {Number} 
//      */
//     getNewID:function () {
//         return ssr.LoS.Data.Pool.id ++;
//     },
//     /**
//      * Put object into the pool.
//      * @function
//      * @param {Object} obj
//      */
//     put: function (obj) {
//         let pid = obj.constructor.prototype['__pid'];
//         if (!pid) {
//             let desc = {writable: true, enumerable: false, configurable: true};
//             desc.value = this.getNewID();
//             Object.defineProperty(obj.constructor.prototype, '__pid', desc);
//         }
//         if (!this._pool[pid]) {
//             this._pool[pid] = [];
//         }
//         this._pool[pid].push(obj);
//     },
//     /**
//      * If the given class has unused object in the pool.
//      * @function
//      * @param {cc.Class} objClass
//      * @return {Boolean}
//      */
//     has: function (objClass) {
//         let pid = objClass.prototype['__pid'];
//         let list = this._pool[pid];
//         if (!list || list.length === 0) {
//             return false;
//         }
//         return true;
//     },
//     /**
//      * Remove object from the pool.
//      * @function
//      * @param {Object} obj
//      */
//     remove: function (obj) {
//         let pid = obj.constructor.prototype['__pid'];
//         if (pid) {
//             let list = this._pool[pid];
//             if (list) {
//                 for (let i = 0; i < list.length; i++) {
//                     if (obj === list[i]) {
//                         list.splice(i, 1);
//                     }
//                 }
//             }
//         }
//     },
//     /**
//      * Get an object from the pool with the given Class type.
//      * @function
//      * @param {cc.Class} objClass
//      */
//     get: function (objClass) {
//         if (this.has(objClass)) {
//             let pid = objClass.prototype['__pid'];
//             let list = this._pool[pid];
//             let args = Array.prototype.slice.call(arguments);
//             args.shift();
//             let obj = list.pop();
//             return obj;
//         }
//     },
//     /**
//      * Rest the pool.
//      * @function
//      */
//     reset: function () {
//         this._pool = {};
//     }
// });
// 
// ssr.LoS.Data.Pool.id = (0|(Math.random()*998));
// ssr.LoS.Data.Pool.instanceId = (0|(Math.random()*998));
