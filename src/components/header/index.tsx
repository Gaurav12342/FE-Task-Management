import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet, useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    localStorage.removeItem("user-token");
    navigate("/");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Management
          </Typography>
          <Button onClick={handleNavigate} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        <Outlet />
      </main>
    </Box>
  );
}
