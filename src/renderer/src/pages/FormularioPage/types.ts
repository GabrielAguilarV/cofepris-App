// Tipos para el formulario
export interface FormularioActa {
  // Información del acta
  numero_acta: string
  numero_orden_visita: string
  fecha_visita: string
  estado_acta: string

  // Establecimiento
  nombre_establecimiento: string
  giro_comercial: string
  calle: string
  numero: string
  colonia: string
  municipio: string
  estado: string
  codigo_postal: string
  rfc: string
  telefono: string
  correo_electronico: string

  // Información administrativa
  aviso_funcionamiento: boolean
  dias_laborales: string
  horario_inicio: string
  horario_fin: string
  turnos: string
  numero_empleados: string
  empleados_area_produccion: string
  volumen_produccion: string
  se_toma_muestra: boolean
  numero_muestras: string
  se_llena_cuestionario: boolean
  numero_hojas_anexadas: string
  documentacion_anexada: boolean

  // Evaluaciones (objeto con IDs de criterio como keys)
  evaluaciones: Record<number, string>
}

export const defaultValues: FormularioActa = {
  numero_acta: '',
  numero_orden_visita: '',
  fecha_visita: new Date().toISOString().split('T')[0],
  estado_acta: 'borrador',
  
  nombre_establecimiento: '',
  giro_comercial: '',
  calle: '',
  numero: '',
  colonia: '',
  municipio: '',
  estado: '',
  codigo_postal: '',
  rfc: '',
  telefono: '',
  correo_electronico: '',
  
  aviso_funcionamiento: false,
  dias_laborales: '',
  horario_inicio: '',
  horario_fin: '',
  turnos: '',
  numero_empleados: '',
  empleados_area_produccion: '',
  volumen_produccion: '',
  se_toma_muestra: false,
  numero_muestras: '',
  se_llena_cuestionario: false,
  numero_hojas_anexadas: '',
  documentacion_anexada: false,
  
  evaluaciones: {}
}
