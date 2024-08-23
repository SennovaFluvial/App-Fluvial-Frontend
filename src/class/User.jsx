import instance from "../config/AxiosApi";

export class User {
    static async sign_up(data) {
        try {
            const jsonData = JSON.stringify(data);
            console.log(jsonData)
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            await instance.post("/auth/sign-up", jsonData, config);
            console.log('Usuario registrado');

            return { success: true, message: 'Usuario registrado correctamente' };

        } catch (error) {
            console.error('Error en el registro:', error.response ? error.response.data : error.message);
            return { success: false, message: 'Error al registrar el usuario. Intenta de nuevo.' };
        }
    }
}