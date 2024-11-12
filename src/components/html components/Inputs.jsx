import { useState } from 'react';  // Importa React y el hook useState para gestionar el estado en el componente.
import '../../assets/css/input.css'  // Importa el archivo de estilos CSS para el componente.

/**
 * Componente de Input que genera un campo de texto, contraseña u otro tipo según el tipo especificado.
 * 
 * Este componente maneja diferentes tipos de inputs, incluyendo la posibilidad de mostrar/ocultar una contraseña,
 * además de manejar eventos como el cambio de valor y la prevención de ciertos eventos en inputs específicos.
 *
 * @param {string} type - Tipo del input (por ejemplo, "text", "password", "email", "button", etc.).
 * @param {string} text - Texto que se muestra en la etiqueta asociada al input.
 * @param {string} name - Nombre del input (atributo name en el HTML).
 * @param {function} event - Función que se ejecuta cuando el valor del input cambia.
 * @param {string} placeholder - Texto de ejemplo dentro del input.
 * @param {string} icon - Clase de ícono que se muestra en el lado izquierdo del input.
 * @param {string} value - Valor actual del input.
 * @param {boolean} isReadOnly - Determina si el input es solo lectura (true o false).
 * 
 * @returns {JSX.Element} Un elemento que representa un input o botón, dependiendo del tipo.
 * 
 * @example
 * <Inputs
 *   type="password"
 *   text="Contraseña"
 *   name="password"
 *   event={handlePasswordChange}
 *   placeholder="Introduce tu contraseña"
 *   icon="fa fa-lock"
 *   value={password}
 *   isReadOnly={false}
 * />
 */
export const Inputs = ({ type, text, name, event, placeholder, icon, value, isReadOnly }) => {
    // Define el estado 'showPassword' que determina si se debe mostrar o no la contraseña
    const [showPassword, setShowPassword] = useState(false);

    // Función para alternar la visibilidad de la contraseña
    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState); // Cambia el estado de showPassword entre true y false
    };

    return (
        <div className="form-group"> {/* Contenedor principal del input */}
            {type !== 'button' ? <label htmlFor={name}>{text}<span className="text-danger">*</span> </label> : ''}
            <div className="input-group">
                {/* Si hay un icono, lo muestra en el lado izquierdo del input */}
                {icon && (
                    <span className="input-group-text" id="basic-addon1">
                        <i className={icon}></i> {/* Muestra el icono pasado como parámetro */}
                    </span>
                )}

                {/* Condición para manejar diferentes tipos de input */}
                {type === 'button' ? (
                    <button
                        name={name}
                        id={name} // Asigna el id igual al name
                        type="button" // Especifica que es un botón
                        className="btn btn-success btn-personalized" // Aplica estilo al botón
                        onClick={event} // Evento que se dispara al hacer clic en el botón
                        value={value} // Valor actual del botón
                    >
                        {text} {/* El texto que aparece en el botón */}
                    </button>
                ) : (
                    <input
                        id={name} // Asigna el id igual al name
                        type={type === 'password' && showPassword ? 'text' : type} // Muestra la contraseña como texto si showPassword es true, de lo contrario mantiene el tipo original
                        className="form-control" // Clase CSS del input
                        name={name} // Nombre del input
                        placeholder={placeholder} // Texto de ejemplo dentro del input
                        onChange={event} // Evento que se dispara al cambiar el valor del input
                        value={value} // Valor actual del input
                        onCopy={name === 'confirmPassword' || name === 'confirmUsername' ? (event) => event.preventDefault() : undefined}
                        onPaste={name === 'confirmPassword' || name === 'confirmUsername' ? (event) => event.preventDefault() : undefined}
                        onCut={name === 'confirmPassword' || name === 'confirmUsername' ? (event) => event.preventDefault() : undefined}
                        readOnly={isReadOnly} // Solo asigna el valor booleano directamente
                    />
                )}

                {/* Si el input es de tipo 'password', muestra el icono para alternar visibilidad */}
                {type === 'password' && (
                        <span onClick={togglePasswordVisibility} className="input-group-text toggle-password"> {/* Icono para alternar la visibilidad de la contraseña */}
                            <i className={showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'}></i>  {/* Cambia el icono según el estado de showPassword */}
                        </span>
                )}
            </div>
        </div>
    );
};
