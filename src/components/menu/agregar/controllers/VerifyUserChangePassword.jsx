import { useState } from "react";
import { ApiService } from "../../../../class/ApiServices";
import swal from "sweetalert";

/**
 * Controlador para la verificación del cambio de contraseña de un usuario.
 *
 * Este hook gestiona el estado del formulario de verificación de contraseña, 
 * la validación de los campos y la interacción con la API para autenticar al usuario. 
 * Permite manejar cambios en el formulario, validar el campo de contraseña 
 * y enviar la solicitud de verificación.
 *
 * @returns {Object} Un objeto que contiene:
 * - updatePassword: Booleano que indica si se ha validado correctamente la contraseña.
 * - handleChangeVerify: Función para manejar los cambios en los campos del formulario.
 * - errorsFormsVerify: Errores de validación del formulario de verificación.
 * - handleSubmitVerify: Función para manejar el envío del formulario de verificación.
 * - formLogin: Datos del formulario de verificación.
 * - userName: Nombre de usuario del usuario en sesión.
 * - setUpdatePassword: Función para actualizar el estado de `updatePassword`.
 */
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
            // Restablece el campo de contraseña en el formulario
            setFormLogin((prevFormLogin) => ({
                ...prevFormLogin,
                password: "",
            }));

            // Manejo de errores específicos
            if (error.response) {
                const { status, data } = error.response;

                // Caso 1: Usuario no encontrado
                if (status === 200 && data.message === 'User not found') {
                    const errorMessage = 'Usuario no encontrado';
                    swal({
                        title: "Error",
                        text: errorMessage,
                        icon: "error",
                        timer: 3000,
                    });
                    return false;
                }

                // Caso 2: Contraseña incorrecta (código 401)
                if (status === 401) {
                    const errorMessage = 'Contraseña Incorrecta';
                    swal({
                        title: "Error",
                        text: errorMessage,
                        icon: "error",
                        timer: 3000,
                    });
                    return false;
                }
            }

            // Mensaje de error genérico
            const errorMessage = error.response?.data?.message || 'No fue posible el Login. Por favor, intenta nuevamente.';
            swal({
                title: "Error",
                text: errorMessage,
                icon: "error",
                timer: 3000,
            });

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
