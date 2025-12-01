import { Box, Paper, Typography, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { Controller, Control } from 'react-hook-form'
import { FormularioActa } from '../types'
import { REGISTRO_COFEPRIS } from '../../registroPage/constants'

interface EvaluacionCriteriosProps {
  control: Control<FormularioActa>
  disabled?: boolean
}

export const EvaluacionCriterios = ({ control, disabled = false }: EvaluacionCriteriosProps) => {
  return (
    <>
      {/* Leyenda de Calificación */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom color="text.primary">
          CALIFICACIÓN:
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={{ 
            flex: 1, 
            minWidth: 200, 
            border: 1, 
            borderColor: 'divider', 
            p: 1.5, 
            textAlign: 'center',
            bgcolor: 'success.light',
            color: 'success.dark',
            fontWeight: 600
          }}>
            (2) Cumple Totalmente
          </Box>
          <Box sx={{ 
            flex: 1, 
            minWidth: 200, 
            border: 1, 
            borderColor: 'divider', 
            p: 1.5, 
            textAlign: 'center',
            bgcolor: 'warning.light',
            color: 'warning.dark',
            fontWeight: 600
          }}>
            (1) Cumple Parcialmente
          </Box>
          <Box sx={{ 
            flex: 1, 
            minWidth: 200, 
            border: 1, 
            borderColor: 'divider', 
            p: 1.5, 
            textAlign: 'center',
            bgcolor: 'error.light',
            color: 'error.dark',
            fontWeight: 600
          }}>
            (0) No cumple
          </Box>
          <Box sx={{ 
            flex: 1, 
            minWidth: 200, 
            border: 1, 
            borderColor: 'divider', 
            p: 1.5, 
            textAlign: 'center',
            bgcolor: 'grey.300',
            color: 'text.primary',
            fontWeight: 600
          }}>
            (---) No aplica
          </Box>
        </Box>
      </Paper>

      {/* Formulario de verificación */}
      {REGISTRO_COFEPRIS.map((seccion) => (
        <Paper key={seccion.id} elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography
            variant="h6"
            fontWeight={700}
            gutterBottom
            sx={{
              bgcolor: 'primary.dark',
              color: 'white',
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
                      bgcolor: 'info.light',
                      color: 'info.dark',
                      p: 1.5,
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
                  <Typography variant="body2" sx={{ flex: 1, minWidth: 0, color: 'text.primary' }}>
                    <Box component="span" fontWeight={600}>
                      {opcion.id}.
                    </Box>{' '}
                    {opcion.descripcion}
                  </Typography>

                  <Controller
                    name={`evaluaciones.${opcion.id}` as any}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <FormControl component="fieldset" sx={{ minWidth: 300 }}>
                        <RadioGroup
                          row
                          value={field.value || ''}
                          onChange={field.onChange}
                        >
                          <FormControlLabel
                            value="2"
                            control={<Radio size="small" disabled={disabled} />}
                            label="2"
                            sx={{ mr: 1 }}
                          />
                          <FormControlLabel
                            value="1"
                            control={<Radio size="small" disabled={disabled} />}
                            label="1"
                            sx={{ mr: 1 }}
                          />
                          <FormControlLabel
                            value="0"
                            control={<Radio size="small" disabled={disabled} />}
                            label="0"
                            sx={{ mr: 1 }}
                          />
                          <FormControlLabel
                            value="---"
                            control={<Radio size="small" disabled={disabled} />}
                            label="---"
                          />
                        </RadioGroup>
                      </FormControl>
                    )}
                  />
                </Box>
              </Box>
            )
          })}
        </Paper>
      ))}
    </>
  )
}
