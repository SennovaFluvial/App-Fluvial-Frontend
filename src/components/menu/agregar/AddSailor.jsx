import { Inputs } from '../../html components/Inputs.jsx';
import { Select } from '../../html components/Selects.jsx';
import { status, OptionsTypeDocument, genero, maritalStatus, nationality } from '../update/options/arrays.jsx';
import { useParams } from 'react-router';
import '../../../assets/css/AgregarEmpleado.css';
import { ControllerCreateUpdateSailor } from './controllers/ControllerCreateUpdateSailor.jsx';

export const AddSailor = () => {

    const { id, action } = useParams();
    const { handleSubmit, formData, errorsForms, handleChange } = ControllerCreateUpdateSailor({ id, action });

    return (
        <div className="d-flex-empleado justify-content-center align-items-center vh-100">
            <div className="container-empleado bg-light shadow rounded p-4">
                <h2 className="text-center mb-2">{action && action === "update" ? "ACTUALIZAR" : "CREAR"} MARINERO</h2>
                <form onSubmit={handleSubmit}>
                    {/* Información Personal */}
                    <div className="text-center">
                        <h3><b>INFORMACIÓN PERSONAL</b></h3>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <Inputs text="Nombres" name="name" event={handleChange} value={formData.name} />
                            {errorsForms.name && <div className="text-danger">{errorsForms.name}</div>}
                        </div>
                        <div className="col-md-4">
                            <Inputs text="Apellidos" name="lastName" event={handleChange} value={formData.lastName} />
                            {errorsForms.lastName && <div className="text-danger">{errorsForms.lastName}</div>}
                        </div>
                        <div className="col-md-4">
                            <Select text="Tipo de Documento" value={formData.typeDocument} name="typeDocument" event={handleChange} options={OptionsTypeDocument} />
                            {errorsForms.typeDocument && <div className="text-danger">{errorsForms.typeDocument}</div>}
                        </div>
                        <div className="col-md-4">
                            <Inputs text="Número de Documento" name="numDocument" event={handleChange} icon="fa-solid fa-address-card" value={formData.numDocument} />
                            {errorsForms.numDocument && <div className="text-danger">{errorsForms.numDocument}</div>}
                        </div>
                        <div className="col-md-4">
                            <Inputs type="date" text="Fecha de Nacimiento" name="dateOfBirth" event={handleChange} icon="fa-solid fa-calendar-days" value={formData.dateOfBirth} />
                            {errorsForms.dateOfBirth && <div className="text-danger">{errorsForms.dateOfBirth}</div>}
                        </div>
                        <div className="col-md-4">
                            <Select text="Nacionalidad" value={formData.nationality} name="nationality" event={handleChange} options={nationality} />
                            {errorsForms.nationality && <div className="text-danger">{errorsForms.nationality}</div>}
                        </div>
                        <div className="col-md-4">
                            <Select text="Estado civil" value={formData.maritalStatus} name="maritalStatus" event={handleChange} options={maritalStatus} />
                            {errorsForms.maritalStatus && <div className="text-danger">{errorsForms.maritalStatus}</div>}
                        </div>
                        <div className="col-md-4">
                            <Select text="Género" name="sex" value={formData.sex} event={handleChange} options={genero} />
                            {errorsForms.sex && <div className="text-danger">{errorsForms.sex}</div>}
                        </div>
                    </div>

                    {/* Contacto y Dirección */}
                    <div className="text-center mt-3">
                        <h3><b>CONTACTO Y DIRECCIÓN</b></h3>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <Inputs text="Correo Electrónico" name="email" event={handleChange} icon={"fa-solid fa-at"} value={formData.email} />
                            {errorsForms.email && <div className="text-danger">{errorsForms.email}</div>}
                        </div>
                        <div className="col-md-4">
                            <Inputs text="Número de Teléfono" name="phone" event={handleChange} icon="fa-solid fa-phone-volume" value={formData.phone} />
                            {errorsForms.phone && <div className="text-danger">{errorsForms.phone}</div>}
                        </div>
                        <div className="col-md-4">
                            <Inputs text="Dirección" name="address" event={handleChange} icon="fa-solid fa-map-pin" value={formData.address} />
                            {errorsForms.address && <div className="text-danger">{errorsForms.address}</div>}
                        </div>

                        <div className="text-center">
                            <h3><b>INFORMACIÓN LABORAL</b></h3>
                        </div>
                        <div className="col-md-4">
                            <Inputs text="Licencia" name="licencia" event={handleChange} icon={"fa-regular fa-id-badge"} value={formData.licencia} />
                            {errorsForms.licencia && <div className="text-danger">{errorsForms.licencia}</div>}
                        </div>
                        <div className="col-md-4">
                            <Select text="Estado" value={formData.status} name="status" event={handleChange} options={status} />
                            {errorsForms.status && <div className="text-danger">{errorsForms.status}</div>}
                        </div>
                    </div>

                    <div className="text-center mt-3">
                        <button type="submit" className="btn btn-success">{action && action === "update" ? "Actualizar" : "Guardar"} Marinero <i className="fa-solid fa-ship"></i></button>
                    </div>
                </form>
            </div>
        </div>
    )
}
