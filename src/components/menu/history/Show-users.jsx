import { useEffect, useState } from 'react'
import instance from '../../../config/AxiosApi';
import '../../../assets/css/show/styles-Show.css'
import { Link } from 'react-router-dom';
import { Spinner } from '../../animations/Spiner';
import { Grid } from '../../animations/Grid';

export const ShowUsers = () => {
    const [loading, setLoading] = useState(true);
    const [employed, setEmployed] = useState([]);

    const getEmployed = async () => {
        try {
            const response = await instance.get("/employeefluvial/all");
            setEmployed(response.data);
        } catch (error) {
            console.error("Error fetching employed data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getEmployed();
    }, []);

    if (loading) {
        return (
            <div className="container">
                <Grid>
                    <Spinner />
                </Grid>
            </div>
        );
    }

    console.log("Empleados ", employed);

    return (
        <>
            <div className="container my-5">
                <div className="row text-center bg-warning">
                    <div className="col-md-12 py-3">
                        <h1> <b>TABLA DE EMPLEADOS</b> <i className="fa-solid fa-address-card ms-5"></i></h1>
                    </div>
                </div>
                <table className="table table-hover border table-striped my-5">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Documento</th>
                            <th scope="col">Nombres</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Tipo de Empleado</th>
                            <th scope="col">Teléfono</th>
                            <th scope="col">Estado</th>
                            <th scope="col"> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {employed.map((item, index) => (
                            <tr key={item.id}>
                                <td><b>{index + 1}</b></td>
                                <td>{item.numDocument}</td>
                                <td>{item.name}</td>
                                <td>{item.lastName}</td>
                                <td>{item.employeeType.typeName}</td>
                                <td>{item.phone}</td>
                                <td>{item.status}</td>
                                <td>
                                    <Link to={`../update-user/${item.id}`}>
                                        <button className='btn icon-link-hover ms-3 text-primary'>
                                            <i className="fa-solid fa-pen-to-square icon-option"></i>
                                        </button>
                                    </Link>
                                    <button className='btn icon-link-hover ms-3 text-warning'>
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
