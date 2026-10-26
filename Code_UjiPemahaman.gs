// Apps Script untuk menyimpan hasil Uji Pemahaman ke spreadsheet
const SHEET_ID = '1F6MIyzkOG2dqhgI793TKZJXMAEs7GBknqjNUc0yFwiw';
const TAB = 'Uji Pemahaman';

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sh = ss.getSheetByName(TAB);
  if (!sh) {
    sh = ss.insertSheet(TAB);
    sh.appendRow(['Waktu', 'Nama', 'Kode Bed', 'Skor (0-100)', 'Jumlah Benar', 'Jawab 1', 'Jawab 2', 'Jawab 3', 'Jawab 4', 'Jawab 5']);
    sh.getRange(1, 1, 1, 10).setFontWeight('bold').setBackground('#168b86').setFontColor('#ffffff');
    sh.setFrozenRows(1);
  }
  const waktu = Utilities.formatDate(new Date(d.waktu || new Date()), 'Asia/Jakarta', 'dd/MM/yyyy HH:mm:ss');
  sh.appendRow([waktu, d.nama, d.bed || '', d.skor, d.benar].concat(d.jawaban || []));
  return ContentService.createTextOutput('ok');
}

function doGet() { return ContentService.createTextOutput('Uji Pemahaman aktif'); }
