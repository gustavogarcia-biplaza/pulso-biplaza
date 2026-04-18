import { useState } from 'react'
import { supabase } from '@/lib/supabase'

const s = {
  screen: {
    display: 'flex',
    position: 'fixed',
    inset: 0,
    background: 'var(--sb)',
    zIndex: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: '100%',
    maxWidth: 420,
    padding: 24,
  },
  logo: {
    textAlign: 'center',
    marginBottom: 32,
  },
  subtitle: {
    fontSize: 12,
    color: 'var(--oro)',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 12,
  },
  btnMicrosoft: {
    width: '100%',
    padding: '13px',
    background: 'var(--wh)',
    color: '#1a1a1a',
    border: 'none',
    borderRadius: 'var(--r2)',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'var(--f)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 12,
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    background: 'rgba(255,255,255,0.1)',
  },
  dividerText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.25)',
  },
  label: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.45)',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: 'var(--r2)',
    fontSize: 14,
    fontFamily: 'var(--f)',
    color: 'var(--wh)',
    outline: 'none',
    marginBottom: 10,
    boxSizing: 'border-box',
  },
  btnLink: {
    width: '100%',
    padding: 11,
    background: 'transparent',
    color: 'var(--oro)',
    border: '1px solid var(--oro)',
    borderRadius: 'var(--r2)',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'var(--f)',
  },
  error: {
    fontSize: 12,
    color: 'var(--redL)',
    marginTop: 8,
    minHeight: 18,
    textAlign: 'center',
  },
  successBox: {
    background: 'rgba(216,165,95,0.1)',
    border: '1px solid rgba(216,165,95,0.25)',
    borderRadius: 'var(--r)',
    padding: '16px 18px',
    marginBottom: 16,
    textAlign: 'center',
  },
  successTitle: {
    fontSize: 13,
    fontWeight: 500,
    color: 'var(--oro)',
    marginBottom: 4,
  },
  successText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.45)',
    lineHeight: 1.5,
  },
  retryText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.3)',
    textAlign: 'center',
  },
  retryLink: {
    color: 'var(--oro)',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function loginMicrosoft() {
    await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: { scopes: 'email profile' },
    })
  }

  async function sendMagicLink() {
    if (!email.includes('@')) {
      setError('Introduce un correo válido')
      return
    }
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithOtp({ email })
    setLoading(false)
    if (error) {
      setError('No se pudo enviar el enlace. Inténtalo de nuevo.')
    } else {
      setSent(true)
    }
  }

  return (
    <div style={s.screen}>
      <div style={s.box}>
        <div style={s.logo}>
          <div style={{ fontSize: 22, fontWeight: 600, color: 'var(--oro)', letterSpacing: 2 }}>BIPLAZA</div>
          <div style={s.subtitle}>Personas &amp; Cultura</div>
        </div>

        {!sent ? (
          <>
            <button onClick={loginMicrosoft} style={s.btnMicrosoft}>
              <svg width="18" height="18" viewBox="0 0 21 21" fill="none">
                <rect x="0" y="0" width="10" height="10" fill="#F25022"/>
                <rect x="11" y="0" width="10" height="10" fill="#7FBA00"/>
                <rect x="0" y="11" width="10" height="10" fill="#00A4EF"/>
                <rect x="11" y="11" width="10" height="10" fill="#FFB900"/>
              </svg>
              Entrar con Microsoft
            </button>

            <div style={s.divider}>
              <div style={s.dividerLine} />
              <span style={s.dividerText}>o con enlace por email</span>
              <div style={s.dividerLine} />
            </div>

            <div style={s.label}>Correo corporativo BIPLAZA</div>
            <input
              type="email"
              placeholder="nombre@biplaza.es"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMagicLink()}
              style={s.input}
            />
            <button onClick={sendMagicLink} disabled={loading} style={s.btnLink}>
              {loading ? 'Enviando...' : 'Recibir enlace de acceso'}
            </button>
            <div style={s.error}>{error}</div>
          </>
        ) : (
          <>
            <div style={s.successBox}>
              <div style={s.successTitle}>Enlace enviado</div>
              <div style={s.successText}>
                Haz clic en el enlace del email para acceder. Si no aparece, revisa la carpeta de spam.
              </div>
            </div>
            <div style={s.retryText}>
              ¿No llegó?{' '}
              <span onClick={() => setSent(false)} style={s.retryLink}>Reintentar</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
