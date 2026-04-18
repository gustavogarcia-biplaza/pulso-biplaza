# [NOMBRE DEL PROYECTO] — Instrucciones para Claude Code

## Contexto del proyecto
Este proyecto forma parte de la plataforma digital de BIPLAZA.
Stack: React + Vite · Supabase · Railway · N8N · Bitrix24

## Documentos fundacionales
Antes de cualquier desarrollo, estos documentos son la referencia obligatoria:
- **Stack y arquitectura:** `biplaza-platform/decisiones/DECISIONES.md`
- **Seguridad:** `biplaza-platform/seguridad/SEGURIDAD.md`
- **Sistema de diseño:** `biplaza-platform/diseno/DISEÑO.md`

## Reglas no negociables

### Código
- Sin Tailwind — estilos como objetos JS inline, con tokens de `src/styles/tokens.css`
- Sin librerías de iconos — SVG inline siempre
- Sin Next.js salvo justificación explícita — React puro
- Alias `@/` apunta a `src/` — configurado en `vite.config.js`

### Seguridad
- Ninguna clave, token ni credencial en el código — siempre variables de entorno
- RLS activado en todas las tablas de Supabase desde el momento de su creación
- Nunca usar `service_role` key en el frontend — solo `anon` key
- Las llamadas a APIs externas (Bitrix24, etc.) van siempre a través de N8N

### Datos
- Bitrix24 es la fuente de verdad para datos de clientes y tareas
- Una sola instancia de Supabase para toda la plataforma (`biplaza-platform`)
- Los portales son el frontend; Bitrix24 es el backend de negocio

### Git
- `main` es siempre producción — nunca push directo
- Todo desarrollo en ramas `feature/` → merge a `dev` → merge a `main`
- El decisor final en cualquier cuestión técnica es Pablo Marrero

## Estructura mínima del proyecto
```
src/
├── components/    ← componentes reutilizables
├── pages/         ← vistas principales
├── lib/
│   └── supabase.js
└── styles/
    └── tokens.css
```

## Variables de entorno requeridas
Ver `.env.example` en la raíz del proyecto.
