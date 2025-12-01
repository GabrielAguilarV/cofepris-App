import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import { Header } from './components'
import { CardList } from './components/cardDoument/CardList'
import { useNavigate } from 'react-router'
import { useActas } from '../../hooks/useActas'
import { useState, useEffect } from 'react'

export const RegistroCofepris = () => {
  const navigate = useNavigate()
  const { actas, loading, error, deleteActa, fetchActas } = useActas()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [actaToDelete, setActaToDelete] = useState<number | null>(null)

  // Recargar las actas cuando el componente se monta o vuelve a estar visible
  useEffect(() => {
    fetchActas()
  }, [fetchActas])

  const handleVer = (id: number) => {
    // Modo solo lectura
    navigate(`/formulario?id=${id}&readonly=true`)
  }

  const handleEditar = (id: number) => {
    navigate(`/formulario?id=${id}`)
  }

  const handleBorrar = (id: number) => {
    setActaToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (actaToDelete) {
      await deleteActa(actaToDelete)
    }
    setDeleteDialogOpen(false)
    setActaToDelete(null)
  }

  const cancelDelete = () => {
    setDeleteDialogOpen(false)
    setActaToDelete(null)
  }

  return (
    <Box sx={{ p: 3 }}>
      <Header />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)'
          },
          gap: 3,
          mt: 3
        }}
      >
        <CardList 
          actas={actas}
          loading={loading}
          error={error}
          handleBorrar={handleBorrar} 
          handleEditar={handleEditar} 
          handleVer={handleVer} 
        />
      </Box>

      {/* Diálogo de confirmación para borrar */}
      <Dialog open={deleteDialogOpen} onClose={cancelDelete}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          ¿Estás seguro de que deseas eliminar esta acta de verificación? Esta acción no se puede
          deshacer.
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
