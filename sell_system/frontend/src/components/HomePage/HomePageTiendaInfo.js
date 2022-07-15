import React from 'react'

const HomePageTiendaInfo = ({tienda}) => {
  return (
      <div className="card border-info shadow">
        
        <div className="card-body">
          
          <p className="card-text">Ciudad: {tienda.ciudad}</p>
          <p className="card-text">Teléfono: {tienda.telefono}</p>
          <p className="card-text">Estado: {tienda.estado?<span>Activa</span>:<span>Inactiva</span>}</p>
          
          
        </div>
        <div className="card-footer text-muted">
          Fecha Registro {tienda.fecha_registro}
        </div>
      </div> 
  )
}

export default HomePageTiendaInfo