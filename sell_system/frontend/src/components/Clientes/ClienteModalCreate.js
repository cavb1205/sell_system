import React, { useContext } from 'react'
import { ClientesContext } from '../../context/ClientesContext'
import {Alert,Table,Button,Modal,ModalBody,ModalFooter,Container, ModalHeader, FormGroup, Label, Input} from 'reactstrap';
const ClienteModalCreate = () => {
    const {
        openModalCreate,
        errorMessage,
        handleChange,
        clienteCreateItem,
        openModalCreateCliente,
    }=useContext(ClientesContext)
  return (
     <Modal isOpen={openModalCreate}>
            <ModalHeader>
                {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                Crear Cliente
            </ModalHeader>
            <ModalBody>
                <Container>
                    <FormGroup>
                        <Label># Identificación</Label>
                        <Input onChange={handleChange} name='identificacion' type="text" className="form-control" id="floatingInput" placeholder="Identificación" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="floatingInput">Nombres</Label>
                        <Input onChange={handleChange}  name='nombres' type="text" className="form-control" id="floatingInput" placeholder="nombres" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="floatingInput">Apellidos</Label>
                        <Input onChange={handleChange}  name='apellidos' type="text" className="form-control" id="floatingInput" placeholder="Apellidos" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="floatingInput">Nombre Local</Label>
                        <Input onChange={handleChange}  name='nombre_local' type="text" className="form-control" id="floatingInput" placeholder="Nombre del local" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="floatingInput">Teléfono</Label>
                        <Input onChange={handleChange}  name='telefono_principal' type="text" className="form-control" id="floatingInput" placeholder="Teléfono principal" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="floatingInput">Dirección</Label>
                        <Input onChange={handleChange}  name='direccion' type="text" className="form-control" id="floatingInput" placeholder="Dirección casa o local" />
                    </FormGroup>
                </Container>
            </ModalBody>
            <ModalFooter>
                <Button onClick={clienteCreateItem} color="success">Crear Cliente</Button>
                <Button onClick={openModalCreateCliente} color="secondary">Cerrar</Button>
            </ModalFooter>
        </Modal>
  )
}

export default ClienteModalCreate