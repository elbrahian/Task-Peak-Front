// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    events: []
};

const slice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET EVENTS
        getEventsSuccess(state, action) {
            state.events = action.payload;
        },

        // ADD EVENT
        addEventSuccess(state, action) {
            state.events = action.payload;
        },

        // UPDATE EVENT
        updateEventSuccess(state, action) {
            state.events = action.payload;
        },

        // REMOVE EVENT
        removeEventSuccess(state, action) {
            state.events = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getEvents(id) {
    return async () => {
        try {
            const {data} = await axios.get(`/api/v1/tareaUsuario?iduser=${id}`);
            const newArray = data.data.map((element) => {
                const today = new Date();
                const deadline = new Date(element.tarea.fechaLimite);
                const differenceInTime = deadline.getTime() - today.getTime();
                const differenceInDays = differenceInTime / (1000 * 3600 * 24);
                let color;
                if (differenceInDays <= 0) {
                    color = '#f5222d';
                } else if (differenceInDays <= 3) {
                    color = '#faad14'; 
                } else {
                    color = '#52c41a';
                }
                return {
                    id: element.id,
                    color: color,
                    description: element.tarea.nombreTarea,
                    start: element.tarea.fechaCreacion,
                    end: element.tarea.fechaLimite,
                    title: 'Task: ' + element.tarea.nombreTarea
                };
            });
            console.log(newArray)
            dispatch(slice.actions.getEventsSuccess(newArray));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function addEvent(event) {
    return async () => {
        try {
            const response = await axios.post('/api/calendar/events/add', event);
            dispatch(slice.actions.addEventSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function updateEvent(event) {
    return async () => {
        try {
            const response = await axios.post('/api/calendar/events/update', event);
            dispatch(slice.actions.updateEventSuccess(response.data.events));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function removeEvent(eventId) {
    return async () => {
        try {
            const response = await axios.post('/api/calendar/events/delete', { eventId });
            dispatch(slice.actions.removeEventSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
