import React,{useState, useContext, useEffect} from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';



const AporteItemUpdate = (props) => {
    
    const {token,navigate,logoutUser} = useContext(AuthContext)
    const [aporte, setAporte] = useState(
        {
            'fecha':'',
            'valor':'',
            'comentario':'',
            'trabajador':''
    })
    
    console.log('ingreso a update-.......')
    
    const params = useParams();
    const aporteId = params.aporteId

    useEffect(()=>{
        getAporte();
    },[])

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
    
    const aporteUpdateItem = async (event) => {
        event.preventDefault()
        const response = await fetch(`/aportes/${aporteId}/update/`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`,
            },
            body: JSON.stringify(aporte)
            
        })
        const data = await response.json()
        if (response.status === 200){
            console.log('status ok enviado con exito codigo 200')
            setAporte(data)
            navigate(`/aportes/${aporteId}/`)
        }else if(response.statusText == 'Unauthorized'){
            logoutUser()
        }else{
            alert('Informacion erronea en el formulario')
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setAporte({ 
            
                ...aporte,
                [name]: value,
           
            
             })
      }

  return (
    <div className='container-fluid'>
    <h2>Actualizar Aporte</h2>
    <form onSubmit={aporteUpdateItem} className='form-floating'>
        <div className='mb-3'>
            <label for="floatingInput">Fecha</label>
            <input onChange={handleChange} value={aporte.fecha}  name='fecha' type="date" className="form-control" id="floatingInput" placeholder="fecha" />
            
        </div>
        <div className='mb-3'>
            <label for="floatingInput">Valor</label>
            <input onChange={handleChange} value={aporte.valor} name='valor' type="number" className="form-control" id="floatingInput" placeholder="valor" />
        </div>
        <div className='mb-3'>
            <label for="floatingInput">Comentario</label>
            <input onChange={handleChange} value={aporte.comentario}  name='comentario' type="text" className="form-control" id="floatingInput" placeholder="" />
        </div>
        <div className='mb-3'>
            <label for="floatingInput">Aportante</label>
            <input onChange={handleChange} value={aporte.trabajador} name='trabajador' type="number" className="form-control" id="floatingInput" placeholder="Quien aporta el dinero" />
        </div>
        <div className='mb-3'>
            <button type="submit" class="btn btn-success">Actualizar Aporte</button>
        </div>
        
    </form>

</div>
  )
}

export default AporteItemUpdate