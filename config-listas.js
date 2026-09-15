// Configuración de formularios y hojas para la vitrina de listas.
// Generado desde apps_script_listas.gs

const FORM_POSTULAR_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdPgRGvIuYe0BeAls8r_3ikF1RvACXeIYMx1R6rJ-YcCBSZLQ/viewform';
const FORM_SUMARSE_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfHUCHDQUS044gQWLiTD4k0jXjigATqHs54GtUyMiKyp0aqww/viewform';

const SHEET_POSTULAR_ID = '1jlhRE0XJTHjQZwWDXmlduhskAT2QJeUcTiFJge59IXs';
const SHEET_POSTULAR_GID = '541976457';

const SHEET_SUMARSE_ID = '1k_ignOAKaYVQjfOVbcm0ZRna_Dzw5M0Ak_oQdHErknk';
const SHEET_SUMARSE_GID = '163584584';

function listasConfigOk() {
  return !!(SHEET_POSTULAR_ID && FORM_POSTULAR_URL);
}
