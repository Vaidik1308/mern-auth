// import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import {useDispatch} from 'react-redux'
import { signInSuccess } from '../redux/user/UserSlice'

const OAuth = () => {
    const dispatch = useDispatch()
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth,provider);
            const res = await fetch(`/api/auth/google`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name:result.user.displayName,
                    email:result.user.email,
                    profileImg:result.user.photoURL
                })
            })

            const data = await res.json()
            console.log(data);
            
            dispatch(signInSuccess(data))
            
        } catch (error) {
            console.log("error in login with google");
            
        }
    }
  return (
    <button onClick={() => handleGoogleClick()} className='bg-white drop-shadow-lg py-1 px-3 rounded-lg w-full  flex items-center gap-2   duration-300 justify-center self-end group' >
        <span className='flex justify-center items-center'>
            Continue with Google
        </span>
        <FcGoogle/>
    </button>
  )
}

export default OAuth