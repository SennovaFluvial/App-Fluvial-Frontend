import React from 'react'
import { Card, CardContent, CardMedia, Typography, Grid, Box } from '@mui/material';
import "../../assets/css/Info.css"
import Motorista from "../../assets/img/canoa.jpg"
import Empleado from "../../assets/img/empleados.jpg"
import Tripulante from "../../assets/img/tripulantes.jpg"
import Vehiculo from "../../assets/img/vehiculos.jpg"

const reportsType = [
    {
        title: 'Imprimir Empleados',
        image: Empleado,
    },
    {
        title: 'Imprimir Tripulantes',
        image: Tripulante,
    },
    {
        title: 'Imprimir Vehículos',
        image: Vehiculo,
    },
    {
        title: 'Imprimir Clientes',
        image: Motorista,
    },
    {
        title: 'Imprimir Envios',
        image: Motorista,
    }

];

export const Reports = () => {
    return (
        <Box className="info-container">
            <Typography variant="h4" component="h1" className="h4_title">
                Informes
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {reportsType.map((report, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Card className="card">
                            <CardMedia
                                component="img"
                                alt={report.title}
                                height="180"
                                image={report.image}
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="div"
                                    align="center"
                                    className="card-title"
                                >
                                    {report.title}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
