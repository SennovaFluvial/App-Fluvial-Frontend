import { useState } from "react"
import { Outlet } from "react-router"
import { useNavigate } from "react-router";
import styles from '../../../assets/css/addCrew.module.css'
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
            <div className={styles.container}>
                <h1 className={styles.title}>Elija la categoría</h1>
                <select
                    className={styles.select}
                    aria-label="Seleccione una categoría"
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
