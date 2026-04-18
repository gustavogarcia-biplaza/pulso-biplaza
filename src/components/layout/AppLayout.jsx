import Sidebar from './Sidebar'
import Topbar from './Topbar'

const s = {
  app: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    width: '100%',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    minWidth: 0,
  },
  body: {
    flex: 1,
    overflowY: 'auto',
    padding: 24,
    paddingBottom: 60,
    background: 'var(--cream)',
  },
}

export default function AppLayout({ children }) {
  return (
    <div style={s.app}>
      <Sidebar />
      <div style={s.main}>
        <Topbar />
        <div style={s.body}>
          {children}
        </div>
      </div>
    </div>
  )
}
