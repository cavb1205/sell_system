import React,{createContext,useContext, useState, useEffect} from 'react';
import { AuthContext } from './AuthContext';


export const AportesContext = createContext();


const AportesProvider = ({children}) => {
    
    let {token,logoutUser, navigate} = useContext(AuthContext)
    
    
    const [loading,setLoading] = useState(true)

    const [aportes, setAportes] = useState([])
    const [newAporte, setNewAporte] = useState({
        "fecha":new Date().toISOString().slice(0, 10),
        'valor':'',
        'comentario':'',
        'trabajador':''
    })
    const [aporteId, setAporteId] = useState({
        'id':'',
        'fecha':'',
        'valor':'',
        'comentario':'',
        'trabajador':''
        
    })
    
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [openModalUpdate, setOpenModalUpdate] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    
    
    
    useEffect(() => {
        getAportes();
    },[])
    
    //calculamos la suma de los aportes
    const totalAportes = () => {
        if (aportes.message){
            return 0;
        } else {
            return aportes.map(aporte => parseFloat(aporte.valor)).reduce((a,b) => a + b, 0);
        }
    }

    const getAportes = async () => {
        let response = await fetch('http://localhost:8000/aportes/',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
        })
        
        let data = await response.json();
        
        if(response.status===200){
            
            setAportes(data);
            setLoading(false);
        }else if(response.statusText == 'Unauthorized'){
            logoutUser()
        }
    }
    
    const aporteCreateItem = async (event)=>{
        event.preventDefault()
        const response = await fetch('http://localhost:8000/aportes/create/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`,
            },
            body: JSON.stringify(newAporte)
            
        })
        const data = await response.json()
        if (response.status === 200){
            setOpenModalCreate(!openModalCreate)
            navigate('/aportes/')
            getAportes();
        }else if(response.statusText == 'Unauthorized'){
            logoutUser()
        }else{
            alert('Informacion erronea en el formulario')
        }
    }
    const aporteUpdateItem = async (event) => {
        event.preventDefault()
        const response = await fetch(`/aportes/${aporteId.id}/update/`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`,
            },
            body: JSON.stringify(aporteId)
            
        })
        const data = await response.json()
        if (response.status === 200){
            setOpenModalUpdate(!setOpenModalUpdate)
            navigate(`/aportes/`)
            getAportes()

        }else if(response.statusText == 'Unauthorized'){
            logoutUser()
        }else{
            alert('Informacion erronea en el formulario')
        }
    }
    const aporteDeleteItem = async () => {
        let response = await fetch(`/aportes/${aporteId.id}/delete/`,{
          method:'DELETE',
          headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
          },
        })
        let data = await response.json();
        if (response.status === 200){
            setOpenModalDelete(!openModalDelete)
            navigate('/aportes/')
            getAportes()
    
        }else if(response.statusText == 'Unauthorized'){
          logoutUser()
        }
      }
    
    const openModalCreateAporte = ()=>{
        setOpenModalCreate(!openModalCreate)
    }
    const openModalUpdateAporte = ()=>{
        setOpenModalUpdate(!openModalUpdate)
    }
    const openModalDeleteAporte = () => {
        setOpenModalDelete(!openModalDelete)
    }

    const handleChange = (event)=>{
        const {name,value} = event.target
        setNewAporte({
            ...newAporte,
            [name]: value,
        })
    }
    const handleChangeUpdate = (event)=>{
        
        const {name,value} = event.target
        setAporteId({
            ...aporteId,
            [name]: value,
        })
    }

    const aporteSeleccionado = (aporte, caso)=>{
        setAporteId(aporte);
        (caso=='Editar')?setOpenModalUpdate(!openModalUpdate):setOpenModalDelete(!openModalDelete)
    }

    
    
    const contextData = {
        aportes,
        newAporte,
        aporteId,
        totalAportes,
        openModalCreate,
        setOpenModalCreate,
        openModalUpdate,
        setOpenModalUpdate,
        openModalDelete,
        setOpenModalDelete,
        openModalCreateAporte,
        aporteSeleccionado,
        handleChange,
        aporteCreateItem,
        handleChangeUpdate,
        aporteUpdateItem,
        openModalUpdateAporte,
        aporteDeleteItem,
        openModalDeleteAporte,
        loading,
        
    }
    
    
    
    
    
  return (
    <AportesContext.Provider value={contextData}>
        {children}
    </AportesContext.Provider>
  )
}

export default AportesProvider;