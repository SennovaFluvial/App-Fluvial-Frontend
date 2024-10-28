import { useState, useEffect } from 'react';
import { ApiService } from '../../../../class/ApiServices.jsx';
import { useOptionsDepto, useOptionsCompanies, useOptionsCities, useRoles } from '../../update/options/arrays.jsx';
import Swal from 'sweetalert';
import { User } from '../../../../class/User.jsx';
import { useLocation, useNavigate, useParams } from 'react-router';
import { clearError, handleStatusError, validationFieldSubmit } from '../../../../functions/functions.jsx';

/**
 * Controlador para la creación y actualización de empleados.
 *
 * Este hook gestiona el estado del formulario, la validación de los campos y
 * la interacción con la API para obtener la lista de empleados. Permite reiniciar
 * los valores del formulario, cargar datos de un empleado existente para edición,
 * y manejar el envío del formulario.
 *
 * @param {boolean} updatePassword - Flag que indica si se debe actualizar la contraseña del empleado.
 * 
 * @returns {Object} Un objeto que contiene:
 * - errorsForms: Errores de validación del formulario.
 * - formData: Los datos del formulario.
 * - handleChange: Función para manejar los cambios en los campos del formulario.
 * - handleSubmit: Función para manejar el envío del formulario.
 * - isDisabled: Booleano que indica si el formulario está deshabilitado por errores de validación.
 * - cities: Lista de ciudades disponibles para selección.
 * - deptos: Lista de departamentos disponibles para selección.
 * - roles: Lista de roles disponibles para el empleado.
 * - role: El rol actual del empleado.
 * - companies: Lista de empresas (solo para SUPERADMIN).
 */
export const ControllerCreateUpdateEmployed = ({ updatePassword }) => {
    const cities = useOptionsCities();
    const deptos = useOptionsDepto();
    const roles = useRoles();
    const [users, setUsers] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false)
    const [nameCompany, setNameCompany] = useState("");
    const [errorsForms, setErrorsForms] = useState({});
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.rol;
    const location = useLocation();
    const queryParam = new URLSearchParams(location.search);
    const action = queryParam.get('action');
    const { id } = useParams();
    const userId = parseInt(id, 10);
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
                    departmentName: filterUserId.city?.departamento.departamento || "",
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

        if (name === "roleListName") {
            setFormData(prevState => ({
                ...prevState,
                roleRequest: {
                    ...prevState.roleRequest,
                    roleListName: [value]
                }
            }));
        } else {
            // Maneja todos los otros campos
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }

        const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const expresionPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const birthYear = name === "birthDate" ? new Date(value).getFullYear() : null;
        const currentYear = new Date().getFullYear();

        // Validaciones de campos
        if (!value.trim()) {
            handleStatusError(setErrorsForms, name, "Campo obligatorio");
        } else if (name === "username" && !expresionEmail.test(value)) {
            handleStatusError(setErrorsForms, name, "No es un correo válido, recuerda usar el formato: ejemplo@gmail.com");
        }
        // Validación específica para numDocument y phone (deben ser números y cumplir con los límites de longitud)
        else if ((name === "numDocument" || name === "phone") && isNaN(value)) {
            handleStatusError(setErrorsForms, name, "Debe ser un número válido");
        }
        else if ((name === "numDocument" && (value.length < 5 || value.length > 11)) ||
            (name === "phone" && (value.length < 5 || value.length > 11))) {
            handleStatusError(setErrorsForms, name, "Debe tener entre 5 y 11 dígitos");
        }
        // Validación de confirmación de username
        else if (name === "confirmUsername" && value !== formData.username) {
            handleStatusError(setErrorsForms, "confirmUsername", "El nombre de usuario no coincide");
        }
        // Validación de confirmación de contraseña
        else if (name === "confirmPassword" && value !== formData.password) {
            handleStatusError(setErrorsForms, "confirmPassword", "La contraseña no coincide");
        }
        else if (name === "password" && (!expresionPassword.test(value) || value.length < 5)) {
            handleStatusError(setErrorsForms, name, "Contraseña insegura: usa al menos 5 caracteres, con una mayúscula, un número y un símbolo especial (@, #, $, %, &, *)")
        }
        else if (name === "birthDate" && (birthYear < 1700 || birthYear > 2000 || birthYear >= currentYear)) {
            handleStatusError(setErrorsForms, "birthDate", "Fecha no válida. Debe estar entre 1700 y 2000.");
        } else {
            // Elimina el error si todas las validaciones son correctas
            clearError(setErrorsForms, name);
        }
    };

    useEffect(() => {
        if (Object.keys(errorsForms).length > 0) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [errorsForms])

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationResponse = validationFieldSubmit(setErrorsForms, formData, event);

        if (validationResponse) {
            swal({
                title: 'Error',
                text: 'Hubo un error al procesar la solicitud. Por favor, intente de nuevo.',
                icon: 'error',
                timer: 4000
            });
            return;
        }

        // Preparar los datos a enviar, eliminando confirmaciones innecesarias
        let dataToSend = { ...formData };
        delete dataToSend.confirmUsername;
        delete dataToSend.confirmPassword;


        const confirmationMessage = action === 'update'
            ? `¿Está seguro que quiere actualizar el usuario?\nUsuario: ${dataToSend.username}\nRol: ${dataToSend.roleRequest.roleListName[0]}`
            : `¿Está seguro que quiere crear el usuario?\nUsuario: ${dataToSend.username}\nRol: ${dataToSend.roleRequest.roleListName[0]}`;

        try {
            const result = await Swal({
                title: 'Confirmación',
                text: confirmationMessage,
                icon: 'warning',
                buttons: {
                    cancel: 'Cancelar',
                    confirm: 'Confirmar'
                },
                dangerMode: true,
            });

            if (result) {
                if (action === 'update') {
                    if (updatePassword) {
                        await ApiService.put(`/auth/update/${userId}`, dataToSend);
                    } else {
                        delete dataToSend.password;
                        delete dataToSend.confirmPassword;
                        await ApiService.put(`/auth/update-nopass/${userId}`, dataToSend);
                    }
                } else {
                    await User.sign_up(dataToSend);
                }

                Swal({
                    title: 'Éxito',
                    text: action === 'update'
                        ? 'Usuario actualizado correctamente'
                        : 'Usuario creado correctamente',
                    icon: 'success',
                    timer: 3000,
                    buttons: false
                });

                nav("../../adminSection/show-users");
            }

        } catch (error) {
            console.error('Error al procesar la solicitud:', error);

            if (error.response) {
                const { Code, Message } = error.response.data;

                if (Code === 400 && Message === "Admin cannot create more than 3 users with ADMIN role.") {
                    Swal({
                        title: 'Error',
                        text: 'No pueden existir más de 3 administradores',
                        icon: 'error',
                        timer: 3000
                    });
                } else {
                    Swal({
                        title: 'Error',
                        text: 'No pueden existir más de 3 administradores',
                        icon: 'error',
                        timer: 3000
                    });
                }
            } else {
                Swal({
                    title: 'Error',
                    text: 'Hubo un error al procesar la solicitud. Por favor, intente de nuevo.',
                    icon: 'error',
                    timer: 2000
                });
            }
        }
    };


    return {
        handleSubmit,
        handleChange,
        formData,
        errorsForms,
        cities,
        deptos,
        roles,
        role,
        companies,
        isDisabled
    }
}
