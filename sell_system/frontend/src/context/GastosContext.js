import React,{Children, createContext,useContext,useEffect,useState} from 'react'
import { AuthContext } from './AuthContext';

const GastosProvider = ({children}) => {

    let {token,logoutUser, navigate} = useContext(AuthContext)
    const [tipoGastos,setTipoGastos] = useState([])
    
    
    const [gastos, setGastos]= useState([])
    const [gasto, setGasto] = useState({})
    const [newGasto, setNewGasto]=useState({
        "fecha":new Date().toISOString().slice(0, 10),
        "tipo_gasto":1,
        "valor":'',
        "comentario":'',
    })

   
    
    const [errorMessage, setErrorMessage] = useState('')

    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [openModalDetail, setOpenModalDetail] = useState(false)
    const [openModalUpdate, setOpenModalUpdate] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)

    useEffect(() => {
        getGastos();
        getTipoGastos();
        
    },[])

     //calculamos la suma de los aportes
     const totalGastos = () => {
        if (gastos.message){
            return 0;
        }else {
            return gastos.map(gasto => parseFloat(gasto.valor)).reduce((a,b) => a + b, 0);
        }
    }     
    

    const getGastos = async () => {
        
        let response = await fetch('http://localhost:8000/gastos/',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
        })
        let data = await response.json();
        if(response.status===200){
            
            setGastos(data);
        }else if(response.statusText == 'Unauthorized'){
            logoutUser()
        }
    }

    const getTipoGastos = async () => {
        let response = await fetch('http://localhost:8000/gastos/tipo/',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
        })
        let data = await response.json();
        if(response.status===200){
            setTipoGastos(data);
        }else if(response.statusText == 'Unauthorized'){
            logoutUser()
        }
    }
    const gastoCreateItem = async (event)=>{
        const response = await fetch('http://localhost:8000/gastos/create/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`,
            },
            body: JSON.stringify(newGasto)
            
        })
        const data = await response.json()
        if (response.status === 200){
            console.log('status ok enviado con exito codigo 200')
            setOpenModalCreate(!openModalCreate)
            navigate('/gastos/')
            getGastos()
        }else if(response.statusText == 'Unauthorized'){
            logoutUser()
        }else{
            setErrorMessage('Por favor completar todos los campos en el formulario')
        }
    }
    const gastoUpdateItem = async (event) => {
        
        const response = await fetch(`http://localhost:8000/gastos/${gasto.id}/update/`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`,
            },
            body: JSON.stringify(gasto)
            
        })
        
        if (response.status === 200){
            console.log('status ok enviado con exito codigo 200')
            setOpenModalUpdate(!openModalUpdate)
            navigate(`/gastos/`)
            getGastos()

        }else if(response.statusText == 'Unauthorized'){
            logoutUser()
        }else{
            alert('Informacion erronea en el formulario')
        }
    }
    const gastoDeleteItem = async () => {
        let response = await fetch(`/gastos/${gasto.id}/delete/`,{
          method:'DELETE',
          headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
          },
        })
        let data = await response.json();
        if (response.status === 200){
            setOpenModalDelete(!openModalDelete)
            navigate('/gastos/')
            getGastos()
    
        }else if(response.statusText == 'Unauthorized'){
          logoutUser()
        }
      }

    const openModalDetailGasto = ()=>{
        setOpenModalDetail(!openModalDetail);
    }
    const openModalCreateGasto = ()=>{
        setOpenModalCreate(!openModalCreate);
        
    }
    const openModalUpdateGasto = ()=>{
        setOpenModalUpdate(!openModalUpdate);
    }
    
    const openModalDeleteGasto = ()=>{
        setOpenModalDelete(!openModalDelete);
    }
    
    const gastoSelected = (gasto,option) => {
         setGasto(gasto);
         console.log(option);
         if(option=='Detalle'){
             setOpenModalDetail(!openModalDetail);
         }else if(option=='Editar'){
             setOpenModalUpdate(!openModalUpdate);
         } else{
             setOpenModalDelete(!openModalDelete)
         }
}
    const handleChange = (event)=>{
        const {name,value} = event.target
        setNewGasto({
            ...newGasto,
            [name]:value
        })
    }
    const handleChangeUpdate = (event)=>{
        const {name,value} = event.target
        setGasto({
            ...gasto,
            [name]:value
        })
     }

    const contextData = {
        gastos,
        gasto,
        newGasto,
        errorMessage,
        getGastos,
        gastoCreateItem,
        gastoUpdateItem,
        gastoDeleteItem,
        handleChangeUpdate,
        handleChange,
        gastoSelected,
        openModalDetailGasto,
        openModalUpdateGasto,
        openModalCreateGasto,
        openModalDeleteGasto,
        openModalDetail,
        openModalCreate,
        openModalUpdate,
        tipoGastos,
        openModalDelete,
        totalGastos,

    }

  return (
    <GastosContext.Provider value={contextData}>
        {children}
    </GastosContext.Provider>
  )
}

export const GastosContext = createContext();
export default GastosProvider;