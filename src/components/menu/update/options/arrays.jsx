import { useState, useEffect } from "react";
import instance from "../../../../config/AxiosApi";

// Hook para obtener la lista de departamentos desde la API
export const useOptionsDepto = () => {
    const [listDeptos, setListDeptos] = useState([]);

    // Obtiene la lista de departamentos desde la API
    const getDeptos = async () => {
        try {
            const response = await instance.get('/department/all');
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
            const response = await instance.get("/companie/findAll");
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
            const response = await instance.get('/city/all');
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

// Opciones estáticas
export const OptionsTypeDocument = [
    { label: 'C.C', value: 'Cédula' },
    { label: 'T.I', value: 'Tarjeta de identidad' },
    { label: 'C.E', value: 'Cédula extranjera' },
    { label: 'Pasaporte', value: 'Pasaporte' }
];

export const roles = [
    { label: 'Administrador', value: 'ADMIN' },
    { label: 'Super Administrador', value: 'SUPERADMIN' },
    { label: 'Empleado', value: 'INVITED' }
];

export const genero = [
    { label: 'Femenino', value: 'Femenino' },
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Otro', value: 'Otro' }
];

export const status = [
    { label: 'Activo', value: 'activo' },
    { label: 'Inactivo', value: 'inactivo' }
];

export const codigoPaises = [
    { label: '+57', value: 'colombia' },
    { label: '+52', value: 'mexico' }
];

export const maritalStatus = [
    { label: 'Soltero', value: 'soltero' },
    { label: 'Casado', value: 'casado' }, // Corregido de 'sasado' a 'casado'
    { label: 'Divorciado', value: 'divorciado' },
    { label: 'Unión libre', value: 'unión libre' }
];