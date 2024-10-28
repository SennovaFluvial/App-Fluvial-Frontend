import { useEffect, useState } from "react";
import { ApiService } from "../../../../class/ApiServices";
import { Alert } from "../../../../class/alerts";
import swal from "sweetalert";
import { useNavigate } from "react-router";
import { clearError, complateFields, getElementByEndpoint, handleStatusError, validationFieldSubmit } from "../../../../functions/functions";

/**
 * Controlador para la creación y actualización de empresas.
 * 
 * Este hook gestiona el estado del formulario, la validación de los campos y
 * la interacción con la API para obtener la lista de empresas. Permite reiniciar
 * los valores del formulario, cargar datos de una empresa existente para edición,
 * y manejar el envío del formulario.
 *
 * @param {string} id - El ID de la empresa que se está actualizando. Si es null, se crea una nueva empresa.
 * @param {string} action - La acción que indica si se está creando o actualizando una empresa.
 * 
 * @returns {Object} Un objeto que contiene:
 * - errorsForms: Errores de validación del formulario.
 * - formData: Los datos del formulario.
 * - handleChange: Función para manejar los cambios en los campos del formulario.
 * - handleSubmit: Función para manejar el envío del formulario.
 * - isDisabled: Booleano que indica si el formulario está deshabilitado por errores de validación.
 */
export const ControllerCreateUpdateCompany = ({ id, action }) => {
    const navigate = useNavigate();
    const [errorsForms, setErrorsForms] = useState({});
    const [isDisabled, setIsDisabled] = useState(false)
    const [formData, setFormData] = useState({
        nit: '', company: '', status: '', manager: '',
        email: '', phone: '', address: '', department: '',
        municipality: ''
    });

    useEffect(() => {
        if (!action && !id) {
            setFormData({
                nit: '', company: '', status: '', manager: '',
                email: '', phone: '', address: '', department: '',
                municipality: ''
            })
        }
        setErrorsForms({});
    }, [action, id])

    useEffect(() => {
        const fetchData = async () => {
            if (action && action === 'update' && id) {
                const arrayApiResponse = await getElementByEndpoint("/api/v1/companie/findAll");
                const updateFields = complateFields({ formData, id, arrayApiResponse });
                setFormData(updateFields);
            }
        };

        fetchData();
    }, [action, id]);


    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!value.trim()) {
            handleStatusError(setErrorsForms, name, "Campo obligatorio");
        } else if ((name === "phone") && isNaN(value)) {
            handleStatusError(setErrorsForms, name, "Debe ser un número válido");
        } else if ((name === "nit" && (value.length < 5 || value.length > 11)) ||
            (name === "phone" && (value.length < 5 || value.length > 11))) {
            handleStatusError(setErrorsForms, name, "Debe tener entre 5 y 11 dígitos");
        } else if (name === "email" && !expresionEmail.test(value)) {
            handleStatusError(setErrorsForms, name, "No es un correo válido, recuerda usar el formato: ejemplo@gmail.com");
        } else {
            clearError(setErrorsForms, name);
        }

    }

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

        // Convertir el NIT a un número antes de enviar los datos
        const formattedData = {
            ...formData,
            nit: Number(formData.nit), // Convertir a número
        };

        // Confirmación de envío
        const confirmationMessage = action === 'update' ?
            `¿Está seguro que quiere actualizar la empresa?\nNombre: ${formData.nit} ${formData.company}` :
            `¿Está seguro que quiere crear la empresa? \nNombre: ${formData.nit} ${formData.company}`;

        try {
            const result = await Alert.alertConfirm(
                'Confirmación',
                confirmationMessage,
                action === 'update'
                    ? 'Empresa actualizada correctamente'
                    : 'Empresa creada correctamente',
                navigate,
                "/adminSection/show-companies"
            );

            if (result) {
                if (action === 'update') {
                    await ApiService.put(`/api/v1/companie/update/${id}`, formattedData);
                } else {
                    await ApiService.post('/api/v1/companie/save', formattedData);
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
    }

    return {
        errorsForms,
        formData,
        handleChange,
        handleSubmit,
        isDisabled
    }
}
