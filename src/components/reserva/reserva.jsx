export function Reserva() {
    
    return <tr>
        <td>Heitor</td>
        <td>Dr. Heitor</td>
        <td>Psicologia</td>
        <td></td>
        <td className="text-end"></td>
        <td className="text-end">
            <div className="d-inline me-3">
                <button 
                    className="btn btn-sm btn-primary">
                    <i className="bi bi-pencil-square"></i>
                </button>
            </div>

            <button 
                className="btn btn-sm btn-danger">
                <i className="bi bi-trash"></i>
            </button>

        </td>
    </tr>
}