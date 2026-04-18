const s = {
  container: {
    maxWidth: 960,
  },
  heading: {
    fontSize: 20,
    fontWeight: 500,
    color: 'var(--tx)',
    marginBottom: 8,
  },
  sub: {
    fontSize: 13,
    color: 'var(--tx3)',
  },
}

export default function Dashboard() {
  return (
    <div style={s.container}>
      <div style={s.heading}>Dashboard</div>
      <div style={s.sub}>Bienvenido a PULSO. Las secciones se irán construyendo aquí.</div>
    </div>
  )
}
