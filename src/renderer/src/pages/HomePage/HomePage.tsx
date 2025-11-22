
import { Box, Typography, Card, CardContent, CardActionArea, Paper, Stack } from '@mui/material'
import {
  Assignment as AssignmentIcon,
  Info as InfoIcon,
  MedicalServices as MedicalServicesIcon,
  Description as DescriptionIcon
} from '@mui/icons-material'
import { useNavigate } from 'react-router'

export const HomePage = () => {
  const navigate = useNavigate()

  const features = [
    {
      title: 'Registro COFEPRIS',
      description: 'Completa el formulario de registro para productos sanitarios',
      icon: <AssignmentIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      path: '/tasks'
    },
    {
      title: 'Información',
      description: 'Conoce más sobre el proceso y requisitos',
      icon: <InfoIcon sx={{ fontSize: 60, color: 'info.main' }} />,
      path: '/about'
    }
  ]

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          p: 4,
          mb: 4,
          borderRadius: 2,
          textAlign: 'center'
        }}
      >
        <MedicalServicesIcon sx={{ fontSize: 80, mb: 2, opacity: 0.9 }} />
        <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
          Sistema de Registro COFEPRIS
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.95, maxWidth: 800, mx: 'auto' }}>
          Gestiona tus formularios de registro de productos sanitarios de manera eficiente y segura
        </Typography>
      </Paper>

      {/* Features Grid */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
        {features.map((feature, index) => (
          <Card
            key={index}
            elevation={2}
            sx={{
              flex: 1,
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6
              }
            }}
          >
            <CardActionArea
              onClick={() => navigate(feature.path)}
              sx={{ height: '100%', p: 2 }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Stack>

      {/* Info Section */}
      <Paper
        elevation={1}
        sx={{
          p: 3,
          bgcolor: 'info.light',
          borderLeft: 4,
          borderColor: 'info.main'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <DescriptionIcon sx={{ color: 'info.main', fontSize: 40 }} />
          <Box>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Bienvenido al sistema
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Esta aplicación te permite gestionar y completar formularios de registro para la
              Comisión Federal para la Protección contra Riesgos Sanitarios (COFEPRIS).
              Selecciona una opción del menú para comenzar.
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
