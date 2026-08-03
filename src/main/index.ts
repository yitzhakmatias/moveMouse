import { app, BrowserWindow, ipcMain, systemPreferences, dialog } from 'electron'
import { join } from 'path'
import { MouseMover } from './mouse-mover'

const mover = new MouseMover()

function checkAccessibility(): void {
  if (process.platform !== 'darwin') return
  const trusted = systemPreferences.isTrustedAccessibilityClient(false)
  if (!trusted) {
    dialog.showMessageBoxSync({
      type: 'warning',
      title: 'Accessibility Permission Required',
      message:
        'Mouse Mover needs Accessibility access to move the cursor.\n\nGo to System Settings → Privacy & Security → Accessibility and add this app.',
      buttons: ['Open System Settings', 'Later']
    })
    // Prompt the OS to open the Accessibility pane
    systemPreferences.isTrustedAccessibilityClient(true)
  }
}

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 380,
    height: 480,
    resizable: false,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  ipcMain.handle('mouse:start', (_, config: { intervalMs: number; moveAmount: number }) => {
    mover.start(config)
    return { success: true }
  })

  ipcMain.handle('mouse:stop', () => {
    mover.stop()
    return { success: true }
  })

  ipcMain.handle('mouse:status', () => {
    return { running: mover.isRunning() }
  })

  if (process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  checkAccessibility()
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  mover.stop()
  if (process.platform !== 'darwin') app.quit()
})
