import { useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Button,
  TextField,
   Grid
} from '@mui/material'
import { Save as SaveIcon, Print as PrintIcon } from '@mui/icons-material'
import { REGISTRO_COFEPRIS } from '../registroPage/constants'

interface FormValues {
  [key: number]: string
}

export const FormularioPage = () => {
  const [formValues, setFormValues] = useState<FormValues>({})
  const [infoAdministrativa, setInfoAdministrativa] = useState({
    avisofuncionamiento: '',
    diasLaborales: '',
    horarioInicio: '',
    horarioFin: '',
    turnos: '',
    numeroEmpleados: '',
    volumenProduccion: '',
    practicasHigiene: '',
    documentacionAnexada: '',
    hojas: '',
    muestraProducto: '',
    numeroMuestras: ''
  })

  const handleRadioChange = (opcionId: number, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [opcionId]: value
    }))
  }

  const handleInfoChange = (field: string, value: string) => {
    setInfoAdministrativa((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = () => {
    console.log('Form Values:', formValues)
    console.log('Info Administrativa:', infoAdministrativa)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* Header */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: 'grey.100' }}>
        <Typography variant="h5" align="center" fontWeight={700} gutterBottom>
          ACTA DE VERIFICACIÓN SANITARIA
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary">
          Acta de Verificación Sanitaria de prácticas de higiene para tortillerías y panaderías
        </Typography>
      </Paper>

      {/* Calificación */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          CALIFICACIÓN:
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={{ flex: 1, minWidth: 200, border: 1, borderColor: 'divider', p: 1, textAlign: 'center' }}>
            (2) Cumple Totalmente
          </Box>
          <Box sx={{ flex: 1, minWidth: 200, border: 1, borderColor: 'divider', p: 1, textAlign: 'center' }}>
            (1) Cumple Parcialmente
          </Box>
          <Box sx={{ flex: 1, minWidth: 200, border: 1, borderColor: 'divider', p: 1, textAlign: 'center' }}>
            (0) No cumple
          </Box>
          <Box sx={{ flex: 1, minWidth: 200, border: 1, borderColor: 'divider', p: 1, textAlign: 'center' }}>
            (---) No aplica
          </Box>
        </Box>
      </Paper>

      {/* Información Administrativa */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ bgcolor: 'grey.200', p: 1 }}>
          INFORMACIÓN ADMINISTRATIVA:
        </Typography>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              size="small"
              label="Cuenta con aviso de funcionamiento"
              select
              SelectProps={{ native: true }}
              value={infoAdministrativa.avisofuncionamiento}
              onChange={(e) => handleInfoChange('avisofuncionamiento', e.target.value)}
            >
              <option value=""></option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              size="small"
              label="Días laborales"
              value={infoAdministrativa.diasLaborales}
              onChange={(e) => handleInfoChange('diasLaborales', e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              size="small"
              label="Horario de labores: de"
              value={infoAdministrativa.horarioInicio}
              onChange={(e) => handleInfoChange('horarioInicio', e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              size="small"
              label="a"
              value={infoAdministrativa.horarioFin}
              onChange={(e) => handleInfoChange('horarioFin', e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              size="small"
              label="Turnos"
              value={infoAdministrativa.turnos}
              onChange={(e) => handleInfoChange('turnos', e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              size="small"
              label="Número total de empleados"
              value={infoAdministrativa.numeroEmpleados}
              onChange={(e) => handleInfoChange('numeroEmpleados', e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              size="small"
              label="Número de empleados en área de producción"
              value={infoAdministrativa.volumenProduccion}
              onChange={(e) => handleInfoChange('volumenProduccion', e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              size="small"
              label="Volumen de producción diaria en piezas, kilogramos, litros, etc. (especificar unidades)"
              value={infoAdministrativa.volumenProduccion}
              onChange={(e) => handleInfoChange('volumenProduccion', e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              size="small"
              label="Se llena cuestionario de prácticas de higiene"
              select
              SelectProps={{ native: true }}
              value={infoAdministrativa.practicasHigiene}
              onChange={(e) => handleInfoChange('practicasHigiene', e.target.value)}
            >
              <option value=""></option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              size="small"
              label="Se anexa documentación"
              select
              SelectProps={{ native: true }}
              value={infoAdministrativa.documentacionAnexada}
              onChange={(e) => handleInfoChange('documentacionAnexada', e.target.value)}
            >
              <option value=""></option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              size="small"
              label="Número de hojas anexadas"
              value={infoAdministrativa.hojas}
              onChange={(e) => handleInfoChange('hojas', e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              size="small"
              label="Se toma muestra de producto para dictamen de etiqueta"
              select
              SelectProps={{ native: true }}
              value={infoAdministrativa.muestraProducto}
              onChange={(e) => handleInfoChange('muestraProducto', e.target.value)}
            >
              <option value=""></option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              size="small"
              label="Número de muestras"
              value={infoAdministrativa.numeroMuestras}
              onChange={(e) => handleInfoChange('numeroMuestras', e.target.value)}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Formulario de verificación */}
      {REGISTRO_COFEPRIS.map((seccion) => (
        <Paper key={seccion.id} elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography
            variant="h6"
            fontWeight={700}
            gutterBottom
            sx={{
              bgcolor: 'grey.300',
              p: 1.5,
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Box component="span" sx={{ fontWeight: 700 }}>
              {seccion.id}.
            </Box>
            {seccion.titulo}
          </Typography>

          {seccion.Opciones.map((opcion, index) => {
            const prevSubtitulo = index > 0 ? seccion.Opciones[index - 1].subtitulo : null
            const showSubtitulo = opcion.subtitulo && opcion.subtitulo !== prevSubtitulo

            return (
              <Box key={opcion.id}>
                {showSubtitulo && (
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    sx={{
                      mt: index > 0 ? 3 : 2,
                      mb: 2,
                      bgcolor: 'grey.200',
                      p: 1,
                      borderRadius: 1
                    }}
                  >
                    {opcion.subtitulo}
                  </Typography>
                )}

                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    alignItems: 'flex-start',
                    py: 2,
                    borderBottom: index < seccion.Opciones.length - 1 ? 1 : 0,
                    borderColor: 'divider'
                  }}
                >
                  <Typography variant="body2" sx={{ flex: 1, minWidth: 0 }}>
                    <Box component="span" fontWeight={600}>
                      {opcion.id}.
                    </Box>{' '}
                    {opcion.descripcion}
                  </Typography>

                  <FormControl component="fieldset" sx={{ minWidth: 300 }}>
                    <RadioGroup
                      row
                      value={formValues[opcion.id] || ''}
                      onChange={(e) => handleRadioChange(opcion.id, e.target.value)}
                    >
                      <FormControlLabel
                        value="2"
                        control={<Radio size="small" />}
                        label="2"
                        sx={{ mr: 1 }}
                      />
                      <FormControlLabel
                        value="1"
                        control={<Radio size="small" />}
                        label="1"
                        sx={{ mr: 1 }}
                      />
                      <FormControlLabel
                        value="0"
                        control={<Radio size="small" />}
                        label="0"
                        sx={{ mr: 1 }}
                      />
                      <FormControlLabel
                        value="---"
                        control={<Radio size="small" />}
                        label="---"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Box>
            )
          })}
        </Paper>
      ))}

      {/* Botones de acción */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mb: 3 }}>
        <Button variant="outlined" startIcon={<PrintIcon />} onClick={handlePrint}>
          Imprimir
        </Button>
        <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSubmit}>
          Guardar
        </Button>
      </Box>
    </Box>
  )
}
