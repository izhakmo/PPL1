/* Question 3 */

interface ok<T>{
    tag: string,
    value: T
}

interface failure<T>{
    tag: string,
    message: string
}

export type Result<T> = ok<T> | failure<T>;

export const makeOk = <T>(val: T): ok<T> => ({ tag: "Ok", value: val});
export const makeFailure = <T>(msg: string): failure<T> => ({ tag: "Failure", message: msg});

export const isOk = <T>(x: Result<T>): x is ok<T> => x.tag === "Ok";
export const isFailure = <T>(x: Result<T>): x is failure<T> => x.tag != "Ok";;

/* Question 4 */
export const bind = <T, U>(res: Result<T>, f: (x: T) => Result<U>): Result<U> =>{
    if(isOk(res)){
        const okToReturn=f(res.value);
        return okToReturn;
    }
    else if(isFailure(res)){
        return res;
    }
    else return makeFailure("error");
};

/* Question 5 */
interface User {
    name: string;
    email: string;
    handle: string;
}

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

export const naiveValidateUser = (user : User):Result<User>=>{
    const userName=validateName(user);
    const userEmail=validateEmail(user);
    const userHandle=validateHandle(user);
    if(isOk(userName) && isOk(userEmail) && isOk(userHandle)){
        // const tmpName=userName.value.name;
        // const tmpmain=userEmail.value.email;
        // const tmphandle=userHandle.value.handle;
        const userToReturn = {
            name: userName.value.name,
            email: userEmail.value.email,
            handle: userHandle.value.handle
        };
        return makeOk(userToReturn);
        // {
        //     tag: "Ok",
        //     value: {
        //     name: userName.value.name,
        //     email: userEmail.value.email,
        //     handle: userHandle.value.handle
        //     }
        // };
    }
    else if(isFailure(userName)){
        return makeFailure(userName.message);
    }
    else if(isFailure(userEmail)){
        return makeFailure(userEmail.message);
    }
    else if(isFailure(userHandle)){
        return makeFailure(userHandle.message);
    }
    else return makeFailure("damn son!!!!!");
};

export const monadicValidateUser =(user : User): Result<User> =>
    (bind(bind(bind(makeOk(user),validateName),validateEmail),validateHandle));