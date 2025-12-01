import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router'
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField
} from '@mui/material'
import { Save as SaveIcon, Print as PrintIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material'
import { FormularioActa, defaultValues } from './types'
import { DatosEstablecimiento } from './components/DatosEstablecimiento'
import { InformacionAdministrativa } from './components/InformacionAdministrativa'
import { EvaluacionCriterios } from './components/EvaluacionCriterios'
import { useActas } from '../../hooks/useActas'
import { Controller } from 'react-hook-form'
import toast from 'react-hot-toast'

export const FormularioPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const actaId = searchParams.get('id')
  const isReadOnly = searchParams.get('readonly') === 'true'
  const { getActaById, createActa, updateActa } = useActas()
  
  const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormularioActa>({
    defaultValues
  })

  // Cargar datos si estamos editando
  useEffect(() => {
    if (actaId) {
      loadActa(parseInt(actaId))
    }
  }, [actaId])

  const loadActa = async (id: number) => {
    const acta = await getActaById(id)
    if (acta) {
      // Convertir los datos de la base de datos al formato del formulario
      const formData: FormularioActa = {
        numero_acta: acta.numero_acta,
        numero_orden_visita: acta.numero_orden_visita || '',
        fecha_visita: acta.fecha_visita,
        estado_acta: acta.estado_acta,
        
        nombre_establecimiento: acta.establecimiento?.nombre || '',
        giro_comercial: acta.establecimiento?.giro_comercial || '',
        calle: acta.establecimiento?.calle || '',
        numero: acta.establecimiento?.numero || '',
        colonia: acta.establecimiento?.colonia || '',
        municipio: acta.establecimiento?.municipio || '',
        estado: acta.establecimiento?.estado || '',
        codigo_postal: acta.establecimiento?.codigo_postal || '',
        rfc: acta.establecimiento?.rfc || '',
        telefono: acta.establecimiento?.telefono || '',
        correo_electronico: acta.establecimiento?.correo_electronico || '',
        
        aviso_funcionamiento: !!acta.informacion_administrativa?.aviso_funcionamiento,
        dias_laborales: acta.informacion_administrativa?.dias_laborales || '',
        horario_inicio: acta.informacion_administrativa?.horario_inicio || '',
        horario_fin: acta.informacion_administrativa?.horario_fin || '',
        turnos: acta.informacion_administrativa?.turnos?.toString() || '',
        numero_empleados: acta.informacion_administrativa?.numero_empleados?.toString() || '',
        empleados_area_produccion: acta.informacion_administrativa?.empleados_area_produccion?.toString() || '',
        volumen_produccion: acta.informacion_administrativa?.volumen_produccion || '',
        se_toma_muestra: !!acta.informacion_administrativa?.se_toma_muestra,
        numero_muestras: acta.informacion_administrativa?.numero_muestras?.toString() || '',
        se_llena_cuestionario: !!acta.informacion_administrativa?.se_llena_cuestionario,
        numero_hojas_anexadas: acta.informacion_administrativa?.numero_hojas_anexadas?.toString() || '',
        documentacion_anexada: !!acta.informacion_administrativa?.documentacion_anexada,
        
        evaluaciones: (acta.evaluaciones || []).reduce((acc, ev) => {
          acc[ev.numero_criterio] = ev.calificacion
          return acc
        }, {} as Record<number, string>)
      }
      
      reset(formData)
    }
  }

  const onSubmit = async (data: FormularioActa) => {
    try {
      // Convertir los datos del formulario al formato de la base de datos
      const actaData = {
        acta: {
          numero_acta: data.numero_acta,
          numero_orden_visita: data.numero_orden_visita || undefined,
          fecha_visita: data.fecha_visita,
          estado_acta: data.estado_acta
        },
        establecimiento: {
          nombre: data.nombre_establecimiento,
          giro_comercial: data.giro_comercial || undefined,
          calle: data.calle,
          numero: data.numero,
          colonia: data.colonia,
          municipio: data.municipio,
          estado: data.estado,
          codigo_postal: data.codigo_postal,
          rfc: data.rfc || undefined,
          telefono: data.telefono || undefined,
          correo_electronico: data.correo_electronico || undefined
        },
        informacion_administrativa: {
          aviso_funcionamiento: data.aviso_funcionamiento ? 1 : 0,
          dias_laborales: data.dias_laborales || undefined,
          horario_inicio: data.horario_inicio || undefined,
          horario_fin: data.horario_fin || undefined,
          turnos: data.turnos ? parseInt(data.turnos) : undefined,
          numero_empleados: parseInt(data.numero_empleados) || 0,
          empleados_area_produccion: data.empleados_area_produccion ? parseInt(data.empleados_area_produccion) : undefined,
          volumen_produccion: data.volumen_produccion || undefined,
          se_toma_muestra: data.se_toma_muestra ? 1 : 0,
          numero_muestras: data.numero_muestras ? parseInt(data.numero_muestras) : undefined,
          se_llena_cuestionario: data.se_llena_cuestionario ? 1 : 0,
          numero_hojas_anexadas: data.numero_hojas_anexadas ? parseInt(data.numero_hojas_anexadas) : undefined,
          documentacion_anexada: data.documentacion_anexada ? 1 : 0
        },
        evaluaciones: Object.entries(data.evaluaciones).map(([criterio, calificacion]) => ({
          numero_criterio: parseInt(criterio),
          calificacion: calificacion as string
        }))
      }

      let success
      if (actaId) {
        // Actualizar acta existente
        success = await updateActa(parseInt(actaId), actaData)
      } else {
        // Crear nueva acta
        const newId = await createActa(actaData)
        success = !!newId
      }

      if (success) {
        navigate('/')
      }
    } catch (error) {
      console.error('Error al guardar:', error)
      toast.error('Error al guardar el formulario')
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* Header */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h5" align="center" fontWeight={700} gutterBottom>
          ACTA DE VERIFICACIÓN SANITARIA
        </Typography>
        <Typography variant="body2" align="center">
          Acta de Verificación Sanitaria de prácticas de higiene para tortillerías y panaderías
        </Typography>
      </Paper>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Datos del Acta */}
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography 
            variant="h6" 
            fontWeight={700} 
            gutterBottom 
            sx={{ 
              bgcolor: 'primary.main', 
              color: 'white',
              p: 1.5,
              borderRadius: 1 
            }}
          >
            DATOS DEL ACTA
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2, mt: 1 }}>
            <Controller
              name="numero_acta"
              control={control}
              rules={{ required: 'El número de acta es requerido' }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  label="Número de Acta *"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  disabled={isReadOnly}
                />
              )}
            />
            
            <Controller
              name="numero_orden_visita"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  label="Número de Orden de Visita"
                  disabled={isReadOnly}
                />
              )}
            />
            
            <Controller
              name="fecha_visita"
              control={control}
              rules={{ required: 'La fecha de visita es requerida' }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  label="Fecha de Visita *"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  disabled={isReadOnly}
                />
              )}
            />
          </Box>
        </Paper>

        {/* Datos del Establecimiento */}
        <DatosEstablecimiento control={control} disabled={isReadOnly} />

        {/* Información Administrativa */}
        <InformacionAdministrativa control={control} disabled={isReadOnly} />

        {/* Evaluación de Criterios */}
        <EvaluacionCriterios control={control} disabled={isReadOnly} />

        {/* Botones de acción */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', mb: 3 }}>
          <Button 
            variant="outlined" 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate('/')}
          >
            Volver
          </Button>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" startIcon={<PrintIcon />} onClick={handlePrint}>
              Imprimir
            </Button>
            {!isReadOnly && (
              <Button 
                type="submit"
                variant="contained" 
                startIcon={<SaveIcon />}
                disabled={isSubmitting}
              >
                {actaId ? 'Actualizar' : 'Guardar'}
              </Button>
            )}
          </Box>
        </Box>
      </form>
    </Box>
  )
}
