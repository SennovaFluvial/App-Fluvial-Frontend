// import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import '../../../assets/css/show/styles-Show.css';
import { Spinner } from '../../animations/Spiner';
import { Grid } from '../../animations/Grid';
import { ApiService } from '../../../class/ApiServices';
import { Link } from 'react-router-dom';
import { useSearchFields } from './search/SearchFields';

export const ShowVehicles = () => {

  const [loading, setLoading] = useState(true);
  const [vehicles, setvehicles] = useState([])

  const getVehicles = async () => {
    try {
      const response = await ApiService.get("/api/v1/vehicles/all");
      setvehicles(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      setLoading(false);
    }
  };


  useEffect(() => {
    getVehicles();
  }, []);

  const { searchTerm, handleSearchChange, filteredItems } = useSearchFields(vehicles, ["type", "model", "licensePlate", "volumeCapacity", "volumeUnit", "weightCapacity", "weightUnit"])


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
              <b>TABLA DE VEHICULOS</b> <i className="fa-solid fa-sailboat ms-5"></i>
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
              <th scope="col">ID</th>
              <th scope="col">Tipo</th>
              <th scope="col">Modelo</th>
              <th scope="col">Matricula</th>
              <th scope="col">Capacidad de Volumen</th>
              <th scope="col">Capacidad de Peso</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.type}</td>
                <td>{item.model}</td>
                <td>{item.licensePlate}</td>
                <td>{item.volumeCapacity + ' ' + item.volumeUnit}</td>
                <td>{item.weightCapacity + ' ' + item.weightUnit}</td>
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
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

