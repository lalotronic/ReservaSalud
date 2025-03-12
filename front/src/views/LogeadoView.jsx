import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const logeado = () => {
    const navigate = useNavigate();
    const { logout } = useAuth(); 

    // Ejemplos de funciones para navegar a otras vistas
    const goToView1 = () => {
        alert('sección en construcción.');
    };
    const goToView2 = () => {
        alert('sección en construcción.');
    };
    const goToView3 = () => {
        alert('sección en construcción.');
    };
    const handleLogout = () => {
        logout(); // Llama a la función logout
        navigate('/login'); // Redirige a la página de login
    };
    return (
        <main className="container my-5 pt-5">
            <div className="row">
                <div className="col text-center">
                    <h1 className="text-success">Perfil Paciente</h1>
                    <p className="lead text-secondary">
                        Bienvenido estimado paciente. Elige una de las opciones para continuar.
                    </p>
                </div>
            </div>

            {/* Botones */}
            <div className="row justify-content-center mt-4">
                <div className="col-12 col-md-8 d-flex flex-column flex-md-row justify-content-around">
                    <button
                        className="btn btn-custom-green mb-3 mb-md-0"
                        onClick={goToView1}
                        style={{ minWidth: '120px' }}
                    >
                        Resultado Exámenes
                    </button>

                    <button
                        className="btn btn-custom-green mb-3 mb-md-0"
                        onClick={goToView2}
                        style={{ minWidth: '120px' }}
                    >
                        Licencia Médica
                    </button>

                    <button
                        className="btn btn-custom-green"
                        onClick={goToView3}
                        style={{ minWidth: '120px' }}
                    >
                        Historial Clínico
                    </button>

                    <button
                        className="btn btn-custom-green"
                        onClick={handleLogout}
                        style={{ minWidth: '120px' }}
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </main>
    );
};

export default logeado;