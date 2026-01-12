import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { House } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(1);

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setValue(0);
        break;
      default:
        break;
    }
  }, [location.pathname]);

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: (theme) => theme.zIndex.appBar,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue);
          if (newValue === 1) navigate("/");
        }}
      >
        <BottomNavigationAction label="Início" icon={<House />} />
      </BottomNavigation>
    </Paper>
  );
};

export default Footer;
