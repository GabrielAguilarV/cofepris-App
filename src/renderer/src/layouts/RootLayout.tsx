
import { Outlet } from 'react-router'
import { Box, Container, Paper } from '@mui/material'
import { NavBar } from '../components/NavBar'

export const RootLayout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}
    >
      <NavBar />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
          mt: 8,
          bgcolor: 'grey.50'
        }}
      >
        <Container maxWidth="lg">
          <Paper
            elevation={5}
            sx={{
              p: 3,
              minHeight: 'calc(100vh - 130px)',
              borderRadius: 2,
              bgcolor: 'white'
            }}
          >
            <Outlet />
          </Paper>
        </Container>
      </Box>
    </Box>
  )
}
