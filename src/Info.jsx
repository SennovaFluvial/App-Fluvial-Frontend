import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Box } from '@mui/material';
import "./assets/css/Info.css"
import capitan from "./assets/img/Capitan.jpg"
import Marinero from "./assets/img/marinero.jpg"
import Motorista from "./assets/img/canoa.jpg"


const employeeTypes = [
    {
        title: 'Capitán',
        description: 'Responsable de la operación de la embarcación y de su tripulación.',
        image: capitan,
    },
    {
        title: 'Marinero',
        description: 'Ayuda a las operaciones diarias a bordo de la embarcación.',
        image: Marinero,
    },
    {
        title: 'Motorista',
        description: 'Encargado del mantenimiento y operación de los motores.',
        image: Motorista,
    }
];

export const Info = () => {

    return (
        <div className="info-container">
            <h1>Información General</h1>
            <p>Bienvenido a la sección de información del dashboard. Aquí puedes encontrar pequeñas descripciones de algunos empleados.</p>
            {/* {console.log("Hola4")} */}
            <Box sx={{ flexGrow: 1, padding: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Tipos de Empleados
                </Typography>

                <Grid container spacing={4}>
                    {employeeTypes.map((employee, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    alt={employee.title}
                                    height="140"
                                    image={employee.image}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {employee.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {employee.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );


};