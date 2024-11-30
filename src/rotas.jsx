import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/login/login.jsx";
import { SignUp } from "./pages/signup/signup.jsx";
import Excursoes from "./pages/excursoes/excursoes.jsx";
import Usuarios from "./pages/usuarios/usuarios.jsx";
import UsuariosAdd from "./pages/usuarios/usuarios-add.jsx";
import UsuariosEdit from "./pages/usuarios/usuarios-edit.jsx";
import Reservas from "./pages/reservas/reservas.jsx";
import ReservasAdd from "./pages/reservas-add/reservas-add.jsx";
import ReservasEdit from "./pages/reservas-edit/reservas-edit.jsx";

function Rotas() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/reservas/add" element={<ReservasAdd />} />
            <Route path="/reservas/edit/:id_reserva" element={<ReservasEdit />} />
            <Route path="/excursoes" element={<Excursoes />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/usuarios/add" element={<UsuariosAdd />} />
            <Route path="/usuarios/edit/:id" element={<UsuariosEdit />} />
        </Routes>
    </BrowserRouter>
}

export default Rotas;