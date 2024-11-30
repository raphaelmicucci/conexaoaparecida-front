import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import Onibus from "./pages/onibus/onibus.jsx";
import OnibusAdd from "./pages/onibus-add/onibus-add.jsx";
import Coordenadores from "./pages/coordenadores/coordenadores.jsx";
import CoordenadoresAdd from "./pages/coordenadores-add/coordenadores-add.jsx";
import Excursoes from "./pages/excursoes/excursoes.jsx";
import ExcursoesAdd from "./pages/excursoes-add/excursoes-add.jsx";
import Usuarios from "./pages/usuarios/usuarios.jsx";
import UsuariosAdd from "./pages/usuarios/usuarios-add.jsx";
import UsuariosEdit from "./pages/usuarios/usuarios-edit.jsx";
import Passageiros from "./pages/passageiros/passageiros.jsx";
import Assentos from "./pages/assentos/assentos.jsx";
import AssentosAdd from "./pages/assentos-add/assentos-add.jsx";
import Reservas from "./pages/reservas/reservas.jsx";
import ReservasAdd from "./pages/reservas-add/reservas-add.jsx";
import ReservasEdit from "./pages/reservas-edit/reservas-edit.jsx";

function Rotas() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/reservas/add" element={<ReservasAdd />} />
            <Route path="/reservas/edit/:id_reserva" element={<ReservasEdit />} />
            <Route path="/onibus" element={<Onibus />} />
            <Route path="/onibus/add" element={<OnibusAdd />} />
            <Route path="/onibus/edit/:id_appointment" element={<OnibusAdd />} />
            <Route path="/coordenadores" element={<Coordenadores />} />
            <Route path="/coordenadores/add" element={<CoordenadoresAdd />} />
            <Route path="/coordenadores/edit/:id_appointment" element={<CoordenadoresAdd />} />
            <Route path="/excursoes" element={<Excursoes />} />
            <Route path="/excursoes/add" element={<ExcursoesAdd />} />
            <Route path="/excursoes/edit/:id_appointment" element={<ExcursoesAdd />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/usuarios/add" element={<UsuariosAdd />} />
            <Route path="/usuarios/edit/:id" element={<UsuariosEdit />} />
            <Route path="/passageiros" element={<Passageiros />} />
            <Route path="/assentos" element={<Assentos />} />
            <Route path="/assentos/add" element={<AssentosAdd />} />
            <Route path="/assentos/edit/:id_appointment" element={<AssentosAdd />} />
        </Routes>
    </BrowserRouter>
}

export default Rotas;