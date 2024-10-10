import { ApiService } from "../class/ApiServices";

export const handleStatusError = (setErrorsForms, nameE, messegue) => {
    setErrorsForms(
        prev => ({
            ...prev, [nameE]: messegue
        })
    )
}

export const showCustomers = async (setPeopleInfo, urlApi) => {
    try {
        const response = await ApiService.get(urlApi);
        if (response) {
            setPeopleInfo(response);
        }
    } catch (error) {
        console.error("Ocurrió un error al intentar mostrar los datos", error);
    }
};
