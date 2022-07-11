import React,{useContext,useEffect,useState} from 'react';
import {Card,CardBody,CardFooter,CardHeader,Alert,Table,Button,Modal,ModalBody,ModalFooter,Container, ModalHeader, FormGroup, Label, Input} from 'reactstrap';
import { FaEdit,FaTrashAlt,FaSearch,FaPlusCircle } from "react-icons/fa";

import { AuthContext } from "../context/AuthContext";

import { Link, useParams } from 'react-router-dom';


const TrabajadorDetail = (props) => {
    const {token,logoutUser} = useContext(AuthContext)
    const [trabajador, setTrabajador] = useState({})
    const {trabajadorId} = useParams()
    
    useEffect(()=>{
        getTrabajador();
    },[])

    const getTrabajador = async () => {
        
        const response = await fetch(`http://localhost:8000/trabajadores/${trabajadorId}/`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
        })
        const data = await response.json();
        console.log(response.status)
        if(response.status === 200){
            console.log('ingresa al 200 get clientes')
            setTrabajador(data)
        } else if(response.statusText=='Unauthorized'){
            logoutUser()
        }
    }
    console.log(trabajador.is_active)
  return (
    <Container className='text-center'>
        <Card>
            <CardHeader>
                <h2>Información Básica del Trabajador {trabajador.id}</h2>
            </CardHeader>
            <CardBody>
                <h3>Username: {trabajador.username}</h3>
                <p>Identificación: {trabajador.identificacion}</p>
                <p>Nombres: {trabajador.first_name}</p>
                <p>Apellidos: {trabajador.last_name}</p>
                <p>Nombres: {trabajador.first_name}</p>
                <p>Teléfono: {trabajador.telefono}</p>
                <p>Dirección: {trabajador.direccion}</p>
                {(trabajador.is_active)?<p>Estado: Activo</p>:<p>Estado: Inactivo</p>}
                <p>Fecha Creación: {trabajador.date_joined}</p>
                

            </CardBody>
            <CardFooter>
                <Button color='warning'>Actualizar</Button>{" "}
                <Button color='danger'>Eliminar</Button>{" "}
                <Link to="/trabajadores/"><Button color='secondary'>Lista Trabajadores</Button></Link>{" "}
            </CardFooter>
        </Card>
    </Container>
  )
}

export default TrabajadorDetail