import React from 'react'
import { Link } from 'react-router-dom'
import AporteItem from './AporteItem'

const AportesListItem = ({aporte}) => {
  return (
    
        <Link aporte={aporte} to={`/aportes/${aporte.id}/`}><li  className='list-group-item'>{aporte.id} - {aporte.fecha} - {aporte.valor} - {aporte.trabajador}  </li></Link>                  
    
  )
}

export default AportesListItem