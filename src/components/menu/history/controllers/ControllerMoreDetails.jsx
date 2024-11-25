import { useEffect, useState } from "react"
import { showCustomers } from "../../../../functions/functions"
import { useGlobalContext } from "../../../../GlobalContext "

export const ControllerMoreDetails = ({ id, category, from = null }) => {
    const [peopleInfo, setPeopleInfo] = useState([])
    const [filterData, setFilterData] = useState([])
    const [loading, setLoading] = useState(true)  // Estado de carga
    const { shouldUpdateFlag, setShouldUpdateFlag } = useGlobalContext() // Variables globales

    const urlMappings = {
        employee: `../add-employed/${id}?action=update`,
        customer: `${from ? "../" : ""}../add-customer/${id}/update`,
        vehicle: `../add-vehicle/${id}/update`,
        product: `../add-product/${id}/update`,
    }

    const urlUpdateData = urlMappings[category] || ""

    useEffect(() => {
        const apiEndpoints = {
            customer: "/api/v1/customers/all",
            employee: "/api/v1/companie/users",
            crew: "/api/v1/employeefluvial/all",
            vehicle: "/api/v1/vehicles/all",
            product: "/api/v1/product/all",
        }

        const fetchCustomers = async () => {
            setLoading(true)  // Activa el estado de carga
            const urlApi = apiEndpoints[category] || ""

            try {
                if (urlApi) {
                    await showCustomers(setPeopleInfo, urlApi)
                } else {
                    console.warn("Categoría no reconocida:", category)
                }
            } finally {
                setLoading(false)  // Desactiva el estado de carga cuando termina
            }
        }

        fetchCustomers()
        setShouldUpdateFlag(false)
    }, [category, shouldUpdateFlag])  // Dependencia para cuando cambia `category` o `shouldUpdateFlag`

    useEffect(() => {
        // Solo activa el estado de carga si `peopleInfo` tiene contenido
        if (peopleInfo.length > 0) {
            setLoading(true)
            const parsedId = parseInt(id, 10)
            const data = peopleInfo.find((item) => item.id === parsedId)

            setFilterData(data ? [data] : [])
            setLoading(false)   // Finaliza el estado de carga al terminar
        }
    }, [peopleInfo, id])

    return { filterData, urlUpdateData, loading }
}
