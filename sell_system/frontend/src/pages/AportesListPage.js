import React, { useEffect, useState, useContext } from "react";

import {Table,Button,Modal,ModalBody,ModalFooter,Container, ModalHeader, FormGroup, Label, Input, Pagination} from 'reactstrap';
import { FaEdit,FaTrashAlt,FaSearch,FaPlusCircle } from "react-icons/fa";


import AportesListHeader from "../components/Aportes/AportesListHeader";
import { AportesContext } from "../context/AportesContext";
import AlertLoading from "../components/Utils/AlertLoading";
import AlertMessage from "../components/Utils/AlertMessage";



const AportesListPage = () => {
    

    const {
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
    } = useContext(AportesContext);

    return (
        <Container>
            {loading? <AlertLoading />:<>
            <AportesListHeader totalAportes={totalAportes} aportes={aportes} />

            <div className="m-3">
                <Button onClick={openModalCreateAporte} color="success">Crear Aporte</Button>
            </div>
            <div>
                {aportes.message? <AlertMessage message={aportes.message}/>:
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
                                        <td>{new Intl.NumberFormat("en-EN").format(aporte.valor)}</td>
                                        <td>{aporte.comentario}</td>
                                        <td>{aporte.trabajador}</td>
                                        <td>
                                            <Button onClick={()=>aporteSeleccionado(aporte,'Editar')} size="sm" color="primary"><FaEdit/></Button>{" "}
                                            <Button onClick={()=>aporteSeleccionado(aporte,'Eliminar')} size="sm" color="danger"><FaTrashAlt/></Button>
                                        </td>
                                    </tr>
                                )
                                )}
                        </tbody>
                        
                    </Table>
                    
            }
            </div>
            </>
            }

            <Modal isOpen={openModalCreate}>
                <ModalHeader>
                    Crear Aporte
                </ModalHeader>
                <ModalBody>
                    <Container>
                        <FormGroup>
                            <Label>Fecha</Label>
                            <Input onChange={handleChange} value={newAporte.fecha} name='fecha' type="date" className="form-control" id="floatingInput" placeholder="fecha" />
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