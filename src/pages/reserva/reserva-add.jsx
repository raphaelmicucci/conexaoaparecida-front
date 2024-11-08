import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.jsx";

export function ReservaAdd () {
    return <div className="container-fluid mt-page">

            <Navbar />

        
            <div className="row col-lg-4 offset-lg-4" >
                <div className="col-12 mt-2">
                    <h2>Nova Reserrva</h2>
                </div>
                <div className="col-12 mt-4">
                    <label className="form-label">Passageiro</label>
                    <div className="form-control mb-2">
                        <input type="text" className="form-control"/>
                    </div>
                </div>
                <div className="col-12 mt-4">
                    <label className="form-label">Passageiro</label>
                    <div className="form-control mb-2">
                        <input type="text" className="form-control"/>
                    </div>
                </div>
                <div className="col-12 mt-4">
                    <label className="form-label">Passageiro</label>
                    <div className="form-control mb-2">
                        <input type="text" className="form-control"/>
                    </div>
                </div>

                <div className="col-12 mt-4">
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary" type="button">
                            Cancelar    
                        </button>
                        <button className="btn btn-primary" type="button">
                            Salvar Reserva
                        </button>
                    </div>
                </div>
            </div>
        
    </div>
}