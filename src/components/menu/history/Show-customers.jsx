import React, { useEffect, useState } from 'react';
import '../../../assets/css/show/styles-Show.css';
import instance from '../../../config/AxiosApi';
import { Spinner } from '../../animations/Spiner';
import { Grid } from '../../animations/Grid';

export const ShowCustomers = () => {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);

  const getCustomers = useCallback(async () => {
    try {
      const response = await instance.get('/customers/all');
      setCustomers(response.data);
    } catch (error) {
      console.log('Error en obtener clientes', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

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
              <b>TABLA DE CLIENTES</b> <i className="fa-solid fa-people-robbery ms-5"></i>
            </h1>
          </div>
        </div>
        <table className="table table-hover border table-striped my-5">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Documento</th>
              <th scope="col">Nombres</th>
              <th scope="col">Apellidos</th>
              <th scope="col">Mail</th>
              <th scope="col">Telefono</th>
              <th scope="col">Direccion</th>
              <th scope="col">Ciudad</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((item, index) => (
              <tr key={item.id}>
                <td><b>{index + 1}</b></td>
                <td>{item.numDocument}</td>
                <td>{item.name}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>{item.cityName}</td>
                <td>
                  <button
                    onClick={() => deleteCustomers(item.id)}
                    className='btn icon-link-hover ms-3 text-danger'>
                    <i className="fa-solid fa-trash-can icon-option"></i>
                  </button>
                  <button className='btn icon-link-hover ms-3 text-primary'>
                    <i className="fa-solid fa-pen-to-square icon-option"></i>
                  </button>
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

