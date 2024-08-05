import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import CreateUser from './components/createuser';
import Inicio from './inicio';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/create-user" element={<CreateUser />} />
                <Route path="/inicio" element={<Inicio />} />
            </Routes>
        </Router>
    );
};

export default App;
