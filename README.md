# Pingüinos de Rancho Esports

Sitio hecho con Astro.

## Usar
    npm install
    npm run dev      # http://localhost:4321
    npm run build    # genera /dist para publicar (Netlify, Vercel, Cloudflare Pages)

## Editar contenido
Todo está en `src/data/team.ts`: plantilla, partidos, noticias, patrocinadores, redes.

## Fotos
- Jugadores: `public/players/` → escribe la ruta en `photo` (ej. `/players/leo.png`). PNG sin fondo, 800x1000 px.
- Galería: `public/gallery/` · Patrocinadores: `public/sponsors/`

## Agenda de scrims en vivo
Ver `apps-script/Code.gs`. Se pega en un Google Sheet (Extensiones > Apps Script), se ejecuta `setup` una vez,
se implementa como Aplicación web (acceso: cualquier persona) y la URL /exec va en `schedule.api` de `src/data/team.ts`.
- Hoja "Solicitudes": cada solicitud entra como Pendiente. Cambia Estado a Confirmado o Rechazado.
- Hoja "Disponibilidad": fecha + bloqueado (cierra un día), abierto (abre un día extra) u ocupado.
