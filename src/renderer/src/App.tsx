import { useState, useEffect, useCallback } from 'react'

const INTERVAL_OPTIONS = [
  { label: '10s', value: 10 },
  { label: '30s', value: 30 },
  { label: '1m', value: 60 },
  { label: '2m', value: 120 },
  { label: '5m', value: 300 }
]

export default function App() {
  const [running, setRunning] = useState(false)
  const [intervalSec, setIntervalSec] = useState(60)
  const [moveAmount, setMoveAmount] = useState(10)

  useEffect(() => {
    window.electronAPI.getStatus().then(({ running }) => setRunning(running))
  }, [])

  const handleToggle = useCallback(async () => {
    if (running) {
      await window.electronAPI.stopMouse()
      setRunning(false)
    } else {
      await window.electronAPI.startMouse({ intervalMs: intervalSec * 1000, moveAmount })
      setRunning(true)
    }
  }, [running, intervalSec, moveAmount])

  return (
    <div className="app">
      <div className="titlebar" />

      <div className="content">
        <h1 className="title">Mouse Mover</h1>

        <div className="status-row">
          <span className={`dot ${running ? 'dot--active' : ''}`} />
          <span className="status-label">{running ? 'Active' : 'Idle'}</span>
        </div>

        <div className="section">
          <label className="label">Interval</label>
          <div className="chips">
            {INTERVAL_OPTIONS.map(({ label, value }) => (
              <button
                key={value}
                className={`chip ${intervalSec === value ? 'chip--selected' : ''}`}
                onClick={() => setIntervalSec(value)}
                disabled={running}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="section">
          <label className="label">
            Movement <span className="label-value">{moveAmount}px</span>
          </label>
          <input
            type="range"
            min={1}
            max={100}
            value={moveAmount}
            onChange={(e) => setMoveAmount(Number(e.target.value))}
            disabled={running}
            className="slider"
          />
          <div className="slider-hints">
            <span>Subtle</span>
            <span>Large</span>
          </div>
        </div>

        <button
          className={`toggle-btn ${running ? 'toggle-btn--stop' : 'toggle-btn--start'}`}
          onClick={handleToggle}
        >
          {running ? 'Stop' : 'Start'}
        </button>
      </div>
    </div>
  )
}
