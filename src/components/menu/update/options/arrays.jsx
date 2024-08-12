import { useNewContext } from "../../../../Context/Provider";
import { useState, useEffect } from "react";
import Flag from 'react-world-flags';

export const useOptionsDepto = () => {
    const { deptos } = useNewContext();
    const [listDeptos, setListDeptos] = useState([]);

    useEffect(() => {
        if (deptos) {
            setListDeptos(
                deptos.map(depto => ({
                    label: depto.departamento,
                    value: depto.departamento
                }))
            );
        }
    }, [deptos]);

    return listDeptos;
};


export const usePtionsCompaines = () => {
    const { companies } = useNewContext();
    const [listCompaines, setListCompaines] = useState([])

    useEffect(() => {
        if (companies) {
            setListCompaines(
                companies.map(company => ({
                    label: company.company,
                    value: company.company
                }))
            );
        }
    }, [companies]);

    return listCompaines;
};

export const usePtionsCities = () => {
    const { cities } = useNewContext();
    const [listCities, setListCities] = useState([])

    useEffect(() => {
        if (cities) {
            setListCities(
                cities.map(city => ({
                    label: city.ciudad,
                    value: city.ciudad
                }))
            );
        }
    }, [cities]);

    return listCities;
};


export const OptionsTypeDocument = [
    { label: 'C.C', value: 'Cedula' },
    { label: 'T.I', value: 'tarjeta de identidad' },
    { label: 'C.E', value: 'cedula extranjera' },
    { label: 'Pasaporte', value: 'Passport' }
]

export const OptionsCity = [
    { label: 'Villavicencio', value: 'Villavicencio' },
    { label: 'San Jóse del Guaviare', value: 'San Jóse del Guaviare' },
]

export const OptionsDepto = [
    { label: 'Guaviare', value: 'Guaviare' },
    { label: 'Meta', value: 'Meta' }
]

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

export const codigoPaises= [
    { label: <><Flag code="COL" style={{ width: '20px', marginRight: '8px' }} />+57 Colombia</>, value: 'colombia' },
    { label: <><Flag code="MEX" style={{ width: '20px', marginRight: '8px' }} />+52 México</>, value: 'mexico' }
];

export const maritalStatus = [
    { label: 'Soltero', value: 'soltero'},
    { label: 'Casado', value: 'sasado' },
    { label: 'Divorciado', value: 'divorciado' },
    { label: 'Unión libre', value: 'unión libre' }
];

export const nationality= [
    { label: 'Colombiano', value: 'colombiano'},
    { label: 'Ecuatoriano', value: 'ecuatoriano' },
    { label: 'Chileno', value: 'chileno' },
    { label: 'Argentino', value: 'argentino' },
    { label: 'Chileno', value: 'chileno' },
];