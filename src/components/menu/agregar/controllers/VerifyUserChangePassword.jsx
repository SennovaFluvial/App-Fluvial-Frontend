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
            return false;
        }

        try {
            const response = await ApiService.post("/auth/log-in", formLogin);

            if (response.status === 200 && response.data.status === true) {
                setUpdatePassword(true);

                setFormLogin((prevFormLogin) => ({
                    ...prevFormLogin,
                    password: "",
                }));

                swal({
                    title: "Éxito",
                    text: "Contraseña validada correctamente.",
                    icon: "success",
                    timer: 3000,
                });
                return true;
            } else {

                setFormLogin((prevFormLogin) => ({
                    ...prevFormLogin,
                    password: "",
                }));
                
                throw new Error(response.data.message || "Error inesperado");
            }
        } catch (error) {

            setFormLogin((prevFormLogin) => ({
                ...prevFormLogin,
                password: "",
            }));
            return false;
        }
    };

    return {
        updatePassword,
        handleChangeVerify,
        errorsFormsVerify,
        handleSubmitVerify,
        formLogin,
        userName,
        setUpdatePassword
    };
};
