import React from 'react'
import { Link } from 'react-router-dom'
import NavigationLinks from './NavigationLinks'

const Header = () => {
  return (
    <div className='w-full flex justify-between items-center border-b-[1px] border-solid border-black p-5'>
        <Link to={"/"}>
            <h2 className='font-bold text-2xl uppercase flex items-center gap-2'>
                Auth
                <span className='text-blue-400'>App</span>
            </h2>
        </Link>
        <div className=' hidden md:flex items-center gap-6 font-semibold'>
            <NavigationLinks/>
        </div>
    </div>
  )
}

export default Header