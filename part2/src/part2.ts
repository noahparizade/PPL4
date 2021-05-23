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
//
// export function asycMemo<T, R>(f: (param: T) => R): (param: T) => Promise<R> {
//     ???
// }

/* 2.3 */

// export function lazyFilter<T>(genFn: () => Generator<T>, filterFn: ???): ??? {
//     ???
// }

// export function lazyMap<T, R>(genFn: () => Generator<T>, mapFn: ???): ??? {
//     ???
// }

/* 2.4 */
// you can use 'any' in this question

// export async function asyncWaterfallWithRetry(fns: [() => Promise<any>, ...(???)[]]): Promise<any> {
//     ???
// }