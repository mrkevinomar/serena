# CL-Serena — Sitio de quejas, propuestas y votación

Este sitio organiza las quejas y propuestas del chat "CL-SERENA PROPIETARIOS"
(junio–septiembre 2026) en una página que cualquier vecino puede consultar, y
permite votar/priorizar las propuestas para la nueva directiva.

## Qué contiene esta carpeta

- `index.html` — página principal: catálogo de quejas y propuestas, con
  búsqueda y filtro por categoría.
- `votar.html` — página de votación (necesita el paso de configuración de
  abajo antes de funcionar).
- `data.json` — los datos (quejas y propuestas) en formato JSON. Editar este
  archivo actualiza automáticamente lo que se ve en `index.html`.
- `style.css` — estilos de toda la página.
- `apps_script.gs` — script de Google Apps Script que crea automáticamente el
  formulario de votación y su hoja de respuestas.

## 1. Publicar el sitio en GitHub Pages (gratis)

1. Crea una cuenta gratuita en [github.com](https://github.com) si no tienes una.
2. Crea un repositorio nuevo, por ejemplo `cl-serena-propuestas`. Puede ser
   público (necesario para GitHub Pages gratis en cuentas normales).
3. Sube todos los archivos de esta carpeta (`index.html`, `votar.html`,
   `data.json`, `style.css`, `apps_script.gs`) a la raíz del repositorio.
   - Más fácil: en la página del repositorio, botón "Add file" → "Upload
     files", arrastra los archivos y confirma ("Commit changes").
4. Ve a **Settings → Pages** del repositorio.
5. En "Source" elige la rama `main` (o `master`) y la carpeta `/ (root)`.
   Guarda.
6. En un minuto GitHub te dará un enlace parecido a:
   `https://TU-USUARIO.github.io/cl-serena-propuestas/`
   Ese es el enlace que puedes compartir en el grupo de WhatsApp.

No hace falta saber programar para estos pasos: es subir archivos y activar
una opción.

## 2. Configurar la votación (Google Form)

GitHub Pages solo sirve páginas estáticas: no puede guardar votos de forma
permanente ni compartirlos entre vecinos por sí solo. Por eso la votación usa
un **Google Form** (gratis, sin código) conectado a una **Google Sheet**, que
se puede exportar a Excel con un clic.

1. Entra a [script.google.com](https://script.google.com) con la cuenta de
   Google que administrará las votaciones.
2. Crea un "Proyecto nuevo", borra el contenido y pega todo el código de
   `apps_script.gs`.
3. Ejecuta la función `crearFormularioVotacion` (botón ▶ Ejecutar). Acepta los
   permisos que pida Google la primera vez.
4. Abre "Ver → Registro de ejecución" y copia el enlace del **formulario para
   compartir**.
5. Abre `votar.html` con un editor de texto, busca las 2 apariciones de
   `FORM_URL_AQUI` y reemplázalas por ese enlace.
6. Vuelve a subir el archivo `votar.html` actualizado a GitHub (Add file →
   Upload files, sobrescribe el existente).

Listo: la pestaña "Votar propuestas" del sitio ya mostrará el formulario real.

## 3. Exportar los votos a Excel

Cuando quieras los resultados: abre la Google Sheet de respuestas (el 3er
enlace que te dio el script) → menú **Archivo → Descargar → Microsoft Excel
(.xlsx)**.

## 4. Actualizar el catálogo de quejas/propuestas

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
