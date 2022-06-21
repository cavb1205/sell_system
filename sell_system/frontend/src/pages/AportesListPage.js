import React, { useEffect, useState, useContext } from "react";

import {Table,Button,Modal,ModalBody,ModalFooter,Container, ModalHeader, FormGroup, Label, Input} from 'reactstrap';


import { AuthContext } from "../context/AuthContext";


const AportesListPage = () => {
    let {token,logoutUser, navigate} = useContext(AuthContext)

    const [aportes, setAportes] = useState([])
    const [newAporte, setNewAporte] = useState({
        'fecha':'',
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

    const getAportes = async () => {
        console.log('inicia la llamada a aportes')
        let response = await fetch('http://localhost:8000/aportes/',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
        })
        console.log(response)
        let data = await response.json();
        console.log('data')
        if(response.status===200){
            console.log('ingresa al 200 aporte list')
            setAportes(data);
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
            console.log('status ok enviado con exito codigo 200')
            setOpenModalCreate(!openModalCreate)
            navigate('/aportes/')
            getAportes()
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
            console.log('status ok enviado con exito codigo 200')
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
        console.log('ingresa al handlechangecrear')
        const {name,value} = event.target
        setNewAporte({
            ...newAporte,
            [name]: value,
        })
    }
    const handleChangeUpdate = (event)=>{
        console.log('ingresa al handlechange edit')
        const {name,value} = event.target
        setAporteId({
            ...aporteId,
            [name]: value,
        })
    }

    const aporteSeleccionado = (aporte, caso)=>{
        console.log('ingresa aporte selecc eliminar')
        console.log(caso)
        setAporteId(aporte);
        (caso=='Editar')?setOpenModalUpdate(!openModalUpdate):setOpenModalDelete(!openModalDelete)
    }

    return (
        <Container>
            <div className="text-center">
                <h1>Lista de Aportes</h1>
                <span>Total: {aportes.length}</span>
            </div>
            <div className="m-3">
                <Button onClick={openModalCreateAporte} color="success">Crear Aporte</Button>
            </div>
            <div>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Fecha</th>
                            <th>Valor</th>
                            <th>Comentario</th>
                            <th>Aportante</th>  
                        </tr>
                    </thead>
                    <tbody>
                            {aportes.map((aporte) => (
                                <tr key={aporte.id}>
                                    <th scope="row">{aporte.id}</th>
                                    <td>{aporte.fecha}</td>
                                    <td>{aporte.valor}</td>
                                    <td>{aporte.comentario}</td>
                                    <td>{aporte.trabajador}</td>
                                    <td>
                                        <Button onClick={()=>aporteSeleccionado(aporte,'Editar')} size="sm" color="primary">Editar</Button>{" "}
                                        <Button onClick={()=>aporteSeleccionado(aporte,'Eliminar')} size="sm" color="danger">Eliminar</Button>
                                    </td>
                                </tr>
                            )
                            )}
                    </tbody>
                </Table>
            </div>

            <Modal isOpen={openModalCreate}>
                <ModalHeader>
                    Crear Aporte
                </ModalHeader>
                <ModalBody>
                    <Container>
                        <FormGroup>
                            <Label>Fecha</Label>
                            <Input onChange={handleChange} name='fecha' type="date" className="form-control" id="floatingInput" placeholder="fecha" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="floatingInput">Valor</Label>
                            <Input onChange={handleChange}  name='valor' type="number" className="form-control" id="floatingInput" placeholder="valor" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="floatingInput">Comentario</Label>
                            <Input onChange={handleChange}  name='comentario' type="text" className="form-control" id="floatingInput" placeholder="" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="floatingInput">Aportante</Label>
                            <Input onChange={handleChange}  name='trabajador' type="number" className="form-control" id="floatingInput" placeholder="Quien aporta el dinero" />
                        </FormGroup>
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={aporteCreateItem} color="success">Crear</Button>
                    <Button onClick={openModalCreateAporte} color="secondary">Cerrar</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={openModalUpdate}>
                <ModalHeader>
                    Editar Aporte
                </ModalHeader>
                <ModalBody>
                    <Container>
                        <FormGroup>
                            <Label>Id</Label>
                            <Input value={aporteId && aporteId.id} name='id' type="number" className="form-control" id="floatingInput" disabled />
                        </FormGroup>
                        <FormGroup>
                            <Label>Fecha</Label>
                            <Input onChange={handleChangeUpdate} value={aporteId && aporteId.fecha} name='fecha' type="date" className="form-control" id="floatingInput" placeholder="fecha" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="floatingInput">Valor</Label>
                            <Input onChange={handleChangeUpdate} value={aporteId && aporteId.valor}  name='valor' type="number" className="form-control" id="floatingInput" placeholder="valor" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="floatingInput">Comentario</Label>
                            <Input onChange={handleChangeUpdate} value={aporteId && aporteId.comentario}  name='comentario' type="text" className="form-control" id="floatingInput" placeholder="" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="floatingInput">Aportante</Label>
                            <Input onChange={handleChangeUpdate} value={aporteId && aporteId.trabajador}  name='trabajador' type="number" className="form-control" id="floatingInput" placeholder="Quien aporta el dinero" />
                        </FormGroup>
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={aporteUpdateItem} color="success">Actualizar</Button>
                    <Button onClick={openModalUpdateAporte} color="secondary">Cancelar</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={openModalDelete}>
                <ModalHeader>
                    Aliminar Aporte {aporteId.id}
                </ModalHeader>
                <ModalBody>
                    Esta seguro que desea eliminar el aporte {aporteId.valor}?
                </ModalBody>
                <ModalFooter>
                    <Button onClick={aporteDeleteItem} color="danger">Confirmar</Button>
                    <Button onClick={openModalDeleteAporte} color="secondary">Cancelar</Button>
                </ModalFooter>
            </Modal>
        </Container>

        
    );
}


export {AportesListPage};