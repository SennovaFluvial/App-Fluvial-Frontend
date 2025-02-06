import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ApiService } from "../../../../class/ApiServices";
import Swal from 'sweetalert';
import { Alert } from "../../../../class/alerts";
import { clearError, completeFields, getElementByEndpoint, handleStatusError, sanitizedValue, validationFieldSubmit } from "../../../../functions/functions";

/**
 * Componente ControllerCreateUpdateBoatDriver para crear o actualizar información de un motorista.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.id - El ID del motorista a actualizar. Si se proporciona, el componente
 * inicializa el formulario con los datos existentes del motorista.
 * @param {string} props.action - La acción a realizar, puede ser 'create' o 'update'.
 * 
 * @returns {Object} - Retorna un objeto que contiene los datos del formulario, la función de
 * manejo de envío, los errores del formulario, la función de manejo de cambios y el estado
 * de habilitación del botón de envío.
 */
export const ControllerCreateUpdateBoatDriver = ({ id, action }) => {

    const navigate = useNavigate();
    const [errorsForms, setErrorsForms] = useState({});
    const [isDisabled, setIsDisabled] = useState(false)
    const [formData, setFormData] = useState({
        name: '', lastName: '', typeDocument: '', numDocument: '', licencia: '',
        email: '', dateOfBirth: '', nationality: '', maritalStatus: '', phone: '',
        address: '', sex: '', status: '', employeeType: { typeName: 'Motorista' },
    });

    // Efecto para reiniciar los valores del formulario cuando no existen los parámetros `action` e `id`.
    useEffect(() => {

        if (!action && !id) {
            setFormData({
                name: '', lastName: '', typeDocument: '', numDocument: '', licencia: '',
                email: '', dateOfBirth: '', nationality: '', maritalStatus: '', phone: '',
                address: '', sex: '', status: '', employeeType: { typeName: 'Motorista' },
            });
            setErrorsForms({});
        }

    }, [id, action])

    useEffect(() => {
        const fetchData = async () => {
            if (action && action === 'update' && id) {
                const arrayApiResponse = await getElementByEndpoint("/api/v1/employeefluvial/all");
                const updateFields = completeFields({ formData, id, arrayApiResponse, nameFieldId: 'id' });
                setFormData(updateFields);
            }
        };

        fetchData();
    }, [action, id]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: sanitizedValue(value)
        }));

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
        } else if (name === "dateOfBirth" && (birthYear < 1700 || birthYear > currentYear)) {
            handleStatusError(setErrorsForms, "dateOfBirth", "Fecha no válida. Debe estar entre 1700 y 2000.");
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

        // Confirmación de envío
        const confirmationMessage = action === 'update' ?
            `¿Está seguro que quiere actualizar al motorista?\nNombre: ${formData.name} ${formData.lastName}` :
            `¿Está seguro que quiere crear al motorista?\nNombre: ${formData.name} ${formData.lastName}`;

        try {
            const result = await Alert.alertConfirm(
                'Confirmación',
                confirmationMessage,
                action === 'update'
                    ? 'Motorista actualizado correctamente'
                    : 'Motorista creado correctamente',
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
