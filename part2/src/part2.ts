/* 2.1 */

export const MISSING_KEY = '___MISSING___' 

type PromisedStore<K, V> = {
    get(key: K): Promise<V>,
    set(key: K, value: V): Promise<void>,
    delete(key: K): Promise<void>
}


 export function makePromisedStore<K, V>(): PromisedStore<K, V> {
     let map = new Map()
     return {
         get(key: K) {
            return map.has(key)? Promise.resolve(map.get(key)) : Promise.reject(MISSING_KEY)
         },
         set(key: K, value: V) {
            map = map.set(key, value)
            return Promise.resolve()
     } ,
         delete(key: K) {
            return map.delete(key)? Promise.resolve() : Promise.reject(MISSING_KEY)
        },
    }
 }

 export function getAll<K, V>(store: PromisedStore<K, V>, keys: K[]): Promise<V[]> | Promise<void> {
    return Promise.all(keys.map((key)=>store.get(key)));

 }

/* 2.2 */

// ??? (you may want to add helper functions here)

export async function checkValue<T,R>(store:PromisedStore<T,R>, param:T):Promise<R> {
         return await store.get(param); 
}


 export function asycMemo<T, R>(f: (param: T) => R): (param: T) => Promise<R> {
    let store = makePromisedStore<T,R>();
     let ans:(param:T) =>Promise<R> = (param:T) => {
         return checkValue(store, param).then((val:R)=>val, ()=>{
             let result:R = f(param);
             store.set(param,result);
             return result;
         })
     }
     return ans
 }

/* 2.3 */

 export function lazyFilter<T>(genFn: () => Generator<T>, filterFn:(param:T)=>boolean): ()=> Generator<T> {
    function* func() {
        for( let v of genFn()){
            if(filterFn(v)) yield v
        }
    } 
    return func;
 }

 export function lazyMap<T, R>(genFn: () => Generator<T>, mapFn: (param:T)=>R): ()=> Generator<R> {
   function* func() {
       for (let v of genFn()){
           yield mapFn(v);
       }
   }
    return func;

 }

/* 2.4 */
// you can use 'any' in this question

 export async function asyncWaterfallWithRetry(fns: [() => Promise<any>, (x:any)=>Promise<any>[]]): Promise<any> {
     fns[0]().then((x: any)=> recWaterfall(fns[1], 0, 0, x), ()=> {
         let p = Promise.resolve(())
         setTimeout(p.then,2000)
 }

 export async function recWaterfall(fns: (x:any)=>Promise<any>[], i: number, numOfFails: number, x:any): Promise<any> {
     return i===0
 }