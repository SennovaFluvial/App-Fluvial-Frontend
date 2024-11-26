import { useEffect, useState } from 'react'
import { useSearchFields } from '../../search/SearchFields'
import { ApiService } from '../../../../../class/ApiServices'
import { useDeliveryStatuses, usePaymentStatuses, usePaymentTypes } from '../../../update/options/arrays'

export const ControllerShowShipment = () => {

    const [shipments, setShipments] = useState([])
    const [elementForPage, setElementForPage] = useState(6)
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)

    const [selectFilterData, setSelectFilterData] = useState({})
    const [selectOptionsByFilter, setSelectOptionsByFilter] = useState([])
    const [valueToFilter, setValueToFilter] = useState("")

    const nameField = {
        tipoPago: usePaymentTypes,
        estadoPago: usePaymentStatuses,
        estadoEntrega: useDeliveryStatuses,
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
    }, [valueToFilter])

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
        valueToFilter
    }
}
