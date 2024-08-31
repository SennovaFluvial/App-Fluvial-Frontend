import React, { useState, useEffect } from 'react';
import { Select } from '../../html components/Selects.jsx';
import { Inputs } from '../../html components/Inputs.jsx';
import { useOptionsDepto, useOptionsCompanies, useOptionsCities, OptionsTypeDocument, useRoles, genero, status, maritalStatus, codigoPaises } from '../update/options/arrays.jsx';
import '../../../assets/css/AgregarEmpleado.css';
import { ApiService } from '../../../class/ApiServices.jsx';
import { Alert } from '../../../class/alerts.jsx';
import Swal from 'sweetalert';
import { User } from '../../../class/User.jsx';
import { useLocation, useNavigate, useParams } from 'react-router';

export const AddEmployed = () => {

  const cities = useOptionsCities();
  const deptos = useOptionsDepto();
  const roles = useRoles();
  const [users, setUsers] = useState([]);
  const [nameCompany, setNameCompany] = useState("");
  const [errorsForms, setErrorsForms] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.rol;
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const action = queryParam.get('action'); // Parámetro GET que define la acción (update o create)
  const { id } = useParams();
  const userId = parseInt(id, 10); // ID del usuario
  const nav = useNavigate();
  const companies = role === "SUPERADMIN" ? useOptionsCompanies() : null;

  const [formData, setFormData] = useState({
    username: '',
    confirmUsername: '',
    password: '',
    confirmPassword: '',
    roleRequest: {
      roleListName: []
    },
    estado: '',
    companyName: '',
    name: '',
    lastName: '',
    typeDocument: '',
    numDocument: '',
    phone: '',
    address: '',
    cityName: '',
    departmentName: '',
    sex: '',
    birthDate: '',
    maritalStatus: '',
    codigoPais: ''
  });

  // 1. Efecto para obtener y establecer `nameCompany` si el rol es "ADMIN"
  useEffect(() => {
    if (role === "ADMIN" && !action && !userId) {
      const getCompanyUser = async () => {
        try {
          const response = await ApiService.get("/api/v1/companie/users");
          if (response && response.length > 0) {
            setNameCompany(response[0].company.name); // Actualiza nameCompany
          } else {
            console.error("No se encontraron datos en la respuesta.");
          }
        } catch (error) {
          console.error("Error al obtener el nombre de la compañía:", error);
        }
      };

      getCompanyUser();
    }
  }, [role, action, userId]);

  // 2. Efecto para inicializar `formData` cuando `action` y `userId` no están presentes
  useEffect(() => {
    if (!action && !userId) {
      setFormData({
        username: '',
        confirmUsername: '',
        password: '',
        confirmPassword: '',
        roleRequest: {
          roleListName: []
        },
        estado: '',
        companyName: nameCompany, // Se inicializa con el valor actualizado de nameCompany
        name: '',
        lastName: '',
        typeDocument: '',
        numDocument: '',
        phone: '',
        address: '',
        cityName: '',
        departmentName: '',
        sex: '',
        birthDate: '',
        maritalStatus: '',
        codigoPais: ''
      });
      setErrorsForms({});
    }
  }, [action, userId, nameCompany]); // Incluye nameCompany como dependencia

  // 3. Efecto para manejar la actualización de `formData` basado en `userId` y `action`
  useEffect(() => {
    if (action === 'update' && userId) {
      const filterUserId = users.find(user => user.id === userId);
      if (filterUserId) {
        setFormData({
          username: filterUserId.username,
          confirmUsername: filterUserId.username,
          password: '',
          confirmPassword: '',
          roleRequest: {
            roleListName: [filterUserId.roles[0]?.roleEnum || ""]
          },
          estado: filterUserId.status,
          companyName: filterUserId.company?.name || '',
          name: filterUserId.name,
          lastName: filterUserId.lastName,
          typeDocument: filterUserId.typeDocument,
          numDocument: filterUserId.numDocument,
          phone: filterUserId.phone,
          address: filterUserId.address,
          cityName: filterUserId.city?.ciudad || "",
          departmentName: filterUserId.departmentName || "",
          sex: filterUserId.sex,
          birthDate: filterUserId.birthDate || "",
          maritalStatus: filterUserId.maritalStatus || ""
        });
      }
    }
  }, [action, userId, users]);

  // 4. Efecto para actualizar `companyName` en `formData` cuando `nameCompany` cambie
  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      companyName: nameCompany
    }));
  }, [nameCompany]);

  // 5. Efecto para cargar la lista de usuarios al inicio
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const listUsers = await ApiService.get('/api/v1/companie/users');
        if (Array.isArray(listUsers)) {
          setUsers(listUsers);
        } else {
          console.warn('Data from API is not an array or is empty');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'roleListName') {
      setFormData(prevState => ({
        ...prevState,
        roleRequest: {
          ...prevState.roleRequest,
          roleListName: [value] // Guarda el valor en un array
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }

    // Manejo de errores
    if (value.trim()) {
      const { [name]: removed, ...rest } = errorsForms;
      setErrorsForms(rest);
    } else {
      setErrorsForms({ ...errorsForms, [name]: "Campo obligatorio" });
    }
  };

  const handleErrors = (name, message) => {
    setErrorsForms(prevErrors => ({
      ...prevErrors,
      [name]: message
    }));
  };

  useEffect(() => {
    if (formData.birthDate) {
      const selectedDate = new Date(formData.birthDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate >= today) {
        handleErrors("birthDate", "La fecha de nacimiento no puede ser actual o una fecha futura");
      }
    }

    if (formData.confirmUsername && formData.username !== formData.confirmUsername) {
      handleErrors("confirmUsername", "Los nombres de usuario no coinciden");
    } else if (formData.username === formData.confirmUsername) {
      setFormData(prevState => ({
        ...prevState,
        username: formData.username
      }));
    }

    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      handleErrors("confirmPassword", "Las contraseñas no coinciden");
    } else if (formData.password === formData.confirmPassword) {
      setFormData(prevState => ({
        ...prevState,
        password: formData.password
      }));
    }
  }, [formData.username, formData.confirmUsername, formData.password, formData.confirmPassword, formData.birthDate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};
    let firstEmptyField = null;

    for (let [name, value] of Object.entries(formData)) {
      if (name === 'roleRequest.roleListName' && (!formData.roleRequest.roleListName || formData.roleRequest.roleListName.length === 0)) {
        newErrors['roleRequest'] = "Campo obligatorio";
        if (!firstEmptyField) firstEmptyField = 'Role List Name';
      } else if (typeof value === 'string' && !value.trim()) {
        newErrors[name] = "Campo obligatorio";
        if (!firstEmptyField) firstEmptyField = name;
      }
    }

    setErrorsForms(newErrors);

    if (Object.keys(newErrors).length > 0) {
      Swal({
        title: 'Error',
        text: `Por favor, complete el campo obligatorio: ${firstEmptyField}`,
        icon: 'error',
        timer: 2000
      });
      return;
    }

    const { confirmUsername, confirmPassword, ...dataToSend } = formData;

    const confirmationMessage = action === 'update'
      ? `¿Está seguro que quiere actualizar el usuario?\nUsuario: ${dataToSend.username}\nRol: ${dataToSend.roleRequest.roleListName[0]}`
      : `¿Está seguro que quiere crear el usuario?\nUsuario: ${dataToSend.username}\nRol: ${dataToSend.roleRequest.roleListName[0]}`;

    try {
      const result = await Alert.alertConfirm(
        'Confirmación',
        confirmationMessage,
        action === 'update'
          ? 'Usuario actualizado correctamente'
          : 'Usuario creado correctamente',
        nav,
        "../../adminSection/show-users"
      );

      if (result) {
        if (action === 'update') {
          await ApiService.put(`/auth/update/${userId}`, dataToSend);
        } else {
          await User.sign_up(dataToSend);
        }
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      Swal({
        title: 'Error',
        text: 'Hubo un error al procesar la solicitud. Por favor, intente de nuevo.',
        icon: 'error',
        timer: 2000
      });
    }
  };

  return (
    <>
      <div className="d-flex-empleado justify-content-center align-items-center vh-100">
        <div className="container-empleado bg-light shadow rounded p-4">
          <h2 className="text-center mb-2">{action === 'update' ? 'ACTUALIZAR EMPLEADO' : 'CREAR EMPLEADO'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="text-center">
              <h3><b>INFORMACIÓN PERSONAL</b></h3>
            </div>
            <div className="row"> {/* Nombres y apellidos */}
              <div className="col-md-4">
                <Inputs text="Nombres" name="name" event={handleChange} value={formData.name} />
                {errorsForms.name && <div className="text-danger">{errorsForms.name}</div>}
              </div>
              <div className="col-md-4">
                <Inputs event={handleChange} text="Apellidos" name="lastName" value={formData.lastName} />
                {errorsForms.lastName && <div className="text-danger">{errorsForms.lastName}</div>}
              </div>
              <div className="col-md-4">
                <Select event={handleChange} value={formData.typeDocument} text="Tipo de Documento" options={OptionsTypeDocument} name="typeDocument" />
                {errorsForms.typeDocument && <div className="text-danger">{errorsForms.typeDocument}</div>}
              </div>
              <div className="col-md-3">
                <Inputs event={handleChange} text="Número de Documento" name="numDocument" icon="fa-solid fa-address-card" value={formData.numDocument} />
                {errorsForms.numDocument && <div className="text-danger">{errorsForms.numDocument}</div>}
              </div>
              <div className="col-md-3">
                <Inputs event={handleChange} type="date" text="Fecha de Nacimiento" name="birthDate" icon="fa-solid fa-calendar-days" value={formData.birthDate} />
                {errorsForms.birthDate && <div className="text-danger">{errorsForms.birthDate}</div>}
              </div>
              <div className="col-md-3">
                <Select event={handleChange} value={formData.sex} text="Género" options={genero} name="sex" />
                {errorsForms.sex && <div className="text-danger">{errorsForms.sex}</div>}
              </div>
              <div className="col-md-3">
                <Select event={handleChange} value={formData.maritalStatus} text="Estado civil" options={maritalStatus} name="maritalStatus" />
                {errorsForms.maritalStatus && <div className="text-danger">{errorsForms.maritalStatus}</div>}
              </div>
            </div>

            <div className="text-center">
              <h3><b>UBICACIÓN</b></h3>
            </div>
            <div className="row"> {/* Ciudad y Departamento */}
              <div className="col-md-4">
                <Select event={handleChange} text="Departamento" options={deptos} name="departmentName" value={formData.departmentName} />
                {errorsForms.departmentName && <div className="text-danger">{errorsForms.departmentName}</div>}
              </div>
              <div className="col-md-4">
                <Select event={handleChange} value={formData.cityName} text="Ciudad" options={cities} name="cityName" />
                {errorsForms.cityName && <div className="text-danger">{errorsForms.cityName}</div>}
              </div>
              <div className="col-md-4">
                <Inputs event={handleChange} text="Dirección" name="address" icon="fa-solid fa-map-pin" value={formData.address} />
                {errorsForms.address && <div className="text-danger">{errorsForms.address}</div>}
              </div>
            </div>

            <div className="text-center">
              <h3><b>CONTACTO</b></h3>
            </div>
            <div className="row mt-2"> {/* Teléfono y Usuario */}
              <div className="col-md-2">
                <Select event={handleChange} text="Código País" options={codigoPaises} value={formData.codigoPais} name="codigoPais" icon="fa-solid fa-earth-americas" />
                {errorsForms.codigoPais && <div className="text-danger">{errorsForms.codigoPais}</div>}
              </div>
              <div className="col-md-4">
                <Inputs event={handleChange} text="Número de Teléfono" name="phone" icon="fa-solid fa-phone-volume" value={formData.phone} />
                {errorsForms.phone && <div className="text-danger">{errorsForms.phone}</div>}
              </div>
              <div className="col-md-3">
                <Inputs event={handleChange} text="Usuario" name="username" icon="fa-solid fa-user" value={formData.username} />
                {errorsForms.username && <div className="text-danger">{errorsForms.username}</div>}
              </div>
              <div className="col-md-3">
                <Inputs event={handleChange} text="Confirmar Usuario" name="confirmUsername" icon="fa-regular fa-envelope" value={formData.confirmUsername} />
                {errorsForms.confirmUsername && <div className="text-danger">{errorsForms.confirmUsername}</div>}
              </div>
              <div className="col-md-6">
                <Inputs event={handleChange} type="password" text="Crear Contraseña" name="password" icon="fa-solid fa-lock" value={formData.password} />
                {errorsForms.password && <div className="text-danger">{errorsForms.password}</div>}
              </div>
              <div className="col-md-6">
                <Inputs event={handleChange} type="password" text="Confirmar Contraseña" name="confirmPassword" icon="fa-solid fa-lock" value={formData.confirmPassword} />
                {errorsForms.confirmPassword && <div className="text-danger">{errorsForms.confirmPassword}</div>}
              </div>
            </div>

            <div className="text-center">
              <h3><b>INFORMACIÓN LABORAL</b></h3>
            </div>
            <div className="row mt-2">
              {/* <div className="row"> */}
              {role === 'SUPERADMIN' && (
                <div className="col-md-4">
                  <Select event={handleChange} value={formData.companyName} text="Empresa" options={companies} name="companyName" />
                  {errorsForms.companyName && <div className="text-danger">{errorsForms.companyName}</div>}
                </div>
              )}
              {/* </div> */}

              <div className="col-md-4">
                <Select event={handleChange} value={formData.roleRequest.roleListName[0]} text="Rol" options={roles} name="roleListName" />
                {errorsForms.roleListName && <div className="text-danger">{errorsForms.roleListName}</div>}
              </div>
              <div className="col-md-4">
                <Select event={handleChange} value={formData.estado} text="Estado" options={status} name="estado" />
                {errorsForms.estado && <div className="text-danger">{errorsForms.estado}</div>}
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-success">Crear Empleado <i className="fa-solid fa-building-user"></i></button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}