import React from 'react';
import './cuerpo.css'
const Contenido = () => {
  return (
    <>


<div class="card mb-3">
  <img src="https://media.istockphoto.com/id/1569285773/es/foto/mano-de-una-joven-que-usa-un-tel%C3%A9fono-inteligente-para-chatear-y-comunicarse.jpg?s=2048x2048&w=is&k=20&c=sQlCR0wmD26K7hrtUkneUA0-m_S9GpXscbD5ot4l7bU=" class="card-img-top mx-auto" alt="..." />
  <div class="card-body text-center">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>

   
    <div class="d-flex justify-content-center">
      <button type="button" class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#comentarModal">
        Comentar
      </button>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#verComentariosModal">
        Ver comentarios
      </button>
    </div>
  </div>


  <div class="modal fade" id="comentarModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="comentarModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="comentarModalLabel">Comentar</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
     
        <form>
       
        <div class="form-group">
            <label for="comentario">Comentario:</label>
            <textarea class="form-control" id="comentario" rows="4" placeholder="Ingresa tu comentario"></textarea>
        </div>
       
    </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          <button type="button" class="btn btn-primary">Guardar comentario</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="verComentariosModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="verComentariosModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="verComentariosModalLabel">Ver comentarios</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
         
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          <button type="button" class="btn btn-primary">Aceptar</button>
        </div>
      </div>
    </div>
  </div>

</div>



    </>
  );
}

export default Contenido;
