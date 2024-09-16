import '../../../assets/css/show/styles-Show.css';
import { Spinner } from '../../animations/Spiner';
import { Grid } from '../../animations/Grid';
import { Link } from 'react-router-dom';
import { Pagination } from './Pagination';
import { controllerShowCompany } from './controllers/ControllerShowCompany';

export const ShowCompany = () => {

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
  } = controllerShowCompany();

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
              <b>LISTADO DE EMPRESAS</b> <i className="fa-solid fa-building ms-5"></i>
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
            <Link to={"/adminSection/add-employed"}>
              <button className='btn btn-primary rounded-pill p-2 ps-2'>
                <i className="fa-regular fa-square-plus me-3"></i>Nuevo Empleado
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
              <th scope="col">Número</th>
              <th scope="col">Nit</th>
              <th scope="col">Empresa</th>
              <th scope="col">Gerente</th>
              <th scope="col">Linea movil</th>
              <th scope="col">Estado</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.length > 0 ? (
              paginatedItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{firstIndex + index + 1}</td>
                  <td>{item.nit}</td>
                  <td>{item.company}</td>
                  <td>{item.manager}</td>
                  <td>{item.phone}</td>
                  <td className={item.status === "activo" ? "text-success" : "text-danger"}>
                    <b>{item.status}</b>
                  </td>
                  <td>
                    <Link to={`../add-company/${item.id}/update`}>
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
                <td colSpan="7" className="text-center">No hay resultados que mostrar</td>
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

