import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import CardComponent from "./CardComponent"; 

export default function CardGrid() {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        {[...Array(10).keys()].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <CardComponent />{}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
