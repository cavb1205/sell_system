import React from 'react'

const ClienteModalDetail = () => {
  return (
      
            <Modal isOpen={openModalDetail}>
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
  )
}           


export default ClienteModalDetail