// Contenido de las páginas legales (español e inglés; DE/FR/IT muestran el
// inglés). Bloques: ['h', texto] | ['p', texto] | ['ul', [items]] |
// ['table', [cabeceras], [[celdas]]]. El renderizador está en pages/Legal.jsx.
//
// PENDIENTE: completar TITULAR con los datos fiscales reales de Casa Tere.

export const TITULAR = {
  razon: '[Razón social pendiente]',
  comercial: 'Casa Tere',
  nif: '[NIF pendiente]',
  domicilio: 'Paseo de Playa Honda, 35509 Playa Honda, San Bartolomé (Las Palmas)',
  email: '[email pendiente]',
  web: 'casatere.es',
}

const es = {
  eyebrow: 'Información legal',
  updated: 'Última actualización: octubre de 2026.',
  labels: {
    titular: 'Titular', comercial: 'Nombre comercial', nif: 'NIF', domicilio: 'Domicilio',
    telefono: 'Teléfono', email: 'Email', web: 'Sitio web', actividad: 'Actividad',
    actividadVal: 'Restaurante.', responsable: 'Responsable', contacto: 'Contacto',
  },
  aviso: {
    title: 'Aviso legal',
    intro: 'En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos identificativos del titular de este sitio web.',
    idHead: 'Titular del sitio web',
    blocks: [
      ['h', 'Objeto'],
      ['p', 'Este sitio web es informativo: presenta la carta, el pescado del día, la galería y los datos de contacto del restaurante Casa Tere. La navegación no requiere registro.'],
      ['h', 'Condiciones de uso'],
      ['p', 'El acceso es gratuito e implica la aceptación de estas condiciones. El usuario se compromete a hacer un uso adecuado de los contenidos y a no emplearlos para actividades ilícitas.'],
      ['h', 'Propiedad intelectual'],
      ['p', 'Los textos, fotografías, logotipo, marca y diseño de este sitio pertenecen a Casa Tere o se usan con autorización, y están protegidos por la normativa de propiedad intelectual e industrial. Queda prohibida su reproducción sin autorización expresa.'],
      ['h', 'Responsabilidad'],
      ['p', 'Procuramos que la información (en especial precios, platos y pescado disponible) esté actualizada, pero puede variar. En caso de duda prevalece la información facilitada en el propio restaurante.'],
      ['h', 'Legislación aplicable'],
      ['p', 'Estas condiciones se rigen por la legislación española.'],
    ],
  },
  privacidad: {
    title: 'Política de privacidad',
    intro: 'Esta política explica cómo se tratan los datos personales conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 (LOPDGDD).',
    respHead: 'Responsable del tratamiento',
    blocks: [
      ['h', '¿Qué datos tratamos?'],
      ['p', 'Este sitio no tiene formularios de contacto ni registro para el público, así que durante la navegación normal no se recogen datos identificativos. Solo se tratan:'],
      ['ul', [
        'Datos técnicos de navegación (dirección IP, dispositivo y navegador), gestionados por el proveedor de alojamiento para prestar el servicio y garantizar su seguridad.',
        'Preferencias guardadas en tu dispositivo (idioma y decisión sobre cookies), que no se envían a terceros.',
      ]],
      ['p', 'Si nos contactas por teléfono o redes sociales, esos datos se usan solo para atender tu consulta o reserva.'],
      ['h', 'Legitimación'],
      ['p', 'Interés legítimo en el funcionamiento y la seguridad del sitio, cumplimiento de obligaciones legales y, en su caso, tu consentimiento.'],
      ['h', 'Conservación y destinatarios'],
      ['p', 'Los datos técnicos se conservan durante los plazos que fijan los proveedores y la normativa. No se ceden datos a terceros salvo obligación legal. Proveedores: Vercel (alojamiento) y Supabase (contenido de la web).'],
      ['h', 'Tus derechos'],
      ['p', `Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a ${TITULAR.email}. También puedes reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).`],
    ],
  },
  cookies: {
    title: 'Política de cookies',
    intro: 'Una cookie es un pequeño archivo que el sitio guarda en tu navegador. Esta web usa solo almacenamiento técnico necesario para funcionar.',
    blocks: [
      ['h', 'Qué usamos'],
      ['table', ['Nombre', 'Tipo', 'Finalidad', 'Duración'], [
        ['casa-tere-lang', 'Técnica (necesaria)', 'Recordar el idioma que has elegido.', 'Persistente'],
        ['casa-tere-cookies', 'Técnica (necesaria)', 'Guardar tu decisión sobre esta política.', 'Persistente'],
      ]],
      ['p', 'No usamos cookies publicitarias ni de terceros. Si en el futuro se añade medición de audiencia, solo se activará con tu consentimiento.'],
      ['h', 'Cómo desactivarlas'],
      ['p', 'Puedes borrar o bloquear las cookies desde la configuración de tu navegador. Si lo haces, la web seguirá funcionando, pero no recordará tu idioma.'],
    ],
  },
}

const en = {
  eyebrow: 'Legal information',
  updated: 'Last updated: October 2026.',
  labels: {
    titular: 'Owner', comercial: 'Trade name', nif: 'Tax ID', domicilio: 'Address',
    telefono: 'Phone', email: 'Email', web: 'Website', actividad: 'Activity',
    actividadVal: 'Restaurant.', responsable: 'Data controller', contacto: 'Contact',
  },
  aviso: {
    title: 'Legal notice',
    intro: 'In accordance with Spanish Law 34/2002 on Information Society Services and Electronic Commerce (LSSI-CE), the identifying details of the owner of this website are provided below.',
    idHead: 'Website owner',
    blocks: [
      ['h', 'Purpose'],
      ['p', "This website is informational: it presents the menu, the catch of the day, the gallery and the contact details of Casa Tere restaurant. Browsing doesn't require registration."],
      ['h', 'Terms of use'],
      ['p', 'Access is free and implies acceptance of these terms. Users agree to make proper use of the content and not to use it for unlawful purposes.'],
      ['h', 'Intellectual property'],
      ['p', 'The texts, photographs, logo, brand and design of this site belong to Casa Tere or are used with permission, and are protected by intellectual and industrial property law. Reproduction without express permission is prohibited.'],
      ['h', 'Liability'],
      ['p', 'We try to keep information (especially prices, dishes and available fish) up to date, but it may change. If in doubt, the information given at the restaurant prevails.'],
      ['h', 'Applicable law'],
      ['p', 'These terms are governed by Spanish law.'],
    ],
  },
  privacidad: {
    title: 'Privacy policy',
    intro: 'This policy explains how personal data is processed under Regulation (EU) 2016/679 (GDPR) and Spanish Organic Law 3/2018 (LOPDGDD).',
    respHead: 'Data controller',
    blocks: [
      ['h', 'What data do we process?'],
      ['p', 'This site has no contact or registration forms, so no identifying data is collected during normal browsing. We only process:'],
      ['ul', [
        'Technical browsing data (IP address, device and browser), handled by the hosting provider to deliver the service and keep it secure.',
        'Preferences stored on your device (language and cookie choice), which are not sent to third parties.',
      ]],
      ['p', 'If you contact us by phone or social media, that data is used only to handle your enquiry or booking.'],
      ['h', 'Legal basis'],
      ['p', 'Legitimate interest in the operation and security of the site, compliance with legal obligations and, where applicable, your consent.'],
      ['h', 'Retention and recipients'],
      ['p', 'Technical data is kept for the periods set by providers and the law. No data is shared with third parties unless legally required. Providers: Vercel (hosting) and Supabase (website content).'],
      ['h', 'Your rights'],
      ['p', `You can exercise your rights of access, rectification, erasure, objection, restriction and portability by writing to ${TITULAR.email}. You may also complain to the Spanish Data Protection Agency (www.aepd.es).`],
    ],
  },
  cookies: {
    title: 'Cookie policy',
    intro: 'A cookie is a small file a website stores in your browser. This site only uses technical storage needed for it to work.',
    blocks: [
      ['h', 'What we use'],
      ['table', ['Name', 'Type', 'Purpose', 'Duration'], [
        ['casa-tere-lang', 'Technical (necessary)', 'Remember the language you chose.', 'Persistent'],
        ['casa-tere-cookies', 'Technical (necessary)', 'Store your decision about this policy.', 'Persistent'],
      ]],
      ['p', "We don't use advertising or third-party cookies. If audience measurement is added in future, it will only run with your consent."],
      ['h', 'How to disable them'],
      ['p', "You can delete or block cookies in your browser settings. The site will still work, but it won't remember your language."],
    ],
  },
}

export const LEGAL = { es, en, de: en, fr: en, it: en }
