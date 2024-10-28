import { useEffect, useImperativeHandle, useState } from "react";
import { ApiService } from "../../../../class/ApiServices";
import swal from "sweetalert";
import { useNavigate } from "react-router";
import { Alert } from "../../../../class/alerts";
import { clearError, complateFields, getElementByEndpoint, handleStatusError, validationFieldSubmit } from "../../../../functions/functions";

/**
 * Controlador para la creación y actualización de clientes.
 *
 * Este hook gestiona el estado del formulario, la validación de los campos y
 * la interacción con la API para obtener la lista de clientes. Permite reiniciar
 * los valores del formulario, cargar datos de un cliente existente para edición,
 * y manejar el envío del formulario.
 *
 * @param {string} id - El ID del cliente que se está actualizando. Si es null, se crea un nuevo cliente.
 * @param {string} action - La acción que indica si se está creando o actualizando un cliente.
 * 
 * @returns {Object} Un objeto que contiene:
 * - errorsForms: Errores de validación del formulario.
 * - formData: Los datos del formulario.
 * - handleChange: Función para manejar los cambios en los campos del formulario.
 * - handleSubmit: Función para manejar el envío del formulario.
 * - isDisabled: Booleano que indica si el formulario está deshabilitado por errores de validación.
 */
export const ControllerCreateUpdateCustomer = ({ id, action }) => {

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [isDisabled, setIsDisabled] = useState(false)
    const userNameUser = user?.username || null;
    const [errorsForms, setErrorsForms] = useState({});

    const [formData, setFormData] = useState({
        name: '', lastName: '', typeDocument: '', numDocument: '', email: '', dateOfBirth: '', nationality: '',
        maritalStatus: '', phone: '', address: '', sex: '', personType: '', companyName: '', nitCompany: '', cityName: '', userNames: [userNameUser]
    });


    // Reiniciar formulario si no hay acción ni ID
    useEffect(() => {
        if (!action && !id) {
            setFormData({
                name: '', lastName: '', typeDocument: '', numDocument: '', email: '', dateOfBirth: '', nationality: '',
                maritalStatus: '', phone: '', address: '', sex: '', personType: '', companyName: '', nitCompany: '', cityName: '', userNames: [userNameUser]
            });
        }
        setErrorsForms({});
    }, [action, id]);


    useEffect(() => {
        const fetchData = async () => {
            if (action && action === 'update' && id) {
                const arrayApiResponse = await getElementByEndpoint("/api/v1/customers/all");
                const updateFields = complateFields({ formData, id, arrayApiResponse });
                setFormData(updateFields);
            }
        };

        fetchData();
    }, [action, id]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));

        // Verificar el tipo de persona
        if (name === "personType") {
            if (value === "Natural") {
                // Si es "Natural", limpiar campos de empresa
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    companyName: "",
                    nitCompany: "",
                }));

                setErrorsForms((prevErrors) => {
                    const { companyName, nitCompany, ...rest } = prevErrors;
                    return rest;
                });

            } else if (value === "Jurídica") {
                // Si es "Jurídica", mantener los valores ingresados para empresa
                setFormData((prevFormData) => ({
                    ...prevFormData
                }));
            }
        }

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

    // Manejar el envío del formulario
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

        const confirmationMessage = action === 'update' ?
            `¿Está seguro que quiere actualizar el cliente?\nNombre: ${formData.name} ${formData.lastName}` :
            `¿Está seguro que quiere crear el cliente? \nNombre: ${formData.name} ${formData.lastName}`;

        try {
            const result = await Alert.alertConfirm(
                'Confirmación',
                confirmationMessage,
                action === 'update'
                    ? 'Cliente actualizado correctamente'
                    : 'Cliente creado correctamente',
                navigate,
                "/adminSection/show-customers"
            );

            if (result) {
                if (action === 'update') {
                    await ApiService.put(`/api/v1/customers/update/${id}`, formData);
                } else {
                    await ApiService.post('/api/v1/customers/save', formData);
                }
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
            swal({
                title: 'Error',
                text: 'Hubo un error al procesar la solicitud. Por favor, intente de nuevo.',
                icon: 'error',
                timer: 2000
            });
        }
    };

    return {
        formData,
        errorsForms,
        handleChange,
        handleSubmit,
        isDisabled
    };
}
