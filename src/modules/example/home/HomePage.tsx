import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  LinearProgress,
  Chip,
} from "@mui/material";

export default function HomePage() {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Olá, João!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Continue sua jornada de sustentabilidade hoje.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid size={12}>
          <Card sx={{ height: "100%", borderRadius: 3 }}>
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                Nível Atual
              </Typography>
              <Typography variant="h3" color="primary.main" fontWeight="bold">
                7
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Especialista em Reciclagem
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={12}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              borderRadius: 3,
            }}
          >
            <CardContent>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="h6">Progresso da Temporada</Typography>
                <Typography variant="h6" color="primary">
                  75%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={75}
                sx={{ height: 10, borderRadius: 5 }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Faltam apenas 2 missões para alcançar o próximo ranking!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Missões Disponíveis
      </Typography>
      <Grid container spacing={3}>
        {[1, 2, 3].map((item) => (
          <Grid size={12} key={item}>
            <Card
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "border.main",
                boxShadow: "none",
              }}
            >
              <CardContent>
                <Chip
                  label="200 pts"
                  size="small"
                  color="primary"
                  sx={{ mb: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                  Redução de Plástico
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Substitua copos descartáveis por uma garrafa reutilizável
                  durante uma semana.
                </Typography>
                <Button variant="outlined" fullWidth>
                  Iniciar Missão
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
