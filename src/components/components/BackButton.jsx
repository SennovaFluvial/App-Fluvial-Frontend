import { useNavigate } from 'react-router';
import styles from '../../assets/css/Forms.module.css';
import { handleCancel } from '../../functions/functions';

/**
 * Componente reutilizable para un botón de cancelación.
 *
 * Este componente redirige al usuario a una página específica cuando se hace clic en el botón.
 * La redirección se basa en el origen de la acción y las URL proporcionadas.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.from - Indica de dónde se originó la acción. 
 * @param {string} props.urlPageList - La URL a la que redirigir si `from` coincide con `namePageList`.
 * @returns {JSX.Element} - Un botón que, al hacer clic, redirige según la lógica de cancelación.
 *
 * @example
 * <CancelButton
 *      from="menu" 
 *      urlPageList="/home" 
 * />
 */
export const CancelButton = ({ from, urlPageList }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        handleCancel({ from, urlPageList, navigate });
    };

    return (
        <button type="button" className={styles.cancelar} onClick={handleClick}>
            Atrás
        </button>
    );
}
