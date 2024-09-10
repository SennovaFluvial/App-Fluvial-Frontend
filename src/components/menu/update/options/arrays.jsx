import { useState, useEffect } from "react";
// import Flag from "react-world-flags";
import instance from "../../../../config/AxiosApi";


// Hook para obtener la lista de departamentos desde la API
export const useOptionsDepto = () => {
    const [listDeptos, setListDeptos] = useState([]);

    // Obtiene la lista de departamentos desde la API
    const getDeptos = async () => {
        try {
            const response = await instance.get('/api/v1/department/all');
            setListDeptos(
                response.data.map(depto => ({
                    label: depto.departamento,
                    value: depto.departamento
                }))
            );
        } catch (error) {
            console.error('Error en obtener departamentos', error);
        }
    };

    useEffect(() => {
        getDeptos();
    }, []); // Solo se ejecuta una vez al montar el componente

    return listDeptos;
};

// Hook para obtener la lista de compañías desde la API
export const useOptionsCompanies = () => {
    const [listCompanies, setListCompanies] = useState([]);

    const getCompanies = async () => {
        try {
            const response = await instance.get("/api/v1/companie/findAll");
            setListCompanies(
                response.data.map(company => ({
                    label: company.company,
                    value: company.company
                }))
            );
        } catch (error) {
            console.error('Error en obtener las empresas', error);
        }
    }

    useEffect(() => {
        getCompanies();
    }, []);

    return listCompanies;
};

// Hook para obtener la lista de ciudades desde la API
export const useOptionsCities = () => {
    const [listCities, setListCities] = useState([]);

    // Obtiene la lista de ciudades desde la API
    const getCities = async () => {
        try {
            const response = await instance.get('/api/v1/city/all');
            setListCities(
                response.data.map(city => ({
                    label: city.ciudad,
                    value: city.ciudad
                }))
            );
        } catch (error) {
            console.error('Error en obtener ciudades', error);
        }
    };

    useEffect(() => {
        getCities();
    }, []); // Solo se ejecuta una vez al montar el componente

    return listCities;
};

export const OptionsTypeDocument = [
    { label: 'C.C', value: 'Cedula' },
    { label: 'T.I', value: 'tarjeta de identidad' },
    { label: 'C.E', value: 'cedula extranjera' },
    { label: 'Pasaporte', value: 'Passport' }
]

export const useRoles = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const role = user?.rol;
    const [roles, setRoles] = useState([])

    useEffect(() => {


        const updatedRoles = [
            { label: 'Administrador', value: 'ADMIN' },
            ...(role === "SUPERADMIN" ? [{ label: 'Super Administrador', value: 'SUPERADMIN' }] : []),
            { label: 'Empleado', value: 'EMPLOYEE' }
        ];
        setRoles(updatedRoles);

    }, [user?.rol])

    return roles;
};

export const genero = [
    { label: 'Femenino', value: 'Femenino' },
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Otro', value: 'Otro' }
];
export const status = [
    { label: 'Activo', value: 'activo' },
    { label: 'Inactivo', value: 'inactivo' }
];

// export const codigoPaises= [
//     { label: <><Flag code="COL" />+57 Colombia </> , value: 'colombia' },
//     { label: <><Flag code="MEX" />+52 México</>, value: 'mexico' }
// ];
export const codigoPaises = [
    { label: "+57", value: 'colombia' },
    { label: "+52", value: 'mexico' }
];

export const maritalStatus = [
    { label: 'Soltero', value: 'soltero' },
    { label: 'Casado', value: 'sasado' },
    { label: 'Divorciado', value: 'divorciado' },
    { label: 'Unión libre', value: 'unión libre' }
];

export const nationality = [
    { label: 'Colombiano', value: 'colombiano' },
    { label: 'Ecuatoriano', value: 'ecuatoriano' },
    { label: 'Chileno', value: 'chileno' },
    { label: 'Argentino', value: 'argentino' },
    { label: 'Chileno', value: 'chileno' },
];

export const typeVehicle = [
    { label: 'Lancha', value: 'lancha' },
];

export const weightUnits = [
    { label: 'Kilogramos', value: 'kg' },
    { label: 'Gramos', value: 'g' },
    { label: 'Toneladas', value: 'ton' },
    { label: 'Libras', value: 'lb' },
    { label: 'Onzas', value: 'oz' },
    { label: 'Miligramos', value: 'mg' },
];

export const volumeUnits = [
    { label: 'Metros cúbicos', value: 'm3' },
    { label: 'Litros', value: 'L' },
    { label: 'Mililitros', value: 'mL' },
    { label: 'Galones', value: 'gal' },
    { label: 'Pies cúbicos', value: 'ft3' },
    { label: 'Pulgadas cúbicas', value: 'in3' },
];