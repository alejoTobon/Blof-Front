import React, { useEffect, useState, useRef } from 'react';
import './cuerpo.css';
import Swal from 'sweetalert2';
import axios from 'axios';

const Contenido = ({ userId }) => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [comentario, setComentario] = useState('');
  const [comentarioFecha, setComentarioFecha] = useState('');
  const [publicacionId, setPublicacionId] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const modalRef = useRef(null);

  useEffect(() => {
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
      // Enviar el ID en el cuerpo de la solicitud GET usando axios
      const response = await axios({
        method: 'GET',
        url: 'https://blog-ci2f.onrender.com/comentario/buscar',
        params: { id: publicacionId }, // Cuerpo de la solicitud GET
        headers: {
          'Content-Type': 'application/json'
        }
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

    try {
      const response = await fetch('https://blog-ci2f.onrender.com/comentario/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contenido: comentario,
          fechaPublicacion: comentarioFecha,
          usuarioId: userId,
          publicacionId: publicacionId,
        }),
      });

      if (response.ok) {
        Swal.fire('Comentario creado con éxito!', '', 'success');
        setComentario('');
        setComentarioFecha('');
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
    <>
      {publicaciones.map((publicacion) => (
        <div className="card mb-3" key={publicacion.id}>
          <img
            src={publicacion.imagen || 'default-image.jpg'} // Cambia 'default-image.jpg' por una imagen predeterminada
            className="card-img-top mx-auto"
            alt={publicacion.titulo}
          />
          <div className="card-body text-center">
            <h5 className="card-title">{publicacion.titulo}</h5>
            <p className="card-text">{publicacion.contenido}</p>
            <p className="card-text">
              <small className="text-muted">{publicacion.fechaPublicacion}</small>
            </p>

            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-primary me-2"
                data-bs-toggle="modal"
                data-bs-target="#comentarModal"
                onClick={() => setPublicacionId(publicacion.id)} // Setea el ID de la publicación
              >
                Comentar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#verComentariosModal"
                onClick={() => fetchComentarios(publicacion.id)} // Llama a la función para ver comentarios
              >
                Ver comentarios
              </button>
            </div>
          </div>
        </div>
      ))}

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
              <h1 className="modal-title fs-5" id="comentarModalLabel">Comentar</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleComentar}>
                <div className="form-group">
                  <label htmlFor="comentario">Comentario:</label>
                  <textarea
                    className="form-control"
                    id="comentario"
                    rows="4"
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    placeholder="Ingresa tu comentario"
                    required
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="fechaComentario">Fecha:</label>
                  <input
                    type="date"
                    className="form-control"
                    id="fechaComentario"
                    value={comentarioFecha}
                    onChange={(e) => setComentarioFecha(e.target.value)}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                  <button type="submit" className="btn btn-primary">Guardar comentario</button>
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
              <h1 className="modal-title fs-5" id="verComentariosModalLabel">Comentarios</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <ul className="list-group">
                {comentarios.map((comentario) => (
                  <li key={comentario.id} className="list-group-item">
                    <strong>{comentario.usuario.nombre}:</strong> {comentario.contenido}
                    <br />
                    <small className="text-muted">{comentario.fechaPublicacion}</small>
                  </li>
                ))}
              </ul>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contenido;
