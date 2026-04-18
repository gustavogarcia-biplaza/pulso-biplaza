import { useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

const NAV_ITEMS = [
  {
    group: 'General',
    items: [
      { id: 'db', label: 'Dashboard', path: '/', icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="14" height="14">
          <rect x="3" y="3" width="7" height="7" rx="1" strokeWidth="2"/>
          <rect x="14" y="3" width="7" height="7" rx="1" strokeWidth="2"/>
          <rect x="3" y="14" width="7" height="7" rx="1" strokeWidth="2"/>
          <rect x="14" y="14" width="7" height="7" rx="1" strokeWidth="2"/>
        </svg>
      )},
    ],
  },
]

const s = {
  sidebar: {
    width: 214,
    background: 'var(--sb)',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
  },
  logo: {
    padding: '18px 16px 12px',
    borderBottom: '1px solid var(--sbl)',
  },
  logoText: {
    fontSize: 13,
    fontWeight: 700,
    color: 'var(--oro)',
    letterSpacing: 2,
  },
  logoSub: {
    fontSize: 9,
    color: 'var(--oro)',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: 2,
    opacity: 0.7,
  },
  nav: {
    flex: 1,
    padding: '8px 0',
    overflowY: 'auto',
  },
  group: {
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: '1.2px',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.18)',
    padding: '10px 16px 4px',
  },
  item: (active) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 9,
    padding: '8px 16px',
    cursor: 'pointer',
    color: active ? 'var(--oro)' : 'rgba(255,255,255,0.45)',
    fontSize: 12.5,
    borderLeft: active ? '3px solid var(--oro)' : '3px solid transparent',
    background: active ? 'rgba(216,165,95,0.1)' : 'transparent',
    transition: 'all 0.14s',
    userSelect: 'none',
  }),
  bottom: {
    padding: '6px 0',
    borderTop: '1px solid var(--sbl)',
  },
  signOut: {
    display: 'flex',
    alignItems: 'center',
    gap: 9,
    padding: '8px 16px',
    cursor: 'pointer',
    color: 'rgba(255,255,255,0.35)',
    fontSize: 12.5,
    borderLeft: '3px solid transparent',
    transition: 'all 0.14s',
  },
}

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  async function cerrarSesion() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div style={s.sidebar}>
      <div style={s.logo}>
        <div style={s.logoText}>BIPLAZA</div>
        <div style={s.logoSub}>Personas &amp; Cultura</div>
      </div>

      <nav style={s.nav}>
        {NAV_ITEMS.map(({ group, items }) => (
          <div key={group}>
            <div style={s.group}>{group}</div>
            {items.map(({ id, label, path, icon }) => {
              const active = location.pathname === path
              return (
                <div key={id} style={s.item(active)} onClick={() => navigate(path)}>
                  {icon}
                  {label}
                </div>
              )
            })}
          </div>
        ))}
      </nav>

      <div style={s.bottom}>
        <div style={s.signOut} onClick={cerrarSesion}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="14" height="14">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" strokeWidth="2"/>
          </svg>
          Cerrar sesión
        </div>
      </div>
    </div>
  )
}
