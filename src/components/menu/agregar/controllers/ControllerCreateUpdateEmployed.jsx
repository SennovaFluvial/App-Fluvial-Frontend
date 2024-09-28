import { useState, useEffect } from 'react';
import { ApiService } from '../../../../class/ApiServices.jsx';
import { useOptionsDepto, useOptionsCompanies, useOptionsCities, useRoles } from '../../update/options/arrays.jsx';
import { Alert } from '../../../../class/alerts.jsx';
import Swal from 'sweetalert';
import { User } from '../../../../class/User.jsx';
import { createRoutesFromChildren, useLocation, useNavigate, useParams } from 'react-router';

export const ControllerCreateUpdateEmployed = ({ updatePassword }) => {
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

    const handleErrors = (name, message) => {
        setErrorsForms(prevErrors => ({
            ...prevErrors,
            [name]: message
        }));
    };

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

        // Validaciones de campos
        if (!value.trim()) {
            handleErrors(name, "Campo obligatorio");
        }
        // Validación específica para numDocument y phone (deben ser números y cumplir con los límites de longitud)
        else if ((name === "numDocument" || name === "phone") && isNaN(value)) {
            handleErrors(name, "Debe ser un número válido");
        }
        else if ((name === "numDocument" && (value.length < 5 || value.length > 11)) ||
            (name === "phone" && (value.length < 5 || value.length > 11))) {
            handleErrors(name, "Debe tener entre 5 y 11 dígitos");
        }
        // Validación de confirmación de username
        else if (name === "confirmUsername" && value !== formData.username) {
            handleErrors("confirmUsername", "El nombre de usuario no coincide");
        }
        // Validación de confirmación de contraseña
        else if (name === "confirmPassword" && value !== formData.password) {
            handleErrors("confirmPassword", "La contraseña no coincide");
        }
        else if (name === "birthDate") {
            const birthYear = new Date(value).getFullYear();
            const currentYear = new Date().getFullYear();
            if (birthYear < 1700 || birthYear > 2000 || birthYear >= currentYear) {
                handleErrors("birthDate", "Fecha no válida. Debe estar entre 1700 y 2000.");
            } else {
                setErrorsForms(prevErrors => {
                    const { [name]: removed, ...rest } = prevErrors;
                    return rest;
                });
            }
        }
        else {
            // Si el campo es válido, se elimina el error correspondiente
            setErrorsForms(prevErrors => {
                const { [name]: removed, ...rest } = prevErrors;
                return rest;
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newErrors = {};
        let firstEmptyField = null;

        const getLabelForField = (fieldName) => {
            const labelElement = document.querySelector(`label[for="${fieldName}"]`);
            return labelElement ? labelElement.textContent : fieldName;
        };


        // Validación de campos vacíos (aplica a todos los campos)
        if (updatePassword) {
            for (let [name, value] of Object.entries(formData)) {
                if (name === 'roleRequest.roleListName' && (!formData.roleRequest.roleListName || formData.roleRequest.roleListName.length === 0)) {
                    newErrors['roleRequest'] = `Campo obligatorio`
                    if (!firstEmptyField) firstEmptyField = 'Role List Name';
                } else if (typeof value === 'string' && !value.trim()) {
                    newErrors[name] = `Campo obligatorio`;
                    if (!firstEmptyField) firstEmptyField = name;
                }
            }
        } else {
            for (let [name, value] of Object.entries(formData)) {
                // Validar todos los campos excepto 'password' y 'confirmPassword'
                if (name !== 'password' && name !== 'confirmPassword') {
                    if (typeof value === 'string' && !value.trim()) {
                        newErrors[name] = `Campo obligatorio`;
                        if (!firstEmptyField) firstEmptyField = name;
                    }
                }
            }
        }

        // Actualización de los errores en el estado
        setErrorsForms(newErrors);

        // Si hay errores, se detiene la ejecución
        if (Object.keys(newErrors).length > 0) {
            Swal({
                title: 'Error',
                text: `Por favor, complete el campo obligatorio: ${getLabelForField(firstEmptyField)}`,
                icon: 'error',
                timer: 3000
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
                    // Enviar datos dependiendo de si se actualiza la contraseña o no
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


    return {
        handleSubmit,
        handleChange,
        handleErrors,
        formData,
        errorsForms,
        cities,
        deptos,
        roles,
        role,
        companies
    }
}
