type ParticleTypeProps = {
    x: number
    y: number
    r: number
    d: number
    l: number
    a: number[]
    c: number[]
    t: string
}

type ConfettiServiceDrawProps = {
    width: number
    height: number
    particles: ParticleTypeProps[]
    maxParticles: number
    canvasContext: any
}

type ConfettiServiceUpdateProps = Omit<ConfettiServiceDrawProps, 'canvasContext'>
type ConfettiServiceGenerateParticlesProps = Omit<ConfettiServiceUpdateProps, 'particles'>

const CONFETTI_ITEMS_TYPES = {
    CIRCLE: 'circle',
    TRIANGLE: 'triangle',
    LINE: 'line',
}

export const ConfettiService = {
    generateParticles({ width, height, maxParticles }: ConfettiServiceGenerateParticlesProps) {
        const types = [
            CONFETTI_ITEMS_TYPES.CIRCLE,
            CONFETTI_ITEMS_TYPES.CIRCLE,
            CONFETTI_ITEMS_TYPES.TRIANGLE,
            CONFETTI_ITEMS_TYPES.TRIANGLE,
            CONFETTI_ITEMS_TYPES.LINE,
        ]
        const colors = [
            [238, 96, 169],
            [68, 213, 217],
            [245, 187, 152],
            [144, 148, 188],
            [235, 234, 77],
        ]
        const angles = [
            [4, 0, 4, 4],
            [2, 2, 0, 4],
            [0, 4, 2, 2],
            [0, 4, 4, 4],
        ]
        const particles = [] as ParticleTypeProps[]
        for (let i = 0; i < maxParticles; i++) {
            particles.push({
                x: Math.random() * width, // x-coordinate
                y: Math.random() * height, // y-coordinate
                r: Math.random() * 4 + 1, // radius
                d: Math.random() * maxParticles, // density
                l: Math.floor(Math.random() * 65 + -30), // line angle
                a: angles[Math.floor(Math.random() * angles.length)], // triangle rotation
                c: colors[Math.floor(Math.random() * colors.length)], // color
                t: types[Math.floor(Math.random() * types.length)], // shape
            })
        }

        return particles
    },

    update({
        width = 0, height = 0, particles = [], maxParticles = 0,
    }: ConfettiServiceUpdateProps) {
        for (let i = 0; i < maxParticles; i++) {
            const p = particles[i]
            p.y += Math.cos(p.d) + 1 + p.r / 2
            p.x += Math.sin(0) * 2

            if (p.x > width + 5 || p.x < -5 || p.y > height) {
                particles[i] = {
                    x: Math.random() * width,
                    y: -10,
                    r: p.r,
                    d: p.d,
                    l: p.l,
                    a: p.a,
                    c: p.c,
                    t: p.t,
                }
            }
        }
    },

    draw({
        width = 0, height = 0, maxParticles = 0, particles = [], canvasContext = undefined,
    }: ConfettiServiceDrawProps) {
        canvasContext.clearRect(0, 0, width, height)

        for (let i = 0; i < maxParticles; i++) {
            const p = particles[i]
            const op = (p.r <= 3) ? 0.4 : 0.8
            const color = `rgba(${p.c}, ${op})`

            if (p.t === CONFETTI_ITEMS_TYPES.CIRCLE) {
                canvasContext.fillStyle = color
                canvasContext.beginPath()
                canvasContext.moveTo(p.x, p.y)
                canvasContext.arc(p.x, p.y, p.r, 0, Math.PI * 2, true)
                canvasContext.fill()
            } else if (p.t === CONFETTI_ITEMS_TYPES.TRIANGLE) {
                canvasContext.fillStyle = color
                canvasContext.beginPath()
                canvasContext.moveTo(p.x, p.y)
                canvasContext.lineTo(p.x + (p.r * p.a[0]), p.y + (p.r * p.a[1]))
                canvasContext.lineTo(p.x + (p.r * p.a[2]), p.y + (p.r * p.a[3]))
                canvasContext.closePath()
                canvasContext.fill()
            } else if (p.t === CONFETTI_ITEMS_TYPES.LINE) {
                canvasContext.strokeStyle = color
                canvasContext.beginPath()
                canvasContext.moveTo(p.x, p.y)
                canvasContext.lineTo(p.x + p.l, p.y + (p.r * 5))
                canvasContext.lineWidth = 2
                canvasContext.stroke()
            }
        }

        this.update({
            width, height, particles, maxParticles,
        })
    },
}
