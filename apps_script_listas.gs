/**
 * CL-Serena — Crea los 2 formularios para armar listas de la nueva directiva.
 *
 * CÓMO USARLO (2 minutos):
 * 1. Entra a https://script.google.com con la cuenta de Google que administrará esto.
 * 2. "Proyecto nuevo" → borra el código de ejemplo → pega TODO este archivo.
 * 3. Guarda el proyecto (Ctrl/Cmd+S). Nombre sugerido: "CL-Serena Listas".
 * 4. Arriba elige la función: crearFormulariosListas → botón ▶ Ejecutar.
 * 5. La primera vez acepta los permisos (Revisar permisos → tu cuenta → Avanzado → Ir a…).
 * 6. Ve a: Ver → Registros de ejecución (o "Execution log").
 * 7. Copia los enlaces que imprime el script y pégalos en config-listas.js
 *    (en la carpeta del sitio), en las constantes FORM_* y SHEET_*.
 *
 * Qué crea:
 *  - Formulario "Postula tu lista" + su hoja de respuestas
 *  - Formulario "Quiero sumarme a una lista" + su hoja de respuestas
 * Ambos con: recopilar correos + enlace para editar la respuesta después.
 */
function crearFormulariosListas() {
  var formPostular = FormApp.create('CL-Serena — Postula tu lista');
  formPostular.setDescription(
    'Etapa Serena · Urb. Casa Laguna\n\n' +
    'Si quieres formar o proponer una lista para la nueva directiva, llena este formulario.\n' +
    'Todavía no hace falta definir cargos definitivos: puedes anotar los vecinos que ya ' +
    'quieren participar y ajustar después con el enlace “Editar respuesta” que te llegará.\n\n' +
    'Esto no es la votación final. Solo es para que todos vean quién se está organizando.'
  );
  formPostular.setCollectEmail(true);
  formPostular.setAllowResponseEdits(true);
  formPostular.setLimitOneResponsePerUser(false);
  formPostular.setConfirmationMessage(
    '¡Listo! Tu lista quedó registrada.\n\n' +
    'Guarda el enlace “Editar tu respuesta” (también te llega por correo) por si luego ' +
    'quieres cambiar nombres, integrantes o propuestas.\n\n' +
    'La vitrina pública del sitio se actualizará sola.'
  );

  formPostular.addTextItem()
    .setTitle('Tu nombre completo')
    .setHelpText('Quien está proponiendo o coordinando la lista por ahora.')
    .setRequired(true);

  formPostular.addTextItem()
    .setTitle('Manzana y villa')
    .setHelpText('Ejemplo: Mz 5 Villa 12')
    .setRequired(true);

  formPostular.addTextItem()
    .setTitle('Nombre de la lista')
    .setHelpText('Cómo quieren que se vea públicamente. Ejemplo: “Lista Serena Unidos”.')
    .setRequired(true);

  formPostular.addParagraphTextItem()
    .setTitle('Integrantes que ya van con la lista')
    .setHelpText(
      'Pon un nombre por línea. Si aún no hay cargos definidos, solo nombres está bien. ' +
      'Ejemplo:\nMaría Pérez\nJuan López\nAna Ruiz'
    )
    .setRequired(true);

  formPostular.addParagraphTextItem()
    .setTitle('Motivación (máximo unas 5 líneas)')
    .setHelpText('¿Por qué se organizan? ¿Qué quieren lograr para la etapa?')
    .setRequired(true);

  formPostular.addParagraphTextItem()
    .setTitle('2 o 3 propuestas principales')
    .setHelpText('Las ideas concretas con las que quieren trabajar primero.')
    .setRequired(true);

  formPostular.addParagraphTextItem()
    .setTitle('Contacto adicional (opcional)')
    .setHelpText('WhatsApp u otro dato por si un vecino quiere escribirles directo. No es obligatorio.')
    .setRequired(false);

  var ssPostular = SpreadsheetApp.create('CL-Serena — Respuestas: Postula tu lista');
  formPostular.setDestination(FormApp.DestinationType.SPREADSHEET, ssPostular.getId());

  // --- Formulario B: sumarse ---
  var formSumarse = FormApp.create('CL-Serena — Quiero sumarme a una lista');
  formSumarse.setDescription(
    'Etapa Serena · Urb. Casa Laguna\n\n' +
    'Si ya viste una lista en la vitrina y quieres unirte, llena este formulario.\n' +
    'Escribe el nombre de la lista exactamente como aparece (o lo más parecido).\n\n' +
    'Podrás editar tu respuesta después con el enlace que te llega por correo.'
  );
  formSumarse.setCollectEmail(true);
  formSumarse.setAllowResponseEdits(true);
  formSumarse.setLimitOneResponsePerUser(false);
  formSumarse.setConfirmationMessage(
    '¡Gracias! Tu adhesión quedó registrada.\n\n' +
    'Guarda el enlace “Editar tu respuesta” por si cambias de lista o corriges tu nombre.'
  );

  formSumarse.addTextItem()
    .setTitle('Tu nombre completo')
    .setRequired(true);

  formSumarse.addTextItem()
    .setTitle('Manzana y villa')
    .setHelpText('Ejemplo: Mz 5 Villa 12')
    .setRequired(true);

  formSumarse.addTextItem()
    .setTitle('Nombre de la lista a la que te sumas')
    .setHelpText('Cópialo de la vitrina pública para que coincida.')
    .setRequired(true);

  formSumarse.addParagraphTextItem()
    .setTitle('¿Qué puedes aportar? (opcional)')
    .setHelpText('Ej.: tiempo, una habilidad, apoyo en tu manzana…')
    .setRequired(false);

  var ssSumarse = SpreadsheetApp.create('CL-Serena — Respuestas: Sumarse a una lista');
  formSumarse.setDestination(FormApp.DestinationType.SPREADSHEET, ssSumarse.getId());

  // Compartir hojas: cualquiera con el enlace puede VER (para que el sitio las lea)
  // Nota: "publicado" para lectura vía gviz suele requerir que la hoja esté
  // compartida como "Cualquiera con el enlace → Lector". El script lo intenta;
  // si Google lo bloquea en tu cuenta, hazlo a mano en cada hoja.
  try {
    ssPostular.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    ssSumarse.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  } catch (e) {
    Logger.log('No se pudo compartir automáticamente las hojas. Hazlo a mano: Compartir → Cualquiera con el enlace → Lector.');
    Logger.log('Detalle: ' + e);
  }

  var gidPostular = ssPostular.getSheets()[0].getSheetId();
  var gidSumarse = ssSumarse.getSheets()[0].getSheetId();

  Logger.log('========== PEGA ESTO EN config-listas.js ==========');
  Logger.log('FORM_POSTULAR_URL = "' + formPostular.getPublishedUrl() + '";');
  Logger.log('FORM_SUMARSE_URL  = "' + formSumarse.getPublishedUrl() + '";');
  Logger.log('SHEET_POSTULAR_ID = "' + ssPostular.getId() + '";');
  Logger.log('SHEET_POSTULAR_GID = "' + gidPostular + '";');
  Logger.log('SHEET_SUMARSE_ID  = "' + ssSumarse.getId() + '";');
  Logger.log('SHEET_SUMARSE_GID  = "' + gidSumarse + '";');
  Logger.log('===================================================');
  Logger.log('Form postular (editar): ' + formPostular.getEditUrl());
  Logger.log('Form sumarse (editar):  ' + formSumarse.getEditUrl());
  Logger.log('Sheet postular: ' + ssPostular.getUrl());
  Logger.log('Sheet sumarse:  ' + ssSumarse.getUrl());

  return {
    formPostular: formPostular.getPublishedUrl(),
    formSumarse: formSumarse.getPublishedUrl(),
    sheetPostular: ssPostular.getUrl(),
    sheetSumarse: ssSumarse.getUrl()
  };
}
