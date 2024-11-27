import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Navbar from "../../components/navbar/navbar.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import "./usuarios.css";
import API_BASE_URL from "../../config/apiConfig"; // URL da API centralizada

function UsuariosEdit() {
    const { id } = useParams(); // Pegando o ID do usuário da URL
    const [usuario, setUsuario] = useState({
        username: "",
        email: "",
        password: "",
        roles: [],
        church: "",
        phone: ""
    });
    const [loading, setLoading] = useState(true); // Estado para indicar carregamento
    const [error, setError] = useState(null); // Estado para exibir erros
    const navigate = useNavigate(); // Hook para navegação

    // Função para buscar dados do usuário
    const fetchUsuario = async () => {
        const token = localStorage.getItem("token"); // Obter o token do localStorage
        if (!token) {
            alert("Token não encontrado. Faça login novamente.");
            navigate("/login");
            return;
        }

        try {
            const response = await axios.get(`${API_BASE_URL}/api/admin/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 200) {
                setUsuario(response.data); // Preencher os campos com os dados do usuário
            } else {
                alert("Erro ao buscar usuário.");
            }
        } catch (err) {
            console.error("Erro ao buscar usuário:", err);
            setError("Erro ao buscar usuário.");
        } finally {
            setLoading(false);
        }
    };

    // Função para atualizar os dados do usuário
    const handleUpdate = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário

        const token = localStorage.getItem("token"); // Obter o token do localStorage
        if (!token) {
            alert("Token não encontrado. Faça login novamente.");
            navigate("/login");
            return;
        }

        try {
            const response = await axios.put(`${API_BASE_URL}/api/admin/${id}`, usuario, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 200) {
                alert("Usuário atualizado com sucesso.");
                navigate("/usuarios"); // Redireciona para a lista de usuários
            } else {
                alert("Erro ao atualizar usuário.");
            }
        } catch (err) {
            console.error("Erro ao atualizar usuário:", err);
            setError("Erro ao atualizar usuário.");
        }
    };

    // useEffect para carregar os dados do usuário na inicialização
    useEffect(() => {
        fetchUsuario();
    }, [id]);

    return (
        <div className="container-fluid mt-page">
            <Navbar />

            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <h2 className="d-inline">Editar Usuário</h2>
                </div>
            </div>

            <div>
                {loading ? (
                    <p>Carregando...</p>
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : (
                    <form onSubmit={handleUpdate}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={usuario.username}
                                onChange={(e) => setUsuario({ ...usuario, username: e.target.value })}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">E-mail</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={usuario.email}
                                onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Telefone</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                value={usuario.phone}
                                onChange={(e) => setUsuario({ ...usuario, phone: e.target.value })}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="church" className="form-label">Igreja</label>
                            <input
                                type="text"
                                className="form-control"
                                id="church"
                                value={usuario.church}
                                onChange={(e) => setUsuario({ ...usuario, church: e.target.value })}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="roles" className="form-label">Roles</label>
                            <select
                                multiple
                                className="form-control"
                                id="roles"
                                value={usuario.roles.map((role) => role.id)}
                                onChange={(e) => {
                                    const selectedRoles = Array.from(e.target.selectedOptions, option => option.value);
                                    const updatedRoles = selectedRoles.map(roleId => ({
                                        id: roleId,
                                        name: e.target.options[e.target.selectedIndex].text
                                    }));
                                    setUsuario({ ...usuario, roles: updatedRoles });
                                }}
                            >
                                {/* Exemplos de opções de roles, ajuste conforme necessário */}
                                <option value="673e23c2ccf08984439cdff8">ROLE_ADMIN</option>
                                <option value="673e23e3ccf08984439cdffa">ROLE_SECRETARIA</option>
                                <option value="673e23d3ccf08984439cdff9">ROLE_COORDENADOR</option>
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary">Atualizar</button>
                        <Link to="/usuarios" className="btn btn-secondary ms-3">Cancelar</Link>
                    </form>
                )}
            </div>
        </div>
    );
}

export default UsuariosEdit;
