import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ValidationPages } from './validation.jsx';
import { VistaHomePageOff } from '../../vistaHome.jsx';
import { Login } from '../../Login.jsx';
import { DashBoard } from '../../dashBoard.jsx';
import { NotFound } from './notFound.jsx';

import { AddCompany } from '../menu/agregar/AddCompany.jsx';
import { AddEmployed } from '../menu/agregar/AddEmployed.jsx';
import { AddCaptain } from '../menu/agregar/AddCaptain.jsx';
import { AddSailor } from '../menu/agregar/AddSailor.jsx';
import { AddBoatDriver } from '../menu/agregar/AddBoatDriver.jsx';
import { AddVehicle } from '../menu/agregar/AddVehicle.jsx';
import { AddCustomer } from '../menu/agregar/AddCustomer.jsx';
import { AddCrew } from '../menu/agregar/AddCrew.jsx';
import { AddProduct } from '../menu/agregar/AddProduct.jsx';
import { AddWarehouse } from '../menu/agregar/AddWarehouse.jsx';
import { AddBranch } from '../menu/agregar/AddBranch.jsx';

import { ShowCompany } from '../menu/history/Show-Company.jsx';
import { ShowCustomers } from '../menu/history/Show-customers.jsx';
import { ShowUsers } from '../menu/history/Show-users.jsx';
import { ShowCrew } from '../menu/history/show-sailors.jsx';
import { ShowVehicles } from '../menu/history/Show-Vehicles.jsx';
import { ShowShipment } from '../menu/history/Show-Shipment.jsx';
import { ShowProducts } from '../menu/history/Show-Products.jsx';
import { ShowWarehouse } from '../menu/history/Show-Warehouse.jsx';

import { Info } from '../../Info.jsx';

import { RegisterShipment } from '../menu/ShipmentModules/RegisterShipment.jsx';
import { ModuleSender } from '../menu/ShipmentModules/ModuleSender.jsx';
import { ModuleRecipient } from '../menu/ShipmentModules/ModuleRecipient.jsx'
import { ModuleProduct } from '../menu/ShipmentModules/ModuleProduct.jsx';
import { ModuleVehicle } from '../menu/ShipmentModules/ModuleVehicle.jsx';
import { ModuleShipment } from '../menu/ShipmentModules/ModuleShipment.jsx';
import { ModuleFinish } from '../menu/ShipmentModules/ModuleFinish.jsx';

import { Inventories } from '../menu/InventoriesSection.jsx';
import { Reports } from '../menu/ReportsSection.jsx';
import { MoreDetails } from '../menu/history/moreDetails/MoreDetailsCustomers.jsx';
import { ShowBranch } from '../menu/history/Show-Branch.jsx';
import { ChatSection } from '../menu/ChatSection.jsx';

/**
 * Componente ComponentRouter
 * 
 * Este componente configura las rutas de la aplicación utilizando React Router. 
 * Muestra diferentes componentes basados en la URL actual y maneja la 
 * validación de acceso para las rutas protegidas.
 *
 * - Rutas Públicas:
 *   - `/`: Página principal.
 *   - `/Login`: Página de inicio de sesión.
 *
 * - Rutas protegidas:
 *   - `/adminSection`: Panel de administración, requiere validación.
 *     - Sub-rutas para agregar y mostrar datos (empresas, empleados, vehículos, etc.)
 *     - Módulos para gestionar envíos e inventarios.
 *
 * - Ruta para manejar errores 404: `*`
 * 
 * @returns {React.ReactNode} - Elemento que configura las rutas para la aplicación.
 */
export const ComponentRouter = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) {
                setUser(storedUser);
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('user'); F
            }
        }
    }, []);

    return (

        <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={<VistaHomePageOff />} />
            <Route path="/Login" element={<Login setUser={setUser} />} />

            <Route element={<ValidationPages user={user} setUser={setUser} />}> {/* Ruta protegida que requiere validación */}
                <Route path="/adminSection" element={<DashBoard user={user} setUser={setUser} />}> {/* Ruta para el panel de administración */}

                    <Route path="info" element={< Info />} />{/* Ruta para informacion qeu se mostrara por defecto en el dashboard */}

                    <Route path="add-company/:id?/:action?" element={< AddCompany />} />{/* Ruta para agregar empresas */}
                    <Route path="add-employed/:id?" element={< AddEmployed />} />{/* Ruta para agregar empleados */}
                    <Route path="add-vehicle/:id?/:action?" element={< AddVehicle />} /> {/* Ruta para agregar vehículos */}
                    <Route path="add-customer/:id?/:action?" element={< AddCustomer />} />{/* Ruta para agregar clientes */}
                    <Route path="add-product/:id?/:action?" element={< AddProduct />} />{/* Ruta para agregar productos */}
                    <Route path="add-warehouse/:id?/:action?" element={< AddWarehouse />} />{/* Ruta para agregar bodegas */}
                    <Route path="add-branch/:id?/:action?" element={< AddBranch />} />{/* Ruta para agregar bodegas */}

                    <Route path="add-crew" element={< AddCrew />}>{/* Ruta para agregar tripulantes */}

                        <Route path="add-captain/:id?/:action?" element={< AddCaptain />} />{/* Ruta para agregar capitanes */}
                        <Route path="add-sailor/:id?/:action?" element={< AddSailor />} /> {/* Ruta para agregar marinero */}
                        <Route path="add-boat-driver/:id?/:action?" element={< AddBoatDriver />} /> {/* Ruta para agregar mototristas */}

                    </Route>

                    <Route path="show-companies" element={< ShowCompany />} /> {/* Ruta para ver compañias */}
                    <Route path="show-customers" element={< ShowCustomers />} /> {/* Ruta para ver clientes */}
                    <Route path='show-customers/more-details/:id?/:category?' element={< MoreDetails />} />

                    <Route path="show-users" element={< ShowUsers />} /> {/* Ruta para ver usuarios */}
                    <Route path='show-users/more-details/:id?/:category?' element={< MoreDetails />} />

                    <Route path="show-crew" element={< ShowCrew />} /> {/* Ruta para ver tripualntes */}
                    <Route path='show-crew/more-details/:id?/:category?' element={< MoreDetails />} />

                    <Route path="show-vehicles" element={< ShowVehicles />} /> {/* Ruta para ver vehículos */}
                    <Route path='show-vehicles/more-details/:id?/:category?' element={< MoreDetails />} />
                    <Route path="show-shipment" element={< ShowShipment />} /> {/* Ruta para ver vehículos */}

                    <Route path="show-products" element={< ShowProducts />} /> {/* Ruta para ver productos */}
                    <Route path='show-products/more-details/:id?/:category?' element={< MoreDetails />} />

                    <Route path="show-warehouse" element={< ShowWarehouse />} /> {/* Ruta para ver bodegas */}
                    <Route path='show-warehouse/more-details/:id?/:category?' element={< MoreDetails />} />

                    <Route path="show-branch" element={< ShowBranch />} /> {/* Ruta para ver bodegas */}
                    <Route path='show-branch/more-details/:id?/:category?' element={< MoreDetails />} />

                    <Route path="register-shipment" element={< RegisterShipment />} > {/* Ruta padre para los moudulos de envío */}

                        <Route index element={<Navigate to="module-Sender" />} />
                        <Route path="module-Sender" element={< ModuleSender />} /> {/* Ruta para ver modulo de remitente */}
                        <Route path="module-recipient" element={< ModuleRecipient />} /> {/* Ruta para ver modulo de receptor */}
                        <Route path="module-product" element={< ModuleProduct />} /> {/* Ruta para ver modulo de productos */}
                        <Route path="module-vehicle" element={< ModuleVehicle />} /> {/* Ruta para ver modulo de vehiculo */}
                        <Route path="module-shipment" element={< ModuleShipment />} /> {/* Ruta para ver modulo de envío */}
                        <Route path="module-finish" element={< ModuleFinish />} /> {/* Ruta para ver modulo de envio finalizado */}

                    </Route>

                    <Route path="inventories" element={< Inventories />} /> {/* Ruta para ver los inventarios */}
                    <Route path="reports" element={< Reports />} />
                    <Route path="smartChat" element={< ChatSection />} />


                </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default ComponentRouter;