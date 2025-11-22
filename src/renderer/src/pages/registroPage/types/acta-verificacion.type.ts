// =========================================================
// TIPOS E INTERFACES PARA FORMULARIO COFEPRIS
// =========================================================

// ==================== ENUMS ====================

export enum EstadoActa {
  BORRADOR = 'borrador',
  COMPLETADA = 'completada',
  ENVIADA = 'enviada'
}

export enum CalificacionCriterio {
  NO_CUMPLE = 0,
  CUMPLE_PARCIALMENTE = 1,
  CUMPLE_TOTALMENTE = 2,
  NO_APLICA = -1
}

export enum TipoPersona {
  PROPIETARIO = 'propietario',
  REPRESENTANTE = 'representante',
  RESPONSABLE = 'responsable',
  ENCARGADO = 'encargado',
  TESTIGO = 'testigo',
  VERIFICADOR = 'verificador'
}

export enum CategoriaCriterio {
  INSTALACIONES_Y_AREAS = 'instalaciones_y_areas',
  EQUIPO_Y_UTENSILIOS = 'equipo_y_utensilios',
  SERVICIOS = 'servicios',
  ALMACENAMIENTO = 'almacenamiento',
  CONTROL_OPERACIONES = 'control_operaciones',
  MATERIAS_PRIMAS = 'materias_primas',
  ENVASES = 'envases',
  AGUA_EN_CONTACTO = 'agua_en_contacto',
  MANTENIMIENTO_LIMPIEZA = 'mantenimiento_limpieza',
  CONTROL_PLAGAS = 'control_plagas',
  MANEJO_RESIDUOS = 'manejo_residuos',
  SALUD_HIGIENE_PERSONAL = 'salud_higiene_personal',
  TRANSPORTE = 'transporte',
  CAPACITACION = 'capacitacion',
  DOCUMENTOS_REGISTROS = 'documentos_registros'
}

export enum TipoIdentificacion {
  INE = 'INE',
  PASAPORTE = 'pasaporte',
  CEDULA = 'cedula',
  LICENCIA_CONDUCIR = 'licencia_conducir',
  OTRO = 'otro'
}

// ==================== TIPOS ====================

export type Timestamp = string; // ISO 8601 format
export type DateString = string; // YYYY-MM-DD format
export type TimeString = string; // HH:mm format

// ==================== INTERFACES PRINCIPALES ====================

export interface ActaVerificacion {
  id_acta?: number;
  numero_acta: string;
  numero_orden_visita?: string;
  fecha_visita: DateString;
  estado_acta: EstadoActa;
  fecha_creacion?: Timestamp;
  fecha_ultima_edicion?: Timestamp;
}

export interface Establecimiento {
  id_establecimiento?: number;
  id_acta: number;
  nombre: string;
  giro_comercial?: string;
  calle: string;
  numero: string;
  colonia: string;
  municipio: string;
  estado: string;
  codigo_postal: string;
  rfc?: string;
  telefono?: string;
  correo_electronico?: string;
  fecha_creacion?: Timestamp;
}

export interface InformacionAdministrativa {
  id_info_admin?: number;
  id_acta: number;
  aviso_funcionamiento: boolean;
  dias_laborales?: string;
  horario_inicio?: TimeString;
  horario_fin?: TimeString;
  turnos?: number;
  numero_empleados: number;
  empleados_area_produccion?: number;
  volumen_produccion?: string;
  se_toma_muestra: boolean;
  numero_muestras?: number;
  se_llena_cuestionario: boolean;
  numero_hojas_anexadas?: number;
  documentacion_anexada: boolean;
  fecha_creacion?: Timestamp;
}

export interface PersonalVisita {
  id_personal?: number;
  id_acta: number;
  tipo_persona: TipoPersona;
  nombre: string;
  apellido_paterno?: string;
  apellido_materno?: string;
  tipo_identificacion: TipoIdentificacion;
  numero_identificacion: string;
  rfc?: string;
  domicilio?: string;
  telefono?: string;
  orden_participacion?: number;
  fecha_creacion?: Timestamp;
}

export interface EvaluacionCriterio {
  id_criterio?: number;
  id_acta: number;
  numero_criterio: number;
  categoria: CategoriaCriterio;
  descripcion?: string;
  calificacion: CalificacionCriterio;
  observaciones?: string;
  fecha_creacion?: Timestamp;
}

export interface EvaluacionPorCategoria {
  id_categoria_eval?: number;
  id_acta: number;
  categoria: CategoriaCriterio;
  total_criterios: number;
  criterios_cumplidos: number;
  criterios_parcial: number;
  criterios_incumplidos: number;
  criterios_no_aplica: number;
  porcentaje_cumplimiento: number;
  fecha_creacion?: Timestamp;
}

export interface ObservacionesActa {
  id_observacion?: number;
  id_acta: number;
  observaciones_generales?: string;
  manifestaciones_interesado?: string;
  hora_cierre?: number;
  minuto_cierre?: number;
  dia_cierre?: number;
  mes_cierre?: number;
  año_cierre?: number;
  fecha_creacion?: Timestamp;
}

export interface Firma {
  id_firma?: number;
  id_acta: number;
  tipo_firma: 'verificador' | 'testigo' | 'interesado';
  nombre_persona: string;
  orden?: number;
  fecha_firma?: Timestamp;
}

// ==================== INTERFACES COMPUESTAS ====================

export interface ActaCompleta {
  acta: ActaVerificacion;
  establecimiento: Establecimiento;
  informacion_administrativa: InformacionAdministrativa;
  personal_visita: PersonalVisita[];
  evaluacion_criterios: EvaluacionCriterio[];
  evaluacion_por_categoria: EvaluacionPorCategoria[];
  observaciones: ObservacionesActa;
  firmas: Firma[];
}

export interface ResumenActa {
  id_acta: number;
  numero_acta: string;
  fecha_visita: DateString;
  estado_acta: EstadoActa;
  establecimiento: string;
  giro_comercial?: string;
  direccion: string;
  numero_empleados: number;
  criterios_cumplidos: number;
  criterios_parcial: number;
  criterios_incumplidos: number;
}

export interface DatosCompletos {
  id_acta: number;
  numero_acta: string;
  numero_orden_visita?: string;
  fecha_visita: DateString;
  establecimiento: string;
  giro_comercial?: string;
  calle: string;
  numero: string;
  colonia: string;
  municipio: string;
  estado: string;
  codigo_postal: string;
  rfc?: string;
  telefono?: string;
  correo_electronico?: string;
  aviso_funcionamiento: boolean;
  dias_laborales?: string;
  horario_inicio?: TimeString;
  horario_fin?: TimeString;
  turnos?: number;
  numero_empleados: number;
  empleados_area_produccion?: number;
  volumen_produccion?: string;
}

// ==================== TIPOS PARA FORMULARIO ====================

export interface FormDataEstablecimiento {
  nombre: string;
  giro_comercial: string;
  calle: string;
  numero: string;
  colonia: string;
  municipio: string;
  estado: string;
  codigo_postal: string;
  rfc: string;
  telefono: string;
  correo_electronico: string;
}

export interface FormDataAdministrativa {
  aviso_funcionamiento: boolean;
  dias_laborales: string;
  horario_inicio: TimeString;
  horario_fin: TimeString;
  turnos: number;
  numero_empleados: number;
  empleados_area_produccion: number;
  volumen_produccion: string;
  se_toma_muestra: boolean;
  numero_muestras: number;
  se_llena_cuestionario: boolean;
  numero_hojas_anexadas: number;
  documentacion_anexada: boolean;
}

export interface FormDataPersona {
  tipo_persona: TipoPersona;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  tipo_identificacion: TipoIdentificacion;
  numero_identificacion: string;
  rfc: string;
  domicilio: string;
  telefono: string;
}

export interface FormDataCriterio {
  numero_criterio: number;
  calificacion: CalificacionCriterio;
  observaciones: string;
}

export interface FormDataObservaciones {
  observaciones_generales: string;
  manifestaciones_interesado: string;
  hora_cierre: number;
  minuto_cierre: number;
  dia_cierre: number;
  mes_cierre: number;
  año_cierre: number;
}

// ==================== TIPOS PARA API/DATABASE ====================

export interface CreateActaRequest {
  numero_acta: string;
  numero_orden_visita?: string;
  fecha_visita: DateString;
}

export interface UpdateActaRequest {
  id_acta: number;
  numero_acta?: string;
  estado_acta?: EstadoActa;
}

export interface DatabaseResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

// ==================== TIPOS PARA VALIDACIÓN ====================

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// ==================== CONSTANTES ====================

export const CATEGORIAS_CRITERIOS: Record<CategoriaCriterio, string> = {
  [CategoriaCriterio.INSTALACIONES_Y_AREAS]: 'Instalaciones y Áreas',
  [CategoriaCriterio.EQUIPO_Y_UTENSILIOS]: 'Equipo y Utensilios',
  [CategoriaCriterio.SERVICIOS]: 'Servicios',
  [CategoriaCriterio.ALMACENAMIENTO]: 'Almacenamiento',
  [CategoriaCriterio.CONTROL_OPERACIONES]: 'Control de Operaciones',
  [CategoriaCriterio.MATERIAS_PRIMAS]: 'Materias Primas',
  [CategoriaCriterio.ENVASES]: 'Envases',
  [CategoriaCriterio.AGUA_EN_CONTACTO]: 'Agua en Contacto con Alimentos',
  [CategoriaCriterio.MANTENIMIENTO_LIMPIEZA]: 'Mantenimiento y Limpieza',
  [CategoriaCriterio.CONTROL_PLAGAS]: 'Control de Plagas',
  [CategoriaCriterio.MANEJO_RESIDUOS]: 'Manejo de Residuos',
  [CategoriaCriterio.SALUD_HIGIENE_PERSONAL]: 'Salud e Higiene del Personal',
  [CategoriaCriterio.TRANSPORTE]: 'Transporte',
  [CategoriaCriterio.CAPACITACION]: 'Capacitación',
  [CategoriaCriterio.DOCUMENTOS_REGISTROS]: 'Documentos y Registros'
};

export const ETIQUETAS_CALIFICACION: Record<CalificacionCriterio, string> = {
  [CalificacionCriterio.NO_CUMPLE]: 'No Cumple',
  [CalificacionCriterio.CUMPLE_PARCIALMENTE]: 'Cumple Parcialmente',
  [CalificacionCriterio.CUMPLE_TOTALMENTE]: 'Cumple Totalmente',
  [CalificacionCriterio.NO_APLICA]: 'No Aplica'
};

export const CRITERIOS_EVALUACION = [
  {
    numero: 1,
    categoria: CategoriaCriterio.INSTALACIONES_Y_AREAS,
    descripcion: 'Las instalaciones del establecimiento, incluidos techos, puertas, paredes, pisos, baños, cisternas, tinacos u otros depósitos de agua, y mobiliario se encuentran en buenas condiciones de mantenimiento y limpios.'
  },
  {
    numero: 2,
    categoria: CategoriaCriterio.INSTALACIONES_Y_AREAS,
    descripcion: 'Las puertas y ventanas de las áreas de producción o elaboración están provistas de protección para evitar la entrada de lluvia y fauna nociva.'
  },
  {
    numero: 3,
    categoria: CategoriaCriterio.EQUIPO_Y_UTENSILIOS,
    descripcion: 'El equipo, utensilios y materiales que se emplean en la producción o elaboración, son inocuos y son resistentes a la corrosión y están instalados en forma tal que el espacio entre estos, la pared, el techo y el piso permite su limpieza y desinfección.'
  },
  // ... agregar los 34 criterios restantes
];