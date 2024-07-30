import React from 'react'
import { Select } from '../../html components/Selects';
import { Inputs } from '../../html components/Inputs';
import { useOptionsDepto, usePtionsCompaines, usePtionsCities } from '../update/options/arrays.jsx'
import { OptionsCity, OptionsTypeDocument, roles, genero, status } from '../update/options/arrays.jsx'
import '../../../assets/css/AgregarEmpleado.css'

export const AgregarEmpleado = () => {
  
  const OptionsDepto = useOptionsDepto(); const OptionsComapnies = usePtionsCompaines(); const OptionsCities = usePtionsCities();
  return (
<>
      <div className="d-flex-am justify-content-center align-items-center vh-100">
        <div className="container-am bg-light shadow rounded p-4">
          <h2 className="text-center mb-4">CREAR EMPLEADO</h2>
          <form>
            <div className="text-center mt-5">
              <h3><b>INFORMACIÓN PERSONAL</b></h3>
            </div>
            <div className="row my-4"> {/* Nombres y apellidos */}
              <div className="col-md-6">
                <Inputs text="Nombres" name="name" />
              </div>
              <div className="col-md-6">
                <Inputs text="Apellidos" name="lastName" />
              </div>
              <div className="col-md-5">
                <Select text="Tipo de Documento" options={OptionsTypeDocument} name="typeDocument" />
              </div>
              <div className="col-md-7">
                <Inputs text="Número de Documento" name="numDocument" icon="fa-solid fa-address-card" />
              </div>
              <div className="col-md-7">
                <Select text="Género" options={genero} name="sex" />
              </div>
            </div>

            <div className="text-center mt-4">
              <h3><b>UBICACIÓN</b></h3>
            </div>
            <div className="row my-4"> {/* Ciudad y Departamento */}
              <div className="col-md-6">
                <Select text="Ciudad" options={OptionsCity} name="cityName" />
              </div>
              <div className="col-md-6">
                <Select text="Departamento" options={OptionsDepto} name="departamento" />
              </div>
              <div className="col-md-12">
                <Inputs text="Dirección" name="address" icon="fa-solid fa-map-pin" />
              </div>
            </div>

            <div className="text-center mt-4">
              <h3><b>CONTACTO</b></h3>
            </div>
            <div className="row my-4">  {/* Contacto */}
              <div className="col-md-4 d-flex align-items-center">
                <Inputs text="Código de área" name="areaCode" icon="fa-solid fa-earth-americas"/>
              </div>
              <div className="col-md-8">
                <Inputs text="Número de Teléfono" name="phone" icon="fa-solid fa-phone-volume" />
              </div>
              <div className="col-md-6">
                <Inputs text="Usuario" name="username" icon="fa-solid fa-user" />
              </div>
              <div className="col-md-6">
                <Inputs text="Confirmar Usuario" name="username" icon="fa-regular fa-envelope" />
              </div>
              <div className="col-md-6">
                <Inputs text="Nueva Contraseña" name="password" icon="fa-solid fa-lock" />
              </div>
              <div className="col-md-6">
                <Inputs text="Confirmar Contraseña" name="password" icon="fa-solid fa-lock" />
              </div>
            </div>

            <div className="text-center mt-4">
              <h3><b>INFORMACIÓN LABORAL</b></h3>
            </div>
            <div className="row mt-2"> {/* Rol y Empresa */}
              <div className="col-md-6">
                <Select text="Rol" options={roles} name="roleListName" />
              </div>
              <div className="col-md-6">
                <Select text="Estado" options={status} name="estado" />
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-success">Crear <i className="fa-solid fa-square-pen"></i></button>
            </div>
          </form>
        </div>
      </div>
      </>
  )
}
