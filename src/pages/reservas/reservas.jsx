import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../../components/navbar/navbar.jsx";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import "./reservas.css";

function Reservas() {
  const [reservas, setReservas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const roles = JSON.parse(localStorage.getItem('roles'));

    if (!token || !roles || !roles.includes('ROLE_COORDENADOR')) {
      navigate('/login');
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
            <select>
              <option value="">Todas as Reservas</option>
            </select>
          </div>
          <button className="btn btn-primary" type="button">Filtrar</button>
        </div>
      </div>
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Origem</th>
              <th>Destino</th>
              <th>Data</th>
              <th>Ônibus</th>
              <th>Status</th>
              <th>Valor</th>
              <th>Passageiros</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva, id) => (
              <tr key={id}>
                <td>{reserva.origem}</td>
                <td>{reserva.destino}</td>
                <td>{reserva.data || 'N/A'}</td>
                <td>{reserva.onibus}</td>
                <td>{reserva.status}</td>
                <td>{reserva.valor}</td>
                <td>
                  <div className="passengers-list">
                    {Array.isArray(reserva.passengers) ? reserva.passengers.map(passageiro => (
                      <div key={passageiro.id} className="passenger-card">
                        <div><strong>Nome:</strong> {passageiro.nome || 'N/A'}</div>
                        <div><strong>RG:</strong> {passageiro.rg || 'N/A'}</div>
                        <div><strong>Nascimento:</strong> {passageiro.data_nascimento || 'N/A'}</div>
                        <div><strong>Telefone:</strong> {passageiro.telefone || 'N/A'}</div>
                        <div><strong>Email:</strong> {passageiro.email || 'N/A'}</div>
                      </div>
                    )) : <div>Nenhum passageiro</div>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reservas;
