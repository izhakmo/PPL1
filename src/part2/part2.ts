import * as R from 'ramda'
/* Question 1 */

// export const partition =<T> (pred : ((x:T) => Boolean) ,elements : T[]) =>{
// let a =R.reduce((acc, cur)=> pred(cur)  ? acc.concat(cur) :acc,Array<T>(), elements  );
// let b=R.reduce((acc, cur)=> pred(cur)  ? acc :acc.concat(cur),Array<T>(), elements  );
// return [a,b];}

export const partition =<T> (pred : ((x:T) => Boolean) ,elements : T[]) =>
     [elements.filter(x => pred(x)),elements.filter(x=>! pred(x))];


// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// console.log(partition(x => x % 2 === 0, numbers));

/* Question 2 */
export const mapMat = <T> (pred : ((x:T)=> T ),elements :T[][]) => 
    elements.map(x => x.map(y => pred(y)));


// const mat = [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9]
//     ]
//     console.log(mapMat(x => x * x, mat));

/* Question 3 */
export const composeMany =<T> (array :Array<((x:T) =>T)>) =>
array.reduce((acc,cur)=> R.compose(acc,cur),);
// R.compose(array.map);

// const add3 = composeMany([(x: number) => x *x/2,(x: number) => x + 1, (x: number) => x + 1, (x: number) => x + 1,(x: number) => x / 2, (x: number) => x * x]);
// console.log(add3(10));

// const squareAndHalf = composeMany([(x: number) => x / 2, (x: number) => x * x]);
// console.log(squareAndHalf(5));

/* Question 4 */
interface Languages {
    english: string;
    japanese: string;
    chinese: string;
    french: string;
}

interface Stats {
    HP: number;
    Attack: number;
    Defense: number;
    "Sp. Attack": number;
    "Sp. Defense": number;
    Speed: number;
}

interface Pokemon {
    id: number;
    name: Languages;
    type: string[];
    base: Stats;
}

export const maxSpeed = (pokedex : Pokemon[])=>{    //finding maxSpeed
    let fastAndFurious=pokedex.reduce((maxSpeed:Number,pikachu :Pokemon) =>
    (pikachu.base.Speed>maxSpeed)? maxSpeed=pikachu.base.Speed :maxSpeed,0 );

    return pokedex.filter(x =>x.base.Speed==fastAndFurious);   //return array of fastest
}

export const grassTypes = (pokedex: Pokemon[])=>{
    let names=pokedex.filter(x=> x.type.includes("Grass"));
    return names.map(x => (x.name.english)).sort();
}

// export const uniqueTypes = (pokedex : Pokemon[])=>{
//     let types : Set<String>= pokedex.reduce((acc: Set<String>, pokemon) =>
//     acc.add(pokemon.type)
// }

export const uniqueTypes = (pokedex : Pokemon[])=>{
    let types :string[][] = pokedex.map(x => x.type);
    let flatTypes :string[]= types.reduce((acc,cur)=> acc.concat(cur),[]);
    return flatTypes.reduce((acc : string[],cur )=> acc.includes(cur) ?  acc :acc.concat(cur) ,[]).sort();
}
