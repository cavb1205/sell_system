import React,{createContext,useContext,useState,useEffect} from 'react'
import { AportesContext } from './AportesContext'
import { AuthContext } from './AuthContext'

const TiendaProvider = ({children}) => {
    let {user,token,logoutUser} = useContext(AuthContext) 
    const {aportes} = useContext(AportesContext)
    
    const [tienda, setTienda] = useState([])
    const [loading, setLoading] = useState(true)
    

    useEffect(()=>{
        if(user){
          getTienda();
        }else{
          logoutUser();
        }
    },[user])

    useEffect(()=>{
        getTienda();
    },[aportes])
 
  const getTienda = async () => {
    let response = await fetch('http://localhost:8000/tiendas/detail/',{
      method:'GET',
      headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
      }
    })
    let data = await response.json();
    if(response.status===200){
        setTienda(data);
        setLoading(false)
    }else if(response.statusText == 'Unauthorized'){
        logoutUser()
    }
  }

    const contextData = {
        tienda,
        loading,

    }
  return (
    <TiendaContext.Provider value={contextData}>
        {children}
    </TiendaContext.Provider>
  )
}


export const TiendaContext = createContext();
export default TiendaProvider;
