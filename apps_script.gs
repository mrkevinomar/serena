/**
 * CL-Serena Propietarios — creador automático del formulario de votación.
 *
 * CÓMO USARLO (una sola vez):
 * 1. Entra a https://script.google.com con la cuenta de Google que administrará
 *    las votaciones (puede ser una cuenta compartida del comité de vecinos).
 * 2. Crea un "Proyecto nuevo", borra el contenido de Code.gs y pega TODO este archivo.
 * 3. Arriba, selecciona la función "crearFormularioVotacion" y presiona Ejecutar (▶).
 * 4. La primera vez, Google pedirá autorización (son permisos sobre tu propia
 *    cuenta, para que puedas crear tu propio formulario). Acepta.
 * 5. Abre "Ver -> Registro de ejecución" (Execution log). Ahí aparecerán 3 enlaces:
 *      - Formulario para compartir con los vecinos
 *      - Editor del formulario (para retocar preguntas si quieres)
 *      - Hoja de cálculo con las respuestas (exportable a Excel)
 * 6. Copia el enlace del formulario y pégalo en votar.html, reemplazando
 *    "FORM_URL_AQUI" (aparece 2 veces: en el iframe y en el botón).
 *
 * Puedes volver a ejecutar esta función si quieres generar una nueva ronda de
 * votación (por ejemplo, después de la reunión del 20 de septiembre); creará
 * un formulario y una hoja nuevos, sin tocar los anteriores.
 */
function crearFormularioVotacion() {
  var form = FormApp.create('CL-Serena — Votación de propuestas (Etapa Serena)');
  form.setDescription(
    'Vota la prioridad de cada propuesta para la nueva directiva de la Etapa Serena, ' +
    'Urb. Casa Laguna. Escala: 1 = poca prioridad, 5 = máxima prioridad.\n\n' +
    'Un voto por vivienda, por favor. Los resultados se usarán en las reuniones ' +
    'del 15 y 20 de septiembre de 2026.'
  );
  form.setCollectEmail(false);
  form.setLimitOneResponsePerEmail(false);

  form.addTextItem()
    .setTitle('Manzana y Villa')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Nombre (opcional)')
    .setRequired(false);

  var PROPUESTAS = [
    {id: 'P01', categoria: 'Seguridad', propuesta: 'Código QR de acceso por etapa'},
    {id: 'P02', categoria: 'Seguridad', propuesta: 'Control biométrico / reconocimiento facial en accesos'},
    {id: 'P03', categoria: 'Seguridad', propuesta: 'Registro de cédula y placa a todo visitante en garita principal'},
    {id: 'P04', categoria: 'Seguridad', propuesta: 'CCTV en todo el tramo entre la garita principal y las etapas'},
    {id: 'P05', categoria: 'Seguridad', propuesta: 'Control de vehículos sin placa'},
    {id: 'P06', categoria: 'Fumigación', propuesta: 'Plan formal de fumigación periódica financiado con la alícuota'},
    {id: 'P07', categoria: 'Fumigación', propuesta: 'Campaña vecinal de fumigación en el perímetro cercano a la cantera'},
    {id: 'P08', categoria: 'Transparencia financiera', propuesta: 'Informe financiero y de gestión (activos/pasivos) antes de la entrega de administración'},
    {id: 'P09', categoria: 'Transparencia financiera', propuesta: 'Auditoría semestral o anual voluntaria y gratuita'},
    {id: 'P10', categoria: 'Transparencia financiera', propuesta: 'Todos los gastos respaldados con factura de servicios profesionales'},
    {id: 'P11', categoria: 'Transparencia financiera', propuesta: 'Asambleas generales periódicas de rendición de cuentas'},
    {id: 'P12', categoria: 'Organización interna', propuesta: 'Representante voluntario por manzana'},
    {id: 'P13', categoria: 'Organización interna', propuesta: 'Comité multidisciplinario de propietarios de apoyo a la directiva'},
    {id: 'P14', categoria: 'Organización interna', propuesta: 'Plan de trabajo anual con presupuesto y prioridades definidas'},
    {id: 'P15', categoria: 'Personal y gastos', propuesta: 'No afiliar directamente al personal (guardias, jardinería) al IESS'},
    {id: 'P16', categoria: 'Personal y gastos', propuesta: 'Evaluar contratar 2 personas fijas para jardinería en vez de tercerizar'},
    {id: 'P17', categoria: 'Infraestructura vial', propuesta: 'Retirar o rehacer correctamente los reductores de velocidad'},
    {id: 'P18', categoria: 'Infraestructura vial', propuesta: 'Control de exceso de velocidad interno'},
    {id: 'P19', categoria: 'Servicios básicos', propuesta: 'Generador de respaldo para las bombas de agua'},
    {id: 'P20', categoria: 'Servicios básicos', propuesta: 'Plan de contingencia con tanqueros de agua'},
    {id: 'P21', categoria: 'Servicios básicos', propuesta: 'Revisión técnica de la cisterna y tubería de alimentación'},
    {id: 'P22', categoria: 'Áreas comunes', propuesta: 'Bancas y toldo/sombra en el área de juegos infantiles'},
    {id: 'P23', categoria: 'Áreas comunes', propuesta: 'Reglamento de uso e higiene del gimnasio'},
    {id: 'P24', categoria: 'Áreas comunes', propuesta: 'Extender el horario de la piscina hasta las 21:00'},
    {id: 'P25', categoria: 'Áreas comunes', propuesta: 'Control de acceso a la cancha de fútbol para personas ajenas a la etapa'},
    {id: 'P26', categoria: 'Áreas comunes', propuesta: 'Tachos exclusivos para heces de mascotas en parques y esquinas'},
    {id: 'P27', categoria: 'Convivencia y reglamento', propuesta: 'Actualizar el reglamento de convivencia con sanciones graduales'},
    {id: 'P28', categoria: 'Convivencia y reglamento', propuesta: 'Reglamento específico de mascotas'},
    {id: 'P29', categoria: 'Uso de vivienda', propuesta: 'Sancionar el uso comercial de viviendas'},
    {id: 'P30', categoria: 'Uso de vivienda', propuesta: 'No instalar un minimarket administrado por la asociación'},
    {id: 'P31', categoria: 'Emergencias', propuesta: 'Simulacro de evacuación y kit de emergencia por vivienda'},
    {id: 'P32', categoria: 'Emergencias', propuesta: 'Capacitación de guardias en primeros auxilios / RCP'},
    {id: 'P33', categoria: 'Comunicación oficial', propuesta: 'Canal oficial de comunicación una vez electa la directiva'}
  ];

  var catActual = null;
  PROPUESTAS.forEach(function (p) {
    if (p.categoria !== catActual) {
      form.addSectionHeaderItem().setTitle('📂 ' + p.categoria);
      catActual = p.categoria;
    }
    form.addScaleItem()
      .setTitle(p.id + ' — ' + p.propuesta)
      .setBounds(1, 5)
      .setLabels('Poca prioridad', 'Máxima prioridad')
      .setRequired(true);
  });

  form.addParagraphTextItem()
    .setTitle('¿Alguna otra propuesta, queja o comentario que no esté en la lista?')
    .setRequired(false);

  // Crea una hoja de cálculo nueva para las respuestas (exportable a Excel).
  var ss = SpreadsheetApp.create('CL-Serena — Respuestas de votación');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  Logger.log('======================================================');
  Logger.log('Formulario para compartir con los vecinos:');
  Logger.log(form.getPublishedUrl());
  Logger.log('------------------------------------------------------');
  Logger.log('Editor del formulario (para ti):');
  Logger.log(form.getEditUrl());
  Logger.log('------------------------------------------------------');
  Logger.log('Hoja de respuestas (Archivo > Descargar > Microsoft Excel):');
  Logger.log(ss.getUrl());
  Logger.log('======================================================');
}
