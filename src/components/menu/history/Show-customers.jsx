import React from 'react'
import { useEffect, useState } from 'react'
import instance from '../../../config/AxiosApi';
import '../../../assets/css/show/styles-Show.css'

import { Spinner } from '../../animations/Spiner';
import { Grid } from '../../animations/Grid';


export const ShowCustomers = () => {

  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCustomers();
  }, [])

  const getCustomers = async () => {
    try {
      setLoading(true);
      const response = await instance.get('/customers');

      setCustomers(response.data);
      setLoading(false);
      // console.log(response.data)

    } catch (error) {
      console.error('error al intentar obtener los datos', error)
    }

  }

  const deleteCustomers = async (id_customer) => {

    console.log('id a elimianr ', id_customer)

    try {
      const response = await instance.delete(`/customer/delete/${id_customer}`)

      console.log('la data: ', response.data);

      setCustomers(customers.filter(customer => customer.id !== id_customer));

      console.log('Cliente borrado')

    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return (
      <div className="container">
        <Grid>
          <Spinner />
        </Grid>
      </div>
    )
  }

  return (
    <>
      <div className="container my-5">

        <div className="row text-center bg-warning">
          <div className="col-md-12 py-3">
            <h1> <b>TABLA DE CLIENTES</b> <i class="fa-solid fa-people-robbery ms-5"></i></h1>
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
              <th scope="col"> </th>
            </tr>
          </thead>
          <tbody>
            {customers.map(item => (
              <tr key={item.id}>
                <td> <b>{item.id}</b> </td>
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

