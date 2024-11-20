import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../../components/navbar/navbar.jsx";
import Appointment from "../../components/appointment/appointment.jsx";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import "./reservas.css";

function Reservas() {
  const [reservas, setReservas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token ) {
      navigate('/');
    } else {
      fetchReservas(token);
    }
  }, [navigate]);

  const fetchReservas = async (token) => {
    try {
      const response = await axios.get('http://localhost:8080/api/coordenador/reservas', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReservas(response.data);
    } catch (error) {
      console.error('Error fetching reservas:', error);
    }
  };

  return (
    <div className="container-fluid mt-page">
      <Navbar />
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2 className="d-inline">Reservas</h2>
          <Link to="/reservas/add" className="btn btn-outline-primary ms-5 mb-2">
            Nova Reserva
          </Link>
        </div>
        <div className="d-flex justify-content-end">
          <div className="form-control ms-3 me-3">
            <select name="doctor" id="doctor">
              <option value="">Todos as Reservas</option>
            </select>
          </div>
          <button className="btn btn-primary" type="button">Filtrar</button>
        </div>
      </div>
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Data</th>
              <th>Buses</th>
              <th>Excursão</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva, id) => (
              <tr key={id}>
                <td>{reserva.userId}</td>
                <td>{reserva.reservationDate}</td>
                <td>{reserva.busId}</td>
                <td>{reserva.excursionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reservas;