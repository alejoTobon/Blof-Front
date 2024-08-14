import React, { useEffect, useState, useRef } from 'react';
import './cuerpo.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Contenido = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [comentario, setComentario] = useState('');
  const [publicacionId, setPublicacionId] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [userId, setUserId] = useState('');
  const modalRef = useRef(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Devuelve solo la parte de la fecha YYYY-MM-DD
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setUserId(userId);
    const fetchPublicaciones = async () => {
      try {
        const response = await fetch('https://blog-ci2f.onrender.com/publicacion/buscar');
        const data = await response.json();
        setPublicaciones(data.publicaciones);
      } catch (error) {
        console.error('Error al cargar las publicaciones:', error);
      }
    };

    fetchPublicaciones();
  }, []);

  const fetchComentarios = async (publicacionId) => {
    try {
      const response = await axios({
        method: 'GET',
        url: 'https://blog-ci2f.onrender.com/comentario/buscar',
        params: { id: publicacionId },
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        setComentarios(response.data.comentarios);
      } else {
        Swal.fire('Error al cargar comentarios', '', 'error');
      }
    } catch (error) {
      console.error('Error al cargar comentarios:', error);
      Swal.fire('Error al cargar comentarios', '', 'error');
    }
  };

  const handleComentar = async (e) => {
    e.preventDefault();

    const fechaActual = new Date().toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD

    try {
      const response = await fetch('https://blog-ci2f.onrender.com/comentario/crear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contenido: comentario,
          fechaPublicacion: fechaActual,
          usuarioId: userId,
          publicacionId: publicacionId,
        }),
      });

      if (response.ok) {
        Swal.fire('Comentario creado con éxito!', '', 'success');
        setComentario('');
        if (modalRef.current) {
          const modal = new bootstrap.Modal(modalRef.current);
          modal.hide();
        }
      } else {
        Swal.fire('Error al crear comentario', '', 'error');
      }
    } catch (error) {
      console.error('Error al crear comentario:', error);
      Swal.fire('Error al crear comentario', '', 'error');
    }
  };

  return (
    <div className="container my-4">
      <div className="row">
        {publicaciones.map((publicacion) => (
          <div className="col-md-6 col-lg-4 mb-4" key={publicacion.id}>
            <div className="card h-100">
              <img
                src={publicacion.imagenUrl || 'default-image.jpg'}
                className="card-img-top"
                alt={publicacion.titulo}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{publicacion.titulo}</h5>
                <p className="card-text flex-grow-1">{publicacion.contenido}</p>
                <p className="card-text">
                  <small className="text-muted">{formatDate(publicacion.fechaPublicacion)}</small>
                </p>
                <div className="d-flex flex-column flex-md-row justify-content-between mt-2">
                  <button
                    type="button"
                    className="btn btn-primary mb-2 mb-md-0"
                    data-bs-toggle="modal"
                    data-bs-target="#comentarModal"
                    onClick={() => setPublicacionId(publicacion.id)}
                  >
                    Comentar
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-toggle="modal"
                    data-bs-target="#verComentariosModal"
                    onClick={() => fetchComentarios(publicacion.id)}
                  >
                    Ver comentarios
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para crear comentario */}
      <div
        className="modal fade"
        id="comentarModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="comentarModalLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="comentarModalLabel">
                Comentar
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleComentar}>
                <div className="mb-3">
                  <label htmlFor="comentario" className="form-label">Comentario:</label>
                  <textarea
                    className="form-control"
                    id="comentario"
                    rows="4"
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    placeholder="Ingresa tu comentario"
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Cerrar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Guardar comentario
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para ver comentarios */}
      <div
        className="modal fade"
        id="verComentariosModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="verComentariosModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="verComentariosModalLabel">
                Comentarios
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {comentarios.length > 0 ? (
                <ul className="list-group">
                  {comentarios.map((comentario) => (
                    <li key={comentario.id} className="list-group-item">
                      <strong>{comentario.usuario.nombre}:</strong> {comentario.contenido}
                      <br />
                      <small className="text-muted">{formatDate(comentario.fechaPublicacion)}</small>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay comentarios disponibles.</p>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contenido;
