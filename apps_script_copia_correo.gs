/**
 * CL-Serena — Activa recordatorios para que la gente no pierda
 * el enlace de editar (y pueda salirse/cambiarse de lista).
 *
 * IMPORTANTE sobre la copia al correo:
 * Apps Script no puede forzar “Siempre enviar copia” en todas las cuentas.
 * Eso se activa en 10 segundos desde la interfaz del Form (pasos abajo).
 * Este script sí mejora el mensaje de confirmación en pantalla.
 *
 * Ejecutar: activarRecordatoriosEdicion
 *
 * PASOS MANUALES (hazlos en CADA formulario — Postular y Sumarse):
 * 1. Abre el form en modo edición.
 * 2. Clic en el engranaje ⚙️ (Configuración).
 * 3. Pestaña “Respuestas”.
 * 4. “Recopilar direcciones de correo electrónico” → activado
 *    (elige “Respuesta del encuestado” o “Verificado” si aparece).
 * 5. “Enviar a los encuestados una copia de sus respuestas”
 *    → elige “Siempre”.
 * 6. Guardar.
 *
 * Enlaces de edición de tus forms:
 * Postular: https://docs.google.com/forms/d/1X88K7_9p28w9MMs0x8LOW_QGPZm9w5aML8PvCevQ3_w/edit
 * Sumarse:  https://docs.google.com/forms/d/1RRiTVQzYz-uUkpXKpRMFLp61SrpcsFSV-QYsdVbQjko/edit
 */

var FORM_POSTULAR_ID = '1X88K7_9p28w9MMs0x8LOW_QGPZm9w5aML8PvCevQ3_w';
var FORM_SUMARSE_ID  = '1RRiTVQzYz-uUkpXKpRMFLp61SrpcsFSV-QYsdVbQjko';

function activarRecordatoriosEdicion() {
  var msgPostular =
    '¡Listo! Tu lista quedó registrada.\n\n' +
    'IMPORTANTE:\n' +
    '1) En esta misma pantalla verás el enlace “Editar tu respuesta”. Guárdalo.\n' +
    '2) Si activaste o recibes la copia por correo, ese mail también trae el enlace para editar.\n' +
    '3) Con ese enlace puedes corregir nombres o cambiar datos después.\n\n' +
    'La vitrina pública del sitio se actualiza sola.';

  var msgSumarse =
    '¡Gracias! Tu adhesión quedó registrada.\n\n' +
    'IMPORTANTE:\n' +
    '1) En esta pantalla aparece “Editar tu respuesta”. Guarda ese enlace.\n' +
    '2) El correo de copia (si lo recibes) también incluye el enlace para editar.\n' +
    '3) Si luego quieres salirte, edita tu respuesta y elige:\n' +
    '   “— Ya no estoy en ninguna lista —”.\n\n' +
    'La vitrina se actualiza sola.';

  var formP = FormApp.openById(FORM_POSTULAR_ID);
  formP.setCollectEmail(true);
  formP.setAllowResponseEdits(true);
  formP.setConfirmationMessage(msgPostular);

  var formS = FormApp.openById(FORM_SUMARSE_ID);
  formS.setCollectEmail(true);
  formS.setAllowResponseEdits(true);
  formS.setConfirmationMessage(msgSumarse);

  Logger.log('Listo: correos obligatorios + editar respuesta + mensaje de confirmación actualizado.');
  Logger.log('Ahora falta el paso MANUAL en Configuración → Respuestas → Enviar copia → Siempre (en ambos forms).');
  Logger.log('Postular: https://docs.google.com/forms/d/' + FORM_POSTULAR_ID + '/edit');
  Logger.log('Sumarse:  https://docs.google.com/forms/d/' + FORM_SUMARSE_ID + '/edit');
}
