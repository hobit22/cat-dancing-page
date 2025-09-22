import { useState, useEffect } from 'react'
import catSvg from '../assets/images/cat.svg'
import '../styles/DancingCat.css'

function DancingCat() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState(2)
  const [danceStyle, setDanceStyle] = useState('catDance')

  const danceStyles = [
    { name: 'catDance', label: '🕺 Classic Dance' },
    { name: 'wiggle', label: '🌀 Wiggle' },
    { name: 'bounce', label: '⬆️ Bounce' },
    { name: 'pulse', label: '💓 Pulse' }
  ]

  const toggleAnimation = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSpeedChange = (e) => {
    setAnimationSpeed(parseFloat(e.target.value))
  }

  const handleStyleChange = (style) => {
    setDanceStyle(style)
  }

  const handleKeyPress = (e) => {
    if (e.code === 'Space') {
      e.preventDefault()
      toggleAnimation()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  return (
    <div className="dancing-cat-container">
      <div
        className={`cat-wrapper ${isPlaying ? 'dancing' : ''}`}
        style={{
          animationName: isPlaying ? danceStyle : 'none',
          animationDuration: `${animationSpeed}s`
        }}
      >
        <img src={catSvg} alt="Dancing Cat" className="cat-image" />
      </div>

      <div className="controls">
        <button onClick={toggleAnimation} className="dance-button">
          {isPlaying ? '⏸️ Stop Dancing' : '▶️ Start Dancing'}
        </button>

        <div className="speed-control">
          <label htmlFor="speed-slider">Speed: {animationSpeed}s</label>
          <input
            id="speed-slider"
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={animationSpeed}
            onChange={handleSpeedChange}
            className="speed-slider"
          />
        </div>
      </div>

      <div className="dance-styles">
        {danceStyles.map((style) => (
          <button
            key={style.name}
            onClick={() => handleStyleChange(style.name)}
            className={`style-button ${danceStyle === style.name ? 'active' : ''}`}
          >
            {style.label}
          </button>
        ))}
      </div>

      <div className="instructions">
        <p>💡 Press <kbd>Space</kbd> to start/stop dancing</p>
      </div>
    </div>
  )
}

export default DancingCat