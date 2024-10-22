import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import dayjs from "dayjs"; // Importa dayjs para manejar las fechas

export default function AddTareasDialog() {
  const [open, setOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false); // Estado para el diálogo de confirmación
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [categoria, setCategoria] = React.useState("");
  const [Prioridad, setPrioridad] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(dayjs()); // Inicializa con la fecha actual

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancelar = () => {
    setOpen(false);
  };

  const handleCrear = () => {
    setConfirmOpen(true); // Abre el diálogo de confirmación
  };

  const handleConfirmarCrear = () => {
    // Aquí puedes añadir la lógica para crear la tarea
    console.log("Tarea creada");
    setConfirmOpen(false);
    setOpen(false); // Cierra ambos diálogos al crear la tarea
  };

  const handleCloseConfirm = () => {
    setConfirmOpen(false);
  };

  const handleCategoriaChange = (event) => {
    setCategoria(event.target.value);
  };

  const handlePrioridadChange = (event) => {
    setPrioridad(event.target.value);
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>
        <LibraryAddIcon />
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleCancelar}
      >
        <DialogTitle>Crear Tarea</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField id="task-name-1" label="Nombre Tarea" variant="filled" />
            <TextField id="task-name-2" label="Descripcion" variant="filled" />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="Categoria-select-label">
                Categoria Tarea
              </InputLabel>
              <Select
                labelId="Categoria-select-label"
                id="Categoria-select"
                value={categoria}
                label="CategoriaTarea"
                onChange={handleCategoriaChange}
              >
                <MenuItem value={10}>Casa</MenuItem>
                <MenuItem value={20}>Universidad</MenuItem>
                <MenuItem value={30}>Trabajo</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="Prioridad-select-label">
                Prioridad Tarea
              </InputLabel>
              <Select
                labelId="Prioridad-select-label"
                id="Prioridad-select"
                value={Prioridad}
                label="Prioridad"
                onChange={handlePrioridadChange}
              >
                <MenuItem value={10}>alta</MenuItem>
                <MenuItem value={20}>baja</MenuItem>
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDateTimePicker
                label="Fecha y Hora"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                minDate={dayjs()} // Establece la fecha mínima como la fecha actual
              />
            </LocalizationProvider>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCrear}>
            CREAR
          </Button>
          <Button onClick={handleCancelar}>Cancelar</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmOpen} onClose={handleCloseConfirm}>
        <DialogTitle>Confirmar Creación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro de que desea crear esta tarea?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmarCrear}>Sí</Button>
          <Button onClick={handleCloseConfirm}>No</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
