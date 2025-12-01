import { Paper, Typography, Grid, TextField } from '@mui/material'
import { Controller, Control } from 'react-hook-form'
import { FormularioActa } from '../types'

interface DatosEstablecimientoProps {
  control: Control<FormularioActa>
  disabled?: boolean
}

export const DatosEstablecimiento = ({ control, disabled = false }: DatosEstablecimientoProps) => {
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
        DATOS DEL ESTABLECIMIENTO
      </Typography>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="nombre_establecimiento"
            control={control}
            rules={{ required: 'El nombre del establecimiento es requerido' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                label="Nombre del Establecimiento *"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                disabled={disabled}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="giro_comercial"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                label="Giro Comercial"
                placeholder="Ej: Tortillería, Panadería"
                disabled={disabled}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="rfc"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                label="RFC"
                disabled={disabled}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Controller
            name="calle"
            control={control}
            rules={{ required: 'La calle es requerida' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                label="Calle *"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                disabled={disabled}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Controller
            name="numero"
            control={control}
            rules={{ required: 'El número es requerido' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                label="Número *"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                disabled={disabled}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="colonia"
            control={control}
            rules={{ required: 'La colonia es requerida' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                label="Colonia *"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                disabled={disabled}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="codigo_postal"
            control={control}
            rules={{ required: 'El código postal es requerido' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                label="Código Postal *"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                disabled={disabled}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="municipio"
            control={control}
            rules={{ required: 'El municipio es requerido' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                label="Municipio *"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                disabled={disabled}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="estado"
            control={control}
            rules={{ required: 'El estado es requerido' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                label="Estado *"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                disabled={disabled}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="telefono"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                label="Teléfono"
                type="tel"
                disabled={disabled}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="correo_electronico"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                label="Correo Electrónico"
                type="email"
                disabled={disabled}
              />
            )}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}
