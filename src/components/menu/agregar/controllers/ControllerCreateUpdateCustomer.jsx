import { useEffect, useState } from "react";
import { ApiService } from "../../../../class/ApiServices";
import swal from "sweetalert";
import { useNavigate } from "react-router";
import { Alert } from "../../../../class/alerts";

export const ControllerCreateUpdateCustomer = ({ id, action }) => {

    const navigate = useNavigate();
    const [listCustomers, setListCustomers] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const userNameUser = user?.username || null;

    const [formData, setFormData] = useState({
        name: '', lastName: '', typeDocument: '', numDocument: '', email: '', dateOfBirth: '', nationality: '',
        maritalStatus: '', phone: '', address: '', sex: '', personType: '', companyName: '', nitCompany: '', cityName: '', userNames: [userNameUser]
    });

    const [errorsForms, setErrorsForms] = useState({});

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

    // Cargar la lista de clientes
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await ApiService.get("/api/v1/customers/all");
                setListCustomers(response);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCustomers();
    }, []);

    // Actualizar formulario cuando se seleccione un cliente para actualización
    useEffect(() => {
        if (action === "update" && id && listCustomers.length > 0) {
            const customerFilterById = listCustomers.find((customer) => customer.id === parseInt(id, 10));
            if (customerFilterById) {
                setFormData({
                    name: customerFilterById.name, lastName: customerFilterById.lastName,
                    typeDocument: customerFilterById.typeDocument, numDocument: customerFilterById.numDocument,
                    email: customerFilterById.email, dateOfBirth: customerFilterById.dateOfBirth, nationality: customerFilterById.nationality,
                    maritalStatus: customerFilterById.maritalStatus, phone: customerFilterById.phone, address: customerFilterById.address,
                    sex: customerFilterById.sex, cityName: customerFilterById.cityName, userNames: [userNameUser]
                });
            }
        }
    }, [action, id, listCustomers]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        // Actualizar campos dinámicamente, permitiendo espacios
        if (name.startsWith("userName")) {
            const index = parseInt(name.replace("userName", ""));
            const updatedUserNames = [...formData.userNames];
            updatedUserNames[index] = value;
            setFormData({ ...formData, userNames: updatedUserNames });
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value
            }));
        }

        // Verificar el tipo de persona
        if (name === "personType") {
            if (value === "Natural") {
                // Si es "Natural", limpiar campos de empresa
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    companyName: null,
                    nitCompany: null,
                }));
            } else if (value === "Jurídica") {
                // Si es "Jurídica", mantener los valores ingresados para empresa
                setFormData((prevFormData) => ({
                    ...prevFormData
                }));
            }
        }
    };

    const handleErrors = (name, message) => {
        setErrorsForms({ ...errorsForms, [name]: message });
    };

    // Validación de fecha de nacimiento
    useEffect(() => {
        if (formData.dateOfBirth) {
            const selectedDate = new Date(formData.dateOfBirth);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate >= today) {
                handleErrors("dateOfBirth", "La fecha de nacimiento no puede ser actual o una fecha futura");
            }
        }
    }, [formData.dateOfBirth]);

    // Manejar el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();

        const newErrors = {};
        let firstEmptyField = null;

        for (let [name, value] of Object.entries(formData)) {
            if (Array.isArray(value) && value.some((v) => typeof v === 'string' && !v.trim())) {
                newErrors[name] = "Campo obligatorio";
                if (!firstEmptyField) firstEmptyField = name;
            } else if (typeof value === 'string' && !value.trim()) {
                newErrors[name] = "Campo obligatorio";
                if (!firstEmptyField) firstEmptyField = name;
            } else {
                const { [name]: removed, ...rest } = errorsForms;
                setErrorsForms(rest);
            }
        }

        setErrorsForms({ ...errorsForms, ...newErrors });

        if (Object.keys(newErrors).length > 0) {
            swal({
                title: 'Error',
                text: `Por favor, complete el campo obligatorio: ${firstEmptyField}`,
                icon: 'error',
                timer: 3000
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
        formData, errorsForms, handleChange, handleSubmit
    };
}
