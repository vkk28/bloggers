import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice'

function LogoutBtn()
{
    const dispatch = useDispatch();
    
    const logoutHandler = () =>{
         const res = authService.logout()
         .then(() =>{
            dispatch(logout())
         })
    }
    
    return (
        <button
        className='inline-bock px-6 py-2 duration-200 text-white hover:text-white  hover:bg-header-hover-color dark:hover:bg-blue-100 rounded-full'
        onClick={logoutHandler}
        >Logout</button>
    )
}

export default LogoutBtn