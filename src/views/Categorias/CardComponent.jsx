import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const CardComponent = () => (
  <Card variant="outlined">
    <CardContent>
      <Typography variant="h5" component="div" gutterBottom>
        NOMBRE CATEGORIA
      </Typography>
      <Divider />
      <Typography
        sx={{ fontSize: 14 }}
        color="text.secondary"
        gutterBottom
      ></Typography>
      <Typography variant="body2" sx={{ mb: 1.5 }}>
        esta es una descripcion muy larga aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaaaa
      </Typography>
    </CardContent>
  </Card>
);

export default CardComponent;
