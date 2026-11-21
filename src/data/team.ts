const discord = 'https://discord.gg/T5JEaypdd';

export const team = {
  name: 'Pingüinos de Rancho',
  tagline: 'Hielo en el rancho. Fuego en la grieta.',
  game: 'League of Legends',
  email: 'leonardoaguie@gmail.com',
  discord,
  socials: [
    { name: 'Twitter / X', url: '#' },
    { name: 'Instagram', url: '#' },
    { name: 'Twitch', url: '#' },
    { name: 'YouTube', url: '#' },
    { name: 'Discord', url: discord },
  ],
};

// Para agregar foto: guarda la imagen en /public/players/ y escribe photo: '/players/leo.png'
// Recomendado: PNG con fondo transparente, 800x1000 px, jugador de cintura para arriba.
export const roster = [
  { role: 'Top',     name: 'Jared Rivas', riotId: 'MonsterVerdeLoco#Cele', real: '', photo: '/players/jared.jpeg', champs: ['Campeón 1', 'Campeón 2', 'Campeón 3'], bio: 'Escribe aquí una frase corta sobre el jugador.' },
  { role: 'Jungla',  name: 'Leo', riotId: 'Leo#elpep',         real: '', photo: '/players/leo.jpeg', champs: ['Campeón 1', 'Campeón 2', 'Campeón 3'], bio: 'Escribe aquí una frase corta sobre el jugador.' },
  { role: 'Mid',     name: 'Koven', riotId: 'Science Fiction#music',       real: '', photo: '/players/koven.jpeg', champs: ['Campeón 1', 'Campeón 2', 'Campeón 3'], bio: 'Escribe aquí una frase corta sobre el jugador.' },
  { role: 'ADC',     name: 'VVolf', riotId: 'VVolf#TRASH',       real: '', photo: '/players/vvolf.jpeg', champs: ['Campeón 1', 'Campeón 2', 'Campeón 3'], bio: 'Escribe aquí una frase corta sobre el jugador.' },
  { role: 'Support', name: 'ALUCRITA', riotId: 'A L U C R l T A#1907',    real: '', photo: '/players/alucrita.jpeg', champs: ['Campeón 1', 'Campeón 2', 'Campeón 3'], bio: 'Escribe aquí una frase corta sobre el jugador.' },
];

export const matches = [
  { date: '2026-11-20', time: '22:00', rival: 'ila Compare', event: 'Liga Ragnarok', result: 'V 2-1' },
  { date: '2026-11-29', time: '22:00', rival: 'Silent Penetration', event: 'Liga Ragnarok', result: '' },
  { date: '2026-12-06', time: '22:00', rival: 'AGS Academy', event: 'Liga Ragnarok', result: '' },
  { date: '2026-12-11', time: '20:00', rival: 'Arise Gladiators', event: 'Liga Ragnarok', result: '' },
  { date: '2026-12-19', time: '20:00', rival: 'Niupis', event: 'Liga Ragnarok', result: '' },
  { date: '2026-12-26', time: '20:00', rival: 'Demonios Rojos', event: 'Liga Ragnarok', result: '' },

];

export const news = [
  { date: '2026-11-21', title: 'Inicio de liga ragnarok', text: 'Liga de league of leguends creada para sentir el lado competitivo mientras te dicviertes con tus amigos', image: 'https://static-cdn.jtvnw.net/jtv_user_pictures/f347c1f9-eacc-4d7d-9beb-f96f6d03c71d-profile_image-70x70.png' },
  { date: '2026-11-10', title: 'Título de la siguiente noticia', text: 'Resumen de dos líneas sobre la noticia.', image: '' },
  { date: '2026-11-02', title: 'Título de otra noticia', text: 'Resumen de dos líneas sobre la noticia.', image: '' },
];

// Logos en /public/sponsors/ → logo: '/sponsors/marca.svg'
export const sponsors = [
  { name: 'Tu marca aquí', logo: '', url: '#' },
  { name: 'Tu marca aquí', logo: '', url: '#' },
  { name: 'Tu marca aquí', logo: '', url: '#' },
  { name: 'Tu marca aquí', logo: '', url: '#' },
];

// Fotos en /public/gallery/ → '/gallery/foto1.jpg'
export const gallery = ['/gallery/1.png', '/gallery/2.jpeg', '/gallery/10.jpeg', '/gallery/4.jpeg', '/gallery/5.jpeg', '/gallery/6.jpeg'];

// ---------- Historial de juego ----------
// Servidor de las cuentas: LAN (Latinoamérica Norte). Si cambian de server, edita aquí.
export const riot = { region: 'lan', ugg: 'la1' };

export function profileLinks(riotId: string) {
  const [n, t] = riotId.split('#');
  const slug = `${n}-${t}`;
  return {
    opgg: `https://op.gg/lol/summoners/${riot.region}/${encodeURIComponent(slug)}`,
    ugg: `https://u.gg/lol/profile/${riot.ugg}/${encodeURIComponent(slug.toLowerCase())}/overview`,
    log: `https://www.leagueofgraphs.com/summoner/${riot.region}/${encodeURIComponent(slug)}`,
  };
}
export const multiSearch = `https://op.gg/lol/multisearch/${riot.region}?summoners=${encodeURIComponent(roster.map(p => p.riotId).join(','))}`;

// ---------- Agenda de scrims y prácticas ----------
// days: 0=domingo, 1=lunes, 2=martes, 3=miércoles, 4=jueves, 5=viernes, 6=sábado
// booked: fechas ocupadas, formato 'AAAA-MM-DD'. CDMX = UTC-6 todo el año.
const base = { days: [1, 2, 4], start: '19:00', end: '22:00', booked: [] as string[] };
export const schedule = {
  utcOffset: -6,
  // Pega aquí la URL de tu Apps Script (termina en /exec). Vacío = solicitudes solo por correo.
  api: '',
  email: 'leonardoaguie@gmail.com',
  scrim: { ...base, label: 'Scrim', format: 'Bo3' },
};
