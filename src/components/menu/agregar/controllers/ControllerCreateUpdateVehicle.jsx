import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import swal from 'sweetalert';
import { ApiService } from '../../../../class/ApiServices';
import { Alert } from '../../../../class/alerts';
export const ControllerCreateUpdateVehicle = ({ id, action }) => {

    const nav = useNavigate();
    const userCreater = JSON.parse(localStorage.getItem("user"));
    const userName = userCreater?.username;
    const [errorsForms, setErrorsForms] = useState({});
    const [formData, setFormData] = useState({
        type: '', model: '', licensePlate: '', registration: '', weightCapacity: '',
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
                    type: '', model: '', licensePlate: '', registration: '', weightCapacity: '',
                    weightUnit: '', volumeCapacity: '', volumeUnit: '', passengerSpace: '', createdBy: userName
                });
            } else {
                try {
                    const response = await ApiService.get("/api/v1/vehicles/all");
                    if (response) {

                        const vehicleFiltered = response.find((item) => item.id === parseInt(id, 10));

                        if (vehicleFiltered) {
                            setFormData({
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
    };
}
