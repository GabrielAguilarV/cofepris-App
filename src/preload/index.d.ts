import { ElectronAPI } from '@electron-toolkit/preload'

interface DatabaseAPI {
  getAllActas: () => Promise<{ success: boolean; data?: any[]; error?: string }>
  getActaById: (id: number) => Promise<{ success: boolean; data?: any; error?: string }>
  createActa: (data: any) => Promise<{ success: boolean; data?: number; error?: string }>
  updateActa: (id: number, data: any) => Promise<{ success: boolean; data?: number; error?: string }>
  deleteActa: (id: number) => Promise<{ success: boolean; error?: string }>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: DatabaseAPI
  }
}
