import { useEffect, useRef, useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';

// third-party
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin from '@fullcalendar/interaction';

// project imports
import Toolbar from './Toolbar';
import AddEventForm from './AddEventForm';
import CalendarStyled from './CalendarStyled';

import Loader from 'ui-component/Loader';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';

// assets
import useAuth from 'hooks/useAuth';
import { GetMyStask } from 'services/TaskServices';

// ==============================|| APPLICATION CALENDAR ||============================== //

const Calendar = () => {
    const calendarRef = useRef(null);
    const matchSm = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const [events, setEvents] = useState([]);

    const fetchMyTask = async () => {
        try {
            const { data } = await GetMyStask(user?.id)
            const newArray = data.map((element) => {
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
                    description: element.tarea.descripcionTarea,
                    start: element.tarea.fechaLimite,
                    title: `Task: ${element.tarea.nombreTarea} | ${element.categoria.nombreCategoria}`
                };
            });
            setEvents(newArray)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMyTask()
    }, []);

    const [date, setDate] = useState(new Date());
    const [view, setView] = useState(matchSm ? 'listWeek' : 'dayGridMonth');

    const handleDateToday = () => {
        const calendarEl = calendarRef.current;

        if (calendarEl) {
            const calendarApi = calendarEl.getApi();

            calendarApi.today();
            setDate(calendarApi.getDate());
        }
    };

    const handleViewChange = (newView) => {
        const calendarEl = calendarRef.current;

        if (calendarEl) {
            const calendarApi = calendarEl.getApi();

            calendarApi.changeView(newView);
            setView(newView);
        }
    };

    useEffect(() => {
        handleViewChange(matchSm ? 'listWeek' : 'dayGridMonth');
    }, [matchSm]);

    const handleDatePrev = () => {
        const calendarEl = calendarRef.current;

        if (calendarEl) {
            const calendarApi = calendarEl.getApi();

            calendarApi.prev();
            setDate(calendarApi.getDate());
        }
    };

    const handleDateNext = () => {
        const calendarEl = calendarRef.current;

        if (calendarEl) {
            const calendarApi = calendarEl.getApi();

            calendarApi.next();
            setDate(calendarApi.getDate());
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRange, setSelectedRange] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleRangeSelect = (arg) => {
        const calendarEl = calendarRef.current;
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.unselect();
        }

        setSelectedRange({
            start: arg.start,
            end: arg.end
        });
        setIsModalOpen(true);
    };

    const handleEventSelect = (arg) => {
        if (arg.event.id) {
            const selectEvent = events.find((_event) => _event.id === arg.event.id);
            setSelectedEvent(selectEvent);
        } else {
            setSelectedEvent(null);
        }
        setIsModalOpen(true);
    };

    const handleEventUpdate = async ({ event }) => {
        try {
            console.log(event)
        } catch (err) {
            console.error(err);
        }
    };

    const handleEventCreate = async (data) => {
        console.log(data)
        handleModalClose();
    };

    const handleUpdateEvent = async (eventId, update) => {
        console.log(eventId, update)
        handleModalClose();
    };

    const handleEventDelete = async (id) => {
        try {
            console.log(id)
            handleModalClose();
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
        setSelectedRange(null);
    };

    if (loading) return <Loader />;

    return (
        <MainCard
            title="Mis Tareas"
        >
            <CalendarStyled>
                <Toolbar
                    date={date}
                    view={view}
                    onClickNext={handleDateNext}
                    onClickPrev={handleDatePrev}
                    onClickToday={handleDateToday}
                    onChangeView={handleViewChange}
                />
                <SubCard>
                    <FullCalendar
                        weekends
                        editable
                        droppable
                        selectable
                        events={events}
                        ref={calendarRef}
                        rerenderDelay={10}
                        initialDate={date}
                        initialView={view}
                        dayMaxEventRows={3}
                        eventDisplay="block"
                        headerToolbar={false}
                        allDayMaintainDuration
                        eventResizableFromStart
                        select={handleRangeSelect}
                        eventDrop={handleEventUpdate}
                        eventClick={handleEventSelect}
                        eventResize={handleEventUpdate}
                        height={matchSm ? 'auto' : 720}
                        plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
                    />
                </SubCard>
            </CalendarStyled>
            <Dialog maxWidth="sm" fullWidth onClose={handleModalClose} open={isModalOpen} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
                {isModalOpen && (
                    <AddEventForm
                        event={selectedEvent}
                        range={selectedRange}
                        onCancel={handleModalClose}
                        handleDelete={handleEventDelete}
                        handleCreate={handleEventCreate}
                        handleUpdate={handleUpdateEvent}
                    />
                )}
            </Dialog>
        </MainCard>
    );
};

export default Calendar;
