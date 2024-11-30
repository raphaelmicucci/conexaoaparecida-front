import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/navbar.jsx";
import API_BASE_URL from "../../config/apiConfig"; // URL da API centralizada

function ReservasAdd() {
    const [formData, setFormData] = useState({
        origem: "",
        destino: "",
        data: "",
        onibus: "",
        status: "",
        valor: "",
        passageiros: [],
    });
    const [novoPassageiro, setNovoPassageiro] = useState({
        nome: "",
        rg: "",
        data_nascimento: "",
        telefone: "",
        email: "",
    });

    const navigate = useNavigate();

    // Função para obter o token do localStorage
    const getToken = () => localStorage.getItem("token");

    // Função para verificar se o usuário está autenticado
    const isAuthenticated = () => {
        const token = getToken();
        if (!token) {
            alert("Token não encontrado. Faça login novamente.");
            navigate("/");
            return false;
        }
        return true;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePassageiroChange = (e) => {
        const { name, value } = e.target;
        setNovoPassageiro({ ...novoPassageiro, [name]: value });
    };
    
    const adicionarPassageiro = () => {
        const passageiroComId = {
            ...novoPassageiro,
            id: crypto.randomUUID(), // Gera um ID único
        };
    
        setFormData({
            ...formData,
            passageiros: [...formData.passageiros, passageiroComId],
        });
    
        setNovoPassageiro({
            nome: "",
            rg: "",
            data_nascimento: "",
            telefone: "",
            email: "",
        });
    };
    

    const handleSave = async () => {
    if (!isAuthenticated()) return; // Verifica se está autenticado

    const token = getToken();
    const payload = {
        ...formData,
        data: new Date(formData.data).toISOString(), // Converte data para formato ISO
        valor: parseFloat(formData.valor),
        passageiros: formData.passageiros, // Certificando-se que os passageiros estão sendo enviados
    };

    try {
        const response = await axios.post(
            `${API_BASE_URL}/api/coordenador/reservas`,
            payload,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        alert("Reserva criada com sucesso!");
        navigate("/reservas");
    } catch (error) {
        console.error("Erro ao salvar reserva:", error);
        alert("Erro ao salvar a reserva. Verifique os dados e tente novamente.");
    }
};


    return (
        <>
            <Navbar />

            <div className="container-fluid mt-page">
                <div className="row col-lg-4 offset-lg-4">
                    <div className="col-12 mt-2">
                        <h2>Nova Reserva</h2>
                    </div>

                    {/* Origem */}
                    <div className="col-12 mt-4">
                        <label htmlFor="origem" className="form-label">Origem</label>
                        <input
                            type="text"
                            name="origem"
                            placeholder="Origem"
                            className="form-control"
                            value={formData.origem}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Destino */}
                    <div className="col-12 mt-4">
                        <label htmlFor="destino" className="form-label">Destino</label>
                        <input
                            type="text"
                            name="destino"
                            placeholder="Destino"
                            className="form-control"
                            value={formData.destino}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Data */}
                    <div className="col-12 mt-4">
                        <label htmlFor="data" className="form-label">Data</label>
                        <input
                            type="date"
                            name="data"
                            className="form-control"
                            value={formData.data}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Ônibus */}
                    <div className="col-12 mt-4">
                        <label htmlFor="onibus" className="form-label">Ônibus</label>
                        <input
                            type="text"
                            name="onibus"
                            placeholder="Ônibus"
                            className="form-control"
                            value={formData.onibus}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Status */}
                    <div className="col-12 mt-4">
                        <label htmlFor="status" className="form-label">Status</label>
                        <input
                            type="text"
                            name="status"
                            placeholder="Status"
                            className="form-control"
                            value={formData.status}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Valor */}
                    <div className="col-12 mt-4">
                        <label htmlFor="valor" className="form-label">Valor</label>
                        <input
                            type="text"
                            name="valor"
                            placeholder="Valor"
                            className="form-control"
                            value={formData.valor}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Passageiros */}
                    <div className="col-12 mt-4">
                        <h4>Adicionar Passageiros</h4>

                        <div className="mb-2">
                            <input
                                type="text"
                                name="nome"
                                placeholder="Nome"
                                className="form-control mb-2"
                                value={novoPassageiro.nome}
                                onChange={handlePassageiroChange}
                            />
                            <input
                                type="text"
                                name="rg"
                                placeholder="RG"
                                className="form-control mb-2"
                                value={novoPassageiro.rg}
                                onChange={handlePassageiroChange}
                            />
                            <input
                                type="date"
                                name="data_nascimento"
                                className="form-control mb-2"
                                value={novoPassageiro.data_nascimento}
                                onChange={handlePassageiroChange}
                            />
                            <input
                                type="text"
                                name="telefone"
                                placeholder="Telefone"
                                className="form-control mb-2"
                                value={novoPassageiro.telefone}
                                onChange={handlePassageiroChange}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="E-mail"
                                className="form-control mb-2"
                                value={novoPassageiro.email}
                                onChange={handlePassageiroChange}
                            />
                        </div>

                        <button
                            type="button"
                            className="btn btn-outline-primary mb-4"
                            onClick={adicionarPassageiro}
                        >
                            Adicionar Passageiro
                        </button>
                    </div>

                    {/* Botões */}
                    <div className="col-12 mt-4">
                        <div className="d-flex justify-content-end">
                            <Link to="/reservas" className="btn btn-outline-primary me-3">
                                Cancelar
                            </Link>
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={handleSave}
                            >
                                Salvar Dados
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ReservasAdd;
