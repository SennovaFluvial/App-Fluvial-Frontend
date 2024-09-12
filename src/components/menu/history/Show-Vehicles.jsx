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
        <div className="row text-center bg-secondary">
          <div className="col-md-12 py-3">
            <h1>
              <b>LISTADO DE VEHICULOS</b> <i className="fa-solid fa-sailboat ms-5"></i>
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
              <th scope="col">Matricula</th>
              <th scope="col">Nombre de la Embarcación</th>
              <th scope="col">Tipo de Embarcación</th>
              <th scope="col">Capacidad de Volumen</th>
              <th scope="col">Capacidad de Peso</th>
              <th scope="col">Modelo</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.length > 0 ? (
              paginatedItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{firstIndex + index + 1}</td>
                  <td>{item.licensePlate}</td>
                  <td>Campo faltante ?</td>
                  <td>{item.type}</td>
                  <td>{item.volumeCapacity + ' ' + item.volumeUnit}</td>
                  <td>{item.weightCapacity + ' ' + item.weightUnit}</td>
                  <td>{item.model}</td>
                  <td>
                    <Link to={`../add-vehicle/${item.id}/update`}>
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
