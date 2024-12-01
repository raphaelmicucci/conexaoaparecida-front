import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/navbar.jsx";
import API_BASE_URL from "../../config/apiConfig";

function OnibusAdd() {
  const navigate = useNavigate();

  const [bus, setBus] = useState({
    plate: "",
    model: "",
    capacity: "",
    driverName: "",
    status: "Disponível",
  });

  // Atualizar os dados no estado conforme o usuário altera os campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBus((prevBus) => ({
      ...prevBus,
      [name]: value,
    }));
  };

  // Enviar os dados para o backend ao enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(`${API_BASE_URL}/api/secretaria/onibus`, bus, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Ônibus cadastrado com sucesso!");
      navigate("/onibus"); // Redirecionar para a lista de ônibus
    } catch (error) {
      console.error("Erro ao cadastrar ônibus:", error);
      alert("Erro ao cadastrar o ônibus.");
    }
  };

  return (
    <div className="container-fluid mt-page">
      <Navbar />
      <div className="container mt-5">
        <h2>Cadastro de Ônibus</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="plate" className="form-label">
              Placa
            </label>
            <input
              type="text"
              className="form-control"
              id="plate"
              name="plate"
              value={bus.plate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="model" className="form-label">
              Modelo
            </label>
            <input
              type="text"
              className="form-control"
              id="model"
              name="model"
              value={bus.model}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="capacity" className="form-label">
              Capacidade
            </label>
            <input
              type="number"
              className="form-control"
              id="capacity"
              name="capacity"
              value={bus.capacity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="driverName" className="form-label">
              Nome do Motorista
            </label>
            <input
              type="text"
              className="form-control"
              id="driverName"
              name="driverName"
              value={bus.driverName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              className="form-control"
              id="status"
              name="status"
              value={bus.status}
              onChange={handleChange}
            >
              <option value="Disponível">Disponível</option>
              <option value="Indisponível">Indisponível</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Salvar
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => navigate("/onibus")}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}

export default OnibusAdd;
