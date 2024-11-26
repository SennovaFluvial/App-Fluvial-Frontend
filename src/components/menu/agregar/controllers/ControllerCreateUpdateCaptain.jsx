import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { ApiService } from "../../../../class/ApiServices"
import Swal from 'sweetalert'
import { Alert } from "../../../../class/alerts"
import { clearError, completeFields, getElementByEndpoint, handleStatusError, sanitizedValue, validationFieldSubmit } from "../../../../functions/functions"

/**
 * Controlador para la creación y actualización de capitán.
 * 
 * Este hook maneja el estado del formulario, la validación y la interacción con la API
 * para obtener la lista de empleados fluviales. Proporciona funcionalidades para
 * reiniciar los valores del formulario, cargar datos de un empleado para la edición
 * y manejar el envío del formulario.
 *
 * @param {string} id - El ID del capitán que se está actualizando. Si es null, se crea un nuevo capitán.
 * @param {string} action - La acción que indica si se está creando o actualizando un capitán.
 * 
 * @returns {Object} Un objeto que contiene:
 * - formData: Los datos del formulario.
 * - handleSubmit: Función para manejar el envío del formulario.
 * - errorsForms: Errores de validación del formulario.
 * - handleChange: Función para manejar los cambios en los campos del formulario.
 * - isDisabled: Booleano que indica si el formulario está deshabilitado por errores de validación.
 */

export const ControllerCreateUpdateCaptain = ({ id, action }) => {

    const navigate = useNavigate()
    const [errorsForms, setErrorsForms] = useState({})
    const [isDisabled, setIsDisabled] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        typeDocument: '',
        numDocument: '',
        licencia: '',
        expLicencia: '',
        email: '',
        dateOfBirth: '',
        nationality: '',
        maritalStatus: '',
        phone: '',
        address: '',
        sex: '',
        status: '',
        employeeType: {
            typeName: ''
        }
    });



    // Efecto para reiniciar los valores del formulario cuando no existen los parámetros `action` e `id`.
    useEffect(() => {

        if (!action && !id) {
            setFormData({
                name: '',
                lastName: '',
                typeDocument: '',
                numDocument: '',
                licencia: '',
                expLicencia: '',
                email: '',
                dateOfBirth: '',
                nationality: '',
                maritalStatus: '',
                phone: '',
                address: '',
                sex: '',
                status: '',
                employeeType: {
                    typeName: ''
                }
            })
            setErrorsForms({})
        }

    }, [id, action])

    useEffect(() => {
        const fetchData = async () => {
            if (action && action === 'update' && id) {
                const arrayApiResponse = await getElementByEndpoint("/api/v1/employeefluvial/all")
                const updateFields = completeFields({ formData, id, arrayApiResponse, nameFieldId: 'id' })
                setFormData(updateFields)
            }
        }

        fetchData()
    }, [action, id])

    const handleChange = (event) => {
        const { name, value } = event.target

        if (name === "typeName") {
            setFormData(prevState => ({
                ...prevState,
                employeeType: {
                    ...prevState.employeeType,
                    typeName: sanitizedValue(value)
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: sanitizedValue(value)
            }));
        }


        const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const birthYear = name === "dateOfBirth" ? new Date(value).getFullYear() : null
        const currentYear = new Date().getFullYear()

        if (!value.trim()) {
            handleStatusError(setErrorsForms, name, "Campo obligatorio")
        } else if ((name === "numDocument" || name === "phone") && isNaN(value)) {
            handleStatusError(setErrorsForms, name, "Debe ser un número válido")
        } else if ((name === "numDocument" && (value.length < 5 || value.length > 11)) ||
            (name === "phone" && (value.length < 5 || value.length > 11))) {
            handleStatusError(setErrorsForms, name, "Debe tener entre 5 y 11 dígitos")
        } else if (name === "email" && !expresionEmail.test(value)) {
            handleStatusError(setErrorsForms, name, "No es un correo válido, recuerda usar el formato: ejemplo@gmail.com")
        } else if (name === "dateOfBirth" && (birthYear < 1700 || birthYear > 2000 || birthYear >= currentYear)) {
            handleStatusError(setErrorsForms, "dateOfBirth", "Fecha no válida. Debe estar entre 1700 y 2000.")
        } else {
            // Elimina el error si todas las validaciones son correctas
            clearError(setErrorsForms, name)
        }
    }

    useEffect(() => {
        if (Object.keys(errorsForms).length > 0) {
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
    }, [errorsForms])

    const handleSubmit = async (event) => {
        event.preventDefault()

        const validationResponse = validationFieldSubmit(setErrorsForms, formData, event)

        if (validationResponse) {
            swal({
                title: 'Error',
                text: 'Hubo un error al procesar la solicitud. Por favor, intente de nuevo.',
                icon: 'error',
                timer: 4000
            })
            return
        }

        // Confirmación de envío
        const confirmationMessage = action === 'update' ?
            `¿Está seguro que quiere actualizar al ${formData.employeeType.typeName}?\nNombre: ${formData.name} ${formData.lastName}` :
            `¿Está seguro que quiere crear al ${formData.employeeType.typeName}?\nNombre: ${formData.name} ${formData.lastName}`

        try {
            const result = await Alert.alertConfirm(
                'Confirmación',
                confirmationMessage,
                action === 'update'
                    ? 'Capitan actualizado correctamente'
                    : 'Capitan creado correctamente',
                navigate,
                "../../../adminSection/show-crew"
            )

            if (result) {
                if (action === 'update') {
                    await ApiService.put(`/api/v1/employeefluvial/update/${id}`, formData)
                } else {
                    await ApiService.post('/api/v1/employeefluvial/save', formData)
                }
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error)
            Swal({
                title: 'Error',
                text: 'Hubo un error al procesar la solicitud. Por favor, intente de nuevo.',
                icon: 'error',
                timer: 2000
            })
        }

    }

    console.log(formData)

    return {
        formData,
        handleSubmit,
        errorsForms,
        handleChange,
        isDisabled
    }
}
