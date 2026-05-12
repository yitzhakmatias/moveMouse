declare module 'robotjs' {
  interface MousePos {
    x: number
    y: number
  }
  function getMousePos(): MousePos
  function moveMouse(x: number, y: number): void
  function moveMouseSmooth(x: number, y: number): void
}
