import { SignUpType } from "../types";

export const signUp = async (data:SignUpType) => {
    const {
        email,
        password,
        username,
        setIsLoading
    } = data
    setIsLoading(true)
    if(!username && !email && !password){
        setIsLoading(false)
        return {
            success:false,
            message:"Please enter all fields"
        }
    }

    try {
        const res = await fetch("/api/auth/new",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        if (!res.ok) {
            const errorData = await res.json();
            setIsLoading(false)
            return {
                success: false,
                message: errorData.message || "Something went wrong"
            };
        }
        
        const user = await res.json();
        setIsLoading(false)
        return {
            success: true,
            message: "User registered successfully",
            user
        };
    } catch (error) {
        console.log(error);
        setIsLoading(false)
        return {
            success: false,
            message: "An error occurred while trying to register"
        };
    }
}