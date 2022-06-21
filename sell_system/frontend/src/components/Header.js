import React, { useContext,useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {Button, Modal, ModalBody,ModalFooter, ModalHeader} from 'reactstrap';



const Header = () => {
  const {token,user,logoutUser} = useContext(AuthContext)
  const [openLogin,setOpenLogin] = useState(false)
  const openLoginModal=()=>{
    setOpenLogin(!openLogin)
  }
  return (
    <nav className="navbar navbar-expand-lg bg-light mb-4">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Ventas</a>
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
              <Button onClick={openLoginModal} color="danger">LoginModal</Button>
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
      
      </div>
    <Modal isOpen={openLogin}>
      <ModalHeader>
              Inicio de sesión
      </ModalHeader>
      <ModalBody>
              
      </ModalBody>
      <ModalFooter>
              <Button color='success'>Inicial Sesión</Button>
              <Button color='info' onClick={openLoginModal}>Cerrar</Button>
      </ModalFooter>
    </Modal>
    </nav>
    

    
  )
}



export default Header



//*{user ? (
//  <ul>
//    <li>Usuario: {user}</li>
//    <li onClick={logoutUser} ><a>Salir</a></li>
//  </ul>
//  
//  ): (
//    <Link to="/login/" >Login</Link>
//  )
//}
