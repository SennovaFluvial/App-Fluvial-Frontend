import { useState, useEffect } from "react"
import { clearError, getCompanyUser, getIdForNumDocument, getProductsByDocumentNumber, handleStatusError, removeProductToSend, sanitizedValue, showProductsToSend, validationFieldSubmit } from "../../../../functions/functions"
import { useNavigate } from "react-router"
import Swal from "sweetalert"
import { ApiService } from "../../../../class/ApiServices"
import { useSearchFields } from "../../history/search/SearchFields"
import { useGlobalContext } from "../../../../GlobalContext "

export const CreateUpdateControllerShiptment = () => {

    const nav = useNavigate()
    const [isDisabled, setIsDisabled] = useState(false)
    const [productosRemitente, setProductosRemitente] = useState([]) // Estado para almacenar los productos del remitente a mostrar
    const [productsToSend, setProductsToSend] = useState([]) // Productos selecionados
    const [loading, setLoading] = useState(true) // Estado de carga
    const { shouldUpdateFlag, setShouldUpdateFlag } = useGlobalContext() // Variables globales

    // paginacion
    const [elementForPage, setElementForPage] = useState(6)
    const [currentPage, setCurrentPage] = useState(1)

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
        if (name === undefined || value === undefined) {
            console.error(`Error: uno o más valores son undefined. Detalles: 
                    Name: ${name}, 
                    Value: ${value}`
            )
            alert(`Error: 
                    Name es ${name === undefined ? 'undefined' : name}, 
                    Value es ${value === undefined ? 'undefined' : value}`)
            return // Detenemos la ejecución si hay un error
        }

        if (name === "productosIds") {
            setFormData(prevState => ({
                ...prevState,
                productosIds: [...prevState.productosIds, parseInt(value, 10)]
            }))
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: (name === 'tipoPago' || name === 'estadoPago' || name === 'estadoEntrega')
                    ? value
                    : sanitizedValue(value)
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
            } else if (
                name === 'costoEnvio' &&
                (isNaN(value) || value.trim() === "" || Number(value) <= 0)
            ) {
                handleStatusError(
                    setErrorsForms,
                    name,
                    "Debe ser un número positivo válido"
                )
            } else {
                clearError(setErrorsForms, name)
            }
        }

    }

    /* Funciones terceras */
    const removeProduct = (id) => {
        removeProductToSend(setProductsToSend, setFormData, id)
    }

    // Funcion para la paginacion

    const { searchTerm, handleSearchChange, filteredItems } = useSearchFields(
        productosRemitente.products,
        [
            "productName",
            "description",
            "number",
            "weight",
            "unitOfMeasurement",
            "height",
            "length",
            "width",
            "dimensions",
            "packagingType",
            "specialHandlingInstructions"
        ]
    )

    const totalFilteredItems = filteredItems.length
    const totalPages = Math.ceil(totalFilteredItems / elementForPage)

    useEffect(() => {
        if (totalFilteredItems === 0) {
            setCurrentPage(1)
        } else if (currentPage > totalPages) {
            setCurrentPage(totalPages)
        }
    }, [filteredItems, totalPages, currentPage, totalFilteredItems, shouldUpdateFlag])

    const lastIndex = currentPage * elementForPage
    const firstIndex = lastIndex - elementForPage
    const paginatedItems = filteredItems.slice(firstIndex, lastIndex)


    /* Efectos terceros */

    /** */
    useEffect(() => {
        const getCompany = async () => {
            await getCompanyUser('/api/v1/companie/users', 'companiaNombre', setFormData)
        }

        getCompany()
    }, [])

    /** */
    useEffect(() => {
        const fetchProducts = async () => {
            if (!formData.remitenteCedula) return; // Valida que haya un valor válido

            try {
                setLoading(true); // Activa el estado de carga
                const response = await getProductsByDocumentNumber(formData.remitenteCedula);

                setProductosRemitente(response);

                setShouldUpdateFlag(false)

            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts()

    }, [formData.remitenteCedula, shouldUpdateFlag])

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
                const responseApi = await ApiService.post('/api/v1/envios/crear-con-costo', dataToSend)
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
        loading,
        paginatedItems, // paginacion
        searchTerm, // paginacion
        handleSearchChange, // paginacion
        elementForPage, // paginacion
        currentPage, // paginacion
        setCurrentPage, // paginacion
        totalFilteredItems, // paginacion
        firstIndex, // paginacion
    }
}
