import { useEffect, useState } from "react";
import { ApiService } from "../../../../class/ApiServices";
import { Alert } from "../../../../class/alerts";
import swal from "sweetalert";
import { useNavigate } from "react-router";
export const ControllerCreateUpdateCompany = ({ id, action }) => {
    const navigate = useNavigate();
    const [errorsForms, setErrorsForms] = useState({});
    const [listCompanies, setListCompanies] = useState([])
    const [formData, setFormData] = useState({
        nit: 0, company: '', status: '', manager: '',
        email: '', phone: '', address: '', department: '',
        municipality: ''
    });

    useEffect(() => {
        if (!action && !id) {
            setFormData({
                nit: 0, company: '', status: '', manager: '',
                email: '', phone: '', address: '', department: '',
                municipality: ''
            })
        }
        setErrorsForms({});
    }, [action, id])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await ApiService.get("/api/v1/companie/findAll");
                setListCompanies(response);
            } catch (error) {
                console.error("Ocurrio un error al obtener los datos de esta api ", error);
            }
        }

        fetchUsers();
    }, [])

    useEffect(() => {
        if (action && action === "update" && id && listCompanies.length > 0) {

            const filterCompanyByID = listCompanies.find((companySelected) => companySelected.id === parseInt(id, 10))

            if (filterCompanyByID) {
                setFormData({
                    nit: filterCompanyByID.nit, company: filterCompanyByID.company, status: filterCompanyByID.status, manager: filterCompanyByID.manager,
                    email: filterCompanyByID.email, phone: filterCompanyByID.phone, address: filterCompanyByID.address, department: filterCompanyByID.department,
                    municipality: filterCompanyByID.municipality
                })
            } else {
                console.error(`No se encontró un usuario con ID: ${id}`);
            }

        }
    }, [action, id, listCompanies])


    const handleChange = (event) => {
        const { name, value } = event.target;

        if (value.trim()) {
            const { [name]: removed, ...rest } = errorsForms;
            setErrorsForms(rest);
        } else {
            setErrorsForms({ ...errorsForms, [name]: "Campo obligatorio" });
        }

        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newErrors = {};
        let firstEmptyField = null;

        for (let [name, value] of Object.entries(formData)) {
            if (!value.trim()) {
                newErrors[name] = "Campo obligatorio";
            }
        }

        setErrorsForms({ ...errorsForms, ...newErrors });

        // Verificar si hay errores y mostrar alerta
        if (Object.keys(newErrors).length > 0) {
            swal({
                title: 'Error',
                text: `Por favor, complete el campo obligatorio: ${firstEmptyField}`,
                icon: 'error',
                timer: 3000
            });

            return;
        }

        // Convertir el NIT a un número antes de enviar los datos
        const formattedData = {
            ...formData,
            nit: Number(formData.nit), // Convertir a número
        };

        // Confirmación de envío
        const confirmationMessage = action === 'update' ?
            `¿Está seguro que quiere actualizar la empresa?\nNombre: ${formData.nit} ${formData.company}` :
            `¿Está seguro que quiere crear la empresa? \nNombre: ${formData.nit} ${formData.company}`;
        try {
            const result = await Alert.alertConfirm(
                'Confirmación',
                confirmationMessage,
                action === 'update'
                    ? 'Empresa actualizada correctamente'
                    : 'Empresa creada correctamente',
                navigate,
                "/adminSection/show-companies"
            );

            if (result) {
                if (action === 'update') {
                    await ApiService.put(`/api/v1/companie/update/${id}`, formattedData);
                } else {
                    await ApiService.post('/api/v1/companie/save', formattedData);
                }
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
            swal({
                title: 'Error',
                text: 'Hubo un error al procesar la solicitud. Por favor, intente de nuevo.',
                icon: 'error',
                timer: 2000
            });
        }
    }

    return {
        errorsForms,
        formData,
        handleChange,
        handleSubmit
    }
}
