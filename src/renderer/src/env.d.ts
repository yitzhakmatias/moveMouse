export {}

declare global {
  interface Window {
    electronAPI: {
      startMouse: (config: { intervalMs: number; moveAmount: number }) => Promise<{ success: boolean }>
      stopMouse: () => Promise<{ success: boolean }>
      getStatus: () => Promise<{ running: boolean }>
    }
  }
}
