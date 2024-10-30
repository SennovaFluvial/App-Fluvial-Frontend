import React from 'react';
import '../../../assets/css/show/styles-Show.css';
import { Link } from 'react-router-dom';
import { Spinner } from '../../animations/Spiner';
import { Grid } from '../../animations/Grid';
import { Pagination } from './Pagination';
import { useControllerShowProducts } from './controllers/inventories/ControllerShowProducts';

export const ShowProducts = () => {
    const {
        searchTerm,
        handleSearchChange,
        paginatedItems,
        elementForPage,
        currentPage,
        setCurrentPage,
        totalFilteredItems,
        loading,
        firstIndex
    } = useControllerShowProducts();

    if (loading) {
        return (
            <>
                <div className="container">
                    <Grid>
                        <Spinner />
                    </Grid>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="container my-5">
                <div className="row text-center bg-info">
                    <div className="col-md-12 py-3">
                        <h1>
                            <b>LISTADO DE PRODUCTOS</b> <i className="fa-solid fa-box ms-5"></i>
                        </h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 my-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="col-md-2 my-3 d-flex justify-content-end ms-auto">
                        <Link to={"/adminSection/add-product"} state={{ from: 'producto' }}>
                            <button className='btn btn-primary rounded-pill p-2 ps-2'>
                                <i className="fa-regular fa-square-plus me-3"></i>Nuevo Producto
                            </button>
                        </Link>
                    </div>
                    <div className="col-md-2 my-3 d-flex justify-content-end ms-2">
                        <button className='btn btn-warning rounded-pill p-2 ps-2'>
                            <i className="fa-solid fa-print me-3"></i> Imprimir Informe
                        </button>
                    </div>
                </div>

                <table className="table table-hover border table-striped my-5">
                    <thead>
                        <tr>
                            <th scope="col">Numero de registro</th>
                            <th scope="col">Cédula Cliente</th>
                            <th scope="col">Nombre Bodega</th>
                            <th scope="col">Categoría</th>
                            <th scope="col">Nombre del Producto</th>
                            <th scope="col">Dimensiones</th>
                            <th scope="col">Tipo de embalaje</th>
                            <th scope="col">Es Perecedero</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedItems.length > 0 ? (
                            paginatedItems.map((item, index) => (
                                <tr key={index}>
                                    <td><b>{firstIndex + index + 1}</b></td>
                                    <td><b>{item.customerNumDocument}</b></td>
                                    <td>{item.warehouseName}</td>
                                    <td>{item.categoryName}</td>
                                    <td><b>{item.productName}</b></td>
                                    <td>{item.dimensions}</td>
                                    <td>{item.packagingType}</td>
                                    <td>{item.isPerishable}</td>
                                    <td>
                                        <Link to={`../add-product/${item.productId}/update`}>
                                            <button className='btn btn-edit icon-link-hover text-primary'>
                                                <i className="fa-solid fa-pen-to-square icon-option"></i>
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`more-details/${item.productId}/product`}>
                                            <button className='btn btn-view icon-link-hover text-warning'>
                                                <i className="fa-solid fa-eye icon-option"></i>
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="text-center">No hay resultados que mostrar</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Pagination
                    elementForPage={elementForPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalElements={totalFilteredItems}
                />
            </div>
        </>
    );
}
