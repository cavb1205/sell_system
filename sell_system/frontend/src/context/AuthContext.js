import React, { createContext, useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';


export const AuthContext = createContext();


const AuthProvider = ({children}) => {

    
    const [token, setToken] = useState(localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')): null)
    const [refresh,setRefresh] = useState(localStorage.getItem('refresh') ? JSON.parse(localStorage.getItem('refresh')): null)
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): null)
    const [loading, setLoading] = useState(true)


    const navigate = useNavigate()

    const loginUser = async (e) => {
        e.preventDefault()
        console.log('enviando formulario')
        const response = await fetch('http://localhost:8000/login/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({'username':e.target.username.value,'password':e.target.password.value})

        })
        const data = await response.json()
        if(response.status === 200){
            console.log(data)
            
            setToken(data.token)
            setRefresh(data.refresh)
            setUser(data.user)
            localStorage.setItem('token', JSON.stringify(data.token))
            localStorage.setItem('refresh', JSON.stringify(data.refresh))
            localStorage.setItem('user', JSON.stringify(data.user))
            navigate("/")
        }else{
            alert('Algo salio mal...')
        }
    }


    const logoutUser = () => {
        setToken(null)
        setRefresh(null)
        setUser(null)
        localStorage.removeItem('token')
        localStorage.removeItem('refresh')
        localStorage.removeItem('user')
        navigate("/login/")
    }

    const updateToken = async () => {
        console.log('ingresa al updatetoken')
        let response = await fetch('http://localhost:8000/token/refresh/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':refresh})
        })
        const data = await response.json()
        if (response.status === 200){
            setToken(data.access)
            localStorage.setItem('token', JSON.stringify(data.access))
        } else {
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    let contextData = {
       loginUser:loginUser,
       logoutUser:logoutUser,
       token:token,
       refresh:refresh,
       user:user,
       navigate:navigate
    }


    useEffect(()=>{
        if(loading){
            updateToken()
        }
        let minutes = 4
        let calc_time = 1000 * 60 * minutes
        let interval =setInterval(()=>{
            if(token){
                updateToken()
            } else{
                navigate('/login/')
            }
        },calc_time)
        return () => clearInterval(interval)
    },[token,loading])


    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}



export default AuthProvider;