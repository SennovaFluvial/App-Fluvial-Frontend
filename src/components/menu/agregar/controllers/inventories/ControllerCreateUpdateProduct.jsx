import { useEffect, useState } from 'react'
import { clearError, getCompanyUser, getInfoProducts, handleStatusError, idIdentifier, validationFieldSubmit } from '../../../../../functions/functions';
import Swal from 'sweetalert';
import { ApiService } from '../../../../../class/ApiServices';
import { useNavigate } from 'react-router';

/**
 * Controlador para crear o actualizar un producto.
 *
 * Este componente maneja el estado y las operaciones necesarias
 * para crear o actualizar productos en una aplicación. Utiliza hooks
 * de React para manejar el estado y efectos secundarios.
 *
 * @param {Object} props - Props que recibe el controlador.
 * @param {string} props.id - ID del producto que se va a actualizar (opcional).
 * @param {string} props.action - Acción a realizar ('create' o 'update').
 *
 * @returns {Object} - Un objeto que contiene funciones y estados relevantes para el formulario.
 */
export const ControllerCreateUpdateProduct = ({ id, action }) => {

    const [isDisabled, setIsDisabled] = useState(false)
    const [errorsForms, setErrorsForms] = useState({});
    const [fieldsUpdate, setFieldsUpdate] = useState([]);
    const nav = useNavigate();

    const [formData, setFormData] = useState({
        productName: "",// STRING
        description: "",// STRING
        weight: "", // NUMBER
        unitOfMeasurement: "",// STRING
        height: "", // NUMBER
        length: "", // NUMBER
        width: "", // NUMBER
        dimensions: "",// STRING
        packagingType: "",// STRING
        isPerishable: "", // BOlEAN
        insured: "", // BOlEAN
        specialHandlingInstructions: "",// STRING
        hazardousMaterials: "", // BOlEAN
        category: {
            categoryId: "", // NUMBER ID
            categoryName: ""// STRING
        },
        vehicleName: "",// STRING
        companyName: "",// STRING
        customerNumDocument: "",// STRING
        customerFlag: false, // Campo extra solo para el front-end - No se envia
        warehouseName: "",// STRING
        productLocation: "", // Campo extra solo para el front-end - No se envia
    });

    useEffect(() => {
        getCompanyUser("/api/v1/companie/users", "companyName", setFormData);
    }, []);

    useEffect(() => {
        if (!action && !id) {
            const updatedFormData = { ...formData };

            Object.keys(updatedFormData).forEach(keyName => {
                if (typeof updatedFormData[keyName] === 'object' && updatedFormData[keyName] !== null) {
                    Object.keys(updatedFormData[keyName]).forEach(subKey => {
                        updatedFormData[keyName][subKey] = '';
                    });
                } else {
                    updatedFormData[keyName] = '';
                }
            });

            setFormData(updatedFormData);
            setErrorsForms({});
        } else {
            getInfoProducts(setFieldsUpdate, "/api/v1/product/all");

            const filterElement = fieldsUpdate.find((item) => item.id === parseInt(id, 10));
            if (filterElement) {
                const updatedFormData = { ...formData };

                Object.keys(updatedFormData).forEach(keyName => {
                    if (filterUserId[keyName] !== undefined) {
                        updatedFormData[keyName] = filterUserId[keyName];
                    } else {
                        updatedFormData[keyName] = '';
                    }
                });

                setFormData(updatedFormData);
            }
        }
    }, [action, id]);

    // EXPORTAR
    const handleChange = (event) => {
        const { name, value } = event.target;


        if (name === "categoryName") {
            setFormData(prevState => ({
                ...prevState,
                category: {
                    ...prevState.category,
                    categoryName: value
                }
            }));


            idIdentifier(value, setFormData);
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }

        if (value !== '') {
            const resetFields = {
                vehicleName: 'warehouseName',
                warehouseName: 'vehicleName'
            };

            if (resetFields[name]) {
                setFormData(prevState => ({
                    ...prevState,
                    [resetFields[name]]: null
                }));
            }
        }

        if (name !== "specialHandlingInstructions") {
            if (!value.trim()) {
                handleStatusError(setErrorsForms, name, "Campo obligatorio");
            } else if ((name === 'weight' || name === "height" || name === "length" || name === "width" || name === 'customerNumDocument') && isNaN(value)) {
                handleStatusError(setErrorsForms, name, "Debe ser un número válido");
            } else if (name === "customerNumDocument" && (value.length < 5 || value.length > 11)) {
                handleStatusError(setErrorsForms, name, "El valor debe ser un número positivo con entre 5 y 11 dígitos");
            } else {
                clearError(setErrorsForms, name);
            }
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

        if (!formData.specialHandlingInstructions.trim()) {
            setFormData(prevState => ({
                ...prevState,
                specialHandlingInstructions: "N/A"
            }));
        }

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

        let dataToSend = {
            ...formData,
            weight: parseFloat(formData.weight),
            height: parseFloat(formData.height),
            length: parseFloat(formData.length),
            width: parseFloat(formData.width),
            category: {
                ...formData.category,
                categoryId: parseInt(formData.category.categoryId, 10)
            }
        };

        // Eliminar el campo 'productLocation' antes de enviar
        delete dataToSend.productLocation;

        const confirmationMessage = action === 'update' ?
            `¿Está seguro que quiere actualizar el producto? \nNombre: ${formData.productName} asociado a ${formData.customerNumDocument} ` :
            `¿Está seguro que quiere registrar el producto? \nNombre: ${formData.productName} asociado a ${formData.customerNumDocument} `;


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
                    await ApiService.put(`/api/v1/product/update/${id}`, dataToSend);
                } else {
                    await ApiService.post('/api/v1/product/save', dataToSend);
                }

                Swal({
                    title: 'Éxito',
                    text: action === 'update'
                        ? 'Producto actualizado correctamente'
                        : 'Producto creado correctamente',
                    icon: 'success',
                    timer: 3000,
                    buttons: false  
                });

                nav("../../adminSection/show-products");
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
        handleChange,
        formData,
        errorsForms, // Estado de errores
        handleSubmit, // Funcion de registro
        setFormData, // Funcion para camboar el estado de formulario a enviar
        isDisabled, // Estado de inavilitado
        setErrorsForms, // Cambiar estado de errores,
    }
}
