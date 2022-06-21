import React,{useContext} from 'react'
import { AuthContext } from '../context/AuthContext';
import { Button } from 'reactstrap';

const LoginPage = () => {
  const {loginUser} = useContext(AuthContext)
  return (
    <div className='container-fluid'>
      <form onSubmit={loginUser}>
        <h1 className='text-center'>Ingreso al Sistema</h1>
        <div className="form-floating mb-3">
            <input type="text" name='username' className="form-control" id="floatingInput" placeholder="Usuario" />
            <label for="floatingInput">Usuario</label>
        </div>
        <div className="form-floating">
            <input type="password" name='password' className="form-control" id="floatingPassword" placeholder="Password" />
            <label for="floatingPassword">Contraseña</label>
        </div>
        <div className='text-center mt-3'>
            <button type="submmit" className="btn btn-primary">Ingresar</button>
        </div>
      </form>
    </div>
  
  )
    
}

export default LoginPage;