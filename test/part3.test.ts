import { expect } from "chai";
import * as R from 'ramda'
import { Optional } from "../src/part3/optional"
import { makeNone } from "../src/part3/optional"
import { makeSome } from "../src/part3/optional"
import { isSome } from "../src/part3/optional"
import { isNone } from "../src/part3/optional"
import { bind } from "../src/part3/optional"
import { Result,bind1 } from "../src/part3/result"
import { monadicValidateUser } from "../src/part3/result"
import { naiveValidateUser,isOk,isFailure,makeFailure,makeOk } from "../src/part3/result"
const safeDiv = (x: number, y: number): Optional<number> =>
    y === 0 ? makeNone() : makeSome(x / y);
const div10 = (y: number): Optional<number> =>
    y === 0 ? makeNone() : makeSome(10 / y);

describe("make Some/None", () => {
    it("composes many functions", () => {

        expect(safeDiv(5, 0)).to.deep.equal({ tag: "None" });
    })
    it("composes many functions", () => {

        expect(safeDiv(5, 2)).to.deep.equal({ tag: "Some", value: 2.5 });
    })

});

describe("bind", () => {
    it("composes many functions", () => {
        expect(bind(safeDiv(5, 0), div10)).to.deep.equal({ tag: "None" });
    })
    it("composes many functions", () => {
        expect(bind(safeDiv(5,2), div10)).to.deep.equal({ tag: "Some",value:4 });
    })
});

describe("is Some/None", () => {
    it("checks type of None if is Some", () => {

        expect(isSome(safeDiv(5, 0))).to.equal(false);
    })
    it("checks type of Some if is Some", () => {

        expect(isSome(safeDiv(5, 2))).to.equal(true);
    })
    it("checks type of None if is None", () => {

        expect(isNone(safeDiv(5, 0))).to.equal(true);
    })
    it("checks type of some if is none", () => {

        expect(isNone(safeDiv(5, 2))).to.equal(false);
    })
    it("checks type of number", () => {

        expect(isNone(3)).to.equal(false);
    })
    it("checks type of number", () => {

        expect(isSome(3)).to.equal(false);
    })
})
const user1 = { name: "Ben", email: "bene@post.bgu.ac.il", handle: "bene" };
const user2 = { name: "Bananas", email: "me@bananas.com", handle: "bene" };
const user3 = { name: "yuval", email: "me@bananas.com", handle: "bene" };
const user4 = { name: "yuval", email: "me@bananas.com", handle: "" };
const user5 = { name: "yuval", email: "me@gmail.com", handle: "" };
const user6 = { name: "yuval", email: "me@gmail.com", handle: "@jubelsM" };

describe("monadic validate user", () => {
    it("validates user data with bind", () => {
        expect(monadicValidateUser(user1)).to.deep.equal({
            tag: 'Ok',
            value: {
                name: 'Ben',
                email: 'bene@post.bgu.ac.il',
                handle: 'bene'
            }
        })
    })

    it("validates user data with bind", () => {
        expect(monadicValidateUser(user2)).to.deep.equal({
            tag: 'Failure',
            message: 'Bananas is not a name'
        })
    })
    it("validates user data with bind", () => {
        expect(monadicValidateUser(user3)).to.deep.equal({
            tag: 'Failure',
            message: "Domain bananas.com is not allowed"
        })
    })
    it("validates user data with bind", () => {
        expect(monadicValidateUser(user4)).to.deep.equal({
            tag: 'Failure',
            message: "Domain bananas.com is not allowed"
        })
    })
    it("validates user data with bind", () => {
        expect(monadicValidateUser(user5)).to.deep.equal({
            tag: 'Failure',
            message: "Handle cannot be empty"
        })
    })
    it("validates user data with bind", () => {
        expect(monadicValidateUser(user6)).to.deep.equal({
            tag: 'Failure',
            message: "This isn't Twitter"
        })
    })
})

describe("naive validate user", () => {
    it("validates user1 data  naively", () => {
        expect(naiveValidateUser(user1)).to.deep.equal({
            tag: 'Ok',
            value: {
                name: 'Ben',
                email: 'bene@post.bgu.ac.il',
                handle: 'bene'
            }
        })
    })

    it("validates user2 data naively", () => {
        expect(naiveValidateUser(user2)).to.deep.equal({
            tag: 'Failure',
            message: 'Bananas is not a name'
        })
    })

    it("validates user3 data naively", () => {
        expect(naiveValidateUser(user3)).to.deep.equal({
            tag: 'Failure',
            message: "Domain bananas.com is not allowed"
        })
    })
    it("validates user6 data naively", () => {
        expect(naiveValidateUser(user6)).to.deep.equal({
            tag: 'Failure',
            message: "This isn't Twitter"
        })
    })})
const square = (x: number): Optional<number> => makeSome(x*x);
const half = (x: number): Optional<number> => makeSome(x/2);
const divideTenByMe = (x:number): Optional<number> => x===0? makeNone() : makeSome(10/x);
const numToString = (x: number): Optional<string> => x%2==0? makeSome("even") : makeSome("odd");
const f1 = (x: User): Result<User> => makeOk({name: x.name, email: x.email, handle: "ABC"});
const f2 = (x: User): Result<string> => makeOk("Adler is the king!");
const validateName = (user: User): Result<User> =>
    user.name.length === 0 ? makeFailure("Name cannot be empty") :
    user.name === "Bananas" ? makeFailure("Bananas is not a name") :
    makeOk(user);

const validateEmail = (user: User): Result<User> =>
    user.email.length === 0 ? makeFailure("Email cannot be empty") :
    user.email.endsWith("bananas.com") ? makeFailure("Domain bananas.com is not allowed") :
    makeOk(user);

const validateHandle = (user: User): Result<User> =>
    user.handle.length === 0 ? makeFailure("Handle cannot be empty") :
    user.handle.startsWith("@") ? makeFailure("This isn't Twitter") :
    makeOk(user);

interface User {
    name: string;
    email: string;
    handle: string;
}

describe("Assignment 1 Part 3", () => {
    it("makeSome1", () => {
        expect (makeSome(10)).to.deep.equal({tag: "Some", value: 10})
    });
    it("makeSome2", () => {
        expect (makeSome("Alon")).to.deep.equal({tag: "Some", value: "Alon"})
    });
    it("makeNone", () => {
        expect (makeNone()).to.deep.equal({tag: "None"})
    });
    it("isSome1", () => {
        expect (isSome({tag: "Some", value: "Alon"})).to.deep.equal(true)
    });
    it("isSome2", () => {
        expect (isSome({tag: "None"})).to.deep.equal(false)
    });
    it("isSome3", () => {
        expect (isSome(10)).to.deep.equal(false)
    });
    it("isNone1", () => {
        expect (isNone({tag: "None"})).to.deep.equal(true)
    });
    it("isNone2", () => {
        expect (isNone({tag: "Some", value: "Alon"})).to.deep.equal(false)
    });
    it("isNone3", () => {
        expect (isNone(10)).to.deep.equal(false)
    });
    it("OptionalBind1",()=>{
        expect (bind(makeSome(10),square)).to.deep.equal({tag:"Some", value:100})
    });
    it("OptionalBind2",()=>{
        expect (bind(makeSome(10),divideTenByMe)).to.deep.equal({tag:"Some", value:1})
    });
    it("OptionalBind3",()=>{
        expect (bind(makeSome(0),divideTenByMe)).to.deep.equal({tag:"None"})
    });
    it("OptionalBind4",()=>{
        expect (bind(makeNone(),half)).to.deep.equal({tag:"None"})
    });
    it("OptionalBind5",()=>{
        expect (bind(makeSome(4),numToString)).to.deep.equal({tag:"Some", value:"even"})
    });
    it("OptionalBind6",()=>{
        expect (bind(makeSome(5),numToString)).to.deep.equal({tag:"Some", value:"odd"})
    });
    it("makeOk", ()=> {
        expect (makeOk(5)).to.deep.equal({tag: "Ok", value: 5})
    });
    it("makeFailure", ()=> {
        expect (makeFailure("Failed")).to.deep.equal({tag: "Failure", message: "Failed"})
    });
    it("isOk1", ()=> {
        expect (isOk({tag:"Ok", value: 3})).to.deep.equal(true)
    });
    it("isOk2", ()=> {
        expect (isOk({tag:"Failure", message: "failed"})).to.deep.equal(false)
    });
    it("isOk3", ()=> {
        expect (isOk("check")).to.deep.equal(false)
    });
    it("isFailure1", ()=> {
        expect (isFailure({tag: "Failure", message: "failed"})).to.deep.equal(true)
    });
    it("isFailure2", ()=> {
        expect (isFailure({tag:"Ok", value: 3})).to.deep.equal(false)
    });
    it("isFailure3", ()=> {
        expect (isFailure([1, 2])).to.deep.equal(false)
    });
    it("ResultBind1",()=>{
        expect (bind1({tag:"Ok", value: {name: "noam", email: "noam@gmail.com", handle: "abc"}},f1)).to.deep.equal({tag:"Ok", value: {name: "noam", email: "noam@gmail.com", handle: "ABC"}})
    });
    it("ResultBind2",()=>{
        expect (bind1({tag:"Failure", message: "FAILED"},f1)).to.deep.equal({tag:"Failure", message: "FAILED"})
    });
    it("ResultBind3",()=>{
        expect (bind1({tag:"Ok", value: {name: "noam", email: "noam@gmail.com", handle: "abc"}},f2)).to.deep.equal({tag:"Ok", value: "Adler is the king!"})
    });
    it("ResultBind4",()=>{
        expect (bind1({tag:"Ok", value: {name: "", email: "noam@gmail.com", handle: "abc"}},validateName)).to.deep.equal({tag:"Failure", message: "Name cannot be empty"})
    });
    it("ResultBind5",()=>{
        expect (bind1({tag:"Ok", value: {name: "Bananas", email: "noam@gmail.com", handle: "abc"}},validateName)).to.deep.equal({tag:"Failure", message: "Bananas is not a name"})
    });
    it("ResultBind6",()=>{
        expect (bind1({tag:"Ok", value: {name: "noam", email: "noam@gmail.com", handle: "abc"}},validateName)).to.deep.equal({tag:"Ok", value: {name: "noam", email: "noam@gmail.com", handle: "abc"}})
    });
    it("ResultBind7",()=>{
        expect (bind1({tag:"Ok", value: {name: "noam", email: "noam@bananas.com", handle: "abc"}},validateEmail)).to.deep.equal({tag:"Failure", message: "Domain bananas.com is not allowed"})
    });
    it("ResultBind8",()=>{
        expect (bind1({tag:"Ok", value: {name: "", email: "noam@gmail.com", handle: "abc"}},validateEmail)).to.deep.equal({tag:"Ok", value: {name: "", email: "noam@gmail.com", handle: "abc"}})
    });
    it("ResultBind9",()=>{
        expect (bind1({tag:"Ok", value: {name: "noam", email: "noam@gmail.com", handle: "@abc"}},validateHandle)).to.deep.equal({tag:"Failure", message: "This isn't Twitter"})
    });
    it("ResultBind10",()=>{
        expect (bind1({tag:"Ok", value: {name: "noam", email: "noam@bananas.com", handle: "abc"}},validateHandle)).to.deep.equal({tag:"Ok", value: {name: "noam", email: "noam@bananas.com", handle: "abc"}})
    });
    it("ResultBind11",()=>{
        expect (naiveValidateUser({name: "noam", email: "noam@gmail.com", handle: "abc"})).to.deep.equal({tag:"Ok", value: {name: "noam", email: "noam@gmail.com", handle: "abc"}})
    });
    it("ResultBind12",()=>{
        expect (naiveValidateUser({name: "Bananas", email: "noam@gmail.com", handle: "abc"})).to.deep.equal({tag:"Failure", message: "Bananas is not a name"})
    });
    it("ResultBind13",()=>{
        expect (naiveValidateUser({name: "noam", email: "", handle: "abc"})).to.deep.equal({tag:"Failure", message: "Email cannot be empty"})
    });
    it("ResultBind14",()=>{
        expect (naiveValidateUser({name: "noam", email: "noam@gmail.com", handle: "@abc"})).to.deep.equal({tag:"Failure", message: "This isn't Twitter"})
    });
    it("ResultBind15",()=>{
        expect (monadicValidateUser({name: "noam", email: "noam@gmail.com", handle: "abc"})).to.deep.equal({tag:"Ok", value: {name: "noam", email: "noam@gmail.com", handle: "abc"}})
    });
    it("ResultBind16",()=>{
        expect (monadicValidateUser({name: "Bananas", email: "noam@gmail.com", handle: "abc"})).to.deep.equal({tag:"Failure", message: "Bananas is not a name"})
    });
    it("ResultBind17",()=>{
        expect (monadicValidateUser({name: "noam", email: "", handle: "abc"})).to.deep.equal({tag:"Failure", message: "Email cannot be empty"})
    });
    it("ResultBind18",()=>{
        expect (monadicValidateUser({name: "noam", email: "noam@gmail.com", handle: "@abc"})).to.deep.equal({tag:"Failure", message: "This isn't Twitter"})
    });
});