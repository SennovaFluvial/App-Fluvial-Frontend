import { useNavigate } from 'react-router-dom';
import { Inputs } from '../../html components/Inputs.jsx'
import styles from '../../../assets/css/shipment/shipment.module.css'
import { useShiptment } from './controllers/ProviderContextShiptmen.jsx';
import { useEffect } from 'react';
import { Pagination } from '../history/Pagination.jsx';


export const ModuleProduct = () => {
    const navigate = useNavigate();

    // Context
    const {
        formData,
        // errorsForms,
        // setErrorsForms,
        handleChange,
        isDisabled,
        productosRemitente,
        productsToSend,
        removeProduct,
        setIsDisabled,
        paginatedItems, // paginacion
        searchTerm, // paginacion
        handleSearchChange, // paginacion
        elementForPage, // paginacion
        currentPage, // paginacion
        setCurrentPage, // paginacion
        totalFilteredItems, // paginacion
        firstIndex, // paginacion
    } = useShiptment()
    // Context

    const handleNext = () => {
        // navigate('/adminSection/register-shipment/module-vehicle');
        navigate('/adminSection/register-shipment/module-shipment');
    };

    const handleBack = () => {
        event.preventDefault();
        navigate(-1);
    };

    useEffect(() => {
        if (formData.productosIds.length <= 0) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [formData.productosIds])

    return (
        <>

            <div className={styles.tarjeta}>
                <div className={styles.contenedor}>
                    <h2 className={styles.tittle}>SELECCIONE LOS PRODUCTOS A ENVIAR</h2>
                    <div className="row">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        {formData.productosIds.length > 0 ? (
                            <div className="col-md-12">
                                <h1>Productos a enviar:</h1>
                                <div className="row row-cols-1 row-cols-md-3 mx-auto">
                                    {productsToSend.map((item, index) => (
                                        <div className="col border ps-2 py-2 my-2" key={item.id}>
                                            {index + 1} | <b>{item.productName}</b>
                                            <div className="my-3">
                                                <button onClick={() => removeProduct(item.id)} className={styles.btn_remove_personalized}>
                                                    Quitar <i className="fa-solid fa-trash-can-arrow-up"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null}

                        <hr />

                        {productosRemitente.products && productosRemitente.products.length > 0 ? (
                            // productosRemitente.products
                            paginatedItems
                                .filter(item => !productsToSend.some(product => product.id === item.id))
                                .map((item) => (
                                    <div className="col-md-4 mb-4" key={item.id}>
                                        <div className="card" style={{ width: '18rem' }}>
                                            <div className="card-body">
                                                <h5 className="card-title">{item.productName}</h5>
                                                <p className="card-text">{item.description}</p>
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item"><strong>Dimensiones:</strong> {item.dimensions}</li>
                                                    <li className="list-group-item"><strong>Cantidad:</strong> {item.number} unidades</li>
                                                </ul>
                                            </div>

                                            <div className="row justify-content-center">
                                                <div className="col-md-6">
                                                    <Inputs
                                                        type='button'
                                                        text={(<> Agregar <i className="fa-solid fa-box-open"></i></>)}
                                                        name="productosIds"
                                                        value={item.id || ''}
                                                        event={handleChange}
                                                    />

                                                </div>
                                                <div className="col-md-6">
                                                    <button className='btn btn-primary'>
                                                        <i className="fa-regular fa-pen-to-square"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <div className="col-12">
                                <h1>El remitente no tiene productos</h1>
                            </div>
                        )}
                    </div>

                    <div className="row mb-5">
                        <div className="col-md-12">
                            <Pagination
                                elementForPage={elementForPage}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalElements={totalFilteredItems}
                            />
                        </div>
                    </div>

                    <div className={styles.fila}>
                        <div className="col-md-auto">
                            <button className={styles.cancelar} onClick={handleBack}>
                                Atrás <i className="fa-regular fa-circle-left"></i>
                            </button>
                        </div>

                        <div className="col-md-auto">
                            <button onClick={handleNext} className={`${styles.siguiente + " ms-2"} ${isDisabled ? "is-disabled-button" : ""}`}>
                                Siguiente <i className="fa-regular fa-circle-right"></i>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}