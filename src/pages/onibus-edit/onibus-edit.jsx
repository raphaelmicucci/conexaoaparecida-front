import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/navbar.jsx";
import API_BASE_URL from "../../config/apiConfig";

function OnibusEdit() {
  const { id } = useParams(); // ID do ônibus vindo da URL
  const navigate = useNavigate();
  const [bus, setBus] = useState({
    plate: "",
    model: "",
    capacity: "",
    driverName: "",
    status: "Disponível",
  });

  const [loading, setLoading] = useState(true);

  // Buscar os dados do ônibus ao carregar a página
  useEffect(() => {
    const fetchBus = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/secretaria/onibus/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBus(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar os dados do ônibus:", error);
        alert("Erro ao carregar os dados do ônibus.");
        navigate("/onibus");
      }
    };

    fetchBus();
  }, [id, navigate]);

  // Atualizar os dados no estado conforme o usuário altera os campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBus((prevBus) => ({
      ...prevBus,
      [name]: value,
    }));
  };

  // Enviar as alterações para o backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `${API_BASE_URL}/api/secretaria/onibus/${id}`,
        bus,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Ônibus atualizado com sucesso!");
      navigate("/onibus"); // Redirecionar para a lista de ônibus
    } catch (error) {
      console.error("Erro ao atualizar o ônibus:", error);
      alert("Erro ao atualizar o ônibus.");
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container-fluid mt-page">
      <Navbar />
      <div className="container mt-5">
        <h2>Editar Ônibus</h2>
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
            Salvar Alterações
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

export default OnibusEdit;
