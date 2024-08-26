import React, { useEffect, useState } from 'react';

import '../../../assets/css/show/styles-Show.css';

import { Spinner } from '../../animations/Spiner';
import { Grid } from '../../animations/Grid';

export const ShowMarineros = () => {

    const [loading, setLoading] = useState(true);
    const { sailors, setSailors } = useState([]);

    const getSailors = async () => {
        try {
            const response = await instance.get('/customers/all');
            setSailors(response.data);
        } catch (error) {
            console.log('Error en obtener Marineros', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSailors();
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
                        <h1> <b>TABLA DE MARINEROS</b> <i className="fa-solid fa-anchor ms-5"></i></h1>
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
                            <th scope="col">Estado</th>
                            <th scope="col"> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sailors.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.nombre}</td>
                                <td>{item.apellido}</td>
                                <td>{item.numDocumento}</td>
                                <td>{item.telefono}</td>
                                <td>{item.estado}</td>
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