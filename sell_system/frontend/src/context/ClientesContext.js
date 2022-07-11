import React,{ createContext,useState, useEffect, useContext } from "react";
import { useParams } from "react-router";

import { AuthContext } from "./AuthContext";



export const ClientesContext = createContext();

const ClientesProvider = ({children}) => {
    
    const {clienteId}=useParams();
    

    const {token,logoutUser,navigate} = useContext(AuthContext)

    const [clientes, setClientes] = useState([])
    
    const [cliente, setCliente] = useState({
        'id':'',
        'identificacion':'',
        'nombres':'',
        'apellidos':'',
        'nombre_local':'',
        'telefono_principal':'',
        'telefono_opcional':'',
        'direccion':'',
        'estado_cliente':'',
    })
    const [newCliente, setNewCliente] = useState({
        'identificacion':'',
        'nombres':'',
        'apellidos':'',
        'nombre_local':'',
        'telefono_principal':'',
        'telefono_opcional':'',
        'direccion':'',
    })
    
    const [errorMessage, setErrorMessage] = useState('')

    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [openModalDetail, setOpenModalDetail] = useState(false)
    const [openModalUpdate, setOpenModalUpdate] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)





    const getClientes = async () => {
        
        const response = await fetch('http://localhost:8000/clientes/',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
        })
        const data = await response.json();
        
        if(response.status === 200){
        
            setClientes(data)
        } else if(response.statusText=='Unauthorized'){
            logoutUser()
        }
    }
  
    const getCliente = async () => {
        
        const response = await fetch(`http://localhost:8000/clientes/${clienteId}/`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
        })
        const data = await response.json();
        
        if(response.status === 200){
        
            setCliente(data)
        } else if(response.statusText=='Unauthorized'){
            logoutUser()
        }
    }

    const clienteCreateItem = async (event)=>{
        const response = await fetch('http://localhost:8000/clientes/create/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`,
            },
            body: JSON.stringify(newCliente)
            
        })
        const data = await response.json()
        if (response.status === 200){
            
            setOpenModalCreate(!openModalCreate)
            navigate('/clientes/')
            getClientes()
        }else if(response.statusText == 'Unauthorized'){
            logoutUser()
        }else{
            setErrorMessage('Por favor completar todos los campos en el formulario')
        }
    }
    const clienteUpdateItem = async (event) => {
        
        const response = await fetch(`/clientes/${cliente.id}/update/`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`,
            },
            body: JSON.stringify(cliente)
            
        })
        const data = await response.json()
        if (response.status === 200){
            
            setOpenModalUpdate(!setOpenModalUpdate)
            navigate(`/clientes/`)
            getClientes()

        }else if(response.statusText == 'Unauthorized'){
            logoutUser()
        }else{
            alert('Informacion erronea en el formulario')
        }
    }

    const clienteDeleteItem = async () => {
        let response = await fetch(`/clientes/${cliente.id}/delete/`,{
          method:'DELETE',
          headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
          },
        })
        let data = await response.json();
        if (response.status === 200){
            setOpenModalDelete(!openModalDelete)
            navigate('/clientes/')
            getClientes()

        }else if(response.statusText == 'Unauthorized'){
          logoutUser()
        }
      }

    
    const openModalCreateCliente = ()=>{
        setOpenModalCreate(!openModalCreate)
    }
    const openModalDetailCliente = ()=>{
        setOpenModalDetail(!openModalDetail)
    }
    const openModalUpdateCliente = ()=>{
        setOpenModalUpdate(!openModalUpdate)
    }
    const openModalDeleteCliente = ()=>{
        setOpenModalDelete(!openModalDelete)
    }

 
    const handleChange = (event)=>{
        const {name,value} = event.target
        setNewCliente({
            ...newCliente,
            [name]:value
        })
    }
    const handleChangeUpdate = (event)=>{
        const {name,value} = event.target
        setCliente({
            ...cliente,
            [name]:value
        })
    }

    const clienteSelected = (cliente,option) => {
        
        setCliente(cliente);
        if(option=='Detalle'){
            navigate(`/clientes/${cliente.id}/`);
        }else if(option=='Editar'){
            setOpenModalUpdate(!openModalUpdate);
        } else{
            setOpenModalDelete(!openModalDelete);
        }
    }

    const contextData = {
        
        clientes:clientes,
        cliente:cliente,
        getClientes:getClientes,
        getCliente:getCliente,
        clienteCreateItem:clienteCreateItem,
        clienteUpdateItem:clienteUpdateItem,
        clienteDeleteItem:clienteDeleteItem,
        errorMessage:errorMessage,
        openModalCreate:openModalCreate,
        openModalDetail:openModalDetail,
        openModalUpdate:openModalUpdate,
        openModalDelete:openModalDelete,
        openModalCreateCliente:openModalCreateCliente,
        clienteSelected:clienteSelected,
        handleChange:handleChange,
        handleChangeUpdate:handleChangeUpdate,
        openModalUpdateCliente:openModalUpdateCliente,
        openModalDetailCliente:openModalDetailCliente,
        openModalDeleteCliente:openModalDeleteCliente,
        
    }

    return(
        <ClientesContext.Provider value={contextData}>
            {children}
        </ClientesContext.Provider>
    )

}

export default ClientesProvider;