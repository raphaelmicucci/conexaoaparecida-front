import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../../components/navbar/navbar.jsx";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import "./excursoes.css";
import { Link } from 'react-router-dom';

function Excursoes() {
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const roles = JSON.parse(localStorage.getItem('roles'));

        if (!token || !roles || !roles.includes('ROLE_COORDENADOR')) {
            navigate('/');
        } else {
            fetchTrips(token);
        }
    }, [navigate]);

    const fetchTrips = async (token) => {
        try {
            const response = await axios.get('http://localhost:8080/api/secretaria/excursao', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTrips(response.data);
        } catch (error) {
            console.error('Error fetching trips:', error);
        }
    };

    return (
        <div className="container-fluid mt-page">
            <Navbar />
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <h2 className="d-inline">Excursões</h2>
                    <Link to="/excursoes/add" className="btn btn-outline-primary ms-5 mb-2">
                        Nova Excursão
                    </Link>
                </div>
                <div className="d-flex justify-content-end">
                    <div className="form-control ms-3 me-3">
                        <select>
                            <option value="">Todos as Excursões</option>
                        </select>
                    </div>
                    <button className="btn btn-primary" type="button">Filtrar</button>
                </div>
            </div>
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Destino</th>
                            <th>Data</th>
                            <th>Ônibus</th>
                            <th>Lista de Espera</th>
                            <th>Controles de Presença</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trips.map((trip, id) => (
                            <tr key={id}>
                                <td>{trip.destination}</td>
                                <td>{trip.data || 'N/A'}</td>
                                <td>{Array.isArray(trip.onibus) ? trip.onibus.map(bus => bus.plate).join(', ') : 'N/A'}</td>
                                <td>{Array.isArray(trip.lista_espera) ? trip.lista_espera.map(lista => lista.nome).join(', ') : 'N/A'}</td>
                                <td>
                                    {Array.isArray(trip.controles_presenca) ? trip.controles_presenca.map(controle => (
                                        <div key={controle.id}>
                                            <div>Tipo: {controle.tipo_chamada}</div>
                                            <div>Data: {controle.data_chamada}</div>
                                            <div>Passageiros: {controle.passageiros.map(passageiro => passageiro.nome).join(', ')}</div>
                                        </div>
                                    )) : 'N/A'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Excursoes;