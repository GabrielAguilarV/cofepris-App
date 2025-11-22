import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
  Stack
} from '@mui/material'
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Description as DescriptionIcon
} from '@mui/icons-material'

interface Registro {
  id: number
  titulo: string
  descripcion: string
  estado: 'Aprobado' | 'Pendiente' | 'Rechazado' | 'En Proceso'
  fecha: string
}

interface CardRegistroProps {
  registro: Registro
  onVer?: (id: number) => void
  onEditar?: (id: number) => void
  onBorrar?: (id: number) => void
}

export const CardRegistro = ({ registro, onVer, onEditar, onBorrar }: CardRegistroProps) => {
  const getEstadoColor = (estado: Registro['estado']) => {
    switch (estado) {
      case 'Aprobado':
        return 'success'
      case 'Pendiente':
        return 'warning'
      case 'Rechazado':
        return 'error'
      case 'En Proceso':
        return 'info'
      default:
        return 'default'
    }
  }

  return (
    <Card
      elevation={2}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        {/* Ícono y Estado */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box
            sx={{
              bgcolor: 'primary.light',
              borderRadius: 2,
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <DescriptionIcon sx={{ fontSize: 40, color: 'primary.main' }} />
          </Box>
          <Chip
            label={registro.estado}
            color={getEstadoColor(registro.estado)}
            size="small"
            sx={{ fontWeight: 600 }}
          />
        </Box>

        {/* Título */}
        <Typography variant="h6" component="h3" gutterBottom fontWeight={600} sx={{ mb: 1 }}>
          {registro.titulo}
        </Typography>

        {/* Descripción */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: 40
          }}
        >
          {registro.descripcion}
        </Typography>

        {/* Fecha */}
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
          Fecha: {registro.fecha}
        </Typography>
      </CardContent>

      {/* Botones de acción */}
      <Box
        sx={{
          borderTop: 1,
          borderColor: 'divider',
          px: 2,
          py: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 0.5
        }}
      >
        <Stack direction="row" spacing={0.5}>
          <IconButton
            size="small"
            color="primary"
            onClick={() => onVer?.(registro.id)}
            title="Ver detalles"
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="info"
            onClick={() => onEditar?.(registro.id)}
            title="Editar"
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => onBorrar?.(registro.id)}
            title="Borrar"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>
    </Card>
  )
}

// Datos de ejemplo para simular
export const registrosEjemplo: Registro[] = [
  {
    id: 1,
    titulo: 'Constancia de Situación Fiscal',
    descripcion: 'Documento fiscal que acredita la situación tributaria de una persona física o moral ante el SAT.',
    estado: 'Aprobado',
    fecha: '15/11/2025'
  },
  {
    id: 2,
    titulo: 'Comprobante de Domicilio Comercial',
    descripcion: 'Comprobante que valida la dirección registrada de una empresa o establecimiento comercial.',
    estado: 'Pendiente',
    fecha: '18/11/2025'
  },
  {
    id: 3,
    titulo: 'Acta Constitutiva',
    descripcion: 'Documento legal que formaliza la creación de una empresa y sus estatutos sociales.',
    estado: 'Aprobado',
    fecha: '10/11/2025'
  },
  {
    id: 4,
    titulo: 'Acta de Asamblea',
    descripcion: 'Registro de decisiones y acuerdos tomados en una reunión de socios o accionistas.',
    estado: 'En Proceso',
    fecha: '20/11/2025'
  },
  {
    id: 5,
    titulo: 'Estado de Cuenta',
    descripcion: 'Resumen detallado de movimientos financieros que refleja transacciones y saldos de una cuenta bancaria.',
    estado: 'Pendiente',
    fecha: '22/11/2025'
  },
  {
    id: 6,
    titulo: 'Poder Notarial',
    descripcion: 'Documento que otorga facultades legales otorgado por notario.',
    estado: 'Aprobado',
    fecha: '12/11/2025'
  },
  {
    id: 7,
    titulo: 'Estado Financiero',
    descripcion: 'Informe financiero del año en curso y de los tres años anteriores.',
    estado: 'Rechazado',
    fecha: '08/11/2025'
  },
  {
    id: 8,
    titulo: 'Solicitud de Crédito',
    descripcion: 'Formulario oficial utilizado para solicitar un crédito.',
    estado: 'En Proceso',
    fecha: '21/11/2025'
  },
  {
    id: 9,
    titulo: 'Cotización de Financiamiento',
    descripcion: 'Documento que detalla los condiciones y costos de un financiamiento empresarial.',
    estado: 'Aprobado',
    fecha: '14/11/2025'
  }
]
