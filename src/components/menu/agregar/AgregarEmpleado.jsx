import React, { useState, useEffect } from 'react';
import { Select } from '../../html components/Selects';
import { Inputs } from '../../html components/Inputs';
import { useOptionsDepto, usePtionsCompaines, usePtionsCities } from '../update/options/arrays.jsx';
import { OptionsCity, OptionsTypeDocument, roles, genero, status, codigoPaises } from '../update/options/arrays.jsx';
import '../../../assets/css/AgregarEmpleado.css';

export const AgregarEmpleado = () => {
  const OptionsDepto = useOptionsDepto();
  const OptionsComapnies = usePtionsCompaines();
  const OptionsCities = usePtionsCities();

  const [username, setUsername] = useState('');
  const [confirmUsername, setConfirmUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const newErrors = {};
    if (username !== confirmUsername) {
      newErrors.confirmUsername = 'Los nombres de usuario no coinciden';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    if (birthDate) {
      const selectedDate = new Date(birthDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to midnight to compare only dates
      if (selectedDate >= today) {
        newErrors.birthDate = 'La fecha de nacimiento no la fecha actual o una fecha futura';
      }
    }
    setErrors(newErrors);
  }, [username, confirmUsername, password, confirmPassword, birthDate]);

  return (
    <>
      <div className="d-flex-empleado justify-content-center align-items-center vh-100">
        <div className="container-empleado bg-light shadow rounded p-4">
          <h2 className="text-center mb-2">CREAR EMPLEADO</h2>
          <form>
            <div className="text-center">
              <h3><b>INFORMACIÓN PERSONAL</b></h3>
            </div>
            <div className="row"> {/* Nombres y apellidos */}
              <div className="col-md-4">
                <Inputs text="Nombres" name="name" />
              </div>
              <div className="col-md-4">
                <Inputs text="Apellidos" name="lastName" />
              </div>
              <div className="col-md-4">
                <Select text="Tipo de Documento" options={OptionsTypeDocument} name="typeDocument" />
              </div>
              <div className="col-md-4">
                <Inputs text="Número de Documento" name="numDocument" icon="fa-solid fa-address-card" />
              </div>
              <div className="col-md-4">
                <Inputs
                  type="date"
                  text="Fecha de Nacimiento"
                  name="birthDate"
                  icon="fa-solid fa-calendar-days"
                  value={birthDate}
                  event={(e) => setBirthDate(e.target.value)}
                />
                {errors.birthDate && <div className="text-danger">{errors.birthDate}</div>}
              </div>
              <div className="col-md-4">
                <Select text="Género" options={genero} name="sex" />
              </div>
            </div>

            <div className="text-center">
              <h3><b>UBICACIÓN</b></h3>
            </div>
            <div className="row"> {/* Ciudad y Departamento */}
              <div className="col-md-4">
                <Select text="Departamento" options={OptionsDepto} name="departamento" />
              </div>
              <div className="col-md-4">
                <Select text="Ciudad" options={OptionsCity} name="cityName" />
              </div>
              <div className="col-md-4">
                <Inputs text="Dirección" name="address" icon="fa-solid fa-map-pin" />
              </div>
            </div>

            <div className="text-center">
              <h3><b>CONTACTO</b></h3>
            </div>
            <div className="row">  {/* Contacto */}
              <div className="col-md-2">
                <Select text="Código de área" options={codigoPaises} name="areaCode" icon="fa-solid fa-earth-americas" />
              </div>
              <div className="col-md-4">
                <Inputs text="Número de Teléfono" name="phone" icon="fa-solid fa-phone-volume" />
              </div>
              <div className="col-md-3">
                <Inputs
                  text="Usuario"
                  name="username"
                  icon="fa-solid fa-user"
                  value={username}
                  event={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <Inputs
                  text="Confirmar Usuario"
                  name="confirmUsername"
                  icon="fa-regular fa-envelope"
                  value={confirmUsername}
                  event={(e) => setConfirmUsername(e.target.value)}
                />
                {errors.confirmUsername && <div className="text-danger">{errors.confirmUsername}</div>}
              </div>
              <div className="col-md-6 ">
                <Inputs
                  type="password"
                  text="Crear Contraseña"
                  name="password"
                  icon="fa-solid fa-lock"
                  value={password}
                  event={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <Inputs
                  type="password"
                  text="Confirmar Contraseña"
                  name="confirmPassword"
                  icon="fa-solid fa-lock"
                  value={confirmPassword}
                  event={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
              </div>
            </div>

            <div className="text-center">
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