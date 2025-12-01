import { Paper, Typography, Grid, TextField, MenuItem } from '@mui/material'
import { Controller, Control } from 'react-hook-form'
import { FormularioActa } from '../types'

interface InformacionAdministrativaProps {
  control: Control<FormularioActa>
  disabled?: boolean
}

export const InformacionAdministrativa = ({ control, disabled = false }: InformacionAdministrativaProps) => {
  return (
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
        INFORMACIÓN ADMINISTRATIVA
      </Typography>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="aviso_funcionamiento"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                label="Cuenta con aviso de funcionamiento"
                select
                value={field.value ? 'si' : 'no'}
                onChange={(e) => field.onChange(e.target.value === 'si')}
                disabled={disabled}
              >
                <MenuItem value="si">Sí</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </TextField>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="dias_laborales"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                label="Días laborales"
                placeholder="Ej: Lunes a Sábado"
                disabled={disabled}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Controller
            name="horario_inicio"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                label="Horario de labores: de"
                type="time"
                InputLabelProps={{ shrink: true }}
                disabled={disabled}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Controller
            name="horario_fin"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                label="a"
                type="time"
                InputLabelProps={{ shrink: true }}
                disabled={disabled}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="turnos"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                label="Turnos"
                type="number"
                disabled={disabled}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="numero_empleados"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                label="Número total de empleados"
                type="number"
                disabled={disabled}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="empleados_area_produccion"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                label="Empleados en área de producción"
                type="number"
                disabled={disabled}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Controller
            name="volumen_produccion"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                label="Volumen de producción diaria (especificar unidades)"
                placeholder="Ej: 500 kilogramos, 1000 piezas"
                disabled={disabled}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="se_llena_cuestionario"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                label="Se llena cuestionario de prácticas de higiene"
                select
                value={field.value ? 'si' : 'no'}
                onChange={(e) => field.onChange(e.target.value === 'si')}
                disabled={disabled}
              >
                <MenuItem value="si">Sí</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </TextField>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="documentacion_anexada"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                label="Se anexa documentación"
                select
                value={field.value ? 'si' : 'no'}
                onChange={(e) => field.onChange(e.target.value === 'si')}
                disabled={disabled}
              >
                <MenuItem value="si">Sí</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </TextField>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="numero_hojas_anexadas"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                label="Número de hojas anexadas"
                type="number"
                disabled={disabled}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="se_toma_muestra"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                label="Se toma muestra de producto"
                select
                value={field.value ? 'si' : 'no'}
                onChange={(e) => field.onChange(e.target.value === 'si')}
                disabled={disabled}
              >
                <MenuItem value="si">Sí</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </TextField>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="numero_muestras"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                label="Número de muestras"
                type="number"
                disabled={disabled}
              />
            )}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}
