import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Swal from 'sweetalert2'; // Importar SweetAlert

import reactLogo from '../assets/react.svg';
import './header.css';

const Header = ({ userId }) => {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [fechaPublicacion, setFechaPublicacion] = useState('');
  const [imagen, setImagen] = useState(null);
  const [comentarioContenido, setComentarioContenido] = useState('');
  const [publicacionId, setPublicacionId] = useState('');

  const handleFileChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleComentarioSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://blog-ci2f.onrender.com/comentario/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contenido: comentarioContenido,
          fechaPublicacion,
          usuarioId: 1,
          publicacionId
        })
      });

      const result = await response.json(); // Leer la respuesta JSON

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Comentario creado con éxito',
          text: 'El comentario se ha creado correctamente.',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          const modalElement = document.getElementById('crearComentarioModal');
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal.hide();
          window.location.reload(); // Recargar la página si es necesario
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: result.message || 'Hubo un problema al crear el comentario.',
          confirmButtonText: 'Aceptar'
        });
      }
    } catch (error) {
      console.error('Error al crear el comentario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al crear el comentario.',
        confirmButtonText: 'Aceptar'
      });
    }
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
              src="/src/assets/chris-hemsworth.webp"
              alt="Profile"
              style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} // Reducir el tamaño de la imagen de perfil
            />
            <span style={{ color: 'white', display: 'none' }}>Alejandro Tobón</span> {/* Ocultar nombre para la responsividad */}
          </div>

          {/* Botón para abrir el modal de comentario */}
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-toggle="modal"
            data-bs-target="#crearComentarioModal"
          >
            Crear Comentario
          </button>
        </div>
      </nav>

      {/* Modal para crear comentario */}
      <div className="modal fade" id="crearComentarioModal" tabindex="-1" aria-labelledby="crearComentarioModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="crearComentarioModalLabel">Crear Comentario</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleComentarioSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="comentarioContenido">Contenido:</label>
                  <textarea
                    className="form-control"
                    id="comentarioContenido"
                    rows="4"
                    value={comentarioContenido}
                    onChange={(e) => setComentarioContenido(e.target.value)}
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
                  <label htmlFor="publicacionId">ID de Publicación:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="publicacionId"
                    value={publicacionId}
                    onChange={(e) => setPublicacionId(e.target.value)}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                  <button type="submit" className="btn btn-primary">Crear Comentario</button>
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
