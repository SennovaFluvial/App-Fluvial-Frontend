import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import swal from 'sweetalert';
import { ApiService } from '../../../../class/ApiServices';
import { Alert } from '../../../../class/alerts';
export const ControllerCreateUpdateVehicle = () => {

    const nav = useNavigate();
    const userCreater = JSON.parse(localStorage.getItem("user"));
    const userName = userCreater?.username;
    const [formData, setFormData] = useState({
        type: '',
        model: '',
        licensePlate: '',
        registration: '',
        weightCapacity: '',
        weightUnit: '',
        volumeCapacity: '',
        volumeUnit: '',
        passengerSpace: '',
        createdBy: ''
    });

    useEffect(() => {
        if (userName) {
            setFormData(prevFormData => ({
                ...prevFormData,
                createdBy: userName
            }));
        }
    }, [userName]);

    const [errorsForms, setErrorsForms] = useState({});

    // Validación de campos vacíos y numéricos
    const validateField = (name, value) => {
        let errorMessage = '';

        if (!value.trim()) {
            errorMessage = 'Campo obligatorio';
        } else if (['weightCapacity', 'volumeCapacity', 'passengerSpace'].includes(name)) {
            const numberValue = parseFloat(value);
            if (isNaN(numberValue) || numberValue < 0) {
                errorMessage = 'Debe ser un número válido';
            }
        }

        return errorMessage;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        const error = validateField(name, value);
        setErrorsForms((prevErrors) => ({
            ...prevErrors,
            [name]: error || undefined
        }));

        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newErrors = {};
        for (let [name, value] of Object.entries(formData)) {
            const error = validateField(name, value);
            if (error) {
                newErrors[name] = error;
            }
        }

        setErrorsForms((prevErrors) => ({ ...prevErrors, ...newErrors }));

        if (Object.keys(newErrors).length > 0) {
            swal({
                title: 'Error',
                text: 'Por favor, complete todos los campos obligatorios.',
                icon: 'error',
                timer: 3000
            });
            return;
        }

        const messegueConfirmation = `¿Estás seguro de crear el vehículo ${formData.type} - ${formData.licensePlate}?`;
        const textResponse = "Vehículo creado exitosamente.";
        try {

            const result = await Alert.alertConfirm(
                "Confirmación",
                messegueConfirmation,
                textResponse,
                nav,
                "../../adminSection"
            )

            if (result) {
                await ApiService.post("/api/v1/vehicles/save", formData);
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
    };
}
