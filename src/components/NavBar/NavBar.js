import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          Biblioteca
        </Typography>

        <Box>
          <Button component={Link} to="/" color="inherit" sx={{ mx: 1 }}>
            Home
          </Button>
          <Button component={Link} to="/sobre" color="inherit" sx={{ mx: 1 }}>
            Sobre
          </Button>
          <Button
            component={Link}
            to="/ListaDeLivros"
            color="inherit"
            sx={{ mx: 1 }}
          >
            Lista de Livros
          </Button>
          <Button
            component={Link}
            to="/Cadastrar"
            color="inherit"
            sx={{ mx: 1 }}
          >
            Cadastrar
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
