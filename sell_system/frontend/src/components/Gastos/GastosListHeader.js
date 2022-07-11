import React from 'react'


const GastosListHeader = ({gastos,totalGastos}) => {
    console.log(gastos)
  return (
    <div className="text-center">
        <h1>Lista de Gastos</h1>
        {gastos.message?
            <span># de Gastos: 0</span>:
            <span># de Gastos: {gastos.length}</span>
    }
        <p>Total Gastos: {totalGastos()}</p>
        
    </div>
  )
}

export default GastosListHeader