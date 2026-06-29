function FloatingHearts() {
  const hearts = [
    { size: 16, left: '10%', delay: '0s', duration: '6s', opacity: 0.15, color: '#87A878' },
    { size: 12, left: '25%', delay: '1.5s', duration: '7s', opacity: 0.12, color: '#C9A84C' },
    { size: 20, left: '40%', delay: '0.8s', duration: '8s', opacity: 0.1, color: '#87A878' },
    { size: 14, left: '60%', delay: '2s', duration: '6.5s', opacity: 0.13, color: '#C9A84C' },
    { size: 18, left: '75%', delay: '0.3s', duration: '7.5s', opacity: 0.11, color: '#87A878' },
    { size: 10, left: '88%', delay: '1s', duration: '6s', opacity: 0.14, color: '#C9A84C' },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((heart, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: heart.left,
            bottom: '-20px',
            animationDuration: heart.duration,
            animationDelay: heart.delay,
            animationName: 'floatUp',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            opacity: heart.opacity,
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill={heart.color}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  )
}

export default FloatingHearts