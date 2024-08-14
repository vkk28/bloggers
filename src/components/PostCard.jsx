import React from 'react'
import appwriteService from "../appwrite/congif"
import {Link} from 'react-router-dom'

function PostCard({$id , title, featuredImage}){
  
   return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-highlight-color rounded-xl p-4 transition-transform duration-300 ease-in-out transform hover:scale-125 hover:shadow-lg'>
        <div className='w-full justify-center mb-4'>
          <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
          className='rounded-xl'/>
        </div>
        <h2
            className='text-xl font-bold'
            >{title}</h2>
      </div>
    </Link>
   )
}


export default PostCard