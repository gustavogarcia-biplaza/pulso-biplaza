const s = {
  topbar: {
    background: 'var(--wh)',
    borderBottom: '1px solid var(--bd)',
    padding: '0 24px',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    boxShadow: 'var(--sh)',
  },
  title: {
    fontSize: 15,
    fontWeight: 500,
    color: 'var(--tx)',
  },
}

export default function Topbar({ title = 'Dashboard' }) {
  return (
    <div style={s.topbar}>
      <div style={s.title}>{title}</div>
    </div>
  )
}
