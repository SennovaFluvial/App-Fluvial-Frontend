
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
