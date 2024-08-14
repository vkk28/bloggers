import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector} from 'react-redux'

export default function Protected({children,authentication=true}) {
    const navigate = useNavigate();
    const [loader,setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() =>{
        if(authentication &&  authentication !== authStatus)  {
            
            navigate("/login")
        }
        else if(!authentication && authStatus !== authentication){
            
            navigate("/")
        }  
        // console.log("proauthstatus:",authStatus,)
        // console.log("proauthenti:",authentication)
        setLoader(false)
    },[authStatus,authentication,navigate])
    return  loader ? <h1>Loading...</h1> : <>{children}</> 
}
