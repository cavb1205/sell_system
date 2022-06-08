import React from 'react';

const AporteItem = ({aporte}) => {
  return (
    <div>
        <h3 key={aporte.id}>{aporte.id} {aporte.fecha} {aporte.valor}</h3>
    </div>
  )
}

export default AporteItem;