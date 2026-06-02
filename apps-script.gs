// ================================================================
//  TypeBattle WPM Contest — Google Apps Script Backend
//  Paste this entire file into Google Apps Script, then deploy.
// ================================================================

const SHEET_NAME = 'Results';

// ── Initialise headers on first run ──────────────────────────────
function setupSheet() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  let sheet   = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    const headers = ['Name', 'Student ID', 'Email', 'WPM', 'Accuracy (%)', 'Day', 'Timestamp'];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length)
         .setFontWeight('bold')
         .setBackground('#1a1f2e')
         .setFontColor('#63b3ed');
    sheet.setFrozenRows(1);
  }
}

// ── POST: save one result ─────────────────────────────────────────
function doPost(e) {
  try {
    const data  = JSON.parse(e.postData.contents);
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    let sheet   = ss.getSheetByName(SHEET_NAME);

    // Auto-create sheet + headers if missing
    if (!sheet) setupSheet();
    sheet = ss.getSheetByName(SHEET_NAME);
    if (sheet.getLastRow() === 0) setupSheet();

    sheet.appendRow([
      data.name      || '',
      data.studentId || '',
      data.email     || '',
      Number(data.wpm)      || 0,
      Number(data.accuracy) || 0,
      data.day       || new Date().toLocaleDateString(),
      data.timestamp || new Date().toISOString(),
    ]);

    return jsonResponse({ success: true });

  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

// ── GET: return leaderboard (best score per student) ──────────────
function doGet(e) {
  try {
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet || sheet.getLastRow() <= 1) {
      return jsonResponse({ success: true, data: [] });
    }

    const numRows = sheet.getLastRow() - 1;
    const rows    = sheet.getRange(2, 1, numRows, 7).getValues();

    // Keep the best WPM entry per student ID
    const best = {};
    rows.forEach(row => {
      const [name, studentId, email, wpm, accuracy, day, timestamp] = row;
      if (!studentId) return;
      const key = String(studentId).trim().toLowerCase();
      if (!best[key] || Number(wpm) > best[key].wpm) {
        best[key] = {
          name:      String(name),
          studentId: String(studentId),
          email:     String(email),
          wpm:       Number(wpm),
          accuracy:  Number(accuracy),
          day:       String(day),
          timestamp: String(timestamp),
        };
      }
    });

    const sorted = Object.values(best).sort((a, b) => b.wpm - a.wpm);
    return jsonResponse({ success: true, data: sorted });

  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

// ── Helper ────────────────────────────────────────────────────────
function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
