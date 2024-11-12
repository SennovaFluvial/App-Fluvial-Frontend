import { useState, useEffect } from "react"
// import Flag from "react-world-flags" 
import instance from "../../../../config/AxiosApi"
import { ApiService } from "../../../../class/ApiServices"


/**
 * Hook para obtener la lista de departamentos desde la API.
 *
 * Este hook realiza una solicitud a la API para obtener todos los departamentos
 * y los devuelve en un formato adecuado para su uso en componentes de selección.
 *
 * @returns {Array<{ label: string, value: string }>} - Devuelve un arreglo de objetos,
 * cada uno representando un departamento con las propiedades `label` y `value`.
 * 
 * @example
 * const departamentos = useOptionsDepto() 
 * // departamentos = [{ label: 'Departamento 1', value: 'Departamento 1' }, ...]
 */
export const useOptionsDepto = () => {
    const [listDeptos, setListDeptos] = useState([])

    // Obtiene la lista de departamentos desde la API
    const getDeptos = async () => {
        try {
            const response = await instance.get('/api/v1/department/all')
            setListDeptos(
                response.data.map(depto => ({
                    label: depto.departamento,
                    value: depto.departamento
                }))
            )
        } catch (error) {
            console.error('Error en obtener departamentos', error)
        }
    }

    useEffect(() => {
        getDeptos()
    }, [])  // Solo se ejecuta una vez al montar el componente

    return listDeptos
}

// Hook para obtener la lista de compañías desde la API
export const useOptionsCompanies = () => {
    const [listCompanies, setListCompanies] = useState([])

    const getCompanies = async () => {
        try {
            const response = await instance.get("/api/v1/companie/findAll")
            setListCompanies(
                response.data.map(company => ({
                    label: company.company,
                    value: company.company
                }))
            )
        } catch (error) {
            console.error('Error en obtener las empresas', error)
        }
    }

    useEffect(() => {
        getCompanies()
    }, [])

    return listCompanies
}

/**
 * Hook para obtener la lista de compañías desde la API.
 *
 * Este hook realiza una solicitud a la API para obtener todas las compañías
 * y las devuelve en un formato adecuado para su uso en componentes de selección.
 *
 * @returns {Array<{ label: string, value: string }>} - Devuelve un arreglo de objetos,
 * cada uno representando una compañía con las propiedades `label` y `value`.
 *
 * @example
 * const empresas = useOptionsCompanies() 
 * // empresas = [{ label: 'Compañía 1', value: 'Compañía 1' }, ...]
 */
export const useOptionsCities = () => {
    const [listCities, setListCities] = useState([])

    // Obtiene la lista de ciudades desde la API
    const getCities = async () => {
        try {
            const response = await instance.get('/api/v1/city/all')
            setListCities(
                response.data.map(city => ({
                    label: city.ciudad,
                    value: city.ciudad
                }))
            )
        } catch (error) {
            console.error('Error en obtener ciudades', error)
        }
    }

    useEffect(() => {
        getCities()
    }, [])  // Solo se ejecuta una vez al montar el componente

    return listCities
}

export const OptionsTypeDocument = [
    { label: 'Cedula', value: 'Cedula' },
    { label: 'Tarjeta de identidad', value: 'Tarjeta de identidad' },
    { label: 'Cedula de extranjeria', value: 'Tedula extranjera' },
    { label: 'Pasaporte', value: 'Passporte' },
    { label: 'Otro', value: 'Otro' }
]

/**
 * Hook para obtener los roles disponibles según el rol del usuario.
 *
 * Este hook verifica el rol del usuario almacenado en el localStorage
 * y devuelve una lista de roles disponibles, incluyendo 'Administrador',
 * 'Super Administrador' (si el usuario es SUPERADMIN) y 'Empleado'.
 *
 * @returns {Array<{ label: string, value: string }>} - Devuelve un arreglo de objetos
 * que representan los roles disponibles con las propiedades `label` y `value`.
 *
 * @example
 * const roles = useRoles() 
 * // roles = [{ label: 'Administrador', value: 'ADMIN' }, { label: 'Empleado', value: 'EMPLOYEE' }, ...]
 */
export const useRoles = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const role = user?.rol
    const [roles, setRoles] = useState([])

    useEffect(() => {

        const updatedRoles = [
            { label: 'Administrador', value: 'ADMIN' },
            ...(role === "SUPERADMIN" ? [{ label: 'Super Administrador', value: 'SUPERADMIN' }] : []),
            { label: 'Empleado', value: 'EMPLOYEE' }
        ]
        setRoles(updatedRoles)

    }, [user?.rol])

    return roles
}

export const genero = [
    { label: 'Femenino', value: 'Femenino' },
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Otro', value: 'Otro' }
]
export const status = [
    { label: 'ACTIVO', value: 'activo' },
    { label: 'INACTIVO', value: 'inactivo' }
]

// export const codigoPaises = [
//     { label: "+57", value: 'colombia' },
//     { label: "+52", value: 'mexico' }
// ] 

export const maritalStatus = [
    { label: 'Soltero', value: 'soltero' },
    { label: 'Casado', value: 'casado' },
    { label: 'Divorciado', value: 'divorciado' },
    { label: 'Unión libre', value: 'unión libre' }
]

export const nationality = [
    { label: 'Colombiano', value: 'colombiano' },
    { label: 'Ecuatoriano', value: 'ecuatoriano' },
    { label: 'Chileno', value: 'chileno' },
    { label: 'Argentino', value: 'argentino' },
    { label: 'Chileno', value: 'chileno' },
]

export const typeVehicle = [
    { label: 'Bote', value: 'Bote' },
    { label: 'Bote Motor', value: 'Bote Motor' },
    { label: 'Chalupa', value: 'Chalupa' },
    { label: 'Deslizador', value: 'Deslizador' },
    { label: 'Lancha', value: 'Lancha' },
    { label: 'Planchon', value: 'Remolcador' },
    { label: 'Remolcador', value: 'Remolcador' },
]

export const weightUnits = [
    { label: 'Kilogramos', value: 'kg' },
    { label: 'Gramos', value: 'g' },
    { label: 'Toneladas', value: 'ton' },
    { label: 'Libras', value: 'lb' },
    { label: 'Onzas', value: 'oz' },
    { label: 'Miligramos', value: 'mg' },
]

export const volumeUnits = [
    { label: 'Metros cúbicos', value: 'm3' },
    { label: 'Litros', value: 'L' },
    { label: 'Mililitros', value: 'mL' },
    { label: 'Galones', value: 'gal' },
    { label: 'Pies cúbicos', value: 'ft3' },
    { label: 'Pulgadas cúbicas', value: 'in3' },
]

export const personType = [
    { label: "Persona Natural", value: "Natural" },
    { label: "Persona Juridica", value: "Juridica" }
]

export const typeCargo = [
    { label: 'Hidrocarburos', value: 'hidrocarburos' }
]

export const Booleano = [
    { label: 'Si', value: 'true' },
    { label: 'No', value: 'false' }
]

// ESTADOS DE PAGO
export const usePaymentStatuses = [
    { label: 'PAGADO', value: 'PAGADO' },
    { label: 'PENDIENTE', value: 'PENDIENTE' },
    { label: 'RECHAZADO', value: 'RECHAZADO' },
]
// TIPOS DE PAGO
export const usePaymentTypes = [
    { label: 'EFECTIVO', value: 'EFECTIVO' },
    { label: 'TARJETA DE CREDITO', value: 'TARJETA_CREDITO' },
    { label: 'TRANSFERENCIA', value: 'TRANSFERENCIA' },
    { label: 'PAYPAL', value: 'PAYPAL' },
]
// ESTADOS DE ENTREGA
export const useDeliveryStatuses = [
    { label: 'EN PREPARACION', value: 'EN_PREPARACION' },
    { label: 'EN TRANSITO', value: 'EN_TRANSITO' },
    { label: 'ENTREGADO', value: 'ENTREGADO' },
    { label: 'DEVUELTO', value: 'DEVUELTO' },
    { label: 'CANCELADO', value: 'CANCELADO' },
]

/**
 * Hook para obtener la lista de categorías de productos desde la API.
 *
 * Este hook realiza una solicitud a la API para obtener todas las categorías
 * de productos y las formatea en un arreglo de objetos que contienen las propiedades
 * `label` y `value`. También incluye una opción adicional "Otra".
 *
 * @returns {Array<{ label: string, value: string }>} - Devuelve un arreglo de objetos
 * que representan las categorías de productos disponibles, cada uno con las propiedades
 * `label` y `value`.
 *
 * @example
 * const categories = useOptionsCategory() 
 * // categories = [
 * //   { label: 'Electrónica', value: 'Electrónica' },
 * //   { label: 'Ropa', value: 'Ropa' },
 * //   { label: 'Otra', value: 'other' }
 * // ]
 */
export const useOptionsCategory = () => {
    const [listCategories, setListCategories] = useState([])

    const getCateroiesList = async () => {
        try {
            const response = await ApiService.get('/api/v1/product-category/all')
            setListCategories(
                response
                    .map(category => ({
                        label: category.categoryName,
                        value: category.categoryName
                    }))
                    .concat({ label: 'Otra', value: 'other' })
            )


        } catch (error) {
            console.error('Error en obtener las categorias', error)
        }
    }

    useEffect(() => {
        getCateroiesList()
    }, [])

    return listCategories

}

export const optionsLocationProduct = [
    { label: 'Bodega', value: 'warehouse' },
    { label: 'Vehiculo', value: 'vehicle' }
]

/**
 * Hook para obtener la lista de bodegas desde la API.
 *
 * Este hook realiza una solicitud a la API para obtener todas las bodegas
 * disponibles y las formatea en un arreglo de objetos que contienen las propiedades
 * `label` y `value`.
 *
 * @returns {Array<{ label: string, value: string }>} - Devuelve un arreglo de objetos
 * que representan las bodegas disponibles, cada uno con las propiedades
 * `label` y `value`.
 *
 * @example
 * const warehouses = optionsWarehouse() 
 * // warehouses = [
 * //   { label: 'Bodega A', value: 'Bodega A' },
 * //   { label: 'Bodega B', value: 'Bodega B' }
 * // ]
 */
export const optionsWarehouse = () => {
    const [listWarehouse, setListWarehouse] = useState([])

    const getWarehouse = async () => {
        try {
            const response = await ApiService.get('/api/v1/warehouse/all')
            setListWarehouse(
                response.map(wareHouse => ({
                    label: wareHouse.name,
                    value: wareHouse.name
                }))
            )
        } catch (error) {
            console.error('Error en obtener las bodegas', error)
        }
    }

    useEffect(() => {
        getWarehouse()
    }, [])

    return listWarehouse
}

/**
 * Hook para obtener la lista de vehículos desde la API.
 *
 * Este hook realiza una solicitud a la API para obtener todos los vehículos
 * disponibles y los formatea en un arreglo de objetos que contienen las propiedades
 * `label` y `value`.
 *
 * @returns {Array<{ label: string, value: string }>} - Devuelve un arreglo de objetos
 * que representan los vehículos disponibles, cada uno con las propiedades
 * `label` y `value`.
 *
 * @example
 * const vehicles = optionsVehicles() 
 * // vehicles = [
 * //   { label: 'Vehículo A', value: 'Vehículo A' },
 * //   { label: 'Vehículo B', value: 'Vehículo B' }
 * // ]
 */
export const optionsVehicles = () => {
    const [listVehicles, setListVehicles] = useState([])

    const getVehicles = async () => {
        try {
            const response = await ApiService.get('/api/v1/vehicles/all')
            setListVehicles(
                response.map(vehicleElement => ({
                    label: vehicleElement.nombre,
                    value: vehicleElement.nombre
                }))
            )
        } catch (error) {
            console.error('Error en obtener los vehiculos como opciones', error)
        }
    }

    useEffect(() => {
        getVehicles()
    }, [])

    return listVehicles
}

export const useOptionsBranch = () => {
    const [listBranchs, setListBranchs] = useState([])

    const getBranchs = async () => {
        try {
            const response = await ApiService.get("/api/v1/sucursales/all")
            if (response) {
                setListBranchs(
                    response.map(branch => ({
                        label: branch.nombre,
                        value: branch.nombre,
                    }))
                )
            }
        } catch (error) {
            console.error('Error en obtener las sucursales como opciones', error)
        }
    }

    useEffect(() => {
        getBranchs()
    }, [])

    return listBranchs
}