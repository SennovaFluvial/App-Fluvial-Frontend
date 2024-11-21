import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { clearError, completeFields, getCompanyUser, getElementByEndpoint, handleStatusError, sanitizedValue, validationFieldSubmit } from "../../../../../functions/functions";
import Swal from 'sweetalert';
import { ApiService } from "../../../../../class/ApiServices";

export const ControllerCreateUpdateBranch = ({ id, action }) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const [errorsForms, setErrorsForms] = useState({});
    const nav = useNavigate();
    const [formData, setFormData] = useState({
        nombre: "",
        direccion: "",
        departamento: "",
        municipio: "",
        companiaNombre: ""
    });

    useEffect(() => {
        getCompanyUser("/api/v1/companie/users", "companiaNombre", setFormData);
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            if (action === "update" && id) {
                const arrayApiResponse = await getElementByEndpoint("/api/v1/sucursales/all")
                const updateFields = completeFields({ formData, id, arrayApiResponse, nameFieldId: 'id' });
                setFormData(updateFields)
            }
        }

        fetchData()
    }, [action, id])

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: sanitizedValue(value)
        }));

        if (!value.trim()) {
            handleStatusError(setErrorsForms, name, "Campo obligatorio");
        } else if (value.length > 100) {
            handleStatusError(setErrorsForms, name, "No ingrese un valor tan largo");
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
            `¿Está seguro que quiere actualizar la sucursal? \nNombre: ${formData.nombre}` :
            `¿Está seguro que quiere registrar la sucursal? \nNombre: ${formData.nombre}`;


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
                    await ApiService.put(`/api/v1/branches/update/${id}`, formData);
                } else {
                    await ApiService.post('/api/v1/sucursales/save', formData);
                }

                Swal({
                    title: 'Éxito',
                    text: action === 'update'
                        ? 'Sucursal actualizado correctamente'
                        : 'Sucursal creado correctamente',
                    icon: 'success',
                    timer: 3000,
                    buttons: false
                });

                nav("../../adminSection/show-branch");
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
