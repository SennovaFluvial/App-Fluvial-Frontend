// import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import '../../../assets/css/show/styles-Show.css';
import { Spinner } from '../../animations/Spiner';
import { Grid } from '../../animations/Grid';
import { ApiService } from '../../../class/ApiServices';

export const ShowCompany = () => {

  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);


  const getCompanies = async () => {
    try {
      const response = await ApiService.get("/companie/findAll");
      setCompanies(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching companies:", error);
      setLoading(false);
    }
  };


  useEffect(() => {
    getCompanies();
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

  // Muestra los datos en una tabla
  return (
    <>
      <div className="container my-5">
        <div className="row text-center bg-info">
          <div className="col-md-12 py-3">
            <h1>
              <b>TABLA DE EMPRESAS</b> <i className="fa-solid fa-building ms-5"></i>
            </h1>
          </div>
        </div>
        <table className="table my-5">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nit</th>
              <th scope="col">Empresa</th>
              <th scope="col">Gerente</th>
              <th scope="col">Linea movil</th>
              <th scope="col">Estado</th>
              <th scope="col"> </th>
            </tr>
          </thead>
          <tbody>
            {companies.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.nit}</td>
                <td>{item.company}</td>
                <td>{item.manager}</td>
                <td>{item.phone}</td>
                <td>{item.status}</td>
                <td>
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

