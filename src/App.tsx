import { useState, useEffect, useRef } from 'react'
import './App.css'
import audioFile from './assets/audio.mp3'

function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio(audioFile)
    audioRef.current.loop = true
    audioRef.current.volume = 0.5

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const toggleMusic = () => {
    if (!audioRef.current) return

    if (!isPlaying) {
      audioRef.current.play().catch(error => {
        console.log('Audio play failed:', error)
      })
      setIsPlaying(true)
    } else {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  // Play gentle click sound
  const playClickSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 0.1)

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15)

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.start()
    oscillator.stop(audioContext.currentTime + 0.15)
  }

  // Generate romantic floating particles in hero section
  useEffect(() => {
    const heroContainer = document.querySelector('.hero-particles-container')
    if (!heroContainer) return

    const createHeroParticle = () => {
      const particle = document.createElement('div')
      particle.className = 'hero-particle'
      const flowers = ['🌸', '🌺', '🌼', '💮', '🏵️', '🌷']
      particle.textContent = flowers[Math.floor(Math.random() * flowers.length)]
      particle.style.left = Math.random() * 100 + '%'
      particle.style.animationDuration = (8 + Math.random() * 4) + 's'
      particle.style.animationDelay = Math.random() * 2 + 's'
      heroContainer.appendChild(particle)

      setTimeout(() => particle.remove(), 14000)
    }

    // Create initial particles
    for (let i = 0; i < 15; i++) {
      setTimeout(createHeroParticle, i * 200)
    }

    const heroInterval = setInterval(createHeroParticle, 800)

    return () => {
      clearInterval(heroInterval)
    }
  }, [])

  // Generate floating particles for rest of page
  useEffect(() => {
    const container = document.body

    const createHeart = () => {
      const heart = document.createElement('div')
      heart.className = 'particle heart'
      const hearts = ['💕', '💖', '💗', '💝', '💞', '💓', '💘']
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)]
      heart.style.left = Math.random() * 100 + '%'
      heart.style.animationDuration = (8 + Math.random() * 4) + 's'
      heart.style.animationDelay = Math.random() * 2 + 's'
      container.appendChild(heart)

      setTimeout(() => heart.remove(), 12000)
    }

    const createRose = () => {
      const rose = document.createElement('div')
      rose.className = 'particle rose'
      const flowers = ['🌹', '🌺', '🌸', '🌼', '🌻', '🌷']
      rose.textContent = flowers[Math.floor(Math.random() * flowers.length)]
      rose.style.left = Math.random() * 100 + '%'
      rose.style.animationDuration = (10 + Math.random() * 4) + 's'
      rose.style.animationDelay = Math.random() * 3 + 's'
      container.appendChild(rose)

      setTimeout(() => rose.remove(), 14000)
    }

    const createSparkle = () => {
      const sparkle = document.createElement('div')
      sparkle.className = 'particle sparkle'
      sparkle.style.left = Math.random() * 100 + '%'
      sparkle.style.top = Math.random() * 100 + '%'
      sparkle.style.animationDelay = Math.random() * 2 + 's'
      container.appendChild(sparkle)

      setTimeout(() => sparkle.remove(), 3000)
    }

    const heartInterval = setInterval(createHeart, 1000)
    const roseInterval = setInterval(createRose, 1500)
    const sparkleInterval = setInterval(createSparkle, 500)

    return () => {
      clearInterval(heartInterval)
      clearInterval(roseInterval)
      clearInterval(sparkleInterval)
    }
  }, [])

  return (
    <div className="wedding-website">
      {/* Hero Section with Particles Background */}
      <section className="hero-section">
        {/* Particles Container for Hero Background */}
        <div className="hero-particles-container"></div>

        <h1 className="main-title">Selamat Menikah</h1>
        <p className="subtitle">Wedding Congratulations</p>
        <p className="tagline">Sebuah Perjalanan Cinta Dimulai</p>

        <div className="romantic-divider">
          <div className="divider-line"></div>
          <div className="divider-ornament">💐</div>
          <div className="divider-line"></div>
        </div>

        {/* Couple Names */}
        <div className="couple-names-container">
          {/* Groom */}
          <div className="person-name-wrapper groom" onClick={playClickSound}>
            <div className="person-role">The Groom</div>
            <h2 className="person-name">Tholib Mu'ammar</h2>
          </div>

          {/* Center Heart */}
          <div className="heart-connector">
            <div className="big-heart">💖</div>
          </div>

          {/* Bride */}
          <div className="person-name-wrapper bride" onClick={playClickSound}>
            <div className="person-role">The Bride</div>
            <h2 className="person-name">Ika Mariamah</h2>
          </div>
        </div>
      </section>

      {/* Message Section */}
      <section className="message-section">
        <h2 className="message-title">Selamat Menikah</h2>

        <p className="message-text">
          Semoga pernikahan kalian dipenuhi dengan cinta yang tulus, kebahagiaan yang melimpah,
          dan berkah yang tak terhingga. Semoga kalian berdua selalu saling mendukung,
          menghormati, dan mencintai satu sama lain dalam setiap langkah perjalanan hidup.
        </p>

        <div className="romantic-divider">
          <div className="divider-line"></div>
          <div className="divider-ornament">💍</div>
          <div className="divider-line"></div>
        </div>

        <p className="message-text">
          Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah,
          dan selalu diberkahi dalam setiap langkah kehidupan bersama. Semoga cinta kalian
          tumbuh semakin kuat seiring berjalannya waktu.
        </p>

        <p className="blessing-text">
          ✨ Barakallahu lakuma wa baraka 'alaikuma<br />
          wa jama'a bainakuma fi khair ✨
        </p>

        <div className="emoji-decoration">
          <span>💐</span>
          <span>🌹</span>
          <span>💕</span>
          <span>🎊</span>
          <span>✨</span>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="gallery-section">
        <h2 className="gallery-title">Galeri Pengantin</h2>
        <div className="gallery-grid">
          <div className="gallery-item" onClick={playClickSound}>
            <div className="gallery-placeholder">📸</div>
            <div className="gallery-caption">Momen Bahagia</div>
          </div>
          <div className="gallery-item" onClick={playClickSound}>
            <div className="gallery-placeholder">💑</div>
            <div className="gallery-caption">Bersama Selamanya</div>
          </div>
          <div className="gallery-item" onClick={playClickSound}>
            <div className="gallery-placeholder">💐</div>
            <div className="gallery-caption">Bunga Cinta</div>
          </div>
          <div className="gallery-item" onClick={playClickSound}>
            <div className="gallery-placeholder">💍</div>
            <div className="gallery-caption">Cincin Pernikahan</div>
          </div>
          <div className="gallery-item" onClick={playClickSound}>
            <div className="gallery-placeholder">🎊</div>
            <div className="gallery-caption">Perayaan Cinta</div>
          </div>
          <div className="gallery-item" onClick={playClickSound}>
            <div className="gallery-placeholder">❤️</div>
            <div className="gallery-caption">Cinta Sejati</div>
          </div>
          <div className="gallery-item" onClick={playClickSound}>
            <div className="gallery-placeholder">🌹</div>
            <div className="gallery-caption">Mawar Merah</div>
          </div>
          <div className="gallery-item" onClick={playClickSound}>
            <div className="gallery-placeholder">💝</div>
            <div className="gallery-caption">Hadiah Cinta</div>
          </div>
        </div>
      </section>

      {/* Music Controls */}
      <div className="music-controls">
        <button
          className={`music-button ${isPlaying ? 'playing' : ''}`}
          onClick={toggleMusic}
          aria-label="Toggle music"
          title={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          <span className="music-icon">{isPlaying ? '🎵' : '🎶'}</span>
        </button>
      </div>
    </div>
  )
}

export default App
