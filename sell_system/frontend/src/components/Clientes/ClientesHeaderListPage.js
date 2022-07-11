import React from 'react';


const ClientesHeaderListPage = ({clientes}) => {
 

  return (
    <div className="text-center">
        <h1>Lista de Clientes</h1>
        <span>Total: {clientes.length} </span>
    </div>
  )
}

export default ClientesHeaderListPage