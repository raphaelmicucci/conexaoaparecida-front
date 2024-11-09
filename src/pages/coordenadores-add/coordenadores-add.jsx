import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.jsx";
import { useEffect, useState } from "react";
// import api from "../../constants/api.js";

function CoordenadoresAdd() {


    return <>
        <Navbar />

        <div className="container-fluid mt-page">
            <div className="row col-lg-4 offset-lg-4">
                <div className="col-12 mt-2">
                    <h2>Novo Coordenador</h2>
                </div>

                <div className="col-12 mt-4">
                    <label htmlFor="user" className="form-label">Nome</label>
                    <div className="mb-2">
                    <input type="text" placeholder="Nome"
                        className="form-control" />
                    </div>
                </div>

                <div className="col-12 mt-4">
                    <label htmlFor="user" className="form-label">Igreja</label>
                    <div className="mb-2">
                    <input type="text" placeholder="Igreja"
                        className="form-control" />
                    </div>
                </div>

                <div className="col-12 mt-4">
                    <label htmlFor="user" className="form-label">Ônibus</label>
                    <div className="mb-2">
                    <input type="text" placeholder="Ônibus"
                        className="form-control" />
                    </div>
                </div>


                <div className="col-12 mt-4">
                    <div className="d-flex justify-content-end">
                        <Link to="/coordenadores"
                            className="btn btn-outline-primary me-3">
                            Cancelar
                        </Link>
                        <button className="btn btn-primary" type="button">
                            Salvar Dados
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default CoordenadoresAdd;