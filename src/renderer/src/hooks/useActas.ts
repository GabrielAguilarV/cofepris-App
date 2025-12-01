import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'

export interface ActaResumen {
  id_acta: number
  numero_acta: string
  numero_orden_visita?: string
  fecha_visita: string
  estado_acta: string
  fecha_creacion: string
  fecha_ultima_edicion: string
  establecimiento_nombre?: string
}

export interface ActaCompleta {
  id_acta: number
  numero_acta: string
  numero_orden_visita?: string
  fecha_visita: string
  estado_acta: string
  fecha_creacion: string
  fecha_ultima_edicion: string
  establecimiento?: {
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
  informacion_administrativa?: {
    aviso_funcionamiento: number
    dias_laborales?: string
    horario_inicio?: string
    horario_fin?: string
    turnos?: number
    numero_empleados: number
    empleados_area_produccion?: number
    volumen_produccion?: string
    se_toma_muestra: number
    numero_muestras?: number
    se_llena_cuestionario: number
    numero_hojas_anexadas?: number
    documentacion_anexada: number
  }
  evaluaciones?: Array<{
    numero_criterio: number
    calificacion: string
    observaciones?: string
  }>
}

export function useActas() {
  const [actas, setActas] = useState<ActaResumen[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchActas = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await window.api.getAllActas()
      if (response.success) {
        setActas(response.data || [])
      } else {
        setError(response.error || 'Error al cargar actas')
        toast.error('Error al cargar los registros')
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido'
      setError(message)
      toast.error('Error al conectar con la base de datos')
    } finally {
      setLoading(false)
    }
  }, [])

  const getActaById = useCallback(async (id: number): Promise<ActaCompleta | null> => {
    try {
      const response = await window.api.getActaById(id)
      if (response.success) {
        return response.data
      } else {
        toast.error(response.error || 'Error al cargar el acta')
        return null
      }
    } catch (err) {
      toast.error('Error al conectar con la base de datos')
      return null
    }
  }, [])

  const createActa = useCallback(async (data: any): Promise<number | null> => {
    try {
      const response = await window.api.createActa(data)
      if (response.success) {
        toast.success('Acta creada exitosamente')
        await fetchActas() // Recargar lista
        return response.data || null
      } else {
        toast.error(response.error || 'Error al crear el acta')
        return null
      }
    } catch (err) {
      toast.error('Error al conectar con la base de datos')
      return null
    }
  }, [fetchActas])

  const updateActa = useCallback(async (id: number, data: any): Promise<boolean> => {
    try {
      const response = await window.api.updateActa(id, data)
      if (response.success) {
        toast.success('Acta actualizada exitosamente')
        await fetchActas() // Recargar lista
        return true
      } else {
        toast.error(response.error || 'Error al actualizar el acta')
        return false
      }
    } catch (err) {
      toast.error('Error al conectar con la base de datos')
      return false
    }
  }, [fetchActas])

  const deleteActa = useCallback(async (id: number): Promise<boolean> => {
    try {
      const response = await window.api.deleteActa(id)
      if (response.success) {
        toast.success('Acta eliminada exitosamente')
        await fetchActas() // Recargar lista
        return true
      } else {
        toast.error(response.error || 'Error al eliminar el acta')
        return false
      }
    } catch (err) {
      toast.error('Error al conectar con la base de datos')
      return false
    }
  }, [fetchActas])

  return {
    actas,
    loading,
    error,
    fetchActas,
    getActaById,
    createActa,
    updateActa,
    deleteActa
  }
}
