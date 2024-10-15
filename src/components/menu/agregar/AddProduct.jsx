import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Select } from '../../html components/Selects.jsx';
import { Inputs } from '../../html components/Inputs.jsx';
import styles from '../../../assets/css/Forms.module.css'
import { weightUnits, Booleano } from '../update/options/arrays.jsx';

export const AddProduct = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        productName: '',
        description: '',
        weight: '',
        unitOfMeasurement: '',
        height: '',
        length: '',
        width: '',
        dimensions: '',
        packagingType: '',
        isPerishable: '',
        insured: '',
        specialHandlingInstructions: '',
        hazardousMaterials: '',
        category: {
            categoryId: '',
            categoryName: []
        },
        vehicleName: '',
        companyName: '',
        customerNumDocument: '',
        warehouseName: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const from = location.state?.from || 'menu';

    const handleCancel = () => {
        if (from === 'menu') {
            navigate('/adminSection');
        }

        if (from === 'producto') {
            navigate('../show-products');
        }
    };

    return (
        <>
            <div className={styles.card}>
                <div className={styles.container}>
                    <h2 className={styles.title}>CREAR PRODUCTO</h2>
                    <form>
                        <div className={styles.h3}>
                            <h3><b>INFORMACIÓN DEL PRODUCTO</b></h3>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <Inputs text="Nombre del Producto" name="productName" value={formData.productName} onChange={handleChange} />

                            </div>
                            <div className="col-md-3">
                                <Select text="Categoría" name="category" value={formData.category} onChange={handleChange} />

                            </div>
                            <div className="col-md-2">
                                <Inputs text="Peso" name="weight" value={formData.weight} onChange={handleChange} />

                            </div>
                            <div className="col-md-3">
                                <Select text="Unidad de Medida" name="unitOfMeasurement" options={weightUnits} value={formData.unitOfMeasurement} onChange={handleChange} />

                            </div>
                            <div className="col-md-12">
                                <Inputs text="Descripción del Producto" name="description" value={formData.description} onChange={handleChange} />

                            </div>
                            <div className="text-center">
                                <h3><b>MEDIDAS DEL PRODUCTO</b></h3>
                            </div>
                            <div className="col-md-3">
                                <Inputs text="Altura" name="height" value={formData.height} onChange={handleChange} />

                            </div>
                            <div className="col-md-3">
                                <Inputs text="Longitud" name="length" value={formData.length} onChange={handleChange} />

                            </div>
                            <div className="col-md-3">
                                <Inputs text="Ancho" name="width" value={formData.width} onChange={handleChange} />

                            </div>
                            <div className="col-md-3">
                                <Inputs text="Dimenciones" name="dimensions" value={formData.dimensions} onChange={handleChange} />

                            </div>
                        </div>

                        <div className="text-center">
                            <h3><b>SEGURIDAD</b></h3>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <Inputs text="Tipo de empaquetado" name="packagingType" value={formData.packagingType} onChange={handleChange} />

                            </div>
                            <div className="col-md-4">
                                <Select text="¿Es Perecebero?" name="isPerishable" options={Booleano} value={formData.isPerishable} onChange={handleChange} />

                            </div>
                            <div className="col-md-4">
                                <Select text="¿Esta Asegurado?" name="insured" options={Booleano} value={formData.insured} onChange={handleChange} />

                            </div>
                            <div className="col-md-12">
                                <Inputs text="Instrucciones de Manejo Especial" name="specialHandlingInstructions" value={formData.specialHandlingInstructions} onChange={handleChange} />

                            </div>
                            <div className="col-md-4">
                                <Select text="¿Materiales Peligrosos?" name="hazardousMaterials" options={Booleano} value={formData.hazardousMaterials} onChange={handleChange} />

                            </div>
                        </div>

                        <div className="text-center">
                            <h3><b>INFORMACIÓN ADICIONAL</b></h3>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <Inputs text="Nombre de la Empresa" name="companyName" value={formData.companyName} onChange={handleChange} />
                            </div>
                            <div className="col-md-3">
                                <Inputs text="Nombre del Vehículo" name="vehicleName" value={formData.vehicleName} onChange={handleChange} />
                            </div>
                            <div className="col-md-3">
                                <Inputs text="Número Documento del Cliente" name="customerName" value={formData.customerNumDocument} onChange={handleChange} />
                            </div>
                            <div className="col-md-3">
                                <Inputs text="Bodega" name="customerName" value={formData.warehouseName} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="text-center">
                            <button type="button" className={styles.cancelar} onClick={handleCancel}>Cancelar</button>
                            <button type="submit" className={`${styles.guardar + " ms-2"}`}>Crear Producto <i className="fa-solid fa-box"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
