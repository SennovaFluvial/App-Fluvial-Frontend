import '../../../assets/css/show/styles-Show.css';
import { Spinner } from '../../animations/Spiner';
import { Grid } from '../../animations/Grid';
import { Link } from 'react-router-dom';
import { Pagination } from './Pagination';
import { useControllerShowCustomers } from './controllers/ControllerShowCustomers';

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
            <h1>
              <b>LISTADO DE CLIENTES</b> <i className="fa-solid fa-people-robbery ms-5"></i>
            </h1>
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
              <th scope="col">Correo Electronico</th>
              <th scope="col">Telefono</th>
              <th scope="col">Direccion</th>
              <th scope="col">Ciudad</th>
              <th scope="col">Acciones</th>
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
                  <td>
                    <Link to={`../add-customer/${item.id}/update`}>
                      <button className='btn icon-link-hover ms-3 text-primary'>
                        <i className="fa-solid fa-pen-to-square icon-option"></i>
                      </button>
                    </Link>
                    <button className='btn icon-link-hover ms-3 text-warning'>
                      <i className="fa-solid fa-eye icon-option"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">No hay resultados que mostrar</td>
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
