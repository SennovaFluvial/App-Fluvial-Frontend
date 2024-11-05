import '../../../assets/css/show/styles-Show.css';
import { Spinner } from '../../animations/Spiner';
import { Grid } from '../../animations/Grid';
import { Link } from 'react-router-dom';
import { Pagination } from './Pagination';
import { useControllerShowVehicles } from './controllers/ControllerShowVehicles';

export const ShowVehicles = () => {

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
  } = useControllerShowVehicles();

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
              <b>LISTADO DE VEHICULOS</b> <i className="fa-solid fa-sailboat ms-5"></i>
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
            <Link to={"/adminSection/add-vehicle"} state={{ from: 'listado' }}>
              <button className='btn btn-primary rounded-pill p-2 ps-2'>
                <i className="fa-regular fa-square-plus me-3"></i>Nuevo Vehiculo
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
              <th scope="col">Matricula</th>
              <th scope="col">Nombre de la Embarcación</th>
              <th scope="col">Tipo de Embarcación</th>
              <th scope="col">Capacidad de Volumen</th>
              <th scope="col">Capacidad de Peso</th>
              <th scope="col">Modelo</th>
              <th scope="col">Actualizar</th>
              <th scope="col">Detalles</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.length > 0 ? (
              paginatedItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{firstIndex + index + 1}</td>
                  <td>{item.licensePlate}</td>
                  <td>{item.nombre}</td>
                  <td>{item.type}</td>
                  <td>{item.volumeCapacity + ' ' + item.volumeUnit}</td>
                  <td>{item.weightCapacity + ' ' + item.weightUnit}</td>
                  <td>{item.model}</td>
                  <td>
                    <Link to={`../add-vehicle/${item.id}/update`} state={{ from: 'listado' }}>
                      <button className='btn btn-edit icon-link-hover text-primary'>
                        <i className="fa-solid fa-pen-to-square icon-option"></i>
                      </button>
                    </Link>
                  </td>
                  <td>
                    <Link to={`more-details/${item.id}/vehicle`}>
                      <button className='btn btn-view icon-link-hover text-warning'>
                        <i className="fa-solid fa-eye icon-option"></i>
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">No hay resultados que mostrar</td>
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

