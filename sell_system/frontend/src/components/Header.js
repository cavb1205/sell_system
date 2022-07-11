import React, { useContext,useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import Caja from './Caja';

const Header = () => {
  const {
    user,
    logoutUser
  } = useContext(AuthContext)
  
  
  
  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg bg-light mb-4">
        {user? 
        <>
        <span className="navbar-brand p-2"><Caja /></span>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/aportes/">Aportes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/gastos/">Gastos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/clientes/">Clientes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/trabajadores/">Trabajadores</Link>
            </li>
           
          </ul>
          {user &&
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                
                <li className="nav-item">
                  <Link className="nav-link" to="/">Usuario: {user.username}</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-outline-light" to="/login/" onClick={logoutUser}>Salir</button>
                </li>
            </ul>        
          } 
        </div>
        
        </>:<></>}
        </nav>
    </div>
    
  )


  }

export default Header;




