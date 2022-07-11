import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClientesContext } from '../../context/ClientesContext';
import ClienteModalDelete from './ClienteModalDelete';
import ClienteModalUpdate from './ClienteModalUpdate';


const ClienteDetailItem = () => {
  
  const {
    cliente,
    getCliente,
    openModalDeleteCliente,
    openModalUpdateCliente,
  } = useContext(ClientesContext);

  
  useEffect(()=>{
    getCliente();
  },[])
  return (
    
    <div className='container-lg'>
    
        <p>#{cliente.id}</p>
        <p>No. Identificación: {cliente.identificacion}</p>
        <p>Nombres: {cliente.nombres} {cliente.apellidos} </p>
        <p>Nombre Local: {cliente.nombre_local}</p>
        <p>Dirección: {cliente.direccion}</p>
        <p>Teléfono Principal: {cliente.telefono_principal}</p>
        <p>Teléfono Opcional: {cliente.telefono_opcional}</p>
        <p>Estado: {cliente.estado_cliente}</p>
        <p>Fecha Creación: {cliente.fecha_creacion}</p>

        <div>
          <Link to={'/clientes/'}><button className='btn btn-primary m-2'>Lista Clientes</button></Link>
          <button onClick={openModalUpdateCliente} className='btn btn-warning m-2'>Actualizar</button>
          <button onClick={openModalDeleteCliente} className='btn btn-danger m-2'>Eliminar</button>
        </div>

      <ClienteModalUpdate />
      <ClienteModalDelete />
    </div>
  )
}

export default ClienteDetailItem