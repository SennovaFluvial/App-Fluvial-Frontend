import React from 'react'
import { Card, CardContent, CardMedia, Typography, Grid, Box } from '@mui/material';
import "../../assets/css/Info.css"
// import capitan from "../../assets/img/Capitan.jpg"
// import Marinero from "../../assets/img/marinero.jpg"
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
        <>
            <Box sx={{ flexGrow: 1, padding: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    <div className='h4_title'>Informes</div>
                </Typography>
                <Grid container spacing={4}>
                    {reportsType.map((report, index) => (
                        <Grid item xs={10} sm={4} md={3} key={index}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    alt={report.title}
                                    height="140"
                                    image={report.image}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {report.title}
                                    </Typography>
                                    
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    )
}
