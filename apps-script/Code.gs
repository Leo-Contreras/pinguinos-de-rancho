// Backend gratuito de la agenda de scrims (Google Apps Script + Google Sheets)
const TZ = 'America/Mexico_City';
const NOTIFY = 'leonardoaguie@gmail.com';   // correo que recibe cada solicitud
const DAYS = [1, 2, 4];                      // lunes, martes, jueves
const REQ_HEAD = ['Recibida', 'Fecha', 'Equipo', 'Elo', 'Contacto', 'Notas', 'Estado'];
const AV_HEAD = ['Fecha', 'Estado', 'Nota'];

// Ejecuta esta función UNA vez (menú ▶ Ejecutar) para crear las hojas y los menús desplegables.
function setup() {
  const av = sheet_('Disponibilidad', AV_HEAD);
  const rq = sheet_('Solicitudes', REQ_HEAD);
  const dd = (vals) => SpreadsheetApp.newDataValidation().requireValueInList(vals, true).build();
  av.getRange('B2:B500').setDataValidation(dd(['bloqueado', 'abierto', 'ocupado']));
  rq.getRange('G2:G500').setDataValidation(dd(['Pendiente', 'Confirmado', 'Rechazado']));
  av.getRange('A2:A500').setNumberFormat('@');
  rq.getRange('B2:B500').setNumberFormat('@');
}

function sheet_(name, head) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh) { sh = ss.insertSheet(name); sh.appendRow(head); sh.setFrozenRows(1); }
  return sh;
}
function ymd_(v) { return v instanceof Date ? Utilities.formatDate(v, TZ, 'yyyy-MM-dd') : String(v).trim(); }
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function clean_(v) { let s = String(v || '').slice(0, 300); return /^[=+\-@]/.test(s) ? "'" + s : s; }

// La página consulta esto para pintar el calendario
function doGet() {
  const out = { blocked: [], open: [], pending: [], confirmed: [] };
  sheet_('Disponibilidad', AV_HEAD).getDataRange().getValues().slice(1).forEach(r => {
    const d = ymd_(r[0]), e = String(r[1]).toLowerCase().trim();
    if (!d) return;
    if (e === 'bloqueado') out.blocked.push(d);
    else if (e === 'abierto') out.open.push(d);
    else if (e === 'ocupado') out.confirmed.push(d);
  });
  sheet_('Solicitudes', REQ_HEAD).getDataRange().getValues().slice(1).forEach(r => {
    const d = ymd_(r[1]), e = String(r[6]).toLowerCase().trim();
    if (!d) return;
    if (e === 'pendiente') out.pending.push(d);
    else if (e === 'confirmado') out.confirmed.push(d);
  });
  return json_(out);
}

// La página manda aquí cada solicitud
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const d = JSON.parse(e.postData.contents);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(d.date) || !d.team || !d.contact) return json_({ ok: false, reason: 'invalid' });
    const state = JSON.parse(doGet().getContent());
    const dow = new Date(d.date + 'T12:00:00').getDay();
    const allowed = (DAYS.indexOf(dow) >= 0 || state.open.indexOf(d.date) >= 0) && state.blocked.indexOf(d.date) < 0;
    const today = Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd');
    if (!allowed || d.date < today) return json_({ ok: false, reason: 'invalid' });
    if (state.pending.concat(state.confirmed).indexOf(d.date) >= 0) return json_({ ok: false, reason: 'taken' });

    const sh = sheet_('Solicitudes', REQ_HEAD);
    const row = sh.getLastRow() + 1;
    sh.getRange(row, 2).setNumberFormat('@');
    sh.getRange(row, 1, 1, 7).setValues([[new Date(), d.date, clean_(d.team), clean_(d.elo), clean_(d.contact), clean_(d.notes), 'Pendiente']]);

    const msg = 'Nueva solicitud de scrim\nFecha: ' + d.date + ' (7-10 p. m. CDMX, Bo3)\nEquipo: ' + d.team +
      '\nElo: ' + d.elo + '\nContacto: ' + d.contact + '\nNotas: ' + (d.notes || '-') +
      '\n\nConfirma o rechaza en la hoja "Solicitudes", columna Estado.';
    MailApp.sendEmail(NOTIFY, 'Scrim solicitado: ' + d.date + ' - ' + d.team, msg);
    const hook = PropertiesService.getScriptProperties().getProperty('DISCORD_WEBHOOK');
    if (hook) UrlFetchApp.fetch(hook, { method: 'post', contentType: 'application/json', payload: JSON.stringify({ content: msg }), muteHttpExceptions: true });
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, reason: 'error' });
  } finally {
    lock.releaseLock();
  }
}
