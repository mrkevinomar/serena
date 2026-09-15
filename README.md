# CL-Serena — Sitio de quejas y propuestas

Este sitio organiza las quejas y propuestas del chat "CL-SERENA PROPIETARIOS"
(junio–septiembre 2026) en una página que cualquier vecino puede consultar.

Sitio publicado: https://mrkevinomar.github.io/serena/

## Qué contiene esta carpeta

- `index.html` — página principal: catálogo de quejas y propuestas, con
  búsqueda y filtro por categoría.
- `categorias.js` — títulos e íconos amigables por categoría.
- `data.json` — los datos (quejas y propuestas) en formato JSON. Editar este
  archivo actualiza automáticamente lo que se ve en `index.html`.
- `style.css` — estilos de toda la página.

## Actualizar el catálogo de quejas/propuestas

Edita `data.json` con cualquier editor de texto (o pide ayuda). Cada entrada
tiene esta forma:

```json
{"id": "P34", "categoria": "Seguridad", "propuesta": "Texto de la propuesta",
 "detalle": "Explicación opcional", "quien": "Quién la propuso", "fecha": "2026-09-20"}
```

Sube el archivo actualizado a GitHub y los cambios se verán al instante en el
sitio publicado.

## Nota

Este sitio es una herramienta informal de organización vecinal creada a
partir del chat de WhatsApp. No sustituye los canales oficiales de la
administración ni de la futura directiva electa.
