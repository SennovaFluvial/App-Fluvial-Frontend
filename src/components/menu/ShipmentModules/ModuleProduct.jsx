import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Select } from '../../html components/Selects.jsx';
import { Inputs } from '../../html components/Inputs.jsx'
import styles from '../../../assets/css/shipment/shipment.module.css'
import { weightUnits, Booleano } from '../update/options/arrays.jsx';


export const ModuleProduct = () => {
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleNext = () => {
        navigate('/adminSection/register-shipment/module-vehicle');
    };
    
    const handleBack = () => {
        event.preventDefault();
        navigate(-1);
    };
    
    return (
        <>
            <div className={styles.tarjeta}>
                <div className={styles.contenedor}>
                    <h2 className={styles.tittle}>DATOS DE PRODUCTOS</h2>
                    <form>
                        {/* <div className="text-center">
                            <h3><b>INFORMACIÓN DEL PRODUCTO</b></h3>
                        </div> */}
                        <div className="row">
                            <div className="col-md-4">
                                <Inputs text="Nombre del Producto" name="productName" onChange={handleChange} />

                            </div>
                            <div className="col-md-3">
                                <Select text="Categoría" name="category" onChange={handleChange} />

                            </div>
                            <div className="col-md-2">
                                <Inputs text="Peso" name="weight" onChange={handleChange} />

                            </div>
                            <div className="col-md-3">
                                <Select text="Unidad de Medida" name="unitOfMeasurement" options={weightUnits} onChange={handleChange} />

                            </div>
                            <div className="col-md-12">
                                <Inputs text="Descripción del Producto" name="description" onChange={handleChange} />

                            </div>
                            {/* <div className="text-center">
                                <h3><b>MEDIDAS DEL PRODUCTO</b></h3>
                            </div> */}
                            <div className="col-md-3">
                                <Inputs text="Altura" name="height" onChange={handleChange} />

                            </div>
                            <div className="col-md-3">
                                <Inputs text="Longitud" name="length" onChange={handleChange} />

                            </div>
                            <div className="col-md-3">
                                <Inputs text="Ancho" name="width" onChange={handleChange} />

                            </div>
                            <div className="col-md-3">
                                <Inputs text="Dimenciones" name="dimensions" onChange={handleChange} />

                            </div>
                        </div>

                        {/* <div className="text-center">
                            <h3><b>SEGURIDAD</b></h3>
                        </div> */}
                        <div className="row">
                            <div className="col-md-4">
                                <Inputs text="Tipo de empaquetado" name="packagingType" onChange={handleChange} />

                            </div>
                            <div className="col-md-4">
                                <Select text="¿Es Perecedero?" name="isPerishable" options={Booleano} onChange={handleChange} />

                            </div>
                            <div className="col-md-4">
                                <Select text="¿Esta Asegurado?" name="insured" options={Booleano} onChange={handleChange} />

                            </div>
                            <div className="col-md-12">
                                <Inputs text="Instrucciones de Manejo Especial" name="specialHandlingInstructions" onChange={handleChange} />

                            </div>
                            <div className="col-md-4">
                                <Select text="¿Materiales Peligrosos?" name="hazardousMaterials" options={Booleano} onChange={handleChange} />

                            </div>
                        </div>

                        {/* <div className="text-center">
                            <h3><b>INFORMACIÓN ADICIONAL</b></h3>
                        </div> */}
                        <div className="row">
                            <div className="col-md-4">
                                <Inputs text="Nombre del Vehículo" name="vehicleName" onChange={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <Inputs text="Número Documento del Cliente" name="customerName" onChange={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <Select text="Bodega" name="customerName" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <Inputs type="number" text="Peso" name="weigh" />
                        </div>
                        <div className={styles.fila}>
                            <div className="col-md-auto">
                                <button className={styles.cancelar} onClick={handleBack}>
                                    Atrás
                                </button>
                            </div>

                            <div className="col-md-auto">
                                <button className={styles.siguiente} onClick={handleNext}>
                                    Siguiente
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
