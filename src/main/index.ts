import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import {
  initDatabase,
  closeDatabase,
  getAllActasWithEstablecimiento,
  getActaCompleta,
  saveActaCompleta,
  updateActaCompleta,
  deleteActa
} from './database'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// Configurar IPC handlers para la base de datos
function setupIPCHandlers(): void {
  // Obtener todas las actas
  ipcMain.handle('db:getAllActas', async () => {
    try {
      const actas = getAllActasWithEstablecimiento()
      return { success: true, data: actas }
    } catch (error) {
      console.error('Error al obtener actas:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' }
    }
  })

  // Obtener acta completa por ID
  ipcMain.handle('db:getActaById', async (_, id: number) => {
    try {
      const acta = getActaCompleta(id)
      if (!acta) {
        return { success: false, error: 'Acta no encontrada' }
      }
      return { success: true, data: acta }
    } catch (error) {
      console.error('Error al obtener acta:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' }
    }
  })

  // Crear nueva acta
  ipcMain.handle('db:createActa', async (_, data) => {
    try {
      const idActa = saveActaCompleta(data)
      return { success: true, data: idActa }
    } catch (error) {
      console.error('Error al crear acta:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' }
    }
  })

  // Actualizar acta existente
  ipcMain.handle('db:updateActa', async (_, id: number, data) => {
    try {
      const success = updateActaCompleta(id, data)
      return { success, data: id }
    } catch (error) {
      console.error('Error al actualizar acta:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' }
    }
  })

  // Eliminar acta
  ipcMain.handle('db:deleteActa', async (_, id: number) => {
    try {
      const success = deleteActa(id)
      if (!success) {
        return { success: false, error: 'Acta no encontrada' }
      }
      return { success: true }
    } catch (error) {
      console.error('Error al eliminar acta:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' }
    }
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // Inicializar base de datos
  initDatabase()
  
  // Configurar handlers IPC
  setupIPCHandlers()

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Cerrar base de datos cuando la app se cierra
app.on('before-quit', () => {
  closeDatabase()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
