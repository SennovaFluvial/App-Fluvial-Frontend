import { ApiService } from "../class/ApiServices";

export const handleStatusError = (setErrorsForms, nameE, messegue) => {
    setErrorsForms(
        prev => ({
            ...prev, [nameE]: messegue
        })
    )
}

export const showCustomers = async (setCustomerInfo) => {
    try {
        const response = await ApiService.get("/api/v1/customers/all");
        if (response) {
            setCustomerInfo(response); 
        }
    } catch (error) {
        console.error("Ocurrió un error al intentar mostrar los datos", error);
    }
};
