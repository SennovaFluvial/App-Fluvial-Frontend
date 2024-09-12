/*
import { useEffect } from "react";
import { ApiService } from "../../../../class/ApiServices";


export const useChangeStatus = (id_user, prevStatus) => {

    const [status, setStatus] = useState(prevStatus);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        roleRequest: {
            roleListName: []
        },
        estado: '',
        companyName: '',
        name: '',
        lastName: '',
        typeDocument: '',
        numDocument: '',
        phone: '',
        address: '',
        cityName: '',
        departmentName: '',
        sex: '',
        birthDate: '',
        maritalStatus: '',
        codigoPais: ''
    });

    useEffect(() => {
        const fecthDataUser = async () => {
            try {
                const response = await ApiService.get("/api/v1/companie/users");
                if (response) {
                    const userFiltered = response.find((user) => user.id === id_user);
                    userFiltered && (
                        setFormData(
                            {
                                username: userFiltered.username,
                                roleRequest: {
                                    roleListName: []
                                },
                                estado: userFiltered.username,
                                companyName: userFiltered.username,
                                name: userFiltered.username,
                                lastName: userFiltered.username,
                                typeDocument: userFiltered.username,
                                numDocument: userFiltered.username,
                                phone: userFiltered.username,
                                address: userFiltered.username,
                                cityName: userFiltered.username,
                                departmentName: userFiltered.username,
                                sex: userFiltered.username,
                                birthDate: userFiltered.username,
                                maritalStatus: userFiltered.username,
                                codigoPais: userFiltered.username
                            }
                        )
                    )
                }

            } catch (error) {

            }
        }
    }, [])

    
    // const handleChangeStatus = (id_user, prevStatus) => {
    //     if (id_user && prevStatus) {    
    //         setFormData
    //     }
    // }
    

    return {

    }
}

*/