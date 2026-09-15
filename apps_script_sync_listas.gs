/**
 * CL-Serena — Sincroniza el dropdown de "Sumarse" con los nombres
 * de lista del formulario "Postula tu lista".
 *
 * CÓMO USARLO (una sola vez):
 * 1. Entra a https://script.google.com
 * 2. Abre el mismo proyecto donde corriste crearFormulariosListas
 *    (o crea uno nuevo y pega ESTE archivo completo).
 * 3. Ejecuta primero: syncListasDropdown  (▶ Ejecutar)
 *    → convierte la pregunta de texto en lista desplegable y la llena.
 * 4. Ejecuta después: instalarTriggerSync
 *    → cada vez que alguien postule una lista nueva, el dropdown se actualiza solo.
 *
 * Si agregas listas a mano en la Sheet, puedes volver a correr syncListasDropdown.
 */

var FORM_POSTULAR_ID = '1X88K7_9p28w9MMs0x8LOW_QGPZm9w5aML8PvCevQ3_w';
var FORM_SUMARSE_ID  = '1RRiTVQzYz-uUkpXKpRMFLp61SrpcsFSV-QYsdVbQjko';
var SHEET_POSTULAR_ID = '1jlhRE0XJTHjQZwWDXmlduhskAT2QJeUcTiFJge59IXs';
var TITULO_PREGUNTA_LISTA = 'Nombre de la lista a la que te sumas';
var TITULO_COLUMNA_LISTA = 'Nombre de la lista';
// Opción especial para que alguien pueda "salirse" editando su respuesta
var OPCION_SALIRSE = '— Ya no estoy en ninguna lista —';

function syncListasDropdown() {
  var nombres = obtenerNombresDeListas_();
  // Siempre incluir la opción para salirse (al inicio del dropdown)
  var opciones = [OPCION_SALIRSE].concat(nombres);
  if (!nombres.length) {
    // Si aún no hay listas, igual dejamos la opción de salir + aviso
    opciones = [OPCION_SALIRSE, '(Aún no hay listas publicadas)'];
  }

  var form = FormApp.openById(FORM_SUMARSE_ID);
  var item = buscarItemPorTitulo_(form, TITULO_PREGUNTA_LISTA);

  // Ya es dropdown → solo actualizar opciones
  if (item && item.getType() === FormApp.ItemType.LIST) {
    item.asListItem()
      .setChoiceValues(opciones)
      .setRequired(true);
    Logger.log('Dropdown actualizado con ' + opciones.length + ' opciones: ' + opciones.join(' | '));
    return opciones;
  }

  // Si era texto (o no existía), crear dropdown con addListItem (más compatible)
  var indexDestino = item ? item.getIndex() : form.getItems().length;
  if (item) {
    form.deleteItem(item);
  }

  var listItem = form.addListItem()
    .setTitle(TITULO_PREGUNTA_LISTA)
    .setHelpText('Elige la lista a la que quieres sumarte. Si ya no quieres estar en ninguna, elige “Ya no estoy en ninguna lista” (puedes editar tu respuesta después).')
    .setChoiceValues(opciones)
    .setRequired(true);

  // Colocarla donde estaba la pregunta original
  var nuevoIndex = listItem.getIndex();
  var maxIndex = form.getItems().length - 1;
  var destino = Math.min(indexDestino, maxIndex);
  if (nuevoIndex !== destino) {
    form.moveItem(nuevoIndex, destino);
  }

  Logger.log('Pregunta convertida a dropdown con ' + opciones.length + ' opciones: ' + opciones.join(' | '));
  return opciones;
}

/**
 * Instala el disparador: al enviar "Postula tu lista", sincroniza el dropdown.
 * Ejecutar UNA vez. Si ya existía, no duplica.
 */
function instalarTriggerSync() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'syncListasDropdown') {
      Logger.log('El trigger ya estaba instalado. No se duplicó.');
      return;
    }
  }

  ScriptApp.newTrigger('syncListasDropdown')
    .forForm(FORM_POSTULAR_ID)
    .onFormSubmit()
    .create();

  // También sincroniza ahora mismo
  syncListasDropdown();
  Logger.log('Trigger instalado: cada nueva lista actualizará el dropdown de Sumarse.');
}

/** Por si quieres quitar el trigger más adelante. */
function quitarTriggerSync() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'syncListasDropdown') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  Logger.log('Trigger eliminado.');
}

// --- helpers ---

function obtenerNombresDeListas_() {
  var ss = SpreadsheetApp.openById(SHEET_POSTULAR_ID);
  var sheet = encontrarHojaRespuestas_(ss);
  var data = sheet.getDataRange().getValues();
  if (!data.length) return [];

  var headers = data[0];
  var col = -1;
  for (var h = 0; h < headers.length; h++) {
    if (String(headers[h]).trim() === TITULO_COLUMNA_LISTA) {
      col = h;
      break;
    }
  }
  // Fallback: columna típica con email = índice 4 (0 marca, 1 email, 2 nombre, 3 mz, 4 lista)
  if (col < 0) col = 4;

  var seen = {};
  var out = [];
  for (var r = 1; r < data.length; r++) {
    var name = String(data[r][col] || '').trim();
    if (!name) continue;
    var key = name.toLowerCase();
    if (seen[key]) continue;
    seen[key] = true;
    out.push(name);
  }
  out.sort(function (a, b) {
    return a.localeCompare(b, 'es', { sensitivity: 'base' });
  });
  return out;
}

function encontrarHojaRespuestas_(ss) {
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    var n = sheets[i].getName().toLowerCase();
    if (n.indexOf('form') >= 0 || n.indexOf('respuesta') >= 0) {
      return sheets[i];
    }
  }
  return sheets[0];
}

function buscarItemPorTitulo_(form, titulo) {
  var items = form.getItems();
  for (var i = 0; i < items.length; i++) {
    if (items[i].getTitle() === titulo) return items[i];
  }
  return null;
}
