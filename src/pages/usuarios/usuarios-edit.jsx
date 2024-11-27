import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../../components/navbar/navbar.jsx";
import API_BASE_URL from "../../config/apiConfig.js"; // URL da API centralizada

function UsuariosEdit() {
    const { id } = useParams(); // Para obter o ID do usuário a ser editado
    const navigate = useNavigate(); // Para navegação após salvar
    const [form, setForm] = useState({
        username: "",
        email: "",
        roles: [],
        password: "",
        phone: "",
        church: ""
    }); // Estado para armazenar os dados do usuário
    const [loading, setLoading] = useState(false); // Estado para controle de carregamento
    const [error, setError] = useState(null); // Estado para exibir erros

    // Função para buscar dados do usuário
    const fetchUsuario = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Token não encontrado. Faça login novamente.");
                navigate("/login");
                return;
            }

            const response = await axios.get(`${API_BASE_URL}/api/admin/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 200) {
                const data = response.data;
                console.log("Dados do usuário carregados:", data); // Log para depuração
                setForm({
                    username: data.username,
                    email: data.email,
                    roles: data.roles.map(role => role.name), // Ensure roles are in the correct format
                    phone: data.phone,
                    church: data.church,
                    password: "" // Clear password field
                }); // Preenche os campos com os dados do usuário
            } else {
                throw new Error("Erro ao carregar os dados do usuário.");
            }
        } catch (err) {
            console.error("Erro ao buscar dados do usuário:", err); // Log para depuração
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // useEffect para carregar os dados do usuário na inicialização
    useEffect(() => {
        fetchUsuario();
    }, [id]);

    // Função para lidar com a mudança nos campos do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    // Função para enviar os dados do usuário para a API
    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Token não encontrado. Faça login novamente.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/update/${id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            if (response.ok) {
                navigate("/usuarios"); // Redireciona após sucesso
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erro ao atualizar o usuário.");
            }
        } catch (err) {
            console.error("Erro ao atualizar o usuário:", err); // Log para depuração
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const toggleRole = (role) => {
        setForm((prevForm) => ({
            ...prevForm,
            roles: prevForm.roles.includes(role)
                ? prevForm.roles.filter(r => r !== role)
                : [...prevForm.roles, role]
        }));
    };

    const resetForm = () => {
        setForm({
            username: "",
            email: "",
            roles: [],
            password: "",
            phone: "",
            church: ""
        });
    };

    return (
        <div className="container-fluid mt-page">
            <Navbar />

            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <h2 className="d-inline">Editar Usuário</h2>
                </div>
            </div>

            <div className='content-one'>
                <div className="form-container">
                    <h1 className="text-center mb-4">Gerenciar Usuários</h1>
                    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded bg-light">
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Phone"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Church"
                                name="church"
                                value={form.church}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Roles:</label>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={form.roles.includes('ADMIN')}
                                    onChange={() => toggleRole('ADMIN')}
                                />
                                <label className="form-check-label">Admin</label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={form.roles.includes('SECRETARIA')}
                                    onChange={() => toggleRole('SECRETARIA')}
                                />
                                <label className="form-check-label">Secretaria</label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={form.roles.includes('COORDENADOR')}
                                    onChange={() => toggleRole('COORDENADOR')}
                                />
                                <label className="form-check-label">Coordenador</label>
                            </div>
                        </div>

                        {error && <div className="alert alert-danger">{error}</div>}

                        <div className="d-flex justify-content-end">
                            <button type="button" onClick={resetForm} className="btn btn-secondary me-2">Cancelar</button>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? "Salvando..." : "Salvar Dados"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UsuariosEdit;
