import React from 'react'

const HomePageTiendaCardItem = ({tipo,tienda,total}) => {
    const cardColor = ()=>{
        if(tipo==="Inversión"){
            return "info";
        }else if (tipo==="Gastos"){
            return "warning";
        } else if (tipo==="Utilidades"){
            return "success";
        } else if (tipo==="Pérdidas"){
            return "danger";
        } else if (tipo==="Ingresos x Ventas"){
            return "success";
        } else {
            return "secondary";
        }
    }
  return (
    <div className={`card border-${cardColor()} mb-3 shadow`} >
        <div className={`card-body text-${cardColor()}`}>
            <h4 className="card-title">{tipo}</h4>
            <h2 className="card-text">$ {total} {tienda.moneda && <span>{tienda.moneda.codigo}</span>}</h2>
        </div>
    </div>
  )
}

export default HomePageTiendaCardItem