import { useEffect, useState } from "react"
import { clearError, completeFields, getCompanyUser, getElementByEndpoint, getInfoProducts, handleStatusError, idIdentifier, sanitizedValue, validationFieldSubmit } from "../../../../../functions/functions"
import Swal from "sweetalert"
import { ApiService } from "../../../../../class/ApiServices"
import { useNavigate } from "react-router"
import { useGlobalContext } from "../../../../../GlobalContext "

/**
 * Controlador para crear o actualizar un producto.
 *
 * Este componente maneja el estado y las operaciones necesarias
 * para crear o actualizar productos en una aplicación. Utiliza hooks
 * de React para manejar el estado y efectos secundarios.
 *
 * @param {Object} props - Props que recibe el controlador.
 * @param {string} props.id - ID del producto que se va a actualizar (opcional).
 * @param {string} props.action - Acción a realizar ("create" o "update").
 *
 * @returns {Object} - Un objeto que contiene funciones y estados relevantes para el formulario.
 */
export const ControllerCreateUpdateProduct = ({ funcChangeState, id, action }) => {

    const [isDisabled, setIsDisabled] = useState(false)
    const [errorsForms, setErrorsForms] = useState({})
    const { setShouldUpdateFlag } = useGlobalContext() // Variables globales
    const nav = useNavigate()

    const [formData, setFormData] = useState({
        productLocation: "", // Campo extra solo para el front-end - No se envia
        productName: "",
        description: "",
        number: "",
        weight: "",
        unitOfMeasurement: "",
        height: "",
        length: "",
        width: "",
        dimensions: "",
        packagingType: "",
        isPerishable: "",
        insured: "",
        specialHandlingInstructions: "",
        hazardousMaterials: "",
        categoryName: "",
        vehicleName: "",
        companyName: "",
        customerNumDocument: "",
        warehouseName: ""
    })

    // Efectos
    useEffect(() => {
        getCompanyUser("/api/v1/companie/users", "companyName", setFormData)
    }, [])

    // Efecto para reiniciar los valores del formulario cuando no existen los parámetros `action` e `id`.
    useEffect(() => {
        if (!action && !id) {
            const updatedFormData = { ...formData }

            Object.keys(updatedFormData).forEach((keyName) => {
                if (typeof updatedFormData[keyName] === "object" && updatedFormData[keyName] !== null) {
                    Object.keys(updatedFormData[keyName]).forEach((subKey) => {
                        updatedFormData[keyName][subKey] = ""
                    })
                } else {
                    updatedFormData[keyName] = ""
                }
            })

            setFormData(updatedFormData)
            setErrorsForms({})
        }
    }, [action, id])

    // Efecto para obtener y actualizar los datos del formulario cuando `action` es "update" y `id` existe.
    useEffect(() => {
        const fetchData = async () => {
            if (action === "update" && id) {
                const arrayApiResponse = await getElementByEndpoint("/api/v1/product/all")
                const updateFields = completeFields({ formData, id, arrayApiResponse, nameFieldId: "productId" })
                setFormData(updateFields)
            }
        }

        fetchData()
    }, [action, id])

    useEffect(() => {
        if (action && action == "update") {
            if (formData.vehicleName) {
                setFormData(prevState => ({
                    ...prevState, productLocation: "vehicle"

                }))
            } else if (formData.warehouseName) {
                setFormData(prevState => ({
                    ...prevState, productLocation: "warehouse"
                }))
            }
        }
    }, [action, formData.vehicleName, formData.warehouseName])

    useEffect(() => {
        if (Object.keys(errorsForms).length > 0) {
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
    }, [errorsForms])

    // Efecto para agregar contenido a `dimensions`
    useEffect(() => {
        if (formData.height && formData.length && formData.width) {
            setFormData(prevState => ({
                ...prevState, dimensions: `${formData.length} x ${formData.width} x ${formData.height}`
            }))
        }
    }, [formData.height, formData.length, formData.width])

    // Funciones
    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData(prevState => ({
            ...prevState,
            [name]: sanitizedValue(value)
        }))

        if (value !== "") {
            const resetFields = {
                vehicleName: "warehouseName",
                warehouseName: "vehicleName"
            }

            if (resetFields[name]) {
                setFormData(prevState => ({
                    ...prevState,
                    [resetFields[name]]: ""
                }))
            }
        }

        if (name !== "specialHandlingInstructions") {
            if (!value.trim()) {
                handleStatusError(setErrorsForms, name, "Campo obligatorio")
            } else if ((name === "weight" || name === "height" || name === "length" || name === "width" || name === "customerNumDocument" || name === "number") && isNaN(value)) {
                handleStatusError(setErrorsForms, name, "Debe ser un número válido")
            } else if (name === "customerNumDocument" && (value.length < 5 || value.length > 11)) {
                handleStatusError(setErrorsForms, name, "El valor debe ser un número positivo con entre 5 y 11 dígitos")
            } else {
                clearError(setErrorsForms, name)
            }
        }
    }

    const handleSubmit = async (event) => {

        event.preventDefault()

        if (!formData.specialHandlingInstructions.trim()) {
            setFormData(prevState => ({
                ...prevState,
                specialHandlingInstructions: "N/A"
            }))
        }

        const validationResponse = validationFieldSubmit(setErrorsForms, formData, event)

        if (validationResponse) {
            swal({
                title: "Error",
                text: "Hubo un error al procesar la solicitud. Por favor, intente de nuevo.",
                icon: "error",
                timer: 4000
            })
            return
        }

        let dataToSend = {
            ...formData,
            weight: parseFloat(formData.weight),
            height: parseFloat(formData.height),
            length: parseFloat(formData.length),
            width: parseFloat(formData.width),
            number: parseInt(formData.number)
        }

        // Eliminar el campo "productLocation" antes de enviar
        delete dataToSend.productLocation

        const confirmationMessage = action === "update" ?
            `¿Está seguro que quiere actualizar el producto? \nNombre: ${formData.productName} asociado a ${formData.customerNumDocument} ` :
            `¿Está seguro que quiere registrar el producto? \nNombre: ${formData.productName} asociado a ${formData.customerNumDocument} `


        try {
            const result = await Swal({
                title: "Confirmación",
                text: confirmationMessage,
                icon: "warning",
                buttons: {
                    cancel: "Cancelar",
                    confirm: "Confirmar"
                },
                dangerMode: true,
            })

            if (result) {
                if (action === "update") {
                    await ApiService.put(`/api/v1/product/update/${id}`, dataToSend)
                } else {
                    await ApiService.post("/api/v1/product/save", dataToSend)
                }

                Swal({
                    title: "Éxito",
                    text: action === "update"
                        ? "Producto actualizado correctamente"
                        : "Producto creado correctamente",
                    icon: "success",
                    timer: 3000,
                    buttons: false
                })

                // Cambiar el estado para ocultar el modal
                if (funcChangeState) {
                    funcChangeState(false)
                    setShouldUpdateFlag(true)
                } else {
                    nav("../../adminSection/show-products")
                }

            }
        } catch (error) {
            console.error("Error al procesar la solicitud:", error)
            swal({
                title: "Error",
                text: "Hubo un error al procesar la solicitud. Por favor, intente de nuevo.",
                icon: "error",
                timer: 2000
            })
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