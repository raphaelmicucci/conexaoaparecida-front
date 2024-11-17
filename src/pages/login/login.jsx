import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import logo from "../../assets/logo.png";
import fundo from "../../assets/fundo.jpg";
import { useState } from "react";
import API_BASE_URL from "../../config/apiConfig";


function Login() {
    const [username, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null); // Para mostrar erros ao usuário
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/signin`, { // Substitua pela URL da sua API
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                // Armazene o token ou informações do usuário
                localStorage.setItem("token", data.accessToken); // Substitua "token" pelo campo correspondente
                navigate("/usuarios"); // Redirecione para o dashboard ou página inicial
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Erro ao fazer login");
            }
        } catch (err) {
            setError("Erro ao conectar ao servidor");
        }
    };

    return (
        <div className="row">
            <div className="col-sm-5 d-flex justify-content-center align-items-center text-center">
                <form
                    className="form-signin"
                    onSubmit={(e) => e.preventDefault()} // Prevenir reload da página
                >
                    <img src={logo} className="logo mb-4" alt="Logo" />
                    <h5 className="mb-5">Gerencie as excursões de forma descomplicada.</h5>
                    <h5 className="mb-4 text-secondary">Acesse sua conta</h5>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <div className="mt-4">
                        <input
                            type="text"
                            placeholder="E-mail"
                            className="form-control"
                            value={username}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mt-2">
                        <input
                            type="password"
                            placeholder="Senha"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mt-3 mb-5">
                        <button
                            className="btn btn-primary w-100"
                            type="button"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    </div>

                    <div>
                        <span className="me-1">Não tenho uma conta.</span>
                        <Link to="/register">Solicitar agora!</Link>
                    </div>
                </form>
            </div>

            <div className="col-sm-7">
                <img src={fundo} className="background-login" alt="Fundo" />
            </div>
        </div>
    );
}

export default Login;
