
import { Outlet } from 'react-router'
import { Box, Container } from '@mui/material'
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
          mt: 8
        }}
      >
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>
    </Box>
  )
}
