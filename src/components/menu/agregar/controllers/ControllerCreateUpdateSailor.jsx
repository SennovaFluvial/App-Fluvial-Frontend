import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ApiService } from "../../../../class/ApiServices";
import Swal from 'sweetalert';
import { Alert } from "../../../../class/alerts";

export const ControllerCreateUpdateSailor = ({ id, action }) => {
    const navigate = useNavigate();
    const [errorsForms, setErrorsForms] = useState({});
    const [listEmployedFluvial, setlistEmployedFluvial] = useState([])
    const [formData, setFormData] = useState({
        name: '', lastName: '', typeDocument: '', numDocument: '', licencia: '',
        email: '', dateOfBirth: '', nationality: '', maritalStatus: '', phone: '',
        address: '', sex: '', status: '', employeeType: { typeName: 'Marinero' },
    });

    // Efecto para reiniciar los valores del formulario cuando no existen los parámetros `action` e `id`.
    useEffect(() => {

        if (!action && !id) {
            setFormData({
                name: '', lastName: '', typeDocument: '', numDocument: '', licencia: '',
                email: '', dateOfBirth: '', nationality: '', maritalStatus: '', phone: '',
                address: '', sex: '', status: '', employeeType: { typeName: 'Marinero' },
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
                    address: filterUserByID.address, sex: filterUserByID.sex, status: filterUserByID.status, employeeType: { typeName: 'Marinero' },
                });
            } else {
                console.error(`No se encontró un usuario con ID: ${id}`);
            }

        }
    }, [action, id, listEmployedFluvial])



    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'dateOfBirth') {
            const today = new Date();
            const selectedDate = new Date(value);
            if (selectedDate > today) {
                setErrorsForms({ ...errorsForms, dateOfBirth: "La fecha de nacimiento no puede ser una fecha futura" });
            } else {
                const { dateOfBirth, ...rest } = errorsForms;
                setErrorsForms(rest);
            }
        } else if (value.trim()) {
            const { [name]: removed, ...rest } = errorsForms;
            setErrorsForms(rest);
        } else {
            setErrorsForms({ ...errorsForms, [name]: "Campo obligatorio" });
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newErrors = {};
        let firstEmptyField = null;

        // Validar campos vacíos
        for (let [name, value] of Object.entries(formData)) {
            if (typeof value === 'string' && !value.trim()) {
                newErrors[name] = "Campo obligatorio";
                if (!firstEmptyField) {
                    firstEmptyField = name;
                }
            }
        }

        // Validar fecha de nacimiento
        if (formData.dateOfBirth) {
            const today = new Date();
            const selectedDate = new Date(formData.dateOfBirth);
            if (selectedDate > today) {
                newErrors.dateOfBirth = "La fecha de nacimiento no puede ser una fecha futura";
                if (!firstEmptyField) {
                    firstEmptyField = "dateOfBirth";
                }
            }
        }

        // Establecer los errores en el estado
        setErrorsForms({ ...errorsForms, ...newErrors });

        // Verificar si hay errores y mostrar alerta
        if (Object.keys(newErrors).length > 0) {
            Swal({
                title: 'Error',
                text: `Por favor, complete el campo obligatorio: ${firstEmptyField}`,
                icon: 'error',
                timer: 3000
            });

            return;
        }

        // Confirmación de envío
        const confirmationMessage = action === 'update' ?
            `¿Está seguro que quiere actualizar al Marinero?\nNombre: ${formData.name} ${formData.lastName}` :
            `¿Está seguro que quiere crear al Marinero?\nNombre: ${formData.name} ${formData.lastName}`;

        try {
            const result = await Alert.alertConfirm(
                'Confirmación',
                confirmationMessage,
                action === 'update'
                    ? 'Marinero actualizado correctamente'
                    : 'Marinero creado correctamente',
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
    }
}
