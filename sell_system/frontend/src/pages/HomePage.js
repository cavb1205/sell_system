import React,{useContext,useEffect,useState} from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from '../context/AuthContext'

const HomePage = () => {
  let {user,token,logoutUser,navigate} = useContext(AuthContext) 
  const [tienda, setTienda] = useState([])
  
  useEffect(()=>{
    getTienda();
  },[])

  const getTienda = async () => {
    let response = await fetch('/tiendas/detail/',{
      method:'GET',
      headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
      }
    })
    let data = await response.json();
    if(response.status===200){
        setTienda(data);
    }else if(response.statusText == 'Unauthorized'){
        logoutUser()
    }
  }
  if(!user){
    navigate('/login') 
  }
  
  return (
    <div className='container-fluid'>
      <div className="card text-center">
        <div className="card-header">
          Informaión Básica
        </div>
        <div className="card-body">
          <h5 className="card-title">{tienda.nombre}</h5>
          <p className="card-text">Ciudad: {tienda.ciudad}</p>
          <p className="card-text">Teléfono: {tienda.telefono}</p>
          
          <p className="card-text">Caja: {tienda.caja}</p>
          
          
        </div>
        <div className="card-footer text-muted">
          Fecha Registro {tienda.fecha_registro}
        </div>
      </div>

    </div>
  )
}

export default HomePage