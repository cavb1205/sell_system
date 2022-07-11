import React from 'react'

const HomePageTiendaInfo = ({tienda}) => {
  return (
      <div className="card border-secondary shadow">
        <div className="card-header">
          Informaión Básica
        </div>
        <div className="card-body">
          
          <p className="card-text">Ciudad: {tienda.ciudad}</p>
          <p className="card-text">Teléfono: {tienda.telefono}</p>
          <p className="card-text">Moneda: {tienda.moneda && tienda.moneda.codigo}</p>
          <p className="card-text">Estado: {tienda.estado?<span>Activa</span>:<span>Inactiva</span>}</p>
          
          
        </div>
        <div className="card-footer text-muted">
          Fecha Registro {tienda.fecha_registro}
        </div>
      </div> 
  )
}

export default HomePageTiendaInfo