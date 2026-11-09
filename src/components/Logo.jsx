// Logotipo: una flor de cempasúchil estilizada.
const PETALOS = [0, 45, 90, 135, 180, 225, 270, 315]

export default function Logo({ tamano = 36 }) {
  return (
    <svg width={tamano} height={tamano} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <g fill="var(--color-acento)">
        {PETALOS.map((angulo) => (
          <ellipse key={angulo} cx="16" cy="8.5" rx="3.6" ry="6.5" transform={`rotate(${angulo} 16 16)`} />
        ))}
      </g>
      <circle cx="16" cy="16" r="6" fill="var(--color-primario)" />
      <circle cx="16" cy="16" r="2.4" fill="var(--color-acento)" />
    </svg>
  )
}
