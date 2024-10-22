// material-ui
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useEffect, useState } from 'react';
import useAuth from 'hooks/useAuth';
import Loader from 'ui-component/Loader';
import { GetMyStask } from 'services/TaskServices';
import CardGrid from './CardGrid'; 

export const AdminCategorias = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null); 
    const { user } = useAuth();

    const fetchMyTask = async () => {
        try {
            const response = await GetMyStask(user?.id); 
            setData(response.data); 
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMyTask();
    }, []);

    if (loading) return <Loader />;

    return (
        <MainCard title="Mis categorias">
            <Typography variant="body2">
                <CardGrid />
            </Typography>
        </MainCard>
    );
};
