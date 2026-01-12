import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingFallbackMUI = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <CircularProgress size={60} thickness={4} color="primary" />
    </Box>
  );
};

export default LoadingFallbackMUI;
