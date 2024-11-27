import { useEffect, useState } from 'react'
import { useSearchFields } from '../../search/SearchFields'
import { ApiService } from '../../../../../class/ApiServices'
import { useDeliveryStatuses, usePaymentStatuses, usePaymentTypes } from '../../../update/options/arrays'
import swal from 'sweetalert'
export const ControllerShowShipment = () => {

    // Estados para paginacione y mostrar datos en listado
    const [shipments, setShipments] = useState([])
    const [elementForPage, setElementForPage] = useState(6)
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)
    // Estados para realizar filtrado
    const [selectFilterData, setSelectFilterData] = useState({})
    const [selectOptionsByFilter, setSelectOptionsByFilter] = useState([])
    const [valueToFilter, setValueToFilter] = useState('')

    // Estado de los modales para cambiar estado de entrega y pago
    const [showSelect, setShowSelect] = useState({
        modalPaymentStatus: false,
        modalDeliveryStatus: false
    })

    const [idSelect, setIdSelect] = useState(null)

    // Estado para almacenar las varibles a hacer el PATCH
    const [formData, setFormData] = useState({
        estadoPago: '',
        estadoEntrega: ''
    })

    const [flagUpdate, setFlagUpdate] = useState(false)

    // Opciones segun el tipo de categoria a filtrar
    const nameField = {
        tipoPago: usePaymentTypes,
        estadoPago: usePaymentStatuses,
        estadoEntrega: useDeliveryStatuses,
    }

    // Mapa de nombre de ESTADOS DE PAGO, TIPO DE PAGO Y ESTADO DE ENTREGA
    const name_fields_shipment = {
        tipoPago: {
            EFECTIVO: "Efectivo",
            TARJETA_CREDITO: "Tarjeta de Crédito",
            TRANSFERENCIA: "Transferencia",
            PAYPAL: "PayPal",
        },
        estadoPago: {
            PAGADO: "Pagado",
            PENDIENTE: "Pendiente",
            RECHAZADO: "Rechazado",
        },
        estadoEntrega: {
            EN_PREPARACION: "En Preparación",
            EN_TRANSITO: "En Tránsito",
            ENTREGADO: "Entregado",
            DEVUELTO: "Devuelto",
            CANCELADO: "Cancelado",
        },
    }

    const handleChange = (event) => {
        const { value, name } = event.target

        setSelectFilterData((prevState) => ({
            ...prevState,
            [name]: value,
        }))

        if (name === "valueToFilter") {
            setValueToFilter(value)
        }

    }

    useEffect(() => {
        const filterKey = selectFilterData.filter_data_to
        if (filterKey) {
            setSelectOptionsByFilter(nameField[filterKey] || [])
        }
    }, [selectFilterData])

    const getListShipment = async () => {
        try {
            setLoading(true)

            let url_api = "/api/v1/envios/all"

            if (valueToFilter) {

                switch (selectFilterData.filter_data_to) {
                    case "tipoPago":
                        url_api = `/api/v1/envios/tipo-pago/${valueToFilter}`
                        break
                    case "estadoPago":
                        url_api = `/api/v1/envios/estado-pago/${valueToFilter}`
                        break
                    default:
                        url_api = "/api/v1/envios/all"
                        break
                }
            }

            const response = await ApiService.get(url_api)
            setShipments(response)
        } catch (error) {
            console.error("Error fetching shipments:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getListShipment()
        setFlagUpdate(false)
    }, [valueToFilter, flagUpdate])

    const fieldSearch = [
        "numeroGuia",
        "remitenteCedula",
        "destinatarioCedula",
        "companiaNombre",
        "vehiculoNombre",
        "sucursalNombre",
        "direccionEnvio",
        "departamentoSalida",
        "municipioSalida",
        "departamentoLlegada",
        "municipioLlegada",
        "costoEnvio",
        "descripcionEnvio",
        "tipoPago",
        "estadoPago",
        "estadoEntrega"
    ]


    const { searchTerm, handleSearchChange, filteredItems } = useSearchFields(
        shipments,
        fieldSearch
    )

    const totalFilteredItems = filteredItems.length
    const totalPages = Math.ceil(totalFilteredItems / elementForPage)

    useEffect(() => {
        if (totalFilteredItems === 0) {
            setCurrentPage(1)
        } else if (currentPage > totalPages) {
            setCurrentPage(totalPages)
        }
    }, [filteredItems, totalPages, currentPage, totalFilteredItems])

    const lastIndex = currentPage * elementForPage
    const firstIndex = lastIndex - elementForPage
    const paginatedItems = filteredItems.slice(firstIndex, lastIndex)

    // CAMBIAR ESTADO DE PAGO Y ENTREGA
    // Abrir modales
    const changePaymentStatus = (id) => {
        setShowSelect(
            prevState => ({
                ...prevState,
                modalPaymentStatus: true,
                modalDeliveryStatus: false
            }))
        setIdSelect(id)

    }
    const changeArrivalStatus = (id) => {
        setShowSelect(
            prevState => ({
                ...prevState,
                modalDeliveryStatus: true,
                modalPaymentStatus: false
            }))

        setIdSelect(id)
    }

    // Funciones
    // Cambiar a nuevo estado
    const handleSubmit = async (data) => {
        try {
            setLoading(true)
            const response = await ApiService.patch(`/api/v1/envios/${idSelect}/estado-pago`, data)
            if (response) {
                swal({
                    title: '¡Éxito!',
                    text: 'Se actualizó correctamente.',
                    icon: 'success',
                    button: 'Aceptar',
                })

                setShowSelect(prevState => ({
                    ...prevState, modalDeliveryStatus: '', modalPaymentStatus: ''
                }))
                setIdSelect(null)
                setFlagUpdate(true)

            }
        } catch (error) {
            console.error("No se puedo actualizar el estado de pago o de entrega", error)
        } finally {
            setLoading(false)
        }
    }

    // Definir valor a enviar
    const handeChange = (event) => {
        const { name, value } = event.target
        setFormData(prevState => ({
            ...prevState, [name]: value
        }))
    }

    // Efecto de cambio
    useEffect(() => {
        if (formData) {
            if (formData.estadoPago) {
                const copyFormData = { ...formData }
                delete copyFormData.estadoEntrega

                handleSubmit(copyFormData)

            } else if (formData.estadoEntrega) {
                const copyFormData = { ...formData }
                delete copyFormData.estadoPago

                handleSubmit(copyFormData)

            }
        }
    }, [formData.estadoPago, formData.estadoEntrega])


    return {
        searchTerm,
        handleSearchChange,
        paginatedItems,
        elementForPage,
        currentPage,
        setCurrentPage,
        totalFilteredItems,
        loading,
        firstIndex,
        handleChange,
        selectFilterData,
        selectOptionsByFilter,
        valueToFilter,
        changePaymentStatus,
        changeArrivalStatus,
        showSelect,
        formData,
        handeChange,
        setShowSelect,
        name_fields_shipment
    }
}
