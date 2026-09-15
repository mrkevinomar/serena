// Traducción de categorías técnicas a un lenguaje más visual y cotidiano.
const CAT_INFO = {
  // Quejas
  "Seguridad": { emoji: "🚧", titulo: "Entra cualquiera por la garita", propuestaTitulo: "Más seguridad en los accesos", color: "#c0392b" },
  "Fauna y plagas": { emoji: "🐍", titulo: "Bichos y animales peligrosos", color: "#8e44ad" },
  "Alícuota y transparencia": { emoji: "💰", titulo: "¿En qué se gasta nuestra plata?", color: "#1f8a70" },
  "Mantenimiento áreas comunes": { emoji: "🏊", titulo: "Piscina, gym y parques descuidados", color: "#2471a3" },
  "Residuos y mascotas": { emoji: "💩", titulo: "Caca de perro y basura", color: "#a0522d" },
  "Infraestructura vial": { emoji: "🚗", titulo: "Esos lomos de toro que dañan los carros", propuestaTitulo: "Arreglar las vías y los lomos de toro", color: "#b9770e" },
  "Servicios básicos": { emoji: "💡", titulo: "Se va la luz… y también el agua", propuestaTitulo: "Nunca más sin agua ni luz", color: "#d4ac0d" },
  "Ruido y convivencia": { emoji: "🔊", titulo: "Ruido y taladros a deshoras", color: "#6c3483" },
  "Comunicación y organización": { emoji: "📱", titulo: "Mil grupos de WhatsApp y puro pelear", color: "#117864" },
  "Uso de vivienda": { emoji: "🚙", titulo: "Carros mal parqueados y negocios en casa", propuestaTitulo: "Cuidar el uso de las viviendas y parqueos", color: "#7b241c" },
  // Propuestas (algunas comparten emoji con su queja relacionada)
  "Fumigación": { emoji: "🐛", titulo: "Fumigar en serio, de una vez", color: "#8e44ad" },
  "Transparencia financiera": { emoji: "🧾", titulo: "Cuentas claras y auditadas", color: "#1f8a70" },
  "Organización interna": { emoji: "🤝", titulo: "Organizarnos mejor entre vecinos", color: "#117864" },
  "Personal y gastos": { emoji: "💼", titulo: "Cuidar bien los gastos", color: "#1f8a70" },
  "Áreas comunes": { emoji: "🏖️", titulo: "Mejorar piscina, parque y gimnasio", color: "#2471a3" },
  "Convivencia y reglamento": { emoji: "📜", titulo: "Reglas claras para todos", color: "#6c3483" },
  "Emergencias": { emoji: "🚨", titulo: "Estar listos para una emergencia", color: "#c0392b" },
  "Comunicación oficial": { emoji: "📢", titulo: "Un canal oficial de verdad", color: "#117864" },
  "Otras ideas del formulario": { emoji: "📝", titulo: "Otras ideas enviadas por el formulario", color: "#555555" },
};

// Palabras clave para ubicar respuestas del formulario en una categoría de propuestas.
const CAT_KEYWORDS = {
  "Seguridad": [
    "seguridad", "garita", "guardia", "reconocimiento facial", "facial", "qr",
    "visitante", "acceso", "pluma", "delivery", "motorizado", "placa", "robo",
    "camara", "cámara", "vigilancia", "ingreso", "control"
  ],
  "Áreas comunes": [
    "piscina", "parque", "gimnasio", "gym", "cancha", "tenis", "area comun",
    "área común", "areas comunes", "áreas comunes", "infantil", "toldo",
    "silla", "club", "juegos"
  ],
  "Fumigación": [
    "fumig", "mosquito", "dengue", "plaga", "alacran", "alacrán", "serpiente",
    "bicho", "insecto"
  ],
  "Transparencia financiera": [
    "transparencia", "alicuota", "alícuota", "cuenta", "auditor", "gasto",
    "presupuesto", "plata", "dinero", "finanza"
  ],
  "Personal y gastos": [
    "personal", "sueldo", "contrat", "empleado", "administrador", "nómina", "nomina"
  ],
  "Organización interna": [
    "directiva", "comite", "comité", "asamblea", "organiz", "reunion", "reunión", "eleccion", "elección"
  ],
  "Servicios básicos": [
    "agua", "luz", "electric", "corte", "tanque", "bomba", "internet"
  ],
  "Infraestructura vial": [
    "lomo", "via", "vía", "calle", "asfalto", "hueco", "bache", "vereda", "acera"
  ],
  "Convivencia y reglamento": [
    "reglamento", "norma", "ruido", "convivencia", "multa", "sancion", "sanción", "horario"
  ],
  "Uso de vivienda": [
    "parqueo", "estacion", "airbnb", "negocio", "arriendo", "vivienda", "local"
  ],
  "Emergencias": [
    "emergencia", "incendio", "evacuacion", "evacuación", "primeros auxilios", "sismo"
  ],
  "Comunicación oficial": [
    "comunicacion", "comunicación", "oficial", "canal", "aviso", "informacion", "información"
  ]
};

function categorizeProposal(text) {
  const t = String(text || '').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  let best = "Otras ideas del formulario";
  let bestScore = 0;
  Object.keys(CAT_KEYWORDS).forEach(cat => {
    let score = 0;
    CAT_KEYWORDS[cat].forEach(kw => {
      const needle = kw.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (t.includes(needle)) score += needle.length > 6 ? 2 : 1;
    });
    if (score > bestScore) {
      bestScore = score;
      best = cat;
    }
  });
  return best;
}

function catInfo(cat, tab) {
  const info = CAT_INFO[cat] || { emoji: "📌", titulo: cat, color: "#555" };
  if (tab === 'propuestas' && info.propuestaTitulo) {
    return { ...info, titulo: info.propuestaTitulo };
  }
  return info;
}

function flamesFor(freq) {
  if (!freq) return "";
  const f = freq.toLowerCase();
  if (f.includes("muy")) return "🔥🔥🔥";
  if (f.includes("alta")) return "🔥🔥";
  if (f.includes("media")) return "🔥";
  return "🌤️";
}

function flameLabel(freq) {
  if (!freq) return "";
  const f = freq.toLowerCase();
  if (f.includes("muy")) return "Lo que más se queja la gente";
  if (f.includes("alta")) return "Bastante común";
  if (f.includes("media")) return "Pasa de vez en cuando";
  return "Poco frecuente";
}
