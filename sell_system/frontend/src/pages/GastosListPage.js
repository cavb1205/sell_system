import React, { useContext } from "react";

import {Table,Button,Modal,ModalBody,ModalFooter,Container, ModalHeader, FormGroup, Label, Input} from 'reactstrap';
import { FaEdit,FaTrashAlt,FaSearch,FaPlusCircle } from "react-icons/fa";
import { GastosContext } from "../context/GastosContext";
import GastosListHeader from "../components/Gastos/GastosListHeader";
import AlertMessage from "../components/Utils/AlertMessage";
import AlertError from "../components/Utils/AlertError";
import AlertLoading from "../components/Utils/AlertLoading";




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
        loading,
        error,
    } = useContext(GastosContext)
  return (
    <Container>
            {loading? <AlertLoading/>
            :
            error? <AlertError message={'Error al cargar la información, vuelva a intentar.'} /> :
            <>
            <GastosListHeader gastos={gastos} totalGastos={totalGastos} />
            <div className="m-3">
                <button onClick={openModalCreateGasto} className="btn btn-success">Crear Gasto</button>
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
                                    {tipoGastos.map((tipo)=>(
                                        (gasto.tipo_gasto===tipo.id)?<td key={tipo.id}>{tipo.tipo_gasto}</td>:null
                                    ))}
                                    
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
                </>
            }

            <Modal isOpen={openModalDetail}>
                <ModalHeader>
                    Detalle del Gasto #{gasto.id}
                </ModalHeader>
                <ModalBody>
                   <p>Fecha: {gasto.fecha}</p>
                   <p>Tipo de gasto: {tipoGastos.map((tipo)=>(
                                        (gasto.tipo_gasto===tipo.id)?<span key={tipo.id}>  {tipo.tipo_gasto}</span>:null
                                    ))} 
                    </p>
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
                    Crear Gasto
                    {errorMessage && <AlertError message={'Por favor completar los campos del formulario.'} />}
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
                            
                            <Input onChange={handleChangeUpdate} value={gasto.tipo_gasto}  name='tipo_gasto' type="select" className="form-control" id="floatingInput">
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