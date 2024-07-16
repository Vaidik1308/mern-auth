import React, { FormEvent, useState } from 'react'
import {FaRegEyeSlash, FaRegEye ,FaLocationArrow } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { signUp } from '../utils'
import { RiErrorWarningLine } from 'react-icons/ri'
import { SiTicktick } from 'react-icons/si'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import OAuth from '../components/OAuth'

const SignUp = () => {
  const [showPassword,setShowPassword] = useState(false)
  const [email,setEmail] = useState("")
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [isLoading,setIsLoading] = useState<boolean | undefined>(undefined)
  const [status,setStatus] = useState<{success:boolean | undefined,message:string}>({
    success:undefined,
    message:"",
  })

  const navigate = useNavigate()


  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({
      email,
      password,
      username
    });
    const user = await signUp({email,setIsLoading,password,username})
    
    setStatus({...status,success:user.success,message:user.message})
    if(user.success){
      setEmail("")
      setPassword("")
      setUsername("")
      navigate("/sign-in")
    }
  }
  return (
    <div className=' w-full flex justify-center items-center min-h-screen'>
        <div className='p-2 min-h-[50vh] w-1/3 shadow-lg rounded-lg'>
          <h2 className='text-xl font-bold uppercase text-left pl-4 border-b-[1px] border-solid pb-2 w-fit '>Sign Up</h2>
          <form onSubmit={handleSubmit} className='w-2/3 mx-auto p-2 my-2 mt-4 flex flex-col gap-4' action="">
            <div className='flex flex-col gap-1'>
              <label className='text-lg font-medium' htmlFor="username">
                Username
              </label>
              <input 
                type="username" 
                placeholder='ex. abhay' 
                name="username" 
                id="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='p-1 px-4 outline-none border-solid border-[1px] border-gray-500 rounded-lg'
              />
            </div>
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
                className='p-1 px-4 outline-none  border-solid border-[1px] border-gray-500 rounded-lg'
              />
              <span className='absolute right-2 bottom-8'>
                {showPassword ? <FaRegEye className='duration-300  ' onClick={() => setShowPassword(prev => !prev)} /> : <FaRegEyeSlash onClick={() => setShowPassword(prev => !prev)} className='duration-300'/>}
              </span>
              <Link to={"/sign-in"} className='text-blue-500 underline text-sm'>Already a registered, log in</Link>
            </div>

            <div className='w-full flex justify-end items-center'>
              <button className='bg-blue-400 text-white p-2 px-3 rounded-lg w-full uppercase flex items-center gap-2 hover:bg-black  duration-300 justify-center self-end group' >
                <span className='flex justify-center items-center'>
                  Sign Up
                </span>
                {
                  isLoading ? (
                    <AiOutlineLoading3Quarters className='animate-spin' size={22}/>
                  ) : (
                    <FaLocationArrow className='group-hover:rotate-45 duration-300'/>
                  )
                }
              </button>
            </div>
            <div className='w-full flex justify-end items-center'>
              <OAuth/>
            </div>
            {status.success === true && !isLoading && (
                <div className='bg-green-100 text-green-500 p-2 rounded-lg flex flex-row-reverse items-center gap-2'>
                  <span className={`w-full `}>{status.message}</span>
                  <SiTicktick />
                </div>
              )
            }
            {status.success === false && !isLoading  && (
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

export default SignUp