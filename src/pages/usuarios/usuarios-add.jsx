import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.jsx";
import { useEffect, useState } from "react";
import API_BASE_URL from "../../config/apiConfig.js"; // URL da API centralizada

function UsuariosAdd() {
    const navigate = useNavigate(); // Para navegação após salvar
    const { id } = useParams(); // Para editar um usuário existente
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        roles: [],
        password: "",
        phone: "",
        church: ""
    }); // Estado para armazenar os dados do usuário
    const [loading, setLoading] = useState(false); // Estado para controle de carregamento
    const [error, setError] = useState(null); // Estado para exibir erros

    // Função para buscar dados do usuário (se for edição)
    const fetchUserData = async () => {
        if (!id) return; // Se não houver id, não tenta editar

        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Token não encontrado. Faça login novamente.");
                navigate("/login");
                return;
            }

            const response = await fetch(`${API_BASE_URL}/api/admin/update/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data); // Preenche os campos com os dados do usuário
            } else {
                throw new Error("Erro ao carregar os dados do usuário.");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // useEffect para carregar dados do usuário (se estiver editando)
    useEffect(() => {
        fetchUserData();
    }, [id]);

    // Função para lidar com a mudança nos campos do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
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
            const method = id ? 'PUT' : 'POST'; // Se id estiver presente, faz um PUT (editar)
            const url = id
                ? `${API_BASE_URL}/api/admin/update/${id}`
                : `${API_BASE_URL}/api/admin/create`;

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                navigate("/usuarios"); // Redireciona após sucesso
            } else {
                throw new Error("Erro ao salvar o usuário.");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    const toggleRole = (role) => {
        setUserData((prevForm) => ({
            ...prevForm,
            roles: prevForm.roles.includes(role)
                ? prevForm.roles.filter(r => r !== role)
                : [...prevForm.roles, role]
        }));
    };

    return (
        <>
            <Navbar />

            <div className="container-fluid mt-page">
                <div className="row col-lg-4 offset-lg-4">
                    <div className="col-12 mt-2">
                        <h2>{id ? "Editar Usuário" : "Novo Usuário"}</h2>
                    </div>

                    <div className="col-12 mt-4">
                        <label htmlFor="username" className="form-label">Nome</label>
                        <div className="mb-2">
                            <input
                                type="text"
                                name="username"
                                value={userData.username}
                                onChange={handleChange}
                                placeholder="Nome"
                                className="form-control"
                                required
                            />
                        </div>
                    </div>
                    <div className="col-12 mt-4">
                        <label htmlFor="email" className="form-label">E-mail</label>
                        <div className="mb-2">
                            <input
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                placeholder="E-mail"
                                className="form-control"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                            <label className="form-label">Roles:</label>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" checked={userData.roles.includes('ADMIN')} onChange={() => toggleRole('ADMIN')} />
                                <label className="form-check-label">Admin</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" checked={userData.roles.includes('SECRETARIA')} onChange={() => toggleRole('SECRETARIA')} />
                                <label className="form-check-label">Secretaria</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" checked={userData.roles.includes('COORDENADOR')} onChange={() => toggleRole('COORDENADOR')} />
                                <label className="form-check-label">Coordenador</label>
                            </div>
                        </div>
                    <div className="col-12 mt-4">
                        <label htmlFor="phone" className="form-label">Telefone</label>
                        <div className="mb-2">
                            <input
                                type="text"
                                name="phone"
                                value={userData.phone}
                                onChange={handleChange}
                                placeholder="Telefone"
                                className="form-control"
                                required
                            />
                        </div>
                    </div>
                    <div className="col-12 mt-4">
                        <label htmlFor="church" className="form-label">Igreja</label>
                        <div className="mb-2">
                            <input
                                type="text"
                                name="church"
                                value={userData.church}
                                onChange={handleChange}
                                placeholder="Igreja"
                                className="form-control"
                                required
                            />
                        </div>
                    </div>
                    {!id && (
                        <div className="col-12 mt-4">
                            <label htmlFor="password" className="form-label">Senha</label>
                            <div className="mb-2">
                                <input
                                    type="password"
                                    name="password"
                                    value={userData.password}
                                    onChange={handleChange}
                                    placeholder="Senha"
                                    className="form-control"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {error && <div className="alert alert-danger">{error}</div>}

                    <div className="col-12 mt-4">
                        <div className="d-flex justify-content-end">
                            <Link to="/usuarios" className="btn btn-outline-primary me-3">
                                Cancelar
                            </Link>
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? "Salvando..." : "Salvar Dados"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UsuariosAdd;
