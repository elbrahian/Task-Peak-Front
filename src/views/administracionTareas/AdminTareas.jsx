// material-ui
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import CardGrid from './carGrid';
import { useEffect, useState } from 'react';
import useAuth from 'hooks/useAuth';
import Loader from 'ui-component/Loader';
import { GetMyStask } from 'services/TaskServices';


export const AdminTareasPage = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(true);
    const { user } = useAuth();

    const fetchMyTask = async () => {
        try {
            const { data } = await GetMyStask(user?.id)
            setData(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMyTask()
    }, [])

    if (loading) return <Loader />;

    return (
        <MainCard title="Mis Tareas">
            <Typography variant="body2">
                <CardGrid data={data} />
            </Typography>
        </MainCard>
    )
};


