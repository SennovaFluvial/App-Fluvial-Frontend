import React, { useState, useEffect } from 'react';
import { Select } from '../../html components/Selects';
import { Inputs } from '../../html components/Inputs';
import { useOptionsDepto, usePtionsCompaines, usePtionsCities } from '../update/options/arrays.jsx';
import { OptionsDepto, OptionsCity, OptionsTypeDocument, roles, genero, status, codigoPaises, maritalStatus } from '../update/options/arrays.jsx';
import '../../../assets/css/AgregarEmpleado.css';

export const AgregarEmpleado = () => {

  // const OptionsDepto = useOptionsDepto();
  const OptionsComapnies = usePtionsCompaines();
  const OptionsCities = usePtionsCities();

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    typeDocument: '',
    numDocument: '',
    dateOfBirth: '',
    sex: '',
    departamento: '',
    cityName: '',
    address: '',
    codigoPais: '',
    phone: '',
    username: '',
    confirmUsername: '',
    password: '',
    confirmPassword: '',
    roleRequest: {
      roleListName: []
    },
    estado: '',
    maritalStatus: ''
  });

  const [errorsForms, setErrorsForms] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'roleListName') {
      setFormData({
        ...formData,
        roleRequest: {
          ...formData.roleRequest,
          roleListName: value
        }
      });
    } else {
      if (value.trim()) {
        const { [name]: removed, ...rest } = errorsForms;
        setErrorsForms(rest);
      } else {
        setErrorsForms({ ...errorsForms, [name]: "Campo obligatorio" });
      }

      setFormData({ ...formData, [name]: value });
    }
  }

  const handleErrors = (name, message) => {
    setErrorsForms({
      ...errorsForms, [name]: message
    });

  }

  useEffect(() => {
    if (formData.dateOfBirth) {
      const selectedDate = new Date(formData.dateOfBirth);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate >= today) {
        handleErrors("dateOfBirth", "La fecha de nacimiento no puede ser actual o una fecha futura")
      }
    }

    if (formData.confirmUsername && formData.username !== formData.confirmUsername) {
      handleErrors("confirmUsername", "Los nombres de usuario no coinciden")
    }

    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      handleErrors("confirmPassword", "Las contraseñas no coinciden")
    }

  }, [formData.username, formData.confirmUsername, formData.password, formData.confirmPassword, formData.dateOfBirth]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};

    for (let [name, value] of Object.entries(formData)) {
      if (name === 'roleRequest') {
        if (!formData.roleRequest.roleListName || formData.roleRequest.roleListName.length === 0) {
          newErrors['roleRequest'] = "Campo obligatorio";
        }
      } else if (value.trim()) {
        const { [name]: removed, ...rest } = errorsForms;
        setErrorsForms(rest);
      
      } else {
        newErrors[name] = "Campo obligatorio";
      }
    }

    setErrorsForms({ ...errorsForms, ...newErrors });

    if (Object.keys(newErrors).length > 0) {
      alert('Por favor, complete todos los campos obligatorios correctamente.');
      return;
    }

    const confirmationMessage = `¿Está seguro que quiere crear el usuario?\nUsuario: ${formData.username}\nRol: ${formData.roleRequest.roleListName[0]}`;
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
                <Inputs text="Nombres" name="name" event={handleChange} />
                {errorsForms.name && <div className="text-danger">{errorsForms.name}</div>}
              </div>
              <div className="col-md-4">
                <Inputs event={handleChange} text="Apellidos" name="lastName" />
                {errorsForms.lastName && <div className="text-danger">{errorsForms.lastName}</div>}
              </div>
              <div className="col-md-4">
                <Select event={handleChange} text="Tipo de Documento" options={OptionsTypeDocument} name="typeDocument" />
                {errorsForms.typeDocument && <div className="text-danger">{errorsForms.typeDocument}</div>}
              </div>
              <div className="col-md-3">
                <Inputs event={handleChange} text="Número de Documento" name="numDocument" icon="fa-solid fa-address-card" />
                {errorsForms.numDocument && <div className="text-danger">{errorsForms.numDocument}</div>}
              </div>
              <div className="col-md-3">
                <Inputs event={handleChange} type="date" text="Fecha de Nacimiento" name="dateOfBirth" icon="fa-solid fa-calendar-days" />
                {errorsForms.dateOfBirth && <div className="text-danger">{errorsForms.dateOfBirth}</div>}
              </div>
              <div className="col-md-3">
                <Select event={handleChange} text="Género" options={genero} name="sex" />
                {errorsForms.sex && <div className="text-danger">{errorsForms.sex}</div>}
              </div>
              <div className="col-md-3">
                <Select event={handleChange} text="Estado civil" options={maritalStatus} name="maritalStatus" />
                {errorsForms.maritalStatus && <div className="text-danger">{errorsForms.maritalStatus}</div>}
              </div>
            </div>

            <div className="text-center">
              <h3><b>UBICACIÓN</b></h3>
            </div>
            <div className="row"> {/* Ciudad y Departamento */}
              <div className="col-md-4">
                <Select event={handleChange} text="Departamento" options={OptionsDepto} name="departamento" />
                {errorsForms.departamento && <div className="text-danger">{errorsForms.departamento}</div>}
              </div>
              <div className="col-md-4">
                <Select event={handleChange} text="Ciudad" options={OptionsCity} name="cityName" />
                {errorsForms.cityName && <div className="text-danger">{errorsForms.cityName}</div>}
              </div>
              <div className="col-md-4">
                <Inputs event={handleChange} text="Dirección" name="address" icon="fa-solid fa-map-pin" />
                {errorsForms.address && <div className="text-danger">{errorsForms.address}</div>}
              </div>
            </div>

            <div className="text-center">
              <h3><b>CONTACTO</b></h3>
            </div>
            <div className="row mt-2"> {/* Teléfono y Usuario */}
              <div className="col-md-2">
                <Select event={handleChange} text="Código País" options={codigoPaises} name="codigoPais" icon="fa-solid fa-earth-americas" />
                {errorsForms.codigoPais && <div className="text-danger">{errorsForms.codigoPais}</div>}
              </div>
              <div className="col-md-4">
                <Inputs event={handleChange} text="Número de Teléfono" name="phone" icon="fa-solid fa-phone-volume" />
                {errorsForms.phone && <div className="text-danger">{errorsForms.phone}</div>}
              </div>
              <div className="col-md-3">
                <Inputs event={handleChange} text="Usuario" name="username" icon="fa-solid fa-user" />
                {errorsForms.username && <div className="text-danger">{errorsForms.username}</div>}
              </div>
              <div className="col-md-3">
                <Inputs event={handleChange} text="Confirmar Usuario" name="confirmUsername" icon="fa-regular fa-envelope" />
                {errorsForms.confirmUsername && <div className="text-danger">{errorsForms.confirmUsername}</div>}
              </div>
              <div className="col-md-6">
                <Inputs event={handleChange} type="password" text="Crear Contraseña" name="password" icon="fa-solid fa-lock" />
                {errorsForms.password && <div className="text-danger">{errorsForms.password}</div>}
              </div>
              <div className="col-md-6">
                <Inputs event={handleChange} type="password" text="Confirmar Contraseña" name="confirmPassword" icon="fa-solid fa-lock" />
                {errorsForms.confirmPassword && <div className="text-danger">{errorsForms.confirmPassword}</div>}
              </div>
            </div>

            <div className="text-center">
              <h3><b>INFORMACIÓN LABORAL</b></h3>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <Select event={handleChange} text="Rol" options={roles} name="roleListName" />
                {errorsForms.roleListName && <div className="text-danger">{errorsForms.roleListName}</div>}
              </div>
              <div className="col-md-6">
                <Select event={handleChange} text="Estado" options={status} name="estado" />
                {errorsForms.estado && <div className="text-danger">{errorsForms.estado}</div>}
              </div>
            </div>
            <div className="text-center">
                <button type="submit" className="btn btn-success">Crear Empleado <i class="fa-solid fa-building-user"></i></button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}