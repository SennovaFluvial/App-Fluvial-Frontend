import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import swal from 'sweetalert';
import { ApiService } from '../../../../class/ApiServices';
import { Alert } from '../../../../class/alerts';
import { clearError, completeFields, getElementByEndpoint, handleStatusError, sanitizedValue, validationFieldSubmit } from '../../../../functions/functions';

/**
 * Controlador para la creación y actualización de embarcaciones.
 *
 * Este hook gestiona el estado del formulario, la validación de los campos y
 * la interacción con la API para obtener y enviar datos de embarcaciones. Permite
 * reiniciar los valores del formulario, cargar datos de un embarcación existente 
 * para edición, y manejar el envío del formulario.
 *
 * @param {string} id - El ID del embarcación que se está actualizando. Si es null, se crea un nuevo embarcación.
 * @param {string} action - La acción que indica si se está creando o actualizando un embarcación.
 * 
 * @returns {Object} Un objeto que contiene:
 * - errorsForms: Errores de validación del formulario.
 * - formData: Los datos del formulario.
 * - handleChange: Función para manejar los cambios en los campos del formulario.
 * - handleSubmit: Función para manejar el envío del formulario.
 * - userName: Nombre de usuario del creador del embarcación.
 * - isDisabled: Booleano que indica si el formulario está deshabilitado por errores de validación.
 */
export const ControllerCreateUpdateVehicle = ({ id, action }) => {

    const nav = useNavigate();
    const [isDisabled, setIsDisabled] = useState(false);
    const userCreater = JSON.parse(localStorage.getItem("user"));
    const userName = userCreater?.username;
    const [errorsForms, setErrorsForms] = useState({});
    const [formData, setFormData] = useState({
        nombre: "",
        type: "",
        model: "",
        licensePlate: "",
        registration: "",
        fechaExpPatente: "",
        weightCapacity: "",
        weightUnit: "",
        volumeCapacity: "",
        volumeUnit: "",
        passengerSpace: "",
        passengers: "",
        createdBy: userName,
    });


    useEffect(() => {
        if (userName) {
            setFormData(prevFormData => ({
                ...prevFormData,
                createdBy: userName
            }));
        }
    }, [userName]);

    useEffect(() => {
        if (formData.passengerSpace === "false") {
            setFormData(prevState => ({
                ...prevState, passengers: 0
            }))
        }
    }, [formData.passengerSpace])

    useEffect(() => {
        const fetchData = async () => {
            if (!id && !action) {
                setFormData({
                    nombre: "",
                    type: "",
                    model: "",
                    licensePlate: "",
                    registration: "",
                    fechaExpPatente: "",
                    weightCapacity: "",
                    weightUnit: "",
                    volumeCapacity: "",
                    volumeUnit: "",
                    passengerSpace: "",
                    passengers: "",
                    createdBy: userName,
                });
            } else if (action === 'update' && id) {
                const arrayApiResponse = await getElementByEndpoint("/api/v1/vehicles/all");
                const updateFields = completeFields({ formData, id, arrayApiResponse, nameFieldId: 'id' });
                setFormData(updateFields);
            }
        };

        fetchData();
    }, [id, action, userName]);


    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: sanitizedValue(value)
        }));

        if (!value.trim()) {
            handleStatusError(setErrorsForms, name, "Campo obligatorio");
        } else if ((name === "weightCapacity" || name === "volumeCapacity") && isNaN(value)) {
            handleStatusError(setErrorsForms, name, "No es un numero valido");
        } else if (formData.passengerSpace === 'true' && name === 'passengers' && isNaN(value)) {
            handleStatusError(setErrorsForms, name, "No es un numero valido");
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
    }, [errorsForms]);

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

        const messegueConfirmation = action && action === "update" ?
            `¿Estás seguro de actualizar la embarcación ${formData.type} - ${formData.licensePlate}?` :
            `¿Estás seguro de crear el la embarcación ${formData.type} - ${formData.licensePlate}?`;

        const textResponse = action && action === "update" ? "Embarcación actualizado exitosamente." : "Embarcación creado exitosamente.";
        try {

            const result = await Alert.alertConfirm(
                "Confirmación",
                messegueConfirmation,
                textResponse,
                nav,
                "../../adminSection/show-vehicles"
            )

            if (result) {
                if (action && action === "update") {
                    await ApiService.put(`/api/v1/vehicles/update/${id}`, formData);
                } else {
                    await ApiService.post("/api/v1/vehicles/save", formData);
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
        userName,
        isDisabled
    };
}
