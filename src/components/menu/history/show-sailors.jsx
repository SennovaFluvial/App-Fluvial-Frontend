import React, { useEffect, useState } from 'react';
import '../../../assets/css/show/styles-Show.css';
import { Spinner } from '../../animations/Spiner';
import { Grid } from '../../animations/Grid';
import { ApiService } from '../../../class/ApiServices.jsx';
import { Link } from 'react-router-dom';
import { useSearchFields } from './search/SearchFields.jsx';
// Componente para ver el historial de Tripulacion de la empresa
export const ShowCrew = () => {

    const [loading, setLoading] = useState(true);
    const [crew, setCrew] = useState([])

    const getCrew = async () => {
        try {
            const response = await ApiService.get("/api/v1/employeefluvial/all");
            setCrew(response);
        } catch (error) {
            console.error("Error fetching employed data:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCrew();
    }, []);
    const { searchTerm, handleSearchChange, filteredItems } = useSearchFields(crew, ["name", "lastName", "numDocument", "phone", "employeeType.typeName", "status"])
    if (loading) {
        return (
            <div className="container">
                <Grid>
                    <Spinner />
                </Grid>
            </div>
        )
    }



    return (
        <>
            <div className="container my-5">
                <div className="row text-center bg-info">
                    <div className="col-md-12 py-3">
                        <h1> <b>TABLA DE TRIPULACIÓN</b> <i className="fa-solid fa-anchor ms-5"></i></h1>
                    </div>
                </div>


                <div className="row">
                    <div className="col-md-12 my-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>

                <table className="table table-hover border table-striped my-5">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Número de documento</th>
                            <th scope="col">Teléfono</th>
                            <th scope="col">Categoría</th>
                            <th scope="col">Estado</th>
                            <th scope="col"> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map((item, index) => {

                            // Define un array de objetos que asocia tipos de empleado con URLs específicas.
                            const url_typeEmployed = [
                                { url: "../add-crew/add-boat-driver", typeEmployed: "Motorista" },
                                { url: "../add-crew/add-sailor", typeEmployed: "Marinero" },
                                { url: "../add-crew/add-captain", typeEmployed: "Capitan" },
                            ];

                            // Obtiene el tipo de empleado del objeto `item`.
                            const typeEmployed = item.employeeType.typeName;

                            // Busca el objeto en `url_typeEmployed` que tenga un `typeEmployed` que coincida con el tipo de empleado actual.
                            const urlFound = url_typeEmployed.find((item) => item.typeEmployed === typeEmployed)

                            // Asigna la URL encontrada a `url`. Si no se encuentra ninguna URL, se asigna una cadena vacía.
                            let url = urlFound ? urlFound.url : '';

                            return (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.numDocument}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.employeeType.typeName}</td>
                                    <td>{item.status}</td>
                                    <td>

                                        <Link to={url + `/${item.id}/update`}>
                                            <button
                                                className='btn icon-link-hover ms-3 text-primary'>
                                                <i className="fa-solid fa-pen-to-square icon-option"></i>
                                            </button>
                                        </Link>

                                        <button
                                            className='btn icon-link-hover ms-3 text-warning'>
                                            <i className="fa-solid fa-eye icon-option"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}