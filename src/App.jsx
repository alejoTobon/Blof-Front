// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext'; // Importar el contexto de autenticación
import Login from './components/login';
import CreateUser from './components/createuser';
import Inicio from './inicio';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/create-user" element={<CreateUser />} />
                    <Route path="/inicio" element={<Inicio />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
