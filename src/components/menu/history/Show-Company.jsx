// import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import '../../../assets/css/show/styles-Show.css';
import { Spinner } from '../../animations/Spiner';
import { Grid } from '../../animations/Grid';
import { ApiService } from '../../../class/ApiServices';
import { Link } from 'react-router-dom';
import { useSearchFields } from './search/SearchFields';
import { Pagination } from './Pagination';

export const ShowCompany = () => {

  const [companies, setCompanies] = useState([]);

  const [elementForPage, setElementForPage] = useState(6)
  const [currentPage, setCurrentPage] = useState(1)
  const totalUsers = companies.length;

  const lastIndex = currentPage * elementForPage;
  const firstIndex = lastIndex - elementForPage;

  const [loading, setLoading] = useState(true);

  const getCompanies = async () => {
    try {
      const response = await ApiService.get("/api/v1/companie/findAll");
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

  const { searchTerm, handleSearchChange, filteredItems } = useSearchFields(companies, ["nit", "company", "manager", "phone", "status"])
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
        <div className="row text-center bg-info">
          <div className="col-md-12 py-3">
            <h1>
              <b>LISTADO DE EMPRESAS</b> <i className="fa-solid fa-building ms-5"></i>
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
              <th scope="col">Nit</th>
              <th scope="col">Empresa</th>
              <th scope="col">Gerente</th>
              <th scope="col">Linea movil</th>
              <th scope="col">Estado</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
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
            ))}
          </tbody>
        </table>
        <Pagination elementForPage={elementForPage} currentPage={currentPage} setCurrentPage={setCurrentPage} totalElements={totalUsers} />
      </div>
    </>
  )
}

