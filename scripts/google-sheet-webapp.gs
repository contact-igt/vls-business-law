/**
 * Google Apps Script Web App for the DRT & SARFAESI Proceedings registration sheet.
 *
 * Deploy: Apps Script editor → Deploy → New deployment → type "Web app",
 *   execute as "Me", access "Anyone". Copy the /exec URL into
 *   NEXT_PUBLIC_SHEET_WEBAPP_URL (matches the taxation-law landing page setup).
 *
 * The landing page POSTs application/x-www-form-urlencoded with these fields:
 *   name, email, mobile, amount, registered_date, programm_date,
 *   razorpay_order_id, razorpay_payment_id, razorpay_signature,
 *   payment_status, captured, page_name, ip_address,
 *   utm_source, utm_medium, utm_campaign, utm_term, utm_content
 */
var HEADERS = [
  'timestamp',
  'name',
  'email',
  'mobile',
  'amount',
  'registered_date',
  'programm_date',
  'razorpay_order_id',
  'razorpay_payment_id',
  'razorpay_signature',
  'payment_status',
  'captured',
  'page_name',
  'ip_address',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Registrations')
      || SpreadsheetApp.getActiveSpreadsheet().insertSheet('Registrations');

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    var params = (e && e.parameter) || {};
    var row = HEADERS.map(function (key) {
      if (key === 'timestamp') return new Date();
      return params[key] !== undefined ? params[key] : '';
    });
    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ result: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
