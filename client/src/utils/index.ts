import { SignUpType } from "../types";

export const signUp = async (data:SignUpType) => {
    const {
        email,
        password,
        username
    } = data

    if(!username && !email && !password){
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
            return {
                success: false,
                message: errorData.message || "Something went wrong"
            };
        }
        const user = await res.json();
        return {
            success: true,
            message: "User registered successfully",
            user
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "An error occurred while trying to register"
        };
    }
}