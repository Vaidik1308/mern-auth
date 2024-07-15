export type SignUpType = {
    username:string;
    password:string;
    email:string;
    setIsLoading:React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

export type SignInType = {
    password:string;
    email:string;
}

export type UserInfo = {
    email:string;
    username:string;
    createdAt:string;
    updatedAt:string;
    _id:string;
    __v:number;
    profileImg?:string
}