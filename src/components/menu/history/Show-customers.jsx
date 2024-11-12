import '../../../assets/css/show/styles-Show.css';
import { Spinner } from '../../animations/Spiner';
import { Grid } from '../../animations/Grid';
import { Link } from 'react-router-dom';
import { Pagination } from './Pagination';
import { useControllerShowCustomers } from './controllers/ControllerShowCustomers';
import { downloadReport } from '../../../functions/functions';

export const ShowCustomers = () => {

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
  } = useControllerShowCustomers();

  const handlePrint = () => {
    downloadReport('/api/v1/customers/customerReport', 'informe_clientes');
  }

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
        <div className="row text-center bg-info">
          <div className="col-md-12 py-3">
            <h1>
              <b>LISTADO DE CLIENTES</b> <i className="fa-solid fa-people-robbery ms-5"></i>
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
            <Link to={"/adminSection/add-customer"} state={{ from: 'listado' }}>
              <button className='btn btn-primary rounded-pill p-2 ps-2'>
                <i className="fa-regular fa-square-plus me-3"></i>Nuevo Cliente
              </button>
            </Link>
          </div>
          <div className="col-md-2 my-3 d-flex justify-content-end ms-2">
            <button className='btn btn-warning rounded-pill p-2 ps-2' onClick={handlePrint}>
              <i className="fa-solid fa-print me-3"></i>Imprimir Informe
            </button>
          </div>
        </div>

        <table className="table table-hover border table-striped my-5">
          <thead>
            <tr>
              <th scope="col">Número</th>
              <th scope="col">Número de Documento</th>
              <th scope="col">Nombre Completo</th>
              <th scope="col">Correo Electronico</th>
              <th scope="col">Telefono</th>
              <th scope="col">Direccion</th>
              <th scope="col">Ciudad</th>
              <th scope="col">Tipo de Persona</th>
              <th scope="col">Nombre de empresa</th>
              <th scope="col">Actualizar</th>
              <th scope="col">Detalles</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {paginatedItems.length > 0 ? (
              paginatedItems.map((item, index) => (
                <tr key={item.id}>
                  <td><b>{firstIndex + index + 1}</b></td>
                  <td>{item.numDocument}</td>
                  <td>{item.name + ' ' + item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>{item.cityName}</td>
                  <td>{item.personType}</td>
                  <td>{item.personType === "Juridica" ? item.companyName : "➖"}</td>
                  <td>
                    <Link to={`../add-customer/${item.id}/update`} state={{ from: 'listado' }}>
                      <button className='btn btn-edit icon-link-hover text-primary'>
                        <i className="fa-solid fa-pen-to-square icon-option"></i>
                      </button>
                    </Link>
                  </td>
                  <td>
                    <Link to={`more-details/${item.id}/customer`}>
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
  )
}
