import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.jsx";

function ReservasEdit() {
  const { id_reserva } = useParams();
  const navigate = useNavigate();

  const [reserva, setReserva] = useState(null);
  const [novoPassageiro, setNovoPassageiro] = useState({
    nome: "",
    rg: "",
    data_nascimento: "",
    telefone: "",
    email: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      fetchReserva(token);
    }
  }, [id_reserva, navigate]);

  const fetchReserva = async (token) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/coordenador/reservas/${id_reserva}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setReserva(response.data);
    } catch (error) {
      console.error("Erro ao carregar reserva:", error);
      alert("Erro ao carregar reserva.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReserva((prev) => ({ ...prev, [name]: value }));
  };

  const handlePassageiroChange = (e) => {
    const { name, value } = e.target;
    setNovoPassageiro((prev) => ({ ...prev, [name]: value }));
  };

  const addPassageiro = () => {
    setReserva((prev) => ({
      ...prev,
      passageiros: [...(prev.passageiros || []), novoPassageiro],
    }));
    setNovoPassageiro({
      nome: "",
      rg: "",
      data_nascimento: "",
      telefone: "",
      email: "",
    });
  };

  const removePassageiro = (id) => {
    setReserva((prev) => ({
      ...prev,
      passageiros: prev.passageiros.filter((p, index) => index !== id),
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:8080/api/coordenador/reservas/${id_reserva}`,
        reserva,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Reserva atualizada com sucesso!");
      navigate("/reservas");
    } catch (error) {
      console.error("Erro ao salvar reserva:", error);
      alert("Erro ao salvar reserva.");
    }
  };

  if (!reserva) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container-fluid mt-page">
      <Navbar />
      <div className="container mt-4">
        <h2>Editar Reserva</h2>
        <div className="form-group mt-3">
          <label>Origem</label>
          <input
            type="text"
            className="form-control"
            name="origem"
            value={reserva.origem}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mt-3">
          <label>Destino</label>
          <input
            type="text"
            className="form-control"
            name="destino"
            value={reserva.destino}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mt-3">
          <label>Data</label>
          <input
            type="date"
            className="form-control"
            name="data"
            value={reserva.data || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mt-3">
          <label>Ônibus</label>
          <input
            type="text"
            className="form-control"
            name="onibus"
            value={reserva.onibus}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mt-3">
          <label>Valor</label>
          <input
            type="number"
            className="form-control"
            name="valor"
            value={reserva.valor}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mt-3">
          <label>Status</label>
          <input
            type="text"
            className="form-control"
            name="status"
            value={reserva.status}
            onChange={handleInputChange}
          />
        </div>

        <h4 className="mt-4">Passageiros</h4>
        {reserva.passageiros && reserva.passageiros.length > 0 ? (
          reserva.passageiros.map((passageiro, index) => (
            <div key={index} className="passenger-card">
              <div><strong>Nome:</strong> {passageiro.nome}</div>
              <div><strong>RG:</strong> {passageiro.rg}</div>
              <div><strong>Data de Nascimento:</strong> {passageiro.data_nascimento}</div>
              <div><strong>Telefone:</strong> {passageiro.telefone}</div>
              <div><strong>E-mail:</strong> {passageiro.email}</div>
              <button
                className="btn btn-outline-danger btn-sm mt-2"
                onClick={() => removePassageiro(index)}
              >
                Remover Passageiro
              </button>
            </div>
          ))
        ) : (
          <p>Nenhum passageiro adicionado</p>
        )}

        <div className="form-group mt-3">
          <label>Adicionar Novo Passageiro</label>
          <input
            type="text"
            placeholder="Nome"
            className="form-control mb-2"
            name="nome"
            value={novoPassageiro.nome}
            onChange={handlePassageiroChange}
          />
          <input
            type="text"
            placeholder="RG"
            className="form-control mb-2"
            name="rg"
            value={novoPassageiro.rg}
            onChange={handlePassageiroChange}
          />
          <input
            type="date"
            placeholder="Data de Nascimento"
            className="form-control mb-2"
            name="data_nascimento"
            value={novoPassageiro.data_nascimento}
            onChange={handlePassageiroChange}
          />
          <input
            type="text"
            placeholder="Telefone"
            className="form-control mb-2"
            name="telefone"
            value={novoPassageiro.telefone}
            onChange={handlePassageiroChange}
          />
          <input
            type="email"
            placeholder="E-mail"
            className="form-control mb-2"
            name="email"
            value={novoPassageiro.email}
            onChange={handlePassageiroChange}
          />
          <button className="btn btn-outline-primary mt-2" onClick={addPassageiro}>
            Adicionar Passageiro
          </button>
        </div>

        <button className="btn btn-primary mt-4" onClick={handleSave}>
          Salvar Alterações
        </button>
      </div>
    </div>
  );
}

export default ReservasEdit;
