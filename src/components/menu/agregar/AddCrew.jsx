import { useState } from "react"
import { Outlet } from "react-router"
import { useNavigate } from "react-router";
export const AddCrew = () => {

    const [first, setfirst] = useState("");
    const nav = useNavigate();
    const handleChange = (e) => {

        const url = e.target.value;

        nav("/adminSection/`${e}`")

    }

    return (
        <>
            <div className="container">
                <select className="form-select my-5" aria-label="Default select example">
                    <option defaultValue="">Seleccione...</option>
                    <option value="add-captain">Capitán</option>
                    <option value="add-sailor">Marinero</option>
                    <option value="add-boat-driver">Motorista</option>
                </select>
            </div>

            <Outlet />
        </>
    )
}
