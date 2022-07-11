import React,{useContext,useEffect,useState} from 'react';
import {Alert,Table,Button,Modal,ModalBody,ModalFooter,Container, ModalHeader, FormGroup, Label, Input} from 'reactstrap';
import { FaEdit,FaTrashAlt,FaSearch,FaPlusCircle } from "react-icons/fa";

import { AuthContext } from "../context/AuthContext";

import { Link } from 'react-router-dom';

const TrabajadoresListPage = () => {
    const {token,logoutUser, navigate} = useContext(AuthContext)

    const [trabajadores, setTrabajadores] = useState([])
     const [trabajador, setTrabajador] = useState({})
    //     'id':'',
    //     'identificacion':'',
    //     'nombres':'',
    //     'apellidos':'',
    //     'nombre_local':'',
    //     'telefono_principal':'',
    //     'telefono_opcional':'',
    //     'direccion':'',
    //     'estado_cliente':'',
    // })
    const [newTrabajador, setNewTrabajador] = useState({
        'username':'',
        'first_name':'',
        'last_name':'',
        'password':'',
        'identificacion':'',
        'telefono':'',
        'direccion':'',
    })
    console.log(trabajadores)
    const [errorMessage, setErrorMessage] = useState('')

    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [openModalDetail, setOpenModalDetail] = useState(false)
    const [openModalUpdate, setOpenModalUpdate] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    
    

    useEffect(()=>{
        getTrabajadores()
    },[])

    const getTrabajadores = async () => {
        
        const response = await fetch('http://localhost:8000/trabajadores/',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
        })
        const data = await response.json();
        
        if(response.status === 200){
            setTrabajadores(data)
        } else if(response.statusText=='Unauthorized'){
            logoutUser()
        }
    }

    const trabajadorCreateItem = async (event)=>{
        const response = await fetch('http://localhost:8000/trabajadores/create/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`,
            },
            body: JSON.stringify(newTrabajador)
            
        })
        const data = await response.json()
        if (response.status === 200){
            console.log('status ok enviado con exito codigo 200')
            setOpenModalCreate(!openModalCreate)
            navigate('/trabajadores/')
            getTrabajadores()
        }else if(response.statusText == 'Unauthorized'){
            logoutUser()
        }else{
            setErrorMessage('Por favor completar todos los campos en el formulario')
        }
    }
    // const clienteUpdateItem = async (event) => {
        
    //     const response = await fetch(`/clientes/${cliente.id}/update/`,{
    //         method:'PUT',
    //         headers:{
    //             'Content-Type':'application/json',
    //             'Authorization':`Bearer ${token}`,
    //         },
    //         body: JSON.stringify(cliente)
            
    //     })
    //     const data = await response.json()
    //     if (response.status === 200){
    //         console.log('status ok enviado con exito codigo 200')
    //         setOpenModalUpdate(!setOpenModalUpdate)
    //         navigate(`/clientes/`)
    //         getClientes()

    //     }else if(response.statusText == 'Unauthorized'){
    //         logoutUser()
    //     }else{
    //         alert('Informacion erronea en el formulario')
    //     }
    // }
    const trabajadorDeleteItem = async () => {
        let response = await fetch(`/trabajadores/${trabajador.id}/delete/`,{
          method:'DELETE',
          headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
          },
        })
        let data = await response.json();
        if (response.status === 200){
            setOpenModalDelete(!openModalDelete)
            navigate('/trabajadores/')
            getTrabajadores()
    
        }else if(response.statusText == 'Unauthorized'){
          logoutUser()
        }
      }

      
    const openModalCreateTrabajador = ()=>{
        setOpenModalCreate(!openModalCreate)
    }
    const openModalDetailTrabajador = ()=>{
        setOpenModalDetail(!openModalDetail)
    }
    const openModalUpdateTrabajador = ()=>{
        setOpenModalUpdate(!openModalUpdate)
    }
    const openModalDeleteTrabajador = ()=>{
        setOpenModalDelete(!openModalDelete)
    }

    const deleteDetailTrabajador = ()=>{
        setOpenModalDetail(!openModalDetail)
        setOpenModalDelete(!openModalDelete)

    }
    const updateDetailTrabajador = ()=>{
        setOpenModalDetail(!openModalDetail)
        setOpenModalUpdate(!openModalUpdate)
    }
    const handleChange = (event)=>{
         const {name,value} = event.target
         setNewTrabajador({
             ...newTrabajador,
             [name]:value
         })
    }
    const handleChangeUpdate = (event)=>{
        // const {name,value} = event.target
        // setCliente({
        //     ...cliente,
        //     [name]:value
        // })
    }

    const Selected = (trabajador,option) => {
        setTrabajador(trabajador);
        console.log(option);
        if(option=='Detalle'){
            setOpenModalDetail(!openModalDetail);
        }else if(option=='Editar'){
            setOpenModalUpdate(!openModalUpdate);
        } else{
            setOpenModalDelete(!openModalDelete)
        }
}
  return (
    <Container>
        <div className="text-center">
                <h1>Lista de Trabajadores</h1>
                <span>Total: {trabajadores.length} </span>
            </div>
            <div className="m-3">
                <Button onClick={openModalCreateTrabajador}  color="success"><FaPlusCircle/>  Trabajador</Button>
            </div>
            <div>
                {trabajadores.message? <Alert color="info">{trabajadores.message}</Alert>: 
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Identificación</th>
                            <th>Usuario</th>
                            <th>Dirección</th>
                            <th>Teléfono</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                            {trabajadores.map((trabajador) => (
                                <tr key={trabajador.id}>
                                    <th scope="row">{trabajador.id}</th>
                                    <td>{trabajador.identificacion} </td>
                                    <td>{trabajador.trabajador}</td>
                                    <td>{trabajador.direccion}</td>
                                    <td>{trabajador.telefono}</td>
                                    
                                    <td>
                                        <Link to={`/trabajadores/${trabajador.id}/`}><Button size='sm' color='secondary'><FaSearch/></Button></Link>{" "}
                                        <Button onClick={()=>Selected(trabajador,'Editar')} size="sm" color="primary"><FaEdit/></Button>{" "}
                                        <Button onClick={()=>Selected(trabajador,'Eliminar')} size="sm" color="danger"><FaTrashAlt/></Button>
                                    </td>
                                </tr>
                            )
                            )}
                    </tbody>
                </Table>
                }           
            </div>

             <Modal isOpen={openModalCreate}>
                <ModalHeader>
                    {errorMessage?<div className="alert alert-danger" role="alert">{errorMessage}</div>:<h2>Crear Trabajador</h2>}
                </ModalHeader>
                <ModalBody>
                    <Container>
                        <FormGroup>
                            <Label>Username</Label>
                            <Input onChange={handleChange} name='username' type="text" className="form-control" id="floatingInput" placeholder="username" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="floatingInput">Nombres</Label>
                            <Input onChange={handleChange}  name='first_name' type="text" className="form-control" id="floatingInput" placeholder="nombres" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="floatingInput">Apellidos</Label>
                            <Input onChange={handleChange}  name='last_name' type="text" className="form-control" id="floatingInput" placeholder="Apellidos" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="floatingInput">Contraseña</Label>
                            <Input onChange={handleChange}  name='password' type="password" className="form-control" id="floatingInput" placeholder="password" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="floatingInput"># Identificación</Label>
                            <Input onChange={handleChange}  name='identificacion' type="text" className="form-control" id="floatingInput" placeholder="" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="floatingInput">Teléfono</Label>
                            <Input onChange={handleChange}  name='telefono' type="text" className="form-control" id="floatingInput" placeholder="Teléfono principal" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="floatingInput">Dirección</Label>
                            <Input onChange={handleChange}  name='direccion' type="text" className="form-control" id="floatingInput" placeholder="Dirección casa o local" />
                        </FormGroup>
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={trabajadorCreateItem} color="success">Crear Trabajador</Button>
                    <Button onClick={openModalCreateTrabajador} color="secondary">Cerrar</Button>
                </ModalFooter>
            </Modal>

         {/*   <Modal isOpen={openModalDetail}>
                <ModalHeader>
                    Información del Cliente #{cliente.id}
                </ModalHeader>
                <ModalBody>
                   <p># Identificación: {cliente.identificacion}</p>
                   <p>Nombres: {cliente.nombres} {cliente.apellidos} </p>
                   <p>Local: {cliente.nombre_local}</p>
                   <p>Teléfono: {cliente.telefono_principal}</p>
                   <p>Dirección: {cliente.direccion}</p>
                   <p>Estado: {cliente.estado_cliente}</p>
                   <p>Fecha Creación: {cliente.fecha_creacion}</p>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={updateDetailCliente} color="warning">Actualizar</Button>
                    <Button onClick={deleteDetailCliente} color='danger'>Eliminar</Button>
                    <Button onClick={openModalDetailCliente} color="secondary">Cerrar</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={openModalUpdate}>
                <ModalHeader>
                    Editar Cliente {cliente.id}
                </ModalHeader>
                <ModalBody>
                    <Container>
                            <FormGroup>
                                <Label># Identificación</Label>
                                <Input onChange={handleChangeUpdate} value={cliente.identificacion} name='identificacion' type="text" className="form-control" id="floatingInput" placeholder="Identificación" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="floatingInput">Nombres</Label>
                                <Input onChange={handleChangeUpdate} value={cliente.nombres} name='nombres' type="text" className="form-control" id="floatingInput" placeholder="nombres" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="floatingInput">Apellidos</Label>
                                <Input onChange={handleChangeUpdate} value={cliente.apellidos} name='apellidos' type="text" className="form-control" id="floatingInput" placeholder="Apellidos" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="floatingInput">Nombre Local</Label>
                                <Input onChange={handleChangeUpdate} value={cliente.nombre_local} name='nombre_local' type="text" className="form-control" id="floatingInput" placeholder="Nombre del local" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="floatingInput">Teléfono</Label>
                                <Input onChange={handleChangeUpdate} value={cliente.telefono_principal} name='telefono_principal' type="text" className="form-control" id="floatingInput" placeholder="Teléfono principal" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="floatingInput">Dirección</Label>
                                <Input onChange={handleChangeUpdate} value={cliente.direccion} name='direccion' type="text" className="form-control" id="floatingInput" placeholder="Dirección casa o local" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="floatingInput">Estado</Label>
                                <Input onChange={handleChangeUpdate} value={cliente.estado_cliente} name='estado_cliente' type="select" className="form-control" id="floatingInput" placeholder="Dirección casa o local">
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                                    <option value="Bloqueado">Bloqueado</option>
                                </Input>
                            </FormGroup>
                        </Container>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={clienteUpdateItem} color="success">Actualizar</Button>
                    <Button onClick={openModalUpdateCliente} color="secondary">Cancelar</Button>
                </ModalFooter>
            </Modal>
*/}
            <Modal isOpen={openModalDelete}>
                <ModalHeader>
                    Eliminar Trabajador {trabajador.id}
                </ModalHeader>
                <ModalBody>
                    Esta seguro que desea eliminar el trabajador {trabajador.trabajador}?
                </ModalBody>
                <ModalFooter>
                    <Button   onClick={trabajadorDeleteItem}   color="danger">Confirmar</Button>
                    <Button  onClick={openModalDeleteTrabajador}    color="secondary">Cancelar</Button>
                </ModalFooter>
            </Modal> 

    </Container>
  )
}

export default TrabajadoresListPage