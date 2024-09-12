import { useEffect, useState } from 'react'
import '../../../assets/css/show/styles-Show.css'
import { Link } from 'react-router-dom';
import { Spinner } from '../../animations/Spiner';
import { Grid } from '../../animations/Grid';
import { ApiService } from '../../../class/ApiServices';
import { useSearchFields } from './search/SearchFields';
import { Pagination } from './Pagination';

export const ShowUsers = () => {

    const [employed, setEmployed] = useState([]);
    const [elementForPage, setElementForPage] = useState(6)
    const [currentPage, setCurrentPage] = useState(1)
    const totalUsers = employed.length;
    const [loading, setLoading] = useState(true);

    const lastIndex = currentPage * elementForPage;
    const firstIndex = lastIndex - elementForPage;

    const getEmployed = async () => {
        try {
            const response = await ApiService.get("/api/v1/companie/users");
            setEmployed(response);
        } catch (error) {
            console.error("Error fetching employed data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getEmployed();
    }, []);
    const { searchTerm, handleSearchChange, filteredItems } = useSearchFields(employed, ["numDocument", "name", "lastName", "roles[0].roleEnum", "birthDate", "status", "sex", "username", "address"])
    const paginatedItems = filteredItems.slice(firstIndex, lastIndex);

    if (loading) {
        return (
            <div className="container">
                <Grid>
                    <Spinner />
                </Grid>
            </div>
        );
    }

    return (
        <>
            <div className="container my-5">
                <div className="row text-center bg-warning">
                    <div className="col-md-12 py-3">
                        <h1> <b>LISTADO DE EMPLEADOS</b> <i className="fa-solid fa-address-card ms-5"></i></h1>
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
                            <th scope="col">Número</th>
                            <th scope="col">Número de Documento</th>
                            <th scope="col">Nombre Completo</th>
                            <th scope="col">Cargo</th>
                            <th scope="col">Fecha de Nacimiento</th>
                            <th scope="col">Genero</th>
                            <th scope="col">Correo Electronico</th>
                            <th scope="col">Dirección</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Empresa</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedItems.map((item, index) => (
                            <tr key={item.id}>
                                <td><b>{index + 1}</b></td>
                                <td>{item.numDocument}</td>
                                <td>{item.name + ' ' + item.lastName}</td>
                                <td>{item.roles[0].roleEnum}</td>
                                <td>{item.birthDate}</td>
                                <td>{item.sex}</td>
                                <td>{item.username}</td>
                                <td>{item.address}</td>
                                <td className={item.status === "activo" ? "text-success" : "text-danger"}>
                                    <b>{item.status}</b>
                                </td>
                                <td>{item.company.name}</td>
                                <td>
                                    <Link to={`../add-employed/${item.id}?action=update`}>
                                        <button className='btn icon-link-hover text-primary'>
                                            <i className="fa-solid fa-pen-to-square icon-option"></i>
                                        </button>
                                    </Link>
                                    <button className='btn icon-link-hover text-warning'>
                                        <i className="fa-solid fa-eye icon-option"></i>
                                    </button>
                                    {/*<button className='btn icon-link-hover'>
                                        {item.status === "activo" ? (
                                            <>
                                                <i className="fa-solid fa-toggle-on"></i>
                                            </>
                                        ) : (
                                            <>
                                                <i class="fa-solid fa-toggle-off"></i>
                                            </>
                                        ) }
                                    </button>*/}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination elementForPage={elementForPage} currentPage={currentPage} setCurrentPage={setCurrentPage} totalElements={totalUsers} />
            </div>
        </>
    )
}
