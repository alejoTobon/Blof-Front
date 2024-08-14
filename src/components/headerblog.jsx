import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Swal from 'sweetalert2'; // Importar SweetAlert
import imagens from '../assets/user-member-avatar-face-profile-icon-vector-22965342.jpg';
import reactLogo from '../assets/react.svg';
import './header.css';

const Header = () => {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [fechaPublicacion, setFechaPublicacion] = useState('');
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');
  const [imagen, setImagen] = useState(null); // Añadir estado para la imagen
  const userId = localStorage.getItem('userId'); // Obtener el userId del localStorage

  useEffect(() => {
    const userName = localStorage.getItem('userName');
    const userPhoto = localStorage.getItem('userPhoto');

    setUserName(userName);
    setUserImage(userPhoto);
  }, []);
  
  const handleFileChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handlePublicacionSubmit = async (e) => {
    e.preventDefault();

    if (userId !== '22') {
      Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        text: 'No tienes permiso para crear publicaciones.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('contenido', contenido);
    formData.append('fechaPublicacion', fechaPublicacion); // La fecha se envía en formato YYYY-MM-DD
    formData.append('usuarioId', userId); // Usar el userId del usuario autenticado
    if (imagen) {
      formData.append('imagen', imagen);
    }

    try {
      const response = await fetch('https://blog-ci2f.onrender.com/publicacion/crear', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json(); // Leer la respuesta JSON

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Publicación creada con éxito',
          text: 'La publicación se ha creado correctamente.',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          const modalElement = document.getElementById('crearPublicacionModal');
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal.hide();
          window.location.reload(); // Recargar la página si es necesario
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: result.mensaje || 'Hubo un problema al crear la publicación.',
          confirmButtonText: 'Aceptar'
        });
      }
    } catch (error) {
      console.error('Error al crear la publicación:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al crear la publicación.',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Vas a cerrar sesión. ¿Deseas continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear(); // Limpiar el localStorage
        window.location.href = '/'; // Redirigir al login
      }
    });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <h1 className="h1 titulo m-0">BlogReact</h1>
            </div>
          </div>

          <form className="d-flex align-items-center">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar"
              aria-label="Buscar"
              style={{ minWidth: '200px' }} // Ajuste de ancho mínimo para la responsividad
            />
            <button className="btn btn-primary" type="submit" style={{ minWidth: '100px' }}>Buscar</button>
          </form>

          <div className="user d-flex align-items-center">
            <img
              src={imagens}
              alt="Profile"
              style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
            />
            <span style={{ color: 'white' }}>{userName}</span>
          </div>

          <div className="d-flex align-items-center">
            {/* Botón para abrir el modal de publicación */}
            <button
              type="button"
              className="btn btn-secondary me-2"
              data-bs-toggle="modal"
              data-bs-target="#crearPublicacionModal"
              disabled={userId !== '22'} // Deshabilitar el botón si el usuario no tiene permisos
            >
              Crear Publicación
            </button>
            
            {/* Botón para cerrar sesión */}
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </nav>

      {/* Modal para crear publicación */}
      <div className="modal fade" id="crearPublicacionModal" tabIndex="-1" aria-labelledby="crearPublicacionModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="crearPublicacionModalLabel">Crear Publicación</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handlePublicacionSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="titulo">Título:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="titulo"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="contenido">Contenido:</label>
                  <textarea
                    className="form-control"
                    id="contenido"
                    rows="4"
                    value={contenido}
                    onChange={(e) => setContenido(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="fechaPublicacion">Fecha de Publicación:</label>
                  <input
                    type="date"
                    className="form-control"
                    id="fechaPublicacion"
                    value={fechaPublicacion}
                    onChange={(e) => setFechaPublicacion(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="imagen">Imagen:</label>
                  <input
                    type="file"
                    className="form-control"
                    id="imagen"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                  <button type="submit" className="btn btn-primary">Crear Publicación</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
