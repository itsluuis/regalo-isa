# regalo-isa 

Página tributo para Isa

## Requisitos

- [Node.js](https://nodejs.org) (18+)
- [pnpm](https://pnpm.io) — si no lo tenés: `corepack enable`

## Correr la página

```bash
pnpm install        # instala dependencias (primera vez)
pnpm dev            # servidor local en http://localhost:8443
```

Para compilar la versión de producción:

```bash
pnpm build          # genera la carpeta dist/
pnpm preview        # sirve el build en http://localhost:8443
```

## Dónde va cada cosa

| Tipo | Carpeta | Archivo de configuración |
| --- | --- | --- |
| Fotos | `public/fotos/` | `src/fotos.ts` (lista `tracks`) |
| Videos | `public/videos/` | `src/fotos.ts` (lista `things`) |
| Foto de portada | `public/fotos/` | `src/fotos.ts` (objeto `hero`) |

> Los archivos de `public/` se copian tal cual al sitio. Referenciá siempre por su ruta pública, ej. `/fotos/mi-foto.jpg`.

---

## Agregar una foto a la galería (sección 2)

1. Copiá la foto a `public/fotos/`. **Sugerencia:** convertila a `.jpg` y que pese lo menos posible (mirá la sección [Consejos](#consejos)).
2. Abrí `src/fotos.ts` y agregá una entrada al final de `tracks`:

```ts
{ title: 'Título lindo', msg: 'Mensaje corto debajo de la foto', cover: '/fotos/mi-foto.jpg', color: '#e8a0bf' },
```

- `title` → título que muestra el slider.
- `msg` → frase corta (en cursiva) dentro del cuadro.
- `cover` → ruta de la foto.
- `color` → color de acento (cualquier hex, ej. `#f7c948`, `#6bc9f7`).

3. Ojo con las comas: cada entrada termina en coma, menos la última.

## Agregar un video (sección 3, estilo PS5)

1. Copiá el video a `public/videos/`. **Recomendado:** comprimido y sin audio (mirá [Consejos](#consejos)).
2. Agregá un **fotograma** del video como portada: `public/videos/<mismo-nombre>.jpg`. Si no lo tenés, buscá el primer cuadro: `ffmpeg -ss 1 -i video.mp4 -frames:v 1 portada.jpg`.
3. En `src/fotos.ts`, agregá al final de `things`:

```ts
{ label: 'Cómo se llama', tag: 'Etiqueta corta', desc: 'Descripción opcional', img: '/videos/mi-video.jpg', video: '/videos/mi-video.mp4' },
```

- `label` → nombre que aparece como título.
- `tag` → etiqueta sobre el título.
- `desc` → frase opcional que se muestra sobre la pantalla.
- `img` → portada (fotograma).
- `video` → ruta del `.mp4`.

## Cambiar la foto de portada (inicio)

En `src/fotos.ts`, arriba de todo:

```ts
export const hero = {
  frame: '/fotos/la-foto-principal.jpg', // foto enmarcada
  bg: '/fotos/la-foto-principal.jpg', // la misma o una más desenfocada de fondo
}
```

## Cambiar el título / textos de las secciones

Están en código, en `src/App.tsx`: buscá el texto en español y editálo directo. El tipo de letra y los colores se estilizan ahí mismo.

---

## Consejos

- **Videos pesados:** el repo usa Git LFS con cuota limitada en GitHub. Comprimí bien antes de subir. Ejemplo (1280px, calidad media, sin audio):

  ```bash
  ffmpeg -i original.mp4 -vf "scale='min(1280,iw)':-2" -c:v libx264 -preset medium -crf 28 -an -movflags +faststart salida.mp4
  ```

- **Fotos:** apuntan a verse grandes; si pesan >8 MB notás lentitud. Bajalas a ~1600px de ancho y calidad 80%.

- Después de tocar `src/fotos.ts` o `public/`, recargá la página (el dev server ya ve los cambios; las carpetas `public/` a veces piden refrescar con Ctrl+F5).

## Subir cambios al repositorio

```bash
git add .
git commit -m "agregué fotos y videos nuevos"
git push
```
