// Cruce manual queja → propuestas que la atienden (y viceversa).
// Basado en el contenido del chat, no solo en el nombre de la categoría.
const QUEJA_A_PROPUESTAS = {
  // Seguridad
  Q01: ["P01", "P02", "P03"],
  Q02: ["P01", "P02", "P03"],
  Q03: ["P03", "P32"],
  Q04: ["P01", "P02", "P03", "P04"],
  Q05: ["P04"],
  Q06: ["P04"],
  Q07: ["P05"],

  // Fauna / plagas
  Q08: ["P06", "P07"],
  Q09: ["P06", "P07"],
  Q10: ["P06", "P31", "P32"],
  Q11: ["P06"],
  Q12: ["P06", "P07"],

  // Alícuota / transparencia
  Q13: ["P08", "P11", "P14"],
  Q14: ["P08", "P09", "P10"],
  Q15: ["P08", "P09", "P10", "P11", "P14"],

  // Áreas comunes / mantenimiento
  Q16: ["P15", "P16"],
  Q17: ["P24"],
  Q18: ["P22"],
  Q19: ["P23"],
  Q20: ["P25"],
  Q35: ["P34", "P35"],

  // Residuos y mascotas
  Q21: ["P26", "P28"],
  Q22: ["P27"],

  // Ruido y convivencia
  Q23: ["P27", "P28"],
  Q29: ["P27"],
  Q36: ["P27", "P34"],
  Q37: ["P27", "P28"],
  Q38: ["P27", "P28"],
  Q39: ["P27", "P28"],

  // Vías
  Q24: ["P17"],
  Q25: ["P18"],
  Q26: ["P18", "P27"],

  // Servicios básicos
  Q27: ["P19", "P20"],
  Q28: ["P21"],

  // Comunicación / organización
  Q30: ["P33", "P12"],
  Q31: ["P33"],
  Q32: ["P12", "P13", "P33"],

  // Uso de vivienda
  Q33: ["P27"],
  Q34: ["P29", "P30"],
};

function buildPropuestaAQuejas(map) {
  const reverse = {};
  Object.keys(map).forEach((qid) => {
    map[qid].forEach((pid) => {
      if (!reverse[pid]) reverse[pid] = [];
      if (!reverse[pid].includes(qid)) reverse[pid].push(qid);
    });
  });
  return reverse;
}

const PROPUESTA_A_QUEJAS = buildPropuestaAQuejas(QUEJA_A_PROPUESTAS);

function relatedPropuestasFor(quejaId) {
  return QUEJA_A_PROPUESTAS[quejaId] || [];
}

function relatedQuejasFor(propuestaId) {
  return PROPUESTA_A_QUEJAS[propuestaId] || [];
}
