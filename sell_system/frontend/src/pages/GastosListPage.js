import React, { useEffect, useState, useContext } from "react";

import {Alert,Table,Button,Modal,ModalBody,ModalFooter,Container, ModalHeader, FormGroup, Label, Input} from 'reactstrap';
import { FaEdit,FaTrashAlt,FaSearch,FaPlusCircle } from "react-icons/fa";
import { GastosContext } from "../context/GastosContext";
import GastosListHeader from "../components/Gastos/GastosListHeader";
import AlertMessage from "../components/Utils/AlertMessage";




const GastosListPage = () => {
    const {
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
        tipoGastos,
        openModalUpdate,
        openModalDelete,
        totalGastos,
    } = useContext(GastosContext)
  return (
    <Container>
            <GastosListHeader gastos={gastos} totalGastos={totalGastos} />
            <div className="m-3">
                <Button onClick={openModalCreateGasto} color="success">Crear Gasto</Button>
            </div>
            {gastos.message? <AlertMessage message={gastos.message} />:
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Fecha</th>
                            <th>Valor</th>
                            <th>Tipo</th>
                            <th>Trabajador</th>  
                        </tr>
                    </thead>
                    <tbody>
                            {gastos.map((gasto) => (
                                <tr key={gasto.id}>
                                    <th scope="row">{gasto.id}</th>
                                    <td>{gasto.fecha}</td>
                                    <td>{gasto.valor}</td>
                                    <td>{gasto.tipo_gasto.tipo_gasto}</td>
                                    <td>{gasto.trabajador}</td>
                                    <td>
                                        <Button onClick={()=>gastoSelected(gasto,'Detalle')} size='sm' color='secondary'><FaSearch/></Button>{" "}
                                        <Button onClick={()=>gastoSelected(gasto,'Editar')} size="sm" color="primary"><FaEdit/></Button>{" "}
                                        <Button onClick={()=>gastoSelected(gasto,'Eliminar')} size="sm" color="danger"><FaTrashAlt/></Button>
                                    </td>
                                </tr>
                            )
                            )}
                    </tbody>
                </Table>
            
            }

            <Modal isOpen={openModalDetail}>
                <ModalHeader>
                    Detalle del Gasto #{gasto.id}
                </ModalHeader>
                <ModalBody>
                   <p>Fecha: {gasto.fecha}</p>
                   {gasto.tipo_gasto?<p>Tipo de gasto: {gasto.tipo_gasto.tipo_gasto} </p>:<p>Tipo de gasto: N/A</p>}
                   <p>Valor: {gasto.valor}</p>
                   <p>Comentario: {gasto.comentario}</p>
                   <p>Trabajador: {gasto.trabajador}</p>
                </ModalBody>
                <ModalFooter>
                    <Button  color="warning">Actualizar</Button>
                    <Button  color='danger'>Eliminar</Button>
                    <Button onClick={openModalDetailGasto} color="secondary">Cerrar</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={openModalCreate}>
                <ModalHeader>
                    {errorMessage?<div className="alert alert-danger" role="alert">{errorMessage}</div>:<>Crear Gasto</>}
                </ModalHeader>
                <ModalBody>
                    <Container>
                        <FormGroup>
                            <Label>Fecha</Label>
                            <Input onChange={handleChange} value={newGasto.fecha} name='fecha' type="date" className="form-control" id="floatingInput"  />
                        </FormGroup>
                        <FormGroup>
                            <Label for="floatingInput">Tipo de Gasto</Label>
                            <Input onChange={handleChange} name='tipo_gasto' type="select" className="form-control" id="floatingInput">
                                {tipoGastos.map((tipo)=>(
                                    <option key={tipo.id} value={tipo.id}>{tipo.tipo_gasto}</option>
                                ))}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="floatingInput">Valor</Label>
                            <Input onChange={handleChange}  name='valor' type="number" className="form-control" id="floatingInput"  />
                        </FormGroup>
                        <FormGroup>
                            <Label for="floatingInput">Comentario</Label>
                            <Input onChange={handleChange}  name='comentario' type="text" className="form-control" id="floatingInput"  />
                        </FormGroup>
                       
                        
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={gastoCreateItem} color="success">Crear Gasto</Button>
                    <Button onClick={openModalCreateGasto} color="secondary">Cerrar</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={openModalUpdate}>
                <ModalHeader>
                    Editar Gasto {gasto.id}
                </ModalHeader>
                <ModalBody>
                    <Container>
                    <FormGroup>
                            <Label>Fecha</Label>
                            <Input onChange={handleChangeUpdate} value={gasto.fecha} name='fecha' type="date" className="form-control" id="floatingInput"  />
                        </FormGroup>
                        <FormGroup>
                            <Label for="floatingInput">Tipo de Gasto</Label>
                            
                            <Input onChange={handleChangeUpdate} value={gasto.tipo_gasto && gasto.tipo_gasto.id}  name='tipo_gasto' type="select" className="form-control" id="floatingInput">
                                {tipoGastos.map((tipo)=>(
                                    <option key={tipo.id} value={tipo.id}>{tipo.tipo_gasto}</option>
                                ))}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="floatingInput">Valor</Label>
                            <Input onChange={handleChangeUpdate} value={gasto.valor} name='valor' type="number" className="form-control" id="floatingInput"  />
                        </FormGroup>
                        <FormGroup>
                            <Label for="floatingInput">Comentario</Label>
                            <Input onChange={handleChangeUpdate} value={gasto.comentario} name='comentario' type="text" className="form-control" id="floatingInput"  />
                        </FormGroup>
                        </Container>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={gastoUpdateItem} color="success">Actualizar</Button>
                    <Button onClick={openModalUpdateGasto} color="secondary">Cancelar</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={openModalDelete}>
                <ModalHeader>
                    Eliminar Gasto {gasto.id}
                </ModalHeader>
                <ModalBody>
                    Esta seguro que desea eliminar el gasto {gasto.valor}?
                </ModalBody>
                <ModalFooter>
                    <Button   onClick={gastoDeleteItem}   color="danger">Confirmar</Button>
                    <Button  onClick={openModalDeleteGasto}    color="secondary">Cancelar</Button>
                </ModalFooter>
            </Modal>
    </Container>
    
  )
}

export default GastosListPage