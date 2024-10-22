import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { CalendarioPage } from 'views/calendario/CalendarioPage';
import { AdminTareasPage } from 'views/administracionTareas/AdminTareas';
import Calendar from 'views/calendar';
import {AdminCategorias} from 'views/Categorias/AdminCategorias';

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/',
            element: <Calendar />
        },
        {
            path: '/calendario',
            element: <Calendar />
        },
        {
            path: '/mi-tareas',
            element: <AdminTareasPage />
        },
        {
            path: '/categorias',
            element: <AdminCategorias/>
        }
    ]
};

export default MainRoutes;
