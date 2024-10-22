import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddTareasDialog from "./añadirtarea";
import { element } from "prop-types";

const OutlinedCard = ({ tarea, categoria }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Tarea: {tarea.nombreTarea}
        </Typography>
        <Divider />
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Categoria: {categoria.nombreCategoria}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1.5 }}>
          {tarea.descripcionTarea}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "space-between", padding: "8px 16px" }}>
        <Typography variant="button" color="primary">
          {tarea.estado.nombreEstado}
        </Typography>
        <Typography variant="button" color="secondary">
          {tarea.fechaLimite}
        </Typography>
      </CardActions>
    </Card>

  )
};

export default function CardGrid({ data }) {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  React.useEffect(() => {
    data.map((element) => {
      console.log(element.tarea.nombreTarea)
    })

  }, [])

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <AddTareasDialog open={dialogOpen} onClose={handleDialogClose} />
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        {data.length > 0 && data.map((element, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <OutlinedCard tarea={element.tarea} categoria={element.categoria} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
