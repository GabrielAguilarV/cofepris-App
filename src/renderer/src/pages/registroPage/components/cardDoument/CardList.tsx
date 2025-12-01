import { ActaResumen } from '../../../../hooks/useActas'
import { CardRegistro } from './CardRegistro'
import { Box, CircularProgress, Typography } from '@mui/material'

interface CardListProps {
  actas: ActaResumen[]
  loading: boolean
  error: string | null
  handleVer?: (id: number) => void
  handleEditar?: (id: number) => void
  handleBorrar?: (id: number) => void
}

export const CardList = ({ actas, loading, error, handleVer, handleEditar, handleBorrar }: CardListProps) => {

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
        <Typography color="error">Error al cargar los registros: {error}</Typography>
      </Box>
    )
  }

  if (actas.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
        <Typography color="text.secondary">
          No hay registros disponibles. Crea tu primer acta de verificación.
        </Typography>
      </Box>
    )
  }

  return (
    <>
      {actas.map((acta) => (
        <CardRegistro
          key={acta.id_acta}
          registro={{
            id: acta.id_acta,
            titulo: `Acta ${acta.numero_acta}`,
            descripcion: acta.establecimiento_nombre || 'Sin establecimiento',
            estado: acta.estado_acta === 'borrador' ? 'En Proceso' : 
                    acta.estado_acta === 'completada' ? 'Aprobado' : 
                    acta.estado_acta === 'enviada' ? 'En Proceso' : 'En Proceso',
            fecha: new Date(acta.fecha_visita).toLocaleDateString('es-MX')
          }}
          onVer={handleVer}
          onEditar={handleEditar}
          onBorrar={handleBorrar}
        />
      ))}
    </>
  )
}
