
import React,{useContext,useEffect,useState} from 'react';
import {Alert,Table,Button,Container,} from 'reactstrap';
import { FaPlusCircle } from "react-icons/fa";

import ClientesHeaderListPage from "../components/Clientes/ClientesHeaderListPage"


import ClientesTableListItems from '../components/Clientes/ClientesTableListItems';
import { ClientesContext } from '../context/ClientesContext';
import ClienteModalCreate from '../components/Clientes/ClienteModalCreate';
import ClienteModalUpdate from '../components/Clientes/ClienteModalUpdate';
import ClienteModalDelete from '../components/Clientes/ClienteModalDelete';

const ClientesListPage = () => {
    const {
       clientes,
       clienteSelected,
       getClientes,
       openModalCreateCliente,
    } = useContext(ClientesContext)

    useEffect(()=>{
        getClientes()
    },[])
    
    
  return (
    <Container>
            <ClientesHeaderListPage clientes={clientes}/>

            <Button className='m-3' onClick={openModalCreateCliente} color="success"><FaPlusCircle/>  Cliente</Button>
            
                {clientes.message? <Alert color="info">{clientes.message}</Alert>: 
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombres</th>
                            <th>Negocio</th>
                            <th>Dirección</th>
                            <th>Teléfono</th>
                            <th>Estado</th>  
                        </tr>
                    </thead>
                    <tbody>
                            {clientes.map((cliente) => (
                                <ClientesTableListItems key={cliente.id} props={{cliente,clienteSelected}} />
                            )
                            )}
                    </tbody>
                </Table>
                }           
            
                <ClienteModalCreate/>
                <ClienteModalUpdate /> 
                <ClienteModalDelete />
                

    </Container>
  )
}

export default ClientesListPage