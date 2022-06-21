import React,{useState, useContext} from 'react';
import { AuthContext } from '../../context/AuthContext';


const AporteCreate = () => {
    const {user,token,navigate,logoutUser} = useContext(AuthContext)
    const [newAporte, setNewAporte] = useState({})

    const aporteCreateItem = async (event)=>{
        event.preventDefault()
        console.log('ingresamos a la funcion crear aporte item')
        
        const response = await fetch('http://localhost:8000/aportes/create/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`,
            },
            body: JSON.stringify({
                'fecha':event.target.fecha.value,
                'valor':event.target.valor.value,
                'comentario':event.target.comentario.value,
                'trabajador':event.target.trabajador.value,
                
                
            })
            
        })
        const data = await response.json()
        if (response.status === 200){
            console.log('status ok enviado con exito codigo 200')
            navigate('/aportes/')
        }else if(response.statusText == 'Unauthorized'){
            logoutUser()
        }else{
            alert('Informacion erronea en el formulario')
        }
    }
  return (
    <div className='container-fluid'>
        <h2>Nuevo Aporte</h2>
        <form onSubmit={aporteCreateItem} className='form-floating'>
            <div className='mb-3'>
                <label for="floatingInput">Fecha</label>
                <input  name='fecha' type="date" className="form-control" id="floatingInput" placeholder="fecha" />
                
            </div>
            <div className='mb-3'>
                <label for="floatingInput">Valor</label>
                <input  name='valor' type="number" className="form-control" id="floatingInput" placeholder="valor" />
            </div>
            <div className='mb-3'>
                <label for="floatingInput">Comentario</label>
                <input  name='comentario' type="text" className="form-control" id="floatingInput" placeholder="" />
            </div>
            <div className='mb-3'>
                <label for="floatingInput">Aportante</label>
                <input  name='trabajador' type="number" className="form-control" id="floatingInput" placeholder="Quien aporta el dinero" />
            </div>
            <div className='mb-3'>
                <button type="submit" class="btn btn-success">Crear Aporte</button>
            </div>
            
        </form>

    </div>
  )
}

export default AporteCreate