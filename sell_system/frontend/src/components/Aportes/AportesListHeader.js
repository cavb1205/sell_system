import React from 'react'

const AportesListHeader = ({totalAportes,aportes}) => {
  return (
    <div className="text-center">
        <h1>Lista de Aportes</h1>
        {aportes.message?
        <span># de Aportes: 0</span>:
        <span># de Aportes: {aportes.length}</span>
      }
        <p>Total Aportado: {totalAportes()}</p>
    </div>
  )
}

export default AportesListHeader