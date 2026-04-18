# Cómo iniciar un proyecto nuevo en la plataforma BIPLAZA

Antes de escribir una línea de código, seguir estos pasos en orden.

---

## 1. Responder las tres preguntas previas

Antes de crear nada, tener clara la respuesta a:

1. **¿Qué problema resuelve y para qué usuario?**
2. **¿En qué portal encaja?** — `app.biplaza.es` (interno) o `clientes.biplaza.es` (clientes)
3. **¿Cómo se sincroniza con Bitrix24?**

Si no hay respuesta clara a las tres, el proyecto se aparca.

---

## 2. Crear el repositorio en GitHub

1. Ir a `github.com/biplaza-dev`
2. **New repository**
3. Nombre en kebab-case: `portal-laboral`, `portal-renta`, `modulo-auditorias`...
4. **Private**
5. Sin README de momento

---

## 3. Inicializar el proyecto en local

```bash
cd ~/Projects
npm create vite@latest [nombre-proyecto] -- --template react
cd [nombre-proyecto]
npm install react-router-dom @supabase/supabase-js
```

---

## 4. Configurar el alias `@/`

En `vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

---

## 5. Crear la estructura de carpetas

```bash
mkdir -p src/components src/pages src/lib src/styles
mkdir -p public/assets/logo
```

---

## 6. Copiar los archivos base

Desde `biplaza-platform`, copiar:
- `diseno/tokens.css` → `src/styles/tokens.css`
- Los cuatro SVGs del logo desde `assets/logo/` → `public/assets/logo/`

Crear `src/lib/supabase.js`:
```js
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

---

## 7. Crear los archivos de entorno

`.env` (nunca en git):
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_N8N_URL=https://biplaza.app.n8n.cloud/webhook
```

`.env.example` (sí en git, sin valores):
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_N8N_URL=
```

Verificar que `.env` está en `.gitignore`.

---

## 8. Reemplazar `src/index.css`

```css
*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  background: #FAF7F3;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#root {
  width: 100%;
  height: 100vh;
  display: flex;
}
```

---

## 9. Crear el `CLAUDE.md`

Copiar la plantilla desde `biplaza-platform/CLAUDE.md-plantilla`, renombrarla a `CLAUDE.md` y actualizar el nombre del proyecto en la primera línea.

Este archivo lo lee Claude Code automáticamente al arrancar — garantiza que cualquier sesión de desarrollo parte con el contexto correcto.

---

## 10. Conectar con GitHub y crear ramas

```bash
git init
git remote add origin https://github.com/biplaza-dev/[nombre-proyecto].git
git add .
git commit -m "Estructura inicial del proyecto"
git push -u origin main
git checkout -b dev
git push -u origin dev
```

A partir de aquí, todo desarrollo nuevo va en `dev`. Nunca push directo a `main`.

---

## 11. Verificar antes de empezar a desarrollar

- [ ] Repositorio en `biplaza-dev`, no en cuenta personal
- [ ] `.env` en `.gitignore`
- [ ] `CLAUDE.md` en la raíz
- [ ] `tokens.css` en `src/styles/`
- [ ] Logos en `public/assets/logo/`
- [ ] Ramas `main` y `dev` creadas
- [ ] Variables de entorno configuradas

---

## Recursos de referencia

| Documento | Ubicación | Para qué |
|---|---|---|
| Stack y decisiones | `decisiones/DECISIONES.md` | Qué usar y qué no |
| Seguridad | `seguridad/SEGURIDAD.md` | Checklist pre-deploy |
| Sistema de diseño | `diseno/DISEÑO.md` | Colores, tipografía, componentes |
| Tokens CSS | `diseno/tokens.css` | Variables de diseño para copiar |
| Contexto Portal Interno | `CONTEXTO-portal-interno.md` | Referencia de implementación |
