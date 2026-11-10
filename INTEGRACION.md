# Páginas de Shelly Sarfati

Abrir `press.html`, `contact.html` y `cv.html` mediante un servidor local o el hosting del equipo. Son páginas estáticas, sin instalación de dependencias.

## Integrar con el HOME

Se conservó `index.html` tal como estaba: sólo contenía dos encabezados, no el HOME del compañero. `shared.js` reproduce el menú de la referencia. Todos los enlaces del menú se definen allí, una sola vez. Copiar los archivos nuevos junto al HOME final y agregar sus enlaces a `press.html`, `contact.html` y `cv.html`. En el HOME usar `id="statement"`, `id="work"` e `id="bio"` en sus secciones correspondientes, o ajustar las rutas de `shared.js` al integrarlo. El enlace de la marca regresa a `index.html`.

Los estilos del menú están en `styles.css`. La marca se muestra en minúsculas como en la captura: `shelly sarfati`.

## Correo real

CONTACT usa FormSubmit con destino a **sofialeampudia@gmail.com**. Desde el sitio servido por HTTP/HTTPS, hacer el primer envío y activar el formulario con el enlace que FormSubmit envía a esa cuenta. Hasta completar esa activación, no se garantiza la recepción de mensajes. Revisar spam. No abrir el formulario con `file://`.

El estado `Sent` aparece sólo si el servicio devuelve éxito; confirma aceptación por el servicio, no recepción final en Gmail. Las fallas de red/servicio muestran error y conservan los campos. No se enviaron mensajes de prueba durante el desarrollo. El servicio externo procesa nombre, email y mensaje. Documentación: https://formsubmit.co/ y https://formsubmit.co/ajax-documentation

## Contenido y portadas

`content.js` contiene los ensayos completos del PDF (páginas 10–13), la biografía y el CV (páginas 15–17). Los idiomas cambian ambos ensayos y la biografía. Los datos del CV mantienen el español original y las fechas del documento; no se inventaron fechas ni se resolvieron sus inconsistencias editoriales.

Las cuatro portadas de PRESS son grises por petición. Para reemplazarlas, colocar una imagen dentro de cada `.cover` y usar `width:100%;height:100%;object-fit:cover`. Los enlaces abren la publicación en otra pestaña.

`Download CV` descarga `assets/shelly-sarfati-cv.pdf`, con biografía y CV en español. También hay estilos de impresión para la página. `build-cv.py` permite regenerar el archivo a partir de `content.js`.

Instagram muestra `shellysarfatti`, como se pidió, y enlaza a la URL proporcionada `https://www.instagram.com/shellysarfati/` (una sola t). El correo público usa `shellysarfati@gmail.com`, no el `mailto:info@misitio.com` incluido accidentalmente en el enlace de referencia.

No se publicó el repositorio ni se modificó el HOME de los compañeros.

