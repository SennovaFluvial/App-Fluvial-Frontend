import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ApiService } from "../../../../class/ApiServices";
import Swal from 'sweetalert';
import { Alert } from "../../../../class/alerts";
import { handleStatusError } from "../../../../functions/functions";

export const ControllerCreateUpdateCaptain = ({ id, action }) => {

    const navigate = useNavigate();
    const [errorsForms, setErrorsForms] = useState({});
    const [isDisabled, setIsDisabled] = useState(false)
    const [listEmployedFluvial, setlistEmployedFluvial] = useState([])
    const [formData, setFormData] = useState({
        name: '', lastName: '', typeDocument: '', numDocument: '', licencia: '',
        email: '', dateOfBirth: '', nationality: '', maritalStatus: '', phone: '',
        address: '', sex: '', status: '', employeeType: { typeName: 'Capitan' },
    });

    // Efecto para reiniciar los valores del formulario cuando no existen los parámetros `action` e `id`.
    useEffect(() => {

        if (!action && !id) {
            setFormData({
                name: '', lastName: '', typeDocument: '', numDocument: '', licencia: '',
                email: '', dateOfBirth: '', nationality: '', maritalStatus: '', phone: '',
                address: '', sex: '', status: '', employeeType: { typeName: 'Capitan' },
            });
            setErrorsForms({});
        }

    }, [id, action])

    // Efecto para cargar la lista de empleados desde la API y actualizar el estado `listEmployedFluvial`.
    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const response = await ApiService.get("/api/v1/employeefluvial/all");
                setlistEmployedFluvial(response)

            } catch (error) {
                console.error("Ocurrio un error al obtener los datos de la API");
            }
        };

        fetchUsers(); // Ejecutar la funcion
    }, [])


    useEffect(() => {
        if (action && action === "update" && id && listEmployedFluvial.length > 0) {
            const filterUserByID = listEmployedFluvial.find((user) => user.id === parseInt(id, 10));
            if (filterUserByID) {
                setFormData({
                    name: filterUserByID.name, lastName: filterUserByID.lastName, typeDocument: filterUserByID.typeDocument,
                    numDocument: filterUserByID.numDocument, licencia: filterUserByID.licencia,
                    email: filterUserByID.email, dateOfBirth: filterUserByID.dateOfBirth, nationality: filterUserByID.nationality,
                    maritalStatus: filterUserByID.maritalStatus, phone: filterUserByID.phone,
                    address: filterUserByID.address, sex: filterUserByID.sex, status: filterUserByID.status, employeeType: { typeName: 'Capitan' },
                });
            } else {
                console.error(`No se encontró un usuario con ID: ${id}`);
            }

        }
    }, [action, id, listEmployedFluvial])

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
        const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const birthYear = name === "dateOfBirth" ? new Date(value).getFullYear() : null;
        const currentYear = new Date().getFullYear();

        if (!value.trim()) {
            handleStatusError(setErrorsForms, name, "Campo obligatorio");
        } else if ((name === "numDocument" || name === "phone") && isNaN(value)) {
            handleStatusError(setErrorsForms, name, "Debe ser un número válido");
        } else if ((name === "numDocument" && (value.length < 5 || value.length > 11)) ||
            (name === "phone" && (value.length < 5 || value.length > 11))) {
            handleStatusError(setErrorsForms, name, "Debe tener entre 5 y 11 dígitos");
        } else if (name === "email" && !expresionEmail.test(value)) {
            handleStatusError(setErrorsForms, name, "No es un correo válido, recuerda usar el formato: ejemplo@gmail.com");
        } else if (name === "dateOfBirth" && (birthYear < 1700 || birthYear > 2000 || birthYear >= currentYear)) {
            handleStatusError(setErrorsForms, "dateOfBirth", "Fecha no válida. Debe estar entre 1700 y 2000.");
        } else {
            // Elimina el error si todas las validaciones son correctas
            setErrorsForms(prevErrors => {
                const { [name]: removed, ...rest } = prevErrors;
                return rest;
            });
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

        if (Object.keys(errorsForms).length > 0) {
            Swal({
                title: 'Error',
                text: 'Hubo un error al procesar la solicitud. Por favor, intente de nuevo.',
                icon: 'error',
                timer: 4000
            });

            return;
        }

        // Confirmación de envío
        const confirmationMessage = action === 'update' ?
            `¿Está seguro que quiere actualizar al capitán?\nNombre: ${formData.name} ${formData.lastName}` :
            `¿Está seguro que quiere crear al capitán?\nNombre: ${formData.name} ${formData.lastName}`;

        try {
            const result = await Alert.alertConfirm(
                'Confirmación',
                confirmationMessage,
                action === 'update'
                    ? 'Capitan actualizado correctamente'
                    : 'Capitan creado correctamente',
                navigate,
                "../../../adminSection/show-crew"
            );

            if (result) {
                if (action === 'update') {
                    await ApiService.put(`/api/v1/employeefluvial/update/${id}`, formData);
                } else {
                    await ApiService.post('/api/v1/employeefluvial/save', formData);
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
        formData,
        handleSubmit,
        errorsForms,
        handleChange,
        isDisabled
    }
}
