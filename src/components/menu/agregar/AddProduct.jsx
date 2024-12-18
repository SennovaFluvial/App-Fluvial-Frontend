import { Select } from '../../html components/Selects.jsx';
import { Inputs } from '../../html components/Inputs.jsx';
import styles from '../../../assets/css/Forms.module.css'
import { weightUnits, Booleano, optionsLocationProduct, optionsWarehouse, optionsVehicles, useOptionsCategory } from '../update/options/arrays.jsx';
import { ControllerCreateUpdateProduct } from './controllers/inventories/ControllerCreateUpdateProduct.jsx';
import { TextArea } from '../../html components/TextArea.jsx';

import { useLocation, useParams } from 'react-router';
import { DocumentSuggestions } from '../../components/DocumentSuggestions.jsx';
import { CancelButton } from '../../components/CancelButton.jsx';

export const AddProduct = ({ funcChangeState = null, dataOfUser = null }) => {
    // Si `dataOfUser` existe, usa sus valores, si no, usa `useParams()`
    const { id: paramId, action: paramAction } = useParams();  // Toma los valores de los parámetros de la URL
    const { id, action } = dataOfUser || { id: paramId, action: paramAction };  // Desestructurando de `dataOfUser` o usando los valores de `useParams()`

    /* ELEMENTOS DE OPCIONES */
    const useOptionsLocationProduct = optionsLocationProduct;
    const useOptionsWarehouse = optionsWarehouse();
    const useOptionsVehicles = optionsVehicles();
    const useCategoriesOptions = useOptionsCategory();
    /* --------------------- */

    const {
        handleChange,
        formData, errorsForms,
        handleSubmit, setFormData,
        isDisabled, setErrorsForms
    } = ControllerCreateUpdateProduct({ id, action, funcChangeState }); // Componente de logica integrada en `AddProduct()`

    const location = useLocation();
    const from = location.state?.from || 'menu';

    const handleCloseModal = () => {
        funcChangeState(false)
    }

    return (
        <>
            <div className={styles.card}>
                <div className={styles.container}>
                    <h2 className={styles.title}>    PRODUCTO</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className={styles.h3}>
                                <h3><b>INFORMACIÓN DEL PRODUCTO</b></h3>
                            </div>
                            <div className="col-md-4 ">
                                <Inputs
                                    text="Nombre del Producto"
                                    name="productName"
                                    value={formData.productName}
                                    event={handleChange}
                                />
                                {errorsForms.productName && <div className="text-danger">{errorsForms.productName}</div>}
                            </div>

                            <div className="col-md-4 ">
                                <Select
                                    text="Categoría"
                                    name="categoryName"
                                    value={formData.categoryName}
                                    event={handleChange}
                                    options={useCategoriesOptions}
                                />
                                {errorsForms.categoryName && <div className="text-danger">{errorsForms.categoryName}</div>}
                            </div>

                            <div className="col-md-4 ">
                                <Inputs
                                    text="Número Documento del responsable (Cliente)"
                                    name="customerNumDocument"
                                    value={formData.customerNumDocument}
                                    event={handleChange}
                                />
                                {errorsForms.customerNumDocument && <div className="text-danger">{errorsForms.customerNumDocument}</div>}
                                {
                                    formData.customerNumDocument && (
                                        <>
                                            <DocumentSuggestions
                                                nameField={'customerNumDocument'}
                                                numDocumentToSearch={formData.customerNumDocument}
                                                setFormData={setFormData}
                                                setErrorsForms={setErrorsForms}
                                            />
                                        </>
                                    )
                                }
                            </div>

                            <div className="col-md-12">
                                <TextArea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={1}
                                    placeholder="Escribe una descripción del producto"
                                />
                                {errorsForms.description && <div className="text-danger">{errorsForms.description}</div>}
                            </div>
                            <div className="col-md-2">
                                <Inputs
                                    text="Cantidad"
                                    name="number"
                                    value={formData.number}
                                    event={handleChange}
                                />
                                {errorsForms.number && <div className="text-danger">{errorsForms.number}</div>}
                            </div>

                            {formData.categoryName === "other" && (
                                <div className="col-md-4 ">
                                    <button className="btn btn-primary d-flex align-items-center">
                                        <i className="fa-solid fa-circle-plus rounded-circle me-2" style={{ padding: '8px', background: '#fff', color: '#007bff' }}></i>
                                        Agregar Categoría
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="text-center">
                            <h3><b>MEDIDAS DEL PRODUCTO</b></h3>
                        </div>
                        <div className="row">
                            <div className="col-md-2 ">
                                <Inputs
                                    text="Altura en Cm"
                                    name="height"
                                    value={formData.height}
                                    event={handleChange}
                                />
                                {errorsForms.height && <div className="text-danger">{errorsForms.height}</div>}
                            </div>

                            <div className="col-md-2 ">
                                <Inputs
                                    text="Longitud en Cm"
                                    name="length"
                                    value={formData.length}
                                    event={handleChange}
                                />
                                {errorsForms.length && <div className="text-danger">{errorsForms.length}</div>}
                            </div>

                            <div className="col-md-2 ">
                                <Inputs
                                    text="Ancho en Cm"
                                    name="width"
                                    value={formData.width}
                                    event={handleChange}
                                />
                                {errorsForms.width && <div className="text-danger">{errorsForms.width}</div>}
                            </div>

                            <div className="col-md-2 ">
                                <Inputs
                                    text="Peso"
                                    name="weight"
                                    value={formData.weight}
                                    event={handleChange}
                                />
                                {errorsForms.weight && <div className="text-danger">{errorsForms.weight}</div>}
                            </div>

                            <div className="col-md-2 ">
                                <Select
                                    text="Unidad de Medida"
                                    name="unitOfMeasurement"
                                    options={weightUnits}
                                    value={formData.unitOfMeasurement}
                                    event={handleChange}
                                />
                                {errorsForms.unitOfMeasurement && <div className="text-danger">{errorsForms.unitOfMeasurement}</div>}
                            </div>

                            <div className="col-md-2 "> {/** Dimenciones a digitar solas */}
                                <Inputs
                                    text="Dimensiones"
                                    placeholder='30x20x2'
                                    name="dimensions"
                                    value={formData.dimensions}
                                    event={handleChange}
                                    isReadOnly={true}
                                />
                                {errorsForms.dimensions && <div className="text-danger">{errorsForms.dimensions}</div>}
                            </div>
                        </div>  



                        <div className="text-center">
                            <h3><b>SEGURIDAD</b></h3>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <Inputs
                                    text="Tipo de empaquetado"
                                    name="packagingType"
                                    value={formData.packagingType}
                                    event={handleChange}
                                />
                                {errorsForms.packagingType && <div className="text-danger">{errorsForms.packagingType}</div>}
                            </div>

                            <div className="col-md-3">
                                <Select
                                    text="¿Es Perecedero?"
                                    name="isPerishable"
                                    options={Booleano}
                                    value={formData.isPerishable}
                                    event={handleChange}
                                />
                                {errorsForms.isPerishable && <div className="text-danger">{errorsForms.isPerishable}</div>}
                            </div>

                            <div className="col-md-3">
                                <Select
                                    text="¿Está Asegurado?"
                                    name="insured"
                                    options={Booleano}
                                    value={formData.insured}
                                    event={handleChange}
                                />
                                {errorsForms.insured && <div className="text-danger">{errorsForms.insured}</div>}
                            </div>

                            <div className="col-md-3">
                                <Select
                                    text="¿Materiales Peligrosos?"
                                    name="hazardousMaterials"
                                    options={Booleano}
                                    value={formData.hazardousMaterials}
                                    event={handleChange}
                                />
                                {errorsForms.hazardousMaterials && <div className="text-danger">{errorsForms.hazardousMaterials}</div>}
                            </div>

                            <div className="col-md-12">
                                <TextArea
                                    name="specialHandlingInstructions"
                                    value={formData.specialHandlingInstructions}
                                    onChange={handleChange}
                                    rows={1}
                                    placeholder="¿Alguna instrucción de manejo adicional? (opcional)"
                                />
                                {errorsForms.specialHandlingInstructions && <div className="text-danger">{errorsForms.specialHandlingInstructions}</div>}
                            </div>
                        </div>


                        <div className="text-center">
                            <h3><b>LUGAR DE ALMACENAMIENTO</b></h3>
                        </div>
                        <div className="row justify-content-center mt-2">
                            <div className="col-md-3 ">
                                <Select
                                    text="Almacenar en:"
                                    name="productLocation"
                                    options={useOptionsLocationProduct}
                                    value={formData.productLocation}
                                    event={handleChange}
                                />
                                {errorsForms.productLocation && <div className="text-danger">{errorsForms.productLocation}</div>}
                            </div>

                            {formData.productLocation === "warehouse" && (
                                <div className="col-md-3 ">
                                    <Select
                                        text="¿En qué bodega se encuentra?"
                                        name="warehouseName"
                                        options={useOptionsWarehouse}
                                        value={formData.warehouseName}
                                        event={handleChange}
                                    />
                                    {errorsForms.warehouseName && <div className="text-danger">{errorsForms.warehouseName}</div>}
                                </div>
                            )}

                            {formData.productLocation === "vehicle" && (
                                <div className="col-md-3 ">
                                    <Select
                                        text="¿En qué embarcación se encuentra?"
                                        name="vehicleName"
                                        options={useOptionsVehicles}
                                        value={formData.vehicleName}
                                        event={handleChange}
                                    />
                                    {errorsForms.vehicleName && <div className="text-danger">{errorsForms.vehicleName}</div>}
                                </div>
                            )}
                        </div>


                        <div className="text-center my-3">

                            {funcChangeState ? (
                                <>
                                    <button type="button" className={styles.cancelar} onClick={handleCloseModal}>
                                        Cancelar
                                    </button>
                                </>
                            ) : (
                                <>
                                    <CancelButton
                                        from={from}
                                        urlPageList={"../show-products"}
                                    />
                                </>
                            )}

                            <button type="submit" className={`${styles.guardar + " ms-2"} ${isDisabled ? "is-disabled-button" : ""}`}>
                                {action === 'update' ? 'Actualizar' : 'Registrar'} Producto <i className="fa-solid fa-building-user"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
