import "../../../assets/css/components/pagination.css";

/**
 * Componente de paginación para manejar la navegación entre páginas de resultados.
 *
 * Este componente genera una interfaz de usuario para la paginación de una lista de elementos,
 * permitiendo al usuario navegar entre las diferentes páginas de resultados. Incluye botones 
 * para ir a la página anterior, siguiente y seleccionar una página específica.
 *
 * Props:
 * @param {number} elementForPage - Número de elementos por página.
 * @param {number} currentPage - Página actual seleccionada.
 * @param {function} setCurrentPage - Función para actualizar la página actual.
 * @param {number} totalElements - Total de elementos disponibles para paginar.
 *
 * Uso:
 * ```jsx
 * <Pagination
 *     elementForPage={6}
 *     currentPage={currentPage}
 *     setCurrentPage={setCurrentPage}
 *     totalElements={totalItems}
 * />
 * ```
 *
 * @returns {JSX.Element} Componente de paginación.
 */
export const Pagination = ({ elementForPage, currentPage, setCurrentPage, totalElements }) => {

    const pageNumbers = [];


    for (let i = 1; i <= Math.ceil(totalElements / elementForPage); i++) {
        pageNumbers.push(i);
    }

    const onPreviuesPage = () => {
        setCurrentPage(currentPage - 1);
    }
    const onNextPage = () => {
        setCurrentPage(currentPage + 1);
    }
    const onSpecificPage = (newPage) => {
        setCurrentPage(newPage);
    }


    return (
        <>
            <nav className="pagination is-rounded" role="navigation" aria-label="pagination">
                <button
                    onClick={onPreviuesPage}
                    className={`pagination-previous ${currentPage === 1 ? "is-disabled" : ""}`}
                >
                    <i className="fa-solid fa-hand-point-left"></i> Anterior
                </button>

                <ul className="pagination-list">
                    {pageNumbers.map(noPage => (
                        <li key={noPage}>
                            <button
                                onClick={() => onSpecificPage(noPage)}
                                className={`pagination-link ${currentPage === noPage ? "is-current" : ""}`}
                            >
                                {noPage}
                            </button>
                        </li>
                    ))}
                </ul>

                <button
                    onClick={onNextPage}
                    className={`pagination-next ${currentPage >= pageNumbers.length ? "is-disabled" : ""}`}
                >
                    Siguiente <i className="fa-solid fa-hand-point-right"></i>
                </button>
            </nav>
        </>
    )
}
