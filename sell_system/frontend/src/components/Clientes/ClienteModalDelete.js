import React,{useContext} from 'react'
import {Button,Modal,ModalBody,ModalFooter, ModalHeader, FormGroup, Label, Input} from 'reactstrap';
import { ClientesContext } from '../../context/ClientesContext';

const ClienteModalDelete = () => {
  const {
    cliente,
    openModalDeleteCliente,
    openModalDelete,
    clienteDeleteItem,
  } = useContext(ClientesContext);
  return (  
            <Modal isOpen={openModalDelete}>
                    <ModalHeader>
                        Eliminar Cliente {cliente.id}
                        </ModalHeader>
                        <ModalBody>
                        Esta seguro que desea eliminar el cliente {cliente.nombres} {cliente.apellidos}?
                        </ModalBody>
                        <ModalFooter>
                        <Button   onClick={clienteDeleteItem}   color="danger">Confirmar</Button>
                        <Button  onClick={openModalDeleteCliente}    color="secondary">Cancelar</Button>
                    </ModalFooter>
                </Modal> 
  )
}

export default ClienteModalDelete