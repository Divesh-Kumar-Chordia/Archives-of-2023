import {React,useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Teacher from './Teacher';
import Login from './Login';

export default function Authchecker() {
    const navigate=useNavigate()
    const [authenticated, setAuthenticated] = useState(false);
    useEffect(() => {
        const checkAuth = async () => {
            {
                const user=localStorage.getItem('user')
                if(user==="admin")
                    setAuthenticated(true)
            }
        };
    
        checkAuth();
      }, [navigate]);
  return (
    <>
     
     {authenticated ? <Teacher/> : <Login/>}
    </>
   
  )
}
