import { useNavigate } from "react-router";
import { clearError, completeFields, getElementByEndpoint, handleStatusError, sanitizedValue, validationFieldSubmit } from "../../../../../functions/functions";
import { useEffect, useState } from "react";
import { ApiService } from "../../../../../class/ApiServices";
import Swal from 'sweetalert';

export const ControllerCreateUpdateWarehouse = ({ id, action }) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const [errorsForms, setErrorsForms] = useState({});
    const nav = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        capacity: "",
        unitOfMeasurement: "",
        description: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            if (action && action === 'update' && id) {
                const arrayApiResponse = await getElementByEndpoint("/api/v1/warehouse/all");
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

        if (!value.trim()) {
            handleStatusError(setErrorsForms, name, "Campo obligatorio");
        } else if (name === "capacity") {
            const capacityValue = Number(value);
            if (isNaN(capacityValue)) {
                handleStatusError(setErrorsForms, name, "Debe ser un número válido");
            } else {
                clearError(setErrorsForms, name);
            }
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

        const confirmationMessage = action === 'update' ?
            `¿Está seguro que quiere actualizar el producto? \nNombre: ${formData.name}` :
            `¿Está seguro que quiere registrar el producto? \nNombre: ${formData.name}`;


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
                    await ApiService.put(`/api/v1/warehouse/update/${id}`, formData);
                } else {
                    await ApiService.post('/api/v1/warehouse/save', formData);
                }

                Swal({
                    title: 'Éxito',
                    text: action === 'update'
                        ? 'Bodega actualizado correctamente'
                        : 'Bodega creado correctamente',
                    icon: 'success',
                    timer: 3000,
                    buttons: false
                });

                nav("../../adminSection/show-warehouse");
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
        isDisabled,
        errorsForms,
        formData,
        handleChange,
        handleSubmit
    }
}
