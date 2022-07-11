import React from 'react';
import { FaEdit,FaTrashAlt,FaSearch } from "react-icons/fa";
import {Button} from 'reactstrap';



const ClientesTableListItems = ({props}) => {
   
    
  return (
    
    <tr>
   
        <th scope="row">{props.cliente.id}</th>
        <td>{props.cliente.nombres} {props.cliente.apellidos} </td>
        <td>{props.cliente.nombre_local}</td>
        <td>{props.cliente.direccion}</td>
        <td>{props.cliente.telefono_principal}</td>
        <td>{props.cliente.estado_cliente}</td>
        
        
        <td>
            <Button onClick={()=>props.clienteSelected(props.cliente,'Detalle')} size='sm' color='secondary'><FaSearch/></Button>{" "}
            <Button onClick={()=>props.clienteSelected(props.cliente,'Editar')} size="sm" color="primary"><FaEdit/></Button>{" "}
            <Button onClick={()=>props.clienteSelected(props.cliente,'Eliminar')} size="sm" color="danger"><FaTrashAlt/></Button>
        </td>
    </tr>
  )
}

export default ClientesTableListItems