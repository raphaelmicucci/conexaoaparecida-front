import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.jsx";
import { useEffect, useState } from "react";
// import api from "../../constants/api.js";

function AssentosAdd() {


    return <>
        <Navbar />

        <div className="container-fluid mt-page">
            <div className="row col-lg-4 offset-lg-4">
                <div className="col-12 mt-2">
                    <h2>Novo Assento</h2>
                </div>

                <div className="col-12 mt-4">
                    <label htmlFor="user" className="form-label">Número do Assento</label>
                    <div className="mb-2">
                    <input type="number" placeholder="Número do Assento"
                        className="form-control" />
                    </div>
                </div>

                <div className="col-12 mt-4">
                    <label htmlFor="user" className="form-label">Passageiro</label>
                    <div className="mb-2">
                    <input type="text" placeholder="Passageiro"
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
                    <label htmlFor="user" className="form-label">Valor</label>
                    <div className="mb-2">
                    <input type="text" placeholder="Valor"
                        className="form-control" />
                    </div>
                </div>


                <div className="col-12 mt-4">
                    <div className="d-flex justify-content-end">
                        <Link to="/assentos"
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

export default AssentosAdd;