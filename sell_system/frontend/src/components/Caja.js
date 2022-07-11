import React,{useContext} from 'react';
import {Badge} from 'reactstrap';
import { TiendaContext } from '../context/TiendaContext';


const Caja = () => {
  const {tienda} = useContext(TiendaContext)
  

  return (
    (tienda.caja>0)? <Badge color='success'>Caja {tienda.caja}</Badge>:<Badge color='danger'>Caja {tienda.caja}</Badge>
    
  )
}

export default Caja