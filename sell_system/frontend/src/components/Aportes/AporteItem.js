import React,{useEffect, useState, useContext} from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import UpdateButton from '../../utils/UpdateButton';
import DeleteButton from '../../utils/DeleteButton';
import AporteItemUpdate from './AporteItemUpdate';

const AporteItem = () => {
  const {token,logoutUser,navigate} = useContext(AuthContext)
  const [aporte, setAporte] = useState({})
  const [actualizar,setActualizar] = useState(false)
  
  const params = useParams();
  const aporteId = params.aporteId
  

  useEffect(()=>{
    getAporte()
  },[aporteId])

  const getAporte = async () => {
    let response = await fetch(`/aportes/${aporteId}/`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      },
    })
    let data = await response.json();
    if (response.status === 200){
      setAporte(data);
    }else if(response.statusText == 'Unauthorized'){
      logoutUser()
    }
  }

  return (
    <div class="card w-50">
      <div class="card-body">
        <h5 class="card-title">Aporte #{aporte.id}</h5>
        <p class="card-text">Fecha: {aporte.fecha}</p>
        <p class="card-text">Valor: {aporte.valor}</p>
        <p class="card-text">Aportante: {aporte.trabajador}</p>
        <Link to={`/aportes/${aporte.id}/update/`}><UpdateButton/></Link>
        <Link to={`/aportes/${aporte.id}/delete/`}><DeleteButton/></Link>
      </div>
    </div>
  )
}

export default AporteItem;


