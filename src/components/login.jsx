import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Swal from 'sweetalert2'; // Importar SweetAlert
import img from '../assets/Captura de pantalla 2024-07-09 071854.png';
import './login.css';
import './general.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [contrasena, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/create-user');
  };

  const enviarInicio = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://blog-ci2f.onrender.com/login/ingreso', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, contrasena }),
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: 'Has iniciado sesión correctamente.',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          // Guardar userId en el almacenamiento local
          localStorage.setItem('userId', data.userId); // Asegúrate de que data.userId contenga el valor correcto
          navigate('/inicio'); // Redirige a la página de inicio después del login exitoso
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: data.message || 'Hubo un problema al iniciar sesión.',
          confirmButtonText: 'Aceptar',
        });
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema con la solicitud. Por favor, intenta de nuevo.',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row d-flex contenedor justify-content-center">
          <div className="card mb-10" style={{ maxWidth: '640px' }}>
            <h1 className="text-center">Blog React</h1>
            <div className="row g-0">
              <div className="col-md-4 mt-4">
                <img src={img} className="img-fluid" alt="Login" />
              </div>
              <div className="col-md-8">
                <div className="card-body transparent-bg">
                  <h3 className="card-title">Login</h3>
                  <form onSubmit={enviarInicio}>
                    <div className="form-group mb-3">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={contrasena}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="boton">
                      <button type="submit" className="btn btn-primary w-100 text-center">
                        Ingresar
                      </button>
                    </div>
                    <div className="boton mt-3">
                      <button type="button" onClick={handleRegister} className="btn btn-primary w-100 text-center">
                        Registrarme
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
