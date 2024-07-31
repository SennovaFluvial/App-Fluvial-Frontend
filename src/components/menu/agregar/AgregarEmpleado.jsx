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

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [typeDocument, setTypeDocument] = useState('');
  const [numDocument, setNumDocument] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [sex, setSex] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [cityName, setCityName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [confirmUsername, setConfirmUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [estado, setEstado] = useState('');
  const [codigoPais, setCodigoPais] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const newErrors = {};

    // Validación de nombres
    if (!name) {
      newErrors.name = 'Este campo es obligatorio';
    }

    // Validación de apellidos
    if (!lastName) {
      newErrors.lastName = 'Este campo es obligatorio';
    }

    // Validación de tipo de documento
    if (!typeDocument) {
      newErrors.typeDocument = "Este campo es obligatorio";
    }

    // Validación de número de documento
    if (!numDocument) {
      newErrors.numDocument = "Este campo es obligatorio";
    }

    // Validación de fecha de nacimiento
    if (!dateOfBirth) {
      newErrors.dateOfBirth = "Este campo es obligatorio";
    } else {
      const selectedDate = new Date(dateOfBirth);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate >= today) {
        newErrors.dateOfBirth = 'La fecha de nacimiento no puede ser hoy o una fecha futura';
      }
    }

    // Validación de género
    if (!sex) {
      newErrors.sex = "Este campo es obligatorio";
    }

    // Validación de ciudad
    if (!cityName) { // Corregido
      newErrors.cityName = "Este campo es obligatorio";
    }

    // Validación de dirección
    if (!address) {
      newErrors.address = "Este campo es obligatorio";
    }

    // Validación de código de país
    if (!codigoPais) {
      newErrors.codigoPais = "Este campo es obligatorio";
    }

    // Validación para teléfono
    if (!phone) {
      newErrors.phone = "Este campo es obligatorio";
    }

    // Validación de nombre de usuario
    if (!username) {
      newErrors.username = "Este campo es obligatorio";
    }
    if (!confirmUsername) {
      newErrors.confirmUsername = "Este campo es obligatorio";
    } else if (username !== confirmUsername) {
      newErrors.confirmUsername = 'Los nombres de usuario no coinciden';
    }

    // Validación de contraseñas
    if (!password) {
      newErrors.password = "Este campo es obligatorio";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Este campo es obligatorio";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    // Validación de rol
    if (!role) {
      newErrors.role = "Este campo es requerido";
    }

    // Validación de estado
    if (!estado) {
      newErrors.estado = "Este campo es requerido";
    }


    setErrors(newErrors);
  }, [name, lastName, typeDocument, numDocument, dateOfBirth, sex, departamento, cityName, address, phone, username, confirmUsername, password, confirmPassword, role, estado, codigoPais]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (Object.keys(errors).length > 0) {
      alert('Por favor, complete todos los campos obligatorios correctamente.');
      return;
    }

    const confirmationMessage = `¿Está seguro que quiere crear el usuario?\nUsuario: ${username}\nRol: ${role}`;
    const userConfirmed = window.confirm(confirmationMessage);

    if (userConfirmed) {

      alert('Usuario creado correctamente');
      console.log('Formulario enviado');
      window.location.reload();
    } else {
      alert('Operación cancelada');
    }
  }

  return (
    <>
      <div className="d-flex-empleado justify-content-center align-items-center vh-100">
        <div className="container-empleado bg-light shadow rounded p-4">
          <h2 className="text-center mb-2">CREAR EMPLEADO</h2>
          <form onSubmit={handleSubmit}>
            <div className="text-center">
              <h3><b>INFORMACIÓN PERSONAL</b></h3>
            </div>
            <div className="row"> {/* Nombres y apellidos */}
              <div className="col-md-4">
                <Inputs text="Nombres" name="name" value={name} event={(e) => setName(e.target.value)} />
                {errors.name && <div className="text-danger">{errors.name}</div>}
              </div>
              <div className="col-md-4">
                <Inputs text="Apellidos" name="lastName" value={lastName} event={(e) => setLastName(e.target.value)} />
                {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
              </div>
              <div className="col-md-4">
                <Select text="Tipo de Documento" options={OptionsTypeDocument} name="typeDocument" value={typeDocument} event={(e) => setTypeDocument(e.target.value)} />
                {errors.typeDocument && <div className="text-danger">{errors.typeDocument}</div>}
              </div>
              <div className="col-md-4">
                <Inputs text="Número de Documento" name="numDocument" icon="fa-solid fa-address-card" value={numDocument} event={(e) => setNumDocument(e.target.value)} />
                {errors.numDocument && <div className="text-danger">{errors.numDocument}</div>}
              </div>
              <div className="col-md-4">
                <Inputs  type="date"  text="Fecha de Nacimiento"  name="dateOfBirth"  icon="fa-solid fa-calendar-days"  value={dateOfBirth}  event={(e) => setDateOfBirth(e.target.value)}/>
                {errors.dateOfBirth && <div className="text-danger">{errors.dateOfBirth}</div>}
              </div>
              <div className="col-md-4">
                <Select text="Género" options={genero} name="sex" value={sex} event={(e) => setSex(e.target.value)} />
                {errors.sex && <div className="text-danger">{errors.sex}</div>}
              </div>
            </div>

            <div className="text-center">
              <h3><b>UBICACIÓN</b></h3>
            </div>
            <div className="row"> {/* Ciudad y Departamento */}
              <div className="col-md-4">
                <Select text="Departamento" options={OptionsDepto} name="departamento" value={departamento} event={(e) => setDepartamento(e.target.value)} />
              </div>
              <div className="col-md-4">
                <Select text="Ciudad" options={OptionsCity} name="cityName" value={cityName} event={(e) => setCityName(e.target.value)} />
                {errors.cityName && <div className="text-danger">{errors.cityName}</div>}
              </div>
              <div className="col-md-4">
                <Inputs text="Dirección" name="address" icon="fa-solid fa-map-pin" value={address} event={(e) => setAddress(e.target.value)} />
                {errors.address && <div className="text-danger">{errors.address}</div>}
              </div>
            </div>

            <div className="text-center">
              <h3><b>CONTACTO</b></h3>
            </div>
            <div className="row mt-2"> {/* Teléfono y Usuario */}
              <div className="col-md-2">
                <Select text="Código País" options={codigoPaises} name="codigoPais" icon="fa-solid fa-earth-americas"  value={codigoPais} event={(e) => setCodigoPais(e.target.value)} />
                {errors.codigoPais && <div className="text-danger">{errors.codigoPais}</div>}
              </div>
              <div className="col-md-4">
                <Inputs text="Número de Teléfono" name="phone" icon="fa-solid fa-phone-volume" value={phone} event={(e) => setPhone(e.target.value)} />
                {errors.phone && <div className="text-danger">{errors.phone}</div>}
              </div>
              <div className="col-md-3">
                <Inputs text="Usuario" name="username" icon="fa-solid fa-user" value={username} event={(e) => setUsername(e.target.value)} />
                {errors.username && <div className="text-danger">{errors.username}</div>}
              </div>
              <div className="col-md-3">
                <Inputs text="Confirmar Usuario" name="confirmUsername" icon="fa-regular fa-envelope" value={confirmUsername} event={(e) => setConfirmUsername(e.target.value)} />
                {errors.confirmUsername && <div className="text-danger">{errors.confirmUsername}</div>}
              </div>
              <div className="col-md-6">
                <Inputs  type="password"  text="Crear Contraseña"   name="password"  icon="fa-solid fa-lock"  value={password} event={(e) => setPassword(e.target.value)}
                />
                {errors.password && <div className="text-danger">{errors.password}</div>}
              </div>
              <div className="col-md-6">
                <Inputs type="password"  text="Confirmar Contraseña"  name="confirmPassword"  icon="fa-solid fa-lock" value={confirmPassword}
                  event={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
              </div>
            </div>

            <div className="text-center">
              <h3><b>INFORMACIÓN LABORAL</b></h3>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <Select text="Rol" options={roles} name="role" value={role} event={(e) => setRole(e.target.value)} />
                {errors.role && <div className="text-danger">{errors.role}</div>}
              </div>
              <div className="col-md-6">
                <Select text="Estado" options={status} name="estado" value={estado} event={(e) => setEstado(e.target.value)} />
                {errors.estado && <div className="text-danger">{errors.estado}</div>}
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