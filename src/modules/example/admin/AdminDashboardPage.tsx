import { BarChart, Group, Settings, Summarize } from "@mui/icons-material";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import { useEffect } from "react";
import { useLayout } from "../../../@d/hooks/LayoutContext";

export default function AdminDashboardPage() {
  const { setFullWidth } = useLayout();

  useEffect(() => {
    setFullWidth(true);
    return () => setFullWidth(false);
  }, [setFullWidth]);

  const rows = [
    {
      id: 1,
      name: "Carlos Silva",
      sector: "Logística",
      score: 1250,
      status: "Ativo",
    },
    { id: 2, name: "Ana Souza", sector: "RH", score: 980, status: "Pendente" },
    { id: 3, name: "Marcos Dias", sector: "TI", score: 3400, status: "Ativo" },
    {
      id: 4,
      name: "Julia Melo",
      sector: "Vendas",
      score: 1100,
      status: "Ativo",
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Painel Administrativo
        </Typography>
        <Button variant="contained">Exportar Relatório</Button>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 3,
          mb: 4,
        }}
      >
        {[
          "Total Usuários",
          "Engajamento Médio",
          "Missões Concluídas",
          "Impacto CO2",
        ].map((title, index) => (
          <Paper key={index} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h4" fontWeight="bold" color="primary.main">
              {Math.floor(Math.random() * 1000) + 100}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Paper sx={{ width: "100%", mb: 2, borderRadius: 2, overflow: "hidden" }}>
        <Box sx={{ p: 2, borderBottom: "1px solid #eee" }}>
          <Typography variant="h6">Ranking Geral de Colaboradores</Typography>
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="tabela simples">
            <TableHead sx={{ bgcolor: "background.paper" }}>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Setor</TableCell>
                <TableCell align="right">Pontuação</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { bgcolor: "#f5f5f5" },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.sector}</TableCell>
                  <TableCell align="right">{row.score}</TableCell>
                  <TableCell align="right">
                    <Box
                      component="span"
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 4,
                        fontSize: "0.75rem",
                        bgcolor: row.status === "Ativo" ? "#e8f5e9" : "#fff3e0",
                        color: row.status === "Ativo" ? "#2e7d32" : "#ef6c00",
                      }}
                    >
                      {row.status}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
