import { useState } from "react";
import { ApiService } from "../../../../class/ApiServices";
import swal from "sweetalert";

export const VerifyUserChangePassword = () => {
    const userlocal = JSON.parse(localStorage.getItem("user"));
    const userName = userlocal?.username;

    const [updatePassword, setUpdatePassword] = useState(false);
    const [formLogin, setFormLogin] = useState({
        username: userName,
        password: "",
    });

    const [errorsFormsVerify, setErrorsFormsVerify] = useState({});
    const [firstEmptyField, setFirstEmptyField] = useState("");

    const handleChangeVerify = (event) => {
        const { name, value } = event.target;
        setFormLogin((prevFormLogin) => ({
            ...prevFormLogin,
            [name]: value,
        }));


        if (value.trim()) {
            setErrorsFormsVerify((prevErrors) => {
                const { [name]: removedError, ...rest } = prevErrors;
                return rest;
            });
        } else {
            setErrorsFormsVerify((prevErrors) => ({
                ...prevErrors,
                [name]: "Campo obligatorio",
            }));
        }
    };


    const handleSubmitVerify = async () => {
        const newErrors = {};
        setFirstEmptyField("");


        if (!formLogin.password.trim()) {
            newErrors.password = "Campo obligatorio";
            if (!firstEmptyField) setFirstEmptyField("Contraseña");
        }


        if (Object.keys(newErrors).length > 0) {
            setErrorsFormsVerify(newErrors);
            swal({
                title: "Error",
                text: `Por favor, complete el campo obligatorio: ${firstEmptyField}`,
                icon: "error",
                timer: 3000,
            });
            return;
        }

        try {

            const response = await ApiService.post("/auth/log-in", formLogin);
            console.log("API Response:", response);


            if (response.status === 200 && response.data.status === true) {
                setUpdatePassword(true);
                swal({
                    title: "Éxito",
                    text: "Contraseña validada correctamente.",
                    icon: "success",
                    timer: 3000,
                });
            } else {

                throw new Error(response.data.message || "Error inesperado");
            }
        } catch (error) {
            console.error("Error caught:", error);

            if (error.response?.status === 401 || error.message.includes("Invalid password")) {
                setUpdatePassword(false);
                swal({
                    title: "Error",
                    text: error.response?.data?.message || "Credenciales incorrectas. Inténtelo nuevamente.",
                    icon: "error",
                    timer: 3000,
                });
            } else {

                swal({
                    title: "Error",
                    text: error.message || "Ocurrió un error inesperado. Inténtelo nuevamente.",
                    icon: "error",
                    timer: 3000,
                });
            }
        }
    };

    return {
        updatePassword,
        handleChangeVerify,
        errorsFormsVerify,
        handleSubmitVerify,
        userName,
        formLogin
    };
};
