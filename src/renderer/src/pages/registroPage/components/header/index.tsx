
import { Box, Button } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router'

export const Header = () => {
  const navigate = useNavigate()

  const handleNuevoRegistro = () => {
    navigate('/formulario')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
        pb: 2,
        borderBottom: 2,
        borderColor: 'divider'
      }}
    >

      <Button
        variant="contained"
        size="large"
        startIcon={<AddIcon />}
        onClick={handleNuevoRegistro}
        sx={{
          px: 3,
          py: 1.5,
          fontWeight: 600,
          boxShadow: 2,
          '&:hover': {
            boxShadow: 4
          }
        }}
      >
        Nuevo Registro
      </Button>
    </Box>
  )
}
