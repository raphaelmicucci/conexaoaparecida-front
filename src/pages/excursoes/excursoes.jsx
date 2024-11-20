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

        if (!token ) {
            navigate('/login');
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
                            <th>Reservas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trips.map((trip, id) => (
                            <tr key={id}>
                                <td>{trip.destination}</td>
                                <td>{trip.date}</td>
                                <td>Busids</td> {/* {trip.busIds.join(', ')}*/}
                                <td>Reservas</td> {/* {trip.reservations.join(', ')}*/}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Excursoes;