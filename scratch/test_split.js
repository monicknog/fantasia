const fs = require('fs');

const indexHtml = fs.readFileSync('c:/Projetos/fantasia/index.html', 'utf8');

// Find where Folha 2 starts:
const splitMarker = '    <!-- ==================== FOLHA 2:';
const endMarker = '  </main>';

const parts = indexHtml.split(splitMarker);
if (parts.length < 2) {
  console.error('Marker not found!');
  process.exit(1);
}

const beforeFolha2 = parts[0];
const afterMain = parts[1].split(endMarker)[1];

console.log('Split successful. Before length:', beforeFolha2.length, 'After length:', afterMain.length);
