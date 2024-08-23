import React, { useEffect, useState } from 'react';
import '../../../assets/css/show/styles-Show.css';
import { Spinner } from '../../animations/Spiner';
import { Grid } from '../../animations/Grid';
import { ApiService } from '../../../class/ApiServices.jsx';
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
                <table className="table my-5">
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
                        {crew.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.lastName}</td>
                                <td>{item.numDocument}</td>
                                <td>{item.phone}</td>
                                <td>{item.employeeType.typeName}</td>
                                <td>{item.status}</td>
                                <td>

                                    <button
                                        className='btn icon-link-hover ms-3 text-primary'>
                                        <i className="fa-solid fa-pen-to-square icon-option"></i>
                                    </button>

                                    <button
                                        className='btn icon-link-hover ms-3 text-warning'>
                                        <i className="fa-solid fa-eye icon-option"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}