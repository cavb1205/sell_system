import React,{useContext} from 'react';
import {Alert,Table,Button,Modal,ModalBody,ModalFooter,Container, ModalHeader, FormGroup, Label, Input} from 'reactstrap';
import { ClientesContext } from '../../context/ClientesContext';

const ClienteModalUpdate = () => {
    const {
        cliente,
        openModalUpdate,
        handleChangeUpdate,
        clienteUpdateItem,
        openModalUpdateCliente,

    } = useContext(ClientesContext)
  return (
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
  )
}

export default ClienteModalUpdate