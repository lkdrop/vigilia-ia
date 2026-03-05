import { useMemo } from 'react'

export default function StarBackground() {
  const stars = useMemo(() => {
    const layers = []
    // Camada 1: estrelas pequenas
    for (let i = 0; i < 120; i++) {
      layers.push({
        id: `s1-${i}`,
        size: Math.random() * 2 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.7 + 0.3,
      })
    }
    // Camada 2: estrelas maiores e mais brilhantes
    for (let i = 0; i < 30; i++) {
      layers.push({
        id: `s2-${i}`,
        size: Math.random() * 3 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.5 + 0.5,
      })
    }
    return layers
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity,
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
}
