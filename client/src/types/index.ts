export type SignUpType = {
    username:string;
    password:string;
    email:string;
    setIsLoading:React.Dispatch<React.SetStateAction<boolean | undefined>>
}
export type SignInType = {
    password:string;
    email:string;
    setIsLoading:React.Dispatch<React.SetStateAction<boolean | undefined>>
}