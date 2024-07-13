import React, { useState } from 'react'
import {FaRegEyeSlash, FaRegEye ,FaLocationArrow } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const SignUp = () => {
  const [showPassword,setShowPassword] = useState(false)
  return (
    <div className=' w-full flex justify-center items-center min-h-screen'>
        <div className='p-2 min-h-[50vh] w-1/3 shadow-lg rounded-lg'>
          <h2 className='text-xl font-bold uppercase text-left pl-4 border-b-[1px] border-solid pb-2 w-fit '>Sign Up</h2>
          <form className='w-2/3 mx-auto p-2 my-2 mt-4 flex flex-col gap-4' action="">
            <div className='flex flex-col gap-1'>
              <label className='text-lg font-medium' htmlFor="username">
                Username
              </label>
              <input 
                type="username" 
                placeholder='ex. abhay' 
                name="username" 
                id="username" 
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
                className='p-1 px-4 outline-none  border-solid border-[1px] border-gray-500 rounded-lg'
              />
              <span className='absolute right-2 bottom-8'>
                {showPassword ? <FaRegEye className='duration-300  ' onClick={() => setShowPassword(prev => !prev)} /> : <FaRegEyeSlash onClick={() => setShowPassword(prev => !prev)} className='duration-300'/>}
              </span>
              <Link to={"/sign-in"} className='text-blue-500 underline text-sm'>Already a registered, log in</Link>
            </div>

            <div className='w-full flex justify-end items-center'>
              <button className='bg-blue-400 text-white p-1 px-3 rounded-lg w-1/3 flex items-center gap-2 hover:bg-black  duration-300 justify-center self-end group' >
                <span className='flex justify-center items-center'>
                  Sign Up
                </span>
                <FaLocationArrow className='group-hover:rotate-45 duration-300'/>
              </button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default SignUp