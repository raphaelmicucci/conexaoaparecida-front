import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo-white.png";
import React from "react";

const navConfig = {
  admin: [
    { text: 'Reservas', to: '/reservas' },
    { text: 'Usuários', to: "/usuarios" },
    { text: 'Excursões', to: '/excursoes' }
  ],
  secretaria: [
    { text: 'Reservas', to: '/reservas' },
    { text: 'Coordenadores', to: '/coordenadores' },
    { text: 'Ônibus', to: '/onibus' }
  ],
  coordenador: [
    { text: 'Reservas', to: '/reservas' },
    { text: 'Lista de Passageiros', to: '/passageiros' },
    { text: 'Assentos', to: '/assentos' }
  ]
};

const NavbarOption = ({ userType }) => {
  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {navConfig[userType].map(item => (
          <li className="nav-item" key={item.text}>
            <Link className="nav-link active" to={item.to}>{item.text}</Link>
          </li>
        ))}
    </ul>
  );
};

function Navbar() {
    const userType = 'admin'; // Pode ser 'admin', 'secretaria' ou 'coordenador'

    return <nav className="navbar fixed-top navbar-expand-lg bg-primary" data-bs-theme="dark">

        <div className="container-fluid">
            <Link className="navbar-brand" to="/reservas">
                <img className="navbar-logo" src={logo} />
            </Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                
                    <NavbarOption userType={userType} />

                <ul className="navbar-nav ">
                    <li className="nav-item">
                        <div className="btn-group">
                            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                              
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><Link className="dropdown-item" to="#">Meu Perfil</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to="/">Desconectar</Link></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>

        </div>

    </nav>
}

export default Navbar;