import * as R from 'ramda'
/* Question 1 */

export const partition =<T> (pred : ((x:T) => Boolean) ,elements : T[]) : T[][] =>
     [elements.filter(x => pred(x)),elements.filter(x=>! pred(x))];

/* Question 2 */
export const mapMat = <T> (pred : ((x:T)=> T ),elements :T[][]) : T[][] => 
    elements.map(x => x.map(y => pred(y)));

/* Question 3 */
export const composeMany =<T> (array :Array<((x:T) =>T)>) : ((x:T)=>T) =>
    array.reduce((acc,cur)=> R.compose(acc,cur),);

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

export const maxSpeed = (pokedex : Pokemon[]) : Pokemon[] =>{    //finding maxSpeed
    let fastAndFurious : Number = pokedex.reduce((maxSpeed:Number,pikachu :Pokemon) =>
    (pikachu.base.Speed>maxSpeed)? maxSpeed=pikachu.base.Speed :maxSpeed,0 );

    return pokedex.filter(x =>x.base.Speed==fastAndFurious);   //return array of fastest
}

export const grassTypes = (pokedex: Pokemon[]) : string[] =>{
    let names : Pokemon[] =pokedex.filter(x=> x.type.includes("Grass"));
    return names.map(x => (x.name.english)).sort();
}

export const uniqueTypes = (pokedex : Pokemon[]) : string[] =>{
    let types :string[][] = pokedex.map(x => x.type);
    let flatTypes :string[] = types.reduce((acc,cur)=> acc.concat(cur),[]);
    return flatTypes.reduce((acc : string[],cur )=> acc.includes(cur) ? 
    acc :acc.concat(cur) ,[]).sort();
}
