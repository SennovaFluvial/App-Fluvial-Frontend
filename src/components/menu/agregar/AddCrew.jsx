import { useState } from "react"
import { Outlet } from "react-router"
import { useNavigate } from "react-router";
export const AddCrew = () => {

    const [selectedOption, setSelectedOption] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedOption(value);

        // Navegar a la ruta correspondiente
        navigate(`/adminSection/add-crew/${value}`);
    };

    return (
        <>
            <div className="container">
                <h1 className="color-primary">
                    Elija la categoria
                </h1>
                <select
                    className="form-select mt-5"
                    aria-label="Default select example"
                    value={selectedOption}
                    onChange={handleChange}
                >
                    <option value="">Seleccione...</option>
                    <option value="add-captain">Capitán</option>
                    <option value="add-sailor">Marinero</option>
                    <option value="add-boat-driver">Motorista</option>
                </select>
            </div>

            <Outlet />
        </>
    )
}
