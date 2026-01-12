import { AppBar, Box, Slide, Toolbar, useScrollTrigger } from "@mui/material";
//import LanguageSelector from "../atoms/LanguageSelector";

const Header: React.FC = () => {
  const trigger = useScrollTrigger({
    threshold: 10,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.paper",
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />

          <Box
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src="/assets/images/Domvsit.svg"
              alt="Domvsit Logo"
              height="40"
              style={{ display: "block" }}
            />
          </Box>

          {/* <LanguageSelector /> Seletor de linguagem*/}
        </Toolbar>
      </AppBar>
    </Slide>
  );
};

export default Header;
