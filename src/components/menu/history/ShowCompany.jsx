// import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import instance from '../../../config/AxiosApi';

export const ShowCompany = () => {
  const [companys, setCompanys] = useState([]);

  useEffect(() => {
    getCompanys();
  }, [])

  const getCompanys = async () => {
    try {
      const response = await instance.get('/findAll');

      setCompanys(response.data);

      // console.log(response.data)

    } catch (error) {
      console.error('error al intentar obtener los datos', error)
    }

  }

  return (
    <>
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
          {companys.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nit}</td>
              <td>{item.company}</td>
              <td>{item.manager}</td>
              <td>{item.phone}</td>
              <td>{item.status}</td>
              <td>
                <i class="fa-solid fa-trash-can ms-3 text-danger icon-link-hover"></i>
                <i class="fa-solid fa-pen-to-square ms-3 text-primary icon-link-hover"></i>
                <i class="fa-solid fa-eye ms-3 text-warning icon-link-hover"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

