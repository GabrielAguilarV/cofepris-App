import Database from 'better-sqlite3'
import { app } from 'electron'
import path from 'path'
import fs from 'fs'

// Tipos para la base de datos
export interface ActaDB {
  id_acta?: number
  numero_acta: string
  numero_orden_visita?: string
  fecha_visita: string
  estado_acta: string
  fecha_creacion?: string
  fecha_ultima_edicion?: string
}

export interface EstablecimientoDB {
  id_establecimiento?: number
  id_acta: number
  nombre: string
  giro_comercial?: string
  calle: string
  numero: string
  colonia: string
  municipio: string
  estado: string
  codigo_postal: string
  rfc?: string
  telefono?: string
  correo_electronico?: string
}

export interface InformacionAdministrativaDB {
  id_info_admin?: number
  id_acta: number
  aviso_funcionamiento: number // boolean como 0 o 1
  dias_laborales?: string
  horario_inicio?: string
  horario_fin?: string
  turnos?: number
  numero_empleados: number
  empleados_area_produccion?: number
  volumen_produccion?: string
  se_toma_muestra: number // boolean
  numero_muestras?: number
  se_llena_cuestionario: number // boolean
  numero_hojas_anexadas?: number
  documentacion_anexada: number // boolean
}

export interface EvaluacionCriterioDB {
  id_evaluacion?: number
  id_acta: number
  numero_criterio: number
  calificacion: string
  observaciones?: string
}

export interface ActaCompletaDB extends ActaDB {
  establecimiento?: EstablecimientoDB
  informacion_administrativa?: InformacionAdministrativaDB
  evaluaciones?: EvaluacionCriterioDB[]
}

let db: Database.Database | null = null

// Inicializar la base de datos
export function initDatabase(): Database.Database {
  if (db) return db

  const userDataPath = app.getPath('userData')
  const dbPath = path.join(userDataPath, 'cofepris.db')

  // Crear directorio si no existe
  if (!fs.existsSync(userDataPath)) {
    fs.mkdirSync(userDataPath, { recursive: true })
  }

  console.log('Inicializando base de datos en:', dbPath)
  db = new Database(dbPath)

  // Habilitar foreign keys
  db.pragma('foreign_keys = ON')

  // Crear tablas
  createTables()

  return db
}

// Crear todas las tablas necesarias
function createTables(): void {
  if (!db) return

  // Tabla de actas
  db.exec(`
    CREATE TABLE IF NOT EXISTS actas (
      id_acta INTEGER PRIMARY KEY AUTOINCREMENT,
      numero_acta TEXT NOT NULL UNIQUE,
      numero_orden_visita TEXT,
      fecha_visita TEXT NOT NULL,
      estado_acta TEXT NOT NULL DEFAULT 'borrador',
      fecha_creacion TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
      fecha_ultima_edicion TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
    )
  `)

  // Tabla de establecimientos
  db.exec(`
    CREATE TABLE IF NOT EXISTS establecimientos (
      id_establecimiento INTEGER PRIMARY KEY AUTOINCREMENT,
      id_acta INTEGER NOT NULL,
      nombre TEXT NOT NULL,
      giro_comercial TEXT,
      calle TEXT NOT NULL,
      numero TEXT NOT NULL,
      colonia TEXT NOT NULL,
      municipio TEXT NOT NULL,
      estado TEXT NOT NULL,
      codigo_postal TEXT NOT NULL,
      rfc TEXT,
      telefono TEXT,
      correo_electronico TEXT,
      fecha_creacion TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
      FOREIGN KEY (id_acta) REFERENCES actas (id_acta) ON DELETE CASCADE
    )
  `)

  // Tabla de información administrativa
  db.exec(`
    CREATE TABLE IF NOT EXISTS informacion_administrativa (
      id_info_admin INTEGER PRIMARY KEY AUTOINCREMENT,
      id_acta INTEGER NOT NULL,
      aviso_funcionamiento INTEGER NOT NULL DEFAULT 0,
      dias_laborales TEXT,
      horario_inicio TEXT,
      horario_fin TEXT,
      turnos INTEGER,
      numero_empleados INTEGER NOT NULL DEFAULT 0,
      empleados_area_produccion INTEGER,
      volumen_produccion TEXT,
      se_toma_muestra INTEGER NOT NULL DEFAULT 0,
      numero_muestras INTEGER,
      se_llena_cuestionario INTEGER NOT NULL DEFAULT 0,
      numero_hojas_anexadas INTEGER,
      documentacion_anexada INTEGER NOT NULL DEFAULT 0,
      fecha_creacion TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
      FOREIGN KEY (id_acta) REFERENCES actas (id_acta) ON DELETE CASCADE
    )
  `)

  // Tabla de evaluaciones de criterios
  db.exec(`
    CREATE TABLE IF NOT EXISTS evaluaciones_criterios (
      id_evaluacion INTEGER PRIMARY KEY AUTOINCREMENT,
      id_acta INTEGER NOT NULL,
      numero_criterio INTEGER NOT NULL,
      calificacion TEXT NOT NULL,
      observaciones TEXT,
      fecha_creacion TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
      FOREIGN KEY (id_acta) REFERENCES actas (id_acta) ON DELETE CASCADE,
      UNIQUE(id_acta, numero_criterio)
    )
  `)

  // Índices para mejorar rendimiento
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_actas_fecha ON actas(fecha_visita);
    CREATE INDEX IF NOT EXISTS idx_actas_estado ON actas(estado_acta);
    CREATE INDEX IF NOT EXISTS idx_establecimientos_acta ON establecimientos(id_acta);
    CREATE INDEX IF NOT EXISTS idx_info_admin_acta ON informacion_administrativa(id_acta);
    CREATE INDEX IF NOT EXISTS idx_evaluaciones_acta ON evaluaciones_criterios(id_acta);
  `)

  console.log('Tablas creadas exitosamente')
}

// Obtener instancia de la base de datos
export function getDatabase(): Database.Database {
  if (!db) {
    return initDatabase()
  }
  return db
}

// ==================== OPERACIONES CRUD ====================

// ===== ACTAS =====

export function createActa(acta: Omit<ActaDB, 'id_acta' | 'fecha_creacion' | 'fecha_ultima_edicion'>): number {
  const db = getDatabase()
  const stmt = db.prepare(`
    INSERT INTO actas (numero_acta, numero_orden_visita, fecha_visita, estado_acta)
    VALUES (?, ?, ?, ?)
  `)
  const result = stmt.run(
    acta.numero_acta,
    acta.numero_orden_visita || null,
    acta.fecha_visita,
    acta.estado_acta || 'borrador'
  )
  return result.lastInsertRowid as number
}

export function getAllActas(): ActaDB[] {
  const db = getDatabase()
  const stmt = db.prepare('SELECT * FROM actas ORDER BY fecha_ultima_edicion DESC')
  return stmt.all() as ActaDB[]
}

export function getActaById(id: number): ActaDB | undefined {
  const db = getDatabase()
  const stmt = db.prepare('SELECT * FROM actas WHERE id_acta = ?')
  return stmt.get(id) as ActaDB | undefined
}

export function updateActa(id: number, acta: Partial<ActaDB>): boolean {
  const db = getDatabase()
  const fields: string[] = []
  const values: any[] = []

  if (acta.numero_acta !== undefined) {
    fields.push('numero_acta = ?')
    values.push(acta.numero_acta)
  }
  if (acta.numero_orden_visita !== undefined) {
    fields.push('numero_orden_visita = ?')
    values.push(acta.numero_orden_visita)
  }
  if (acta.fecha_visita !== undefined) {
    fields.push('fecha_visita = ?')
    values.push(acta.fecha_visita)
  }
  if (acta.estado_acta !== undefined) {
    fields.push('estado_acta = ?')
    values.push(acta.estado_acta)
  }

  fields.push("fecha_ultima_edicion = datetime('now', 'localtime')")

  if (fields.length === 1) return false // Solo la fecha de edición

  values.push(id)
  const stmt = db.prepare(`UPDATE actas SET ${fields.join(', ')} WHERE id_acta = ?`)
  const result = stmt.run(...values)
  return result.changes > 0
}

export function deleteActa(id: number): boolean {
  const db = getDatabase()
  const stmt = db.prepare('DELETE FROM actas WHERE id_acta = ?')
  const result = stmt.run(id)
  return result.changes > 0
}

// ===== ESTABLECIMIENTOS =====

export function createEstablecimiento(establecimiento: Omit<EstablecimientoDB, 'id_establecimiento'>): number {
  const db = getDatabase()
  const stmt = db.prepare(`
    INSERT INTO establecimientos (
      id_acta, nombre, giro_comercial, calle, numero, colonia, municipio, estado,
      codigo_postal, rfc, telefono, correo_electronico
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
  const result = stmt.run(
    establecimiento.id_acta,
    establecimiento.nombre,
    establecimiento.giro_comercial || null,
    establecimiento.calle,
    establecimiento.numero,
    establecimiento.colonia,
    establecimiento.municipio,
    establecimiento.estado,
    establecimiento.codigo_postal,
    establecimiento.rfc || null,
    establecimiento.telefono || null,
    establecimiento.correo_electronico || null
  )
  return result.lastInsertRowid as number
}

export function getEstablecimientoByActa(idActa: number): EstablecimientoDB | undefined {
  const db = getDatabase()
  const stmt = db.prepare('SELECT * FROM establecimientos WHERE id_acta = ?')
  return stmt.get(idActa) as EstablecimientoDB | undefined
}

export function updateEstablecimiento(idActa: number, establecimiento: Partial<EstablecimientoDB>): boolean {
  const db = getDatabase()
  const fields: string[] = []
  const values: any[] = []

  Object.keys(establecimiento).forEach(key => {
    if (key !== 'id_establecimiento' && key !== 'id_acta' && establecimiento[key] !== undefined) {
      fields.push(`${key} = ?`)
      values.push(establecimiento[key])
    }
  })

  if (fields.length === 0) return false

  values.push(idActa)
  const stmt = db.prepare(`UPDATE establecimientos SET ${fields.join(', ')} WHERE id_acta = ?`)
  const result = stmt.run(...values)
  return result.changes > 0
}

// ===== INFORMACIÓN ADMINISTRATIVA =====

export function createInformacionAdministrativa(info: Omit<InformacionAdministrativaDB, 'id_info_admin'>): number {
  const db = getDatabase()
  const stmt = db.prepare(`
    INSERT INTO informacion_administrativa (
      id_acta, aviso_funcionamiento, dias_laborales, horario_inicio, horario_fin, turnos,
      numero_empleados, empleados_area_produccion, volumen_produccion, se_toma_muestra,
      numero_muestras, se_llena_cuestionario, numero_hojas_anexadas, documentacion_anexada
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
  const result = stmt.run(
    info.id_acta,
    info.aviso_funcionamiento ? 1 : 0,
    info.dias_laborales || null,
    info.horario_inicio || null,
    info.horario_fin || null,
    info.turnos || null,
    info.numero_empleados,
    info.empleados_area_produccion || null,
    info.volumen_produccion || null,
    info.se_toma_muestra ? 1 : 0,
    info.numero_muestras || null,
    info.se_llena_cuestionario ? 1 : 0,
    info.numero_hojas_anexadas || null,
    info.documentacion_anexada ? 1 : 0
  )
  return result.lastInsertRowid as number
}

export function getInformacionAdministrativaByActa(idActa: number): InformacionAdministrativaDB | undefined {
  const db = getDatabase()
  const stmt = db.prepare('SELECT * FROM informacion_administrativa WHERE id_acta = ?')
  return stmt.get(idActa) as InformacionAdministrativaDB | undefined
}

export function updateInformacionAdministrativa(idActa: number, info: Partial<InformacionAdministrativaDB>): boolean {
  const db = getDatabase()
  const fields: string[] = []
  const values: any[] = []

  Object.keys(info).forEach(key => {
    if (key !== 'id_info_admin' && key !== 'id_acta' && info[key] !== undefined) {
      let value = info[key]
      // Convertir booleans a números para SQLite
      if (typeof value === 'boolean') {
        value = value ? 1 : 0
      }
      fields.push(`${key} = ?`)
      values.push(value)
    }
  })

  if (fields.length === 0) return false

  values.push(idActa)
  const stmt = db.prepare(`UPDATE informacion_administrativa SET ${fields.join(', ')} WHERE id_acta = ?`)
  const result = stmt.run(...values)
  return result.changes > 0
}

// ===== EVALUACIONES =====

export function createOrUpdateEvaluacion(evaluacion: Omit<EvaluacionCriterioDB, 'id_evaluacion'>): number {
  const db = getDatabase()
  const stmt = db.prepare(`
    INSERT INTO evaluaciones_criterios (id_acta, numero_criterio, calificacion, observaciones)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(id_acta, numero_criterio) DO UPDATE SET
      calificacion = excluded.calificacion,
      observaciones = excluded.observaciones
  `)
  const result = stmt.run(
    evaluacion.id_acta,
    evaluacion.numero_criterio,
    evaluacion.calificacion,
    evaluacion.observaciones || null
  )
  return result.lastInsertRowid as number
}

export function getEvaluacionesByActa(idActa: number): EvaluacionCriterioDB[] {
  const db = getDatabase()
  const stmt = db.prepare('SELECT * FROM evaluaciones_criterios WHERE id_acta = ? ORDER BY numero_criterio')
  return stmt.all(idActa) as EvaluacionCriterioDB[]
}

// ===== OPERACIONES COMPUESTAS =====

export function getActaCompleta(idActa: number): ActaCompletaDB | undefined {
  const acta = getActaById(idActa)
  if (!acta) return undefined

  const establecimiento = getEstablecimientoByActa(idActa)
  const informacion_administrativa = getInformacionAdministrativaByActa(idActa)
  const evaluaciones = getEvaluacionesByActa(idActa)

  return {
    ...acta,
    establecimiento,
    informacion_administrativa,
    evaluaciones
  }
}

export function getAllActasWithEstablecimiento(): Array<ActaDB & { establecimiento_nombre?: string }> {
  const db = getDatabase()
  const stmt = db.prepare(`
    SELECT 
      a.*,
      e.nombre as establecimiento_nombre
    FROM actas a
    LEFT JOIN establecimientos e ON a.id_acta = e.id_acta
    ORDER BY a.fecha_ultima_edicion DESC
  `)
  return stmt.all() as Array<ActaDB & { establecimiento_nombre?: string }>
}

// Guardar acta completa (transacción)
export function saveActaCompleta(data: {
  acta: Omit<ActaDB, 'id_acta' | 'fecha_creacion' | 'fecha_ultima_edicion'>
  establecimiento: Omit<EstablecimientoDB, 'id_establecimiento' | 'id_acta'>
  informacion_administrativa: Omit<InformacionAdministrativaDB, 'id_info_admin' | 'id_acta'>
  evaluaciones: Array<Omit<EvaluacionCriterioDB, 'id_evaluacion' | 'id_acta'>>
}): number {
  const db = getDatabase()
  
  // Usar transacción para asegurar consistencia
  const transaction = db.transaction(() => {
    // Crear acta
    const idActa = createActa(data.acta)

    // Crear establecimiento
    createEstablecimiento({ ...data.establecimiento, id_acta: idActa })

    // Crear información administrativa
    createInformacionAdministrativa({ ...data.informacion_administrativa, id_acta: idActa })

    // Crear evaluaciones
    data.evaluaciones.forEach(evaluacion => {
      createOrUpdateEvaluacion({ ...evaluacion, id_acta: idActa })
    })

    return idActa
  })

  return transaction()
}

// Actualizar acta completa (transacción)
export function updateActaCompleta(idActa: number, data: {
  acta?: Partial<ActaDB>
  establecimiento?: Partial<EstablecimientoDB>
  informacion_administrativa?: Partial<InformacionAdministrativaDB>
  evaluaciones?: Array<Omit<EvaluacionCriterioDB, 'id_evaluacion' | 'id_acta'>>
}): boolean {
  const db = getDatabase()
  
  // Usar transacción
  const transaction = db.transaction(() => {
    if (data.acta) {
      updateActa(idActa, data.acta)
    }

    if (data.establecimiento) {
      updateEstablecimiento(idActa, data.establecimiento)
    }

    if (data.informacion_administrativa) {
      updateInformacionAdministrativa(idActa, data.informacion_administrativa)
    }

    if (data.evaluaciones) {
      data.evaluaciones.forEach(evaluacion => {
        createOrUpdateEvaluacion({ ...evaluacion, id_acta: idActa })
      })
    }

    return true
  })

  return transaction()
}

// Cerrar la base de datos
export function closeDatabase(): void {
  if (db) {
    db.close()
    db = null
  }
}
