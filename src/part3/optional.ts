/* Question 1 */

interface some<T>{
    tag : "Some";
    value : T;
}

interface none<T>{
    tag : "None";
}

export type Optional<T> = some<T> | none<T>;

export const makeSome = <T>(val: T): some<T> => ({ tag: "Some", value: val});
export const makeNone = <T>(): none<T> => ({ tag: "None" });;

export const isSome = <T>(x: any): x is some<T> => x.tag === "Some";
export const isNone = <T>(x: any): x is none<T> => x.tag === "None";

/* Question 2 */
export const bind = <T, U>(Opt: Optional<T>, f: (x: T) => Optional<U>): Optional<U> => {
    if(isSome(Opt)){
        return f(Opt.value);
    }
        return makeNone();
};