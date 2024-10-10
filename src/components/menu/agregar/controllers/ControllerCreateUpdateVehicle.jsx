import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import swal from 'sweetalert';
import { ApiService } from '../../../../class/ApiServices';
import { Alert } from '../../../../class/alerts';
import { handleStatusError } from '../../../../functions/functions';
export const ControllerCreateUpdateVehicle = ({ id, action }) => {

    const nav = useNavigate();
    const [isDisabled, setIsDisabled] = useState(false);
    const userCreater = JSON.parse(localStorage.getItem("user"));
    const userName = userCreater?.username;
    const [errorsForms, setErrorsForms] = useState({});
    const [formData, setFormData] = useState({
        nombre: '', type: '', model: '', licensePlate: '', registration: '', weightCapacity: '',
        weightUnit: '', volumeCapacity: '', volumeUnit: '', passengerSpace: '', createdBy: ''
    });

    useEffect(() => {
        if (userName) {
            setFormData(prevFormData => ({
                ...prevFormData,
                createdBy: userName
            }));
        }
    }, [userName]);

    // Efecto para restablecer campos.

    useEffect(() => {
        const fetchData = async () => {
            if (!id && !action) {
                setFormData({
                    nombre: '', type: '', model: '', licensePlate: '', registration: '', weightCapacity: '',
                    weightUnit: '', volumeCapacity: '', volumeUnit: '', passengerSpace: '', createdBy: userName
                });
            } else {
                try {
                    const response = await ApiService.get("/api/v1/vehicles/all");
                    if (response) {

                        const vehicleFiltered = response.find((item) => item.id === parseInt(id, 10));

                        if (vehicleFiltered) {
                            setFormData({
                                nombre: vehicleFiltered.nombre,
                                type: vehicleFiltered.type,
                                model: vehicleFiltered.model,
                                licensePlate: vehicleFiltered.licensePlate,
                                registration: vehicleFiltered.registration,
                                weightCapacity: vehicleFiltered.weightCapacity,
                                weightUnit: vehicleFiltered.weightUnit,
                                volumeCapacity: vehicleFiltered.volumeCapacity,
                                volumeUnit: vehicleFiltered.volumeUnit,
                                passengerSpace: vehicleFiltered.passengerSpace,
                                createdBy: userName
                            });
                        }
                    }
                } catch (error) {
                    console.error("Error al obtener datos de la Api de Vehiculos", error);
                }
            }
        };

        fetchData();
    }, [id, action, userName]);

    const validateField = (name, value) => {
        let errorMessage = '';

        if (typeof value === 'string' && !value.trim()) {
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

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (!value.trim()) {
            handleStatusError(setErrorsForms, name, "Campo obligatorio");
        } else if ((name === "weightCapacity" || name === "volumeCapacity" || name === "passengerSpace") && isNaN(value)) {
            handleStatusError(setErrorsForms, name, "No es un numero valido");
        }
        else {
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
    }, [errorsForms]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formElements = event.target.elements;
        let hasErrors = false;

        for (let element of formElements) {
            if (element.name && typeof formData[element.name] === 'string' && !formData[element.name].trim()) {
                handleStatusError(setErrorsForms, element.name, "Campo obligatorio");
                hasErrors = true;
            }
        }

        if (hasErrors) {
            swal({
                title: 'Error',
                text: 'Hubo un error al procesar la solicitud. Por favor, intente de nuevo.',
                icon: 'error',
                timer: 4000
            });
            return;
        };

        const messegueConfirmation = action && action === "update" ?
            `¿Estás seguro de actualizar el vehículo ${formData.type} - ${formData.licensePlate}?` :
            `¿Estás seguro de crear el vehículo ${formData.type} - ${formData.licensePlate}?`;

        const textResponse = action && action === "update" ? "Vehículo actualizado exitosamente." : "Vehículo creado exitosamente.";
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
