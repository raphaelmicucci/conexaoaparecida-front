import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.jsx";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./reservas.css";
import API_BASE_URL from "../../config/apiConfig";

function Reservas() {
  const [reservas, setReservas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const roles = JSON.parse(localStorage.getItem("roles"));

    if (!token || !roles || !roles.includes("ROLE_COORDENADOR")) {
      navigate("/");
    } else {
      fetchReservas(token);
    }
  }, [navigate]);

  const fetchReservas = async (token) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/coordenador/reservas`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setReservas(response.data);
    } catch (error) {
      console.error("Erro ao buscar reservas:", error);
    }
  };

  const handleDeleteReserva = async (reservaId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `${API_BASE_URL}/api/coordenador/reservas/${reservaId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Reserva apagada com sucesso!");
      setReservas(reservas.filter((reserva) => reserva.id !== reservaId));
    } catch (error) {
      console.error("Erro ao apagar reserva:", error);
      alert("Erro ao apagar reserva.");
    }
  };

  const handleDeletePassageiro = async (reservaId, passageiroId) => {
    const token = localStorage.getItem("token");

    // Localiza a reserva correspondente
    const reserva = reservas.find((reserva) => reserva.id === reservaId);

    if (!reserva) {
      alert("Reserva não encontrada.");
      return;
    }

    // Remove o passageiro da lista de passageiros
    const passageirosAtualizados = reserva.passageiros.filter(
      (p) => p.id !== passageiroId
    );

    // Atualiza a reserva com a lista de passageiros atualizada
    const reservaAtualizada = { ...reserva, passageiros: passageirosAtualizados };

    try {
      // Envia a requisição PUT para atualizar a reserva
      await axios.put(
        `${API_BASE_URL}/api/coordenador/reservas/${reservaId}`,
        reservaAtualizada,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Passageiro apagado com sucesso!");

      // Atualiza o estado das reservas
      setReservas(
        reservas.map((r) => (r.id === reservaId ? reservaAtualizada : r))
      );
    } catch (error) {
      console.error("Erro ao apagar passageiro:", error);
      alert("Erro ao apagar passageiro.");
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
          <button className="btn btn-primary" type="button">
            Filtrar
          </button>
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
              <th className="col-buttons">Ações</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva, id) => (
              <tr key={id}>
                <td>{reserva.origem}</td>
                <td>{reserva.destino}</td>
                <td>{reserva.data || "N/A"}</td>
                <td>{reserva.onibus}</td>
                <td>{reserva.status}</td>
                <td>{reserva.valor}</td>
                <td>
                  <div className="passengers-list">
                    {Array.isArray(reserva.passageiros) ? (
                      reserva.passageiros.map((passageiro) => (
                        <div key={passageiro.id} className="passenger-card">
                          <div>
                            <strong>Nome:</strong> {passageiro.nome || "N/A"}
                          </div>
                          <div>
                            <strong>RG:</strong> {passageiro.rg || "N/A"}
                          </div>
                          <div>
                            <strong>Nascimento:</strong>{" "}
                            {passageiro.data_nascimento || "N/A"}
                          </div>
                          <div>
                            <strong>Telefone:</strong>{" "}
                            {passageiro.telefone || "N/A"}
                          </div>
                          <div>
                            <strong>Email:</strong> {passageiro.email || "N/A"}
                          </div>
                          <button
                            className="btn btn-outline-danger btn-sm mt-2"
                            onClick={() =>
                              handleDeletePassageiro(reserva.id, passageiro.id)
                            }
                          >
                            Apagar Passageiro
                          </button>
                        </div>
                      ))
                    ) : (
                      <div>Nenhum passageiro</div>
                    )}
                  </div>
                </td>
                <td>
                  <div className="d-flex flex-column">
                    <Link
                      to={`/reservas/edit/${reserva.id}`}
                      className="btn btn-outline-primary btn-sm mb-2"
                    >
                      Editar
                    </Link>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDeleteReserva(reserva.id)}
                    >
                      Apagar
                    </button>
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
