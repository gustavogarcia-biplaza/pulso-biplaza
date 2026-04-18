import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

import Login from '@/pages/Login'
import AppLayout from '@/components/layout/AppLayout'
import Dashboard from '@/pages/Dashboard'

// Protege rutas que requieren sesión activa
function ProtectedRoute({ children, session }) {
  if (session === null) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  const [session, setSession] = useState(undefined) // undefined = cargando

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Mientras verifica la sesión, no renderizar nada
  if (session === undefined) return null

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute session={session}>
              <AppLayout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                </Routes>
              </AppLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
