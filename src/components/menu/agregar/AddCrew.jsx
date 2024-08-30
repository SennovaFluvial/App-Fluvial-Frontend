import { Outlet } from "react-router"
export const AddCrew = () => {
    return (
        <>
            <div className="container">
                <select className="form-select my-5" aria-label="Default select example">
                    <option defaultValue="">Seleccione...</option>
                    <option value="captain">Capitán</option>
                    <option value="sailor">Marinero</option>
                    <option value="boatDriver">Motorista</option>
                </select>
            </div>

            <Outlet />
        </>
    )
}
