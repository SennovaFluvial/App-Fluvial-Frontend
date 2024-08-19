import React, { useState, useEffect } from 'react';
import { Spinner } from '../../animations/Spiner';
import { Grid } from '../../animations/Grid';
import { useNewContext } from '../../../Context/Provider';
import { ShowCapitan } from './ShowCapitan';

export const ShowCapitanes = () => {

    const { capitans, getCapitans } = useNewContext(); // Asumiendo que tienes un contexto similar para capitanes
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCapitans = async () => {
            await getCapitans();
            setLoading(false);
        };

        loadCapitans();
    }, [getCapitans]);

    if (loading) {
        return (
            <div className="container">
                <Grid>
                    <Spinner />
                </Grid>
            </div>
        );
    }

    return (
        <div className="container">
            {capitans.map((capitan) => (
                <ShowCapitan key={capitan.id} capitanData={capitan} />
            ))}
        </div>
    );
};
