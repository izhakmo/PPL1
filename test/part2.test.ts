import { expect } from "chai";
import { mapMat } from "C:/Users/izhak/Desktop/PPL/hw1/skeleton/src/part2/part2";
import { partition } from "C:/Users/izhak/Desktop/PPL/hw1/skeleton/src/part2/part2";
import { composeMany } from "C:/Users/izhak/Desktop/PPL/hw1/skeleton/src/part2/part2";
import {maxSpeed} from "C:/Users/izhak/Desktop/PPL/hw1/skeleton/src/part2/part2";
import {grassTypes} from "C:/Users/izhak/Desktop/PPL/hw1/skeleton/src/part2/part2";
import {uniqueTypes} from "C:/Users/izhak/Desktop/PPL/hw1/skeleton/src/part2/part2";

const squareAndHalf = composeMany([(x: number) => x / 2, (x: number) => x * x]);
const add3 = composeMany([(x: number) => x + 1, (x: number) => x + 1, (x: number) => x + 1]);

const Pokedex = [{"id":15, "name": {"english": "NOAME", "japanese": "NOAMJ", "chinese": "NOAMC", "french": "NOAMF"}, "type": ["Grass", "Fire"], "base": {"HP": 97, "Attack": 99, "Defense": 95, "Sp. Attack": 67, "Sp. Defense": 87, "Speed": 105}},
                 {"id":17, "name": {"english": "ALONE", "japanese": "ALONJ", "chinese": "ALONC", "french": "ALONF"}, "type": ["Water", "Fire"], "base": {"HP": 97, "Attack": 99, "Defense": 95, "Sp. Attack": 67, "Sp. Defense": 87, "Speed": 56}},
                 {"id":16, "name": {"english": "AVIE", "japanese": "AVIJ", "chinese": "AVIC", "french": "AVIF"}, "type": [], "base": {"HP": 97, "Attack": 99, "Defense": 95, "Sp. Attack": 67, "Sp. Defense": 87, "Speed": 105}},  
                 {"id":15, "name": {"english": "TOMERE", "japanese": "TOMERJ", "chinese": "TOMERC", "french": "TOMERF"}, "type": ["Grass"], "base": {"HP": 97, "Attack": 99, "Defense": 95, "Sp. Attack": 67, "Sp. Defense": 87, "Speed": 80}}];



describe("Assignment 1 Part 2", () => {
    it("partition", () => {
        expect (partition(((x:any) => x % 2 === 0), [1,2,3,4,5,6,7,8,9])).to.deep.equal([[2, 4, 6, 8], [1, 3, 5, 7, 9]])
    });
    it("mapMat", () => {
        expect (mapMat(((x: any) => x=x*x), [[1, 2, 3], [4, 5, 6], [7, 8, 9]])).to.deep.equal([[1,4,9],[16,25,36],[49,64,81]])
    });
    it("composeMany1", () => {
        expect (squareAndHalf(5)).to.deep.equal(12.5)
    });
    it("composeMany2", () => {
        expect (add3(5)).to.deep.equal(8)
    });
    it("maxSpeed", () => {
        expect (maxSpeed(Pokedex)).to.deep.equal([{"id":15, "name": {"english": "NOAME", "japanese": "NOAMJ", "chinese": "NOAMC", "french": "NOAMF"}, "type": ["Grass", "Fire"], "base": {"HP": 97, "Attack": 99, "Defense": 95, "Sp. Attack": 67, "Sp. Defense": 87, "Speed": 105}},
        {"id":16, "name": {"english": "AVIE", "japanese": "AVIJ", "chinese": "AVIC", "french": "AVIF"}, "type": [], "base": {"HP": 97, "Attack": 99, "Defense": 95, "Sp. Attack": 67, "Sp. Defense": 87, "Speed": 105}}]); 
    });
    it("grassType", () => {
        expect (grassTypes(Pokedex)).to.deep.equal(["NOAME", "TOMERE"])
    });
    it("uniqueTypes", () => {
        expect (uniqueTypes(Pokedex)).to.deep.equal(["Fire", "Grass", "Water"])
    });
});



