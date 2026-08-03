import robot from 'robotjs'

interface MoverConfig {
  intervalMs: number
  moveAmount: number
}

export class MouseMover {
  private timer: NodeJS.Timeout | null = null

  start(config: MoverConfig): void {
    this.stop()
    this.timer = setInterval(() => {
      try {
        const pos = robot.getMousePos()
        const angle = Math.random() * 2 * Math.PI
        const dx = Math.round(Math.cos(angle) * config.moveAmount)
        const dy = Math.round(Math.sin(angle) * config.moveAmount)
        robot.moveMouse(pos.x + dx, pos.y + dy)
        setTimeout(() => {
          robot.moveMouse(pos.x, pos.y)
        }, 300)
      } catch (err) {
        console.error('[mouse-mover] robotjs error:', err)
      }
    }, config.intervalMs)
  }

  stop(): void {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }

  isRunning(): boolean {
    return this.timer !== null
  }
}
