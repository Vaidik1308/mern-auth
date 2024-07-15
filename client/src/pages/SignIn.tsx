import React, { FormEvent, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import {FaRegEyeSlash, FaRegEye ,FaLocationArrow } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { RiErrorWarningLine } from 'react-icons/ri'
import { SiTicktick } from 'react-icons/si'
import { Link, useNavigate } from 'react-router-dom'
import { signIn } from '../utils'
import {signInStart,signInSuccess,signInFailure} from '../redux/user/UserSlice'

import {useDispatch,useSelector} from 'react-redux'
import { RootState } from '../redux/store'

const SignIn = () => {
  const [showPassword,setShowPassword] = useState(false)
  const [password,setPassword] = useState("")
  const [email,setEmail] = useState("")
  // const [status,setStatus] = useState<{success:boolean | undefined,message:string;}>({
  //   success:undefined,
  //   message:"",
  // })
  const dispatch = useDispatch()
  const {loading,status} = useSelector((state:RootState) => state.user)
  const navigate = useNavigate()

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({
      email,
      password,
    });



    // setIsLoading(true)
    dispatch(signInStart())
    const user = await signIn({email,password})
    
    // setStatus({...status,success:user.success,message:user.message})
    if(user.success){
      dispatch(signInSuccess(user.user))
      setEmail("")
      setPassword("")
      navigate("/")
    }
    dispatch(signInFailure({success:user.success,message:user.message}))
  }
  return (
    <div className=' w-full flex justify-center items-center min-h-screen'>
        <div className='p-2 min-h-[50vh] w-1/3 shadow-lg rounded-lg'>
          <h2 className='text-xl font-bold uppercase text-left pl-4 border-b-[1px] border-solid pb-2 w-fit '>Sign In</h2>
          <form onSubmit={handleSubmit} className='w-2/3 mx-auto p-2 my-2 mt-4 flex flex-col gap-4' action="">
            <div className='flex flex-col gap-1'>
              <label className='text-lg font-medium' htmlFor="email">
                Email
              </label>
              <input 
                type="email" 
                placeholder='ex abhay@gmail.com' 
                name="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='p-1 px-4 outline-none border-solid border-[1px] border-gray-500 rounded-lg'
              />
            </div>
            <div className='flex flex-col gap-1 relative'>
              <label className='text-lg font-medium' htmlFor="password">
                Password
              </label>
              <input 
                type={showPassword ? "text" :"password"} 
                name="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='p-1 px-4 outline-none border-solid border-[1px] border-gray-500 rounded-lg'
              />
              <span className='absolute right-2 bottom-8'>
                {showPassword ? <FaRegEye className='duration-300  ' onClick={() => setShowPassword(prev => !prev)} /> : <FaRegEyeSlash onClick={() => setShowPassword(prev => !prev)} className='duration-300'/>}
              </span>
              <Link to={"/sign-up"} className='text-blue-500 underline text-sm'>New here, Register now</Link>
            </div>
            <div className='w-full flex justify-end items-center'>
            <button type='submit' className='bg-blue-400 text-white p-2 px-3 rounded-lg w-full uppercase flex items-center gap-2 hover:bg-black  duration-300 justify-center self-end group' >
                <span className='flex justify-center items-center'>
                  Log in
                </span>
                {
                  loading ? (
                    <AiOutlineLoading3Quarters className='animate-spin' size={22}/>
                  ) : (
                    <FaLocationArrow className='group-hover:rotate-45 duration-300'/>
                  )
                }
              </button>
            </div>
            <div className='w-full flex justify-end items-center'>
              <button className='bg-white drop-shadow-lg p-1 px-3 rounded-lg w-full  flex items-center gap-2   duration-300 justify-center self-end group' >
                <span className='flex justify-center items-center'>
                  Continue with Google
                </span>
                <FcGoogle/>
              </button>
            </div>
            {status?.success === true && !loading && (
                <div className='bg-green-100 text-green-500 p-2 rounded-lg flex flex-row-reverse items-center gap-2'>
                  <span className={`w-full `}>{status.message}</span>
                  <SiTicktick/>
                </div>
              )
            }
            {status?.success === false && !loading  && (
                <div className='text-red-500 flex-row-reverse bg-red-200 p-2 rounded-lg flex gap-2 items-center'>
                  <span className={`w-full  `}>{status.message}</span>
                  <RiErrorWarningLine size={20} />
                </div>
              )
            }
          </form>
        </div>
    </div>
  )
}

export default SignIn