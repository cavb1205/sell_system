import React,{useEffect, useState, useContext} from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import HomePage from '../../pages/HomePage';


const AporteItemDelete = () => {
  const {token,logoutUser} = useContext(AuthContext)
  const [aporteDelete, setAporteDelete] = useState({})
  
  const params = useParams();
  const aporteId = params.aporteId
  

  const deleteAporte = async () => {
    let response = await fetch(`/aportes/${aporteId}/delete/`,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      },
    })
    let data = await response.json();
    if (response.status === 200){
      setAporteDelete(data);

    }else if(response.statusText == 'Unauthorized'){
      logoutUser()
    }
  }

  return (
    <div>
        {aporteDelete.message? (
            <div class="alert alert-danger" role="alert">
                {aporteDelete.message}
            <Navigate to="/" />
            </div>
            ):(
            <div className="card border-danger mb-3" >
                <div className="card-body text-danger">
                    <h5 className="card-title">Eliminando Registro {aporteId}</h5>
                    <p className="card-text">Estas seguro de eliminar el registro?</p>
                </div>
                <button onClick={deleteAporte} className="btn btn-danger m-4">Confirmar</button>
                </div>
            
        )
}
</div>
  )
            
}

export default AporteItemDelete