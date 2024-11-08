import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import "./reservas.css";
import Navbar from "../../components/navbar/navbar.jsx";;
import { Link, useNavigate } from "react-router-dom";
import Appointment from "../../components/appointment/appointment.jsx";
import { useEffect, useState } from "react";
// import api from "../../constants/api.js";
import { confirmAlert } from "react-confirm-alert";

function Reservas() {

    
    return <div className="container-fluid mt-page">
        <Navbar />

        <div className="d-flex justify-content-between align-items-center">
            <div>
                <h2 className="d-inline">Reservas</h2>
                <Link to="/reservas/add"
                    className="btn btn-outline-primary ms-5 mb-2">
                    Nova Reserva
                </Link>
            </div>

            <div className="d-flex justify-content-end">

                <div className="form-control ms-3 me-3">
                    <select name="doctor" id="doctor" >
                        <option value="">Todos as Reservas</option>

                    </select>
                </div>

                <button className="btn btn-primary" type="button">Filtrar</button>
            </div>

        </div>

        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col" className='col-sm-3'>Passageiro</th>
                        <th scope="col" className='col-sm-3'>Acompanhantes</th>
                        <th scope="col"className='col-sm-1.5'>Status</th>
                        <th scope="col" className="col-sm-1">Valor</th>
                        <th scope="col" className="col-buttons"></th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>

    </div>
}

export default Reservas;