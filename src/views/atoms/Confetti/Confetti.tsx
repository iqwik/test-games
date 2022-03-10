import React from 'react'
import { ConfettiService } from './Confetti.service'

const Confetti: React.FC<{ visible: boolean }> = ({ visible }) => {
    const canvasRef = React.useRef(null)
    const maxParticles = 150

    const particles = React.useMemo(() => (
        ConfettiService.generateParticles({
            width: window.innerWidth, height: window.innerHeight, maxParticles,
        })
    ), [window?.innerWidth, window?.innerHeight, maxParticles])

    React.useEffect(() => {
        if (visible) {
            const canvas: any = canvasRef.current
            const canvasContext = canvas.getContext('2d')
            const width = window.innerWidth
            const height = window.innerHeight
            canvas.width = width
            canvas.height = height
            const confettiDraw = setInterval(() => {
                ConfettiService.draw({
                    width, height, maxParticles, particles, canvasContext,
                })
            }, 23)

            return () => { clearInterval(confettiDraw) }
        }
        return undefined
    }, [visible])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -1,
                display: visible ? 'block' : 'none',
            }}
        />
    )
}

export default Confetti
