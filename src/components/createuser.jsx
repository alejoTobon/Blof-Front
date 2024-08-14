import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import person from '../assets/person-circle.svg';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import { useNavigate } from 'react-router-dom'; // Importa useNavigate si estás usando react-router-dom
import './createuser.css';
import './general.css';

const CreateUser =   () => {
    const [formData, setFormData] = useState({
        nombre: '',
        foto: null,
        email: '',
        contrasena: '',
        RolId: '' // Mantén esto como una cadena para manejarlo más fácilmente en el formulario
    });
  
    const navigate = useNavigate(); // Inicializa useNavigate

    const handleChange = (e) => {
        const { id, value, files } = e.target;
        setFormData({
            ...formData,
            [id]: files ? files[0] : value // Manejar archivos o texto
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('nombre', formData.nombre);
        data.append('foto', formData.foto);  // Aquí debería ser un archivo
        data.append('email', formData.email);
        data.append('contrasena', formData.contrasena);
        data.append('RolId', parseInt(2, 10)); // Asegúrate de convertir a número
        localStorage.setItem('userName', formData.nombre);
        try {
            const response = await fetch('https://blog-ci2f.onrender.com/usuarios/crear', {
                method: 'POST',
                body: data,
                // No añadas 'Content-Type': 'multipart/form-data' manualmente, deja que el navegador lo maneje
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Usuario creado:', result);
                
                
              
         
                

                // Mostrar SweetAlert2
                await Swal.fire({
                    title: 'Éxito!',
                    text: 'Usuario creado con éxito.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });

                // Redirigir al inicio
                navigate('/'); // Reemplaza '/inicio' con la ruta a tu página de inicio
            } else {
                console.error('Error al crear el usuario:', response.statusText);
                await Swal.fire({
                    title: 'Error',
                    text: 'No se pudo crear el usuario.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            await Swal.fire({
                title: 'Error',
                text: 'No se pudo crear el usuario.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="titulo">
                    <h1 className='h1'>Blog React Registro</h1>
                </div>
                <div className="card" style={{ maxWidth: '30rem' }}>
                    <div className="img d-flex justify-content-center">
                        <img src={person} alt="Profile" className='icon' />
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit} encType='multipart/form-data'>
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">Nombre</label>
                                <input type="text" className="form-control" id="nombre" value={formData.nombre} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="foto" className="form-label">Foto</label>
                                <input type="file" className="form-control" name='foto' id="foto" onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contrasena" className="form-label">Contraseña</label>
                                <input type="password" className="form-control" id="contrasena" value={formData.contrasena} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                      
                                <input type="number" className="form-control" id="RolId" value={formData.RolId} hidden onChange={handleChange} />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Guardar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateUser;
