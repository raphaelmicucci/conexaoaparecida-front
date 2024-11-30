import "react-confirm-alert/src/react-confirm-alert.css"; // Import CSS
import Navbar from "../../components/navbar/navbar.jsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./onibus.css";

function Onibus() {
  const [onibus, setOnibus] = useState([]); // Estado para armazenar os ônibus

  // Função para buscar os ônibus do endpoint
  useEffect(() => {
    const fetchOnibus = async () => {
      const token = localStorage.getItem("token"); // Token de autenticação
      try {
        const response = await axios.get("http://localhost:8080/api/secretaria/onibus", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Ajusta os dados para o formato esperado
        setOnibus(response.data);
      } catch (error) {
        console.error("Erro ao buscar ônibus:", error);
      }
    };
    fetchOnibus();
  }, []);

  // Função para excluir um ônibus
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8080/api/secretaria/onibus/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Ônibus excluído com sucesso!");
      setOnibus(onibus.filter((bus) => bus.id !== id)); // Atualiza o estado
    } catch (error) {
      console.error("Erro ao excluir ônibus:", error);
      alert("Erro ao excluir ônibus.");
    }
  };

  return (
    <div className="container-fluid mt-page">
      <Navbar />

      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2 className="d-inline">Ônibus</h2>
          <Link to="/onibus/add" className="btn btn-outline-primary ms-5 mb-2">
            Cadastro de Ônibus
          </Link>
        </div>

        <div className="d-flex justify-content-end">
          <div className="form-control ms-3 me-3">
            <select>
              <option value="">Todos os Ônibus</option>
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
              <th scope="col" className="col-sm-3">Placa</th>
              <th scope="col" className="col-sm-3">Modelo</th>
              <th scope="col" className="col-sm-2">Motorista</th>
              <th scope="col" className="col-sm-2">Status</th>
              <th scope="col" className="col-sm-1">Capacidade</th>
              <th scope="col" className="col-buttons">Ações</th>
            </tr>
          </thead>
          <tbody>
            {onibus.map((bus) => (
              <tr key={bus.id}>
                <td>{bus.plate}</td>
                <td>{bus.model}</td>
                <td>{bus.driverName}</td>
                <td>{bus.status}</td>
                <td>{bus.capacity}</td>
                <td>
                  <div className="d-flex">
                    <Link
                      to={`/onibus/edit/${bus.id}`}
                      className="btn btn-outline-primary btn-sm me-2"
                    >
                      Editar
                    </Link>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(bus.id)}
                    >
                      Excluir
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

export default Onibus;
