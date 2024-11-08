import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.jsx";
import { useEffect, useState } from "react";
// import api from "../../constants/api.js";

function ExcursoesAdd() {

    return <>
        <Navbar />

        <div className="container-fluid mt-page">
            <div className="row col-lg-4 offset-lg-4">
                <div className="col-12 mt-2">
                    <h2>Nova Ercursão</h2>
                </div>

                <div className="col-12 mt-4">
                    <label htmlFor="user" className="form-label">Ano</label>
                    <div className="mb-2">
                    <input type="text" placeholder="Ano"
                        className="form-control" />
                    </div>
                </div>

                <div className="col-12 mt-4">
                    <label htmlFor="user" className="form-label">Igrejas</label>
                    <div className="mb-2">
                    <input type="text" placeholder="Igrejas"
                        className="form-control" />
                    </div>
                </div>

                <div className="col-12 mt-4">
                    <label htmlFor="user" className="form-label">Número de Ônibus</label>
                    <div className="mb-2">
                    <input type="text" placeholder="Número de Ônibus"
                        className="form-control" />
                    </div>
                </div>

                <div className="col-12 mt-4">
                    <label htmlFor="user" className="form-label">Status</label>
                    <div className="mb-2">
                    <input type="text" placeholder="Status"
                        className="form-control" />
                    </div>
                </div>

                <div className="col-12 mt-4">
                    <label htmlFor="user" className="form-label">Valor</label>
                    <div className="mb-2">
                    <input type="text" placeholder="Valor"
                        className="form-control" />
                    </div>
                </div>

                <div className="col-12 mt-4">
                    <div className="d-flex justify-content-end">
                        <Link to="/excursoes"
                            className="btn btn-outline-primary me-3">
                            Cancelar
                        </Link>
                        <button  className="btn btn-primary" type="button">
                            Salvar Dados
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default ExcursoesAdd;