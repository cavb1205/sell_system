import React,{createContext,useContext, useState, useEffect} from 'react';
import { AuthContext } from './AuthContext';
import { URL } from '../config';

export const AportesContext = createContext();


const AportesProvider = ({children}) => {
    
    let {token,logoutUser, navigate} = useContext(AuthContext)
    
    
    const [loading,setLoading] = useState(true)
    const [serverError, setServerError] = useState(false)
    const [message, setMessage] = useState(false)

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
        console.log('efecto aportes')
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
        try {
            let response = await fetch(`${URL}/aportes/`,{
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
        } catch {
            setServerError(true);
            setLoading(!loading);
        }
         
            
        
    }
    
    
    const aporteCreateItem = async (event)=>{
        try {
            event.preventDefault()
            const response = await fetch(`${URL}/aportes/create/`,{
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
                setMessage(false)
                navigate('/aportes/')
                setNewAporte({
                    "fecha":new Date().toISOString().slice(0, 10),
                    'valor':'',
                    'comentario':'',
                    'trabajador':''
                })
                getAportes();
            
            }else if(response.status === 400){
                setMessage(!message)
            }
            else if(response.statusText == 'Unauthorized'){
                logoutUser()
            }
        } catch {
            setServerError(true);
            setNewAporte({
                "fecha":new Date().toISOString().slice(0, 10),
                'valor':'',
                'comentario':'',
                'trabajador':''
            })
        }
    }

    const aporteUpdateItem = async (event) => {
        try {
            event.preventDefault()
            const response = await fetch(`${URL}/aportes/${aporteId.id}/update/`,{
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
            }
        } catch{
            setServerError(true)
        }
    }
    const aporteDeleteItem = async () => {
        try {
            let response = await fetch(`${URL}/aportes/${aporteId.id}/delete/`,{
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

        } catch {
            setServerError(true)
        }
      }
    
    const openModalCreateAporte = ()=>{
        setOpenModalCreate(!openModalCreate)
        setMessage(false);
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
        serverError,
        message
        
    }
    
    
    
    
    
  return (
    <AportesContext.Provider value={contextData}>
        {children}
    </AportesContext.Provider>
  )
}

export default AportesProvider;