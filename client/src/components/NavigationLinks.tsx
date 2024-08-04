
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const NavigationLinks = () => {
    const {currentUser} = useSelector((state:RootState) => state.user)
  return (
    <>
        <Link className='bg-blue-400 px-6 py-1.5 flex items-center justify-center hover:bg-black duration-300 rounded-lg text-white' to={"/sign-in"}>
            Sign In
        </Link>
        <Link className='text-black bg-gray-200 px-6 py-1.5 flex items-center justify-center hover:bg-black duration-300 rounded-lg hover:text-white' to={"/sign-up"}>
            Sign Up
        </Link>
        <Link className='group' to={"/about"}>
            About
            <div className='bg-black w-[0%]  group-hover:w-full h-[1px] duration-200'/>
        </Link>
        <Link to={"/profile"}>
            <img className='rounded-full size-10 object-cover' src={currentUser ? `${currentUser.profileImg as string}` : "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"} alt="" />
        </Link>
    </>
  )
}

export default NavigationLinks