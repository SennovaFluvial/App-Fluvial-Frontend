import { useState, useEffect } from "react"
import { clearError, getCompanyUser, getIdForNumDocument, getProductsByDocumentNumber, handleStatusError, removeProductToSend, showProductsToSend, validationFieldSubmit } from "../../../../functions/functions"
import { useNavigate } from "react-router"
import Swal from "sweetalert"
import { ApiService } from "../../../../class/ApiServices"

export const CreateUpdateControllerShiptment = () => {

    const nav = useNavigate()
    const [isDisabled, setIsDisabled] = useState(false)
    const [productosRemitente, setProductosRemitente] = useState([]) // Estado para almacenar los productos del remitente a mostrar
    const [productsToSend, setProductsToSend] = useState([]) // Productos selecionados
    const [loading, setLoading] = useState(true); // Estado de carga


    /* Inicializacion de variables */
    const [formData, setFormData] = useState({
        remitenteCedula: "",
        destinatarioCedula: "",
        companiaNombre: "",
        vehiculoNombre: "",
        sucursalNombre: "",
        direccionEnvio: "",
        departamentoSalida: "",
        municipioSalida: "",
        departamentoLlegada: "",
        municipioLlegada: "",
        tipoPago: "",
        estadoPago: "",
        costoEnvio: "",
        descripcionEnvio: "",
        estadoEntrega: "",
        productosIds: [],
        idRemitente: "", // Propiedad de desarrollo
        idDestinatario: "" // Propiedad de desarrollo
    })
    const [errorsForms, setErrorsForms] = useState({})
    const [numeroGuia, setNumeroGuia] = useState([])

    /* HandleChange */
    const handleChange = (event) => {
        const { name, value } = event.target

        if (name === "productosIds") {

            setFormData(prevState => ({
                ...prevState,
                productosIds: [...prevState.productosIds, parseInt(value, 10)]
            }))
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }))
        }

        if (name !== 'productosIds') {
            if (!value.trim()) {
                handleStatusError(setErrorsForms, name, "Campo obligatorio")
            } else if (
                (name === 'remitenteCedula' || name === 'destinatarioCedula') &&
                (!/^\d+$/.test(value) || value.length < 5 || value.length > 11 || Number(value) < 0)
            ) {
                handleStatusError(setErrorsForms, name, "Debe ser un número entero positivo entre 5 y 11 dígitos")
            } else {
                clearError(setErrorsForms, name)
            }
        }
    }

    /* Funciones terceras */
    const removeProduct = (id) => {
        removeProductToSend(setProductsToSend, setFormData, id)
    }

    /* Efectos terceros */

    /** */
    useEffect(() => {
        const getCompany = async () => {
            await getCompanyUser('/api/v1/companie/users', 'companiaNombre', setFormData)
        }

        getCompany() // ejecucion
    }, [])

    /** */
    useEffect(() => {
        const fetchProducts = async () => {

            setLoading(true) // cargando

            const response = await getProductsByDocumentNumber(formData.remitenteCedula)
            setProductosRemitente(response)

            setLoading(false) // cargando
        }

        fetchProducts()
    }, [formData.remitenteCedula])

    /** */
    useEffect(() => {
        if (formData.productosIds.length > 0) {
            const responseOfProducts = showProductsToSend(productosRemitente.products, formData.productosIds)
            setProductsToSend(responseOfProducts)
        }
    }, [formData.productosIds])

    /** */
    useEffect(() => {
        if (Object.keys(errorsForms).length > 0) {
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
    }, [errorsForms])

    /** */
    useEffect(() => {
        const fetchRemitente = async () => {
            try {
                setLoading(true) // cargando

                const idRemitente = await getIdForNumDocument({
                    url_api: "/api/v1/customers/all",
                    nameFielDocument: 'numDocument',
                    numDocument: formData.remitenteCedula
                })

                setFormData(prev => ({ ...prev, idRemitente }))
                setLoading(false) // cargando

            } catch (error) {
                console.error("Error fetching remitente:", error)
            }
        }

        if (formData.remitenteCedula) fetchRemitente()
    }, [formData.remitenteCedula])
    /** */
    useEffect(() => {
        const fetchDestinatario = async () => {
            try {
                setLoading(true) // cargando

                const idDestinatario = await getIdForNumDocument({
                    url_api: "/api/v1/customers/all",
                    nameFielDocument: 'numDocument',
                    numDocument: formData.destinatarioCedula
                })

                setFormData(prev => ({ ...prev, idDestinatario }))
                setLoading(false) // cargando

            } catch (error) {
                console.error("Error fetching Destinatario:", error)
            }
        }

        if (formData.destinatarioCedula) fetchDestinatario()
    }, [formData.destinatarioCedula])

    /* Efecto para el isDisabled */

    /* HandleSubmit */
    const handleSubmit = async (event) => {

        event.preventDefault()

        // Realizar validaciones de campos vacios
        const validationResponse = validationFieldSubmit(setErrorsForms, formData, event)

        if (validationResponse) {
            Swal({
                title: 'Error',
                text: 'Hubo un error al procesar la solicitud. Por favor, intente de nuevo.',
                icon: 'error',
                timer: 4000
            })
            return
        }

        // Crear copia de formData principal
        let dataToSend = {
            ...formData
        }

        // Convertir costoEnvio a entero
        dataToSend.costoEnvio = parseInt(dataToSend.costoEnvio, 10)

        // Eliminar campos de desarrollo antes de enviar
        delete dataToSend.idRemitente
        delete dataToSend.idDestinatario

        const confirmationMessage = `
        ¿Está seguro de registrar el envio? 
        \n Confirme el documento de remitente ${formData.remitenteCedula} y de el documento del destinatario ${formData.destinatarioCedula}
        \n Se van a enviar ${formData.productosIds.length} productos en el vehiculo ${formData.vehiculoNombre} desde ${formData.departamentoSalida} - ${formData.municipioSalida}
        `

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
            })

            if (result) {
                // if (action === 'update') {
                //     await ApiService.put(`/api/v1/product/update/${id}`, dataToSend) 
                // } else {
                const responseApi = await ApiService.post('/api/v1/envios/save', dataToSend)
                setNumeroGuia(responseApi.numeroGuia)
                // }

                Swal({
                    title: 'Éxito',
                    // text: action === 'update'
                    //     ? 'Envio actualizado correctamente'
                    //     : 'Envio creado correctamente',
                    text: 'Envio registrado correctamente',
                    icon: 'success',
                    timer: 3000,
                    buttons: false
                })

                nav("../../adminSection/register-shipment/module-finish")
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error)
            swal({
                title: 'Error',
                text: 'Hubo un error al procesar la solicitud. Por favor, intente de nuevo.',
                icon: 'error',
                timer: 2000
            })
        }

    }
    return {
        formData,
        setFormData,
        errorsForms,
        setErrorsForms,
        handleChange,
        handleSubmit,
        isDisabled,
        productosRemitente,
        productsToSend,
        removeProduct,
        setIsDisabled,
        numeroGuia,
        loading
    }
}
